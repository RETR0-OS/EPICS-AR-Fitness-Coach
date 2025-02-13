# AR Fitness Coach
## Welcome Letter
Hello, team.
This repository will be used to contribute code to the project. Here are a few rules:
- Contribute the code to its dedicated directory only: front end to front end, back end to backend etc.
- PLEASE make a branch before making any changes to the project. Make changes only in the branch that you made. DO NOT WORK ON MAIN
- Please do not merge code without a code review from your peers. Think twice, merge once. Rebasing repositories is hard and wastes time and sometimes even code.
- Coordinate with your team to avoid repetition of work. Isolate separate sub-features of features before starting to build for maximum efficiency.
- Check discord often for any updates.
- Let the rest of the team know when you open a pull request for a faster code review. Sometimes PRs can get missed.

## Teck Stack
Please note that none of this tech stack is set in stone. All of it is ever-evolving. You are free to play around with the code base as much as you want as long as you keep making meaningful contributuions, progress and learning.
### Frontend
- React.JS
- Tailwind CSS (A CSS library that provides quick styling options to avoid wasting time in writing long CSS files)
- Bootstrap (An alternative to tailwind. You guys are welcome to use any of the two)
- Animate.css (An CSS framework that allows easy animations of web-based elements in case you guys wish to make the UI more interactive)
- Retool (Provides pre-built React components to use)

### Backend
- Node.JS
- JWT (Token-based authentication framework to allow user validation from the frontend)
- Axios (An API client used to make web requests. Will be used to make requests to Python inference model endpoint)
- Further tech stack will be added after more research

### Database
- MySQL (An  SQL-based relational DB that allows storage of data in the form of tables).

### Computer Vision Model Inference Endpoint
- Python
- Hugging Face (An online AI/ML model repository of open-source models)
- Google ViTPose++ (An open source computer vision model for human pose estimation)
- FastAPI  (A lightweight python-based framework used to build API endpoints)

## Instructions for Development
### Front End
- Please keep a detailed markdown file contaning the site map of the front end. Please list any features you add, libraries and/or frameworks you use for the other teams to build off of it.

### Backend
- Please list all API endpoints in a markdown file and the function they perform for the front end team to refer to. With every endpoint, list the JSON object format being returned so that the front end team can build mock data for testing accrodingly.
- Please maintain a separate markdown file for the database implementation. List the tables created, their purpose, and the schema used for the front end to refer to.

### AI
- Please list all endpoints in a detailed markdown file, their returned  JSON object format, and a description of the return values. 
- !!!**DO NOT PUSH ANY API TOKENS TO GITHUB**!!!! THIS IS VERY VERY VERY IMPORTANT. Please maintain a separate .env file for authentication tokens and add the file in the .gitignore. Removing any auth tokens from github commit history is a very big hassle and requires a repository rebase. This prevents us from rolling back to old commits in case anything breaks. Hence, please ensure before every push that there are no .env files staged in the commit.

## Contributions
Please note that this repository does not accept contributions from members outside the EPICS @ ASU team. This repository is public merely for viewing purposes.
