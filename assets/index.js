//criando o time

function getTimeFromSeconds(segundos){
const data=new Date(segundos*1000)

return data.toLocaleTimeString('pt-BR', {hour12:false,timeZone:'UTC'})
}

console.log(getTimeFromSeconds(10))

//-------------------

//selecionando os elementos!

const relogio=document.querySelector('#relogio')
const iniciar=document.querySelector('#iniciar')
const pausar=document.querySelector('#pausar')
const zerar=document.querySelector('#zerar')


let segundos=0 //guarda o tempo decorrido em segundos
let timer=null

function iniciaRelogio(){
    timer=setInterval(function(){
    segundos++
    relogio.innerHTML=getTimeFromSeconds(segundos)
    },1000)
}

// ---------------------
//Capturando o click

iniciar.addEventListener('click',function(evento){
 relogio.classList.remove('pausado')
 clearInterval(timer)
 iniciaRelogio()

})

pausar.addEventListener('click',function(evento){
    relogio.classList.add('pausado')
 clearInterval(timer)
})

//clear interval congela o timer

zerar.addEventListener('click',function(evento){
 clearInterval(timer)
 relogio.innerHTML='00:00:00'
 segundos=0
})
