import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div className='text-white text-5xl font-bold flex justify-center items-center h-screen flex-col'>
        <h1 className='text-8xl'>4<span className='text-[#52b788]'>0</span>4</h1>
        <span>Page <span className='text-[#52b788]'>Not Found</span></span>
        <button onClick={()=> navigate('/')} className="bg-[#52b788] text-2xl cursor-pointer my-5 px-2 py-2 ">Visit Home</button>
    </div>
  )
}

export default NotFound