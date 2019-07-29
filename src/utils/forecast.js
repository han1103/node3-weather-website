const request = require('request')

const forecast = (latitude, longtitude , callback) => {
    const url = 'https://api.darksky.net/forecast/a63d658f467233abfdf890a326223e0f/' + longtitude + ',' + latitude
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        }
        else if (body.error) {
            callback('darksky API error')
        }
        else {
            callback(null, body.daily.data[0].summary + ' It is currently : ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + "% chance of rain.")
        }
    })
}

module.exports = forecast