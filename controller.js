const database = require("./firebase");
const usersRef = database.ref("/users");
const { hashPassword, checkPassword, generateToken } = require("./helper");

class Controller {
  static getProfile(req, res) {
    const user = req.loggedIn;
    const { firstName, lastName, age, gender, email } = user.data;
    const data = {
      id: user.id,
      firstName,
      lastName,
      age,
      gender,
      email,
    };
    res.status(200).json({ profile: data });
  }

  static register(req, res) {
    const { email, firstName, lastName, age, gender, password } = req.body;
    if (!email || !firstName || !lastName || !age || !gender || !password) {
      res.status(400).send("Please fill in the blank");
    } else {
      usersRef
        .orderByChild("email")
        .equalTo(email)
        .once("value", snapshot => {
          if (snapshot.val() !== null) {
            res.status(400).send("Email already registered, Please Login");
          } else {
            const userId = usersRef.push().key;
            const userPassword = hashPassword(password);
            const data = {
              firstName,
              lastName,
              age,
              gender,
              email,
              password: userPassword,
            };

            usersRef.child(userId).set(data, error => {
              if (error) {
                console.log(error);
              } else {
                usersRef
                  .orderByKey()
                  .limitToLast(1)
                  .once("child_added", snapshot => {
                    res.status(201).json({
                      message: "Success Register",
                      id: snapshot.key,
                    });
                  });
              }
            });
          }
        });
    }
  }

  static login(req, res) {
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;
    if (!inputEmail || !inputPassword) {
      res.status(400).send("Please fill in the blank");
    } else {
      usersRef
        .orderByChild("email")
        .equalTo(inputEmail)
        .once("value", snapshot => {
          if (snapshot.val() === null) {
            res.status(404).send("User not Found, Please Register");
          } else {
            usersRef
              .orderByKey()
              .limitToLast(1)
              .once("child_added", snapshot => {
                const passwordMatch = checkPassword(
                  inputPassword,
                  snapshot.val().password
                );
                if (passwordMatch) {
                  const access_token = generateToken({
                    id: snapshot.key,
                    data: snapshot.val(),
                  });
                  res.status(200).json({ id: snapshot.key, access_token });
                } else {
                  res.status(400).send("Invalid Email or Password");
                }
              });
          }
        });
    }
  }
}

module.exports = Controller;
