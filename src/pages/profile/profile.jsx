import React from 'react';
import { Box, Grid, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';

export default function Profile() {

  const user = useSelector(state => state.user);
  const profile = user.data;

  return (
    <Box p={3}>
      <Paper elevation={3}>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item >
              Name: {profile.firstname} {profile.lastname}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box >
  )
}
