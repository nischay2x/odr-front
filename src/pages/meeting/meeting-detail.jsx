import { useEffect, useState } from "react";
import { Grid, Paper, CardContent, CardActions, Typography, Button, Link, Box } from "@material-ui/core";

import { useParams } from "react-router-dom";

import { meetingsData, getMeetingParticipants } from "../../api/meetings.js";

const user = 'me';

export default function Meetings () {
    const params = useParams();
    
    const [participants, setParticipants] = useState([]);
    
    async function getParticipants() {
        try {
            const data = await getMeetingParticipants(params.id);
            
        } catch (err) {
            console.log(err);
            
        }
    }
    
    useEffect(() => {
        
    }, [params.id])
    
    return (
        <>
        <Box mb={2} display='flex' justifyContent='flex-end'>
            <Link href="meetings/new">
                <Button variant="contained" size="small" color="primary">Create Meeting</Button>
            </Link>
        </Box>
        <Grid container spacing={1}>
            
            
        </Grid>
        </>
    )
}

