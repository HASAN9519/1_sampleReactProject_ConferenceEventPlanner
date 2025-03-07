###  this project is cloned from following github link 
git clone https://github.com/ibm-developer-skills-network/conference_event_planner.git


### original code instructions
https://author-ide.skills.network/render?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZF9pbnN0cnVjdGlvbnNfdXJsIjoiaHR0cHM6Ly9jZi1jb3Vyc2VzLWRhdGEuczMudXMuY2xvdWQtb2JqZWN0LXN0b3JhZ2UuYXBwZG9tYWluLmNsb3VkL21EMktPZkNvVHZ3b0xlMGJBanBqSHcvUHJhY3RpY2UlMjBQcm9qZWN0LSUyMEV2ZW50JTIwQ29uZmVyZW5jZSUyMFBsYW5uZXItdjEubWQiLCJ0b29sX3R5cGUiOiJ0aGVpYSIsImF0bGFzX2ZpbGVfaWQiOjUxODQ0LCJhZG1pbiI6ZmFsc2UsImlhdCI6MTczMjY3OTY2Nn0.DhuF-MhoNp86oRnbJuknrSM1gqImZ0ME-iFw7QJqhG0


## install all the necessary packages to execute the application
npm install

## changed preview in package.json file to run in local machine
earlier>>>   "preview": "vite build; vite preview --host"
now>>>>      "preview": "vite build && vite preview --host"

## running the application
npm run preview

### linking project with my github
### first create github repo without readme file
git init

git config --global user.email "shehab10111995@gmail.com"

git config --global user.name "HASAN9519"

git add --a

git commit -m "initial commit"

git branch -M main

### linking project with created github repo 
git remote add origin https://github.com/HASAN9519/1_sampleReactProject.git

git push -u origin main


### Deploy using GitHub Pages

#### To deploy your react application in GitHub you need to install gh-pages
npm install gh-pages --save-dev

#### Add given lines before "build": "vite build" in package.json file
"predeploy": "npm run build",
"deploy": "gh-pages -d dist",

#### in the vite.config.js file add this line before plugins: [react()]
base: "/REPOSITORY_NAME",

#### perform deploy command in the terminal to executes the "deploy" script defined in the package.json file, deploying the project to GitHub Pages using the gh-pages tool

npm run deploy