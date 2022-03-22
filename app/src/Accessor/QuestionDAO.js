class QuestionDAO {

  add(question, callback) {
    if (API.URL) {
      fetch(API.URL + "add.php",
        {
          method: 'POST',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded'
          },
          body: JSON.stringify(question),
        })
        .then((response) => response.text())
        .then((data) => {
            console.log('[add]', data);
            callback();
          }
      );
    }
    else {
      console.log("Error: No API was provided!");
    }
  }

  list(callback) {
    if (API.URL) {
      fetch(API.URL + "list.php")
        .then(response => response.text())
        .then(data => {
            data = ((data === null) ? null : JSON.parse(data));
            console.log(data);

            let list = [];
            let index = 0;
            for (index in data) {
              let question = new Question(
                data[index].statement,
                data[index].answer,
                data[index].title,
                data[index].tags,
                data[index].difficulty,
                data[index].hint,
                data[index].time,
                data[index].id
              );
              console.log("[list question]", question);
              list.push(question);
            } 

            callback(list);
          }
      );
    }
    else {
      console.log("Error: No 'list' action in API!");
      callback([]);
    }
  }

  get(id, callback) {
    if (API.URL) {
      fetch(API.URL + "get.php" + '?id=' + id)
        .then((response) => response.json())
        .then((data) => {
            // TODO: Handle errors 
            console.log("[get]", data);

            let question = new Question(
              data.statement, 
              data.answer,
              data.title,
              data.tags, 
              data.difficulty,
              data.hint, 
              data.time,
              data.id
            );
            callback(question);
          }
      );
    }
  }

  edit(question, callback) {
    if (API.URL) {
      fetch(API.URL + "edit.php",
        {
          method: 'POST',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded'
          },
          body: JSON.stringify(question),
        })
        .then((response) => response.text())
        .then((data) => {
            console.log('[edit]', data);
            callback(question);
          }
      );
    }
    else {
      console.log("Error: No API was provided!");
    }
  }

}
