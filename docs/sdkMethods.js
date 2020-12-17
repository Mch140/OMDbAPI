console.log(">>>>>>>>>> inside sdkMethod.js");
errorMessage = document.getElementById("errorMessage");
pathToData = "chatTranscript.lines";
console.log(">>>>>>>>>> pathToData: "+ pathToData);

 

var updateCallback = function(data){
    console.log(">>>>>>>>>> data in updateCallback: "+ data);
    var path = data.key;
    console.log(">>>>>>>>>> data.key in updateCallback: "+ path);
    var value = data.newValue;
    console.log(">>>>>>>>>> data.newValue in updateCallback: "+ value);
    var line = value[value.length -1];
    console.log(">>>>>>>>>> newValue[-1] in updateCallback: "+ line);
    var movieName = line.text;
    console.log("moviename : "+movieName);
    if (line.source.toLowerCase()==="visitor"){
        var url = "https://www.omdbapi.com?t="+movieName+"&apikey=fb7c45ff";
        fetch(url)
                .then(function(response){
                    
                    return response.json();
                }
                ).then(function(res){
                    document.getElementById("Title").innerHTML = res.Title;
                    document.getElementById("Year").innerHTML = res.Year;
                    document.getElementById("Rated").innerHTML = res.Rated;
                    document.getElementById("Actors").innerHTML = res.Actors;
                    document.getElementById("Genre").innerHTML = res.Genre;
                    document.getElementById("Plot").innerHTML = res.Plot;

 

                }).catch(function(error){
                    console.log("I am inside catch");
                    console.log("Error Message : "+error);
                })
    }
};

 

var notifyWhenDone = function(error) {
    if (err){
        console.log("I am inside notifyWhenDone function : "+err);
    }
    var pathToData = "chatTranscript.lines";
    errorMessage.innerHTML = "Unable to find the movie";
};

 

lpTag.agentSDK.init({});
lpTag.agentSDK.bind(pathToData, updateCallback, notifyWhenDone);
