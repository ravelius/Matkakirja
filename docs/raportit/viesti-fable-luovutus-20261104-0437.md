# PT:n luovutus 4.11.2026 klo 04.37 (konteksti 30 %, pehmeä raja)

Edellinen: viesti-fable-luovutus-20261104-0304.md (89e4285f4); sen yö-ohje ja "JÄLKEEN AAMUN" -lista voimassa, tila korvattu tällä.
Vahdit Monitorilla 30 min: python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py | grep --line-buffered -E 'ODOTTAA|TYHJÄKÄYNTI|TILA\|.+' ja /Users/Shared/Claude/hooks/codex-posti-vahti.sh. Viritä heti.
Omat ajastukset katoavat: viritä 05.17 (kuvat tulossa; määräaika 05.30). Taustaodottaja kansiolle lokit/julkaisija-yhd2-iso-a6c11c1d2/muistivahti-tulos.txt ja sama yhd3:lle.
YÖTILA: omistaja nukkuu, KK hyväksyy puolesta (ei TF, ei junan lukitusta, ei ostoja, ei asetuksia, ei yli 3 % generointia). Kuvat PT:n kautta KK:lle; katso itse ennen vientiä. Lista: /Users/Shared/Claude/proto-3d/lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md (osiot k34, k28-iPad, f5c1, 15l). KK local_d5f31591.

## ENSIN: AAMUN KOKO PARIISI (ei junaan)
1. **yhd2 = aamun varma kuva: a6c11c1d2, iso iPad, alkoi 04.11, valmis noin 04.50**, lokit/julkaisija-yhd2-iso-a6c11c1d2/ (32 kuvaa, sk _tyo/linssiseppa2/pariisi-tyyli/k33/sk-k33.txt; 28 json-kuvaa + muut, yht. 54 laitteella). JU antaa rivin.
   Kun valmis: KATSO kuvista, että nähtävyydet ovat näkyvissä (Eiffel, Riemukaari, Louvre, ND, Invalidit, Pantheon, Sacré-Cœur, sillat): lokin "kuva puuttuu" ei todista mitään (JU). Muisti uudesta ajosta ratkaisee (edellinen 3477 Mt oli ILMAN nähtävyyksiä; yli 4080 = VIKA, k28 jää). Pari: python3 -I /Users/Shared/Claude/proto-3d/lokit/pt-laaja-pari/laaja_pari.py <k-k-laaja.png> yhd2 4.4 (tulos pt-laaja-pari/yhd2-vs-2029.jpg) KK:lle. KK katsoo ennen omistajaa.
2. **yhd3 = ff97c7f8c (a6c + NS: puutarhat jonoon 2994 nimien alle, KK 04.12), lyhyt sarja 6 kuvaa** yhd2:n jälkeen, noin 05.05, viim. 05.25, lokit/julkaisija-yhd3-iso-ff97c7f8c/: k-laaja, e-0-13, ruudun-levyinen, y-eiffel, y-plantes, y-tuileries. Tarkista: Eiffel-torni, Hôtel des Invalides, Pariisin suurmoskeija eivät katkea; puutarhat näkyvät pinnan päällä (pinta jono 2000, ei ajettu). Muisti 6 kuvasta vain suuntaa antava. KK valitsee aamuun. Myöhästyy tai epäonnistuu: yhd2.
3. Polut uusinnasta: KS (uusi nollaus tulossa; nähtävyydet, sillat, nimet, Louvre-nimi, Palais-Royalin kiila, Port de l'Arsenal k-laajasta, r-0-21 nimimäärä), VS (vaaleat alueet: arvio odottaa uusintaa), NS.
4. **iPad-kansio:** Documents/kartta-osat jää isolle iPadille; kun se on olemassa, koodi lukee kuvat VAIN sieltä (PiirrosKerros.Esineet.cs:265–296). Poisto aamuajon jälkeen vain PT:n rivillä JU:lle; ennen sitä ei muita karttakuvia. Sitten JU:n jono: PK:n iPad-sarja be5632bdb (pk-be56-laite.zsh) ja peitto-be56 + LAV koeajo4 + Tripo palvelijatar. iPad on pidossa Pariisille: lupa JU:lle PT:ltä.

## PÄÄTÖKSET TÄNÄ YÖNÄ (KK)
- k34-pinta kelpaa aamuun, kun nähtävyydet palaavat. Väri a6c: katot 174/141/107 (2029 170/139/106), ei uutta kerrointa. Ratapihat L 153. Tuileries 15l hyväksytty; vastarannan rivi maalla, ei toimia.
- EI aamun ehtoja: saumat lon 2,4609 ja noin 2,2415 (näkyvät täysikoossa e-0-13, suhde 2,0–3,0; lopulliseen ei saa jäädä pystyrajaa), tasoraja z15|z16 (L 164 → 174), 0,21:n nimimäärä (paluussa vähemmän nimiä, syy auki), nimet häivytysvyössä, Montmartre-nimi, d-kaide v2 (json:ssa v1), kulu z13 467 ms / z14 687 ms, Sentierin katkoviivat (VS: z16–17:n julkisivunauha, varmistamatta), haalea suorareunainen sävyero (NS: onko julkaistussa).
- Pinta EI junaan ennen NS:n vieritysmittausta (kulu nousi k24:stä).

## JÄLKEEN AAMUN (lisäys edellisen listaan)
- KS: Montmartre A: nimi Sacré-Cœurin kuvan viereen Rue Lepicin puolelle, tarkka poikkeus, oma commit. OpenFreeMap-rike: KS luki paloja, robots 403, lupa varmistamatta; lisähaut kielletty, KK:n aamulistalla.
- Tarkista KS:n nollauksesta: luovutus 560c77c23 oli ennen Montmartre A:ta ja hakukieltoa. Lähetä uudelle KS:lle, jos puuttuu. Puutarha-Eiffel-kysymys ratkaistu NS:n commitilla.
- puutarha-tuileries-v2 404 ämpärissä: hoidettava ennen vientiä; ei vientiä nyt.

## JUNA
- PK: palikkakuvio (malja2-120, z −132,8, 0,4 s, v10–v12) on VIKA, ei junaan ennen syytä ja korjausta (KK). Ehdokas cb8b1f06c ajamatta, runko a368fdf29 JU:lla v14:n jälkeen; 217:ssä sama ehto, kuviota ei todettu; iPad-muisti mittaamatta.
- PK be5632bdb: b1 ja taivas korjattu Macilla; b8-4s Puyi piilossa seinän ylityksessä, ei 8/8; 2.177 pysyy; kesto tallenteesta, tuomio KK:lle PT:n kautta.
- v13 lätäkkö KK:lla, sirpalekuvio hyväksytty, v14 2eb260f77 (välkkyminen) ajamatta. Mätä omena: Codex v2 tilattu (6d549e0b8, aloitus 8bb9c7a29), pois junahaarasta (d70494795).
- LAV: friisi 2 cm + UV korjattu, ei nähty; koko palatsi koeajoon katot-v125/koeajo4/ JU:n jonossa.

## Nollaukset yöllä
JU 31995bd91, PK 3e90cb658, NS e4b442808→5a8021aa1, KS 560c77c23 tulossa. Tarkista jokaisesta tuoreet käskyt.

## Opit
- Älä kirjoita syytä viestiin arviona: annoin KK:lle "k29:n lisäterävyys" ilman mittausta ja oikaisin.
- Kopio Documents/kartta-osat pudottaa kaiken muun: aina koko esine-puu.
- Lokin "kuva puuttuu" ei ole todiste; pyysin sitä turhaan.
- Älä kirjoita tyolistan tilanteeseen sanaa "valmis" keskeneräisestä (hook).
