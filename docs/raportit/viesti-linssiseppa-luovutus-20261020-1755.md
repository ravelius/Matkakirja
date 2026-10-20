# Linssisepän luovutus 20.10.2026 klo 17.55 (PT: tilinvaihto iPhone-paketin jälkeen)

Edellinen: viesti-linssiseppa-luovutus-20261020-1620.md (historia siellä). Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
KK local_8e4fcfed-fc40-464c-854a-1d031b005332, JU local_24e63224-112c-449a-b6a3-e10e4ed43f4b, NS local_fcc10552-5810-49bf-b0cf-188456f1231c,
NUI local_c6d63773-0270-4873-96f8-63c66cf52794, Äänittäjä local_726ba209-ff08-43be-a35d-5a60f96f60e1.

**OMISTAJA 20.10. 11.45: simu vain 1) selvästi uudelle tekniikalle, 2) omistajan pyytämiin kuviin, 3) yöjunan laitekierrokseen/muistiajoon.**

## 0. AVOINNA
0. **PÄIVITYS 18.0x:** ulosnipistys ee84e9303 on runko 208:ssa (NS: a6d6341aa, iPhone-paketti); worktree poistettu – kohta 1 on valmis.
1. **Taulun tutkiminen / ulosnipistys** (omistaja 17.31 + 17.39 PT:n kautta, KIIRE iPhone-paketti): haara `linssiseppa/ulosnipistys-208`
   ee84e9303 (pohja juna-208 e3cff21f6), worktree /Users/Shared/Claude/wt/proto-linssiseppa-ulosnipistys. Kärki lähetetty NS:lle 17.49
   runkoon 208 (PT OK, ei simua); VIHREÄ 17.5x: Linssit 2180/2180, tarkista.sh exit 0. Kun junassa → `git worktree remove /Users/Shared/Claude/wt/proto-linssiseppa-ulosnipistys`; rivi KK:lle
   (tehty-ilmoitus) jos ei vielä lähtenyt. Tarkista NS:ltä, ehtikö iPhone-pakettiin vai seuraavaan.
   - Mitä tekee: zoomaus/liikuttelu ei koskaan vaihda tilaa (MuseoKierros.KasinPito: pelaajan suurennus pitää pysähdyksen myös
     takaisin koko taulussa; vain ▶ vapauttaa, MuseoTaulu.TaukoNappi → AsetaPito(false)). Ulos nipistäessä pehmeä pysähdys koko tauluun
     (MuseoKierros.PehmeaUlos, vyö ln 1,25) ja irrotus liukuu tarkalleen siihen. Uusi ulosnipistys levossa (sormien väli < 0,8; Mac:
     rulla ulos ≥ 0,5 s tauon jälkeen) → alareunan pieni kysymys "Haluatko kulkea vapaasti museossa?" (MuseoTaulu.Ulos.cs: museon
     lasikortti + vahvistuskortin nappirivi EI/KYLLÄ). Kyllä = Kierros.Vapaa, Ei/Esc = takaisin tauluun (pito ennalleen).
   - QA: `museo vapaakysymys [kylla|ei]`. Testit MuseoUlosnipistysTestit; MuseoAutoZoomTestit päivitetty (▶ = AsetaPito(false) + AsetaZoom(false)).
   - NUI sopi: metrokartta NUI:lla, museon taulun nipistys kokonaan LS:llä (viesti NUI:lle 17.3x).
   - Mahdollinen jatkopalaute: kysymyksen kynnys (UlosKysymysOsuus 0,8) ja pehmeän vyön leveys (PehmeaVyoLn) – säädä vakioista.
2. **Pehmeät askeleet** e3e6e95f0: junassa 208 (natiiviseppa/juna-208), worktree poistettu 16.2x. Valmis.
3. **Kulmakoristeet** (Codex PT733, toimitus T7 louvre-kehykset-koristeet-v1/): EI vielä tullut 16.2x (haettu /Volumes/T7 4TB, maxdepth 4).
   Kun tulee: kytke kehyksiin instansseina (kulma 4× peilaten, keski 4×, nauha toistuva). Tilauslista:
   proto-3d/lokit/louvre-kehykset-208/kulmakoristeet-lista.md (12 taulua, 8 tärkeys A). Koodi: MuseoRakennus.cs kehysosien jälkeen
   (kehyksen ulkomitat ulkoW+LeveysCm).

## 1. TYÖKALUT
- Testit: `sh Linssit-testit/kaanna.sh Museo` (museo ~2 min), koko tarkistus `zsh tyokalut/tarkista.sh` worktreessä.
- Ajoskriptit: /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/.

## 2. WORKTREET (/Users/Shared/Claude/wt)
proto-linssiseppa-ulosnipistys (poista mergen jälkeen), proto-linssiseppa-kierrokset195 (todistusajo.sh – älä poista).
Appit _tyo/linssiseppa: louvre-kehykset-208e-app, monalisa-video-207-app (vanhempi pois kun tarvitaan tilaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus. Tarkista ensin, onko ulosnipistys-208 (ee84e9303) junassa 208
(poista worktree) ja onko Codexin PT733 tullut (kytke kulmakoristeet). Muuten rivi PT:lle "JONO TYHJÄ: Linssiseppä".
