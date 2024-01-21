import { type NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const level = searchParams.get('level')
  const input = searchParams.get('input')

  const output = await openai.chat.completions.create({
    messages: [{
      role: 'system', content: `You are a web developer that is helping a user create a website. Provided an action that a user wants to do, think about the properties that you would have to collect.
      
      Based on these properties, create a UI that allows the user to input these properties.

      For beginners, collect the bare minimum properties and be more descriptive with the input labels.

      Only return HTML code. Do not wrap the code with a form tag or include any <br> tags. No intro or outro text. 
      `
    },
    {
      role: "user",
      content: `I want to be able to ${input} to my page. I am an ${level} user.`
    }],
    model: 'gpt-4',
  });
  return Response.json({ output: output?.choices[0].message.content?.replace("\`\`\`html", "") || "" })
}
