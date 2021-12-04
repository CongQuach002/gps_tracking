var login = document.getElementById('login')
var Email = document.getElementById('email')
var Password = document.getElementById('pass')

const auth = firebase.auth();
login.addEventListener('click', e => {
    e.preventDefault();
    if (Email.value.length<5) {
     Email.style.borderColor = "red"
    }
    if (Password.value.length<3) {
        Password.style.borderColor ="red"
    }
    auth.signInWithEmailAndPassword(Email.value,Password.value).then(function(result) {
        var user = result.user;
        useadmin = user.uid;
        console.log(useadmin);
        window.location.assign('/home.html');


    }).catch(function(error) {
        console.error('Error: hande error here>>>', error.message)
        document.getElementById('nf').innerHTML=error.message
    })
}, false)