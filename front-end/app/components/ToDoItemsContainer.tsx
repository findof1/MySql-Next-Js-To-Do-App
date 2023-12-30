import Link from "next/link";
import React, { ReactNode, useState } from "react";

type containerParams = {
  items:any[];
  handleEdit: (e:any)=>void;
  editingItem: number;
  setEditingItem: (item_id:number)=>void;
  handleDelete:()=>void;
  deletingItem:number;
  setDeletingItem:(item_id:number)=>void;
  params: string;
  handleComplete: (item_id:number)=>void
}

const ToDoItemsContainer: React.FC<containerParams> = ({ items, handleEdit, editingItem, setEditingItem, handleDelete, deletingItem, setDeletingItem, params, handleComplete}) => {






  return (
    <div className="flex flex-col items-center w-full">
      {items.map((item: any, index: number) => {
        if (editingItem === items[index].item_id) {
          return (
            <div
            key={index}
            className="min-w-3/4 w-3/4 max-h-1/6 min-h-1/6 text-left border-4 border-black bg-blue-600 mt-3 text-sm p-4 rounded-3xl font-semibold pl-12 flex flex-row"
          >
            <form className="flex flex-row w-full" onSubmit={handleEdit}>
                <input type="text" placeholder={item.item_name} name="listName" className="bg-blue-600 text-black border-none w-1/2"/>
                <button type='submit' className="ml-auto">Save Changes</button>
                <button className="ml-4" onClick={() => { setEditingItem(-1); }}>Cancel</button>
            </form>
          </div>
          );
        } else if(deletingItem === items[index].item_id){

          return(
            <div
              key={index}
              className="min-w-3/4 w-3/4 max-h-1/6 min-h-1/6 text-left border-4 border-black bg-blue-600 mt-3 text-sm p-4 rounded-3xl font-semibold pl-12 flex flex-row text-red-500"
            >
              <button className="" onClick={handleDelete}>Confirm Delete</button>
              <p className="ml-auto">Are You Sure?</p>
              
             <button className="ml-4" onClick={()=>{setDeletingItem(-1)}}>Cancel Delete</button>
            </div>
          );

          
        }else{

          return (
            <div
              key={index}
              className="min-w-3/4 w-3/4 max-h-1/6 min-h-1/6 text-left border-4 border-black bg-blue-600 mt-3 text-sm p-4 rounded-3xl font-semibold pl-1 flex flex-row items-center"
            >
              <button className={params} onClick={()=>{handleComplete(items[index].item_id)}}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg> </button>

              {item.item_name}
              <button className="ml-auto" onClick={()=>{setDeletingItem(items[index].item_id)}}>Delete Item</button>
             <button className="ml-10" onClick={()=>{setEditingItem(items[index].item_id);}}>Edit Name</button>
            </div>
          );



        }
})}
    </div>
  );
}
export default ToDoItemsContainer;
