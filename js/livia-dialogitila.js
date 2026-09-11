/* Native dialogien top layer seuraa avausjärjestystä, ei DOM-järjestystä.
 * Sama tilanne ohjaa napin kotia ja kaikkia eleitä, myös odotusta/ääntä.
 * Omistajan T1-päätös v1748: muut dialogit ovat reaktioille hiljaisia. */
const LIVIAN_REAKTIODIALOGIT = new Set(['arrival-dialog', 'passport-dialog', 'quiz-dialog']);
const LIVIAN_NAPPIDIALOGIT = new Set([...LIVIAN_REAKTIODIALOGIT, 'wiki-dialog', 'nahtavyys-dialog']);
const dialogitilat = new WeakMap();
const onDialogi = el => el?.localName === 'dialog';

function dialogitila(doc) {
 if (dialogitilat.has(doc)) return dialogitilat.get(doc);
 const avoimet = () => [...(doc.querySelectorAll?.('dialog[open]') || [])].filter(onDialogi);
 let pino = avoimet();
 const kuuntelijat = new Set();
 function paivita(tietueet = []) {
  const ennen = pino.at(-1) || null;
  pino = pino.filter(el => el.open && el.isConnected);
  // Saman mikrotehtävän sulje/avaa nostaa dialogin uudelleen päällimmäiseksi.
  for (const r of tietueet) {
   if (r.type === 'attributes' && onDialogi(r.target) && r.target.open && r.oldValue === null) {
    pino = pino.filter(el => el !== r.target);
    if (r.target.isConnected) pino.push(r.target);
   }
  }
  for (const el of avoimet()) if (!pino.includes(el)) pino.push(el);
  const nyt = pino.at(-1) || null;
  if (nyt !== ennen) for (const fn of kuuntelijat) fn(nyt, ennen);
  return nyt;
 }
 const sisaltaaDialogin = el => onDialogi(el) || Boolean(el.querySelector?.('dialog'));
 const vahti = typeof MutationObserver === 'function' ? new MutationObserver(rs => {
  if (rs.some(r => onDialogi(r.target) && r.attributeName === 'open' ||
    r.type === 'childList' && [...r.addedNodes, ...r.removedNodes].some(sisaltaaDialogin))) paivita(rs);
 }) : null;
 vahti?.observe(doc.documentElement || doc.body, { subtree: true, childList: true,
  attributes: true, attributeFilter: ['open'], attributeOldValue: true });
 const tila = {
  ylin: () => paivita(vahti?.takeRecords?.() || []),
  kuuntele(fn) {
   kuuntelijat.add(fn);
   return () => {
    kuuntelijat.delete(fn);
    if (!kuuntelijat.size) { vahti?.disconnect(); dialogitilat.delete(doc); }
   };
  },
 };
 dialogitilat.set(doc, tila);
 return tila;
}

export function livianYlinDialogi(doc) { return dialogitila(doc).ylin(); }
export function seuraaLivianDialogeja(doc, fn) { return dialogitila(doc).kuuntele(fn); }
export function livianDialogikoti(doc) {
 const ylin = livianYlinDialogi(doc);
 return LIVIAN_NAPPIDIALOGIT.has(ylin?.id) ? ylin : null;
}
export function livianDialogiSalliiReaktion(doc, nappi) {
 const ylin = livianYlinDialogi(doc);
 return !ylin || LIVIAN_REAKTIODIALOGIT.has(ylin.id) && nappi.closest?.('dialog[open]') === ylin;
}
