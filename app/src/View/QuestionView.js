class QuestionView {
  constructor() {
    this.html = document.getElementById("html-vue-question").innerHTML;
    this.question = null;
  }

  initialiserQuestion(question) {
    this.question = question;
  }

  afficher() {
    // Tags
    let htmlTags = "";
    for (let index in this.question.tags) {
      htmlTags += "<li>" + this.question.tags[index] + "</li>";
    }

    this.html = this.html.replace("{Question.id}", this.question.id);

    document.getElementsByTagName("body")[0].innerHTML = this.html;
    document.getElementById("question-title").innerHTML = this.question.title;
    document.getElementById("question-statement").innerHTML = this.question.statement;
    // document.getElementById("question-answer").innerHTML = this.question.answer;
    document.getElementById("question-tags").innerHTML = htmlTags;
    document.getElementById("question-difficulty").innerHTML = "Difficulté : " + this.question.difficulty;
    // document.getElementById("question-hint").innerHTML = this.question.hint;
    document.getElementById("question-time").innerHTML = "Temps estimé : " + this.question.time 
      + ((this.question.time < -1 || this.question.time > 1) ? " secondes" : " seconde");

    document.getElementById("question-answer").addEventListener("click", () => 
      {
        let element = document.getElementById("question-answer");
        element.setAttribute("class", "revealed");
        element.innerHTML = this.question.answer;
      }
    );

    document.getElementById("question-hint").addEventListener("click", () => 
      {
        let element = document.getElementById("question-hint");
        element.setAttribute("class", "revealed");
        element.innerHTML = this.question.hint;
      }
    );
  }
}