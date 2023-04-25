import axios from 'axios';

const API_KEY = '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';

export const callGPTAPI = async (input) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: "text-davinci-003",
                prompt: input,

                max_tokens: 3000,
                temperature: 0.2,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
            }
        );

        return response.data.choices[0].text;
    } catch (error) {
        console.error('Error calling GPT API:', error);
        throw error;
    }
};
