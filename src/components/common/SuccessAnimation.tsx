import React from 'react';
import Lottie from "lottie-react";
import successAnimation from '../../assets/success.json'

const SuccessAnimation = ({message}:{message:string}) => {
  const defaultOptions = {
    animationData: successAnimation
  };
  const style = {
    height: 200,
    width:200
  };

  return(
        <div className='flex flex-col absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-80'> 
            <Lottie animationData={successAnimation} style={style}/>
            <p>{message}</p>
        </div>
        )
};

export default SuccessAnimation;
