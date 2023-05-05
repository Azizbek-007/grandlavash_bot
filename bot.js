const { Bot, InlineKeyboard, Keyboard, webhookCallback  } = require("grammy");
const express = require('express');
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser');

const { addUser, GetLang, checkPhoneNumberExists, addPhoneNumber, SetLang } = require('./db');
const { getText } = require('./lang');

app.use(cors())
app.use(bodyParser.json());
app.use(express.json());

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot("5943068483:AAEJhZnR00wOeODWnkPAO9-tZaus19w5mAE"); // <-- put your bot token between the ""

bot.command("start", async (ctx) => {
    await addUser(ctx.from.id, ctx.from.first_name + ' ' + ctx.from.last_name)
    const lang = await GetLang(ctx.from.id) ?? "qq"
    
    if(await checkPhoneNumberExists(ctx.from.id) == false) {
    
        const keyboard = new Keyboard()
            .requestContact("📞Телефон номер жибериў")
            .resized();
        
        await ctx.reply("Телефон номериңизди жибериң", {
            reply_markup: keyboard 
        })
        
        return;
    }

    const inlineKeyboard = new InlineKeyboard()
        .webApp(getText(lang, 'order_btn'), "https://tg-store-client.vercel.app/").row()
        .text(getText(lang, 'setting_btn'), "setting")
    
    await ctx.reply(
            getText(lang, 'start'),
            { 
                parse_mode: "HTML",
                reply_markup: inlineKeyboard 
            }
    )
});

bot.callbackQuery("setting", async (ctx) => { 
    await ctx.deleteMessage()
    const lang = await GetLang(ctx.from.id)
    const inlineKeyboard = new InlineKeyboard() 
        .text(getText(lang, 'edit_phone_btn'), "edit_phonenumber").row()
        .text(getText(lang, 'edit_lang_btn'), "edit_lang")

    await ctx.reply(getText(lang, 'setting_btn').replace('⚙️', ''), {
        reply_markup: inlineKeyboard
    })
  });

bot.callbackQuery("edit_phonenumber", async (ctx) => {
    await ctx.deleteMessage()
    const lang = await GetLang(ctx.from.id)
    const keyboard = new Keyboard()
        .requestContact(getText(lang, 'send_number_btn'))
        .resized();
    await bot.api.sendMessage(ctx.chat.id, getText(lang, 'send_nummber'), {
        reply_markup: keyboard
    })
})

bot.callbackQuery("edit_lang", async (ctx) => {
    await ctx.deleteMessage()
    const inlineKeyboard = new InlineKeyboard()
    .text("Қарақалпақ тили", `lang=qq`).row()
    .text("🇺🇿 O'zbek tili", `lang=uz`).row()
    .text("🇷🇺 Руский язык", `lang=ru`)
    await ctx.reply("Өзиңизге қолай тилди сайлаң!\n\nВыберите удобный Вам язык!.\n\nO'zingizga qulay tilni tanlang!", {
        reply_markup: inlineKeyboard
    })
})

bot.callbackQuery(/lang/, async (ctx) => {
    // Callback datani olamiz
    const callbackData = ctx.update.callback_query.data;
    console.log(callbackData)
    // Lang kodini ajratib olamiz
    const langCode = callbackData.split('=')[1];
    await SetLang(ctx.from.id, langCode)
    // Lang kodiga ko'ra xabar yuboramiz
    switch (langCode) {
      case 'uz':
        ctx.answerCallbackQuery('Siz o\'zbek tilini tanladingiz ✅');
        break;
      case 'ru':
        ctx.answerCallbackQuery('Вы выбрали русский язык ✅');
        break;
      case 'qq':
        ctx.answerCallbackQuery('Сиз қарақалпақ тилин таңладиңиз ✅');
        break;
    }
    ctx.deleteMessage()
    const inlineKeyboard = new InlineKeyboard()
    .webApp(getText(langCode, 'order_btn'), "https://tg-store-client.vercel.app/").row()
    .text(getText(langCode, 'setting_btn'), "setting")
    ctx.reply(
        getText(langCode, 'start'),
        {
            parse_mode: "HTML",
            reply_markup: inlineKeyboard 
        })
});


bot.on("msg:contact", async (ctx) => {
    const phone_number = ctx.message.contact.phone_number
    const pattern =/^[\+]?(998)?([- (])?(90|91|93|94|95|98|99|33|97|71|75)([- )])?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/gm
    const lang = await GetLang(ctx.from.id)
    if(phone_number.match(pattern)) {
        await addPhoneNumber(ctx.from.id, phone_number)
        await ctx.reply("✅", { 
            reply_to_message_id: ctx.message.message_id,
            reply_markup: { remove_keyboard: true }
        })
        

        const inlineKeyboard = new InlineKeyboard()
        .webApp(getText(lang, 'order_btn'), "https://tg-store-client.vercel.app/").row()
        .text(getText(lang, 'setting_btn'), "setting")
        await ctx.reply(
            getText(lang, 'start'),
            {
                parse_mode: "HTML",
                reply_markup: inlineKeyboard
            })
        return
    }
    await ctx.reply(getText(lang, 'erro_nummber'))
})
 
bot.on("::phone_number", async (ctx) => {
    const pattern =/^[\+]?(998)?([- (])?(90|91|93|94|95|98|99|33|97|71|75)([- )])?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/gm
    const lang = await GetLang(ctx.from.id)
    if(ctx.message.text.match(pattern)) {
        await addPhoneNumber(ctx.from.id, ctx.message.text)
        await ctx.reply("✅", { 
            reply_to_message_id: ctx.message.message_id,
            reply_markup: { remove_keyboard: true } 
        })

    
        const inlineKeyboard = new InlineKeyboard()
        .webApp(getText(lang, 'order_btn'), "https://tg-store-client.vercel.app/").row()
        .text(getText(lang, 'setting_btn'), "setting")
        await ctx.reply(
            getText(lang, 'start'),
            {
                parse_mode: "HTML",
                reply_markup: inlineKeyboard
            })
        return
    }
    await ctx.reply(getText(lang, 'erro_nummber'))
    
})

app.get('/order/:id', async (req, res) => {
    const user_id = req.params.id;
    const lang = await GetLang(user_id);
    await bot.api.sendMessage(user_id, getText(lang, 'order_ok'))
    res.send('2222222')
})

// app.use(webhookCallback(bot, "express"));


app.listen(5555, function () {
    bot.start()
    console.log("Bot runn")
    console.log('CORS-enabled web server listening on port 80')
})
