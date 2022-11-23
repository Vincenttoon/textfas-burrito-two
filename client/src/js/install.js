const butInstall = document.getElementById('buttonInstall');

// n event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // stashes install prompt for use later (when the user is ready)
     window.deferredPrompt = event;
     butInstall.classList.toggle('hidden', false);
});

// A click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
     return;
    }
    promptEvent.prompt();
    // removes stash and confirms app is installed
    window.deferredPrompt = null;
    // hides app install button since it is already installed
    butInstall.classList.toggle('hidden', true);
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});