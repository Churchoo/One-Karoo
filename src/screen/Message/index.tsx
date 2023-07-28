import { Button, Grid, TextField } from '@mui/material'
import React from 'react'

interface Props {
  homepage: () => void
}

const Message = (props: Props) => {
  return (
    <div>
      <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 6, sm: 8, md: 12 }} >
        <Button variant="text" sx={{ color: "black", fontSize: "38px" }} onClick={() => props.homepage()}>One Karoo</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }}>Catagories</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }}>Gift packeges</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }}>About Us</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }}>Contact Us</Button>
      </Grid>
      <TextField
        id="filled-multiline-static"
        label="Multiline"
        multiline
        rows={4}
        defaultValue="Default Value"
        variant="filled"
      />
    </div>
  )
}

export default Message