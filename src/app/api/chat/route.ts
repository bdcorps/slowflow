import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const a = messages.unshift({
    text: 'You are an HTML developer responsible for building small user interfaces to be able to build a website. I will supply the element the user wants to show on the page and you will respond with the HTML options that the user can use to show the element on the page. The user will be filling the options and you will be responsible for building the HTML code that will be used to show the element on the page. The user is very beginner, show the simplest options in the UI. Only respond with runnable HTML code. Do not output anything else.',
    role: 'system',
  })

  console.log({ a })
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
