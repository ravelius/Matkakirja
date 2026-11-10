# Valosepän luovutus 10.11.2026 klo 08.36. Itsenäinen: vanhoja ei tarvitse lukea (korvaa 20261110-0817:n)

Syy: konteksti 30 %, luonteva tauko (kaksi ajoa JU:lla). Tili sami.reivinen@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Worktreet: k31 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k31` (nyt haarassa `linssiseppa2/pallon-elama-224` 62e148dae, puhdas, pushattu), k32 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k32` (`linssiseppa2/fpv-vuoret-k2` 0809231b9, puhdas, pushattu). Kuvat vain JU:n vuorolla. Id:t: PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; JU `local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; KK `local_d5f31591-21fa-4cb0-bab3-bcd3435d075a`; Postivahti `local_1f31f830-9df5-41c1-8992-172e100af57f`.

## ERÄ 1: PALLON ELÄMÄ JUNAAN (OMISTAJA 10.11. 08.13 "Kyllä, junaan" kortit 1 ja 2) – AVOIN
- MR-haara `linssiseppa2/pallon-elama-224` = **62e148dae** (natiivi-backup; KK 08.2x: filmi VAIN Pariisin kartalla → 62e148dae: KarttaPilvet.PariisinKarttaPaino (< 200 km, kamera < 60–100 km) painottaa filmin sävyn, rakeen ja terävöinnin, ulkopuolella ei passia; 6c648af87 EI junaan). Pohja: juna-224 68d365e65 + merge df0ab30a1 (22e601e76 = kevyt filmi + pilvien varjot, 12 committia, ei ristiriitoja) + oletus päällä (`OletusPaalle` AfterSceneLoad KarttaFilmi.cs ja KarttaPilvet.cs). unity-tarkistus 0 virhettä. Raitiovaunut pysyvät pois (7.11. 16.43). PT:lle sha kerrottu 08.1x.
- AVOIN: JU ajaa `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pallon-osat/sk-mr224b-ipad.txt` → `lokit/linssiseppa2-mr224b-ipad-62e148dae` (m-oletus | m-pois | m-takaisin Pariisissa + m-ulkona Lyonissa: EI filmiä/pilviä, muisti). Vanha mr224 (6c648af87) ehkä ajettu – vain vertailuksi. Tarkista: tila-rivit "päällä kevyt", kartan huippu < 4080 Mt (pino1 3979), gfx-ero oletus vs pois ~ +25 Mt, m-oletus ≈ m-takaisin. Muisti: `muisti-tarkka.log` N-rivit: kenttä 2 = ms alusta, 4 = fp, 12 = gfx; merkit.txt kellonajat → ms = (aika − ALKU). Hyvä → PT:lle 3 riviä (sha, ajo, luvut); PT/JU yhdistää junaan.
- PT:lle sha 62e148dae kerrottu 08.3x.

## ERÄ 2: PARIISI-PINO, KORTTI 3 MAALATTU TAIVAS (PT 07.5x, KK:n pyyntö) – AVOIN
- Kansio `/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/kuvat/pariisi-pino-20261110/` (pohja `docs/moduulit/tuotantopohjat/kysymys-omistajalle.md`). Kortit 1 ja 2 valmiit (1-kevyt-filmi.md, 2-pallon-elama.md + parit iPad pino1) → omistaja päätti 08.13.
- Kortti 3: luonnos `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/pallon-osat/kortti3-maalattu-taivas-luonnos.md` (päätökset 6.11. 18.49 "Kokeillaan", 22.15 "Kelpaa" kokeena vain Pariisissa, 7.11. 14.46 juna 220 sisäinen koe; suositus lopulliseksi). Täytä PERUSTELU_MUISTI, AIKA, MUISTI ajosta.
- AVOIN: JU ajaa `pallon-osat/sk-pino3-ipad.txt` (käännös 22e601e76) → `lokit/linssiseppa2-pino3-ipad-22e601e76` (p3-taivas-pois | p3-taivas-maalattu 85°, sama 75°:ssa; kevyt lähtö ilman aja-lentoa). Jos muistivahti pysäyttää: Mac-versio (Mac-ajossa talot kansio, ks. muisti). Pari 2000 px vas ilman | oik kanssa kansioon nimellä `3-maalattu-taivas-ipad-ilman-vas-kanssa-oik.png` + `3-maalattu-taivas.md` → polku PT:lle ja KK:lle. Kuvaskripti mallina `pallon-osat/pino1.py`.

## VALMIIT TÄLLÄ VUOROLLA
- FPV-vuoret: OMISTAJA 9.11. 19.46 "Ei, oranssi myös lentoon" (maalaus pois) → it. 13 **0809231b9** (fpv-vuoret-k2: poltettu oranssi + kumpareet/uurteet vain valona); OMISTAJA 20.05 "Kelpaa (Suositus)" – jää FPV-kokeeseen, ei junaan. Maalausversio talteen `linssiseppa2/fpv-vuoret-maalaus-it12` (ba9592bac). Työlistarivi valmis. Kuvat `_tyo/linssiseppa2/fpv-vuoret/parit-vuoret{9..13}/`.

## MUUT AVOIMET (ennallaan)
- Merenpohjan syvyyden puristus 97b4f29a9 KS:n koelaatoilla, kun JU on vienyt ne. KS:lle avoin: kohokartan poltetun varjostuksen suunta 315°?
- Kohokartan aurinko (cd74573cd junassa 223): syvyyskuva varmistettava laiteajossa.
- Valovahti: Aurinko.cs vari 4 > 3, KartanElama.cs, KaupunkiPuu.shader ylittävät jo ennestään.
- Remote Control: ei tehdä (vain omistajan pyynnöstä). Asemataulu jäädytetty 9.11. 23.08; työlista tyolista.py:llä (`python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava VS`).

## TEKNIIKKA
Numpy/cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`; PIL `/opt/homebrew/bin/python3 -I`. `sh ./unity-tarkistus.sh` kansiosta `Linssit-testit/` (~2 min; varjostimet kääntyvät vasta ajossa). Muokkaukset python-skriptillä (.tmp + os.replace + copymode). tee_tileset.py-muutoksen jälkeen .shadergraph generoidaan ja MatkakirjaRasteri.shadersubgraph palautetaan (`git checkout --`). Luovutus plumbingilla origin/mainin päälle omaan haaraan.
