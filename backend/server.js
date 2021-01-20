import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt-nodejs';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You have to enter a name'],
    minlength: [2, 'Oops, name is too short'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Oops, password is too short'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
    unique: true,
  },
});

userSchema.pre('save', async function (next) {
  const user = this;

  // Check if the password is (not) modified
  if (!user.isModified('password')) {
    return next();
  }

  // If the password is changed- then encrypt it
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization');
    const user = await User.findOne({ accessToken });
    if (!user) {
      throw 'User not found!';
    }
    req.user = user;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ error: 'ERROR: Something went wrong. Please try again' });
    console.log(err);
  }
};

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello and welcome to Karin and Petras user API!');
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Signup
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res
      .status(200)
      .json({ id: user._id, accessToken: user.accessToken, name: user.name });
  } catch (err) {
    res
      .status(400)
      .json({
        message: `ERROR: Could not create user. Make sure you've entered all the fields correctly.`,
        errors: err,
      });
    console.log({ error: err });
  }
});

// Log in
app.post('/sessions', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ id: user._id, accessToken: user.accessToken, name: user.name });
  } else {
    res.status(400).json({
      message: `ERROR: Could not log in. Make sure you've entered the correct user details.`,
    });
  }
});

// Private area - to access this endpoint you'll need to send a request with
// a header with a value of a valid access token.
app.get('/private', authenticateUser);
app.get('/private', async (req, res) => {
  const accessToken = req.header('Authorization');
  const user = await User.findOne({ accessToken: accessToken });
  res.json({ message: `☠️ The killer is: ${user.name} ☠️` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});