//Variables globals
let mines;
let minesVoltant = [];
let perdut = false;
let taulaBody;
let counterMines = document.getElementById("nMines").valueAsNumber;
let countertaula = 0;
let taulapunts = document.getElementById("taulapunts");
let nom;
let intervaltemps;
let minutes;
let seconds;

//Per a guardar la taula de puntuacio de forma local
function guardalocal() {
    document.getElementById("taulapunts").innerHTML = localStorage.getItem("taula")
}



function createTaula(x, y) {
    //Agafem els valors dels inputs de la pagina

    //Si es detecta un element taula existent (longitud més gran que 0)...
    if (document.getElementsByTagName("table").length != 1) {
        //Es borra aquest element
        document.getElementsByTagName("table")[0].remove();
    }
    //Detectem on esta el div del html    
    let tauladiv = document.getElementById("ontaula");
    //La variable taula sera una taula nova
    taula = document.createElement('table');
    //Determinem els borders d'aquesta
    taula.border = '1';

    //Fem el cos de la taula...
    taulaBody = document.createElement('TBODY');
    taulaBody.id = "taulabody";
    taula.appendChild(taulaBody);


    //Fem files fins arribar al valor del input de coordenada y...

    for (let a = 0; a < y; a++) {
        let tr = document.createElement("tr");
        taulaBody.appendChild(tr);

        //I fem columnes fins arribar al input de coordenada x
        for (let b = 0; b < x; b++) {
            let td = document.createElement("td");
            td.width = '50';
            td.height = '50';
            //Afegim un id a cadascuna de les cel·les
            td.id = a + "," + b;
            tr.appendChild(td);
        }

    }
    tauladiv.appendChild(taula);
}



function matriuBinaria(matrix) {
    var matrix2 = [];

    //Amb dos bucles for es recorre la matriu...
    for (var i = 0; i < matrix.length; i++) {
        //Creem una variable que sigui un array per guardar els valors de cada fila
        let fila = [];
        for (var j = 0; j < matrix[0].length; j++) {
            //Si a la fila es troba un quadre blanc...
            if (matrix[i].style.backgroundColor == "white") {
                //Afegim un valor 0
                fila.push(0);
            }
            //Si no es troba un blanc...
            else {
                //Afegim un valor 1
                fila.push(1);
            }
        }
        //Afegim aquesta matriu fila a la matriu "matrix2", això es fa fins quedar-nos sense files
        matrix2.push(fila);
    }
    //Retorna matrix2, que serà una matriu de matrius
    return matrix2;
}

function inicialitzaMines(nMines, cx, cy) {
    //Creem una matriu buida
    let matriu = [];
    //Guardem el valor de mines desitjat en una variable per a poder modificar-la
    let minites = nMines;
    //Recorrem la matriu, i a cada fila fiquem una matriu que sigui tot de 0s igual a l'amplada d'aquesta
    for (let a = 0; a < cy; a++) {
        let fila = [];
        for (let b = 0; b < cx; b++) {
            fila.push(0)
        }
        matriu.push(fila);
    }

    //Mentre hi hagi mines a la nostra variable...
    while (minites != 0) {
        //Calculem una posicio x aleatoria...
        let q = Math.trunc(Math.random() * (cx));
        //... i una posicio y aleatoria...
        let p = Math.trunc(Math.random() * (cy));
        //I si en aquesta posicio no hi ha una mina (és a dir, té valor 1)...
        if (matriu[p][q] != 1) {
            //... li assignem un valor 1
            matriu[p][q] = 1;
            // i reduim en 1 el nostre comptador de mines.
            minites--;
        }
    }

    //Retorna la matriu creada omplerta de 0s i 1s
    return matriu;
}


function pintamines(mines) {
    //Agafem el tbody que tenim el document (fiquem 0 per indicar que agafarà el primer que hi hagi)
    let taula = document.getElementsByTagName("tbody")[0];
    //Recorrem la matriu mines, si troba un valor 1...
    for (let a = 0; a < mines.length; a++) {
        for (let b = 0; b < mines[0].length; b++) {
            if (mines[a][b] == 1) {
                //pintara la mateixa posició en la taula de color vermell
                taula.children[a].children[b].style.backgroundColor = "red";

            }
        }
    }
}


function inicialitzaJoc() {
    perdut = false;
    //Fem servir createTaula per a crear una taula amb les coordenades indicades
    createTaula();
    //Guardem els valors de mines, eixos x i y indicats en variables...
    let nMines = document.getElementById("nMines").valueAsNumber;
    let cx = document.getElementById("cx").valueAsNumber;
    let cy = document.getElementById("cy").valueAsNumber;
    //... en mines guardem la matriu que tindra les dimensions indicades, amb el numero de 1s indicats...
    mines = inicialitzaMines(nMines, cx, cy);
    let y = document.getElementById("cy").value;
    let x = document.getElementById("cx").value;
    //Exercici d'opcions desplegables
    if (document.getElementById("opcions").value == "1") {
        mines = inicialitzaMines(10, 9, 9);
        y = 9;
        x = 9;
    }
    if (document.getElementById("opcions").value == "2") {
        mines = inicialitzaMines(35, 9, 9);
        y = 9;
        x = 9;
    }
    if (document.getElementById("opcions").value == "3") {
        mines = inicialitzaMines(99, 16, 16);
        y = 16;
        x = 16;
    }
    if (document.getElementById("opcions").value == "4") {
        mines = inicialitzaMines(99, 30, 16);
        y = 16;
        x = 30;
    }
    if (document.getElementById("opcions").value == "5") {
        mines = inicialitzaMines(170, 30, 16);
        y = 16;
        x = 30;
    }
    //Fem servir createTaula per a crear una taula amb les coordenades indicades
    createTaula(x, y);
    // i amb la matriu "mines" pintem la taula que hem creat amb createTaula()
    clicaCeles();
    minaVoltant();
    clicaveins();
    bandera();
    guardalocal();
    //Reseteja displays de comptadors de temps, i missatges de perdre/guanyar
    document.getElementById("perds").style.display = "none";
    document.getElementById("guanyes").style.display = "none";
    document.getElementById("comptatemps").style.display = "inline";
    document.getElementById("tempsfinal").style.display = "none";
    //Resetegem el temps i el tornem a començar
    clearInterval(intervaltemps);
    comptatemps();

}

function clicaCeles() {
    //Seleccionem el div on apareixerà la taula
    const grupTD = document.getElementById("ontaula");
    //Funció que saltara quan es cliqui una cel·la
    const celesClicades = e => {

        let coorde = e.target.id.split(',');
        let x = parseInt(coorde[0]);
        let y = parseInt(coorde[1]);
        //Si la cel·la clicada es vermella...
        if (mines[x][y] == 1) {
            //Retornara l'id de la cel·la (és a dir, les coordenades) i dira que és una mina
            console.log(`Les coordenades d'aquesta cel·la són ${e.target.id} i és una mina`);
        }
        //Si no ho és...
        else {
            //Fara el mateix i ens dirà que no és una mina
            console.log(`Les coordenades d'aquesta cel·la són ${e.target.id} i NO és una mina`);
        }
    }
    //A la zona del div que hem dit abans, farem que "escolti" quan es faci click, i que corri la funció abans esmentada
    grupTD.addEventListener("click", celesClicades);
}

//Funcio que li passes la matriu que conte les mines, i la posicio clicada, i et torna el numero de mines que hi ha en una area 3x3
function comptaveins(mines, a, b) {
    let suma = 0;
    for (let c = -1; c <= 1; c++) {
        for (let d = -1; d <= 1; d++) {
            if ((a + c) >= 0 && (b + d) >= 0 && (a + c) < mines.length && (b + d) < mines[0].length) {
                suma += mines[a + c][b + d];
            }
        }
    }
    return suma;
}

//Funcio que guarda en una matriu les mines que hi ha al voltant d'una posicio determinada
function minaVoltant() {
    for (let a = 0; a < mines.length; a++) {
        let fila = [];
        for (let b = 0; b < mines[0].length; b++) {
            fila.push(0);
        }
        minesVoltant.push(fila);
    }
    for (let a = 0; a < mines.length; a++) {
        for (let b = 0; b < mines[0].length; b++) {
            minesVoltant[a][b] = comptaveins(mines, a, b);
        }
    }
}


//Funcio que aplica a la taula del buscamines els 9 valors al voltant de la posicio que s'ha clicat 
//que provenen de la matriu de minesVoltant
function clicaveins() {
    const grupTD = document.getElementById("ontaula");

    const bomba = e => {
        //Si es perd, se surt de la funcio i es para el joc
        if (perdut) return;
        let taula = document.getElementsByTagName("tbody")[0];
        //Quan es fa clic, s'agafa l'id de la casella (que son les coordenades), i ho partim per la coma
        let coorde = e.target.id.split(',');
        //Es guarda cada part en una variable, donant les dues variables
        let x = parseInt(coorde[0]);
        let y = parseInt(coorde[1]);
        let sortir = false;
        for (let a = x - 1; a <= x + 1 && !sortir; a++) {
            for (let b = y - 1; b <= y + 1 && !sortir; b++) {
                try {
                    //Si en la posicio que cliquem, no hi ha una mina...
                    if (mines[x][y] != 1) {
                        if (mines[a][b] != 1) {
                            taula.children[a].children[b].innerHTML = minesVoltant[a][b];
                        }
                    }
                    //Si hi ha una mina, es posarà una bomba a la casella clicada, es mostrara el missatge dient que has perdut, i es parara el joc
                    else {
                        console.log('Has clicat una mina, has perdut capsigrany!');
                        //Aqui s'agafara el missatge de joc perdut (que esta ocult) i es mostrara
                        document.getElementById("perds").style.display = "inline";
                        taula.children[x].children[y].innerHTML = "💣";
                        taula.children[x].children[y].style.backgroundColor = "red";

                        perdut = true;
                        let tempsperdut = document.getElementById("comptatemps").innerHTML;
                        document.getElementById("comptatemps").style.display = "none";
                        document.getElementById("tempsfinal").innerHTML = tempsperdut;
                        document.getElementById("tempsfinal").style.display = "inline";
                        sortir = true;
                    }

                }

                catch {
                }
            }

        }
    }
    grupTD.addEventListener("click", bomba);


}

//Funcio per a posar banderes fent clic dret. Si es fiquen totes als llocs adients, es guanyara
//Si es gasten en llocs incorrectes, es perdrà la partida
function bandera() {
    let matriubanderes = [];
    let cy = document.getElementById("cy").value;
    let cx = document.getElementById("cx").value;
    //Comptador de les banderes que tenim, que sempre han de ser iguals al numero de mines
    let counterFlag = counterMines;
    const grupTD = document.getElementById("ontaula");
    for (let a = 0; a < cy; a++) {
        let filerabandera = [];
        for (let b = 0; b < cx; b++) {
            filerabandera.push(0);
        }
        matriubanderes.push(filerabandera);
    }

    grupTD.oncontextmenu = (e) => {
        //Preventdefault permet fer boto dret sense que surti el tipic menu desplegable
        e.preventDefault();
        let taula = document.getElementsByTagName("tbody")[0];
        let coorde = e.target.id.split(',');
        let x = parseInt(coorde[0]);
        let y = parseInt(coorde[1]);
        if (counterFlag > 0) {
            taula.children[x].children[y].innerHTML = "🚩";
            taula.children[x].children[y].style.backgroundColor = "green";
            counterFlag--;
            matriubanderes[x][y] = 1;
        }
        //Si ens quedem sense banderes, i la matriu de banderes coincideix amb la de mines, es
        //mostra missatge de que hem guanyat
        if (counterFlag == 0 && matriubanderes.toString() == mines.toString()) {
            document.getElementById("guanyes").style.display = "inline";
            let tempsperdut = document.getElementById("comptatemps").innerHTML;
            document.getElementById("comptatemps").style.display = "none";
            document.getElementById("tempsfinal").innerHTML = tempsperdut;
            document.getElementById("tempsfinal").style.display = "inline";
            nom = prompt("Huh, gens malament. Com et dius?");
            if (nom != null) {
                let row = taulapunts.insertRow(countertaula);
                countertaula++;
                let cela1 = row.insertCell(0);
                let cela2 = row.insertCell(1);
                cela1.innerHTML = nom;
                cela2.innerHTML = minutes * 60 + seconds;
                localStorage.setItem("taula", taulapunts.innerHTML);
            }
        }
        //I si no es el cas, es mostra el de que s'ha perdut, i es para el joc
        else if (counterFlag == 0 && matriubanderes.toString() != mines.toString()) {
            document.getElementById("perds").style.display = "inline";
            document.getElementById("tempsfinal").innerHTML = tempsperdut;
            document.getElementById("tempsfinal").style.display = "inline";
            if (perdut) return;
        }
    }
}

function comptatemps() {
    //Calculem la data de quan hem fet clic al boto de jugar
    let countDownDate = new Date();
    if (countDownDate) {
        countDownDate = new Date(countDownDate);

    } else {
        countDownDate = new Date();
        localStorage.setItem('startDate', countDownDate);
    }

    // Actualitza el comptador de temps cada segon
    intervaltemps = setInterval(function () {

        // Agafa la data actual
        let now = new Date().getTime();

        // Agafem la diferencia entre el temps actual i el temps de quan hem fet clic al boto
        let distance = now - countDownDate.getTime();

        // Passem el temps de milisegons a minuts i segons
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Fiquem els minuts i segons dins el html
        document.getElementById("comptatemps").innerHTML = minutes + "m " + seconds + "s ";
    }, 1000);

}

