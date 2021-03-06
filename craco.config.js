const path = require(`path`);
const aliases = {
  '@Form': 'src/Components/Form/Exports',
  '@List': 'src/Components/List/Exports',
  '@Browse': 'src/Components/Browse/Browse',
  '@Tree': 'src/Components/Tree/Exports',
  '@Tab': 'src/Components/Tab/Exports',
  '@Dashboard': 'src/Components/Dashboard/Dashboard',
  '@Panel': 'src/Panel/Panel',
};

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [key, path.resolve(__dirname, value)]),
);

module.exports = {
  // eslint: {
  //   enable: false
  // },
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