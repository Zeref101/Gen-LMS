import React, { useState } from 'react';
import { Button } from './ui/button';
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { InfinitySpin } from 'react-loader-spinner';


const TextSelect = ({ children }: { children: React.ReactNode }) => {
  const [showButton, setShowButton] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [explanation, setExplanation] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMouseUp = () => {
    const newText = window.getSelection()?.toString();
    if (newText) {
      setSelectedText(newText);
      setShowButton(true);
    }
  }

  const handleButtonClick = async () => {
    setIsLoading(true);
    setModalIsOpen(true);
    const data = await axios.get("http://127.0.0.1:8000/get_explanation", {
      params: {
        prompt: selectedText
      }
    });

    setExplanation(data.data.explanation);
    setIsLoading(false);

  }

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div id='parent' onMouseUp={handleMouseUp} className='flex flex-col gap-4 p-2'>
      {showButton && (
        <Button onClick={handleButtonClick} className={`w-[150px] bg-purple-500 hover:bg-purple-600`}>Explain</Button>
      )}
      <Modal open={modalIsOpen} onClose={closeModal} center>
        <h2>Explanation</h2>
        {isLoading ?
          <InfinitySpin
            width="200"
            color="#7e22ce"
            ariaLabel="infinity-spin-loading"
          /> :
          <p>{explanation}</p>}
      </Modal>
      {children}
    </div>
  )
}

export default TextSelect;