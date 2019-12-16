import appdata from '@potentii/app-data'

const Store = appdata;
Store.setAppName('CodeShare');
Store.disableInMemoryCache();

export default Store;