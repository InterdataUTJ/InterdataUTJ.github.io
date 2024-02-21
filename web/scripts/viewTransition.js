function checkNavigationSupport() {
  return new Boolean(document.startViewTransition);
}

async function fetchNewPage(url) {
  const response = await fetch(url);
  const html = await response.text();
  const [, bodyHtml] = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const [, titleText] = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return [bodyHtml, titleText];
}


function startViewTransition() {
  if (!checkNavigationSupport()) return;

  window.navigation.addEventListener('navigate', (event) => {
    const toUrl = new URL(event.destination.url);
  
    // Is this an external page?
    if (location.origin !== toUrl.origin) return;
    
    event.intercept({
      async handler() {

        const [bodyHtml, titleText] = await fetchNewPage(toUrl.pathname);

        document.startViewTransition(() => {
          document.body.innerHTML = bodyHtml;
          document.title = titleText;
          document.documentElement.scrollTop = 0;
        });
      }
    });
  });
}

startViewTransition();