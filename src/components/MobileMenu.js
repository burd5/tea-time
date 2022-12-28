import React, { useState } from "react"
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
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

  const loggedIn = [
    { name: "Profile", icon: <HomeIcon />, link: '/profile' },
    { name: "Collection", icon: <HomeIcon />, link: '/collection' },
    { name: "Tea Generator", icon: <HomeIcon />, link: '/teagenerator'},
    { name: "Logout", icon: <HomeIcon />, link: logout}
  ];

  const loggedOut = [
    { name: "Profile", icon: <HomeIcon />, link: '/profile' },
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
          <Link onClick={item.link} key={index}>
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
        <ArrowDropDownCircleIcon sx={{fontSize: 60, cursor: 'pointer'}} onClick={() => setOpen(true)}/>
        <Drawer open={open} anchor={"top"} onClose={() => setOpen(false)}>
          {getList()}
        </Drawer>
      </div>
    );
  }
