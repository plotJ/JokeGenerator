import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI();

export const runtime = "edge";

const defaultTopics = ['Work', 'People', 'Animals', 'Food', 'Television'];
const defaultTones = ['Witty', 'Sarcastic', 'Silly', 'Dark', 'Goofy'];
const defaultTypes = ['Pun', 'Knock-Knock', 'Story'];

function getRandomItem(array: string[]): string {
  return array[Math.floor(Math.random() * array.length)];
}

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.error("Error parsing request body:", error);
    return new Response(JSON.stringify({ error: "Invalid JSON in request body" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let { topic, tone, type, temperature } = body;

  // Generate random values for missing fields
  if (!topic) topic = getRandomItem(defaultTopics);
  if (!tone) tone = getRandomItem(defaultTones);
  if (!type) type = getRandomItem(defaultTypes);
  if (temperature === undefined || temperature === null) temperature = 0.7;

  console.log("Parameters (with random if needed):", { topic, tone, type, temperature });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: parseFloat(temperature),
    messages: [
      {
        role: "system",
        content: `You are a witty comedian specializing in generating jokes. Your task is to create an original, clever joke based on the following parameters:

Topic: ${topic}
Tone: ${tone}
Type: ${type}

Guidelines:
1. Ensure the joke is directly related to the given topic.
2. Match the specified tone in your delivery.
3. Follow the requested joke type structure.
4. Be creative and aim for unexpected punchlines.
5. Avoid offensive or inappropriate content unless specifically requested.

After generating the joke, rate it on the following scales from 1 to 10:
- Humor: How funny is the joke?
- Appropriateness: How suitable is it for a general audience?
- Cleverness: How witty or smart is the joke?

Format your response exactly as follows:

JOKE: [Your generated joke here]
HUMOR: [Rating from 1-10]
APPROPRIATENESS: [Rating from 1-10]
CLEVERNESS: [Rating from 1-10]`,
      },
      {
        role: "user",
        content: `Generate a ${tone} ${type} joke about ${topic}.`,
      },
    ],
  });

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      // Parse the completion to extract joke and ratings
      const lines = completion.split('\n');
      const joke = lines.find(line => line.startsWith('JOKE:'))?.substring(6).trim();
      const humor = parseInt(lines.find(line => line.startsWith('HUMOR:'))?.substring(7).trim() || '0');
      const appropriateness = parseInt(lines.find(line => line.startsWith('APPROPRIATENESS:'))?.substring(16).trim() || '0');
      const cleverness = parseInt(lines.find(line => line.startsWith('CLEVERNESS:'))?.substring(11).trim() || '0');

      // Return structured data
      return JSON.stringify({
        joke,
        ratings: {
          humor,
          appropriateness,
          cleverness
        }
      });
    },
  });

  return new StreamingTextResponse(stream);
}