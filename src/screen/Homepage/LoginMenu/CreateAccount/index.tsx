import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material'
import { GoogleLogin } from '@react-oauth/google'
import React, { useState } from 'react'

interface Account {
    Username: string,
    EmailAddress: string,
    Password: string,
    GoogleUser: boolean
}

interface Props {
    isOpen: boolean
    createAccount: (account: Account) => void
    closeDialog: () => void
}

const CreateAccount = (props: Props) => {
    const [userName, setUserName] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    return (
        <Dialog fullWidth open={props.isOpen} onClose={props.closeDialog}>
            <DialogTitle style={{ textAlign: 'center', fontSize: '24px' }}>Create Account</DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography >UserName</Typography>
                    <TextField
                        required
                        value={userName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                    />
                    <Typography >Email Address</Typography>
                    <TextField
                        required
                        value={emailAddress}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailAddress(e.target.value)}
                    />
                    <Typography >Password</Typography>
                    <TextField
                        required
                        type='password'
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    <Button onClick={() => props.createAccount({ Username: userName, EmailAddress: emailAddress, Password: password, GoogleUser: false })} color="primary">
                        Create Account
                    </Button>
                    <Button onClick={() => props.closeDialog()} color="primary">
                        Back
                    </Button>
                </div>
            </DialogActions>
            {/* <Backdrop sx={{}} open={props.isLoading}>
        <CircularProgress color="inherit" />
    </Backdrop> */}
        </Dialog>
    )
}

export default CreateAccount