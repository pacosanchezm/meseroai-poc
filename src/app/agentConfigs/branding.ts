export interface AgentBranding {
  title: string;
  logoSrc: string;
  watermarkLogoSrc?: string;
  linkUrl?: string;
  allowGourmetLink?: boolean;
}

export const agentBranding: Record<string, AgentBranding> = {
  sushiWaiter: {
    title: "Sushi Factory",
    logoSrc: "/sushifactory.jpeg",
    watermarkLogoSrc: "/logoagua.webp",
    allowGourmetLink: true,
    linkUrl: "https://mesero.ai",
  },
  brogaCafe: {
    title: "Broga Café",
    logoSrc:
      "https://static.wixstatic.com/media/1bf467_d8bc094c88624cd59baf6ffc002bf423~mv2.png/v1/fill/w_253,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logotipo%203.png",
    watermarkLogoSrc:
      "https://static.wixstatic.com/media/1bf467_d8bc094c88624cd59baf6ffc002bf423~mv2.png/v1/fill/w_253,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logotipo%203.png",
    allowGourmetLink: false,
    linkUrl: "https://mesero.ai",
  },
};

export const defaultBranding: AgentBranding = {
  title: "mesero.ai",
  logoSrc: "/icono.png",
  watermarkLogoSrc: "/logoagua.webp",
   allowGourmetLink: false,
  linkUrl: "https://mesero.ai",
};
