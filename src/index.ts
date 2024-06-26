import 'dotenv/config';
import xlsx from 'xlsx';
import { Message, UserData } from './types';
import fs from 'fs/promises';
import { sendEmailsWithTemplates } from './sendEmailsWithTemplates';


(async () => {

    const workbook = xlsx.readFile('./peru comic con 24 entrada especial.xlsx');
    const sheetNames = workbook.SheetNames;
    const data: UserData[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);

    console.log('Total mails: ', data.length);

    const messages: Message[] = data.map(user => ({
        From: 'P. Chu Joy <soporte@pchujoy.com>',
        To: user.email,
        TemplateId: '35311262',
        MessageStream: 'soporte',
        Tag: 'fe-erratas-comicon-abr-2024',
        TemplateModel: {
            subject: `[FE DE ERRATAS]: Corrección de Correo Electrónico Incorrecto`,
            name: user.name,
        }
    }));

    // enviar mails 500 en 500
    const batches: Message[][] = divideOnBatches(messages, 500);

    // enviando emails por batches
    let batchIndex = 1
    for (const batch of batches) {
        console.log('Loading batch ', batchIndex);
        console.log('Batch lenght: ', batch.length);

        const fileName = `response-batch-erratas${batchIndex}.json`;

        try {
            const response = await sendEmailsWithTemplates(batch);

            await fs.writeFile(fileName, JSON.stringify(response), 'utf-8');
            console.log(`${fileName} CREATED SUCCESSFULLY`);

            batchIndex++;
        } catch (error) {
            if (error instanceof Error) {
                console.log(`[ERROR ON BATCH ${batchIndex} (${error.name})]: ${error.message}`)
            }

            process.exit();
        }
    }

})()


function divideOnBatches(array: any[], size: number) {
    let batches = [];

    for (let i = 0; i < array.length; i += size) {
        batches.push(array.slice(i, i + size));
    }

    return batches;
}


