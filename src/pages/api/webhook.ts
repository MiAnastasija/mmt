import { NextApiRequest, NextApiResponse } from 'next';
import * as crypto from 'crypto';

const WEBHOOK_SECRET = 'mywebhooksecretkey';  // Ovaj secret treba da bude isti kao u Mautic-u

// ID segmenta "New Leads"
const SEGMENT_ID_NEW_LEADS = 12;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    const signature = req.headers['x-mautic-signature'];

    if (!signature) {
      return res.status(400).json({ message: 'Signature missing' });
    }

    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    const body = JSON.stringify(data);
    const hash = hmac.update(body).digest('hex');

    if (hash !== signature) {
      return res.status(403).json({ message: 'Invalid signature' });
    }

    console.log('Valid webhook received:', data);

    // Provera da li je kontakt u segmentu sa ID-jem 12 (New Leads)
    if (data?.contact?.segments?.includes(SEGMENT_ID_NEW_LEADS)) {
      console.log('Contact is in New Leads segment:', data.contact);
      // Ovde možeš da sačuvaš podatke u bazi ili da ih pošalješ dalje.
    }

    return res.status(200).json({ message: 'Webhook received successfully' });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return res.status(500).json({ message: 'Error processing webhook' });
  }
}
