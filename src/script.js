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

const key = '4eb1171f375141c7a8a122848231010'

async function getWeather(city) {
  const query = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
  const response = await fetch(query)
  return await response.json()
}

function timeFormat(text) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  const parsed = new Date(text)
  return formatter.format(parsed)
}

function displayWeather(weather) {
  title.textContent = `${weather.location.name}, ${weather.location.country}`
  time.textContent = `${timeFormat(weather.location.localtime)}`
  temperature.textContent = `${weather.current.temp_c}°C`
  overview.textContent = weather.current.condition.text
  cloud.src = weather.current.condition.icon
  feels.textContent = `Feels like ${weather.current.feelslike_c}°C`
  wind.textContent = `${weather.current.wind_kph} km/h`
  pressure.textContent = `${weather.current.pressure_mb} mb`
  precip.textContent = `${weather.current.precip_mm} mm`
  humid.textContent = `${weather.current.humidity}%`
  coverage.textContent = `${weather.current.cloud}%`
  gust.textContent = `${weather.current.gust_kph} km/h`
}

async function loadAnimation() {
  notif.style.display = 'flex'
  const data = await getWeather(search.value)
  notif.style.display = 'none'
  return data
}

form.addEventListener('keypress', async e => {
  if (e.key === 'Enter') {
    e.preventDefault()
    const weather = await loadAnimation()
    displayWeather(weather)
    start.style.display = 'none'
    current.style.display = 'block'
    form.reset()
  }
})

