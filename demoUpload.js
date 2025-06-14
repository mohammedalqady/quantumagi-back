const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dk0vigx0w",
  secure: true,
  // api_key: ""
});

// const url = cloudinary.url("https://res.cloudinary.com/dk0vigx0w/image/upload/v1749317953/newLogo_netjhz.png")
const url = cloudinary.url("newLogo_netjhz");
console.log(url)