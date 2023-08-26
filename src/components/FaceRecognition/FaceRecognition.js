import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box, isImageValid}) => {

  return (
    <div className='center ma'>
      <div className='relative mt2'>
        {isImageValid? (
          <div>
          <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
          <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
          </div>
        ) : (
          <div className='error-box'>
            <h3>Invalid Image URL</h3>
          </div>
        )}    
      </div>
    </div>
  );
}

export default FaceRecognition;