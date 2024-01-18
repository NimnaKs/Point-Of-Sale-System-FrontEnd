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

let customerApi = new CustomerApi();

custAddBtn.on('click', () => {
    openCustomerModal('Add New Customer', 'Save', 'btn-success');
    generateCustomerId();
});

function generateCustomerId() {
    customerApi.generateCustomerId()
        .then(custId => {
            customerId.val(custId);
        })
        .catch(error => {
            console.log(error);
            showError('Fetching Error', 'Error generating student ID');
        });
}

custSaveUpdateBtn.on('click', (event) => {

    event.preventDefault();

    let customer_id = customerId.val();
    let custname = name.val();
    let contact_no = contact.val();
    let email_add = email.val();
    let add = address.val();

    if (
        validation(custname, "Customer name", null) &&
        validation(contact_no, "Customer contact", mobilePattern.test(contact_no)) &&
        validation(email_add, "Customer email", emailPattern.test(email_add)) &&
        validation(add, "Customer addresss", null) 
    ) {

        let customerModel = new CustomerModel(
            customer_id,
            custname,
            add,
            contact_no,
            email_add
        );

        if (custSaveUpdateBtn.text() === 'Save') {
            customerApi.saveCustomer(customerModel)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    )
                    populateCustomerTable();
                })
                .catch((error) => {
                    showError('Save Unsucessfull', error);
                });
        } else {
            customerApi.updateCustomer(customerModel)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    )
                    populateCustomerTable();
                })
                .catch((error) => {
                    showError('Update Unsucessfull', error);
                });
        }

        custClear.click();

        populateCustomerTable();

    }

});

custClear.on('click', () => {
    custReset.click();
    generateStudentId();
});


function populateCustomerTable() {
    customerApi.getAllCustomer()
        .then((responseText) => {
            let customer_db = JSON.parse(responseText);
            $('tbody').eq(0).empty();
            customer_db.forEach((customer) => {
                $('tbody').eq(0).append(
                    `<tr>
                        <th row='span'>${customer.customerId}</th>
                        <td>${customer.name}</td>
                        <td>${customer.address}</td>
                        <td>${customer.contact}</td>
                        <td>${customer.email}</td>
                        <td>
                            <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#customerModal"
                                data-customer-id="${customer.customerId}">
                                Edit
                            </button>
                        </td>
                        <td>
                            <button class="deleteBtn btn btn-danger btn-sm" data-customer-id="${customer.customerId}">
                                Delete
                            </button>
                        </td>
                    </tr>`
                );
            });
        })
        .catch((error) => {
            console.log(error);
            showError('fetch Unsuccessful', error);
        });
}

$('tbody').on('click', '.updateBtn', function () {
    const customerId = $(this).data('customer-id');
    openStudentModal('Update Customer', 'Update', 'btn-warning', customerId);
});

$('tbody').on('click', '.deleteBtn', function () {
    const customerId = $(this).data('customer-id');
    deleteCustomer(customerId);
});


function deleteCustomer(customerId) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            customerApi.deleteCustomer(customerId)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    )
                    populateCustomerTable();
                })
                .catch((error) => {
                    console.log(error);
                    showError('Customer delete Unsucessfull', error);
                });
        }
    });

}


function showError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
}

function openCustomerModal(heading, buttonText, buttonClass, custId) {

    if (custId) {
        customerApi.getCustomer(custId)
                .then((responseText) => {
                    let customer = JSON.parse(responseText);
                    customerId.val(customer.customerId);
                    name.val(customer.name);
                    address.val(customer.address); 
                    contact.val(customer.contact);
                    email.val(customer.email);
                })
                .catch((error) => {
                    console.log(error);
                    showError('Fetch Unsucessfull', error);
                });
    }

    $('#customerFormHeading').text(heading);
    custSaveUpdateBtn.text(buttonText);
    $('#customerModal').modal('show');
    custSaveUpdateBtn.removeClass('btn-success btn-warning').addClass(buttonClass);

}

function validation(value, message, test) {
    if (!value) {
        showError('Null Input', 'Input ' + message);
        return false;
    }
    if (test === null) {
        return true;
    }
    if (!test) {
        showError('Invalid Input', 'Invalid Input ' + message);
        return false;
    }
    return true;
}

