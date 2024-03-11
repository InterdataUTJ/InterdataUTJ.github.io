function checkNavigationSupport() {
  return !!document?.startViewTransition;
}

async function fetchNewPage(url) {
  const response = await fetch(url);
  const html = await response.text();
  const [, mainHtml] = html.match(/<main[^>]*>([\s\S]*)<\/main>/i);
  const [, titleText] = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return [mainHtml, titleText];
}


function setupViewTransition() {
  if (!checkNavigationSupport()) return;

  window.navigation.addEventListener('navigate', (event) => {
    const toUrl = new URL(event.destination.url);
  
    // Is this an external page?
    if (location.origin !== toUrl.origin) return;
      
    event.intercept({
      async handler() {
        if (!navIsShowed()) return startTransition(toUrl);
        hideNav();
        setTimeout(() => {
          startTransition(toUrl);
        }, 200);
      }
    });
    
  });
}

async function startTransition(toUrl) {
  const [mainHtml, titleText] = await fetchNewPage(toUrl.pathname);
  document.startViewTransition(() => {
    document.querySelector('main').innerHTML = mainHtml;
    document.title = titleText;
    document.documentElement.scrollTop = 0;
  });
}

setupViewTransition();
addEvents();