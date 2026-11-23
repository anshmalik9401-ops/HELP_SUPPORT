// English error-code knowledge base.
// owner: 'client' (the client fixes it) | 'support' (support team) | 'operator' (operator/network) | 'none'
// retry: does sending again help?
//
// CATEGORIES are generic templates used for every code in that group.
// OVERRIDES are code-specific explanations (more accurate) - add more here as you learn them.

const S = (_other, english) => ({ en: english });

const CATEGORIES = {
  DELIVERED: {
    label: S('Delivered', 'Delivered'),
    owner: 'none', retry: false,
    meaning: S('Message handset par successfully deliver ho gaya.', 'The message was delivered to the handset successfully.'),
    steps: S(['Koi action ki zaroorat nahi.'], ['No action needed.']),
  },
  DLT_ENTITY: {
    label: S('DLT Entity (Company) issue', 'DLT Entity (Company) issue'),
    owner: 'client', retry: false,
    meaning: S(
      'Aapki company ka DLT Entity (PE) registration SMS ke liye valid nahi mila (not found / inactive / blacklisted / mismatch).',
      'Your company\'s DLT Entity (PE) registration was not valid for this SMS (not found / inactive / blacklisted / mismatch).'
    ),
    steps: S(
      ['DLT portal (Jio / Airtel / Vi / BSNL) me apna Entity ID ka status check karein - Active hona chahiye.',
       'Panel me jo Entity ID laga hai wahi DLT wala hai, confirm karein.',
       'Agar inactive / blacklisted / expired hai to DLT operator se reactivate / renew karwayein.',
       'Fix hone ke baad ek test SMS bhej kar check karein. Problem rahe to Entity ID ke saath support ko batayein.'],
      ['Check your Entity ID status on the DLT portal (Jio / Airtel / Vi / BSNL) - it must be Active.',
       'Confirm that the Entity ID configured in the panel is the same as on DLT.',
       'If it is inactive / blacklisted / expired, get it reactivated or renewed from your DLT operator.',
       'Send a test SMS after the fix. If it still fails, share the Entity ID with support.']
    ),
  },
  DLT_HEADER: {
    label: S('Header / Sender ID issue', 'Header / Sender ID issue'),
    owner: 'client', retry: false,
    meaning: S(
      'Jo Header (Sender ID) aapne use kiya woh DLT par registered / active nahi hai, ya is template ke saath linked nahi hai.',
      'The Header (Sender ID) you used is not registered / active on DLT, or is not linked to this template.'
    ),
    steps: S(
      ['Panel me jo Header select kiya hai, DLT par bilkul wahi spelling (case-sensitive) me registered hai ya nahi dekhein.',
       'DLT par Header ka status Active hona chahiye (Inactive / Suspended / Blacklisted nahi).',
       'Template ke saath Header linked hona chahiye - DLT par template details check karein.',
       'Sahi Header select karke dobara SMS bhejein.'],
      ['Check that the Header selected in the panel is registered on DLT with the exact spelling (case-sensitive).',
       'The Header status on DLT must be Active (not Inactive / Suspended / Blacklisted).',
       'The Header must be linked with the template - verify the template details on DLT.',
       'Select the correct Header and send again.']
    ),
  },
  DLT_TEMPLATE: {
    label: S('Template / Content issue', 'Template / Content issue'),
    owner: 'client', retry: false,
    meaning: S(
      'SMS ka content DLT par registered template se match nahi hua, ya template inactive / blacklisted / not found hai.',
      'The SMS content did not match the template registered on DLT, or the template is inactive / blacklisted / not found.'
    ),
    steps: S(
      ['Panel me sahi Template ID select / daala hai, confirm karein.',
       'SMS text DLT template se word-to-word match hona chahiye; sirf {#var#} wali jagah badal sakti hai.',
       'Variable ki length DLT me di gayi limit se zyada na ho.',
       'DLT par template ka status Active / Approved dekhein.',
       'Fix ke baad dobara bhejein. Phir bhi fail ho to Template ID + message ka text support ko bhejein.'],
      ['Make sure the correct Template ID is selected / entered in the panel.',
       'The SMS text must match the DLT template word for word; only the {#var#} parts may change.',
       'Variable values must not exceed the length allowed on DLT.',
       'Check that the template status on DLT is Active / Approved.',
       'Send again after the fix. If it still fails, share the Template ID and message text with support.']
    ),
  },
  DLT_CONSENT: {
    label: S('Consent issue', 'Consent issue'),
    owner: 'client', retry: false,
    meaning: S(
      'Is number ke liye aapka DLT consent mojood nahi / expired / revoked / invalid hai.',
      'A valid DLT consent for this number is missing / expired / revoked / invalid.'
    ),
    steps: S(
      ['Check karein ki customer ne aapko SMS ke liye consent diya hai.',
       'DLT portal par consent register / renew karein (promotional / service explicit ke liye zaroori).',
       'Revoked consent wale number par SMS na bhejein.',
       'Consent update hone ke baad dobara bhejein.'],
      ['Confirm that the customer has given consent to receive your SMS.',
       'Register / renew the consent on the DLT portal (required for promotional / service-explicit messages).',
       'Do not send SMS to numbers whose consent is revoked.',
       'Send again after the consent is updated.']
    ),
  },
  DND_PREF: {
    label: S('DND / Preference block', 'DND / Preference block'),
    owner: 'none', retry: false,
    meaning: S(
      'Receiver ne DND / preference set kar rakhi hai ya message ka type / time us preference ke against hai, isliye block hua.',
      'The receiver has DND / preferences set, or the message type / time goes against that preference, so it was blocked.'
    ),
    steps: S(
      ['Promotional SMS DND number par nahi jaata - sirf Transactional / Service template use karein jahan allowed ho.',
       'Promotional SMS sirf allowed time (10 AM - 9 PM) me bhejein.',
       'Number par consent ho to DLT me consent register karein.',
       'Aise numbers ko apni list se hata dein.'],
      ['Promotional SMS cannot go to DND numbers - use Transactional / Service templates where allowed.',
       'Send promotional SMS only within the allowed time (10 AM - 9 PM).',
       'If you have consent for the number, register it on DLT.',
       'Remove such numbers from your list.']
    ),
  },
  TM_HASH: {
    label: S('Telemarketer / PE-TM chain issue', 'Telemarketer / PE-TM chain issue'),
    owner: 'support', retry: false,
    meaning: S(
      'DLT par PE-TM (Principal Entity - Telemarketer) chain ya hash galat / inactive / blacklisted hai.',
      'The PE-TM (Principal Entity - Telemarketer) chain or hash on DLT is wrong / inactive / blacklisted.'
    ),
    steps: S(
      ['Ye mostly platform / DLT chain setting ka issue hota hai - support team ko Error Code aur Message ID ke saath batayein.',
       'DLT portal par apna Telemarketer binding (PE-TM chain) check karein.',
       'Support se chain update hone ke baad dobara test karein.'],
      ['This is mostly a platform / DLT chain setting issue - report it to support with the Error Code and Message ID.',
       'Check your Telemarketer binding (PE-TM chain) on the DLT portal.',
       'Re-test after support updates the chain.']
    ),
  },
  URL_CTA: {
    label: S('URL not whitelisted (DLT)', 'URL not whitelisted (DLT)'),
    owner: 'client', retry: false,
    meaning: S(
      'SMS me jo link / URL / number / email hai woh DLT par whitelist nahi hai. Sabse common issue: pehle DLT se URL whitelist karwana zaroori hai, uske baad hi us link wale SMS deliver hote hain.',
      'The link / URL / number / email in the SMS is not whitelisted on DLT. This is the most common issue: the URL must first be whitelisted on DLT, only then do SMS with that link get delivered.'
    ),
    steps: S(
      ['Sabse pehle DLT portal (Jio / Airtel / Vi / BSNL) par apna URL whitelist (CTA) karwayein - iske baad hi SMS jayega.',
       'SMS / template me wahi URL use karein jo whitelist hua hai (short link ya landing page link ho to wahi link whitelist karwayein).',
       'Template ka text DLT par approved text se match hona chahiye.',
       'Whitelist hone ke baad dobara SMS bhejein. Phir bhi fail ho to Error Code, URL aur Template ID ke saath support1@nimbusitsolutions.com par mail karein.'],
      ['First get your URL whitelisted (CTA) on the DLT portal (Jio / Airtel / Vi / BSNL) - only then will the SMS go through.',
       'Use exactly the URL that was whitelisted in the SMS / template (if it is a short link or landing page link, get that exact link whitelisted).',
       'The template text must match the text approved on DLT.',
       'Send the SMS again after whitelisting. If it still fails, mail support1@nimbusitsolutions.com with the Error Code, URL and Template ID.']
    ),
  },
  THROTTLE: {
    label: S('Throttling / Flooding / Limit', 'Throttling / Flooding / Limit'),
    owner: 'client', retry: true,
    meaning: S(
      'Bahut tezi se / bahut zyada SMS bheje gaye, ya ek hi number par baar-baar bheje gaye, isliye limit lag gayi.',
      'SMS were sent too fast / too many, or repeatedly to the same number, so a limit was applied.'
    ),
    steps: S(
      ['Sending speed kam karein aur batches me bhejein.',
       'Ek hi number par kam samay me baar-baar SMS na bhejein.',
       '5-10 minute baad dobara try karein.',
       'Speed limit badhwani ho to support se baat karein.'],
      ['Reduce the sending speed and send in smaller batches.',
       'Avoid sending repeatedly to the same number in a short time.',
       'Retry after 5-10 minutes.',
       'Contact support if you need a higher speed limit.']
    ),
  },
  HANDSET: {
    label: S('Handset / Subscriber side', 'Handset / Subscriber side'),
    owner: 'none', retry: true,
    meaning: S(
      'Problem receiver ke number / phone me hai - jaise phone band, network se bahar, inbox full, number invalid ya service barred.',
      'The issue is on the receiver\'s number / phone - e.g. phone switched off, out of coverage, inbox full, invalid number or barred service.'
    ),
    steps: S(
      ['Number sahi hai (10 digit, country code ke saath) confirm karein.',
       'Phone on aur network me aane par SMS kuch der baad deliver ho sakta hai - dobara try karein.',
       'Baar-baar fail ho to number invalid / inactive ho sakta hai - list se hata dein.'],
      ['Confirm the number is correct (10 digits, with country code).',
       'The SMS may deliver later when the phone is on and in coverage - retry after some time.',
       'If it keeps failing, the number may be invalid / inactive - remove it from your list.']
    ),
  },
  BLOCKED: {
    label: S('Blocked (Number / Sender / Content)', 'Blocked (Number / Sender / Content)'),
    owner: 'support', retry: false,
    meaning: S(
      'Number, sender ya content kisi blacklist / block list me hai (operator ya platform level par).',
      'The number, sender or content is in a blacklist / block list (at operator or platform level).'
    ),
    steps: S(
      ['Check karein ki SMS content me koi blocked keyword / link to nahi.',
       'Number ya sender blocked ho sakta hai - support ko Error Code, number aur Message ID bhejein.',
       'Support team operator se confirm karke batayegi.'],
      ['Check that the SMS content has no blocked keyword / link.',
       'The number or sender may be blocked - send the Error Code, number and Message ID to support.',
       'The support team will confirm with the operator and update you.']
    ),
  },
  NETWORK: {
    label: S('Operator network / signalling', 'Operator network / signalling'),
    owner: 'operator', retry: true,
    meaning: S(
      'Operator network ya signalling level par temporary technical problem aayi (congestion, timeout, route issue, etc.).',
      'A temporary technical problem occurred at the operator network / signalling level (congestion, timeout, routing issue, etc.).'
    ),
    steps: S(
      ['Kuch der (10-15 minute) baad dobara bhej kar dekhein - aksar temporary hota hai.',
       'Sirf kuch numbers par ho to woh number / operator issue ho sakta hai.',
       'Zyada SMS fail ho rahe hon to Error Code, Message ID aur time ke saath support ko batayein.'],
      ['Retry after some time (10-15 minutes) - it is usually temporary.',
       'If only a few numbers are affected, it may be a number / operator issue.',
       'If many SMS are failing, report to support with the Error Code, Message ID and time.']
    ),
  },
  SMPP: {
    label: S('SMPP / API technical error', 'SMPP / API technical error'),
    owner: 'client', retry: false,
    meaning: S(
      'API / SMPP request me koi parameter, format, login ya bind galat tha, isliye request reject hui.',
      'A parameter, format, login or bind in the API / SMPP request was wrong, so the request was rejected.'
    ),
    steps: S(
      ['API / SMPP me username, password, system id aur sender / destination format check karein.',
       'Message length, encoding (DCS) aur optional parameters (TLV) sahi hain ya nahi dekhein.',
       'Request ka sample (password hata kar) aur response support ko bhejein.'],
      ['Check username, password, system id and sender / destination format in your API / SMPP setup.',
       'Verify message length, encoding (DCS) and optional parameters (TLV).',
       'Send a sample request (without the password) and the response to support.']
    ),
  },
  PLATFORM: {
    label: S('Platform / internal error', 'Platform / internal error'),
    owner: 'support', retry: true,
    meaning: S(
      'Platform ke andar temporary technical problem aayi (system / queue / database / timeout).',
      'A temporary technical problem occurred inside the platform (system / queue / database / timeout).'
    ),
    steps: S(
      ['Thodi der baad dobara try karein.',
       'Baar-baar aaye to Error Code, Message ID aur time ke saath support ko batayein.'],
      ['Please retry after a short while.',
       'If it keeps happening, report it to support with the Error Code, Message ID and time.']
    ),
  },
  RESERVED: {
    label: S('Reserved code', 'Reserved code'),
    owner: 'support', retry: false,
    meaning: S(
      'Ye code operator ne future / internal use ke liye reserve rakha hai. Normally nahi aana chahiye.',
      'This code is reserved by the operator for future / internal use. It should normally not appear.'
    ),
    steps: S(
      ['Support ko Error Code, Message ID aur number ke saath batayein - woh operator se confirm karenge.'],
      ['Report it to support with the Error Code, Message ID and number - they will confirm with the operator.']
    ),
  },
  OTHER: {
    label: S('Other', 'Other'),
    owner: 'support', retry: false,
    meaning: S(
      'Ye error operator / platform ka generic ya kam use hone wala code hai.',
      'This is a generic or rarely used operator / platform error code.'
    ),
    steps: S(
      ['Dobara ek baar try karein.',
       'Fail ho to Error Code, Message ID aur number ke saath support ko mail karein.'],
      ['Try once more.',
       'If it fails, email support with the Error Code, Message ID and number.']
    ),
  },
};

// Code-specific explanations (override the category text). Key = UPPERCASE code.
const OVERRIDES = {
  '000': { category: 'DELIVERED' },
  '113': {
    meaning: S('SMS ka text DLT par registered template se match nahi hua.', 'The SMS text does not match the template registered on DLT.'),
    steps: S(
      ['DLT par template ka exact text kholein aur apne SMS se compare karein (space, comma, spelling tak).',
       'Sirf {#var#} jagah par hi value badlein.',
       'Sahi Template ID ke saath dobara bhejein.'],
      ['Open the exact template text on DLT and compare it with your SMS (even spaces, commas and spelling).',
       'Change values only in the {#var#} positions.',
       'Send again with the correct Template ID.']),
  },
  '125': { category: 'DLT_TEMPLATE', meaning: S('Template ke variable ki length DLT limit se zyada hai.', 'A template variable is longer than the DLT limit.'),
    steps: S(['Variable ki value chhoti karein (DLT me di gayi max length ke andar).', 'Dobara bhejein.'], ['Shorten the variable value (within the max length set on DLT).', 'Send again.']) },
  '635': { category: 'DLT_TEMPLATE', meaning: S('Template ke variable ki length DLT limit se zyada hai.', 'A template variable is longer than the DLT limit.'),
    steps: S(['Variable ki value chhoti karein.', 'Dobara bhejein.'], ['Shorten the variable value.', 'Send again.']) },
  '5312': { category: 'DLT_TEMPLATE', meaning: S('Template ke variable ki length DLT limit se zyada hai.', 'A template variable is longer than the DLT limit.'),
    steps: S(['Variable ki value chhoti karein.', 'Dobara bhejein.'], ['Shorten the variable value.', 'Send again.']) },
  '168': { category: 'DND_PREF', meaning: S('Number DND (Do Not Disturb) par hai, isliye promotional SMS block hua.', 'The number is on DND (Do Not Disturb), so the promotional SMS was blocked.') },
  '2168': { category: 'DND_PREF', meaning: S('Number DND (Do Not Disturb) par hai, isliye promotional SMS block hua.', 'The number is on DND (Do Not Disturb), so the promotional SMS was blocked.') },
  '651': { category: 'DND_PREF', meaning: S('Promotional SMS ke liye block time (raat 9 PM se subah 10 AM) me bheja gaya.', 'A promotional SMS was sent during the block hours (9 PM to 10 AM).'),
    steps: S(['Promotional SMS sirf 10 AM se 9 PM ke beech bhejein.', 'Raat ke SMS ke liye Transactional / OTP template use karein.'], ['Send promotional SMS only between 10 AM and 9 PM.', 'Use Transactional / OTP templates for night-time messages.']) },
  '438': { category: 'DND_PREF', meaning: S('Promotional SMS galat time (allowed time ke bahar) bheja gaya.', 'A promotional SMS was sent at an invalid time (outside the allowed window).'),
    steps: S(['Promotional SMS sirf 10 AM se 9 PM ke beech bhejein.'], ['Send promotional SMS only between 10 AM and 9 PM.']) },
  '110': { category: 'HANDSET', owner: 'client', retry: false, meaning: S('Mobile number galat / invalid hai.', 'The mobile number is invalid.'),
    steps: S(['Number 10 digit ka (ya country code ke saath) hona chahiye, extra space / symbol nahi.', 'Sahi number daal kar dobara bhejein.'], ['The number must be 10 digits (or with country code) with no extra spaces / symbols.', 'Enter the correct number and send again.']) },
  '102': { category: 'BLOCKED', meaning: S('Sender ID (Header) block hai ya network system failure hui.', 'The Sender ID (Header) is blocked or a network system failure occurred.'),
    steps: S(['Header DLT par active hai ya nahi check karein.', 'Support ko Header, Error Code aur Message ID bhejein.'], ['Check that the Header is active on DLT.', 'Send the Header, Error Code and Message ID to support.']) },
  '22D': { category: 'HANDSET', meaning: S('Receiver ka phone abhi busy hai.', 'The receiver\'s phone is busy right now.'), steps: S(['Thodi der baad dobara bhejein.'], ['Send again after a short while.']) },
  '21F': { category: 'HANDSET', meaning: S('Receiver ka phone abhi busy hai.', 'The receiver\'s phone is busy right now.'), steps: S(['Thodi der baad dobara bhejein.'], ['Send again after a short while.']) },
  '27': { category: 'HANDSET', meaning: S('Receiver ka phone band hai ya network range se bahar hai (Absent subscriber).', 'The receiver\'s phone is off or out of network coverage (Absent subscriber).'),
    steps: S(['Operator kuch der tak SMS retry karta hai - phone on hote hi deliver ho jayega.', 'Bahut der tak fail rahe to number inactive ho sakta hai.'], ['The operator retries for a while - it will be delivered once the phone is on.', 'If it keeps failing for long, the number may be inactive.']) },
  '006': { category: 'HANDSET' }, '021B': { category: 'HANDSET' }, '202': { category: 'HANDSET' }, '219': { category: 'HANDSET' },
  '21B': { category: 'HANDSET', meaning: S('Receiver ka phone band / network se bahar hai (Absent subscriber).', 'The receiver\'s phone is off / out of coverage (Absent subscriber).') },
  '703': { category: 'PLATFORM', meaning: S('Operator se response samay par nahi mila (Submit timeout).', 'No response was received from the operator in time (submit timeout).'), owner: 'operator' },
  '715': { category: 'NETWORK', meaning: S('Message ki validity khatam ho gayi aur woh deliver nahi ho paya (Expired).', 'The message validity expired before it could be delivered (Expired).'),
    steps: S(['Phone off / network issue me ye aata hai. Number ko dobara try karein.', 'Zaroori SMS (OTP) ke liye validity time sahi rakhein.'], ['This occurs with switched-off phones / network issues. Try the number again.', 'Keep a proper validity time for important SMS (e.g. OTP).']) },
  '463': { category: 'NETWORK', meaning: S('Validity time ke andar delivery report (DLR) nahi mila, isliye cancel ho gaya.', 'No delivery report (DLR) was received within the validity time, so it was cancelled.') },
  '9031': { category: 'NETWORK', meaning: S('Retry ki maximum limit poori ho gayi, message deliver nahi ho paya.', 'The maximum retry limit was reached; the message could not be delivered.') },
  '2088': { category: 'THROTTLE', meaning: S('SMPP throttling - bahut tez speed se SMS bheje ja rahe hain.', 'SMPP throttling - messages are being sent too fast.') },
  '500': { category: 'THROTTLE', meaning: S('SMPP throttling - bahut tez speed se SMS bheje ja rahe hain.', 'SMPP throttling - messages are being sent too fast.') },
  '9088': { category: 'THROTTLE', meaning: S('SMPP throttling - bahut tez speed se SMS bheje ja rahe hain.', 'SMPP throttling - messages are being sent too fast.') },
  '591': { category: 'THROTTLE', meaning: S('Ek hi number par bahut zyada SMS bhejne se Destination Flooding block laga.', 'Too many SMS to the same number triggered Destination Flooding protection.') },
  '069': { category: 'THROTTLE', meaning: S('Ek hi number par bahut zyada SMS bhejne se Destination Flooding block laga.', 'Too many SMS to the same number triggered Destination Flooding protection.') },
  '2001': { category: 'SMPP', meaning: S('Message bahut lamba hai.', 'The message is too long.'), steps: S(['SMS chhota karein ya multi-part (concatenated) ke hisaab se bhejein.'], ['Shorten the SMS or send it as a multi-part (concatenated) message.']) },
  '2014': { category: 'SMPP', meaning: S('Password galat hai.', 'The password is invalid.'), steps: S(['API / SMPP password dobara check karein.', 'Bhool gaye ho to support se reset karwayein.'], ['Re-check the API / SMPP password.', 'If forgotten, get it reset by support.']) },
  '9014': { category: 'SMPP', meaning: S('Password galat hai.', 'The password is invalid.'), steps: S(['API / SMPP password dobara check karein.', 'Bhool gaye ho to support se reset karwayein.'], ['Re-check the API / SMPP password.', 'If forgotten, get it reset by support.']) },
  '2015': { category: 'SMPP', meaning: S('System ID (username) galat hai.', 'The System ID (username) is invalid.') },
  '9015': { category: 'SMPP', meaning: S('System ID (username) galat hai.', 'The System ID (username) is invalid.') },
  '2013': { category: 'SMPP', meaning: S('SMPP bind fail hua (login nahi ho paya).', 'SMPP bind failed (could not log in).') },
  '497': { category: 'URL_CTA', meaning: S('SMS ka URL DLT par whitelist nahi hai.', 'The URL in the SMS is not whitelisted on DLT.') },
  '498': { category: 'URL_CTA', meaning: S('SMS ka email DLT par whitelist nahi hai.', 'The email in the SMS is not whitelisted on DLT.') },
  '499': { category: 'URL_CTA', meaning: S('SMS ka phone number DLT par whitelist nahi hai.', 'The phone number in the SMS is not whitelisted on DLT.') },
  '204': { category: 'HANDSET', meaning: S('Receiver ka incoming SMS / call facility recharge na hone ki wajah se band hai.', 'The receiver\'s incoming SMS / call facility is off because the number is not recharged.'),
    steps: S(['Receiver ke recharge karne par deliver hoga - dobara try karein.'], ['It will deliver once the receiver recharges - try again later.']) },
  '801': { category: 'BLOCKED', meaning: S('Receiver ka number blacklist me hai.', 'The receiver\'s number is blacklisted.') },
  '452': { category: 'BLOCKED', meaning: S('Number globally block hai.', 'The number is globally blocked.') },
  '594': { category: 'BLOCKED', meaning: S('Sender ID globally block hai.', 'The Sender ID is globally blocked.') },
  '595': { category: 'BLOCKED', meaning: S('Receiver globally block hai.', 'The receiver is globally blocked.') },
  '221': { category: 'BLOCKED', meaning: S('Number (MSISDN) blocked hai.', 'The number (MSISDN) is blocked.') },
  '177': { category: 'BLOCKED', meaning: S('Number (MSISDN) blacklist me hai.', 'The number (MSISDN) is blacklisted.') },
  '242': { category: 'OTHER', meaning: S('Service is circle / subscriber ke liye configure nahi hai (operator ki taraf se text adhoora aaya hai).', 'Service is not configured for this circle / subscriber (the operator text came truncated).') },
  '4000': { category: 'PLATFORM' }, '4001': { category: 'PLATFORM' }, '4002': { category: 'PLATFORM' }, '4004': { category: 'PLATFORM' },
  '088': { category: 'NETWORK', meaning: S('Doosre operator ke network me temporary fluctuation.', 'Temporary network fluctuation at the far-end operator.') },
  '1001': { category: 'NETWORK', meaning: S('Door ke network se response nahi mila.', 'No response from the far-end network.') },
  '5501': { category: 'DLT_CONSENT', meaning: S('Is number ka consent DLT database me nahi mila.', 'The consent for this number was not found in the DLT database.') },
  '5502': { category: 'DLT_CONSENT', meaning: S('Is number ka consent expire ho gaya hai.', 'The consent for this number has expired.') },
  '5503': { category: 'DLT_CONSENT', meaning: S('Customer ne apna consent revoke (wapas) le liya hai.', 'The customer has revoked their consent.') },
  // URL / CTA codes
  '5902': { category: 'URL_CTA', meaning: S('SMS me use kiya gaya URL blacklist hai.', 'The URL used in the SMS is blacklisted.'),
    steps: S(['Is URL ko SMS me use na karein, DLT / support se blacklist ka reason pata karein.', 'Doosra (clean) URL DLT par whitelist karwakar use karein.', 'Error Code aur URL ke saath support1@nimbusitsolutions.com par mail karein.'], ['Do not use this URL in the SMS; find out the blacklist reason from DLT / support.', 'Get another (clean) URL whitelisted on DLT and use it.', 'Mail support1@nimbusitsolutions.com with the Error Code and URL.']) },
  '5903': { category: 'URL_CTA', meaning: S('SMS me use kiya gaya URL DLT par inactive hai.', 'The URL used in the SMS is inactive on DLT.') },
  '700': { category: 'URL_CTA', meaning: S('SMS me link hai par DLT par koi URL / CTA whitelist nahi hai.', 'The SMS contains a link but no URL / CTA is whitelisted on DLT.') },
  '701': { category: 'URL_CTA', meaning: S('SMS ka URL DLT par whitelist kiye gaye URL se match nahi hua.', 'The URL in the SMS does not match the URLs whitelisted on DLT.') },
  '5901': { category: 'URL_CTA', meaning: S('CTA whitelisting error - SMS me use hua URL DLT par whitelist nahi hai.', 'CTA whitelisting error - the URL used in the SMS is not whitelisted on DLT.') },
  '184': { category: 'NETWORK', meaning: S('VLR whitelisted (operator network ka internal code).', 'VLR whitelisted (an internal operator network code).') },

  // category-only fixes (found while reviewing the auto classification)
  '5206': { category: 'DLT_TEMPLATE', meaning: S('Promotional port par Transactional / Service template ka SMS aaya (port aur template type mismatch).', 'A Transactional / Service template SMS arrived on a Promotional route (route and template type mismatch).'), steps: S(['Template ka type (Promo / Trans / Service) aur selected route same hona chahiye.', 'Sahi route / SMS type select karke dobara bhejein.'], ['The template type (Promo / Trans / Service) must match the selected route.', 'Select the correct route / SMS type and send again.']) },
  '5207': { category: 'DLT_TEMPLATE', meaning: S('Transactional port par Promotional template ka SMS aaya (port aur template type mismatch).', 'A Promotional template SMS arrived on a Transactional route (route and template type mismatch).'), steps: S(['Template ka type (Promo / Trans / Service) aur selected route same hona chahiye.', 'Sahi route / SMS type select karke dobara bhejein.'], ['The template type (Promo / Trans / Service) must match the selected route.', 'Select the correct route / SMS type and send again.']) },
  '080': { category: 'NETWORK' }, '108': { category: 'SMPP' }, '434': { category: 'DLT_TEMPLATE' }, '065': { category: 'NETWORK' }, '068': { category: 'NETWORK' },
  '070': { category: 'PLATFORM' }, '071': { category: 'PLATFORM' }, '072': { category: 'PLATFORM' }, '087': { category: 'PLATFORM' },
  '106': { category: 'NETWORK' }, '107': { category: 'NETWORK' }, '109': { category: 'NETWORK' }, '5903': { category: 'URL_CTA' },
  '21D': { category: 'NETWORK' }, '21E': { category: 'NETWORK' }, '20E': { category: 'NETWORK' }, '22C': { category: 'NETWORK' }, '22F': { category: 'NETWORK' },
  '036': { category: 'NETWORK' }, '223': { category: 'NETWORK' }, '224': { category: 'NETWORK' }, '092': { category: 'NETWORK' }, '193': { category: 'NETWORK' }, '195': { category: 'NETWORK' },
  '261': { category: 'NETWORK' }, '502': { category: 'NETWORK' }, '240': { category: 'HANDSET' }, '241': { category: 'HANDSET' }, '176': { category: 'SMPP' },
  '2005': { category: 'SMPP' }, '2019': { category: 'SMPP' }, '2022': { category: 'SMPP' }, '2051': { category: 'SMPP' }, '2085': { category: 'SMPP' }, '2098': { category: 'SMPP' }, '2103': { category: 'SMPP' }, '2260': { category: 'SMPP' }, '9022': { category: 'SMPP' },
};

// Ordered regex rules: first match wins. Tested on UPPERCASE full description.
const RULES = [
  [/^RESERVED/, 'RESERVED'],
  [/^NORMAL DELIVERED/, 'DELIVERED'],
  [/WHITELIST|CTA\b|URL\b|EMAIL NOT|NUMBER NOT WHITELISTED/, 'URL_CTA'],
  [/CONSENT/, 'DLT_CONSENT'],
  [/TELEMARKETER|TM_ID|TM_|TM-|PE[_ -]?TM|HASH|PEID|PE_?ID|TMPID|TLV_PEID/, 'TM_HASH'],
  [/THROTTL|FLOOD|QUEUE FULL|QUOTA|MESSAGE LIMIT|LICENCE EXCEEDED/, 'THROTTLE'],
  [/\bDND\b|PREFERENCE|PROMO|BLACKOUT|SE_CATEGORY|SE CATEGORY|CMODE|DAY CODE|TIME CODE|CATEGORY IS 0/, 'DND_PREF'],
  [/ENTITY/, 'DLT_ENTITY'],
  [/HEADER|SENDER|CLI\b|HDR|FREEPOOL/, 'DLT_HEADER'],
  [/TEMPLATE|CONTENT|VARIABLE|VALIABLE|REGEX/, 'DLT_TEMPLATE'],
  [/BLACKLIST|BLOCKED|BARRED|BARRING|GLOBAL KEYWORD/, 'BLOCKED'],
  [/REDIS|JMS_|IPC|BILNG|DLT_SCRUBBING|SCRUBBING|GLOBAL_FAILURE|ABMS|MAKE_CALL|GOV_|INTERNAL|MESSAGE QUEUE/, 'PLATFORM'],
  [/ABSENT|POWEROFF|POWER OFF|SWITCHED|NOT REACHABLE|UNREACHABLE|BUSY|ROAMING|MEMORY|MS RESPONSE|MS ERROR|MS STORE|SUBSCRIBER|HANDSET|EQUIPMENT|TELESERVICE|TELE SERVICE|BEARER|CALL BARRED|IMSI|MSISDN|INVALID_DESTINATION|NO REPLY|INCOMPATIBLE TERMINAL|DESTINATION NUMBER|INCOMING CALL/, 'HANDSET'],
  [/ESME|SMPP|BIND|PDU|TLV|PASSWORD|SYSTEM ID|COMMAND|ESM CLASS|\bTON\b|\bNPI\b|INVALID .*ADDRESS|INCORRECT|DCS|PRIORITY|VALIDITY|SCHEDULE|MESSAGE ID|MESSAGEID|SERVICE TYPE|SERVICETYPE|REPLACE|FLAG|PREDEFINED|DISTRIBUTION|SUBMIT|PARAMETER|SMS TYPE|ACCOUNTID|MSISDN REQUIRED|TOO LONG|SYNTAX|ALPHA|ALPHABET/, 'SMPP'],
  [/MAP|SCCP|TCAP|MTP|NNR|EC_OR|EC_PA|EC_UA|EC_NC|HLR|VMSC|HANDOVER|DIALOG|ABORT|STACK|SIG ERROR|XUDT|TRANSACTION|PROVIDER|SMSC|SC_|SERVICE CENTRE|USSD|LCS|SS |NETWORK|CONGEST|TIMEOUT|TIME_OUT|NO RESPONSE|UNKNOWN|FAILURE|ROUTE|RETRY|EXPIRED|REJECT|CANCEL|EXCEPTION|SYSTEM|TRANSPORT|RESOURCE|LIMITATION|NODE|PEER|SESSION|PIDS?\b|QUARANTINE|SINK|SOURCE|LOCATION|REPLY PATH|ZONE|RESERVATION/, 'NETWORK'],
];

module.exports = { CATEGORIES, OVERRIDES, RULES };
