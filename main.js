Webcam.set({
    width:350,
    height:350,
    image_format:"png",
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function capture1(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="result123"src="'+data_uri+'" >';
    });

}

console.log("ml5 version = ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/xeNH15v2F/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak1 = "The 1st prediction is " + prediction1;
    speak2 = "The 2nd prediction is " + prediction2;
    var UtterThis = new SpeechSynthesisUtterance (speak1+speak2);
    synth.speak(UtterThis);
}

function detect_img(){
    img = document.getElementById('result123');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
   if(error){
       console.error(error)
   }
   else{
       console.log(results);
       document.getElementById("result_emotion_name").innerHTML = results[0].label;
       document.getElementById("result_emotion_name2").innerHTML = results[1].label;
       prediction1 = results[0].label;
       prediction2 = results[1].label;
       speak();
       if(results[0].label == "Smile"){
           document.getElementById("update_emoji").innerHTML = "&#128522;";
       }
       if(results[0].label == "Sad"){
        document.getElementById("update_emoji").innerHTML = "&#128532;";
    }
    if(results[0].label == "Angry"){
        document.getElementById("update_emoji").innerHTML = "&#128545;";
    }
    if(results[0].label == "Surprised"){
        document.getElementById("update_emoji").innerHTML = "&#128562;";
    }


    if(results[1].label == "Smile"){
        document.getElementById("update_emoji2").innerHTML = "&#128522;";
    }
    if(results[1].label == "Sad"){
     document.getElementById("update_emoji2").innerHTML = "&#128532;";
 }
 if(results[1].label == "Angry"){
     document.getElementById("update_emoji2").innerHTML = "&#128545;";
 }
 if(results[1].label == "Surprised"){
     document.getElementById("update_emoji2").innerHTML = "&#128562;";
 }
   }
}