const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const authRoutes = require("./app/routes/auth.routes");
const investorRoutes = require("./app/routes/investor.routes");
const downloadRoutes = require('./app/routes/download.routes');
// const path = require("path");

const dbConfig = require("./app/config/db.config");

const app = express();

app.use(cors());
/* for Angular Client (withCredentials) */
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:8081"],
//   })
// );

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.static('images'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // shoul d use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models");
// const Role = db.role;
const Admin = db.admin;

db.mongoose
  .connect('mongodb+srv://doadmin:70rFU1KE2ny6439i@jampackDB-02942f34.mongo.ondigitalocean.com/admin?tls=true&authSource=admin', {
    // .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get('/', (req, res) => {
  res.status(200).json({message: 'Hello World!'});
})

// routes
// require("./app/routes/auth.routes")(app);
// require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use('/auth', authRoutes);
app.use('/investor', investorRoutes);
app.use('/download', downloadRoutes);

function initial() {
  Admin.findOne({
    userName: "admin123"
  })
  .exec((err, user) => {
    if(err) {
      return console.log("There is problem for admin account.");
    }

    if(!user) {
      new Admin({
        userName: "admin123",
        email:"admin123@gmail.com",
        password: "1234567890"
      }).save((err) => {
        if(err) {
          console.log("Cant creat admin user");
        }
      })
    }
  })
  
}