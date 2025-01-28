import { NextRequest } from 'next/server'; // Dodaj ovu liniju ako koristiš Next.js API

export async function POST(request: NextRequest) {
    const data = await request.json();
    console.log("Sending data to Match Trader:", data);
  
    return new Response(JSON.stringify({ message: "Data sent to Match Trader", data }), {
      status: 200,
    });
}
