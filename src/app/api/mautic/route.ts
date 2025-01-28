// src/app/api/mautic/route.ts

export async function POST(request: Request) {
    try {
      const body = await request.json();  // Prijem podataka sa Mautic Webhook-a
  
      if (!body.contact || !body.contact.id) {
        return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
      }
  
      const contact = body.contact;
      const contactId = contact.id;
      const email = contact.email;
      const firstName = contact.firstName;
      const lastName = contact.lastName;
      const phone = contact.phone;
  
      // Obradi podatke (npr. sačuvaj u bazu ili pošaljite dalje ka Match Trader-u)
      console.log('Received new contact from Mautic:', { contactId, email, firstName, lastName, phone });
  
      return new Response(JSON.stringify({ message: 'Webhook received successfully' }), { status: 200 });
    } catch (error) {
      console.error('Error processing webhook:', error);
      return new Response(JSON.stringify({ error: 'Error processing webhook' }), { status: 500 });
    }
  }
  