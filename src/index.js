const rowtNumber = document.querySelector('input[name="first"]');
let columnNumber = document.querySelector('input[name="second"]');
let button = document.querySelector("button");
let table = document.querySelector("table");
let headTable = document.querySelector(".heading");
let height = table.getBoundingClientRect().bottom;
let numberOfPage = 1;

function drawTable(heading, data) {
  table.innerHTML = `
    <thead>
      ${heading}
    </thead>
      ${data}
    `;
}
function convertNumToData(cells) {
  return cells
    .map(unit => {
      return `<tr>${unit.map(number => `<td>${number}</td>`).join("")}</tr>`;
    })
    .join("");
}

function render(numberOfPage) {
  //insert random form 1 to 1000
  let column = []; //numbers of heading
  let units = []; //total cell in table
  let count = 0;
  let row = numberOfPage * 100;
  console.log(row);
  if (row > rowtNumber.value) {
    row = rowtNumber.value;
  }

  for (let i = 0; i < row; i++) {
    let row = [];
    for (let j = 0; j < columnNumber.value; j++) {
      row.push(Math.floor(Math.random() * 1000));
    }

    units.push(row);
    if (i + 1 === numberOfPage * 100) {
      console.log(i);
      break;
    }
  }

  //insert Heading
  for (let i = 1; i <= columnNumber.value; i++) {
    column.push(i);
  }
  let heading = column
    .map(heading => `<th class="heading" data-id="${count++}">${heading}</th>`)
    .join("");

  let data = convertNumToData(units);

  drawTable(heading, data);
  //sort column
  headTable = document.querySelectorAll("th");
  headTable.forEach(head =>
    head.addEventListener("click", () => {
      const newUnits = [].concat(units);
      newUnits.sort((a, b) => a[head.dataset.id] - b[head.dataset.id]);

      data = convertNumToData(newUnits);

      drawTable(heading, data);
    })
  );
}

button.addEventListener("click", event => {
  render(numberOfPage);
});
window.addEventListener("scroll", event => {
  let body = document.querySelector("tbody").getBoundingClientRect();
  const y = parseInt(window.scrollY) + window.innerHeight;
  let point = body.height + height + 27;
  if (y > point) {
    numberOfPage++;
    setTimeout(render(numberOfPage), 5000);
  }
});
