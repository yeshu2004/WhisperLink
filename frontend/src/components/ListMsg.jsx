import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ListMsg() {
    const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getAllMsg() {
      try {
        const res = await axios.get("http://localhost:8000/api/list-msg", {
          withCredentials: true 
        });
        setMessages(res.data);;
      } catch (err) {
        console.error("Error fetching messages", err);
      }
    }
    getAllMsg();

    // bad pooling methord....later webSockets !!
    const intervalId = setInterval(getAllMsg, 5000);
    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

return (
    <div className='pt-10'>
        <h2>Messages</h2>
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

export default ListMsg
