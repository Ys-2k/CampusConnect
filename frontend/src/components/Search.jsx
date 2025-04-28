import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingAnimation } from "../components/Loading";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  async function fetchUsers() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/all?search=" + search);

      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="">
      <div className="flex justify-center items-center flex-col pt-5">
        <div className="border w-full p-1 px-2 rounded-lg text-white flex justify-between items-center gap-4">
          <input
            type="text"
            className="text-white outline-0 border-none"
            placeholder="Enter Name"
            value={search}
            required
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={fetchUsers}
            className="px-3 py-1 bg-[#52b788] text-white rounded-md"
          >
            Search
          </button>
        </div>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            {users && users.length > 0 ? (
              users.map((e) => (
                <Link
                  key={e._id}
                  className="mt-3 px-3 w-full py-2 bg-gray-300 rounded-md flex  items-center gap-3"
                  to={`/user/${e._id}`}
                >
                  <img
                    src={e.profilePic.url}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />{" "}
                  {e.name}
                </Link>
              ))
            ) : (
              <p className="text-white mt-2">Search Users!</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;