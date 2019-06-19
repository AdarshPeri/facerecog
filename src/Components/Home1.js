import React from 'react';

const Home1 = ({onRouteChange}) => {
	 return(
        <section className="vh-100  baskerville">
          <header className="tc ph3 lh-copy">
          <h1 className="f2 f-headline-l code mb3 fw9 dib tracked-tight blue">Hey there!</h1>
            <h2 className="tc f2-l fw1 f2">Sign Up to go ahead and detect faces in Images!</h2>
          </header>
        <p className="fw1 i tc mt4 mt5-l f4 f3-l">Sign In if you've done this before :)</p>
       <ul className="list tc pl1 w-100 mt5">
         <li className="dib"><p onClick={() => onRouteChange('register')} className="f4 dib black bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20" >Sign Up</p></li>    
         <li className="dib"><p onClick={() => onRouteChange('signin')} className="f4 dib black bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20" >Sign In</p></li>
       </ul>
       </section>


    );

}

export default Home1;