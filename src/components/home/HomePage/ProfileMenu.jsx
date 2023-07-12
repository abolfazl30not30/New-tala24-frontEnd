import React from "react";
import {Button} from "@material-tailwind/react";
import Menu from "@mui/material/Menu";
import {MenuItem} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import {RxEnter} from "react-icons/rx";
import {AiOutlineStock} from "react-icons/ai";

const ProfileMenu = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    const handleMenu = () => {
        if (sessionStorage.getItem("username") && sessionStorage.getItem("password") && sessionStorage.getItem("role") && sessionStorage.getItem("Authorization")) {
            if (sessionStorage.getItem("role") === "MANAGER") {
                return (
                    <div className="profileMenu flex flex-1 flex-wrap items-center justify-end mx-auto">
                        <Button
                            id="navbar-dropdown-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className="bg-transparent shadow-none"
                            sx={{color: '#000'}}
                        >
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
                                    bgcolor: "#252525",
                                    borderRadius: "1.5rem",
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
                            transformOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
                            <MenuItem onClick={() => {
                                handleClose();
                                navigate("/manager/add-admin")
                            }}>
                                <div className="flex items-center">
                                    <img className="w-10"
                                         src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                         alt="profile"/> <span className="mr-2">پنل مدیر</span>
                                </div>
                            </MenuItem>
                            <Divider className="bg-neutral-600"/>
                            <MenuItem onClick={() => {
                                handleClose();
                                navigate("/manager/gold-price")
                            }}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="ml-2 w-5 h-5 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                </ListItemIcon>
                                ثبت قیمت طلا
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleClose();
                                navigate("/manager/confirm-buy")
                            }}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="ml-2 w-5 h-5 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
                                    </svg>
                                </ListItemIcon>
                                درخواست خرید
                            </MenuItem>
                            <MenuItem onClick={() => {
                                navigate('/');
                                sessionStorage.clear();
                                handleClose();
                            }}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" width='16' height='16'
                                         className="ml-2 w-5 h-5 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                                    </svg>
                                </ListItemIcon>
                                خروج
                            </MenuItem>
                        </Menu>
                    </div>)
            } else if (sessionStorage.getItem("role") === "ADMIN") {
                return (
                    <div className="profileMenu flex flex-1 flex-wrap items-center justify-end mx-auto">
                        <Button
                            id="navbar-dropdown-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className="bg-transparent shadow-none"
                            sx={{color: '#000'}}
                        >
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
                                    bgcolor: "#252525",
                                    borderRadius: "1.5rem",
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
                            transformOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
                            <MenuItem onClick={() => {
                                handleClose();
                                navigate("/admin")
                            }}>
                                <div className="flex items-center">
                                    <img className="w-10"
                                         src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                         alt="profile"/> <span className="mr-2">پنل ادمین</span>
                                </div>
                            </MenuItem>
                            <Divider className="bg-neutral-600"/>
                            <MenuItem onClick={() => {
                                handleClose();
                                navigate("/admin/gold-price")
                            }}>
                                <ListItemIcon>
                                    <AiOutlineStock size={'25'} color="#fff" className={'cursor-pointer'}/>
                                </ListItemIcon>
                                ثبت قیمت طلا
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleClose();
                                navigate("/admin/confirm-buy")
                            }}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="ml-2 w-5 h-5 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
                                    </svg>
                                </ListItemIcon>
                                درخواست خرید
                            </MenuItem>
                            <MenuItem onClick={() => {
                                navigate('/');
                                sessionStorage.clear();
                                handleClose();
                            }}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" width='16' height='16'
                                         className="ml-2 w-5 h-5 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                                    </svg>
                                </ListItemIcon>
                                خروج
                            </MenuItem>
                        </Menu>
                    </div>)
            } else {
                return (
                    <div className="profileMenu flex flex-1 flex-wrap items-center justify-end mx-auto">
                        <Button
                            id="navbar-dropdown-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className="bg-transparent shadow-none"
                            sx={{color: '#000'}}
                        >
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
                                    bgcolor: "#252525",
                                    borderRadius: "1.5rem",
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
                            transformOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        >
                            <MenuItem onClick={() => {
                                handleClose();
                                navigate("/dashboard/home")
                            }}>
                                <div className="flex items-center">
                                    <img className="w-10"
                                         src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                         alt="profile"/> <span className="mr-2">پنل کاربر</span>
                                </div>
                            </MenuItem>
                            <Divider className="bg-neutral-600"/>
                            <MenuItem>
                                <Link to="/dashboard/user-profile" className="flex items-center" onClick={handleClose}>
                                    <ListItemIcon>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor"
                                             className="ml-2 w-5 h-5 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                    </ListItemIcon>
                                    اطلاعات کاربری
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                handleClose();
                                navigate("/dashboard/inventory-increase")
                            }}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="ml-2 w-5 h-5 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
                                    </svg>
                                </ListItemIcon>
                                افزایش موجودی
                            </MenuItem>
                            <MenuItem onClick={() => {
                                navigate('/');
                                sessionStorage.clear();
                                handleClose();
                            }}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" width='16' height='16'
                                         className="ml-2 w-5 h-5 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                                    </svg>
                                </ListItemIcon>
                                خروج
                            </MenuItem>
                        </Menu>
                    </div>)
            }
        } else {
            return (
                <div className="flex flex-1 flex-wrap items-center justify-end mx-auto">
                    <Link to="/login"
                          className="flex items-center bg-transparent text-sm hover:bg-gold text-white  hover:text-bgGray py-2 px-4 border border-gold hover:border-transparent rounded" style={{border:"1px solid #DFAF3D"}}>
                        <RxEnter fontSize="15px" className="transform rotate-180"/>
                        <spna className="mr-2">ورود | ثبت نام</spna>
                    </Link>
                </div>)
        }
    }
    return (
        <>
            {handleMenu()}
        </>
    )
}

export default ProfileMenu