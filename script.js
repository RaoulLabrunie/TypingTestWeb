const output = document.getElementById("output");
const bReiniciar = document.querySelector("button");
let texto = "";
let posicion = 0;
let letraActual = "";
let numeroLetras = 0;
let esperandoVocal = false;
let ejercicioIniciado = false;
let aciertos = 0;
let errores = 0;
let porcentaje = 0;
let palabrasMinuto = 0;
let inicio = 0;

//cargamos el texto que se va a mostrar
async function main() {
  await obternerTexto();

  output.innerHTML = texto
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");
  letras = output.querySelectorAll("span");

  numeroLetras = letras.length;
}

document.addEventListener("keydown", (event) => {
  if (!ejercicioIniciado) {
    inicio = Date.now();
    ejercicioIniciado = true;
  }
  // diferenciamos el backspace y las tildes para poder tratarlas de forma distinta
  if (event.key === "Backspace") {
    eliminarLetra(letras);
  }
  if (event.key === "Dead") {
    event.preventDefault();
    esperandoVocal = true;
    return;
  }
});

document.addEventListener("keypress", (event) => {
  // verificamos cada letra pulsada de forma que si esta en true la tilde podamos anadirlo
  if (esperandoVocal && "aeiou".includes(event.key)) {
    event.preventDefault();
    const mapa = {
      a: "á",
      e: "é",
      i: "í",
      o: "ó",
      u: "ú",
    };

    const conAcento = mapa[event.key];
    verificarLetra(conAcento, letras);
    esperandoVocal = false;
    if (posicion === letras.length) {
      const tiempo = Date.now() - inicio;
      output.innerHTML = `<p>Tiempo: ${tiempo}ms</p>`;
    }
  } else {
    //en caso que no lleve tilde simplemente pasamos la letra pulsada
    verificarLetra(event.key, letras);
    //ejecucion del final del ejercicio
    if (posicion === letras.length) {
      porcentaje = ((errores / numeroLetras) * 100 - 100) * -1;
      let tiempo = Date.now() - inicio;
      tiempo = tiempo / 1000;
      palabrasMinuto = (40 / tiempo) * 60;
      output.innerHTML = `<p>Tiempo: ${tiempo.toFixed(2)}s</p>`;
      output.innerHTML += `<p>WPM: ${palabrasMinuto.toFixed(2)}</p>`;
      output.innerHTML += `<p>Aciertos: ${porcentaje.toFixed(2)}%</p>`;
      bReiniciar.hidden = false;
    }
  }
});

//simplemente verificamos que la letra pulsada sea correcta y dependiendo de esto cambiamos el color
function verificarLetra(letra, letras) {
  if (letra === letras[posicion].innerHTML) {
    letras[posicion].classList.add("correcto");
    aciertos++;
  } else {
    letras[posicion].classList.add("incorrecto");
    errores++;
  }
  posicion++;
}

// volvemos una posicion atras de forma que podamos comparar la nueva letra con la anterior
function eliminarLetra(letras) {
  posicion--;
  letras[posicion].classList.remove("incorrecto", "correcto");
}

async function obternerTexto() {
  const palabras = await fetch("palabras.json").then((res) => res.json());
  texto = "";

  for (let i = 0; i < 40; i++) {
    aleatorio = Math.floor(Math.random() * palabras.español.length);
    texto += palabras.español[aleatorio] + " ";
  }
  texto = texto.trim();
}

async function reiniciar() {
  // Resetear todas las variables globales
  posicion = 0;
  letraActual = "";
  numeroLetras = 0;
  esperandoVocal = false;
  ejercicioIniciado = false;
  aciertos = 0;
  errores = 0;
  porcentaje = 0;
  palabrasMinuto = 0;
  inicio = 0;

  // Ocultar el botón de reiniciar
  bReiniciar.hidden = true;

  // Generar nuevo texto
  await obternerTexto();

  // Renderizar el nuevo texto en el DOM
  output.innerHTML = texto
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");

  // Actualizar la referencia a las letras
  letras = output.querySelectorAll("span");
  numeroLetras = letras.length;

  // Opcional: Enfocar el área de escritura para mejor UX
  output.focus();
}

main();
