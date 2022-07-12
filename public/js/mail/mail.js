const chatPageWindow = document.querySelector('#chatPageWindow')
const inviteConfirmContainer = document.querySelector('#inviteConfirmContainer')

// Слушаем весь список 
chatPageWindow?.addEventListener('click', async (event) => {
  event.preventDefault()

  // Слушаем кнопку Подтвердить
  if (event.target.innerText.includes('Подтвердить')) {

    // method - get
    // action - /profile/lc/mail/delete/:mail_id
    const action = event.target.href

    console.log('action =>', action)

    if (action) {
      const response = await fetch(action)
      const data = await response.text()

      inviteConfirmContainer.innerHTML = data
      setTimeout(() => {
        inviteConfirmContainer.innerHTML = ''
      }, 2000)
    }
  }
})
