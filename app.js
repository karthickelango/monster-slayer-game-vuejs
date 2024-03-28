const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
      playerProgressColor: "#198754",
      monsterProgressColor: "#198754",
      playerColor: 0,
      monsterColor: 0,
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return {
        width: this.monsterHealth + "%",
        backgroundColor: this.monsterProgressColor,
      };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return {
        width: this.playerHealth + "%",
        backgroundColor: this.playerProgressColor,
      };
    },
    playerBarColor50() {
      if (this.playerHealth < 50) {
        this.playerProgressColor = "#ffc107";
      }
    },
    monsterBarColor50() {
      if (this.monsterHealth < 50) {
        this.monsterProgressColor = "#ffc107";
      }
    },
    playerBarColor25() {
      if (this.playerHealth < 25) {
        this.playerProgressColor = "red";
      }
    },
    monsterBarColor25() {
      if (this.monsterHealth < 25) {
        this.monsterProgressColor = "red";
      }
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
    monsterColorChange() {
      return {
        filter: `grayscale(${this.monsterColor}%)`,
      };
    },
    personColorChange() {
      return {
        filter: `grayscale(${this.playerColor}%)`,
      };
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (value <= 0) {
        //lose
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (value <= 0) {
        //lose
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      (this.playerHealth = 100),
        (this.monsterHealth = 100),
        (this.winner = null),
        (this.currentRound = 0),
        (this.logMessages = []);
      this.playerProgressColor = "#198754";
      this.monsterProgressColor = "#198754";
      this.playerColor = 0,
      this.monsterColor =0
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomNumber(5, 12);
      this.monsterHealth -= attackValue;
      this.monsterColor += attackValue
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomNumber(8, 15);
      this.playerHealth -= attackValue;
      this.playerColor += attackValue
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomNumber(10, 25);
      this.monsterHealth -= attackValue;
      this.monsterColor += attackValue
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomNumber(8, 20);
      if (this.playerHealth + healValue > 100) {
        return (this.playerHealth = 100);
      }
      this.playerHealth += healValue;
      this.playerColor -= healValue
      this.addLogMessage("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
