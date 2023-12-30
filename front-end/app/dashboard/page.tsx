"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ToDoListContainer from "../components/ToDoListContainer";
import axios from "axios";

type UserId = {
  id: number;
  username: string;
  user_password: string;
  email: string;
};

export default function Page() {
  const [receivedData, setReceivedData] = useState<UserId>();
  const [lists, setLists] = useState([]);
  const [editingList, setEditingList] = useState(-1);
  const [deletingList, setDeletingList] = useState(-1);

  useEffect(() => {
    const dataFromStorage = localStorage.getItem("userData");
    if (dataFromStorage) {
      setReceivedData(JSON.parse(dataFromStorage));
     
    }
    
  }, []);

  useEffect(() => {
    if(receivedData){
      getLists(receivedData.id)
    }
    
  }, [receivedData]);

  async function getLists(id:number|undefined){
    axios.get(`http://localhost:8080/getUserLists/${id}`)
    .then(res => {
      setLists(res.data);
      console.log(res.data)
    }).catch(error => {
      console.log(error);
    });
  }

  function createNewList(){
    if(receivedData){
    axios.get(`http://localhost:8080/createList/New List/${receivedData.id}`)
    .then(res => {
      setLists(res.data);
    })
    .catch(err=>{console.log(err)})
    }
  }
  

  const handleEdit = (e:any)=>{
    e.preventDefault();
    
    const newName = e.target.elements.listName.value;
    if(receivedData){
      axios.get(`http://localhost:8080/editListName/${newName}/${editingList}/${receivedData.id}`)
      .then(res=>{
        setLists(res.data)
      })
      .catch(err=>{console.log(err)})
    }
    setEditingList(-1);
  }

  const handleDelete = ()=>{
 
    if(receivedData){
      axios.get(`http://localhost:8080/deleteList/${deletingList}/${receivedData.id}`)
      .then(res=>{
        setLists(res.data)
      })
      .catch(err=>{console.log(err)})
    }
    setDeletingList(-1);
  }

  return (
    <>
      <NavBar
        loggedIn={true}
        openReq={() => {}}
        username={receivedData ? receivedData.username : ""} handleLogout={()=>{localStorage.removeItem('userData'); 
        setReceivedData(undefined); setLists([])}}
      ></NavBar>
      <div className="flex flex-row gap-0 h-screen w-full fixed">
        <div className=" w-1/4 h-screen relative flex flex-col items-center bg-gray-500">
          <button className="btn bg-green-500 hover:bg-green-400 h-20 min-h-20 pl-24 pr-24 text-3xl mt-12 border-none pb-10 " onClick={createNewList}>
            Create New List
          </button>
        </div>
        <div className="border-l-8 border-black w-3/4 bg-gray-400 flex flex-col">
          <p className="underline text-5xl self-center">To-Do Lists</p>
          <div className="flex flex-col items-center">
            <ToDoListContainer lists={lists} handleEdit={handleEdit} editingList={editingList} setEditingList={setEditingList} handleDelete={handleDelete} deletingList={deletingList} setDeletingList={setDeletingList}></ToDoListContainer>
          </div>
        </div>
      </div>
    </>
  );
}
