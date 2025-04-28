import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserData } from "./UserContext";

const EndPoint = "https://mern-social-3e3m.onrender.com";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = UserData();

  useEffect(() => {
    if (!user?._id) return;  // 🚨 Don't connect until user._id is ready

    const socketInstance = io(EndPoint, {
      query: { userId: user._id },
      transports: ["websocket"], // 🚨 Use websocket only (not polling)
      withCredentials: true,     // 🚨 Allow credentials
    });

    setSocket(socketInstance);

    socketInstance.on("getOnlineUser", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect(); // 🚨 use disconnect not close
      }
    };
  }, [user?._id]); // depend on user._id

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const SocketData = () => useContext(SocketContext);
