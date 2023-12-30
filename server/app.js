import express from 'express'
import cors from 'cors'
import { getAllUsers, getUserById, createUser, getUserByPassName, getListsFromUserId, createListForUser, editNameOfList, deleteList, getListFromID, getItemsFromListId, editNameOfItem, createItem, deleteItem, getCompleteItemsFromListId, getIncompleteItemsFromListId, editCompletionOfItem } from './database.js';

const app = express()

app.use(cors());
app.use(express.json());

app.post("/createUser/:username/:password/:email",  async (req, res) =>{
  const {username, password, email} = req.params
  try {
    const result = await createUser(username, password, email);
    if (result.error) {
      res.status(500).send(result.error);
    } else {
      res.send(result);
    }
  } catch (error) {
    res.status(500).send(`Error creating user: ${error.message}`);
  }
    
})

app.get("/getUser/:username/:password",  async (req, res) =>{
    const { username, password } = req.params;

    try {

        const result = await getUserByPassName(username, password);
        
        if (result) {
     
          res.send(result);
        } else {
          res.status(404).send("User not found");
        }
      } catch (error) {
        res.status(500).send("Error fetching user");
      }
})

app.get("/getUserLists/:id",  async (req, res) =>{
  const {id} = req.params;

  try {

      const result = await getListsFromUserId(id);
      
      if (result) {
   
        res.send(result);
      } else {
        res.status(404).send("Lists not found");
      }
    } catch (error) {
      res.status(500).send("Error fetching user lists");
    }
})

app.get("/createList/:name/:id",  async (req, res) =>{
  const {name, id} = req.params;
  try {

      const result = await createListForUser(name, id);
      
      if (result) {
   
        res.send(result);
      } else {
        res.status(404).send("Data to create list not found");
      }
    } catch (error) {
      res.status(500).send("Error creating lists");
    }
})

app.get("/editListName/:newName/:list_id/:user_id",  async (req, res) =>{
  const {newName, list_id, user_id} = req.params;
  try {

      const result = await editNameOfList(newName, list_id, user_id);
      
      if (result) {
   
        res.send(result);
      } else {
        res.status(404).send("List you are trying to edit does not exist");
      }
    } catch (error) {
      res.status(500).send("Error editing list");
    }
})



app.get("/deleteList/:list_id/:user_id",  async (req, res) =>{
  const {list_id, user_id} = req.params;
  try {

      const result = await deleteList(list_id, user_id);
      
      if (result) {
   
        res.send(result);
      } else {
        res.status(404).send("List you are trying to delete does not exist");
      }
    } catch (error) {
      res.status(500).send("Error deleting list");
    }
})


app.get("/listData/:list_id",  async (req, res) =>{
  const {list_id, user_id} = req.params;
  try {

      const result = await getListFromID(list_id);
      
      if (result) {
   
        res.send(result);
      } else {
        res.status(404).send("List you are trying to delete does not exist");
      }
    } catch (error) {
      res.status(500).send("Error deleting list");
    }
})


app.get("/getItems/:list_id",  async (req, res) =>{
  const {list_id} = req.params;
  try {
      const result = await getItemsFromListId(list_id);
      if (result) {
   
        res.send(result);
      } else {
        res.status(404).send("Items are not found");
      }
    } catch (error) {
      res.status(500).send("Error finding items");
    }
})

app.get("/editItemName/:newName/:item_id/:list_id/:user_id",  async (req, res) =>{
  const {newName, item_id, list_id, user_id} = req.params;
  try {

      const result = await editNameOfItem(newName, item_id, list_id, user_id);
      
      if (result) {
   
        res.send(result);
      } else {
        res.status(404).send("Items are not found");
      }
    } catch (error) {
      res.status(500).send("Error finding items");
    }
})

app.get("/createItem/:user_id/:list_id",  async (req, res) =>{
  const { user_id, list_id} = req.params;
  try {

      const result = await createItem('New Item', user_id, list_id);
      
      if (result) {
   
        res.send(result);
      } else {
        res.status(404).send("List not found for item");
      }
    } catch (error) {
      res.status(500).send("Error creating item");
    }
})

app.get("/deleteItem/:item_id/:list_id/:user_id",  async (req, res) =>{
  const { item_id, list_id, user_id} = req.params;
  try {

      const result = await deleteItem(item_id, list_id, user_id);
      
      if (result) {
   
        res.send(result);
      } else {
        res.status(404).send("List not found for item");
      }
    } catch (error) {
      res.status(500).send("Error creating item");
    }
})

app.get("/getCompleteItems/:list_id",  async (req, res) =>{
  const {list_id} = req.params;
  try {
      const result = await getCompleteItemsFromListId(list_id);
      if (result) {
   
        res.send(result);
      } else {
        res.status(404).send("Items are not found");
      }
    } catch (error) {
      res.status(500).send("Error finding items");
    }
})

app.get("/getIncompleteItems/:list_id",  async (req, res) =>{
  const {list_id} = req.params;
  try {
      const result = await getIncompleteItemsFromListId(list_id);
      if (result) {
   
        res.send(result);
      } else {
        res.status(404).send("Items are not found");
      }
    } catch (error) {
      res.status(500).send("Error finding items");
    }
})


app.get("/setCompletionOfItem/:setTo/:item_id/:list_id/:user_id",  async (req, res) =>{
  const {setTo, item_id, list_id, user_id} = req.params;
  try {
      const result = await editCompletionOfItem(setTo, item_id, list_id, user_id);
      if (result) {
   
        res.send(result);
      } else {
        res.status(404).send("Items are not found");
      }
    } catch (error) {
      res.status(500).send("Error finding items");
    }
})



app.listen(8080)