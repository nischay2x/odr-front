import { useEffect, useState } from "react";
import { 
    Grid, Paper, Typography, Button, Link, Box, 
    TextField, FormControl, Select, MenuItem, InputLabel
} from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"

import { useParams } from "react-router-dom";
import { timezoneList, createMeeting } from "../../api/meetings.js";

const user = 'me';

const emptyMeetingData = {
  "agenda": "",
  "description": "",
  "default_password": false,
  "duration": 60,
  "password": "",
  "pre_schedule": false,
  "schedule_for": "vik@vastedge.com", 
  "start_time": "",
  "template_id": "Dv4YdINdTk+Z5RToadh5ug==",
  "timezone": "",
  "topic": "",
   "type": 2
};

export default function Meetings () {
    const params = useParams();
    
    const [data, setData] = useState(emptyMeetingData);
    const onInputChange = ({ target }) => {
        console.log(target.value)
        setData(prev => ({...prev, [target.name]: target.value}));
    }
    
    const [timezones, setTimezones] = useState([]);
    async function getTimezones () {
        try {
            // const { data } = await axios.get('http://worldtimeapi.org/api/timezone');
            // console.log(data);
            setTimezones(timezoneList);
        } catch (err) { }
    }
    
    useEffect(() => {
        getTimezones();
    }, [params.id]);
    
    const onCreateFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await createMeeting(user, data);
        } catch (err) {  }
    }
    
    return (
        <>
        <Box mb={2} display='flex' justifyContent='flex-end'>
            <Link href="meetings">
                <Button variant="contained" size="small" color="secondary">Cancel</Button>
            </Link>
        </Box>
        <Paper elevation={3}>
            <Box p={2}>
                <Typography>Meeting Details</Typography>
            </Box>
        
            <Box px={2} pb={2} component='form' onSubmit={onCreateFormSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                    <TextField value={data.agenda} label="Agenda" onChange={onInputChange} 
                        size='small' fullWidth variant="outlined" name="agenda" required
                    />
                </Grid>
                 <Grid item xs={12} md={6} lg={8}>
                    <TextField value={data.description} label="Description" onChange={onInputChange} 
                        size='small' fullWidth variant="outlined" name="description" required
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <TextField value={data.topic} label="Topic" onChange={onInputChange} 
                        size='small' fullWidth variant="outlined" name="topic" required
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <TextField value={data.password} label="Password" onChange={onInputChange} 
                        size='small' fullWidth variant="outlined" name="password" required
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <TextField value={data.duration} type="number" label="Duration (Minute)" onChange={onInputChange} 
                        size='small' fullWidth variant="outlined" name="duration" required
                        InputProps={{ inputProps: { max: 100, min: 10 }}}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Start Time"
                            required
                            minDateTime={new Date().toISOString()}
                            value={data.start_time || new Date().toISOString()}
                            onChange={(newValue) => { onInputChange({ target: { name: "start_time", value: new Date(newValue).toISOString() }}) }}
                            renderInput={(params) => <TextField required {...params} fullWidth size="small" variant="outlined" />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <FormControl required fullWidth size='small' varaint="outlined" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select" style={{ paddingLeft: "1rem" }} >Timezone</InputLabel>
                        <Select
                            variant='outlined'
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={data.timezone}
                            label="Timezone"
                            onChange={onInputChange}
                        >
                            <MenuItem value="">Select</MenuItem>
                        {
                            timezones.map((t, i) => <MenuItem key={i} value={t}>{t}</MenuItem>)
                        }
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md="auto" lg='auto'>
                    <Button variant="contained" color="primary" type="submit" >Create</Button>
                </Grid>
            </Grid>
            </Box>
        </Paper>
        </>
    )
}

