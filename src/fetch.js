import { request, get } from 'https';

export async function httpGet(params) {
  return new Promise((resolve, reject) => {
    get(params, async response => {
      let __responseBody = '';

      for await (const chunk of response) {
        __responseBody += chunk;
      }

      resolve(__responseBody);
    });
  });
}

export async function httpPost(params, body) {
  return new Promise((resolve, reject) => {
    const req = request(
      {
        method: 'POST',
        ...params,
      },
      async response => {
        let __responseBody = '';

        for await (const chunk of response) {
          __responseBody += chunk;
        }

        resolve(__responseBody);
      }
    );

    if (body) {
      req.write(body);
    }

    req.end();
  });
}
