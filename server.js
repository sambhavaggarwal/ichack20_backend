const express = require("express");
const app = express();
const fetch = require("node-fetch");
const cors = require("cors");

app.use(cors());

function _getBaseUrl(category) {
  return category === "Food"
    ? "https://world.openfoodfacts.org"
    : "https://world.openbeautyfacts.org";
}

async function getProduct(ean, category) {
  const url = `${_getBaseUrl(category)}/api/v0/product/${ean}.json`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {}
    });
    const product = await response.json();
    console.log(product.status);
    if (product.status === 0) {
      return null;
    }
    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
}

app.get("/product/:barcode", async function(req, res) {
  const product = await getProduct(req.params.barcode, "Food");
  //   console.log(product);
  res.send(product.product.product_name);
});

app.get("/", function(req, res) {
  res.send(`<h1>Hello World! Welcome to my server.</h1>`);
});

// app.get("/contact", function(req, res) {
//   res.send("Contact me at sam@gmail.com");
// });

// app.get("/about", function(req, res) {
//   res.send("This belongs to Sambhav Aggarwal");
// });

// app.get("/hobbies", function(req, res) {
//   res.send("I love basketball and coding");
// });

app.listen(process.env.PORT || 3001, function() {
  console.log("server started on port 3001");
});
