console.log('Client side javascript loaded')

const handleSubmit = (location, message1, message2) => {
  message1.textContent = 'Searching...'
  message2.textContent = ''

  fetch(`/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        message1.textContent = data.error
        message2.textContent = ''
        return
      }
      message1.textContent = data.location
      message2.textContent = data.forecast
    })
    .catch((error) => console.error(error))
}

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  handleSubmit(searchInput.value, message1, message2)
})