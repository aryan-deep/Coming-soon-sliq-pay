import { google } from 'googleapis';
import path from 'path';
import { promises as fs } from 'fs';
import { time } from 'console';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const keyFile = path.join(process.cwd(), "credentials/google-sheets-key.json");
    const credentials = JSON.parse(await fs.readFile(keyFile, 'utf8'));

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const { name, email,timestamp } = req.body;

    const spreadsheetId = '1AjPkR-a6BtmgwZjXN_cw8qjXYrnVWkP-WsRr6r6-v0E';
    const range = 'Sheet1!A:B';

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, email,timestamp]],
      },
    });

    res.status(200).json({ message: 'Saved!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
