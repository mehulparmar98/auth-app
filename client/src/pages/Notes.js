import { useEffect, useState } from "react";
import axios from "axios";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://auth-app-21ub.onrender.com/notes",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setNotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h2>My Notes</h2>

      {notes.map((note) => (
        <div key={note._id}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Notes;