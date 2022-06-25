let inputEl = document.getElementById("input-el");
let inputBtn = document.getElementById("input-btn");
let tabBtn = document.getElementById("tab-btn");
let deleteBtn = document.getElementById("delete-btn");
let ulEl = document.getElementById("ul-el");
let localStorage = window.localStorage
let yesButton = document.getElementById("yes-btn");
let CancelButton = document.getElementById("cancel-btn");
let buttons = document.getElementById("buttons");
let Message = document.getElementById("alert");

buttons.style.display = "none";

let inputLeads = [];
let gotLeads = "";

gotLeads = JSON.parse(localStorage.getItem("Leads"));

if(gotLeads) {
    inputLeads = gotLeads;
    Render(inputLeads)
}


function inputButton() {
    inputBtn.addEventListener("click", function() {
        inputLeads.push(inputEl.value);
        inputEl.value = "";

        localStorage.setItem("Leads", JSON.stringify(inputLeads));
        Render(inputLeads)
    })
}
inputButton()

function Render(leads) {
    let leadsInput =  "";
    for(let i = 0; i < leads.length; i++) {
        leadsInput += 
        `<li>
            <a href='${leads[i]}' target='_blank'>
                ${leads[i]} 
            </a>
        </li>`
    }
    ulEl.innerHTML = leadsInput;
}

function saveTab() {
    tabBtn.addEventListener("click", function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            inputLeads.push(tabs[0].url)
            localStorage.setItem("Leads", JSON.stringify(inputLeads));
            Render(inputLeads);
        })
    })
}
saveTab()

function deleteButton() {
    let clicked = false
    deleteBtn.addEventListener("click", function() {
        clicked = true;
        if(clicked == true) {
            Message.textContent = "Please select below buttons to proceed"
            buttons.style.display = "block";

            yesButton.addEventListener("click", function() {
                Message.textContent = "Please wait as we delete everything"
                setTimeout(() => {
                    localStorage.removeItem("Leads")
                    location.reload()
                    inputLeads = []
                    render(inputLeads)
                }, 5000);
            })

            CancelButton.addEventListener("click", function() {
                Message.textContent = "Yo cancelled the delete";
                setTimeout(() => {
                    location.reload()
                }, 2000);
            })
        }
    })
}
deleteButton()
