import fetch from "node-fetch";
import pkg from "pg";
const { Client } = pkg;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  console.error("❌ Missing GITHUB_TOKEN environment variable");
  process.exit(1);
}

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "github",
  password: "12345",
  port: 5432,
});

async function crawlRepos() {
  await client.connect();
  console.log("✅ Connected to PostgreSQL");

  const query = `
    query ($after: String) {
      search(query: "stars:>100", type: REPOSITORY, first: 100, after: $after) {
        edges {
          node {
            ... on Repository {
              name
              url
              stargazerCount
              owner {
                login
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `;

  let hasNextPage = true;
  let after = null;
  let count = 0;

  while (hasNextPage && count < 1000) {
    // Fetch ~100k repos in total via pagination
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { after } }),
    });

    const result = await response.json();

    const repos = result.data.search.edges.map((edge) => ({
      name: edge.node.name,
      full_name: `${edge.node.owner.login}/${edge.node.name}`,
      stars: edge.node.stargazerCount,
      url: edge.node.url,
    }));

    for (const repo of repos) {
      await client.query(
        "INSERT INTO repositories (name, full_name, stars_count, url) VALUES ($1, $2, $3, $4)",
        [repo.name, repo.full_name, repo.stars, repo.url]
      );
      count++;
    }

    console.log(`⭐ Inserted ${count} repos so far...`);

    hasNextPage = result.data.search.pageInfo.hasNextPage;
    after = result.data.search.pageInfo.endCursor;

    // Basic rate limit buffer
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(`✅ Finished crawling. Total repos: ${count}`);
  await client.end();
}

crawlRepos();
