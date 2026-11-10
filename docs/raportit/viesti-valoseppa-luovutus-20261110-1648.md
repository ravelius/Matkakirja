# Valosepän luovutus 10.11.2026 klo 16.48. Itsenäinen: vanhoja ei tarvitse lukea (korvaa 20261110-1355:n)

Syy: konteksti 25 % (pehmeä raja). Tili sami.reivinen@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Worktreet: k31 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k31` (`linssiseppa2/vesi-taytto-tausta` c346c2c57, puhdas, pushattu), k32 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k32` (`linssiseppa2/eiffel-korostus` c1e811eed, puhdas, pushattu). Kuvat vain JU:n vuorolla. Id:t: PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; JU `local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; KK `local_d5f31591-21fa-4cb0-bab3-bcd3435d075a`; KS `local_7b57e35a-3a8e-4943-aba1-c960b9eb4671`; Postivahti `local_1f31f830-9df5-41c1-8992-172e100af57f`. Viestit `mcp__ccd_session_mgmt__send_message` id:llä. Työlista: `python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava VS`. JU:n jonoloki: `/Users/Shared/Claude/julkaisija-tyokalut/jono-20261103-ilta.txt` (seuraa Monitorilla `tail -F | grep vesit|VS |korostus`).

## ERÄ A: VEDEN PILARIREIKIEN TÄYTTÖ TAUSTASÄIKEESEEN (PT 14.3x, NS:n tahdistus-1b-löydös) – KORJAUS VALMIS, iPAD-MITTAUS JONOSSA
- Löydös: "kaupunki: vesi: varadatan pilarireiät täytetty (125 reikää, 3004 neliötä, 5007 ms)" (6406b2f9d) pysäytti Pariisin pallokierroksen 5,3 s isolla iPadilla.
- Pelaajalla? KYLLÄ varadatalla (CesiumKaupunki juna-224 r. 455–461: Googlen 429/401/403, GoogleSallittu false, Google-lippu pois; automaattiajot aina). Googlen toimiessa ei ajeta.
- **c346c2c57** (natiivi-backup `linssiseppa2/vesi-taytto-tausta`, pohja julkaisija/juna-224 6087868bf): Reiat + Tayte + kärjet/uv Task.Runissa omalla VesiMaastoPainallus-oliolla; pääsäikeessä vain Mesh (TaytaValmis); valmis olio korvaa painalluksen; Sulje hylkää. Lokirivi "... täytetty (N reikää, M neliötä, taustalla X ms, pääsäikeessä Y ms)". unity 0.
- Perustelut ja skenaario: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/vesitaytto/LUE.md`, `sk-vesitaytto-ipad.txt`. Mac ei kelpaa (vesi ei lataudu Mac-ajoissa).
- AVOIN: JU:n PK13-ketjussa (NUI-4 → PK v131 → **VS vesitäyttö** → PE ×3) → `lokit/linssiseppa2-vesitaytto-ipad-c346c2c57` (kansio on jo olemassa tyhjänä 16.05:n levyvirheestä; tarkista konsoli.txt:n aika). 16.05 ajo kaatui levytilaan (< 12 Gi). Tulosta: grep "pilarireiät täytetty" + kehysajat/pitkä ruutu kierroksen alussa. Hyväksyntä: pääsäikeessä ≤ 20 ms, ei > 100 ms ruutua täytön kohdalla → PT:lle 3 riviä + MR-pyyntö JU:lle (PT päättää junan). Huom.: myös RantaReiassa/Paina käyttävät ruutuhakua pääsäikeessä paloittain – katso samasta ajosta.

## ERÄ B: PARIISIN KOODINÄHTÄVYYDET "MALTILLINEN KOROSTUS" (OMISTAJAN PÄÄTÖS 16.17, PT:n välittämä) – EIFFEL KS:N KERTOIMELLA
- KS teki yhteisen kertoimen: karttaseppa/korostus 93ba52043 → (minun) c1e811eed → KS:n vaakakatto **3c3c12be6** (kärki). K = 2. Korostus.Vaaka(L) = min(K, (L+150)/L), korkeus aina K. Eiffel 125 m → vaaka 2 (250 m), korkeus 660 m. Eiffeliin ei tarvita omaa koodia.
- **c1e811eed** (minun, `linssiseppa2/eiffel-korostus`, nyt KS:n haaran sisällä): koodimallin ollessa päällä Tripo on piilossa → Kylttikohde.Jalanjalki/MalliNakyy palauttivat false → kyltti keskipisteen alle tornin juurelle. Nyt Malli.KoodiNakyy (Paivita): kyltti, väistö, kameran esteet (NahtavyysEsittely), saapumiskuva käyttävät piilotetun Tripon muotoa (korostettuna samat mitat). Tripon ja koodin paikkaero 2,3 m. Koskee myös RK ja ND. unity 0.
- AVOIN: KS:n iPad I4 (ja Mac 45) kärjestä 3c3c12be6 + raivatut pohjat, sisältää Eiffel-kulmani (lähin 0.0005/45/0 ja viisto 0.004/70/30, nyt | k2). Katso: Eiffelin jalat eivät naapurikortteleissa (arvio todellisen koon kuvasta: 2× vie etujalat rantakadulle ja oikean jalan lähelle oikean puolen korttelia) ja kyltti ei peitä mallia. Jos jalat kortteleissa → ehdota KS:lle Eiffelille pienempi vaaka (Korostus.Vaaka(125) ja Korostus.Kerroin; muutokset KS:n haaran päälle). Parit kokoaa KS PT:lle.

## ERÄ C: EIFFEL KOODILLA, iPAD-VERTAILU – VALMIS (PT:llä 14.5x)
- `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/eiffel/parit-ipad-20fed45ff/` (3 paria täysikokoisina + LUE.md). GPU koodi 12,7 vs Tripo 14,1 ms (lämpö Kuuma). muisti-tarkka.log oli vanha (14.23–14.33), arvio LUE.md:ssä. Työlistassa tilanne päivitetty 15.0x. Yhteinen KK-kortti → korvautui omistajan päätöksellä 16.17 (ERÄ B).

## VALMIIT TÄNÄÄN
Varatalot #acb2b4 304ef710b junassa 224 (ba37edad9, 14.40); paletti 4d3b91842; Pallon elämä 62e148dae; Pariisi-pino kortti 3; taivas lopulliseksi.

## MUUT AVOIMET (ennallaan)
- Työlistassa odottaa: Pariisin saumat ja mäkien varjostus (KK: suunnitelma tekotavasta).
- Merenpohjan syvyyden puristus 97b4f29a9 KS:n koelaatoilla, kun JU on vienyt ne. KS:lle avoin: kohokartan poltetun varjostuksen suunta 315°?
- Kohokartan aurinko (cd74573cd junassa 223): syvyyskuva varmistettava laiteajossa.
- Remote Control: ei tehdä. Asemataulu jäädytetty.

## TEKNIIKKA
PIL `/opt/homebrew/bin/python3 -I`; parityökalu `_tyo/linssiseppa2/valkoiset/pari.py`, iPad-täysikoko-parit scratch-skriptillä (2 kuvaa rinnakkain 24 px välillä). `sh Peli-testit/unity-tarkistus.sh` (sh, ei zsh). zsh: `"$R:polku"` rikkoo → lainaa koko `"ref:polku"`. Mac-esikatselussa vesi ei lataudu. iPad-konsolin kehysajat: jsonl-rivit "MATKAKIRJA kehysajat {...}" (gpuMs, lepo/liike p50/p95, lampo). "kaatui 1" ajorivillä = signaali 15 skenaarion lopussa, ei kaatuminen. Muokkaukset python-skriptillä (.tmp + os.replace + copymode). Luovutus plumbingilla origin/mainin päälle omaan haaraan.
