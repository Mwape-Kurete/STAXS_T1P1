var client_id = "6dfe161492d14a558bea14512386b896";
var client_secret = "7d449a9084ca46b2a30397b3d9ad11c8";

var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      new Buffer.from(client_id + ":" + client_secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    var token = body.access_token;
  }
});

function AUTH() {
  return authOptions;
}

export default AUTH;
