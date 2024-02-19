const jobTime =  ['07:00 - 16:00', ,  '08:00 - 17:00', '9:00 - 18:00', '11:00 - 20:00',   '13:00 - 22:00' , '15:00 - 00:00',  '17:00 - 02:00', '08:00 - 20:00'  ]
const DaysUz = ['Dushanba', 'Seshanba',  'Chorshanba', 'Payshanba' ,  'Juma'  ,'Shanba' ,'Yakshanba' ]
const DaysRu = ['Понедельник',  'Вторник', 'Среда' ,  'Четверг'  ,'Пятница'  , 'Суббота'  , 'Воскресенье' ]

let dateDayObj = {
  "1" : 31,
  "2" : 29,
  "3" : 31,
  "4" : 30,
  "5" : 31,
  "6" : 30,
  "7" : 31,
  "8" : 31,
  "9" : 30,
  "10" : 31,
  "11" : 30,
  "12" : 31,
}

let InfoUserArr = [
  [
      'F.I.Sh',
      'Telefon raqam',
      'Ish vaqti',
      'Dam olish kunlari',
      'Sababi' ,
      `S'orovlar soni`,
      'Yuborilgan sana',
      `Admin Javobi`,
      'Admin Javob bergan vaqti'

  ]
]
function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; 
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
  
    // Agar kun yoki oy bir xonali bo'lsa, oldiga 0 qo'shish
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
  

module.exports = {
    jobTime,
    DaysUz,
    DaysRu,
    formatDate,
    dateDayObj,
    InfoUserArr
}