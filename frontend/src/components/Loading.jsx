import React from 'react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-[#212529]'>
      <div className='relative'>
        <div className='w-24 h-24 border-4 border-dashed rounded-full animate-spin border-[#52b788]'></div>
        <div className='absolute top-0 left-0 w-24 h-24 flex items-center justify-center'>
          <div className='w-16 h-16 bg-gradient-to-tr from-[#52b788] to-[#74c69d] rounded-full animate-pulse'></div>
        </div>
      </div>
    </div>
  )
}

export default Loading

export const LoadingAnimation = () => {
  return (
    <div className='inline-block w-5 h-5 border-2 border-t-2 rounded-full animate-spin border-r-transparent border-red-500'></div>
  )
}
