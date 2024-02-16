import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../reduxstore/hooks/hooks'
import { decrement, increment, selectCount } from '../../reduxstore/features/counter/counterSlice'


export function Counter() {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()

  return (
    <div>
        {count}
        <div onClick={()=>{dispatch(increment())}}>increment</div>
        <div onClick={()=>{dispatch(decrement())}}>decrement</div>
    </div>
  )
}