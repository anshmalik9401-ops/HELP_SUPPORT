const { faq } = require('./_h');

module.exports = {
  faqs: [
    faq({
      id: 'login-how', cat: 'login',
      q: [`Panel me login kaise karein?`, `How do I log in to the panel?`],
      a: [`Panel kholne ke liye https://omnidigital.co.in/ par jayein aur apne Account Manager (AM) se mile username aur password se login karein.`,
          `Open https://omnidigital.co.in/ and log in with the username and password given to you by your Account Manager (AM).`],
      steps: [
        [`Browser me https://omnidigital.co.in/ kholein.`, `Username aur Password daalein (ye aapko apne AM se milta hai).`, `"I agree" wale check box par tick karein.`, `Sign In par click karein - aapka panel khul jayega.`],
        [`Open https://omnidigital.co.in/ in your browser.`, `Enter your Username and Password (provided by your AM).`, `Tick the "I agree" check box.`, `Click Sign In - your panel will open.`],
      ],
      tips: [[`Username / password nahi mila ho to apne AM se baat karein ya support1@nimbusitsolutions.com par mail karein.`],
             [`If you have not received your username / password, contact your AM or mail support1@nimbusitsolutions.com.`]],
      kw: `login, log in, sign in, signin, panel kholna, panel open, panel link, panel ka link, url, username, credentials, i agree, login nahi ho raha, access`,
    }),
    faq({
      id: 'login-forgot', cat: 'login',
      q: [`Password galat aa raha hai / bhool gaya, kya karein?`, `Password error or forgotten password - what should I do?`],
      a: [`Login page par Forgot option se temporary password mangwa sakte hain, phir login karke apna password badal lein.`,
          `Use the Forgot option on the login page to get a temporary password, then log in and change your password.`],
      steps: [
        [`Login page par "Forgot" / "Forgot Password" par click karein.`,
         `Apna registered mail id (username) daalein.`,
         `Agar username registered hai to registered mobile number par ek temporary password bheja jata hai. Ye 30 minute tak valid hai - jab tak aap use use nahi karte, aapka purana password bhi chalta rehta hai.`,
         `Temporary password se login karein.`,
         `Ab upar right corner me Profile menu kholein, neeche Change Password par click karein, Old Password, New Password aur Confirm Password daalkar save karein.`],
        [`Click "Forgot" / "Forgot Password" on the login page.`,
         `Enter your registered mail id (username).`,
         `If the username is registered, a temporary password is sent to the registered mobile number. It is valid for 30 minutes; your current password keeps working until you use it.`,
         `Log in with the temporary password.`,
         `Open the Profile menu at the top-right corner, click Change Password, enter the Old, New and Confirm password and save.`],
      ],
      tips: [[`Temporary password na aaye ya login phir bhi na ho to AM se updated password lein ya support1@nimbusitsolutions.com par mail karein.`],
             [`If you do not receive the temporary password or still cannot log in, get an updated password from your AM or mail support1@nimbusitsolutions.com.`]],
      kw: `forgot, forget, forgot password, password bhool, password yaad nahi, password reset, reset password, temporary password, temp password, password error, wrong password, galat password, password galat, invalid password`,
    }),
    faq({
      id: 'login-change-password', cat: 'login',
      q: [`Password kaise badlein (Change Password)?`, `How do I change my password?`],
      a: [`Password Profile menu ke andar Change Password se badla jata hai.`, `You can change your password from the Change Password option inside the Profile menu.`],
      steps: [
        [`Panel me login karein.`, `Upar right side ke corner me Profile menu kholein.`, `Neeche Change Password dikhega, us par click karein.`, `Old Password, New Password aur Confirm Password daalein.`, `Save / Submit karein.`],
        [`Log in to the panel.`, `Open the Profile menu at the top-right corner.`, `Click Change Password shown below.`, `Enter the Old, New and Confirm password.`, `Save / Submit.`],
      ],
      kw: `change password, password change, password badalna, naya password, profile menu, update password, new password`,
    }),
    faq({
      id: 'login-expired', cat: 'login',
      q: [`Password expire ho gaya hai, kya karein?`, `My password has expired - what should I do?`],
      a: [`Password expire ho jaye to apne Account Manager (AM) se updated password lein, ya support1@nimbusitsolutions.com par mail karein.`,
          `If your password has expired, get an updated password from your Account Manager (AM) or mail support1@nimbusitsolutions.com.`],
      steps: [
        [`Apne AM ko batayein ki password expire ho gaya hai.`, `AM se updated (naya) password lein.`, `Ya support1@nimbusitsolutions.com par mail karein (mail ka format is chat me "Mera sawal list me nahi hai" par milta hai).`, `Naye password se login karke Profile > Change Password se apna password set kar lein.`],
        [`Tell your AM that your password has expired.`, `Get the updated (new) password from your AM.`, `Or mail support1@nimbusitsolutions.com (the mail format is shown in this chat under "My question is not listed").`, `Log in with the new password and set your own via Profile > Change Password.`],
      ],
      kw: `expire, expired, password expire, password expired, validity, password khatam, login nahi ho raha, password purana`,
    }),
  ],
};
