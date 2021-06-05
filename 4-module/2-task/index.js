function makeDiagonalRed(table) {
    let rows = table.rows;
    for (let row of rows) {
        let cellDiagonal = row.cells[row.rowIndex];
        cellDiagonal.style.backgroundColor = 'red';
    }
}