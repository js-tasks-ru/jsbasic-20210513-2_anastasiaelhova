let genderCellIndex = 2;
let statusCellIndex = 1;
let maxAge = 18;

function highlight(table) {
    //let rows = table.querySelector('tbody').rows;
    let rows = table.rows;
    for(let row of rows) {
        let attrAvailable = row.querySelector('[data-available]');
        let contentGender = row.cells[genderCellIndex];
        let contentStatus = row.cells[statusCellIndex];

        if (attrAvailable) {
            if (attrAvailable.dataset.available === 'true') {
                row.classList.add('available');
            } else {
                row.classList.add('unavailable');
            }
        }
        else {
            row.hidden = 'true';
        }

        if (contentGender.innerHTML === 'm') {
            row.classList.add('male');
        } else {
            row.classList.add('female');
        }

        if (Number(contentStatus.innerHTML) < maxAge) {
            console.log(row);
            row.style.textDecoration = 'line-through';
        }
    }
}
