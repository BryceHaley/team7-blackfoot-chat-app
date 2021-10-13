/** @type {import("snowpack").SnowpackUserConfig } */

export default {
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: ['@snowpack/plugin-react-refresh'],
  routes: [
    /* Enable an SPA Fallback in development: */
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],
  optimize: {
    // bundle: true,    // true breaks css modules
    minify: true,
    target: 'es2018',
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
