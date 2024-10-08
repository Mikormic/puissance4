(function () {
class Puissance4 {
    constructor(element_id, rows = 6, cols = 7) {
      let valid = false;
  while (!valid) {
    let rowsInput = prompt('Entre le nombre de lignes', rows);
    let colsInput = prompt('Entre le nombre de colonnes', cols);
    let rowsNumber = parseInt(rowsInput);
    let colsNumber = parseInt(colsInput);
    if (!isNaN(rowsNumber) && !isNaN(colsNumber) && rowsNumber > 0 && colsNumber > 0) {
      this.rows = rowsNumber;
      this.cols = colsNumber;
      valid = true;
    } else {
      alert('Veuillez saisir des nombres entiers positifs.');
    }
  }
  this.player1 = prompt('Entrez votre nom : ', 'Joueur 1');
  this.player2 = prompt('Entrez votre nom : ', 'Joueur 2');
  this.player1color = prompt('Entrez la couleur : ', 'red');
  this.player2color = prompt('Entrez la couleur : ', 'yellow');
      this.board = Array(this.rows);
      for (let i = 0; i < this.rows; i++) {
        this.board[i] = Array(this.cols).fill(0);
      }
      this.turn = 1;
      this.moves = 0;
      this.winner = null;
  
      this.element = document.querySelector(element_id);
      this.element.addEventListener('click', (event) => this.handle_click(event));
      this.render();
    }
    
    render() {
      let table = document.createElement('table');
      for (let i = this.rows - 1; i >= 0; i--) {
        let tr = table.appendChild(document.createElement('tr'));
        for (let j = 0; j < this.cols; j++) {
          let td = tr.appendChild(document.createElement('td'));
          let colour = this.board[i][j];
          if (colour)
            td.className = 'player' + colour;
          td.dataset.column = j;
        }
      }
      this.element.innerHTML = '';
      this.element.innerHTML += `<style>
      #game {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
      #game table {
        border: 3px black outset;
        background-color: transparent;
    }
    #game td {
        width: 2cm;
        height: 2cm;
        margin: 0px;
        padding: 0px;
        border: 2px black inset;
        border-radius: 2cm;
        background-color: transparent;
        cursor: pointer;
    }
      #game td.player1 {
        background-color: ${this.player1color}!important;
      }
      #game td.player2 {
        background-color: ${this.player2color}!important;
      }
  
      </style>`;
      this.element.appendChild(table);
    }
    
      set(row, column, player) {
        this.board[row][column] = player;
      this.moves++;
      }
  
      play(column) {
      let row;
      for (let i = 0; i < this.rows; i++) {
        if (this.board[i][column] == 0) {
          row = i;
          break;
        }
      }
      if (row === undefined) {
        return null;
      } else {
        this.set(row, column, this.turn);
        return row;
      }
      }
    
    handle_click(event) {
      if (this.winner !== null) {
            if (window.confirm("Let's GO pour une nouvelle partie !")) {
                this.reset();
          this.render();
              }
              return;
      }
  
        let column = event.target.dataset.column;
        if (column !== undefined) {
        column = parseInt(column);
           let row = this.play(parseInt(column));
        
        if (row === null) {
          window.alert("Colonne remplie !");
        } else {
          if (this.win(row, column, this.turn)) {
            this.winner = this.turn;
          } else if (this.moves >= this.rows * this.columns) {
            this.winner = 0;
          }
          this.turn = 3 - this.turn;
  
          this.render()
          
          switch (this.winner) {
            case 0: 
              window.alert("Match NUll !!"); 
              break;
            case 1:
              window.alert(`${this.player1} explose tout! Mais ${this.player2} l'aura la prochaine fois !`);
              document.body.style.backgroundImage = "url('./lxopz7@facebook.gif')";
              break;
            case 2:
              window.alert(`${this.player2} explose tout! Mais ${this.player2} l'aura la prochaine fois !`); 
              document.body.style.backgroundImage = "url('./lxopz7@facebook.gif')";
              break;
          }
        }
      }
    }
      win(row, column, player) {
      let count = 0;
      for (let j = 0; j < this.cols; j++) {
        count = (this.board[row][j] == player) ? count+1 : 0;
        if (count >= 4) return true;
      }
      count = 0;
      for (let i = 0; i < this.rows; i++) {
        count = (this.board[i][column] == player) ? count+1 : 0;
          if (count >= 4) return true;
      }
      count = 0;
      let shift = row - column;
      for (let i = Math.max(shift, 0); i < Math.min(this.rows, this.cols + shift); i++) {
        count = (this.board[i][i - shift] == player) ? count+1 : 0;
          if (count >= 4) return true;
      }
      count = 0;
      shift = row + column;
      for (let i = Math.max(shift - this.cols + 1, 0); i < Math.min(this.rows, shift + 1); i++) {
        count = (this.board[i][shift - i] == player) ? count+1 : 0;
        if (count >= 4) return true;
      }
      
      return false;
      }
  
    reset() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.board[i][j] = 0;
        }
      }
          this.move = 0;
      this.winner = null;
      }
  }
  
  let p4 = new Puissance4('#game');
})();