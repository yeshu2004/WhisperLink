import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ListMsg() {
  const { isAuthenticated } = useAuth();
return (
  <div className='p-4'>
    { isAuthenticated ? <AllMsg/> : <AuthLinks/> }
  </div>
)
}

export default ListMsg;

function AuthLinks() {
  return (
    <div className="flex items-center gap-5 underline">
      <Link to="/register">Register</Link>
      <Link to="/signin">SignIn</Link>
    </div>
  );
}

function AllMsg(){
  const [messages, setMessages] = useState([]);
  const [isfetching, setIsFetching] = useState(true)

  useEffect(() => {
    async function getAllMsg() {
      try {
        const res = await axios.get("http://localhost:8000/api/list-msg", {
          withCredentials: true 
        });
        console.log(res.data)
        setMessages(res.data);;
      } catch (err) {
        console.error("Error fetching messages", err);
      } finally{
        setIsFetching(()=> false)
      }
    }
    getAllMsg();

    // // bad way - pooling methord....later webSockets !!
    // const intervalId = setInterval(getAllMsg, 5000);
    // return () => clearInterval(intervalId); // cleanup on unmount
  }, []);


  if(isfetching){
    return <div>Loading...</div>;
  }

  return(
    <div className=''>
      <Link to={'/'} className='text-sm underline'>Back to home</Link>
      <h1 className='py-2'>Hi, lets see all the msg!</h1>
        <ul>
            {messages.length === 0 ? (
                <li>No messages found.</li>
            ) : (
                messages.map((msg, idx) => (
                    <div key={idx} className='flex items-center gap-2 pb-2'>
                        <h1>{msg.message}</h1>
                        <span className='text-sm text-zinc-400'>~ by anony</span>
                    </div>
                ))
            )}
        </ul>
    </div>
  )
}
