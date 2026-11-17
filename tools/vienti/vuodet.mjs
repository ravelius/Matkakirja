/*
 * NOSTON VUODET (skeema 1.74; Pelikoodari 17.11.2026, suunnitelma 20261117-noston-vuosiluvut luku 1 ja 6.3, omistaja P-261117-70–72):
 * SK:n käsin kirjoittamat rivit [{ kohta, vuosi, selite }] sellaisenaan merkkijonoina. kohta = sanatarkka pätkä luettavasta tekstistä
 * (todiste ja ajoituksen ankkuri), vuosi näytetään sellaisenaan ("1876–1878", "72", "19 eaa."), selite 1–3 sanaa. Säännöt vahtii
 * tests/noston-vuodet.test.mjs; vienti ei korjaa eikä karsi rivejä. Ei kenttää tai tyhjä = null (ei lappua).
 */
export function nostonVuodet(v) {
  if (!Array.isArray(v) || v.length === 0) return null;
  return v.map((r) => ({
    kohta: String(r?.kohta ?? ''),
    vuosi: String(r?.vuosi ?? ''),
    selite: String(r?.selite ?? ''),
  }));
}
