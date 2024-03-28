class ApiHandler {
    constructor() {

    }
    async request(endpoint, method, data=null) {
        options = {
            method: method,
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
            }
        
        const response = fetch(endpoint, option)
    }
}

const spendform = document.getElementById("ID_spendform")
spendform.addEventListener("submit",(ev)=>{
    ev.preventDefault()
    let data = new FormData(ev.target)
    console.log(data)
})

function testregex(regex){
    for (let i = 0; i < 101; i++) {
        if (String(i).match(regex)) {
            console.log(i)
        }      
    }
}