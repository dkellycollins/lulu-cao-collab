# VibeReads

A Blog and RSS Reader website.

## Description

Backend built with [Nest](https://github.com/nestjs/nest). 

See frontend at https://github.com/lulu-cao/blog. 

See the original backend at https://github.com/lulu-cao/blog-cms-django.

See DB design at [Miro](https://miro.com/welcome/TnU0UnNuR2RoZjBIY2paYXFhTFYvTWRkREVrYldGdURJUGVYYnJtL2V0V1JSRVNUK3pLSUxJdm5tbXpwUG5MOWtzRDUwQW40eGJ6YS9KRTVqYnpUekw4S3UvK0J2Umo0OFRjNTJoZjNnWTVMMjhCb0pGZ2Fua3hZaUVKTEdSbEYhZQ==?share_link_id=928703731217).

See API design at http://localhost:3001/api when running the app. 

## Project setup

To install project dependencies:
```bash
$ npm install
```

To develop the file feature with S3, follow these steps on Mac:
```bash
brew install python
brew install pipx

# install AWS CLI and LocalStack AWS CLI
pipx install awscli-local
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run Docker
This project uses LocalStack to simulate S3 storage and retrieval. To run LocalStack in Docker:

```bash
docker compose up
```

This mocks S3 service on port 4566 for the NestJS app. 

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).

LocalStack:

- [LocalStack Doc on S3](https://docs.localstack.cloud/aws/services/s3/)
- [awscli-local](https://github.com/localstack/awscli-local)
  - `awslocal s3 mb s3://new-bucket-name`
  - `awslocal s3api list-buckets`
  - `awslocal s3 ls`
  - `awslocal s3api list-objects --bucket blog-files`
  - `awslocal s3 rm s3://profile-photo --recursive` <!-- Delete all objects in a bucket -->
  - `awslocal s3api delete-bucket --bucket profile-photo`
- [@aws-sdk/client-s3](https://www.npmjs.com/package/@aws-sdk/client-s3)
- [@aws-sdk/s3-request-presigner](https://www.npmjs.com/package/@aws-sdk/s3-request-presigner)
- [Tutorial 1 - Medium](https://iamads.medium.com/using-localstack-emulate-aws-s3-and-sqs-with-node-d43dda1d71c0)
- [Tutorial 2 - DEV Community](https://dev.to/srishtikprasad/develop-and-test-aws-s3-applications-locally-with-nodejs-and-localstack-5efb)