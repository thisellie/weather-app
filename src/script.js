import './style.scss'

const body = document.querySelector('body')
const form = document.querySelector('form')
const search = document.getElementById('search')

const key = '4eb1171f375141c7a8a122848231010&q'

async function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
  const response = await fetch(url)
  return await response.json()
}

async function displayWeather(city) {
  const weather = await getWeather(city)
  for (const key in weather.current) {
    body.append(`${key}: ${weather.current[key]}`, document.createElement('br'))
  }
}

form.addEventListener('submit', e => {
  e.preventDefault()
  displayWeather(search.value)
  form.reset()
})

console.log('Hello World!')

