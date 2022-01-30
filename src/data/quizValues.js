
const options = ['A', 'B', 'C', 'D'];
const correctAnswers = ['D', 'B', 'B', 'D'];
const questions = [
    {
        question: '1. In your JavaScript code, how do you find out which character occurs at the 5th position in a string "How are you"?',
        id: 1,
        selections: [
            'substring()', 'string()', 'stringlength()', 'charAt()'
        ]
    },
    {
        question: '2. Which of the followings correctly describe the relationships of JavaScript and objects?',
        id: 2,
        selections: [
            'JavaScript is Object-oriented', 'JavaScript is Object-based', 'JavaScript is Object-driven', 'JavaScript has no relationship with objects'
        ]
    },
    {
        question: '3. How do you prompt users with messages and at the same time requesting user inputs?',
        id: 3,
        selections: [
            'confirm()', 'prompt()', 'alert()', 'open()'
        ]
    },
    {
        question: '4. Which statement is wrong about forEach and for loop?',
        id: 4,
        selections: [
            'There is no way we can break/return from the callback in case of forEach loop',
            'forEach only iterates through arrays',
            'await cannot be used with forEach',
            'forEach loops cannot be nested'
        ]
    }
];

const quizValues = { options, correctAnswers, questions };
 
export default quizValues;