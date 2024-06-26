import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import Modal from './Modal';
import { Formik, Form, Field } from 'formik';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleOpen = (contact) => {
    setSelectedContact(contact);
    setIsOpen(true);
  };

  const handleClose = () => {
    setSelectedContact(null);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsRef = collection(db, 'contactData');
        const contactsSnapshot = await getDocs(contactsRef);
        const contactLists = contactsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(contactLists);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContacts();
  }, []);

  const addContact = async (newContact) => {
    try {
      const contactsRef = collection(db, "contactData");
      await addDoc(contactsRef, newContact);
      setContacts([...contacts, newContact]);
      handleClose(); // Close the modal after adding contact
    } catch (err) {
      console.log(err);
    }
  };

  const deleteContact = async (id) => {
    try {
      const contactRef = doc(db, 'contactData', id);
      await deleteDoc(contactRef);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error(`Error deleting contact: ${error.message}`);
    }
  };

  const updateContact = async (updatedContact) => {
    try {
      const contactRef = doc(db, 'contactData', updatedContact.id);
      await updateDoc(contactRef, updatedContact);
      const updatedContacts = contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      );
      setContacts(updatedContacts);
      handleClose(); // Close the modal after updating contact
    } catch (error) {
      console.error(`Error updating contact: ${error.message}`);
    }
  };

  return (
    <>
      <div>
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
            <AiFillPlusCircle className='cursor-pointer text-5xl text-orange-600' onClick={() => handleOpen(null)} />
          </div>

          <div className='mt-4'>
            {contacts.map((contact) => (
              <div key={contact.id} className='flex items-center justify-between p-2 bg-yellow-100 mt-4'>
                <div className='flex items-center '>
                  <FaUserCircle size={40} color="orange"/>
                  <div className='ml-2'>
                    <h1 className='text-lg font-semibold'>{contact.name}</h1>
                    <p className='text-gray-500'>{contact.email}</p>
                  </div>
                </div>
                <div className="flex text-3xl">
                  <RiEditCircleLine className="cursor-pointer" onClick={() => handleOpen(contact)} />
                  <IoMdTrash className="cursor-pointer text-orange" onClick={() => deleteContact(contact.id)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Formik
          initialValues={{
            name: selectedContact ? selectedContact.name : '',
            email: selectedContact ? selectedContact.email : '',
          }}
          onSubmit={(values) => {
            const updatedContact = {
              id: selectedContact ? selectedContact.id : '',
              name: values.name,
              email: values.email,
            };
            if (selectedContact) {
              updateContact(updatedContact);
            } else {
              addContact(updatedContact);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-lg font-semibold">
                  Name
                </label>
                <Field
                  name="name"
                  className="border h-10 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <label htmlFor="email" className="text-lg font-semibold">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="h-10 border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="bg-orange-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-orange-700"
                disabled={isSubmitting}
              >
                {selectedContact ? 'Update' : 'Add'}
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default Home;



