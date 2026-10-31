# Karttaseppä: luovutus 30.10.2026 klo 23.10

Edellinen luovutus: 7faf185be (viesti-karttaseppa-luovutus-20261030-2155.md). Nollaus Postivahdin pyynnöstä (konteksti 33 %).

## Valmiit tässä vuorossa
1. **Pariisin striimikartta (juna 216)**: haara `karttaseppa/piirrokset-216` **c6a58d63f** (pohja juna-216 3f30ef0cb) –
   piirrokset + Louvren pyramidi kartan mittakaavassa (`KaupunkiPalloMitat.KarttaesineMittakaavassa`, min 8 pt), vaaleat kadut
   (e14), lähin zoom Z17. Omistaja OK 22.27 (PT). Peilissä `peili/proto/karttaseppa/piirrokset-216`, viety NS:lle junaan 216 (viesti 22.3x).
   Parit: `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/piirrokset-216/pari/` (LUE.md).
2. **Tuileries + metro (web-sisältö, ei natiivikoodia)**: mainissa
   - #5677 414be3ca7: metro → `pariisi-metron-sisaankaynti-v2.webp` (Guimard, omistaja 22.58 Kelpaa).
   - #5683 a25969340: Tuileries pitoon (PT), #5684 dede860b3: **Tuileriain rauniot → repon käsin piirretty
     `pariisi-tuileriain-rauniot-v2.webp`** (KK:n päätös omistajan valtuutuksella 23.01; ehjä palatsi `pariisi-tuileries.webp`
     jää repoon ja ämpäriin käyttämättä). Nimi "Tuileriain rauniot" ennallaan.
   - #5685 bd86276f6 + #5686: `vie-assetit.yml` kaatui `assets/kartat/miniatyyrit/LUEMINUT.md`:hen (tarkistus + julkinen luku) → korjattu.
   - Vie assetit R2:een (miniatyyrit) ajo 41128580877 **OK**; `rauniot-v2` ja `metron-v2` ämpärissä 200.
   - Web-parit: `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tuileries-web/pari2-*.png` (LUE.md, skripti kuvaa.mjs).

## Käynnissä luovutushetkellä
- **vie-sisalto** (GitHub) mainin pushista dede860b3/bd86276f6/#5686 – ei vielä tarkistettu valmiiksi. Tarkista:
  `gh run list --workflow vie-sisalto.yml --limit 4`.
- **Simulaattorin kuivaharjoitus** 60 fps -skenaariolle (taustalla, c6a58d63f-app, simu DA0AAEEA…): tulos
  `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/fps-216/ajo-simu.out`, mittaukset `fps-216/simu/mittaus-fps-*.txt`
  (jos kopio epäonnistui: sovelluskontin Documents; simu sammuu ajon lopussa). Tarkoitus vain skenaarion syntaksin varmistus, ei fps-lukuja.

## SEURAAVA
1. **Tuileries/metro-pari KK:lle (PT 23.0x)**: kun vie-sisalto on valmis, natiivin pari (lähin Louvre/Tuileries + keski;
   skenaario kuten `piirrokset-216/sk-pari.txt` K2/K4) + web-pari `tuileries-web/pari2-*.png` → KK (local_231e4bad-…).
2. **OMISTAJAN PYYNTÖ 23.01 (PT): striimikartan vieritys ja zoom 60 fps** iPadilla ja iPhonella, myös Z17:llä ja piirrosten kanssa.
   - Skenaario valmis: `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/fps-216/sk-fps.txt` (kauko/keski/lähin: 6 vetoa + 2 heittoa,
     nipistyszoom; `komento mittaus` → Documents/mittaus-fps-*.txt, `ui piikit 14 20` → konsoli).
   - Laiteajot NS:n kanssa (local_c7344e20-…), Unity-luvat PT:ltä; `tyokalut/ipad.sh` (iPad Pro 13 oletus, iPhone UDID tiedostossa).
   - Sitten syyt + korjaussuunnitelma ≤ 3 riviä PT:lle; korjaukset junaan 216, ennen/jälkeen-luvut.
   - Mittarit koodissa: `Kartta/KehysMittari.cs` (kehysajat.jsonl), `UI/KehysPiikit.cs`, `Ruudunpaivitys` (`peli ruutu`).
3. Portti 06 (juna 215) odottaa yhä PT/KK:n kuittausta (edellinen luovutus kohta 2).

## Muuta
- Worktree `/Users/Shared/Claude/wt/karttaseppa-tuileries-kuva` (web): haarat mergetty, voi poistaa `tools/uusi-worktree.sh --poista karttaseppa-tuileries-kuva`.
- Proto-worktree `/Users/Shared/Claude/wt/proto-karttaseppa-piirrokset-216` jää (haara NS:llä).
