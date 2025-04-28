import AddPost from '../components/AddPost'
import SideBar from '../components/SideBar'

const Create = () => {
  return (
    <>
      <SideBar />
      <div className='md:ml-[282px] mx-3 my-5 rounded-2xl shadow-2xl md:mr-8 p-7 bg-[#212529] '>
        <AddPost types='post' posttype='images' />
      </div>
    </>
  )
}

export default Create
