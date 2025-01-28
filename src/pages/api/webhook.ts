import { NextApiRequest, NextApiResponse } from 'next';
import * as crypto from 'crypto';

// Move these to environment variables in production
const WEBHOOK_SECRET = process.env.MAUTIC_WEBHOOK_SECRET;
const SEGMENT_ID_NEW_LEADS = 12;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Get the signature from headers
    const signature = req.headers['x-mautic-signature'];
    if (!signature) {
      return res.status(400).json({ message: 'Signature missing' });
    }

    const data = req.body;

    // Verify webhook signature
    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET || '');
    const body = JSON.stringify(data);
    const hash = hmac.update(body).digest('hex');

    if (hash !== signature) {
      console.error('Invalid signature received');
      return res.status(403).json({ message: 'Invalid signature' });
    }

    // Extract contact data (Mautic can send either 'contact' or 'lead')
    const contact = data.contact || data.lead;
    if (!contact) {
      return res.status(400).json({ message: 'No contact data found' });
    }

    // Check if contact is in the New Leads segment
    const segments = contact.segments || [];
    if (!segments.includes(SEGMENT_ID_NEW_LEADS)) {
      console.log('Contact is not in New Leads segment, skipping');
      return res.status(200).json({ 
        message: 'Contact not in target segment',
        contact: contact.id 
      });
    }

    // Process the lead data
    const leadData = {
      email: contact.email,
      firstName: contact.firstname,
      lastName: contact.lastname,
      phone: contact.phone,
      mauticId: contact.id,
      status: 'new'
    };

    // Log the processed lead data
    console.log('Processing new lead:', leadData);

    // Here you would typically save the lead data to your database
    // For example:
    // await db.leads.create(leadData);

    return res.status(200).json({ 
      message: 'Webhook processed successfully',
      leadId: contact.id 
    });

  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ 
      message: 'Internal server error processing webhook',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
