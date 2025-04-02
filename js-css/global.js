// theme

    function setTheme(theme) {
        document.documentElement.classList.remove("lightTheme", "darkTheme");
        if (theme) {
            document.documentElement.classList.add(theme);
        }

        localStorage.setItem("theme", theme);
    }

    document.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem("theme") || "";
        if (savedTheme) {
            document.documentElement.classList.add(savedTheme);
        }
    });

console.log("Hello.");
