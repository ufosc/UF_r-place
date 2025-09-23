import { Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaRestApi, EndpointType } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'node:path';

export class ApiConstruct extends Construct {
  public readonly apiUrl: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const helloFn = new NodejsFunction(this, 'HelloHandler', {
      entry: join(process.cwd(), 'lambda/hello.ts'),
      handler: 'handler',
      runtime: Runtime.NODEJS_20_X,
      timeout: Duration.seconds(5),
      bundling: {
        minify: true,
        sourceMap: true,
        target: 'node20',
        sourcesContent: false,
      },
      environment: {
        POWERTOOLS_LOG_LEVEL: 'INFO',
      },
    });

    const api = new LambdaRestApi(this, 'RestApi', {
      handler: helloFn,
      proxy: false,
      deployOptions: {
        stageName: 'prod',
      },
      endpointConfiguration: {
        types: [EndpointType.REGIONAL],
      },
      defaultCorsPreflightOptions: {
        allowOrigins: ['*'],
        allowMethods: ['GET', 'OPTIONS'],
      },
    });

    api.root.addResource('hello').addMethod('GET');

    this.apiUrl = `${api.url}`;
  }
}
