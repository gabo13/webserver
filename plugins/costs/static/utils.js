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

function createTable(title, header, data) {
    /* if (header.length != data.length) {
        throw new Error("Header and data length not equal!")
    } */
    let table = document.createElement("table");
    let caption = document.createElement("caption");
    caption.innerText = title;
    table.appendChild(caption);
    let thead = document.createElement("thead");
    let theadtr = document.createElement("tr")
    header.forEach(element => {
        let th = document.createElement("th");
        th.innerText = element;
        theadtr.appendChild(th);
        thead.appendChild(theadtr);
        table.appendChild(thead);
    });
    let tbody = document.createElement("tbody");
    data.forEach((row) => {
        let tr = document.createElement("tr");
        row.forEach(data => {
            let td = document.createElement("td");
            td.innerText = data;
            tr.appendChild(td);
        })
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table
}
