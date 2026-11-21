const { L } = require('./_h');

// Menu topics shown to the client (order = position in the menu).
module.exports = {
  categories: [
    { id: 'login', order: 1, icon: '🔐', title: L(`Login & Password`, `Login & Password`) },
    { id: 'setup', order: 2, icon: '⚙️', title: L(`DLT Setup (Entity / Sender / Template)`, `DLT Setup (Entity / Sender / Template)`) },
    { id: 'sms', order: 3, icon: '💬', title: L(`SMS Bhejna`, `Sending SMS`) },
    { id: 'clicker', order: 4, icon: '🔗', title: L(`Clicker (Link wala SMS)`, `Clicker (Link SMS)`) },
    { id: 'groups', order: 5, icon: '👥', title: L(`Groups & Blacklist`, `Groups & Blacklist`) },
    { id: 'reports', order: 6, icon: '📊', title: L(`Reports & Credit`, `Reports & Credit`) },
    { id: 'errors', order: 7, icon: '⚠️', title: L(`Failed SMS / Error Code`, `Failed SMS / Error Code`) },
    { id: 'rcs', order: 8, icon: '📲', title: L(`RCS`, `RCS`) },
    { id: 'api', order: 9, icon: '🔌', title: L(`HTTP API`, `HTTP API`) },
    { id: 'otp', order: 10, icon: '🔑', title: L(`Two Factor (OTP) API`, `Two Factor (OTP) API`) },
    { id: 'utilities', order: 11, icon: '🧰', title: L(`Utilities & Support`, `Utilities & Support`) },
    { id: 'reseller', order: 12, icon: '🏢', title: L(`Reseller`, `Reseller`) },
    { id: 'videos', order: 13, icon: '🎬', title: L(`Demo Videos`, `Demo Videos`), special: 'videos' },
  ],
  faqs: [],
};
