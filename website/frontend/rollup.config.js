import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import serve from "rollup-plugin-serve-proxy";
import livereload from "rollup-plugin-livereload";
import postcss from "rollup-plugin-postcss";
import minify from "rollup-plugin-babel-minify";
import copy from "rollup-plugin-copy";

const plugins = [
  resolve(),
  commonjs(),
  postcss({ extract: true, minimize: true }),
  copy({ targets: [{ src: "src/index.html", dest: "dist" }]}),
  minify({ comments: false, sourceMap: true, plugins: [] })
];

if(process.env.NODE_ENV === "development") {
  plugins.push(
    serve({ contentBase: "dist", port: 8080, proxy: { upload: "http://localhost:3000" } }),
    livereload(),
  );
}

export default {
  input: "src/main.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: true
  },
  plugins
};
