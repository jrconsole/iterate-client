Welcome to Iterate! This is the premier app for leasing the industry's latest graphics cards.

To start the Iterate frontend on your local port 3000, clone this repo (iterate-client) and run the following command from the root directory:

`npm start`

Alternatively, if you have Docker installed you can run a Dockerized frontend. Just clone this repo and run the following commands from the root directory:

`docker build . -t iterate-client`
`docker run -p 4000:4000 -d --name iterate-client iterate-client`

To start the Iterate server, navigate to the iterate-server repo and follow the instructions in the README.

The Iterate frontend uses React and Apollo to show you the graphics cards available for lease and allow you to reserve the card of your choice.

There are 2 branches: master and portfolio. 

The master branch is deployed (via Digital Ocean) and used for taking real-world reservations for graphics cards. Any code pushed or merged into the master branch will be automatically deployed and made visible to Iterate customers.

The portfolio branch is the primary development branch, also used as a staging environment. Any code pushed or merged to the portfolio branch will be automatically deployed (via Digital Ocean) and linked to on my personal portfolio website.

Any and all recommendations are appreciated! 