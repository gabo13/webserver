window.onload = async () => {
    await apiRequest("/costs/api/statistic","GET")
        .then(response => response.json())
        .then(jsonData => {
            let sumDiv = document.getElementById("ID_sum");
            let tablesDiv = document.getElementById("ID_tables")
            console.log("json",jsonData)
            let month_details =jsonData.month_details;
            let month_sum = jsonData.month_sum;
            Object.keys(month_details).forEach(year => {
                let h1 = document.createElement("h1")
                h1.innerText = year;
                document.body. appendChild(h1);
                Object.keys(month_details[year]).forEach(month => {
                    month_details[year][month].forEach
                    console.log(year, month)
                    console.log(month_details[year][month])
                    let table = createTable(year + " " + months[month-1], ["Bolt", "Költés", "Alkalom"], month_details[year][month]);
                    tablesDiv.appendChild(table);
                });
                let table = createTable("Havi összegzés", ["Év", "Hónap", "Költés"], month_sum);
                sumDiv.appendChild(table);
            });
        })
}

const months = [
    "Január",
    "Február",
    "Március",
    "Április",
    "Május",
    "Június",
    "Július",
    "Augusztus",
    "Szeptember",
    "Október",
    "November",
    "December",
];
