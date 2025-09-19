//Dom
const button = document.getElementById('generate-password');
const result = document.getElementById('result');
const lengthInput = document.getElementById('length');
const uppercaseInput = document.getElementById('uppercase');
const lowercaseInput = document.getElementById('lowercase');
const numbersInput = document.getElementById('numbers');
const symbolsInput = document.getElementById('symbols');

//Funçao para gerar o array de caracteres
function generateCharacterArray(){
    const characters = [];
    if(uppercaseInput.checked){
        characters.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }

if(lowercaseInput.checked){
    characters.push('abcdefghijklmnopqrstuvwxyz');
}
if(numbersInput.checked){
    characters.push('0123456789');
}
if(symbolsInput.checked){
    characters.push('!@#$%^&*()_+-=[]{}|;:,.<>?');
}

return characters;
}

//Função para pegar um caracter aleatorio
function getRandomCharacter(characters){
    let randomCharacter = Math.floor(Math.random() * characters.length);
    return characters[randomCharacter][Math.floor(Math.random() * characters[randomCharacter].length)];
    
}

//Função para pegar o size da senha
function getPasswordLength(){
    const length = parseInt(lengthInput.value);
    if(isNaN(length) || length < 4 || length > 100){
        alert('Por favor, digite um número entre 4 e 100');
        return null;
    }
    return length;
}

//função para gerar a senha
function generatePassword(length, characters){

    let password = '';
    while(password.length < length){
        password += getRandomCharacter(characters);
    }
    return password;
}

button.addEventListener('click', () => {
    const characters = generateCharacterArray();
    const length = getPasswordLength();
    
    if(!length){
        return;
    }
    if(!characters.length){
        alert('Por favor, selecione pelo menos um tipo de caractere');
        return;
    }
    
    const password = generatePassword(length, characters);
    result.textContent = password;
});

//Função para copiar a senha
function copyPassword(){
    const password = result.textContent;
    navigator.clipboard.writeText(password);
    alert('Senha copiada para a área de transferência');
}