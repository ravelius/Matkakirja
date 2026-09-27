# Sisältökirjurin aloitusviesti (27.9.2026 klo ~15.0x, kontekstin nollaus)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri
(haara sisalto-pelikatalogi-20260927). Ensimmäinen komento:
`git fetch origin main` (liikkuu nopeasti, useita PR-junia rinnakkain).
Lue CLAUDE.md, docs/roolitus.md ja
docs/raportit/viesti-sisaltokirjuri-luovutus-20260927-g.md KOKONAAN
ennen töiden aloitusta.

TILA lyhyesti: Lähi-idän/Novosibirskin/0-0-kaupunkien erä PERUUTETTIIN
omistajan päätöksellä 27.9. — älä koske niihin. Sen sijaan käynnissä
on **Euroopan ohuimpien lehtikaupunkien erä** (Fablen tilaus, jatkuu):
PR #3419 avoinna (Valletta+Luxemburg+Lappi+Sisilia+Kreeta+
Islanti+Alpit+Tromssa+Marseille+Riika, 3 committia) — tarkista onko
mergetty. Jatka samasta worktreesta
/Users/Shared/Claude/wt/sisaltokirjuri-euroopan-ohuimmat.

JONO (järjestyksessä):

1. **EUROOPAN ERÄ 3**: seuraavat 5 ohuinta kaupunkia mittarilla
   (aiheet+lehtinostot+jutut+kulttuurinostot, ks. luovutusraportin
   kohta 3 — skripti ja ehdokaslista: barcelona, kiova, edinburgh,
   varsova, dubrovnik, sarajevo, odessa, vilna, krakova...). Kirjoita
   suoraan (ei pilottia), UUSI PR (ei #3419:ään enää). Tarkista AINA
   ensin: skandaalikiintiö (2-3/maa, moni jo katossa) ja onko
   kohdekarttaa (osa alue-ambiensseista ei ole pistekaupunkeja).
2. **Historian hetket**, kun Codex toimittaa kuvat postilaatikko-
   tilauksiin (kaksi erää lähetetty, ks. luovutusraportin kohta 4) —
   lisää js/packs/historian-hetket.js:ään, aja tarkista-nostopaikat.mjs.
3. **Codex-arviotilaus** kun PR #3413 on TUOTANNOSSA (MERGETTY jo
   27.9. — tarkista onko myös JULKAISTU): yhdistä 23 poikkeamaa + 7
   maalattua taustaa yhdeksi tilaukseksi postilaatikkoon.

Täydet perustelut ja menetelmät: docs/raportit/viesti-sisaltokirjuri-
luovutus-20260927-g.md kohta 3 (mittari+rajoitteet), kohta 4
(postilaatikkotilaukset).

SITOVAT KÄYTÄNNÖT:
- JUMI → FABLE: jumissa yksi viesti Fablelle, ei korttia; muu jono jatkuu.
- VIESTIRAJA: SendMessage ~10/vuoro; varakanava mcp send_message session id:llä.
- Kohderyhmä 13+, EI lastenpeli.
- Agentit vain Sonnet/Opus, enintään 3-4 rinnan; käytä isolation:"worktree"
  jos agentin pitää työskennellä erillään jaetusta checkoutista.
- Älä mergaa checkout-haaraa (sisalto-tyo-<pvm>-<aika>) äläkä poista
  sitä --delete-branch-lipulla — se on session checkout, ei työhaara.
- Kuvien/assettien PR:ssä aja aina node tools/mittaa-miniatyyrit.mjs
  (sharp: symlinkkaa node_modules Matkakirja-fablesta jos puuttuu,
  ÄLÄ committoi symlinkkiä).
- Historian hetket vaativat AINA kuvaputken havainnekuvan — ei koskaan
  Commons-kuvaa eikä kuvatonta hetkeä. Kirjoita tekstit postilaatikkoon,
  ei suoraan historian-hetket.js:ään ilman kuvia.
- Main liikkuu useita committeja tunnissa: fetch+rebase juuri ennen
  pushia, ei aiemmin. js/muutokset.js-konfliktit ovat rutiinia
  (versionumerorivit) — ratkaisu luovutusraportin kohdassa 3.
