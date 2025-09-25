# UF r/place

A modern, extensible r/place clone designed specifically for the University of Florida campus community. Built with AWS serverless architecture and Next.js, this project allows students to collaboratively create pixel art on a shared canvas.

## 🏗️ Project Structure

This monorepo contains:

- `infra/`: AWS CDK infrastructure (API Gateway + Lambda functions)
- `web/`: Next.js frontend application with modern React patterns

## 📖 Getting Started

**For complete setup instructions, visit the [Wiki](https://github.com/ufosc/UF_r-place.wiki)**

### Quick Setup

1. **Prerequisites**: Node.js 18+, AWS account, AWS CLI
2. **Install**: `npm install`
3. **Configure**: Set up AWS credentials and create `.env` files
4. **Deploy**: `npm run cdk:bootstrap` then `npm run cdk:deploy`
5. **Run**: `npm run dev`

### 📚 Documentation

- **[Getting Started Guide](https://github.com/ufosc/UF_r-place.wiki/blob/master/Getting-Started.md)** - Complete setup walkthrough
- **[AWS Configuration](https://github.com/ufosc/UF_r-place.wiki/blob/master/AWS-Configuration.md)** - Detailed AWS setup
- **[Project Overview](https://github.com/ufosc/UF_r-place.wiki/blob/master/Project-Overview.md)** - Architecture and design
- **[Extensibility Guide](https://github.com/ufosc/UF_r-place.wiki/blob/master/Extensibility-Guide.md)** - Adding new features

## 🛠️ Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: AWS Lambda, API Gateway, CDK  
- **Infrastructure**: AWS CDK, CloudFormation
- **Development**: npm workspaces, ESLint, esbuild

## 🏛️ Architecture

```
UF_r-place/
├── infra/              # AWS Infrastructure
│   ├── bin/app.ts     # CDK app entry point
│   ├── lib/           # CDK constructs and stacks
│   └── lambda/        # Lambda function handlers
└── web/               # Next.js Frontend
    ├── app/          # App Router pages and components
    └── .env.local    # Environment configuration
```

## 🚀 Development

The project uses modern development practices:
- **AWS CDK** for infrastructure as code
- **Next.js App Router** for modern React patterns
- **TypeScript** throughout the stack
- **Serverless architecture** for scalability and cost efficiency
- **npm workspaces** for monorepo management

## 🎓 Educational Purpose

This project is designed for the UF Open Source Club community, emphasizing:
- **Learning AWS serverless architecture**
- **Modern React and Next.js patterns** 
- **Infrastructure as Code with CDK**
- **Collaborative development workflows**

## 🤝 Contributing

We welcome contributions from the UF community! The architecture is designed to be:
- **Simple** - Easy to understand and modify
- **Extensible** - Straightforward to add new features
- **Cost-effective** - Runs within AWS Free Tier
- **Educational** - Great for learning modern web development

## 📞 Support

- Check the [Wiki documentation](https://github.com/ufosc/UF_r-place.wiki) for detailed guides
- Review existing code in `infra/` and `web/` directories  
- Ask questions in the UF Open Source Club community

## Next Steps

- Add more constructs (DynamoDB, WebSocket API, S3, ALB) under `infra/lib/constructs`
- Wire new endpoints to Lambda functions under `infra/lambda` and expose them via API Gateway
- Consume new endpoints in the Next.js app (`web/app/...`) via `fetch(`${process.env.NEXT_PUBLIC_API_URL}your-route`)`

## Notes

- The API is deployed with CORS enabled for `GET` to simplify local development. Tighten this as needed in production.
- `infra` uses `aws-lambda-nodejs` to bundle TypeScript Lambdas with esbuild automatically.
- Next.js is configured with the App Router. Config is in `web/next.config.mjs`.
