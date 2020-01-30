import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

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

export const useFetchData =(requestURL,dataType) => {
  const [input, setInput] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const store = useSelector(state => state.store, []);
  const updateField = e => {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    });
  };
  const dataFetch = async (url,type) => {
    console.log(url);
    setIsLoading(true);
    const result = await axios.get(url);
    console.log(result);
    switch(type){
      case 'user' : 
        setInput(result.data);
        break;
      case 'timetable' :
        setInput(result.data);
        console.log('timetable');
        break;
      case 'device':
        if(store.d_No === undefined){
          setInput(result.data);
        } 
        else{
          setInput({...result.data,d_No : store.currentDeviceNo});
        }
        console.log('device');
        break;
      default : 
        setInput(result.data);
        break;
      }
    setIsLoading(false);
  };
  useEffect(() => {
    console.log("mount");
    
    dataFetch(requestURL,dataType);
  }, []);
  return {
    input,
    isLoading,
    setInput,
    setIsLoading,
    dataFetch,
    updateField
  }
}
