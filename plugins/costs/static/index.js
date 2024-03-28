
async function apiRequest(endpoint, method, data=null) {
    let options = {
        method: method,
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    
    const response = await fetch(endpoint, options)
    return response
}


const spendform = document.getElementById("ID_spendform")
spendform.addEventListener("submit",(ev)=>{
    ev.preventDefault()
    let data = new FormData(ev.target)
    console.log(data)
    let value = Object.fromEntries(data.entries());
    console.log(value)
    apiRequest("/costs/api", "POST", value)
    .then(data=>data.json())
    .then(data=>{console.log(data)})
})

function testregex(regex){
    for (let i = 0; i < 101; i++) {
        if (String(i).match(regex)) {
            console.log(i)
        }      
    }
}