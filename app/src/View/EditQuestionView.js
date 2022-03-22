class EditQuestionView {
  constructor() {
    this.html = document.getElementById("html-vue-modifier-question").innerHTML;
    this.modifierQuestion = null;
    this.question = null;
  }

  initialiserModifierQuestion(modifierQuestion) {
    this.modifierQuestion = modifierQuestion;
  }

  initialiserQuestion(question) {
    this.question = question;
  }

  afficher() {
    this.html = this.html.replace("{Question.id}", this.question.id);
    document.getElementsByTagName("body")[0].innerHTML = this.html;
    
    document.getElementById("question-title").value = this.question.title;
    document.getElementById("question-statement").innerHTML = this.question.statement;
    document.getElementById("question-answer").innerHTML = this.question.answer;
    document.getElementById("question-hint").innerHTML = this.question.hint;
    document.getElementById("question-difficulty").value = this.question.difficulty;
    document.getElementById("question-time").value = this.question.time;
    document.getElementById("question-tags").innerHTML = this.question.tags.join(' ');

    document.getElementById("formulaire-modifier").addEventListener("submit", evenement => this.enregistrer(evenement));
  }

  enregistrer(evenement) {
    evenement.preventDefault();

    this.question.title = document.getElementById("question-title").value;
    this.question.statement = document.getElementById("question-statement").value;
    this.question.answer = document.getElementById("question-answer").value;
    this.question.hint = document.getElementById("question-hint").value;
    this.question.difficulty = document.getElementById("question-difficulty").value;
    this.question.time = document.getElementById("question-time").value;
    let tagText = document.getElementById("question-tags").value;

    this.question.tags = tagText.split(' ');
    
    this.modifierQuestion(this.question);
  }

}
