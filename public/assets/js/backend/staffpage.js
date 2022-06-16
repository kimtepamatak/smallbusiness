let editStaffId = ''

async function getStaff() {
    try {
        await axios.get('/staffs')
            .then(staffs => {
                // render data from server
                // console.log(posts)
                let parentPost = document.getElementById("staffTable");
                staffs.data.forEach(element => {
                    var childPost = document.createElement("tr");
                    childPost.setAttribute("id", "trStaff" + element._id);
                    childPost.innerHTML = `
                <td>${ element.surname }</td>
                <td>${ element.firstname }</td>
                <td>${ element.dateofbirth }</td>
                <td>${ element.telephone }</td>
                <td>${ element.email }</td>
                <td>${ element.address }</td>
                <td>${ element.startdate }</td>
                <td class="text-center">${ element.status }</td>
                <td class="text-center">
                  <i class="fa-solid fa-file-pen" onclick="toEditStaff('${ element._id }')"></i>
                  <i class="fa-solid fa-trash" onclick="deleteStaff('${ element._id }')"></i>
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

async function deleteStaff(staffId) {
    await axios.delete('/staff/' + staffId).then(() => {
        document.getElementById('trStaff' + staffId).remove();
    })
}

async function toEditStaff(staffId) {
    await axios.get('/staff/' + staffId)
        .then(staff => {
            editStaffId = ''
            document.getElementById('surname').value = staff.data.surname
            document.getElementById('firstname').value = staff.data.firstname
            document.getElementById('dateofbirth').value = staff.data.dateofbirth
            document.getElementById('telephone').value = staff.data.telephone
            document.getElementById('email').value = staff.data.email
            document.getElementById('address').value = staff.data.address
            document.getElementById('startdate').value = staff.data.startdate
            document.getElementById('status').value = staff.data.status
            $('#editStaffModal').modal('show')
            editStaffId = staff.data._id
        })
        .catch(err => {
            console.log(err)
        })
}

async function updateStaff() {
    await axios.patch('/staff/' + editStaffId, {
        surname: document.getElementById('surname').value,
        firstname: document.getElementById('firstname').value,
        dateofbirth: document.getElementById('dateofbirth').value,
        telephone: document.getElementById('telephone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        startdate: document.getElementById('startdate').value,
        status: document.getElementById('status').value,
    }).then((value) => {
        if (value.data) {
            window.location.reload();
        }
    }).catch(err => {
        console.log(err)
    })
}

getStaff()