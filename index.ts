import type { FrameMasterPlugin } from "frame-master/plugin/types";
import { version, name } from "./package.json";
import type { CompileOptions } from "@mdx-js/mdx";
import { dirname } from "path";

type mdxToJsLoaderOptions = {
  /**
   * mdxjs options
   */
  mdxOptions?: Partial<CompileOptions>;
};

export default function mdxToJsLoaderPlugin(
  options: mdxToJsLoaderOptions = {}
): FrameMasterPlugin {
  const { mdxOptions = {} } = options;

  const MdxToJsPlugin: Bun.BunPlugin = {
    name: "mdx-loader",
    setup(build) {
      // Handle .mdx file loading directly without custom namespace
      build.onLoad({ filter: /\.mdx$/ }, async (args) => {
        const { compile } = await import("@mdx-js/mdx");
        const { VFile } = await import("vfile");
        const source = await Bun.file(args.path).text();

        // Create a VFile with the path so MDX knows the file location for imports
        const file = new VFile({ path: args.path, value: source });

        const compiled = await compile(file, {
          jsx: false,
          jsxImportSource: "react",
          ...mdxOptions,
        });
        return {
          contents: compiled.toString(),
          loader: "js",
        };
      });
    },
  };

  return {
    name,
    version,
    runtimePlugins: [MdxToJsPlugin],
    build: {
      buildConfig: {
        plugins: [MdxToJsPlugin],
      },
    },
  };
}
