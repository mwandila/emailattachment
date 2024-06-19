import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const runtime = 'edge';

export default async function POST(request: Request) {
  try {
    const { content, filename } = await request.json();
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['mwandilablessing2@gmail.com'],
      subject: "Hello world",
      html: '<p>See attachment</p>',
      attachments: [
        {
          content,
          filename,
        },
      ],
    });

    if (error) {
      console.error('Resend API error:', error);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.error('API route error:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), { status: 500 });
  }
}
