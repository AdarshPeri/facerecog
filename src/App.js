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
import Home1 from './Components/Home1';


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
      route: 'home1',
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
    this.setState({imageUrl:this.state.input});
    fetch('https://secret-sea-63371.herokuapp.com/imageurl',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
      input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
        if(response && this.state.input) {
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
  
  onRouteChange= (route1) => {
    if(route1 === 'signout') {
      this.setState(initialState)
    }
    else if(route1 === 'home')
    {
      this.setState({isSignedIn: true, route:'home',imageUrl:''})
    }
    else if(route1=== 'home1')
    {
      this.setState({isSignedIn:false, route:'home1'})
    }
    else {
    this.setState({route: route1});
  }
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
          :(
          route === 'home1' 
          ? <Home1 onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ))
      }
   </div>
    );
  }
}

export default App;
