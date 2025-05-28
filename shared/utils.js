export function isMobile(userAgent) {
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4));
}

export function formatDateToUserTimezoneTime(dateString) {
  // Parse the date string
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date)) {
    throw new Error('Invalid date format');
  }

  // Extract individual time components
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Construct the formatted time string
  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
}

export function formatDateToUserTimezone(dateString, includeTime = true) {
  // Parse the date string
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date)) {
    throw new Error('Invalid date format');
  }

  // Extract individual date and time components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');

  let formattedDate = `${year}-${month}-${day}`;

  // If includeTime is true, add the time to the formatted string
  if (includeTime) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    formattedDate += ` - ${hours}:${minutes}`;
  }

  return formattedDate;
}


export function drawPortrait(player, width, height, shirtColor) {
  const canvas = document.querySelector(`[data-player-portrait="${player.nick}"]`);
  const ctx = canvas.getContext('2d');

  const [headIndex, hairIndex, beardIndex, eyebrowsIndex, indexGlasses, indexEyes, indexMouth, indexNose, toolGender] = player.portrait.split('-');
  let randomShirt;
  if (shirtColor) {
    randomShirt = shirtColor;
  } else {
    randomShirt = Math.floor(Math.random() * 4) + 1;
  }

  let playerGender;
  if (player.gender) {
    playerGender = player.gender;
  } else {
    playerGender = toolGender;
  }

  let images;
  // Load images based on identifiers
  if (playerGender == 1) {
    images = [
      `/femaleparts/head${headIndex}.png`,
      `/femaleparts/brows${eyebrowsIndex}.png`,
      `/femaleparts/eyes${indexEyes}.png`,
      `/femaleparts/mouth${indexMouth}.png`,
      `/femaleparts/nose${indexNose}.png`,
      `/femaleparts/hair${hairIndex}.png`,
      `/charparts/glasses${indexGlasses}.png`,
      `/femaleparts/t-shirt${randomShirt}.png`
    ];
  } else {
    images = [
      `/charparts/head${headIndex}.png`,
      `/charparts/hair${hairIndex}.png`,
      `/charparts/beard${beardIndex}.png`,
      `/charparts/eyebrows${eyebrowsIndex}.png`,
      `/charparts/eyes${indexEyes}.png`,
      `/charparts/mouth${indexMouth}.png`,
      `/charparts/nose${indexNose}.png`,
      `/charparts/glasses${indexGlasses}.png`,
      `/charparts/t-shirt${randomShirt}.png`
    ];
  }

  images = images.filter(src => src !== '/charparts/glasses0.png' && src !== '/charparts/beard0.png'); // Filter out glasses0.png

  let queue = Promise.resolve();

  images.forEach((src) => {
    queue = queue.then(() => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.src = src;
    })).then(img => {
      ctx.drawImage(img, 0, 0, width, height);
    }).catch(error => {
      console.error('ERROR: Failed to load image:', error);
    });
  });
}

export function formatMoney(number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
}

export function getCountryCode(country) {
  const countryCodes = {
    "Argentina": "AR",
    "Australia": "AU",
    "Austria": "AT",
    "Belarus": "BY",
    "Belgium": "BE",
    "Bosnia": "BA",
    "Brazil": "BR",
    "Canada": "CA",
    "Colombia": "CO",
    "Chile": "CL",
    "China": "CN",
    "Croatia": "HR",
    "Czechia": "CZ", // Also known as the Czech Republic
    "Denmark": "DK",
    "Ecuador": "EC",
    "England": "EN",
    "Estonia": "EE",
    "Finland": "FI",
    "France": "FR",
    "Germany": "DE",
    "Greece": "GR",
    "Hong Kong": "HK",
    "Iceland": "IS",
    "Italy": "IT",
    "Israel": "IL",
    "Japan": "JP",
    "Kazakhstan": "KZ",
    "South Korea": "KR",
    "Latvia": "LV",
    "Lithuania": "LT",
    "Netherlands": "NL",
    "New Zealand": "NZ",
    "Norway": "NO",
    "Peru": "PE",
    "Poland": "PL",
    "Portugal": "PT",
    "Romania": "RO",
    "Russia": "RU",
    "Serbia": "RS",
    "Singapore": "SG",
    "Slovakia": "SK",
    "Slovenia": "SI",
    "Spain": "ES",
    "Sweden": "SE",
    "Switzerland": "CH",
    "Turkey": "TR",
    "Ukraine": "UA",
    "United Kingdom": "GB",
    "United States": "US",
    "Uruguay": "UY",
    "Uzbekistan": "UZ"
  };

  // Normalize the country name for consistent lookup
  const normalizedCountry = (country || '').trim().toLowerCase();

  // Find the country code by matching the normalized country name
  for (const [name, code] of Object.entries(countryCodes)) {
    if (name.toLowerCase() === normalizedCountry) {
      return code.toLowerCase();
    }
  }

  // Return undefined or a default value if not found
  return undefined;
}

export const getResultColor = (match, team) => {
  if (match.homeTeam.id === team.id || match.awayTeam.id === team.id) {
    if (match.homeTeamRounds === match.awayTeamRounds) {
      return 'border-lightGray bg-lightGray/10';
    }
    if (match.homeTeamRounds > match.awayTeamRounds && match.homeTeam.id === team.id || match.awayTeamRounds > match.homeTeamRounds && match.awayTeam.id === team.id) {
      return 'border-success-green/30 bg-success-green/10';
    } else {
      return 'border-fail-red/30 bg-fail-red/10';
    }
  } else {
    return '';
  }
}

export const sanitizeString = (str) => str.replace(/\0/g, '').normalize('NFKD').replace(/[\u0300-\u036F]/g, "");

export const ensureUTF8 = (str) => {
  try {
    const buffer = Buffer.from(str, 'utf8');
    return buffer.toString('utf8');
  } catch (error) {
    console.error('Invalid UTF-8 sequence:', str);
    return '';
  }
};

export const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function getRandomNumber(min, max, biasFactor = 1) {
  const random = Math.random();
  const weightedRandom = Math.pow(random, 1 / biasFactor); // Adjust bias towards max by using 1 / biasFactor
  return Math.floor(weightedRandom * (max - min + 1)) + min;
}

export function base64ToBuffer(base64) {
  const binaryString = atob(base64.split(",")[1]); // Strip the base64 header if necessary
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer; // Convert to a raw binary buffer
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function goBack(url = null) {
  if (url) {
    window.location.href = url;
  } else {
    window.history.back();
  }
}

export function getTimeDifferenceWithUTC() {
  const now = new Date();

  const localOffsetMinutes = now.getTimezoneOffset();

  const utcOffsetMinutes = 0;

  const timeDifference = (utcOffsetMinutes - localOffsetMinutes) / 60;

  return timeDifference;
}

export function getMatchType(match) {
  return match.leagueId ? 'league' : match.ladderId ? 'ladder' : match.tournamentId ? 'tournament' : 'scrim';
}

export function formatDate(dateString) {
  // Append local time to avoid UTC conversion issues
  const date = new Date(dateString + 'T00:00');
  const options = { month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

export function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export async function notifyDiscord(message, channel) {
  let DISCORD_WEBHOOK_URL;
  if (channel === 'general') {
    DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1311779363804414013/4XAz2QorQWseuc63efVHFjdt66P1N2ui3AW_dF5GxcyILkaUGLI1ZlUFKJ0BWqBjl2Qw";
  } else if (channel === 'tournament') {
    DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1303035488718028851/BRwCWFP-SpjRZYKRsFLFSuadTS8HuKLmpsqKAsfncrTu28DzEZB8F5cAhV5Swzx29sv0";
  } else if (channel === 'ladder') {
    DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1311778849792725042/SXgeNKM8cs7w-YdWU7LEjbDcLgbaJcB0NmHunJJdZWlVmB7cxnzPnYqnCV2wVzYv07ho"; 
  }

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: message
      }),
    });
  } catch (error) {
    console.error('Error sending Discord notification:', error);
  }
}

export const getIconByGearName = (name) => {
  switch (name.toLowerCase()) {
    case 'mouse':
      return 'mouse';
    case 'mousepad':
      return 'mousepad';
    case 'keyboard':
      return 'keyboard';
    case 'headset':
      return 'headphones';
    case 'extra':
      return 'cup-soda';
    default:
      return 'mouse';
  }
}

export const groupMatchesByDay = (matches) => {
  if (!matches.length) return;

  return matches.reduce((acc, match) => {
    const date = new Date(match.date).toISOString().split('T')[0]; // Get YYYY-MM-DD format
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(match);
    return acc;
  }, {});
};

export function isValidEmail(email) {
	return /.+@.+/.test(email);
}

export function calculateTiers(totalTeams) {
  let tiers = [];

  // Determine number of tiers and ratios based on total teams
  if (totalTeams < 200) {
    // Use 2 tiers for small user bases
    tiers = [
      { name: 'S Tier', ratio: 1 }, // All
    ];
  } else if (totalTeams <= 500) {
    // Use 2 tiers for small user bases
    tiers = [
      { name: 'S Tier', ratio: 0.40 }, // Top 40%
      { name: 'A Tier', ratio: 0.60 }  // Remaining 60%
    ];
  } else if (totalTeams <= 1000) {
    // Use 3 tiers for medium user bases
    tiers = [
      { name: 'S Tier', ratio: 0.20 }, // Top 20%
      { name: 'A Tier', ratio: 0.30 }, // Next 30%
      { name: 'B Tier', ratio: 0.50 }  // Remaining 50%
    ];
  } else if (totalTeams <= 2000) {
    // Use 4 tiers for larger user bases
    tiers = [
      { name: 'S Tier', ratio: 0.15 }, // Top 15%
      { name: 'A Tier', ratio: 0.25 }, // Next 25%
      { name: 'B Tier', ratio: 0.30 }, // Next 30%
      { name: 'C Tier', ratio: 0.30 }  // Remaining 30%
    ];
  } else {
    tiers = [
      { name: 'S Tier', ratio: 0.03 }, // Top 15%
      { name: 'A Tier', ratio: 0.10 }, // Next 25%
      { name: 'B Tier', ratio: 0.20 }, // Next 30%
      { name: 'C Tier', ratio: 0.35 },
      { name: 'D Tier', ratio: 0.32 },// Remaining 30%
    ];
  }

  // Calculate number of teams for each tier
  let remainingTeams = totalTeams;
  const tierSizes = tiers.map((tier, index) => {
    const tierTeams = index === tiers.length - 1
      ? remainingTeams // Assign all remaining teams to the last tier
      : Math.round(totalTeams * tier.ratio);
    
    remainingTeams -= tierTeams;

    return tierTeams;
  });

  return tierSizes; // Array of team counts per tier
}

export const getIconByGearSkill = (skillName) => {
  switch (skillName) {
    case 'aim': return 'aim';
    case 'handling': return 'handling';
    case 'quickness': return 'quickness';
    case 'awareness': return 'awareness';
    case 'determination': return 'determination';
    case 'gamesense': return 'gamesense';
    case 'teamplay': return 'teamplay';
    case 'movement': return 'movement';
    case 'energy': return 'ray';
    default: return 'aim';
  }
};

export function getWeaponDisplayName (player, card) {
  let name = 'unknown'
  
  if (card) {
    name = player.favoriteWeapon;
  } else {
    name = player?.we?.n?.toLowerCase()?.replace('-', '')?.replace(' ', '');
  }

  return name ? name : 'unknown';
}

export function containsEmoji(str) {
  return /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\uFE0F|\u200D)+/.test(str);
}

export function removeEmojisFromString(str) {
  return str.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\uFE0F|\u200D)+/g,
    ''
  );
}

export function isMatchNearStart (matchDate) {
  const now = new Date();
  const matchTime = new Date(matchDate);

  const timeDifference = matchTime - now;
  return timeDifference > 0 && timeDifference <= 1800000;
};

export function canViewField({ player, fieldName, user, isAdmin, isInTransfer }) {
  const isOwner = user?.id === player?.team?.user.id;
  const isFriend = player.team?.user?.friends?.some(f => f.friendId === user?.id);

  if (isAdmin || isInTransfer || !player?.teamId) return true;

  const setting = player.privacySettings?.find(s => s.name === fieldName);

  if (!setting) return true;

  if (setting.visibility === 2) return true;
  if (setting.visibility === 1) return isFriend || isOwner;
  if (setting.visibility === 0) return isOwner;

  return false;
}

export const getRemainingDays = (contractEndDate) => {
  const today = new Date();
  const endDate = new Date(contractEndDate);
  const diffTime = Math.abs(endDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const findConflictingSponsor = (offer, sponsorOffers) => {
  return sponsorOffers.find(acceptedOffer => 
    acceptedOffer.status === 'accepted' && 
    acceptedOffer.category === offer.category
  );
};