# Pelikoodarin luovutus 23.9.2026 (yö, klo 00.32)

Työhakemisto `/Users/samireivinen/Matkakirja-pelikoodari` (rooli-worktree;
erät omiin haaroihin temp-worktreissä `/Users/koodaus/wt-pelikoodari-*`).
Node 22: `node --test "tests/*.test.mjs"`. Savukkeet paikallisesti:
`CHROMIUM="" PLAYWRIGHT_JS=/Users/samireivinen/Matkakirja-fable/node_modules/playwright/index.js NODE_USE_ENV_PROXY=1 SAVUKE_MOOTTORI=webkit node tools/savukkeet/<x>.mjs`.
Edellinen luovutus: `viesti-pelikoodari-luovutus-20260922-yo2.md`.

## Tilanne

Omistajan iPhonen käynnistysvika oli laitteen tila, ei koodi. Illan aikana
tuotantoon v2130–v2138: koetila overlayhin (#2854), profiili p4 (#2857),
orvot globe.gl-tickerit pois (#2859), koe 7 eihaivevedossa (#2861),
valikon siivous (#2863), koevaihto lataa sivun + 4 tilan Piirtokoe-valikko
(#2866).

**Poissuljettu omistajan kierroksilla** (iPhone ja iPad): kehysaika
(js/render), tekstuurilataukset (eivienti "tökkii yhtä pahasti"),
puskurikirjoitukset, häivytys, pikselisuhde, alfakanava, 60/120 Hz
(Safarin lippu). **Ainoa myönteinen signaali:** `?koe=syotetouch` "ehkä
parempi" → syöteputki.

## Avoimet PR:t

| PR | haara | sisältö |
| --- | --- | --- |
| #2875 | `pelikoodari-liikemittari` | **PÄÄTYÖ.** Kehysprofiili p5: liike- ja syöterivit overlayhin (siirtymä ka/CV, nollat, tuplat, syötettä/kehys, ilman, ikä, virhe ka/sd) + `?koe=syotekello` (kehyksen yhteinen kello). Vartija savuke-liikemittari 5/5. |
| #2877 | `pelikoodari-vientibudjetti` | Koe `?koe=vientibudjetti` (opt-in, oletus ennallaan; korvaa suljetun #2874). Vartija savuke-vientibudjetti 7/7; savuke-eihaive-veto arvioi vain liikkeen kehykset. |

## Seuraavaksi

1. **Omistajan aamukierros #2875:n jälkeen** (kehysprofiili päällä, 10 s
   veto kussakin): oletus, `?koe=syotetouch`, `?koe=syotekello`,
   `?koe=syotetouch,syotekello`. Vertaa liike-rivin CV, nollat, tuplat
   ja virheen sd. Syotetouchin odotus: kosk ≈ 1,00/kehys, ilman ≈ 0.
   Jos touch on mitatusti tasaisin → PR "touch oletukseksi
   kosketuslaitteilla (interp hiirelle)". Ei oletusmuutosta ennen tätä.
2. **Oma erä (Fablen ehdotus):** kirjaston pohja (~400 dc) piirtyy
   52–82 %:ssa vetokehyksistä, koska häipyvä laatta ei peitä
   (`kerros.peittaaKokonaan()` epätosi häiveen ajan). Korjaus ilman
   vientibudjettia: peittävä (vanha/karkea) laatta alle, kunnes häive on
   valmis, tai peittävyyden laskenta niin, että sisään häipyvän alla oleva
   valmis laatta riittää.
3. **JONOSSA (Fable 23.9.2026, vasta mittarin ja aamun jälkeen):** Codexin
   kaksi Pulun lisäkohtausta pelitapahtumiksi — `liviaEnsitapaaminen` →
   `uusi-ilahtuu` (4,4 s) ja `liviaPitkaKirjahaku` → `uusi-bookPanic`
   (11 s). Ehdot sanatarkasti: `origin/claude/postilaatikko`
   `posti/codex-fable-pulun-lisakohtaukset-20260923.md` (omat tunnukset ja
   kestot rekisteriin, ei globaalia welcome/bookStudy-korvausta,
   toistokielto, keskeytys kun vastaus tulee, piilosta palaaminen, reduced
   motion, ei uutta audiota/cueja).

## Mittausten tulkinta

- Overlayn "laattavientejä" on 3 s:n jaksolta (ei 10 s).
- **Synteettinen veto** (`__kehysprofiili.veto`) pysäyttää kameran
  panorointirajaan pitkissä vedoissa: mittaa edestakaisin lyhyillä
  vedoilla (0,7 s, 400 px/s) ja arvioi vain liikkeen kehykset (kamera
  siirtyi viimeisen 240 ms:n aikana). Uusi `syote: 'ajastin'` jäljittelee
  iOS:n pointermovea (omalla ajastimellaan), `kuorma` pääsäikeen työtä.
- WebKit iOS-tyylisellä syötteellä: interp CV 17–23 %, syotekello 12–20 %,
  interpvanha 46–54 % (nollat 37–44), tahdistettu syöte 14–16 %.
- `savuke-kerma-heti` V2 on punainen myös mainilla (Ranska σ ≈ 0,7 vs
  Saksa ≈ 11). `savuke-varilaatat-pallo` ja `savuke-pallolauta` eivät
  käynnisty paikallisesti (kiinteä Playwright-polku).

## Opit

1. **Kehysaika ei ole tuntuma.** Yli 20 ms:n kehysten putoaminen 25 % →
   8 % ei muuttanut omistajan kokemusta. Mittaa sitä, mitä silmä näkee:
   kartan liike sormen alla.
2. **Synteettinen veto voi mitata seinää.** Pitkä veto osui
   panorointirajaan, ja "nollat" ja virhe 100+ px olivat rajan, eivät
   syötteen. Tarkista vertailuajo (tahdistettu syöte ilman nollia) ennen
   kuin tulkitset.
3. **Pienen muutoksen suuri sivuvaikutus:** häive + peittävyysehto piirsi
   koko kirjaston pohjan valtaosassa vetokehyksistä. dc-piikki pisimmässä
   kehyksessä kertoi siitä ensimmäisenä.
