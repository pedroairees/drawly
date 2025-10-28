const inputAmountNumbers = document.getElementById('numbers')
const inputFrom = document.getElementById('from')
const inputTo = document.getElementById('to')

const btnSubmit = document.getElementById('submit-btn')

const form = document.querySelector('form')
const wrapperResult = document.querySelector('.show-result')
const wrapperResponse = document.querySelector('.wrapper-response')

const h2Form = document.querySelector('.content-form h2')
const pForm = document.querySelector('.content-form p')


function gerarNumero(min, max) {
    let number = Math.floor(Math.random() * (max - min + 1)) + min
    return number
}

function addResult(result) {
    const wrapperContent = document.createElement('div')
    wrapperContent.classList.add('response')

    const responsedP = document.createElement('p')
    responsedP.textContent = result
    wrapperContent.prepend(responsedP)

    wrapperResponse.prepend(wrapperContent)
    hideForm()
    wrapperResult.classList.remove('hide')
}

function hideForm() {
    form.classList.add('hide')
    h2Form.classList.add('hide')
    pForm.classList.add('hide')
}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const amountNumbers = inputAmountNumbers.valueAsNumber
    const from = inputFrom.valueAsNumber
    const to = inputTo.valueAsNumber

    // Verificação extra se os inputs estão preenchidos
    if(isNaN(amountNumbers) || isNaN(from) || isNaN(to)) {
        alert('Por favor, confirar se todos os campos estão preenchidos corretamente!')
        return
    }

    // Verificação para ver se o numero inicial não e maior que o final
    if(from >= to) {
        alert('O valor inicial não pode ser maior que o final!')
        inputFrom.focus()
        return
    }

    let numberGenerate = gerarNumero(from, to)
    addResult(numberGenerate)
    btnSubmit.classList.add('hide')
})

