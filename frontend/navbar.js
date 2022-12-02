class Navbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar navbar-dark bg-dark px-3 navbar-expand-lg">
            <a class="navbar-brand" href="home.html">The Reel</a>
            <input type='text' class='w-75' id='search-input'>
            <ul class="navbar-nav ms-auto">
                 <li class="nav-item" id="nav-watchlist">
                    <a href="watchlist.html" class="nav-link">Watchlist</a>
                </li>
                <li class="nav-item" id="nav-login">
                    <a href="login.html" class="nav-link">Log in</a>
                </li>
                <li class="nav-item" id="nav-logout">
                    <a href="index.html" class="nav-link">Log out</a>
                </li>
            </ul>
        </nav>
        `
    }
}

customElements.define("app-navbar", Navbar);
// create a script tag in the head of the html file

const navbar = document.querySelector('head')
const script = document.createElement('script')
script.innerHTML = `
!(function () {
  let e = document.createElement("script"),
    t = document.head || document.getElementsByTagName("head")[0];
  (e.src =
    "https://cdn.jsdelivr.net/npm/rasa-webchat@1.x.x/lib/index.js"),
    // Replace 1.x.x with the version that you want
    (e.async = !0),
    (e.onload = () => {
      window.WebChat.default(
        {
          customData: { language: "en" },
          socketUrl: "https://fbf8-98-42-73-55.ngrok.io",
          // add other props here
        },
        null
      );
    }),
    t.insertBefore(e, t.firstChild);
})();
`

navbar.appendChild(script)

