window.onload = async () => {
    await apiRequest("/costs/api/statistic","GET")
        .then(response => response.json())
        .then(jsonData => {
            console.log(jsonData)
            Object.keys(jsonData).forEach(year => {
                let h1 = document.createElement("h1")
                h1.innerText = year;
                document.body.appendChild(h1);
                Object.keys(jsonData[year]).forEach(month => {
                    jsonData[year][month].forEach
                    console.log(year, month)
                    console.log(jsonData[year][month])
                    let table = createTable(month, ["Bolt", "Költés"], jsonData[year][month]);
                    document.body.appendChild(table);
                });

            });
        })
}
