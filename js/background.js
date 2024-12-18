window.browser = window.browser || window.chrome;

browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        const url = new URL(details.url);
        
        if (url.hostname.endsWith("youtube.com") && url.searchParams.has("v")) {
            const videoId = url.searchParams.get("v");
            return { redirectUrl: `https://www.youtube.com/embed/${videoId}` };
        }

        if (url.hostname.endsWith("youtu.be") && url.pathname.length > 1) {
            const videoId = url.pathname.substr(1);
            return { redirectUrl: `https://www.youtube.com/embed/${videoId}` };
        }
    },
    {
        urls: ["<all_urls>"],
    },
    ["blocking"]
);
