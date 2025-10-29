const inputAmountNumbers = document.getElementById('numbers')
const inputFrom = document.getElementById('from')
const inputTo = document.getElementById('to')

const btnSubmit = document.getElementById('submit-btn')
const btnAgain = document.querySelector('.draw-again')

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
    return new Promise((resolve) => {
        const wrapperContent = document.createElement('div')
        wrapperContent.classList.add('response', 'anime-result')

        const responsedP = document.createElement('p')
        responsedP.classList.add('anime-text')
        responsedP.textContent = result
        wrapperContent.prepend(responsedP)

        wrapperContent.addEventListener('animationend', () => {
            resolve();
        }, { once: true });

        wrapperResponse.prepend(wrapperContent)

        hideForm()
    wrapperResult.classList.remove('hide')
    })
}

function hideForm() {
    form.classList.add('hide')
    h2Form.classList.add('hide')
    pForm.classList.add('hide')
}

function showFrom() {
    form.classList.remove('hide')
    h2Form.classList.remove('hide')
    pForm.classList.remove('hide')
}

function formClear() {
    inputAmountNumbers.value = ''
    inputFrom.value = ''
    inputTo.value = ''
}

function toggleBtn() {
    btnSubmit.classList.add('hide')
    btnAgain.classList.remove('hide')
}

form.addEventListener('submit', async (event) => {
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

    wrapperResponse.innerHTML = ''

    const numbersToDraw = []
    for(let i = 0; i < amountNumbers; i++) {
        numbersToDraw.push(gerarNumero(from, to))
    }

    for(const number of numbersToDraw) {
        await addResult(number)
    }

    toggleBtn()
    formClear()
})

btnAgain.addEventListener('click', (event) => {
    wrapperResult.classList.add('hide')
    showFrom()
    btnAgain.classList.add('hide')
    btnSubmit.classList.remove('hide')
})