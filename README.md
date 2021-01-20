# Project Auth

For this project we were to create a database/API with authentication and paths for authorized users only, as well as a frontend that demonstrates the backend functionality.


## The problem

We began by creating the backend user model, as well as the paths for signup and log in. Moving forward we implemented the encryption and changing the model into a schema, allowing us to control/validate the user input and *then* encrypt the password. 

Heading onto creating the frontend we decided to start by making sure authentication functionality was working properly, and then adding some conditional rendering to control what elements we wanted to show on the webpage at what time. By using both component local states as well as Redux states we could set up an intuitive signup/login form. We added isLoggedIn to our initial state to do some more conditional rendering in each component. 

We used a single thunk function in our reducer to send both login- and signup requests, but separating the outcome by using props and conditionally separate the use of the returned json.

If we would have had more time, we'd dig deeper into the opportunities of adding features for the authorized user as well as creating a more extensive frontend.


## View it live

Live demo: 
* Frontend: https://project-auth-by-karin-and-petra.netlify.app/
* Backend: https://auth-by-karin-petra.herokuapp.com/
