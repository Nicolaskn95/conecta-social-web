/**
 * Converte um link do Instagram em embed HTML
 * @param instagramUrl - URL do post do Instagram (ex: https://www.instagram.com/p/DKZm15CskZp)
 * @returns HTML embed do Instagram
 */
export function convertInstagramLinkToEmbed(instagramUrl: string): string {
   // Valida se é um link válido do Instagram
   const instagramRegex =
      /^https:\/\/(www\.)?instagram\.com\/p\/[A-Za-z0-9_-]+\/?$/;

   if (!instagramRegex.test(instagramUrl)) {
      throw new Error('Link do Instagram inválido');
   }

   // Cria o embed HTML
   const embedHtml = `<blockquote class="instagram-media" data-instgrm-permalink="${instagramUrl}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="${instagramUrl}" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style="display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></a><p style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="${instagramUrl}" style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Ver esta publicação no Instagram</a></p></div></blockquote>`;

   return embedHtml;
}

/**
 * Valida se uma string é um link válido do Instagram
 * @param url - URL para validar
 * @returns true se for um link válido do Instagram
 */
export function isValidInstagramUrl(url: string): boolean {
   const instagramRegex =
      /^https:\/\/(www\.)?instagram\.com\/p\/[A-Za-z0-9_-]+\/?$/;
   return instagramRegex.test(url);
}

/**
 * Valida se uma string é um embed HTML válido do Instagram
 * @param embed - HTML embed para validar
 * @returns true se for um embed válido do Instagram
 */
export function isValidInstagramEmbed(embed: string): boolean {
   const embedRegex = /<blockquote class="instagram-media".*<\/blockquote>/;
   return embedRegex.test(embed);
}
