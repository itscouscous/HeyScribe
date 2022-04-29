//Declaring ALL of our elements
//Page Declarations
let mainpage = document.querySelector("#main-page"); //this is our "home page"
let signup = document.querySelector("#sign-up");
let aboutus = document.querySelector("#about-us");
let myaccountclient = document.querySelector("#client-my-account");
let myaccountscribe = document.querySelector("#scribe-my-account");
let searchpage = document.querySelector("#discover");
let login = document.querySelector("#loginFc");
//Navbar
let logo = document.querySelector("#logo");
let linkwork = document.querySelector("#link-work");
let linkaboutus = document.querySelector("#link-about-us");
let useremail = document.querySelector("#user_email");
let btnlogin = document.querySelector("#btn-log-in");
let btnsignup = document.querySelector("#btn-sign-up");
//Search Page
let searchbar = document.querySelector("#search_bar"); //Search page will need more elements, still has some restaurant template IDs
let searchbutton = document.querySelector("#search_button");
let filterform = document.querySelector("#filter_form");
let letsgo = document.querySelector("#lets-go");
//Signup
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmpassword = document.querySelector("#confirmpassword");
let btnsignupsubmit = document.querySelector("#btn-sign-up-submit");
let linkogin = document.querySelector("#link-log-in");
let signupform = document.querySelector("#signup_form");
//About Us probably needs elements for the Contact Us form still
//Account Type
let accounttypeform = document.querySelector("#accounttype_form");
//My Account (Client)
let modalone = document.querySelector("#modalOne");
let legal = document.querySelector("#legal");
let entertainment = document.querySelector("#entertainment");
let education = document.querySelector("#education");
let medical = document.querySelector("#medical");
let criteria = document.querySelector("#criteria");
let deadline = document.querySelector("#deadline");
let docpicker = document.querySelector("#docpicker");
//My Account (Scribe)

//Navigation Events
//Function for navigating pages
//---> login isn't listed here yet bc i tried adding it and it broke the whole site??
all_pages = [mainpage, signup, aboutus, myaccountclient, myaccountscribe, searchpage]

function navigate(button, destination) {
    button.addEventListener('click', () => {
        all_pages.forEach(i => {
            if (i.classList.contains("is-hidden")) {
                return
            } else {
                i.classList.add('is-hidden');
            }
        });
        destination.classList.remove("is-hidden");
    });
}

//Click Logo
navigate(logo, mainpage)

//Click "Let's Go"
navigate(letsgo, searchpage)

//Click "Find Work"
navigate(linkwork, searchpage)

//Click "About Us"
navigate(linkaboutus, aboutus)

//Click "Log In" 
// ---> We still need login page
navigate(btnlogin, login)

//Click "Sign Up"
navigate(btnsignup, signup)

//Signup Functionality
signupform.addEventListener('submit', (e) => {
    //prevent auto refresh on the page
    e.preventDefault();

    // grab email and password
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmpassword = document.querySelector("#confirmpassword").value

    if (password == confirmpassword) {
        auth.createUserWithEmailAndPassword(email, password).then(credentials => {
            console.log(`UID: ${credentials.user.uid} Email: ${credentials.user.email} has signed up`);
            signup.classList.add("is-hidden");
            mainpage.classList.remove('is-hidden');

            // reset the form
            signup_form.reset();
        }).catch(err => {

            // display error message on modal

            const error = document.querySelector('.error');
            error.innerHTML = `<p>${err.message}</p>`;
        })
    } else {
        const error2 = document.querySelector('.error2');
        error2.innerHTML = `<p>Please retry password confirmation.</p>`;

    }

})

// Auth state change functionality
// todo: site visually changes when login state changes
auth.onAuthStateChanged((user) => {
    //if user is not null (user is signed in, there is a user)
    if (user) {
        alert('you are logged in')
    } else {
        alert('you are logged out')
    }
})