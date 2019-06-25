# JS-Cookie-Clicker

## But
Obtenir un Cookie Clicker personnalisé content:
- Un affichage du nombre de Cookie,
- Un bouton "clic" pour rajouter les Cookies manuellement,
- Un bouton "multiplicateur" pour multiplier les clics manuellement,
- un bouton "autoclic" pour appuyer sur le bouton clic 1 fois toutes les secondes,
- Un bouton "BONUS" qui permet d'augmenter à 200% le nombre de Cookie à chaque clic pendant 30 secondes.

Les boutons multiplicateur,autoclic et Bonus valent un nombre de Cookie, il faut qu'ils ne s'affichent pas si on n'a pas le nombre de Cookie nécessaire à l'achat !

Les boutons multiplicateur,autoclic et Bonus valent un nombre de Cookie de plus en plus grand!

multiplicateur coûte 200 cookies à la base,
autoclic coûte 500 cookies à la base,
BONUS coûte 5 000 cookies à la base.

## Les contraintes
Pas d'image => Utilisation des canvas

Présentation soignée

## Les problèmes actuelles
Lorsqu'on appuie sur les boutons multiplicateur,autoclic et BONUS, on a bien le prix qui est enlevé du score MAIS le score se remet comme s'il n'avait jamais été changé une fois qu'on qu'on clic sur le bouton clic!

Je mets l'hypothèse que c'est la fonction "incrementation" qui fait défaut:
```javascript
function incrementation() {
    click++
    if (dispo_TRICHE === 1) {
        score = +click + TRICHE * multiplicateur * bonus;
    } else {
        score = +click * multiplicateur * bonus;
    }


    document.querySelector('#affichage span').classList.add('aberration_chromatique');
    setTimeout(function() { document.querySelector('#affichage span').classList.remove('aberration_chromatique'); }, 200);
    montrons_bouttons();
    affichage();
    document.getElementById('clic').innerHTML = "Clic !";
}
```
Nous pouvons observer que le score ne change qu'en fonction du clic, multiplicateur et bonus (ce qui est normal vu que l'autoclic se sert l'incrémentation) mais il met actuellement impossible d'expliquer pourquoi les changements que j'apporte dans leurs fonctions respectives ne font pas effet:

```javascript
//Le multiplicateur (on ne s'en saurait douter)
function augmenterMultiplicateur() {
    score -= multi_prix;
    multiplicateur++;
    click = multiplicateur;
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
    dispo_bonus = 0;
    bonus_tps = 30;
    montre_bonus();
    montrons_bouttons();
    bonus_actif();
}

function bonus_actif() {
    if (dispo_bonus === 1) {
        bonus_tps--;
        document.querySelector('#affichage span').classList.add('ArcEnCielFond');
        let bonus_suivant = bonus + 1;
        document.getElementById('bonus').innerHTML = "clics * " + bonus_suivant + " ( " + tps_bonus + " secondes restantes)";


        if (bonus_tps === 0) {
            disparitionBonus();
            document.querySelector('#affichage span').classList.remove('ArcEnCielFond');

        }
    }
}
```

Je travail sur la résolution en priorité mais ça va prendre un bout de temps pour éplucher le soucis!
