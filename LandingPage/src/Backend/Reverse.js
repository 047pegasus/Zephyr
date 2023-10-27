import express from 'express';
import cors from 'cors';
import axios from 'axios';
const app = express();
const PORT = 5000;

app.use(cors({ origin: "*" }));

app.get("/data", async (req, res) => {
    try {
        const year = req.headers.year || 2022;
        const response = await axios.get(`https://api.gsocorganizations.dev/${year}.json`);

        const organizationsData = response.data.organizations || [];
        res.json({ organizations: organizationsData });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(PORT, () => {
    console.log("server running on port", PORT);
});