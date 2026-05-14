export const name = 'help';

export async function execute(message, args) {
    message.reply(`
💰 **SPS Money Game - Commands**

**Economy**
\`+bal\` - Check your balance
\`+dep <amount|all>\` - Deposit to bank
\`+transfer <@user> <amount>\` - Transfer money
\`+lb\` - Leaderboard top 10

**Earn Money**
\`+work\` - Work to earn money
\`+daily\` - Claim daily reward ($100,000)
\`+weekly\` - Claim weekly reward ($500,000)
\`+crime\` - Commit a crime
\`+heist\` - Do a heist
\`+autofarm\` - Farm for 10 minutes (~$300,000)

**Games**
\`+roulette <red/black> <amount>\` - Play roulette
\`+rob <@user>\` - Rob someone

**Staff only**
\`+addmoney <amount>\` - Add money to yourself
\`+removemoney <@user> <amount>\` - Remove money from a user
\`+nomoney <@user>\` - Reset a user's wallet and bank to $0

**Owner only**
\`+give me <amount>\` - Give yourself money
\`+give <@user> <amount>\` - Give money to a user
    `);
}
