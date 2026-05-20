export default {
  '**/*.{js,ts,jsx,tsx,mjs,cjs,json,md,mdx,css,scss,sass,less}': 'prettier --write',
  '**/*.{js,ts,jsx,tsx,mjs,cjs}': 'eslint',
  '**/*.{css,scss,sass,less}': 'stylelint',
};
