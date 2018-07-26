# API

## Introduction

Hello, welcome onboard.

This project design on [#oSoc18](2018.summerofcode.be/) is a little API to fetch data about STIB/MIVB stop and gathering useable/meaningfull data about them.

This document purpose is to give an orverview about this API part of the project and necessary steps before working on it.

## Table of contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Requirements](#requirements)
- [Installation](#installation)
  - [Get Started](#get-started)
  - [Configure](#configure)
- [Routes](#routes)
  - [Endpoints](#endpoints)
- [Commands](#commands)
- [Development](#development)
  - [Enhancements](#enhancements)

## Technologies

This API exploits the following technologies :

| **Name**                                              | **Description**                                                                                         | **More infos**                                                                                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [Node.JS v10.6](https://nodejs.org/en/)               | JavaScript runtime built on Chrome's V8 JavaScript engine                                               | [Site web](https://nodejs.org/dist/latest-v10.x/docs/api/)                                                                      |
| [ECMAScript 6](https://www.npmjs.com/package/express) | New features added or improved to ECMAScript standard. Better way to code in JS. Only used some of them | [Site web](http://www.ecma-international.org/ecma-262/6.0/), [Overview](http://es6-features.org/)                               |
| [ExpressJS v4.16.0](http://expressjs.com/)            | Fast, minimalist web framework for Node.JS                                                              | [Site web](http://expressjs.com/en/4x/api.html)                                                                                 |
| [Mongoose v5.1.0](http://mongoosejs.com/)             | Elegant MongoDB Object modeling for Node.JS                                                             | [Site web](http://mongoosejs.com/docs/guides.html), [MongoDB Driver](https://www.mongodb.com/download-center?jmp=nav#community) |

## Installation

### Requirements

- All technologies, listed above, are necessary.
- This project was build with Node.JS v10.6, your Node environment must set to at least this version.
  Follow the [instructions][install]
- A connection to a MongoDB to store collections and documents.

### Get Started

```bash
    # Grab the project on the repository
    $ git clone https://github.com/oSoc18/octotrails.git

    # Move to the directory
    $ cd octotrails

    # Install dependencies
    $ npm install --save
```

### Configuration

The application need some configuration before running. By default, the config values as defined on this [file](./config/config.js).
To overwrite those, please do so :

Rename the `env.example` to `.env`.

```bash
    # Copy and rename the .env.example
    $ copy .env.example .env
```

Open the .env file.

#### Jwt Secret

I strongly recommand to change your `JWT_SECRET` to some random string. Typically, this string should be at least 32 characters long.

**If the JWT_SECRET key is not set, the default value will be used !**

#### Database

All required info to make a sucessful connection to the database have to be input in the config with the corresponding key.

```env
    MONGOOSE_DEBUG=(true|false)
    MONGO_HOST=
    MONGO_PORT=
```

On the first run, all required collections/documents will be created and fullfilled with some basic data.

#### STIB/MIVB API URL

An URL to get the STIB DATA about the stop must be provided, otherwise the stop resource will not be available.

```env
    STIB_API = {URL to the data on the stop}
```

### Run

```bash
    # Run localy at http://0.0.0.0:8081
    $ npm run start:server

    # Now, let's test that API
    # Open this URL in a browser : http://0.0.0.0:8081/api/zen

    # To run in production :
    # On the Nginx file for the site dedicated to this APi,
    # make sure to redirect to the folder public/index.php
```

## Routes

**Base url** : `/api`

All routes must be prefixed with this base url.

For instance, to get all categories , you must hit this route : `https://example.com/api/categories`

**[Formats of objet send and return by this API](./docs/formats.md)**

### Endpoints

#### Test/Check endpoint

- **[`GET` zen/](./docs/api/endpoints/GET_zen.md)**

#### Auth

- **[`POST` login/](../../docs/api/endpoints/auth/POST_login.md)**

#### Stop Resource

- **[`GET` stops/search](../../docs/api/endpoints/stops/GET_search.md)**
- **[`GET` stops/histories](../../docs/api/endpoints/stops/GET_histories.md)**
- **[`GET` stops/proximity](../../docs/api/endpoints/stops/GET_proximity.md)**
- **[`POST` stops/inputs](../../docs/api/endpoints/stops/POST_inputs.md)**

#### Question Resource

- **[`GET` questions/](../../docs/api/endpoints/questions/GET_questions.md)**

#### History Resource

- **[`GET` histories/:history_id](../../docs/api/endpoints/histories/GET_histories.md)**

#### Category Resource

- **[`GET` categories/](../../docs/api/endpoints/categories/GET_categories.md)**
- **[`GET` categories/:category_num](../../docs/api/endpoints/categories/GET_category.md)**
- **[`GET` categories/:category_num/questions](../../docs/api/endpoints/categories/GET_category_questions.md)**

### Enhancements

[install]: ../../docs/INSTALL.md
