//Dom
let form = document.getElementById('converter-form');
let amount = document.getElementById('amount');
let fromCurrency = document.getElementById('fromCurrency');
let convertedAmount = document.getElementById('convertedAmount');
let toCurrency = document.getElementById('toCurrency');
let button = document.getElementById('converterBtn');
let loading = document.querySelector('.loading');
let result = document.querySelector('.result');
let error = document.querySelector('.error');
let key = 'https://api.exchangerate-api.com/v4/latest/';

async function converter(){
    loading.style.display = 'block';
    button.style.display = 'none';
    error.style.display = 'none';
    result.style.display = 'none';

    try{
        const response = await fetch(key + fromCurrency.value);
        const data = await response.json();
        const rate = data.rates[toCurrency.value];
        const convertedRate = (amount.value * rate).toFixed(2)
        
        convertedAmount.value = convertedRate
        result.innerHTML = `
        <div style='font-size: 1.8rem;'> 
           ${amount.value} ${fromCurrency.value} = ${convertedRate} ${toCurrency.value}
        </div>
        <div style='font-size: 1.2rem; margin-top: 10px; opacity: 0.8;'>
            1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
        </div>
        `
        result.style.display = 'block';
    }catch(err){
        error.style.display = 'block';
        error.innerHTML = `Falha ao converter, tente novamente!`
    }

    loading.style.display = 'none';
    button.style.display = 'block';
}



form.addEventListener('submit', (event)=>{
    event.preventDefault();
    converter();
})