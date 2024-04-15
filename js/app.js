const cardsContainer = document.querySelector(".cards-container");
const modalBody = document.querySelector(".modal-body");

//1. definir el evento que ocurre para llamar la Api

document.addEventListener("DOMContentLoaded", function (event) {
	getCards(event);
});

//EVENTO CLICK

async function btnMoreDetails(flight_number) {
	console.log(flight_number);
	const url = `https://api.spacexdata.com/v3/launches/${flight_number}`;
	const response = await fetch(url);
	const data = await response.json();
	// console.log(data.links.video_link);
	cleanHTML(modalBody);
	modalBody.innerHTML = `
    <div class="card">
    <iframe width="465" height="315" src="https://www.youtube.com/embed/${data.links.youtube_id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <blockquote class="blockquote">
        <h2 class="title-card "><strong>Misión: ${data.mission_name}</strong></h2>
        <p>Flight number:<span>${data.flight_number}</span></p>
        <p>Launch year:<span>${data.launch_year}</span></p>
        <p>Launch year:<span>${data.launch_year}</span></p>
    </blockquote>
    </div>
    `;
}

//2. crear la API
//2.1. crear función asincrona
async function getCards() {
	const url = `https://api.spacexdata.com/v3/launches`;
	const response = await fetch(url);
	// console.log(response);
	const data = await response.json();
	console.log(data);

	printCards(data);
}

function printCards(cardsList) {
	cleanHTML(cardsContainer);

	cardsList.forEach((card) => {
		console.log(card);
		console.log(card.links.mission_patch_small);

		cardsContainer.innerHTML += `
        <div class="card">
            <img src="${card.links.mission_patch_small}" alt="poster">
            <blockquote class="blockquote">
                <h2 class="title-card "><strong>${card.mission_name}</strong></h2>
                <p>Flight number:<span>${card.flight_number}</span></p>
                <p>Launch year:<span>${card.launch_year}</span></p>
            </blockquote>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="btnMoreDetails(${card.flight_number})" type="submit">More details</button>  
        </div>
        `;
	});
}

function cleanHTML(box) {
	while (box.firstChild) {
		box.removeChild(box.firstChild);
	}
}
