document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://restcountries.com/v3.1/all';
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const countriesList = document.getElementById('countries-list');
            data.forEach(country => {
                const countryDiv = document.createElement('div');
                countryDiv.classList.add('country');
                countryDiv.innerHTML = `
                <div class="details-info">    
                    <div>
                        <img class="flag-img" src="${country.flags.svg}" alt="${country.name.common}">
                    </div>
                    <div>
                        <h2>${country.name.common}</h2>
                        <p>Currency: ${country.currencies[Object.keys(country.currencies)[0]].name}</p>
                        <p>Current date and time: ${new Date().toLocaleString()}</p>
                         <div class="btn">
                            <button onclick="showMap('${country.maps.googleMaps}')">Show Map</button>
                            <button onclick="viewDetail('${country.cca3}')">Detail</button>
                        </div>
                    </div>
                </div>
                   
                `;
                countriesList.appendChild(countryDiv);
            });
        });

    document.getElementById('search').addEventListener('input', function(event) {
        const searchQuery = event.target.value.toLowerCase();
        const countryDivs = document.querySelectorAll('.country');
        countryDivs.forEach(div => {
            const countryName = div.querySelector('h2').innerText.toLowerCase();
            if (countryName.includes(searchQuery)) {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        });
    });
});

function showMap(url) {
    window.open(url, '_blank');
}

function viewDetail(cca3) {
    window.location.href = `detail.html?country=${cca3}`;
}
