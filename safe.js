Tesseract.setLogging(false);

document.addEventListener("DOMContentLoaded", () => {

  /* ================= DOM ================= */
  const input = document.getElementById("input");
  const fileInput = document.getElementById("fileInput");
  const previewBtn = document.getElementById("previewBtn");
  const scanBtn = document.getElementById("scanBtn");
  const statusEl = document.getElementById("status");
  const outputEl = document.getElementById("output");

  const smartLoader = document.getElementById("smartLoader");
  const loaderMain = document.getElementById("loaderMain");
  const loaderSub = document.getElementById("loaderSub");
  const smartProgress = document.getElementById("smartProgress");

  let selectedFile = null;

  /* ================= GOOGLE SAFE BROWSING API CONFIG ================= */
  const SAFE_BROWSING_API_KEY = "AIzaSyCq_d8M9fEjBhT0_6HCQ5Ryi0-adLJdmhs";

  /* ================= LEGITIMATE DOMAINS DATABASE (WHITELIST) ================= */
  const LEGITIMATE_DOMAINS = [
    // Search Engines
    "google.com", "google.co.in", "google.co.uk", "google.ca", "google.com.au",
    "google.de", "google.fr", "google.es", "google.it", "google.co.jp",
    "bing.com", "yahoo.com", "duckduckgo.com", "baidu.com", "yandex.com",

    // Tech Giants
    "microsoft.com", "outlook.com", "office.com", "live.com", "hotmail.com",
    "azure.com", "windows.com", "xbox.com", "skype.com", "linkedin.com",
    "apple.com", "icloud.com", "itunes.com", "appstore.com",
    "amazon.com", "amazon.in", "amazon.co.uk", "amazon.ca", "amazon.de",
    "aws.amazon.com", "amazonaws.com",
    "facebook.com", "fb.com", "meta.com", "messenger.com",
    "instagram.com", "threads.net",
    "twitter.com", "x.com",
    "youtube.com", "youtu.be",
    "netflix.com",
    "spotify.com",
    "tiktok.com",

    // Developer & Tech
    "github.com", "githubusercontent.com", "gitlab.com", "bitbucket.org",
    "stackoverflow.com", "stackexchange.com", "askubuntu.com",
    "npmjs.com", "pypi.org", "maven.org", "nuget.org",
    "docker.com", "hub.docker.com",
    "cloudflare.com", "cloudflare-dns.com",
    "digitalocean.com", "linode.com", "vultr.com",
    "heroku.com", "netlify.com", "netlify.app", "vercel.com", "vercel.app",
    "firebase.google.com", "firebaseapp.com",
    "mongodb.com", "mongodb.net",
    "postgresql.org", "mysql.com", "oracle.com",
    "jetbrains.com", "visualstudio.com", "code.visualstudio.com",
    "mozilla.org", "firefox.com",

    // Social & Communication
    "reddit.com", "old.reddit.com",
    "whatsapp.com", "whatsapp.net", "web.whatsapp.com",
    "telegram.org", "t.me", "web.telegram.org",
    "discord.com", "discord.gg", "discordapp.com",
    "slack.com",
    "zoom.us", "zoom.com",
    "teams.microsoft.com",
    "meet.google.com",
    "signal.org",
    "viber.com",
    "snapchat.com",
    "pinterest.com",
    "tumblr.com",
    "quora.com",
    "medium.com",

    // E-commerce
    "ebay.com", "ebay.co.uk", "ebay.de",
    "walmart.com",
    "target.com",
    "bestbuy.com",
    "costco.com",
    "homedepot.com",
    "lowes.com",
    "etsy.com",
    "shopify.com",
    "aliexpress.com",
    "alibaba.com",
    "flipkart.com",
    "myntra.com",
    "snapdeal.com",
    "ajio.com",

    // Finance & Banking
    "paypal.com", "paypal.me",
    "stripe.com",
    "square.com", "squareup.com",
    "venmo.com",
    "wise.com", "transferwise.com",
    "revolut.com",
    "chase.com", "jpmorganchase.com",
    "bankofamerica.com", "bofa.com",
    "wellsfargo.com",
    "citi.com", "citibank.com",
    "usbank.com",
    "capitalone.com",
    "americanexpress.com", "amex.com",
    "discover.com",
    "mastercard.com",
    "visa.com",
    "fidelity.com",
    "schwab.com",
    "vanguard.com",
    "robinhood.com",
    "coinbase.com",
    "binance.com",
    "kraken.com",

    // News & Media
    "cnn.com",
    "bbc.com", "bbc.co.uk",
    "nytimes.com",
    "washingtonpost.com",
    "theguardian.com",
    "reuters.com",
    "apnews.com",
    "forbes.com",
    "bloomberg.com",
    "wsj.com",
    "usatoday.com",
    "huffpost.com",
    "nbcnews.com",
    "cbsnews.com",
    "foxnews.com",
    "abcnews.go.com",
    "npr.org",
    "bbc.co.uk",
    "timesofindia.indiatimes.com",
    "ndtv.com",
    "hindustantimes.com",

    // Education
    "wikipedia.org", "en.wikipedia.org",
    "wikimedia.org",
    "coursera.org",
    "udemy.com",
    "edx.org",
    "khanacademy.org",
    "udacity.com",
    "skillshare.com",
    "linkedin.com/learning",
    "pluralsight.com",
    "codecademy.com",
    "freecodecamp.org",
    "w3schools.com",
    "geeksforgeeks.org",
    "tutorialspoint.com",
    "mit.edu",
    "stanford.edu",
    "harvard.edu",
    "yale.edu",
    "oxford.ac.uk",
    "cambridge.org",

    // Cloud Storage
    "dropbox.com",
    "box.com",
    "drive.google.com",
    "onedrive.live.com",
    "icloud.com",
    "mega.nz",
    "mediafire.com",
    "wetransfer.com",

    // Entertainment & Streaming
    "twitch.tv",
    "vimeo.com",
    "dailymotion.com",
    "soundcloud.com",
    "pandora.com",
    "hulu.com",
    "disneyplus.com",
    "hbomax.com",
    "primevideo.com",
    "peacocktv.com",
    "crunchyroll.com",
    "funimation.com",

    // Travel & Booking
    "airbnb.com",
    "booking.com",
    "expedia.com",
    "tripadvisor.com",
    "kayak.com",
    "hotels.com",
    "trivago.com",
    "priceline.com",
    "southwest.com",
    "united.com",
    "delta.com",
    "aa.com",
    "uber.com",
    "lyft.com",
    "grab.com",
    "ola.com",

    // Productivity & Tools
    "adobe.com",
    "canva.com",
    "figma.com",
    "notion.so",
    "trello.com",
    "asana.com",
    "monday.com",
    "airtable.com",
    "evernote.com",
    "todoist.com",
    "grammarly.com",
    "1password.com",
    "lastpass.com",
    "bitwarden.com",

    // Government Domains
    "gov", "gov.in", "gov.uk", "gov.au", "gov.ca", "gov.us",
    "irs.gov",
    "ssa.gov",
    "usa.gov",
    "state.gov",
    "whitehouse.gov",
    "nasa.gov",
    "cdc.gov",
    "nih.gov",
    "fbi.gov",
    "dhs.gov",

    // Shipping & Logistics
    "usps.com",
    "fedex.com",
    "ups.com",
    "dhl.com",
    "bluedart.com",
    "dtdc.com",

    // Job Sites
    "indeed.com",
    "glassdoor.com",
    "monster.com",
    "careerbuilder.com",
    "ziprecruiter.com",
    "naukri.com",

    // Real Estate
    "zillow.com",
    "realtor.com",
    "trulia.com",
    "redfin.com",
    "apartments.com",
    "99acres.com",
    "magicbricks.com",

    // Food & Delivery
    "doordash.com",
    "ubereats.com",
    "grubhub.com",
    "postmates.com",
    "instacart.com",
    "zomato.com",
    "swiggy.com",

    // Weather
    "weather.com",
    "accuweather.com",
    "weather.gov",
    "wunderground.com",

    // Other Trusted
    "craigslist.org",
    "yelp.com",
    "yellowpages.com",
    "bbb.org",
    "archive.org",
    "scribd.com",
    "slideshare.net",
    "issuu.com"
  ];

  /* ================= LEGITIMATE EMAIL DOMAINS ================= */
  const LEGITIMATE_EMAIL_DOMAINS = [
    "gmail.com", "googlemail.com",
    "outlook.com", "hotmail.com", "live.com", "msn.com",
    "yahoo.com", "yahoo.co.uk", "yahoo.co.in", "ymail.com",
    "icloud.com", "me.com", "mac.com",
    "protonmail.com", "proton.me", "pm.me",
    "aol.com",
    "zoho.com", "zohomail.com",
    "mail.com",
    "gmx.com", "gmx.net",
    "yandex.com", "yandex.ru",
    "tutanota.com",
    "fastmail.com",
    "hey.com",
    "mailinator.com",
    "rediffmail.com"
  ];

  /* ================= URL SHORTENERS DATABASE ================= */
  const URL_SHORTENERS = [
    "bit.ly", "bitly.com", "tinyurl.com", "t.co", "goo.gl", "ow.ly",
    "is.gd", "buff.ly", "adf.ly", "shorte.st", "bc.vc", "rb.gy",
    "cutt.ly", "shorturl.at", "tiny.cc", "v.gd", "clck.ru", "qps.ru",
    "short.io", "rebrand.ly", "bl.ink", "soo.gd", "s.id", "lnkd.in",
    "fb.me", "redd.it", "amzn.to", "amzn.com", "j.mp",
    "git.io", "cli.gs", "short.link", "shorten.link", "shrtco.de",
    "surl.li", "shorturl.asia", "u.to", "kutt.it", "link.zip",
    "url.zip", "zpr.io", "zee.gl", "tgr.ph", "mtr.cool", "rotf.lol",
    "wp.me", "su.pr", "tr.im", "po.st", "snip.ly", "ht.ly", "hubs.ly",
    "mcaf.ee", "trib.al", "dlvr.it", "flic.kr", "db.tt", "eepurl.com",
    "tny.im", "shorturl.com", "vzturl.com", "qr.ae", "lc.chat"
  ];

  /* ================= LOADER ================= */
  function showLoader(title, subtitle, progress) {
    smartLoader.style.display = "flex";
    loaderMain.textContent = title;
    loaderSub.textContent = subtitle;
    smartProgress.style.width = (progress || 40) + "%";
  }

  function updateLoader(progress, subtitle) {
    smartProgress.style.width = progress + "%";
    if (subtitle) loaderSub.textContent = subtitle;
  }

  function hideLoader() {
    smartProgress.style.width = "100%";
    setTimeout(() => {
      smartLoader.style.display = "none";
    }, 300);
  }

  /* ================= INPUT VALIDATION ================= */
  function validateInput(text) {
    const clean = text.trim();
    if (!clean) return { ok: false, reason: "Empty input" };
    if (clean.length < 3) return { ok: false, reason: "Too short to analyze" };
    return { ok: true };
  }

  /* ================= OCR ================= */
  async function ocrImage(file) {
    showLoader("OCR Engine", "Extracting text from image...", 40);
    const res = await Tesseract.recognize(file, "eng");
    updateLoader(80, "OCR complete");
    return res.data.text || "";
  }

  /* ================= HELPER: EXTRACT ROOT DOMAIN ================= */
  function extractRootDomain(hostname) {
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      const twoPartTLDs = [
        'co.uk', 'com.au', 'co.in', 'co.nz', 'com.br', 'co.za',
        'co.jp', 'com.mx', 'org.uk', 'net.au', 'org.au', 'ac.uk',
        'gov.uk', 'gov.in', 'gov.au', 'edu.au', 'ac.in'
      ];
      const lastTwo = parts.slice(-2).join('.');
      if (twoPartTLDs.includes(lastTwo) && parts.length >= 3) {
        return parts.slice(-3).join('.');
      }
      return parts.slice(-2).join('.');
    }
    return hostname;
  }

  /* ================= HELPER: EXTRACT DOMAIN FROM URL ================= */
  function extractDomain(url) {
    try {
      let cleanUrl = url.trim();
      if (!/^https?:\/\//i.test(cleanUrl)) {
        cleanUrl = "https://" + cleanUrl;
      }
      const urlObj = new URL(cleanUrl);
      return urlObj.hostname.toLowerCase().replace(/^www\./, '');
    } catch (e) {
      return url.toLowerCase().replace(/^www\./, '');
    }
  }

  /* ================= CHECK IF DOMAIN IS IN WHITELIST ================= */
  function isWhitelistedDomain(hostname) {
    hostname = hostname.toLowerCase().replace(/^www\./, '');

    // Direct match
    if (LEGITIMATE_DOMAINS.includes(hostname)) return true;

    // Root domain match
    const rootDomain = extractRootDomain(hostname);
    if (LEGITIMATE_DOMAINS.includes(rootDomain)) return true;

    // Subdomain of whitelisted domain
    for (const legit of LEGITIMATE_DOMAINS) {
      if (hostname === legit || hostname.endsWith('.' + legit)) {
        return true;
      }
    }

    // Government & Education domains
    if (hostname.endsWith('.gov') || hostname.endsWith('.gov.in') ||
        hostname.endsWith('.gov.uk') || hostname.endsWith('.gov.au') ||
        hostname.endsWith('.edu') || hostname.endsWith('.edu.in') ||
        hostname.endsWith('.ac.uk') || hostname.endsWith('.ac.in')) {
      return true;
    }

    return false;
  }

  /* ================= CHECK IF URL SHORTENER ================= */
  function isUrlShortener(hostname) {
    hostname = hostname.toLowerCase().replace(/^www\./, '');

    if (URL_SHORTENERS.includes(hostname)) return true;

    const rootDomain = extractRootDomain(hostname);
    if (URL_SHORTENERS.includes(rootDomain)) return true;

    for (const shortener of URL_SHORTENERS) {
      if (hostname === shortener || hostname.endsWith('.' + shortener)) {
        return true;
      }
    }

    return false;
  }

  /* ================= CHECK IF LEGITIMATE EMAIL DOMAIN ================= */
  function isWhitelistedEmailDomain(domain) {
    domain = domain.toLowerCase();

    if (LEGITIMATE_EMAIL_DOMAINS.includes(domain)) return true;

    // Also check general whitelist
    if (isWhitelistedDomain(domain)) return true;

    return false;
  }

  /* ================= GOOGLE SAFE BROWSING API ================= */
  async function checkSafeBrowsingAPI(url) {
    try {
      let cleanUrl = url.trim();
      if (!/^https?:\/\//i.test(cleanUrl)) {
        cleanUrl = "https://" + cleanUrl;
      }

      const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${SAFE_BROWSING_API_KEY}`;

      const requestBody = {
        client: {
          clientId: "safenet-scanner",
          clientVersion: "2.0.0"
        },
        threatInfo: {
          threatTypes: [
            "MALWARE",
            "SOCIAL_ENGINEERING",
            "UNWANTED_SOFTWARE",
            "POTENTIALLY_HARMFUL_APPLICATION"
          ],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url: cleanUrl }]
        }
      };

      console.log("🔍 Safe Browsing API Check:", cleanUrl);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log("📡 API Response Status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        return {
          checked: false,
          isThreat: false,
          threatTypes: [],
          error: true,
          message: `API error: ${response.status}`
        };
      }

      const data = await response.json();
      console.log("📦 API Response:", data);

      if (data.matches && data.matches.length > 0) {
        const threatTypes = data.matches.map(m => m.threatType);
        return {
          checked: true,
          isThreat: true,
          threatTypes: [...new Set(threatTypes)],
          error: false,
          message: "URL found in Google threat database"
        };
      }

      return {
        checked: true,
        isThreat: false,
        threatTypes: [],
        error: false,
        message: "URL not in threat database"
      };

    } catch (error) {
      console.error("API Fetch Error:", error);
      return {
        checked: false,
        isThreat: false,
        threatTypes: [],
        error: true,
        message: error.name === 'AbortError' ? 'Request timeout' : error.message
      };
    }
  }

  /* ================= URL ANALYZER (WHITELIST + API) ================= */
  async function analyzeURL(url) {
    const result = {
      isSafe: false,
      score: 0,
      findings: [],
      domain: "",
      protocol: "NONE",
      isWhitelisted: false,
      isShortener: false,
      safeBrowsingResult: null
    };

    try {
      const originalUrl = url.trim();
      let cleanUrl = originalUrl.toLowerCase();

      // ===== STEP 1: PROTOCOL DETECTION =====
      if (/^https:\/\//i.test(originalUrl)) {
        result.protocol = "HTTPS";
      } else if (/^http:\/\//i.test(originalUrl)) {
        result.protocol = "HTTP";
      } else {
        result.protocol = "NONE";
        cleanUrl = "https://" + cleanUrl;
      }

      const hostname = extractDomain(originalUrl);
      result.domain = hostname;

      result.findings.push(`🔍 Analyzing URL: ${originalUrl.substring(0, 60)}${originalUrl.length > 60 ? '...' : ''}`);
      result.findings.push(`📎 Domain: ${hostname}`);

      // ===== STEP 2: CHECK IF URL SHORTENER =====
      if (isUrlShortener(hostname)) {
        result.isShortener = true;
        result.score = 30;
        result.isSafe = false;

        result.findings.push("═══════════════════════════════════════════");
        result.findings.push("⚠️ URL SHORTENER DETECTED");
        result.findings.push("═══════════════════════════════════════════");
        result.findings.push("⚠️ This is a shortened URL: " + hostname);
        result.findings.push("⚠️ Final destination is HIDDEN");
        result.findings.push("⚠️ Cannot verify where this link actually leads");
        result.findings.push("💡 Use URL expander tools before clicking");
        result.findings.push("💡 Ask sender for the full/original URL");
        result.findings.unshift("🟡 MEDIUM RISK - URL Shortener (Hidden Destination)");

        return result;
      }

      // ===== STEP 3: CHECK WHITELIST =====
      const isWhitelisted = isWhitelistedDomain(hostname);
      result.isWhitelisted = isWhitelisted;

      if (isWhitelisted) {
        // ✅ DOMAIN IS IN WHITELIST - SAFE!
        result.score = 0;
        result.isSafe = true;

        result.findings.push("═══════════════════════════════════════════");
        result.findings.push("✅ DOMAIN FOUND IN WHITELIST");
        result.findings.push("═══════════════════════════════════════════");
        result.findings.push("✅ " + hostname + " is a VERIFIED legitimate domain");
        result.findings.push("✅ This website is trusted and safe to visit");

        if (result.protocol === "HTTPS") {
          result.findings.push("✅ Uses secure HTTPS connection");
          result.findings.unshift("✅ SAFE - Whitelisted Domain + HTTPS");
        } else if (result.protocol === "HTTP") {
          result.score = 10;
          result.findings.push("⚠️ Uses insecure HTTP connection");
          result.findings.push("💡 Recommend using: https://" + hostname);
          result.findings.unshift("🟢 SAFE (with warning) - Use HTTPS instead");
        } else {
          result.findings.push("⚠️ No protocol specified");
          result.findings.unshift("✅ SAFE - Whitelisted Domain");
        }

        return result;
      }

      // ===== STEP 4: NOT IN WHITELIST - CHECK SAFE BROWSING API =====
      result.findings.push("═══════════════════════════════════════════");
      result.findings.push("⚠️ Domain NOT in whitelist");
      result.findings.push("🔍 Checking Google Safe Browsing API...");

      const safeBrowsingResult = await checkSafeBrowsingAPI(originalUrl);
      result.safeBrowsingResult = safeBrowsingResult;

      if (safeBrowsingResult.error) {
        // API Error - Unknown status
        result.score = 35;
        result.isSafe = false;

        result.findings.push("═══════════════════════════════════════════");
        result.findings.push("⚠️ COULD NOT VERIFY WITH API");
        result.findings.push("═══════════════════════════════════════════");
        result.findings.push("⚠️ Error: " + safeBrowsingResult.message);
        result.findings.push("⚠️ Cannot confirm if this URL is safe");
        result.findings.push("⚠️ Proceed with caution");

        if (result.protocol === "HTTP") {
          result.score += 15;
          result.findings.push("🔴 Uses insecure HTTP connection");
        }

        result.findings.unshift("🟡 UNKNOWN - Could not verify");

      } else if (safeBrowsingResult.isThreat) {
        // 🔴 FOUND IN THREAT DATABASE - MALICIOUS!
        result.score = 95;
        result.isSafe = false;

        result.findings.push("═══════════════════════════════════════════");
        result.findings.push("🚨🚨🚨 THREAT DETECTED! 🚨🚨🚨");
        result.findings.push("═══════════════════════════════════════════");
        result.findings.push("🚨 URL FOUND IN GOOGLE THREAT DATABASE!");
        result.findings.push(`🚨 Threat Types: ${safeBrowsingResult.threatTypes.join(", ")}`);

        safeBrowsingResult.threatTypes.forEach(type => {
          switch (type) {
            case "MALWARE":
              result.findings.push("   🦠 MALWARE: This site distributes malicious software");
              break;
            case "SOCIAL_ENGINEERING":
              result.findings.push("   🎭 PHISHING: This site tries to steal your information");
              break;
            case "UNWANTED_SOFTWARE":
              result.findings.push("   ⚠️ UNWANTED: This site distributes unwanted software");
              break;
            case "POTENTIALLY_HARMFUL_APPLICATION":
              result.findings.push("   📱 HARMFUL: This site may harm your device");
              break;
            default:
              result.findings.push(`   ⚠️ ${type}: Identified as threat`);
          }
        });

        result.findings.push("═══════════════════════════════════════════");
        result.findings.push("❌ DO NOT VISIT THIS WEBSITE!");
        result.findings.push("❌ DO NOT ENTER ANY PERSONAL INFORMATION!");
        result.findings.push("❌ Report this to your IT/security team!");
        result.findings.unshift("🔴 MALICIOUS - FOUND IN THREAT DATABASE!");

      } else {
        // NOT in whitelist AND NOT in threat database
        result.score = 25;
        result.isSafe = false;

        result.findings.push("═══════════════════════════════════════════");
        result.findings.push("🔍 SCAN RESULT: UNVERIFIED");
        result.findings.push("═══════════════════════════════════════════");
        result.findings.push("✅ NOT found in Google threat database");
        result.findings.push("⚠️ But also NOT in our verified whitelist");
        result.findings.push("⚠️ This doesn't guarantee the site is safe");
        result.findings.push("⚠️ Exercise caution with this website");

        if (result.protocol === "HTTPS") {
          result.findings.push("✅ Uses HTTPS connection");
        } else if (result.protocol === "HTTP") {
          result.score += 10;
          result.findings.push("🔴 Uses insecure HTTP connection");
        }

        // Additional heuristic checks
        const suspiciousTLDs = [".xyz", ".tk", ".ml", ".ga", ".cf", ".gq", ".top", ".buzz", ".work", ".click"];
        const tld = "." + hostname.split(".").pop();
        if (suspiciousTLDs.includes(tld)) {
          result.score += 10;
          result.findings.push("⚠️ Suspicious domain extension: " + tld);
        }

        // Check for IP address
        if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
          result.score += 15;
          result.findings.push("🚨 IP address used instead of domain name");
        }

        // Check for random-looking domain
        const mainDomain = hostname.split(".")[0];
        if (mainDomain.length > 15 && /^[a-z0-9]+$/i.test(mainDomain)) {
          result.score += 5;
          result.findings.push("⚠️ Domain name looks randomly generated");
        }

        // Multiple hyphens
        if ((mainDomain.match(/-/g) || []).length >= 3) {
          result.score += 5;
          result.findings.push("⚠️ Multiple hyphens in domain name");
        }

        result.score = Math.min(100, result.score);
        result.findings.unshift("🟡 MEDIUM RISK - Unverified Website");
      }

    } catch (e) {
      result.score = 40;
      result.isSafe = false;
      result.findings.push("⚠️ Could not parse URL: " + e.message);
      result.findings.unshift("🟠 ERROR - Invalid URL format");
    }

    return result;
  }

  /* ================= EMAIL ANALYZER ================= */
  async function analyzeEmail(email) {
    const result = {
      isSafe: false,
      score: 0,
      findings: [],
      domain: "",
      isWhitelisted: false,
      safeBrowsingResult: null
    };

    email = email.trim().toLowerCase();

    const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const match = email.match(emailRegex);

    if (!match) {
      result.score = 50;
      result.findings.push("🚨 Invalid email format");
      result.findings.unshift("🟠 INVALID - Bad email format");
      return result;
    }

    const localPart = match[1];
    const domain = match[2].toLowerCase();
    result.domain = domain;

    result.findings.push(`📧 Email: ${email}`);
    result.findings.push(`🌐 Domain: ${domain}`);

    // Check if email domain is whitelisted
    const isWhitelisted = isWhitelistedEmailDomain(domain);
    result.isWhitelisted = isWhitelisted;

    if (isWhitelisted) {
      result.score = 0;
      result.isSafe = true;
      result.findings.push("═══════════════════════════════════════════");
      result.findings.push("✅ EMAIL DOMAIN IS WHITELISTED");
      result.findings.push("═══════════════════════════════════════════");
      result.findings.push("✅ " + domain + " is a verified email provider");
      result.findings.push("✅ This email address appears legitimate");
      result.findings.unshift("✅ SAFE - Verified Email Provider");
      return result;
    }

    // Not whitelisted - check Safe Browsing API
    result.findings.push("⚠️ Domain not in verified email providers list");
    result.findings.push("🔍 Checking Google Safe Browsing API...");

    const safeBrowsingResult = await checkSafeBrowsingAPI("https://" + domain);
    result.safeBrowsingResult = safeBrowsingResult;

    if (safeBrowsingResult.error) {
      result.score = 30;
      result.isSafe = false;
      result.findings.push("⚠️ Could not verify domain: " + safeBrowsingResult.message);
      result.findings.unshift("🟡 UNKNOWN - Could not verify");

    } else if (safeBrowsingResult.isThreat) {
      result.score = 90;
      result.isSafe = false;
      result.findings.push("═══════════════════════════════════════════");
      result.findings.push("🚨 EMAIL DOMAIN IS MALICIOUS!");
      result.findings.push("═══════════════════════════════════════════");
      result.findings.push(`🚨 Threat Types: ${safeBrowsingResult.threatTypes.join(", ")}`);
      result.findings.push("❌ DO NOT reply to this email!");
      result.findings.push("❌ DO NOT click any links in this email!");
      result.findings.unshift("🔴 MALICIOUS - Dangerous Email Domain!");

    } else {
      result.score = 25;
      result.isSafe = false;
      result.findings.push("✅ Domain not in threat database");
      result.findings.push("⚠️ But not a verified email provider");
      result.findings.push("⚠️ Be cautious with emails from this sender");
      result.findings.unshift("🟡 MEDIUM RISK - Unverified Sender");
    }

    return result;
  }

  /* ================= MESSAGE ANALYZER ================= */
  async function analyzeMessage(text) {
    let score = 0;
    const findings = [];

    // Phishing Patterns
    const phishingPatterns = [
      { regex: /verify your (account|identity|password|email|information)/i, msg: "🚨 Account verification phishing", pts: 25 },
      { regex: /confirm your (payment|bank|credit card|ssn|social security)/i, msg: "🚨 Financial data phishing", pts: 30 },
      { regex: /your account (has been|will be|is) (suspended|locked|disabled|compromised|limited)/i, msg: "🚨 Account suspension scam", pts: 30 },
      { regex: /unusual (activity|sign-?in|login|transaction)/i, msg: "🚨 Fake security alert", pts: 25 },
      { regex: /update your (payment|billing|bank|card)/i, msg: "🚨 Payment update scam", pts: 25 },
      { regex: /(won|winner|winning|congratulations).*?(prize|lottery|gift|money|\$\d)/i, msg: "🚨 Prize/lottery scam", pts: 35 },
      { regex: /claim your (reward|prize|money|gift|winnings)/i, msg: "🚨 Fake reward claim", pts: 30 },
      { regex: /inheritance|beneficiary|next of kin|deceased.*million/i, msg: "🚨 419/Inheritance scam", pts: 40 },
      { regex: /nigerian prince|foreign prince|royal family/i, msg: "🚨 Classic 419 scam", pts: 50 }
    ];

    phishingPatterns.forEach(p => {
      if (p.regex.test(text)) {
        score += p.pts;
        findings.push(p.msg);
      }
    });

    // Urgency Patterns
    const urgencyPatterns = [
      { regex: /\b(urgent|urgently|immediately|right now|right away)\b/i, msg: "⚠️ Urgency pressure tactic", pts: 15 },
      { regex: /\b(act now|action required|immediate action)\b/i, msg: "⚠️ Forced action pressure", pts: 15 },
      { regex: /\b(last chance|final warning|final notice)\b/i, msg: "⚠️ Final warning pressure", pts: 18 },
      { regex: /within \d+ (hours?|minutes?|days?)/i, msg: "⚠️ Countdown pressure", pts: 12 },
      { regex: /\b(expire|expiring|expires)\b.*\b(soon|today|hours?)\b/i, msg: "⚠️ Expiration pressure", pts: 15 }
    ];

    urgencyPatterns.forEach(p => {
      if (p.regex.test(text)) {
        score += p.pts;
        findings.push(p.msg);
      }
    });

    // Credential Requests
    const credentialPatterns = [
      { regex: /\b(enter|provide|confirm|verify|send|share) (your |the )?(password|passcode|pin)\b/i, msg: "🔐 Password harvesting attempt", pts: 30 },
      { regex: /\b(username|user name) and password\b/i, msg: "🔐 Login credential request", pts: 25 },
      { regex: /\bsend (me |us )?(your |the )?(login|credentials|password)\b/i, msg: "🔐 Credential theft attempt", pts: 35 },
      { regex: /\breset (your )?password\b.*\bclick\b/i, msg: "🔐 Password reset phishing", pts: 25 }
    ];

    credentialPatterns.forEach(p => {
      if (p.regex.test(text)) {
        score += p.pts;
        findings.push(p.msg);
      }
    });

    // Financial Requests
    const financialPatterns = [
      { regex: /\b(ssn|social security( number)?)\b/i, msg: "💳 SSN request - MAJOR RED FLAG", pts: 40 },
      { regex: /\b(credit card|debit card|card number)\b.*\b(send|provide|enter|verify)\b/i, msg: "💳 Card number request", pts: 35 },
      { regex: /\bcvv\b|\bcvc\b|\bsecurity code\b/i, msg: "💳 CVV/Security code request", pts: 40 },
      { regex: /\b(bank account|routing number|account number)\b/i, msg: "💳 Bank account details request", pts: 30 }
    ];

    financialPatterns.forEach(p => {
      if (p.regex.test(text)) {
        score += p.pts;
        findings.push(p.msg);
      }
    });

    // Money Requests
    const moneyPatterns = [
      { regex: /\b(send|transfer|wire|pay) (me |us )?\$\d+/i, msg: "💰 Direct money request", pts: 30 },
      { regex: /\bgift cards?\b.*\b(buy|purchase|send|get)\b/i, msg: "💰 Gift card scam", pts: 35 },
      { regex: /\b(bitcoin|btc|crypto|ethereum)\b.*\b(send|transfer|pay|deposit)\b/i, msg: "💰 Crypto payment scam", pts: 30 },
      { regex: /\bwestern union\b|\bmoneygram\b|\bwire transfer\b/i, msg: "💰 Wire transfer request", pts: 35 },
      { regex: /\b(processing|handling|shipping) fee\b/i, msg: "💰 Advance fee fraud", pts: 30 }
    ];

    moneyPatterns.forEach(p => {
      if (p.regex.test(text)) {
        score += p.pts;
        findings.push(p.msg);
      }
    });

    // Impersonation
    const impersonationPatterns = [
      { regex: /\b(apple|microsoft|google|amazon|facebook|netflix|paypal) (support|team|security|helpdesk|service)/i, msg: "👤 Brand impersonation attempt", pts: 25 },
      { regex: /\b(irs|fbi|cia|police|government|court|federal) (notice|department|agent|official)/i, msg: "👤 Government impersonation", pts: 35 },
      { regex: /\bthis is (your )?(bank|amazon|microsoft|apple|google)\b/i, msg: "👤 Direct brand impersonation", pts: 30 },
      { regex: /\btechnical support\b.*\b(call|contact)\b/i, msg: "👤 Tech support scam", pts: 30 }
    ];

    impersonationPatterns.forEach(p => {
      if (p.regex.test(text)) {
        score += p.pts;
        findings.push(p.msg);
      }
    });

    // Malware Indicators
    const malwarePatterns = [
      { regex: /\benable (macros?|content|editing)\b/i, msg: "🦠 Macro enablement request", pts: 40 },
      { regex: /\bdisable (antivirus|defender|protection|firewall|security)\b/i, msg: "🦠 Security disable request", pts: 45 },
      { regex: /\.(exe|bat|cmd|scr|vbs|js|jar|msi|ps1)\b/i, msg: "🦠 Executable file reference", pts: 25 },
      { regex: /\bremote access\b|\bteamviewer\b|\banydesk\b/i, msg: "🦠 Remote access request", pts: 30 }
    ];

    malwarePatterns.forEach(p => {
      if (p.regex.test(text)) {
        score += p.pts;
        findings.push(p.msg);
      }
    });

    // Social Engineering
    const socialPatterns = [
      { regex: /\bdear (valued )?(customer|user|member|client|sir|madam)\b/i, msg: "📧 Generic greeting (common in scams)", pts: 10 },
      { regex: /\bclick (here|below|the link|this link|the button)\b/i, msg: "📧 Click bait attempt", pts: 12 },
      { regex: /\bkindly\b/i, msg: "📧 'Kindly' - common scam language", pts: 8 },
      { regex: /\bdear friend\b/i, msg: "📧 'Dear friend' scam opener", pts: 15 }
    ];

    socialPatterns.forEach(p => {
      if (p.regex.test(text)) {
        score += p.pts;
        findings.push(p.msg);
      }
    });

    // Check URLs in message
    const urlRegex = /https?:\/\/[^\s<>"']+|www\.[^\s<>"']+/gi;
    const urls = text.match(urlRegex) || [];

    if (urls.length > 0) {
      findings.push(`📎 Found ${urls.length} URL(s) - Analyzing...`);

      for (const url of urls.slice(0, 5)) {
        const urlResult = await analyzeURL(url);

        if (urlResult.safeBrowsingResult?.isThreat) {
          score += 50;
          findings.push(`🚨 MALICIOUS URL: ${url.substring(0, 50)}...`);
          findings.push(`   └─ Threats: ${urlResult.safeBrowsingResult.threatTypes.join(", ")}`);
        } else if (urlResult.isShortener) {
          score += 15;
          findings.push(`⚠️ SHORTENED URL: ${url.substring(0, 50)}...`);
          findings.push(`   └─ Destination hidden - be cautious`);
        } else if (urlResult.isWhitelisted) {
          findings.push(`✅ SAFE URL: ${url.substring(0, 50)}${url.length > 50 ? '...' : ''}`);
          findings.push(`   └─ Whitelisted domain`);
        } else if (urlResult.safeBrowsingResult?.error) {
          score += 10;
          findings.push(`⚠️ UNVERIFIED URL: ${url.substring(0, 50)}...`);
        } else {
          score += 10;
          findings.push(`🟡 UNKNOWN URL: ${url.substring(0, 50)}...`);
          findings.push(`   └─ Not whitelisted, not in threat database`);
        }
      }
    }

    // Check emails in message
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = text.match(emailRegex) || [];

    if (emails.length > 0) {
      for (const email of emails.slice(0, 3)) {
        const emailResult = await analyzeEmail(email);
        if (emailResult.safeBrowsingResult?.isThreat) {
          score += 30;
          findings.push(`🚨 Malicious email domain: ${email}`);
        } else if (emailResult.isWhitelisted) {
          findings.push(`✅ Verified email: ${email}`);
        } else if (!emailResult.safeBrowsingResult?.error) {
          findings.push(`🟡 Unverified email: ${email}`);
        }
      }
    }

    // Positive indicators
    if (score < 10) {
      if (urls.length === 0) findings.push("✅ No URLs in message");
      if (emails.length === 0) findings.push("✅ No email addresses in message");
      findings.push("✅ Message appears to be safe");
    }

    score = Math.max(0, Math.min(100, score));

    if (findings.length === 0) {
      findings.push("✅ No threats detected - content appears safe");
    }

    return { score, findings };
  }

  /* ================= DETECT INPUT TYPE ================= */
  function detectInputType(text) {
    text = text.trim();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(text)) return "email";

    if (/^https?:\/\//i.test(text)) return "url";
    if (/^www\./i.test(text)) return "url";

    const commonTLDs = /^[a-zA-Z0-9][a-zA-Z0-9.-]*\.(com|org|net|edu|gov|io|co|app|dev|xyz|info|biz|me|us|uk|ca|au|in|de|fr)(\/.*)?$/i;
    if (commonTLDs.test(text) && !text.includes(' ')) return "url";

    return "message";
  }

  /* ================= MAIN THREAT ENGINE ================= */
  async function runThreatAnalysis(text) {
    const inputType = detectInputType(text);
    let result;

    switch (inputType) {
      case "url":
        const urlResult = await analyzeURL(text);
        result = {
          type: "URL Analysis",
          score: urlResult.score,
          isSafe: urlResult.isSafe,
          findings: urlResult.findings,
          domain: urlResult.domain,
          protocol: urlResult.protocol,
          isWhitelisted: urlResult.isWhitelisted,
          isShortener: urlResult.isShortener,
          safeBrowsingResult: urlResult.safeBrowsingResult
        };
        break;

      case "email":
        const emailResult = await analyzeEmail(text);
        result = {
          type: "Email Analysis",
          score: emailResult.score,
          isSafe: emailResult.isSafe,
          findings: emailResult.findings,
          domain: emailResult.domain,
          isWhitelisted: emailResult.isWhitelisted,
          safeBrowsingResult: emailResult.safeBrowsingResult
        };
        break;

      default:
        const msgResult = await analyzeMessage(text);
        result = {
          type: "Message Analysis",
          score: msgResult.score,
          isSafe: msgResult.score < 25,
          findings: msgResult.findings
        };
        break;
    }

    return result;
  }

  /* ================= GENERATE REPORT ================= */
  function generateReport(text, result) {
    const timestamp = new Date().toLocaleString();
    const lines = [
      "╔════════════════════════════════════════════════════════════╗",
      "║               SAFENET THREAT ANALYSIS REPORT               ║",
      "║         (Whitelist + Google Safe Browsing API)             ║",
      "╠════════════════════════════════════════════════════════════╣",
      `║ Scan Time: ${timestamp}`.padEnd(61) + "║",
      `║ Analysis Type: ${result.type}`.padEnd(61) + "║",
      `║ Risk Score: ${result.score}/100`.padEnd(61) + "║",
    ];

    // Whitelist status
    if (result.isWhitelisted !== undefined) {
      const wlStatus = result.isWhitelisted ? "✅ YES (Trusted)" : "❌ NO";
      lines.push(`║ In Whitelist: ${wlStatus}`.padEnd(61) + "║");
    }

    // URL Shortener status
    if (result.isShortener) {
      lines.push(`║ URL Type: ⚠️ SHORTENER (Hidden Destination)`.padEnd(61) + "║");
    }

    // Safe Browsing status
    if (result.safeBrowsingResult) {
      if (result.safeBrowsingResult.checked) {
        if (result.safeBrowsingResult.isThreat) {
          lines.push(`║ Threat Database: 🚨 FOUND (MALICIOUS!)`.padEnd(61) + "║");
        } else {
          lines.push(`║ Threat Database: ✅ NOT FOUND`.padEnd(61) + "║");
        }
      } else if (result.safeBrowsingResult.error) {
        lines.push(`║ Threat Database: ⚠️ Could not check`.padEnd(61) + "║");
      }
    }

    // Protocol status
    if (result.protocol) {
      const protocolStatus = result.protocol === "HTTPS" ? "✅ HTTPS (Secure)" :
                             result.protocol === "HTTP" ? "⚠️ HTTP (Insecure)" : "⚠️ None";
      lines.push(`║ Protocol: ${protocolStatus}`.padEnd(61) + "║");
    }

    lines.push("╠════════════════════════════════════════════════════════════╣");
    
    // VERDICT
    lines.push("║ VERDICT:".padEnd(61) + "║");
    
    if (result.safeBrowsingResult?.isThreat) {
      lines.push("║   🔴 MALICIOUS - FOUND IN THREAT DATABASE!".padEnd(61) + "║");
      lines.push("║   ❌ DO NOT VISIT THIS WEBSITE!".padEnd(61) + "║");
    } else if (result.isShortener) {
      lines.push("║   🟡 MEDIUM RISK - URL SHORTENER DETECTED".padEnd(61) + "║");
      lines.push("║   ⚠️ Cannot verify final destination".padEnd(61) + "║");
    } else if (result.isWhitelisted) {
      lines.push("║   ✅ SAFE - WHITELISTED DOMAIN".padEnd(61) + "║");
      lines.push("║   ✅ This is a trusted website".padEnd(61) + "║");
    } else if (result.score >= 60) {
      lines.push("║   🔴 DANGEROUS - HIGH RISK CONTENT".padEnd(61) + "║");
    } else if (result.score >= 30) {
      lines.push("║   🟡 MEDIUM RISK - UNVERIFIED".padEnd(61) + "║");
      lines.push("║   ⚠️ Not in whitelist or threat database".padEnd(61) + "║");
    } else if (result.score >= 10) {
      lines.push("║   🟢 LOW RISK - LIKELY SAFE".padEnd(61) + "║");
    } else {
      lines.push("║   ✅ SAFE - NO THREATS DETECTED".padEnd(61) + "║");
    }

    if (result.domain) {
      lines.push(`║   Domain: ${result.domain}`.padEnd(61) + "║");
    }

    lines.push("╠════════════════════════════════════════════════════════════╣");
    lines.push("║ DETAILED FINDINGS:".padEnd(61) + "║");

    result.findings.forEach(finding => {
      const truncated = finding.length > 55 ? finding.substring(0, 52) + "..." : finding;
      lines.push(`║  ${truncated}`.padEnd(61) + "║");
    });

    lines.push("╚════════════════════════════════════════════════════════════╝");

    return lines.join("\n");
  }

  /* ================= MAIN SCAN ================= */
  async function runScan() {
    let text = input.value.trim();
    const validation = validateInput(text);

    if (!validation.ok && !selectedFile) {
      statusEl.className = "warn";
      statusEl.textContent = "⚠️ " + validation.reason;
      outputEl.textContent = "";
      return;
    }

    showLoader("SafeNet Scan", "Initializing...", 20);

    try {
      if (selectedFile && selectedFile.type.startsWith("image/")) {
        const ocrText = await ocrImage(selectedFile);
        text += "\n" + ocrText;
        updateLoader(50, "Text extracted");
      }

      updateLoader(60, "Checking whitelist & Safe Browsing API...");
      const result = await runThreatAnalysis(text);

      updateLoader(95, "Generating report...");
      hideLoader();

      // Determine status level and message
      let level, msg;

      if (result.safeBrowsingResult?.isThreat) {
        level = "danger";
        msg = "🔴 MALICIOUS - IN THREAT DATABASE";
      } else if (result.isShortener) {
        level = "warn";
        msg = "🟡 URL SHORTENER - HIDDEN DESTINATION";
      } else if (result.isWhitelisted) {
        level = "safe";
        msg = "✅ SAFE - WHITELISTED";
      } else if (result.safeBrowsingResult?.error) {
        level = "warn";
        msg = "🟡 UNKNOWN - API ERROR";
      } else if (result.score >= 60) {
        level = "danger";
        msg = "🔴 DANGEROUS";
      } else if (result.score >= 40) {
        level = "danger";
        msg = "🟠 HIGH RISK";
      } else if (result.score >= 20) {
        level = "warn";
        msg = "🟡 MEDIUM RISK - UNVERIFIED";
      } else if (result.score >= 10) {
        level = "safe";
        msg = "🟢 LOW RISK";
      } else {
        level = "safe";
        msg = "✅ SAFE";
      }

      // Build extra info
      let extraInfo = "";
      
      if (result.isWhitelisted) {
        extraInfo += " | ✅ Whitelisted";
      }
      
      if (result.safeBrowsingResult?.checked) {
        extraInfo += result.safeBrowsingResult.isThreat ? " | 🚨 Threat Found" : " | ✅ Not in Threats";
      }
      
      if (result.protocol === "HTTPS") extraInfo += " | 🔒 HTTPS";
      else if (result.protocol === "HTTP") extraInfo += " | ⚠️ HTTP";

      statusEl.className = level;
      statusEl.textContent = `${msg} — Score: ${result.score}/100 [${result.type}]${extraInfo}`;
      outputEl.textContent = generateReport(text, result);

    } catch (error) {
      hideLoader();
      statusEl.className = "danger";
      statusEl.textContent = "❌ Error: " + error.message;
      console.error(error);
    }
  }

  /* ================= FILE HANDLING ================= */
  fileInput.onchange = e => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
      statusEl.textContent = `📎 File: ${selectedFile.name}`;
    }
  };

  previewBtn.onclick = async () => {
    if (!selectedFile) return;
    if (selectedFile.type.startsWith("image/")) {
      const w = window.open("");
      w.document.write(`<img src="${URL.createObjectURL(selectedFile)}" style="max-width:100%">`);
    } else {
      const w = window.open("");
      w.document.write(`<pre>${await selectedFile.text()}</pre>`);
    }
  };

  scanBtn.onclick = runScan;

  input.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key === "Enter") runScan();
  });

  /* ================= INIT ================= */
  showLoader("SafeNet", "Loading...", 50);
  setTimeout(() => {
    hideLoader();
    statusEl.textContent = "🛡️ Ready — Whitelist + Google Safe Browsing API";
  }, 1000);

});