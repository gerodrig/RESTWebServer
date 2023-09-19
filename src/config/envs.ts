import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATCH: get('PUBLIC_PATCH').default('public').asString(),
}