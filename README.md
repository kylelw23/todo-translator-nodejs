# todo-translator-nodejs

RESTful API for Todo Translator Frontend

## Steps to run the project locally

1. run `npm install sequelize-cli`
2. run `npx sequelize-cli db:create`
3. run `npx sequelize-cli db:migrate`
4. run `npm install`
5. run `npm start`

## To make it worked locally

Please make sure the config aligns with the credentials for todo-translator-development database which sequelize cli just created
`./config/config.json`

```
"development": {
    "username": "<your-username>",
    "password": "<your-password>",
    "database": "todo_translator_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
```

## For admin user

Please manually create a user (table users) with type "admin" so it can be accessed via todo-translator-frontend app

```
INSERT INTO users (username, password, email, type, "createdAt", "updatedAt")
VALUES ('admin', 'password123', 'admin@admin.com', 'admin', NOW(), NOW());
```
