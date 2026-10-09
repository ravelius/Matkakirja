# Linssiseppä 2 – luovutus 9.10.2026 klo 16.2x (kontekstin nollaus 68 %, PT)

Rooli: Linssiseppä 2 (Opus, high): kaupunkinäkymän ilmakehä/valo, omat 3D-mallit peliin (putki + ämpäri), ISS-kyydin pinnat.
Proto: `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (paikallinen git, haarat `linssiseppa2/*`). Oma checkout `/Users/Shared/Claude/Matkakirja-linssiseppa-2`
(työhaara `linssiseppa2-tyo-20260928`). Edellinen luovutus: `viesti-linssiseppa-2-luovutus-20261009.md` (TILA-osiot 12.2x–15.5x).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se), tämä tiedosto.
- Testausmuisti: vain automaattiset testit + käännös; kuvat vain PT:n/omistajan pyynnöstä tai liikkuvista kohtauksista (Julkaisijan SIMULAATTORI NYT).

## Tila (16.2x)
- **Juna 173 (Natiivisepällä, PT kuittasi):** `linssiseppa2/pbr-173` a72f1ee21 (OmaMalli: normal/MR/AO-kartat, valo KAUPUNGIN auringosta
  `_IlmAurinko` – URP:n päävalo on kartan kameraa seuraava aurinko; osoitin `uusin-3.json` 173+:lle) ja `linssiseppa2/talvi-173` b64cb3b75
  (Karttasepän s2-eurooppa/talvi/v1 ISS-kyytiin; talvella S2 vain Euroopassa, muualla BMNG:n lumi). Testit 1209/1206 vihreät.
- **Omat mallit ämpärissä:** osoittimet `uusin.json` → v2/Giza (vanhat), `uusin-2.json` → **v6b** (170–172, v6 ilman Vasaa), `uusin-3.json` → v6c
  → **v6e pyydetty Julkaisijalta 16.2x** (PT hyväksyi). v6e = v6c + prefektuurin kortteli Google-sävyllä (leivottu dataan). v8 (KL v1.7, ND v5) ämpärissä, ei käytössä.
  Versiokansiot muuttumattomia; Julkaisija vie paketit (`_valmiit/omat-mallit-vienti-*` → arkistoidaan T7:lle `vienti-arkisto/`).
- **ND/KL:** omistaja hylkäsi ND v8:n ja KL v2b:n ("erinäköinen kuin Googlen rakennukset"). PT selvittää fotogrammetriamallit; päätös
  (fotogrammetria vs. Googlen tornit + oma laiva) PT:llä. Raportit: `docs/raportit/vertailu-nd-kl-valokuvat-20261009.md`,
  `google-nd-20261009.md` (Googlen ND = restaurointivaihe: nosturit, ei spiiraa), `vasa-riddarholmen-173-20261009.md`.
- **Tarvearvio** Pariisi/Tukholma mergetty (#4283).

## Pushatut, julkaisemattomat haarat (proto, paikallinen git)
| Haara | Kärki | Sisältö | Tila |
|---|---|---|---|
| linssiseppa2/pbr-173 | a72f1ee21 | OmaMalli PBR + kaupungin aurinko + uusin-3 | junassa 173 |
| linssiseppa2/talvi-173 | b64cb3b75 | talvi/v1 ISS:iin | junassa 173 |
| linssiseppa2/google-tyyli | b4819eb0e | KOE: omatyyli/omavarjot-asetukset + varjolokitus (pbr-173:n päällä) | ei junassa |
| linssiseppa2/omavalo-172, laivat-171 | 51799391e, 657676845 | juna 172 | julki TF 172 |
| linssiseppa2/grafiikkavertailu | e50dce235 | kaupunki-vertailu.sh-työkalu | ei mainissa |
Worktreet: `wt/proto-linssiseppa2-{pbr,talvi,tyyli,omavalo,laivat171,grafiikka,muisti}`; `-ilmakeha` on 16 kt tyhjä kansio (Finder), poista kun lukko vapautuu.

## Kesken – tee nämä ensin
1. **Tarkista v6e:** Julkaisijan kuittaus, `curl -sI https://media.matkakirja.app/kartta/omat-mallit/v6e/mallit.json` ja `uusin-3.json` → v6e. Ilmoita PT:lle rivi.
2. **Varjokokeen juurisyy (PT:n jono):** `omavarjot 1` ei tuota varjoja, vaikka loki näyttää: sun = oma valo, Soft, Ultra_RPAsset, varjomatka 1500,
   4 kaskadia 4096, 8/8 renderöijää varjostaa. Seuraava: käännä google-tyyli b4819eb0e (kameraloki: renderShadows, lähi/kauko) ja aja
   scratchpadin `varjo-koe.sh`-malli (Tukholma 04-kl-lahi, variantit a/d). Epäillyt: kameran renderShadows, kaskadien kauko vs. kameran far, ShadowCaster-passin bias.
3. **Odottaa PT:tä:** ND-päätös (älä aloita leikkausta), KL:n väri/katot + Google-tyyli (omistajan linjaus), Riddarholmen-hionta (LR, vasta ND/KL:n jälkeen).

## Odottaa omistajan päätöstä
- ND: fotogrammetria vai Googlen tornit + oma laiva. KL: väri harmaanbeige/okra, katot vaaleat ja kaltevat, Google-tyyli.

## Työtavat ja työkalut
- Mallivienti: `cd <proto tai worktree> && python3 -I tyokalut/omat_mallit_tileset.py <putki> <putki>/vientiN` (putki
  `proto-3d/_tyo/linssiseppa2/concorde-putki`, `glb/sijainnit.json` = lähteet + leikkaukset; varmuudet `sijainnit-ennen-*.json`). Uusin vienti29.
  Työkalu laskee rajauslaatikon instanssit mukaan (pbr-173). Sijainneista Vasa poistettu; prefektuuri ja KL v2b -leikkaus mukana.
- Kuvat: scratchpadin `kuvat-omistaja.sh` (OMAT=vienti Documentsiin, KULMAT=<tiedosto>-<kaupunki>.txt, kaupunki kerrallaan tuoreella asennuksella),
  `tyyli-koe.sh` (asetusvariantit), `avaus-koe.sh` (avausnäkymä), `merkitse.py` (kulma+versio kuvaan). Kamera "opas kamera lat lon dist kallistus suuntima katse":
  **katse = korkeus ELLIPSOIDISTA** (Pariisi maa ~75–180 m, Tukholma ~30–80 m). Kopiot: `proto-3d/_tyo/linssiseppa2/skriptit-20261009/` (scratchpad katoaa; skriptien S=${0:A:h} toimii kopiosta).
- Datan leivonta: `leivo_tyyli.py` (kirkkaus/kontrasti + COLOR_0-rapautuma) ja `leivo_v6e.py` (saturaatio/harmaanbeige) muokkaavat glb:tä suoraan.
- Käännös/simu aina Julkaisijalta (KÄÄNNÖS NYT / SIMULAATTORI NYT), "käännös valmis" / "simu vapaa" heti; oma simu A26BC7D0.
- Viestit PT:lle: vain valmis erä, jumi tai kysymys, ≤ 8 riviä. SendMessage-nimet: "PÄÄTOIMITTAJA (Opus, max)", "Julkaisija (Opus, high) [e5e2da]",
  "Linnanrakentaja (Opus, high) [0cc3bf]", "Natiiviseppä (Opus, high)".

## Avoimet velat ja opetukset
- Velka 1: varjot (yllä). 2: `kaupunki-vertailu.sh` (grafiikkavertailu-haara) ei mainissa. 3: v8/v6c-kansiot ämpärissä käyttämättöminä (ei haittaa).
- Opetus: ehdotin ND:n lyijylle tummaa sävyä ilman valokuvaa → väärin (oikea vaalea). Vertaa aina Commons-valokuvaan ennen sävyohjeita.
- Opetus: "harmaa kaukaa" johtui valon suunnasta (kartan aurinko), ei tekstuureista – tarkista valo ennen materiaaleja.
- Opetus: kahden kaupungin ajo samassa asennuksessa jäi aloitusvalikkoon → kaupunki kerrallaan tuoreella asennuksella.

## Aloitusviesti uudelle sessiolle
```
Olet Linssiseppä 2 (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-linssiseppa2-luovutus-20261009-ilta.md
(haara linssiseppa2-tyo-20260928). Tee ensin "Kesken"-kohdat 1–2. Viestit PT:lle: vain valmis erä, jumi tai kysymys, ≤ 8 riviä.
```
