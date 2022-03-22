class AddQuestionView {
  constructor() {
    this.html = document.getElementById("html-vue-ajouter-question").innerHTML;
    this.ajouterQuestion = null;
  }

  initialiserAjouterQuestion(ajouterQuestion){
    this.ajouterQuestion = ajouterQuestion;
  }

  afficher() {
    document.getElementsByTagName("body")[0].innerHTML = this.html;
    document.getElementById("formulaire-ajouter").addEventListener("submit", evenement => this.enregistrer(evenement));
  }

  enregistrer(evenement) {
    evenement.preventDefault();

    let title = document.getElementById("question-title").value;
    let statement = document.getElementById("question-statement").value;
    let answer = document.getElementById("question-answer").value;
    let hint = document.getElementById("question-hint").value;
    let difficulty = document.getElementById("question-difficulty").value;
    let time = document.getElementById("question-time").value;
    let tagText = document.getElementById("question-tags").value;

    let tags = tagText.split(' ');
    
    this.ajouterQuestion(new Question(statement, answer, title, tags, difficulty, hint, time));
  }

}
