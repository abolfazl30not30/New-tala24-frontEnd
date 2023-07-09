import React, {useState} from "react";
import {BsList, BsPersonCircle} from 'react-icons/bs';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link, useNavigate} from "react-router-dom";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";


function Navbar() {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toggleSidebar = () => {
        let sidebar = document.querySelector("#sidebar");
        sidebar.classList.toggle("close");
    }
    return (
        <div className="navbar-dashboard">
            <div className='d-flex flex-row align-items-center'>
                <button className='text-white ms-3 text-2xl' onClick={toggleSidebar}>
                    <BsList/>
                </button>
            </div>
            <div className="profileMenu">
            <Button
                id="navbar-dropdown-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{color: '#fff'}}>

                <img className="w-10"
                     src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                     alt="profile"/>
            </Button>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            bgcolor:"#252525",
                            borderRadius:"1.5rem",
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={()=>{handleClose();
                        navigate("/manager/add-admin")}}>
                        <div className="flex items-center">
                            <img className="w-10"
                                 src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                 alt="profile"/> <span className="mr-2">پنل مدیر</span>
                        </div>
                    </MenuItem>
                    <Divider className="bg-neutral-600" />
                    <MenuItem onClick={()=>{handleClose();
                        navigate("/")}}>
                        <ListItemIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" width='16' height='16' className="ml-2 w-5 h-5 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                            </svg>
                        </ListItemIcon>
                        صفحه اصلی
                    </MenuItem>
                    <MenuItem onClick={()=>{handleClose();
                        navigate("/manager/confirm-buy")}}>
                        <ListItemIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="ml-2 w-5 h-5 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
                            </svg>
                        </ListItemIcon>
                        درخواست خرید
                    </MenuItem>
                    <MenuItem onClick={() => {navigate('/');
                        sessionStorage.clear();
                        handleClose();}}>
                        <ListItemIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" width='16' height='16' className="ml-2 w-5 h-5 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                            </svg>
                        </ListItemIcon>
                        خروج
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
}

export default Navbar;