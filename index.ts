import type { FrameMasterPlugin } from "frame-master/plugin/types";
import { version, name } from "./package.json";
import { type CompileOptions, compile } from "@mdx-js/mdx";
import { VFile } from "vfile";

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
      // Handle mdx/md file loading directly without custom namespace
      build.onLoad({ filter: /\.mdx$/ }, async (args) => {
        if (
          typeof args.__chainedLoader !== "undefined" &&
          !(["tsx", "ts", "jsx", "js"] as Array<Bun.Loader>).includes(
            args.__chainedLoader
          )
        )
          return;

        const source =
          args.__chainedContents ?? (await Bun.file(args.path).text());

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
