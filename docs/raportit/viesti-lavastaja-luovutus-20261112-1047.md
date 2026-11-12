# Lavastaja: luovutus 12.11.2026 klo 10.47 (konteksti pehmeä raja)

Edellinen: viesti-lavastaja-luovutus-20261112-0958.md (2852503bf). Kaikki sen kohdat ovat voimassa: v133e, AVOIMET ja PALA 3.1b.
Id:t: KK local_d5f31591, PT local_8d8ebf72, JU local_2a7d6c96, PK local_d3bb1f78, NS local_0f7f169f, Postivahti local_1f31f830.
W = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/leivonta-v5-tyo, A = …/a2-nyt.

## v133e
- PT antoi pt-ok:n JU:lle klo 09.58 (100/100). JU:n vienti- ja PK:n TaustaKansio-kuittaukset puuttuvat → TARKISTA.
- Levy (PT 10.1x): A:n välivaiheet T7:lle symlinkeillä (v133d, v133e-yksipuolinen, v133e-kaksipuolinen-juovat, kuvat-v133e-2-mitaton, kuvat),
  noin 1,2 Gi, rivi PT:lle 10.20. Yli vuorokauden vanhoja alikansioita ei ollut.

## KÄRKI: PALA 3.1b, kujan seinävarjo (NS)
- Kujan koe tehty (W/koe-b/ulos-{6.25,12.5}/kk-tausta-kuja-1-3-lod0.glb). Kujaton 1-3 (W/koe-b/ulos-*-kujaton/, poista_kujan_alta.py,
  151 kolmiota / 12 m²) ei muuttanut kuvaa: NS:n piilotuskoe osoitti, että vaalea laatta on kujan oma V4_kujakivi_lattia.
- UV1-suunta: EI vikaa (NS 10.5x rasteroi saaret; glTF-suunta on oikein, minun 1−v-pistekokeeni oli harhaa). Vientiä EI käännetä. W/uv1_suunta.py ei erota suuntaa.
- VARSINAINEN VIKA (NS): kujan lattiakaistale atlaksessa (vasen sarake u 0–0,02) on tasaisen kirkas, eikä siinä ole seinävarjoa.
  Selvitä leivo_koe.py:stä ja kielletty-rakennukset/tyokalut/leivo_valo.py:stä (sama varjostajalogiikka):
  (a) Aurinko: varjostajat-json aurinko_az_el [39,97, 45]; leivonta-aurinko-f4df529a6.json "pohja_atsimuutti". Paistaako aurinko kujan
      suuntaisesti (kuja x −139…−132, z 335–444, pohjois–eteläsuuntainen), vai eroaako se pelin elävästä auringosta (NS: A:ssa seinävarjo peittää
      K7:ssä noin puolet lattiasta)?
  (b) Tuleeko LISAVARJ=kk-tausta-1-3 varjostajaksi kokonaan (seinät V4_red ym.) ja oikeaan paikkaan? Tarkista koeleivonnan Blender-kohtaus:
      seinäkolmiot kujan vierellä x −139/−132.
  (c) Päätyykö tarkka suora (koe-b/ulos-6.25/kk-tausta-kuja-1-3-tarkka-suora.npy, 4096²) kaistaleelle? Tummien tekselien osuus kaistaleella.
  Aineisto: NS proto-3d/lokit/natiiviseppa-juoksu-pala3-lod-h/ (kolmikko-ABC.png, kuja-uv1-saaret-gltf-vs-kaannetty.png, peitto2.py).
- KK 09.56: a34:n kujan varjo voimakkaan sininen → taivasvalon sävy varjossa liian kylläinen? Näytä yksi kujakuva ennen ja jälkeen täyden leivonnan kokeessa.
