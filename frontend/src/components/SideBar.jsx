import { NavLink, useNavigate } from 'react-router-dom'
import { UserData } from '../context/UserContext'
import { FaHouse } from "react-icons/fa6";
import { MdCreate } from "react-icons/md";
import { BsCameraReelsFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";

const SideBar = () => {
  const { user } = UserData()
  
  const navigate = useNavigate()
  const {logoutUser} = UserData();
  const logoutHandler = ()=>{
    logoutUser(navigate)
  }
  

  return (
    <div className='md:h-screen fixed left-0 md:top-0 text-white bg-[#212529] p-2 md:p-4 md:w-[250px] bottom-0 w-full'>
      <div className='uppercase hidden md:block text-white font-bold text-2xl'>
        <h2>
          Campus<span className='text-[#52b788]'>Connect</span>
        </h2>
      </div>
      <div className='my-5 hidden md:flex  items-center gap-2'>
        <img
          className='w-16 h-16 rounded-full'
          src={user.profilePic.url}
          alt=''
        />
        <div className='flex flex-col'>
          <span>{user.name}</span>
          <small className='text-[#52b788]'>{user.email}</small>
        </div>
      </div>
      <div className='flex md:flex-col justify-between w-full h-[100%]'>
        <nav className='text-2xl md:text-xl my-5 flex md:flex-col w-full justify-between gap-2'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive
                ? 'active px-4 py-2 rounded-full flex-col md:flex-row flex items-center gap-2'
                : 'hover:bg-[#2c3136] px-4 py-2 flex flex-col md:flex-row items-center gap-2 rounded-full'
            }
          >
            <FaHouse />
            <span className='hidden md:block'>Home</span>
          </NavLink>
          <NavLink
            to='/create'
            className={({ isActive }) =>
              isActive
                ? 'active px-4 py-2 rounded-full flex-col items-center flex md:flex-row gap-2'
                : 'hover:bg-[#2c3136] flex px-4 py-2 rounded-full items-center gap-2 flex-col md:flex-row'
            }
          >
            <MdCreate />
            <span className='hidden md:block'>Create</span>
          </NavLink>
          <NavLink
            to='/reels'
            className={({ isActive }) =>
              isActive
                ? 'active px-4 py-2 rounded-full flex  flex-col md:flex-row gap-2 items-center'
                : 'hover:bg-[#2c3136] px-4 py-2 rounded-full flex gap-2 flex-col items-center md:flex-row'
            }
          >
            <BsCameraReelsFill />
            <span className='hidden md:block'>Reels</span>
          </NavLink>
          <NavLink
            to='/account'
            className={({ isActive }) =>
              isActive
                ? 'active px-4 py-2 rounded-full flex flex-col md:flex-row gap-2 items-center'
                : 'hover:bg-[#2c3136] px-4 py-2 rounded-full flex-col flex gap-2 items-center md:flex-row'
            }
          >
            <MdAccountCircle/>
            <span className='hidden md:block'>Account</span>
          </NavLink>
          <NavLink
            to='/chat'
            className={({ isActive }) =>
              isActive
                ? 'active px-4 py-2 rounded-full flex-col flex gap-2 items-center md:flex-row'
                : 'hover:bg-[#2c3136] px-4 py-2 rounded-full flex-col md:flex-row gap-2 flex items-center'
            }
          >
            <IoIosChatbubbles/>
            <span className='hidden md:block'>Chat</span>
          </NavLink>
        </nav>
        <nav className='hidden md:block text-xl absolute bottom-5'>
          <button onClick={logoutHandler} className='px-5 cursor-pointer flex items-center gap-2'><RiLogoutCircleLine/> <span>Log Out</span></button>
        </nav>
      </div>
    </div>
  )
}

export default SideBar
