import { bundleAsync } from "lightningcss";
import { join, resolve, dirname } from "path";

type BundleCssOptions = {
  entryFile: string;
  mergedThemeCss: string;
  minify: boolean;
};

export async function bundleCss({
  entryFile,
  mergedThemeCss,
  minify,
}: BundleCssOptions): Promise<string> {
  const themePath = resolve(dirname(entryFile), "theme.css");

  const { code } = await bundleAsync({
    filename: entryFile,
    minify,
    resolver: {
      read(filePath) {
        if (resolve(filePath) === themePath) {
          return mergedThemeCss;
        }
        return Bun.file(filePath).text();
      },
    },
  });

  return new TextDecoder().decode(code);
}
