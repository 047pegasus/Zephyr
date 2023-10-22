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
        console.log(`Commit activity for ${owner}/${repo}: ${sum}`);
    } catch (error) {
        console.error(`Error fetching commit activity for ${owner}/${repo}:`, error.message);
    }
};

const runProcess = async () => {
    try {
        const repos = await fetchGitHubRepos();
        for (const repo of repos) {
            await getCommitActivity(repo.owner, repo.name);
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};


runProcess();