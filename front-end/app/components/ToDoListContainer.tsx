import Link from "next/link";
import React, { ReactNode, useState } from "react";

type containerParams = {
  lists:any[];
  handleEdit: (e:any)=>void;
  editingList: number;
  setEditingList: (list_id:number)=>void;
  handleDelete:()=>void;
  deletingList:number;
  setDeletingList:(list_id:number)=>void;
}

const ToDoListContainer: React.FC<containerParams> = ({ lists, handleEdit, editingList, setEditingList, handleDelete, deletingList, setDeletingList }) => {









  return (
    <div className="flex flex-col items-center w-full">
      {lists.map((item: any, index: number) => {
        if (editingList === lists[index].list_id) {
          return (
            <div
            key={index}
            className="min-w-3/4 w-3/4 max-h-1/6 min-h-1/6 text-left border-4 border-black bg-blue-600 mt-3 text-xl p-4 rounded-3xl font-semibold pl-12 flex flex-row"
          >
            <form className="flex flex-row w-full" onSubmit={handleEdit}>
                <input type="text" placeholder={item.list_name} name="listName" className="bg-blue-600 text-black border-none"/>
                <button type='submit' className="ml-auto">Save Changes</button>
                <button className="ml-12" onClick={() => { setEditingList(-1); }}>Cancel</button>
            </form>
          </div>
          );
        } else if(deletingList === lists[index].list_id){

          return(
            <div
              key={index}
              className="min-w-3/4 w-3/4 max-h-1/6 min-h-1/6 text-left border-4 border-black bg-blue-600 mt-3 text-xl p-4 rounded-3xl font-semibold pl-12 flex flex-row text-red-500"
            >
              <button className="" onClick={handleDelete}>Confirm Delete</button>
              <p className="ml-auto">Are You Sure?</p>
              
             <button className="ml-10" onClick={()=>{setDeletingList(-1)}}>Cancel Delete</button>
            </div>
          );

          
        }else{

          return (
            <div
              key={index}
              className="min-w-3/4 w-3/4 max-h-1/6 min-h-1/6 text-left border-4 border-black bg-blue-600 mt-3 text-xl p-4 rounded-3xl font-semibold pl-12 flex flex-row"
            >
              {item.list_name}
              <button className="ml-auto" onClick={()=>{setDeletingList(lists[index].list_id)}}>Delete List</button>
              <Link className="ml-10" href={`/dashboard/${lists[index].list_id}`}>Edit List</Link>
             <button className="ml-10" onClick={()=>{setEditingList(lists[index].list_id);}}>Edit Name</button>
            </div>
          );



        }
      })}
    </div>
  );
}
export default ToDoListContainer;
