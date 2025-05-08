const typingEffect = {
  phrases: [
    "student",
    "security researcher",
    "software developer",
  ],
  typingSpeed: 100,
  deletingSpeed: 70,
  pauseBeforeDelete: 2000,
  pauseBeforeNextPhrase: 500,
  
  currentIndex: 0,
  isDeleting: false,
  currentText: "",
  element: null,
  
  init() {
    this.element = document.getElementById("typingEffect");
    if (!this.element) return;
    this.type();
  },
  
  type() {
    const currentPhrase = this.phrases[this.currentIndex];
    
    if (this.isDeleting) {
      this.currentText = currentPhrase.substring(0, this.currentText.length - 1);
    } else {
      this.currentText = currentPhrase.substring(0, this.currentText.length + 1);
    }
    
    this.element.innerHTML = `<span>${this.currentText}</span>`;
    let typingSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
    
    if (!this.isDeleting && this.currentText === currentPhrase) {
      typingSpeed = this.pauseBeforeDelete;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === "") {
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
      typingSpeed = this.pauseBeforeNextPhrase;
    }
    
    setTimeout(() => this.type(), typingSpeed);
  }
};

const headingAnimations = {
  headings: {
    "heading-text-highlight0": "Education...",
    "heading-text-highlight1": "Hey, this is what I've been up to...",
    "heading-text-highlight2": "Some interesting activities...",
    "heading-text-highlight3": "Recognitions I'm proud of...",
    "heading-text-highlight4": "Memories of the past...",
  },
  typingSpeed: 100,
  observerThreshold: 0.5,
  
  init() {
    this.setupObservers();
  },
  
  setupObservers() {
    const observerOptions = {
      root: null,
      threshold: this.observerThreshold,
    };
    
    Object.keys(this.headings).forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;
      
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateHeading(entry.target.id, this.headings[entry.target.id]);
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      observer.observe(element);
    });
  },
  
  animateHeading(elementId, text) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let displayedText = "";
    let charIndex = 0;
    
    const typeNextChar = () => {
      if (charIndex < text.length) {
        displayedText += text.charAt(charIndex);
        element.innerHTML = `<span>${displayedText}</span>`;
        charIndex++;
        setTimeout(typeNextChar, this.typingSpeed);
      }
    };
    
    typeNextChar();
  }
};

const textScramble = {
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  speed: 30,
  iterationIncrement: 1/3,
  
  init() {
    const mainTitle = document.querySelector("h1");
    if (!mainTitle) return;
    
    mainTitle.addEventListener("mouseover", event => this.scramble(event));
  },
  
  scramble(event) {
    let iteration = 0;
    const originalText = event.target.dataset.value;
    clearInterval(this.interval);
    
    this.interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return this.letters[Math.floor(Math.random() * this.letters.length)];
        })
        .join("");
      
      if (iteration >= originalText.length) {
        clearInterval(this.interval);
      }
      
      iteration += this.iterationIncrement;
    }, this.speed);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  typingEffect.init();
  headingAnimations.init();
  textScramble.init();
});