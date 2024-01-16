export const ROUTES = {
	home: '/',
	profile: { root: '/profile', settings: '/profile/settings' },
	auth: {
		login: '/auth/login',
		register: '/auth/register',
		logout: '/auth/logout'
	}
};

export const REDIRECTS = {
	[ROUTES.auth.login]: ['/signin', '/login', '/auth/signin'],
	[ROUTES.auth.register]: ['/signup', '/register', '/auth/signup'],
	[ROUTES.home]: ['/home', '/index']
};

export const getRedirect = (pathname: string) => {
	for (const [redirectTo, urls] of Object.entries(REDIRECTS))
		if (urls.includes(pathname)) return redirectTo;
};
