// src/app/api/matchTrader/route.ts - slanje podataka ka Match Trader platformi.

export async function POST(request: Request) {
    const data = await request.json();
    console.log("Sending data to Match Trader:", data);
  
  
    return new Response(JSON.stringify({ message: "Data sent to Match Trader", data }), {
      status: 200,
    });
  }
  