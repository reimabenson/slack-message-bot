const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const port = 5555;

const { App } = require('@slack/bolt');

const token =  '<token>';
const signingSecret = '<signingSecret>';
const channelId = '<channelId>';


// Initializes your app with your bot token and signing secret
const SlackApp = new App({
    token: token,
    signingSecret: signingSecret
});

// Define a sample API endpoint
app.post('/api/contact', async (req, res) => {

    const email  = req.body.email;
    const description = req.body.description;
    const text = `New message from ${email ? email : "Unknown address" } - ${description ? description : " No description added."}`;

    try {
        // Call the chat.postMessage method using the built-in WebClient
        const result = await SlackApp.client.chat.postMessage({
            // The token you used to initialize your app
            token: token,
            channel: channelId,
            text: text
            // You could also use a blocks[] array to send richer content
        });
        res.json({ message: 'Success!' });
    }
    catch (error) {
        res.json({ message: error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
