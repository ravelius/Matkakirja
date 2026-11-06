# Natiivisepän luovutus 6.11.2026 klo 07.45 (konteksti 30 %, pehmeä raja, 7.37)

Korvaa -0705:n. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Cron "4 9 * * *" unity-julkaisut.py luodaan uudelleen uudessa sessiossa (Raamattu 7.41; polku proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py).

## SEURAAVA TYÖ
Odota KS:n lokikansiota seuraavasta yhteisestä ajosta (palat-v3). Ei omaa ajoa, ei junaan, ei iPadia. Kun se tulee:
1. Katso sc-80 samalla kameralla kuin ajossa 579ea327c: leijuuko rivi Sacré-Cœurin vasemmalla (täysikoossa x 880–1200, y 630–690)? Read pienentää yli 2000 px:n kuvat: rajaa ensin (`_tyo/natiiviseppa/pariisi-talot/selvitys-c5/ruudut-maa2.py`).
2. Katso sc-45 tai m3: painuvatko rinteen talot karttaan? Kaava voi painaa noin 6 m (mitattu ruutu maa 101, lisä 24).
3. Katso, ovatko Madeleine, Palais Bourbon, Pompidou ja Saint-Sulpice mallina ilman laatikkoa. Jos mallit puuttuvat ajosta, paikat näkyvät tyhjinä; se ei ole palojen vika.
4. Tulos KK:lle viat nimettyinä, kopio PT:lle ≤ 3 riviä, ja NUI:lle, jos kaava muuttuu (NUI:n taulukko tee-montmartre.py samasta kaavasta).
Jos rivi yhä leijuu: EI neljättä kaavaa ilman KK:n sanaa (PT 07.4x).

## Tehty 07.2x–07.45
- Ajo karttaseppa-yhteinen-579ea327c katsottu, tulos KK:lla, PT:llä, KS:llä. Tasaus päällä (karttatasa 1, ennen ensimmäistä kuvaa). Talot istuvat tasaisella ja reunalla, ei rakoja (silmämääräisesti; ei kuvia ilman taloja).
- nd-raja KK:lla omistajan päätöstä varten; raja samassa paikassa. Vertailu m4: `selvitys-yhteinen/nd-m4-vs-raja-*.png`.
- sc-80:n leijuva rivi: 130–460 m SC:n länsipuolella, N −65…+206, tasauspaino 0. Oma maa 102–125, pohja 234–281 m. Kamera sovitettu siluettiin: E +2,7, N −1666,6, U 277,6, kallistus 80,5. Välin alaraja mediaani 16 m, suurin 25 m. Kaukotasoa ei suljettu kokonaan pois, mutta sitä ei tarvita selitykseksi.
- Palat `_tyo/natiiviseppa/pariisi-talot/palat-v3` KS:lle; koodi ennallaan natiiviseppa/marais-talot 7333833fe. indeksi.txt sha256 62ed9ee5b4f02e1a…, tee-palat.py sha256 52cf81ba9670e96f…. palat-v2 = vain laatikot, vertailuun. Vanha `palat` ennallaan.
- OHJELMA-listaan Madeleine, Palais Bourbon, Pompidou, Saint-Sulpice (38 m, KK:n testi luki vain vaakakatot). Tour Saint-Jacques, Saint-Eustache, Hôtel de Ville: ei kärkiä alalla. Taloja 126 024 → 126 020. Alat VS:n vakioista käsin, haara linssiseppa2/ohjelmakohteet 26d0fcdf2.
- Kaava (PT 07.4x, koe): piirretty pohja = 2 × (maa + 15) − 1,1 × clamp(maa − 90, 0, 20). Mittari: maa2-ajo, maa ≥ 105 lisä 8 (heikko: 2288 kärkeä, piste 0,096). v2→v3: 22 palaa muuttui, 197 tavulleen ennallaan, suurin lasku 22 m. Ennuste: 530/535 rivin alakärkeä säteen alla, 5 yli enintään 2,8 m. EI nähty kuvassa.
- Skriptit `selvitys-yhteinen/` (sc80-sovitus.py, sc80-rako.py, ohjelma-alat.py, tarkista-v3.py).

## Avoinna ja odottaa muita
- KS: ottaa palat-v3:n ja sc-80:n seuraavaan yhteiseen ajoon. Viesti 07.4x.
- NUI: sai kaavan; huomautettu, että Sacré-Cœurille kaava antaa 252 m ja kartan kirkko on 258 m:ssä. Merkin korkeus PT:llä/NUI:lla, ei minun.
- KK: omistajan päätös nd-rajasta; tasaisen oletus odottaa yhteistä ajoa (omistaja 06.58, KS), ei tätä kaavaa.

## Omistajan päätökset 6.11. (PT:n välittäminä)
- 06.55 suojatut talot "Jätetään laatikoina": ei suodatusta talokerrokseen. Ei koske ohjelmakohteiden omia OSM-laatikoita (PT 07.3x). Riski App Storea ennen tarkistuslistalla (11.8).
- 06.58 kartta tasoitetaan keskustassa (vastuu KS). Horisontin häivytys kelpaa. Talojen raja: "En osaa sano", raja ennallaan; koekuva otettu.

## Muu tila (kuten -0705)
Liiku 99748962f odottaa KK:n sanaa (ei lähetetä uudelleen). Kyltit usvassa ilman rakennusta; ODbL ennen julkaisua; suorituskyky isossa iPadissa; Ateenan ja Tukholman viat odottavat Pariisia. Maskit sacre-coeur ja montparnasse jäävät. Sillan päät ovat Valosepän työtä.

## Viestit ja työtapa
Varakanava `mcp__ccd_session_mgmt__send_message` toimii. KK local_231e4bad, PT local_cf5b4eca, KS local_ddd980b0, NUI local_a3754ed8, JU local_b4a7e82a, Postivahti local_d8d003f6. Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-marais. Palatiedostot python3.14:llä ilman -I:tä. tee-palat.py: `tee-palat.py <D> <uusi kansio>`, aina uuteen kansioon.
