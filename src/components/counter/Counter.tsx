import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../reduxstore/hooks/hooks'
import { decrement, increment, selectCount } from '../../reduxstore/features/counter/counterSlice'
import "./Counter.css"

export function Counter() {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()

  return (
    <div className='Counter'>
        {count}
        <div onClick={()=>{dispatch(increment())}}>increment</div>
        <div onClick={()=>{dispatch(decrement())}}>decrement</div>
    </div>
  )
}