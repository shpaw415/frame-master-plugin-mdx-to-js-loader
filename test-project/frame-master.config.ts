import type { FrameMasterConfig } from "frame-master/server/types";
import mdxToJsLoaderPlugin from "..";
import type { FrameMasterPlugin } from "frame-master/plugin";

export default {
  HTTPServer: {
    port: 3000,
  },
  plugins: [
    {
      name: "entrypoint",
      version: "1.0.0",
      build: {
        buildConfig: {
          entrypoints: ["./index.mdx"],
        },
      },
    },
    mdxToJsLoaderPlugin() as FrameMasterPlugin,
  ],
} satisfies FrameMasterConfig;
