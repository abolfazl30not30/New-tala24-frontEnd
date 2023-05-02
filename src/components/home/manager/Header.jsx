import {IoCalendarOutline} from "react-icons/io5";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {CiUser} from "react-icons/ci"
import {RxExit} from "react-icons/rx"
import React from "react";
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// const StyledMenu = styled((props) => (
//     <Menu
//         elevation={0}
//         anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'right',
//         }}
//         transformOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//         }}
//         {...props}
//     />
// ))(({ theme }) => ({
//     '& .MuiPaper-root': {
//         borderRadius: 6,
//         marginTop: theme.spacing(1),
//         minWidth: 180,
//         color:
//             theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
//         boxShadow:
//             'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//         '& .MuiMenu-list': {
//             padding: '4px 0',
//         },
//         '& .MuiMenuItem-root': {
//             '& .MuiSvgIcon-root': {
//                 fontSize: 18,
//                 color: theme.palette.text.secondary,
//                 marginRight: theme.spacing(1.5),
//             },
//             '&:active': {
//                 backgroundColor: alpha(
//                     theme.palette.secondary.main,
//                     theme.palette.action.selectedOpacity,
//                 ),
//             },
//         },
//     },
// }));

export default function AddAdmin(props) {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleExit = () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        <>
            <div className={'w-100 mt-[-30px]'}>
                <div className={'flex items-center text-white bg-[#252525] h-[79px] mt-10 mx-7 rounded-[20px]'}>

                    <div className={'md1:flex hidden justify-start w-full'}>
                        <p className={'text-white text-[0.8rem] mr-[-30px]'}>
                            سلام، خوش آمدید!
                        </p>
                    </div>
                    <div className={"w-100flex justify-end"}>

                    </div>
                    <div className={'flex justify-end w-full items-center ml-[-25px]'}>
                        <div className={'md1:block hidden pr-5 mr-5'} >
                            <IoCalendarOutline size={'25'}/>
                        </div>
                        <p className={'md1:block hidden text-white text-[0.8rem] mr-2'}>
                            تاریخ:
                        </p>
                        <p className={'md1:block hidden text-white text-[0.8rem] mr-2 ml-5 pl-5'} style={{borderLeft: '1px solid #AFAFAF'}}>
                            {
                                new Date().toLocaleDateString('fa-IR-u-nu')
                            }
                        </p>
                        <div>
                            <Button
                                id="navbar-dropdown-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{color: '#fff'}}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                     stroke="currentColor" width='24' height='24'>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                                </svg>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem sx={{color: '#000'}}>
                                    <Link to='/'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                             stroke="currentColor" width='16' height='16' className="ms-1">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                                        </svg>
                                        صفحه اصلی
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to='/manager/add-admins'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                             stroke="currentColor" width='16' height='16' className="ms-1">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
                                        </svg>
                                        پنل کاربری
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to='/' onClick={() => {
                                        localStorage.clear()
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                             stroke="currentColor" width='16' height='16' className="ms-1">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                                        </svg>
                                        خروج از حساب
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
                <Outlet/>
            </div>
        </>
    )
}
