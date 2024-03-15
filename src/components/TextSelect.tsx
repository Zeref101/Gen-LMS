import React, { useState } from 'react'
import { Button } from './ui/button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TextSelect = ({ children }: { children: React.ReactNode }) => {
  const [showButton, setShowButton] = useState(false)
  const [selectedText, setSelectedText] = useState('');

  const handleMouseUp = () => {
    const newText = window.getSelection()?.toString();
    if (newText) {
      setSelectedText(newText);
      setShowButton(true);
    }
  }

  const handleButtonClick = () => {
    console.log(selectedText);
    setShowButton(false);
  }
  return (
    <div id='parent' onMouseUp={handleMouseUp} className='flex flex-col gap-4 p-2'>
      {showButton && (
        <Button onClick={handleButtonClick} className={`w-[150px]`}>Log Selected Text</Button>
      )}
      {children}
    </div>
  )
}

export default TextSelect
