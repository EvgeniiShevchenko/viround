'use strict';
document.addEventListener('DOMContentLoaded', function() {
  const loginItem = document.getElementById('login');
  const logOutItem = document.getElementById('logOut');
  const store = {
    login: false,
    list: Array(10),
  };
  let newCustomers = {
    first_name: '',
    last_name: '',
    interest: '',
    password: '',
    location_name: '',
    latitude: '',
    longitude: '',
    phone_number: '',
    phone_code: '',
  };

  const toDoList = document.getElementById('toDoList');
  (() => {
    if (localStorage.getItem('jwtToken')) {
      store.login = true;
      login();
    } else {
      store.login = false;
    }

    for (let i = 0; i < 10; ++i) {
      const listItem = document.createElement('li');

      listItem.setAttribute('class', 'list-task-item');

      listItem.innerHTML = `
      <label class="task-item-label" for="taskItem${i}"><input ${store.login ? '' : 'disabled'}
       type="checkbox" id="taskItem${i}" class="task-item-input"></input>
        Go to the crossary and bay an banana for yourself</label>
        <div class="task-item-wrapper" style="${store.login ? 'display: flex' : 'display: none'}">
          <button id="edit-btn" class="task-item-edit" type="button">edit</button>
          <button id="delete-btn" class="task-item-delete" type="button">delete</button>
        </div>
      `;

      if (toDoList) {
        toDoList.append(listItem);
      }
    }
  })();

  function login() {
    loginItem.style.display = 'none';
    logOutItem.style.display = 'block';
    // store.login ? (loginTitle.innerText = 'Логаут') : 'Логин';
  }

  function logOut() {
    localStorage.removeItem('jwtToken');
    loginItem.style.display = 'block';
    logOutItem.style.display = 'none';
    store.login = false;
    location.reload();
  }

  if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
      try {
        e.preventDefault();
        const formData = e.target.elements;
        const submitData = {};

        for (let i = 0; i < formData.length - 1; ++i) {
          const fieldName = e.target.elements[i].name;
          const fieldValue = e.target.elements[i].value;

          if (fieldName === 'phone_code') {
            submitData[fieldName] = fieldValue;
            continue;
          }
          if (!fieldValue) {
            continue;
          }
          submitData[fieldName] = fieldValue;
          e.target.elements[i].value = '';
        }

        const loginRequest = await axios.post('http://localhost:3000/api/login', { ...submitData });
        if (loginRequest.data.error === false) {
          localStorage.setItem('jwtToken', loginRequest.data.token);

          store.login = true;
          login();
        } else {
          console.log('error!');
        }
      } catch (e) {
        console.error(e);
      }
    });
  }

  if (document.getElementById('signUpForm')) {
    document.getElementById('signUpForm').addEventListener('submit', async function(e) {
      try {
        e.preventDefault();

        const formData = e.target.elements;
        const customer = {};

        for (let i = 0; i < formData.length - 1; ++i) {
          const fieldName = e.target.elements[i].name;
          const fieldValue = e.target.elements[i].value;

          if (fieldName === 'phone_code') {
            customer[fieldName] = fieldValue;
            e.target.elements[i].value = '+380';
            continue;
          }
          if (fieldName === 'passwordConfirm') {
            e.target.elements[i].value = '';
            continue;
          }
          if (fieldName === 'confidentiality') {
            e.target.elements[i].checked = false;
            continue;
          }
          if (!fieldValue) {
            continue;
          }
          customer[fieldName] = fieldValue;
          e.target.elements[i].value = '';
        }
        newCustomers = { ...newCustomers, ...customer };

        const addCustomer = await axios.post('http://localhost:3000/api/sign-up', { data: newCustomers });

        console.log(addCustomer.data);
      } catch (e) {
        console.error(e);
      }
    });
  }

  document.getElementById('toDoList').addEventListener('click', function(e) {
    const boble = e.path;
    let listItem, list;
    // e.stopPropagation();
    // console.log(e);
    // switch (e.target.id) {
    //   case 'edit-btn':
    //     break;
    //   case 'delete-btn':
    //     break;

    //   default:
    //     break;
    // }
    function deleteItem() {
      list.removeChild(listItem);
      console.log(list);
    }

    function editItem() {
      if (e.target.innerText === 'edit') {
        e.target.style.backgroundColor = 'blue';
        e.target.style.color = 'white';
        e.target.innerText = 'save';
        listItem.setAttribute('contenteditable', 'true');
      } else {
        e.target.style.backgroundColor = 'green';
        e.target.style.color = 'black';
        e.target.innerText = 'edit';
        listItem.setAttribute('contenteditable', 'false');
      }
    }

    console.log(e);
    for (const item of boble) {
      if (item.nodeName === 'LI') {
        listItem = item;
      }
      if (item.nodeName === 'UL') {
        list = item;
      }
      console.log(item.nodeName);
    }

    // console.log(e);
    if (e.target.id === 'delete-btn') {
      // alert("i'm working");
      deleteItem();
    }
    if (e.target.id === 'edit-btn') {
      // alert("i'm working");
      editItem();
    }
    // if (e.currentTarget.NodeName === 'Button') {
    // alert('hello');
    // }
  });

  document.getElementById('logOut').addEventListener('click', function(e) {
    logOut();
  });

  function hello (){
    
  }
});
