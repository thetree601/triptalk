export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TARGET = 'https://main-practice.codebootcamp.co.kr/graphql';

function buildForwardHeaders(reqHeaders: Headers) {
  const headers = new Headers();
  reqHeaders.forEach((value, key) => {
    const k = key.toLowerCase();
    // 제외: 원격 서버가 거부할 수 있는 헤더들
    if (
      k === 'host' ||
      k === 'content-length' ||
      k === 'origin' ||
      k === 'referer' ||
      k.startsWith('sec-') ||
      k === 'connection' ||
      k === 'accept-encoding'
    ) return;
    headers.set(key, value);
  });
  return headers;
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

async function forward(method: 'GET' | 'POST', req: Request) {
  const headers = buildForwardHeaders(req.headers);

  let init: RequestInit = { method, headers };

  if (method === 'POST') {
    // 업로드 포함 POST 바디를 안전하게 전달
    const buf = await req.arrayBuffer();
    init = {
      ...init,
      body: buf as unknown as BodyInit,
      // @ts-expect-error Node fetch duplex
      duplex: 'half',
    };
  }

  const upstream = await fetch(TARGET, init);

  const resHeaders = new Headers(upstream.headers);
  resHeaders.set('Access-Control-Allow-Origin', '*');

  return new Response(upstream.body, {
    status: upstream.status,
    headers: resHeaders,
  });
}

export async function GET(req: Request) {
  return forward('GET', req);
}

export async function POST(req: Request) {
  return forward('POST', req);
}


