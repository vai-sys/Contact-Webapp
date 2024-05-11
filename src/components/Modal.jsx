// import React from 'react'

// const Modal = ({isOpen,onClose,children}) => {
//   return (
//     <div>
//       {
//        isOpen &&<div>Modal</div>
//       }
//     </div>
//   )
// }

// export default Modal

import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (

      <>
      <div className=" m-auto min-h-[200px]  max-w-[40%] bg-white border p-4 z-50 relative">
        
        <div  onClick={onClose} className='flex justify-end'>
          <AiOutlineClose className='text-2xl self-end'/>
        </div>
        {children}
      </div>
      <div className='backdrop-blur h-screen w-screen absolute top-0 z-40'></div>
      
      </>
    
  );
};

export default Modal;