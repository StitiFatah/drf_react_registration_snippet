const axios = require("axios");

async function api_axios(endpoint, method_, data_, baseurl) {
  let baseurl_ = baseurl || "http://localhost:5000";
  const config = {
    method: method_ || "get",
    url: baseurl_ + endpoint,
    data: data_ !== undefined ? data_ : null,
    headers: {
      Authorization: localStorage.getItem("acces_token")
        ? "JWT " + localStorage.getItem("access_token")
        : null,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  };

  try {
    let response = await axios(config);
    return response;
  } catch (error) {
    // console.log(error.response);
    let response = error.response;
    return response;
  }
}

////////////

export { api_axios };
