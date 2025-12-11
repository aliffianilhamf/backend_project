#!/usr/bin/env node

// Menggunakan package https untuk melakukan request ke GitHub API
import { rejects } from "assert";
import { resolve } from "dns";
import https from "https";

// Fetching data dari GitHub API
function fetchGithubActivity(username: string): Promise<any> {
  const url = `https://api.github.com/users/${username}/events`;

  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "user-agent": "github-activity-cli", // github API membutuhkan user-agent
            accept: "application/vnd.github.v3+json",
          },
        },
        (res) => {
          let data = "";

          // jika user tidak ditemukan
          if (res.statusCode === 404) {
            reject(new Error("User not found"));
            return;
          }

          // mengumpulkan data
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => {
            try {
              const jsonData = JSON.parse(data);
              resolve(jsonData);
            } catch (err) {
              reject(err);
            }
          });
        }
      )
      .on("error", (err) => {
        reject(err);
      });
  });
}

// Membuat format output yang mudah dibaca
function formatActivity(event: any): string | null {
  switch (event.type) {
    case "PushEvent":
      const commitCount = event.payload.commits?.length || 0;
      if (commitCount === 0) {
        return `Updated ${event.repo.name} at ${new Date(
          event.created_at
        ).toLocaleString()}`;
      }
      return `Pushed ${commitCount} commit(s) to ${
        event.repo.name
      } at ${new Date(event.created_at).toLocaleString()}`;
    case "IssuesEvent":
      return `${
        event.payload.action === "opened" ? "Opened" : "Closed"
      } issue #${event.payload.issue.number} in ${
        event.repo.name
      } at ${new Date(event.created_at).toLocaleString()}`;
    case "WatchEvent":
      return `Starred ${event.repo.name} at ${new Date(
        event.created_at
      ).toLocaleString()}`;
    case "CreateEvent":
      return `Created ${event.payload.ref_type} ${event.payload.ref} in ${
        event.repo.name
      } at ${new Date(event.created_at).toLocaleString()}`;
    case "ForkEvent":
      return `Forked ${event.repo.name} at ${new Date(
        event.created_at
      ).toLocaleString()}`;
    default:
      return null;
  }
}

// Fungsi utama untuk menjalankan CLI
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: github-activity <github-username>");
    process.exit(0);
  }
  const username = args[0];

  try {
    const events = await fetchGithubActivity(username);
    if (events.length === 0) {
      console.log("No recent activity found.");
      return;
    }

    console.log(`Recent activity for GitHub user: ${username}\n`);
    events
      .map(formatActivity)
      .filter(Boolean)
      .forEach((activity: any) => {
        console.log("-" + activity);
      });
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}

// Menjalankan fungsi utama
main();
