import 'dotenv/config';
import { Message } from './types';
import { sendEmailsWithTemplates } from './sendEmailsWithTemplates';


(async () => {

    console.log('enviando mails de prueba...');

    const testMessages: Message[] = [
        {
            From: 'P. Chu Joy <info@pchujoy.com>',
            To: 'pdavila@pchujoy.com',
            TemplateId: '35310294',
            MessageStream: 'offer',
            Tag: 'offer-test-messages',
            TemplateModel: {
                subject: 'subject asombroso 3',
                name: 'Piero Davila Aguirre',
                disccountCode: 'PHIPRUEBA123'
            }
        },
        {
            From: 'P. Chu Joy <info@pchujoy.com>',
            To: 'pierodavilaaguirre22@gmail.com',
            TemplateId: '35310294',
            MessageStream: 'offer',
            Tag: 'offer-test-messages',
            TemplateModel: {
                subject: 'subject asombroso 3',
                name: 'Alonso Franccesco',
                disccountCode: 'PHIPRUEBA456'
            }
        },
        {
            From: 'P. Chu Joy <info@pchujoy.com>',
            To: 'jpcabrejos@pchujoy.com',
            TemplateId: '35310294',
            MessageStream: 'offer',
            Tag: 'offer-test-messages',
            TemplateModel: {
                subject: 'prueba correo comicon',
                name: 'JP',
                disccountCode: 'PHIPRUEBA789'
            }
        }
    ]


    try {
        // const response = await sendEmailsWithTemplates(testMessages);
        // console.log(response);


        // const response = await axios.post('https://api.postmarkapp.com/email/withTemplate', {
        //     "From": "P. Chu Joy <info@pchujoy.com>",
        //     "To": "pdavila@pchujoy.com",
        //     "TemplateId": "34051368",
        //     "MessageStream": 'offer',
        //     "TemplateModel": {
        //         "subject": "testeando envio via node 2"
        //     }
        // }, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'X-Postmark-Server-Token': process.env.POSTMARK_SERVER_CLIENT,
        //     }
        // });


        // console.log({ response })
    } catch (error) {
        if (error instanceof Error) {
            console.log(`[Error while sending the email test ${error.name}]: ${error.message}`);
        }

        console.log({ error })
    }

})()