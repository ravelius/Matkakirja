# Pelikoodarin luovutus 23.9.2026 (klo 11.00)

Työhakemisto `/Users/samireivinen/Matkakirja-pelikoodari` (rooli-worktree;
erät omiin haaroihin temp-worktreissä `/Users/koodaus/wt-pelikoodari-*`).
Node 22: `node --test "tests/*.test.mjs"`. Savukkeet paikallisesti:
`CHROMIUM="" PLAYWRIGHT_JS=/Users/samireivinen/Matkakirja-fable/node_modules/playwright/index.js NODE_USE_ENV_PROXY=1 SAVUKE_MOOTTORI=webkit node tools/savukkeet/<x>.mjs`.
Edellinen luovutus: `viesti-pelikoodari-luovutus-20260923-yo.md`.

## Tilanne: nykimisen etsintä

Omistajan kierroksilla poissuljettu: kehysaika (js/render), tekstuurilataukset (eivienti ja vientibudjetti eivät auttaneet), puskurit, häivytys,
pikselisuhde, alfakanava, 60/120 Hz. Ainoa myönteinen signaali:
`?koe=syotetouch` "ehkä parempi". Nyt omistaja riisuu kartan (paljas).

**Tuotannossa (v2139–v2145):**
- kehysprofiili p5: liike- ja syöterivit overlayssa (#2876)
- vientibudjetti kokeena `?koe=vientibudjetti` (#2878)
- Syötekoe-valikko 1–4: Oletus, Kosketus suoraan, Yhteinen kello,
  Molemmat; mittauslippu lukee tallennetun (#2880)
- Syötekoe 5–8: Paljas kartta + pikavalinnat (#2885) ja Kerrokset-
  kytkimet (9 ryhmää, `?koe=paljas,kerros-<avain>`) (#2889)

## Avoimet PR:t

| PR | haara | sisältö |
| --- | --- | --- |
| #2902 | `pelikoodari-suoraan-kartalle` | **Etusijalla.** Testitila "Suoraan kartalle" (`matkakirja-suoraan-kartalle`, `?koe=suoraan`): ei päivitysikkunaa, traileria, isokuvia, pulun välihuutoja eikä automaattista luentaa; merkintä kortissa heti. Vartija savuke-suoraan-kartalle 7/7. |
| #2898 | `pelikoodari-aanilisenssit` | Äänten lisenssiportti (js/lisenssi.js): inventaarion 23 NC/ND-äänitettä ei soi; vartija tests/aanilisenssit.test.mjs (NC-rivejä 24, saa vain pienentyä). |

## Jonossa

1. **Omistajan kierrokset** odottavat: Syötekoe 1–4 ja Paljas kartta
   (tila 5 ensin ilman kytkimiä, sitten ryhmä kerrallaan). Tulkinta:
   overlayn liike-rivin CV, nollat, tuplat ja syöte-rivin kosk / virheen sd.
   Jos Kosketus suoraan on mitatusti tasaisin → PR "touch oletukseksi
   kosketuslaitteilla".
2. **js/lahteet.js Äänet-osio (rivit ~245/251)** päivitetään, kun
   Sisältökirjurin NC-korvaukset ovat mainissa. Vartija
   `tests/aanilisenssit.test.mjs` kaatuu, jos luettelo väittää NC:tä ilman
   NC-dataa; laske samalla `TUNNETUT_NC_RIVIT`.
3. **Pohjan piirto häivytyksen aikana** (oma erä): kirjaston pohja (~400 dc)
   piirtyy 52–82 %:ssa vetokehyksistä, koska sisään häipyvä laatta ei peitä
   (`kerros.peittaaKokonaan()`). Korjaus: peittävyys laskee valmiin alla
   olevan laatan, tai vanha laatta jää alle kunnes häive on valmis. Mittari
   valmiina: savuke-vientibudjetti B4 (pohja-osuus dc > 200).
4. **Codexin kaksi Pulu-kohtausta** pelitapahtumiksi: `liviaEnsitapaaminen`
   → `uusi-ilahtuu` (4,4 s), `liviaPitkaKirjahaku` → `uusi-bookPanic`
   (11 s). Ehdot: `origin/claude/postilaatikko`
   `posti/codex-fable-pulun-lisakohtaukset-20260923.md`.

## Mittausvinkit

- Synteettinen veto (`__kehysprofiili.veto`) osuu panorointirajaan pitkissä
  vedoissa: edestakaisin 0,7 s / 400 px/s, ja arvioi vain liikkeen kehykset
  (kamera siirtyi viimeisen 240 ms:n aikana). `syote: 'ajastin'` jäljittelee
  iOS:n pointermovea.
- Muut kuin laattojen piirtokutsut tarkasti: laatat (`userData.laattakerros`)
  hetkeksi piiloon, yksi render (savuke-paljas-kartta).
- Tallennetun pelin lataus toistaa saapumissekvenssin (traileri 0,7–9,7 s,
  luenta ~10 s) ilman Suoraan kartalle -tilaa.
- `savuke-kerma-heti` V2 on punainen myös mainilla. Osa ääni-savukkeista
  (aanilataus, aanivoimat, etusivun-aani, pallolauta, varilaatat-pallo) ei
  käynnisty paikallisesti: kiinteä Playwright-polku.

## Opit

1. **Tarkista merge, jos lisäät PR:ään commitin jonon aikana.** #2883:n
   toinen commit (kytkimet) jäi pois mergestä (#2885); teko uudelleen
   erillisenä (#2889).
2. **Valikon valinnan on päädyttävä peliin asti:** kolmesti valikon koe ei
   vaikuttanut (nimiörunko luki vain osoitteen, syötelippu luki vain
   osoitteen, ablaatiotikkaan ui-kerros olisi piilottanut valikkonapin).
   Vartijan pitää katsoa pelin sisäinen tila latauksen jälkeen.
3. **Mittari ennen korjausta:** kehysaika näytti syyn, jota ei ollut;
   liikkeen tasaisuus ja kerrosten riisunta mittaavat sitä, mitä omistaja
   näkee.

## Tila ennen Macin uudelleenkäynnistystä 23.9.2026 (~12.5x)

- Kesken erä 1/3 (heiton tökkäys): haara `pelikoodari-heiton-tokkays` (200d68a9b, WIP, pushattu), worktree /Users/Shared/Claude/wt/pelikoodari-heiton-tokkays. Juurisyy: irrotuksen jälkeen 2 renderiä ilman siirtymää; liuku siirretty kirjaston tickiin (js/pallo.js `liu`/`liukuSyke`), mittari tools/savukkeet/mittaa-heitto.mjs: tökkäyksiä 10/19/10/3 → 1/0/0/0 (WebKit).
- Seuraava askel: node --test 0 fail, vartija (testi + savuke astro-pallo/lepopiirto), PR; sitten erä 2 (liu'un lopun pehmennys, pohjaksi tämä haara: VAUHTI_KYNNYS on asteina → pysähdys on lähellä nopea) ja erä 3 (symbolikerroksen rasterointi vedon aikana).
- Jonossa: Pulun orpo ele (Fablen viesti, posti/codex-…-orvon-eleen-omistajapaatos, postilaatikko 5bd844af6).
