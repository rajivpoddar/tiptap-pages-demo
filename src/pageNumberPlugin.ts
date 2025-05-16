// src/pageNumberPlugin.ts
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Node as PMNode } from '@tiptap/pm/model';

export const pageNumberPluginKey = new PluginKey('pageNumberInjector');

interface FooterChange {
  paraContentStartPos: number;
  currentContentSize: number;
  newText: string;
}

export const PageNumberExtension = Extension.create({
  name: 'pageNumberExtension',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: pageNumberPluginKey,
        appendTransaction(transactions, oldState, newState) {
          let paginationMetaFound = false;
          for (const tr of transactions) {
            if (tr.getMeta('pagination')) {
              paginationMetaFound = true;
              break;
            }
          }

          if (!paginationMetaFound && newState.doc.eq(oldState.doc)) {
            return null;
          }

          const { doc, schema } = newState;
          const changes: FooterChange[] = [];

          const pageNodes: { node: PMNode, offset: number }[] = [];
          doc.forEach((node, offset) => {
            if (node.type.name === 'page') {
              pageNodes.push({ node, offset });
            }
          });
          const totalPages = pageNodes.length;

          pageNodes.forEach(({ node: pageNode, offset: pageOffset }, index) => {
            const currentPageNum = index + 1;
            pageNode.forEach((regionNode, regionOffsetInPage) => {
              if (regionNode.type.name === 'header-footer' && regionNode.attrs.type === 'footer') {
                const footerContentParagraph = regionNode.firstChild;
                if (footerContentParagraph && footerContentParagraph.type.name === 'paragraph') {
                  const paragraphNodeAbsStartPos = pageOffset + 1 + regionOffsetInPage + 1;
                  const paraContentStartPos = paragraphNodeAbsStartPos + 1;
                  const currentContentSize = footerContentParagraph.content.size;
                  const currentText = footerContentParagraph.textContent;
                  const newText = `Page ${currentPageNum} of ${totalPages}`;

                  if (currentText !== newText) {
                    changes.push({
                      paraContentStartPos,
                      currentContentSize,
                      newText,
                    });
                  }
                }
              }
            });
          });

          if (changes.length === 0) {
            return null;
          }

          const trToDispatch = newState.tr;
          // Sort changes by position in descending order to apply them safely
          changes.sort((a, b) => b.paraContentStartPos - a.paraContentStartPos);

          changes.forEach(change => {
            if (change.currentContentSize > 0) {
              trToDispatch.delete(change.paraContentStartPos, change.paraContentStartPos + change.currentContentSize);
            }
            if (change.newText.length > 0) {
              trToDispatch.insert(change.paraContentStartPos, schema.text(change.newText));
            }
          });
          
          return trToDispatch.docChanged ? trToDispatch : null;
        }
      }),
    ];
  },
}); 