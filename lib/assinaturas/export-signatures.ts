import { renderSignatureHtml } from './render-signature'
import { SIGNATURE_FONT_URL } from './theme'
import type { ResolvedSignature, SignatureCategory } from './types'

/**
 * Gera um único arquivo HTML com todas as assinaturas ativas, já com os
 * avisos/complementos salvos no dashboard. Pensado para a TI abrir o arquivo
 * em cada máquina, achar o colaborador e copiar a assinatura.
 */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Conteúdo do <body> do HTML individual (a tabela da assinatura). */
function extractBody(html: string): string {
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  return (match ? match[1] : html).trim()
}

/** JSON seguro para embutir dentro de <script>. */
function jsonForScript(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(new RegExp(String.fromCharCode(0x2028), 'g'), '\\u2028')
    .replace(new RegExp(String.fromCharCode(0x2029), 'g'), '\\u2029')
}

function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(date)
}

export interface ExportGroup {
  category: SignatureCategory | null
  signatures: ResolvedSignature[]
}

export function renderSignaturesExportHtml(groups: ExportGroup[], generatedAt = new Date()): string {
  const sources: Record<string, string> = {}
  const total = groups.reduce((sum, group) => sum + group.signatures.length, 0)

  const sections = groups
    .filter((group) => group.signatures.length > 0)
    .map((group) => {
      const title = group.category?.title ?? 'Sem categoria'
      const first = group.signatures[0]
      const notices = [
        first.complement ? `Complemento: <strong>${escapeHtml(first.complement.title)}</strong>` : null,
        first.campaign ? `Aviso: <strong>${escapeHtml(first.campaign.title)}</strong>` : null,
      ].filter(Boolean)

      const cards = group.signatures
        .map((signature) => {
          const html = renderSignatureHtml(signature)
          sources[signature.slug] = html
          const extras = [
            signature.complement ? escapeHtml(signature.complement.title) : null,
            signature.campaign ? escapeHtml(signature.campaign.title) : null,
          ].filter(Boolean)

          return `
        <article class="card" data-search="${escapeHtml(
          `${signature.name} ${signature.email} ${signature.role} ${title}`.toLowerCase()
        )}">
          <header class="card__header">
            <div>
              <div class="card__name">${escapeHtml(signature.name)}</div>
              <div class="card__meta">${escapeHtml(signature.role)} · ${escapeHtml(signature.email)}</div>
              ${extras.length ? `<div class="card__meta">Inclui: ${extras.join(' + ')}</div>` : ''}
            </div>
            <div class="card__actions">
              <button type="button" class="btn btn--primary" data-copy-rich="${escapeHtml(signature.slug)}">Copiar assinatura</button>
              <button type="button" class="btn" data-copy-source="${escapeHtml(signature.slug)}">Copiar código HTML</button>
            </div>
          </header>
          <div class="card__preview" id="sig-${escapeHtml(signature.slug)}">${extractBody(html)}</div>
        </article>`
        })
        .join('')

      return `
      <section class="group" data-group>
        <h2 class="group__title">${escapeHtml(title)} <span class="group__count">${group.signatures.length}</span></h2>
        <p class="group__notices">${notices.length ? notices.join(' · ') : 'Sem aviso ou complemento.'}</p>
        ${cards}
      </section>`
    })
    .join('')

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Assinaturas de e-mail · Grupo Azimute</title>
  <link href="${SIGNATURE_FONT_URL}" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; background: #f4f5f7; color: #333; font-family: -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; }
    .wrap { max-width: 820px; margin: 0 auto; padding: 32px 16px 64px; }
    h1 { margin: 0; font-size: 26px; color: #222; }
    .intro { margin: 8px 0 0; font-size: 14px; line-height: 1.6; color: #666; }
    .intro ol { margin: 8px 0 0; padding-left: 20px; }
    .search { position: sticky; top: 0; z-index: 1; margin: 24px 0; padding: 12px 0; background: #f4f5f7; }
    .search input { width: 100%; padding: 12px 14px; border: 1px solid #d9d9d9; border-radius: 8px; font-size: 15px; background: #fff; }
    .group { margin-bottom: 40px; }
    .group__title { margin: 0; font-size: 20px; color: #222; }
    .group__count { font-size: 13px; font-weight: 600; color: #888; }
    .group__notices { margin: 4px 0 16px; font-size: 13px; color: #666; }
    .card { margin-bottom: 16px; padding: 16px; border: 1px solid #e3e6ea; border-radius: 12px; background: #fff; }
    .card__header { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
    .card__name { font-size: 16px; font-weight: 600; color: #222; }
    .card__meta { margin-top: 2px; font-size: 13px; color: #666; }
    .card__actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: flex-start; }
    .card__preview { overflow-x: auto; }
    .btn { padding: 8px 14px; border: 1px solid #d9d9d9; border-radius: 8px; background: #fff; color: #333; font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap; }
    .btn--primary { border-color: #e65c15; background: #e65c15; color: #fff; }
    .btn.is-done { border-color: #1f7a33; background: #e8f5e9; color: #1f7a33; }
    .empty { display: none; font-size: 14px; color: #888; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Assinaturas de e-mail</h1>
    <div class="intro">
      ${total} assinaturas · gerado em ${formatDateTime(generatedAt)}, com os avisos salvos no dashboard nesse momento.
      <ol>
        <li>Procure o colaborador pelo nome ou e-mail.</li>
        <li><strong>Copiar assinatura</strong> e cole no editor de assinatura do Outlook (Arquivo › Opções › Email › Assinaturas) ou do Gmail.</li>
        <li><strong>Copiar código HTML</strong> serve para ferramentas que pedem o código-fonte.</li>
      </ol>
    </div>

    <div class="search"><input type="search" placeholder="Buscar por nome, e-mail ou departamento…" autofocus /></div>
    <p class="empty">Nenhuma assinatura encontrada.</p>
    ${sections}
  </div>

  <script>
    var SOURCES = ${jsonForScript(sources)};

    function flash(button, text) {
      var original = button.textContent;
      button.textContent = text;
      button.classList.add('is-done');
      setTimeout(function () { button.textContent = original; button.classList.remove('is-done'); }, 2000);
    }

    function copyRich(slug) {
      var node = document.getElementById('sig-' + slug);
      var html = node.innerHTML;
      if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
        return navigator.clipboard.write([new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([node.innerText], { type: 'text/plain' })
        })]).catch(function () { copyBySelection(node); });
      }
      copyBySelection(node);
      return Promise.resolve();
    }

    function copyBySelection(node) {
      var range = document.createRange();
      range.selectNodeContents(node);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      selection.removeAllRanges();
    }

    function copyText(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).catch(function () { copyTextFallback(text); });
      }
      copyTextFallback(text);
      return Promise.resolve();
    }

    function copyTextFallback(text) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    document.addEventListener('click', function (event) {
      var button = event.target.closest('button');
      if (!button) return;
      if (button.dataset.copyRich) {
        copyRich(button.dataset.copyRich).then(function () { flash(button, 'Copiada!'); });
      } else if (button.dataset.copySource) {
        copyText(SOURCES[button.dataset.copySource]).then(function () { flash(button, 'Código copiado!'); });
      }
    });

    document.querySelector('.search input').addEventListener('input', function (event) {
      var term = event.target.value.trim().toLowerCase();
      var visible = 0;
      document.querySelectorAll('[data-group]').forEach(function (group) {
        var shown = 0;
        group.querySelectorAll('.card').forEach(function (card) {
          var match = !term || card.dataset.search.indexOf(term) !== -1;
          card.style.display = match ? '' : 'none';
          if (match) shown++;
        });
        group.style.display = shown ? '' : 'none';
        visible += shown;
      });
      document.querySelector('.empty').style.display = visible ? 'none' : 'block';
    });
  </script>
</body>
</html>`
}
