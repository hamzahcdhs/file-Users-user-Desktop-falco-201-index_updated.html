/* =====================================================
   FALCO AIR CONDITIONING
   MAIN JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. MOBILE MENU
       ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", function (event) {

            event.stopPropagation();

            mobileMenu.classList.toggle("active");

            if (mobileMenu.classList.contains("active")) {
                menuBtn.textContent = "✕";
            } else {
                menuBtn.textContent = "☰";
            }

        });

        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mobileMenu.classList.remove("active");
                menuBtn.textContent = "☰";

            });

        });

    }


    /* =====================================================
       2. CLOSE MOBILE MENU
       ===================================================== */

    document.addEventListener("click", function (event) {

        if (!menuBtn || !mobileMenu) {
            return;
        }

        if (
            !mobileMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            mobileMenu.classList.remove("active");
            menuBtn.textContent = "☰";

        }

    });


    /* =====================================================
       3. PRODUCT FILTERS
       ===================================================== */

    const productCards =
        document.querySelectorAll(".product-card");

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn, .mini-filter"
        );

    const productsCount =
        document.getElementById("productsCount");


    let currentFilters = {
        brand: "all",
        hp: "all",
        type: "all"
    };


    function updateProducts() {

        let visibleProducts = 0;

        productCards.forEach(function (card) {

            const brand =
                card.getAttribute("data-brand");

            const hp =
                card.getAttribute("data-hp");

            const type =
                card.getAttribute("data-type");


            const brandMatch =
                currentFilters.brand === "all" ||
                brand === currentFilters.brand;

            const hpMatch =
                currentFilters.hp === "all" ||
                hp === currentFilters.hp;

            const typeMatch =
                currentFilters.type === "all" ||
                type === currentFilters.type;


            if (
                brandMatch &&
                hpMatch &&
                typeMatch
            ) {

                card.classList.remove("filter-hidden");

                visibleProducts++;

            } else {

                card.classList.add("filter-hidden");

            }

        });


        if (productsCount) {

            productsCount.textContent =
                visibleProducts;

        }

    }


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const group =
                button.getAttribute(
                    "data-filter-group"
                );

            const value =
                button.getAttribute(
                    "data-filter"
                );


            if (!group) {
                return;
            }


            currentFilters[group] =
                value || "all";


            filterButtons.forEach(function (btn) {

                if (
                    btn.getAttribute(
                        "data-filter-group"
                    ) === group
                ) {

                    btn.classList.remove("active");

                }

            });


            button.classList.add("active");

            updateProducts();

        });

    });


    updateProducts();


    /* =====================================================
       4. BACK TO TOP
       ===================================================== */

    const backToTop =
        document.getElementById("backToTop");


    function checkBackToTop() {

        if (!backToTop) {
            return;
        }


        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        checkBackToTop
    );


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       5. SMOOTH SCROLL
       ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });


    /* =====================================================
       6. QUOTE MODAL
       ===================================================== */

    const quoteModal =
        document.getElementById(
            "quoteModal"
        );

    const selectedProduct =
        document.getElementById(
            "selectedProduct"
        );

    const modalName =
        document.getElementById(
            "modalName"
        );

    const modalPhone =
        document.getElementById(
            "modalPhone"
        );


    window.openQuote =
        function (productName) {

            if (!quoteModal) {
                return;
            }


            if (selectedProduct) {

                selectedProduct.textContent =
                    productName || "المنتج";

            }


            if (modalName) {
                modalName.value = "";
            }


            if (modalPhone) {
                modalPhone.value = "";
            }


            quoteModal.classList.add(
                "active"
            );


            document.body.classList.add(
                "modal-open"
            );


            setTimeout(
                function () {

                    if (modalName) {
                        modalName.focus();
                    }

                },
                200
            );

        };


    window.closeQuote =
        function () {

            if (!quoteModal) {
                return;
            }


            quoteModal.classList.remove(
                "active"
            );


            document.body.classList.remove(
                "modal-open"
            );

        };


    /* =====================================================
       7. CLOSE MODAL
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                window.closeQuote();

            }

        }
    );


    if (quoteModal) {

        quoteModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    quoteModal
                ) {

                    window.closeQuote();

                }

            }
        );

    }


    /* =====================================================
       8. SEND PRODUCT REQUEST
       ===================================================== */

    window.sendProductRequest =
        function () {

            if (
                !modalName ||
                !modalPhone ||
                !selectedProduct
            ) {

                return;

            }


            const name =
                modalName.value.trim();


            const phone =
                modalPhone.value.trim();


            const product =
                selectedProduct.textContent.trim();


            if (!name) {

                alert(
                    "من فضلك اكتب اسمك."
                );

                modalName.focus();

                return;

            }


            if (!phone) {

                alert(
                    "من فضلك اكتب رقم الهاتف."
                );

                modalPhone.focus();

                return;

            }


            if (phone.length < 10) {

                alert(
                    "من فضلك اكتب رقم هاتف صحيح."
                );

                modalPhone.focus();

                return;

            }


            const whatsappNumber =
                "201029133633";


            const message =
`مرحبًا فالكو للتبريد والتكييف

أرغب في الاستفسار عن:

${product}

الاسم:
${name}

رقم الهاتف:
${phone}

برجاء التواصل معي لمعرفة السعر والتفاصيل.`;


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(
                    message
                );


            window.open(
                whatsappURL,
                "_blank"
            );


            window.closeQuote();

        };


    /* =====================================================
       9. MAIN QUOTE FORM
       ===================================================== */

    const quoteForm =
        document.getElementById(
            "quoteForm"
        );


    if (quoteForm) {

        quoteForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const nameElement =
                    document.getElementById(
                        "customerName"
                    );


                const phoneElement =
                    document.getElementById(
                        "customerPhone"
                    );


                const customerTypeElement =
                    document.getElementById(
                        "customerType"
                    );


                const horsePowerElement =
                    document.getElementById(
                        "horsePower"
                    );


                const serviceElement =
                    document.getElementById(
                        "serviceType"
                    );


                const messageElement =
                    document.getElementById(
                        "customerMessage"
                    );


                const name =
                    nameElement
                        ? nameElement.value.trim()
                        : "";


                const phone =
                    phoneElement
                        ? phoneElement.value.trim()
                        : "";


                const customerType =
                    customerTypeElement
                        ? customerTypeElement.value
                        : "";


                const horsePower =
                    horsePowerElement
                        ? horsePowerElement.value
                        : "";


                const service =
                    serviceElement
                        ? serviceElement.value
                        : "";


                const customerMessage =
                    messageElement
                        ? messageElement.value.trim()
                        : "";


                if (!name) {

                    alert(
                        "من فضلك اكتب اسم العميل."
                    );

                    return;

                }


                if (!phone) {

                    alert(
                        "من فضلك اكتب رقم الهاتف."
                    );

                    return;

                }


                if (phone.length < 10) {

                    alert(
                        "من فضلك اكتب رقم هاتف صحيح."
                    );

                    return;

                }


                const whatsappNumber =
                    "201029133633";


                const whatsappMessage =
`مرحبًا فالكو للتبريد والتكييف

طلب عرض سعر جديد

الاسم:
${name}

رقم الهاتف:
${phone}

نوع العميل:
${customerType || "لم يتم تحديده"}

القدرة المطلوبة:
${horsePower || "لم يتم تحديدها"}

الخدمة:
${service || "لم يتم تحديدها"}

ملاحظات:
${customerMessage || "لا توجد ملاحظات"}

برجاء التواصل معي.`;


                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(
                        whatsappMessage
                    );


                window.open(
                    whatsappURL,
                    "_blank"
                );


                quoteForm.reset();

            }
        );

    }


    /* =====================================================
       10. PHONE INPUT
       ===================================================== */

    const phoneInputs =
        document.querySelectorAll(
            'input[type="tel"]'
        );


    phoneInputs.forEach(
        function (input) {

            input.addEventListener(
                "input",
                function () {

                    this.value =
                        this.value.replace(
                            /[^0-9+]/g,
                            ""
                        );

                }
            );

        }
    );


    /* =====================================================
       11. WHATSAPP BUTTON
       ===================================================== */

    window.openWhatsApp =
        function (message) {

            const number =
                "201029133633";


            const finalMessage =
                message ||
                "مرحبًا فالكو للتبريد والتكييف، أرغب في الاستفسار عن خدماتكم.";


            const url =
                "https://wa.me/" +
                number +
                "?text=" +
                encodeURIComponent(
                    finalMessage
                );


            window.open(
                url,
                "_blank"
            );

        };


    /* =====================================================
       12. CALL FALCO
       ===================================================== */

    window.callFalco =
        function () {

            window.location.href =
                "tel:+201029133633";

        };


    /* =====================================================
       13. SERVICE REQUEST
       ===================================================== */

    window.requestService =
        function (serviceName) {

            const message =
`مرحبًا فالكو للتبريد والتكييف

أرغب في طلب الخدمة التالية:

${serviceName}

برجاء التواصل معي لمعرفة التفاصيل.`;


            window.openWhatsApp(
                message
            );

        };


    /* =====================================================
       14. COPY PHONE
       ===================================================== */

    window.copyPhone =
        function (phoneNumber) {

            if (
                navigator.clipboard &&
                navigator.clipboard.writeText
            ) {

                navigator.clipboard
                    .writeText(phoneNumber)
                    .then(
                        function () {

                            alert(
                                "تم نسخ رقم الهاتف."
                            );

                        }
                    )
                    .catch(
                        function () {

                            alert(
                                "رقم الهاتف: " +
                                phoneNumber
                            );

                        }
                    );

            } else {

                alert(
                    "رقم الهاتف: " +
                    phoneNumber
                );

            }

        };


    /* =====================================================
       15. CURRENT YEAR
       ===================================================== */

    const currentYear =
        new Date().getFullYear();


    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    currentYear;

            }
        );


    /* =====================================================
       16. REVEAL ANIMATION
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".service-card, " +
            ".product-card, " +
            ".why-card, " +
            ".testimonial-card, " +
            ".brand-card"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.style.opacity =
                                    "1";


                                entry.target.style.transform =
                                    "translateY(0)";


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.1
                }
            );


        revealElements.forEach(
            function (element) {

                element.style.opacity =
                    "0";


                element.style.transform =
                    "translateY(25px)";


                element.style.transition =
                    "opacity 0.6s ease, transform 0.6s ease";


                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.style.opacity =
                    "1";

            }
        );

    }


    /* =====================================================
       17. HEADER EFFECT
       ===================================================== */

    const header =
        document.querySelector(
            ".header"
        );


    function updateHeader() {

        if (!header) {
            return;
        }


        if (window.scrollY > 30) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader
    );


    updateHeader();


    /* =====================================================
       18. PRODUCT HOVER
       ===================================================== */

    productCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.classList.add(
                        "hovered"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.classList.remove(
                        "hovered"
                    );

                }
            );

        }
    );


    /* =====================================================
       19. EMPTY LINKS
       ===================================================== */

    document
        .querySelectorAll(
            'a[href="#"]'
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                    }
                );

            }
        );


    /* =====================================================
       20. ONLINE / OFFLINE
       ===================================================== */

    window.addEventListener(
        "online",
        function () {

            console.log(
                "Falco website: Online"
            );

        }
    );


    window.addEventListener(
        "offline",
        function () {

            console.log(
                "Falco website: Offline"
            );

        }
    );


    /* =====================================================
       21. FINAL
       ===================================================== */

    console.log(
        "%c FALCO AIR CONDITIONING ",
        "background:#0066cc;color:white;padding:8px;font-weight:bold;"
    );


    console.log(
        "Falco website initialized successfully."
    );

});