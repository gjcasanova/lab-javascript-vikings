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
class War {}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = { Soldier, Viking, Saxon, War };
}
