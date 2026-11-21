const { faq } = require('./_h');

module.exports = {
  faqs: [
    faq({
      id: 'report-menu', cat: 'reports',
      q: [`Reports section me kaun-kaun si reports milti hain?`, `Which reports are available in the Reports section?`],
      a: [`Reports me 6 options hain: Delivery Report, Scheduled SMS, API Report, Consolidate Report, MIS Report aur Credit History.`, `Reports has 6 options: Delivery Report, Scheduled SMS, API Report, Consolidate Report, MIS Report and Credit History.`],
      steps: [
        [`Delivery Report: aapne jo SMS bheje unki report (date filter ke saath).`, `Scheduled SMS: schedule karke lagaye SMS ki report.`, `API Report: API se bheje SMS ki report.`, `Consolidate Report: date-wise ya pure mahine ki report generate karke download karna.`, `MIS Report: monthly report graph me.`, `Credit History: recharge / credits ki history.`],
        [`Delivery Report: report of the SMS you have sent (with a date filter).`, `Scheduled SMS: report of the SMS you scheduled.`, `API Report: report of SMS sent through the API.`, `Consolidate Report: generate and download a date-wise or whole-month report.`, `MIS Report: monthly report in graphs.`, `Credit History: your recharge / credit history.`],
      ],
      img: [[`reports-menu`, null, null]],
      kw: `reports, report menu, reports section, kaun si report, report options, report kahan milti`,
    }),
    faq({
      id: 'report-delivery', cat: 'reports',
      q: [`Delivery report kahan dekhein? Date se kaise dekhein?`, `Where do I see the Delivery Report? How do I filter by date?`],
      a: [`Delivery Report me aapke bheje hue saare SMS ki report milti hai, aur date filter se kisi bhi din ya period ki report dekh sakte hain.`, `The Delivery Report shows all the SMS you sent, and with the date filter you can view any day or period.`],
      steps: [
        [`Reports > Delivery Report kholein.`, `From aur To date chunein aur Search karein.`, `Aapke bheje hue SMS ki list aayegi: Date, Total Mobiles, Msg Count, Text, Sender ID, Campaign Name, Result.`, `Upar Submit, Delivered, Failed aur Pending ki ginti dikhti hai.`],
        [`Open Reports > Delivery Report.`, `Select the From and To dates and click Search.`, `A list of your sent SMS appears: Date, Total Mobiles, Msg Count, Text, Sender ID, Campaign Name, Result.`, `The Submit, Delivered, Failed and Pending counts are shown at the top.`],
      ],
      img: [[`reports-delivery`, `1: date filter aur Search, 2: Total Mobiles par click karein`, `1: date filter and Search, 2: click on Total Mobiles`]],
      kw: `delivery report, report, dlr, sms report, report kahan, date wise report, status, bheje hue sms, history, delivery status, sms history`,
    }),
    faq({
      id: 'report-details', cat: 'reports',
      q: [`Kisi number ka status aur fail hone ka reason kaise dekhein?`, `How do I see the status of a number and why it failed?`],
      a: [`Delivery Report me Total Mobiles ke number par click karne se har number ka poora status, Error Code aur Error Description dikhta hai.`, `Click the Total Mobiles number in the Delivery Report to see each number's full status, Error Code and Error Description.`],
      steps: [
        [`Delivery Report me jis campaign ko dekhna hai uske Total Mobiles ke number par click karein.`, `Report Details me har number ka Request Date, Submit Date, Response (jaise DELIVRD), Error Code aur Error Description dikhta hai.`, `Failed SMS ka Error Code copy karke is chat me type karein - main uska matlab aur solution bata dunga.`, `Download button se ye details file me save kar sakte hain.`],
        [`In the Delivery Report click the Total Mobiles number of the campaign you want to check.`, `Report Details shows each number's Request Date, Submit Date, Response (e.g. DELIVRD), Error Code and Error Description.`, `Copy the Error Code of a failed SMS and type it in this chat - I will explain its meaning and the fix.`, `Use the Download button to save these details as a file.`],
      ],
      img: [[`reports-details`, `1: Error Code aur Description, 2: Download`, `1: Error Code and Description, 2: Download`]],
      kw: `number status, details, per number, error code kahan, failed reason, report details, total mobiles, click number, kis number par fail, error description, fail kyun`,
    }),
    faq({
      id: 'report-status-meaning', cat: 'reports',
      q: [`Submitted, Delivered, Failed, Pending ka matlab kya hai?`, `What do Submitted, Delivered, Failed and Pending mean?`],
      a: [`Report me har message ka ek status hota hai jo batata hai ki message abhi kis stage par hai.`, `Every message has a status in the report that tells you which stage it is at.`],
      steps: [
        [`Submitted: message operator ko bhej diya gaya hai.`, `Delivered: message receiver ke phone par pahunch gaya.`, `Failed: message deliver nahi ho paya - Error Code dekhein.`, `Pending: operator se final status ka wait hai (phone off ho sakta hai).`, `Expired: validity time me deliver nahi hua.`],
        [`Submitted: the message has been handed over to the operator.`, `Delivered: the message reached the receiver's phone.`, `Failed: the message could not be delivered - check the Error Code.`, `Pending: waiting for the final status from the operator (the phone may be off).`, `Expired: not delivered within the validity time.`],
      ],
      kw: `status, submitted, delivered, failed, pending, expired, matlab, meaning, dlr status, kya hota hai, status ka matlab`,
    }),
    faq({
      id: 'report-pending', cat: 'reports',
      q: [`SMS bahut der se Pending / Submitted dikha raha hai, kyun?`, `Why is my SMS stuck in Pending / Submitted?`],
      a: [`Aksar receiver ka phone band / network se bahar hota hai ya operator se status aane me deri hoti hai.`, `Usually the receiver's phone is off / out of coverage, or the operator is slow to return the status.`],
      steps: [
        [`15-30 minute wait karein - operator retry karta hai.`, `Phone on hote hi message deliver ho jata hai.`, `Bahut zyada messages pending hon to Campaign Name aur time ke saath support1@nimbusitsolutions.com par batayein.`],
        [`Wait 15-30 minutes - the operator keeps retrying.`, `The message is delivered as soon as the phone is on.`, `If many messages are pending, tell support1@nimbusitsolutions.com with the Campaign Name and time.`],
      ],
      kw: `pending, stuck, submitted, delay, late, der se, deliver nahi, delivery late, slow, atak, pending kyun`,
    }),
    faq({
      id: 'delivered-not-received', cat: 'reports',
      q: [`Report me Delivered hai par customer ko SMS nahi mila`, `Report says Delivered but the customer did not receive the SMS`],
      a: [`Delivered ka matlab hai message operator se phone tak pahunch gaya. Phir bhi customer ko na dikhe to ye cheezein check karein.`, `Delivered means the message reached the handset from the operator. If the customer still cannot see it, check the following.`],
      steps: [
        [`Customer ke phone me spam / promotions / blocked folder dekhein.`, `SMS app ka "Filter unknown senders" ya spam protection check karein.`, `Report Details me confirm karein ki number sahi tha.`, `Phir bhi na mile to number, time aur Campaign Name support1@nimbusitsolutions.com par bhejein.`],
        [`Check the spam / promotions / blocked folder on the customer's phone.`, `Check the SMS app's "Filter unknown senders" or spam protection.`, `Confirm in Report Details that the number was correct.`, `If still not found, send the number, time and Campaign Name to support1@nimbusitsolutions.com.`],
      ],
      kw: `delivered but, received nahi, mila nahi, customer ko nahi mila, not received, delivered hai par, spam, sms nahi aaya, delivered par nahi mila`,
    }),
    faq({
      id: 'report-scheduled', cat: 'reports',
      q: [`Scheduled SMS ki report kahan dekhein?`, `Where do I see the Scheduled SMS report?`],
      a: [`Jo SMS aapne schedule karke lagaye hain unki report Reports > Scheduled SMS me dikhti hai.`, `The report of the SMS you scheduled is shown in Reports > Scheduled SMS.`],
      steps: [[`Reports > Scheduled SMS kholein.`, `Date filter laga kar Search karein.`, `Schedule kiye hue campaigns ka status Delivery Report jaisa hi dikhega.`],
              [`Open Reports > Scheduled SMS.`, `Apply the date filter and search.`, `The status of your scheduled campaigns is shown like in the Delivery Report.`]],
      kw: `scheduled sms, schedule report, scheduled report, schedule kiya hua, schedule campaign report`,
    }),
    faq({
      id: 'report-api', cat: 'reports',
      q: [`API se bheje SMS ki report kahan dekhein?`, `Where do I see the report of SMS sent through the API?`],
      a: [`Reports > API Report me wo SMS dikhte hain jo SMS API ke through bheje gaye hain. Ye Delivery Report jaisi hi hoti hai.`, `Reports > API Report shows the SMS sent through the SMS API. It looks the same as the Delivery Report.`],
      steps: [[`Reports > API Report kholein.`, `Date filter lagakar Search karein.`, `Total Mobiles par click karke har number ka status aur Error Code dekhein.`],
              [`Open Reports > API Report.`, `Apply the date filter and search.`, `Click Total Mobiles to see each number's status and Error Code.`]],
      kw: `api report, api sms report, api se bheje sms, api delivery report, api status`,
    }),
    faq({
      id: 'report-consolidate', cat: 'reports',
      q: [`Consolidate Report kaise nikalein?`, `How do I get the Consolidate Report?`],
      a: [`Date-wise ya pure mahine ki report ke liye request daalte hain. Backend team report generate karti hai aur kuch der me (ya 24 ghante ke andar) Download ka option aa jata hai.`,
          `Raise a request for a date-wise or whole-month report. The backend team generates it and the Download option appears shortly (or within 24 hours).`],
      steps: [
        [`Reports > Consolidate Report kholein.`, `Date filter chunein ya pura mahina select karein.`, `Report request submit karein.`, `Kuch der baad ya 24 ghante ke andar Download ka option aa jata hai - download par click karke report save karein.`],
        [`Open Reports > Consolidate Report.`, `Choose a date filter or select the whole month.`, `Submit the report request.`, `After a while (within 24 hours) the Download option appears - click it to save the report.`],
      ],
      kw: `consolidate, consolidate report, monthly report, month report, pura mahina, report request, download report, report generate, mahine ki report`,
    }),
    faq({
      id: 'report-mis', cat: 'reports',
      q: [`MIS Report kya hai?`, `What is the MIS Report?`],
      a: [`MIS Report me aapki monthly report graph ke roop me dikhti hai, jisse mahine ka poora SMS ka hisaab ek nazar me dikh jata hai.`, `The MIS Report shows your monthly report as graphs, so you can see the whole month's SMS picture at a glance.`],
      steps: [[`Reports > MIS Report kholein.`, `Graph me monthly report dekhein.`], [`Open Reports > MIS Report.`, `View the monthly report in the graph.`]],
      kw: `mis, mis report, monthly graph, graph report, monthly report graph, analytics`,
    }),
    faq({
      id: 'credit-history', cat: 'reports',
      q: [`Credit / recharge history kahan dekhein?`, `Where do I see my credit / recharge history?`],
      a: [`Reports > Credit History me aapke panel me jitne bhi SMS recharge hue unki history dikhti hai.`, `Reports > Credit History shows the history of all SMS recharges done in your panel.`],
      steps: [
        [`Reports > Credit History kholein.`, `Yahan aapke panel me hue saare recharge dikhte hain.`, `History download karne ka option bhi hota hai.`, `Reseller panel ho to wo apne clients ko jo credits dete hain wo bhi yahan dikhte hain.`],
        [`Open Reports > Credit History.`, `All the recharges done in your panel are listed here.`, `There is also an option to download the history.`, `On a reseller panel, the credits the reseller gave to his clients are shown here too.`],
      ],
      kw: `credit history, recharge history, credits kab add hue, balance history, recharge, credit kab mile, credit add history`,
    }),
  ],
};
