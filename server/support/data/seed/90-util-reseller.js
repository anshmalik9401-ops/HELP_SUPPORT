const { faq } = require('./_h');

module.exports = {
  faqs: [
    // ---------------- Utilities ----------------
    faq({
      id: 'util-menu', cat: 'utilities',
      q: [`Utilities me kaun-kaun se options hain?`, `What options are there in Utilities?`],
      a: [`Utilities me 6 options hain: Apply For SMS Credits, Short Link, Support Ticket, Pay Online, Change My Account Manager aur Unicode Finder.`, `Utilities has 6 options: Apply For SMS Credits, Short Link, Support Ticket, Pay Online, Change My Account Manager and Unicode Finder.`],
      steps: [[`Apply For SMS Credits: credits ke liye seedha apply karein.`, `Short Link: website / image / PDF ka short link banayein.`, `Support Ticket: apni query ka ticket raise karein.`, `Pay Online: online payment karein.`, `Change My Account Manager: reason dekar AM badalwayein.`, `Unicode Finder: SMS me chhupe Unicode characters dhundhein.`],
              [`Apply For SMS Credits: apply directly for credits.`, `Short Link: create a short link of a website / image / PDF.`, `Support Ticket: raise a ticket for your query.`, `Pay Online: make an online payment.`, `Change My Account Manager: change your AM by giving a reason.`, `Unicode Finder: find Unicode characters hidden in an SMS.`]],
      img: [[`util-menu`, null, null]],
      kw: `utilities, utility, utilities menu, utilities options, utilities me kya hai`,
    }),
    faq({
      id: 'util-credits', cat: 'utilities',
      q: [`SMS credits ke liye apply kaise karein?`, `How do I apply for SMS credits?`],
      a: [`Utilities > Apply For SMS Credits se aap seedha credits ke liye apply kar sakte hain. Aapke AM ki details ke saath request support team ke paas chali jati hai.`, `You can apply for credits directly from Utilities > Apply For SMS Credits. The request goes to the support team along with your AM's details.`],
      steps: [[`Utilities > Apply For SMS Credits kholein.`, `Required credits / details bharkar request submit karein.`, `Support team verify karke credits add karti hai.`, `Balance Reports > Credit History ya dashboard par dekhein.`],
              [`Open Utilities > Apply For SMS Credits.`, `Fill in the required credits / details and submit the request.`, `The support team verifies and adds the credits.`, `Check the balance in Reports > Credit History or on the dashboard.`]],
      kw: `apply for sms credits, credits apply, credit request, recharge karna, credits chahiye, sms credits, credit kaise milenge, credit mangna`,
    }),
    faq({
      id: 'util-shortlink', cat: 'utilities',
      q: [`Short Link kaise banayein?`, `How do I create a Short Link?`],
      a: [`Aap kisi website, image ya PDF ka short link bana kar use SMS me add kar sakte hain.`, `You can create a short link of a website, image or PDF and add it to your SMS.`],
      steps: [[`Utilities > Short Link kholein aur Generate New Short Link par click karein.`, `Short Link Name likhein.`, `Link Type chunein (Website, PDF, Image ...).`, `URL daalein (jaise http://www.xyz.com).`, `Save Changes karein - short link ban jayega, use SMS me add kar sakte hain.`],
              [`Open Utilities > Short Link and click Generate New Short Link.`, `Enter the Short Link Name.`, `Select the Link Type (Website, PDF, Image ...).`, `Enter the URL (e.g. http://www.xyz.com).`, `Click Save Changes - the short link is created and you can add it to your SMS.`]],
      tips: [[`SMS me use hone wala link DLT par whitelist hona zaroori hai.`], [`The link used in the SMS must be whitelisted on DLT.`]],
      img: [[`util-shortlink`, null, null]],
      kw: `short link, shortlink, short url, link chhota, link banana, short link kaise, url shortener, pdf link, image link`,
    }),
    faq({
      id: 'util-pay', cat: 'utilities',
      q: [`Online payment kaise karein (Pay Online)?`, `How do I make an online payment (Pay Online)?`],
      a: [`Utilities > Pay Online par click karein, ya seedha https://www.nimbusitsolutions.com/Pay kholkar payment kar sakte hain.`, `Click Utilities > Pay Online, or open https://www.nimbusitsolutions.com/Pay directly to pay.`],
      kw: `pay online, payment, online payment, pay, paisa, payment kaise, recharge payment, nimbusitsolutions pay`,
    }),
    faq({
      id: 'util-change-am', cat: 'utilities',
      q: [`Apna Account Manager (AM) kaise badlein?`, `How do I change my Account Manager (AM)?`],
      a: [`Utilities > Change My Account Manager me reason daalkar aap apna AM change karwa sakte hain.`, `In Utilities > Change My Account Manager you can request an AM change by entering a reason.`],
      steps: [[`Utilities > Change My Account Manager kholein.`, `Reason likhein.`, `Submit karein - AM change ki request chali jati hai.`], [`Open Utilities > Change My Account Manager.`, `Enter the reason.`, `Submit - the AM change request is sent.`]],
      kw: `change account manager, am change, am badalna, account manager, change am, naya am, am se problem`,
    }),
    faq({
      id: 'util-unicode', cat: 'utilities',
      q: [`Unicode Finder kya hai? SMS Unicode kyun ban raha hai?`, `What is the Unicode Finder? Why is my SMS becoming Unicode?`],
      a: [`Unicode Finder aapke SMS text me Unicode (Hindi, Punjabi, Gujarati, Tamil, Telugu ...) characters pakadta hai. Unhe hatakar SMS normal (English) message ke roop me bhej sakte hain.`, `The Unicode Finder detects Unicode characters (Hindi, Punjabi, Gujarati, Tamil, Telugu ...) in your SMS text. After removing them you can send the SMS as a normal (English) message.`],
      steps: [[`Utilities > Unicode Finder kholein.`, `Apna SMS text "Enter Content to Check" box me paste karein.`, `Find Unicode Data par click karein - Unicode characters dikh jayenge.`, `Plain Content (English / ASCII Only) me bina Unicode wala text milta hai - use normal SMS me bhejein.`],
              [`Open Utilities > Unicode Finder.`, `Paste your SMS text in the "Enter Content to Check" box.`, `Click Find Unicode Data - the Unicode characters are shown.`, `Plain Content (English / ASCII Only) gives the text without Unicode - send that as a normal SMS.`]],
      tips: [[`Kabhi-kabhi copy-paste ke hidden special characters ki wajah se SMS Unicode ban jata hai - Finder se unhe pakad sakte hain.`], [`Sometimes hidden special characters from copy-paste turn an SMS into Unicode - the Finder helps you catch them.`]],
      img: [[`util-unicode`, `1: text box, 2: Find Unicode Data`, `1: text box, 2: Find Unicode Data`]],
      kw: `unicode finder, unicode, unicode kyun, sms unicode ban raha, hidden characters, special characters, unicode data finder, normal sms, ascii, unicode remove`,
    }),
    faq({
      id: 'util-ticket', cat: 'utilities',
      q: [`Support Ticket kaise raise karein?`, `How do I raise a Support Ticket?`],
      a: [`Utilities > Support Ticket (ya panel ke upar ke Support Ticket button) se apni query ka ticket raise kar sakte hain.`, `Raise a ticket for your query from Utilities > Support Ticket (or the Support Ticket button at the top of the panel).`],
      steps: [[`Utilities > Support Ticket kholein.`, `Apni query / problem likhkar ticket submit karein.`, `Turant madad ke liye apne AM ko ya support1@nimbusitsolutions.com par bhi mail kar sakte hain.`],
              [`Open Utilities > Support Ticket.`, `Write your query / problem and submit the ticket.`, `For quick help you can also contact your AM or mail support1@nimbusitsolutions.com.`]],
      kw: `support ticket, ticket, ticket raise, complaint, query raise, problem raise, ticket kaise`,
    }),
    faq({
      id: 'support-contact', cat: 'utilities',
      q: [`Support team se contact kaise karein?`, `How do I contact the support team?`],
      a: [`Aap apne Account Manager (AM) se baat kar sakte hain ya support1@nimbusitsolutions.com par mail kar sakte hain. Is chat me bhi "Mera sawal list me nahi hai" chunkar mail ka format mil jata hai.`, `You can talk to your Account Manager (AM) or mail support1@nimbusitsolutions.com. In this chat you can also choose "My question is not listed" to get the mail format.`],
      steps: [[`Mail ka Subject me short title likhein.`, `Query me apni problem detail me likhein.`, `User Panel Credential (Username / User ID), AM ka naam aur apna contact number likhein.`, `Mail me password kabhi na likhein.`], [`Write a short title in the Subject.`, `Describe your problem in detail in the Query.`, `Add your User Panel Credential (Username / User ID), your AM's name and your contact number.`, `Never write your password in the mail.`]],
      kw: `support, contact, mail, helpline, email, customer care, account manager, am, support team, contact number, madad, help`,
    }),

    // ---------------- Demo videos ----------------
    faq({
      id: 'demo-videos', cat: 'videos',
      q: [`Demo videos dekhna hai (kaise sikhein)`, `I want to watch the demo videos (how to learn)`],
      a: [`Neeche diye gaye demo videos me poora process dekh kar sikh sakte hain.`, `You can learn the full process from the demo videos below.`],
      action: 'videos',
      kw: `demo, demo video, video, videos, tutorial, kaise sikhein, sikhna, learn, training, guide video, how to video`,
    }),

    // ---------------- Reseller ----------------
    faq({
      id: 'reseller-menu', cat: 'reseller',
      q: [`Reseller menu me kaun-kaun se options hain?`, `What options are there in the Reseller menu?`],
      a: [`Reseller panel me aap apne customers ko manage karte hain aur apna panel white label kar sakte hain. Options neeche hain.`, `In the reseller panel you manage your customers and can white label your panel. The options are below.`],
      steps: [
        [`Manage Customer: purane customers manage karein aur naye banayein.`, `Site Setting: header, logo, footer aur subdomain se white labeling.`, `Transaction History: apna aur customers ka credit / debit history.`, `Today Customer Report: aaj ki Self & Customers SMS report.`, `Customer SMS Report: apni aur customers ki SMS report.`, `Sent SMS Summary: kitne SMS pass / fail hue (date wise).`, `RCS Sent SMS Summary: RCS ki summary.`, `Download Customer Monthly Report: customers ka monthly campaign record.`, `Create User Bot: customer ke liye bot onboarding.`, `View Bot Request: bot requests dekhein.`],
        [`Manage Customer: manage existing customers and create new ones.`, `Site Setting: white labeling with header, logo, footer and subdomain.`, `Transaction History: credit / debit history of you and your customers.`, `Today Customer Report: today's Self & Customers SMS report.`, `Customer SMS Report: SMS report of you and your customers.`, `Sent SMS Summary: how many SMS passed / failed (date wise).`, `RCS Sent SMS Summary: RCS summary.`, `Download Customer Monthly Report: monthly campaign record of your customers.`, `Create User Bot: bot onboarding for a customer.`, `View Bot Request: view your bot requests.`],
      ],
      img: [[`reseller-menu`, null, null]],
      kw: `reseller, reseller menu, reseller options, reseller panel, reseller kya hai, customer manage`,
    }),
    faq({
      id: 'reseller-customer', cat: 'reseller',
      q: [`Customer kaise manage / create karein?`, `How do I manage / create a customer?`],
      a: [`Reseller > Manage Customer se aap apne purane customers ko manage kar sakte hain aur naya customer bana sakte hain.`, `From Reseller > Manage Customer you can manage your existing customers and create a new customer.`],
      steps: [[`Reseller > Manage Customer kholein.`, `Purane customers ko list se manage karein.`, `Naya customer create karne ke liye create / add option se details bharein.`], [`Open Reseller > Manage Customer.`, `Manage existing customers from the list.`, `To create a new customer use the create / add option and fill in the details.`]],
      kw: `manage customer, customer banana, new customer, customer create, customer add, client add, client banana, reseller customer`,
    }),
    faq({
      id: 'reseller-site-setting', cat: 'reseller',
      q: [`White label kaise karein (Site Setting)? Header, logo, footer, subdomain`, `How do I white label my panel (Site Setting)? Header, logo, footer, subdomain`],
      a: [`Site Setting me aap apne customers ke hisaab se panel ka header, logo, footer aur subdomain set karke white labeling kar sakte hain.`, `In Site Setting you can white label the panel for your customers by setting the header, logo, footer and subdomain.`],
      steps: [
        [`Reseller > Site Setting kholein.`, `Header Settings: Header Text daalein, ya (OR) logo upload karein - PNG / JPG / JPEG, max 2 MB.`, `Footer Settings: Footer Text (company name, copyright) aur apni Website URL daalein.`, `Save Settings par click karein.`, `Apna subdomain add karke panel ko apne brand ke naam par chalayein.`],
        [`Open Reseller > Site Setting.`, `Header Settings: enter the Header Text, or (OR) upload a logo - PNG / JPG / JPEG, max 2 MB.`, `Footer Settings: enter the Footer Text (company name, copyright) and your Website URL.`, `Click Save Settings.`, `Add your subdomain to run the panel under your own brand.`],
      ],
      img: [[`reseller-site-setting`, `1: Header / Logo, 2: Footer, 3: Website URL, 4: Save Settings`, `1: Header / Logo, 2: Footer, 3: Website URL, 4: Save Settings`]],
      kw: `site setting, white label, whitelabel, white labeling, header, logo, footer, subdomain, branding, panel logo, apna logo, domain`,
    }),
    faq({
      id: 'reseller-transactions', cat: 'reseller',
      q: [`Customers ka credit / debit history kahan dekhein?`, `Where do I see the credit / debit history of my customers?`],
      a: [`Reseller > Transaction History me aap apna aur apne customers ka poora credit aur debit transaction history track kar sakte hain.`, `In Reseller > Transaction History you can track the full credit and debit transaction history of yourself and your customers.`],
      kw: `transaction history, credit debit, customer credit, transaction, customers ka balance, credit history reseller`,
    }),
    faq({
      id: 'reseller-reports', cat: 'reseller',
      q: [`Customers ki SMS reports aur summary kahan dekhein?`, `Where do I see my customers' SMS reports and summaries?`],
      a: [`Reseller menu me customers ki reports ke liye alag options hain.`, `The Reseller menu has separate options for your customers' reports.`],
      steps: [[`Today Customer Report: aaj ki Self & Customers SMS report.`, `Customer SMS Report: apni aur apne customers ki SMS report.`, `Sent SMS Summary: kab se kab tak kitne SMS pass aur fail hue.`, `RCS Sent SMS Summary: RCS ke liye same summary.`, `Download Customer Monthly Report: customers ka campaign trace record - customer ko share bhi kar sakte hain.`],
              [`Today Customer Report: today's Self & Customers SMS report.`, `Customer SMS Report: SMS report of you and your customers.`, `Sent SMS Summary: how many SMS passed and failed between two dates.`, `RCS Sent SMS Summary: the same summary for RCS.`, `Download Customer Monthly Report: the campaign trace record of your customers - you can share it with the customer.`]],
      kw: `customer report, today customer report, customer sms report, sent sms summary, rcs sent sms summary, monthly report customer, customer ki report, summary`,
    }),
    faq({
      id: 'reseller-bot', cat: 'reseller',
      q: [`Customer ke liye RCS bot onboarding kaise karein (Create User Bot)?`, `How do I onboard an RCS bot for a customer (Create User Bot)?`],
      a: [`Create User Bot me aap apne customer ke liye bot create karte hain aur onboarding request raise ho jati hai. Neeche di gayi saari details dena zaroori hai - inke bina onboarding nahi hoti.`, `In Create User Bot you create a bot for your customer and an onboarding request is raised. All the details below are mandatory - onboarding is not done without them.`],
      steps: [
        [`Reseller > Create User Bot kholein.`, `Bot Name, Brand Name aur Short Description (100 characters) daalein.`, `Authorised person ki details, GST aur PAN daalein.`, `Email (Outlook) ID daalein.`, `Customer ki website par Terms & Conditions aur Privacy Policy ke pages hona mandatory hai.`, `Customer ke client query form me opt-in checkbox hona zaroori hai ("I agree" - SMS aur digital marketing wali line).`, `Bot / message type (Transactional ya Promotional) chunein.`, `Request submit karein - onboarding request raise ho jayegi.`],
        [`Open Reseller > Create User Bot.`, `Enter the Bot Name, Brand Name and Short Description (100 characters).`, `Enter the authorised person's details, GST and PAN.`, `Enter the Email (Outlook) ID.`, `The customer's website must have Terms & Conditions and Privacy Policy pages - this is mandatory.`, `The customer's client query form must have an opt-in checkbox ("I agree" - the SMS and digital marketing line).`, `Select the bot / message type (Transactional or Promotional).`, `Submit the request - the onboarding request is raised.`],
      ],
      tips: [[`Customer ki website par T&C, Privacy Policy aur opt-in checkbox na ho to onboarding nahi hoti.`], [`Onboarding is not done if the customer's website lacks the T&C, Privacy Policy and the opt-in checkbox.`]],
      kw: `create user bot, bot onboarding, onboarding, bot banana, rcs bot, bot create, bot request, brand name, gst pan, privacy policy, terms and conditions, opt in, bot kaise banaye`,
    }),
    faq({
      id: 'reseller-view-bot', cat: 'reseller',
      q: [`Bot request ka status kaise dekhein (View Bot Request)?`, `How do I check the status of a bot request (View Bot Request)?`],
      a: [`Reseller > View Bot Request me aap apni bot creation / onboarding requests dekh sakte hain.`, `In Reseller > View Bot Request you can see your bot creation / onboarding requests.`],
      kw: `view bot request, bot request, bot status, bot approve, bot request dekhna, onboarding status`,
    }),
  ],
};
