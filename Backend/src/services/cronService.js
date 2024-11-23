const cron = require('node-cron');
const { monthlyFeeByDue } = require('../controller/monthlyFeeController');
const { emailToUsers } = require('../controller/userController');


/* const emailDueFeeIn7Days = new cron.CronJob('0 9 * * *', () => {
    console.log('Running cron to send due date emails...');
    monthlyFeeByDue(7);
}, null, true, 'America/Argentina/Buenos_Aires');

emailDueFeeIn7Days.start();

const emailDueFeeIn1Day = new cron.CronJob('0 9 * * *', () => {
    console.log('Running cron to send due date emails...');
    monthlyFeeByDue(1);
}, null, true, 'America/Argentina/Buenos_Aires');

emailDueFeeIn1Day.start(); */

const emailTest = cron.schedule('16 21 * * *', () => {
    console.log('Running cron to send email Test...');
    emailToUsers();
},{
    scheduled: true,
    timezone: 'America/Argentina/Buenos_Aires' // Ajusta la zona horaria según tu necesidad
  });

emailTest.start();