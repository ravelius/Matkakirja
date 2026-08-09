# Sonnet 1:n tilannekuva — jatka tästä /clearin jälkeen

*Käsittelykuva, jotta QA-työ jatkuu kontekstin nollauksen yli. Lue tämä
ENSIN, sitten `CLAUDE.md` ja `docs/roolitus.md`.*

## Kuka olen

- **Sonnet 1 — tarkastaja: QA ja työhuone.** Malli `claude-sonnet-5`.
  Oma sessio-id: `session_01MAirFte9MpE1HnVRpCj2Mb` (ks. roolitus.md).
- Raportoin VAIN Fablelle (`create_trigger` + `persistent_session_id`,
  `run_once_at` ~2 min päähän jos Fable on kesken vuoron), en suoraan
  omistajalle. Fable raportoi omistajalle.
- Vain lukevia tehtäviä tai täsmälleen ohjeistettuja mekaanisia
  muutoksia. Ei versionostoja eikä mergejä ilman Fablen tehtävänantoa.

## TV-napit — kuittaus

**TV-napit on POISTETTU pelistä kokonaan (v434, omistajan päätös
9.8.).** Tarkistin: yksikään omista kirjauksistani (arkistoitu
QA-raportti, tyohuone.html, js/tyohuone-tilanne.js,
js/tyohuone-kehitys-data.js) ei maininnut tv-nappia — ei siis mitään
poistettavaa niistä. En lisää tv-toimintoja takaisin enkä käynnistä
tv-/videostriimiselvitystä. Radio ja uutiset säilyvät QA:n piirissä
ennallaan.

**Sivuhavainto (kirjattu, ei korjattu — ei oman PR:n välitön
edellytys, kustannuskuri-sääntö 1):** `css/styles.css:8194` sisältää
yhä vanhentuneen kommentin *"Mediarivi: maan radio ja tv-nappi
vierekkäin"*. Harmiton (pelkkä kommentti), mutta kannattaa siivota
kun joku muutenkin koskee sitä tiedostoa.

## Mitä olen tehnyt (kaikki mainissa)

1. **Aineiston QA-kierros** (331 ääntä, ~1800 kuvaa, peilin kattavuus,
   muutoslokin muotosäännöt) — raportti arkistoitu:
   `docs/arkisto/qa-raportti-2026-08-08.md`. Nolla oikeaa virhettä;
   kaksi poiminnan väärää positiivia raportoitu (kommentti- ja
   proosaosumat `tools/peilaa-media.mjs`:n regexissä, ei korjattu —
   ei omaa tiedostoani).
2. **Työhuoneen Kehitys-välilehti** (PR #475, v352): iso kaari,
   ääninäytteet, Euroopan tekstit+äänet, mannerkokeilut. Muut sessiot
   ovat sittemmin lisänneet sisältöä samaan välilehteen (mm. "Isoisä
   äänessä" -kokeilut) — rakenne on pitänyt, ei törmäyksiä.
3. **Työhuoneen kokonaisuudistus** (PR #482, v356): 7 välilehteä → 5
   (Tilanne/Testaa/Kehitys/Kaupungit/Studio). Mikään sisältö ei
   hävinnyt — Suunnitelma+Käsikirja siirtyivät "Dokumentit ja
   suunnitelma" -harmoonaan Tilanteen loppuun. Vahvistettu mainista
   (v434 asti): nav-rakenne on yhä 5 välilehteä, ei regressiota.

Matkan varrella kaksi versionumerotörmäystä rinnakkaisten sessioiden
kanssa (v351→v352, v355→v356) — molemmat malliesimerkkeinä
roolitus.md:n julkaisusäännöissä.

## Seuraavaksi (roolitus.md:n työjonon mukaan, ei vielä aloitettu)

- **Iso loppu-QA koko Euroopalle ennen omistajan testiä.** Peli on
  kasvanut merkittävästi viimeisen QA-kierroksen jälkeen (uusia
  kaupunkilehtiä, kohdekarttoja, nähtävyysjuttuja, isoisä-kaari-
  kokeiluja) — tämä kierros pitää tehdä nykytilaa vasten, ei vanhaa
  raporttia päivittäen.
- Odottaa Fablen tehtävänantoa ennen aloitusta (ei versionostoja/
  mergejä ilman sitä).

## Julkaisumekaniikka (kertaus)

`git fetch origin main` JUURI ennen versionumeron valintaa. Kaava:
`sw.js` CACHE + `js/main.js` APP_VERSION samaan versioon; rivi
`js/muutokset.js`:ään (≤60 merkkiä, ei loppupistettä, uusin ylin);
`node --test tests/*.test.mjs`; `node tools/tarkista-kaksoisavaimet.mjs`;
`node tools/build-standalone.mjs`. Squash-merge "(vNNN) (#PR)". Mergen
jälkeen oma haara nollataan mainiin (`git checkout -B <haara>
origin/main` + `push --force-with-lease`). Pelkkä docs-muutos (kuten
tämä tiedosto) EI nosta versiota.
