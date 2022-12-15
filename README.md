# AuxinChallenge
 
I have created signIn and signUp routes to authenticate the user using email and password fields. The password is hashed before storing it into the json file named users.json.

The authentication routes are defined in authenticationRouter.js file inside routers directory and implemented inside controllers directory.

Similarly, I have created APIS to fetch data from covid dataset in the covidController.js file.

I have implemented a middleware named auth.js which checks if the user is authenticated before accessing the apis.

Some of the secret fields were defined as environment variable which is not uploaded and can be set according to the requirement.

the covid dataset is taken from https://github.com/owid/covid-19-data/tree/master/public/data