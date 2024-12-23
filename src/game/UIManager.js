export class UIManager {
    constructor() {
      this.createUI();
    }
  
    createUI() {
      this.scoreElement = document.getElementById('score');
      this.gameOverElement = document.querySelector('.game-over');
      this.startButton = document.getElementById('start-button');
      this.instructionsElement = document.getElementById('instructions');
    }
  
    updateScore(score) {
      this.scoreElement.textContent = `Score: ${score}`;
    }
  
    showGameOver(finalScore) {
      this.gameOverElement.style.opacity = '1';
      this.gameOverElement.innerHTML = `
        <h2>Game Over</h2>
        <p>Final Score: ${finalScore}</p>
        <p>Click or spacebar to start again</p>
      `;
    }
  
    hideGameOver() {
      this.gameOverElement.style.opacity = '0';
    }
  
    showLevelMessage(level) {
      const message = document.createElement('div');
      message.className = 'level-message';
      message.textContent = `Level ${level}`;
      document.body.appendChild(message);
      
      setTimeout(() => {
        message.remove();
      }, 2000);
    }
  
    showWinScreen(finalScore) {
      this.gameOverElement.style.opacity = '1';
      this.gameOverElement.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You've completed all levels!</p>
        <p>Final Score: ${finalScore}</p>
        <p>Click or spacebar to play again</p>
      `;
    }
  
    onStartClick(callback) {
      this.startButton.addEventListener('click', callback);
    }
  }