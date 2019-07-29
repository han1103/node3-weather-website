const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFuMTEwMyIsImEiOiJjanlkNHFtbm0wbjU5M21xbWI3dGZiZm1jIn0.GsprQ7-My-PxkEk4AXtSGQ&limit=1'


    request({ url, json: true }, (error, {body}) => {
        debugger
        if (error) {
            callback('Unable to connect to weather service!')
        }
        else if (body.features.length < 1) {
            callback('Unable to find location. Try another search.')
        }
        else {
            callback(null, {
                latitude: body.features[0].center[0],
                longtitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
