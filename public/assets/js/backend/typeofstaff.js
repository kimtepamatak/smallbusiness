let editTypeofstaffId = ''
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
                const liststaff = staffs.data.filter(value => value.status !== "Disable")
                liststaff.forEach(element => {
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


async function getTypeofstaff() {
    try {
        await axios.get('/typeofstaffs')
            .then(typeofstaffs => {
                // render data from server
                let parentPost = document.getElementById("typeofstaffTable");
                typeofstaffs.data.forEach(element => {
                    var childPost = document.createElement("tr");
                    childPost.setAttribute("id", "trTypeofstaff" + element._id);
                    const staff = allStaff.find(staff => staff._id === element.staffId)
                    if (staff) {
                        childPost.innerHTML = `
                            <td>${ staff.surname + ' ' + staff.firstname }</td>
                            <td>${ element.type }</td>
                            <td>${ element.salary } $</td>
                            <td class="text-center">
                            <i class="fa-solid fa-file-pen" onclick="toEditTypeofstaff('${ element._id }')"></i>
                            <i class="fa-solid fa-trash" onclick="deleteTypeofstaff('${ element._id }')"></i>
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

async function deleteTypeofstaff(typeofstaffId) {
    await axios.delete('/typeofstaff/' + typeofstaffId).then(() => {
        document.getElementById('trTypeofstaff' + typeofstaffId).remove();
    })
}

async function toEditTypeofstaff(typeofstaffId) {
    await axios.get('/typeofstaff/' + typeofstaffId)
        .then(typeofstaff => {
            editTypeofstaffId = ''
            const staff = allStaff.find(staff => staff._id === typeofstaff.data.staffId)
            document.getElementById('inputEditStaff').value = staff.surname + ' ' + staff.firstname
            document.getElementById('type').value = typeofstaff.data.type
            document.getElementById('salary').value = typeofstaff.data.salary
            $('#editTypeofstaffModal').modal('show')
            editTypeofstaffId = typeofstaff.data._id
        })
        .catch(err => {
            console.log(err)
        })
}

async function updatetypeofstaff() {
    await axios.patch('/typeofstaff/' + editTypeofstaffId, {
        type: document.getElementById('type').value,
        salary: document.getElementById('salary').value,
    }).then((value) => {
        console.log(value.data)
        if (value.data) {
            window.location.reload();
        }
    }).catch(err => {
        console.log(err)
    })
}

Promise.all([getStaff()]).then(() => {
    getTypeofstaff()
})