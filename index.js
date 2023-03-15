const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-UxDTw0WZ6LhokPzAH8glBPkt",
    apiKey: process.env.OPENAI_API_KEY,

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
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello world" }],
    });
    //console.log(completion.data.choices[0].message);
    res.json({
        data: completion.data
    })
});


app.listen(port, () => console.log(`open Ai running on ${port}`))
