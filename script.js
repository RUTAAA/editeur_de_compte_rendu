// VARIABLES GLOBALES

var identifiant = 0;
var totalParties = 0;



const cross =
    '<svg viewBox="0 0 1024 1024"><path d="M810.65984 170.65984q18.3296 0 30.49472 12.16512t12.16512 30.49472q0 18.00192-12.32896 30.33088l-268.67712 268.32896 268.67712 268.32896q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-268.32896-268.67712-268.32896 268.67712q-12.32896 12.32896-30.33088 12.32896-18.3296 0-30.49472-12.16512t-12.16512-30.49472q0-18.00192 12.32896-30.33088l268.67712-268.32896-268.67712-268.32896q-12.32896-12.32896-12.32896-30.33088 0-18.3296 12.16512-30.49472t30.49472-12.16512q18.00192 0 30.33088 12.32896l268.32896 268.67712 268.32896-268.67712q12.32896-12.32896 30.33088-12.32896z"/></svg>';
const arrowUp =
    '<svg viewBox="0 0 1024 1024"><path d="M512 85.34016q18.00192 0 30.33088 12.32896l298.65984 298.65984q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-225.66912-225.9968 0 665.00608q0 17.67424-12.4928 30.16704t-30.16704 12.4928-30.16704-12.4928-12.4928-30.16704l0-665.00608-225.66912 225.9968q-12.32896 12.32896-30.33088 12.32896-18.3296 0-30.49472-12.16512t-12.16512-30.49472q0-18.00192 12.32896-30.33088l298.65984-298.65984q12.32896-12.32896 30.33088-12.32896z"/></svg>';
const arrowDown =
    '<svg viewBox="0 0 1024 1024"><path d="M512 85.34016q17.67424 0 30.16704 12.4928t12.4928 30.16704l0 665.00608 225.66912-225.9968q12.32896-12.32896 30.33088-12.32896 18.3296 0 30.49472 12.16512t12.16512 30.49472q0 18.00192-12.32896 30.33088l-298.65984 298.65984q-12.32896 12.32896-30.33088 12.32896t-30.33088-12.32896l-298.65984-298.65984q-12.32896-12.32896-12.32896-30.33088 0-18.3296 12.16512-30.49472t30.49472-12.16512q18.00192 0 30.33088 12.32896l225.66912 225.9968 0-665.00608q0-17.67424 12.4928-30.16704t30.16704-12.4928z"/></svg>';



const boutonsQuaternaires =
    '<div class="divBoutonsQuaternaires"><button onclick="supprimerElement(this.parentElement.parentElement);">' +
    cross +
    '</button><button onclick="monterElement(this.parentElement.parentElement);">' +
    arrowUp +
    '</button><button onclick="descendreElement(this.parentElement.parentElement);">' +
    arrowDown +
    "</button></div>";

const boutonsTertiaires =
    '<div class="divBoutonsTertiaires"><button onclick="ajouterSousPartie(indice de la partie)">Nouvelle sous-partie</button><button onclick="ajouterParagraphe(indice de la partie)">Ajouter un paragraphe</button><button onclick="ajouterCode(indice de la partie)">Ajouter du code</button><input id="bouttonImageindice de la partie" type="file" onchange="ajouterImage(this, indice de la partie)" value="Ajouter une image" /></div>';
const boutonsSecondaires =
    '<div class="divBoutonsSecondaires"><button onclick="supprimerPartie(indice de la partie);">' +
    cross +
    '</button><button onclick="monterPartie(indice de la partie);">' +
    arrowUp +
    '</button><button onclick="descendrePartie(indice de la partie);">' +
    arrowDown +
    "</button></div>";



const partie =
    '<div class="partie"><div class="topPartie"><h2><li contenteditable="true">Partie numero de la partie</li></h2>' +
    boutonsSecondaires +
    "</div>" +
    boutonsTertiaires +
    "</div>";
const sousPartie = "";



const paragraphe = '<div><p contenteditable="true">Description descriptive s\'il vous please.</p>'+boutonsQuaternaires+'</div>';
const code =
    '<div><div class="code"><code spellcheck="false" contenteditable="true">import nothing<br /><br />#commenter est important<br />def rien():<br />&nbsp;&nbsp;&nbsp;&nbsp;print("Hello World")<br /><br />rien()</code></div>'+boutonsQuaternaires+'</div>';
const image = '<div><img src="">'+boutonsQuaternaires+'</div>';





// FONCTIONS

function date() {
    const date = new Date();
    let jour = date.getDate();
    let mois = date.getMonth();
    let annee = date.getFullYear();
    document.getElementById("date").innerText =
        String(jour).padStart(2, "0") + "/" + String(mois + 1).padStart(2, "0") + "/" + annee;
}

function exporter() {
    document.querySelector(":root").style.setProperty("--cacher", "none");
    window.print();
    document.querySelector(":root").style.setProperty("--cacher", "inline-block");
}

function sauvegarder() {
    alert("Non pris en charge pour le moment.");
}



function ajouterPartie() {
    totalParties++;
    let cettePartie = partie.replace(/indice de la partie/g, ++identifiant);
    cettePartie = cettePartie.replace(/numero de la partie/g, totalParties);
    const content = document.getElementById("content");
    content.innerHTML += cettePartie;
    content.lastChild.id = identifiant;
}
function supprimerPartie(n) {
    document.getElementById(n).remove();
    totalParties--;
}

function monterPartie(n) {
    const content = document.getElementById("content");
    for (let i = 1; i < content.children.length; i++) {
        if (content.children[i].id == n) {
            let x = content.children[i];
            let y = document.getElementById(x.id).previousSibling;
            document.getElementById(x.id).outerHTML = content.children[i - 1].outerHTML;
            y.outerHTML = x.outerHTML;
        }
    }
}
function descendrePartie(n) {
    const content = document.getElementById("content");
    for (let i = 0; i < content.children.length-1; i++) {
        if (content.children[i].id == n) {
            let x = content.children[i];
            let y = document.getElementById(x.id).nextSibling;
            document.getElementById(x.id).outerHTML = content.children[i + 1].outerHTML;
            y.outerHTML = x.outerHTML;
        }
    }
}

function placerDivBoutonsTertiaires(n) {
    let partie = document.getElementById(n)
    for (let i = 0; i < partie.children.length; i++) {
        if (partie.children[i].className == "divBoutonsTertiaires") {
            document.getElementById(n).innerHTML += partie.children[i].outerHTML;
            partie.children[i].remove()
        }
    }
}

function ajouterParagraphe(n) {
    document.getElementById(n).innerHTML += paragraphe;
    document.getElementById(n).lastChild.id = n + "." + ++identifiant;
    placerDivBoutonsTertiaires(n)
}
function ajouterCode(n) {
    document.getElementById(n).innerHTML += code;
    document.getElementById(n).lastChild.id = n + "." + ++identifiant;
    placerDivBoutonsTertiaires(n)
}
function ajouterImage(element, n) {
    let url = URL.createObjectURL(element.files[0]);
    document.getElementById(n).innerHTML += image;
    document.getElementById(n).lastChild.id = n + "." + ++identifiant;
    document.getElementById(n).lastChild.firstChild.src = url
    placerDivBoutonsTertiaires(n)
}

function supprimerElement(element) {
    element.remove();
}

function ajouterSousPartie() {
    alert("Non pris en charge pour le moment.");
}

function monterElement(element) {
    if(element.previousSibling == null || element.previousSibling.className == "topPartie") {
        return
    }
    let x = element.previousSibling.outerHTML;
    element.previousSibling.outerHTML = element.outerHTML;
    element.outerHTML = x;
}
function descendreElement(element) {
    if(element.nextSibling == null || element.nextSibling.className == "divBoutonsTertiaires") {
        return
    }
    let x = element.nextSibling.outerHTML;
    element.nextSibling.outerHTML = element.outerHTML;
    element.outerHTML = x;
}
