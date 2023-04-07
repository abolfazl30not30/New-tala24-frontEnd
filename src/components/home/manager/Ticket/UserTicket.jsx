import React, {useState} from "react"
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ManagerTicket() {
    const [tickets, setTickets] = useState([
        {
            title: 'پول میخوام',
            status: 'در انتظار برسی',
            date: '1401/05/09'
        },
        {
            title: 'پول میخوام',
            status: 'در انتظار برسی',
            date: '1401/05/09'
        },
        {
            title: 'پول میخوام',
            status: 'در انتظار برسی',
            date: '1401/05/09'
        },
        {
            title: 'پول میخوام',
            status: 'در انتظار برسی',
            date: '1401/05/09'
        }
    ])
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="mx-9 mt-5 text-white bg-[#141414] mt-10 rounded-[8px] p-5 font-bold overflow-scroll">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-center mb-6">
                <h2 className="text-lg font-medium">
                    سوابق تیکت ها
                </h2>
                <button  className='bg-[#dfaf3d] text-black px-2 py-1 font-normal rounded hover:cursor-pointer transition' onClick={handleClickOpen}>ثبت تیکت جدید</button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>عنوان تیکت</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            لطفا عنوان تیکت خود را وارد کنید
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label=""
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <div className="flex justify-center w-full">
                            <Link to='chat'>
                                <button className='MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1e6y48t-MuiButtonBase-root-MuiButton-root'>
                                    ثبت تیکت
                                </button>
                            </Link>
                            {/*<Button onClick={handleClose}>ثبت تیکت</Button>*/}
                            <Button onClick={handleClose}>بستن</Button>
                        </div>

                    </DialogActions>
                </Dialog>
            </div>

            <div className="table w-full shadow-sm overflow-hidden">
                <div className="table-header-group bg-[#2a2a2a] font-medium shadow-sm overflow-hidden">
                    <div className="table-row">
                        <div className="table-cell p-4 rounded-r-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                            </svg>
                        </div>
                        <div className="table-cell p-4">عنوان</div>
                        <div className="table-cell p-4">تاریخ</div>
                        <div className="table-cell p-4 rounded-l-lg">عملیات</div>
                    </div>
                </div>
                <div class="table-row-group p-4 text-sm font-medium">
                    {
                        tickets.map((t, i) => (
                            <div className="table-row text-white transition">
                                <div
                                    className="table-cell px-2 py-3">{i + 1}</div>
                                <div
                                    className="table-cell px-2 py-3">{t.title}</div>
                                <div
                                    className="table-cell px-2 py-3">{t.date}</div>
                                <div
                                    className="table-cell px-2 py-3">
                                    <Link to='chat'>
                                        <button
                                            className='bg-[#dfaf3d] text-black px-2 py-1 font-normal rounded hover:cursor-pointer transition'>مشاهده
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ManagerTicket