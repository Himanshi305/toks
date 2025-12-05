import * as ai from '../services/ai.service.js';

export const getResult = async (req, res) => {
    try {
        const prompt = req.query.response;
        const response = await ai.main(prompt);
        res.json({ result: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 