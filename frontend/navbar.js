class Navbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar navbar-dark bg-dark px-3 navbar-expand-lg">
            <a class="navbar-brand" href="index.html">Logo</a>
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