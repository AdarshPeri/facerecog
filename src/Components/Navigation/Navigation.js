import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
	
		if(isSignedIn) {
			return(
			<nav className="flex justify-end bb h3 b--white-10">
			 	<div className="flex-grow pa3 flex items-center">
    				<p onClick={() => onRouteChange('home')} className="f6 bg-animate hover-bg-light-green pa3  ph2-l br-pill link dib black  mr3 mr4-ns" >Home</p>	
  					<p onClick={() => onRouteChange('signout')} className="f6 dib black bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20" >Sign Out</p>
  				</div>
			</nav>
				  )
	} else {
		return (
				<nav className="flex justify-end bb h3 b--white-10">
  				 <div className="flex-grow pa3 flex items-center">
    				<p onClick={() => onRouteChange('home1')} className="f6 bg-animate pa3 ph2-l  br-pill hover-bg-light-green link dib black  mr3 mr4-ns">Home</p>
   					<p onClick={()=> onRouteChange('signin')} className="f6 bg-animate pa3 ph2-l  br-pill hover-bg-light-green link dib black  mr3 mr4-ns">Sign In</p>
    				<p onClick={()=> onRouteChange('register')} className="f6 dib black bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20">Sign Up</p>
 				 </div>
			</nav>
	);
	}
		
	
}

export default Navigation;