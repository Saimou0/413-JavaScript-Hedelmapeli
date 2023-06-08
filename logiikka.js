let raha = 50;
let panos = 1;
rahaMaara = document.getElementById("RahaMaara");
panosMaara = document.getElementById("Panos");
voittoIlmoitus = document.getElementById("voittoIlmoitus");

const pelaaNappi = document.getElementById("pelaa");

const rullat = document.querySelectorAll("img.Rulla");
const nykyisetKuvat = [1, 2, 3, 4]
let peliKerrat = 0;
let kaytettyRaha = 0;

let voittiko = false;

// Pelaaminen
pelaaNappi.addEventListener('click', pelaa);
function pelaa() {

    voittoIlmoitus.innerHTML = ""

    if(panos <= raha) {
        // Veloitetaan panos rahasta
        raha = raha - panos;
        rahaMaara.innerHTML = raha;
        kaytettyRaha = kaytettyRaha + panos;


        // Tarkistetaan rullien lukitus
        for (let i = 0; i < 4; i++) {
            // Arvotaan rullat
            if(lukitutRullat[i] == false) {
                let satunnainenNumero = Math.floor(Math.random() * 5 + 1);
                rullat[i].src = 'Rullat/Kuva' + satunnainenNumero + '.jpg';
                nykyisetKuvat[i] = satunnainenNumero;
            }
            
        }

        // tarkistetaan onko rullia lukittu aikaisemmalla kierroksella
        if(lukitutRullat.includes(true)) {
            document.getElementById("lukitse1").disabled = true
            if(rulla1 == true) {
                lukitse1.classList.toggle("locked");
            }

            document.getElementById("lukitse2").disabled = true
            if(rulla2 == true) {
                lukitse2.classList.toggle("locked");
            }

            document.getElementById("lukitse3").disabled = true
            if(rulla3 == true) {
                lukitse3.classList.toggle("locked");
            }

            document.getElementById("lukitse4").disabled = true
            if(rulla4 == true) {
                lukitse4.classList.toggle("locked");
            }

            rulla1 = false
            rulla2 = false
            rulla3 = false
            rulla4 = false
        } else {
            document.getElementById("lukitse1").disabled = false
            document.getElementById("lukitse2").disabled = false
            document.getElementById("lukitse3").disabled = false
            document.getElementById("lukitse4").disabled = false
        }
        
        // avataan lukitus kaikista rullista
        for(let i = 0; i < lukitutRullat.length; i++) {
            lukitutRullat[i] = false;
        }

        document.getElementById("lukitse1").innerHTML = "Lukitse"
        document.getElementById("lukitse2").innerHTML = "Lukitse"
        document.getElementById("lukitse3").innerHTML = "Lukitse"
        document.getElementById("lukitse4").innerHTML = "Lukitse"
        
        // Tarkistetaan voitto
        const voittaja = tarkistaVoitto(4,5);
        if(voittaja.kaikkiRullatSamat == true) {
            voittiko = true;
            voittoIlmoitus.innerHTML = "Voitit: " + voitonLisaaminen();
        } else if(voittaja.kolmeSeiskaa == true) {
            voittiko = true;
            raha = raha + 5 * panos;
            voittoIlmoitus.innerHTML = "Voitit: " + 5 * panos;
            rahaMaara.innerHTML = raha;
        } else {
            voittiko = false;
            voittoIlmoitus.innerHTML = "Et voittanut!"
            if(raha == 0) {
                peliKerrat += 1;
                peliLoppui();    
            }
        }
        
        peliKerrat += 1;
        
        console.log(lukitutRullat)
        console.log(peliKerrat)
    }

    if(raha == 0) {
        peliLoppui();    
    }

}

function peliLoppui() {
    document.getElementById("raha").style.display = "none";
    document.getElementById("peli").style.display = "none";
    document.getElementById("napit").style.display = "none";
    document.getElementById("Logo").style.display = "none";

    document.getElementById("loppuNaytto").style.display = "block";
    document.getElementById("peliKerrat").innerHTML = "Pelasit: " + peliKerrat + " kertaa";
    

}

// Raha
rahaMaara.innerHTML = raha;
panosMaara.innerHTML = "Panos: " + panos;

document.getElementById("PanosPlus").addEventListener('click', () => {
    if(panos < 5) {
        panos++;
    }
    document.getElementById("Panos").innerHTML = "Panos: " + panos;
});

document.getElementById("PanosMiinus").addEventListener('click', () => {
    if(panos > 1) {
        panos--;
    }
    document.getElementById("Panos").innerHTML = "Panos: " + panos;
});

// Voitton tarkistaminen
function tarkistaVoitto(tarvittuArvojenMaara, seiska) {
    let kaikkiRullatSamat = true;
    let kolmeSeiskaa = false;
    let arvojenMaara = 0;

    const ekaRulla = nykyisetKuvat[0];
    for(let i = 0; i < nykyisetKuvat.length; i++) {
        if(nykyisetKuvat[i] !== ekaRulla) {
            kaikkiRullatSamat = false;
        }

        if(nykyisetKuvat[i] === seiska) {
            arvojenMaara++
        }
    }

    if (arvojenMaara >= tarvittuArvojenMaara - 1) {
        kolmeSeiskaa = true;
    }
    
    return {
        kaikkiRullatSamat: kaikkiRullatSamat,
        kolmeSeiskaa: kolmeSeiskaa
    };

}

function voitonLisaaminen() {
    let voitto = 0;
    if(nykyisetKuvat[0] == 1) {
        raha = raha + 3 * panos;
        rahaMaara.innerHTML = raha;
        voitto = 3 * panos
    }
    if(nykyisetKuvat[0] == 2) {
        raha = raha + 5 * panos;
        rahaMaara.innerHTML = raha;
        voitto = 2 * panos
    }
    if(nykyisetKuvat[0] == 3) {
        raha = raha + 6 * panos;
        rahaMaara.innerHTML = raha;
        voitto = 6 * panos
    }
    if(nykyisetKuvat[0] == 4) {
        raha = raha + 4 * panos;
        rahaMaara.innerHTML = raha;
        voitto = 4 * panos
    }
    if(nykyisetKuvat[0] == 5) {
        raha = raha + 10 * panos;
        rahaMaara.innerHTML = raha;
        voitto = 10 * panos
    }

    return voitto;
}

// Rullien lukitseminen
let rulla1 = false
let rulla2 = false
let rulla3 = false
let rulla4 = false
const lukitutRullat = [rulla1, rulla2, rulla3, rulla4];

// lukitus napit
const lukitse1 = document.getElementById("lukitse1");
const lukitse2 = document.getElementById("lukitse2");
const lukitse3 = document.getElementById("lukitse3");
const lukitse4 = document.getElementById("lukitse4");


document.getElementById("lukitse1").addEventListener('click', () => {

    if(!voittiko && peliKerrat > 0) {
        rulla1 = !rulla1;
        lukitutRullat[0] = rulla1;
    }
     
    // Värien ja tekstin vaihtaminen
    if(rulla1 == true) {
        document.getElementById("lukitse1").innerHTML = "Lukittu"
        lukitse1.classList.toggle("locked");
    }

    if(rulla1 == false) {
        document.getElementById("lukitse1").innerHTML = "Lukitse"
        if(peliKerrat > 0) {
            lukitse1.classList.toggle("locked");
        }
    }

});

document.getElementById("lukitse2").addEventListener('click', () => {
    if(!voittiko && peliKerrat > 0) {
        rulla2 = !rulla2;
        lukitutRullat[1] = rulla2;
    }

    // Värien ja tekstin vaihtaminen
    if(rulla2 == true) {
        document.getElementById("lukitse2").innerHTML = "Lukittu";
        lukitse2.classList.toggle("locked");
    }

    if(rulla2 == false) {
        document.getElementById("lukitse2").innerHTML = "Lukitse";
        if(peliKerrat > 0) {
            lukitse2.classList.toggle("locked");
        }
    }

});

document.getElementById("lukitse3").addEventListener('click', () => {
    if(!voittiko && peliKerrat > 0) {
        rulla3 = !rulla3;
        lukitutRullat[2] = rulla3;
    }

    // Värien ja tekstin vaihtaminen
    if(rulla3 == true) {
        document.getElementById("lukitse3").innerHTML = "Lukittu";
        lukitse3.classList.toggle("locked");
    }

    if(rulla3 == false) {
        document.getElementById("lukitse3").innerHTML = "Lukitse";
        if(peliKerrat > 0) {
            lukitse3.classList.toggle("locked");
        }
    }

});

document.getElementById("lukitse4").addEventListener('click', () => {
    if(!voittiko && peliKerrat > 0) {
        rulla4 = !rulla4;
        lukitutRullat[3] = rulla4;
    }

    // Värien ja tekstin vaihtaminen
    if(rulla4 == true) {
        document.getElementById("lukitse4").innerHTML = "Lukittu";
        lukitse4.classList.toggle("locked");

    }

    if(rulla4 == false) {
        document.getElementById("lukitse4").innerHTML = "Lukitse";
        if(peliKerrat > 0) {
            lukitse4.classList.toggle("locked");
        }
    }


});