
const rule = (num) => {
  return (left, previous, right) => {
	const shift = (stateOf(left) << 2 | stateOf(previous) << 1 | stateOf(right));
    return (num & (1 << shift)) >> shift;
  };
}

const randomState = () => !!Math.round(Math.randomState());

const createCell = (state) => {
  const cell = document.createElement('article');
  cell.style.width = Width;
  cell.style.height = Height;
  cell.style.backgroundColor = !!state ? 'blue' : 'red';
  cell.style.display = 'inline-block';
  if (!!state) {
      cell.classList.add('active');
  }
  return cell;
}

const createRow = () => {
  const row = document.createElement('section');
  row.style.height = Height;
  return row;
}

const randomStateRow = () => {
  const row = createRow();
  for (let i = 0; i <= RowWidth; i++) {
    row.appendChild(createCell(randomState()));
  }
  return row;
}

const centeredRow = () => {
  const row = createRow();
  for (let i = 0; i < RowWidth/2; i++) {
    row.appendChild(createCell(0));
  }
  row.appendChild(createCell(1));
  for (let i = 0; i < RowWidth/2; i++) {
    row.appendChild(createCell(0));
  }
  return row;
}

const stateOf = (cell) => cell.classList.contains('active') ? 1 : 0;

const generateNext = (automata, rule) => {
  const lastRow = automata.lastChild.childNodes;
  const row = createRow();
  for (let i = 0; i < lastRow.length; i++) {
    const ancestor = lastRow[i];
    const left = ancestor.previousElementSibling || lastRow[lastRow.length - 1];
    const right = ancestor.nextElementSibling || lastRow[0];
    const cell = createCell(rule(left, ancestor, right));
    row.appendChild(cell);
  }
  automata.appendChild(row);
}

const Width = "4px", Height = "4px", RowWidth = 200, Rule = rule(30);

const automata = document.createElement('section');
document.body.appendChild(automata);
automata.appendChild(centeredRow());
setInterval(() => generateNext(automata, Rule), 10);
