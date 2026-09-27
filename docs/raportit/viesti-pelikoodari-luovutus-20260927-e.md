# Pelikoodarin luovutus 27.9.2026 klo 21.0x (-e, kontekstin nollaus Fablen käskystä)

Jatkoa luovutukselle `-d` (16.2x). Fable pyysi nimeä `-d.md`, mutta se on jo edellinen luovutus — tämä on `-e`, jotta
historia säilyy. Tarkista PR:t: `gh pr list --author @me --state all --limit 30`. Fablelle viestit session id:llä
(local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc), rooleille NIMELLÄ (`Julkaisija (Opus)`, `Natiivi-UI (Opus)`, `Siirtoseppä (Opus)`).

## 1. PR:t tänä iltana

| PR | Sisältö | Tila 21.0x |
|---|---|---|
| #3410 | projektisivusto (Eurooppa-pallokuva, iOS-versio muutoslokista) | tuotannossa |
| #3421, #3422, #3431, #3440 | elämäpalkki, luenta aina, Livian lyhyt avaus + Fablen repliikit | mainissa |
| #3438 | TEKIJÄMERKINNÄT: js/kuvatekija.js (taydennaLahde), js/packs/commons-tekijat.js (439 riviä, tools/hae-commons-tekijat.mjs), tools/kuvatekijat.mjs, vartija tests/kuvatekijat.test.mjs, Tekijät ja lähteet -rivit; aarrekuvan HAVAINNEKUVA-merkki POISTETTU (omistaja 18.3x) | junassa / mainissa |
| #3439 | pollo-KV: laskurivirhe ei kaada, kuukausilaskurit harvoina, kehittäjä ei kirjoita päivälaskuria | mainissa |
| #3443 | elämäpalkki oranssi, 3 vasenta (viimeiset 18 h) punaisina | mainissa |
| #3469 | Pulun virtaluenta rampilla 150→450→1350→2400: 6 → 2 puhepyyntöä, palaväli 0,22 s ennallaan | mainissa |
| **#3475** | Kreikan 14 maakuntasalaisuutta → hahmotelmanostoiksi (js/packs/hahmotelma-grc.js); Alonnisos → `hahmotelma-sporadien-meripuisto` (Fable 20.3x); kärki 9df445c9, v2340 | **junassa yhdessä Siirtosepän #3479 (skeema 1.55, mekanismin poisto) kanssa** |
| **#3480** | raha "400 £" sitovalla välilyönnillä kaikkialla webissä + vartija | **junassa** |
| **#3485** | SAAVUTETTAVUUS C web: 55 toissijaista tekstiä → #595046, kysymyksen kaupunki/sekunnit → #624c2d, fact-card h2 #6a4a12, valikon "päällä" täysi kulta, karttaselitteen rivit **32 px** (Fable 20.3x, ei 44), `tools/pariteettikuvat.mjs --kontrasti` | **LUONNOS — Fable vie kuvaparin (web + natiivi) omistajalle; merge vasta sen jälkeen.** v2340 törmää #3475:een → aja uusi-versio.mjs ennen mergeä |

Kuvat: `proto-3d/lokit/{tekijamerkinnat,elamapalkki-varit,livia-lyhyt,raha-muoto,saavutettavuus-c}/` (kuvapari-*.png).

## 2. JONO SEURAAVALLE

1. **Puhemittaus natiivissa** (Fable: Pulu + nostojen luenta, 1. ääni ja katkot). Valmis käännös (634028a2 = master 1.0.30 +
   haara `pelikoodari/kehittajakoodi-komento` 4f062010) on talletettu: `proto-3d/lokit/puhemittaus/Matkakirja3D-kehittajakoodi.app`
   → asenna `xcrun simctl install A2FD9C9F… <polku>` (ÄLÄ aja proto-kaanna.sh:ta TF-viennin aikana). Skripti
   `proto-3d/lokit/puhemittaus/puhemittaus.sh`. Uudet testikomennot: `kehittaja koodi|pois|tila` (koodi kertakäyttötiedostosta
   Documents/kehittaja-koodi.txt, jonka skripti kirjoittaa avaintiedoston muuttujasta — arvoa ei tulosteta), `puhe katkot`,
   `puhe virta` (→ 1. ääni + katkot ms), `ui nostonappi kaiutin`, `ui chat aani`.
   **SÄÄNTÖ (Fable 18.3x): puhetestit vain säilötyllä (lohkollisella) tekstillä ja oletusäänellä; Pulun virtaluenta ja
   kehittäjäkoodilla säädetty puhe ≤ 5 000 mrk/vrk/rooli.** Skriptin `puhe lue` käyttää vielä joka kerta uutta tekstiä (aikaleima)
   → vaihda kiinteään lyhyeen tekstiin ennen ajoa, Pulu-kysymys kerran. Simulaattori vain Julkaisijan "nyt"-kuittauksella
   ja booted < 2; sammuta UDID:llä lopuksi. Haara `pelikoodari/kehittajakoodi-komento` on vain mittausta varten (merge-pyyntö
   Natiivisepälle erikseen, jos komennot halutaan masteriin; koskee myös Natiivi-UI:n tiedostoja Nostokortti/KortinLukija/PuluChat).
2. **Saavutettavuus C** jatko: odota Fablen/omistajan kuittaus kuvapariin → poista #3485:n luonnostila, versio, junaan.
3. Pulun ramppi natiivissa ei vaadi muutosta (natiivi lukee valmiin vastauksen VirtaPalat-rampilla).

## 3. OPIT

- **Vartija osuu oikeisiin puutteisiin**: #3438 kaatui junassa mainiin tulleeseen uuteen CC BY -kuvaan ilman tekijää —
  korjaus `node tools/hae-commons-tekijat.mjs --kirjoita` (hakee nyt myös tekija-puuttuu-luokan).
- `siisti()` (tools/commons-siisti.mjs) on NIMILLE: lisenssiteksti "CC BY 2.5" katkesi "2.5":ksi by-säännöllä → lisenssi ilman sitä.
- Vientiskeema johtaa kentät datasta: datan poisto = skeemamuutos → Siirtosepän asia (skeemasopimus --paivita).
- Mergessä `git checkout --theirs sw.js` pyyhkii omat SHELL-rivit — lisää ne takaisin ennen committia (sw.test kertoo).
- Headless-ajossa Livian ensimmäisen avauksen toinen kupla ei tule (ensiliito ei laskeudu) — sama mainissa, ei vika.
- Kontrastimittari: tekstit kuvataustan päällä (kartta, pergamenttikuvio) antavat vääriä hälytyksiä → tarkista kuvasta.

## 4. AKTIIVISET WORKTREET

`wt/pelikoodari-raha-muoto` (#3480), `wt/pelikoodari-saavutettavuus-c` (#3485), `wt/pelikoodari-tekijamerkinnat` (#3438),
`wt/pelikoodari-salaisuudet-nostoiksi` (#3475) — poista mergen jälkeen `tools/uusi-worktree.sh --poista <nimi>`.
`wt/pelikoodari-vanha-checkout` on symlinkki vanhaan kotihakemistoon (Fable päättää).
