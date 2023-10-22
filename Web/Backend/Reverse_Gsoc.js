const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 5000;

app.use(cors({ origin: "*" }));

app.get("/data", async (req, res) => {
    const data = await axios.get("https://api.gsocorganizations.dev/2022.json");
    res.json({data: data.data});
})

app.listen(PORT, () => {
    console.log("server running on port", PORT);
})