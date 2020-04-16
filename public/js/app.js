console.log('Client side javascript')

const weather =  document.querySelector('form')
const search = document.querySelector('input')
const Msgone = document.querySelector('#msgone')
const msgtwo = document.querySelector('#msgtwo')

weather.addEventListener('submit',(e)=>{
    e.preventDefault()
    msgone.textContent = 'Searching...'
    const location = search.value
    
    
fetch('/weather?address='+location).then((response)=>{

    response.json().then((data)=>{

        if(data.error){

            msgone.textContent = 'Error'
            msgtwo.textContent = data.error

        }
        else{
            msgone.textContent = data.place
            msgtwo.textContent = data.Forcast
        
    }
    })
})

})