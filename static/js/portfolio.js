
const myServicesCon = document.querySelector(".all_services");
const frontendToolsWrapper = document.querySelector("#frontend");


window.addEventListener('load', () => {
    document.querySelector('.preloader').style.display = 'none'  
})


// Function to load external HTML into a container
async function loadHeaderFooter(id, file) {
  const response = await fetch(file);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.text();
  document.getElementById(id).innerHTML = data;
}

document.addEventListener("DOMContentLoaded", async () => {

  await loadHeaderFooter("header-container", "template/header.html");
  await loadHeaderFooter("footer-container", "template/footer.html");

  const navToggler = document.querySelector(".hambugger");
  const navList = document.querySelector(".lists");
  const navTabs = document.querySelectorAll(".list__tab");
  const navTabsPar = document.querySelectorAll(".list");

  //activates the navigation bar and controls the hambugger movement
  function activateNavbar() {
    let navState = navToggler.getAttribute("aria-controls");
    if (navState === "closed") {
      navToggler.setAttribute("aria-controls", "open");
    } else {
      navToggler.setAttribute("aria-controls", "closed");
    }
    navList.classList.toggle("navActive");
  }

  //deacivates the navbar on scroll with a corresponding hambugger movement
  function removeNavbar() {
    let navState = navToggler.getAttribute("aria-controls");
    if (navState === "open") {
      navToggler.setAttribute("aria-controls", "closed");
      navList.classList.remove("navActive");
    }
  }


  //show which section is being clicked
  function showClickedNav() {
    for (let i = 0; i < navTabs.length; i++) {
      const element = navTabs[i];
      element.addEventListener("click", () => {
        for (let i = 0; i < navTabs.length; i++) {
          const element = navTabs[i];
          element.classList.remove("active");
        }
        element.classList.add("active");
      });
    }
  }

  showClickedNav();

  window.addEventListener("load", () => {
    navList.classList.remove("navActive");
  });

  navToggler.addEventListener("click", () => {
    activateNavbar();
  });

  window.addEventListener("scroll", () => {
    removeNavbar();
  });


});


// document.addEventListener("DOMContentLoaded", () => {
//   particlesJS("particles-js", {
//     particles: {
//     number: { value: 80 },
//     color: { value: "#44d624" },
//     shape: { type: "circle" },
//     opacity: { value: 0.2 },
//     size: { value: 3 },
//     line_linked: {
//         enable: true,
//         distance: 120,
//         color: "#0ff",
//         opacity: 1,
//         width: 1
//     },

//     move: { enable: true, speed: 1.5 }
//     },
//     interactivity: {
//     events: {
//         onhover: { enable: true, mode: "repulse" },
//         onclick: { enable: true, mode: "push" }
//     }
//     },
//     retina_detect: true
// });
// })



const inputs = document.querySelectorAll(".input");
inputs.forEach((input) => {
  input.addEventListener("focus", addfocus);
  input.addEventListener("blur", removefocus);
});

function addfocus() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}
function removefocus() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

//form validation for the contact form
// This code validates the contact form fields and provides feedback to the user.
// It checks for empty fields, valid email format, and minimum character requirements for the message field.
// It also handles success and error states for each field, including server errors.

const form = document.querySelector("#contact");
const fields = document.querySelectorAll(".input");

function formValidator() {
  validateOnSubmit();
  validateOnChange();
  validateOnEntry();
}
//validates form on submit
function validateOnSubmit() {
  if (!form) return; // Ensure form exists

  // Add a submit event listener to the form
  form.addEventListener("submit", (e) => {
    let formIsValid = true;
    fields.forEach((field) => {
      if (!validateFields(field)) {
        formIsValid = false;
      }
    });
    // If any field is invalid, prevent form submission
    if (!formIsValid) {
      e.preventDefault();
    } else {
      return true;
    }
  });
}
//validates form on entry
function validateOnEntry() {
  fields.forEach((field) => {
    field.addEventListener("input", () => validateFields(field));
  });
}
//validates form on change when using autocomplete
function validateOnChange() {
  fields.forEach((field) => {
    field.addEventListener("change", () => validateFields(field));
    field.addEventListener("blur", () => validateFields(field));
  });
}

//validates all the input fields
function validateFields(field) {
  if (field.name === "name") {
    if (field.value.trim() === "") {
      setStatus(field, "field cannot be blank", "error");
      return false;
    } else if (field.value.length < 3) {
      setStatus(field, "please enter your full name", "error");
      return false;
    } else {
      setStatus(field, "", "success");
    }
  }

  if (field.type === "email") {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!re.test(field.value)) {
      setStatus(field, "enter a valid email address", "error");
      return false;
    } else {
      setStatus(field, "", "success");
    }
  }

  if (field.name === "message") {
    if (field.value.trim() === "") {
      setStatusForMsg(field, "field cannot be blank", "error");
      return false;
    } else if (field.value.length < 10) {
      setStatusForMsg(field, "please write something descriptive", "error");
      return false;
    } else {
      setStatusForMsg(field, "", "success");
    }
  }

  return true;
}

//set status for the input fields
function setStatus(field, message, status) {
  const errorIcon = field.parentElement.querySelector(".fa-circle-xmark");
  const successIcon = field.parentElement.querySelector(".fa-circle-check");
  const errorMessage = field.parentElement.querySelector(".errorMessage");

  if (status === "success") {
    if (errorIcon) errorIcon.classList.remove("input-error");
    if (successIcon) successIcon.classList.add("input-success");
    if (errorMessage) {
      errorMessage.classList.remove("input-error");
      errorMessage.innerHTML = "";
    }
    field.classList.remove("input-error");
    field.classList.add("input-success");
  }
  if (status === "error") {
    if (successIcon) successIcon.classList.remove("input-success");
    if (errorIcon) errorIcon.classList.add("input-error");
    if (errorMessage) {
      errorMessage.classList.add("input-error");
      errorMessage.innerHTML = message;
    }
    field.classList.remove("input-success");
    field.classList.add("input-error");
  }
}
//set status for the message field
function setStatusForMsg(field, message, status) {
  const errorForMsg = field.parentElement.querySelector(
    ".errorMessage--message"
  );

  if (status === "success") {
    if (errorForMsg) {
      errorForMsg.classList.remove("error");
      errorForMsg.innerHTML = "";
    }
    field.classList.remove("input-error");
    field.classList.add("input-success");
  }
  if (status === "error") {
    if (errorForMsg) {
      errorForMsg.classList.add("error");
      errorForMsg.innerHTML = message;
    }
    field.classList.remove("input-success");
    field.classList.add("input-error");
  }
}
function clearField() {
  fields.forEach((field) => {
    field.value = "";
    field.classList.remove("input-success", "input-error");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  formValidator();
});

//display services

document.addEventListener("DOMContentLoaded", () => {

  function showServices() {
    let myServices = "";
    let serviceData = [
      {
        serviceIcon: '<i class="fa-solid fa-mobile"></i>',
        serviceName: "mobile friendly layout",
        servicePar: `For a seamless and productive user experience, 
                    having a mobile-responsive website is absolutely 
                    necessary. This is one area I do not shirk from`,
      },
      {
        serviceIcon: '<i class="fa-solid fa-laptop"></i>',
        serviceName: "web development",
        servicePar: `creation, development, and management of websites 
                          and online applications while implementing best practices 
                          for coding and providing clear documentation`,
      },
      {
        serviceIcon: '<i class="fa-solid fa-gears"></i>',
        serviceName: "Back-End Development",
        servicePar: `I create and maintain website and web App functionality 
                          when users request information or when website needs to relate 
                          to another part of the web architecture`,
      },
    ];

    serviceData.forEach((service) => {
      myServices += `
      <div class="service_con">
              <div class="icon_con">
                  ${service.serviceIcon}
              </div>
              <div class="ser_wrtup">
                  <h2 class="ser_wrtup-txt">${service.serviceName}</h2>
              </div>
              <div class="ser_par">
                  <p class="ser_par-wrtup">
                      ${service.servicePar} 
                  </p>
              </div>
                      
          </div>
        `;
    });
    myServicesCon.innerHTML = myServices;
  }

  if (myServicesCon) {
    showServices();
    ScrollReveal({
      reset: true,
      distance: "3rem",
      duration: 1200,
      easing: "ease-in-out",
      mobile: true,
      cleanup: true,
      viewFactor: 0.2,
    });

    ScrollReveal().reveal(".all_services .service_con", {
      delay: 150,
      origin: "bottom",
      interval: 150,
    });
  }

  const activeService = document.querySelectorAll(".service_con");
  if (activeService) {
    showActiveCard(activeService);
  }

  function borderAroundCard() {
    if (!activeService || activeService.length === 0) return;
    activeService[0].classList.add("active");
  }
  borderAroundCard();

});



function showActiveCard(cards) {
  cards.forEach((c) => {
    c.addEventListener("click", () => {
      cards.forEach((c) => {
        c.classList.remove("active");
        c.style.border = "none";
        c.style.transform = "scale(0.99)";
        c.style.transition = "ease-in .9s";
      });
      c.classList.add("active");
      c.style.border = "1px solid #0ff";
      c.style.transform = "scale(1.01)";
      c.style.transition = "ease-out .5s";
    });
  });
}

//dynamically filter tools based on category and display them on the page

function filterTools() {
  const toolsData = [
    {
      category: "frontend",
      tools: [
        {
          toolIcon:
            '<svg style="fill: rgb(227, 76, 38);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M128 96L162.9 491.8L319.5 544L477.1 491.8L512 96L128 96zM436.2 223.9L252.4 223.9L256.5 273.3L432.1 273.3L418.5 421.7L320.6 448.7L320.6 449L319.5 449L220.8 421.7L214.8 345.9L262.5 345.9L266 384L319.5 398.5L373.2 384L379.2 321.8L212.3 321.8L199.5 176.2L440.6 176.2L436.2 223.9z"/></svg>',
          toolName: "html5",
        },
        {
          toolIcon:
            '<svg style="fill: rgb(38, 77, 228);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M544 96L480 464L256.7 544L64 464L83.6 369.2L165.6 369.2L157.6 409.8L274 454.2L408.1 409.8L426.9 312.7L93.5 312.7L109.5 230.7L443.2 230.7L453.7 178L120.3 178L136.6 96L544 96z"/></svg>',
          toolName: "CSS3",
        },
        {
          toolIcon:
            '<svg style="fill: rgb(240, 219, 79);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M96 96L96 544L544 544L544 96L96 96zM339.8 445.4C339.8 489 314.2 508.9 276.9 508.9C243.2 508.9 223.7 491.5 213.7 470.4L248 449.7C254.6 461.4 260.6 471.3 275.1 471.3C288.9 471.3 297.7 465.9 297.7 444.8L297.7 301.7L339.8 301.7L339.8 445.4zM439.4 508.9C400.3 508.9 375 490.3 362.7 465.9L397 446.1C406 460.8 417.8 471.7 438.5 471.7C455.9 471.7 467.1 463 467.1 450.9C467.1 436.5 455.7 431.4 436.4 422.9L425.9 418.4C395.5 405.5 375.4 389.2 375.4 354.9C375.4 323.3 399.5 299.3 437 299.3C463.8 299.3 483 308.6 496.8 333L464 354C456.8 341.1 449 336 436.9 336C424.6 336 416.8 343.8 416.8 354C416.8 366.6 424.6 371.7 442.7 379.6L453.2 384.1C489 399.4 509.1 415.1 509.1 450.3C509.1 488.1 479.3 508.9 439.4 508.9z"/></svg>',
          toolName: "JavaScript",
        },
      ],
    },
    {
      category: "backend",
      tools: [
        {
          toolIcon:
            '<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><defs><filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#0ff" flood-opacity="1"/></filter></defs><rect width="120" height="120" rx="20" fill="#111111" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"font-family="Arial, sans-serif" font-size="60" fill="#0ff"font-weight="bold" filter="url(#glow)">dj</text></svg>',
          toolName: "Django",
        },
        {
          toolIcon:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M544 269.8C529.2 279.6 512.2 287.5 494.5 293.8C447.5 310.6 385.8 320 320 320C254.2 320 192.4 310.5 145.5 293.8C127.9 287.5 110.8 279.6 96 269.8L96 352C96 396.2 196.3 432 320 432C443.7 432 544 396.2 544 352L544 269.8zM544 192L544 144C544 99.8 443.7 64 320 64C196.3 64 96 99.8 96 144L96 192C96 236.2 196.3 272 320 272C443.7 272 544 236.2 544 192zM494.5 453.8C447.6 470.5 385.9 480 320 480C254.1 480 192.4 470.5 145.5 453.8C127.9 447.5 110.8 439.6 96 429.8L96 496C96 540.2 196.3 576 320 576C443.7 576 544 540.2 544 496L544 429.8C529.2 439.6 512.2 447.5 494.5 453.8z"/></svg>',
          toolName: "database",
        },
        {
          toolIcon:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M535.8 264.5C528.1 233.6 513.5 210.3 482.4 210.3L442.3 210.3L442.3 257.7C442.3 294.5 411.1 325.5 375.5 325.5L268.7 325.5C239.5 325.5 215.3 350.5 215.3 379.8L215.3 481.6C215.3 510.6 240.5 527.6 268.7 535.9C302.5 545.8 335 547.6 375.5 535.9C402.4 528.1 428.9 512.4 428.9 481.6L428.9 440.9L322.2 440.9L322.2 427.3L482.4 427.3C513.5 427.3 525 405.6 535.8 373.1C547 339.6 546.5 307.4 535.8 264.5zM382.2 508.7C374.6 509.2 367.3 505.5 363.3 499C359.4 492.4 359.4 484.3 363.3 477.7C367.3 471.2 374.6 467.5 382.2 468C389.8 467.5 397.1 471.2 401.1 477.7C405 484.3 405 492.4 401.1 499C397.1 505.5 389.8 509.2 382.2 508.7zM263.8 312.1L370.6 312.1C400.3 312.1 424 287.6 424 257.8L424 155.9C424 126.9 399.6 105.2 370.6 100.3C334.8 94.4 295.9 94.7 263.8 100.4C218.6 108.4 210.4 125.1 210.4 156L210.4 196.7L317.3 196.7L317.3 210.3L170.3 210.3C139.2 210.3 112 229 103.5 264.5C93.7 305.2 93.3 330.6 103.5 373.1C111.1 404.7 129.2 427.3 160.3 427.3L197 427.3L197 378.5C197 343.2 227.5 312.1 263.8 312.1zM257.2 128.7C268.5 128.7 277.6 137.8 277.6 149.1C277.6 160.4 268.5 169.5 257.2 169.5C245.9 169.5 236.8 160.4 236.8 149.1C236.8 137.8 245.9 128.7 257.2 128.7z"/></svg>',
          toolName: "python",
        },
      ],
    },
    {
      category: "all",
      tools: [
        {
          toolIcon:
            '<svg style="fill: rgb(227, 76, 38);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M128 96L162.9 491.8L319.5 544L477.1 491.8L512 96L128 96zM436.2 223.9L252.4 223.9L256.5 273.3L432.1 273.3L418.5 421.7L320.6 448.7L320.6 449L319.5 449L220.8 421.7L214.8 345.9L262.5 345.9L266 384L319.5 398.5L373.2 384L379.2 321.8L212.3 321.8L199.5 176.2L440.6 176.2L436.2 223.9z"/></svg>',
          toolName: "html5",
        },
        {
          toolIcon:
            '<svg style="fill: rgb(38, 77, 228);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M544 96L480 464L256.7 544L64 464L83.6 369.2L165.6 369.2L157.6 409.8L274 454.2L408.1 409.8L426.9 312.7L93.5 312.7L109.5 230.7L443.2 230.7L453.7 178L120.3 178L136.6 96L544 96z"/></svg>',
          toolName: "CSS3",
        },
        {
          toolIcon:
            '<svg style="fill: rgb(240, 219, 79);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M96 96L96 544L544 544L544 96L96 96zM339.8 445.4C339.8 489 314.2 508.9 276.9 508.9C243.2 508.9 223.7 491.5 213.7 470.4L248 449.7C254.6 461.4 260.6 471.3 275.1 471.3C288.9 471.3 297.7 465.9 297.7 444.8L297.7 301.7L339.8 301.7L339.8 445.4zM439.4 508.9C400.3 508.9 375 490.3 362.7 465.9L397 446.1C406 460.8 417.8 471.7 438.5 471.7C455.9 471.7 467.1 463 467.1 450.9C467.1 436.5 455.7 431.4 436.4 422.9L425.9 418.4C395.5 405.5 375.4 389.2 375.4 354.9C375.4 323.3 399.5 299.3 437 299.3C463.8 299.3 483 308.6 496.8 333L464 354C456.8 341.1 449 336 436.9 336C424.6 336 416.8 343.8 416.8 354C416.8 366.6 424.6 371.7 442.7 379.6L453.2 384.1C489 399.4 509.1 415.1 509.1 450.3C509.1 488.1 479.3 508.9 439.4 508.9z"/></svg>',
          toolName: "JavaScript",
        },
        {
          toolIcon:
            '<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><defs><filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#0ff" flood-opacity="1"/></filter></defs><rect width="120" height="120" rx="20" fill="#111111" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"font-family="Arial, sans-serif" font-size="60" fill="#0ff"font-weight="bold" filter="url(#glow)">dj</text></svg>',
          toolName: "Django",
        },
        {
          toolIcon: `<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="VS Code icon on dark card">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#0C1117"/>
      <stop offset="100%" stop-color="#090D12"/>
    </radialGradient>

    <!-- outer neon-ish glow for the rounded square -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
      <feColorMatrix in="blur" type="matrix"
        values="0 0 0 0 0.12
                0 0 0 0 0.61
                0 0 0 0 0.94
                0 0 0 0.85 0"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- soft drop shadow for the logo -->
    <filter id="logoShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" flood-color="#000" flood-opacity="0.55"/>
    </filter>
  </defs>

  <!-- background -->
  <rect width="256" height="256" fill="url(#bg)"/>

  <!-- glowing rounded square frame -->
  <rect x="28" y="28" width="200" height="200" rx="36" fill="none" stroke="#1F9CF0" stroke-width="2.5" filter="url(#glow)"/>
  <rect x="28" y="28" width="200" height="200" rx="36" fill="none" stroke="#1F9CF0" stroke-opacity="0.95" stroke-width="1.5"/>

  <!-- VS Code mark (scaled to fit), with a subtle shadow -->
  <g transform="translate(48 48) scale(5)" filter="url(#logoShadow)" shape-rendering="geometricPrecision">
    <path d="M29.01,5.03,23.244,2.254a1.742,1.742,0,0,0-1.989.338L2.38,19.8A1.166,1.166,0,0,0,2.3,21.447c.025.027.05.053.077.077l1.541,1.4a1.165,1.165,0,0,0,1.489.066L28.142,5.75A1.158,1.158,0,0,1,30,6.672V6.605A1.748,1.748,0,0,0,29.01,5.03Z" fill="#0065A9"/>
    <path d="M29.01,26.97l-5.766,2.777a1.745,1.745,0,0,1-1.989-.338L2.38,12.2A1.166,1.166,0,0,1,2.3,10.553c.025-.027.05-.053.077-.077l1.541-1.4A1.165,1.165,0,0,1,5.41,9.01L28.142,26.25A1.158,1.158,0,0,0,30,25.328V25.4A1.749,1.749,0,0,1,29.01,26.97Z" fill="#007ACC"/>
    <path d="M23.244,29.747a1.745,1.745,0,0,1-1.989-.338A1.025,1.025,0,0,0,23,28.684V3.316a1.024,1.024,0,0,0-1.749-.724,1.744,1.744,0,0,1,1.989-.339l5.765,2.772A1.748,1.748,0,0,1,30,6.6V25.4a1.748,1.748,0,0,1-.991,1.576Z" fill="#1F9CF0"/>
  </g>
</svg>
`,
          toolName: "vs code",
        },
        {
          toolIcon:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M535.8 264.5C528.1 233.6 513.5 210.3 482.4 210.3L442.3 210.3L442.3 257.7C442.3 294.5 411.1 325.5 375.5 325.5L268.7 325.5C239.5 325.5 215.3 350.5 215.3 379.8L215.3 481.6C215.3 510.6 240.5 527.6 268.7 535.9C302.5 545.8 335 547.6 375.5 535.9C402.4 528.1 428.9 512.4 428.9 481.6L428.9 440.9L322.2 440.9L322.2 427.3L482.4 427.3C513.5 427.3 525 405.6 535.8 373.1C547 339.6 546.5 307.4 535.8 264.5zM382.2 508.7C374.6 509.2 367.3 505.5 363.3 499C359.4 492.4 359.4 484.3 363.3 477.7C367.3 471.2 374.6 467.5 382.2 468C389.8 467.5 397.1 471.2 401.1 477.7C405 484.3 405 492.4 401.1 499C397.1 505.5 389.8 509.2 382.2 508.7zM263.8 312.1L370.6 312.1C400.3 312.1 424 287.6 424 257.8L424 155.9C424 126.9 399.6 105.2 370.6 100.3C334.8 94.4 295.9 94.7 263.8 100.4C218.6 108.4 210.4 125.1 210.4 156L210.4 196.7L317.3 196.7L317.3 210.3L170.3 210.3C139.2 210.3 112 229 103.5 264.5C93.7 305.2 93.3 330.6 103.5 373.1C111.1 404.7 129.2 427.3 160.3 427.3L197 427.3L197 378.5C197 343.2 227.5 312.1 263.8 312.1zM257.2 128.7C268.5 128.7 277.6 137.8 277.6 149.1C277.6 160.4 268.5 169.5 257.2 169.5C245.9 169.5 236.8 160.4 236.8 149.1C236.8 137.8 245.9 128.7 257.2 128.7z"/></svg>',
          toolName: "python",
        },
        {
          toolIcon: `<svg width="256" height="256" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Python logo on dark card">
  <defs>
    <!-- Dark background -->
    <radialGradient id="bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#0C1117"/>
      <stop offset="100%" stop-color="#090D12"/>
    </radialGradient>

    <!-- Glow filter -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
      <feColorMatrix in="blur" type="matrix"
        values="0 0 0 0 0.12
                0 0 0 0 0.61
                0 0 0 0 0.94
                0 0 0 0.85 0"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Drop shadow for the logo -->
    <filter id="logoShadow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" flood-color="#000" flood-opacity="0.55"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="256" height="256" fill="url(#bg)"/>

  <!-- Rounded glowing border -->
  <rect x="28" y="28" width="200" height="200" rx="36" fill="none" stroke="#FFD43B" stroke-width="2.5" filter="url(#glow)"/>
  <rect x="28" y="28" width="200" height="200" rx="36" fill="none" stroke="#FFD43B" stroke-opacity="0.95" stroke-width="1.5"/>

  <!-- Python logo -->
  <g transform="translate(48 48) scale(4)" filter="url(#logoShadow)" shape-rendering="geometricPrecision">
    <path fill="#3776AB" d="M12.3 0c-1.8 0-3.2.2-4.3.5-3.8 1.1-4.5 3.4-4.5 7.7v5.6h9v1.9H3.5c-4 0-7.5 2.4-8.6 6.9-1.3 5.4-1.4 8.8 0 14.5C-4 41.4-1 44 2.5 44h3.7v-6.5c0-4.3 3.7-8.1 8.3-8.1h9.2c3.6 0 6.5-3 6.5-6.6V8.2c0-3.5-3-6.1-6.5-7.2C21.2.3 19 0 16.5 0h-4.2zM9.8 5.5c1.4 0 2.5 1.2 2.5 2.7 0 1.5-1.1 2.7-2.5 2.7a2.7 2.7 0 0 1 0-5.4z"/>
    <path fill="#FFD43B" d="M35.7 13.7v6.4c0 4.5-3.8 8.3-8.3 8.3H18.1c-3.6 0-6.5 3-6.5 6.6v14.6c0 3.5 3 5.7 6.5 6.8 4.1 1.2 8.1 1.4 12.6 0 3.2-1 6.5-3 6.5-6.8v-5.6h-9v-1.9h13.6c4 0 5.5-2.7 6.5-6.9 1.4-5.5 1.3-8.9 0-14.5-1-4.3-2.5-6.8-6.5-6.8h-3.6zm-5.6 27.5c1.4 0 2.5 1.2 2.5 2.7 0 1.5-1.1 2.7-2.5 2.7a2.7 2.7 0 0 1 0-5.4z"/>
  </g>
</svg>
`,
          toolName: "python",
        },
        {
          toolIcon:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M544 269.8C529.2 279.6 512.2 287.5 494.5 293.8C447.5 310.6 385.8 320 320 320C254.2 320 192.4 310.5 145.5 293.8C127.9 287.5 110.8 279.6 96 269.8L96 352C96 396.2 196.3 432 320 432C443.7 432 544 396.2 544 352L544 269.8zM544 192L544 144C544 99.8 443.7 64 320 64C196.3 64 96 99.8 96 144L96 192C96 236.2 196.3 272 320 272C443.7 272 544 236.2 544 192zM494.5 453.8C447.6 470.5 385.9 480 320 480C254.1 480 192.4 470.5 145.5 453.8C127.9 447.5 110.8 439.6 96 429.8L96 496C96 540.2 196.3 576 320 576C443.7 576 544 540.2 544 496L544 429.8C529.2 439.6 512.2 447.5 494.5 453.8z"/></svg>',
          toolName: "database",
        },
      ],
    },
  ];

  const toolsTabsData = [
    {
      category: "all",
      buttonText: "All",
    },
    {
      category: "frontend",
      buttonText: "Frontend",
    },
    {
      category: "backend",
      buttonText: "Backend",
    },
  ];

  // Default category
  let activeCategory = "all";

  const renderToolsGrid = () => {
    const gridContainer = document.getElementById("tools_wrapper");

    // Ensure gridContainer exists
    if (!gridContainer) return;

    // Clear previous content
    gridContainer.innerHTML = "";
    const filteredTools = toolsData.filter((tool) => tool.category === activeCategory)[0]?.tools || [];

    if (!filteredTools) {
      console.error(`No tools found for category: ${activeCategory}`);
      return;
    }
    filteredTools.forEach((tools) => {
      const card = document.createElement("div");
      card.className = "tools_card";
      card.innerHTML = `
        <div class="svg_con">
          ${tools.toolIcon}
        </div>
        <h2>${tools.toolName}</h2>
      `;
      gridContainer.appendChild(card);
    });

    const toolCard = Array.from(gridContainer.children);
    showActiveCard(toolCard);

    ScrollReveal({
      reset: true,
      distance: "3rem",
      duration: 1200,
      easing: "ease-in",
      mobile: true,
      cleanup: true,
      viewFactor: 0.2,
    });

    ScrollReveal().reveal(".tools_card", {
      delay: 100,
      origin: "bottom",
      interval: 150,
    });
  };

  const setUpToolTabs = () => {
    const toolTabsContainer = document.getElementById("tools_nav");
    if (!toolTabsContainer) return;

    toolsTabsData.forEach((tab) => {
      const tabButton = document.createElement("button");
      tabButton.className = "tools_btn";
      tabButton.dataset.tab = `${tab.category}`;
      tabButton.textContent = `${tab.buttonText}`;
      tabButton.dataset.tab === tab.category;
      if (tab.category === activeCategory) {
        tabButton.classList.add("active");
      }
      tabButton.addEventListener("click", () => {
        activeCategory = tab.category;
        document
          .querySelectorAll(".tools_btn")
          .forEach((btn) => btn.classList.remove("active"));
        tabButton.classList.add("active");
        renderToolsGrid();
      });

      toolTabsContainer.appendChild(tabButton);
    });
  };
  setUpToolTabs();
  renderToolsGrid();
}

document.addEventListener("DOMContentLoaded", () => {
  filterTools();
});

const showProjects = () => {
  const projectCon = document.querySelector(".portfolio__con");
  if (!projectCon) return;
  let Project = "";
  const projectsData = [
    {
      title: "Project 1",
      image: "static/images/brills-avatar.png",
      description: "Description for Project 1",
      technologies: [
        { technology: "HTML" },
        { technology: "CSS" },
        { technology: "JavaScript" },
      ],
      link: "https://example.com/project1",
    },
    {
      title: "Project 2",
      image: "static/images/brills-avatar.png",
      description: "Description for Project 2",
      technologies: [
        { technology: "Python" },
        { technology: "Django" },
        
      ],
      link: "https://example.com/project2",
    },
    // Add more projects as needed
  ];
  // Loop through your projects data and create HTML for each project
  projectsData.forEach((project) => {

    let technology = "";
    project.technologies.forEach((tech) => {
      technology += `
        <div class="tool">${tech.technology}</div>
      `;
    });
    Project += `
      <div class="portfolio">
                <div class="port-image__con">
                    <img class="port__image" src=${project.image} alt=${project.title}>
                </div>
                <h3 class="portfolio__name">${project.title}</h3>
                <article class="portfolio__des">
                    <p class="port__par">
                        ${project.description}
                    </p>
                </article>
                <div class="tool__con">
                    ${technology}
                </div>

                <div class="view__link">
                    <a class="btn__view" href=${project.link}><i class="fa-solid fa-bullseye"></i>Go live</a>
                </div>
            </div>
    `;
  });

  projectCon.innerHTML = Project;
  const eachProject = Array.from(projectCon.children);
  eachProject[0].classList.add("active");
  showActiveCard(eachProject);

    ScrollReveal({
      reset: true,
      distance: "3rem",
      duration: 1200,
      easing: "ease-in",
      mobile: true,
      cleanup: true,
      viewFactor: 0.2,
    });

    ScrollReveal().reveal(".portfolio", {
      delay: 100,
      // origin: "center",
      interval: 150,
      scale: 0.8,
      opacity: 0,
    });
  projectCon.scrollIntoView({ behavior: "smooth" });
};
showProjects();


