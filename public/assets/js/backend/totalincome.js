let editDailyincomeId = ''
let editTypeofproductId = ''
let allProduct = []
let showSelect = false
let inputProductId = ''
    // select product
$(document).ready(function() {
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".dropdown-menu li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#inputProduct").on("click", function() {
        showSelect = !showSelect
        showSelect ? $("#listSelectProducts").show() : $('#listSelectProducts').hide();
    })

    $("#inputProduct").on("input", function() {
        if (inputProductId) {
            const product = allProduct.find(element => element._id === inputProductId)
            document.getElementById("inputProduct").value = product.surname + ' ' + product.firstname
        } else {
            document.getElementById("inputProduct").value = ""
        }
    })
});

function clickProduct(productId) {
    inputProductId = productId
    document.getElementById("inputProductId").value = productId
    const product = allProduct.find(element => element._id === productId)
    document.getElementById("inputProduct").value = product.NameProduct
    document.getElementById("SellPrice").value = product.SellPrice
}

async function getProduct() {
    try {
        await axios.get('/products')
            .then(products => {
                allProduct = products.data // save all product to global variable

                let parentPost = document.getElementById("listSelectProducts");
                products.data.forEach(element => {
                    var childPost = document.createElement("li");
                    childPost.setAttribute("class", "mx-3 mt-1");
                    childPost.setAttribute("onclick", `clickProduct('${element._id}')`);
                    childPost.innerHTML = `${element.NameProduct}`;
                    parentPost.appendChild(childPost);
                })
            })
            .catch((err) => {
                console.log(err)
            })
    } catch (error) {
        console.log(error)
    }
}


async function getDailyincome() {
    try {
        await axios.get('/dailyincomes')
            .then(dailyincomes => {
                // render data from server
                let parentPost = document.getElementById("dailyincomeTable");
                const listTotal = []
                const listDate = []
                dailyincomes.data.forEach(value => {
                    // if (listTotal.length == 0) {
                    //     listTotal.push(value)
                    //     listDate.push(value.date)
                    // }

                    if (listDate.includes(value.date)) {
                        listTotal.forEach(item => {
                            if (item.date == value.date) item.incomeAmount += value.incomeAmount
                        })
                    } else {
                        listTotal.push(value)
                        listDate.push(value.date)
                    }
                })
                listTotal.reverse().forEach(element => {
                    console.log('element', element, allProduct)
                    var childPost = document.createElement("tr");
                    childPost.setAttribute("id", "trDailyincome" + element._id);
                    const product = allProduct.find(product => product._id === element.ProductId)
                    if (product) {
                        childPost.innerHTML = `
                            <td>${ element.date }</td>
                            <td>${ element.incomeAmount } $</td>
                        `;
                        parentPost.appendChild(childPost);
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            })
    } catch (error) {
        console.log(error)
    }
}

async function deleteDailyincome(dailyincomeId) {
    await axios.delete('/dailyincome/' + dailyincomeId).then(() => {
        document.getElementById('trDailyincome' + dailyincomeId).remove();
    })
}

async function toEditDailyincome(dailyincomeId) {
    await axios.get('/dailyincome/' + dailyincomeId)
        .then(dailyincome => {
            editDailyincomeId = ''
            document.getElementById('userId').value = dailyincome.data.userId
            document.getElementById('productId').value = dailyincome.data.productId
            document.getElementById('date').value = dailyincome.data.date
            document.getElementById('numbersold').value = dailyincome.data.numbersold
            document.getElementById('extrafee').value = dailyincome.data.extrafee
            document.getElementById('incomeamount').value = dailyincome.data.incomeamount
            $('#editDailyincomeModal').modal('show')
            editDailyincomeId = dailyincome.data._id
        })
        .catch(err => {
            console.log(err)
        })
}

async function updatedailyincome() {
    await axios.patch('/dailyincome/' + editDailyincomeId, {
        userId: document.getElementById('userId').value,
        productId: document.getElementById('productId').value,
        date: document.getElementById('date').value,
        numbersold: document.getElementById('numbersold').value,
        extrafee: document.getElementById('extrafee').value,
        incomeamount: document.getElementById('incomeamount').value,
    }).then((value) => {
        if (value.data) {
            window.location.reload();
        }
    }).catch(err => {
        console.log(err)
    })
}

function checkError() {
    const urlParams = new URLSearchParams(window.location.search);
    const ProductName = urlParams.get('ProductName');
    const NumberProduct = urlParams.get('NumberProduct');
    if (NumberProduct && ProductName) alert(`ProductName: ${ProductName} have only ${NumberProduct} in stock !!!`)
}

Promise.all([getProduct()]).then(() => {
    getDailyincome()
    checkError()
})