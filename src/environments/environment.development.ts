const client_id = 'yamato-intranet-frontend';
const server = {
  local: 'http://localhost',
  public: 'http://192.168.110.2',
};
export const environment = {
    production: false,
    serverUrl: server.public + ':90005',
    project: server.public + ':90002',
    storage: 'https://localstorage2.yamatothai.com',
    identity: server.local + ':90001',
    user: server.public + ':90010',
    authUrl: 'https://login.yamatothai.com',
    authEndPoint: '/connect/authorize?',
    defaultLanguage: 'en-US',
    supportedLanguages: ['en-US', 'fr-FR'],
    identityConfigs: {
      identityUrl: 'https://login.yamatothai.com',
      projectId: 'f1354fef-6407-423c-b6e0-58a3f0f08ad0',
      customerId: '',
      authorizeEndpoint: '/connect/authorize?',
      queryParams: {
        response_type: encodeURI('id_token token'),
        client_id: encodeURI(client_id),
        redirect_uri: encodeURI(location.origin),
        post_logout_redirect_uri: encodeURI(location.origin),
        scope: encodeURI('openid profile wmsreceiving backoffice'),
        nonce: '',
        state: '',
      },
      authParam: {
        client_id: encodeURI(client_id),
        client_secret: 'wms1234',
        scope: 'openid profile yutsys wmsreceiving backoffice',
        grant_type: 'password',
      },
    },
    encryptConfigs: {
      enable: true,
      pwd: 'OCYzM2xpZkxJSDNqZmcqRWY=',
    },
  };
  
