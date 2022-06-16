let editUserId = ''

async function getUser() {
    try {
        await axios.get('/users')
            .then(users => {
                // render data from server
                // console.log(posts)
                let parentPost = document.getElementById("userTable");
                users.data.forEach(element => {
                    var childPost = document.createElement("tr");
                    childPost.setAttribute("id", "trUser" + element._id);
                    childPost.innerHTML = `
                <td>${ element.username }</td>
                <td>${ element.fullname }</td>
                <td>${ element.password }</td>
                <td>${ element.telephone }</td>
                <td>${ element.email }</td>
                <td>${ element.address }</td>
                <td>${ element.type }</td>
                <td class="text-center">${ element.status }</td>
                <td class="text-center">
                  <i class="fa-solid fa-file-pen" onclick="toEditUser('${ element._id }')"></i>
                  <i class="fa-solid fa-trash" onclick="deleteUser('${ element._id }')"></i>
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

async function deleteUser(userId) {
    await axios.delete('/user/' + userId).then(() => {
        document.getElementById('trUser' + userId).remove();
    })
}

async function toEditUser(userId) {
    await axios.get('/user/' + userId)
        .then(user => {
            console.log(document.getElementById('username'));
            editUserId = ''
            document.getElementById('username').value = user.data.username
            document.getElementById('fullname').value = user.data.fullname
            document.getElementById('password').value = user.data.password
            document.getElementById('telephone').value = user.data.telephone
            document.getElementById('email').value = user.data.email
            document.getElementById('address').value = user.data.address
            document.getElementById('type').value = user.data.type
            document.getElementById('status').value = user.data.status
            $('#editUserModal').modal('show')
            editUserId = user.data._id
        })
        .catch(err => {
            console.log(err)
        })
}

async function updateUser() {
    await axios.patch('/user/' + editUserId, {
        username: document.getElementById('username').value,
        fullname: document.getElementById('fullname').value,
        password: document.getElementById('password').value,
        telephone: document.getElementById('telephone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        type: document.getElementById('type').value,
        status: document.getElementById('status').value,
    }).then((value) => {
        if (value.data) {
            window.location.reload();
        }
    }).catch(err => {
        console.log(err)
    })
}

getUser()