import { CustomerApi } from "../api/customerApi.js";
import { CustomerModel } from "../model/customerModel.js";

let custAddBtn = $('#custAddBtn');
let custSaveUpdateBtn = $('#custSaveUpdateButton');
let custClear = $('#custClear');
let custReset = $('#custReset');

let customerId = $('#customerId');
let name = $('#name');
let address = $('#address');
let contact = $('#contact');
let email = $('#email');

let CustomerApi = new CustomerApi();


function generateCustomerId() {
    try {
        const custId = await dbprogress.generateStudentId();
        customerId.val(JSON.parse(custId));
    } catch (error) {
        showError('Fetching Error', 'Error generating student ID');
    }
}

function showError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
}



