if (localStorage.getItem('user') !== null) {
    document.getElementById('nav-watchlist').style.display = 'inline'
    document.getElementById('nav-login').style.display = 'none'
    document.getElementById('nav-logout').style.display = 'inline'
}
else {
    document.getElementById('nav-watchlist').style.display = 'none'
    document.getElementById('nav-login').style.display = 'inline'
    document.getElementById('nav-logout').style.display = 'none'
}

document.getElementById('nav-logout').onclick = () => {
    localStorage.removeItem('user')
    window.location.href = 'index.html'
}

document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        console.log('enter')
    }
})