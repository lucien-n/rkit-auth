import { sequence } from '@sveltejs/kit/hooks';
import { handleAuth } from './hooks/handleAuth';
import { handleRedirect } from './hooks/handleRedirect';
import { handleRemult } from './hooks/handleRemult';

export const handle = sequence(handleRedirect, handleAuth, handleRemult);
