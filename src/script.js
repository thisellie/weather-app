import './style.scss'
import 'normalize.css'

const form = document.querySelector('form')
const search = document.getElementById('search')
const title = document.getElementById('title')
const time = document.getElementById('time')
const temperature = document.getElementById('temperature')
const overview = document.getElementById('overview')
const cloud = document.getElementById('cloud')
const feels = document.getElementById('feels')
const wind = document.getElementById('wind')
const pressure = document.getElementById('pressure')
const precip = document.getElementById('precipitation')
const humid = document.getElementById('humidity')
const coverage = document.getElementById('coverage')
const gust = document.getElementById('gust')
const start = document.getElementById('start')
const current = document.getElementById('current')
const notif = document.getElementById('notification')
const forecast = document.getElementById('forecast')
const days = Array.from(document.getElementsByClassName('day'))

const key = '4eb1171f375141c7a8a122848231010'

async function getWeather(city) {
  const call = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=3`
  const response = await fetch(call)
  return await response.json()
}

function timeFormat(input) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  const parsed = new Date(input)
  return formatter.format(parsed)
}

function dateFormat(input) {
  const date = new Date(input)
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const index = date.getDay()
  const day = date.getDate()
  return `${week[index]} ${day}`
}

function displayWeather(weather) {
  title.textContent = `${weather.location.name}, ${weather.location.country}`
  time.textContent = `${timeFormat(weather.location.localtime)}`
  temperature.textContent = `${weather.current.temp_c}°`
  overview.textContent = weather.current.condition.text
  cloud.src = weather.current.condition.icon
  feels.textContent = `Feels like ${weather.current.feelslike_c}°`
  wind.textContent = `${weather.current.wind_kph} km/h`
  pressure.textContent = `${weather.current.pressure_mb} mb`
  precip.textContent = `${weather.current.precip_mm} mm`
  humid.textContent = `${weather.current.humidity}%`
  coverage.textContent = `${weather.current.cloud}%`
  gust.textContent = `${weather.current.gust_kph} km/h`

  days.forEach((day, index) => {
    day.children[1].children[0].src =
      weather.forecast.forecastday[index].day.condition.icon
    day.children[1].children[1].children[0].textContent = `${weather.forecast.forecastday[index].day.maxtemp_c}°`
    day.children[1].children[1].children[1].textContent = `${weather.forecast.forecastday[index].day.mintemp_c}°`
    if (index === 0) {
      day.children[1].children[2].children[0].textContent = `${weather.forecast.forecastday[index].day.condition.text}`
      day.children[1].children[2].children[1].textContent = `${weather.forecast.forecastday[index].day.daily_chance_of_rain}%`
    }
    if (index > 0)
      day.children[0].textContent = dateFormat(
        weather.forecast.forecastday[index].date
      )
  })
}

async function loadWeather() {
  notif.style.display = 'flex'
  const data = await getWeather(search.value)
  notif.style.display = 'none'
  return data
}

form.addEventListener('keypress', async e => {
  if (e.key === 'Enter') {
    e.preventDefault()
    const weather = await loadWeather()
    displayWeather(weather)
    start.style.display = 'none'
    current.style.display = 'block'
    forecast.style.display = 'block'
    form.reset()
  }
})

