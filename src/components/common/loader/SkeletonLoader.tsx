import React from 'react'
import "./SkeletonLoader.css"
import { CircularProgress } from '@mui/material'
const SkeletonLoader = () => {
  return (
    <div className='SkeletonLoader'>
      <CircularProgress />
    </div>
  )
}

export default SkeletonLoader
