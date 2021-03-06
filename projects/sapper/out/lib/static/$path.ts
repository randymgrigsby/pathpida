import type { Query as Query1 } from '../../../src/routes/blog/[slug].json'

interface OptionalQuery0 {
	name: string
}

const encode = (str: Parameters<typeof encodeURIComponent>[0]) =>
  encodeURIComponent(str).replace(
    /[!'()~]|%20|%00/g,
    match =>
      (({
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '\x00'
      } as Record<string, string>)[match])
  )

export const dataToURLString = (data: Record<string, any>) =>
  Object.keys(data)
    .filter(key => data[key] != null)
    .map(key =>
      Array.isArray(data[key])
        ? data[key].map((v: string) => `${encode(key)}=${encode(v)}`).join('&')
        : `${encode(key)}=${encode(data[key])}`
    )
    .join('&')

export const pagesPath = {
  _ignore: {
    $url: (url?: { hash?: string }) => `/.ignore${url?.hash ? `#${url.hash}` : ''}`
  },
  about: {
    $url: (url?: { hash?: string }) => `/about${url?.hash ? `#${url.hash}` : ''}`
  },
  blog: {
    _slug_json: (slug: string | number) => ({
      $url: (url: { query: Query1, hash?: string }) => `/blog/${slug}.json?${dataToURLString(url.query)}${url.hash ? `#${url.hash}` : ''}`
    }),
    _slug: (slug: string | number) => ({
      $url: (url?: { hash?: string }) => `/blog/${slug}${url?.hash ? `#${url.hash}` : ''}`
    }),
    $url: (url?: { query?: OptionalQuery0, hash?: string }) => `/blog${url?.query ? `?${dataToURLString(url.query)}` : ''}${url?.hash ? `#${url.hash}` : ''}`
  },
  blog_json: {
    $url: (url?: { hash?: string }) => `/blog.json${url?.hash ? `#${url.hash}` : ''}`
  },
  $url: (url?: { hash?: string }) => `/${url?.hash ? `#${url.hash}` : ''}`
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  _ignore: '/.ignore',
  favicon_png: '/favicon.png',
  global_css: '/global.css',
  logo_192_png: '/logo-192.png'
} as const

export type StaticPath = typeof staticPath
