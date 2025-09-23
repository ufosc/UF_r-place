#!/usr/bin/env node
import 'source-map-support/register';
import 'dotenv/config';
import * as cdk from 'aws-cdk-lib';
import { BackendStack } from '../lib/backend-stack';

const app = new cdk.App();

const stack = new BackendStack(app, 'UfRPlaceBackend', {
  env: {
    // Account/Region resolution order:
    // 1) Explicit env vars you set (CDK_ACCOUNT/CDK_REGION)
    // 2) Values injected by CDK when AWS creds are configured (CDK_DEFAULT_ACCOUNT/CDK_DEFAULT_REGION)
    // 3) Fallback region 'us-east-1'
    account: process.env.CDK_ACCOUNT ?? process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_REGION ?? process.env.CDK_DEFAULT_REGION ?? 'us-east-1',
  },
});

cdk.Tags.of(stack).add('Project', 'UF_r-place');
