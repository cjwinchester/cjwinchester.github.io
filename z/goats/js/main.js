$.getJSON("js/data.json").success(function(d) {
    console.log(d);
}).then(function() {
    console.log("working...");
}).fail(function() {
    alert("Something went wrong. Try reloading the page.");
});
