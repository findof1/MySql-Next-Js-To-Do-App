'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import { LuClipboardList } from 'react-icons/lu';
import axios from 'axios';

type UserData = {
  id: number;
  username: string;
  user_password: string;
  email: string;
}

type NavBarProps = {
  loggedIn: boolean,
  openReq: ()=> void,
  username: string,
  handleLogout: ()=>void
};



const NavBar: React.FC<NavBarProps> = ({loggedIn, openReq, username, handleLogout}) => {





  return (
    <div className='h-full w-full'>


      <nav className='bg-accent border-b-4 border-neutral'>
        <ul className='flex flex-row text-3xl justify-center'>
          <li className='pt-5 pb-4'>
            <Link href='/'>
              <LuClipboardList />
            </Link>
          </li>
          <li className='pt-4 pb-4 ml-10'>
            <Link href='/'>Home</Link>
          </li>


          {loggedIn == false ?  

          <li className='ml-auto pr-10 pt-4 pb-4'>

            <button onClick={openReq}>Login</button>

          </li> 
          : 
          <>
          <li className='ml-auto pt-4 pb-4'>

            <Link href='/dashboard' >Dashboard</Link>

          </li> 
          <li className='ml-10 pr-10 pt-4 pb-4 justify-center'>
          {username}
          <button className='ml-5 text-xs' onClick={handleLogout}><Link href='/'>Logout</Link></button>

        </li>
        </> }
          
        </ul>
      </nav>








    </div>
  );
};

export default NavBar;