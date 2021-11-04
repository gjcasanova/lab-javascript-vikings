// Soldier
class Soldier {
  // Es la clase base para Viking y Saxon. Su constructor requiere de la salud y la fuerza del soldado.
  constructor(health, strength) {
    // Inicializa los atributos.
    this.health = health;
    this.strength = strength;
  }

  attack() {
    // Retorna la fuerza del soldado. Es una especie de método get.
    return this.strength;
  }

  receiveDamage(damage) {
    // Resta un daño de la salud del soldado.
    this.health -= damage;
  }

  isAlive() {
    // Retorna true cuando la salud del soldado es mayor a cero, caso contrario retorna false.
    return this.health > 0;
  }
}

// Viking
class Viking extends Soldier {
  constructor(name, health, strength) {
    // Los vikingos tienen nombre.

    // Llama al método constructor del padre, esto hace que no sea necesario inicializar
    // manualmente los atributos health y strength.
    super(health, strength);
    this.name = name;
  }

  receiveDamage(damage) {
    super.receiveDamage(damage);
    // Llama al método receiveDamage del padre para restar la vida.
    // Retorna la cadena dependiendo de si el vikingo sigue vivo o no.
    return this.isAlive()
      ? `${this.name} has received ${damage} points of damage`
      : `${this.name} has died in act of combat`;
  }

  battleCry() {
    // Este método retorna una cadena de texto, tal cual lo pide el ejercicio.
    return 'Odin Owns You All!';
  }
}

// Saxon
class Saxon extends Soldier {
  // Para este caso no es necesario sobreescribir el resto de métodos, ni siquiera el constructor.
  receiveDamage(damage) {
    super.receiveDamage(damage);
    return this.isAlive()
      ? `A Saxon has received ${damage} points of damage`
      : `A Saxon has died in combat`;
  }
}

// War
class War {
  constructor() {
    // Inicializa los arrays para ambos bandos.
    this.vikingArmy = [];
    this.saxonArmy = [];
  }

  addViking(viking) {
    // Agrega un elemento al bando vikingo.
    this.vikingArmy.push(viking);
  }

  addSaxon(saxon) {
    // Agrega un elemento al bando sajón.
    this.saxonArmy.push(saxon);
  }

  attack(vikingIdx, saxonIdx, whoAttack) {
    // Este método abstrae un ataque sin importar el bando atacante ni el atacado.
    // Si whoAttack es true se entiende que el bando atacante es el vikingo,
    // pero si es false se entiende que es el sajón.

    let viking = this.vikingArmy[vikingIdx];
    let saxon = this.saxonArmy[saxonIdx];
    let victim, attacker, victimArmy, victimIdx;

    if (whoAttack) {
      victimIdx = saxonIdx;
      victim = saxon;
      victimArmy = this.saxonArmy;
      attacker = viking;
    } else {
      victimIdx = vikingIdx;
      victim = viking;
      victimArmy = this.vikingArmy;
      attacker = saxon;
    }

    let result = victim.receiveDamage(attacker.attack());
    if (!victim.isAlive()) {
      // ELimina el soldado muerto del bando atacado.
      victimArmy.splice(victimIdx, 1);
    }

    return result;
  }

  vikingAttack() {
    const [vikingIdx, saxonIdx] = this.selectPairIdx();
    return this.attack(vikingIdx, saxonIdx, true);
  }

  saxonAttack() {
    const [vikingIdx, saxonIdx] = this.selectPairIdx();
    return this.attack(vikingIdx, saxonIdx, false);
  }

  selectPairIdx() {
    // Este es un método auxiliar que permite obtener un índice random de cada bando.
    let vikingIdx = Math.floor(Math.random() * this.vikingArmy.length);
    let saxonIdx = Math.floor(Math.random() * this.saxonArmy.length);
    return [vikingIdx, saxonIdx];
  }

  showStatus() {}
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = { Soldier, Viking, Saxon, War };
}
