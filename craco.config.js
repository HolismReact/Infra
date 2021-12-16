const path = require(`path`);
const aliases = {
  '@Form': 'src/Components/Form/Form',
  '@FormTwo': 'src/Components/Form/FormTwo',
  '@List': 'src/Components/List/List',
  '@Browse': 'src/Components/Browse/Browse',
  '@Dashboard': 'src/Components/Dashboard/Dashboard',
  '@Panel': 'src/Panel/Panel',
};

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [key, path.resolve(__dirname, value)]),
);

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    alias: resolvedAliases,
    // this config, causes HolismIcon to throw react error 321 for builds
    configure: {
      resolve: {
        symlinks: false,
      },
    },
  },
}