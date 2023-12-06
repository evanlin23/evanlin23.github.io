const typingEffect = {
  textArray: [
    "Student",
    "Cybersecurity researcher",
    "Aspiring Software engineer",
  ],

  index: 0,
  isDeleting: false,
  text: "",
  speed: 100,

  type: function () {
    if (!this.isDeleting) {
      this.addLetters();
    } else {
      this.removeLetters();
    }
  },

  addLetters: function () {
    const currentText = this.textArray[this.index];
    this.text = currentText.substring(0, this.text.length + 1);
    this.updateText();
  },

  removeLetters: function () {
    const currentText = this.textArray[this.index];
    this.text = currentText.substring(0, this.text.length - 1);
    this.updateText();
  },

  updateText: function () {
    document.getElementById(
      "typingEffect"
    ).innerHTML = `<span>${this.text}</span>`;
    let delta = this.speed;
    if (this.isDeleting) {
      delta /= 2;
    }
    if (!this.isDeleting && this.text === this.textArray[this.index]) {
      delta = 1500;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === "") {
      this.isDeleting = false;
      this.index = (this.index + 1) % this.textArray.length;
      delta = 500;
    }
    setTimeout(this.type.bind(this), delta);
  },
};

window.onload = function () {
  typingEffect.type();
};
