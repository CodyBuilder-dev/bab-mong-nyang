import React,{ useState, useEffect,useCallback } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {changeStore,restoreStore} from "../../modules/store"
import { TrendingUpOutlined } from "@material-ui/icons";
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
  
  const onSubmit = useCallback(
    async (url) =>{
      console.log(input);
      const result = await axios.post(url,input,{headers : store.headers});
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
  
  const updateField = e => {
    let flag = undefined;
    switch (e.target.name){
      case "u_Pw" :
        if (
          input.pwcon === undefined ||
          input.pwcon === "" ||
          e.target.value === input.pwcon
        ){
          flag = true;
        }else{
          flag = false;
        }
        break;
      case "pwcon":
        if(
          e.target.value === undefined ||
          e.target.value === ""||
          input.u_Pw === e.target.value
        ){
          flag = true;
        }else{
          flag = false;
        }
        break;
      default:
        break; 
    }
    setInput({
      ...input,
      [e.target.name] : e.target.value,
      pwValidated : flag
    });
  };
  
  const dataFetch = async (url,type) => {
    console.log(url);
    setIsLoading(true);
    console.log(store.Token);
    const result = await axios.get(url,null,{headers : {'Authorization':store.Token+"afafaf"}});
    //const result = await axios({method: 'GET' , url : url, headers : store.headers});
    switch(type){
      case 'device':
      case 'devicelist':
        if(store.d_No === undefined){
          setInput(result.data);
        } 
        else{
          setInput({...result.data,d_No : store.currentDeviceNo});
        }
        break;
      case 'device_select':
        if(result.data.length === 0){
          console.log("data없음");
          console.log("data없음");
          setInput({...input, device : []});
        }else{
          console.log(result.data.filter(device => device.d_No === store.u_Last)[0]);
          setInput({device : result.data.filter(device => device.d_No === store.u_Last)[0]})
        }
        break;
      case 'user':
        result.data.u_Pw = "";
        result.data["u_No"] = store.u_No;
        setInput(result.data);
        break;
      default : 
        setInput(result.data);
        break;
    }
    setIsLoading(false);
    console.log(result);
  };
  
  useEffect(() => {
    console.log("mount");
    let url = store.url+requestURL;
    let flag = true;
    switch(dataType){
      case "timetable":
      case "chart":
        url+=store.u_Last;
        break;
      case "device":
        url+=store.currentDeviceNo;
        break;
      case "user":
      case "devicelist":
      case 'device_select':
        url+=store.u_No;
        break;
      default:
        flag = false;
        break;
    }
    console.log(flag);
    if(flag){
      dataFetch(url,dataType);
    }
  }, []);
  
  return {
    input,
    isLoading,
    setInput,
    setIsLoading,
    dataFetch,
    updateField,
    onSubmit,
    onValidate
  }
}

export const useStore = () =>{
  const store = useSelector(state => state.store,[]);
  const dispatch = useDispatch();
  const restore_Store = useCallback(data=> dispatch(restoreStore("")),[dispatch]);
  const change_Store = useCallback(data => dispatch(changeStore(data)),[dispatch]);
  const onChangeStore = useCallback (
    async (data,type,url) => {
      switch(type){
        case "select":
          const result = await axios.put(store.url+url,{u_No : store.u_No, d_No : data.d_No},{headers:store.headers});
          if(result.data){
            change_Store({u_Last : data.d_No});
          }
          break;
        case "restore":
          restore_Store("");
          break;
        default:
          change_Store(data);
          break;
      }
  })
  return{
    store,
    onChangeStore,
    
  };
};
