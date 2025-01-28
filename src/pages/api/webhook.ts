import { NextApiRequest, NextApiResponse } from 'next';
import * as crypto from 'crypto';

const WEBHOOK_SECRET = 'mywebhooksecretkey'; // Ovaj secret treba da bude isti kao u Mautic-u

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Provera da li je metod POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const data = req.body;  // Prijem podataka sa Mautic Webhook-a
    const signature = req.headers['x-mautic-signature'];  // Potpis koji šalje Mautic

    if (!signature) {
      return res.status(400).json({ message: 'Signature missing' });
    }

    // Kreiranje HMAC hash-a koristeći tvoje secret ključ
    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    const body = JSON.stringify(data);
    const hash = hmac.update(body).digest('hex');

    // Provera da li se hash poklapa sa vrednošću iz header-a
    if (hash !== signature) {
      return res.status(403).json({ message: 'Invalid signature' });
    }

    // Obrada podataka
    console.log('Valid webhook received:', data);

    if (data?.contact?.segments?.includes('New Leads')) {
      // Ovde možeš da sačuvaš podatke u bazi, ili pošalješ dalje na drugi sistem
      console.log('Contact added to New Leads:', data.contact);
    }

    return res.status(200).json({ message: 'Webhook received successfully' });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return res.status(500).json({ message: 'Error processing webhook' });
  }
}
