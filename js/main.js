let rowData = document.getElementById("rowData");

    async function getCustomers(){
        
        let response = await fetch ('http://localhost:3000/customers',{ method: 'GET'} ) ;
        let data = await response.json();
        displayCustomers(data);
     }
async function getTransactions(customerId) {
   
        let response = await fetch(`http://localhost:3000/transactions?customer_id=${customerId}`, { method: 'GET' });
        let data = await response.json();
        let customerTransactions = data.filter(transaction => transaction.customer_id === customerId);
        displayTransactions(customerTransactions);
    } 
async function displayCustomers(arr){
    let string =`
    <h1 class="text-center text-success mt-5">Customers List</h1>
    `;
    for(let i =0 ; i<arr.length;i++){
        string+=`
       <div class="col-md-6 col-lg-4  col-12 ">
                <div class="bg-light shadow-sm border rounded-2">
                    <div class="d-flex justify-content-center pt-2 ">
                        <img src="${arr[i].image}"  class="rounded-circle" alt="customer-img">
                    </div>
                    <h4 class="pt-4 text-center text-danger fw-bold ">Name : <span class="fs-5 fw-lighter text-black">${arr[i].name}</span> </h4>
                    <h4 class="text-center text-danger fw-bold">Email : <span class="fs-5 fw-lighter text-black">${arr[i].Email}</span></h4>
                    <div class="d-flex justify-content-between pe-4 ps-4 pb-4">
                        <p  class="size">
                            <span class="text-danger">ID:${arr[i].id}</span><span> /Age:${arr[i].Age}</span>
                        </p>
                        <button onclick="getTransactions(${arr[i].id})" class="btn btn-success">User Transactions</button>
                        </div>
                </div>
            </div>
                    
                    `;
                 
    }
    rowData.innerHTML = string;
}
async function displayTransactions(transactions) {
    let string = `
        <i onclick="getCustomers()" class="back fas fa-arrow-left position-fixed pointer top-0 start-0 p-4 fs-4 "> Back </i>
        <h1 class="text-center text-success mt-5">Customers Transactions</h1>
    `;
    transactions.forEach(transaction => {
        string += `
            <div class="row gy-2">
                <div class="col-3">
                    <h6><i class="text-danger fas fa-address-card"></i> Transaction ID: ${transaction.id}</h6>
                </div>
                <div class="col-3">
                    <h6><i class="text-success fas fa-money-check-dollar"></i> Amount: ${transaction.amount}</h6>
                </div>
                <div class="col-3">
                    <h6><i class="text-success fas fa-calendar-check"></i> Date: ${transaction.date}</h6>
                </div>
                <div class="col-3">
                    <h6><i class="text-primary fas fa-location-dot"></i> Place: ${transaction.place}</h6>
                </div>
            </div>
            <hr>
        `;
    });
    rowData.innerHTML = string;

}
getCustomers();

