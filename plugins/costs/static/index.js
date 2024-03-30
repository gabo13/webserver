const spendform = document.getElementById("ID_spendform")

function getShops(){
    apiRequest("/costs/api/getshops","GET")
    .then(response=>response.json())
    .then(data => {
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
            let tdEdit = document.createElement("td")
            tdEdit.innerText = "Edit";
            tdEdit.dataset["id"] = record[0];
            tdEdit.addEventListener("click",editHandler);
            tr.appendChild(tdEdit);
            let tdDel = document.createElement("td")
            tdDel.innerText = "Del";
            tdDel.dataset["id"] = record[0];
            tdDel.addEventListener("click", deleteHandler);
            tr.appendChild(tdDel);
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        container.appendChild(table);

    });
    console.info("Render table")
}
async function editHandler(event) {
    let id = event.target.dataset.id;
    alert(`Edit id: ${event.target.dataset.id}`)
    //ezt írd meg
    await apiRequest(`/costs/api/id/${id}`,"PUT")
    .then((response) => {

    });
}
async function deleteHandler(event) {
    let id = event.target.dataset.id;
    if (confirm(`Törlöd az ${id} számú elemet?`)) {
        await apiRequest(`/costs/api/id/${id}`,"DELETE")
        .then((response)=>{
            renderTable("ID_table");
            alert(`${id} számú elem törölve`)
        });
    }
}
spendform.addEventListener("submit", async (ev) => {
    ev.preventDefault()
    let formdata = new FormData(ev.target)
    let jsonData = Object.fromEntries(formdata.entries());
    jsonData.shop = jsonData.shop.toUpperCase();
    jsonData.comment = jsonData.comment.toUpperCase();
    await apiRequest("/costs/api/", "POST", jsonData)
        .then(data => data.json())
        .then(data => {
            renderTable("ID_table");
        })
    document.querySelectorAll("input[data-clearable = 'true']").forEach((element)=>{
        element.value = "";
    });
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