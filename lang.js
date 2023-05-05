const text = {
    "start": {
        "qq": "Ассалаума алейкум!  GRAND LAVASH 🌯 кa хош келипсиз!\n<b>Буйыртпа бериу</b> ушын төмендеги туймени басың!⤵️",
        "ru": 'Здравствуйте, добро пожаловать в <b>GRAND LAVASH </b> 🌯\nЧто бы <b>заказать</b> нажмите кнопку ниже ⤵️ ',
        "uz": 'Assalomu aleykum! <b>GRAND LAVASH </b> 🌯 ga xush kelibsiz!\n<b>Buyurtma berish</b> uchun pastdagi tugmani bosing!⤵️'
    },
    "order_btn": {
        "qq": '🌯 Буйыртпа бериу',
        "ru": '🌯 Заказать',
        "uz": '🌯 Buyurtma berish'
    },
    "setting_btn": {
        "qq": "⚙️ Сазламалар",
        "ru": "⚙️ Настройки",
        "uz": "⚙️ Sozlamalar"
    },
    "edit_phone_btn": {
        "qq": "📞 Номерди өзгертиў",
        "ru": "📞 Изменить номер",
        "uz": "📞 Raqamni o'zgartirish"
    }, 
    "edit_lang_btn": {
        "qq": "🌐 Тилин өзгертиў",
        "ru": "🌐 Изменение языка",
        "uz": "🌐 Tilini o'zgartirish"
    },
    "send_number_btn": {
        "qq": "📞Телефон номер жибериў",
        "ru": "📞 Отправить номер телефона",
        "uz": "📞Telefon raqam yuborish"
    }, 
    "send_nummber": {
        "qq": "Телефон номериңизди жибериң",
        "ru": "Отправьте свой номер телефона",
        "uz": "Telefon raqamingizni yuboring"
    }, 
    "erro_nummber": {
        "qq": "Телефон номер қәте киргизилди",
        "ru": "Номер телефона был введен неверно",
        "uz": "Telefon raqam noto'g'ri kiritilgan"
    },
    "order_ok": {
        "qq": "Сиздиң буйыртпаңыз қабыл етилди тез арада оператор сиз бенен байланысады. Ас болсын!",
        "ru": "Ваш заказ было принято, в ближайшее время с Вами свяжется наш оператор. Приятного аппетита!",
        "uz": "Sizning buyurtmangiz qabul qilindi tez orada operator siz bilan bog’lanadi. Yoqimli ishtaha!"
    },
}

function getText(lang, pattern) {
    return text[pattern][lang]
}

module.exports = {
    getText
}