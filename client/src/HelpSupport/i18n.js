export const T = {
  en: {
    title: 'Help & Support', subtitle: 'Nia · SMS/RCS help',
    intro: "Hi, I'm Nia 😊 Pick a topic below, or type your question / error code in the box.",
    notInList: '❓ My question is not listed', finishChat: '✅ Finish chat',
    pickQuestion: (c) => `Select a question about "${c}":`, backMenu: '⬅ Main menu',
    helpfulQ: 'Was this answer helpful?', yes: '👍 Yes', no: '👎 No',
    glad: 'Great! 😊 Anything else you would like to ask?',
    steps: 'Step by step', tips: 'Tips', video: 'Demo video',
    errFound: 'Here is what your error code means:', errFuzzy: 'Error codes matching your query:',
    desc: 'Operator description', alsoAs: 'This code may also be shown as', meaning: 'Meaning', whatToDo: 'What to do',
    whoFixes: 'Who fixes it', retry: 'Retry sending?',
    owner: { client: 'You (client)', support: 'Support team', operator: 'Operator / network', none: 'No action needed' },
    retryYes: 'Yes, retrying after some time may help', retryNo: 'No, fix the issue first',
    commonCodes: 'Common codes (tap to view):',
    suggestQ: 'Were you asking about one of these?',
    notFound: "Sorry, I couldn't find an answer to this in our Q&A. 🙏",
    sorry: "Sorry the answer didn't help. 🙏",
    mailIntro: 'You can email your query directly to our support team:',
    mailFormatTitle: 'Please send the mail in this format:',
    fmt: { subject: 'Write a short title', query: 'Describe your query in detail', cred: 'Username / User ID', am: 'Name of your Account Manager', contact: 'Your contact number' },
    passwordWarn: 'Note: never include your password in the mail - only your Username / User ID.',
    copy: '📋 Copy format', copied: 'Copied ✓', openMail: '✉️ Open in mail app',
    moreQuery: 'For any other query, mail us at this address - our team will contact you shortly.',
    thanks: 'Thank you! 🙏 Have a great day.',
    endedBar: 'This conversation has ended. Start a new chat to ask something else.', newChat: '🔄 Start new chat',
    ph: 'Type your question or error code here...', phEnded: 'Conversation ended',
    pickVideo: 'Which demo video would you like to watch?', zoomHint: 'Click the image to enlarge', close: 'Close',
    send: 'Send', serverErr: 'Something went wrong, please try again.', loading: 'Loading...', retryLoad: 'Retry',
    askAi: 'Ask Nia', aiBadge: 'Nia · AI answer', aiOn: 'Chatting with Nia (AI) - type your question', aiExit: 'Close Nia',
    aiIntro: "Hi! I'm Nia, your AI assistant ✨ Type your question - I'll answer from our guide first, and give basic guidance for what the guide does not cover.",
    aiNote: 'AI can make mistakes. For account-specific issues please mail support.', aiCaution: "Note: This answer is from the AI's general knowledge and was not found in the panel guide. If the panel does not have this feature or it does not work, please contact support1@nimbusitsolutions.com.",
    aiOffer: "I couldn't find this in our Q&A. You can ask Nia (AI), or mail our support team.",
    aiOfferEmpty: 'You can ask Nia (AI) your question, or mail our support team.', askAiThis: 'Ask Nia', mailSupport: '✉️ Mail support',
    aiErr: 'Nia cannot answer right now. Please mail our support team.', aiQuota: 'Nia has reached its current AI usage limit. Please try again later.', aiLimit: 'You have asked many questions, please try again after some time.',
    related: 'Also see:',
    loadFail: 'Could not load Help & Support right now.',
  },
};

export const greetingWord = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
};

// Common error codes shown as quick chips
export const COMMON_CODES = ['497', '113', '118', '119', '116', '168', '5501', '027', '22D'];
