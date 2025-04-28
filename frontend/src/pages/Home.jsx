import Loading from '../components/Loading'
import PostCard from '../components/PostCard'
import Search from '../components/Search'
import SideBar from '../components/SideBar'
import { PostData } from '../context/PostContext'

const Home = () => {
  const { posts, reels, loading } = PostData()
  return (
    <section>
      <SideBar />
      {loading ? (
        <Loading />
      ) : (
        <div className='md:ml-[282px] mx-3 my-5 rounded-2xl shadow-2xl md:mr-8 p-7 bg-[#212529] flex flex-col gap-8'>
          <Search />
          {posts && posts.length > 0 ? (
            posts.map(e => <PostCard value={e} key={e._id} type='post' />)
          ) : (
            <p>No Posts yet</p>
          )}
          {reels && reels.length > 0 ? (
            reels.map(e => <PostCard value={e} key={e._id} type='reels' />)
          ) : (
            <p>No reels yet</p>
          )}
        </div>
      )}
    </section>
  )
}

export default Home
