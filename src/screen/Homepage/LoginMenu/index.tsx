import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material'
import { GoogleLogin } from '@react-oauth/google'
import React from 'react'

interface Props {
    isOpen: boolean
    createAccount: () => void
    loginAccount: () => void
    closeDialog: () => void
    login: () => void
}
const LoginMenu = (props: Props) => {
    return (
        <Dialog fullWidth maxWidth='xs' open={props.isOpen} onClose={props.closeDialog}>
            <DialogTitle style={{ textAlign: 'center', fontSize:'24px' }}>Login</DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
            <div style={{display:'flex', flexDirection:'column', justifyContent: 'center' }}>
                <GoogleLogin
                    auto_select
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse)
                        props.login()
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
                <Button onClick={() => props.loginAccount()} color="primary" style={{ paddingTop: '16px'}}>
                    Login
                </Button>
                <Button onClick={() => props.createAccount()} color="primary" style={{ paddingTop: '16px'}}>
                    Create Account
                </Button>
                <Button onClick={props.closeDialog} color="primary" style={{ padding: '8px'}}>
                    Close
                </Button>
                </div>
            </DialogActions>
            {/* <Backdrop sx={{}} open={props.isLoading}>
        <CircularProgress color="inherit" />
    </Backdrop> */}
        </Dialog>
    )
}

export default LoginMenu