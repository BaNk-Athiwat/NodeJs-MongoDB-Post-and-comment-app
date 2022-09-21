console.log("goodfriends")

const scrolltop = document.querySelector('.scroll-top')

function siteScrolltop(){
    window.scrollTo({top: 0, behavior: 'smooth'})
}

if(!!scrolltop){
    scrolltop.addEventListener('click', siteScrolltop)
}