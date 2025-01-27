// src/app/api/getContacts/route.ts

import fetch from 'node-fetch';

export async function GET(request: Request) {
  try {
    const mauticApiUrl = 'https://your-mautic-instance.com/api/contacts';  // Zameniti sa stvarnim Mautic API URL-om
    const mauticApiKey = 'your-api-key';  // Zameniti sa tvojim Mautic API ključem

    // Postavljanje headera za autentifikaciju
    const response = await fetch(mauticApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${mauticApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // Vrati podatke iz Mautic API-ja
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error fetching data from Mautic:', error);
    return new Response(JSON.stringify({ error: 'Error fetching data from Mautic' }), { status: 500 });
  }
}
