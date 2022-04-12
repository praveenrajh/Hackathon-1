const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let brCharacters = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = brCharacters.filter((character) => {
        return  character.name.toLowerCase().includes(searchString) 
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try {
        const res = await fetch('https://api.openbrewerydb.org/breweries');
        brCharacters = await res.json();
        displayCharacters(brCharacters);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <h2 class="name">${character.name}</h2>
                <p><b>Type:</b> ${character.brewery_type}</p>
                <div class="user-address">
                <div class="add-heading"><b>Address :</b></div>
                <div class="address-details">
                    <p>Street : ${character.street}</p>
                </div>
                <div class="address-details">
                    <p>City : ${character.city}</p>
                </div>
                <div class="address-details">
                    <p>State : ${character.state}</p>
                </div>
                <div class="address-details">
                    <p>Postal Code : ${character.postal_code}</p>
                </div>
                <div class="address-details">
                    <p>Country : ${character.country}</p>
                </div>
            </div>
                <p class="URL"><b>URL:</b> ${character. website_url}</p>
                <p class="phno"><b>Phone number : </b> ${character.phone}</p>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();













