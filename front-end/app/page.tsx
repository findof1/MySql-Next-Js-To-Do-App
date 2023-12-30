'use client'
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import axios from "axios";

type UserData = {
  id: number;
  username: string;
  user_password: string;
  email: string;
}

export default function Home() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({id: -1, username: '', user_password:'', email:''});
  const [errData, setErrData] = useState('‎')
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
    setErrData('‎')
  };

  const handleOpenSignUpModal = () => {
    setShowSignUpModal(true);
  };



  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const username = formData.get('username');
    const password = formData.get('password');
    const passwordConfirm = formData.get('confirmPassword');
    const email = formData.get('email');
    if(password == passwordConfirm){

    axios.post(`http://localhost:8080/createUser/${username}/${password}/${email}`)
    .then((res)=>{
      handleCloseSignUpModal()
      localStorage.setItem('userData', JSON.stringify(res.data));
      setLoggedIn(true);
      setUserData(res.data)
    })
    .catch((err:any)=>{
      const errResData = err.response.data
      console.log(errResData)

      if(errResData.includes('users.username')){
      setErrData('Your username is already taken.')
      }
      if(errResData.includes('users.email')){
      setErrData('Your email is already taken.')
    }
    }
    
    )


  }else{
    console.log('Err: Password and Confirm Password were not the same')
    setErrData('Your Password and Confirm Password are not the same')
  }
  }



  const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    axios.get(`http://localhost:8080/getUser/${username}/${password}`)
    .then(res => {
       handleCloseLoginModal();
       setLoggedIn(true);

       localStorage.setItem('userData', JSON.stringify(res.data));
       setUserData(res.data)
     })
    .catch(error => {
      console.log(error);
      setErrData('Login Failed. Try checking your spelling or if you entered your username and password in correctly.')
    });
  }

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    setErrData('‎')
  };

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };


  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData && loadingData) {
      const parsedUserData = JSON.parse(savedUserData);
      if (parsedUserData.id !== userData.id) {

        setUserData(parsedUserData);
        setLoggedIn(true);
      }
      setLoadingData(false);
     
    }
  }, [loadingData, userData.id, setLoadingData, setLoggedIn]);


  return (
    <div>
      <NavBar loggedIn={loggedIn} openReq={handleOpenLoginModal} username={userData.username} 
      handleLogout={()=>{localStorage.removeItem('userData'); 
       setLoggedIn(false); setUserData({id: -1, username: '', user_password:'', email:''})}}/>
      <div
        className="bg-white h-screen w-full fixed flex justify-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="pt-36">
          <h1 className="text-6xl font-bold text-gray-800 text-center">
            Make Your To-Do List
          </h1>
          <h1 className="text-6xl font-bold text-gray-800 text-center mt-8">
            Today!
          </h1>
          <button className="btn btn-neutral btn-lg ml-60 mt-10" onClick={handleOpenSignUpModal}>Get Started</button>
        </div>
        
      </div>
      {showSignUpModal && (<Modal handleClose={handleCloseSignUpModal}>
        <h2 className='text-5xl mb-10'>Register An Account</h2>
        <form className='form-control ' onSubmit={handleCreateUser}>
          <div className='flex flex-row mb-4'>
            <label className='label text-xl'>Username:</label>
            <input name='username' type='text' className='input input-bordered input-primary input-sm text-xl'></input>
          </div>
          <div className='flex flex-row mb-4'>
            <label className='label text-xl'>Password:</label>
            <input name='password' type='password' className='input input-bordered input-primary input-sm text-xl'></input>
          </div>
          <div className='flex flex-row mb-4'>
            <label className='label text-xl'>Confirm Password:</label>
            <input name='confirmPassword' type='password' className='input input-bordered input-primary input-sm text-xl'></input>
          </div>
          <div className='flex flex-row mb-4'>
            <label className='label text-xl'>Email:</label>
            <input name='email' type='email' className='input input-bordered input-primary input-sm text-xl'></input>
          </div>
          <p className="text-sm mb-4">{errData}</p>
          <button className='btn btn-primary mb-4 text-xl' type="submit">Register</button>
        </form>
      </Modal>)}
      {showLoginModal && (<Modal handleClose={handleCloseLoginModal}>
        <h2 className='text-6xl mb-10'>Sign In</h2>
        <form className='form-control' onSubmit={handleLogIn}>
          <div className='flex flex-row mb-10'>
            <label className='label text-2xl'>Username:</label>
            <input name='username' type='text' className='input input-bordered imput-primary input-md text-2xl' />
          </div>
          <div className='flex flex-row mb-10'>
            <label className='label text-2xl'>Password:</label>
            <input name='password' type='password' className='input input-bordered imput-primary input-md text-2xl' />
          </div>
          <p className='text-sm mb-4'>{errData}</p>
          <button className='btn btn-primary mb-16 text-2xl' type='submit'>Sign In</button>
        </form>
      </Modal>)}
    </div>
  );
}