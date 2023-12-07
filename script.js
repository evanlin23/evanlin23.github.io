const typingEffect = {
  textArray: [
    "student",
    "archer",
    "cyber security researcher",
    "lego master",
    "software engineer",
    "speed cuber",
    "brother",
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
      delta /= 1.5;
    }
    if (!this.isDeleting && this.text === this.textArray[this.index]) {
      delta = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === "") {
      this.isDeleting = false;
      this.index = (this.index + 1) % this.textArray.length;
      delta = 500;
    }
    setTimeout(this.type.bind(this), delta);
  },
};

function TypingEffect(className, heading) {
  this.index = 0;
  this.text = "";
  this.speed = 100;

  this.type = function (className, heading) {
    const headingText = document.querySelector(`.${className}`);
    this.textArray = Array.isArray(heading) ? heading : [heading];

    this.addLetters(headingText);
  };

  this.addLetters = function (headingText) {
    const currentText = this.textArray[this.index];
    this.text = currentText.substring(0, this.text.length + 1);
    this.updateText(headingText);
  };

  this.updateText = function (headingText) {
    headingText.innerHTML = `<span>${this.text}</span>`;
    if (this.text === this.textArray[this.index]) {
      this.index = (this.index + 1) % this.textArray.length;
    }
    setTimeout(() => this.addLetters(headingText), this.speed);
  };
}

window.onload = function () {
  typingEffect.type();

  const typingEffectHeading1 = new TypingEffect("heading-text-highlight0", [
    "Education",
  ]);
  typingEffectHeading1.type("heading-text-highlight0", ["Education"]);

  const typingEffectHeading2 = new TypingEffect("heading-text-highlight1", [
    "Hey, this is what I've been up to",
  ]);
  typingEffectHeading2.type("heading-text-highlight1", [
    "Hey, this is what I've been up to",
  ]);

  const typingEffectHeading3 = new TypingEffect("heading-text-highlight2", [
    "Some interesting activities",
  ]);
  typingEffectHeading3.type("heading-text-highlight2", [
    "Some interesting activities",
  ]);

  const typingEffectHeading4 = new TypingEffect("heading-text-highlight3", [
    "Recognitions I'm proud of",
  ]);
  typingEffectHeading4.type("heading-text-highlight3", [
    "Recognitions I'm proud of",
  ]);

  const typingEffectHeading5 = new TypingEffect("heading-text-highlight4", [
    "Memories of the past",
  ]);
  typingEffectHeading5.type("heading-text-highlight4", [
    "Memories of the past",
  ]);
};
