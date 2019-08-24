//vanaf er geklikt wordt, worden de velden uitgelezen
var btnlogin = document.querySelector(".login button").addEventListener("click",(e) => {
 
    //lees values uit de velden
    let username = document.querySelector("#email").value;
    let password = document.querySelector('#password').value;
    
    //een post naar de login route maken
    fetch('http://localhost:3000/users/login',{
        //post methode
        method:"post",
        //belangrijk bij fetch: meegeven welke content er heen en weer word gestuurd
        //in dit geval: json
        headers:{
            'Content-Type': 'application/json'
        },
        
        //json string die we meegeven
        //bestaande uit username en password
        body: JSON.stringify({
            "username":username,
            "password":password
        })
        //krijg je respons? krijg een antwoord dat word geparsed naar JSON 
        }).then(response=>{
            return response.json();

        //als de status = "succes" is word de token gestockeerd
        // + navigeren naar de applicatie
    }).then(json =>{
        if(json.status === "succes"){
            let token = json.data.token;
            localStorage.setItem("token",token);
            window.location.href = "chat.html";
        }else{
            //indien er iets foutgaat: komt er een foutmelding te zien uit de hidden klasse
            let feedback = document.querySelector(".alert");
            feedback.textContent = "Something went wrong";
            feedback.classList.remove('hidden');
        }

    })
        
    });