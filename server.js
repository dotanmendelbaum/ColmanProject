if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const session = require("express-session")

const {authorize} = require('./auth')
const {checkUser} = require('./auth')

const indexRouter = require("./routes/index");
const playerRouter = require("./routes/players")(io);
const loginRoute = require("./routes/users/login")(io);
const registerRoute = require("./routes/users/register")(io);
const flightsRoute = require("./routes/flights")(io);
const ordersRoute = require("./routes/orders")(io);
const adminRoute = require("./routes/adminRoutes/admin")(io)
const accountPreferencesRoute = require("./routes/accountPreferences")(io)
const logoutRoute = require("./routes/users/logout")(io)

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
// app.set("layout", "layouts/layout");
//app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));
app.use(session({
  secret: 'abcdefghijk',
  resave: false,
  saveUninitialized: false
}));


//app.use(authorize)
//app.use(checkUser)

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use("/", indexRouter);
app.use("/players", playerRouter);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/flights", flightsRoute);
app.use("/myorders", ordersRoute);
app.use("/admin", adminRoute)
app.use("/myaccount", accountPreferencesRoute)
app.use("/logout", logoutRoute)
app.get('*', function(req, res){
  res.render('notFound');
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
