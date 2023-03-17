const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-UxDTw0WZ6LhokPzAH8glBPkt",
    apiKey: "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",

});

const openai = new OpenAIApi(configuration);

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.send('open Ai server is running');
});
app.post('/', async (req, res) => {
    const { message } = req.body;
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
    //console.log(completion.data.choices[0].message);
    res.json({
        message: completion.data.choices[0].text,
    })
});


app.listen(port, () => console.log(`open Ai running on ${port}`))
