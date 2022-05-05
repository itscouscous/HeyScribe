//Declaring ALL of our elements
//Signedin/out exclusive
let signedin = document.querySelectorAll(".signedin")
let signedout = document.querySelectorAll(".signedout")
//clients/scribes exclusive (for links)
let scribesonly = document.querySelectorAll(".scribesonly")
let clientsonly = document.querySelectorAll(".clientsonly")
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
let listajob = document.querySelector('#listajob');
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
//Job Info Modal
let modaljobinfo = document.querySelector("#modal-job-info");
let modaltitle = document.querySelector(".modaltitle");
let modalposter = document.querySelector(".modalposter");
let modalcategory = document.querySelector(".modalcategory");
let modalrate = document.querySelector(".modalrate");
let modaldeadline = document.querySelector(".modaldeadline");
let modalapproval = document.querySelector(".modalapproval");
let modaldescription = document.querySelector(".modaldescription");

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
navigate(letsgo, signup)

//Click "Find Work"
navigate(linkwork, searchpage)

//Click "About Us"
navigate(linkaboutus, aboutus)

//Click "Sign Up"
navigate(btnsignup, signup)
navigate(linksignup, signup)

navigate(closesubmission, mainpage)

// Click Sign Out brings you back to mainpage
navigate(btnlogout, mainpage)

navigate(listajob, shaydetest)

navigate(joblistingsubmitbtn, myaccountclient);

// CONFIGURE MSG BAR
function configure_message_bar(msg) {
    // make the message bar visible
    document.querySelector('#message_bar').classList.remove('is-hidden');
    // set the content of the message bar
    document.querySelector('#message_bar').innerHTML = msg;

    // hide the message bar after 2 seconds

    setTimeout(() => {
        document.querySelector('#message_bar').classList.add('is-hidden');
        // clear the message bar
        document.querySelector('#message_bar').innerHTML = "";

    }, 2000)
}


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
            clientsonly.forEach(e => {
                if (!e.classList.contains('is-hidden')) {
                    e.classList.add('is-hidden')
                }
            })
        } else {
            navigate(useremail, myaccountclient)
            scribesonly.forEach(e => {
                if (!e.classList.contains('is-hidden')) {
                    e.classList.add('is-hidden')
                }
            })
            clientsonly.forEach(e => {
                if (e.classList.contains('is-hidden')) {
                    e.classList.remove('is-hidden')
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
        isSignedIn();
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
//*TODO: this doesn't work
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
    let approval_req = document.querySelector('#approvalselect').value;
    let job_payrate_number = document.querySelector('#payrate').value;
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
                approval: approval_req,
                payrate: job_payrate_number,
                deadline: job_deadline,
                client_email: auth.currentUser.email,
                post_time: +new Date(),
                //duration: audio_duration,
                audio: url,
                status: 'available'
            };

            console.log(job);

            save_data('jobs', job);
        })
    console.log("job listed")
    //successful submission pop up
    configure_message_bar('Job successfully listed!');

    // *TODO: LOAD MYACCOUNT PAGE TO UPDATE JOBS LISTED

});



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
            jobslength.innerHTML = 'No';
        }

        if (docs.length > 1) {
            jobslength.innerHTML = `${docs.length}`;

        }

        docs.forEach(doc => {
            if (docs.length != 0) {
                if (doc.data().approval=='1'){
                    html +=
                    `
                    <div class="column is-half cards" id="${doc.id}" onclick="load_modal('${doc.id}')">
                        <article class="card is-shady">
                            <figure class="card-image"
                                style="height: 100px; background-image: url(https://i.ibb.co/fq8hSGQ/placeholder-image-368x246.png); background-position: center; background-size: 80%;">
                            </figure>
                            <div class="card-content pt-0 px-3">
                                <div class="mb-2">
                                    <span class="tag is-rounded mt-2"><p class="cattag">${doc.data().category}</p></span>
                                    <span class="tag is-rounded mt-2">$<p class="ratetag">${doc.data().payrate}</p>/min</span>
                                    <span class="tag is-rounded mt-2">Due ${doc.data().deadline}</span>
                                </div>
                                <p class="job_title">${doc.data().title}</p>
                                <p class="is-size-7">${doc.data().client_email}</p>
                                <a href="" class="has-text-primary is-size-7"> <u>Details</u></a>
                                <br><span class="tag is-rounded is-danger mt-2">Approval
                                    Required</span><br>
                            </div>
                        </article>
                    </div>
                    `
                }else{
                    html +=
                    `
                    <div class="column is-half cards" id="${doc.id}" onclick="load_modal('${doc.id}')">
                        <article class="card is-shady">
                            <figure class="card-image"
                                style="height: 100px; background-image: url(https://i.ibb.co/fq8hSGQ/placeholder-image-368x246.png); background-position: center; background-size: 80%;">
                            </figure>
                            <div class="card-content pt-0 px-3">
                                <div class="mb-2">
                                    <span class="tag is-rounded mt-2"><p class="cattag">${doc.data().category}</p></span>
                                    <span class="tag is-rounded mt-2">$<p class="ratetag">${doc.data().payrate}</p>/min</span>
                                    <span class="tag is-rounded mt-2">Due ${doc.data().deadline}</span>
                                </div>
                                <p class="job_title">${doc.data().title}</p>
                                <p class="is-size-7">${doc.data().client_email}</p>
                                <a href="" class="has-text-primary is-size-7"> <u>Details</u></a>
                                <br><span class="tag is-rounded is-danger mt-2 is-hidden">Approval
                                    Required</span><br>
                            </div>
                        </article>
                    </div>
                    `
                }
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
    filter_form_industry.reset();
    filter_form_rates.reset();
    let input = document.getElementById('search_bar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('job_title');
    let y = document.getElementsByClassName('cards');
    let results = 0;

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            y[i].style.display = "none";
        } else {
            y[i].style.display = "flex";
            results += 1;
            
        }
    }
    // console.log(results);
    jobslength.innerHTML = results;

}

// FILTER
function filter_job() {
    //RESET SEARCH FIRST
    document.getElementById('search_bar').value = '';
    // filter w radio: 
    // get selected radios from each criteria
    // if val==null, select any

    let results = 0;
    console.log("filtering");
    var cat = '';
    var rate = '';
    var app = '';
    var categories = document.getElementsByName("category");
    var sel_cat = Array.from(categories).find(category => category.checked);
    var rates = document.getElementsByName("rates");
    var sel_rate = Array.from(rates).find(rate => rate.checked);

    if (sel_cat!=null){
        // console.log(sel_cat.value);
        cat = sel_cat.value;
    }
    if (sel_rate!=null){
        // console.log(sel_rate.value);
        rate = parseFloat(sel_rate.value);
    }
    
    console.log([cat, rate]);
    // cattag, ratetag

    let cattag = document.getElementsByClassName('cattag'); //[]
    let ratetag = document.getElementsByClassName('ratetag'); //[]
    let cards = document.getElementsByClassName('cards'); //[]
    // let results = 0;
    if(cat.length!=0 && rate.length!=0){
        // console.log("if");
        for (i = 0; i < cattag.length; i++) {
            if (cattag[i].innerHTML==cat && parseFloat(ratetag[i].innerHTML)<=(rate*2) && parseFloat(ratetag[i].innerHTML)>=(rate*2-2)) {
                cards[i].style.display = "flex";
                results += 1;
            } else {
                cards[i].style.display = "none";
            }
        }
    } else if(cat.length!=0 && rate.length==0){
        // console.log("cat");
        for (i = 0; i < cattag.length; i++) {
            if (cattag[i].innerHTML==cat) {
                cards[i].style.display = "flex";
                results += 1;
            } else {
                cards[i].style.display = "none";
            }
        }
    } else if(cat.length==0 && rate.length!=0){
        // console.log("rate");
        for (i = 0; i < cattag.length; i++) {
            if (parseFloat(ratetag[i].innerHTML)<=(rate*2) && parseFloat(ratetag[i].innerHTML)>=(rate*2-2)) {
                cards[i].style.display = "flex";
                results += 1;
            } else {
                cards[i].style.display = "none";
            }
        }
    } else {
        // console.log("else");
        for (i = 0; i < cattag.length; i++) {
            cards[i].style.display = "flex";
            results += 1;
        }
    }

    // console.log(results);
    jobslength.innerHTML = results;
}

// RESET FILTER
function reset_filter() {
    // console.log("filter reset");
    filter_form_industry.reset();
    filter_form_rates.reset();
    filter_job();
}

function load_modal(jobid) {
    // alert('outside the nested db' + jobid);

    db.collection("jobs").get().then((response) => {
        let docs = response.docs;
        docs.forEach(doc => {
            if (doc.id == jobid) {
                
                // change job details
                modaltitle.innerHTML = `${doc.data().title}`;
                modalposter.innerHTML = `${doc.data().client_email}`;
                modalcategory.innerHTML = `${doc.data().category}`;
                modalrate.innerHTML = `${doc.data().payrate}`;
                modaldeadline.innerHTML = `Due ${doc.data().deadline}`;
                modaldescription.innerHTML = `${doc.data().description}`;

                // if approval==1, remove is-hidden
                // if approval==0, ensure is-hidden
                if (doc.data().approval=='1'){
                    console.log('1');
                    if (modalapproval.classList.contains("is-hidden")) {
                        modalapproval.classList.remove('is-hidden');
                    } else {
                        return;
                    }
                }
                if (doc.data().approval=='0'||doc.data().approval==null){
                    console.log('0');
                    if (modalapproval.classList.contains("is-hidden")) {
                        return;
                    } else {
                        modalapproval.classList.add('is-hidden');
                    }
                }

                // LOAD LOWER CONTENT BASED ON JOB STATUS & USERTYPE

                // load reviews
                // db.collection("reviews").get().then((response) => {
                //     let docs = response.docs;
                //     let html = '';
                //     docs.forEach(doc => {
                //         // alert(typeof(doc.data().restaurant) + " <=> "+ typeof(restaurantid));
                //         if (doc.data().restaurant === restaurantid) {
                //             // alert('hello');
                //             // console.log(doc.data().needs);
                            
                //             if (doc.data().needs == "Dairy") {
                //                 ratings_dairy.push(parseInt(doc.data().rating));
                //             }
                //             if (doc.data().needs == "Eggs") {
                //                 ratings_eggs.push(parseInt(doc.data().rating));
                //             }
                //             if (doc.data().needs == "Nuts") {
                //                 ratings_nuts.push(parseInt(doc.data().rating));
                //             }
                //             if (doc.data().needs == "Seafood") {
                //                 ratings_seafood.push(parseInt(doc.data().rating));
                //             }
                //             if (doc.data().needs == "Halal") {
                //                 ratings_halal.push(parseInt(doc.data().rating));
                //             }
                //             if (doc.data().needs == "Kosher") {
                //                 ratings_kosher.push(parseInt(doc.data().rating));
                //             }
                //             if (doc.data().needs == "Vegan") {
                //                 // console.log("hi");
                //                 ratings_vegan.push(parseInt(doc.data().rating));
                //                 // console.log('test test test ' + ratings_vegan[0]);
                //             }
                //             if (doc.data().needs == "Vegetarian") {
                //                 ratings_vegetarian.push(parseInt(doc.data().rating));
                //             }
                //             if (doc.data().needs == "Wheelchair") {
                //                 ratings_wheelchair.push(parseInt(doc.data().rating));
                //             }
                //             if (doc.data().needs == "Service Animal") {
                //                 ratings_animal.push(parseInt(doc.data().rating));
                //             }

                //             let rating = '';
                //             for (let i = 0; i < doc.data().rating; i++) {
                //                 rating += `<i class="fas fa-star has-text-warning"></i>`;
                //             }

                //             html += `
                //             <div class="card large mb-4">
                //                 <div class="card-content">
                //                     <div class="media">
                //                         <div class="content is-left">
                //                             <h1 class="has-text-weight-bold has-text-dark is-size-5 mb-2"
                //                                 style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">${doc.data().user_email}</h1>
                //                             ${rating}
                //                             <p class="subtitle is-6 mt-1"><b>Rated for:&nbsp; </b>${doc.data().needs}</p>
                //                             <p class="subtitle is-6 mt-2">${doc.data().comments}</p>
                //                         </div>
                //                         <div class="content is-right ml-auto">
                //                             <image width="200" src="${doc.data().url}" alt="Image"/>
                //                         </div>
                //                     </div>
                //                 </div>
                //             </div>
                //             `;

                //         }
                //         //inner then

                //         // alert(average([1,2,3]));
                //         let averages = [];

                //         // alert(ratings_dairy);

                //         // console.log(ratings_vegan);

                //         averages.push(average(ratings_dairy));
                //         averages.push(average(ratings_eggs));
                //         averages.push(average(ratings_nuts));
                //         averages.push(average(ratings_seafood));
                //         averages.push(average(ratings_halal));
                //         averages.push(average(ratings_kosher));
                //         averages.push(average(ratings_vegan));
                //         averages.push(average(ratings_vegetarian));
                //         averages.push(average(ratings_wheelchair));
                //         averages.push(average(ratings_animal));

                //         // console.log(averages);
                //         for (var i = 0; i < averages.length; i++) {
                //             if (largest < averages[i]) {
                //                 largest = averages[i];
                //                 largest_index = i;
                //             }
                //         }

                //         // console.log(largest);
                //         // console.log(largest_index);

                //         // change modal stats based on reviews
                //         modal_stats.innerHTML = `
                //         <p class="subtitle is-6 my-0"><b>${needs[largest_index]}</b> ${largest.toFixed(2)}</p>
                //         `;

                //         db.collection("restaurants").doc(restaurantid).update({
                //             best: needs[largest_index],
                //             best_rating: largest.toFixed(2)
                //         })


                //     })
                //     //outside then but also outside loop

                //     if (html.length == 0) {
                //         review_data.innerHTML = `
                //         <div class="has-text-centered has-text-weight-bold has-text-grey-light my-6 signedincontent">
                //         <i class="fas fa-seedling is-size-4 mr-2"></i>
                //         <p>No reviews currently available!</p>
                //         </div>
                //         `;
                //     } else {
                //         review_data.innerHTML = html;
                //     }
                // })
            }
        })
    })
    modaljobinfo.classList.add('is-active');
}




function acceptjob(){
    // *TODO
}
