let mines;
let minesVoltant = [];



function createTaula() {
    //Agafem els valors dels inputs de la pagina
    let y = document.getElementById("cy").value;
    let x = document.getElementById("cx").value;



    //Si es detecta un element taula existent (longitud més gran que 0)...
    if (document.getElementsByTagName("table").length != 0) {
        //Es borra aquest element
        document.getElementsByTagName("table")[0].remove();
    }
    //Detectem on esta el div del html    
    let tauladiv = document.getElementById("ontaula");
    //La variable taula sera una taula nova
    let taula = document.createElement('table');
    //Determinem els borders d'aquesta
    taula.border = '1';

    //Fem el cos de la taula...
    let taulaBody = document.createElement('TBODY');
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
    //Afegim la taula al div
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
    //Fem servir createTaula per a crear una taula amb les coordenades indicades
    createTaula();
    //Guardem els valors de mines, eixos x i y indicats en variables...
    let nMines = document.getElementById("nMines").valueAsNumber;
    let cx = document.getElementById("cx").valueAsNumber;
    let cy = document.getElementById("cy").valueAsNumber;
    //... en mines guardem la matriu que tindra les dimensions indicades, amb el numero de 1s indicats...
    mines = inicialitzaMines(nMines, cx, cy);
    // i amb la matriu "mines" pintem la taula que hem creat amb createTaula()
    clicaCeles();
    minaVoltant();
    clicaveins();
}

function clicaCeles() {
    //Seleccionem el div on apareixerà la taula
    const grupTD = document.getElementById("ontaula");
    //Funció que saltara quan es cliqui una cel·la
    const celesClicades = e => {
        //Si la cel·la clicada es vermella...
        if (e.target.style.backgroundColor == "red") {
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

function clicaveins() {
    const grupTD = document.getElementById("ontaula");
    let taula = document.getElementsByTagName("tbody")[0];
    const bomba = e => {
        let coorde = e.target.id.split(',');
        let x = parseInt(coorde[0]);
        let y = parseInt(coorde[1]);
        for (let a = x - 1; a <= x + 1; a++) {
            for (let b = y - 1; b <= y + 1; b++) {
                try {
                    if (mines[x][y]!=1) {
                        taula.children[a].children[b].innerHTML = minesVoltant[a][b];
                    }
                    else {
                        console.log('Has clicat una mina, has perdut capsigrany!');
                       
                        taula.children[x].children[y].innerHTML = "💣";
                        taula.children[x].children[y].style.backgroundColor="red";
                        grupTD.removeEventListener("click", bomba);
                        break;   
                    }
                }
                catch{

                }
            }
        }
    }
    grupTD.addEventListener("click", bomba);
}

