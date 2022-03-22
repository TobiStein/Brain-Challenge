class Question {
  constructor(statement, answer, title, tags = [], difficulty = 1, hint = "", time = 10, id = null) {
    this.id = id;
    this.statement = statement;   // secondaire
    this.answer = answer;         // secondaire
    this.title = title;           // principal
    this.tags = tags;             // principal
    this.difficulty = difficulty; // secondaire
    this.hint = hint;             // secondaire
    this.time = time;             // secondaire    
  }
}
