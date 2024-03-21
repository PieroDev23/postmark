import axios from "axios";
import { Message } from "./types";

export async function sendEmailsWithTemplates(batch: Message[]) {
    const { data } = await axios.post('https://api.postmarkapp.com/email/batchWithTemplates', {
        "Messages": batch
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Postmark-Server-Token': process.env.POSTMARK_SERVER_CLIENT,
        }
    })

    console.log('Batch sended successfully');

    return data;
}