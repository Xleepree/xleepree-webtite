let blogPost = false;
if (window.location.pathname.includes("/blog-posts/")) {
    blogPost = true;
}

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

// loading

    // base

        const banner = document.createElement("div");
        banner.className = "bannerContainer";

        const nav = document.createElement("div");
        nav.className = "nav";

        const footer = document.createElement("div");
        footer.className = "footer";

    // function

        function loadContent(type) {
            if (type === "page") {
                banner.innerHTML = "<img src='images/banner.png' class='banner'>"; 
                nav.innerHTML = `<a href="index.html">home</a>
                    <a href="about.html">about</a>
                    <a href="blog.html">blog</a>
                    <a href="projects.html">projects</a>`;
                footer.innerHTML = `<button onclick="setTheme('')">default</button>
                    <button onclick="setTheme('lightTheme')">light</button>
                    <button onclick="setTheme('darkTheme')">dark</button>
                    <hr>
                    <p>since nov 3, 2024 :: hosted with cloudflare</p>
                    <a href="https://github.com/Xleepree/xleepree-webtite">repository</a> <a href="mailto:xleepree.pages.mail@gmail.com">contact</a>`;
            } else if (type === "blogPost") {
                banner.innerHTML = "<img src='../images/banner.png' class='banner'>";
                nav.innerHTML = `<a href="../index.html">home</a>
                <a href="../about.html">about</a>
                <a href="../blog.html">blog</a>
                <a href="../projects.html">projects</a>`;
                footer.innerHTML = `<button onclick="setTheme('')">default</button>
                    <button onclick="setTheme('lightTheme')">light</button>
                    <button onclick="setTheme('darkTheme')">dark</button>
                    <hr>
                    <p>since nov 3, 2024 :: hosted with cloudflare</p>
                    <a href="https://github.com/Xleepree/xleepree-webtite">repository</a> <a href="mailto:xleepree.pages.mail@gmail.com">contact</a>`;
            } else {
                console.log("unusable or nonexistent parameter.");
                return;
            }

            document.body.prepend(nav);
            document.body.prepend(banner);
            document.body.append(footer);
        }
    
    if (blogPost === true) {
        document.addEventListener("DOMContentLoaded", () => {
            loadContent('blogPost');
        });
    } else {
        document.addEventListener("DOMContentLoaded", () => {
            loadContent('page');
        });
    }