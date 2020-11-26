const categoriesLinks = document.querySelectorAll('.card-title');
console.log("categoriesLinks",categoriesLinks);

categoriesLinks.forEach((link)=>{
    link.addEventListener("click",(event)=>{
        // event.preventDefault();
        // link.classList.add("selected-category");
    })
})