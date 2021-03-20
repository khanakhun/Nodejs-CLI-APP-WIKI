const axios = require("axios");


// function to get  search item data from wikipeida APIS
async function getWiki(term) {
  try {
    const response = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        list: "search",
        origin: "*",
        format: "json",
        srsearch: term,
      },
    });
    const result = response.data.query.search;
    let data = await result.map(({ title }) => title);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// RegExp to filter content
var removeUselessWords = function (txt) {
  var uselessWordsArray = [
    "<",
    "/",
    "span",
    "class",
    "searchmatch",
    "</",
    ">",
    " ( ",
    ">)",
    "</span>",
    "<span>",
  ];

  var expStr = uselessWordsArray.join("|");
  return txt
    .replace(new RegExp("\\b(" + expStr + ")\\b", "gi"), " ")
    .replace(/\s{2,}/g, " ");
};

// function to get sub result from wikipeida APIS
async function wikiSubRes(term) {
  try {
    const response = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        list: "search",
        origin: "*",
        format: "json",
        srsearch: term,
      },
    });
    const result = response.data.query.search;
    let data = await result.map(({ snippet }) => snippet);
    let d1 = removeUselessWords(data[2]);
    let d2 = d1.replace(/[^a-zA-Z ]/g, "").replace(/  /g, "");
    return d2.trim();
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getWiki,
  wikiSubRes,
};
