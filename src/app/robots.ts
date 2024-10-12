import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/tai-khoan/', '/payment'],
    },
    sitemap: 'https://doctruyen.io.vn/sitemap.xml',
  }
}