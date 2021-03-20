const axios = require("axios");

const api = async (term) => {
  let res = await axios.get("https://en.wikipedia.org/w/api.php", {
    params: {
      action: "query",
      list: "search",
      origin: "*",
      format: "json",
      srsearch: term,
    },
  });
  return res.data.query.search;
};
module.exports = api;
