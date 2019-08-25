//chat oproepen

//let route = JSON.stringify({birthday});

const base_url= "https://birthday-chat.herokuapp.com";


//primus blijft connectie vragen ookal heb je even geen verbinding
primus = Primus.connect(base_url, {
  reconnect: {
      max: Infinity // Number: The max delay before we try to reconnect.
    , min: 500 // Number: The minimum delay before we try reconnect.
    , retries: 10 // Number: How many times we should try to reconnect.
  }
});

//blijven luisteren naar json
//functien uitvoeren met die json
primus.on('data',(json)=>{
    if(json.action === "addMessage"){
        //
        appendMessage(json.data);
    } 
});

if(!localStorage.getItem("token")){
    window.location.href="login.html";
}

//let user = querystring.stringify({"username": "spam"});
//alle chatberichten ophalen

fetch(base_url + "/api/v1/chat", {
    
    //nodige headers meegeven met localstorage
    'headers':{
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();

}).then(json => {
    json.data.chat.forEach(message => {
      
            //let appendMessages = json =>{
            var newMessage = 
            `<div class="todo">
            <div class="todo__text todo--completed">${message.user}: </div>&nbsp;
            <div class="todo__text">${message.text}</div>&nbsp;
            
            </div>`;
            //document.querySelector(".todo__new ").insertAdjacentHTML('afterend', appendMessages);;

           //}
            document.querySelector(".todo__new ").insertAdjacentHTML('afterend', newMessage);;

    });

}).catch(err =>{
    console.log(err);
    console.log("waarom werkt dit niet?");
});

//chatbericht toevoegen
//html opbouw voor 1 message
//tekst opvullen met json.data.message.text
let appendMessage = (json) => {
    let message = `<div class="todo">
    <div class="todo__text todo--completed">${json.data.message.user}: </div>&nbsp;
    <div class="todo__text">${json.data.message.text}</div>&nbsp;
    <div class="todo__text todo--completed">Ook geboren op:<br> ${json.data.message.birthday}</div>&nbsp;
    
    </div>`;

document.querySelector(".todo__new ").insertAdjacentHTML('afterend', message);
}





// chatbericht versturen met "enter-toets"

let input = document.querySelector(".todo__input");
input.addEventListener("keyup", e => {
    if (e.keyCode === 13){
        let text = input.value;

        //iets posten met de juiste token
        fetch(base_url + '/api/v1/chat',{
            method : "post",
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "text": text
            })
        })//als dit lukt, dan krijg je het volledige document terug
        .then(result =>{
            return result.json();

        }).then(json => {
            console.log(json);
            
           input.value="";
           input.focus();

           //Schrijven naar de server
           primus.write({
               "action":"addMessage",
               "data":json
           });

           //appendMessage(json);
           
        }).catch(err => {
            console.log(err)
        })
    }

    e.preventDefault();
});


//logout
    document.querySelector(".option__logout").addEventListener("click", e => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
    e.preventDefault();
});