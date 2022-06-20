let editPaymentId = ''
let allStaff = []
let showSelect = false
let inputStaffId = ''
    // select staff
$(document).ready(function() {
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".dropdown-menu li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $("#inputStaff").on("click", function() {
        showSelect = !showSelect
        showSelect ? $("#listSelectStaffs").show() : $('#listSelectStaffs').hide();
    })

    $("#inputStaff").on("input", function() {
        if (inputStaffId) {
            const staff = allStaff.find(element => element._id === inputStaffId)
            document.getElementById("inputStaff").value = staff.surname + ' ' + staff.firstname
        } else {
            document.getElementById("inputStaff").value = ""
        }
    })
});

function clickStaff(staffId) {
    inputStaffId = staffId
    document.getElementById("inputStaffId").value = staffId
    const staff = allStaff.find(element => element._id === staffId)
    document.getElementById("inputStaff").value = staff.surname + ' ' + staff.firstname
}

async function getStaff() {
    try {
        await axios.get('/staffs')
            .then(staffs => {
                allStaff = staffs.data // save all staff to global variable

                let parentPost = document.getElementById("listSelectStaffs");
                staffs.data.forEach(element => {
                    var childPost = document.createElement("li");
                    childPost.setAttribute("class", "mx-3 mt-1");
                    childPost.setAttribute("onclick", `clickStaff('${element._id}')`);
                    childPost.innerHTML = `${element.surname + ' ' + element.firstname}`;
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


async function getPayment() {
    try {
        await axios.get('/payments')
            .then(payments => {
                // render data from server
                let parentPost = document.getElementById("paymentTable");
                payments.data.forEach(element => {
                    var childPost = document.createElement("tr");
                    childPost.setAttribute("id", "trPayment" + element._id);
                    const staff = allStaff.find(staff => staff._id === element.staffId)
                    if (staff) {
                        childPost.innerHTML = `
                <td>${ staff.surname + ' ' + staff.firstname }</td>
                <td>${ element.date }</td>
                <td>${ element.paymentamount } $</td>
                <td class="text-center">
                  <i class="fa-solid fa-trash" onclick="deletePayment('${ element._id }')"></i>
                </td>
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

async function deletePayment(paymentId) {
    await axios.delete('/payment/' + paymentId).then(() => {
        document.getElementById('trPayment' + paymentId).remove();
    })
}

async function toEditPayment(paymentId) {
    await axios.get('/payment/' + paymentId)
        .then(payment => {
            editPaymentId = ''
            document.getElementById('staffId').value = payment.data.staffId
            document.getElementById('date').value = payment.data.date
            document.getElementById('numberhour').value = payment.data.numberhour
            document.getElementById('bonus').value = payment.data.bonus
            $('#editPaymentModal').modal('show')
            editPaymentId = payment.data._id
        })
        .catch(err => {
            console.log(err)
        })
}

async function updatepayment() {
    await axios.patch('/payment/' + editPaymentId, {
        staffId: document.getElementById('staffId').value,
        date: document.getElementById('date').value,
        numberhour: document.getElementById('numberhour').value,
        bonus: document.getElementById('bonus').value,
    }).then((value) => {
        if (value.data) {
            window.location.reload();
        }
    }).catch(err => {
        console.log(err)
    })
}

Promise.all([getStaff()]).then(() => {
    getPayment()
})