
const options = ['A', 'B', 'C', 'D'];
const correctAnswers = ['D', 'B', 'B', 'A'];
const questions = [
    {
        question: '1. In your JavaScript code, how do you find out which character occurs at the 5th position in a string "How are you"?',
        selections: [
            'substring()', 'string()', 'stringlength()', 'charAt()'
        ]
    },
    {
        question: '2. Which of the followings correctly describe the relationships of JavaScript and objects?',
        selections: [
            'JavaScript is Object-oriented', 'JavaScript is Object-based', 'JavaScript is Object-driven', 'JavaScript has no relationship with objects'
        ]
    },
    {
        question: '3. How do you prompt users with messages and at the same time requesting user inputs?',
        selections: [
            'confirm()', 'prompt()', 'alert()', 'open()'
        ]
    },
    {
        question: '4. Which of the following is the minimum browser version that supports JavaScript?',
        selections: [
            'Navigator v2.0', 'Mozilla v1.5', 'IE 2.0', 'Navigator v1.0'
        ]
    }
];

const quizValues = { options, correctAnswers, questions };
 
export default quizValues;