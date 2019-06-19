import React,{Component} from 'react';
import './FaceRecognition.css';

class FaceRecognition extends Component {
		


		render(){
			const {realFaces,imageUrl} = this.props;
			const topRow = realFaces.map((item,index) => item.topRow)
			const bottomRow = realFaces.map((item,index) => item.bottomRow)
			const leftCol = realFaces.map((item,index) => item.leftCol)
			const rightCol = realFaces.map((item,index) =>  item.rightCol)

			 	
			
			return (
				
				<div className ='center ma'>
				<div className='absolute mt2'>
				<img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' /> 
				 	<div>
				 		{ topRow.map((item,i)=>{
				 			return (
				 				<div key={i} className='bounding-box' style={{top: topRow[i], right: rightCol[i], bottom: bottomRow[i], left: leftCol[i]}} >
				 	 			</div>
				 	 			 );
				 		})
				 	 }
				 	</div>
				

			</div>
		</div>
		);
		}
	
}

export default FaceRecognition;