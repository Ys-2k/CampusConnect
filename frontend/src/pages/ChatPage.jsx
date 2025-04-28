import SideBar from '../components/SideBar'
import React, { useEffect, useState } from "react";
import { ChatData } from "../context/ChatContext.jsx";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Chat from "../components/chat/Chat";
import MessageContainer from "../components/chat/MessageContainer";
import { SocketData } from "../context/SocketContext";
import { RxCross1 } from "react-icons/rx";

const ChatPage = ({ user }) => {
  const { createChat, selectedChat, setSelectedChat, chats, setChats } =
    ChatData();

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);

  async function fetchAllUsers() {
    try {
      const { data } = await axios.get("/api/user/all?search=" + query);

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllChats = async () => {
    try {
      const { data } = await axios.get("/api/messages/chats");
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [query]);

  useEffect(() => {
    getAllChats();
  }, []);

  async function createNewChat(id) {
    await createChat(id);
    setSearch(false);
    getAllChats();
  }

  const { onlineUsers, socket } = SocketData();
  return (
    <>
      <SideBar />

      <div className='md:ml-[282px] mx-3 my-5 rounded-2xl shadow-2xl md:mr-8 p-7 bg-[#212529]'>
        <div className='flex md:flex-row gap-4 mx-auto'>
          <div className='w-[30%]'>
            <div className='top'>
              <button
                className='mb-2 bg-white text-black px-3 py-3 rounded-full'
                onClick={() => setSearch(!search)}
              >
                {search ? <RxCross1 /> : <FaSearch />}
              </button>
              {search ? (
                <>
                  <input
                    type='text'
                    className='w-full text-white p-2 border rounded-2xl'
                    placeholder='Enter name'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />

                  <div className='users'>
                    {users && users.length > 0 ? (
                      users.map(e => (
                        <div
                          key={e._id}
                          onClick={() => createNewChat(e._id)}
                          className='bg-[#52b788] text-xs overflow-hidden md:text-sm text-white p-2 mt-2 cursor-pointer flex justify-baseline items-center gap-2'
                        >
                          <img
                            src={e.profilePic.url}
                            className='w-8 h-8 rounded-full'
                            alt=''
                          />
                          {e.name}
                        </div>
                      ))
                    ) : (
                      <p>No Users</p>
                    )}
                  </div>
                </>
              ) : (
                <div className='flex flex-col justify-center items-center mt-2'>
                  {chats.map(e => (
                    <Chat
                      key={e._id}
                      chat={e}
                      setSelectedChat={setSelectedChat}
                      isOnline={onlineUsers.includes(e.users[0]._id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {selectedChat === null ? (
            <div className='w-[70%] mx-20 mt-40 text-white text-2xl'>
              Hello 👋  select a chat to start conversation
            </div>
          ) : (
            <div className='w-[70%]'>
              <MessageContainer
                selectedChat={selectedChat}
                setChats={setChats}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ChatPage
