import React, { useEffect, useReducer, useState } from 'react';
import { Box, Grid, Paper, Typography, Button, TextField, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';


const initialState = { editMode: false, suspense: false };
const localReducer = (state, action) => {
    switch(action.type) {
        case "EDIT-MODE": return { editMode: true, suspense: false };
        case "NORMAL-MODE": return { editMode: false, suspense: false };
        case "POST-EDIT": return { ...state, suspense: true };
        default: return state;
    }
}

export default function Profile() {

    const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const profile = user.data;

    const [state, localDispatch] = useReducer(localReducer, initialState);
    
    const [updateData, setUpdateData] = useState(getUpdatableData(profile));
    const handleInputChange = (e) => {
        setUpdateData(prev => ({...prev, [e.target.name]: e.target.value}));
    }
    
    useEffect(() => {
        if(state.editMode)
        setUpdateData(getUpdatableData(profile))
    }, [state.editMode]);
    
    const onUpdateFormSubmit = async (e) => {
        e.preventDefault();
        localDispatch({ type: "POST-EDIT" });
        dispatch({ type: "UPDATE_SUCCESS", payload: updateData });
        localDispatch({ type: "NORMAL-MODE" })
    }

  return (
      <Paper elevation={3}>
          {
              state.editMode ? 
            <Box component='form' onSubmit={onUpdateFormSubmit} p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4} >
                <TextField fullWidth size="small" label="Firstname" value={updateData.firstname} 
                    onChange={handleInputChange} name="firstname" variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <TextField fullWidth size="small" label="Lastname" value={updateData.lastname} 
                    onChange={handleInputChange} name="lastname" variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <TextField type="email" fullWidth size="small" label="Email" value={updateData.email} 
                    onChange={handleInputChange} name="email" variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <TextField type="tel" fullWidth size="small" label="Phone" value={updateData.phone} 
                    onChange={handleInputChange} name="phone" variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <TextField fullWidth size="small" label="Address Line 1" value={updateData.address} 
                    onChange={handleInputChange} name="address" variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <TextField fullWidth size="small" label="Address Line 2" value={updateData.address2} 
                    onChange={handleInputChange} name="address2" variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <TextField fullWidth size="small" label="City" value={updateData.city} 
                    onChange={handleInputChange} name="city" variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <TextField fullWidth size="small" label="State" value={updateData.state} 
                    onChange={handleInputChange} name="state" variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={6} lg={4} >
                <TextField fullWidth size="small" label="Country" value={updateData.country} 
                    onChange={handleInputChange} name="country" variant="outlined"
                />
            </Grid>
            <Grid item xs="auto" md="auto" lg="auto" >
                <Box display="flex" gridColumnGap={10} justifyContent="flex-end">
                    <Button size="small" variant="contained" color="secondary"
                        onClick={() => { localDispatch({ type: "NORMAL-MODE" }) }}
                    >
                        Cancel
                    </Button>
                    {
                        state.suspense ? 
                    <CircularProgress size="2rem" color="primary" /> :
                    <Button size="small" variant="contained" 
                        color="primary" type="submit"
                    >
                        Update
                    </Button> 
                    }
                </Box>
            </Grid>
          </Grid>
        </Box>
              :
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
            <Grid item xs={12} md={6} lg={8} >
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
            <Grid item xs="auto" md="auto" lg="auto">
                <Button size="small" variant="contained" color="secondary"
                    onClick={() => { localDispatch({ type: "EDIT-MODE" }) }}
                >
                    Edit
                </Button>
            </Grid>
          </Grid>
        </Box>
          }
        
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

function getUpdatableData (data) {
    return {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        address2: data.address2,
        city: data.city,
        state: data.state,
        country: data.country
    }
}
