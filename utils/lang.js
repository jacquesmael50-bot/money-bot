export function isStaff(message) {
    return message.member.roles.cache.has('1502213063632359515');
}

export function isOwner(message) {
    return message.author.id === '1492708934845206779'; // remplace par ton ID Discord
}

export function getLang(message) {
    const englishRole = '1501605349600395344';
    const frenchRole = '1501605153231601725';
    const staffRole = '1502213063632359515';

    if (message.member.roles.cache.has(staffRole)) return 'fr';
    if (message.member.roles.cache.has(frenchRole) && message.member.roles.cache.has(englishRole)) return 'fr';
    if (message.member.roles.cache.has(englishRole)) return 'en';
    return 'fr';
}
