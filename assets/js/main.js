/* Mobile menu burger toggle */
(function () {
    const navigation = document.querySelector('.gh-navigation');
    const burger = navigation.querySelector('.gh-burger');
    if (!burger) return;

    burger.addEventListener('click', function () {
        if (!navigation.classList.contains('is-open')) {
            navigation.classList.add('is-open');
            document.documentElement.style.overflowY = 'hidden';
        } else {
            navigation.classList.remove('is-open');
            document.documentElement.style.overflowY = null;
        }
    });
})();

/* Add lightbox to gallery images */
(function () {
    lightbox(
        '.kg-image-card > .kg-image[width][height], .kg-gallery-image > img'
    );
})();

/* Responsive video in post content */
(function () {
    const sources = [
        '.gh-content iframe[src*="youtube.com"]',
        '.gh-content iframe[src*="youtube-nocookie.com"]',
        '.gh-content iframe[src*="player.vimeo.com"]',
        '.gh-content iframe[src*="kickstarter.com"][src*="video.html"]',
        '.gh-content object',
        '.gh-content embed',
    ];
    reframe(document.querySelectorAll(sources.join(',')));
})();

/* Turn the main nav into dropdown menu when there are more than 5 menu items */
(function () {
    dropdown();
})();

/* Give tag pills dark text when their accent color is too light to read as colored text.
   Same YIQ contrast calculation used in default.hbs for the site background. */
function applyTagPillContrast(root) {
    (root || document).querySelectorAll('.gh-card-tag-pill').forEach(function (pill) {
        var accentColor = pill.style.getPropertyValue('--tag-color').trim().replace('#', '');

        if (accentColor.length === 3) {
            accentColor = accentColor[0] + accentColor[0] + accentColor[1] + accentColor[1] + accentColor[2] + accentColor[2];
        }
        if (accentColor.length !== 6) return;

        var r = parseInt(accentColor.substr(0, 2), 16);
        var g = parseInt(accentColor.substr(2, 2), 16);
        var b = parseInt(accentColor.substr(4, 2), 16);
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

        pill.classList.toggle('has-dark-text', yiq >= 128);
    });
}
applyTagPillContrast();

/* Infinite scroll pagination */
(function () {
    if (!document.body.classList.contains('home-template') && !document.body.classList.contains('post-template')) {
        pagination(true, function (elems) {
            elems.forEach(function (elem) {
                applyTagPillContrast(elem);
            });
        });
    }
})();

/* Responsive HTML table */
(function () {
    const tables = document.querySelectorAll('.gh-content > table:not(.gist table)');
    
    tables.forEach(function (table) {
        const wrapper = document.createElement('div');
        wrapper.className = 'gh-table';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
})();