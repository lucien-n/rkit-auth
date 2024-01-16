import { Role } from '$remult/roles';

export const ROUTES = {
	home: '/',
	profile: { root: '/profile', settings: '/profile/settings' },
	admin: { root: '/admin' },
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

export const REQUIRED_ROLES = {
	[ROUTES.admin.root]: [Role.Admin],
	'/test': [Role.Admin]
};

export const getRedirect = (pathname: string) => {
	for (const [redirectTo, urls] of Object.entries(REDIRECTS))
		if (urls.includes(pathname)) return redirectTo;
};

export const isAccessibleBy = (roles: string[] | undefined, pathname: string) => {
	for (const [rolePathname, requiredRoles] of Object.entries(REQUIRED_ROLES)) {
		if (pathname.startsWith(rolePathname)) {
			return !!requiredRoles.find((role) => roles?.includes(role));
		}
	}

	return true;
};
