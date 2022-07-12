const mainContainer = document.querySelector('#mainContainer')
const loginForm = document.querySelector('#loginForm')
const loginError = document.querySelector('#loginError')

loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault()

  // action - /form/login
  const { method, action, user_email, user_password } = event.target

  const response = await fetch(action, {
    method,
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      user_email: user_email.value,
      user_password: user_password.value
    })
  })

  const data = await response.text()

  if (data.includes('error')) {
    loginError.innerHTML = data
  } else {
    mainContainer.innerHTML = data
    setTimeout(() => {
      document.location.assign('/')
    }, 1000)
  }
})
