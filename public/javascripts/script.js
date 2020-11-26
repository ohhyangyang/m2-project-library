const categoriesLinks = document.querySelectorAll('.card-title');
console.log("categoriesLinks",categoriesLinks);

categoriesLinks.forEach((link)=>{
    link.addEventListener("click",(event)=>{
        // event.preventDefault();
        // link.classList.add("selected-category");
    })
})

//Changing input of file in the Add Book jsx
document.querySelector(".custom-file-input").addEventListener("change", function(change){
    let nameOfFile = document.getElementById("customFile").files[0].name;
    let nextSibling = change.target.nextElementSibling;
    nextSibling.innerHTML = nameOfFile
})