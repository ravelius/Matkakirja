# Valosepän luovutus 10.11.2026 klo 13.16. Itsenäinen: vanhoja ei tarvitse lukea (korvaa 20261110-0950:n)

Syy: konteksti 27 % (pehmeä raja), luonteva tauko: kaksi ajoa JU:n jonossa. Tili sami.reivinen@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Worktreet: k31 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k31` (`linssiseppa2/taivas-lopullinen-224` a51260865, puhdas, pushattu), k32 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k32` (`linssiseppa2/eiffel-koodi-kivi` 20fed45ff, puhdas, pushattu). Kuvat vain JU:n vuorolla. Id:t: PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; JU `local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; KK `local_d5f31591-21fa-4cb0-bab3-bcd3435d075a`; KS `local_7b57e35a-3a8e-4943-aba1-c960b9eb4671`; Postivahti `local_1f31f830-9df5-41c1-8992-172e100af57f`. Työlista: `python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava VS`.

## ERÄ 1: VALKOISET RAKENNUKSET KUUMAILMAPALLONÄKYMÄSSÄ (PT 13.1x, omistajan havainto 13.14) – AVOIN, KIIREELLINEN
- PT: selvitä syy, korjaa (koodimallit → KS, jos syy siellä), pari ennen|jälkeen PT:lle; syy ja korjausversio KK:lle. Tavoite: rakennukset samoissa väreissä kuin kartalla.
- JU: omistaja katsoi Macin Unity-esikatseluikkunaa (linja L1, ipad-pysty, Ultra, pistekerroin 1), ei iOS-simua. 13.14 alkaen NUI:n lontoo-saapuminen-1 ENNEN b85f0f8b9 (linkki-224), loki `lokit/esikatselu-20261110-131422/` (ajon aikana) → `lokit/nui-lontoo-saapuminen-1-b85f0f8b9`. Siinä talot ladattu ämpäristä (219/219), ei "atlas puuttuu" -rivejä.
- "Kuumailmapallonäkymä" = kartan pallon napautus → `OpasSovitin.AvaaKaupunkitila` (LS1:n kaupunkitila); skenaariossa `linssi opas kaupunkitila Pariisi`.
- PYYDETTY JU:lta 13.16: `_tyo/linssiseppa2/valkoiset/sk-kaupunkitila-pariisi-mac.txt` kahdesti: NYT b85f0f8b9 → `lokit/linssiseppa2-valkoiset-b85f0f8b9`, VERTAILU juna-223 85d3bab39 → `lokit/linssiseppa2-valkoiset-85d3bab39`. Vertaa p-1…p-4.
- Epäillyt (ei vielä todennettu): paletti 4d3b91842 EPÄTODENNÄKÖINEN (vain Lontoo + Pompidou -vakiot, 13 Tripo-atlasta tavu tavulta ennallaan). NS b2273c132 (puuttuva astc-atlas → `new Texture2D(2,2)` paikkakuva, voi näkyä valkoisena) + KS 94b11251a (talopalat palvelimelle) — hae unity.logista "astc: atlas puuttuu" / "atlas ei avaudu, paikkakuva". Muut 224:n merget: `git log --oneline 85d3bab39..b85f0f8b9`.
- Jos syy NS:n tai KS:n muutoksessa → heille id:llä + PT:lle rivi; muuten korjaa itse uuteen haaraan juna-224:n päälle.

## ERÄ 2: EIFFEL KOODILLA (omistaja 09.36) – MAC-PARIT PT:LLÄ, iPAD JONOSSA
- **20fed45ff** (natiivi-backup `linssiseppa2/eiffel-koodi-kivi`) = KS:n 1281fef9e (kytkin Koodimallit.cs, Riemukaari, ND, TaloKivi 7bb48f690) + paletti + Eiffel. Kohde.Korvaa = "eiffel", komento `koodimallit eiffel 0|1` (vanha `ohjelmakohteet eiffel` = alias). Kivijalat TaloKivi.Kerro(0,92); ristikko pronssinruskea 0x6B5948→0x8E7C66 (PT: verrataan oikeaan torniin, ei Tripoon). Testit 27/27, portti ok, unity 0.
- Mac-parit valmiit, PT:lle 12.3x: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/eiffel/parit-mac2-20fed45ff/` (4 paria + LUE.md). Koodi 10 352 kolmiota / ~2,9 Mt verkko, ei tekstuuria; Tripo 97 184 kolmiota + 2048² ASTC + normaali. Tripo 2,4× liioiteltu (pohja 300 m, korkeus 795 m) → koodimalli oikeassa koossa näyttää pieneltä; korttiin valinta (Kohde.Koko-kerroin tarvittaessa).
- AVOIN: iso iPad `sk-eiffel-ipad.txt` → `lokit/linssiseppa2-eiffel-ipad-20fed45ff` JU:n OM-jonossa KS:n I3:n jälkeen samalla laitekäännöksellä 20fed45ff. Sitten: kuvat (lähin 45, lähin 70, viisto) pareiksi täysikokoisina PT:lle, muisti (`muisti-tarkka.log`, skripti mallina: ms = (aika − ALKU), N-rivi kenttä 4 = fp, 12 = gfx) ja kehysajat (konsoli "kehysajat" p50/p95, gpuMs) tripo vs koodi. PT kokoaa yhden yhteisen KK-kortin (Riemukaari + ND + Eiffel). Ei junaan ennen KK:n korttia.
- Vanhat haarat `linssiseppa2/eiffel-koodi` (013bf46dd) ja `-kytkin` (12cd6317e) jäävät, ei käytössä.

## ERÄ 3: TAIVAAN KOMMENTTI a51260865 – LIITETÄÄN SEURAAVAAN
- PT 10.4x: maalattu taivas jo 224.13:ssa (omistajan päätös 10.45 lopulliseksi, KK:lle ilmoitettu). a51260865 (natiivi-backup `linssiseppa2/taivas-lopullinen-224`) = vain kommentin koe-merkintä pois; EI omaa MR:ää eikä käännöstä → cherry-pick seuraavaan omaan junaan menevään haaraan.

## VALMIIT TÄNÄÄN (työlistassa valmis)
Paletti 4d3b91842 junassa 224 (4444e211a); Pallon elämä 62e148dae junassa (0421af91a, MR6, iso iPad huippu 3052 Mt); Pariisi-pino kortti 3 (`/Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/kuvat/pariisi-pino-20261110/3-maalattu-taivas*`); taivas lopulliseksi.

## MUUT AVOIMET (ennallaan)
- Työlistassa odottaa: Pariisin saumat ja mäkien varjostus (KK: suunnitelma tekotavasta).
- Merenpohjan syvyyden puristus 97b4f29a9 KS:n koelaatoilla, kun JU on vienyt ne. KS:lle avoin: kohokartan poltetun varjostuksen suunta 315°?
- Kohokartan aurinko (cd74573cd junassa 223): syvyyskuva varmistettava laiteajossa.
- Remote Control: ei tehdä. Asemataulu jäädytetty.

## TEKNIIKKA
Numpy/cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`; PIL `/opt/homebrew/bin/python3 -I`. `sh Peli-testit/unity-tarkistus.sh` (sh, ei zsh); `sh Kartta-testit/kaanna.sh OhjelmaKohde`; paletti `…/venv-rembg/bin/python -I tyokalut/karttapaletti_koodi.py tarkista`. zsh: `$J:A…` ja `$t:A…` rikkovat polun → `"${J}:polku"`. Mac-esikatselussa kaari alle lähimmän (1,68 km; lahizoomi 3 → 560 m) ei liiku. Muokkaukset python-skriptillä (.tmp + os.replace + copymode). Luovutus plumbingilla origin/mainin päälle omaan haaraan.
