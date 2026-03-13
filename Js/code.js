// ========== Modo Oscuro ==========
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    let moon = document.getElementById('iconMoon');
    let sun = document.getElementById('iconSun');
    if (document.body.classList.contains('dark-mode')) {
        moon.style.display = 'none';
        sun.style.display = 'block';
        document.getElementById('darkModeBtn').title = 'Modo Claro';
        localStorage.setItem('darkMode', 'true');
    } else {
        moon.style.display = 'block';
        sun.style.display = 'none';
        document.getElementById('darkModeBtn').title = 'Modo Oscuro';
        localStorage.setItem('darkMode', 'false');
    }
}

// Restaurar preferencia guardada
(function () {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.addEventListener('DOMContentLoaded', function () {
            let moon = document.getElementById('iconMoon');
            let sun = document.getElementById('iconSun');
            if (moon && sun) {
                moon.style.display = 'none';
                sun.style.display = 'block';
                document.getElementById('darkModeBtn').title = 'Modo Claro';
            }
        });
    }
})();

var can = 71;

let intervaloCronometro;

menu();
function menu() {
    let txt = "";
    let grupoSize = 10;
    let totalGrupos = Math.ceil(can / grupoSize);

    for (let g = 0; g < totalGrupos; g++) {
        let inicio = g * grupoSize + 1;
        let fin = Math.min((g + 1) * grupoSize, can);
        let abierto = g === 0; // primer grupo abierto por defecto

        txt += "<li class='menu-grupo'>";
        txt += "<div class='grupo-header" + (abierto ? " activo" : "") + "' onclick='toggleGrupo(this)'>";
        txt += "<span class='grupo-flecha'>" + (abierto ? "▼" : "▶") + "</span> ";
        txt += "Eje " + inicio + " - " + fin;
        txt += "</div>";
        txt += "<ul class='grupo-lista'" + (abierto ? "" : " style='display:none'") + ">";

        for (let i = inicio; i <= fin; i++) {
            txt += "<li>";
            txt += "<a href='#' onclick='mosEje(" + i + ")'>";
            txt += "Ejercicio No." + i;
            txt += "</a>";
            txt += "</li>";
        }

        txt += "</ul>";
        txt += "</li>";
    }
    document.getElementById("menu").innerHTML = txt;
}

function toggleGrupo(header) {
    let lista = header.nextElementSibling;
    let flecha = header.querySelector('.grupo-flecha');
    if (lista.style.display === 'none') {
        lista.style.display = 'block';
        flecha.textContent = '▼';
        header.classList.add('activo');
    } else {
        lista.style.display = 'none';
        flecha.textContent = '▶';
        header.classList.remove('activo');
    }
}

let ejercicioActivo = 1;
mosEje(ejercicioActivo);
function mosEje(ne) {

    if (intervaloCronometro) {
        clearInterval(intervaloCronometro);
    }

    ejercicioActivo = ne;
    let txt = "";
    txt += "<h2>Ejercicio No." + ne + "</h2>";
    txt += "<hr>";

    for (let i = 1; i <= can; i++) {
        document.getElementById("eje" + i).style.display = "none";
    }

    document.getElementById("tit").innerHTML = txt;
    document.getElementById("res").innerHTML = "";
    document.getElementById("eje" + ne).style.display = "inherit";

    // Mostramos directamente el ticket en caso de entrar al ejercicio 61
    if (ne === 61) {
        mostrarCarritoEje61();
    }
    if (ne === 11) {
        document.getElementById("boton-maestro").style.display = "none";
        eje11();
    } else {
        document.getElementById("boton-maestro").style.display = "";
    }
}

const botonMaestro = document.querySelector("#boton-maestro");
botonMaestro.addEventListener("click", function () {
    if (typeof window["eje" + ejercicioActivo] === "function") {
        window["eje" + ejercicioActivo]();
    } else {
        console.error("la función eje" + ejercicioActivo + " todavía no existe.");
    }
});

function eje1() {
    let v1 = parseInt(document.getElementById("e1v1").value);
    let v2 = parseInt(document.getElementById("e1v2").value);
    let txt = "";
    txt += "suma:   " + v1 + " + " + v2 + " = " + (v1 + v2) + "<br>";
    txt += "resta:   " + v1 + " - " + v2 + " = " + (v1 - v2) + "<br>";
    txt += "Multiplicacion:   " + v1 + " * " + v2 + " = " + (v1 * v2) + "<br>";
    if (v2 === 0) {
        txt += "Division imposible por cero";
    }
    else {
        txt += "división:   " + v1 + " / " + v2 + " = " + (v1 / v2);
    }
    document.getElementById("res").innerHTML = txt;
}

function eje2() {
    let v1 = parseInt(document.getElementById("e2v1").value);
    let v2 = parseInt(document.getElementById("e2v2").value);
    let txt = "";
    if (v1 > v2) {
        txt += "El numero mayor es: " + v1;
    }
    else if (v2 > v1) {
        txt += "El numero mayor es: " + v2;
    }
    else {
        txt += "Los numeros son iguales";
    }
    document.getElementById("res").innerHTML = txt;
}

function eje3() {
    let v1 = parseInt(document.getElementById("e3v1").value);
    let txt = "";
    if (v1 > 100) {
        txt += "El numero es mayor a 100";
    } else if (v1 < 100) {
        txt += "El numero es menor a 100";
    } else if (v1 == 100) {
        txt += "El numero es igual a 100";
    }
    document.getElementById("res").innerHTML = txt;
}

function eje4() {
    let v1 = parseInt(document.getElementById("e4v1").value);
    let v2 = parseInt(document.getElementById("e4v2").value);
    let v3 = parseInt(document.getElementById("e4v3").value);
    let txt = "";
    if (v1 < v2 && v1 < v3) {
        txt += +v1 + " ";
        if (v2 < v3) {
            txt += +v2 + " " + v3;
        } else {
            txt += +v3 + " " + v2;
        }
    } else if (v2 < v1 && v2 < v3) {
        txt += +v2 + " ";
        if (v1 < v3) {
            txt += +v1 + " " + v3;
        } else {
            txt += +v3 + " " + v1;
        }
    } else if (v3 < v1 && v3 < v2) {
        txt += +v3 + " ";
        if (v1 < v2) {
            txt += +v1 + " " + v2;
        } else {
            txt += +v2 + " " + v1;
        }
    }
    document.getElementById("res").innerHTML = txt;
}

function eje5() {
    let v1 = parseFloat(document.getElementById("e5v1").value);
    let v2 = parseFloat(document.getElementById("e5v2").value);
    let v3 = parseFloat(document.getElementById("e5v3").value);
    let txt = "";
    let suma = (v1 + v2 + v3) / 3;
    if (suma >= 3.5) {
        txt += "su resultado es: " + suma + " Aprobado";
    } else if (suma < 3.5) {
        txt += "su resultado es: " + suma + " Reprobado";
    }
    document.getElementById("res").innerHTML = txt;
}

function eje6() {
    let v1 = parseFloat(document.getElementById("e6v1").value);
    let v2 = parseFloat(document.getElementById("e6v2").value);
    let txt = "";
    let area = (v1 * v2) / 2;
    txt += "El área del triangulo es: " + area;
    document.getElementById("res").innerHTML = txt;
}

function eje7() {
    let v1 = parseInt(document.getElementById("e7v1").value);
    let txt = "";
    if (v1 % 2 == 0 && v1 > 0) {
        txt += v1 + " es un número par";
    } else if (v1 % 2 != 0) {
        txt += v1 + " es un número impar";
    } else if (v1 == 0) {
        txt += v1 + " es un número neutro";
    } else if (v1 < 0) {
        txt += v1 + " es un número negativo";
    }
    document.getElementById("res").innerHTML = txt;
}

function eje8() {
    let v1 = document.getElementById("e8v1").value;
    let v2 = parseInt(document.getElementById("e8v2").value);
    let txt = "";
    if (v1 == "rojo") {
        txt += "El valor del descuento es de: $" + (v2 * 4000 * 0.10);
    } else if (v1 == "blanco") {
        txt += "El valor del descuento es de: $" + (v2 * 5000 * 0.08);
    } else if (v1 == "negro") {
        txt += "El valor del descuento es de: $" + (v2 * 18000 * 0.15);
    } else {
        txt += "El valor del descuento es de: $" + (v2 * 6000 * 0.02);
    }
    document.getElementById("res").innerHTML = txt;
}

function eje9() {
    let v1 = parseInt(document.getElementById("e9v1").value);
    let v2 = parseFloat(document.getElementById("e9v2").value);
    let txt = "";

    if (v1 > 0 && v1 <= 20) {
        txt += "La ganancia es de: $" + (v2 * 0.05);
    } else if (v1 > 20 && v1 <= 50) {
        txt += "La ganancia es de: $" + (v2 * 0.10);
    } else if (v1 > 50 && v1 <= 80) {
        txt += "La ganancia es de: $" + (v2 * 0.15);
    } else if (v1 > 80 && v1 <= 100) {
        txt += "La ganancia es de: $" + (v2 * 0.20);
    } else {
        txt += "el rango es entre 0 y 100<br>";
    }

    document.getElementById("res").innerHTML = txt;
}

function eje10() {
    let mar = document.getElementById("e10v1").value;
    let mod = document.getElementById("e10v2").value;
    let pre = parseFloat(document.getElementById("e10v3").value);
    let col = document.getElementById("e10v4").value;
    let des, txt = "";

    if (col == "verde") {
        des = 0.15;
    } else if (mod < 1990) {
        des = 0.2;
    } else if (col == "Rojo" && mod >= 1995) {
        des = 0.10;
    } else {
        des = 0.0;
    }

    txt += "<table>";
    txt += "<tr>";
    txt += "<br><th colspan='2' style='text-align:center'>" + mar + "</th>";
    txt += "</tr>";
    txt += "<tr>";
    txt += "<td>Modelo:</td>";
    txt += "<th>" + mod + "</th>";
    txt += "</tr>";
    txt += "<tr>";
    txt += "<td>Precio:</td>";
    txt += "<th>$" + pre + "</th>";
    txt += "</tr>";
    txt += "<tr>";
    txt += "<td>Descuento: (" + (des * 100) + "%):</td>";
    txt += "<th>$" + (pre * des) + "</th>";
    txt += "</tr>";
    txt += "<tr>";
    txt += "<td>Precio final:</strong></td>";
    txt += "<th>$" + (pre - (pre * des)) + "</th>";
    txt += "</tr>";
    txt += "</table>";

    document.getElementById("res").innerHTML = txt;
}

function eje11() {
    let txt = "";
    let i = 200;
    txt += "<h3>Decremento</h3>";
    while (i > 0) {
        txt += i + " ";
        i = i - 3;
    }
    txt += "<br><h3>Incremento</h3>";
    for (i = 0; i <= 200; i = i + 3) {
        txt += i + " ";
    }

    document.getElementById("res").innerHTML = txt;
}

function eje12() {
    let txt = "";
    let A = 0, B = 1, C = 0;
    let n = parseInt(document.getElementById("e12v1").value);
    if (n >= 10 && n <= 50) {
        txt += A + " " + B + " ";
        for (let i = 3; i <= n; i++) {
            C = A + B;
            A = B;
            B = C;
            txt += C + " ";
        }
    } else {
        txt += "El numero debe ser entre 10 y 50";
    }

    document.getElementById("res").innerHTML = txt;

}

function eje13() {
    let n = parseInt(document.getElementById("e13v1").value);
    mostrarprimos(n);
}

function miprimo(r) {
    if (r < 2) return false;

    let primo = true;

    for (let d = 2; d < r; d++) {
        if ((r % d) == 0) {
            primo = false;
            break;
        }
    }
    return primo;
}
function mostrarprimos(g) {
    if (g >= 1 && g <= 100) {
        let i = 0;
        let n = 1;
        let txt = "";

        while (i < g) {
            if (miprimo(n)) {
                txt += n + " ";
                i++;
            }
            n++;
        }
        document.getElementById("res").innerHTML = txt;
    }
}

function eje14() {
    let n = parseInt(document.getElementById("e14v1").value);
    let txt = "";
    let sP = 0, sI = 0;
    let cP = 0, cI = 0;
    if (n < 10) {
        txt += "El numero debe ser mayor a 10";
        document.getElementById("res").innerHTML = txt;
        return;
    }

    for (let i = 1; i <= n; i++) {

        if (i % 2 == 0) {
            txt += i + "[par]<br>";
            sP += i;
            cP++;
        } else {
            txt += i + "[impar]<br>";
            sI += i;
            cI++;
        }
    }
    let rP = sP - sI;
    let rI = sI - sP;
    let pP = sP / cP;
    let pI = sI / cI;
    let dS = sP - sI;

    txt += "<br>La suma de los pares es: " + sP;
    txt += "<br>La suma de los impares es: " + sI;
    txt += "<br>La resta de los pares: " + rP;
    txt += "<br>La resta de los impares: " + rI;
    txt += "<br>El promedio de los pares es: " + pP;
    txt += "<br>El promedio de los impares es: " + pI;
    txt += "<br>La diferencia entre la suma pares y la suma impares es: " + dS;
    document.getElementById("res").innerHTML = txt;
}

function eje15() {
    let opcion = document.getElementById("e15v1").value;
    let J = parseFloat(document.getElementById("e15v2").value);
    let K = parseFloat(document.getElementById("e15v3").value);
    let L = parseFloat(document.getElementById("e15v4").value);
    let txt = "";
    if (opcion < 1 || opcion > 5) {
        txt += "La opcion tiene que ser de 1 a 5";
    }

    if (opcion == 1) {
        txt += "La suma es: " + (J + K);
    } else if (opcion == 2) {
        if (K != 0) {
            txt += "El residuo es: " + (J % K);
        } else {
            txt += "No se puede dividir por cero";
        }
    } else if (opcion == 3) {
        if (K != 0) {
            txt += "La división es: " + (J / K);
        } else {
            txt += "No se puede dividir por cero";
        }
    } else if (opcion == 4) {
        txt += "La suma incremental es: " + (J + K + L);
    } else if (opcion == 5) {
        txt += "La Multiplicacion es: " + (J * K * L);
    } else {
        txt += "La opcion tiene que ser de 1 a 5";
    }
    document.getElementById("res").innerHTML = txt;
}

function eje16() {
    let n = parseInt(document.getElementById("e16v1").value);
    let txt = "";
    if (n <= 3) {
        txt += "El numero debe ser mayor a 3";
    } else {
        if (n % 2 == 0 && n % 3 == 0) {
            txt += n + " es divisible entre 2 y 3";
        } else {
            txt += n + " no es divisible entre 2 y 3";
        }
    }
    document.getElementById("res").innerHTML = txt;
}

function eje17() {
    let n1 = parseInt(document.getElementById("e17v1").value);
    let n2 = parseInt(document.getElementById("e17v2").value);
    let txt = "";

    if (n1 < 4 || n2 < 4) {
        txt += "Los numeros deben ser mayores a 4.";
    }
    if (n1 <= n2) {
        txt += "El primer numero debe ser mayor que el segundo.";
    }

    for (let i = n2; i <= n1; i++) {
        let esprimo = true;

        for (let j = 2; j * j <= i; j++) {
            if (i % j == 0) {
                esprimo = false;
                break;
            }
        }
        if (esprimo) {
            txt += i + " ";
        }
    }
    document.getElementById("res").innerHTML = txt;
}

function eje18() {
    let res = document.getElementById("res");

    // Si ya existe un cronómetro corriendo, lo detenemos para no acumularlos
    if (intervaloCronometro) {
        clearInterval(intervaloCronometro);
    }

    let h = 0, m = 0, s = 0;

    // setInterval ejecuta una función cada cierto tiempo (1000ms = 1 segundo)
    intervaloCronometro = setInterval(function () {
        s++; // aumentar un segundo cada vez

        if (s > 59) { s = 0; m++; }
        if (m > 59) { m = 0; h++; }
        if (h > 23) { h = 0; }

        let hh = h.toString().padStart(2, '0');
        let mm = m.toString().padStart(2, '0');
        let ss = s.toString().padStart(2, '0');

        // Sobre-escribe el contenido del 'res' en vez de imprimirlo todo al tiempo
        res.innerHTML = "<h4>Cronómetro:</h4>" + hh + ":" + mm + ":" + ss;
    }, 1000);
}

function eje19() {
    let n = parseInt(document.getElementById("e19v1").value);
    let txt = "";

    txt += "<h4>Tabla de multiplicar del " + n + "</h4>";
    for (let i = 1; i <= 10; i++) {
        txt += n + " x " + i + " = " + (n * i) + "<br>";
    }
    document.getElementById("res").innerHTML = txt;
}

function eje20() {
    let n = 0, cp = 0, ci = 0, cpr = 0, cnpr = 0;
    let txt = "";
    let listaPrimos = "";
    for (let t = 1; t <= 50; t++) {
        n = Math.floor(Math.random() * 95) + 4;
        txt += t + ". \t" + n;
        if (n % 2 == 0) {
            txt += " \t [Par]";
            cp++;
        } else {
            txt += " \t [Impar]";
            ci++;
        }
        if (miprimo(n)) {
            txt += " \t [Primo]";
            cpr++;
            listaPrimos += n + " ";
        } else {
            cnpr++;
        }

        txt += "<br>";
    }
    txt += "<hr>";
    txt += "Cantidad de pares: \t" + cp + "<br>";
    txt += "Cantidad de impares: \t" + ci + "<br>";
    txt += "Cantidad de primos: \t" + cpr + "<br>";
    txt += "Cantidad de no primos: \t" + cnpr + "<br>";
    txt += "<strong>Números primos generados:</strong> " + listaPrimos;

    document.getElementById("res").innerHTML = txt;
}

function eje21() {
    let n = parseInt(document.getElementById("e21v1").value);
    let a = parseInt(document.getElementById("e21v2").value);
    let txt = "";
    txt += "El resultado de la suma es: " + (n + a);
    document.getElementById("res").innerHTML = txt;
}

function eje22() {
    let n1 = parseFloat(document.getElementById("e22v1").value);
    let n2 = parseFloat(document.getElementById("e22v2").value);
    let n3 = parseFloat(document.getElementById("e22v3").value);
    let n4 = parseFloat(document.getElementById("e22v4").value);
    let txt = "";
    let promedio = (n1 + n2 + n3 + n4) / 4;
    txt += "El promedio de las notas es: " + promedio;
    document.getElementById("res").innerHTML = txt;
}

function eje23() {
    let n1 = parseFloat(document.getElementById("e23v1").value);
    let n2 = parseFloat(document.getElementById("e23v2").value);
    let txt = "";
    txt += "El area del rectangulo es: " + (n1 * n2);
    document.getElementById("res").innerHTML = txt;
}

function eje24() {
    let n1 = parseFloat(document.getElementById("e24v1").value);
    const PI = 3.1416;
    let area = PI * n1 ** 2;
    let txt = "";

    txt += "El area del circulo es: " + area.toFixed(2);
    document.getElementById("res").innerHTML = txt;
}

function eje25() {
    let n1 = parseFloat(document.getElementById("e25v1").value);
    let n2 = parseFloat(document.getElementById("e25v2").value);
    let n3 = parseFloat(document.getElementById("e25v3").value);
    let AT = (n1 * n2) - (n3) / 2;
    let AR = (n1 * n3);
    let Area = AT + AR;
    let txt = "";
    txt += "El area del terreno es: " + Area.toFixed(2);
    document.getElementById("res").innerHTML = txt;
}

function eje26() {
    let n1 = parseFloat(document.getElementById("e26v1").value);
    let n2 = parseFloat(document.getElementById("e26v2").value);
    const PI = 3.1416;
    let C = Math.sqrt(n2 ** 2 + n1 ** 2);
    let AT = (n1 * C);
    let AC = (PI * n2 ** 2) / 2;
    let Area = AT + AC;
    let txt = "";
    txt += "Cateto faltante: (Altura) " + C.toFixed(2) + "<br>";
    txt += "Area del los triangulos: " + AT.toFixed(2) + "<br>";
    txt += "Area del semicírculo: " + AC.toFixed(2) + "<br>";
    txt += "El area del terreno es: " + Area.toFixed(2);
    document.getElementById("res").innerHTML = txt;
}

function eje27() {
    let L = parseFloat(document.getElementById("e27v1").value);
    let PG = parseFloat(document.getElementById("e27v2").value);
    const CONV = 3.785;
    let TG, GA;
    let txt = "";
    TG = L / CONV;
    GA = TG * PG;
    txt += "<h4>--- Sistema de Liquidación Lechera ---</h4>";
    txt += "Producción total: <strong>" + TG.toFixed(2) + " galones</strong><br>";
    txt += "Precio por galón: <strong>$" + PG.toLocaleString() + "</strong><br>";
    txt += "<hr>";
    txt += "<h3>TOTAL A RECIBIR: $" + GA.toLocaleString(undefined, { minimumFractionDigits: 2 }) + "</h3>";
    document.getElementById("res").innerHTML = txt;
}

function eje28() {

    let X1 = parseFloat(document.getElementById("e28v1").value);
    let Y1 = parseFloat(document.getElementById("e28v2").value);
    let X2 = parseFloat(document.getElementById("e28v3").value);
    let Y2 = parseFloat(document.getElementById("e28v4").value);

    let txt = "";

    let X = X2 - X1;
    let Y = Y2 - Y1;
    let D = Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2));
    txt += "<h4>--- Calculador de Distancia entre Puntos ---</h4>";
    txt += "Cateto X (Horizontal): <strong>" + X.toFixed(2) + "</strong><br>";
    txt += "Cateto Y (Vertical): <strong>" + Y.toFixed(2) + "</strong><br>";
    txt += "<hr>";
    txt += "<h3>DISTANCIA TOTAL (D): " + D.toFixed(4) + "</h3>";

    document.getElementById("res").innerHTML = txt;
}

function eje29() {
    let n1 = parseFloat(document.getElementById("e29v1").value);
    const MP = 0.0254;
    if (n1 < 0) {
        document.getElementById("res").innerHTML = "La longitud no puede ser negativa.";
        return;
    }
    let PG = n1 / MP;
    let txt = "";
    txt += "<h4>--- Convertidor de Pulgadas a Metros ---</h4>";
    txt += "Longitud en pulgadas: <strong>" + n1.toLocaleString() + " in</strong><br>";
    txt += "<hr>";
    txt += "<h3>Longitud convertida: " + PG.toFixed(4) + " m</h3>";
    document.getElementById("res").innerHTML = txt;
}

function eje30() {
    let n1 = parseFloat(document.getElementById("e30v1").value);
    let n2 = parseFloat(document.getElementById("e30v2").value);
    let n3 = parseFloat(document.getElementById("e30v3").value);
    let n4 = parseFloat(document.getElementById("e30v4").value);
    let txt = "";
    let V = (n1 * n2 * n3);
    let PAG = V * n4;

    txt += "<h4>--- Calculo de pago por llenado de alberca ---</h4>";
    txt += "Volumen de la alberca: <strong>" + V.toLocaleString() + " m³</strong><br>";
    txt += "<h3>El pago total es: $" + PAG.toLocaleString(undefined, { minimumFractionDigits: 2 }) + "</h3>";
    document.getElementById("res").innerHTML = txt;
}

function eje31() {
    let n = [], p = [], i = [], cp = 0, ci = 0;
    let c = parseFloat(document.getElementById("e31v1").value);
    let txt = "";
    if (c > 0 && c <= 1000) {
        txt = "<h3>Listado de valores</h3><br>";
        for (let t = 0; t < c; t++) {
            n.push(Math.floor(Math.random() * 2000) + 1);
            txt += n[t] + "  ";
            if ((n[t] % 2) == 0) {
                p.push(n[t]);
                cp++;
            } else {
                i.push(n[t]);
                ci++;
            }
        }
        //mostrar
        txt += "<br><hr><h3>Listado de pares: " + cp + "</h3><br>";
        for (t = 0; t < cp; t++) txt += p[t] + "  ";
        txt += "<br><hr><h3>Listado de impares: " + ci + "</h3><br>";
        for (t = 0; t < ci; t++) txt += i[t] + "  ";
    } else {
        txt += "Solo se permiten valores entre 1 y 1000";
    }

    document.getElementById("res").innerHTML = txt;
}

function eje32() {
    let NUM = parseFloat(document.getElementById("e32v1").value);
    let R = NUM >= 0 ? "POSITIVO" : "NEGATIVO";
    document.getElementById("res").innerHTML = "El numero es: " + R;
}

function eje33() {
    let X = parseInt(document.getElementById("e33v1").value);
    let PAG = X >= 1000 ? X * 0.85 : X * 0.90;
    document.getElementById("res").innerHTML = "Total a pagar: $" + PAG.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

function eje34() {
    let CT = parseFloat(document.getElementById("e34v1").value);
    let DE = CT > 2500.00 ? CT * 0.15 : CT * 0.08;
    let PF = CT - DE;
    document.getElementById("res").innerHTML = "Descuento obtenido: $" + DE.toLocaleString(undefined, { minimumFractionDigits: 2 }) + "<br>Precio final a pagar: $" + PF.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

function eje35() {
    let A = parseFloat(document.getElementById("e35v1").value);
    let B = parseFloat(document.getElementById("e35v2").value);
    let C = parseFloat(document.getElementById("e35v3").value);
    let M;
    if (A >= B && A >= C) M = A;
    else if (B >= A && B >= C) M = B;
    else M = C;
    document.getElementById("res").innerHTML = "El valor mayor de los tres es: " + M;
}

function eje36() {
    let NP = parseInt(document.getElementById("e36v1").value);
    let TOT;
    if (NP > 300) TOT = NP * 75.00;
    else if (NP > 200) TOT = NP * 85.00;
    else TOT = NP * 95.00;
    document.getElementById("res").innerHTML = "El costo total del banquete es: $" + TOT.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

function eje37() {
    let TI = document.getElementById("e37v1").value;
    let TA = parseInt(document.getElementById("e37v2").value);
    let P = parseFloat(document.getElementById("e37v3").value);
    let K = parseFloat(document.getElementById("e37v4").value);
    if (TI === "A" || TI === "a") {
        P += TA === 1 ? 0.20 : 0.30;
    } else {
        P -= TA === 1 ? 0.30 : 0.50;
    }
    let GA = P * K;
    document.getElementById("res").innerHTML = "La ganancia total es: $" + GA.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

function eje38() {
    let NA = parseInt(document.getElementById("e38v1").value);
    let PA, TOT;
    if (NA >= 100) { PA = 65.00; TOT = NA * PA; }
    else if (NA >= 50) { PA = 70.00; TOT = NA * PA; }
    else if (NA >= 30) { PA = 95.00; TOT = NA * PA; }
    else { TOT = 4000.00; PA = TOT / NA; }
    document.getElementById("res").innerHTML = "Pago por alumno: $" + PA.toLocaleString(undefined, { minimumFractionDigits: 2 }) + "<br>Pago total a la empresa: $" + TOT.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

function eje39() {
    let TI = parseInt(document.getElementById("e39v1").value);
    let DI = document.getElementById("e39v2").value;
    let TU = document.getElementById("e39v3").value;
    let PAG;
    if (TI <= 5) PAG = TI * 1.00;
    else if (TI <= 8) PAG = 5.00 + (TI - 5) * 0.80;
    else if (TI <= 10) PAG = 5.00 + 2.40 + (TI - 8) * 0.70;
    else PAG = 5.00 + 2.40 + 1.40 + (TI - 10) * 0.50;
    let IMP = 0;
    if (DI.toLowerCase() === "domingo") IMP = PAG * 0.03;
    else IMP = TU.toLowerCase() === "matutino" ? PAG * 0.15 : PAG * 0.10;
    let TOT = PAG + IMP;
    document.getElementById("res").innerHTML = "Pago base: $" + PAG.toFixed(2) + "<br>Impuesto aplicado: $" + IMP.toFixed(2) + "<br>Total a pagar: $" + TOT.toFixed(2);
}

function eje40() {
    let TI = document.getElementById("e40v1").value;
    let KM = parseFloat(document.getElementById("e40v2").value);
    let NPR = parseInt(document.getElementById("e40v3").value);
    let CK = TI.toLowerCase() === "a" ? 2.0 : (TI.toLowerCase() === "b" ? 2.5 : 3.0);
    let NP = NPR < 20 ? 20 : NPR;
    let CP = KM * CK;
    let TO = CP * NP;
    document.getElementById("res").innerHTML = "Costo por persona: $" + CP.toFixed(2) + "<br>Costo total del viaje: $" + TO.toFixed(2);
}

function eje41() {
    let NC = parseInt(document.getElementById("e41v1").value);
    let CC;
    if (NC <= 3) CC = 200.00;
    else if (NC <= 5) CC = 150.00;
    else if (NC <= 8) CC = 100.00;
    else CC = 50.00;
    let TOT = 0;
    for (let i = 1; i <= NC; i++) {
        if (i <= 3) TOT += 200.00;
        else if (i <= 5) TOT += 150.00;
        else if (i <= 8) TOT += 100.00;
        else TOT += 50.00;
    }
    document.getElementById("res").innerHTML = "Costo de la cita actual (#" + NC + "): $" + CC.toFixed(2) + "<br>Monto total pagado por el tratamiento: $" + TOT.toFixed(2);
}

function eje42() {
    let NZ = parseInt(document.getElementById("e42v1").value);
    let PE = parseFloat(document.getElementById("e42v2").value);
    if (PE > 5000) {
        document.getElementById("res").innerHTML = "ENTREGA RECHAZADA: El paquete supera los 5 kg permitidos.";
    } else {
        let CO = 0;
        if (NZ === 1) CO = PE * 11.00;
        else if (NZ === 2) CO = PE * 10.00;
        else if (NZ === 3) CO = PE * 12.00;
        else if (NZ === 4) CO = PE * 24.00;
        else if (NZ === 5) CO = PE * 27.00;
        else { document.getElementById("res").innerHTML = "Zona no valida."; return; }
        document.getElementById("res").innerHTML = "El costo total del envio es: $" + CO.toFixed(2);
    }
}

function eje43() {
    let tipo = parseInt(document.getElementById("e43v1").value);
    let limiteActual = parseFloat(document.getElementById("e43v2").value);
    let aumento;
    if (tipo === 1) aumento = limiteActual * 0.25;
    else if (tipo === 2) aumento = limiteActual * 0.35;
    else if (tipo === 3) aumento = limiteActual * 0.40;
    else aumento = limiteActual * 0.50;
    let nuevoLimite = limiteActual + aumento;
    document.getElementById("res").innerHTML = "Aumento aplicado: $" + aumento.toFixed(2) + "<br>Nuevo limite de credito: $" + nuevoLimite.toFixed(2);
}

function eje44() {
    let compra = parseFloat(document.getElementById("e44v1").value);
    let sexo = document.getElementById("e44v2").value;
    if (compra > 25000.00) {
        let txt = "¡Felicidades! Usted participa. Opciones de balota:<br>";
        if (sexo.toLowerCase() === 'h') {
            txt += "1. Kit de herramientas<br>2. Camiseta deportiva<br>3. Gorra original";
        } else {
            txt += "1. Kit de maquillaje<br>2. Bono de spa<br>3. Perfume importado";
        }
        document.getElementById("res").innerHTML = txt;
    } else {
        document.getElementById("res").innerHTML = "Siga intentando.";
    }
}

function eje45() {
    let n1 = parseFloat(document.getElementById("e45v1").value);
    let n2 = parseFloat(document.getElementById("e45v2").value);
    let op = parseInt(document.getElementById("e45v3").value);
    let result = "Opcion invalida.";
    switch (op) {
        case 1: result = "Resultado: " + (n1 + n2); break;
        case 2: result = "Resultado: " + (n1 - n2); break;
        case 3: result = "Resultado: " + (n1 * n2); break;
        case 4: result = n2 !== 0 ? "Resultado: " + (n1 / n2) : "Error: No se puede dividir por cero."; break;
    }
    document.getElementById("res").innerHTML = result;
}

function eje46() {
    let num = parseInt(document.getElementById("e46v1").value);
    let op = parseInt(document.getElementById("e46v2").value);
    let result = "";
    if (op === 1) {
        if (num <= 1) result = "El numero " + num + " no es primo.";
        else {
            let esP = true;
            for (let i = 2; i * i <= num; i++) if (num % i === 0) { esP = false; break; }
            result = esP ? "El numero " + num + " SI es primo." : "El numero " + num + " NO es primo.";
        }
    } else if (op === 2) {
        if (num < 0) result = "No existe factorial de numeros negativos.";
        else {
            let factorial = 1;
            for (let i = 1; i <= num; i++) factorial *= i;
            result = "El factorial de " + num + " es: " + factorial;
        }
    } else if (op === 3) {
        result = "Tabla del " + num + ":<br>";
        for (let i = 1; i <= 10; i++) result += num + " x " + i + " = " + (num * i) + "<br>";
    } else {
        result = "Esa opcion no existe.";
    }
    document.getElementById("res").innerHTML = result;
}

function eje47() {
    let N = parseInt(document.getElementById("e47v1").value);
    let result = "";
    for (let i = 2; i <= N; i++) {
        let esP = true;
        for (let j = 2; j * j <= i; j++) if (i % j === 0) { esP = false; break; }
        if (esP) result += i + " ";
    }
    document.getElementById("res").innerHTML = "Primos hasta " + N + ":<br>" + result;
}

function eje48() {
    let str = document.getElementById("e48v1").value;
    let arr = str.split(",");
    let h = 0, m = 0;
    for (let i = 0; i < arr.length; i++) {
        let g = arr[i].trim().toLowerCase();
        if (g === "h") h++;
        else if (g === "m") m++;
    }
    let nPers = arr.length;
    let txt = nPers > 0 ? "Hombres: " + (h * 100.0 / nPers).toFixed(2) + "%<br>Mujeres: " + (m * 100.0 / nPers).toFixed(2) + "%" : "No hay personas.";
    document.getElementById("res").innerHTML = txt;
}

function eje49() {
    let str = document.getElementById("e49v1").value;
    let arr = str.split(",");
    let suma = 0;
    for (let i = 0; i < Math.min(5, arr.length); i++) {
        suma += parseFloat(arr[i] || "0");
    }
    document.getElementById("res").innerHTML = "La suma total es: " + suma;
}

function eje50() {
    let c = parseInt(document.getElementById("e50v1").value);
    if (c > 0 && c <= 1000) {
        let txt = "Listado de valores:<br>";
        let cp = 0, ci = 0;
        let p = [], i = [];
        for (let t = 0; t < c; t++) {
            let n = Math.floor(Math.random() * 1999) + 1;
            txt += n + "  ";
            if (n % 2 === 0) { p.push(n); cp++; }
            else { i.push(n); ci++; }
        }
        txt += "<br><br>Listado de numeros pares (" + cp + ")<br>" + p.join("  ");
        txt += "<br><br>Listado de numeros impares (" + ci + ")<br>" + i.join("  ");
        document.getElementById("res").innerHTML = txt;
    } else {
        document.getElementById("res").innerHTML = "Solo se permiten valores entre 1 y 1000";
    }
}

function eje51() {
    let str = document.getElementById("e51v1").value;
    let arr = str.split(",");
    let sumaMayor550 = 0, sumaEntre200y550 = 0;
    let cantMayor550 = 0, cantEntre200y550 = 0;
    for (let i = 0; i < 15; i++) {
        let v = parseFloat(arr[i] || "0");
        if (v > 550) { sumaMayor550 += v; cantMayor550++; }
        else if (v > 200 && v <= 550) { sumaEntre200y550 += v; cantEntre200y550++; }
    }
    let txt = "1. Ventas mayores a 550: " + cantMayor550 + "<br>";
    txt += "2. Ventas entre 200 y 550: " + cantEntre200y550 + "<br>";
    txt += "3. Promedio ventas > 550: " + (cantMayor550 > 0 ? (sumaMayor550 / cantMayor550).toFixed(2) : "0") + "<br>";
    txt += "4. Promedio ventas 200-550: " + (cantEntre200y550 > 0 ? (sumaEntre200y550 / cantEntre200y550).toFixed(2) : "0");
    document.getElementById("res").innerHTML = txt;
}

// --- Ejercicio 61: Caja Registradora ---
let carritoEje61 = [];

const productosEje61 = [
    { nombre: "Tomate", precio: 1500 },
    { nombre: "Cebolla", precio: 1200 },
    { nombre: "Zanahoria", precio: 800 },
    { nombre: "Lechuga", precio: 2000 },
    { nombre: "Papa", precio: 1500 },
    { nombre: "Ajo", precio: 500 },
    { nombre: "Arveja", precio: 5000 },
    { nombre: "Garbanzo", precio: 12000 },
    { nombre: "Plátano", precio: 10000 },
    { nombre: "Yuca", precio: 2000 }
];

function inicializarEje61() {
    let select = document.getElementById("e61v1");
    if (select) {
        select.innerHTML = "";
        for (let i = 0; i < productosEje61.length; i++) {
            let opt = document.createElement("option");
            opt.value = productosEje61[i].nombre;
            opt.text = productosEje61[i].nombre + " ($" + productosEje61[i].precio + ")";
            select.appendChild(opt);
        }
    }
}
inicializarEje61();

function eje61() {
    let vegetal = document.getElementById("e61v1").value;
    let cantidad = parseInt(document.getElementById("e61v2").value);

    let objProducto = null;
    for (let i = 0; i < productosEje61.length; i++) {
        if (productosEje61[i].nombre === vegetal) {
            objProducto = productosEje61[i];
            break;
        }
    }

    if (cantidad > 0 && objProducto) {
        let precioUnidad = objProducto.precio;
        let subtotal = precioUnidad * cantidad;

        carritoEje61.push({
            producto: vegetal,
            cantidad: cantidad,
            precioUnidad: precioUnidad,
            subtotal: subtotal
        });
    } else if (cantidad <= 0) {
        alert("La cantidad debe ser mayor a 0");
    }

    mostrarCarritoEje61();
}

function limpiarCarritoEje61() {
    carritoEje61 = [];
    mostrarCarritoEje61();
}

function mostrarCarritoEje61() {
    let txt = "<h4>--- Ticket de Compra (Caja Registradora) ---</h4>";
    let totalPagar = 0;

    if (carritoEje61.length === 0) {
        txt += "<p>El carrito está vacío. Agregue productos para ver el total.</p>";
    } else {
        txt += "<table style='width:100%; text-align:left; border-collapse: collapse;'>";
        txt += "<tr style='border-bottom: 2px solid #ff7300;'>";
        txt += "<th>Producto</th>";
        txt += "<th>Cant.</th>";
        txt += "<th>Precio Un.</th>";
        txt += "<th>Subtotal</th>";
        txt += "</tr>";

        for (let i = 0; i < carritoEje61.length; i++) {
            let item = carritoEje61[i];
            txt += "<tr>";
            txt += "<td>" + item.producto + "</td>";
            txt += "<td>" + item.cantidad + "</td>";
            txt += "<td>$" + item.precioUnidad.toLocaleString() + "</td>";
            txt += "<td><strong>$" + item.subtotal.toLocaleString() + "</strong></td>";
            txt += "</tr>";

            totalPagar += item.subtotal;
        }

        txt += "<tr style='border-top: 2px solid #ff7300;'>";
        txt += "<td colspan='3' style='text-align:right; padding-top:10px;'><strong>TOTAL A PAGAR:</strong></td>";
        txt += "<td style='padding-top:10px;'><h3 style='margin:0; color:#ff7300;'>$" + totalPagar.toLocaleString() + "</h3></td>";
        txt += "</tr>";
        txt += "</table>";
    }

    document.getElementById("res").innerHTML = txt;
}

function eje52() {
    let arr = document.getElementById("e52v1").value.split(",");
    let suma = 0;
    let i = 0;
    while (i < 10 && i < arr.length) {
        suma += parseFloat(arr[i] || "0");
        i++;
    }
    document.getElementById("res").innerHTML = "La suma de las 10 cantidades es: " + suma;
}

function eje53() {
    let arr = document.getElementById("e53v1").value.split(",");
    let suma = 0;
    for (let i = 0; i < arr.length; i++) suma += parseFloat(arr[i] || "0");
    let prom = arr.length > 0 ? suma / arr.length : 0;
    document.getElementById("res").innerHTML = "La edad promedio de los " + arr.length + " alumnos es: " + prom.toFixed(1);
}

function eje54() {
    let arr = document.getElementById("e54v1").value.split(",");
    let suma = 0, cont = 0;
    let i = 0;
    while (i < arr.length) {
        let est = parseFloat(arr[i]);
        if (est > 0) {
            suma += est;
            cont++;
        }
        i++;
    }
    let prom = cont > 0 ? suma / cont : 0;
    document.getElementById("res").innerHTML = "La estatura promedio (" + cont + " personas) es: " + prom.toFixed(2) + " m";
}

function eje55() {
    let arr = document.getElementById("e55v1").value.split(",");
    let total = 0;
    let txt = "<strong>Ahorro por mes:</strong><br>";
    for (let i = 0; i < 12 && i < arr.length; i++) {
        total += parseFloat(arr[i] || "0");
        txt += "Mes " + (i + 1) + ": $" + total.toFixed(2) + "<br>";
    }
    txt += "<strong>Total ahorrado en el año: $" + total.toFixed(2) + "</strong>";
    document.getElementById("res").innerHTML = txt;
}

function eje56() {
    let n = parseInt(document.getElementById("e56v1").value);
    let a = 0, b = 1, txt = "Sucesión de Fibonacci (" + n + " elementos):<br>";
    if (n >= 1) txt += a + " ";
    if (n >= 2) txt += b + " ";
    for (let i = 3; i <= n; i++) {
        let c = a + b;
        txt += c + " ";
        a = b;
        b = c;
    }
    document.getElementById("res").innerHTML = txt;
}

function eje57() {
    let arr = document.getElementById("e57v1").value.split(",");
    let tarifa = parseFloat(document.getElementById("e57v2").value);
    let horasTotal = 0;
    for (let i = 0; i < 6 && i < arr.length; i++) {
        horasTotal += parseFloat(arr[i] || "0");
    }
    let sueldo = horasTotal * tarifa;
    document.getElementById("res").innerHTML = "Total de horas trabajadas en la semana: " + horasTotal + "<br>Sueldo total: $" + sueldo.toFixed(2);
}

function eje58() {
    let k1 = parseFloat(document.getElementById("e58v1").value);
    let k2 = parseFloat(document.getElementById("e58v2").value);
    let meet = (k1 + k2) / 2;
    document.getElementById("res").innerHTML = "Se encontrarán en el kilómetro: " + meet.toFixed(2);
}

function eje59() {
    let arr = document.getElementById("e59v1").value.split(",");
    let may1000 = 0, m500_1000 = 0, men500 = 0;
    let tm1000 = 0, t500_1000 = 0, tmen500 = 0;
    for (let i = 0; i < arr.length; i++) {
        let v = parseFloat(arr[i] || "0");
        if (v > 1000) { may1000++; tm1000 += v; }
        else if (v > 500) { m500_1000++; t500_1000 += v; }
        else { men500++; tmen500 += v; }
    }
    let global = tm1000 + t500_1000 + tmen500;
    let txt = "Ventas > $1000: " + may1000 + " (Monto: $" + tm1000.toFixed(2) + ")<br>";
    txt += "Ventas > $500 y <= $1000: " + m500_1000 + " (Monto: $" + t500_1000.toFixed(2) + ")<br>";
    txt += "Ventas <= $500: " + men500 + " (Monto: $" + tmen500.toFixed(2) + ")<br>";
    txt += "<strong>Monto Global de Ventas: $" + global.toFixed(2) + "</strong>";
    document.getElementById("res").innerHTML = txt;
}

function eje60() {
    let arr = document.getElementById("e60v1").value.split(",");
    let tarifa = 30000;
    let nominaTotal = 0;
    let txt = "Nómina Constructora Tecnovivir Casas C.A.<br><br>";
    let limit = arr[0] === "" ? 50 : arr.length;
    for (let i = 0; i < limit; i++) {
        let horas = (arr[0] === "") ? Math.floor(Math.random() * 8) + 1 : parseFloat(arr[i] || "0");
        nominaTotal += horas * tarifa;
    }
    txt += "Se ha calculado la nómina para " + limit + " obreros.<br>";
    txt += "Tarifa por hora: " + tarifa + " Bs.<br>";
    txt += "<strong>TOTAL NÓMINA A CANCELAR: " + nominaTotal.toLocaleString() + " Bs.</strong>";
    document.getElementById("res").innerHTML = txt;
}

function eje62() {
    let arr = document.getElementById("e62v1").value.split(",");
    let suma = 0, i = 0;
    do {
        if (i < arr.length) suma += parseFloat(arr[i] || "0");
        i++;
    } while (i < 10);
    document.getElementById("res").innerHTML = "Suma usando Repite (do-while): " + suma;
}

function eje63() {
    let arr = document.getElementById("e63v1").value.split(",");
    let menCero = 0, mayCero = 0;
    for (let i = 0; i < arr.length; i++) {
        let val = parseFloat(arr[i] || "0");
        if (val <= 0) menCero++; else mayCero++;
    }
    document.getElementById("res").innerHTML = "Cantidades menores o iguales a cero: " + menCero + "<br>Cantidades mayores a cero: " + mayCero;
}

function eje64() {
    let arr = document.getElementById("e64v1").value.split(",");
    let vector = [];
    for (let i = 0; i < 10; i++) vector.push(parseFloat(arr[i] || "0"));
    let suma = vector.reduce((a, b) => a + b, 0);
    document.getElementById("res").innerHTML = "Vector almacenado: [" + vector.join(", ") + "]<br>Suma de elementos: " + suma;
}

function eje65() {
    let arr = document.getElementById("e65v1").value.split(",");
    let pos = [], neg = [];
    let sumPos = 0, sumNeg = 0;
    let max = parseFloat(arr[0] || "0"), min = max;
    for (let i = 0; i < arr.length; i++) {
        let val = parseFloat(arr[i] || "0");
        if (val > 0) { pos.push(val); sumPos += val; }
        else if (val < 0) { neg.push(val); sumNeg += val; }
        if (val > max) max = val;
        if (val < min) min = val;
    }
    let txt = "Vector Positivos: [" + pos.join(", ") + "] (Suma: " + sumPos + ")<br>";
    txt += "Vector Negativos: [" + neg.join(", ") + "] (Suma: " + sumNeg + ")<br>";
    txt += "Mayor: " + max + " | Menor: " + min;
    document.getElementById("res").innerHTML = txt;
}

function eje66() {
    let buscar = parseFloat(document.getElementById("e66v1").value);
    let vector = [];
    let posiciones = [];
    for (let i = 0; i < 100; i++) {
        let rand = Math.floor(Math.random() * 100) + 1;
        vector.push(rand);
        if (rand === buscar) posiciones.push(i);
    }
    let txt = "Vector generado de 100 elementos: <br>[" + vector.join(", ") + "]<br><br>";
    if (posiciones.length > 0) {
        txt += "<strong>El dato " + buscar + " se encontró en las posiciones (índices): " + posiciones.join(", ") + "</strong>";
    } else {
        txt += "<strong>El dato " + buscar + " NO se encontró en el vector.</strong>";
    }
    document.getElementById("res").innerHTML = txt;
}

function eje67() {
    let inp = document.getElementById("e67v1").value;
    let vector = [];
    if (inp === "") {
        for (let i = 0; i < 25; i++) vector.push(Math.floor(Math.random() * 100) + 1);
    } else {
        let arr = inp.split(",");
        for (let i = 0; i < 25; i++) vector.push(parseInt(arr[i] || "0"));
    }
    let txt = "Vector original: [" + vector.join(", ") + "]<br>";
    let last = vector.pop();
    vector.unshift(last);
    txt += "<br>Vector rotado: [" + vector.join(", ") + "]";
    document.getElementById("res").innerHTML = txt;
}

function eje68() {
    let arr = document.getElementById("e68v1").value.split(",");
    let sum = 0, cont = 0;
    for (let i = 0; i < arr.length; i++) {
        let v = parseInt(arr[i] || "0");
        if (v < 0) break;
        sum += v;
        cont++;
    }
    document.getElementById("res").innerHTML = "Promedio de " + cont + " positivos introducidos antes del negativo: " + (cont > 0 ? (sum / cont).toFixed(2) : "0");
}

function eje69() {
    let txt = "<h4>Notas de los 5 alumnos (Matriz 5x5):</h4>";
    let aprobadas = "<h4>Notas Aprobadas (&gt;= 3.5):</h4>";
    for (let i = 0; i < 5; i++) {
        txt += "<strong>Alumno " + (i + 1) + ":</strong> ";
        aprobadas += "<strong>Alumno " + (i + 1) + ":</strong> ";
        let tieneAprobadas = false;

        for (let j = 0; j < 5; j++) {
            let n = (Math.random() * 5).toFixed(1);
            txt += n + "&nbsp;&nbsp;&nbsp;";

            if (parseFloat(n) >= 3.5) {
                aprobadas += "<b>" + n + "</b>&nbsp;&nbsp;&nbsp;";
                tieneAprobadas = true;
            }
        }
        txt += "<br>";
        if (!tieneAprobadas) {
            aprobadas += "<em>Ninguna</em>";
        }
        aprobadas += "<br>";
    }
    document.getElementById("res").innerHTML = txt + "<hr>" + aprobadas;
}

function eje70() {
    let m = [];
    for (let i = 0; i < 25; i++) m.push(Math.floor(Math.random() * 100)); // menores a 100
    let m_orig = m.slice();
    let txt = "Matriz 5x5 original:<br>";
    for (let i = 0; i < 25; i++) {
        txt += String(m_orig[i]).padStart(2, '0') + "&nbsp;&nbsp;&nbsp;";
        if ((i + 1) % 5 === 0) txt += "<br>";
    }
    m.sort((a, b) => b - a); // ordenar de mayor a menor
    txt += "<br>Orden descendente (mayor a menor): " + m.join(", ") + "<br>";
    let asc = m.slice().reverse();
    txt += "<br>Orden ascendente: " + asc.join(", ") + "<br>";
    let sum = m.reduce((a, b) => a + b, 0);
    let avg = sum / 25;
    txt += "<br>Menor: " + asc[0] + " | Mayor: " + m[0] + " | Promedio: " + avg.toFixed(1);
    document.getElementById("res").innerHTML = "<div style='font-family:monospace'>" + txt + "</div>";
}

function eje71() {
    let A = [], B = [], C = [];
    let txt = "Matriz A (3x3):<br>";
    for (let i = 0; i < 3; i++) {
        A[i] = []; B[i] = []; C[i] = [];
        for (let j = 0; j < 3; j++) {
            A[i][j] = Math.floor(Math.random() * 9) + 1; // <10, >0
            B[i][j] = Math.floor(Math.random() * 9) + 1;
            txt += A[i][j] + " ";
        }
        txt += "<br>";
    }
    txt += "<br>Matriz B (3x3):<br>";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) txt += B[i][j] + " ";
        txt += "<br>";
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            C[i][j] = 0;
            for (let k = 0; k < 3; k++) C[i][j] += A[i][k] * B[k][j];
        }
    }
    txt += "<br>Matriz Resultante C (A x B):<br>";
    let sumCol = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        let sumFila = 0;
        for (let j = 0; j < 3; j++) {
            txt += String(C[i][j]).padStart(3, ' ') + " ";
            sumFila += C[i][j];
            sumCol[j] += C[i][j];
        }
        txt += " | Suma fila " + i + ": " + sumFila + "<br>";
    }
    txt += "---------------------<br>Suma cols:&nbsp;";
    for (let j = 0; j < 3; j++) txt += sumCol[j] + "&nbsp;&nbsp;";
    document.getElementById("res").innerHTML = "<div style='font-family:monospace'>" + txt + "</div>";
}
