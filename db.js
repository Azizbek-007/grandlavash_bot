const { Sequelize } = require('sequelize');
const config = require(__dirname + '/config/config.json')['development'];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config); 
}

try {
   sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}



async function addUser(user_id, fullName) {
    try {
      const newUser = await sequelize.query("INSERT INTO `member`(`user_id`, `full_name`) VALUES " + `('${user_id}', '${fullName}')`)
      return newUser.toJSON();
    } catch (error) {
      return false;
    }
}

async function GetLang(user_id) {
    try {

      const user = await sequelize.query("SELECT lang FROM `member` WHERE `user_id`=" + `'${user_id}'` + " LIMIT 1")
 
      const res = user[0][0]['lang']
      return res; // user borligi haqida ma'lumot beradi, agar user bor bo'lsa true qiymatini, aks holda false qiymatini qaytaradi
    } catch (error) {
      console.error('Error checking phone number exists: ', error);
      return false;
    }
}

async function checkPhoneNumberExists(user_id) {
    try {
     const user = await sequelize.query("SELECT phone_number FROM `member` WHERE `user_id`=" + `'${user_id}'` + " LIMIT 1")

      const res = user[0][0]['phone_number'] == null ? false : true
      console.log(res)
      return res; // user borligi haqida ma'lumot beradi, agar user bor bo'lsa true qiymatini, aks holda false qiymatini qaytaradi
    } catch (error) {
      console.error('Error checking phone number exists: ', error);
      return false;
    }
}

async function addPhoneNumber(user_id, phoneNumber) {
    try {
        console.log(phoneNumber)
       
      const user = await sequelize.query("UPDATE `member` SET `phone_number`='"+ phoneNumber +"' WHERE `user_id`='"+ user_id +"'")

      console.log('Phone number added successfully');
      return true;
    } catch (error) {
      console.error('Error adding phone number: ', error);
      return false;
    }
}


async function SetLang(user_id, lang) {
    try {
       const user = await sequelize.query("UPDATE `member` SET `lang`='"+ lang +"' WHERE `user_id`='"+ user_id +"'")
      return true;
    } catch (error) {
      console.error('Error adding phone number: ', error);
      return false;
    }
}


  
  
module.exports = {
    addUser,
    GetLang,
    checkPhoneNumberExists,
    addPhoneNumber,
    SetLang
}