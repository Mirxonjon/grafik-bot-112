const { bot } = require("./bot");
const { addApplication, answerApplication, ApplicationChat } = require("./helper/application");
const { positiveAnswers, rejectedAnswers, allAnswers } = require("./helper/statistic");

bot.on('callback_query', async (query) => {
    console.log(query);
    const message_id = query.message.message_id;
    const { data } = query;
    const chatId = query.from.id;
    let id = data.split('-');
    let callbackName = data.split('_');
console.log(data , callbackName);

    bot.answerCallbackQuery(query.id , {
        cache_time :0.5
    }).then(() => {

        if(callbackName[0] == 'appliaction'){
            console.log('okk' , callbackName,)
            answerApplication(query)
        }
        if(callbackName[0] == 'applicationChat') {
            ApplicationChat(query)
        }
        if(callbackName[0] == 'positive') {
            positiveAnswers(query)
        }
        if(callbackName[0] == 'rejected') {
            rejectedAnswers(query)
        }
        if(callbackName[0] == 'answerAll') {
            allAnswers(query)
        }
          
                

    }).catch(e => {
        console.log(e);
    })
})