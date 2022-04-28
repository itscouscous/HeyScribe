//Declaring ALL of our elements
    //Page Declarations
    let mainpage = document.querySelector("#main-page"); //this is our "home page"
    let signup = document.querySelector("#sign-up");
    let aboutus = document.querySelector("#about-us");
    let myaccountclient = document.querySelector("#client-my-account");
    let myaccountscribe = document.querySelector("#scribe-my-account");
    let searchpage = document.querySelector("#discover");
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
    //Signup
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let btnsignupsubmit = document.querySelector("#btn-sign-up-submit");
    let linkogin = document.querySelector("#link-log-in");
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
    //Function for navigating pages (I'm so proud of this even though the logic is super simple)
    all_pages = [mainpage, signup, aboutus, myaccountclient, myaccountscribe, searchpage]

    function navigate(button, destination) {
        button.addEventListener('click', () => {
            all_pages.forEach(i => {
                if (i.classList.contains("is-hidden")) {
                    return
                }
                else {
                    i.classList.add('is-hidden');
                }
            });
            destination.classList.remove("is-hidden");
        });
    }

    //Click Logo
    navigate(logo, mainpage)

    //Click "Find Work"
    navigate(linkwork, searchpage)

    //Click "About Us"
    navigate(linkaboutus, aboutus)

    //Click "Log In" We still need login page
    //navigate(btnlogin, mainpage)

    //Click "Sign Up"
    navigate(btnsignup, signup)


        