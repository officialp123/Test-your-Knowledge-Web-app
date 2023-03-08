// MODULE CONTROL ARCHITECTURE
/**
 * 
 * 
 * QUIZ CONTROLLER
 * 
 */
let quizController = (function () {

    // question constructor
    function Question(id, questionText, options, correctAnswer) {
        this.id = id
        this.questionText = questionText
        this.options = options
        this.correctAnswer = correctAnswer
    }

    let questionLocalStorage = {
        setQuestionCollection: function (newCollection) {
            localStorage.setItem('questionCollection', JSON.stringify(newCollection))
        },
        getQuestionCollection: function () {
            return JSON.parse(localStorage.getItem('questionCollection'))
        },
        removeQuestionCollection: function () {
            localStorage.removeItem('questionCollection')
        }
    }
    return {
        addQuestionOnLocalStorage: function (newQuestionText, opts) {
            // console.log("test")


            if (questionLocalStorage.getQuestionCollection() === null) {
                questionLocalStorage.setQuestionCollection([])
            }
            let optionsArr = []
            let correctAns
            let newQuestion
            let getStoredQuests

            for (let i = 0; i < opts.length; i++) {
                if (opts[i].value !== "") {
                    optionsArr.push(opts[i].value)
                }
                if (opts[i].previousElementSibling.checked && opts[i].value !== '') {
                    correctAns = opts[i].value
                }
            }
            if (questionLocalStorage.getQuestionCollection().length > 0) {
                questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1

            } else {
                questionId = 0
            }


            newQuestion = new Question(questionId, newQuestionText, optionsArr, correctAns)

            getStoredQuests = questionLocalStorage.getQuestionCollection()
            getStoredQuests.push(newQuestion)
            questionLocalStorage.setQuestionCollection(getStoredQuests)
            console.log(questionLocalStorage.getQuestionCollection())
        }

    }


})()

/**
 * 
 * UI CONTROLLER
 * 
 */

let UIController = (function () {

    let domItems = {
        // ADMIN PANEL ELEMENTS

        questionInsertBtn: document.getElementById('question-insert-btn'),
        newQuestionText: document.getElementById('new-question-text'),
        adminOptions: document.querySelectorAll('.admin-option')


    }

    return {
        getDomItems: domItems
    }



})()

/**
 * 
 * CENTRAL CONTROLLER
 * 
 */

let controller = (function (quizCtrl, UICtrl) {

    let selectedDomItems = UICtrl.getDomItems

    selectedDomItems.questionInsertBtn.addEventListener('click', function () {
        // console.log('Test')
        quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, selectedDomItems.adminOptions)
    })


})(quizController, UIController)