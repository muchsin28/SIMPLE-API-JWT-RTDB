# Simple-login-JWT

## Introduction

This is simple API demonstrated login with email and password to get Logged In user Profile with Authentication

## Overview

This API only return access_token for response to api/login endpoint and this token will be used as request headers to access api/ endpoint and retrieve user profile. api/ can't be accessed before login

## Authentication

This API using JSON Web Token for Authentication method

## Error Codes

- 400 = Invalid data
- 401 = Unauthorized / Need login
- 404 = User / Data not found
- 500 = Internal Server Error / Invalid token
