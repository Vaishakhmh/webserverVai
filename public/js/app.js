console.log('hi');
fetch('/weather?address=').then(function(response){
    response.json().then(function(data){
        console.log(data);
    })
})
const form=document.querySelector('form');
const search=document.querySelector('input');
const res=document.querySelector('#m1');

form.addEventListener('submit',function(e){
    e.preventDefault();
    var path='/weather?address='+search.value;
    fetch(path).then(function(response){
    response.json().then(function(data){
        if(data.error){
            res.textContent=data.error;
        }
        else {
            res.textContent='temp :'+data.temp+'\n summary : '+data.summary+'\n rain : '+data.rain+'Location : '+data.loc;
            }
        
    })
})
    
})
