const INPUT = {
  input: [
    {
      data: 60,
      name: "Mercury",
    },
    {
      data: 110,
      name: "Venus",
    },
    {
      data: 150,
      name: "Earth",
    },
    {
      data: 230,
      name: "Mars",
    },
    {
      data: 780,
      name: "Jupiter",
    },
    {
      data: 1400,
      name: "Saturn",
    },
    {
      data: 2900,
      name: "Uranus",
    },
    {
      data: 4500,
      name: "Neptune",
    },
    {
      data: 6000,
      name: "Pluto",
    },
  ],
};

export default class Refernces {
  constructor() {
    this.position = {};
    this.url = "";
    this.refernces = [];
  }

  async build() {
    this.position = await this.getGeolocation();
    this.url =
      "https://analogien.herokuapp.com/?lat=" +
      this.position.lat +
      "&lon=" +
      this.position.lon;
    this.refernces = await this.postData(this.url, INPUT);
  }

  get ref() {
    console.log("class:", this.refernces);
    return this.refernces;
  }

  async getGeolocation() {
    if ("geolocation" in navigator) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (result) => {
            resolve({
              lat: result.coords.latitude,
              lon: result.coords.longitude,
            });
          },
          reject,
          { timeout: 6000 }
        );
      });
    } else {
      console.log("not in navigator");
    }
  }

  async postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
}
