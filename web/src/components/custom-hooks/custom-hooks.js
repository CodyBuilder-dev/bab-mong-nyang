import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { changeStore, restoreStore } from "../../modules/store";
import { TrendingUpOutlined, RepeatOneSharp } from "@material-ui/icons";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

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
          return note;
        })
      );
    },
    removeNote: idx => {
      setNotes(notes.filter((note, index) => idx !== index));
    },
    removeAll: () => {
      setNotes(notes.filter(note => !note.isRead));
    }
  };
};
export const useFetchData = (requestURL, dataType) => {
  const [input, setInput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { store, onChangeStore } = useStore();
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(["Token"]);
  const onSubmit = useCallback(async url => {
    //console.log(input);
    const result = await axios.post(url, input, { headers: store.headers });
    console.log(result);
    return result.data;
  });

  const onValidate = useCallback(async url => {
    const result = await axios({
      url: url,
      method: "get",
      headers: store.headers
    });
    return result.data;
  });

  const updateField = e => {
    let flag = undefined;
    switch (e.target.name) {
      case "u_Pw":
        if (
          input.pwcon === undefined ||
          input.pwcon === "" ||
          e.target.value === input.pwcon
        ) {
          flag = true;
        } else {
          flag = false;
        }
        break;
      case "pwcon":
        if (
          e.target.value === undefined ||
          e.target.value === "" ||
          input.u_Pw === e.target.value
        ) {
          flag = true;
        } else {
          flag = false;
        }
        break;
      default:
        break;
    }
    if (e.target.name === "hour") {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
        s_Time: e.target.value + ":" + input.minute
      });
    } else if (e.target.name === "minute") {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
        s_Time: input.hour + ":" + e.target.value
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
        pwValidated: flag
      });
    }
  };

  const dataFetch = async (url, type) => {
    setIsLoading(true);
    //console.log(store.Token);
    await axios({
      method: "GET",
      url: url,
      headers: { authorization: cookies.Token }
    })
      .then(result => {
        switch (type) {
          case "device":
          case "devicelist":
            if (store.d_No === undefined) {
              setInput(result.data.data);
            } else {
              setInput({ ...result.data.data, d_No: store.currentDeviceNo });
            }
            break;
          case "device_select":
            if (result.data.data.length === 0) {
              console.log("data없음");
              setInput({ ...input, device: [] });
            } else {
              setInput({
                device: result.data.data.filter(
                  device => device.d_No === store.u_Last
                )[0]
              });
            }
            break;
          case "user":
            //result.data.u_Pw = "";
            //result.data["u_No"] = store.u_No;
            setInput(result.data.data);
            break;
          case "feedinfo":
            setInput(result.data.data);
            break;
          case "feed_all":
            setInput(result.data.data);
            break;
          case "review":
            console.log(result)
            setInput(result.data);
            break;
          default:
            setInput(result.data);
            break;
        }
        setIsLoading(false);
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
    //console.log(result);
  };

  const isLoggedIn = () => {
    if (
      ["/", "/login", "/join", ""].indexOf(history.location.pathname) === -1 &&
      (store.u_No === "" || store.u_No === undefined)
    ) {
      return false;
    } else return true;
  };

  const getPrevState = async (requestURL, dataType) => {
    let url = store.url + requestURL;
    await axios
      .get(store.url + "/user/main/" + cookies.Token)
      .then(async response => {
        console.log(response);
        if (response.data.validation) {
          onChangeStore({
            ...response.data.data,
            headers: { authorization: cookies.Token }
          });
          // if (dataType === "maintable") {
            // dataFetch(url + response.data.data.u_Last, dataType);
          // }
          // history.replace("/main");
        } else {
          alert(response.data.message);
          history.replace("/login");
        }
      })
      .catch(error => {
        console.log(error);
        alert("로그인해주세요");
        history.replace("/login");
      });
  };

  useEffect(() => {
    console.log("mount");
    console.log(isLoggedIn());
    if (!isLoggedIn()) {
      getPrevState(requestURL, dataType);
    } else {
      //console.log(result);
      console.log(store);
      let url = store.url + requestURL;
      let flag = true;
      switch (dataType) {
        case "timetable":
        case "chart":
        case "maintable":
          url += store.u_Last;
          break;
        case "device":
          url += store.currentDeviceNo;
          break;
        case "device_select":
          if (store.u_Last === 0) flag = false;
        case "user":
        case "devicelist":
          url += store.u_No;
          break;
        case "feedinfo":
        case "feed_all":
        case "review":
          break;
        default:
          flag = false;
          break;
      }
      console.log(flag);
      if (flag) {
        dataFetch(url, dataType);
      }
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
  };
};

export const useStore = () => {
  const store = useSelector(state => state.store, []);
  const dispatch = useDispatch();
  const restore_Store = useCallback(data => dispatch(restoreStore("")), [
    dispatch
  ]);
  const change_Store = useCallback(data => dispatch(changeStore(data)), [
    dispatch
  ]);
  const onChangeStore = useCallback(async (data, type, url) => {
    switch (type) {
      case "select":
        const result = await axios.put(
          store.url + url,
          { u_No: store.u_No, d_No: data.d_No },
          { headers: store.headers }
        );
        if (result.data) {
          await change_Store({ u_Last: data.d_No });
        }
        break;
      case "restore":
        restore_Store("");
        break;
      default:
        await change_Store(data);
        break;
    }
  });
  return {
    store,
    onChangeStore
  };
};
