import { useCallback, useEffect, useState } from "react";
import { Grid, Paper, CardContent, CardActions, Typography, Button, Link, Box } from "@material-ui/core";

import { getUserMeetings, meetingsData } from "../../api/meetings.js";

const user = 'me';

export default function Meetings () {
    
    const [meetings, setMeetings] = useState([]);
    
    const getMeetings = useCallback(() => {
        return getUserMeetings(user);
    }, [user])
    
    useEffect(() => {
        getMeetings().then(res => {
            console.log(res);
            setMeetings(meetingsData.meetings.meetings);
        }).catch(err => { 
            console.log(err);
            setMeetings(meetingsData.meetings.meetings);
        })
    }, [user])
    
    return (
        <>
        <Box mb={2} display='flex' justifyContent='flex-end'>
            <Link href="meetings/new">
                <Button variant="contained" size="small" color="primary">Create Meeting</Button>
            </Link>
        </Box>
        <Grid container spacing={1}>
            {
                meetings.map((m, i) => {
                    return (
                        <Grid item key={i} md={6} lg={4} xl={3}>
                            <MeetingCard data={m} />
                        </Grid>
                    )
                })
            }
            
        </Grid>
        </>
    )
}

function MeetingCard ({ data }) {
    return (
        <Paper elevation={3} sx={{ p: 2}}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
               Agenda: {data.agenda}
            </Typography>
            <Typography style={{fontSize: 12}} color="secondary" >
                At: {new Date(data.start_time).toLocaleString()}, {data.duration}M
            </Typography>
            <Typography sx={{pt: 2}} variant="body2">
                {data.topic}
            </Typography>
        </CardContent>
        <CardActions>
            <Link href={data.join_url} target="_blank">
                <Button size="small" variant="contained" color="secondary">Join</Button>
            </Link>
            <Link href={`/meetings/${data.id}`}>
                <Button size="small" variant="contained" color="primary" >Details</Button>
            </Link>
        </CardActions>
        </Paper>
    )
}