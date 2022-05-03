//Declaring ALL of our elements
//Signedin/out exclusive
let signedin = document.querySelectorAll(".signedin")
let signedout = document.querySelectorAll(".signedout")
//clients/scribes exclusive (for links)
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
let resetbutton = document.querySelector("#reset_button");
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
//Job Listing Page
let joblistingsubmitbtn = document.querySelector("#joblistsubmitbtn");
let shaydetest = document.querySelector("#shaydetest")
let closesubmission = document.querySelector('#closesubmission');


//My Account (Scribe)

//todo: profile page for other users or modify myaccount to show other users' info

//Navigation Events
//Function for navigating pages
all_pages = [mainpage, signup, aboutus, myaccountclient, myaccountscribe, searchpage, shaydetest]

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
navigate(letsgo, shaydetest)

//Click "Find Work"
navigate(linkwork, searchpage)

//Click "About Us"
navigate(linkaboutus, aboutus)

//Click "Sign Up"
navigate(btnsignup, signup)
navigate(linksignup, signup)

navigate(closesubmission, mainpage)


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
    //Save data
    function save_data(collection_name, obj) {
        db.collection(`${collection_name}`).add(obj).then(() => {
            console.log("job created");
        })
    }

    // Submit job form to firebase
    joblistingsubmitbtn.addEventListener('click', (e) => {
        e.preventDefault();
    
        //Job content
        let job_title = document.querySelector('#jobtitle').value;
        let job_description = document.querySelector("#jobdescription").value;
        let job_category = document.querySelector('#categoryselect').value;
        //let job_criteria = document.querySelector('#jobcriteria').value; What is this for?
        let job_payrate_number = document.querySelector('#payrate').value;
        let job_payrate_increment = document.querySelector('#payrateselect').value;
        let job_deadline = document.querySelector('#deadline').value;
        let file = document.querySelector('#audioupload').files[0];

        //let audio_duration = document.getElementById("#audioupload").duration;
        let audio = new Date() + "_" + file.name;

        const task = ref.child(audio).put(file);

        task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                let job = {
                    title: job_title,
                    description: job_description,
                    category: job_category,
                    //criteria: job_criteria,
                    payrate: "$" + job_payrate_number + " " + job_payrate_increment,
                    deadline: job_deadline,
                    client_email: auth.currentUser.email,
                    post_time : + new Date(),
                    //duration: audio_duration,
                    audio: url
                };

            console.log(job);
    
            save_data('jobs', job);


        })
    //successful submission pop up
    shaydetest.classList.add("is-hidden");

    success.classList.remove('is-hidden');


});

//successful submission pop up close and return to home

function successSub() {
    success.classList.add('is-hidden');

}


// let closesubmission = document.querySelector('closesubmission');
// closesubmission.addEventListener('click', (e) => {
//             e.preventDefault();
//             success.classList.add('is-hidden');
//             shaydetest.classList.remove('is-hidden');
//         },
// success.classList.remove("is-hidden");
// // mainpage.classList.remove("is-hidden");
// //reset form when finished -- doesn't work
// const form = document.getElementById('jobsubmissionform');



//Loading Data
    //Load Data function
        function load_data(collection_name, contentid, i) {
            db.collection(`${collection_name}`).orderBy("post_time", "asc").limit(100).get().then((response) => {
            let docs = response.docs;
            let snapshot = response.docs[i]
            let data = snapshot.data();
                
            let html = '';

            if (docs.length == 0) {
                contentid.innerHTML = "No data available";
                return;
            }

                html += `
                <div class="my-2">
                    <span class="tag is-rounded">${data.category}</span>
                    <span class="tag is-rounded">Duration</span>
                    <span class="tag is-rounded">${data.payrate}</span>
                </div>
                <audio controls>
                <source src="${data.audio}" type="audio/mpeg">
                <source src="${data.audio}" type="audio/wav">
                Your browser does not support the audio element.
                </audio> 
                <p>${data.title}</p> 
                   
                `;
                console.log(data)
            
            //append content to the content variable
            contentid.innerHTML = html;
            })
        }

    //Load data into urgent requests element (1)
        load_data("jobs", stalecontent1, 0)
        load_data("jobs", stalecontent2, 1)
        load_data("jobs", stalecontent3, 2)
        load_data("jobs", stalecontent4, 3)


let jobslength = document.querySelector('#jobslength');
let jobs_data = document.querySelector('#jobs_data');
// LOAD JOBS 
function load_jobs() {
    console.log("loading jobs 0")
    db.collection("jobs").get().then((response) => {
        let docs = response.docs;
        let html = '';
        
        // console.log("loading jobs");
        if (docs.length == 0) {
            jobs_data.innerHTML = "Search yielded no results";
            jobslength.innerHTML = 'No results';
        }

        if (docs.length > 1) {
            jobslength.innerHTML = `${docs.length}`;

        }

        docs.forEach(doc => {
            if (docs.length != 0) {

                // restaurantslength.innerHTML = `${load_data_conditions('restaurants', 'name', '==', 'Mediterranean Cafe').length}` + "Results";
                // *TODO: If requires approval, remove is-hidden for approval tag
                html +=
                `
                <div class="column is-half cards" id="${doc.id}" onclick="load_modal('${doc.id}')">
                    <article class="card is-shady">
                        <figure class="card-image"
                            style="height: 100px; background-image: url(https://i.ibb.co/fq8hSGQ/placeholder-image-368x246.png); background-position: center; background-size: 80%;">
                        </figure>
                        <div class="card-content pt-0 px-3">
                            <div class="mb-2">
                                <span class="tag is-rounded mt-2">${doc.data().category}</span>
                                <span class="tag is-rounded mt-2">Due: ${doc.data().deadline}</span>
                                <span class="tag is-rounded mt-2">${doc.data().payrate}</span>
                            </div>
                            <p class="jobs">${doc.data().title}</p>
                            <p class="is-size-7">${doc.data().client_email}</p>
                            <a href="" class="has-text-primary is-size-7"> <u>Details</u></a>
                            <!-- APPROVAL REQUIRED *IF REQUIRED, DELETE IS-HIDDEN -->
                            <br><span class="tag is-rounded is-danger mt-2 is-hidden">Approval
                                Required</span><br>
                            <a class="button is-primary mt-2" id="btn-sign-up">
                                <strong class="is-size-7">Accept/Request</strong>
                            </a>
                        </div>
                    </article>
                </div>
                `
            } else {
                html =
                    `<div class="has-text-centered has-text-weight-bold has-text-grey-light my-6 signedincontent">
                <i class="fas fa-seedling is-size-4 mr-2"></i>
                <p>No jobs currently available!</p>
                </div>`;

            }
        })


        // append content to the content variable
        jobs_data.innerHTML = html;
    })
}
load_jobs();


// SEARCH
function search_job() {
    let input = document.getElementById('search_bar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('jobs');
    let y = document.getElementsByClassName('cards');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            y[i].style.display="none";
        }
        else {
            y[i].style.display="list-item";                 
        }
    }
    //*TODO

    // if (docs.length == 0) {
    //     restaurant_data.innerHTML = "Search yielded no results";
    //     restaurantslength.innerHTML = 'No results';
    // }

    // if (docs.length == 1) {
    //     restaurantslength.innerHTML = `${docs.length}` + ' result';

    // }

    // if (docs.length > 1) {
    //     restaurantslength.innerHTML = `${docs.length}` + ' results';

    // }

}

// FILTER

const ages = [32, 33, 16, 40];
const result = ages.filter(fallsWithin(32,33));

function fallsWithin(age, min, max) {
    return age >= min && age <= max;
}
console.log(result);

function load_data_conditions(field, operator, val) {

    let query = db.collection("jobs").where(field, operator, val);

    query.get().then((response) => {
        let docs = response.docs;
        let html = '';

        if (docs.length == 0) {
            restaurant_data.innerHTML = "Search yielded no results";
            restaurantslength.innerHTML = 'No results';
        }

        if (docs.length == 1) {
            restaurantslength.innerHTML = `${docs.length}` + ' result';

        }

        if (docs.length > 1) {
            restaurantslength.innerHTML = `${docs.length}` + ' results';

        }

        docs.forEach(doc => {
            // console.log(doc.data().title, "=>", doc.data().description);
            let rating = '';
            for (let i = 0; i < doc.data().best_rating; i++) {
                if(doc.data().best_rating-i < 1){
                    if(doc.data().best_rating-i >= 0.5){
                        rating += `<i class="fas fa-star-half has-text-warning"></i>`;
                    }
                }else{
                    rating += `<i class="fas fa-star has-text-warning"></i>`;
                }
            }

            html +=
                `<div class="card large mb-4" id="${doc.id}" onclick="load_modal('${doc.id}')">
                <!-- IMAGE -->
                <div class="card-image">
                    <figure class="image is-16by9">
                    <img src="images/restaurant2.jpeg" alt="Restaurant" style="object-fit: cover;">
                    </figure>
                </div>
                <!-- CONTENT -->
                <div class="card-content">
                    <div class="media">
                        <div class="content">
                            <h1 class="title has-text-weight-bold has-text-primary is-4 mb-1"
                            style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">${doc.data().name}</h1>
                            ${rating}
                            <p class="subtitle is-6 mt-1"><b>${doc.data().best}</b></p>
                            <p class="subtitle is-6 mb-0"><b>Address: </b>${doc.data().address}, Madison, WI 53703</p>
                            <p class="subtitle is-6 mb-0"><b>Hours: </b>8AM – 10PM</p>
                            <p class="subtitle is-6"><b>Phone: </b>${doc.data().phone}</p>
                        </div>
                    </div>
                </div>
            </div>   
            `;
        })
        // append content to the content variable
        restaurant_data.innerHTML = html;
    })
}


