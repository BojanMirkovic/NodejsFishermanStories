
//ClickEvent för send-btn
const form = document.getElementById('input-form');
const submitBtn = document.getElementById('send-btn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const date = document.getElementById('date').value;
  const message = document.getElementById('message').value;

  const bookingId = Math.floor(Math.random() * 1000000); // generate random booking id
  
  const data = {
      id: bookingId, // add the booking id to the data object
      name: name,
      email: email,
      date: date,
      message: message
  };
  
  fetch('/submit-form', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
     .then(response => response.text())
     .then(result => {
     alert(`Your reservation Id number is: ${bookingId} , save the number for delete option!`)
      console.log(result);
       // Clear the form
       document.getElementById('name').value = '';
       document.getElementById('email').value = '';
       document.getElementById('date').value = '';
       document.getElementById('message').value = '';
  })
  .catch(error => {
      alert('Something is wrong,faild to submit reservation!')
      console.log(error);
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('date').value = '';
      document.getElementById('message').value = '';
  });
});
 
//Click event for delete-btn
const deleteBtn = document.getElementById('delete-btn');

deleteBtn.addEventListener('click', () => {
  const userId = document.getElementById('booking-id').value;
  
  fetch(`/delete-form/${userId}`, { method: 'DELETE' })
    .then(res => res.text())
    .then(message => {
      alert(message);
      document.getElementById('booking-id').value = ''; // clear the user ID input field
    })
    .catch(err => {
      console.log(err);
      alert('An error occurred while deleting the user data');
    });
});

//Click event for receive-btn

function displayData() {
    fetch('/data')
      .then(response => response.json())
      .then(data => {
        const table = document.getElementById('data-table');
        table.innerHTML = `
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Message</th>
          </tr>
        `;
  
        data.forEach(entry => {
          table.innerHTML += `
            <tr>
              <td>${entry.id}</td>
              <td>${entry.name}</td>
              <td>${entry.email}</td>
              <td>${entry.date}</td>
              <td>${entry.message}</td>
            </tr>
          `;
        });
      })
      .catch(error => console.error(error));
  }









  








