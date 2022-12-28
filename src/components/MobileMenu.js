import React, { useState } from "react"
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { Link } from "react-router-dom"

import './mobile.css'

const data = [
    { name: "Profile", icon: <HomeIcon />, link: '/profile' },
    { name: "Collection", icon: <HomeIcon />, link: '/collection' },
    { name: "Tea Generator", icon: <HomeIcon />, link: '/teagenerator'},
    { name: "Sign In", icon: <HomeIcon />, link: '/login' },
    { name: "Logout", icon: <HomeIcon />, link: '/logout'}
  ];

export default function MobileMenu() {

    const [open, setOpen] = useState(false);

    const getList = () => (
      <div className="dropdownList" onClick={() => setOpen(false)}>
        {data.map((item, index) => (
          <Link to={item.link} key={index}>
          <ListItem>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
          </Link>
        ))}
      </div>
    );
    return (
      <div className="dropdown">
        <ArrowDropDownCircleIcon sx={{fontSize: 60, cursor: 'pointer'}} onClick={() => setOpen(true)}/>
        <Drawer open={open} anchor={"top"} onClose={() => setOpen(false)}>
          {getList()}
        </Drawer>
      </div>
    );
  }
