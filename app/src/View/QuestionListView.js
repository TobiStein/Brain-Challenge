class QuestionListView {
  constructor() {
    this.html = document.getElementById("html-vue-liste-question").innerHTML;
    this.listeQuestionDonnee = null;
  }

  initialiserListeQuestion(listeQuestionDonnee){
    this.listeQuestionDonnee = listeQuestionDonnee;
  }

  afficher() {
    document.getElementsByTagName("body")[0].innerHTML = this.html;

    let listeQuestion = document.getElementById("liste-question");

    const listeQuestionItemHTML = listeQuestion.innerHTML;

    let listeQuestionHTMLRemplacement = "";
    let tagListHTMLReplacement;

    let listeQuestionItemHTMLRemplacement;
    let tags = [];

    for (let numeroQuestion in this.listeQuestionDonnee) {
      listeQuestionItemHTMLRemplacement = listeQuestionItemHTML;
      listeQuestionItemHTMLRemplacement = listeQuestionItemHTMLRemplacement.replace("{Question.id}", this.listeQuestionDonnee[numeroQuestion].id);
      listeQuestionItemHTMLRemplacement = listeQuestionItemHTMLRemplacement.replace("{Question.title}", this.listeQuestionDonnee[numeroQuestion].title);

      // Tags
      tagListHTMLReplacement = "";
      tags = this.listeQuestionDonnee[numeroQuestion].tags;
      for (let tagIndex in tags) {
        tagListHTMLReplacement += "<li>" + tags[tagIndex] + "</li>";
      }
      listeQuestionItemHTMLRemplacement = listeQuestionItemHTMLRemplacement.replace("{Question.tags}", tagListHTMLReplacement);

      listeQuestionHTMLRemplacement += listeQuestionItemHTMLRemplacement;
    }

    listeQuestion.innerHTML = listeQuestionHTMLRemplacement;
  }

}
