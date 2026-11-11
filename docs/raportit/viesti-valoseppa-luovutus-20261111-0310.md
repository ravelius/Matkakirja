# Valosepän luovutus 11.11.2026 klo 03.10. Itsenäinen: vanhoja ei tarvitse lukea (korvaa 20261110-2236:n)

Syy: konteksti (pehmeä raja). Tili sami.reivinen@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup` (natiivin "main" = `julkaisija/juna-224`). Ainoa worktree k33 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k33`, nyt haarassa `linssiseppa2/koodiviiva-pois` aea72af54, puhdas ja pushattu. Kuvat vain JU:n vuorolla. Id:t: PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; KK `local_d5f31591-21fa-4cb0-bab3-bcd3435d075a`; JU `local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; KS `local_7b57e35a-3a8e-4943-aba1-c960b9eb4671`; LAV `local_f12c9179-a76b-4ce8-a1fe-1e0f2c8f251e`; Postivahti `local_1f31f830-9df5-41c1-8992-172e100af57f`. Viestit send_messagella id:llä. JU:n jonoloki `/Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt`. HUOM: viesteissäni klo 03.5x/04.1x = todellisuudessa noin 02.5x–03.0x (arvioin kellon väärin).

## LINJAT
- Näkyvä työ (3D, merkit, ilme, valikot, VALO): karkea kuva ensin KK:lle, PT kopiona; junaan vasta KK:n katsottua. Nähtävyydet 1:1 (omistaja 21.59).
- PT 23.1x: lepo aamuun; aamulla KK antaa tavoitteen "Pariisin saumat ja mäkien varjostus" (tekotapasuunnitelma).

## TEHTY 10.–11.11. (valmis)
- Erottuvuus 1:1 (398f974e2) Mac-ajo arvioitu: parit `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/erottuvuus/parit-1-1-398f974e2/` (LUE.md). KK 22.5x: viiva EI junaan; väri ja kyltti kantavat; viiva näytti piirtovialta (musta, yksipuolinen, katkonainen).
- 224.46: aea72af54 (`linssiseppa2/koodiviiva-pois`, e3fab21a6:n päällä) = 1:1-koodimallien (RK, ND) viiva oletuksena pois, Tripo-mallien v3-viiva ennallaan; komento `koodiviiva 1` kokeisiin (globaali _KoodiViiva vain OhjelmaKohde.shaderin viivapassissa). Mac-tarkistus 23.06 ok, KK kuittasi, JUNASSA 7b5a45561 (MR38 → 224.46). Parit `_tyo/linssiseppa2/erottuvuus/parit-koodiviiva-pois-aea72af54/`. a891d3b10 (koko viiva pois) HYLÄTTY, ei käytössä.

## AVOIN 1: HYLLYVALO (PT 02.5x–03.0x, juoksupeli, LAV:lta) – selvitetty, korjaus LAV:lle ehdotettu
- `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/hyllyvalo/SELVITYS.md` (LUE; kohta 2 KORJATTU-versio pätee).
- Peli KÄYTTÄÄ V4_lattian valo_rgbm:ää (JuoksuV4Maailma.cs ~835/919, JuoksuLattia.shader:514). y 0 -lattian UV1 on pinta-alalla kunnossa.
- loota2:n näkyvät hyllyt (x -317…-316, z 41–45, y 0,47–0,48) = räystään varjo 0,09–0,11 sekä v115:ssä että v129:ssä. Kaista syntyy, koska lattia7 muutti sokkelin yläpinnat V4_lattiaksi (ennen sokkelin materiaali → luki pystysokkelin saarta).
- Ehdotus LAV:lle (03.0x): yläpinnat takaisin sokkelin materiaaliksi, lattia7:n yhdistäminen vain lattiatasolle. B: täyttöpeiton pohja ylös (globaali, vaatii parin).
- Kokeiltu ja HYLÄTTY: hyllyuv2.py (UV1-lainaus) koejuuressa `_tyo/linssiseppa2/hyllyvalo/koejuuri-hylly2` (APFS-klooni, voi jättää); skenaariot sk-hylly-perus/hylly2.txt valmiina, EI ajettu (ei tarvetta, ellei LAV pyydä).
- Seuraavaksi: odota LAV:n/PT:n vastausta. Jos PT haluaa VS:n tekevän A:n: materiaalimuutos LAV:n koejuuren kopioon, ajo sk-hylly-*.txt-pohjalla JU:lla, pari KK:lle.
- Python: numpy on käyttäjän site-packagesissa → `/opt/homebrew/bin/python3` ILMAN -I:tä (skriptit omasta kansiosta).

## AVOIN 2: KYNÄKOE + 1:1-VIIVAN UUSI VERSIO – odottaa kameraa
- KK 22.5x: uusi viiva vasta NUI:n kameran (lähemmäs + paisunta) jälkeen samalla kierroksella kynäkokeen kanssa. Tavoite: viiva yhtenäinen koko siluetin ympäri, ohuempi suhteessa malliin, lämmin tummanruskea (kartan muste), ei musta.
- KS 23.4x: vapaan kameran lähin 2,7× = b5ef8b0c9 (`karttaseppa/lahin-2-7x`, IsoisaLahinLeveys 0,525 → 0,195); pohja kaatui MR39b:ssä, KS-seuraaja rebasettaa junan päälle. Ei vielä päätetty KK/PT:n kameraksi → älä aja ennen päätöstä.
- Kynähaara 462e1f42f (`linssiseppa2/kyna-pantheon`; komento `kyna 0|1`, OhjelmaKohde.shader). Rebasaa uuden kameran + KS:n uusimman Panthéonin päälle (KJ10 b8fed770e on MR39:ssä), säädä pikselikoot, Mac-ajo `_tyo/linssiseppa2/kyna/sk-mac-kyna-pantheon-lahi.txt` (etäisyydet uudelleen) → pari KK:lle, kopio PT:lle.
- Viivan nykyinen koodi: OhjelmaKohde.shader (koodimallit, _KoodiViiva) ja NotreDameKirkko.shader (Tripo). Väri ja yhtenäisyys: kuoren (taakse) logiikka antaa yksipuolisen viivan → tutki ensin.

## AVOIN 3: VESITÄYTTÖ (erä B) – iso iPad tänään (omistajan päätös 20.23)
0829caa4e (`linssiseppa2/vesi-taytto-tausta-224b`, laitekäännös JU:lla 19.10). iPad-ajo → `lokit/linssiseppa2-vesitaytto-ipad-0829caa4e`; grep "pilarireiät täytetty" + kehysajat; hyväksyntä pääsäikeessä ≤ 20 ms, ei > 100 ms ruutua → PT:lle + MR-pyyntö JU:lle. Perustelut `_tyo/linssiseppa2/vesitaytto/LUE.md`.

## MUUT (ennallaan)
- Pariisin saumat ja mäkien varjostus (KK:n tavoite aamulla). Merenpohjan puristus 97b4f29a9 KS:n koelaatoilla. Kohokartan aurinko cd74573cd: syvyyskuva laiteajossa.

## TEKNIIKKA
PIL `/opt/homebrew/bin/python3 -I`; numpy-skriptit ilman -I. Parit: `_tyo/linssiseppa2/erottuvuus/parit11.py <loki> <ulos>` (RAJ 1000 px:n koordinaateissa × 2,752, 1:1-koordinaatit päivitetty). Mac-ajon skenaario: `oleta 300 piirretty [1-9][0-9][0-9] levyltä` alkuun; "PUUTE oleta elävä kesken" = tilarivi ei tulostu levossa, ei vika. `sh Peli-testit/unity-tarkistus.sh`. Luovutus plumbingilla origin/mainin päälle omaan haaraan.
