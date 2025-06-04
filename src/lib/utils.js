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
    "USA": "US",
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

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

export function formatDate(dateString) {
  const options = { month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

export function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export const getMoodProperties = (mood) => {
  const valueMood = MOOD_PLAYER.find(v => v.value === mood);
  return valueMood 
    ? { icon: valueMood.icon, color: valueMood.color } 
    : { icon: 'meh', color: 'primary' };
};

export function computeTooltipPosition(targetRect, options = {}) {
  const verticalSpacing = options.verticalSpacing || 8;
  const popoverWidth = options.popoverWidth || 150;
  const popoverHeight = options.popoverHeight || 180;
  
  // Calculate horizontal center of target.
  let x = targetRect.left + targetRect.width / 2;
  // Initially position above the target.
  let y = targetRect.top - verticalSpacing - popoverHeight;

  // If there isn’t enough space above (i.e. y is too close to the top), position below.
  if (y < 8) {
    y = targetRect.bottom + verticalSpacing;
  }

  // Adjust horizontal position if tooltip would overflow viewport
  if (x - popoverWidth / 2 < 8) {
    x = popoverWidth / 2 + 8;
  } else if (x + popoverWidth / 2 > window.innerWidth - 8) {
    x = window.innerWidth - popoverWidth / 2 - 8;
  }

  return { x, y };
}

export function getAdminRole(level) {
  const roles = {
    0: "Common User",
    1: "Game Moderator",
    2: "Game Admin",
    3: "Game Admin Plus",
    4: "Super Admin"
  };
  return roles[(level)] || "Unknown Role";
}

export function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
}