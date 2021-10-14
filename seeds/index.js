const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/camps", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 30; i++) {
    const random1000 = Math.floor(Math.random() * 100);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: "6106830ed9f89119acf0a0f9",
      // location: `${cities[random1000].city}, ${cities[random1000].state}`,
      location: `${cities[random1000].city}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
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
          url: "https://res.cloudinary.com/dcedemy5q/image/upload/v1628837347/camps/fivcxukijrzsoodedpoo.jpg",
          filename: "camps/c0gk0r29suxdingy392k",
        },
        {
          url: "https://res.cloudinary.com/dcedemy5q/image/upload/v1628837340/camps/y4qaf1zfs1vcfns8aczq.jpg",
          filename: "camps/tybfmoh7rhehwatpn68h",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
