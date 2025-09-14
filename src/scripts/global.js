const main = document.querySelector("main");
const screen = document.getElementById("screen");
const pageBody = document.getElementById("pageBody");
const pageBodySectionA = document.getElementById("pageBodySectionA");
const pageBodySectionB = document.querySelector(".page-body-section-B");
const screenButton = document.getElementById("screenButton");

function viewportIsPortrait() { return window.innerHeight > window.innerWidth; }

// navigation
    async function loadPage(name, isBlog) {
        if (!main) return;
        main.classList.remove('ready');
        document.getElementById("screenButton").classList.remove('ready');
        await new Promise((res) => setTimeout(res, 300));

        const res = await fetch(`/partials${isBlog}/${name}.html`);
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const section = doc.body.firstElementChild;

        if (main && section) {
            main.innerHTML = "";
            main.append(section);
        }

        requestAnimationFrame(() => {
            main.classList.add('ready');
            document.getElementById("screenButton").classList.add('ready');
        });
    }
//

// anim
    window.addEventListener("DOMContentLoaded", () => { 
        requestAnimationFrame(() => {
            main.classList.add('ready');
            document.getElementById("screenButton").classList.add('ready');
        });
    });
//

// screen
    if (viewportIsPortrait() === true ) {
        document.getElementById("screenButton").innerHTML = `>`
    }

    function screenF() {
        if (screen.classList.contains("initialized")) {
            screen.classList.remove("initialized");
        } else {
            screen.classList.add("initialized");
        }
    }
//

// theme 
    function setTheme(theme) {
        document.documentElement.classList.remove("dark");
        if (theme) { document.documentElement.classList.add(theme); }
        localStorage.setItem("theme", theme);
    }

    document.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem("theme") || "";
        if (savedTheme) { document.documentElement.classList.add(savedTheme); }
    });
//