/**
 * @param  {string} date -> YYYY-MM-DD
 * @param  {} lat
 * @param  {} lng
 */
const fetchWeather = (date, lat, lng) =>
  fetch(`https://api-endpoint-express.herokuapp.com/fetchWeather`, {
    method: 'POST',
    body: JSON.stringify({
      date,
      lat,
      lng,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    },
  })
    .then((e) => console.log(e))
    .catch((err) => console.log(err))
// fetch(`https://cors-anywhere.herokuapp.com/https://dark-sky.p.rapidapi.com/${lat},${lng},${date}`, {
//     method: 'GET',
//     headers: {
//       'x-rapidapi-host': 'dark-sky.p.rapidapi.com',
//       'x-rapidapi-key': process.env.DARK_SKY_API_KEY,
//     },
//   })

export default fetchWeather
