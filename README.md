[![Build Status](https://travis-ci.org/kobvel/blockchain-nodejs.svg?branch=master)](https://travis-ci.org/kobvel/blockchain-nodejs)
[![Coverage Status](https://coveralls.io/repos/github/kobvel/blockchain-nodejs/badge.svg?branch=master)](https://coveralls.io/github/kobvel/blockchain-nodejs?branch=master)
# Decentralized blockchain network

[Blockchain](https://en.wikipedia.org/wiki/Blockchain) is a core concept behine all modern decentralized cryptocurrencies. In this repo you can check manually how does it work on the basic level.
### [Blockchain Angular Wallet](https://github.com/kobvel/blockchain-nodejs-wallet)
Root repository includes [*submodule repository*](https://github.com/kobvel/blockchain-nodejs-wallet "submodule") with the multi-functional wallet which allows:

* Create multiple wallets
* Send coins between wallets
* Switch between blockchain nodes
*(if system is fully decentralized it must not make difference which node you use for the transactions)*

## Quick start
### 1. Decentralized application
To feel the real taste of the decentralized applications and the power behind it I highly recoomend to follow this part of build and setup applicaiton locally. Because of complexity of deploying multiple in the docker images and network dependencies, I decided to create **Client-Server** build, so you can easily pull it as a docker image.
#### Instruction
```bash
npm install
git submodule init
git submodule update
```
You will get installed all needed dependencies and nested [blockchain-nodejs-wallet](https://github.com/kobvel/blockchain-nodejs-wallet) application.
Make sure you have declared variable environment `DOCKER_HOST`. You can check it by running `$echo $DOCKER_HOST` from your terminal.

The last step is to compose all images:
- blockchain node1
- blockchain node2
- blockchain node3
- wallet

by running:

```
docker-compose up -d
```
You can find more details in the corresponding [docker-compose](https://github.com/kobvel/blockchain-nodejs/blob/master/docker-compose.yml) file.

#### Result

To check your image statuses:
```
docker-compose -ps
```

![docker-compose ps](https://image.ibb.co/gOfY4G/Screen_Shot_2018_01_24_at_20_38_45.png "docker-compose ps")

Now you can open your wallet image address in the browser and explore the app!

### 2. Client-server build

This is **simplified build** of application with the connected blockchain server to wallet client. Was created to give a simple way to pull docker image and play around without any extra configuration.
##### Warning:
> It is not the way real blockchain systems work
> Was created just for the DEMO purpose

You can pull latest image by running
```
docker pull kobvel/blockchain-nodejs
```
Here is public link to the image: https://hub.docker.com/r/kobvel/blockchain-nodejs/
