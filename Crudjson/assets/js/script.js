const userForm = document.getElementById('userForm');
const toggleFormButton = document.getElementById('toggleForm');
const darkModeToggle = document.getElementById('darkModeToggle');
const userTableBody = document.querySelector('#userTable tbody');

const editModal = document.getElementById('editModal');
const closeModalButton = document.getElementById('closeModal');
const editForm = document.getElementById('editForm');

let users = [];
let editIndex = null; 

toggleFormButton.addEventListener('click', () => {
    userForm.style.display = userForm.style.display === 'none' ? 'block' : 'none';
});

darkModeToggle.addEventListener('click', () => {
    const currentTheme = document.body.dataset.theme;
    document.body.dataset.theme = currentTheme === 'light' ? 'dark' : 'light';
});

userForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    if (name && phone && email) {
        users.push({ name, phone, email });
        renderTable();
        userForm.reset();
        userForm.style.display = 'none';
    }
});

function renderTable() {
    userTableBody.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.phone}</td>
      <td>${user.email}</td>
      <td>
        <button onclick="editUser(${index})">Editar</button>
        <button onclick="deleteUser(${index})">Excluir</button>
      </td>
    `;

        userTableBody.appendChild(row);
    });
}

window.editUser = function (index) {
    const user = users[index];

    document.getElementById('editName').value = user.name;
    document.getElementById('editPhone').value = user.phone;
    document.getElementById('editEmail').value = user.email;

    editIndex = index; 
    editModal.style.display = 'flex'; 
};

closeModalButton.addEventListener('click', () => {
    editModal.style.display = 'none';
});

editForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('editName').value.trim();
    const phone = document.getElementById('editPhone').value.trim();
    const email = document.getElementById('editEmail').value.trim();

    if (name && phone && email) {
        users[editIndex] = { name, phone, email };

        renderTable(); 
        editModal.style.display = 'none';
        editIndex = null; 
    }
});

window.deleteUser = function (index) {
    users.splice(index, 1);
    renderTable();
};