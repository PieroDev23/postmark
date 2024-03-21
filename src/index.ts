import 'dotenv/config';
import xlsx from 'xlsx';
import { Message, UserData } from './types';
import axios from 'axios';


(async () => {

    const workbook = xlsx.readFile('./peru comic con 24   entrada especial.xlsx');
    const sheetNames = workbook.SheetNames;
    const data: UserData[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);

    console.log('Total mails: ', data.length);

    const messages: Message[] = data.map(user => ({
        From: 'P. Chu Joy <soporte@pchujoy.com>',
        To: user.email,
        TemplateId: '000000',
        MessageStream: 'reunion',
        Tag: 'masivo-comicon-2024',
        TemplateModel: {
            subject: 'subject asombroso',
            name: user.name,
        }
    }));

    // enviar mails 500 en 500
    const batches = divideOnBatches(messages, 500);

    // enviando emails por batches
    let batchIndex = 1
    for (const batch of batches) {
        console.log('Loading batch ', batchIndex);
        console.log('Batch lenght: ', batch.length);

        try {
            await sendEmailsWithTemplates(batch);
            batchIndex++;

        } catch (error) {
            if (error instanceof Error) {
                console.log(`[ERROR ON BATCH ${batchIndex} (${error.name})]: ${error.message}`)
            }

            process.exit();
        }
    }

})()

async function sendEmailsWithTemplates(batch: Message[]) {
    const response = await axios.post('https://api.postmarkapp.com/email/batchWithTemplates', {
        Messages: batch
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Postmark-Server-Token': process.env.POSTMARK_SERVER_CLIENT,
        }
    })

    console.log('Batch sended successfully', response);
}


function divideOnBatches(array: any[], size: number) {
    let batches = [];

    for (let i = 0; i < array.length; i += size) {
        batches.push(array.slice(i, i + size));
    }

    return batches;
}


