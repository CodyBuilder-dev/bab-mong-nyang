import React,{ useState, useEffect,useCallback } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {changeStore} from "../../modules/store"
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
  const [input, setInput] = useState({device : []});
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
    switch(type){
      case 'chart':
        setInput(result.data)
        break
      case 'device':
      case 'devicelist':
        if(store.d_No === undefined){
          setInput(result.data);
        } 
        else{
          setInput({...result.data,d_No : store.currentDeviceNo});
        }
        console.log('device');
        break;
      case 'device_select':
        setInput(result.data.filter(device=>device.d_No === store.u_Last)[0]);
        console.log("device_select");
        //console.log(result.data);
        break;
      default : 
        setInput(result.data);
        break;
      }
    setIsLoading(false);
    console.log(result.data);
  };
  useEffect(() => {
    console.log("mount");
    let url = store.url+requestURL;
    switch(dataType){
      case "timetable":
        url+=store.u_Last;
        break;
      case "chart":
        url+=store.u_Last;
        break;
      case "device":
        url+=store.currentDeviceNo;
        break;
      default :
        url+=store.currentUserNo;
        break;
    }
    dataFetch(url,dataType);
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

export const useStore = () =>{
  const store = useSelector(state => state.store,[]);
  const dispatch = useDispatch();
  const change_Store = useCallback(data => dispatch(changeStore(data)),[dispatch]);
  const onChangeStore = useCallback (
    async (data,type,url) => {
      switch(type){
        case "select":
          const result = await axios.put(store.url+url,{u_No : store.currentUserNo, d_No : data.d_No});
          if(result.data){
            change_Store({u_Last : data.d_No});
          }
          break;
        default:
          change_Store(data);
          break;
      }
  })
  return{
    store,
    onChangeStore
  };
};

export const useInput = () =>{
  const [input,setInput] = useState({});
  const onChangeInput = useCallback(
    param =>{
    setInput({...input,...param});
    console.log(input);
    }
  )
  
  const onSubmit = useCallback(
    async (url) =>{
      console.log(input);
      const result = await axios.post(url,input);
      console.log(result);
      return result.data;
    }
  )
  const onValidate =useCallback(
    async url =>{
      const result = await axios.get(url);
      return result.data;
    }
  )
  return{
    input,
    setInput,
    onChangeInput,
    onSubmit,
    onValidate
  }
}
