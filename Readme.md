# React Application with Keycloak integration

This project is a full-stack web application that demonstrates how to use OAuth 2.0 and OpenID Connect with the authorization code grant flow and Proof Key for Code Exchange (PKCE) to secure a React client application and a Node.js API using Keycloak as an identity provider. The React client application allows users to login and access protected resources, while the Node.js API and the underling Mongo DB serves as the backend for the application.

The demo app implements SSO to allow users to log in once and access multiple applications without having to log in again. It also implements silent authentication to keep the user logged in automatically even after the session expires.

This project is a great starting point for developers who want to learn how to implement OAuth 2.0 and OpenID Connect with the authorization code grant flow and PKCE in their own React and Node.js applications using Keycloak as the identity provider.

## Overview
![alt text](doc/Diagram.png)


| To-Do List App  | OAuth Terminology    | Description                                                                    |
|-----------------|----------------------|--------------------------------------------------------------------------------|
| User            | Resource owner       | The entity that grants access to the resources                                 |
| React Front-end | Client               | Application which accesses protected resources on behalf of the resource owner |
| Keycloak        | Authorization server | Authenticates the resource owner and issues access tokens                      |
| Node API        | Resource server      | The server that hosts the protected user data                                  |

## How to run
You need docker-compose version 1.22.0 and React 16.0 or later to build the app.

1. You can build and run Docker containers with sample data for Keycloak, Node API and MongoDB, as followes:
```bash
docker-compose up --build
```

2. Then start the React client and open the app in the browser http://localhost:3000
```bash
cd client
npm install
npm start
```

Keycloak comes with some predefined user profiles

| User Name | Password |
|-----------|----------|
| John      | password |
| Alice     | password |

The admin console is available under: http://localhost:8080/auth/admin

| User Name | Password |
|-----------|----------|
| admin     | password |
