let editProductId = ''

async function getProduct() {
    try {
        await axios.get('/products')
            .then(products => {
                // render data from server
                let parentPost = document.getElementById("productTable");
                const product = products.data.filter(value => value.NumberProduct < 5)
                product.forEach(element => {
                    var childPost = document.createElement("tr");
                    childPost.setAttribute("id", "trProduct" + element._id);
                    childPost.innerHTML = `
                <td>${ element.NameProduct }</td>
                <td>${ element.NumberProduct }</td>
                <td>${ element.DateProduct }</td>
              `;
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

async function deleteProduct(productId) {
    await axios.delete('/product/' + productId).then(() => {
        document.getElementById('trProduct' + productId).remove();
    })
}

async function toEditProduct(productId) {
    await axios.get('/product/' + productId)
        .then(product => {
            editProductId = ''
            document.getElementById('NameProduct').value = product.data.NameProduct
            document.getElementById('NumberProduct').value = product.data.NumberProduct
            document.getElementById('DateProduct').value = product.data.DateProduct
            document.getElementById('UnitPrice').value = product.data.UnitPrice
            document.getElementById('SellPrice').value = product.data.SellPrice
            document.getElementById('Color').value = product.data.Color
            document.getElementById('Size').value = product.data.Size
            document.getElementById('Description').value = product.data.Description
            $('#editProductModal').modal('show')
            editProductId = product.data._id
        })
        .catch(err => {
            console.log(err)
        })
}

async function updateproduct() {
    await axios.patch('/product/' + editProductId, {
        NameProduct: document.getElementById('NameProduct').value,
        NumberProduct: document.getElementById('NumberProduct').value,
        DateProduct: document.getElementById('DateProduct').value,
        UnitPrice: document.getElementById('UnitPrice').value,
        SellPrice: document.getElementById('SellPrice').value,
        Color: document.getElementById('Color').value,
        Size: document.getElementById('Size').value,
        Description: document.getElementById('Description').value,
    }).then((value) => {
        if (value.data) {
            window.location.reload();
        }
    }).catch(err => {
        console.log(err)
    })
}

getProduct()
    // let editDailyincomeId = ''
    // let editTypeofdailyincomeId = ''
    // let allDailyincome = []
    // let showSelect = false
    // let inputDailyincomeId = ''
    //     // select dailyincome
    // $(document).ready(function() {
    //     $("#myInput").on("keyup", function() {
    //         var value = $(this).val().toLowerCase();
    //         $(".dropdown-menu li").filter(function() {
    //             $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //         });
    //     });

//     $("#inputDailyincome").on("click", function() {
//         showSelect = !showSelect
//         showSelect ? $("#listSelectDailyincomes").show() : $('#listSelectDailyincomes').hide();
//     })

//     $("#inputDailyincome").on("input", function() {
//         if (inputDailyincomeId) {
//             const dailyincome = allDailyincome.find(element => element._id === inputDailyincomeId)
//             document.getElementById("inputDailyincome").value = dailyincome.surname + ' ' + dailyincome.firstname
//         } else {
//             document.getElementById("inputDailyincome").value = ""
//         }
//     })
// });

// function getDailyincome(dailyincomeId) {
//     inputDailyincomeId = dailyincomeId
//     document.getElementById("inputDailyincomeId").value = dailyincomeId
//     const dailyincome = allDailyincome.find(element => element._id === dailyincomeId)
//     document.getElementById("date").value = dailyincome.date
//     document.getElementById("inputProduct").value = dailyincome.NameProduct
//     document.getElementById("numberSold").value = dailyincome.numberSold
// }

// async function getDailyincome() {
//     try {
//         await axios.get('/dailyincomes')
//             .then(dailyincomes => {
//                 allDailyincome = dailyincomes.data // save all dailyincome to global variable

//                 let parentPost = document.getElementById("listSelectDailyincomes");
//                 dailyincomes.data.forEach(element => {
//                     var childPost = document.createElement("li");
//                     childPost.setAttribute("class", "mx-3 mt-1");
//                     childPost.setAttribute("onclick", `clickDailyincome('${element._id}')`);
//                     childPost.innerHTML = `${element.NameDailyincome}`;
//                     parentPost.appendChild(childPost);
//                 })
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     } catch (error) {
//         console.log(error)
//     }
// }


// async function getDailyincome() {
//     try {
//         await axios.get('/dailyincomes')
//             .then(dailyincomes => {
//                 // render data from server
//                 let parentPost = document.getElementById("dailyincomeTable");
//                 dailyincomes.data.forEach(element => {
//                     console.log('element', element, allDailyincome)
//                     var childPost = document.createElement("tr");
//                     childPost.setAttribute("id", "trDailyincome" + element._id);
//                     const dailyincome = allDailyincome.find(dailyincome => dailyincome._id === element.DailyincomeId)
//                     if (dailyincome) {
//                         childPost.innerHTML = `
//                             <td>${ element.date }</td>
//                             <td>${ element.ProductId}</td>
//                             <td>${ element.numberSold } Case</td>
//                         `;
//                         parentPost.appendChild(childPost);
//                     }
//                 })
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     } catch (error) {
//         console.log(error)
//     }
// }

// async function deleteDailyincome(dailyincomeId) {
//     await axios.delete('/dailyincome/' + dailyincomeId).then(() => {
//         document.getElementById('trDailyincome' + dailyincomeId).remove();
//     })
// }

// // async function toEditDailyincome(dailyincomeId) {
// //     await axios.get('/dailyincome/' + dailyincomeId)
// //         .then(dailyincome => {
// //             editDailyincomeId = ''
// //             document.getElementById('userId').value = dailyincome.data.userId
// //             document.getElementById('dailyincomeId').value = dailyincome.data.dailyincomeId
// //             document.getElementById('date').value = dailyincome.data.date
// //             document.getElementById('numbersold').value = dailyincome.data.numbersold
// //             document.getElementById('extrafee').value = dailyincome.data.extrafee
// //             document.getElementById('incomeamount').value = dailyincome.data.incomeamount
// //             $('#editDailyincomeModal').modal('show')
// //             editDailyincomeId = dailyincome.data._id
// //         })
// //         .catch(err => {
// //             console.log(err)
// //         })
// // }

// async function updatedailyincome() {
//     await axios.patch('/dailyincome/' + editDailyincomeId, {
//         userId: document.getElementById('userId').value,
//         dailyincomeId: document.getElementById('dailyincomeId').value,
//         date: document.getElementById('date').value,
//         numbersold: document.getElementById('numbersold').value,
//         extrafee: document.getElementById('extrafee').value,
//         incomeamount: document.getElementById('incomeamount').value,
//     }).then((value) => {
//         if (value.data) {
//             window.location.reload();
//         }
//     }).catch(err => {
//         console.log(err)
//     })
// }

// Promise.all([getDailyincome()]).then(() => {
//     getDailyincome()
// })