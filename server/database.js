import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();


export async function getAllUsers() {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error(`Error fetching all users: ${error.message}`);
    return {error: `Error fetching all users: ${error.message}`}
  }
}

export async function getUserById(id) {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    console.error(`Error fetching user by ID: ${error.message}`);
    return {error: `Error fetching user by ID: ${error.message}`}
  }
}

export async function getUserByPassName(username, password) {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ? and user_password = ?', [username, password]);
    return rows[0];
  } catch (error) {
    console.error(`Error fetching user by password and username: ${error.message}`);
    return {error: `Error fetching user by password and username: ${error.message}`}
  }
}

export async function createUser(username, user_password, email) {
  try {
    const [result] = await pool.query('INSERT INTO users(username, user_password, email) VALUES (?, ?, ?);', [username, user_password, email]);
    const id = result.insertId;
    return getUserById(id);
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    return {error: `${error.message}`}
  }
}

export async function deleteUser(id) {
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return getAllUsers();
  } catch (error) {
    console.error(`Error deleting user: ${error.message}`);
    return {error: `Error deleting user: ${error.message}`}
  }
}

export async function getListsFromUserId(id){
  try {
     const [result] = await pool.query('SELECT users.id, lists.list_id, users.username, lists.list_name FROM lists INNER JOIN users ON lists.user_id=users.id where users.id = ?;', [id])
    return result
  }
  catch(error) {
    console.error(`Error getting lists from user: ${error.message}`);
    return {error: `Error getting lists from user: ${error.message}`}
  }
}

export async function getListFromID(list_id){
  try {
     const [result] = await pool.query('SELECT users.id, lists.list_id, users.username, lists.list_name FROM lists INNER JOIN users ON lists.user_id=users.id where list_id = ?;', [list_id])
    return result
  }
  catch(error) {
    console.error(`Error getting list: ${error.message}`);
    return {error: `Error getting list: ${error.message}`}
  }
}

export async function createListForUser(name, id){
  try {
    const [result] = await pool.query('insert into lists(list_name, user_id) values(?,?)', [name, id])
    return await getListsFromUserId(id);
 }
 catch(error) {
   console.error(`Error creating list: ${error.message}`);
   return {error: `Error creating list: ${error.message}`}
 }
}

export async function editNameOfList(newName, list_id, user_id){
  try {
    const result = await pool.query('UPDATE lists SET list_name = ? WHERE list_id = ?;', [newName, list_id])
    return await getListsFromUserId(user_id);
 }
 catch(error) {
   console.error(`Error updating list: ${error.message}`);
   return {error: `Error updating list: ${error.message}`}
 }
}

export async function deleteList(list_id, user_id){
  try {
    await deleteAllItemsInAList(list_id, user_id)
    const result = await pool.query('delete from lists where list_id=?', [list_id])
    
    return await getListsFromUserId(user_id);
 }
 catch(error) {
   console.error(`Error deleting list: ${error.message}`);
   return {error: `Error deleting list: ${error.message}`}
 }
}

export async function createItem(name, user_id, list_id) {
  try {
    const [result] = await pool.query('INSERT INTO items(item_name, complete, user_id, list_id) VALUES (?, false, ?, ?);', [name, user_id, list_id]);
    return getItemsFromListId(list_id);
  } catch (error) {
    console.error(`Error creating Item: ${error.message}`);
    return {error: `${error.message}`}
  }
}

export async function getItemFromItemId(id){
  try {
     const [result] = await pool.query('SELECT * from items where item_id = ?;', [id])
    return result
  }
  catch(error) {
    console.error(`Error getting Item: ${error.message}`);
    return {error: `Error getting Item: ${error.message}`}
  }
}

export async function editNameOfItem(newName, item_id, list_id, user_id){
  try {
    const result = await pool.query('UPDATE items SET item_name = ? WHERE item_id = ? and list_id = ? and user_id=?;', [newName,item_id, list_id, user_id])
    return await getItemsFromListId(list_id);
 }
 catch(error) {
   console.error(`Error updating item name: ${error.message}`);
   return {error: `Error updating item name: ${error.message}`}
 }
}

export async function getItemsFromListId(id){
  try {
     const [result] = await pool.query('SELECT * from items where list_id = ?;', [id])
    return result
  }
  catch(error) {
    console.error(`Error getting items: ${error.message}`);
    return {error: `Error getting items: ${error.message}`}
  }
}

export async function editCompletionOfItem(complete, item_id, list_id, user_id){
  try {
    const result = await pool.query('UPDATE items SET complete = ? WHERE item_id = ? and list_id = ? and user_id=?;', [complete,item_id, list_id, user_id])
    return await getItemsFromListId(list_id);
 }
 catch(error) {
   console.error(`Error updating item completion: ${error.message}`);
   return {error: `Error updating item completion: ${error.message}`}
 }
}

export async function deleteItem(item_id, list_id, user_id){
  try {
    const result = await pool.query('delete from items where item_id = ? and list_id=? and user_id = ?', [item_id, list_id, user_id])
    return await getItemsFromListId(list_id);
 }
 catch(error) {
   console.error(`Error deleting item: ${error.message}`);
   return {error: `Error deleting item: ${error.message}`}
 }
}


export async function deleteAllItemsInAList(list_id, user_id){
  try {
    const result = await pool.query('delete from items where list_id=? and user_id = ?', [list_id, user_id])
    return ''
 }
 catch(error) {
   console.error(`Error deleting item: ${error.message}`);
   return {error: `Error deleting item: ${error.message}`}
 }
}

export async function getCompleteItemsFromListId(id){
  try {
     const [result] = await pool.query('SELECT * from items where list_id = ? and complete = true;', [id])
    return result
  }
  catch(error) {
    console.error(`Error getting items: ${error.message}`);
    return {error: `Error getting items: ${error.message}`}
  }
}

export async function getIncompleteItemsFromListId(id){
  try {
     const [result] = await pool.query('SELECT * from items where list_id = ? and complete = false;', [id])
    return result
  }
  catch(error) {
    console.error(`Error getting items: ${error.message}`);
    return {error: `Error getting items: ${error.message}`}
  }
}
