let search = $('#searchInput');

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}

const myFunction = function (i, page_name) {
    let id = ['#home_page', '#customer_page', '#product_page', '#order_page', '#settings_page'];
    let loadingScreens = ['#home', '#customer', '#product', '#order', '#settings'];
    for (let j = 0; j < id.length; j++) {
        if (i === j) {
            $(loadingScreens[j]).css('display', 'block');
            $(id[j]).addClass("active");
            console.log(id[j])
        } else {
            $(loadingScreens[j]).css('display', 'none');
            $(id[j]).removeClass("active");
        }
    }

    $('.dashboard').text(page_name);
}

$(document).ready(function () {

    $('#home_page').on('click', () => {
        myFunction(0, 'Dashboard');
    });

    $('#customer_page').on('click', function () {
        myFunction(1, 'Customer Details');
    });

    $('#product_page').on('click', function () {
        myFunction(2, 'Product Details');
    });

    $('#order_page').on('click', function () {
        myFunction(3, 'Order Details');
    });

    $('#settings_page').on('click', function () {
        myFunction(4, 'Settings');
    });
});

const incomeData = [1000, 1200, 800, 1500, 2000, 1800, 1600, 2200, 2500, 2100, 1800, 2000];

const ctx = $('#myChart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Earnings in Rs',
            data: incomeData,
            // backgroundColor:[
            //     '#cce5ff'
            // ],
            borderColor: [
                '#66b0ff'
            ],
            borderWidth: 3,
            fill: false
        }]
    },
    options: {
        responsive: true
    }
});

search.on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $("tbody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});