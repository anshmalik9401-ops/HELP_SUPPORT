const { faq } = require('./_h');

module.exports = {
  faqs: [
    // ---------------- HTTP API ----------------
    faq({
      id: 'api-what', cat: 'api',
      q: [`HTTP API section me kya-kya hai?`, `What is in the HTTP API section?`],
      a: [`HTTP API me 3 cheezein hain: API Document, Sample Code aur Generate API.`, `The HTTP API section has 3 items: API Document, Sample Code and Generate API.`],
      steps: [[`API Document: API ka poora document (endpoints, parameters, responses).`, `Sample Code: simple code jisse aap SMS shoot kar sakte hain (C#, Java, Node.js, PHP, Python, Flutter).`, `Generate API: yahan se aap khud API URL generate karke apne panel / software me laga sakte hain.`],
              [`API Document: the full API document (endpoints, parameters, responses).`, `Sample Code: simple code showing how to send SMS (C#, Java, Node.js, PHP, Python, Flutter).`, `Generate API: generate the API URL yourself and use it in your own panel / software.`]],
      img: [[`api-menu`, null, null]],
      kw: `api, http api, api document, sample code, integration, developer, api kya hai, api section, api options`,
    }),
    faq({
      id: 'api-generate', cat: 'api',
      q: [`API URL kaise generate karein (Generate API)?`, `How do I generate an API URL (Generate API)?`],
      a: [`Generate API me aap Entity, Sender, number aur template chunkar apna ready-made API URL bana sakte hain aur apne panel / software me laga sakte hain.`, `In Generate API you select the Entity, Sender, number and template to create your ready-made API URL and use it in your own panel / software.`],
      steps: [
        [`HTTP API > Generate API kholein.`, `English SMS ya Other SMS (Hindi) chunein.`, `Entity ID aur Sender ID select karein, Mobile Number daalein.`, `Open Template se template chunein (message aa jayega).`, `Generate API par click karein - neeche Generated API URL dikhega.`, `URL me #Password# ki jagah apna asli password daalein (page par yahi note likha hota hai) aur Copy URL se URL copy karke use karein.`],
        [`Open HTTP API > Generate API.`, `Choose English SMS or Other SMS (Hindi).`, `Select the Entity ID and Sender ID and enter a Mobile Number.`, `Choose the template with Open Template (the message is filled in).`, `Click Generate API - the Generated API URL appears below.`, `Replace #Password# in the URL with your actual password (the page shows this note) and use Copy URL to copy it.`],
      ],
      tips: [[`Apna password kisi ke saath share na karein.`], [`Do not share your password with anyone.`]],
      img: [[`api-generate`, `1: Entity / Sender / Mobile, 2: Open Template, 3: Generate API, 4: #Password# note aur URL`, `1: Entity / Sender / Mobile, 2: Open Template, 3: Generate API, 4: #Password# note and URL`]],
      kw: `generate api, api url, api banana, api link, copy url, #password#, api generate, api kaise banaye, generated api, api string`,
    }),
    faq({
      id: 'api-send', cat: 'api',
      q: [`API se SMS kaise bhejein? (parameters)`, `How do I send SMS through the API? (parameters)`],
      a: [`Single SMS ke liye URL: http://nimbusit.biz/api/SmsApi/SendSingleApi?UserID=&Password=&SenderID=&Phno=&Msg=&EntityID=&TemplateID= . Har parameter ki value bharni hoti hai.`, `URL for a single SMS: http://nimbusit.biz/api/SmsApi/SendSingleApi?UserID=&Password=&SenderID=&Phno=&Msg=&EntityID=&TemplateID= . Every parameter must be filled.`],
      steps: [
        [`UserID aur Password: aapke login credentials (special characters URL-encode karein).`, `SenderID: DLT approved Sender ID.`, `Phno: 10 digit mobile number.`, `Msg: SMS text (URL-encode karein) - template se match hona chahiye.`, `EntityID aur TemplateID: DLT wali sahi ID (galat hui to SMS fail hoga).`, `Optional: FlashMsg (0 normal, 1 flash) aur DlrUrl (delivery report ka callback URL).`],
        [`UserID and Password: your login credentials (URL-encode special characters).`, `SenderID: the DLT-approved Sender ID.`, `Phno: 10-digit mobile number.`, `Msg: the SMS text (URL-encoded) - it must match the template.`, `EntityID and TemplateID: the correct DLT IDs (a wrong one makes the SMS fail).`, `Optional: FlashMsg (0 normal, 1 flash) and DlrUrl (callback URL for the delivery report).`],
      ],
      kw: `api send, sendsingleapi, api parameters, api se sms, send sms api, api call, sms api, api url format, api params`,
    }),
    faq({
      id: 'api-limits', cat: 'api',
      q: [`API se ek saath kitne numbers bhej sakte hain? (Single / Multiple / Bulk / Unicode)`, `How many numbers can I send to in one API call? (Single / Multiple / Bulk / Unicode)`],
      a: [`API me single, multiple aur bulk teeno tarah se SMS bhej sakte hain, aur Hindi / Unicode ke liye alag APIs hain.`, `The API supports single, multiple and bulk sending, and there are separate APIs for Hindi / Unicode.`],
      steps: [
        [`Single: SendSingleApi (1 number).`, `Multiple: SendMultipleApi (GET, max 200 numbers, comma se alag).`, `Bulk: SendBulkApi (POST, max 5000 numbers).`, `Unicode (Hindi): SendSingleUnicodeApi, SendMultipleUnicodeApi (200) aur SendBulkUnicodeApi (5000).`],
        [`Single: SendSingleApi (1 number).`, `Multiple: SendMultipleApi (GET, max 200 numbers, comma separated).`, `Bulk: SendBulkApi (POST, max 5000 numbers).`, `Unicode (Hindi): SendSingleUnicodeApi, SendMultipleUnicodeApi (200) and SendBulkUnicodeApi (5000).`],
      ],
      kw: `api limit, 200 numbers, 5000 numbers, sendmultipleapi, sendbulkapi, bulk api, unicode api, multiple numbers api, kitne numbers api`,
    }),
    faq({
      id: 'api-dlr-balance', cat: 'api',
      q: [`API se delivery report, balance aur sender list kaise nikalein?`, `How do I get the delivery report, balance and sender list through the API?`],
      a: [`Teeno ke liye alag API calls hain.`, `There is a separate API call for each of these.`],
      steps: [
        [`Delivery report: GetDlrReport?LogID=&UserID=&Password= (LogID = SMS bhejte time mila Message ID).`, `Balance: CheckBalance?UserID=&Password=`, `Sender IDs: GetSenderID?UserID=&Password=`],
        [`Delivery report: GetDlrReport?LogID=&UserID=&Password= (LogID = the Message ID received when sending).`, `Balance: CheckBalance?UserID=&Password=`, `Sender IDs: GetSenderID?UserID=&Password=`],
      ],
      kw: `getdlrreport, checkbalance, getsenderid, api balance, api dlr, api delivery report, logid, message id, api se balance`,
    }),
    faq({
      id: 'api-response', cat: 'api',
      q: [`API ka response kaise samjhein?`, `How do I read the API response?`],
      a: [`Success me Status "OK" aata hai aur Message me Message ID. Galat login par Status "WARNING" aata hai.`, `On success the Status is "OK" and the Message contains the Message ID. On a wrong login the Status is "WARNING".`],
      steps: [
        [`Success: {"Response":{"Message":"Message ID : 56"},"Status":"OK"} - ye Message ID delivery report nikalne ke kaam aata hai.`, `Galat login: {"Response":{"Message":"Invalid UserID And Password!"},"Status":"WARNING"} - UserID / Password dobara check karein.`],
        [`Success: {"Response":{"Message":"Message ID : 56"},"Status":"OK"} - this Message ID is used to fetch the delivery report.`, `Wrong login: {"Response":{"Message":"Invalid UserID And Password!"},"Status":"WARNING"} - re-check the UserID / Password.`],
      ],
      kw: `api response, status ok, warning, message id, invalid userid, invalid password api, response samjhna, api error`,
    }),
    faq({
      id: 'api-not-working', cat: 'api',
      q: [`API se SMS nahi ja raha, kya check karein?`, `SMS is not going through the API - what should I check?`],
      a: [`API se SMS na jane ke ye common reasons hain.`, `These are the common reasons why SMS does not go through the API.`],
      steps: [
        [`UserID aur Password sahi hon; password me special characters hon to URL-encode karein.`, `Phno 10 digit ka sahi number ho.`, `SenderID, EntityID aur TemplateID DLT approved hon aur panel me mapped hon (Manage Template me sender map ho).`, `Msg ka text approved template se match kare (URL-encode karke bhejein).`, `Account me credits hon.`, `Agar aapke account par IP restriction hai to apne server ka IP allow karwayein (AM se baat karein).`, `Reports > API Report me Error Code dekhkar is chat me type karein.`],
        [`The UserID and Password must be correct; URL-encode special characters in the password.`, `Phno must be a valid 10-digit number.`, `SenderID, EntityID and TemplateID must be DLT-approved and mapped in the panel (sender mapped in Manage Template).`, `The Msg text must match the approved template (send it URL-encoded).`, `The account must have credits.`, `If your account has an IP restriction, get your server IP allowed (talk to your AM).`, `Check the Error Code in Reports > API Report and type it in this chat.`],
      ],
      kw: `api nahi chal raha, api not working, api error, sms api fail, api se sms nahi ja raha, api problem, api issue, api credentials, ip whitelist api`,
    }),

    // ---------------- Two Factor (OTP) API ----------------
    faq({
      id: 'otp-what', cat: 'otp',
      q: [`Two Factor Authentication (OTP API) kya hai aur kaise use karein?`, `What is Two Factor Authentication (OTP API) and how do I use it?`],
      a: [`OTP API se aap apne users ko OTP SMS bhej sakte hain aur user ke daale OTP ko verify kar sakte hain. OTP banana, expiry, retry aur attempt limit platform sambhalta hai. Poora PDF document aapko panel / AM se milta hai.`,
          `The OTP API lets you send OTP SMS to your users and verify the OTP the user enters. OTP generation, expiry, retry and attempt limits are handled by the platform. The full PDF document is available from the panel / your AM.`],
      steps: [
        [`Do endpoints hain: SendOtp (OTP banakar SMS bhejta hai) aur VerifyOtp (user ka OTP check karta hai).`, `Zaroori: credits wala active account, approved DLT Sender ID aur approved OTP template.`, `GET aur POST (JSON) dono chalte hain; production me POST aur HTTPS use karein.`, `Base URL (document ke hisaab se): https://gapi.sms4power.com , path /api/Auth .`],
        [`There are two endpoints: SendOtp (generates and sends the OTP SMS) and VerifyOtp (checks the OTP entered by the user).`, `Required: an active account with credits, an approved DLT Sender ID and an approved OTP template.`, `Both GET and POST (JSON) work; use POST and HTTPS in production.`, `Base URL (as per the document): https://gapi.sms4power.com , path /api/Auth .`],
      ],
      kw: `2fa, two factor, two factor authentication, otp api, otp, otp kya hai, authentication, otp kaise`,
    }),
    faq({
      id: 'otp-send', cat: 'otp',
      q: [`OTP kaise bhejein (SendOtp)?`, `How do I send an OTP (SendOtp)?`],
      a: [`SendOtp ek random OTP banata hai, use number ke against save karta hai aur SMS bhejta hai. OTP response me nahi aata.`, `SendOtp generates a random OTP, stores it against the number and sends the SMS. The OTP is not returned in the response.`],
      steps: [
        [`Zaroori parameters: UserId, Pwd, Phno (jaise 919876543210), Msg aur SenderId.`, `Msg me %code% placeholder zaroori hai (GET me %25code% bhejein) - OTP isi jagah aata hai.`, `Optional: OtpCodeLength (default 6), OtpCodeType (NUMERIC / ALPHA / ALPHANUMERIC), ExpirySeconds (default 300), RetrySeconds (45), MaxAttempts (5).`, `Success par response me success: true aata hai.`],
        [`Required parameters: UserId, Pwd, Phno (e.g. 919876543210), Msg and SenderId.`, `Msg must contain the %code% placeholder (send %25code% in GET) - the OTP is placed there.`, `Optional: OtpCodeLength (default 6), OtpCodeType (NUMERIC / ALPHA / ALPHANUMERIC), ExpirySeconds (default 300), RetrySeconds (45), MaxAttempts (5).`, `On success the response contains success: true.`],
      ],
      kw: `sendotp, otp bhejna, send otp, otp send, %code%, otp length, otp expiry, otp template, otp parameters`,
    }),
    faq({
      id: 'otp-verify', cat: 'otp',
      q: [`User ka OTP verify kaise karein (VerifyOtp)?`, `How do I verify the user's OTP (VerifyOtp)?`],
      a: [`VerifyOtp user ke daale OTP ko us number par bheje gaye sabse naye OTP se match karta hai.`, `VerifyOtp checks the OTP entered by the user against the most recent OTP sent to that number.`],
      steps: [
        [`Parameters: UserId, Pwd, Phno (wahi format jo SendOtp me tha), OtpCode aur ResponseFormat.`, `Response me matched (true / false) aur status aata hai.`, `matched true ho tabhi user verified maane.`],
        [`Parameters: UserId, Pwd, Phno (same format as in SendOtp), OtpCode and ResponseFormat.`, `The response contains matched (true / false) and a status.`, `Treat the user as verified only when matched is true.`],
      ],
      kw: `verifyotp, otp verify, verify otp, otp check, otp match, matched, otp verification`,
    }),
    faq({
      id: 'otp-status', cat: 'otp',
      q: [`OTP status (VERIFIED, EXPIRED, BLOCKED ...) ka matlab kya hai?`, `What do the OTP statuses (VERIFIED, EXPIRED, BLOCKED ...) mean?`],
      a: [`VerifyOtp ke response me status OTP ki current condition batata hai.`, `The status in the VerifyOtp response tells you the current state of the OTP.`],
      steps: [
        [`VERIFIED: OTP sahi hai, user verified.`, `NOT MATCHED: OTP galat hai; MaxAttempts tak dobara try kar sakte hain.`, `PENDING: OTP bheja gaya hai, abhi verify nahi hua.`, `EXPIRED: OTP ki validity (ExpirySeconds) khatam - naya OTP mangayein.`, `BLOCKED: attempts limit se zyada ho gaye - naya OTP mangayein.`, `CANCELLED: OTP session cancel ho gaya (jaise naya OTP aa gaya).`],
        [`VERIFIED: the OTP is correct, user verified.`, `NOT MATCHED: wrong OTP; the user can retry until MaxAttempts.`, `PENDING: OTP issued but not verified yet.`, `EXPIRED: the validity (ExpirySeconds) has passed - request a new OTP.`, `BLOCKED: maximum attempts exceeded - request a new OTP.`, `CANCELLED: the OTP session was cancelled (e.g. replaced by a newer OTP).`],
      ],
      kw: `otp status, verified, not matched, pending, expired, blocked, cancelled, otp expire, otp blocked, otp galat`,
    }),
    faq({
      id: 'otp-errors', cat: 'otp',
      q: [`OTP API me error aa raha hai (Insufficient balance, Msg required ...)`, `I get an error from the OTP API (Insufficient balance, Msg required ...)`],
      a: [`Validation aur account ke errors HTTP 400 ke saath plain text message me aate hain.`, `Validation and account errors come as HTTP 400 with a plain-text message.`],
      steps: [
        [`"Both UserId and Pwd are required." / "Phno is required.": missing parameter bharein.`, `"Msg is required and must contain %code%": Msg me %code% placeholder daalein.`, `"Insufficient balance. Please recharge your account.": credits khatam - recharge karwayein.`, `Account warning (invalid credentials / inactive account / IP not allowed): login details, account status aur server IP allow hai ya nahi check karein.`, `"Invalid JSON": POST ki JSON body theek karein.`],
        [`"Both UserId and Pwd are required." / "Phno is required.": fill in the missing parameter.`, `"Msg is required and must contain %code%": add the %code% placeholder in Msg.`, `"Insufficient balance. Please recharge your account.": credits are over - recharge.`, `Account warning (invalid credentials / inactive account / IP not allowed): check the login details, the account status and whether your server IP is allowed.`, `"Invalid JSON": fix the JSON body of the POST request.`],
      ],
      kw: `otp error, insufficient balance, msg required, otp api error, otp nahi ja raha, otp fail, ip not allowed, invalid json`,
    }),
  ],
};
