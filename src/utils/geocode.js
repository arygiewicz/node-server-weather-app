const request = require('postman-request')

const getGeocode = (address, callback) => {
  if (!address) {
    return console.log('You need to provide a location as argument')
  }
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicnlkemlhIiwiYSI6ImNranJ1dGI3ZjF2Z3MycWxlcWRhaTNzZGcifQ.Y3ERcX1fokvsi8alZBmlPw&limit=1`

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to mapbox')
    } else if (body.features.length === 0) {
      callback('Unable to find location')
    } else {
      const result = body.features[0]
      const [lon, lat] = result.center
      const { place_name: location } = result

      callback(undefined, { lat, lon, location })
    }
  })
}

module.exports = getGeocode