document.addEventListener("DOMContentLoaded", function () {
 
    var homeLink = document.querySelector(".home-link");
    var comicBookLink = document.querySelector(".comicbook-link");
    var cinematicPoliticsLink = document.querySelector(".cinematicpolitics-link");

    applyHoverEffect(homeLink);
    applyHoverEffect(comicBookLink);
    applyHoverEffect(cinematicPoliticsLink);
});

function applyHoverEffect(link) {
    link.addEventListener("mouseover", function () {
        link.style.color = "blue";
    });

    link.addEventListener("mouseout", function () {
        link.style.color = "white";
    });
}
