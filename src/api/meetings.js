import axios from "axios";
import { baseUrl } from "../config/api-config";

// const base = `${baseUrl}/auth`;
// temp
const base = 'https://api.zoom.us/v2';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJRM2l5Ujhxa1ItdUlIc19OWXowbzN3IiwiZXhwIjoxNjYzNjUzNTI3MTQ1LCJpYXQiOjE2NjM2NTM0Nzd9.BUXt7N9Jw-iKi5AjR6bnqEIRf3Daq6-1W-ohnMTexGk';

export function getUserMeetings (user) {
    return axios.get(`${base}/users/${user}/meetings`, {
        headers: {
            authorization: token
        }
    });
}

export function createMeeting () {
    
}

export function getMeetingParticipants (meetingId) {
    
}
