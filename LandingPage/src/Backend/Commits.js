// const { Octokit } = require('@octokit/core');
//
// const octokit = new Octokit({
//     auth: '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',
// });
//
// const getCommitActivity = async () => {
//     try {
//         const response = await octokit.request('GET /repos/ShashwatPS/WebDev-Practice/stats/commit_activity', {
//             owner: 'ShashwatPS',
//             repo: 'WebDev-Practice',
//             headers: {
//                 'X-GitHub-Api-Version': '2022-11-28',
//             },
//         });
//         let sum = 0;
//         for(let i=0;i<response.data.length;i++){
//             sum = sum + response.data[i].total;
//         }
//         console.log(sum);
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// };
//
// getCommitActivity();


import express from 'express';
import mongoose from 'mongoose';
import Octokit from '@octokit/core';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.json());

const LeaderBoardSchema = new mongoose.Schema({
    Name: String,
    Commits: Number,
});

const Lead = mongoose.model('Lead', LeaderBoardSchema);

mongoose.connect('mongodb+srv://ShashwatPS:1@cluster0.1alkv6j.mongodb.net/LeaderBoard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get('/api/github-commit-activity', async (req, res) => {
    const { authtoken, githubusername } = req.headers;
    console.log('Headers:', req.headers);
    if (!authtoken || !githubusername) {
        return res.status(400).json({ error: 'Authentication token and GitHub username are required in headers.' });
    }

    try {
        const repos = await fetchGitHubRepos(authtoken, githubusername);
        let totalSum = 0;

        for (const repo of repos) {
            const sum = await getCommitActivity(authtoken, repo.owner, repo.name);
            totalSum += sum;
        }

        const newUser = {
            Name: githubusername,
            Commits: totalSum,
        };

        const newSave = new Lead(newUser);
        await newSave.save();

        res.json({ totalCommits: totalSum });
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const fetchGitHubRepos = async (authtoken, githubusername) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${githubusername}/repos`, {
            headers: {
                Authorization: `Bearer ${authtoken}`,
            },
        });

        return response.data.map(repo => ({
            name: repo.name,
            owner: repo.owner.login,
        }));
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error.message);
        throw error;
    }
};

const getCommitActivity = async (authtoken, owner, repo) => {
    const octokit = new Octokit({
        auth: authtoken,
    });

    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/stats/commit_activity', {
            owner,
            repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });

        let sum = 0;
        for (let i = 0; i < response.data.length; i++) {
            sum += response.data[i].total;
        }
        return sum;
    } catch (error) {
        console.error(`Error fetching commit activity for ${owner}/${repo}:`, error.message);
        return 0;
    }
};

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});