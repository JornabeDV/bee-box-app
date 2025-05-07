import adapter from '@sveltejs/adapter-node';
import preprocess from "svelte-preprocess";

// Custom plugin to filter out lengthy source in CssSyntaxError
const filterCssSyntaxError = () => ({
  postcssPlugin: 'filter-css-syntax-error',
  OnceExit(css, { result }) {
    result.messages = result.messages.map(message => {
      if (message.type === 'warning' && message.plugin === 'postcss' && message.text.includes('CssSyntaxError')) {
        message.text = message.text.split('\n').slice(0, 3).join('\n'); // Show only the first 3 lines of the error
      }
      return message;
    });
  }
});

filterCssSyntaxError.postcss = true;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
    alias: {
      $stores: "src/stores",
      $shared: "shared",
      $services: "shared/services",
    },
	},
	preprocess: [
		preprocess({
		  postcss: {
        plugins: [
          filterCssSyntaxError
        ]
      },
			preserve: ['ld+json']
		}),
	],
};

export default config;
