import { build } from 'esbuild';
import { cp, rmdir, mkdir } from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

async function main() {
  try {
    console.log('Iniciando processo de build para produção...');
    
    // Limpar diretório dist existente
    console.log('Limpando diretório dist...');
    await rmdir('dist', { recursive: true }).catch(() => {});
    await mkdir('dist').catch(() => {});
    await mkdir('dist/public').catch(() => {});
    
    // Build do frontend com Vite (usando o comando existente no package.json)
    console.log('Executando build do frontend com Vite...');
    try {
      execSync('vite build', { stdio: 'inherit' });
    } catch (err) {
      console.error('Erro ao executar build do frontend:', err);
      process.exit(1);
    }
    
    // Build do backend com ESBuild
    console.log('Executando build do backend...');
    await build({
      entryPoints: ['server/index.ts'],
      bundle: true,
      platform: 'node',
      target: 'node16',
      outfile: 'dist/index.js',
      format: 'esm',
      external: [
        'express', 
        '@replit/vite-plugin-cartographer',
        '@replit/vite-plugin-runtime-error-modal',
        '@replit/vite-plugin-shadcn-theme-json',
        'vite'
      ],
    });
    
    // Copiar arquivos de configuração necessários para o Vercel
    console.log('Copiando arquivos de configuração...');
    await cp('vercel.json', 'dist/vercel.json').catch(err => {
      console.warn('Aviso: Não foi possível copiar vercel.json:', err.message);
    });
    
    console.log('Build concluído com sucesso! Arquivos gerados no diretório dist/');
    console.log('Estrutura de diretórios para implantação no Vercel está pronta.');
  } catch (error) {
    console.error('Erro durante o build:', error);
    process.exit(1);
  }
}

main();