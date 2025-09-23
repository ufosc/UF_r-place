# UF r/place Monorepo

This monorepo contains:

- `infra`: AWS CDK app for backend infrastructure (API Gateway + Lambda for `/hello`)
- `web`: Next.js (App Router) frontend that calls the backend

## Prerequisites

- Node.js 18+
- An AWS account and configured credentials (`aws configure`)
- CDK bootstrap (one-time per account/region)

## Quickstart

Install dependencies:

```bash
npm install
```

Bootstrap CDK (first time only, pick your region):

```bash
export CDK_ACCOUNT=123456789012
export CDK_REGION=us-east-1
export AWS_ACCESS_KEY_ID=...   # or ensure AWS_PROFILE is configured in your shell
export AWS_SECRET_ACCESS_KEY=...
npm run cdk:bootstrap
```

Deploy the backend:

```bash
npm run cdk:deploy
```

Note the output `ApiUrl` after deployment.

Create `web/.env.local` and set the API URL (be sure it ends with a trailing slash, e.g. `/prod/`):

```bash
echo "NEXT_PUBLIC_API_URL=<paste ApiUrl>" > web/.env.local
```

Run the frontend locally:

```bash
npm run dev
```

Open http://localhost:3000 to see the `/hello` response from the API.

## Structure

```
infra/
  bin/app.ts
  lib/backend-stack.ts
  lib/constructs/api-construct.ts
  lambda/hello.ts
web/
  app/
    layout.tsx
    page.tsx
    globals.css
  next.config.mjs
```

## Next Steps

- Add more constructs (DynamoDB, WebSocket API, S3, ALB) under `infra/lib/constructs`
- Wire new endpoints to Lambda functions under `infra/lambda` and expose them via API Gateway
- Consume new endpoints in the Next.js app (`web/app/...`) via `fetch(`${process.env.NEXT_PUBLIC_API_URL}your-route`)`

## Notes

- The API is deployed with CORS enabled for `GET` to simplify local development. Tighten this as needed in production.
- `infra` uses `aws-lambda-nodejs` to bundle TypeScript Lambdas with esbuild automatically.
- Next.js is configured with the App Router. Config is in `web/next.config.mjs`.
  

## Troubleshooting: "Unable to resolve AWS account to use"

This means CDK couldn’t determine your AWS account/region from your environment. Fix it using one of the options below.

Option A: Use environment variables (no AWS CLI needed)

1) Set static credentials in your shell (replace with your values):

```bash
export AWS_ACCESS_KEY_ID=AKIA...YOURKEY
export AWS_SECRET_ACCESS_KEY=...YOURSECRET
# If using temporary creds, also set: export AWS_SESSION_TOKEN=...YOURTOKEN
```

2) Set account/region (12-digit account ID and region):

```bash
export CDK_ACCOUNT=123456789012
export CDK_REGION=us-east-1
```

3) Bootstrap:

```bash
npm -w infra run cdk:bootstrap:env
```

Optionally, you can still use a named profile by setting it in your shell before running commands:
```bash
export AWS_PROFILE=myprofile
export CDK_ACCOUNT=123456789012
export CDK_REGION=us-east-1
npm run cdk:bootstrap
```
