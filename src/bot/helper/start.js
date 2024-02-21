const User = require("../../model/user")
const { bot } = require("../bot")
const { adminKeyboardUZ, adminKeyboardRu, userKeyboardUz, userKeyboardRU } = require("../menu/keyboard")

const  start = async( msg ) => {
    const chatId = msg.from.id

    let  checkUser =  await User.findOne({chatId}).lean()

    console.log(checkUser);

    if(checkUser?.full_name || checkUser?.language || checkUser?.phone) {
        console.log(checkUser.admin == true);

        await User.findByIdAndUpdate(checkUser._id,{...checkUser ,  action:  'menu'  },{new:true})

        bot.sendMessage(chatId, checkUser.language == 'uz' ? `Menyuni tanlang, ${checkUser.admin ? 'Admin': checkUser.full_name}`: `Выберите меню, ${checkUser.admin ? 'Admin': checkUser.full_name}`,{
            reply_markup: {
                keyboard: checkUser.admin ? (checkUser.language == 'uz' ? adminKeyboardUZ : adminKeyboardRu)  : (checkUser.language=='uz' ? userKeyboardUz : userKeyboardRU) ,
                resize_keyboard: true
            },
        })
    }else if (!checkUser) {
        let newUser = new User({
            chatId,
            admin: false,
            createdAt: new Date(),
            action: 'choose_language'
        })
        await newUser.save()
        bot.sendMessage(
            chatId,
            `Здравствуйте ${msg.from.first_name} ,  добро пожаловать в наш бот. Выберите язык 🇷🇺/🇺🇿`,
            {
                reply_markup: {
                    keyboard: [
                        [
                            {
                                text: `🇺🇿 O‘zbekcha` ,
                            },
                            {
                                text: `🇷🇺  Русский` ,
                            },
                        ],
                    ],
                    resize_keyboard: true
                }
            })
    }


}



const  chooseLanguage = async (msg) => {
    const chatId = msg.from.id
    const text =  msg.text
    let user = await User.findOne({chatId}).lean()
    if(`🇺🇿 O‘zbekcha` == text || `🇷🇺  Русский` == text ) {
        user.language = text  == `🇺🇿 O‘zbekcha` ? 'uz' : 'ru' 
        user.action = 'add_name'
        
        console.log(user, msg.text ,'sssss');
        await User.findByIdAndUpdate(user._id,user,{new:true})
        // console.log(user);
        bot.sendMessage(
            chatId,
            user.language == 'uz' ? `👤 To‘liq F.I.Sh kiriting (masalan: Mahmudov Alisher Baxodir o‘g‘li)` : `👤 Введите полное Ф.И.О. (например:  Махмудов Алишер Баходир угли)`,
            {
                reply_markup : {
                    remove_keyboard : true
                }
            })
    } else {
        bot.sendMessage(
            chatId,
            `Выберите язык 🇷🇺/🇺🇿`,
            {
                reply_markup: {
                    keyboard: [
                        [
                            {
                                text: `🇺🇿 O‘zbekcha` ,
                            },
                            {
                                text: `🇷🇺  Русский` ,
                            },
                        ],
                    ],
                    resize_keyboard: true
                }
            })
    }
    }

const  addName = async (msg) => {
        const chatId = msg.from.id
        const text = msg.text
        // console.log(text.split(' ').length == 4);

        let user = await User.findOne({chatId}).lean()
        if( text.split(' ').length >= 3 ) {

            user.full_name = text

            user.action = 'request_contact'
            console.log({...user} , text);
            await User.findByIdAndUpdate(user._id,user,{new:true})
            // console.log(user);
            bot.sendMessage(
                chatId,
                user.language == 'uz' ? '📱Telefon raqamingizni kiriting (masalan: +998*********)' :   `📱Введите номер телефона (например: +998*********)`,
                {
                    reply_markup: {
                        keyboard: [
                            [
                                {
                                    text: 'Telefon raqamni yuborish',
                                    request_contact: true
                                },
                            ],
                        ],
                        resize_keyboard: true
                    }
                })
        } else {
            bot.sendMessage(
                chatId,
                user.language == 'uz' ? `👤 Iltimos F.I.Sh to‘liq kiriting! (masalan: Mahmudov Alisher Baxodir o‘g‘li)` : `👤 Введите полное Ф.И.О. (например:  Махмудов Алишер Баходир угли)`,
                )
        }
    
    }

const requestContact = async (msg) => {
    const chatId = msg.from.id
    const phonetext = `+${+msg?.contact?.phone_number}` ||  msg.text

    let user = await User.findOne({chatId}).lean()
    if (phonetext.includes('+99') && !isNaN(+phonetext.split('+99')[1])  && phonetext.length >= 13 ){
    // if (phonetext){

        user.phone = phonetext
        user.admin = phonetext.includes('998933843484') ? phonetext.includes('998933843484') : phonetext.includes('998981888857') 
        user.action = 'menu'
        await User.findByIdAndUpdate(user._id,user,{new:true})

        bot.sendMessage(chatId, user.language == 'uz' ? `Menyuni tanlang, ${user.admin ? 'Admin': user.full_name}`: `Выберите меню, ${user.admin ? 'Admin': user.full_name}`,{
            reply_markup: {
                keyboard: user.admin ? user.language == 'uz' ? adminKeyboardUZ : adminKeyboardRu  : user.language=='uz' ? userKeyboardUz : userKeyboardRU ,
                resize_keyboard: true
            },
        })
    } else {
        bot.sendMessage(
            chatId,
            user.language == 'uz' ? `📱Iltimos to‘g‘ri kiriting! (masalan: +998*********)` :   `📱Пожалуйста, введите правильно (например: +998*********)`,
            {
                reply_markup: {
                    keyboard: [
                        [
                            {
                                text: 'Telefon raqamni yuborish',
                                request_contact: true
                            },
                        ],
                    ],
                    resize_keyboard: true
                }
            })
    }

}



module.exports = {
    start,
    chooseLanguage,
    addName,
    requestContact
}