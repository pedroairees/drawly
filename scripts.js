const inputAmountNumbers = document.getElementById('numbers')
const inputFrom = document.getElementById('from')
const inputTo = document.getElementById('to')

const checkboxRepeat = document.getElementById('repeat')
const btnSubmit = document.getElementById('submit-btn')
const btnAgain = document.querySelector('.draw-again')

const form = document.querySelector('form')
const wrapperResult = document.querySelector('.show-result')
const wrapperResponse = document.querySelector('.wrapper-response')

const h2Form = document.querySelector('.content-form h2')
const pForm = document.querySelector('.content-form p')
const msgResult = document.querySelector('.show-result p')


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
    btnSubmit.disabled = true

    const amountNumbers = inputAmountNumbers.valueAsNumber
    const from = inputFrom.valueAsNumber
    const to = inputTo.valueAsNumber

    const allowRepeat = !checkboxRepeat.checked

    // Verificação extra se os inputs estão preenchidos
    if(isNaN(amountNumbers) || isNaN(from) || isNaN(to)) {
        alert('Por favor, confirar se todos os campos estão preenchidos corretamente!')
        return
    }

    // Verificação para ver se o numero inicial não e maior que o final
    if(from >= to) {
        alert('O valor inicial não pode ser maior que o final!')
        inputFrom.focus()
        btnSubmit.disabled = false
        return
    }

    const avaliableNumbers = to - from + 1
    if(!allowRepeat && amountNumbers > avaliableNumbers) {
        alert(`Erro: Você pediu ${amountNumbers} números sem repetição, mas só existem ${avaliableNumbers} números disponíveis do intervalo de ${from} a ${to}.`)
        inputAmountNumbers.focus()
        btnSubmit.disabled = false
        return
    }

    wrapperResponse.innerHTML = ''

    const numbersToDraw = []
    const drawnNumbers = new Set()

    for(let i = 0; i < amountNumbers; i++) {
        if(allowRepeat) {
            numbersToDraw.push(gerarNumero(from, to))
        } else {
            let numberGenerate

            do{
                numberGenerate = gerarNumero(from, to)
            }while(drawnNumbers.has(numberGenerate))

                drawnNumbers.add(numberGenerate)
                numbersToDraw.push(numberGenerate)
        }

        
    }

    let contador = 1
    for(const number of numbersToDraw) {
        if(numbersToDraw.length === 1) {
            msgResult.textContent = `resultado`
        } else {
            msgResult.textContent = `${contador}º resultado`
        }

        await addResult(number)
        contador++
    }

    toggleBtn()
    formClear()
})

btnAgain.addEventListener('click', (event) => {
    wrapperResult.classList.add('hide')
    showFrom()
    btnAgain.classList.add('hide')
    btnSubmit.classList.remove('hide')
    btnSubmit.disabled = false
})