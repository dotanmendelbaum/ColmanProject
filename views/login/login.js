
const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i*100);
})

window.onload = () => {
    if(sessionStorage.name){
        location.href = '/';
    }
}

const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');


submitBtn.addEventListener('click', () => {
    console.log("send")
    fetch('/login', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
        .then(res => {
            if (res.status === 200) {
                // Redirect the user to the home page
                window.location.href = '/';
            } else {
                // Display an error message

                return res.json();
            }
        })
        .then(data => {
            if (data) {
                validateData(data);
            }
        })
})

const validateData = (data) => {
    if(!data.name){
        showErrorPopup(data, 3000);

    } else{
        sessionStorage.name = data.name;
        sessionStorage.email = data.email;
        location.href = '/';
    }
}
