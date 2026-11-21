const { faq } = require('./_h');

module.exports = {
  faqs: [
    faq({
      id: 'group-create', cat: 'groups',
      q: [`Group kaise banayein aur manage karein?`, `How do I create and manage a Group?`],
      a: [`Group me aap apne numbers ek baar save kar lete hain, taaki har SMS ke liye numbers bar-bar paste / upload na karne padein.`,
          `A group lets you save your numbers once so you do not have to paste / upload them again and again for every SMS.`],
      steps: [
        [`Manage > Manage Groups kholein.`, `New Group par click karke Group Name daalein - group ban jayega.`, `Edit (pencil) icon se group ka naam badal sakte hain.`, `Import icon se numbers ka data group me upload karein.`, `View (eye) se group ke numbers dekhein, Export icon se numbers download karein aur Delete icon se group hata sakte hain.`],
        [`Open Manage > Manage Groups.`, `Click New Group and enter a Group Name - the group is created.`, `Use the Edit (pencil) icon to rename the group.`, `Use the Import icon to upload your numbers data into the group.`, `Use View (eye) to see the group's numbers, Export to download them and Delete to remove the group.`],
      ],
      img: [[`manage-menu`, `Manage Groups`, `Manage Groups`], [`manage-groups`, `1: New Group, 2: group ke action icons`, `1: New Group, 2: the group action icons`]],
      kw: `group, manage group, group banana, create group, new group, import numbers, export group, delete group, contacts, number list, group edit, group rename`,
    }),
    faq({
      id: 'group-send', cat: 'groups',
      q: [`Group se SMS kaise bhejein (numbers paste kiye bina)?`, `How do I send SMS to a Group (without pasting numbers)?`],
      a: [`Compose SMS me Mobile Numbers me numbers daalne ki jagah apna group select kar lein - SMS us group ke saare numbers par chala jayega.`,
          `In Compose SMS, instead of entering numbers, select your group - the SMS will go to all numbers in that group.`],
      steps: [
        [`SMS > Compose SMS kholein.`, `Entity aur Sender ID select karein.`, `Numbers daalne ki jagah right side ki Group List se apna group select karein.`, `Open Template se template chunein, Continue karein aur Send Now dabayein.`],
        [`Open SMS > Compose SMS.`, `Select the Entity and Sender ID.`, `Instead of entering numbers, select your group from the Group List on the right.`, `Choose the template with Open Template, click Continue and then Send Now.`],
      ],
      img: [[`sms-compose-note`, `Group List yahan hai`, `The Group List is here`]],
      kw: `group sms, group select, group list, group me sms, group se bhejna, group ko sms`,
    }),
    faq({
      id: 'blacklist', cat: 'groups',
      q: [`Blacklist kya hai? Number ko block / unblock kaise karein?`, `What is the Blacklist? How do I block / unblock a number?`],
      a: [`Manage BlackList me aap un numbers ko add kar sakte hain jinhe aap SMS nahi bhejna chahte. Jinhe dobara SMS bhejna ho unhe blacklist se remove kar dein.`,
          `In Manage BlackList you can add the numbers you do not want to send SMS to. Remove a number from the blacklist when you want to message it again.`],
      steps: [
        [`Manage > Manage BlackList kholein.`, `Jis number ko SMS nahi bhejna use Add karein.`, `Jise dobara SMS bhejna ho use blacklist se Remove karein.`],
        [`Open Manage > Manage BlackList.`, `Add the number you do not want to send SMS to.`, `Remove a number from the blacklist when you want to send SMS to it again.`],
      ],
      tips: [[`Ye poore system ke liye nahi hoti - agar koi aur us number ko apne panel se SMS bheje to us par aapki blacklist kaam nahi karti. Ye sirf aapke apne panel ke SMS par lagu hoti hai.`],
             [`It is not global - if someone else sends SMS to that number from another panel, your blacklist has no effect there. It works only for SMS sent from your own panel.`]],
      kw: `blacklist, black list, block number, unblock, number block, sms nahi bhejna, remove blacklist, add blacklist, do not send`,
    }),
  ],
};
