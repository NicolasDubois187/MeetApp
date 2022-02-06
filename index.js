const buttons = document.querySelectorAll("button");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
let meetData = [];

async function fetchMeet() {
    await fetch("https://randomuser.me/api/?results=48")
    .then((res) => res.json())
    .then((data) => (meetData = data.results));
    
    console.log(meetData);   
    meetDisplay();
}
function dateFormater(date) {
    return new Date(date).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function meetDisplay(sort) {
    
    meetContainer.innerHTML = meetData
    // .filter((country) => country.population > 60000000)
    // .sort((a, b) => b.population - a.population)
    // .slice(0, 10)
    .filter((member) => {
        if (male.checked && female.checked) {
            return member;
        } else if (male.checked) {
            return member.gender === "male";
        } else if (female.checked) {
            return member.gender === "female";
        }
    })
    .sort((a, b) => {
        if (sort === "croissant") {
            return a.dob.age - b.dob.age;
        } else if (sort === "décroissant") {
            return b.dob.age - a.dob.age;
        }
    })
    .map(
        (member) =>
        `
        <div class="card" style="background: ${member.gender === "male" ? "rgb(64, 192, 224)" : "pink"}">
        <img src=${member.picture.large} alt="photo ${member.picture.large}"></img>
        <h2>${member.name.first} ${member.name.last}</h2>
        <p>${member.location.city},  ${dateFormater(member.dob.date)}</p>
        <em>Membre depuis : ${Math.ceil(
            (new Date() - new Date(member.registered.date)) / (1000 * 3600 * 24)
        )} jours</em>

        </div>
        `
    )
    .join("");
        
}
    
window.addEventListener("load", fetchMeet);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        meetDisplay(e.target.id);

    });
});

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("input", meetDisplay);
})


