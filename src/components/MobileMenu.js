import React, { useState, useEffect } from "react"
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import { Link, useNavigate } from "react-router-dom"
import { useUserStore } from './useStore'
import axios from 'axios'

import './mobile.css'


export default function MobileMenu() {

  const logout = async (req, res) => {
    await axios.get(`http://localhost:4000/logout`).then(res => {
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
    { name: "Profile", icon: <HomeIcon />, link: '/profile' },
    { name: "Collection", icon: <HomeIcon />, link: '/collection' },
    { name: "Tea Generator", icon: <HomeIcon />, link: '/teagenerator'},
    { name: "Logout", icon: <HomeIcon />, action: logout}
  ];

  const loggedOut = [
    { name: "Collection", icon: <HomeIcon />, link: '/collection' },
    { name: "Tea Generator", icon: <HomeIcon />, link: '/teagenerator'},
    { name: "Sign In", icon: <HomeIcon />, link: '/login' },
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
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText onClick={item.action} primary={item.name} />
          </ListItem>
          </Link>
        )) : loggedOut.map((item, index) => (
          <Link to={item.link} key={index}>
          <ListItem>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
          </Link>
        ))}
      </div>);


    return (
      <div className="dropdown">
        <img onClick={() => setOpen(true)} src="https://static-00.iconduck.com/assets.00/warm-tea-icon-256x256-ubx0ccp7.png" className='mug2 fas fa-mug-hot' alt="logo"></img>
        <Drawer open={open} anchor={"top"} onClose={() => setOpen(false)}>
          {getList()}
        </Drawer>
      </div>
    );
  }
