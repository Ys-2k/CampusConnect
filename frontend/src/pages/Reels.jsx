import AddPost from '../components/AddPost'
import Loading from '../components/Loading'
import PostCard from '../components/PostCard'
import SideBar from '../components/SideBar'
import { PostData } from '../context/PostContext'

const Reels = () => {
  const { reels, loading } = PostData()

  return (
    <>
      <SideBar />
      <div className='md:ml-[282px] mx-3 my-5 rounded-2xl shadow-2xl md:mr-8 p-7 bg-[#212529] '>
        <AddPost types='reel' posttype='reels' />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className='md:ml-[282px] mx-3 my-5 rounded-2xl shadow-2xl md:mr-8 p-7 bg-[#212529] flex flex-col gap-8'>
          {reels && reels.length > 0 ? (
            reels.map(e => <PostCard value={e} key={e._id} type='reels' />)
          ) : (
            <p>No reels yet</p>
          )}
        </div>
      )}
    </>
  )
}

export default Reels
