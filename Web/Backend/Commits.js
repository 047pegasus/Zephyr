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


const mongoose = require("mongoose");

const LeaderBoardSchema = new mongoose.Schema({
    Name: String,
    Commits: Number,
});

const Lead = mongoose.model("Lead", LeaderBoardSchema);

mongoose.connect("mongodb+srv://ShashwatPS:s@cluster0.1alkv6j.mongodb.net/LeaderBoard", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const axios = require('axios');
const { Octokit } = require('@octokit/core');
const fetchGitHubRepos = async () => {
    try {
        const response = await axios.get('https://api.github.com/users/ShashwatPS/repos');
        const repoInfoArray = response.data.map(repo => ({
            name: repo.name,
            owner: repo.owner.login,
        }));
        console.log(repoInfoArray);

        return repoInfoArray;
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error.message);
        throw error;
    }
};


const getCommitActivity = async (owner, repo) => {
    const octokit = new Octokit({
        auth: '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',
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
            sum = sum + response.data[i].total;
        }
        return sum;
    } catch (error) {
        console.error(`Error fetching commit activity for ${owner}/${repo}:`, error.message);
        return 0;
    }
};

const runProcess = async () => {
    let totalSum = 0;
    try {
        const repos = await fetchGitHubRepos();
        for (const repo of repos) {
            const sum = await getCommitActivity(repo.owner, repo.name);
            totalSum += sum;
        }
        const newUser = {
            Name: repos[0].owner,
            Commits: totalSum,
        };
        const newSave = new Lead(newUser);
        await newSave.save();
        console.log('Total commit activity for all repositories:', totalSum);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};


runProcess();