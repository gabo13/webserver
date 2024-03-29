
async function apiRequest(endpoint, method, data = null) {
    let options = {
        method: method,
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        //body: JSON.stringify(data)
    }
    if (data) {
        options.body = JSON.stringify(data)
    }

    const response = await fetch(endpoint, options)
    return response
}


const spendform = document.getElementById("ID_spendform")

function getShops(){
    apiRequest("/costs/api/getshops","GET")
    .then(response=>response.json())
    .then(data => {
        console.log("shops:", data)
        let shops = document.getElementById("ID_shops_list");
        shops.innerHTML="";
        for (let shop of data) {
            optionElement = document.createElement("option");
            optionElement.innerText = shop;
            optionElement.value = shop;
            shops.appendChild(optionElement);
        }
    })
}


window.onload = () => {
    getShops();
    renderTable("ID_table");
}

async function renderTable(parentId) {
    // get data and render table
    await apiRequest("/costs/api/","GET")
    .then(response => response.json())
    .then(data => {
        let container = document.getElementById(parentId);
        container.innerHTML = "";
        let table = document.createElement("table");
        let thead = document.createElement("thead");
        data.header.forEach(element => {
            let th = document.createElement("th");
            th.innerText = element;
            thead.appendChild(th);
        });
        table.appendChild(thead);
        let tbody = document.createElement("tbody")
        data.data.reverse().forEach(record => {
            let tr = document.createElement("tr");
            record.forEach(element => {
                let td = document.createElement("td");
                td.innerText = element;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        
        
        container.appendChild(table);
        console.info("Refresh table ok")

    });
}


spendform.addEventListener("submit", async (ev) => {
    ev.preventDefault()
    let formdata = new FormData(ev.target)
    console.log(formdata)
    let jsonData = Object.fromEntries(formdata.entries());
    jsonData.shop = jsonData.shop.toUpperCase();
    jsonData.comment = jsonData.comment.toUpperCase();
    console.log(jsonData)
    await apiRequest("/costs/api/", "POST", jsonData)
        .then(data => data.json())
        .then(data => {
            console.log("WTF")
            renderTable("ID_table");
        })
})

function testregex(regex) {
    for (let i = 0; i < 101; i++) {
        if (String(i).match(regex)) {
            console.log(i)
        }
    }
}

function clearValue(elem) {
    elem.value = "";
}