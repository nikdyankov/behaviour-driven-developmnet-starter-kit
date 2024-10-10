import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import crypto from "crypto";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
// Use cookie-parser middleware
app.use(cookieParser());

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req: Request, res: Response) => {
  res.render('index', { title: 'Hey', message: 'Hello there! You have landed on the homepage' })
});

app.get("/page-one", (req: Request, res: Response) => {
  const myRandomUIDCookie = req.cookies.randomUI; // Check for 'myRandomUIDCookie'

  if (!myRandomUIDCookie) {
    // Cookie is not present, set a new one
    res.cookie('randomUI', crypto.randomUUID(), { httpOnly: true, maxAge: 900000 }); // Set 'myRandomUIDCookie'
    console.log('Cookie has been set.');
  } else {
    console.log('Cookie already exists.');
  }

  res
    .status(200)
    .render('index', { title: 'Hey', message: 'Hello there! You have landed on page one' })
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});