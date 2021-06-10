document.querySelector('#get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
  const number = document.querySelector('input[type="number"]').value;
  const xhr = new XMLHttpRequest();

  xhr.open('GET',`https://api.icndb.com/jokes/random/${number}?firstName=The Great&lastName=Khali`, true);

  xhr.onload = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText);
      console.log(response);

      let output = '';

      if(response.type === 'success') {

        response.value.forEach(function(joke){
          output += `<li class="list-group-item">${joke.joke}</li>`;
        });



      }else {
        output += '<li class="list-group-item">Something went wrong</li>';
      }

      document.querySelector('#jokes').innerHTML = output;


    }
  }

  xhr.send();

  e.preventDefault();
}
