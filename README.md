# frame-master-plugin-mdx-to-js-loader

A Frame-Master plugin that enables support for MDX files, allowing you to import and use `.mdx` files as modules in your application. It uses `@mdx-js/mdx` to compile MDX to JSX.

## Installation

```bash
bun add frame-master-plugin-mdx-to-js-loader
```

## Usage

Add the plugin to your `frame-master.config.ts`:

```typescript
import type { FrameMasterConfig } from "frame-master/server/types";
import mdxToJsLoaderPlugin from "frame-master-plugin-mdx-to-js-loader";

const config: FrameMasterConfig = {
  HTTPServer: { port: 3000 },
  plugins: [
    mdxToJsLoaderPlugin({
      mdxOptions: {},
    }),
  ],
};

export default config;
```

## Features

- **MDX Support**: Load and compile `.mdx` files seamlessly.
- **Bun Integration**: Registers a Bun plugin to handle `.mdx` imports during build and runtime.
- **Configurable MDX Options**: Pass custom options to the MDX compiler via `mdxOptions` (e.g. `remarkPlugins`, `rehypePlugins`, `jsxImportSource`).

## License

MIT

```

```
