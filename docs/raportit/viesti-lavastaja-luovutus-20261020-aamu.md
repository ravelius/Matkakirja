# Lavastajan luovutus 20.10.2026 klo 05.1x (Opus, medium) – PT 05.1x: levossa, nollaus

Edellinen: `viesti-lavastaja-luovutus-20261020-yo.md` (d409f15da). Viestit send_messagella session id:llä (`/Users/Shared/Claude/osoitekirja.md`).
**JU = Julkaisija (local_24e63224…).** Kuvaparit KK:lle (local_8e4fcfed…), kopio PT; PT:lle ≤ 3 riviä.
**Vientipakettia ei muuteta lähettämisen jälkeen** → korjaus aina uudella nimellä. **Ei rm, ei cd, ei heredocia** (PT pysäytti 03.08 ketjun
`cd … && python3 - <<'PY' … rm -rf …`): muokkaus Edit-työkalulla, skriptit tiedostosta absoluuttisin poluin, uusi versio uuteen kansioon.
Oma simu: iPhone 484B130B-0652-4EAD-B26A-509A9DD79C66 + iPad 18932B67-771C-4D78-9CA2-060B3060AA1D; vuoro aina JU:lta (SIMU NYT), lopuksi SIMU VAPAA.

## ENSIN (uusi Lavastaja)
1. **Levossa, kunnes Codexin esteet v2 tulevat** (PT 05.1x: seuraava erä; PT kertoo polun). Ei muuta työtä ennen sitä.
2. Kun JU:n 207-yhteinen simu (yhteinen14 sisältää rengas-v8f c35eca1e8) tai PK:n korttelisimu tulee ja sinua pyydetään: arvioi rengas usvassa /
   korttelit droonilta → kuvat KK:lle (kopio PT). PK lähettää korttelien droonikuvat itse KK:lle.

## Tehty 20.10. 00.4x – 05.1x
### Kaukomaisema-rengas (juoksupeli, worktree `/Users/Shared/Claude/wt/proto-linnanrakentaja-kaukomaisema`, haara `linnanrakentaja/juoksu-kaukomaisema-rengas`)
- 206-rengassimu yhteinen10 (208fd103e, rengas v6): iPhone+iPad OK, 0 virhettä → PT; SIMU VAPAA 00.49.
  Lokit `proto-3d/lokit/todistus-juoksu-rengas-{iphone-20261020-0044,ipad-20261020-0047}/`.
- **v8e be3be8e48** (KK 01.1x): 90°-suunnan (länsi) leijuva "lankku" = seinättömän hallin katto (x −153…−106, y −25…77 Blender) + 2 päätykolmiota pois (lahde/v8e.py).
  Yleinen "ei mitään alla" -sääntö ei toiminut (hallin liuskat tukivat toisiaan, pohjoisesta lähti aiheellisia kattoja) → alueraja.
- **v8f c35eca1e8** (PT 01.1x): länsisuunnan jäänteet (vino tikku x −285…−267, pystyliuska x −293…−291, kulman kattosiru x −241…−224) pois (lahde/v8f.py).
  JU vei v8f:n 01.15 → yhteinen14 (PK a35c37af5 + VS 94f840dac + c35eca1e8). Viennit `_valmiit/juoksupeli-kaukomaisema-rengas-v8e/-v8f-vienti-20261020`.
- Työkalut: `_tyo/linnanrakentaja/juoksu-kaukomaisema/lahde/` (v8e.py, v8f.py); vertailut esikatselu/v8c-v8e*.png, v8e-v8f*.png.
  Leijuvan palan paikannus: säteenheitto renderin pikselistä (scratchpad-skripti sade.py: kamera (−4, 25, 9) Blender, katse −x = länsi).
- Siivottu omat appit kaukomaisema-207-app ja kaukomaisema-rengas-app (_tyo/linnanrakentaja). Kehys-204-appit jäävät, kunnes 204 julki.

### Sokkelon korttelit (Codexin PT713–718-mittapaloista; PT 03.1x)
- Lähde: `_tyo/linnanrakentaja/sokkelo-korttelit/lahde/` (purettu juoksupeli-sokkelo-713718-v1.zip, SHA 9e9ac825…, SHA256SUMS OK; PT:n kopio myös
  `_tyo/linnanrakentaja/codex-mittapalat-713718/`). Paketissa ovat myös läpijuostavat rakennukset ja portaat (tilaus B) – erillistä toimitusta ei tule.
- Työkalut `_tyo/linnanrakentaja/sokkelo-korttelit/tyokalut/`: kokoa_korttelit.py (v1/v2), **kokoa_korttelit_v3.py** (voimassa), esikatsele*.py,
  materiaalit.py, tarkista_reitit.py (PK:n rajat). Ajo: `/Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup -P <skripti> -- <lahde> <ulos>`.
- Versiot (_valmiit/juoksupeli-sokkelo-korttelit-vN-vienti-20261020): v1 (44 mat halli → hylätty), v2 (materiaalit yhdistetty, json), **v3 = KÄYTÖSSÄ**
  (KK OK 05.2x; PK kytki 840835c23/3b22c6724, testit läpi), v3b (portaat pystynousuina – PK: ei tarvita, ei viedä).
- v3: vain punakulta (KK: vihreä-kivi pois); lattiat V4_lattia → kivilaatta; sali2 0,32 / sali3 0,64 (kierretty 90°) / paviljonki-jalusta 0,32 / paviljonki-ramppi 0,64 /
  puutarha (kaarisilta vesiuoman yli, portit N,S) / torni / paviljongit; kortteli2-halli 0,96 (päätyportit kiinni, ensimmainen_kytkenta false).
  Muurit 0,4 m ±6 m, E/W 12,4 m, N/S 11,6 m (Codexin 11,0 m venytetty), portti 3,6 m. Jalustat = terassin tasanne venytettynä (yläpinta 4 cm lattian alle), portaat = terassin porrasosa.
- Vesiuoma on väripinta V4_vesi; KK 05.2x: VS tekee veden näköiseksi pelissä (PT jakaa).
- Kuvat: esikatselu/v3-kuvapari.png (KK OK), v2b-kuvapari.png.

## Opit
- Codexin moduulit tuovat jokaisesta glb:stä materiaalikopiot (V4_red.001 …) → yhdistä perusnimeen ennen joinia, muuten piirtokutsut 26–44.
- 0,4 m:n muurilla korttelin N/S-muuri on 11,6 m (11,0 m jättää 0,3 m:n raot).
- Fontti kuvateksteihin: `/System/Library/Fonts/Supplemental/Arial.ttf` (PIL:n oletus ei piirrä skandeja).

## Avoimet
Olavinlinna tauolla (omistaja 19.10. 17.05). `wt/proto-linnanrakentaja-kehykset` pois, kun 204 julki.
