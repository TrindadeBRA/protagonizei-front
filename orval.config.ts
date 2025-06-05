import { defineConfig } from 'orval';

export default defineConfig({
  trinity: {
    input: {
      target: 'http://localhost:8080/?trinitykitcms_swagger=1',
    },
    output: {
      target: './src/services/api.ts',
      schemas: './src/services/model',
      client: 'fetch',
    },
  }
});
