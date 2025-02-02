import { z } from 'zod';

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

export const schema = z.object({
	name: z.string().min(1),
	email: z.string().min(1).email(),
	phone: z.string().min(8).regex(phoneRegex, 'Invalid Number!')
});
