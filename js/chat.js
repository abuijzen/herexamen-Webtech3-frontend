//chat oproepen

//let birthday = req.user.birthday;
//let route = JSON.stringify({birthday});

fetch('http://localhost:3000/api/v1/chat/', {
    
    //nodige headers meegeven met localstorage
    'headers':{
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json =>{
    console.log(json);
}).catch(err =>{
    console.log("Unauthorized")
});


// chatbericht versturen met "enter-toets"

let input = document.querySelector(".todo__input");
input.addEventListener("keyup", e => {
    if (e.keyCode === 13){
        let text = input.value;

        //iets posten met de juiste token
        fetch('http://localhost:3000/api/v1/chat',{
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
            //html opbouw voor 1 message
            //tekst opvullen met json.data.message.text

            /*<div class="todo__text">${req.user._id}</div>*/
            /*let birthday = json.data.message.birthday;
            let count = db.users.find({"birthday" : birthday}).count();
            console.log(count);
            
            <div class="todo__text todo--completed">${json.data.message.birthday}: </div>
            <div class="todo__text todo--completed">${json.data.message.birthdayCount}: </div>
            */
            let message = `<div class="todo">
            
            <div class="todo__text todo--completed">${json.data.message.user}: </div>&nbsp;
            <div class="todo__text todo--completed">${Date(json.data.message.birthday)}: </div>&nbsp;
            
            <div class="todo__text">${json.data.message.text}</div>
            
            
            </div>`

            document.querySelector(".todo__new ").insertAdjacentHTML('afterend', message);

        }).catch(err => {
            console.log(err)
        })
    }

    e.preventDefault();
});