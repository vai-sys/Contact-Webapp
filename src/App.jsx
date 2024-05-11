
import React from 'react'
import Home from './components/Home'

const App = () => {
  return (
    <>
    <div>
      <Home/>
    </div>
    
    </>
  )
}

export default App














// import { useEffect, useState } from 'react';
// import './App.css';
// import Navbar from './components/Navbar';
// import { AiFillPlusCircle } from 'react-icons/ai';
// import { FaUserCircle } from 'react-icons/fa';
// import { FiSearch } from 'react-icons/fi';
// import { collection, getDocs } from 'firebase/firestore'; // Import getDocs from Firestore
// import {db} from './config/firebase'; // Import the Firebase db instance
// import { IoMdTrash } from "react-icons/io";
// import { RiEditCircleLine } from "react-icons/ri";

// function App() {
//   const [contacts, setContact] = useState([]);
//   const[isopen,setOpen]=useState(false);
//   const onOpen=()=>{
//     setOpen(true);
//   }
//   const onClose=()=>{
//     setOpen(false);
//   }

//   useEffect(() => {
//     const getContact = async () => {
//       try {
//         const contactsRef = collection(db, 'contactData');
//         const contactsSnapshot = await getDocs(contactsRef);
//         const contactLists = contactsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setContact(contactLists);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     getContact();
//   }, []);

  // return (
  //   <>
      {/* <div>
        <div className='max-w-[370px] mx-auto px-4 '>
          <Navbar />
          <div className='flex gap-2'>
            <div className='relative flex flex-grow items-center'>
              <FiSearch className='absolute ml-1 text-3xl text-black' />
              <input
                type='text'
                className='h-10 flex-grow rounded-md border border-black bg-transparent pl-9 text-black'
              />
            </div>
            <AiFillPlusCircle className='cursor-pointer text-5xl text-orange-600' />
          </div>

          <div className='mt-4'>
            {contacts.map((contact) => (
              <div key={contact.id} className='flex items-center justify-between p-2 bg-yellow-100  mt-4'>
                <div className='flex items-center '>
                <FaUserCircle size={40} color="orange"/>
                  <div className='ml-2'>
                    <h1 className='text-lg font-semibold'>{contact.name}</h1>
                    <p className='text-gray-500'>{contact.email}</p>
                  </div>
                </div>
                <div className="flex text-3xl">
          <RiEditCircleLine  className="cursor-pointer" />
          <IoMdTrash
          
            className="cursor-pointer text-orange"
          />
        </div>
              </div>
            ))}
          </div>
          
        </div>
       
      </div> */}
    {/* </>
  );
}

export default App; */}
