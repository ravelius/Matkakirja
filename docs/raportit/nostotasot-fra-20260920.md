# Ranskan nostot kolmeen tasoon — 20.9.2026

Sisältökirjuri (Sonnet), Fablen tilaus. Omistaja hyväksyi kolmitasoisen
näkyvyysmallin nostoille:

- **Taso 1** (6–8 per maa): tunnetuimmat ja pelillisesti tärkeimmät —
  isompi nimiö + kuvamerkki kartalla.
- **Taso 2** (oletus, jos `taso`-kenttä puuttuu): nykyinen käyttäytyminen,
  piste + nimiö.
- **Taso 3** (ei populoitu tässä erässä): näkyy vasta lähizoomilla,
  pienet/paikalliset nostot. Kenttä on olemassa datamuodossa
  (`taso: 3` kelpaisi), mutta tämä erä keskittyi vain ykköstason
  valintaan Fablen tehtävänannon mukaisesti — kolmostason luokittelu
  jää myöhemmäksi.

Kenttä `taso: 1|2|3` lisätään suoraan nosto-objektiin, samassa
muodossa jokaisessa nostojoukossa (`maastokohteet-fra.js`,
`hahmotelma-fra.js`, `maalehtinostot-fra.js`). Puuttuva kenttä = taso 2.

**Huomio Pelikoodarille (kentän nimi ja käyttö):** `maalehtinostot-fra.js`
käyttää KORTTI LEHDEN NOSTOSTA -mekanismia (`JAKO.map(korttiLehdesta)`,
ks. docs/raportit/nostotekstit-fra-20260920.md), jossa raaka
`JAKO`-rivi muunnetaan kortiksi funktiolla `korttiLehdesta`. `taso`
piti lisätä KAHTEEN paikkaan: raakariville (`taso: 1`) JA
`korttiLehdesta`-funktion paluuarvoon (`...(rivi.taso ? { taso: rivi.taso } : {})`),
koska funktio ei automaattisesti kopioi tuntemattomia kenttiä läpi —
muuten kenttä olisi hävinnyt näkymättömiin ilman virhettä.

## Ykköstason valinta (8 nostoa, Fablen ehdotuslistalta)

Kaikki 9 Fablen ehdottamaa nimeä löytyivät datasta (Mont-Saint-Michel,
Versailles, Lascaux, Mont Blanc, Pont du Gard, Chambord, Carcassonne,
Étretat, Dune du Pilat) — "enintään 8" vaati yhden pudottamisen.
Pudotin **Dune du Pilatin**: se on hieno ja jo hyvin dokumentoitu
nosto, mutta Étretat'n liitukalliot ovat kansainvälisesti
tunnetumpia (impressionistien, mm. Monet'n, maalaamina) ja täyttävät
saman "rannikon luonnonihme" -roolin paremmalla tunnettuudella.

| Nosto | Tiedosto | Tyyppi | Perustelu |
| --- | --- | --- | --- |
| Mont-Saint-Michel | maastokohteet-fra.js | kulttuuri | Ranskan tunnetuin yksittäinen nähtävyys, Unesco-kohde, vuorovesi-ilmiö |
| Versailles (peilisali) | maalehtinostot-fra.js | kulttuuri | Maailmankuulu palatsi, keskeinen historiallinen tapahtumapaikka (rauhansopimukset) |
| Lascaux | maastokohteet-fra.js | historia | Maailman tunnetuimpia kivikautisia luolamaalauksia |
| Mont Blanc | maastokohteet-fra.js | vuori | Länsi-Euroopan korkein huippu, ikoninen maamerkki |
| Pont du Gard | maastokohteet-fra.js | tekniikka | Parhaiten säilynyt roomalainen akvedukti, Unesco-kohde |
| Chambordin linna | maastokohteet-fra.js | kulttuuri | Loiren laakson tunnetuin ja suurin linna |
| Carcassonnen linnoituskaupunki | maastokohteet-fra.js | historia | Euroopan suurin säilynyt keskiaikainen linnoituskaupunki |
| Étretat | hahmotelma-fra.js | meri | Kuuluisat liitukalliot ja luonnonkaaret, impressionistien innoittaja |

## Ei-valitut, jotka olivat lähellä

Dune du Pilat (maalehtinostot-fra.js, Euroopan korkein hiekkadyyni) —
jää tasolle 2. Muita hyviä ehdokkaita tuleviin kierroksiin, jos
ykköstasoa laajennetaan: Avignonin paavinpalatsi, Bayeux'n
seinävaate, Millaun silta (kaikki nousivat esiin myös
nostotekstit-fra-raportin "liian pitkät" -listalla — pitkä, laadukas
teksti on toinen tunnusmerkki pelillisesti tärkeästä kohteesta).

## Testit

`node tools/tarkista-kaksoisavaimet.mjs` ja `node --test tests/*.test.mjs`:
0 kaatunutta, ei kaksoisavaimia.
