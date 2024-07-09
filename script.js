 // Targeting Elements from HTML document
 const startBtn = document.querySelector('#start');
 const stopBtn = document.querySelector('#stop');
 const speakBtn = document.querySelector('#speak');
 const userInputDiv = document.querySelector('#userInput');
 const nexusResponseDiv = document.querySelector('#nexusResponse');

 // Speech recognition Setup
 const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
 const recognition = new SpeechRecognition();

 // Voice recognition start
 recognition.onstart = function () {
   console.log("Voice recognition Active");
 }

 // Voice recognition stop
 recognition.onstop = function () {
   console.log("Voice recognition Deactivated");
 }

 // Function to display user input
 function displayUserInput(input) {
   userInputDiv.textContent = `You: ${input}`;
 }

 // Speech recognition result
 recognition.onresult = function (event) {
   let current = event.resultIndex;
   let transcript = event.results[current][0].transcript;
   transcript = transcript.toLowerCase();
   console.log(`My words: ${transcript}`);
   displayUserInput(transcript);

   // Voice commands here 👇🏻

   // Greeting command
   if (transcript.includes("hello") || transcript.includes("hi")) {
     readOut("Hello, nice to meet you.");
   }

   // this command is for NAME
   if (transcript.includes("what is your name") || transcript.includes("what's your name")) {
     readOut("I am Nexus, how can I help you?");
   }

   // this command is for THANK YOU
   if (transcript.includes("thanks")) {
     readOut("You're welcome! Have a great day!");
   }

   // this command is for "main kaun hun"
   if (transcript.includes("main kaun hun")) {
     readOut("आप मेरे भगवान हो जिसने मुझे बनाया!");
   }

   // this command is for "NEXUS, Who Developed You"
   if (transcript.includes("nexus, who developed you")) {
     readOut("Balaji Rathod was developer me!");
   }

   // this command is for YOUTUBE
   if (transcript.includes("open youtube")) {
     readOut("Opening YouTube, sir.");
     window.open("https://www.youtube.com/");
   }

   // this command is for GOOGLE
   if (transcript.includes("open google")) {
     readOut("Opening Google, sir.");
     window.open("https://www.google.com");
   }

   // this command is for LINKEDIN profile
   if (transcript.includes("open linkedin") || transcript.includes("can you open my linkedin profile")) {
     readOut("Opening LinkedIn profile, sir.");
     window.open("https://www.linkedin.com/in/balaji-rathod-60579626a/");
   }

   // this command is for SEARCH ANYTHING ON GOOGLE
   if (transcript.includes("search") || transcript.includes("search for")) {
     readOut("Here is the result.");
     let input = transcript.split("");
     input.splice(0, 14); // removing 1st letter and space
     input.pop(); // removing last comma . or ?
     input = input.join("").split(" ").join("+");
     window.open(`https://www.google.com/search?q=${input}`);
     console.log(input);
   }

   // this command is for YOUTUBE VIDEOS
   if (transcript.includes("play")) {
     readOut("Yes, I can play.");
     // Extract the song name from the transcript
     let songName = transcript.replace("play", "").trim();
     // Construct the search query URL
     let searchQuery = encodeURIComponent(songName);
     let searchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
     // Open YouTube search results page in a new tab with autoplay enabled for the first video
     window.open(searchUrl + '&autoplay=1');
     console.log(songName);
   }

   // this command is for CLOSING TABS
   if (transcript.includes("close tab") || transcript.includes("close all tabs")) {
     readOut("Closing tab.");
     window.close();
   }
 };

 recognition.continuous = true;

 // Text-to-Speech code
 function readOut(message) {
   const speech = new SpeechSynthesisUtterance();
   const allVoice = speechSynthesis.getVoices();
   speech.text = message;
   speech.voice = allVoice[12];
   speech.volume = 1;
   // speech.rate = 1;
   window.speechSynthesis.speak(speech);
   console.log("Speaking out");
   displayNexusResponse(message);
 }

 // Function to display Nexus response
 function displayNexusResponse(response) {
   nexusResponseDiv.textContent = `NEXUS: ${response}`;
 }

 // Performing task on startBtn with event listener
 startBtn.addEventListener("click", () => {
   recognition.start();
 });

 // Performing task on stopBtn with event listener
 stopBtn.addEventListener("click", () => {
   recognition.stop();
 });

 // Performing task on speakBtn with event listener
 speakBtn.addEventListener("click", () => {
   readOut("I wanna speak loudly.");
 });
