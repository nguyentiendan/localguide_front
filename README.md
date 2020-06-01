# Local Guide Pal website

![Deploy](https://github.com/nguyentiendan/localguide_front/workflows/Deploy/badge.svg)

## Project structure
```
|_ .github
|    |_ workflows
|        |_ deploy-to-ec2.yml # Github actions that deploy frontend code to existing server
|_ pipeline
|    |_ ansible   # Ansible scripts support for deployment
|    |_ terraform # Terrafrom configuration that help to quickly setup infrastructure on AWS
|
|_ src-front-end # Front-end source code
```

## Setup infrastructure
### What is Terraform
Terraform is a tool for building, changing, and versioning infrastructure safely and efficiently. Terrafrom helps to manage infrastructure-as-code
In this project, we use Terraform to manage a very simple server on AWS. In future, it can be extended for system management.

### Set up infrastructure
To let Terraform interact with AWS, we need to provide AWS credentials. There are some ways to provide AWS credentials, but let use the simplest way: using environment variable.
https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html

```bash
$ export AWS_REGION=ap-northeast-1 # Tokyo region
$ export AWS_ACCESS_KEY_ID=<your-aws-access-key>
$ export AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
$ cd <project-path>/pipeline/terraform
$ terraform init
$ terraform apply -auto-approve
```

**Note**: I setup infrastructure already, you don't need to run Terraform.


### App CI/CD setup
We use Github Actions to deploy front-end application to existing server (setup by Terraform).
We need to create Secrets in GitHub repo:
* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY
* SSH_PRIVATE_KEY_PROJECT_PAL

### Development using Docker

**Start development server**
```bash
$ docker-compose up
$ docker-compose up --build # force build image
```

**Stop development server**
```bash
$ docker-compose down
$ docker-compose down -v # down and remove named volumes (node_modules)
```

**View container log**
```bash
$ docker-compose logs website
```

**Access an interactive prompt**
```bash
$ docker-compose exec website sh
$ docker-compose run --rm website sh # runs a one-time command
```

## References

- [Gatsby Framework](https://www.gatsbyjs.org/)
