//Declaring ALL of our elements
//Signedin/out exclusive
let signedin = document.querySelectorAll(".signedin")
let signedout = document.querySelectorAll(".signedout")
//clients/scribes exclusive
let scribesonly = document.querySelectorAll(".scribesonly")
//Page Declarations
let mainpage = document.querySelector("#main-page"); //this is our "home page"
let signup = document.querySelector("#sign-up");
let aboutus = document.querySelector("#about-us");
let myaccountclient = document.querySelector("#client-my-account");
let myaccountscribe = document.querySelector("#scribe-my-account");
let myaccount = document.querySelector("#my-account");
let searchpage = document.querySelector("#discover");
let login = document.querySelector("#loginFc");
//Navbar
let logo = document.querySelector("#logo");
let linkwork = document.querySelector("#link-work");
let linkaboutus = document.querySelector("#link-about-us");
let useremail = document.querySelector("#user_email");
let btnlogin = document.querySelector("#btn-log-in");
let btnlogout = document.querySelector("#btnlogout");
let btnsignup = document.querySelector("#btn-sign-up");
let linksignup = document.querySelector("#link-sign-up");
let linkupdateprofile = document.querySelector("#link-update-profile")
//Search Page
let searchbar = document.querySelector("#search_bar"); //Search page will need more elements, still has some restaurant template IDs
let searchbutton = document.querySelector("#search_button");
let filterform = document.querySelector("#filter_form");
let letsgo = document.querySelector("#lets-go");
//Signup
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let displayname = document.querySelector("#displayname");
let confirmpassword = document.querySelector("#confirmpassword");
let btnsignupsubmit = document.querySelector("#btn-sign-up-submit");
let linkogin = document.querySelector("#link-log-in");
let signupform = document.querySelector("#signup_form");
let clientbtn = document.querySelector("#clientbtn");
let scribebtn = document.querySelector("#scribebtn");
//login
let loginmodal = document.querySelector("#login-modal")
let loginmodalbg = document.querySelector("#login-modalbg")
let loginform = document.querySelector("#login_form")
let log_email = document.querySelector("#log_email")
let log_password = document.querySelector("#log_password")
let log_submitbtn = document.querySelector("#log_submitbtn")
let login_error = document.querySelector("#login_error")
//update profile
let updatemodal = document.querySelector("#update-modal")
let updatemodalbg = document.querySelector("#update-modalbg")
let updateform = document.querySelector("#update_form")
let updatedisp = document.querySelector("#update_disp")
let updatebio = document.querySelector("#update_bio")
let update_submitbtn = document.querySelector("#update_submitbtn")
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
let cprofilename = document.querySelector("#cprofilename")
let sprofilename = document.querySelector("#sprofilename")

//My Account (Scribe)

//todo: profile page for other users or modify myaccount to show other users' info

//Navigation Events
//Function for navigating pages
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
let shaydetest = document.querySelector("#shaydetest")
navigate(letsgo, shaydetest)

//Click "Find Work"
navigate(linkwork, searchpage)

//Click "About Us"
navigate(linkaboutus, aboutus)

//Click "Sign Up"
navigate(btnsignup, signup)
navigate(linksignup, signup)


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
            //create user data doc in "users" collection
            var user = credentials.user;
            //grab setting values
            let usertype = ""
            if (clientbtn.checked) { //client
                usertype = "client"
            } else { //scribe
                usertype = "scribe"
            }
            //create new users document with same id as user
            db.collection("users").doc(credentials.user.uid).set({
                usertype: usertype,
                username: displayname.value,
                bio: ""
            }).catch(err => {

                alert(err.message)
            })

            //reset the page
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

//things to do if the user is signed in
function isSignedIn() {
    //hide signedout content
    signedout.forEach(i => {
        if (i.classList.contains("is-hidden")) {
            return
        } else {
            i.classList.add('is-hidden');
        }
    });
    signedin.forEach(e => {
        if (e.classList.contains('is-hidden')) {
            e.classList.remove('is-hidden')
        }
    })
    //make profile button link to correct account page
    //show scribe/client exclusives to the correct people
    db.collection('users').doc(auth.currentUser.uid).get().then(result => {
        let pftype = `myaccount${result.data().usertype}`
        useremail.classList += ` ${pftype}`
        if (pftype == 'myaccountscribe') {
            navigate(useremail, myaccountscribe)
            scribesonly.forEach(e => {
                if (e.classList.contains('is-hidden')) {
                    e.classList.remove('is-hidden')
                }
            })
        } else {
            navigate(useremail, myaccountclient)
            scribesonly.forEach(e => {
                if (!e.classList.contains('is-hidden')) {
                    e.classList.add('is-hidden')
                }
            })
        }
    })
    //show current user's username in places where it should be
    db.collection('users').doc(auth.currentUser.uid).get().then(result => {
        useremail.innerHTML = `${result.data().username}`
        cprofilename.innerHTML = `${result.data().username}`
        sprofilename.innerHTML = `${result.data().username}`
    })

}

// Auth state change functionality
auth.onAuthStateChanged((user) => {
    if (user) { //if signed in
        isSignedIn()
    } else { //if signed out
        //hide signedin content
        signedin.forEach(i => {
            if (i.classList.contains("is-hidden")) {
                return
            } else {
                i.classList.add('is-hidden');
            }
        });
    }
})

// Login modal visibility
function close_modal(modal_id) {
    //close modal by removing .is_active
    document.querySelector(`#${modal_id}`).classList.remove("is-active")
}

btnlogin.addEventListener('click', () => {
    loginmodal.classList.add('is-active');
});

loginmodalbg.addEventListener('click', () => {
    close_modal("login-modal")
});

//Login Functionality
loginform.addEventListener('submit', (e) => {
    //prevent auto refresh on the page
    e.preventDefault();

    // grab email and password
    const logemail = document.querySelector('#log_email').value;
    const logpass = document.querySelector('#log_password').value;

    auth.signInWithEmailAndPassword(logemail, logpass).then(credentials => {
        //close login modal
        close_modal("login-modal")

        // reset the form
        signup_form.reset();
    }).catch(err => {
        // display error message on modal
        login_error.innerHTML = `<p>${err.message}</p>`;
    })

})

//Log Out Button
btnlogout.addEventListener('click', (e) => {
    auth.signOut()
    signedout.forEach(e => {
        if (e.classList.contains('is-hidden')) {
            e.classList.remove('is-hidden')
        }
    })
})

//update profile info
//TODO: this doesn't work
linkupdateprofile.addEventListener('click', () => {
    updatemodal.classList.add('is-active');
});

updatemodalbg.addEventListener('click', () => {
    close_modal("update-modal")
});

update_submitbtn.addEventListener('click', () => {
    let dis = updatedisp.value
    let bioo = updatebio.value
    db.collection('users').doc(auth.currentUser.uid).get().then((result) => {
        //update values of user's settings doc
        db.collection('users').doc(auth.currentUser.uid).update({
            username: dis,
            bio: bioo
        }).then(() => {
            //close modal
            close_modal('update-modal')
        })
    })
})

//Saving Data
//save data
function save_data(collection_name, obj) {
    db.collection(`${collection_name}`).add(obj).then(() => {
      //submitShoeForm.reset();
      console.log("job created");
    })
  }