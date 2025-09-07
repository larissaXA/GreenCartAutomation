# End-to-End QA Process - Green Cart Validation 
## Table of Contents
* [Overview](#overview)
* [Project Description](#project-description)
* [Tools and Technologies](#tools-and-technologies)
* [Prerequisites](#prerequisites)
* [Running the GreenCart Application Locally](#running-the-greencart-application-locally)
* [Running the Automation Tests](#running-the-automation-tests)

## Overview
This repository contains the automation test suite for the GreenCart web application, a sample e-commerce platform for plants and groceries. The tests cover functional (UI and API) and non-functional aspects of the application, ensuring high quality, usability, and performance.
This README is designed to provide a complete understanding of the project, explain the tools used, and guide you step-by-step on how to run both the GreenCart application and the automation tests locally.

## Project Description
[GreenCart](https://github.com/YashSahsani/GreenCart) is a web application that allows users to:
* Browse, search, filter, and sort products (plants, groceries).
* Manage their cart: add, update quantities, remove items, and check total prices.
* Create and delete product listings in the "My Listings" section.

The automation project is implemented using Cypress for end-to-end UI and Postman for API testing.

## Tools and Technologies
* **Cypress**: Main automation framework used to test UI functionalities.
* **Postman**: Used for manual API exploration, testing and debugging before automation.
* **Node.js / npm**: Required to run Cypress and manage automation dependencies.
* **Mochawesome**: Generates detailed and visually clear test reports from Cypress execution.

## Prerequisites
Before running the GreenCart application and automation tests, make sure you have installed:
* Node.js and npm (v16 or later) ([Download Node.js](https://www.nodejs.tech/pt-br/download))
* Git ([Download Git](https://git-scm.com/downloads))
* Python ([Download Python](https://www.python.org/downloads/))
* Web browser

## Running the GreenCart Application Locally
As mentioned on the [GreenCart project github](https://github.com/YashSahsani/GreenCart), here are the steps to run the project on your machine:
1. **Open the Terminal application on your machine at some folder**
2. **Clone the github project on this folder**
```
git clone https://github.com/YashSahsani/GreenCart.git
```
3. **Navigate to the project folder**
```
cd GreenCart
```
4. **Install virtual environment**
```
pip install virtualenv
```
```
virtualenv venv
```
**or**
```
python3 -m venv venv # create virtual enviroment
```
5.**Activate virtual environment**
  - For Mac/Linux
      ```
      source venv/bin/activate # activate virtual env for Mac and Linux
      ```
      ```
      pip install -r requirements.txt
      ```
  - For Windows
    ```
    .\venv\bin\activate # activate virtual env for Windows
    ```
    ```
    .\venv\Scripts\activate
    ```
    ```
    pip install -r requirements.txt
    ```
6. **Migrations**
```
python manage.py makemigrations
```
```
python manage.py migrate
```
```
python manage.py runserver
```
7. You'll probably see something like "Starting development server at http://127.0.0.1:8000/" at your Terminal. Open this link at your browser

P.S.: After that, to run a second time, you just simply need to navigate to the project folder, activate the environment and run ```python manage.py runserver```

## Running the Automation Tests
1. **Open the Terminal application on your machine at some folder**
2. **Clone the github project on this folder**
```
git clone https://github.com/larissaXA/GreenCartAutomation.git
```
3. **Navigate to the project folder**
```
cd GreenCartAutomation
```
4. **Install dependencies**
```
npm install
```
5. **Open Cypress Test Runner**
```
npx cypress open
```
This will open the Cypress GUI, where you can select and run test suites.

6. **Run all tests in CLI mode (headless) and generate Mochawesome reports**
```
npx cypress run --reporter mochawesome
```
7. **View the reports**
Generated reports are located in the /cypress/reports folder. They include detailed logs, screenshots of failed tests and pass/fail summaries.

