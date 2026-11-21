const { faq } = require('./_h');

module.exports = {
  faqs: [
    faq({
      id: 'clicker-what', cat: 'clicker',
      q: [`Clicker kya hai aur isme kya-kya options hain?`, `What is Clicker and what options does it have?`],
      a: [`Clicker me aap SMS ke saath ek link bhejte hain (website, PDF, YouTube video ya image) aur dekh sakte hain ki kitne logon ne us par click kiya.`,
          `In Clicker you send a link along with the SMS (website, PDF, YouTube video or image) and can see how many people clicked it.`],
      steps: [
        [`Landing Page: jo cheez SMS me dikhani hai uska page link banana.`, `Manage Campaign: campaigns ki report dekhna aur naya campaign (Create Campaign) banana.`, `Clicker Split-Scheduler: clicker campaign ko batches me bhejna.`, `Consolidate Data Request: pure mahine ya date filter ki report request karna.`],
        [`Landing Page: create a page link for whatever you want to show in the SMS.`, `Manage Campaign: view campaign reports and create a new campaign (Create Campaign).`, `Clicker Split-Scheduler: send a clicker campaign in batches.`, `Consolidate Data Request: request a report for a whole month or a date range.`],
      ],
      img: [[`clicker-menu`, null, null]],
      kw: `clicker, click, link sms, tracking, landing, clicker kya hai, link tracking, click count, clicker options`,
    }),
    faq({
      id: 'landing-create', cat: 'clicker',
      q: [`Landing Page kaise banayein?`, `How do I create a Landing Page?`],
      a: [`SMS me aap jo bhi dikhana chahte hain - website, PDF, YouTube video ya image - uska ek landing page link yahan banta hai, jise Clicker campaign me use karte hain.`,
          `Whatever you want to show in the SMS - a website, PDF, YouTube video or image - gets a landing page link here, which you use in a Clicker campaign.`],
      steps: [
        [`Clicker > Landing Page kholein aur Create New (Add New Landing Page) par click karein.`, `Landing Page Name likhein.`, `Link Type chunein (Website, PDF, YouTube, Image ...).`, `URL daalein (jaise http://www.xyz.com).`, `Save karein - aapke liye page link ban jayega.`, `Save ke baad list me Edit aur Preview kar sakte hain.`],
        [`Open Clicker > Landing Page and click Create New (Add New Landing Page).`, `Enter the Landing Page Name.`, `Choose the Link Type (Website, PDF, YouTube, Image ...).`, `Enter the URL (e.g. http://www.xyz.com).`, `Click Save - a page link is created for you.`, `After saving you can Edit and Preview it from the list.`],
      ],
      tips: [[`Link wale SMS ke liye URL pehle DLT par whitelist hona zaroori hai, warna SMS fail ho sakta hai.`], [`For SMS containing a link, the URL must be whitelisted on DLT first, otherwise the SMS can fail.`]],
      img: [[`clicker-landing-add`, `1: Link Type, 2: URL, 3: Save`, `1: Link Type, 2: URL, 3: Save`]],
      kw: `landing page, landing, add landing, link type, website link, pdf link, youtube link, image link, page link, create landing, landing page kaise`,
    }),
    faq({
      id: 'landing-edit-preview', cat: 'clicker',
      q: [`Landing Page edit ya preview kaise karein?`, `How do I edit or preview a Landing Page?`],
      a: [`Landing Page list me har page ke saamne Edit aur Preview icons hote hain.`, `Each page in the Landing Page list has Edit and Preview icons.`],
      steps: [
        [`Clicker > Landing Page me list kholein.`, `Edit icon se naam ya link badlein.`, `Preview icon se dekhein ki customer ko page kaisa dikhega.`],
        [`Open the list in Clicker > Landing Page.`, `Use the Edit icon to change the name or link.`, `Use the Preview icon to see how the page will look to the customer.`],
      ],
      img: [[`clicker-landing-list`, `Edit aur Preview icons`, `Edit and Preview icons`]],
      kw: `edit landing, preview, landing edit, page preview, landing page edit, landing page dekhna`,
    }),
    faq({
      id: 'clicker-campaign-create', cat: 'clicker',
      q: [`Clicker campaign kaise banayein?`, `How do I create a Clicker campaign?`],
      a: [`Clicker campaign SMS bhejne jaisa hi hai, bas isme Landing Page chunna aur clicker ki file upload karni hoti hai.`, `A Clicker campaign works like sending an SMS, with the extra steps of choosing a Landing Page and uploading the clicker file.`],
      steps: [
        [`Clicker > Manage Campaign kholein aur Create Campaign par click karein.`, `Campaign Name, Entity ID aur Sender ID bharein.`, `Landing Page dropdown se apna banaya hua landing page chunein.`, `Open Template se template chunein - link wali jagah par {#var#} aata hai.`, `File Upload me apna data (.TXT ya .CSV) upload karein - Note me diya format follow karein.`, `Zyada clicker lagane ke liye + Add New Field par click karein.`, `Zaroorat ho to Schedule Date set karein, phir SEND NOW dabayein.`],
        [`Open Clicker > Manage Campaign and click Create Campaign.`, `Fill the Campaign Name, Entity ID and Sender ID.`, `Select your landing page from the Landing Page dropdown.`, `Choose the template with Open Template - the link goes in the {#var#} position.`, `Upload your data in File Upload (.TXT or .CSV) - follow the format given in the Note.`, `Click + Add New Field to add more clickers.`, `Set a Schedule Date if needed, then click SEND NOW.`],
      ],
      tips: [[`Link wale SMS ke liye URL DLT par whitelist hona zaroori hai.`], [`The URL used in the SMS must be whitelisted on DLT.`]],
      img: [[`clicker-campaign-landing`, `Landing Page chunein`, `Select the Landing Page`], [`clicker-campaign-upload`, `1: File Upload, 2: + Add New Field, 3: SEND NOW`, `1: File Upload, 2: + Add New Field, 3: SEND NOW`]],
      kw: `clicker campaign, create campaign, campaign banana, add new field, link sms bhejna, clicker sms, clicker bhejna, clicker send`,
    }),
    faq({
      id: 'clicker-file-format', cat: 'clicker',
      q: [`Clicker file ka format kya hai? Variable nahi utha raha`, `What is the Clicker file format? Variables are not being picked`],
      a: [`Clicker campaign me sirf .TXT ya .CSV file chalti hai, aur data bilkul Note me diye gaye format me hona chahiye - tabhi variable uthte hain.`, `Clicker campaigns accept only .TXT or .CSV files, and the data must follow the format in the Note exactly - only then are the variables picked.`],
      steps: [
        [`File .TXT ya .CSV ho.`, `Pehle column me mobile number, pehli row heading ki.`, `Aage ke columns A1, A2, A3 variables se match hote hain.`, `Note me likha format (MOBILE, NAME, OTHER) dekhkar usi me data bharein aur dobara upload karein.`],
        [`The file must be .TXT or .CSV.`, `Mobile number in the first column and the heading in the first row.`, `The next columns map to the variables A1, A2, A3.`, `Follow the format shown in the Note (MOBILE, NAME, OTHER), fill your data and upload again.`],
      ],
      img: [[`sms-custom-format`, null, null]],
      kw: `clicker file, csv txt, file format clicker, variable clicker, clicker variable, clicker file upload`,
    }),
    faq({
      id: 'clicker-report', cat: 'clicker',
      q: [`Clicker campaign ki report kahan dekhein?`, `Where can I see the Clicker campaign report?`],
      a: [`Clicker campaign ki report Manage Campaign me date-wise dikhti hai - yahin se campaign bhi create hota hai.`, `The Clicker campaign report is shown date-wise in Manage Campaign - campaigns are also created from the same page.`],
      steps: [
        [`Clicker > Manage Campaign kholein.`, `From Date aur To Date chunkar Search Now dabayein.`, `Table me Campaign Name, Link Type, Sender ID, SMS Text, File Count aur Click Count dikhenge.`, `Roz ke hisaab se dekhne ke liye Day Wise All Report use karein.`],
        [`Open Clicker > Manage Campaign.`, `Select the From Date and To Date and click Search Now.`, `The table shows Campaign Name, Link Type, Sender ID, SMS Text, File Count and Click Count.`, `Use Day Wise All Report to see it day by day.`],
      ],
      img: [[`clicker-manage-campaign`, `1: date filter, 2: Create Campaign, 3: Day Wise All Report`, `1: date filter, 2: Create Campaign, 3: Day Wise All Report`]],
      kw: `clicker report, campaign report, click count, day wise report, date wise, clicker campaign report, kitne click, clicks`,
    }),
    faq({
      id: 'clicker-split', cat: 'clicker',
      q: [`Clicker Split-Scheduler kya hai?`, `What is the Clicker Split-Scheduler?`],
      a: [`Ye SMS ke Split Scheduler jaisa hi hai - clicker campaign ko time ke saath batches me bhejne ke liye.`, `It works like the SMS Split Scheduler - to send a clicker campaign in batches over time.`],
      steps: [
        [`Clicker > Clicker Split-Scheduler kholein.`, `Campaign ki details bharein aur batch size aur gap set karein.`, `Submit karein - clicker campaign batches me jayega.`],
        [`Open Clicker > Clicker Split-Scheduler.`, `Fill the campaign details and set the batch size and gap.`, `Submit - the clicker campaign goes out in batches.`],
      ],
      kw: `clicker split, split scheduler clicker, clicker batch, clicker schedule`,
    }),
    faq({
      id: 'clicker-consolidate', cat: 'clicker',
      q: [`Clicker ki Consolidate Data Request kaise karein?`, `How do I raise a Consolidate Data Request for Clicker?`],
      a: [`Pure mahine ya date filter ki report ke liye request daalte hain; backend team report generate karti hai aur kuch der me (ya 24 ghante ke andar) download ka option aa jata hai.`,
          `You request a report for a whole month or a date range; the backend team generates it and a download option appears shortly (or within 24 hours).`],
      steps: [
        [`Clicker > Consolidate Data Request kholein.`, `Pure mahine ki ya date filter se report chunein aur request submit karein.`, `Backend team report generate karti hai.`, `Kuch der baad ya 24 ghante ke andar Download ka option aa jata hai - download karke dekhein.`],
        [`Open Clicker > Consolidate Data Request.`, `Choose a whole-month or date-filtered report and submit the request.`, `The backend team generates the report.`, `After a while (within 24 hours) the Download option appears - download it.`],
      ],
      kw: `consolidate, consolidate data request, clicker monthly report, month report, report request, clicker data request`,
    }),
  ],
};
