# Valosepän luovutus 10.11.2026 klo 13.40. Itsenäinen: vanhoja ei tarvitse lukea (korvaa 20261110-1316:n)

Syy: PT:n ja Postivahdin nollauspyyntö 13.4x; uusinta JU:n jonossa. Tili sami.reivinen@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Worktreet: k31 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k31` (`linssiseppa2/varatalot-vari-224` c0b51a7e4, puhdas, pushattu), k32 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k32` (`linssiseppa2/eiffel-koodi-kivi` 20fed45ff, puhdas, pushattu). Kuvat vain JU:n vuorolla. Id:t: PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; JU `local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; KK `local_d5f31591-21fa-4cb0-bab3-bcd3435d075a`; KS `local_7b57e35a-3a8e-4943-aba1-c960b9eb4671`; Postivahti `local_1f31f830-9df5-41c1-8992-172e100af57f`. Työlista: `python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava VS`.

## ERÄ 1: VALKOISET RAKENNUKSET KUUMAILMAPALLONÄKYMÄSSÄ (PT 13.1x, omistajan havainto 13.14) – KORJATTU, PARI AVOIN
- SYY (todennettu): Mac-esikatselu on automaattiajo → `kaupunki: data Google … automaattiajo True → Ion` (PT 12.10. kiintiöpäätös) → ionin OSM-talot 96188 ilman tekstuuria = valkoiset laatikot. Sama jo juna-223:ssa: JU:n pari `lokit/linssiseppa2-valkoiset-85d3bab39` ja `-b85f0f8b9` (p-3-40s, p-4-70s) molemmat valkoiset. Pelaaja näkee Googlen värikuvan. NS:n/KS:n muutokset eivät syy (ei atlas-puuttuu-rivejä). PT:lle ja KK:lle kerrottu 13.2x.
- KORJAUS **c0b51a7e4** (natiivi-backup `linssiseppa2/varatalot-vari-224` = juna-224 f27c38481 + taivas eb0d76199 (= a51260865, ERÄ 3) + `CesiumKaupunki.VaraTaloVari` #b79474 (kartan talon täyte mitattuna Pariisin ja Lontoon kartasta), `OnTileGameObjectCreated` → `_baseColorFactor` lineaarisena). unity-tarkistus 0 virhettä.
- Ajo `lokit/linssiseppa2-valkoiset-c0b51a7e4` (JU 13.35): talot ruskeat (p-4-70s), MUTTA maan ilmakuva ei latautunut (unity.log Curl error 28, 0 tavua) → vihreä maa; ei pariksi.
- AVOIN: JU:n uusinta (PL2) → `lokit/linssiseppa2-valkoiset-c0b51a7e4-b`, rivi JU:lta. Sitten pari ennen `-b85f0f8b9` | jälkeen `-c0b51a7e4-b` täysikokoisina PT:lle (sama hetki, esim. p-4-70s; kameran paikka voi erota – valitse lähin), korjausversio KK:lle. Arvioi sävy: valaistuna punertavampi/tummempi kuin kartta – tarvittaessa vaaleampi kerroin. Junaan vasta PT:n kuittauksella (MR haarasta).

## ERÄ 2: EIFFEL KOODILLA (omistaja 09.36) – MAC-PARIT PT:LLÄ, iPAD JONOSSA
- **20fed45ff** (natiivi-backup `linssiseppa2/eiffel-koodi-kivi`) = KS:n 1281fef9e (kytkin Koodimallit.cs, Riemukaari, ND, TaloKivi 7bb48f690) + paletti + Eiffel. Kohde.Korvaa = "eiffel", komento `koodimallit eiffel 0|1` (vanha `ohjelmakohteet eiffel` = alias). Kivijalat TaloKivi.Kerro(0,92); ristikko pronssinruskea 0x6B5948→0x8E7C66 (PT: verrataan oikeaan torniin, ei Tripoon). Testit 27/27, portti ok, unity 0.
- Mac-parit valmiit, PT:lle 12.3x: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/eiffel/parit-mac2-20fed45ff/` (4 paria + LUE.md). Koodi 10 352 kolmiota / ~2,9 Mt verkko, ei tekstuuria; Tripo 97 184 kolmiota + 2048² ASTC + normaali. Tripo 2,4× liioiteltu (pohja 300 m, korkeus 795 m) → koodimalli oikeassa koossa näyttää pieneltä; korttiin valinta (Kohde.Koko-kerroin tarvittaessa).
- AVOIN: iso iPad `sk-eiffel-ipad.txt` → `lokit/linssiseppa2-eiffel-ipad-20fed45ff` JU:n OM-jonossa KS:n I3:n jälkeen samalla laitekäännöksellä 20fed45ff. Sitten: kuvat (lähin 45, lähin 70, viisto) pareiksi täysikokoisina PT:lle, muisti (`muisti-tarkka.log`, skripti mallina: ms = (aika − ALKU), N-rivi kenttä 4 = fp, 12 = gfx) ja kehysajat (konsoli "kehysajat" p50/p95, gpuMs) tripo vs koodi. PT kokoaa yhden yhteisen KK-kortin (Riemukaari + ND + Eiffel). Ei junaan ennen KK:n korttia.
- Vanhat haarat `linssiseppa2/eiffel-koodi` (013bf46dd) ja `-kytkin` (12cd6317e) jäävät, ei käytössä.

## ERÄ 3: TAIVAAN KOMMENTTI a51260865 – MUKANA c0b51a7e4:n HAARASSA (eb0d76199)
- Ei omaa MR:ää; menee junaan ERÄ 1:n haaran mukana.

## VALMIIT TÄNÄÄN (työlistassa valmis)
Paletti 4d3b91842 junassa 224 (4444e211a); Pallon elämä 62e148dae junassa (0421af91a, MR6, iso iPad huippu 3052 Mt); Pariisi-pino kortti 3 (`/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/kuvat/pariisi-pino-20261110/3-maalattu-taivas*`); taivas lopulliseksi.

## MUUT AVOIMET (ennallaan)
- Työlistassa odottaa: Pariisin saumat ja mäkien varjostus (KK: suunnitelma tekotavasta).
- Merenpohjan syvyyden puristus 97b4f29a9 KS:n koelaatoilla, kun JU on vienyt ne. KS:lle avoin: kohokartan poltetun varjostuksen suunta 315°?
- Kohokartan aurinko (cd74573cd junassa 223): syvyyskuva varmistettava laiteajossa.
- Remote Control: ei tehdä. Asemataulu jäädytetty.

## TEKNIIKKA
Numpy/cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`; PIL `/opt/homebrew/bin/python3 -I`. `sh Peli-testit/unity-tarkistus.sh` (sh, ei zsh); `sh Kartta-testit/kaanna.sh OhjelmaKohde`; paletti `…/venv-rembg/bin/python -I tyokalut/karttapaletti_koodi.py tarkista`. zsh: `$J:A…` ja `$t:A…` rikkovat polun → `"${J}:polku"`. Mac-esikatselussa kaari alle lähimmän (1,68 km; lahizoomi 3 → 560 m) ei liiku. Muokkaukset python-skriptillä (.tmp + os.replace + copymode). Luovutus plumbingilla origin/mainin päälle omaan haaraan.
