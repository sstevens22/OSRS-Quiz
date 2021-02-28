(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
          quizTime = parseInt(timeLeft.innerText);
          quizTime += 5;
          timeLeft.innerText = quizTime;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'green';
        }
        // if answer is wrong or blank
        else{
          quizTime = parseInt(timeLeft.innerText);
          quizTime -= 10;
          timeLeft.innerText = quizTime;
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
      
    }
  
   
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    let timeLeft = document.getElementById("timer");
    let quizTime = 120;
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "1. What level do you start at?",
        answers: {
          a: "0",
          b: "1",
          c: "3",
          d: "10"
        },
        correctAnswer: "c"
      },
      {
        question: "2. What is the halfway point of a maxed stat?",
        answers: {
          a: "49.5",
          b: "50",
          c: "92",
          d: "It depends on the skill"
        },
        correctAnswer: "c"
      },
      {
        question: "3. What HP level do you start the game with?",
        answers: {
          a: "10",
          b: "0",
          c: "1",
          d: "20"
        },
        correctAnswer: "a"
      },
      {
          question: "4. What is the max combat level you can achieve in OSRS?",
          answers: {
              a: "99",
              b: "100",
              c: "124",
              d: "126"
          },
          correctAnswer: "d"
      },
      {
          question: "5. When did OSRS get released?",
          answers: {
              a: "2004",
              b: "2013",
              c: "2010",
              d: "2007"
          },
          correctAnswer: "b"
      },
      {
          question: "6. What is the highest defensive amour in Free to Play?",
          answers: {
              a: "Runite",
              b: "Adamant",
              c: "Mithril",
              d: "Dragon"
          },
          correctAnswer: "a"
      },
      {
          question: "7. What is the highest healing food in Free to Play?",
          answers: {
              a: "Tuna",
              b: "Lobster",
              c: "Pinapple Pizza",
              d: "Swordfish"
          },
          correctAnswer: "c"
      },
      {
          question: "8. What skill total level are you at when you max all your stats?",
          answers: {
              a: "999",
              b: "2277",
              c: "10,000",
              d: "1000"
          },
          correctAnswer: "b"
      },
      {
          question: "9. What is the very first place you visit after creating an account?",
          answers: {
              a: "Lumbridge",
              b: "Falador",
              c: "Varock",
              d: "Tutorial Island"
          },
          correctAnswer: "d"
      },
      {
          question: "10. What mounts are their in OSRS?",
          answers: {
              a: "Horse",
              b: "Goblin",
              c: "None",
              d: "Wolf"
          },
          correctAnswer: "c"
      }
      
      
    ];
    // Timer
    StartDownCounting();
  
    function StartDownCounting() {       
        let interval = setInterval( () => { 
            if (quizTime <= 120 && quizTime >= 11) { 
                timeLeft.style.color = "green"; 
            }
            else if (quizTime <= 10 && quizTime >= 0) {
                timeLeft.style.color = "red";
            }
    
            timeLeft.innerText = quizTime;
            quizTime -= 1;
    
            if (quizTime < 0) {
                clearInterval(interval);
                alert("Time's up, try again")
                location.href = "index.html";
                
            }
        }, 1000);
    }
    // Initiate
    buildQuiz();
  
    // Page Navigation
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  