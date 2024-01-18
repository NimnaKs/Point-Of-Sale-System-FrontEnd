import { ItemApi } from "../api/itemApi.js";
import { ItemModel } from "../model/itemModel.js";

// DOM elements
let addItemBtn = $('#addItemBtn');
let saveUpdateBtn = $('#saveUpdateButton');
let clearBtn = $('#clear');
let resetBtn = $('#reset');

let productId = $('#productId');
let desc = $('#Desc');
// let imageInput = $('#imageInput');
let qty = $('#qty');
let unitprice = $('#unitprice');
// let image = $('#previewImage');

let search = $('#searchInput');

let itemApi = new ItemApi();

// const imagePathPattern = new RegExp("/\.(jpg|jpeg|png|gif|bmp|svg)$/i");

search.on("input", function () {
    let value = $(this).val().toLowerCase();
    $("#item-table-body tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});

// Event listeners
$('#product_page').on('click', function () {
    populateItemTable();
});

addItemBtn.on('click', () => {
    openItemModal('Add New Product', 'Save', 'btn-success');
    generateProductId();
});

saveUpdateBtn.on('click', (event) => {
    event.preventDefault();

    let itemCode = productId.val();
    let itemName = desc.val();
    let price = unitprice.val();
    let quantity = qty.val();
    // let imageFile = imageInput.prop('files')[0];

    if (
        validation(itemName, "Item name", null) &&
        validation(price, "Item price", price > 0) &&
        validation(quantity, "Item quantity", quantity > 0) 
        // validation(imageFile, "Item image", null)
    ) {
        let itemModel = new ItemModel(
            itemCode,
            itemName,
            price,
            quantity
        );

        if (saveUpdateBtn.text() === 'Save') {
            itemApi.saveItem(itemModel)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    );
                    populateItemTable();
                })
                .catch((error) => {
                    showError('Save Unsuccessful', error);
                });
        } else {
            itemApi.updateItem(itemModel)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    );
                    populateItemTable();
                })
                .catch((error) => {
                    showError('Update Unsuccessful', error);
                });
        }

        clearBtn.click();
        populateItemTable();
    }
});

clearBtn.on('click', () => {
    resetBtn.click();
    generateProductId();
});

function populateItemTable() {
    itemApi.getAllItems()
        .then((responseText) => {
            let item_db = responseText;
            $('tbody').empty();
            item_db.forEach((item) => {
                $('tbody').append(
                    `<tr>
                        <td class="text-center">${item.item_code}</td>
                        <td class="text-center">${item.item_name}</td>
                        <td class="text-center">${item.qty_on_hand}</td>
                        <td class="text-center">${item.price}</td>
                        <td class="text-center">
                            <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#productModal"
                                data-item-code="${item.item_code}">
                                Edit
                            </button>
                        </td>
                        <td class="text-center">
                            <button class="deleteBtn btn btn-danger btn-sm" data-item-code="${item.item_code}">
                                Delete
                            </button>
                        </td>
                    </tr>`
                );
            });
        })
        .catch((error) => {
            showError('Fetch Unsuccessful', error);
        });
}

$('tbody').on('click', '.updateBtn', function () {
    const itemCode = $(this).data('item-code');
    openItemModal('Update Product', 'Update', 'btn-warning', itemCode);
});

$('tbody').on('click', '.deleteBtn', function () {
    const itemCode = $(this).data('item-code');
    deleteItem(itemCode);
});

function deleteItem(itemCode) {
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
            itemApi.deleteItem(itemCode)
                .then((responseText) => {
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    );
                    populateItemTable();
                })
                .catch((error) => {
                    showError('Item delete Unsuccessful', error);
                });
        }
    });
}

function openItemModal(heading, buttonText, buttonClass, itemCode) {
    if (itemCode) {
        itemApi.getItem(itemCode)
            .then((responseText) => {
                let item = responseText;
                productId.val(item.item_code);
                desc.val(item.item_name);
                unitprice.val(item.price);
                qty.val(item.qty_on_hand);
                // image.attr('src', item.image); // Set the image source
            })
            .catch((error) => {
                console.log(error);
                showError('Fetch Unsuccessful', error);
            });
    }

    $('#productFormHeading').text(heading);
    saveUpdateBtn.text(buttonText);
    $('#productModal').modal('show');
    saveUpdateBtn.removeClass('btn-success btn-warning').addClass(buttonClass);
}

function showError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
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

function generateProductId() {
    console.log('calling...');
    itemApi.generateProductId()
        .then(itemCode => {
            productId.val(itemCode);
        })
        .catch(error => {
            console.log(error);
            showError('Fetching Error', 'Error generating item code');
        });
}

// imageInput.on('change', function () {
//     let file = this.files[0];
//     if (file) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//             image.attr('src', e.target.result);
//         };
//         reader.readAsDataURL(file);
//     }
// });
