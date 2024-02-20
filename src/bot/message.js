const User = require('../model/user')
const {bot} = require('./bot')
const { getAlltime, addApplication, addDayOffFirst, addDayOffSecond, addComment, sentApplication, showApplication, SentMessagetoUser } = require('./helper/application')
const { chooseNewLanguage, changeLanguage } = require('./helper/language')
const { start, chooseLanguage ,addName, requestContact } = require('./helper/start')
const { ShowDepeartment, allAnswers, positiveAnswers, positiveAnswersMoth, rejectedAnswersMoth, allAnswersMoth, allUsers, sentMessageToAllUsers, sentMessageToAllUsersMenu } = require('./helper/statistic')

bot.on('message' ,  async msg => {
    const chatId = msg.from.id
    const text = msg.text
    console.log(chatId);

    const user = await  User.findOne({chatId}).lean() 
    // console.log(user.action);
    if(text == '/start' || text == 'Menyu' || text == 'Меню' ){
        start(msg)
    }

    if(user) {
        if(user.action == 'choose_language') {
            chooseLanguage(msg)
        }
        if(user.action == 'add_name') {
            addName(msg)
        }
        if(user.action == 'request_contact') {
            requestContact(msg)
        }
        if(text == `🇷🇺/🇺🇿 Tilni o‘zgartirish` || text == `🇷🇺/🇺🇿 Сменить язык`) {
            changeLanguage(msg)
        }
        if(text == 'So‘rovnoma qoldirish' || text == `Оставить запрос`) {
            getAlltime(msg)
        }
        if(user.action == `choose_new_language`) {
            chooseNewLanguage(msg)
        }
        if(user.action == 'addtime') {
            addApplication(msg)
        }
        if(user.action == 'add_day_off_first') {
            addDayOffFirst(msg)
        }
        if(user.action == 'add_day_off_second') {
            addDayOffSecond(msg)
        }
        if(user.action == 'application_comment') {
            addComment(msg)
        }
        if(user.action == 'sent') {
            sentApplication(msg)
        }

        if(user.admin) {
            if(text == 'So‘rovnomalar' || text == 'Запросы'  ) {
                showApplication(msg)
            }
            if(text == 'Statistika'  || text == 'Статистика') {
                ShowDepeartment(msg)
            }
            if(text == 'Hal etilganlar' || text == 'Решено' ) {
                positiveAnswersMoth(msg)
            }
            if(text == 'Rad etilganlar' || text == 'Отклоненный') {
                rejectedAnswersMoth(msg)
            }
            if(text == 'Hammasi' || text == 'Все') {
                allAnswersMoth(msg)
            }
            if(text == 'Foydalanuvchilar' || text == 'Пользователи') {
                allUsers(msg)
            }
            if(text == 'Xabar yuborish' || text == 'Отправит сообшения') {
                sentMessageToAllUsersMenu(msg)
            }
        }
        if(user.action.includes('sent_message_to-')){
            SentMessagetoUser(msg)
        }
        if(user.action.includes('sent-message-all')){
            sentMessageToAllUsers(msg)
        }
    }
})