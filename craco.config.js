const path = require(`path`);
const aliases = {
  '@Form': 'src/Components/Form/Form',
  '@List': 'src/Components/List/List',
  '@Browse': 'src/Components/Browse/Browse',
  '@Holism': 'src/Components/Export'
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
    },
  }