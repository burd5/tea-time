import React, { useState, useEffect } from "react"
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import CasinoIcon from '@mui/icons-material/Casino';
import { Link, useNavigate } from "react-router-dom"
import { useUserStore } from './useStore'
import axios from 'axios'

import './mobile.css'


export default function MobileMenu() {

  const logout = async (req, res) => {
    await axios.get(`https://teatime.cyclic.app/logout`).then(res => {
      if(res.data === "Logged out"){
        localStorage.clear()
        setUser('')
        navigate('/')
    }})
  }

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  const loggedIn = [
    { name: "Profile", icon: <AccountBoxIcon />, link: '/profile' },
    { name: "Collection", icon: <BookmarksIcon />, link: '/collection' },
    { name: "Tea Generator", icon: <CasinoIcon />, link: '/teagenerator'},
    { name: "Logout", icon: <LogoutIcon />, action: logout}
  ];

  const loggedOut = [
    { name: "Collection", icon: <BookmarksIcon />, link: '/collection' },
    { name: "Tea Generator", icon: <CasinoIcon />, link: '/teagenerator'},
    { name: "Sign In", icon: <LoginIcon />, link: '/login' },
  ];

    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const setUser = useUserStore(state => state.setUser)
    const user = useUserStore((state) => state.user)

    const getList = () => (
      <div className="dropdownList" onClick={() => setOpen(false)}>
        {user !== '' ? loggedIn.map((item, index) => (
          <Link to={item.link} key={index}>
          <ListItem>
            <ListItemIcon sx={{color: 'white'}}>{item.icon}</ListItemIcon>
            <ListItemText onClick={item.action} primary={item.name} />
          </ListItem>
          </Link>
        )) : loggedOut.map((item, index) => (
          <Link to={item.link} key={index}>
          <ListItem>
            <ListItemIcon sx={{color: 'white'}}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
          </Link>
        ))}
      </div>);


    return (
      <div className="dropdown">
        <img onClick={() => setOpen(true)} src="../../../public/teamug.png" className='mug2 block fas fa-mug-hot' alt="logo"></img>
        <Drawer open={open} anchor={"top"} onClose={() => setOpen(false)}>
          {getList()}
        </Drawer>
      </div>
    );
  }
