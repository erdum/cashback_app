# Cashback App
##### A simple server less Receipt scanning app
## Table of contents
* [Technologies](#technologies)
* [Setup](#setup)
* [Demo](#demo)
* [Why I Created](#why-i-created)
* [What I Learned](#what-i-learned)
* [Bugs and Missing Features](#bugs-and-missing-features)
* [Future](#future)
* [Working Principle](#working-principle)

## Technologies
At the time of creating this project I only knew about basic web technologies
* Html 5
* Css
* Javascript
* React.js
* Mui
* Firebase

## Setup
To run this app on localhost:

`git clone https://github.com/erdum/cashback_app.git`

`npm run start`

> you also need to change "firebaseConfig" object with your own firebase credentials

## Demo
[Live Demo](https://cashback-app-nine.vercel.app) **Note:** Please don't abuse my innocent web-app
> Currently only mobile layout is available

## Why I Created
At the end of 2021 I got an order from my client he wants a simple text extracting app which can extract specified amount from any receipt,
and then add that amount to users wallet and that's it, but I will add more functionality to it because I really need some good projects to add into my resume.
> Don't worry I have all the required permissions

## What I Learned
* How to work with Tesseract.js library
* Libraries gives you more advantage than accessing user camera or any web-api directly
* What is base64 images how to handle data in base64 format
* How to use React Reducer hook
* How useRef presist data
* How convert base64 data into blob
* React states not update immediately and how to handle them when React hydrates user display
* and much more...

## Bugs and Missing Features
* [ ] I want to add some animations to it when things and values changes on the user screen
* [ ] I also want some sort of authentication when scanning receipts like receipt Id or something
* [ ] I want to add a mechanisim for users to withdraw their points
* [ ] I also want to change it's layout for large screen

## Future
This app can scales up to the moon in terms of backend, this is the benefit of using services like firebase we can focus on our UI and UX, I will make this app more usable for practical uses because it has a lot of potential this is what I believe.

## Working Principle
Users will login or signup with their google account then they can scan their receipts and we will extract the amount of a specified item and then points to their wallets.
I will add more features to it in future.
#### Working
It's very simple so I am not explaining it
