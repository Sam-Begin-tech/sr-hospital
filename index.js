/* =========================================
   S R HOSPITAL
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const navLinks =
    document.querySelectorAll(".nav-link");


/* Check elements exist before adding events */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        menuToggle.classList.toggle("active");

    });

}


/* Close mobile menu when clicking a link */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {

            navMenu.classList.remove("active");

        }

        if (menuToggle) {

            menuToggle.classList.remove("active");

        }

    });

});


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar =
    document.getElementById("navbar");


if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });

}


/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    /* Fallback for older browsers */

    revealElements.forEach(element => {

        element.classList.add("active");

    });

}


/* =========================================
   ANIMATED COUNTERS
========================================= */

const counters =
    document.querySelectorAll(".counter");


if ("IntersectionObserver" in window) {

    const counterObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const counter =
                            entry.target;

                        const target =
                            Number(
                                counter.dataset.target
                            );

                        let current = 0;

                        const increment =
                            target / 60;


                        const updateCounter =
                            () => {

                                current += increment;


                                if (
                                    current <
                                    target
                                ) {

                                    counter.textContent =
                                        Math.ceil(
                                            current
                                        );

                                    requestAnimationFrame(
                                        updateCounter
                                    );

                                } else {

                                    counter.textContent =
                                        target;

                                }

                            };


                        updateCounter();


                        observer.unobserve(
                            counter
                        );

                    }

                });

            },

            {
                threshold: 0.7
            }

        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

} else {

    /* Fallback for older browsers */

    counters.forEach(counter => {

        counter.textContent =
            counter.dataset.target || 0;

    });

}


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById("backToTop");


if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================
   ACTIVE NAVIGATION LINK
========================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


window.addEventListener("scroll", () => {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute(
                    "id"
                );

        }

    });


    navLinks.forEach(link => {

        link.classList.remove(
            "active"
        );


        const href =
            link.getAttribute(
                "href"
            );


        if (
            href ===
            `#${currentSection}`
        ) {

            link.classList.add(
                "active"
            );

        }

    });

});


/* =========================================
   APPOINTMENT FORM
   WEB3FORMS INTEGRATION
========================================= */

const appointmentForm =
    document.getElementById(
        "appointmentForm"
    );


const formMessage =
    document.getElementById(
        "formMessage"
    );

const successModal =
    document.getElementById(
        "successModal"
    );

const successModalButton =
    document.getElementById(
        "successModalButton"
    );

let submittedEmail = "";


if (successModalButton) {

    successModalButton.addEventListener(
        "click",
        () => {

            const whatsappMessage =
                `Hello S R Hospital, I submitted an appointment request. My email is ${submittedEmail}.`;

            window.location.href =
                `https://wa.me/919150406570?text=${encodeURIComponent(whatsappMessage)}`;

        }
    );

}


if (appointmentForm) {

    appointmentForm.addEventListener(
        "submit",
        async function(event) {

            /*
             * Prevent the browser's default form submission.
             * We will submit the form using JavaScript.
             */

            event.preventDefault();


            /*
             * Prevent multiple submissions
             */

            const submitButton =
                appointmentForm.querySelector(
                    'button[type="submit"]'
                );


            if (
                submitButton &&
                submitButton.disabled
            ) {

                return;

            }


            /*
             * Show sending message
             */

            if (formMessage) {

                formMessage.textContent =
                    "Sending your appointment request...";

                formMessage.classList.remove(
                    "success",
                    "error"
                );

            }


            /*
             * Disable submit button
             */

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.dataset.originalText =
                    submitButton.innerHTML;

                submitButton.innerHTML =
                    'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

            }


            /*
             * Collect all form data
             */

            const formData =
                new FormData(
                    appointmentForm
                );


            try {

                /*
                 * Send form data to Web3Forms
                 */

                const response =
                    await fetch(
                        "https://api.web3forms.com/submit",
                        {
                            method: "POST",

                            body: formData
                        }
                    );


                /*
                 * Convert response to JSON
                 */

                const data =
                    await response.json();


                /*
                 * Check if Web3Forms submission
                 * was successful
                 */

                if (
                    data.success
                ) {

                    submittedEmail =
                        formData.get("email") || "";

                    /*
                     * Show success message
                     */

                    if (formMessage) {

                        formMessage.textContent =
                            "Thank you! Your appointment request has been received. Our team will contact you shortly.";

                        formMessage.classList.add(
                            "success"
                        );

                    }


                    /*
                     * Reset form
                     */

                    appointmentForm.reset();

                    if (successModal) {

                        successModal.hidden = false;
                        document.body.classList.add(
                            "modal-open"
                        );

                        if (successModalButton) {

                            successModalButton.focus();

                        }

                    }


                } else {

                    /*
                     * Web3Forms returned an error
                     */

                    if (formMessage) {

                        formMessage.textContent =
                            data.message ||
                            "Unable to send your appointment request. Please try again.";

                        formMessage.classList.add(
                            "error"
                        );

                    }

                }


            } catch (error) {

                /*
                 * Network or connection error
                 */

                console.error(
                    "Web3Forms Error:",
                    error
                );


                if (formMessage) {

                    formMessage.textContent =
                        "Something went wrong. Please check your internet connection and try again.";

                    formMessage.classList.add(
                        "error"
                    );

                }

            } finally {

                /*
                 * Re-enable submit button
                 */

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        submitButton.dataset.originalText ||
                        'Submit Appointment Request <i class="fa-solid fa-arrow-right"></i>';

                }


                /*
                 * Clear message after 7 seconds
                 */

                setTimeout(() => {

                    if (formMessage) {

                        formMessage.textContent =
                            "";

                        formMessage.classList.remove(
                            "success",
                            "error"
                        );

                    }

                }, 7000);

            }

        }
    );

}


/* =========================================
   CLOSE MOBILE MENU ON OUTSIDE CLICK
========================================= */

document.addEventListener(
    "click",
    (event) => {

        if (
            !navMenu ||
            !menuToggle
        ) {

            return;

        }


        const clickedInsideMenu =
            navMenu.contains(
                event.target
            );


        const clickedToggle =
            menuToggle.contains(
                event.target
            );


        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            navMenu.classList.contains(
                "active"
            )
        ) {

            navMenu.classList.remove(
                "active"
            );

            menuToggle.classList.remove(
                "active"
            );

        }

    }
);


/* =========================================
   PREVENT EMPTY SOCIAL LINKS
   (Demo behavior)
========================================= */

const socialLinks =
    document.querySelectorAll(
        ".social-links a"
    );


socialLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            if (
                link.getAttribute(
                    "href"
                ) === "#"
            ) {

                event.preventDefault();

            }

        }
    );

});


/* =========================================
   PAGE LOAD ANIMATION
========================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);  