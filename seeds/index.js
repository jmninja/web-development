const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  //useCreateIndex: true,
  UseUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20 + 1);
    const camp = new Campground({
      author: "618e76da6ff1a0b343fb2f11",
      location: `${cities[random1000].city} ${cities[random1000].state}`,
      title: `${sample(places)} ${sample(descriptors)}`,
      description:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, sit. Id autem mollitia dolorem iure sit accusantium optio labore harum. Veniam id repudiandae quis similique eaque quia aliquid beatae quam!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/firstbuild/image/upload/v1637847023/YelpCamp/swn5hrdzuiwzrxusjev7.jpg",
          filename: "YelpCamp/swn5hrdzuiwzrxusjev7",
        },
        {
          url: "https://res.cloudinary.com/firstbuild/image/upload/v1637847026/YelpCamp/kb2v83ksd9nrbfoy2mkf.jpg",
          filename: "YelpCamp/kb2v83ksd9nrbfoy2mkf",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
