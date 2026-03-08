import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_KEY = "b5ffaef7a4cfdaccf0dcc115529679d7";

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
   const lat=43.6548;
   const lon=-79.3884
    try {
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      res.render("index.ejs", {
        city: result.data.name,
        temp: result.data.main.temp,
        feels_like: result.data.main.feels_like,
        wind: result.data.wind.speed,
        direction: result.data.wind.deg,
        humidity: result.data.main.humidity,
        clouds: result.data.clouds.all,
        pressure: result.data.main.pressure, 
        error: null
      }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
      }
  });

  app.post("/weather", async (req, res) => {
    const city = req.body.city;
  
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
  
      res.render("index.ejs", {
        city: result.data.name,
        temp: result.data.main.temp,
        feels_like: result.data.main.feels_like,
        wind: result.data.wind.speed,
        direction: result.data.wind.deg,
        humidity: result.data.main.humidity,
        clouds: result.data.clouds.all,
        pressure: result.data.main.pressure,
        error: null
      });
  
    } catch (error) {
      console.log(error.message);
  
      res.render("index.ejs", {
        city: null,
        temp: null,
        feels_like: null,
        wind: null,
        direction: null,
        humidity: null,
        clouds: null,
        pressure: null,
        error: "City not found. Please enter a valid city name."
      });
    }
  });
  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});