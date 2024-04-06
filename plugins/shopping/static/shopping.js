console.log("Shopping.js loaded")
/*
  Created by: Horvath Gaboar
  Date: 2023.02.06.
*/
const API_DOMAIN= "/"

window.addEventListener("load", function () {
    const status = document.getElementById("net_status");
    status.innerText = this.navigator.onLine ? "Online" : "Offline";
    api_request_data()
      .then((json_data) => {
        item_list = json_data["data"];
        console.log(json_data);
        render_items();
      })
      .catch((err) => {
        alert(`Hiba történt az API komunikáció közben\nload\n${err}`);
      });
  });
  
  let item_list = {
    pending: [],
    ready: [],
  };
  
  const btn_save = document.getElementById("btn_save");
  const btn_add = document.getElementById("btn_add");
  const btn_clear = document.getElementById("btn_clear");
  const input_item = document.getElementById("input_item");
  const rendered_list = document.getElementById("rendered_list");
  const pending_list = document.getElementById("pending_list");
  const ready_list = document.getElementById("ready_list");
  
  
  async function api_send_data(data) {
    const res_data = await fetch(API_DOMAIN + "shopping/api", {
      method: "POST",
      cors: "*/*",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res_data.json();
  }
  async function api_request_data() {
    const data = await fetch(API_DOMAIN + "shopping/api", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    return data.json();
  }
  
  function putToReady(obj) {
    console.log(obj.innerText);
    const item = obj.innerText;
    const index = item_list["pending"].indexOf(item);
    if (index > -1) {
      item_list["pending"].splice(index, 1);
    }
    item_list["ready"].unshift(item);
    render_items();
    btn_save.style.backgroundColor = "red";
  }
  
  function readyToPending(obj) {
    console.log(obj.innerText);
    const item = obj.innerText;
    const index = item_list["ready"].indexOf(item);
    if (index > -1) {
      item_list["ready"].splice(index, 1);
    }
    item_list["pending"].unshift(item);
    render_items();
    btn_save.style.backgroundColor = "red";
  }
  
  function render_items() {
    let html_template = "<ul>";
    for (let item of item_list["pending"]) {
      html_template += `<li onclick="putToReady(this)">${item}</li>`;
    }
    html_template += "</ul>";
    pending_list.innerHTML = html_template;
  
    html_template = "<ul>";
    for (let item of item_list["ready"]) {
      html_template += `<li onclick="readyToPending(this)">${item}</li>`;
    }
    html_template += "</ul>";
  
    ready_list.innerHTML = html_template;
  }
  
  async function dialogAlert(showmsg) {
   let dialog = document.querySelector('#dialog');
   dialog.showModal();
   let msg = document.querySelector('#dialog_msg');
   msg.innerText = showmsg;
  }
  
  function removeItemFromArray(arr, item) {
    let index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index,1);
      btn_save.style.backgroundColor = "red";
    }
  }
  
  function add_item() {
  
    const item = input_item.value.trim().toUpperCase();
  
    if (item != "") {
      let index = item_list["pending"].indexOf(item)
      if ( index == -1) {
        item_list["pending"].unshift(item);
      }
      index = item_list["ready"].indexOf(item);
      if (index > -1) {
        item_list["ready"].splice(index,1);
      }
      input_item.value = "";
    }
    input_item.focus();
    btn_save.style.backgroundColor = "red";
    render_items();
  }
  
  input_item.addEventListener("keypress", function (e) {
    if (e.code == "Enter" || e.keyCode == 13) {
      add_item();
      btn_save.style.backgroundColor = "red";
    }
  });
  
  btn_add.addEventListener("click", function (e) {
    add_item();
    btn_save.style.backgroundColor = "red";
  });
  
  btn_save.addEventListener("click", function () {
    api_send_data(item_list)
      .then((json_data) => {
        btn_save.style.backgroundColor = "yellowgreen";
        dialogAlert(json_data["msg"]);
      })
      .catch((err) => {
        dialogAlert(`Hiba történt a komunikáció közben\n${err}`);
      });
  });
  
  btn_clear.addEventListener("click", function () {
    if (item_list["ready"].length != 0) {
    item_list["ready"] = [];
    render_items();
    btn_save.style.backgroundColor = "red";
    }
  })