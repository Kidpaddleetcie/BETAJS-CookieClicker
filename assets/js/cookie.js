//Initialisations
let click = 0;
//Nombre de cookie
let score = 0;

let multiplicateur = 1;
let autoclic = 1;
let bonus = 1;

//Prix
let multi_prix = 200;
let auto_prix = 500;
let bonus_prix = 5000;

//Disponibilitéss
let dispo_auto = 0;
let dispo_bonus = 0;
let dispo_multi = 0;

//Les temps
let tps_bonus = 0;

//POUR LES TRICHEURS
let TRICHE = 0;
let dispo_TRICHE = 0;

//Affichons le score !
function affichage() {
    if (dispo_TRICHE === 1) {
        document.querySelector('#affichage span').innerHTML = score + " Cookies DE GROS TRICHEUR >:(";
        document.querySelector('#affichage span').style.fontSize = 15 + "px";
        document.querySelector('#affichage span').style.left = -85 + "px";
        document.querySelector('#affichage span').style.textShadow = "0px 1px 0px red";
    } else {
        document.querySelector('#affichage span').innerHTML = score + " Cookies";
        if (score < 100) {
            document.querySelector('#affichage span').style.marginLeft = 90 + "px";
        } else if (score > 10 && score < 100) {
            document.querySelector('#affichage span').style.marginLeft = 80 + "px";
        } else if (score > 100 && score < 1000) {
            document.querySelector('#affichage span').style.marginLeft = 70 + "px";
        } else if (score > 1000 && score < 10000) {
            document.querySelector('#affichage span').style.marginLeft = 65 + "px";
        } else {
            document.querySelector('#affichage span').style.marginLeft = 45 + "px";
        }
    }
}




//Il y a quoi dedans?
function contenu_multiplicateur() {
    let multiplicateur_suivant = multiplicateur + 1;
    document.getElementById('multiplier').innerHTML = "clics * " + multiplicateur_suivant + " ( Prix: " + multi_prix + " Cookies ! Le prochain coutera: " + Math.round(2.5 * multi_prix) + " Cookies ! )";
    if (multiplicateur > 10) {
        document.getElementById('multiplier').style.padding = 2 + "px";
    }
}

function contenu_autoclic() {
    document.getElementById('autoclic').innerHTML = "clics + " + autoclic + " par seconde ( Prix:" + auto_prix + " Cookies ! Le prochain coutera: " + Math.round(2.5 * auto_prix) + " Cookies ! )";
    if (autoclic > 10) {
        document.getElementById('multiplier').style.padding = 2 + "px";
    }
}

function contenu_bonus() {
    let bonus_suivant = bonus + 1;
    document.getElementById('bonus').innerHTML = "clics * " + bonus_suivant + " ( Prix: " + bonus_prix + " Cookies ! Le prochain coutera: " + Math.round(2.5 * bonus_prix) + " Cookies ! )";
    if (bonus > 10) {
        document.getElementById('multiplier').style.padding = 2 + "px";
    }
}



//On les rend visible ou pas?
function montre_multiplicateur() {
    if (score >= multi_prix) {
        document.querySelector('#multiplier').style.display = "block";
        document.querySelector('#multiplier').classList.add('ArcEnCielFond');
        setTimeout(function() { document.querySelector('#multiplier').classList.remove('aberration_chromatique'); }, 200);

        contenu_multiplicateur();
    } else {
        document.querySelector('#multiplier').style.display = "none";
    }
}

function montre_autoclic() {
    if (dispo_auto === 0 && score >= auto_prix) {
        document.querySelector('#autoclic').style.display = "block";
        document.querySelector('#autoclic').classList.add('ArcEnCielFond');
        contenu_autoclic();
    } else {
        document.querySelector('#autoclic').style.display = "none";
    }

}

function montre_bonus() {
    if (score >= bonus_prix) {
        document.querySelector('#bonus').style.display = "block";
        document.querySelector('#bonus').classList.add('ArcEnCielFond');
        contenu_bonus();
    } else {
        document.querySelector('#bonus').style.display = "none";
    }
}

//On rassemble le tout pour éviter de retaper les 3 tout le temps!
function montrons_bouttons() {
    montre_multiplicateur();
    montre_autoclic();
    montre_bonus();
}



//C'est partit pour les fonctions à lier aux boutons

//Lui, c'est le clic mais je vais aussi l'utiliser, évidemment, pour l'Autoclick
function incrementation() {

    click = 1;
    // Il y a (3*3)-1 possibilité de score dans le script en fonction de la disposition des effets !

    //1_1_1
    if (dispo_multi === 1 && dispo_bonus === 1 && dispo_TRICHE === 1) {
        score += ((click * (multiplicateur)) + TRICHE) * bonus;
        document.getElementById('clic').innerHTML = "Clic*" + multiplicateur + " !";
        //1_0_0
    } else if (dispo_multi === 1 && dispo_bonus === 0 && dispo_TRICHE === 0) {
        score += click * (multiplicateur);
        document.getElementById('clic').innerHTML = "Clic*" + multiplicateur + " !";

        //1_1_0
    } else if (dispo_multi === 1 && dispo_bonus === 1 && dispo_TRICHE === 0) {
        score += (click * multiplicateur) * bonus;
        document.getElementById('clic').innerHTML = "Clic*" + multiplicateur + " !";

        //1_0_1
    } else if (dispo_multi === 1 && dispo_bonus === 0 && dispo_TRICHE === 1) {
        score += (click * multiplicateur) + TRICHE;
        document.getElementById('clic').innerHTML = "Clic*" + multiplicateur + " !";



        //0_0_1
    } else if (dispo_multi === 0 && dispo_bonus === 0 && dispo_TRICHE === 1) {
        score += click + TRICHE;
        //0_1_1
    } else if (dispo_multi === 0 && dispo_bonus === 1 && dispo_TRICHE === 1) {
        score += (click + TRICHE) * bonus;
        //0_1_0
    } else if (dispo_multi === 0 && dispo_bonus === 1 && dispo_TRICHE === 0) {
        score += click * bonus;

        //0_0_0
    } else {
        score += click;
    }
    affichage();

    document.querySelector('#affichage span').classList.add('aberration_chromatique');
    setTimeout(function() { document.querySelector('#affichage span').classList.remove('aberration_chromatique'); }, 200);
    montrons_bouttons();
    document.getElementById('clic').innerHTML = "Clic !";
}


//Le multiplicateur (on ne s'en saurait douter)
function augmenterMultiplicateur() {
    score -= multi_prix;
    dispo_multi = 1;
    console.log(score);
    multiplicateur = multiplicateur + 1;
    click = multiplicateur;
    console.log("MultiON: Les clics valent désormais " + click + " cookies !");

    if (dispo_bonus === 1) {
        click *= bonus;
    }
    affichage();
    multi_prix = Math.round(2.5 * multi_prix);
    montrons_bouttons();
    montre_multiplicateur();
}

//L'autoclic et sa fonction spéciale pour faire comme un clic!
function augmenterAutoclic() {
    score = score - auto_prix;
    autoclic++;
    dispo_auto = 1;
    montrons_bouttons();
    montre_autoclic();
    affichage();
}

function autoclic_actif() {
    if (dispo_auto === 1) {
        console.log("AutoclicON: un clic par seconde activé !");
        incrementation()
    }
}

// LE BONUS (en trois fonctions: Activation,Désactivation,faire comme un clic)


function augmenterBonus() {
    score -= bonus_prix;
    bonus_prix = Math.round(2.5 * bonus_prix);
    dispo_bonus = 1;
    montre_bonus();
    disparitionBonus();
}

function disparitionBonus() {
    bonus_tps = 30;
    montre_bonus();
    montrons_bouttons();
    bonus_actif();
}

function bonus_actif() {
    if (dispo_bonus === 1) {
        console.log("bonusON: 30 secondes de score*2 par clic!");
        bonus_tps--;
        document.querySelector('#affichage span').classList.add('ArcEnCielFond');
        let bonus_suivant = bonus + 1;
        document.getElementById('bonus').innerHTML = "clics * " + bonus_suivant + " ( " + tps_bonus + " secondes restantes)";


        if (bonus_tps === 0) {
            console.log("bonusOFF: les 30 secondes sont passées,à dans " + bonus_prix - score + " cookies :) ");
            disparitionBonus();
            document.querySelector('#affichage span').classList.remove('ArcEnCielFond');
            dispo_bonus = 0;
        }
    }
}








//On n'affiche que le contenu d'affichage et le bouton clic!
document.querySelector('#multiplier').style.display = "none";
document.getElementById('clic').innerHTML = "Clic !";
document.querySelector('#affichage span').innerHTML = score + " Cookie";
document.querySelector('#bonus').style.display = "none";
document.querySelector('#autoclic').style.display = "none";

//On lie les boutons à leurs fonctions respectives!
document.getElementById('clic').addEventListener('click', incrementation);
document.getElementById('multiplier').addEventListener('click', augmenterMultiplicateur);
document.getElementById('autoclic').addEventListener('click', augmenterAutoclic);
document.getElementById('bonus').addEventListener('click', augmenterBonus);

//On mets les fonction de temps en route !

autoclic_tps = window.setInterval(autoclic_actif, 1000);
bonus_tps = window.setInterval(bonus_actif, 30000);



//C'EST PARTIT POUR LA CONSTRUCTION DU COOKIE

let cookie = document.getElementById("cookie");
let cookie_construction = cookie.getContext("2d");
drawcanvas(cookie_construction);

function drawcanvas(cookie_construction) {

    //Shape0;
    cookie_construction.shadowColor = "rgba(0,0,0,0)";
    cookie_construction.strokeStyle = "rgba(0,0,0,1)";
    cookie_construction.lineWidth = 10;
    cookie_construction.lineCap = "butt";
    cookie_construction.lineJoin = "miter";
    cookie_construction.beginPath();
    cookie_construction.moveTo(253, 3);
    cookie_construction.bezierCurveTo(390, 3, 502, 114, 502, 251);
    cookie_construction.bezierCurveTo(502, 387, 390, 498, 253, 498);
    cookie_construction.bezierCurveTo(115, 498, 3, 387, 3, 251);
    cookie_construction.bezierCurveTo(3, 114, 115, 3, 253, 3);
    cookie_construction.closePath();
    cookie_construction.stroke();
    cookie_construction.shadowOffsetX = 15;
    cookie_construction.shadowOffsetY = 15;
    cookie_construction.shadowBlur = 0;
    cookie_construction.shadowColor = "rgba(0,0,0,0)";
    grad = cookie_construction.createRadialGradient(128, 374, 62, 245, 236, 250);
    grad.addColorStop(0, "rgba(239,131,15,0.87)");
    grad.addColorStop(1, "rgba(141,76,6,1)");
    cookie_construction.fillStyle = grad;
    cookie_construction.fill();

    //Shape8;
    cookie_construction.shadowColor = "rgba(0,0,0,0)";
    cookie_construction.strokeStyle = "rgba(0,0,0,1)";
    cookie_construction.lineWidth = 1;
    cookie_construction.lineCap = "butt";
    cookie_construction.lineJoin = "miter";
    cookie_construction.beginPath();
    cookie_construction.moveTo(399, 78);
    cookie_construction.bezierCurveTo(421, 78, 439, 95, 439, 115);
    cookie_construction.bezierCurveTo(439, 135, 421, 152, 399, 152);
    cookie_construction.bezierCurveTo(376, 152, 358, 135, 358, 115);
    cookie_construction.bezierCurveTo(358, 95, 376, 78, 399, 78);
    cookie_construction.closePath();
    cookie_construction.stroke();
    cookie_construction.shadowOffsetX = 3;
    cookie_construction.shadowOffsetY = 4;
    cookie_construction.shadowBlur = 8.4;
    cookie_construction.shadowColor = "rgba(0,0,0,0.72)";
    grad = cookie_construction.createLinearGradient(358, 115, 439, 115);
    grad.addColorStop(0, "rgba(235,151,19,0.28)");
    grad.addColorStop(1, "rgba(104,65,4,1)");
    cookie_construction.fillStyle = grad;
    cookie_construction.fill();

    //Shape10;
    cookie_construction.shadowColor = "rgba(0,0,0,0)";
    cookie_construction.strokeStyle = "rgba(0,0,0,1)";
    cookie_construction.lineWidth = 1;
    cookie_construction.lineCap = "butt";
    cookie_construction.lineJoin = "miter";
    cookie_construction.beginPath();
    cookie_construction.moveTo(145, 102);
    cookie_construction.bezierCurveTo(167, 102, 185, 119, 185, 139);
    cookie_construction.bezierCurveTo(185, 159, 167, 176, 145, 176);
    cookie_construction.bezierCurveTo(122, 176, 104, 159, 104, 139);
    cookie_construction.bezierCurveTo(104, 119, 122, 102, 145, 102);
    cookie_construction.closePath();
    cookie_construction.stroke();
    cookie_construction.shadowOffsetX = 3;
    cookie_construction.shadowOffsetY = 4;
    cookie_construction.shadowBlur = 8.4;
    cookie_construction.shadowColor = "rgba(0,0,0,0.72)";
    grad = cookie_construction.createLinearGradient(104, 139, 185, 139);
    grad.addColorStop(0, "rgba(235,151,19,0.28)");
    grad.addColorStop(1, "rgba(104,65,4,1)");
    cookie_construction.fillStyle = grad;
    cookie_construction.fill();

    //Shape11;
    cookie_construction.shadowColor = "rgba(0,0,0,0)";
    cookie_construction.strokeStyle = "rgba(0,0,0,1)";
    cookie_construction.lineWidth = 1;
    cookie_construction.lineCap = "butt";
    cookie_construction.lineJoin = "miter";
    cookie_construction.beginPath();
    cookie_construction.moveTo(316, 381);
    cookie_construction.bezierCurveTo(338, 381, 356, 398, 356, 418);
    cookie_construction.bezierCurveTo(356, 438, 338, 455, 316, 455);
    cookie_construction.bezierCurveTo(293, 455, 275, 438, 275, 418);
    cookie_construction.bezierCurveTo(275, 398, 293, 381, 316, 381);
    cookie_construction.closePath();
    cookie_construction.stroke();
    cookie_construction.shadowOffsetX = 3;
    cookie_construction.shadowOffsetY = 4;
    cookie_construction.shadowBlur = 8.4;
    cookie_construction.shadowColor = "rgba(0,0,0,0.72)";
    grad = cookie_construction.createLinearGradient(275, 418, 356, 418);
    grad.addColorStop(0, "rgba(235,151,19,0.28)");
    grad.addColorStop(1, "rgba(104,65,4,1)");
    cookie_construction.fillStyle = grad;
    cookie_construction.fill();

    //Shape12;
    cookie_construction.shadowColor = "rgba(0,0,0,0)";
    cookie_construction.strokeStyle = "rgba(0,0,0,1)";
    cookie_construction.lineWidth = 1;
    cookie_construction.lineCap = "butt";
    cookie_construction.lineJoin = "miter";
    cookie_construction.beginPath();
    cookie_construction.moveTo(418, 180);
    cookie_construction.bezierCurveTo(440, 180, 458, 197, 458, 217);
    cookie_construction.bezierCurveTo(458, 237, 440, 254, 418, 254);
    cookie_construction.bezierCurveTo(395, 254, 377, 237, 377, 217);
    cookie_construction.bezierCurveTo(377, 197, 395, 180, 418, 180);
    cookie_construction.closePath();
    cookie_construction.stroke();
    cookie_construction.shadowOffsetX = 3;
    cookie_construction.shadowOffsetY = 4;
    cookie_construction.shadowBlur = 8.4;
    cookie_construction.shadowColor = "rgba(0,0,0,0.72)";
    grad = cookie_construction.createLinearGradient(377, 217, 458, 217);
    grad.addColorStop(0, "rgba(235,151,19,0.28)");
    grad.addColorStop(1, "rgba(104,65,4,1)");
    cookie_construction.fillStyle = grad;
    cookie_construction.fill();

    //Shape13;
    cookie_construction.shadowColor = "rgba(0,0,0,0)";
    cookie_construction.strokeStyle = "rgba(0,0,0,1)";
    cookie_construction.lineWidth = 1;
    cookie_construction.lineCap = "butt";
    cookie_construction.lineJoin = "miter";
    cookie_construction.beginPath();
    cookie_construction.moveTo(151, 327);
    cookie_construction.bezierCurveTo(173, 327, 191, 344, 191, 364);
    cookie_construction.bezierCurveTo(191, 384, 173, 401, 151, 401);
    cookie_construction.bezierCurveTo(128, 401, 110, 384, 110, 364);
    cookie_construction.bezierCurveTo(110, 344, 128, 327, 151, 327);
    cookie_construction.closePath();
    cookie_construction.stroke();
    cookie_construction.shadowOffsetX = 3;
    cookie_construction.shadowOffsetY = 4;
    cookie_construction.shadowBlur = 8.4;
    cookie_construction.shadowColor = "rgba(0,0,0,0.72)";
    grad = cookie_construction.createLinearGradient(110, 364, 191, 364);
    grad.addColorStop(0, "rgba(235,151,19,0.28)");
    grad.addColorStop(1, "rgba(104,65,4,1)");
    cookie_construction.fillStyle = grad;
    cookie_construction.fill();

    //Shape14;
    cookie_construction.shadowColor = "rgba(0,0,0,0)";
    cookie_construction.strokeStyle = "rgba(0,0,0,1)";
    cookie_construction.lineWidth = 1;
    cookie_construction.lineCap = "butt";
    cookie_construction.lineJoin = "miter";
    cookie_construction.beginPath();
    cookie_construction.moveTo(256, 252);
    cookie_construction.bezierCurveTo(278, 252, 296, 269, 296, 289);
    cookie_construction.bezierCurveTo(296, 309, 278, 326, 256, 326);
    cookie_construction.bezierCurveTo(233, 326, 215, 309, 215, 289);
    cookie_construction.bezierCurveTo(215, 269, 233, 252, 256, 252);
    cookie_construction.closePath();
    cookie_construction.stroke();
    cookie_construction.shadowOffsetX = 3;
    cookie_construction.shadowOffsetY = 4;
    cookie_construction.shadowBlur = 8.4;
    cookie_construction.shadowColor = "rgba(0,0,0,0.72)";
    grad = cookie_construction.createLinearGradient(215, 289, 296, 289);
    grad.addColorStop(0, "rgba(235,151,19,0.28)");
    grad.addColorStop(1, "rgba(104,65,4,1)");
    cookie_construction.fillStyle = grad;
    cookie_construction.fill();

    //Shape15;
    cookie_construction.shadowColor = "rgba(0,0,0,0)";
    cookie_construction.strokeStyle = "rgba(0,0,0,1)";
    cookie_construction.lineWidth = 1;
    cookie_construction.lineCap = "butt";
    cookie_construction.lineJoin = "miter";
    cookie_construction.beginPath();
    cookie_construction.moveTo(262, 36);
    cookie_construction.bezierCurveTo(284, 36, 302, 53, 302, 73);
    cookie_construction.bezierCurveTo(302, 93, 284, 110, 262, 110);
    cookie_construction.bezierCurveTo(239, 110, 221, 93, 221, 73);
    cookie_construction.bezierCurveTo(221, 53, 239, 36, 262, 36);
    cookie_construction.closePath();
    cookie_construction.stroke();
    cookie_construction.shadowOffsetX = 3;
    cookie_construction.shadowOffsetY = 4;
    cookie_construction.shadowBlur = 8.4;
    cookie_construction.shadowColor = "rgba(0,0,0,0.72)";
    grad = cookie_construction.createLinearGradient(221, 73, 302, 73);
    grad.addColorStop(0, "rgba(235,151,19,0.28)");
    grad.addColorStop(1, "rgba(104,65,4,1)");
    cookie_construction.fillStyle = grad;
    cookie_construction.fill();

    //Shape16;
    cookie_construction.shadowColor = "rgba(0,0,0,0)";
    cookie_construction.strokeStyle = "rgba(0,0,0,1)";
    cookie_construction.lineWidth = 1;
    cookie_construction.lineCap = "butt";
    cookie_construction.lineJoin = "miter";
    cookie_construction.beginPath();
    cookie_construction.moveTo(102, 217);
    cookie_construction.bezierCurveTo(124, 217, 142, 234, 142, 254);
    cookie_construction.bezierCurveTo(142, 274, 124, 291, 102, 291);
    cookie_construction.bezierCurveTo(79, 291, 61, 274, 61, 254);
    cookie_construction.bezierCurveTo(61, 234, 79, 217, 102, 217);
    cookie_construction.closePath();
    cookie_construction.stroke();
    cookie_construction.shadowOffsetX = 3;
    cookie_construction.shadowOffsetY = 4;
    cookie_construction.shadowBlur = 8.4;
    cookie_construction.shadowColor = "rgba(0,0,0,0.72)";
    grad = cookie_construction.createLinearGradient(61, 254, 142, 254);
    grad.addColorStop(0, "rgba(235,151,19,0.28)");
    grad.addColorStop(1, "rgba(104,65,4,1)");
    cookie_construction.fillStyle = grad;
    cookie_construction.fill();

    //Shape17;
    cookie_construction.shadowColor = "rgba(0,0,0,0)";
    cookie_construction.strokeStyle = "rgba(0,0,0,1)";
    cookie_construction.lineWidth = 1;
    cookie_construction.lineCap = "butt";
    cookie_construction.lineJoin = "miter";
    cookie_construction.beginPath();
    cookie_construction.moveTo(408, 295);
    cookie_construction.bezierCurveTo(430, 295, 448, 312, 448, 332);
    cookie_construction.bezierCurveTo(448, 352, 430, 369, 408, 369);
    cookie_construction.bezierCurveTo(385, 369, 367, 352, 367, 332);
    cookie_construction.bezierCurveTo(367, 312, 385, 295, 408, 295);
    cookie_construction.closePath();
    cookie_construction.stroke();
    cookie_construction.shadowOffsetX = 3;
    cookie_construction.shadowOffsetY = 4;
    cookie_construction.shadowBlur = 8.4;
    cookie_construction.shadowColor = "rgba(0,0,0,0.72)";
    grad = cookie_construction.createLinearGradient(367, 332, 448, 332);
    grad.addColorStop(0, "rgba(235,151,19,0.28)");
    grad.addColorStop(1, "rgba(104,65,4,1)");
    cookie_construction.fillStyle = grad;
    cookie_construction.fill();

    //Shape18;
    cookie_construction.shadowColor = "rgba(0,0,0,0)";
    cookie_construction.strokeStyle = "rgba(0,0,0,1)";
    cookie_construction.lineWidth = 1;
    cookie_construction.lineCap = "butt";
    cookie_construction.lineJoin = "miter";
    cookie_construction.beginPath();
    cookie_construction.moveTo(278, 138);
    cookie_construction.bezierCurveTo(300, 138, 318, 155, 318, 175);
    cookie_construction.bezierCurveTo(318, 195, 300, 212, 278, 212);
    cookie_construction.bezierCurveTo(255, 212, 237, 195, 237, 175);
    cookie_construction.bezierCurveTo(237, 155, 255, 138, 278, 138);
    cookie_construction.closePath();
    cookie_construction.stroke();
    cookie_construction.shadowOffsetX = 3;
    cookie_construction.shadowOffsetY = 4;
    cookie_construction.shadowBlur = 8.4;
    cookie_construction.shadowColor = "rgba(0,0,0,0.72)";
    grad = cookie_construction.createLinearGradient(237, 175, 318, 175);
    grad.addColorStop(0, "rgba(235,151,19,0.28)");
    grad.addColorStop(1, "rgba(104,65,4,1)");
    cookie_construction.fillStyle = grad;
    cookie_construction.fill();
}
//LE BOUTON DES TRICHEURS
document.getElementById('triche').addEventListener('click', triche);

function triche() {
    document.querySelector('#triche').classList.add('triche_detecte');
    document.querySelector('#triche').innerHTML = "BOUHHHHHHH LE GROS TRICHEUR!!!"

    document.querySelector('section').classList.add('curseurDeTricheur');
    TRICHE = 9999999 * (click + 1);
    dispo_TRICHE = 1;
    montrons_bouttons();
    incrementation();
    setInterval(function() {
        document.querySelector('#cookie').style.transform = "rotateX(180deg)scale(0.5)";
        document.querySelector('#cookie').style.transition = "0.5s"

    })
    setInterval(function() {
        document.querySelector('#cookie').style.transform = "rotateX(180deg)scale(0.5)";
        document.querySelector('#cookie').style.filter = "contrast(5.0)blur(2px)";
        console.log("GROS TRICHEUR >:( !!!")
    }, 200)

}