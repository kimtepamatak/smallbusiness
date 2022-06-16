let editAttendanceId = ''
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


async function getAttendance() {
    try {
        await axios.get('/attendances')
            .then(attendances => {
                // render data from server
                let parentPost = document.getElementById("attendanceTable");
                attendances.data.forEach(element => {
                    var childPost = document.createElement("tr");
                    childPost.setAttribute("id", "trAttendance" + element._id);
                    const staff = allStaff.find(staff => staff._id === element.staffId)
                    if (staff) {
                        childPost.innerHTML = `
                <td>${ staff.surname + ' ' + staff.firstname }</td>
                <td>${ element.date }</td>
                <td>${ element.numberhour }</td>
                <td>${ element.bonus }</td>
                <td class="text-center">
                  <i class="fa-solid fa-file-pen" onclick="toEditAttendance('${ element._id }')"></i>
                  <i class="fa-solid fa-trash" onclick="deleteAttendance('${ element._id }')"></i>
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

async function deleteAttendance(attendanceId) {
    await axios.delete('/attendance/' + attendanceId).then(() => {
        document.getElementById('trAttendance' + attendanceId).remove();
    })
}

async function toEditAttendance(attendanceId) {
    await axios.get('/attendance/' + attendanceId)
        .then(attendance => {
            editAttendanceId = ''
            document.getElementById('staffId').value = attendance.data.staffId
            document.getElementById('date').value = attendance.data.date
            document.getElementById('numberhour').value = attendance.data.numberhour
            document.getElementById('bonus').value = attendance.data.bonus
            $('#editAttendanceModal').modal('show')
            editAttendanceId = attendance.data._id
        })
        .catch(err => {
            console.log(err)
        })
}

async function updateattendance() {
    await axios.patch('/attendance/' + editAttendanceId, {
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
    getAttendance()
})