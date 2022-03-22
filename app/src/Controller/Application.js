class Application {
  constructor(window, questionListView, questionView, editQuestionView, addQuestionView, questionDAO) {
    this.window = window;
    this.questionListView = questionListView;
    this.questionView = questionView;
    this.addQuestionView = addQuestionView;
    this.addQuestionView.initialiserAjouterQuestion(question => this.addQuestion(question));
    this.editQuestionView = editQuestionView;
    this.editQuestionView.initialiserModifierQuestion(question => this.editQuestion(question));
    this.questionDAO = questionDAO;

    this.window.addEventListener("hashchange", () => this.naviguer());

    this.naviguer();
  }

  naviguer(){
    let hash = window.location.hash;

    if (!hash) {
      this.questionDAO.list((listeQuestion) => this.afficherNouvelleListeQuestion(listeQuestion));
    } 
    else if (hash.match(/^#ajouter-question/)) {
      this.addQuestionView.afficher();
    } 
    else {
      let navigation = hash.match(/^#question\/([0-9]+)\/modifier/);
      
      // Modification
      if (navigation) {
        // let idQuestion = navigation[1];
        this.editQuestionView.initialiserQuestion(this.questionView.question);
        this.editQuestionView.afficher();
      }
      // Affichage
      else {
        navigation = hash.match(/^#question\/([0-9]+)/);
        let idQuestion = navigation[1];
        this.questionDAO.get(idQuestion, (question) => this.afficherNouvelleQuestion(question));
      }
      
      console.log(navigation);
    }
  }

  afficherNouvelleListeQuestion(listeQuestion) {
    console.log(listeQuestion);
    this.questionListView.initialiserListeQuestion(listeQuestion);
    this.questionListView.afficher();
  }

  afficherNouvelleQuestion(question) {
    console.log(question);
    this.questionView.initialiserQuestion(question);
    this.questionView.afficher();
  }

  afficherQuestionAJour(question) {
    this.afficherNouvelleQuestion(question);
    this.window.location.hash = "#question/" + question.id;
  }

  afficherModificationQuestion(question) {
    this.editQuestionView.initialiserQuestion(question);
    this.editQuestionView.afficher();
  }

  addQuestion(question) {
    this.questionDAO.add(question, () => this.afficherListeQuestion());
  }

  editQuestion(question) {
    this.questionDAO.edit(question, (question) => this.afficherQuestionAJour(question))
  }

  afficherListeQuestion() {
    this.window.location.hash = "#";
  }
}

new Application(window, new QuestionListView(), new QuestionView(), new EditQuestionView(), new AddQuestionView(), new QuestionDAO(API));
