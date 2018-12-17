/* ---------------------------------- RECUPERER L'URL DE LA PAGE COURANTE -------------------------------------------------- */
/* Une url est composée de :
							protocol : le protocole d'accès (http: ou https:) (Protocole de communication de l'url)
							host : le nom de domaine (Nom de domaine de l'url de la page actuelle)
							pathname : l'arborescence de la page (Chemin de l'url)
							search : les éventuels paramètres passés sur la page (Chaine des paramètres de l'url)
-- LOCATION => http://localhost/morpion/morpion.html?nom=abcdefgh&joueur1=ijklmnopq&joueur2=rstuvwxyz
-- LOCATION.PATHNAME => Le chemin . (/morpion/morpion.html)
-- LOCATION.SEARCH => partie de l'URL qui suit le symbole « ? », avec ce symbole inclus (?nom=abcdefgh&joueur1=ijklmnopq&joueur2=rstuvwxyz)
-- LOCATION.SEARCH.SUBSTRING(1) => Enlève le symbole « ? » qui est le premier caractère (nom=abcdefgh&joueur1=ijklmnopq&joueur2=rstuvwxyz)
-- LOCATION.SEARCH.SUBSTRING(1).SPLIT("&") => récupérer chaque élément du chemin séparé par le symbole « & » dans un tableau (nom=abcdefgh,joueur1=ijklmnopq,joueur2=rstuvwxyz)
 */
// Récupère chaque élément du chemin séparé par le symbole « & » dans un tableau nommé parametres 
var parametres = location.search.substring(1).split("&"); 
var parametres ;
// Index pour le tableau paramètres
var paraIndex = 0;
// Boucle du tableau paramtères 
for (x in parametres)
{
	var temp = parametres[x].split("="); /* Récupère chaque élément séparé par le symbole « = » dans un tableau temporaire*/
	paraNom = unescape(temp[0]); /* noms des paramètres dans un tableau */
	paraValue = unescape(temp[1]); /* valeurs des paramètres dans un tableau */ 
	parametres[paraIndex]= paraValue.replace("+", " "); /* remplacer le symbole « + » par «  » */
	paraIndex++; 
}


/* ---------------------------------- INSERER LE TITRE DE LA PARTIE -------------------------------------------------- */
document.getElementById("titrePartie").innerHTML = parametres[0].replace("+", " "); 


/* -------------------------------------------- MES FONCTIONS -------------------------------------------------- */
// Retourne le nombre de caractères dans la balise bouton
function caseVide(button) {
	return button.innerHTML.length == 0;
}
// Insère le symbole dans la balise bouton
function setSymbol(bouton, symbole) {
	bouton.innerHTML = symbole;
}
// Rechercher combinaisons gagnantes Retourne true en cas de combinaisons gagnantes
function rechercherVainqueur(cases, joueurs, tour) {
	if (cases[0].innerHTML == joueurs[tour] && cases[1].innerHTML == joueurs[tour] && cases[2].innerHTML == joueurs[tour]) {
		cases[0].style.backgroundColor = "#b19cd9";
		cases[1].style.backgroundColor = "#b19cd9";
		cases[2].style.backgroundColor = "#b19cd9";
		return true;
	}

	if (cases[3].innerHTML == joueurs[tour] && cases[4].innerHTML == joueurs[tour] && cases[5].innerHTML == joueurs[tour]) {
		cases[3].style.backgroundColor = "#b19cd9";
		cases[4].style.backgroundColor = "#b19cd9";
		cases[5].style.backgroundColor = "#b19cd9";
		return true;
	}

	if (cases[6].innerHTML == joueurs[tour] && cases[7].innerHTML == joueurs[tour] && cases[8].innerHTML == joueurs[tour]) {
		cases[6].style.backgroundColor = "#b19cd9";
		cases[7].style.backgroundColor = "#b19cd9";
		cases[8].style.backgroundColor = "#b19cd9";
		return true;
	}

  if (cases[0].innerHTML == joueurs[tour] && cases[3].innerHTML == joueurs[tour] && cases[6].innerHTML == joueurs[tour]) {
		cases[0].style.backgroundColor = "#b19cd9";
		cases[3].style.backgroundColor = "#b19cd9";
		cases[6].style.backgroundColor = "#b19cd9";
		return true;
	}

  if (cases[1].innerHTML == joueurs[tour] && cases[4].innerHTML == joueurs[tour] && cases[7].innerHTML == joueurs[tour]) {
		cases[1].style.backgroundColor = "#b19cd9";
		cases[4].style.backgroundColor = "#b19cd9";
		cases[7].style.backgroundColor = "#b19cd9";
		return true;
	}

	if (cases[2].innerHTML == joueurs[tour] && cases[5].innerHTML == joueurs[tour] && cases[8].innerHTML == joueurs[tour]) {
		cases[2].style.backgroundColor = "#b19cd9";
		cases[5].style.backgroundColor = "#b19cd9";
		cases[8].style.backgroundColor = "#b19cd9";
		return true;
	}

  if (cases[0].innerHTML == joueurs[tour] && cases[4].innerHTML == joueurs[tour] && cases[8].innerHTML == joueurs[tour]) {
		cases[0].style.backgroundColor = "#b19cd9";
		cases[4].style.backgroundColor = "#b19cd9";
		cases[8].style.backgroundColor = "#b19cd9";
		return true;
	}

  if (cases[2].innerHTML == joueurs[tour] && cases[4].innerHTML == joueurs[tour] && cases[6].innerHTML == joueurs[tour]) {
		cases[2].style.backgroundColor = "#b19cd9";
		cases[4].style.backgroundColor = "#b19cd9";
		cases[6].style.backgroundColor = "#b19cd9";
		return true;
	}
}
// parcours les cases si elle sont 
function matchNul(cases) {
	for (var i = 0, len = cases.length; i < len; i++) {
		if (cases[i].innerHTML.length == 0) return false;
	}
	return true;
}

var Afficheur = function(element) {
	var affichage = element;
	function setText(message) {
		affichage.innerHTML = message;
	}
	return { sendMessage: setText };
};

function main() {
	var cases = document.querySelectorAll("#Jeu button");
	var joueurs = [parametres[1], parametres[2]];
	var monPion = ["X", "O"];
	var tour = 0;
	var jeuEstFini = false;
	var afficheur = new Afficheur(document.querySelector("#StatutJeu"));
	afficheur.sendMessage(
		"Le jeu peut commencer ! <br /> " +
		joueurs[tour] + " c'est votre tour."
	);
	for (var i = 0, len = cases.length; i < len; i++) {
		cases[i].addEventListener("click", function() {
			if (jeuEstFini) return;
			/*  il ne prend qu'une seule valeur à la fois.sa fonction est d'inverser la valeur qui lui est passée, ainsi true deviendra false et inversement. */
			// Si la taille du bouton n'est pas de 0 alors le boutton est occupé 
			if (!caseVide(this)) {
				afficheur.sendMessage(
					"Case occupée ! <br /> " +
					joueurs[tour] + " c'est toujours à vous !"
				);
			} 
			else {
				// Si la case est vide on met le symbole du joueur
				// La boucle change le joueur et le symbole
				setSymbol(this, monPion[tour]);
				// On regarde si le jeu est fini 
				jeuEstFini = rechercherVainqueur(cases, monPion, tour);
				// Si le jeu est fini on affiche le vainqueur
				if (jeuEstFini) {
					afficheur.sendMessage(
						joueurs[tour] +
						' a gagné ! <br /> <a href="index.html">Rejouer</a>'
					);
					return;
				}
				// Si ya match nul on affiche match nul
				if (matchNul(cases)) {
					afficheur.sendMessage(
						'Match Nul ! <br/> <a href="index.html">Rejouer</a>'
					);
					return;
				}
				// Incrémente le tour pour passer de 0 à 1
				tour++;
				// Modulo pour que le tour reste toujours à 0 ou 1 
				tour = tour % 2;
				// On affiche le tour du joueur
				afficheur.sendMessage(joueurs[tour] + " c'est à vous !");
			}
		});
	}
}

main();

