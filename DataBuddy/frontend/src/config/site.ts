export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "TechGraft Consultancy",
  description:
    "Try DataBudddy Yall",
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
      title: "Payment",
      href: "/Cards"
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
