/*
 * These functions below are for various webpage functionalities. 
 * Each function serves to process data on the frontend:
 *      - Before sending requests to the backend.
 *      - After receiving responses from the backend.
 * 
 * To tailor them to your specific needs,
 * adjust or expand these functions to match both your 
 *   backend endpoints 
 * and 
 *   HTML structure.
 * 
 */


// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';

    response.text()
    .then((text) => {
        statusElem.textContent = text;
    })
    .catch((error) => {
        statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
    });
}

{/* ------------------------------ ALL ENTITIES ------------------------------ */}

// Fetches data from the client table and displays it.
async function fetchAndDisplayEntities() {

    const tableToFetch = document.getElementById('selectTableValue').value;
    
    const tableElement = document.getElementById('entityTable');
    const tableBody = tableElement.querySelector('tbody');

    let routeToFetch = '';

    switch (tableToFetch) {
        case "Client":
            routeToFetch = '/clienttable';
            break;
        case "Case":
            routeToFetch = '/casetable';
            break;
        case "Ticket":
            routeToFetch= '/tickettable';
            break;
        case "Insurance":
            routeToFetch= '/instable';
            break;
        default:
            return;
    }
    

    const response = await fetch(routeToFetch, {
        method: 'GET'
    });

    const responseData = await response.json();
    const tableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    tableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

{/* ------------------------------ CLIENTS ------------------------------ */}

// // Fetches data from the client table and displays it.
// async function fetchAndDisplayClients() {
//     const tableElement = document.getElementById('clienttable');
//     const tableBody = tableElement.querySelector('tbody');

//     const response = await fetch('/clienttable', {
//         method: 'GET'
//     });

//     const responseData = await response.json();
//     console.log(responseData)
//     const demotableContent = responseData.data;

//     // Always clear old, already fetched data before new fetching process.
//     if (tableBody) {
//         tableBody.innerHTML = '';
//     }

//     demotableContent.forEach(user => {
//         const row = tableBody.insertRow();
//         user.forEach((field, index) => {
//             const cell = row.insertCell(index);
//             cell.textContent = field;
//         });
//     });
// }

// // This function resets or initializes the client table.
// async function resetClients() {
//     const response = await fetch("/initiate-clienttable", {
//         method: 'POST'
//     });
//     const responseData = await response.json();

//     if (responseData.success) {
//         const messageElement = document.getElementById('resetResultMsg');
//         messageElement.textContent = "client table initiated successfully!";
//         fetchTableData();
//     } else {
//         alert("Error initiating table!");
//     }
// }

// // Inserts new records into the client table.
// async function insertClient(event) {
//     event.preventDefault();

//     // clientid, phonenum, name, email, dateofbirth

//     const idValue = document.getElementById('insertClientId').value;
//     const phoneValue = document.getElementById('insertClientPhone').value;
//     const nameValue = document.getElementById('insertClientName').value;
//     const emailValue = document.getElementById('insertClientEmail').value;
//     const dobValue = document.getElementById('insertClientDOB').value;

//     const response = await fetch('/insert-clienttable', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             clientid: idValue,
//             phonenum: phoneValue,
//             name: nameValue,
//             email: emailValue,
//             dateofbirth: dobValue,
//         })
//     });

//     const responseData = await response.json();
//     const messageElement = document.getElementById('insertResultMsg');

//     if (responseData.success) {
//         messageElement.textContent = "Data inserted successfully!";
//         fetchTableData();
//     } else {
//         messageElement.textContent = "Error inserting data";
//     }
// }

// // Updates attribute in the client table.
// async function updateClient(event) {
//     event.preventDefault();

//     const clientID = document.getElementById('updateClientID').value;
//     const clientAttribute = document.getElementById('updateClientAttribute').value;
//     const newValue = document.getElementById('updateClientValue').value;

//     console.log(clientID)
//     console.log(clientAttribute)
//     console.log(newValue)


//     const response = await fetch('/update-client', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             clientID: clientID,
//             clientAttribute: clientAttribute,
//             newValue: newValue
//         })
//     });

//     const responseData = await response.json();
//     const messageElement = document.getElementById('updateClientResultMsg');

//     if (responseData.success) {
//         messageElement.textContent = "Client updated successfully!";
//         fetchTableData();
//     } else {
//         messageElement.textContent = "Error updating ";
//     }
// }

function submitForm(event){
    event.preventDefault();
    fetchAndDisplayEntities();
}

// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function() {
    checkDbConnection();
    document.getElementById("resetClients").addEventListener("click", resetClients);
    document.getElementById("insertClient").addEventListener("submit", insertClient);
    document.getElementById("updateClient").addEventListener("submit", updateClient);
    
};