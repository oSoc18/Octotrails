[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# [qControl](https://qcontrol.be)

All transportation stops need to be inspected by a MIVB/STIB controller. The controller needs to write everything down and put it into an Excel sheet. The whole process is inefficient and time-consuming.

To make the controller's life easier, our team Octotrails designed an easy web application for collecting data on the stops. No double work anymore, but an easy to answer, centralized with extra functionalities.

Our app will ease out the stop control process and make it more efficient and meaning.
One of its major advantages is focusing on the accessibility of the stops (outside and inside the station) by asking different questions to the user.

# Features & Technologies

MEAN Stack application based on our custom MEAN version [mean](https://github.com/Dakad/mean-octotrails-starter).

## [ WebApp][frontend]

- Angular
- Material Design
- SCSS with SASS with node

## [WebAPI][backend]

- Node.JS
- Express.JS
- Mongoose

# Docker

- To start a dockerized version of your application, use `docker-compose up`

## Runing

```bash
    # Run localy the api at http://0.0.0.0:8081
    # Run localy the app at http://0.0.0.0:4200
    $ npm run start

    # Now, let's test that app
    # Open this URL in a browser : http://0.0.0.0:4200

    # To run in production :
    $ npm run start:prod
    # On the Nginx file for the site dedicated to this APi,
    # make sure to redirect to the folder src/web-api/index.html
```

## Contributors

| Role                           | Name                                             |
| ------------------------------ | ------------------------------------------------ |
| Designer & Front-end Developer | [Eva Jacobs](https://github.com/evajacobs)       |
| Designer & Front-end Developer | [Pauline Tahon](https://github.com/PaulineTahon) |
| Back-end & Front-end Developer | [Bram Bleys](https://github.com/BramBleys)       |
| Back-end Developer             | [David A.](https://github.com/Dakad)             |

## License

Under the [MIT license][info-license].

Copyright &copy; 2018, Octotrails

[info-license]: ./LICENSE
[info-node]: ./package.json
[backend]: ./src/web-api/
[frontend]: ./src/web-app/
