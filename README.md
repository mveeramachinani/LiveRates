# Introduction
This project serves as a test bed implementation of SignalR and Angular 9, to demonstrate polling of data from a back-end source onto an SPA front-end.

SignalR was decided upon due to the fact that all web service calls have already been built using .Net Core 3.1 and hubs exposed by SignalR would fit the current architecture perfectly.

# Technologies
* Microsoft .Net Core 3.1
* Google Angular v9
* Microsoft SignalR
* Docker

# Getting Started

After cloning the Angular project, navigation into the project with bash/shell/terminal or powershell, and run "docker-compose -f dist/web/docker-compose.yml up" to start the container for the Angular app.

Then run the docker container to launch .NET Core Microservice.

I containerized .NET core microservice by using Docker images that come pre-built with .NET Core. I referenced this article to containerize my .NET core microservice

https://docs.microsoft.com/en-us/dotnet/core/docker/build-container?tabs=windows

One thing i couldn't get right is how to get .NET Core microservice to run on the same port everytime. I struggled to get it right. So one thing that should be changed in the front end angular app is change the URL pointing to .NET Core microservice in market-changes component and singal-r service files.




