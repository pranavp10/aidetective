
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

export const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_KEY!,
    environment: 'gcp-starter',

});

