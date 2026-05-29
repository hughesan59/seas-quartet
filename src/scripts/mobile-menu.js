function initMobileMenu() {
	const toggle = document.getElementById('menu-toggle');
	const menu = document.getElementById('nav-menu');
	const pageContent = document.getElementById('page-content');

	if (!toggle || !menu) return;

	// Reveal the hamburger button (hidden by default for no-JS fallback)
	toggle.removeAttribute('hidden');

	function isOpen() {
		return toggle.getAttribute('aria-expanded') === 'true';
	}

	function openMenu() {
		toggle.setAttribute('aria-expanded', 'true');
		toggle.setAttribute('aria-label', 'Close menu');
		menu.classList.add('is-open');
		pageContent?.setAttribute('inert', '');
		document.body.style.overflow = 'hidden';

		// Focus the first link after the transition starts
		requestAnimationFrame(() => {
			const firstLink = menu.querySelector('a');
			firstLink?.focus();
		});
	}

	function closeMenu(restoreFocus = true) {
		toggle.setAttribute('aria-expanded', 'false');
		toggle.setAttribute('aria-label', 'Open menu');
		menu.classList.remove('is-open');
		pageContent?.removeAttribute('inert');
		document.body.style.overflow = '';

		if (restoreFocus) {
			toggle.focus();
		}
	}

	toggle.addEventListener('click', () => {
		if (isOpen()) {
			closeMenu();
		} else {
			openMenu();
		}
	});

	// Close on Escape
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && isOpen()) {
			closeMenu();
		}
	});

	// Close when a nav link is clicked
	menu.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => {
			if (isOpen()) {
				closeMenu(false);
			}
		});
	});

	// Close if viewport resizes past the mobile breakpoint
	const mql = window.matchMedia('(min-width: 768px)');
	mql.addEventListener('change', (e) => {
		if (e.matches && isOpen()) {
			closeMenu(false);
		}
	});
}

// Run on initial load
initMobileMenu();

// Re-run after Astro client-side navigation (View Transitions)
document.addEventListener('astro:after-swap', initMobileMenu);
