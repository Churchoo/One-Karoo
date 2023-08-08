import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'

interface Props {
  homepage: () => void
  aboutUs: () => void
}

const DeliveryDetails = (props: Props) => {
  const [streetAddress, setStreetAddress] = useState("")
  const [suburb, setSuburb] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState(0)
  const [recipientName, setRecipientName] = useState("")
  const [recipientNumber, setRecipientNumber] = useState("")
  return (
    <div style={{ paddingLeft: "2.00%", paddingTop: "2.00%" }}>
      <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 6, sm: 8, md: 12 }} >
        <Button variant="text" sx={{ color: "black", fontSize: "38px" }} onClick={() => props.homepage()}>One Karoo</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }}>Catagories</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }}>Gift packeges</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }} onClick={() => props.aboutUs()}>About Us</Button>
        <Button variant="text" sx={{ color: "black", fontSize: "20px" }}>Contact Us</Button>
      </Grid>
      <Grid container >
        <Grid item xs={12} sx={{ paddingBottom: '1.00%' }}>
          <TextField
            id="RecipientName"
            label="Recipient Name"
            rows={1}
            defaultValue={recipientName}
            variant="outlined"
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sx={{ paddingBottom: '1.00%' }}>
          <TextField
            id="RecipientNumber"
            label="Recipient Number"
            rows={1}
            defaultValue={recipientNumber}
            variant="outlined"
            onChange={(e) => setRecipientNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sx={{ paddingBottom: '1.00%' }}>
          <TextField
            id="Address"
            label="Street Address"
            multiline
            rows={3}
            defaultValue={streetAddress}
            variant="outlined"
            onChange={(e) => setStreetAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sx={{ paddingBottom: '1.00%' }}>
          <TextField
            id="Suburb"
            label="Suburb"
            rows={1}
            defaultValue={suburb}
            variant="outlined"
            onChange={(e) => setSuburb(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sx={{ paddingBottom: '1.00%' }}>
          <TextField
            id="City"
            label="City/Town"
            rows={1}
            defaultValue={city}
            variant="outlined"
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sx={{ paddingBottom: '1.00%' }}>
          <TextField
            id="PostalCode"
            label="Postal Code"
            type='number'
            rows={1}
            defaultValue={postalCode}
            variant="outlined"
            onChange={(e) => setPostalCode(parseInt(e.target.value))}
          />
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 4, md: 4 }} columns={{ xs: 6, sm: 8, md: 12 }} >
        <Button>Add Message</Button>
        <Button>Payment</Button>
      </Grid>
    </div>
  )
}

export default DeliveryDetails