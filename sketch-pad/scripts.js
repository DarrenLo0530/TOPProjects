const gridContainer = document.querySelector('#grid-container');
const resetButton = document.querySelector('button');

function generateRandomValue(upperBound){
    return Math.round(Math.random() * upperBound);
}

function changeColor(e){
    const currentColor = this.style.backgroundColor;
    //Generat random color
    if(currentColor === 'transparent'){
        const rValue = generateRandomValue(255);
        const gValue = generateRandomValue(255);
        const bValue = generateRandomValue(255);

        this.style.backgroundColor = `rgb(${rValue}, ${gValue}, ${bValue})`;
        //Set initial opacity value so it can be retrieved next time
        this.style.opacity = 1;
    //Darken color by 0.1
    } else {
        this.style.opacity -= 0.1;
    }
}

function createGrid(xDimension, yDimension){
    gridContainer.innerHTML = '';

    gridContainer.style.gridTemplateColumns = `repeat(${xDimension}, 1fr)`;

    gridContainer.style.gridTemplateRows = `repeat(${yDimension}, 1fr)`;
   
    //Make 16 divs
    for(let i = 0; i<yDimension; i++){
        for(let j = 0; j<xDimension; j++){
            const gridDiv = document.createElement('div');
            gridDiv.setAttribute('class', 'grid-cell');
            gridDiv.addEventListener('mouseover', changeColor);
            gridDiv.style.backgroundColor = 'transparent';
            gridContainer.appendChild(gridDiv);
        }        
    }
}

function changeGrid(){
    const x = Number(prompt('How wide should it be'));
    const y = Number(prompt('How tall should it be'));

    createGrid(x, y);
}

//Reset button functionality
resetButton.addEventListener('click', changeGrid);

//Initialize initial grid
createGrid(16, 16);
