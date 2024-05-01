
import 'dotenv/config'
import express, {Request, Response} from 'express'
import {v4} from 'uuid';
import fs from 'fs'

const app = express()
const PORT = 3000

// required to read the raw body from the webhook POST response
app.use(express.raw({type: '*/*'})); 

// either read from the .env
let webhookId = process.env.WEBHOOK_ENDPOINT_ID;

if (!webhookId) {
    // or create a new ENV variable and append to file
    webhookId = v4();  // Generate a new UUID
    const envContent = `\nWEBHOOK_ENDPOINT_ID=${webhookId}\n`;
    fs.appendFileSync('.env', envContent);  // Save to .env file
    console.log('Generated and saved new WEBHOOK_ENDPOINT_ID:', webhookId);
}

app.post(`/webhook/${webhookId}`, (req, res) => {
    console.log(JSON.parse(req.body))
    console.log(JSON.parse(req.body)[0].Log.transferEvent)
    console.log(`transferring tokenID: ${JSON.parse(req.body)[0].Log.transferEvent.tokenIds[0]}`)
    res.status(200).send('Webhook data received');
});

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
    console.log(`webhook endpoint: ${process.env.NGROK_ENDPOINT}/webhook/${webhookId}`);
})