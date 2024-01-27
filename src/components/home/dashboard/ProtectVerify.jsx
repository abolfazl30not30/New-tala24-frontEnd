import {Component} from "react";
import {Link, Navigate} from "react-router-dom"
import React from "react";
import signup from "../../../contexts/signup"
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {BiErrorCircle} from "react-icons/bi";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

class ProtectVerify extends Component {
    static context = signup;

    state = {
        isAuth: null,
        open:false,
    }

    componentDidMount() {
        console.log(this.context.verified)
    }

    render() {

        function handleClose () {
            this.setState({open:false})
        }
        function handleOpen (){
            this.setState({open:true})
        }

        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#303030',
            border: '2px solid #000',
            boxShadow: 24,
            borderRadius: "1rem",
            p: 4,
        };
        return (
            <>
                {
                    this.context.verified === "accept" ? (this.props.children) :
                        null
                }

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={this.state.open}
                    onClose={()=>{handleClose()}}
                    closeAfterTransition
                    slots={{backdrop: Backdrop}}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}>
                    <Fade in={this.state.open}>
                        <Box sx={style}>
                            <BiErrorCircle fontSize={'9rem'} color="#c0392b"/>
                            <Typography id="transition-modal-title" variant="h6" component="h2" color={"#fff"}>
                                براي انجام فرايند خريد و فروش بايد مشخصات خود را تكميل كنيد
                            </Typography>
                            <Typography id="transition-modal-description" sx={{mt: 2}}>
                                <Link to="/dashboard/user-profile" className={"bg-gold py-2 px-5 rounded-2xl"} onClick={()=>{handleClose()}}>
                                    رفتن به صفحه تكميل مشخصات
                                </Link>
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </>
        );
    }
}

export default ProtectVerify