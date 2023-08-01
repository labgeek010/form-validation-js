
const firebaseConfig = {
    apiKey: "AIzaSyABvxpZbVcILvkH6Z5x2hLFgfcjbia4teQ",
    authDomain: "data-form---test1.firebaseapp.com",
    projectId: "data-form---test1",
    storageBucket: "data-form---test1.appspot.com",
    messagingSenderId: "457096490591",
    appId: "1:457096490591:web:9d2f7ee160fd1fa74675ea",
    measurementId: "G-T4SZ8Z9J12"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();




document.getElementById('form').addEventListener('submit', (event) =>{
    event.preventDefault()


    //verify name
    let entryName = document.getElementById('name')
    let errorName = document.getElementById('nameError')

    if(entryName.value.trim() === ''){
        errorName.textContent = 'Type your name please'
        errorName.classList.add('error-message')
    }else{
        errorName.textContent = ''
        errorName.classList.remove('error-message')
    }

    //verify email
    let entryEmail = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic validation patern
    if(!emailPattern.test(entryEmail.value)){
        emailError.textContent = 'Type your email please'
        emailError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    //verify password

    let entryPassword = document.getElementById('password')
    let passwordError = document.getElementById('passwordError')
    let passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    if(!passwordPattern.test(entryPassword.value)){
        passwordError.textContent = 'Password must be at least 8 characters, numbers, caps and special characters'
        passwordError.classList.add('error-message')
    }else{
        passwordError.textContent = ''
        passwordError.classList.remove('error-message')
    }

    //if all fields are valid, send form

    if(!errorName.textContent && !emailError.textContent && !passwordError.textContent){
        //backend receives the info

        db.collection("users").add({
            name: entryName.value,
            email: entryEmail.value,
            password: entryPassword.value
        })
        .then((docRef) => {
            alert('The form was sent successfully.', docRef.id)
            document.getElementById('form').reset();
        })
        .catch((error) => {
                alert(error)
        });

    }



})