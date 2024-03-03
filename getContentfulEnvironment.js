const contentfulManagement = require("contentful-management")
require('dotenv').config({ path: ".env.local" })

module.exports = async function() {
    const contentfulClient = contentfulManagement.createClient({
        accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
    });

    const space = await contentfulClient.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID);
    return space.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT);
}