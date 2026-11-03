# Pelikoodari: luovutus 30.10.2026 klo 16.25 (konteksti 30 %, hookin pehmeä raja)

Edellinen luovutus: -20261030-1540. Muistin tilatiedosto: pelikoodari-tila-20261018-aamu.md.
- Työkansio: P = /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/piirrokset-20261030.
- Raportti tästä vuorosta: P/RAPORTTI-harmaat-sauma.md (lue ensin).

Proto-gitin haarat:

| Haara | Sisältö |
|---|---|
| pelikoodari/orto-216 (worktree /Users/Shared/Claude/wt/proto-pelikoodari-orto) | e0954bac9 = ortokamera + täyte + QA `valo pintatieto piste X Z [Y]` |
| pelikoodari/tayte-216 (worktree /Users/Shared/Claude/wt/proto-pelikoodari-v98c) | juna-216 f1cee36c7 + 3f2f329f7 (v98c-kansiot) + 98302f381 (täyte, ilman QA:ta) → junaan, kun PT hyväksyy |
| pelikoodari/v98c-216 | vain 3f2f329f7: tausta-v77, rakennukset-v84 ja c2-v23. NS:lle ilmoitettu 16.0x ("mergeä, jos et ole jo tehnyt") |
| pelikoodari/testi-216 | 0da3d0438 = orto-216 + v98c-kansiot (esikatselukokeisiin, ei junaan) |

Esikatselun mallijuuri v98c-kansioilla: P/juuri-v98c (symlinkit: juuri-pk7-v119 + LAV:n v98c-vienti).
Koejuuret: P/juuri-v98c-uvkoe ja P/juuri-v98c-porttikoe.

## TEHTY
- **Maan täyte (PT 15.3x/15.4x):**
  - Täyte vaihtuu LOD0-lattiaan, kun LOD0 on ladattu (ennen LOD2, harmaa). Taso −0,08 → −0,03.
  - Todiste: lokit/esikatselu-20261030-155518/unity.log ("maan täyte: lattia … lod2 → … lod0").
  - **Täyte ei ollut kummankaan näkyvän virheen syy.**
- **Harmaat laatat aukiolla 03:**
  - Syy: taustan kk-tausta-2-1/2-2 Codex-jalustojen yläpinnat ovat kuvatonta V4_marmoria (y 1,07 / 2,07 / 1,88–4,18).
  - Kuuluu Lavastajalle: yläpinnat V4_lattiaksi.
  - PT:lle ilmoitettu 16.2x. Ei vielä vastausta, eikä Lavastajalle ole lähetetty omaa viestiä: PT päättää.
- **Junan 216 viittaukset v98c-kansioihin:** valmiina 3f2f329f7 (yllä).
- **Työkalut P:ssä:**
  - glbpiste.py: kolmiot pisteessä, materiaali, y, kuva.
  - glbalue_kirjasto.py
  - uvpoikkeamat.py
  - tjunktiot.py
  - uv_yhtenaiseksi.py ja lattia_alas.py (koekopiot)
  - pohja2kk.npy: pohja → taustan kk-kehys, noin 2° kierto. Puyi (30,7; −405) pohjassa = (16,7; −405) kk:ssa. Glb-haut tehdään AINA kk-kehyksessä.

## KESKEN: 06:n vino lattiasauma (Meridiaaniportin edessä)
- Poissuljettu kolmella esikatselukokeella (kuvaparit P/*-pari.png):
  - täyte;
  - taustan 2-0 UV;
  - portin oma lattia (V4_lattia y 0,01).
- Erotteluajossa (osat ja täyte pois) sauma säilyy. Puyin kohdalla on vain kk-tausta-2-0 lod0, portti ja "v4 maa vesien ympärillä" (y −0,08).
- **Seuraava koe:** tasaa kk-tausta-2-0-lod0:n V4_lattian kiilakolmiot y 0:aan koekopiossa.
  - Kiilakolmioiden kärjet y 0,08 / 0,04 / −0,07, kk (25…36; −394…−400). Tee lattia_alas.py:n tapaan, mutta tasaus väliin −0,1…0,1 → 0.
  - Aja skenaario P/skenaariot/porttikoe2.txt koejuurella.
  - Jos sauma häviää, korjaus kuuluu Lavastajalle (tausta_kiilat.py). Jos ei, kokeile "v4 maa" pois (JuoksuV4Maailma.Vesi.cs LuoMaa).

## UUDET TEHTÄVÄT PT:ltä (16.2x)
1. **UUSI SÄÄNTÖ (omistaja 16.0x, Raamattu 2.177):** ennen paria tai korttia:
   - orto piirroksen päälle;
   - automaattinen väri- ja lähikuvatarkistus;
   - [A]-mitat kuvista ennen 3D-työtä.
2. **Ladonta junaan 216** (omistaja kysyi): laattojen ja sauman jälkeen kytke osasarjan ladonta (511ca08dc) päälle muureille, kivijaloille, reunakiville ja kaiteille.
   - Todista ortovertailulla ja parilla, ettei ulkoasu muutu → PT.

## Jono sen jälkeen
- A6: kun Codexin 7-välinen GLB on LR:n paketissa, tarkista läikät.

## Huomiot
- **Esikatselu:** `zsh /Users/Shared/Claude/wt/proto-pelikoodari-pk7-214/tyokalut/esikatselu.sh <REF> <skenaario> ipad --batch`.
  - Linja 2 on yhteinen; muut roolit jonottavat samaan.
  - QA-vastaukset ovat unity.log:ssa (`MATKAKIRJA ui-komento:`).
  - Skenaariot: P/skenaariot/.
- **`valo pintatieto piste`** vaatii ortokameran (PohjaMaailmaan), joten aja se vain orto-216- tai testi-216-pohjalla. Juna-216 kaatuu käännösvirheeseen.
- Taustaajoja ei ole kesken.
- Proto-haaroja ei ole pushattu (proton origin ei salli).
