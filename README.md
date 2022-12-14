# create-t3-turbo

<img width="1758" alt="turbo2" src="https://user-images.githubusercontent.com/51714798/202427720-4ec5f285-41a5-4fed-a52f-20b89c5bc1b3.png">

## About

Ever wondered how to migrate your T3 application into a monorepo? Stop right here! This is the perfect starter repo to get you running with the perfect stack!

It uses [Turborepo](https://turborepo.org/) and contains:

```
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  └─ next.js
      ├─ Next.js 13
      ├─ React 18
      ├─ TailwindCSS
      └─ E2E Typesafe API Server & Client
packages
  ├─ api
  |   └─ tRPC v10 router definition
  ├─ auth
      └─ authentication using next-auth. **NOTE: Only for Next.js app,
  ├─ ui-components
      └─ components. **NOTE: Only for Next.js app,
  └─ db
      └─ typesafe db-calls using Prisma
```

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

```diff
# Start the database
docker-compose up -d

# Install dependencies
pnpm i


# Configure environment variables.
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Prisma schema to your database
pnpm db-push
```

### Development

```diff
# Start the Next.js app
pnpm dev

# To change the database schema, edit the `schema.prisma` file and run `pnpm db-migrate:dev` to generate the migration files.
Double check the generated files and then run `pnpm db-push` to push the changes to the database.

# If you want to run any other prisma commands,you need to move to packages/db and then you can use `pnpm prisma ...` to run them on the development database.
```

```

## Deployment

### Next.js

#### Prerequisites

_We do not recommend deploying a SQLite database on serverless environments since the data wouldn't be persisted. I provisioned a quick Postgresql database on [CockroachDB](https://cockroachlabs.cloud/), but you can of course use any other database provider. Make sure the prisma schema is updated to use the correct database._

#### Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com/). If you have ever deployed a Turborepo app there, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory and apply the following build settings:

2. Add your `DATABASE_URL` environment variable.

3. Done! Your app should successfully deploy.

## References

The stack originates from [create-t3-app](https://github.com/t3-oss/create-t3-app).

A [blog post](https://jumr.dev/blog/t3-turbo) where I wrote how to migrate a T3 app into this.

```

```

```
