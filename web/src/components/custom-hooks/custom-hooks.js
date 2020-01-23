import { useState, useEffect } from "react";
import axios from "axios";
export const useNotes = (initialValue = []) => {
  const [notes, setNotes] = useState(initialValue);
  return {
    notes,
    addNote: text => {
      if (text !== "") {
        setNotes(
          notes.concat({
            text,
            isRead: false
          })
        );
      }
    },
    checkNote: idx => {
      setNotes(
        notes.map((note, index) => {
          if (idx === index) {
            note.isRead = !note.isRead;
          }

          return note;
        })
      );
    },
    checkAll: () => {
      setNotes(
        notes.map(note => {
          if (!note.isRead) {
            note.isRead = !note.isRead;
          }
          return note
        })
      );
    },
    removeNote: idx => {
      setNotes(notes.filter((note, index) => idx !== index));
    },
    removeAll: () => {
      setNotes(
        notes.filter(note => !note.isRead)
      )
    }
  };
};

export const useFetchData =(requestURL) => {
  const [input, setInput] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log("mount");
    const fetch = async () => {
      console.log(requestURL);
      setIsLoading(true);
      const result = await axios.get(requestURL);
      console.log(result);
      result.data[0].u_Pw = "";
      setInput(result.data[0]);
      setIsLoading(false);
    };
    fetch();
    //console.log(input);
  }, []);
  return {
    input,
    isLoading
  }
}
