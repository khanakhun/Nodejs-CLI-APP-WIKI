const axios = require("axios");

export default axios.create("https://en.wikipedia.org/w/api.php", {
  params: {
    action: "query",
    list: "search",
    origin: "*",
    format: "json",
    srsearch: term,
  },
});
