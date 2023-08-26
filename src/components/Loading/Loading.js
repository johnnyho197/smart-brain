import React from 'react';
import { ClipLoader } from 'react-spinners';
import './Loading.css'

function LoadingSpinner() {
  return (
    <div className="loader-container">
      <div className="center">
        <ClipLoader color={'#fff'} size={50} />
      </div>
    </div>
  );
}

export default LoadingSpinner;
