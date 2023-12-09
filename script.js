const typingEffectLoop = {
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

function TypingEffectHeading(className, heading) {
  this.index = 0;
  this.text = "";
  this.speed = 100;

  this.type = function (className, heading) {
    const headingText = document.getElementById(className);
    this.textArray = Array.isArray(heading) ? heading : [heading];
    this.addLetters(headingText);
  };

  this.addLetters = function (headingText) {
    const currentText = this.textArray[this.index];
    if (this.text.length < currentText.length) {
      this.text = currentText.substring(0, this.text.length + 1);
      this.updateText(headingText);
    }
  };

  this.updateText = function (headingText) {
    headingText.innerHTML = `<span>${this.text}</span>`;
    if (this.text === this.textArray[this.index]) {
      this.index = (this.index + 1) % this.textArray.length;
    }
    if (this.text.length < this.textArray[this.index].length) {
      setTimeout(() => this.addLetters(headingText), this.speed);
    }
  };
}

const idDictionary = {
  "heading-text-highlight0": "Education",
  "heading-text-highlight1": "Hey, this is what I've been up to",
  "heading-text-highlight2": "Some interesting activities",
  "heading-text-highlight3": "Recognitions I'm proud of",
  "heading-text-highlight4": "Memories of the past",
};

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const typingEffectHeading = new TypingEffectHeading(entry.target.id, [
        idDictionary[entry.target.id],
      ]);
      typingEffectHeading.type(entry.target.id, [
        idDictionary[entry.target.id],
      ]);
      observer.unobserve(entry.target);
    }
  });
}

window.onload = function () {
  typingEffectLoop.type();

  const options = {
    root: null,
    threshold: 0.5,
  };

  Object.keys(idDictionary).forEach((id) => {
    const target = document.querySelector(`#${id}`);
    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(target);
  });
};
