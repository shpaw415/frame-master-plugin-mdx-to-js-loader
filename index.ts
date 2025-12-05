import type { FrameMasterPlugin } from "frame-master/plugin/types";
import { version, name } from "./package.json";
import type { CompileOptions } from "@mdx-js/mdx";

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
      build.onResolve({ filter: /\.mdx$/ }, (args) => {
        return {
          path: args.path,
          namespace: "mdx-module",
        };
      });

      build.onLoad(
        { filter: /\.mdx$/, namespace: "mdx-module" },
        async (args) => {
          const { compile } = await import("@mdx-js/mdx");
          const source = await Bun.file(args.path).text();
          const compiled = await compile(source, {
            jsx: true,
            jsxImportSource: "react",
            ...mdxOptions,
          });
          return {
            contents: compiled.toString(),
            loader: "jsx",
          };
        }
      );
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
