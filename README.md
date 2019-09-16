# HTTP, AJAX and RESTful API's

## Objectives
- [ ] Complete Sub-Unit 1 - HTTP & The Web
- [ ] Complete Sub-Unit 2 - AJAX
- [ ] Complete Sub-Unit 3 - REST & API's

## Teacher's Expectations
What students should know by now...
1. How to read markdown files like this.
2. How to `cd` into the proper directories...
3. How to create and run npm scripts.
4. How to fork this repo, clone it, watch this repo, pull from it for updates and handle merge conflicts by applying what they learned last year...
5. How to READ, SEARCH, ASK, etc ...

## Directory Tree
```bash
├── 01-HTTP/
│   ├── Exercise 1 HERE
├── 02-AJAX/
│   ├── README.md
│   │   ├── This is the exercise
│   │   │   instructions.
│   ├── Exercise-LAMP/
│   │   ├── docker-compose.yml
│   │   ├── sample.env
│   │   │   ├── You must rename this file.
│   │   ├── www/  
│   │   │   ├── EXERCISE FILES HERE.
│   │   ├── ssl/
│   │   │   ├── Students dont touch.
│   │   ├── logs/
│   │   │   ├── Students dont touch.
│   │   ├── data/
│   │   │   ├── Students dont touch.
│   │   ├── config/
│   │   │   ├── Students dont touch.
│   ├── Student Files/
│   │   ├── Old Zip Files
├── Projects/
│   ├── AJAX_Project1.md
│   │   ├── This is the project 1
│   │   │   instructions.
│   ├── AJAX_Project2.md
│   │   ├── This is the project 2
│   │   │   instructions.
│   ├── Project01/
│   │   ├── Project 1 Files
│   ├── Project02/
│   │   ├── Project 2 Files
│   ├── Project-Lab/
│   │   ├── docker-compose.yml
│   │   ├── sample.env
│   │   │   ├── You must rename this file and probably change the ports...
│   │   ├── www/  
│   │   │   ├── PROJECT GO FILES HERE.
│   │   ├── ssl/
│   │   │   ├── Students dont touch.
│   │   ├── logs/
│   │   │   ├── Students dont touch.
│   │   ├── data/
│   │   │   ├── Students dont touch.
│   │   ├── config/
│   │   │   ├── Students dont touch.
├── README.md
├── package.json
└── .gitignore
```



## Common "issues" students run into when they are not following directions.

1. Are you in the right directory?
   
   READ the ERROR !
   
   <img width="538" alt="Screen Shot 2019-09-15 at 10 46 26 AM" src="https://user-images.githubusercontent.com/52793815/64925492-c4729300-d7e0-11e9-93b9-b6ef0f8e30ad.png">
   
   This means there is not a `docker-compose.yml` file and the `docker-compose up` command will not run. You must cd into the correct directory. 
   
   Example: `cd /02-AJAX/Exercise-LAMP/` .
   
2. Variables not defined.

   <img width="675" alt="Screen Shot 2019-09-15 at 10 45 07 AM" src="https://user-images.githubusercontent.com/52793815/64925482-98571200-d7e0-11e9-85a6-dd7ebf7337f0.png">
   
   This means you probably dont have a `.env` file which defines the variables for the ports in `docker-compose.yml`. You need to rename `sample.env` to `.env` and preferably change the variables for users and passwords because its a security risk...

3. Port already in use.

    <img width="576" alt="Screen Shot 2019-09-15 at 10 35 45 AM" src="https://user-images.githubusercontent.com/52793815/64925388-5aa5b980-d7df-11e9-838b-ce34f99bc199.png">
    
   Going back to the READ, proceedure. This often happens because is already in use. It could also happen the previous class doesn't close docker in which may require a computer reset...
   
   You should check if docker containers are running and which ports with the command `docker ps`.
   
   <img width="1170" alt="Screen Shot 2019-09-15 at 10 42 01 AM" src="https://user-images.githubusercontent.com/52793815/64925445-25e63200-d7e0-11e9-97b1-0d32c5c6b3cc.png">

   IF the port is in use from docker and not something else you can solve this by running `docker stop $(docker ps -aq)` which will stop all running docker containers.

## How to use
1. Follow directions in class.
2. Come to class early if you need a head start.
3. Work during break if you need to catch up.
4. Ask your peers for help then ask the instructor if it is a new or more serious issue.
