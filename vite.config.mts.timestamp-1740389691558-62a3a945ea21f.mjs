// vite.config.mts
import { resolve } from "path";
import vue from "file:///Users/alkhat/Documents/code/Projects/chikrice_2/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.2_vue@3.4.19/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import EslintPlugin from "file:///Users/alkhat/Documents/code/Projects/chikrice_2/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.56.0_vite@5.1.2/node_modules/vite-plugin-eslint/dist/index.mjs";
import AutoImport from "file:///Users/alkhat/Documents/code/Projects/chikrice_2/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.8.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///Users/alkhat/Documents/code/Projects/chikrice_2/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.19/node_modules/unplugin-vue-components/dist/vite.js";
import { loadEnv } from "file:///Users/alkhat/Documents/code/Projects/chikrice_2/node_modules/.pnpm/vite@5.1.2_@types+node@20.11.19_sass@1.71.0_terser@5.27.1/node_modules/vite/dist/node/index.js";
import { ElementPlusResolver } from "file:///Users/alkhat/Documents/code/Projects/chikrice_2/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.19/node_modules/unplugin-vue-components/dist/resolvers.js";
import ElementPlus from "file:///Users/alkhat/Documents/code/Projects/chikrice_2/node_modules/.pnpm/unplugin-element-plus@0.8.0/node_modules/unplugin-element-plus/dist/vite.mjs";
import Markdown from "file:///Users/alkhat/Documents/code/Projects/chikrice_2/node_modules/.pnpm/vite-plugin-md@0.21.5_@vitejs+plugin-vue@5.0.4_sass@1.71.0_terser@5.27.1_vite@5.1.2/node_modules/vite-plugin-md/dist/index.js";
import Unocss from "file:///Users/alkhat/Documents/code/Projects/chikrice_2/node_modules/.pnpm/unocss@0.58.5_postcss@8.4.35_vite@5.1.2/node_modules/unocss/dist/vite.mjs";
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from "file:///Users/alkhat/Documents/code/Projects/chikrice_2/node_modules/.pnpm/unocss@0.58.5_postcss@8.4.35_vite@5.1.2/node_modules/unocss/dist/index.mjs";
var root = process.cwd();
var pathResolve = (dir) => {
  return resolve(root, ".", dir);
};
var vite_config_default = ({ command, mode }) => {
  let env = {};
  const isBuild = command === "build";
  if (!isBuild) {
    env = loadEnv(process.argv[3] === "--mode" ? process.argv[4] : process.argv[3], root);
  } else {
    env = loadEnv(mode, root);
  }
  return {
    // BASE
    base: env.VITE_BASE_PATH,
    // PLUGINS
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/]
        // <--
      }),
      Markdown(),
      ElementPlus({
        useSource: true
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        extensions: ["vue", "md"],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [
          ElementPlusResolver({
            importStyle: "sass"
          })
        ],
        dts: "types/components.d.ts"
      }),
      Unocss({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            scale: 1.2,
            warn: true,
            extraProperties: {
              display: "inline-block",
              "vertical-align": "middle"
              // ...
            }
          })
        ],
        transformers: [transformerDirectives(), transformerVariantGroup()]
      }),
      EslintPlugin({
        cache: false,
        include: ["src/**/*.vue", "src/**/*.ts", "src/**/*.tsx"]
      })
    ],
    // CSS
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    },
    // RESOLVE
    resolve: {
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".scss", ".css", ".md"],
      alias: [
        {
          find: /\@\//,
          replacement: pathResolve("src") + "/"
        }
      ]
    },
    // BUILD
    build: {
      minify: "terser",
      outDir: env.VITE_OUT_DIR || "dist",
      sourcemap: env.VITE_SOURCEMAP === "true" ? "inline" : false,
      terserOptions: {
        compress: {
          drop_console: env.VITE_DROP_CONSOLE === "true",
          drop_debugger: env.VITE_DROP_DEBUGGER === "true"
        }
      }
    },
    // SERVER
    server: {
      port: 3e3,
      proxy: {
        "/api": {
          target: "http//127.0.0.1:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      },
      host: "0.0.0.0"
    },
    // OPTIMIZE DPENDENCIES
    optimizeDeps: {
      include: ["vue"]
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2Fsa2hhdC9Eb2N1bWVudHMvY29kZS9Qcm9qZWN0cy9jaGlrcmljZV8yXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYWxraGF0L0RvY3VtZW50cy9jb2RlL1Byb2plY3RzL2NoaWtyaWNlXzIvdml0ZS5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hbGtoYXQvRG9jdW1lbnRzL2NvZGUvUHJvamVjdHMvY2hpa3JpY2VfMi92aXRlLmNvbmZpZy5tdHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IEVzbGludFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IHR5cGUgVXNlckNvbmZpZywgdHlwZSBDb25maWdFbnYsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCBFbGVtZW50UGx1cyBmcm9tICd1bnBsdWdpbi1lbGVtZW50LXBsdXMvdml0ZSdcbmltcG9ydCBNYXJrZG93biBmcm9tICd2aXRlLXBsdWdpbi1tZCdcblxuaW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcbmltcG9ydCB7XG4gIHByZXNldEF0dHJpYnV0aWZ5LFxuICBwcmVzZXRJY29ucyxcbiAgcHJlc2V0VW5vLFxuICB0cmFuc2Zvcm1lckRpcmVjdGl2ZXMsXG4gIHRyYW5zZm9ybWVyVmFyaWFudEdyb3VwXG59IGZyb20gJ3Vub2NzcydcblxuY29uc3Qgcm9vdCA9IHByb2Nlc3MuY3dkKClcblxuY29uc3QgcGF0aFJlc29sdmUgPSAoZGlyOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIHJlc29sdmUocm9vdCwgJy4nLCBkaXIpXG59XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCAoeyBjb21tYW5kLCBtb2RlIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcgPT4ge1xuICAvLyBHZXQgZW52aXJvbm1lbnQgdmFyaWFibGVcbiAgbGV0IGVudiA9IHt9IGFzIGFueVxuICBjb25zdCBpc0J1aWxkID0gY29tbWFuZCA9PT0gJ2J1aWxkJ1xuICBpZiAoIWlzQnVpbGQpIHtcbiAgICBlbnYgPSBsb2FkRW52KHByb2Nlc3MuYXJndlszXSA9PT0gJy0tbW9kZScgPyBwcm9jZXNzLmFyZ3ZbNF0gOiBwcm9jZXNzLmFyZ3ZbM10sIHJvb3QpXG4gIH0gZWxzZSB7XG4gICAgZW52ID0gbG9hZEVudihtb2RlLCByb290KVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAvLyBCQVNFXG4gICAgYmFzZTogZW52LlZJVEVfQkFTRV9QQVRILFxuICAgIC8vIFBMVUdJTlNcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoe1xuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLm1kJC9dLCAvLyA8LS1cbiAgICB9KSxcbiAgICBNYXJrZG93bigpLFxuICAgICAgRWxlbWVudFBsdXMoe1xuICAgICAgICB1c2VTb3VyY2U6IHRydWVcbiAgICAgIH0pLFxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV1cbiAgICAgIH0pLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXG4gICAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXG4gICAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoe1xuICAgICAgICAgICAgaW1wb3J0U3R5bGU6ICdzYXNzJ1xuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIGR0czogJ3R5cGVzL2NvbXBvbmVudHMuZC50cydcbiAgICAgIH0pLFxuICAgICAgVW5vY3NzKHtcbiAgICAgICAgcHJlc2V0czogW1xuICAgICAgICAgIHByZXNldFVubygpLFxuICAgICAgICAgIHByZXNldEF0dHJpYnV0aWZ5KCksXG4gICAgICAgICAgcHJlc2V0SWNvbnMoe1xuICAgICAgICAgICAgc2NhbGU6IDEuMixcbiAgICAgICAgICAgIHdhcm46IHRydWUsXG4gICAgICAgICAgICBleHRyYVByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICAgICd2ZXJ0aWNhbC1hbGlnbic6ICdtaWRkbGUnXG4gICAgICAgICAgICAgIC8vIC4uLlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIHRyYW5zZm9ybWVyczogW3RyYW5zZm9ybWVyRGlyZWN0aXZlcygpLCB0cmFuc2Zvcm1lclZhcmlhbnRHcm91cCgpXVxuICAgICAgfSksXG4gICAgICBFc2xpbnRQbHVnaW4oe1xuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGluY2x1ZGU6IFsnc3JjLyoqLyoudnVlJywgJ3NyYy8qKi8qLnRzJywgJ3NyYy8qKi8qLnRzeCddXG4gICAgICB9KVxuICAgIF0sXG4gICAgLy8gQ1NTXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCJAL3N0eWxlcy9lbGVtZW50L2luZGV4LnNjc3NcIiBhcyAqO2BcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8gUkVTT0xWRVxuICAgIHJlc29sdmU6IHtcbiAgICAgIGV4dGVuc2lvbnM6IFsnLm1qcycsICcuanMnLCAnLnRzJywgJy5qc3gnLCAnLnRzeCcsICcuanNvbicsICcuc2NzcycsICcuY3NzJywgJy5tZCddLFxuICAgICAgYWxpYXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6IC9cXEBcXC8vLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoUmVzb2x2ZSgnc3JjJykgKyAnLydcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAgLy8gQlVJTERcbiAgICBidWlsZDoge1xuICAgICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICAgIG91dERpcjogZW52LlZJVEVfT1VUX0RJUiB8fCAnZGlzdCcsXG4gICAgICBzb3VyY2VtYXA6IGVudi5WSVRFX1NPVVJDRU1BUCA9PT0gJ3RydWUnID8gJ2lubGluZScgOiBmYWxzZSxcbiAgICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgICBkcm9wX2NvbnNvbGU6IGVudi5WSVRFX0RST1BfQ09OU09MRSA9PT0gJ3RydWUnLFxuICAgICAgICAgIGRyb3BfZGVidWdnZXI6IGVudi5WSVRFX0RST1BfREVCVUdHRVIgPT09ICd0cnVlJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBTRVJWRVJcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IDMwMDAsXG4gICAgICBwcm94eToge1xuICAgICAgICAnL2FwaSc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwLy8xMjcuMC4wLjE6MzAwMCcsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJ1xuICAgIH0sXG4gICAgLy8gT1BUSU1JWkUgRFBFTkRFTkNJRVNcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFsndnVlJ11cbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1UsU0FBUyxlQUFlO0FBQzVWLE9BQU8sU0FBUztBQUVoQixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUEwQyxlQUFlO0FBQ3pELFNBQVMsMkJBQTJCO0FBQ3BDLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sY0FBYztBQUVyQixPQUFPLFlBQVk7QUFDbkI7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE9BQ0s7QUFFUCxJQUFNLE9BQU8sUUFBUSxJQUFJO0FBRXpCLElBQU0sY0FBYyxDQUFDLFFBQWdCO0FBQ25DLFNBQU8sUUFBUSxNQUFNLEtBQUssR0FBRztBQUMvQjtBQUdBLElBQU8sc0JBQVEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUE2QjtBQUUzRCxNQUFJLE1BQU0sQ0FBQztBQUNYLFFBQU0sVUFBVSxZQUFZO0FBQzVCLE1BQUksQ0FBQyxTQUFTO0FBQ1osVUFBTSxRQUFRLFFBQVEsS0FBSyxDQUFDLE1BQU0sV0FBVyxRQUFRLEtBQUssQ0FBQyxJQUFJLFFBQVEsS0FBSyxDQUFDLEdBQUcsSUFBSTtBQUFBLEVBQ3RGLE9BQU87QUFDTCxVQUFNLFFBQVEsTUFBTSxJQUFJO0FBQUEsRUFDMUI7QUFFQSxTQUFPO0FBQUE7QUFBQSxJQUVMLE1BQU0sSUFBSTtBQUFBO0FBQUEsSUFFVixTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsUUFDSixTQUFTLENBQUMsVUFBVSxPQUFPO0FBQUE7QUFBQSxNQUM3QixDQUFDO0FBQUEsTUFDRCxTQUFTO0FBQUEsTUFDUCxZQUFZO0FBQUEsUUFDVixXQUFXO0FBQUEsTUFDYixDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNuQyxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxZQUFZLENBQUMsT0FBTyxJQUFJO0FBQUEsUUFDeEIsU0FBUyxDQUFDLFVBQVUsY0FBYyxPQUFPO0FBQUEsUUFDekMsV0FBVztBQUFBLFVBQ1Qsb0JBQW9CO0FBQUEsWUFDbEIsYUFBYTtBQUFBLFVBQ2YsQ0FBQztBQUFBLFFBQ0g7QUFBQSxRQUNBLEtBQUs7QUFBQSxNQUNQLENBQUM7QUFBQSxNQUNELE9BQU87QUFBQSxRQUNMLFNBQVM7QUFBQSxVQUNQLFVBQVU7QUFBQSxVQUNWLGtCQUFrQjtBQUFBLFVBQ2xCLFlBQVk7QUFBQSxZQUNWLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLGlCQUFpQjtBQUFBLGNBQ2YsU0FBUztBQUFBLGNBQ1Qsa0JBQWtCO0FBQUE7QUFBQSxZQUVwQjtBQUFBLFVBQ0YsQ0FBQztBQUFBLFFBQ0g7QUFBQSxRQUNBLGNBQWMsQ0FBQyxzQkFBc0IsR0FBRyx3QkFBd0IsQ0FBQztBQUFBLE1BQ25FLENBQUM7QUFBQSxNQUNELGFBQWE7QUFBQSxRQUNYLE9BQU87QUFBQSxRQUNQLFNBQVMsQ0FBQyxnQkFBZ0IsZUFBZSxjQUFjO0FBQUEsTUFDekQsQ0FBQztBQUFBLElBQ0g7QUFBQTtBQUFBLElBRUEsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxZQUFZLENBQUMsUUFBUSxPQUFPLE9BQU8sUUFBUSxRQUFRLFNBQVMsU0FBUyxRQUFRLEtBQUs7QUFBQSxNQUNsRixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxZQUFZLEtBQUssSUFBSTtBQUFBLFFBQ3BDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsUUFBUSxJQUFJLGdCQUFnQjtBQUFBLE1BQzVCLFdBQVcsSUFBSSxtQkFBbUIsU0FBUyxXQUFXO0FBQUEsTUFDdEQsZUFBZTtBQUFBLFFBQ2IsVUFBVTtBQUFBLFVBQ1IsY0FBYyxJQUFJLHNCQUFzQjtBQUFBLFVBQ3hDLGVBQWUsSUFBSSx1QkFBdUI7QUFBQSxRQUM1QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxRQUM5QztBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQU07QUFBQSxJQUNSO0FBQUE7QUFBQSxJQUVBLGNBQWM7QUFBQSxNQUNaLFNBQVMsQ0FBQyxLQUFLO0FBQUEsSUFDakI7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
