import { Stack, StackProps, CfnOutput, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiConstruct } from './constructs/api-construct';

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new ApiConstruct(this, 'Api');

    new CfnOutput(this, 'ApiUrl', {
      value: api.apiUrl,
      description: 'Base URL for the API Gateway',
      exportName: 'ApiUrl',
    });
  }
}
