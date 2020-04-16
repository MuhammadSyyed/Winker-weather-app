console.log('Client side javascript')

const weather =  document.querySelector('form')
const search = document.querySelector('input')
const msgone = document.querySelector('#msgone')

weather.addEventListener('submit',(e)=>{
    e.preventDefault()
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