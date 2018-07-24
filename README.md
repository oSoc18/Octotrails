[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# qControl

A Data Collector

Our partner STIB/MIVB ...
A mobile application to make the control process of the stop easier and more efficiet.
One of its major advantages is focusing on the accessibility of the stops (outside and inside the station) by asking differents questions to the user.

Our team Octotrails has the pleasure to present 'qControl' .

# Features & Technologies

MEAN Stack application based on [mean.io](https://github.com/linnovate/mean).

## [ WebApp][frontend]

- Angular
- Material Design
- SCSS with SASS with node

## [WebAPI][backend]

- Node.JS
- Express.JS
- Mongoose

## Runing

```bash
    # Run localy at the api http://0.0.0.0:8081
    # Run localy at the web-app http://0.0.0.0:4200
    $ npm run start

    # Now, let's test that app
    # Open this URL in a browser : http://0.0.0.0:4200

    # To run in production :
    # On the Nginx file for the site dedicated to this APi,
    # make sure to redirect to the folder src/web-api/index.html
```

## Contributors

| Role                           | Name          |
| ------------------------------ | ------------- |
| Designer & Front-end Developer | Eva Jacobs    |
| Designer & Front-end Developer | Pauline Tahon |
| Back-end & Front-end Developer | Bram Breys    |
| Back-end Developer             | David A.      |

## License

Octotrails-qControl is licensed under the [MIT license][info-license].

Copyright &copy; 2018, Octotrails

[info-license]: ./LICENSE
[info-node]: ./package.json
[backend]: ./src/web-api/
[frontend]: ./src/web-app/
