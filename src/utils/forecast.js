const request = require('postman-request')

const getForecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8977a44113c9f795431a260bf3d2e302&query=${lat},${lon}`

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to weather app!')
    } else if (body.error) {
      callback('Unable to find location')
    } else {
      callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out.`)
    }
  })
}

module.exports = getForecast