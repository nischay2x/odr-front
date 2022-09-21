import React, { useReducer, useState } from 'react';
import { Box, Grid, Paper, Typography, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

const initialState = { };
const localReducer = (state, action) => {
    switch(action.type) {
        default: return state;
    }
}

export default function Profile() {

  const user = useSelector(state => state.user);
  const profile = user.data;

    const [state, localDispatch] = useReducer(localReducer, initialState);
    
    const [updateData, setUpdateData] = useState({
        firstname: profile.firstname,
        lastname: profile.lastname,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        address2: profile.address2,
        city: profile.city,
        state: profile.state,
        country: profile.country
    });
    const handleInputChange = (e) => {
        setUpdateData(prev => ({...prev, [e.target.name]: e.target.value}));
    }

  return (
      <Paper elevation={3}>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4} >
                <InfoItem label="Name" value={profile.firstname +", "+ profile.lastname} capitalize={true} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <InfoItem label="Email" value={profile.email} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <InfoItem label="Phone" value={profile.phone} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <InfoItem label="Address" value={profile.address +", "+ profile.address2} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <InfoItem label="City" value={profile.city} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <InfoItem label="State" value={profile.state} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <InfoItem label="Country" value={profile.country} />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
                <Box display="flex" justifyContent="flex-end">
                    <Button size="small" variant="contained" color="secondary"
                        onClick={() => {  }}
                    >
                        Edit
                    </Button>
                </Box>
            </Grid>
          </Grid>
        </Box>
        
        <Box component='form' onSubmit={() => {}} p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4} >
                <InfoItem label="Name" value={profile.firstname +", "+ profile.lastname} capitalize={true} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <InfoItem label="Email" value={profile.email} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <InfoItem label="Phone" value={profile.phone} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <InfoItem label="Address" value={profile.address +", "+ profile.address2} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <InfoItem label="City" value={profile.city} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <InfoItem label="State" value={profile.state} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <InfoItem label="Country" value={profile.country} />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
                <Box display="flex" gridColumnGap={10} justifyContent="flex-end">
                    <Button size="small" variant="contained" color="secondary"
                        onClick={() => {  }}
                    >
                        Cancel
                    </Button>
                    <Button size="small" variant="contained" 
                        color="primary" type="submit"
                    >
                        Update
                    </Button>
                </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
  )
}

function InfoItem ({ label, value, capitalize = false }) {
    return (
        <Box display="flex" sx={{columnGap: 10}}> 
            <Typography style={{fontWeight: 500}}>
                {label} : 
            </Typography>
            <Typography style={{ textTransform: capitalize ? "capitalize" : "none" }}>
                {value}
            </Typography>
        </Box>
    )
}
