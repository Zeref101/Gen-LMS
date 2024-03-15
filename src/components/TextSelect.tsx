import React, { useState } from 'react'
import { Button } from './ui/button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TextSelect = ({ children }: { children: React.ReactNode }) => {
  const [showButton, setShowButton] = useState(false)
  const [selectedText, setSelectedText] = useState('');
  const [realtiveTop, setRelativeTop] = useState<number | null>(null)
  const [realtiveLeft, setRelativeLeft] = useState<number | null>(null)


  const handleMouseUp = () => {
    const newText = window.getSelection()?.toString();
    const range = window.getSelection()?.getRangeAt(0);
    const rect = range?.getBoundingClientRect();
    if (newText && rect) {
      setSelectedText(newText);
      setShowButton(true);
      const parentRect = document.getElementById('parent')?.getBoundingClientRect();
      if (parentRect) {
        setRelativeTop(rect.top - parentRect.top);
        setRelativeLeft(rect.left - parentRect.left);
      }
    }
  }

  const handleButtonClick = () => {
    console.log(selectedText);
    setShowButton(false);
  }
  return (
    <div id='parent' onMouseUp={handleMouseUp} className=' relative flex flex-col gap-4 p-2'>
      {showButton && (
        <Button onClick={handleButtonClick} className={`w-[150px] absolute top-[${realtiveTop}px] left-[${realtiveLeft}px]`}>Log Selected Text</Button>
      )}
      {children}
    </div>
  )
}

export default TextSelect
