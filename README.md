# JS Quiz

JS Quiz is a simple app to test users knowledge in JavaScript. It is built with **React** and **Sass** and it uses **Firebase** to store users results. It also uses Sweet Alert to enhance interactivity such as info messages and eror messages. JS Quiz consists of four pages: Home, User Details, Quiz and Results. It first af all opens to home page, here when user clicks on Start Quiz button they get navigated to the User Details page where they are asked to type in their names and emails. After submitted those infos, the quiz starts.
Here you can see desktop and mobile view of the quiz page of the app:
![jsquiz](https://user-images.githubusercontent.com/73724613/135760427-3fdaae17-96e4-406d-b339-bcb0829228fd.jpg)
The quiz layout created by CSS Grid. There are only four questions at the moment but more questions can be added easily, by adding question datas to quizValues.js and add the entry values in userAnswers array in Quiz.js.
Finally when user answers submitted in quiz page, the user gets their score immediately on the same page. Also the user can be navigated to results page where they can see the other users scores, if they would like to:
![jsquiz](https://user-images.githubusercontent.com/73724613/136862554-03123a1d-81ee-414e-9fc7-cbec8781ecf8.jpg)