(function() {
  let deleteBtn = document.querySelector("#deleteBtn");
  deleteBtn.addEventListener("click", function(event) {
    const xhr = new XMLHttpRequest(); // Create new XMLHttpRequest object

    const url = `/deleteAll`; // GitHub endpoint, dynamically passing in specified username

    xhr.open("DELETE", url, true); // Open a new connection, using a GET request via URL endpoint. Providing 3 arguments (GET/POST, The URL, Async True/False)

    xhr.onload = function() {
      // const data = JSON.parse(this.response); // Parse API data into JSON
      // console.log(data);
      console.log("DELETE DONE");
    };
    xhr.send(); // Send the request to the server
  });
})();
