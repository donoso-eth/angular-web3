# 🏄‍♂️ Quick Start

## Installation

Prerequisites: To be in an **Angular project**

```bash
ng new web3-hello-world 2
```

cd in the directory

```bash
cd new web3-hello-world  
```

#### 1) Add the angular-web3 schematics package to your project

```bash
ng add angular-web3
```

#### 2) chose installation Options:

The package will prompt the options for configuration

* Project name in the case that your workspace has more than one angular project
* Do you want to install a Demo app or only infrastructure/services?

We will choose Hello World Contract

#### 3) Updated tsconfig.json:

All relevant web3 dapp files are under de DappInjectorModule. For ease of coding we have added a path in the tsconfig file:

```
"paths":{"angular-web3":["src/app/dapp-injector/index.ts"]}
```

to be able to :

```
import { DappFeature } from 'angular-web3'
```

One if the common issues that we will encounter moving forward will be the errors by compilation when adding libraries (not webpack 5 ready), therefore we will update also the tsconfig file including the oprtion "dasd"

## Boostrap Blockchain

A collection in GitBook is kind of like a folder for your spaces or other collections. When you create a collection, you'll get a kind of ‘tree’ view in your sidebar.

This makes it super easy to collect all your content into logical groups and can have a big impact on your GitBook experience!

## Going further with collections

We're just touching on the basics here, but if you want to get extra fancy, collections can actually be published and have their very own set of permissions! Feel free to go explore, but for now, let's have a peek at the GitBook editor.
