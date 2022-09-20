const Octokit = require("Octokit");
// https://docs.github.com/en/actions/learn-github-actions/environment-variables
// GITHUB_SHA

// https://docs.github.com/en/rest/actions/artifacts

// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  // auth: 'YOUR-TOKEN'
});

async function findArtifact(page = 1) {
  const per_page = 100;
  const res = await octokit.request(
    "GET /repos/{owner}/{repo}/actions/artifacts",
    {
      owner: process.env.GITHUB_REPOSITORY_OWNER,
      repo: process.env.GITHUB_REPOSITORY.split("/")[1],
      per_page,
    }
  );
  if (!(res.total_count || res.artifacts?.length)) return;
  const artifact = res.artifacts.find(
    a => a.workflowRun.head_sha === process.env.GITHUB_SHA
  );
  if (artifact) return artifact;
  return page * per_page < res.total_count ? findArtifact(page + 1) : undefined;
}

const artifact = await findArtifact();
console.log(artifact.url);
