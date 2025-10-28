# 🚀 GitHub Crawler

A fully automated GitHub GraphQL crawler that collects repository data, stores it in PostgreSQL, and exports the results as an artifact via GitHub Actions CI/CD.

---

## 📘 Overview

This project demonstrates:
- Efficient use of the **GitHub GraphQL API** for large-scale repository crawling  
- Automated **PostgreSQL** setup and schema creation  
- Continuous-integration data pipeline using **GitHub Actions**  
- Export of database contents as a **CSV artifact**

It meets all assignment requirements:  
✅ PostgreSQL service container  
✅ Dependency installation  
✅ Setup-DB step  
✅ Crawl-Stars step (GraphQL API)  
✅ Artifact upload  
✅ Runs with default GitHub token (no secrets)

---

## 🏗️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Language | Node.js (ES Modules) |
| API | GitHub GraphQL v4 |
| Database | PostgreSQL 15 |
| CI/CD | GitHub Actions |
| Package Manager | npm |

---

## ⚙️ Local Setup Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/moiz-habib/github-crawler.git
cd github-crawler
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Set Up PostgreSQL Locally
```bash
# Example local credentials
DB_USER=postgres
DB_PASS=12345
DB_NAME=github
```
### 4️⃣ Initialize the Database
```bash
npm run setup-db
```
### 5️⃣ Provide a GitHub Token
Use any public-repo personal access token (only needed locally):
Windows (PowerShell)
```bash
$env:GITHUB_TOKEN = "your_token_here"
```
### 6️⃣ Run the Crawler Locally
```bash
npm run crawl
```
