let editProductId = ''

async function getProduct() {
    try {
        await axios.get('/products')
            .then(products => {
                // render data from server
                let parentPost = document.getElementById("productTable");
                products.data.forEach(element => {
                    var childPost = document.createElement("tr");
                    childPost.setAttribute("id", "trProduct" + element._id);
                    childPost.innerHTML = `
                <td>${ element.NameProduct }</td>
                <td>${ element.NumberProduct }</td>
                <td>${ element.DateProduct }</td>
                <td>${ element.UnitPrice }$</td>
                <td>${ element.SellPrice }$</td>
                <td>${ element.Color }</td>
                <td>${ element.Size }</td>
                <td>${ element.Description }</td>
                <td class="text-center">
                  <i class="fa-solid fa-file-pen" onclick="toEditProduct('${ element._id }')"></i>
                  <i class="fa-solid fa-trash" onclick="deleteProduct('${ element._id }')"></i>
                </td>
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