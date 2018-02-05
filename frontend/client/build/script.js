window.onload = function() {
    var button = document.getElementById("bbb");
    button.onclick = function() {
      var request = new XMLHttpRequest();
      request.open("GET","http://localhost:4567/data",true)
      request.setRequestHeader("Content-Type", "application/json");
      request.onload = function() {
        if(request.status === 200 ) {
            var data = JSON.parse(request.responseText);
            var keys = Object.keys(data.productsByCategory);
            console.log("data:", data.productsByCategory);
        } 
      }
      request.send();
    }
}