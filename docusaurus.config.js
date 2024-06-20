// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "OpenContext Docs",
  tagline: "Complete Context for DevSecOps",
  url: "https://opencontextinc.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "opencontextinc", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // Scripts
  scripts: [
    {
      src: "js/termly.js",
    },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        googleTagManager: {
          containerId: "GTM-W2Q4PQG",
        },
      }),
    ],
  ],

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "OpenContext Docs",
        logo: {
          alt: "OpenContext",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "welcome",
            position: "left",
            label: "Getting Started",
          },
          {
            type: "doc",
            docId: "user-journey/part1",
            label: "User Journey",
            position: "left",
          },
          { to: "/blog", label: "Release Notes", position: "left" },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Getting Started",
                to: "/docs/category/getting-started",
              },
              {
                label: "User Journey",
                to: "/docs/category/user-journey",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Release Notes",
                to: "/blog",
              },
              {
                label: "Privacy Policy",
                href: "https://www.opencontext.com/privacy-policy",
              },
              {
                label: "Terms and Conditions",
                href: "https://www.opencontext.com/terms-and-conditions",
              },
            ],
          },
          {
            title: "Follow us",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/OpenContextInc",
              },
              {
                label: "LinkedIn",
                href: "https://linkedin.com/company/opencontext-inc",
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/channel/UCgsH3yxd1CKfshE3pwST3pQ",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} OpenContext, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      mermaid: {
        theme: {
          light: "lightCodeTheme",
          dark: "darkCodeTheme",
        },
      },
    }),
};

module.exports = config;
