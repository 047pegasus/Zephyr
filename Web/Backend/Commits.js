const { Octokit } = require('@octokit/core');

const octokit = new Octokit({
    auth: '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',
});

const getCommitActivity = async () => {
    try {
        const response = await octokit.request('GET /repos/ShashwatPS/Node-Package/stats/commit_activity', {
            owner: 'ShashwatPS',  // Replace with your repository owner
            repo: 'Node-Package',   // Replace with your repository name
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
        let sum = 0;
        for(let i=0;i<response.data.length;i++){
            sum = sum + response.data[i].total;
        }
        console.log(sum);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

getCommitActivity();



