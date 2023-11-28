# Dashboard

Admin dashboard for managing products and categories

## Description

The goal of this project is to build a dashboard with Vue.js on the front-end and Fastify (TypeScript) on the back-end. It has a hierarchical category display, CRUD operations for both products and categories, and other features.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Prisma Client](#prisma-client)
- [Run the Project](#run-the-project)
- [Deployment](#deployment)
- [License](#license)


## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed:
- Node.js
- npm
- MySQL

### Installation

A step-by-step guide on how to install the project.

```bash
# Clone the repository
git clone https://github.com/shadw77/Nodejs-VueJs-task.git

# Change into the front directory
cd client

# Install dependencies
npm install

# Change into the back directory
cd ..

# Install dependencies
npm install
```
### Prisma Client
```bash
# Add .env file in the root of your project and define DATABASE_URL, then run this command
npx prisma generate
```
### Run the Project

```bash
npm start
cd client
npm run serve
npm run build

Visit http://localhost:8080 in your browser.
