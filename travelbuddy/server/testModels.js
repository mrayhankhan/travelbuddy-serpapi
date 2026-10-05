require('dotenv').config();

const { GoogleGenAI } = require('@google/genai');

async function checkModels() {
    const apiKey   = (process.env.VERTEX_API_KEY   || '').trim();
    const project  = (process.env.VERTEX_PROJECT_ID || '').trim();
    const location = (process.env.VERTEX_LOCATION   || '').trim();

    if (!apiKey || !project || !location) {
        console.error('Missing Vertex AI config in .env (VERTEX_API_KEY, VERTEX_PROJECT_ID, VERTEX_LOCATION)');
        return;
    }

    console.log('Testing Vertex AI via @google/genai SDK...');
    console.log(`  Project:  ${project}`);
    console.log(`  Location: ${location}`);
    console.log(`  Key:      ${apiKey.substring(0, 12)}...`);

    try {
        const ai = new GoogleGenAI({
            apiKey,
            vertexai: { project, location },
        });

        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'Say "Vertex AI connection confirmed!" and nothing else.',
        });

        console.log('\n✅ Vertex AI CONFIRMED. Response:');
        console.log(result.text);
    } catch (err) {
        console.error('\n❌ Vertex AI test FAILED:', err.message || err);
    }
}

checkModels();
