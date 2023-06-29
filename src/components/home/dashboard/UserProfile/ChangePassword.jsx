import {CacheProvider} from "@emotion/react";
import {TextField} from "@mui/material";
import React from "react";
import {useState} from "react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis';
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const ChangePassword = () =>{
    const [currentPassword, setCurrentPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [repeatNewPassword, setRepeatNewPassword] = useState()

    const handleChaangePassword = () => {}

    return(
        <div className="flex flex-col">
            <CacheProvider value={cacheRtl}>
                <div className="flex flex-col space-y-6 justify-center">
                    <TextField
                        label={"رمز عبور فعلی"}
                        // error={errors.length !== 0}
                        /* disabled={!firstNameAllowed}*/
                        value={currentPassword}
                        type={"text"}
                        sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        label={"رمز عبور جدید"}
                        // error={errors.length !== 0}
                        /* disabled={!firstNameAllowed}*/
                        value={newPassword}
                        type={"text"}
                        sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        label={"تکرار رمز عبور جدید"}
                        // error={errors.length !== 0}
                        /* disabled={!firstNameAllowed}*/
                        value={repeatNewPassword}
                        type={"text"}
                        sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                        onChange={(e) => setRepeatNewPassword(e.target.value)}
                    />
                    <button
                        className='mt-6 bg-[#DFAF3D] w-fit text-black px-4 py-2 rounded-md text-sm'
                        onClick={handleChaangePassword}>ثبت تغیرات
                    </button>
                </div>
            </CacheProvider>
        </div>
    )
}

export default ChangePassword

