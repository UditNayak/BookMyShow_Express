## Axios & Proxy : Client-Server Interaction

### http://localhost:3000/register
![Registration Page](./assets/register.png)

### Mongodb Database Updation
![Database Updated When the User Registered](./assets/RegistrationDatabase.png)

### http://localhost:3000/login
![Login Page](./assets/login.png)

## JWT Authentication
#### Token Generation
![JWT Taoken](./assets/jwtToken.png)
#### Token Decryption
![Token Details](./assets/tokenDetails.png)
#### Token Details Matches to the Database Details
![Database Detail of Token](./assets/DatabaseDetailofToken.png)

### User Authentication using Bearer Token
![Bearer Token Authentication](./assets/BearerTokenAuthentication.png)

### Protected Routes
When ever someone want to access the Home Page without Login, then this protected route will redirect the user to the login page.
![No access to home page without Token present on the local storage](./protectedRouteWithoutToken.png)
If the Token is present then it will allow the user to access the Home page.
![Protected route on Home Page](./assets/homePageProtectedRoute.png)

#### No Access to Login Page when the user was already Logged in
If the Token is present in the Local Storage, that means the user is already logged in. So it will redirect the user to the Home page whenever the user will try to access "/login".
![Redirect t0 Home when Token Exists](./assets/homePageProtectedRoute.png)
The Login Page only occurs when the Token is absent in the Local Storage.
![Login page access when Token is Absent](./protectedRouteWithoutToken.png)