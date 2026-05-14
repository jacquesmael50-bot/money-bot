export const name = 'help';

export async function execute(message, args) {
    message.reply(`
💰 **SPS Money Game - Commands**

**Economy**
\`+bal\` - Check your balance
\`+dep <amount|all>\` - Deposit to bank
\`+transfer <@user> <amount>\` - Transfer money

**Earn Money**
\`+work\` - Work to earn money
\`+daily\` - Claim daily reward ($100,000)
\`+weekly\` - Claim weekly reward ($500,000)
\`+crime\` - Commit a crime
\`+heist\` - Do a heist

**Games**
\`+roulette <red/black> <amount>\` - Play roulette
\`+rob <@user>\` - Rob someone

**Staff only**
\`+addmoney <amount>\` - Add money to yourself
    `);
}
