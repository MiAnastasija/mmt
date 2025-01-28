import { NextResponse } from 'next/server';
import * as crypto from 'crypto';  // Zamena require() sa importom

const WEBHOOK_SECRET = 'mywebhooksecretkey'; // Ovo je secret koji si postavio u Mautic-u

export async function POST(req: Request) {
  try {
    // Parsiraj telo zahteva (webhook podaci)
    const data = await req.json();

    // Dobijanje X-Mautic-Signature header-a (koristićeš ga za verifikaciju)
    const signature = req.headers.get('X-Mautic-Signature');

    if (!signature) {
      return NextResponse.json({ message: 'Signature missing' }, { status: 400 });
    }

    // Kreiranje HMAC hash-a koristeći tvoje secret ključ
    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    const body = JSON.stringify(data);
    const hash = hmac.update(body).digest('hex');

    // Proveri da li se hash poklapa sa vrednošću iz header-a
    if (hash !== signature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 403 });
    }

    // Ako je signature validna, obradimo podatke
    console.log('Valid webhook received:', data);

    // Obrada podataka, na primer, filtriranje kontakta koji su dodani u segment
    if (data?.contact?.segments?.includes('New Leads')) {
      // Ovde možeš da sačuvaš kontakte u bazi ili ih prikažeš u tvojoj aplikaciji
      // Na primer:
      // await saveContactToDatabase(data.contact);
    }

    return NextResponse.json({ message: 'Webhook received successfully' });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ message: 'Error processing webhook' }, { status: 500 });
  }
}
