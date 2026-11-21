const { faq } = require('./_h');

module.exports = {
  faqs: [
    faq({
      id: 'sms-failed-why', cat: 'errors',
      q: [`Mera SMS fail kyun ho gaya?`, `Why did my SMS fail?`],
      a: [`SMS fail hone ki wajah Delivery Report me Error Code ke saath milti hai. Wo code yahin type karke uska matlab aur solution jaan sakte hain.`, `The reason for a failed SMS is shown in the Delivery Report as an Error Code. Type that code here to learn its meaning and the fix.`],
      steps: [
        [`Reports > Delivery Report kholein aur campaign ke Total Mobiles par click karein.`, `Report Details me failed number ka Error Code dekhein.`, `Us code ko is chat me type karein (jaise 113 ya 497).`, `Chat aapko matlab aur step-by-step solution bata dega.`, `Common wajah: URL whitelist na hona, Template mismatch, Header / Sender issue, DND number, galat number, phone band.`],
        [`Open Reports > Delivery Report and click the Total Mobiles of the campaign.`, `In Report Details find the Error Code of the failed number.`, `Type that code in this chat (e.g. 113 or 497).`, `The chat will explain its meaning and give a step-by-step fix.`, `Common reasons: URL not whitelisted, Template mismatch, Header / Sender issue, DND number, wrong number, phone switched off.`],
      ],
      img: [[`reports-details`, `Error Code yahan dikhta hai`, `The Error Code is shown here`]],
      kw: `fail, failed, sms fail, nahi gaya, not delivered, deliver nahi hua, error, problem, kyun fail, sms nahi ja raha, sms fail ho raha`,
    }),
    faq({
      id: 'error-code-lookup', cat: 'errors',
      q: [`Error Code ka matlab jaanna hai`, `I want to know the meaning of an Error Code`],
      a: [`Bas apna Error Code neeche box me type karein, main uska matlab aur solution bata dunga. Saare operator error codes yahan available hain.`, `Just type your Error Code in the box below and I will explain its meaning and the solution. All operator error codes are available here.`],
      steps: [[`Delivery Report ke Report Details me jo Error Code dikha rha hai use copy karein (jaise 113, 497, 27, 21B).`, `Neeche message box me paste / type karke Send karein.`],
              [`Copy the Error Code shown in Report Details of your Delivery Report (e.g. 113, 497, 27, 21B).`, `Paste / type it in the message box below and send.`]],
      action: 'errorPrompt',
      kw: `error code, code ka matlab, error meaning, code meaning, err code, errorcode, error code kya hai`,
    }),
    faq({
      id: 'url-whitelist', cat: 'errors',
      q: [`Link / URL wala SMS fail ho raha hai (URL whitelist error)`, `SMS containing a link / URL is failing (URL whitelist error)`],
      a: [`Ye sabse common issue hai. SMS me jo bhi link / URL hai (website, short link, landing page link) use pehle DLT portal se whitelist karwana zaroori hai. URL whitelist hone ke baad hi us link wale SMS deliver hote hain.`,
          `This is the most common issue. Any link / URL used in the SMS (website, short link, landing page link) must first be whitelisted on the DLT portal. SMS containing that link are delivered only after the URL is whitelisted.`],
      steps: [
        [`Report Details me Error Code dekhein. URL ke error ye hain: 497 (URL not whitelisted), 700 (No CTA whitelisted), 701 (URL CTA not matched), 5901 (CTA whitelisting error). Email ke liye 498 aur number ke liye 499.`,
         `Sabse pehle DLT portal (Jio / Airtel / Vi / BSNL) par apna URL whitelist (CTA) karwayein.`,
         `URL whitelist hone ke baad hi us link wala SMS bhejein.`,
         `SMS / template me wahi URL hona chahiye jo whitelist hua hai (short link ya landing page link use kar rahe hain to wahi link whitelist karwayein).`,
         `Template ka text DLT par approved text se match hona chahiye.`,
         `Ab dobara SMS bhejein. Phir bhi fail ho to Error Code, URL aur Template ID ke saath support1@nimbusitsolutions.com par mail karein.`],
        [`Check the Error Code in Report Details. URL errors are: 497 (URL not whitelisted), 700 (No CTA whitelisted), 701 (URL CTA not matched), 5901 (CTA whitelisting error). 498 is for email and 499 for a number.`,
         `First get your URL whitelisted (CTA) on the DLT portal (Jio / Airtel / Vi / BSNL).`,
         `Send the SMS containing that link only after the URL is whitelisted.`,
         `The SMS / template must contain exactly the URL that was whitelisted (if you use a short link or landing page link, get that exact link whitelisted).`,
         `The template text must match the text approved on DLT.`,
         `Send the SMS again. If it still fails, mail support1@nimbusitsolutions.com with the Error Code, URL and Template ID.`],
      ],
      tips: [[`Yaad rakhein: pehle DLT se URL whitelist, uske baad hi SMS jayega.`], [`Remember: first whitelist the URL on DLT, only then will the SMS go through.`]],
      kw: `link wala sms fail, link wala sms fail ho raha hai, link sms fail, url wala sms fail, link wala message fail, link ke saath sms fail, url, link, whitelist, url whitelist, white list, whitelisted, link wala sms, link nahi ja raha, link fail, cta, 497, 498, 499, 700, 701, 5901, short link whitelist, website link sms, url not whitelisted, url error, link ke saath sms, link sms fail`,
    }),
    faq({
      id: 'err-template', cat: 'errors',
      q: [`SMS fail: Template mismatch / Template not found`, `SMS failed: Template mismatch / Template not found`],
      a: [`SMS ka text DLT par approved template se match nahi hua, ya template inactive / blacklisted / not found hai.`, `The SMS text did not match the approved DLT template, or the template is inactive / blacklisted / not found.`],
      steps: [
        [`SMS text DLT template se word-to-word same ho; sirf {#var#} wali jagah badal sakti hai.`, `Variable ki length DLT me di gayi limit se zyada na ho.`, `Manage Template me sahi Template ID hai aur status APPROVED hai.`, `Template me sender map hai (blue Link icon) - dekhein "Template add karne ke baad bhi SMS nahi ja raha".`, `DLT par bhi template Active hona chahiye.`],
        [`The SMS text must match the DLT template word for word; only the {#var#} positions may change.`, `A variable value must not exceed the length allowed on DLT.`, `Manage Template has the correct Template ID and the status is APPROVED.`, `The sender is mapped to the template (blue Link icon) - see "SMS is not going even after adding the template".`, `The template must also be Active on DLT.`],
      ],
      kw: `template mismatch, template not matched, template not found, 113, 118, 119, 120, 426, 429, content mismatch, template error, template inactive, template blacklisted`,
    }),
    faq({
      id: 'err-header', cat: 'errors',
      q: [`SMS fail: Header / Sender ID inactive ya not found`, `SMS failed: Header / Sender ID inactive or not found`],
      a: [`Jo Header (Sender ID) aapne use kiya wo DLT par registered / active nahi hai, ya is template se linked nahi hai.`, `The Header (Sender ID) you used is not registered / active on DLT, or is not linked to this template.`],
      steps: [
        [`Compose SMS me wahi Sender ID select karein jo DLT par isi template se linked hai (spelling bilkul same).`, `DLT par Header ka status Active ho.`, `Manage Sender me Sender approved ho.`, `Manage Template me wahi Sender blue Link icon se map ho.`],
        [`Select in Compose SMS the same Sender ID that is linked to this template on DLT (exact spelling).`, `The Header must be Active on DLT.`, `The Sender must be approved in Manage Sender.`, `The same Sender must be mapped in Manage Template with the blue Link icon.`],
      ],
      kw: `header, header inactive, header not found, sender block, 115, 116, 117, 127, 421, 422, 423, 430, sender id error, header error`,
    }),
    faq({
      id: 'err-entity', cat: 'errors',
      q: [`SMS fail: Entity not found / inactive`, `SMS failed: Entity not found / inactive`],
      a: [`Aapki company ka DLT Entity ID valid nahi mila (not found / inactive / blacklisted / mismatch).`, `Your company's DLT Entity ID was not valid (not found / inactive / blacklisted / mismatch).`],
      steps: [
        [`DLT portal par Entity ka status Active dekhein.`, `Manage Entity me Entity ID DLT wali ID se bilkul same ho (sirf numbers).`, `TM Delivery me 140200000057 hai ya nahi dekhein.`, `Fix ke baad test SMS bhejein; na chale to Entity ID ke saath support1@nimbusitsolutions.com par mail karein.`],
        [`Check that the Entity status is Active on the DLT portal.`, `The Entity ID in Manage Entity must be exactly the same as on DLT (numbers only).`, `Check that TM Delivery contains 140200000057.`, `Send a test SMS after the fix; if it still fails mail support1@nimbusitsolutions.com with the Entity ID.`],
      ],
      kw: `entity not found, entity inactive, entity blacklisted, 111, 112, 128, 129, 412, 414, 415, entity error, entity id galat`,
    }),
    faq({
      id: 'err-dnd', cat: 'errors',
      q: [`SMS fail: DND number / Promotional time issue`, `SMS failed: DND number / promotional time issue`],
      a: [`Receiver DND par hai ya promotional SMS allowed time ke bahar bheja gaya.`, `The receiver is on DND or the promotional SMS was sent outside the allowed time.`],
      steps: [
        [`Promotional SMS DND number par nahi jata - Transactional / Service template use karein jahan allowed ho.`, `Promotional SMS sirf 10 AM se 9 PM ke beech bhejein.`, `Number ka consent ho to DLT par consent register karein.`, `Aise numbers ko apni list se hata dein.`],
        [`Promotional SMS cannot go to DND numbers - use Transactional / Service templates where allowed.`, `Send promotional SMS only between 10 AM and 9 PM.`, `If you have the number's consent, register it on DLT.`, `Remove such numbers from your list.`],
      ],
      kw: `dnd, do not disturb, dnd number, 168, 2168, 651, 438, promotional time, raat ko sms, night sms, preference`,
    }),
    faq({
      id: 'err-invalid-number', cat: 'errors',
      q: [`SMS fail: Number galat / phone band / network se bahar`, `SMS failed: invalid number / phone off / out of coverage`],
      a: [`Problem receiver ke number ya phone me hai - number galat, phone band, network se bahar ya inbox full.`, `The issue is with the receiver's number or phone - wrong number, switched off, out of coverage or inbox full.`],
      steps: [
        [`Number sahi 10 digit ka hai ya nahi dekhein.`, `Phone on / network me aane par SMS baad me deliver ho sakta hai - kuch der baad dobara try karein.`, `Baar-baar fail ho to number invalid / inactive ho sakta hai - list se hata dein.`],
        [`Check that the number is a valid 10-digit number.`, `The SMS may be delivered later once the phone is on and in coverage - retry after some time.`, `If it keeps failing the number may be invalid / inactive - remove it from your list.`],
      ],
      kw: `invalid number, number galat, phone band, switched off, out of coverage, absent subscriber, 110, 027, 21b, 22d, inbox full, handset`,
    }),
    faq({
      id: 'no-credit', cat: 'errors',
      q: [`Balance / credits khatam ho gaye ya SMS nahi ja raha`, `My balance / credits are over or SMS is not being sent`],
      a: [`Credits kam hone par SMS submit nahi hota. Confirmation screen par credits to be deducted aur balance dikhta hai.`, `SMS cannot be submitted when credits are low. The confirmation screen shows credits to be deducted and your balance.`],
      steps: [
        [`Confirmation screen par Current Balance aur credits to be deducted dekhein.`, `Credits kam hon to Utilities > Apply For SMS Credits se request daalein ya apne AM se baat karein.`, `Reports > Credit History me apni recharge history dekhein.`, `Online payment ke liye Utilities > Pay Online use karein.`],
        [`Check Current Balance and credits to be deducted on the confirmation screen.`, `If credits are low, apply through Utilities > Apply For SMS Credits or talk to your AM.`, `See your recharge history in Reports > Credit History.`, `For online payment use Utilities > Pay Online.`],
      ],
      kw: `balance, credit khatam, low balance, insufficient balance, recharge, credits chahiye, credit kam, balance zero, credit nahi, sms submit nahi`,
    }),
  ],
};
