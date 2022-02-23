const INPUT = {
    input: [
        {
            data: 60,
            name: 'Mercury',
        },
        {
            data: 110,
            name: 'Venus',
        },
        {
            data: 150,
            name: 'Earth',
        },
        {
            data: 230,
            name: 'Mars',
        },
        {
            data: 780,
            name: 'Jupiter',
        },
        {
            data: 1400,
            name: 'Saturn',
        },
        {
            data: 2900,
            name: 'Uranus',
        },
        {
            data: 4500,
            name: 'Neptune',
        },
        {
            data: 6000,
            name: 'Pluto',
        },
    ],
}

export default class References {
    constructor() {
        this.position = {}
        this.url = ''
        this.references = []
    }

    async build() {
        this.position = await this.getGeolocation()
        let BASEURL
        process.env.NODE_ENV === 'development'
            ? (BASEURL = 'http://localhost:3000/')
            : (BASEURL = 'https://analogien.herokuapp.com/')

        this.url =
            BASEURL + '?lat=' + this.position.lat + '&lon=' + this.position.lon

        console.log(this.url)
        this.references = await this.postData(this.url, INPUT)
    }

    get ref() {
        console.log('class:', this.references)
        return this.references
    }

    async getGeolocation() {
        if ('geolocation' in navigator) {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve(position)
                    },
                    (error) => {
                        reject(error)
                    }
                )
            })
            return {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            }
        } else {
            console.log('not in navigator')
        }
    }

    async postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        return response.json() // parses JSON response into native JavaScript objects
    }
}
