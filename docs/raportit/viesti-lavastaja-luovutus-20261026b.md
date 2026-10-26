# Lavastaja: luovutus 26.10.2026 klo 11.2x (Postivahdin kova raja 36 %)

Edellinen: `docs/raportit/viesti-lavastaja-luovutus-20261026.md` (9eac350cb). Haara `linnanrakentaja-tyo-20260929`.
Proto: `wt/proto-lavastaja-muoto`, haara `lavastaja/muoto-210` (paikallinen, JU ottaa sieltä). Osoitin nyt **957cc6a4b** (v54/v46).

## Valmiit tänään

| Paketti (`proto-3d/_valmiit/…`) | SHA256SUMS | Sisältö | Tila |
|---|---|---|---|
| v52/v44 aukio 03 editoritarkistus | – | lokit/havainne-editori-20261026-103108/03 vihreä | JU:lle kerrottu (osoitin 467f8a6b1) |
| kk-tausta-peking-v54 + kielletty-rakennukset-v46 (-20261026) | 216738699860 / 6167753f2056 | 3 porttihallia (t-portti-m15 Youyimen, -120 Longzongmen, -m216 Zhendumen) jalustoineen malleihin: portaat + keskiovi 4,0 × 4,5 m, läpikulun katto katto-solmussa, reitit "S-N" nousevalla y:llä, terassi lähteen korkeudelle (2,5 / 0,3 / 2,5 m) | PT hyväksynyt 11.3x, JU vienyt ämpäriin, osoitin 957cc6a4b JU:lle + PK:lle |
| kk-tausta-peking-v55 (-20261026) | ad3133ea054f | galleriat 1,8 m:iin (länsigalleria Zhendumenilta pohjoiseen z −82, Zhendumen–Taihemen, Taihemen–Zhaodemen), Zhaodemen 5,1 → 2,5 m; 1-1 ja 2-1 LOD0 leivottu | EI editoritarkistettu, EI PT:lle ilmoitettu |
| v53/v45 | – | Codexin 5,1 m:n versio | korvattu, ei vientiä |

Raportit: `proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset/hallit-v54/RAPORTTI.md` (lähteet: Commons "Beijing (November 2016)" 386.jpg
Longzongmen ~0,3 m, 345.jpg Zhendumen ~2,5 m ja galleria ~1,8 m; Youyimenille ei omaa lähdettä → Zhendumenin 2,5 m).

## Kesken

1. **Kujat 02/05p vaalea reunaporras (PT 11.2x)**: porras siirretty muurikatteesta taustalaattaan 0-3 V4_lattia-primitiivinä
   (lattiavarjostin, kuja_reunaporras_lattia.py), 0-3 LOD0 leivottu: `kuja40-ehdotus2/lattia-porras/` (kielletty-tausta,
   kk-muurikate-ilman-porrasta.glb). Editoriajo `havainne-kuja40/aja-kujat-v4.zsh` (juuri-v4) käynnistettiin 11.10 → loki
   `havainne-kuja40/ajo-v4.log`, kuvat lokit/havainne-editori-2026102611*/{02,05p}/vierekkain.png. Tee kolmikot (vertailu: levennetty
   nyt = ajot 120013/02 ja 125507/05b, edellinen V4_sokkeli 105122) ja lähetä PT:lle. EI ämpäriin ennen omistajaa.
2. **Tausta-v55 editoritarkistus**: `havainne-kuja40/aja-v55.zsh` (juuri-v55: v55 + rakennukset-v46) aukio 03; vihreänä rivi PT:lle
   (v55, SHA ad3133ea054f, raportti alla) → PT:n kuittauksen jälkeen JU:lle ja osoitin v55/v46 muoto-210:een.
   v55-yksityiskohdat ovat LAHTEET.md:ssä; tee lyhyt RAPORTTI.md kansioon `kielletty-rakennukset/tausta-v55/`.
3. **Sali (Valoseppä)**: pilotti 4 toimitettu (`leivottu-sali/avoimet-pilotti-leivottu-4/`, kerroin 2,0, 4096 näytettä, 5 × 5 -suodatus,
   aja4.zsh; mediaani 0,074 → 0,121). Odottaa Valosepän mittausta (P38b: kultaisen sotkun syy).
4. 05:n takaseinän tumman rakennusvarjon lähde varmistamatta (edellisestä luovutuksesta).

## Työkalut (uudet, `kielletty-rakennukset/tyokalut/`)

hallit_lapikulku.py (KORKEUS-taulukko, KORKEUS=0 = Codex), hallit_reitit.py, aja_hallit_v53/v54.zsh, pakkaa_v53_v45/v54_v46.zsh,
tausta_madalla.py (yhtenäiset osat laatikossa, POIS-alueet, jatkuva korkeuskartta), aja_tausta_v55.zsh, kuja_reunaporras_lattia.py,
aja_kuja_porras_lattia.zsh; avoin_leivo.py: SUODATA_R (oletus 1).

## Opit

- Codexin porttihallit: ~24 × 22 m:n terassi 5,1 m + 2,6 m:n "tasanne" edessä ja takana; oikeat sivuportit matalampia (lähdekuvat).
- Taustan yhtenäiset osat voivat ulottua kauas (länsigalleria 150 m); valitse osat xz-laatikon ja POIS-alueiden avulla, tarkista rajalla.py-tyyppisellä
  listauksella (laatikon rajan ylittävät osat, y > 2).
- Malliin luettu katto-solmu on mallin kehyksessä → muunna maailmaan ennen ovileikkausta (v53:n ensimmäinen ajo siirsi katon väärin).
