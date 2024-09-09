export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "TechGraft Consultancy",
  description:
    "TechGraft Consultancy is a software development company that specializes in building web, desktop and mobile applications for businesses and individuals.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },

    {
      title: "Settings",
      href: "/Profile",
    },
    {
      title: "PlayGround",
      href: "/Playground",
    },
  ],
  links: {
    twitter: "https://twitter.com/bstevary",
    github: "https://github.com/bstevary",
    docs: "https://bstevary.techgraft.co.ke",
  },
};
