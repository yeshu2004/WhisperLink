import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AudioRecorder from "./AudioRecorder";

function GeneratedLinkPage() {
  const { linkName } = useParams();
  const [message, setMessage] = useState("");
  const [owner, setOwner] = useState(null);
  const [ownerId, setOwnerId] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:8000/api/link/${linkName}`);
        console.log(res.data)
        setOwner(()=> res.data.username)
        setOwnerId(()=>res.data._id)
        setLoading(()=>false)
      } catch (err) {
        console.error("Error fetching link data", err);
      }
    }

    fetchData();
  },[linkName]);

  // console.log({ owner, ownerId, linkName });

  const handleSubmit = async (e) => {
     e.preventDefault();
     const res = await axios.post(`http://localhost:8000/api/send-msg/${linkName}`,{message})
     alert(res.data.message)
     setMessage("")
  }

  if(loading){
    return(
      <div className="p-4">Loading....</div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">
        Let's be anonymous to <span className="text-blue-500">{owner}</span>
      </h1>
      
      {/* for text based input...*/}
      <h1 className="text-xl">Send an Text wisper...</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <textarea
          className="w-1/3 border rounded p-2 mb-4"
          rows="5"
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-fit"
        >
          Send Anonymously
        </button>
      </form>
      <h1 className="pt-5 pb-2 text-xl">Share a Audio wisper...</h1>

      {/* for  audio notes input...*/}      
      {owner &&  ownerId && linkName && <AudioRecorder owner={owner} ownerId={ownerId} linkName={linkName} />}
    </div>
  );
}

export default GeneratedLinkPage;
