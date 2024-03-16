import React from 'react'
import { useParams } from 'react-router-dom';
export default function MCQ() {
    const {quizID} = useParams();
  return (
    <div>
      {quizID}
    </div>
  )
}
