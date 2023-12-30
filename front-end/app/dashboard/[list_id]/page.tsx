'use client'
import NavBar from '@/app/components/NavBar';
import ToDoItemsContainer from '@/app/components/ToDoItemsContainer';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


type UserId = {
  id: number;
  username: string;
  user_password: string;
  email: string;
};

type listData = {
  
  list_id: number;
  username: string;
  user_id: string;
  list_name: string;
};

const page = ({ params }: { params: { list_id: string } }) => {
  const [receivedData, setReceivedData] = useState<UserId>();
  const [listData, setlistData] = useState<listData>();
  const [items, setItems] = useState([])
  const [completeItems, setCompleteItems] = useState([])
  const [incompleteItems, setIncompleteItems] = useState([])
  const [editingItem, setEditingItem] = useState(-1);
  const [deletingItem, setDeletingItem] = useState(-1);

  useEffect(() => {
    const dataFromStorage = localStorage.getItem("userData");
    if (dataFromStorage) {
      setReceivedData(JSON.parse(dataFromStorage));
     
    }
    
  }, []);
  

  useEffect(() => {

      getListData(parseInt(params.list_id));

      getItems(parseInt(params.list_id))
    
    
  }, [receivedData]);

  useEffect(() => {
    if(receivedData){
      getItems(receivedData.id)
    }
    
  }, [receivedData]);

  function getItems(list_id:number) {

    getCompleteItems(list_id)
    getIncompleteItems(list_id)
    axios.get(`http://localhost:8080/getItems/${list_id}`)
    .then((res:any)=>{
      console.log(res.data)
      setItems(res.data)
    })
    
  }

  function getCompleteItems(list_id:number) {

    
    axios.get(`http://localhost:8080/getCompleteItems/${list_id}`)
    .then((res:any)=>{
      setCompleteItems(res.data)
    })
    
  }

  function getIncompleteItems(list_id:number) {

    
    axios.get(`http://localhost:8080/getIncompleteItems/${list_id}`)
    .then((res:any)=>{
      setIncompleteItems(res.data)
    })
    
  }



  function getListData(list_id:number) {
    axios.get(`http://localhost:8080/listData/${list_id}`)
    .then(res=>{
      console.log(res.data)
      setlistData(res.data[0])
    })
    .catch(err=>(console.log(err)))
  }

  const handleEdit = (e:any)=>{
    e.preventDefault();
    const newName = e.target.elements.listName.value;
    if(receivedData){
      axios.get(`http://localhost:8080/editItemName/${newName}/${editingItem}/${params.list_id}/${receivedData.id}`)
      .then(res=>{
        setSetItems(res.data)
        
      })
      .catch(err=>{console.log(err)})
    }
    setEditingItem(-1);
  }

  const handleDelete = ()=>{
  
    if(receivedData){
      axios.get(`http://localhost:8080/deleteItem/${deletingItem}/${params.list_id}/${receivedData.id}`)
      .then(res=>{
        setSetItems(res.data)
      })
      .catch(err=>{console.log(err)})
    }
    setDeletingItem(-1);
  }

  const createNewItem= ()=>{
    if(receivedData){
      axios.get(`http://localhost:8080/createItem/${receivedData.id}/${params.list_id}`)
      .then(res => {
        console.log(res.data)
        setSetItems(res.data);
      })
      .catch(err=>{console.log(err)})
      }
  }

  function setSetItems(data:any){
    setItems(data)
    getCompleteItems(parseInt(params.list_id))
    getIncompleteItems(parseInt(params.list_id))
  }

  function handleComplete(item_id:number){
    axios.get(`http://localhost:8080/setCompletionOfItem/${1}/${item_id}/${params.list_id}/${receivedData?.id}`)
    .then(res => {
      console.log(res.data)
      setSetItems(res.data)
    })
    .catch(err=>(console.log(err)))
  }

  function handleIncomplete(item_id:number){
    axios.get(`http://localhost:8080/setCompletionOfItem/${0}/${item_id}/${params.list_id}/${receivedData?.id}`)
    .then(res => {
      console.log(res.data)
      setSetItems(res.data)
    })
    .catch(err=>(console.log(err)))
  }
  return (
    <>
       <NavBar
        loggedIn={true}
        openReq={() => {}}
        username={receivedData ? receivedData.username : ""} handleLogout={()=>{localStorage.removeItem('userData'); 
        setReceivedData(undefined); setItems([])}}
      ></NavBar>
      <div className="flex flex-row gap-0 h-screen w-full fixed">
        <div className=" w-1/4 h-screen relative flex flex-col items-center bg-gray-500">
          <button className="btn bg-green-500 hover:bg-green-400 h-20 min-h-20 pl-24 pr-24 text-3xl mt-12 border-none pb-5 " onClick={createNewItem}>
            Create New Thing To Do
          </button>
        </div>
        <div className="border-l-8 border-black w-3/4 bg-gray-400 flex flex-col">
              <p className="underline text-5xl self-center">{listData?listData.list_name: ''}</p>
          <div className='flex flex-row'>
    
              <div className="flex flex-col items-center w-1/2">
              <p className="underline text-3xl self-center">Not Completed</p>
                <ToDoItemsContainer items={incompleteItems} handleEdit={handleEdit} editingItem={editingItem} setEditingItem={setEditingItem} handleDelete={handleDelete} deletingItem={deletingItem} setDeletingItem={setDeletingItem} 
                params={`btn btn-square btn-neutral  mr-2`} handleComplete={handleComplete}>
                
                </ToDoItemsContainer>
              </div>
              <div className="flex flex-col items-center w-1/2">
              <p className="underline text-3xl self-center">Completed</p>
                <ToDoItemsContainer items={completeItems} handleEdit={handleEdit} editingItem={editingItem} setEditingItem={setEditingItem} handleDelete={handleDelete} deletingItem={deletingItem} setDeletingItem={setDeletingItem}
                params={`btn btn-square bg-green-500 mr-2`} handleComplete={handleIncomplete}>
               
                </ToDoItemsContainer>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page