import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import './App.css';
import Particles from 'react-particles-js';


const particlesOptions = {

                particles: {
                  number: {
                    value: 69,
                    desnity: {
                      enable:true,
                      value_area:800
                    }
                  }
              }
            }
            
const initialState= {
      input: '',
      imageUrl: '',
      clarifaiFaces :[],
      realFaces :[],  
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        email: '',
        name: '',
        entries: 0,
        joined: ''
            }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState; 
   }
  

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        email: data.email,
        name: data.name,
        entries: data.entries,
        joined: data.joined
    }})
    
  }

  calculateFaceLocation= (data) => {
     const data1 = data.outputs[0].data.regions;
      for(let i =0; i<data1.length; i++)
      {
          this.setState(state => {
              state.clarifaiFaces.push(data1[i].region_info.bounding_box);
          })
           
          // let image = document.getElementById('inputimage');
          // let width = Number(image.width);
          // let height = Number(image.height);
          // this.setState({box: 
          //   {
          //     leftCol: clarifaiFace.left_col * width,
          //     topRow: clarifaiFace.top_row * height,
          //     rightCol: width - (clarifaiFace.right_col * width),
          //     bottomRow: height - (clarifaiFace.bottom_row * height)
          //   }
          //   })
       } this.displayFaceBox();     

      }    


  displayFaceBox = () => {
          

          let image = document.getElementById('inputimage');
          let width = Number(image.width);
          let height = Number(image.height);
          var leng = this.state.clarifaiFaces.length;
          for(let i =0; i<leng; i++)
          {
            let box =  
            {
              leftCol: this.state.clarifaiFaces[i].left_col * width,
              topRow: this.state.clarifaiFaces[i].top_row * height,
              rightCol: width - (this.state.clarifaiFaces[i].right_col * width),
              bottomRow: height - (this.state.clarifaiFaces[i].bottom_row * height)
            }
              this.setState(state => {
              state.realFaces.push(box);
          })
        }
      
   
  } 

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://secret-sea-63371.herokuapp.com/imageurl',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
        if(response) {
          fetch('https://secret-sea-63371.herokuapp.com/image',{
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count=> {
            this.setState(Object.assign(this.state.user,{entries: count}))
          })
          .catch(console.log)
        }
          
          this.calculateFaceLocation(response)
    })
      .catch(err=> console.log(err))
  }
  
  onRouteChange= (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    }
    else if(route === 'home')
    {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

render(){
  const {isSignedIn,imageUrl, route, realFaces} = this.state;
  return (
     <div className="App">
     <Particles className='particles'
              params={particlesOptions}
            />  
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
  { route === 'home' 
      ?<div>
      <Logo />
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}
      />
      <FaceRecognition realFaces={realFaces} imageUrl={imageUrl}/>
      </div>
      : (
          route === 'signin'
          ? <Signin  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
      }
   </div>
    );
  }
}

export default App;
