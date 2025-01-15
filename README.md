# Group Members
- RANDRIAMANANTENA Lovamanitra Mario
- RANAIVOARISON Mionja
- RANDRIANANAHARY LanjaTina 

# Project
https://github.com/Hey-Mario/mes-project/blob/main/public/doc/projet_5.md

# Design Pattern List
You can find the details of all the Design Patterns at https://github.com/Hey-Mario/mes-project/blob/main/public/doc/plan.md

# Manufacturing Execution System Project

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file.

`DATABASE_URL` = `CONNECTOR://USER:PASSWORD@HOST:PORT/DATABASE`

or, alternatively, you can copy the content inside `env.example` and modify it based on your configutations

### Getting Started

First, install all the dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

The, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Migration (examples)

- Create migration

```bash
 npx prisma migrate dev --name "add column status on product table"
```

- Format code in model

```bash
 npx prisma format
```

- Run existing migration

```bash
 npm run migrate
```

### Others
- Show datable overview

```bash
 npx prisma studio
```

Open [http://localhost:5555](http://localhost:5555) with your browser to see the result.
