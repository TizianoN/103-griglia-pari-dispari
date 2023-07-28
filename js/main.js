// * RECUPERO GLI ELEMENTI DI INTERESSE
const cellsContainer = document.getElementById('cells-container');
const generateGridButton = document.getElementById('generate-grid');
const cellsCount = 64;

// * GENERO LA GRIGLIA DI GIOCO
generateGrid(cellsCount, cellsContainer);

// # CLICK DI GENERATE GRID BUTTON

generateGridButton.addEventListener('click', function () {
  generateGrid(cellsCount, cellsContainer);
});

// # FUNZIONI

/**
 * Funzione che genera una griglia dato il numero di celle che la compone
 * e l'elemento HTML in cui posizionarla
 *
 * @param {int} cellCount numero di celle
 * @param {HTMLElement} gridElement griglia di gioco
 */
function generateGrid(cellsCount, gridElement) {
  let blacklist = [];
  gridElement.innerHTML = '';

  // * PER 64 VOLTE
  for (let i = 1; i <= cellsCount; i++) {
    // * GENERO UN NUMERO UNICO RANDOMICO
    const randomNumber = generateUniqueNumber(1, cellsCount, blacklist);

    if (randomNumber) {
      // * GENERO UNA CELLA
      const cellElement = generateCell(randomNumber);

      // * LA AGGIUNGO AL CONTAINER
      gridElement.appendChild(cellElement);
    }
  }
}

/**
 * Funzione che genera una cella della griglia di gioco
 *
 * @param {int} cellNumber numero della cella
 * @returns {HTMLElement} la cella generata
 */
function generateCell(cellNumber) {
  const cellElement = document.createElement('li');
  cellElement.classList.add('cell');
  cellElement.innerHTML = cellNumber;

  cellElement.addEventListener('click', function () {
    const cellNumber = parseInt(this.innerHTML);

    if (cellNumber % 2 == 0) {
      this.classList.toggle('cell-even');
    } else {
      this.classList.toggle('cell-odd');
    }
  });

  return cellElement;
}

/**
 * Funzione che genera un numero casuale non ripetuto
 *
 * @param {int} min valore minimo
 * @param {int} max valore massimo
 * @param {array} blacklist valori esclusi
 * @returns {int} numero generato
 */
function generateUniqueNumber(min, max, blacklist) {
  const offset = max - min + 1;

  // ? sono passato da "blacklist.length >= max" a "blacklist.length >= offset"
  // ? perché il controllo sarebbe altrimenti stato fallato avendo "min > 1"
  if (blacklist.length >= offset) {
    console.error('non è possibile generare un altro numero');
    return false;
  }

  let randomNumber = Math.floor(Math.random() * offset) + min;

  while (blacklist.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * offset) + min;
  }

  blacklist.push(randomNumber);

  return randomNumber;
}
