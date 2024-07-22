document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://restcountries.com/v3.1/all';
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const countriesList = document.getElementById('countries-list');
            const allCountries = [].concat(...data); // Combine all arrays into one
            console.log(allCountries);

            allCountries.forEach(country => {
                const countryDiv = document.createElement('div');
                countryDiv.classList.add('country');

                const currencyName = country.currencies ? Object.values(country.currencies)[0].name : 'N/A';
                const flagImg = country.flags ? country.flags.svg : '';
                const mapUrl = country.maps ? country.maps.googleMaps : '#';

                countryDiv.innerHTML = `
                <div class="details-info">    
                    <div class="flag_Img">
                        <img class="flag-img" src="${flagImg}" alt="${country.name.common}">
                    </div>
                    <div>
                        <h2>${country.name.common}</h2>
                        <p>Currency: ${currencyName}</p>
                        <p>Current date and time: ${new Date().toLocaleString()}</p>
                        <div class="btn">
                            <button onclick="showMap('${mapUrl}')">Show Map</button>
                            <button onclick="viewDetail('${country.cca3}')">Detail</button>
                        </div>
                    </div>
                </div>
                `;
                countriesList.appendChild(countryDiv);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

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
    if (url !== '#') {
        window.open(url, '_blank');
    } else {
        alert('Map not available');
    }
}

function viewDetail(cca3) {
    window.location.href = `detail.html?country=${cca3}`;
}
