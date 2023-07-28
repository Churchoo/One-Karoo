import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'

interface Props {
  homepage: () => void
  aboutUs: () => void
}

const DeliveryDetails = (props: Props) => {
  const [streetAddress, setStreetAddress] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [recipientNumber, setRecipientNumber] = useState("")
  return (
    <div>
      <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 6, sm: 8, md: 12 }} >
        <Button variant="text" sx={{ color: "black", fontSize: "38px" }} onClick={() => props.homepage()}>One Karoo</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }}>Catagories</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }}>Gift packeges</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }} onClick={() => props.aboutUs()}>About Us</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }}>Contact Us</Button>
      </Grid>
      <TextField
        id="RecipientName"
        label="Recipient Name"
        rows={1}
        defaultValue={recipientName}
        variant="outlined"
        onChange={(e) => setRecipientName(e.target.value)}
      />
      <TextField
        id="RecipientNumber"
        label="Recipient Number"
        rows={1}
        defaultValue={recipientNumber}
        variant="outlined"
        onChange={(e) => setRecipientNumber(e.target.value)}
      />
      <TextField
        id="Address"
        label="Street Address"
        multiline
        rows={3}
        defaultValue={streetAddress}
        variant="outlined"
        onChange={(e) => setStreetAddress(e.target.value)}
      />
      <TextField
        id="Suburb"
        label="Suburb"
        rows={1}
        defaultValue={streetAddress}
        variant="outlined"
        onChange={(e) => setStreetAddress(e.target.value)}
      />
      <TextField
        id="City"
        label="City/Town"
        rows={1}
        defaultValue={streetAddress}
        variant="outlined"
        onChange={(e) => setStreetAddress(e.target.value)}
      />
      <TextField
        id="PostalCode"
        label="Postal Code"
        rows={1}
        defaultValue={streetAddress}
        variant="outlined"
        onChange={(e) => setStreetAddress(e.target.value)}
      />
    </div>
  )
}

export default DeliveryDetails