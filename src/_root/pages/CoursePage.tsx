// import React from 'react'
import { useParams } from 'react-router-dom'

export default function CoursePage() {
    const {courseID} = useParams();
  return (
    <div>
      {courseID}
    </div>
  )
}
