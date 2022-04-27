const form = document.querySelector('form.container')
const but = document.querySelector('div.submit')
const mesBox = document.querySelector('#messageBox')
const mesBox2 = document.querySelector('#messageBox2')
const inpA = document.querySelector('input[name="a"]')
const inpB = document.querySelector('input[name="b"]')
const inpE = document.querySelector('input[name="e"]')
const section = document.querySelector('section')

but.addEventListener('click', (e)=> {
    e.preventDefault()
    var apr = form.a.value
    var bpr = form.b.value
    var epr = form.e.value


    inpA.classList.remove('invalid')
    inpB.classList.remove('invalid')
    inpE.classList.remove('invalid')


    if(apr >= bpr) {
        displayMes(`Invalid interval: b should be bigger than a`)
        inpA.classList.add('invalid')
        inpB.classList.add('invalid')
    }
    else if(epr <= 0) {
        displayMes(`Invalid interval: e should be bigger than 0`)
        inpE.classList.add('invalid')
    }
    else {
        ajaxSend().then(res => {

            if(res.iter === 0){
                mesBox2.textContent = `No root found in given interval`
                mesBox2.classList.add('show')
                section.classList.add('blured')
                setTimeout(() => {
                    mesBox2.classList.remove('show')
                    section.classList.remove('blured')
                }, 2000)
            }
            else {
                mesBox2.innerHTML = `Root: ${res.x} <br> Iterations: ${res.iter}`
                mesBox2.classList.add('show')
                section.classList.add('blured')
                setTimeout(() => {
                    mesBox2.classList.remove('show')
                    section.classList.remove('blured')
                }, 2000)}
            
            
        })
    }


    
    
})

const ajaxSend = async () => {
    const fetchResp = await fetch('/data', {
        body: `a=${form.a.value}&b=${form.b.value}&e=${form.e.value}`,
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",},
        method: 'post'
    
    })
    if (!fetchResp.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`);
    }
    return await fetchResp.json();
};

function toggleMessage () {
    mesBox.classList.toggle("active")
}

function displayMes(t) {
    mesBox.textContent = t
    toggleMessage()
    setTimeout(toggleMessage, 2000)
}