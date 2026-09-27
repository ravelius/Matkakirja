# Sisältökirjurin aloitusviesti (27.9.2026 klo ~20.3x, kontekstin nollaus)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri
(haara sisalto-pelikatalogi-20260927). Ensimmäinen komento:
`git fetch origin main`. Lue CLAUDE.md, docs/roolitus.md ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-i.md KOKONAAN
ennen töiden aloitusta.

TILA lyhyesti: Kaksi rinnakkaista ohjelmaa käynnissä, molemmat Fablen
27.9. tilauksia.

**A) Euroopan faktatarkistus** — PR #3473 (draft), 17 korjausta
tehty (Pariisi/Lontoo/Berliini/Madrid/Wien/Ateena; Rooma 0 virhettä).
Istanbul ei aloitettu.

**B) Maakuntien pulu** (Livian kysymykset) — PR #3472 (draft), NLD+CHE
(41 aluetta) valmis. Jonossa: CZE, HUN, PRT, SWE, NOR, DNK, FIN, IRL,
BEL, HRV, + loput.

JONO (järjestyksessä):

1. **KIIREELLISIN**: aja koko testisarja molemmissa worktreeissä
   (`node --test tests/*.test.mjs` sekä
   `wt/sisaltokirjuri-faktatarkistus-e1`:ssä että
   `wt/sisaltokirjuri-maakunta-pulu-e1`:ssä) — kumpaakaan ei ehditty
   ajaa loppuun tässä sessiossa. Faktatarkistus-haarassa oli 1 FAIL
   aiemmassa ajossa (13 korjauksen jälkeen, ennen viimeisiä 4) —
   selvitä mikä testi ja korjaa. Kun molemmat vihreitä, poista PR:ien
   draft-tila.
2. Faktatarkistus jatkuu: Istanbul, sitten Fablen ohjeen mukaan
   seuraavat (ehdotus: Tukholma/Bukarest/Pietari/Lissabon/Sofia/
   Helsinki — tuoretta, tarkistamatonta sisältöä Eurooppa-erä 7-9:stä).
3. Maakunta-pulu jatkuu prioriteettijärjestyksessä: CZE seuraavaksi
   (myös pitkä-luonnehdinta puuttuu CZE:ltä, tee molemmat samassa
   erässä), sitten HUN/PRT/SWE/NOR/DNK/FIN/IRL/BEL/HRV.

Täydet perustelut, menetelmät ja tarkat löydöslistat:
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-i.md ja
docs/raportit/sisaltokirjuri-faktatarkistus-eurooppa-20260927.md.

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- Kohderyhmä 13+, EI lastenpeli.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan. HUOM: agentti voi
  itse käynnistää alaagentteja (nested) ilman lupaa — tämä nostaa
  todellista rinnakkaisuutta yli rajan huomaamatta. Kirjaa agenttien
  löydökset TIEDOSTOON heti (älä jätä pelkkään kontekstiin) —
  pitkät handback-viestit täyttävät kontekstin nopeasti kun useita
  tulee peräkkäin.
- Älä mergaa checkout-haaraa (sisalto-pelikatalogi-20260927) äläkä
  poista sitä --delete-branch-lipulla.
- VAIN EUROOPPA on maantieteellinen rajaus.
- Main liikkuu useita committeja tunnissa: fetch+rebase juuri ennen
  pushia. js/muutokset.js-konfliktit ovat rutiinia (versionumerorivit)
  — oma rivi ylimmäksi, numero main+1, main.js+sw.js samaan lukuun.
