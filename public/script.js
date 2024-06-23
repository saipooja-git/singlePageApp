const emailName = document.getElementById('email');
const firstName = document.getElementById('fname');
const lastName = document.getElementById('lname');
const password = document.getElementById('password');
const submit = document.querySelector('.submit');

submit.addEventListener('click', function(event) {
    // Trim the values to avoid issues with whitespace
    const emailValue = emailName.value.trim();
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const passwordValue = password.value.trim();

    // Check if any of the fields are empty
    if (emailValue === '' || firstNameValue === '' || lastNameValue === '' || passwordValue === '') {
        event.preventDefault(); 
        alert('Please fill in all fields.');
    }
});
