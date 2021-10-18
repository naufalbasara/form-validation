const form = document.querySelector("#form");
const formControl = document.querySelectorAll(".form-control");

const valid = {
  name: true,
  username: true,
  email: true,
  state: true,
  zipcode: true,
  address: true,
};

const error = (object) => {
  object.style.border = "1px solid red";
  object.style.color = "red";
};

const solve = (object) => {
  object.style.border = "";
  object.style.color = "";
};

const validate = () => {
  let check = true;
  for (let q of formControl) {
    if (q.classList.contains("user-name")) {
      let validator = /[A-Za-z\s]+$/;
      if (!q.value.match(validator)) {
        q.placeholder = "Input alphabet only";
        error(q);
        valid["name"] = false;
      } else {
        solve(q);
        valid["name"] = true;
      }
    }
    if (q.classList.contains("user-username")) {
      if (q.value.length < 6 || q.value.length > 8) {
        q.placeholder = "Minimum characters is 6 and maximum is 8";
        error(q);
        valid["username"] = false;
      } else {
        solve(q);
        valid["username"] = true;
      }
    }
    if (q.classList.contains("user-email")) {
      let emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!q.value.match(emailValidator)) {
        q.placeholder = "Input proper email format";
        error(q);
        valid["email"] = false;
      } else {
        solve(q);
        valid["email"] = true;
      }
    }
    if (q.classList.contains("user-state")) {
      if (q.value == "Selecting") {
        error(q);
        q.style.color = "";
        valid["state"] = false;
      } else {
        solve(q);
        valid["state"] = true;
      }
    }

    if (q.classList.contains("userAddress")) {
      if (q.value == "") {
        error(q);
        q.style.color = "";
        valid["address"] = false;
      } else {
        solve(q);
        valid["address"] = true;
      }
    }

    if (q.classList.contains("userZip")) {
      let numberValidator = /^[1-9]+$/;
      if (!q.value.match(numberValidator) || q.value.length != 6) {
        q.placeholder = "Input 6 digits number only";
        error(q);
        valid["zipcode"] = false;
      } else {
        solve(q);
        valid["zipcode"] = true;
      }
    }
    if (q.value == "" || q.value == "Selecting") {
      error(q);
      check = false;
    }
  }
  for (const key in valid) {
    if (valid[key] == "false") {
      check = false;
    }
  }
  return check;
};

form.addEventListener("submit", (event) => {
  if (validate() == false) {
    event.preventDefault();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  } else {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure you want to submit the form?",
      text: "You won't be able to cancel this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Submitted!", "Form has been submitted", "success").then(() => {
          form.submit();
        });
      }
    });
  }
});
