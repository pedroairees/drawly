const inputAmountNumbers = document.getElementById('numbers')
const inputFrom = document.getElementById('from')
const inputTo = document.getElementById('to')

const btnSubmit = document.getElementById('submit-btn')
const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const amountNumbers = inputAmountNumbers.valueAsNumber
    const from = inputFrom.valueAsNumber
    const to = inputTo.valueAsNumber

    if(isNaN(amountNumbers) || isNaN(from) || isNaN(to)) {
        alert('Por favor, confirar se todos os campos estão preenchidos corretamente!')
        return
    }

    if(from >= to) {
        alert('O valor inicial não pode ser maior que o final!')
        inputFrom.focus()
        return
    }

    alert('validação OK')
})
