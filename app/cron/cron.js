'use strict'

/*
|--------------------------------------------------------------------------
| Cron Jobs
|--------------------------------------------------------------------------
|  * * * * * *
|  | | | | | |
|  | | | | | day of week
|  | | | | month
|  | | | day of month
|  | | hour
|  | minute
|  second ( optional ) /s
*/

const cron = require("node-cron");
const moment = require("moment-timezone");
moment.locale('es');
const timezone = "America/Mexico_City";
const datetime = moment().tz(timezone);

class Cron{
    constructor(){
        this.initialize();
    }
    
    seconds(active = true){
        cron.schedule("* * * * * *", () => {
            var time = datetime.format('dddd D [de] MMMM [del] YYYY, hh:mm:ss a'); 
            console.log("Running a task every second " + time);
        }, { 
            scheduled: active, 
            timezone: timezone
        });
    }

    minutes(active = true){
        cron.schedule("*/2 * * * *", () => {
            var time = datetime.format('hh:mm:ss a');  
            console.log("Running a task every two minutes " + time);
        }, { 
            scheduled: active, 
            timezone: timezone
        });
    }

    initialize(){
        try{
            this.seconds(false);
            this.minutes(false);

            console.log(`Cron jobs initialized successfully`);
        }
        catch(error){
            console.log("Something went wrong trying to initialize cron jobs");
            console.log(error);
        }
    }

}

module.exports = Cron;
