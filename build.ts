import { build } from 'esbuild';
import { cp, readdir, rmdir, mkdir } from 'fs/promises';
import path from 'path';

async function main() {
  try {
    // Limpar diretório dist existente
    await rmdir('dist', { recursive: true }).catch(() => {});
    await mkdir('dist').catch(() => {});
    
    // Build do servidor
    await build({
      entryPoints: ['server/index.ts'],
      bundle: true,
      platform: 'node',
      target: 'node16',
      outfile: 'dist/server.js',
      external: ['express'],
    });
    
    // Build do cliente
    await build({
      entryPoints: ['client/src/main.tsx'],
      bundle: true,
      minify: true,
      format: 'esm',
      outfile: 'dist/client.js',
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
        '.css': 'css',
        '.svg': 'file',
        '.png': 'file',
        '.jpg': 'file',
      },
    });
    
    // Copiar index.html
    await cp('client/index.html', 'dist/index.html');
    
    console.log('Build concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante o build:', error);
    process.exit(1);
  }
}

main();