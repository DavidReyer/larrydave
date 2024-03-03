import * as contentful from "contentful";

export const client = contentful.createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});