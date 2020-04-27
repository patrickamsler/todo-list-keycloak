# To-Do List React Application with Keycloak integration

Simple React demo application that uses Keycloak for user authentication. The idea of the app is to demonstrate the concepts of login, SSO and silent authentication for single page applications. It includes a protected RESTful API based on NodeJS and MongoDB to store user data. Keycloak exposes OAuth/OpenID-Connect endpoints to retrieve user information and issue access tokens by using the authorization code grant flow PKCE. The application doesn’t have a back-end component and stores the tokens directly in the browser’s local storage.

## Overview
![alt text](doc/Diagram.png)


| To-Do List App  | OAuth Terminology    | Description                                                                    |
|-----------------|----------------------|--------------------------------------------------------------------------------|
| User            | Resource owner       | The entity that grants access to the resources                                 |
| React Front-end | Client               | Application which accesses protected resources on behalf of the resource owner |
| Keycloak        | Authorization server | Authenticates the resource owner and issues access tokens                      |
| Node API        | Resource server      | The server that hosts the protected user data                                  |

## Local Setup
Prerequisites
* docker-compose version 1.22.0 or later
* React 16.0 or later

1. Build and run Docker containers with sample data for Keycloak, Node API and MongoDB:
```bash
docker-compose up --build
```

2. Start React client
```bash
cd client
npm install
npm start
```

Access React application: http://localhost:3000

Keycloak comes with some predefined user profiles
* User: John Password: password
* User: Alice Password: password

Access Keycloak admin console: http://localhost:8080/auth/admin

User: admin Password: password
