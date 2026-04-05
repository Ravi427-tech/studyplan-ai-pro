import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query) return NextResponse.json({ error: 'No query provided' }, { status: 400 });

    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' filetype:pdf')}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    const html = await response.text();
    
    // Extract the first actual PDF link from DDG results
    const match = html.match(/href="([^"]+\.pdf)"/i);
    let href = match ? match[1] : null;

    if (!href) {
      // Sometimes duckduckgo redirects links
      const ddgMatch = html.match(/href="([^"]+uddg=([^"&]+)[^"]*)"/i);
      if (ddgMatch && ddgMatch[2]) {
        const decoded = decodeURIComponent(ddgMatch[2]);
        if (decoded.includes('.pdf')) {
          href = decoded;
        }
      }
    }

    if (href && !href.startsWith('http')) {
        href = 'https:' + href;
    }

    if (href) {
      return NextResponse.json({ url: href });
    }

    return NextResponse.json({ error: 'Could not find a direct PDF link' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Scraper failed' }, { status: 500 });
  }
}
