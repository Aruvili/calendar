export default {
  // Web app typescript and styles
  'web/**/*.{js,jsx,ts,tsx}': (filenames) => [
    `npm --prefix web run lint`,
    `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,
  ],

  // Rust API files (runs rustfmt check)
  'api/**/*.rs': () => [
    'cargo fmt --manifest-path api/Cargo.toml -- --check',
  ],

  // Root and documentation / configs
  '*.{json,yaml,yml,md}': (filenames) => [
    `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,
  ],
  '{.github,api,app,web}/**/*.{json,yaml,yml,md}': (filenames) => [
    `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,
  ],
};
