"use strict";

let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");
let emailSignupInput = document.getElementById("emailSignupInput");
let passwordSignupInput = document.getElementById("passwordSignupInput");
let loginButton = document.getElementById("loginButton");
let signupButton = document.getElementById("signupButton");
let signupLinkBtn = document.getElementById("signupLink");
let logoutButton = document.getElementById("logoutButton");
let requiredAlert = document.getElementById("requiredAlert");
let requiredSignupAlert = document.getElementById("requiredSignupAlert");
let existsAlert = document.getElementById("existsAlert");
let incorrectAlert = document.getElementById("incorrectAlert");
let successAlert = document.getElementById("successAlert");
let nameAlert = document.getElementById("nameAlert");
let emailAlert = document.getElementById("emailAlert");
let passwordAlert = document.getElementById("passwordAlert");
let emailSignupAlert = document.getElementById("emailSignupAlert");
let passwordSignupAlert = document.getElementById("passwordSignupAlert");
let url = location.href;
let index = url.lastIndexOf("/");
let fixed = url.substring(0, index);
let validationResult;


let registrationContainer = [];
if (localStorage.getItem("registrationInfo") != null) {
    registrationContainer = JSON.parse(localStorage.getItem("registrationInfo"));
}

if (location.href != fixed + "/home.html") {
    sessionStorage.removeItem("login");

}

switch (location.href) {
    case fixed + "/signup.html":

        $(document).ready(function () {
            $(".spinner").fadeOut(500, function () {
                $("#loading2").fadeOut(500, function () {
                    $("body").css("overflow-y", "auto");
                    $("#loading2").remove();
                });
            });
        });

        signupButton.addEventListener("click", signup);

        function signup() {
            let registration = {
                name: nameInput.value,
                email: emailSignupInput.value.toLowerCase(),
                password: passwordSignupInput.value
            }
            validation();
            if (validationResult == true && nameValidation() == true && emailSignupValidation() == true && passwordSignupValidation() == true) {
                registrationContainer.push(registration);
                localStorage.setItem("registrationInfo", JSON.stringify(registrationContainer));
                clearForm();
                requiredSignupAlert.classList.add("d-none");
                successAlert.classList.remove("d-none");

            }
            else if (validationResult == undefined) {
                if (nameInput.value == "" || emailSignupInput.value == "" || passwordSignupInput.value == "") {
                    requiredSignupAlert.classList.remove("d-none");
                    successAlert.classList.add("d-none")
                }
                else if (nameValidation() == true && emailSignupValidation() == true && passwordSignupValidation() == true) {
                    registrationContainer.push(registration);
                    localStorage.setItem("registrationInfo", JSON.stringify(registrationContainer));
                    clearForm();
                    requiredSignupAlert.classList.add("d-none");
                    successAlert.classList.remove("d-none");

                }
            }
            else {
                validation();
            }

        }

        function validation() {
            for (let i = 0; i < registrationContainer.length; i++) {
                if (registrationContainer.length > 0) {
                    if (nameInput.value == "" || emailSignupInput.value == "" || passwordSignupInput.value == "") {
                        requiredSignupAlert.classList.remove("d-none");
                        existsAlert.classList.add("d-none");
                        successAlert.classList.add("d-none")
                        validationResult = false;
                    }
                    else if (emailSignupInput.value.toLowerCase() == registrationContainer[i].email) {
                        requiredSignupAlert.classList.add("d-none");
                        existsAlert.classList.remove("d-none");
                        successAlert.classList.add("d-none")
                        validationResult = false;
                    }
                    else if (emailSignupInput.value.toLowerCase() != registrationContainer[i].email && nameValidation() == true && emailSignupValidation() == true && passwordSignupValidation() == true) {
                        requiredSignupAlert.classList.add("d-none");
                        existsAlert.classList.add("d-none");
                        successAlert.classList.remove("d-none");
                        validationResult = true;
                    }
                    else {
                        requiredSignupAlert.classList.add("d-none");
                        existsAlert.classList.add("d-none");
                        successAlert.classList.add("d-none")
                    }

                }
                else {
                    if (nameInput.value == "" || emailSignupInput.value == "" || passwordSignupInput.value == "") {
                        requiredSignupAlert.classList.remove("d-none");
                        existsAlert.classList.add("d-none");
                        successAlert.classList.add("d-none")
                        validationResult = false;
                    }
                    else if (emailSignupInput.value.toLowerCase() != registrationContainer[i].email && nameValidation() == true && emailSignupValidation() == true && passwordSignupValidation() == true) {
                        requiredSignupAlert.classList.add("d-none");
                        existsAlert.classList.add("d-none");
                        successAlert.classList.remove("d-none");
                        validationResult = true;
                    }
                    else {
                        requiredSignupAlert.classList.add("d-none");
                        existsAlert.classList.add("d-none");
                        successAlert.classList.add("d-none")
                    }
                }

            }
        }

        nameInput.addEventListener("keyup", nameValidation);
        function nameValidation() {
            let nameRjex = /^[A-Z a-z]{2,20}$/;
            if (nameRjex.test(nameInput.value) == true) {
                nameInput.classList.add("is-valid");
                nameInput.classList.remove("is-invalid");
                nameAlert.classList.add("d-none");
                return true;
            }
            else {
                nameAlert.classList.remove("d-none");
                nameInput.classList.remove("is-valid");
                nameInput.classList.add("is-invalid");
                return false;
            }
        }

        emailSignupInput.addEventListener("keyup", emailSignupValidation);
        function emailSignupValidation() {
            let emailSignupRjex = /^\S+@\w+\.{1}\w{2,5}$/;
            if (emailSignupRjex.test(emailSignupInput.value) == true) {
                emailSignupInput.classList.add("is-valid");
                emailSignupInput.classList.remove("is-invalid");
                emailSignupAlert.classList.add("d-none");
                return true;
            }
            else {
                emailSignupAlert.classList.remove("d-none");
                emailSignupInput.classList.remove("is-valid");
                emailSignupInput.classList.add("is-invalid");
                return false;
            }
        }

        passwordSignupInput.addEventListener("keyup", passwordSignupValidation);
        function passwordSignupValidation() {
            let passwordSignupRjex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            if (passwordSignupRjex.test(passwordSignupInput.value) == true) {
                passwordSignupInput.classList.add("is-valid");
                passwordSignupInput.classList.remove("is-invalid");
                passwordSignupAlert.classList.add("d-none");
                return true;
            }
            else {
                passwordSignupAlert.classList.remove("d-none");
                passwordSignupInput.classList.remove("is-valid");
                passwordSignupInput.classList.add("is-invalid");
                return false;
            }
        }
        break;

    case fixed + "/home.html":

        $(document).ready(function () {
            $(".spinner").fadeOut(500, function () {
                $("#loading3").fadeOut(500, function () {
                    $("body").css("overflow-y", "auto");
                    $("#loading3").remove();
                });
            });
        });

        if (sessionStorage.getItem("login") != "success") {
            location.href = "index.html";
        }

        logoutButton.addEventListener("click", function () {
            sessionStorage.removeItem("login");
        });

        document.querySelector("h1").innerHTML = JSON.parse(sessionStorage.getItem("name"));



        break;

    case fixed + "/index.html":

        $(document).ready(function () {
            $(".spinner").fadeOut(500, function () {
                $("#loading").fadeOut(500, function () {
                    $("body").css("overflow-y", "auto");
                    $("#loading").remove();
                });
            });
        });

        loginButton.addEventListener("click", login);

        function login() {

            if (registrationContainer.length > 0) {
                for (let i = 0; i < registrationContainer.length; i++) {
                    if (emailInput.value.toLowerCase() == registrationContainer[i].email && passwordInput.value == registrationContainer[i].password) {
                        requiredAlert.classList.add("d-none");
                        incorrectAlert.classList.add("d-none");
                        location.href = "home.html"
                        let welcome = `Welcome ${registrationContainer[i].name}`;
                        sessionStorage.setItem("login", "success");
                        sessionStorage.setItem("name", JSON.stringify(welcome));

                    }

                }
                if (emailInput.value == "" || passwordInput.value == "") {
                    requiredAlert.classList.remove("d-none");
                    incorrectAlert.classList.add("d-none");
                }
                else if (sessionStorage.getItem("login") != "success") {

                    requiredAlert.classList.add("d-none");
                    incorrectAlert.classList.remove("d-none");
                    emailInput.value = "";
                    passwordInput.value = "";
                    console.log(sessionStorage.getItem("login"))
                }

            }

            else if (emailInput.value == "" || passwordInput.value == "") {
                requiredAlert.classList.remove("d-none");
                incorrectAlert.classList.add("d-none");
            }

            else {
                incorrectAlert.classList.remove("d-none");
                requiredAlert.classList.add("d-none");
                emailInput.value = "";
                passwordInput.value = "";

            }

        }


}



function clearForm() {
    nameInput.value = "";
    emailSignupInput.value = "";
    passwordSignupInput.value = "";
    nameInput.classList.remove("is-valid");
    nameInput.classList.remove("is-invalid");
    emailSignupInput.classList.remove("is-valid");
    emailSignupInput.classList.remove("is-invalid");
    passwordSignupInput.classList.remove("is-valid");
    passwordSignupInput.classList.remove("is-invalid");
}


