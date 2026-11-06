# Karttaseppä: luovutus 6.11.2026 klo 17.38 (KS)
Syy: konteksti 26 % pehmeän rajan yli, luonteva tauko, kun ajo 26 odottaa vuoroa. **Korvaa -1717:n; sen AJON 24 TULOS, PALOJEN TULKINTA, OPIT ja -1657:n OMISTAJAN PÄÄTÖKSET, Codex-kohta, TEHTY, AUKI, MUUTA ja OPIT pätevät edelleen** (git show 1b57c2a31:docs/raportit/viesti-karttaseppa-luovutus-20261106-1717.md; git show 3b34fdd56:docs/raportit/viesti-karttaseppa-luovutus-20261106-1657.md). Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki 3d78ea440; varmuuskopio natiivi-backup karttaseppa/ajo-yhteinen-26).

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. Ajo 26 on tilattu JU:lta, PT jakaa vuoron: Y 3d78ea440, `_tyo/karttaseppa/sk-pariisi-yhteinen-26.txt` (tuottaja `tee-sk-26.py`), 26 kuvaa, loki lokit/karttaseppa-yhteinen-26-b8-3d78ea440. Korjattu tilaus (ensin 11a9a2273, 23 kuvaa) oli 17.37 JU:n jonossa; **tarkista JU:n kuittauksesta, kumpi kärki ajettiin.** Jos 11a9a2273, VS:n osa menee ajoon 27 ja VS:lle kerrotaan. Älä yhdistä Y:hen ajon aikana.
3. Etäyhteys on vain KK:lla. Hookin työlistarivit: en päivittänyt, työkalu on PT:n.

## AJOSSA 26 (kaikki kääntämättä)
- **e23 + pääte `-pariisi1`** (11a9a2273): ElavaTyyliVersio e23; `pariisi = Striimi && TaloAlue.VenePala(z, x, y)`. Katettu vesi pois, laivat pois, sillat 17.24: vain näillä paloilla. Muu maailma e23-paloista (rajaus 16.46).
- **Sillat (OMISTAJAN PÄÄTÖS 17.24, ks. -1717):** `ElavaTyyli.OhutSilta` (brunnel=bridge ja minor/service/track/path tai subway) + `ViivaSeinella` (vähintään puolet viivasta Seinen vesialueilla id 2191006 ja 10837211, vähintään 30 m). Viiva `reunus`-maskiin leveydellä 0,9. 3D-sillat ohitetaan SiltaTiePois-ehdossa ennen tätä. Kanavien sillat rajattu pois, koska päätös koskee Seineä (kanavat ovat datassa myös class=river).
- **Lista KK:lle:** `_tyo/karttaseppa/sillat-20261106/lista.txt` (`sillat-lista.py`; 48/63 palaa, kerro se). Mukana mm. Pont d'Iéna (PT: nimeltä kuvassa ja listassa), Pont de l'Alma, Pont des Invalides, Pont d'Austerlitz, Pont National, Pont d'Issy, Passerelle Simone de Beauvoir, metrosilta (listalla "Quai de la Rapée"), Bercy, Tolbiac-seutu. Monessa nimi on viereisen kadun, koska lista hakee lähimmän nimen; **korjaa nimet kuvasta tai OSM:stä ennen KK:lle vientiä.**
- **Tarkista kuvista:** isojen tiesiltojen jalkakäytävät tulevat myös viivoina tien viereen (Austerlitz, National, Alma, Bercy). Jos näyttää sotkulta, kerro KK:lle ja ehdota, että viivat jätetään pois tiesillan vierestä. Iénalla on viisi rinnakkaista viivaa.
- **NUI:** f0384fdbe poimittu (218aea51e), lisa-kyltit-nui-2 skenaarion alussa. Ajon jälkeen lokin polku ja kyltti-rivien numerot NUI:lle (local_a3754ed8-f155-43b5-9095-b51e9e29ff53). Käännösvirhe NUI:n osasta NUI:lle.
- **VS db0a42148** (merge 3d78ea440, vain NotreDameKirkkoYhteinen.hlsl): kuvat po2-ita, us-eiffel-85b, us-nd-85, komento usvamitta ennen po2-itaa. Ajon jälkeen kansio ja sha VS:lle (local_3b36fe96-0199-4b17-9eb4-46a882ce7399), VS tekee parit ja arvion PT:lle. Käännösvirhe siitä VS:lle.
- **Codex #2171 ja #2172:** tarkistussummat ja tuontiportti OK (`codex-lod-20261106/saapunut-v3`, `tee-lod-v3.py`). Kansio NotreDameKoe/lod3-20261106. Notre-Dame karttapaletilla, raaka 6c2ae4076, **muunnettu 36,79 %** (yli 5,59 % ennen), joten katso väri erikseen; sävy 1.024 0.919 0.600. Riemukaari sellaisenaan f2f738430, sävy 1.010 0.926 0.643. Kuvat nd-yla, nd-45, nd-5, nd-5-taka, rk-yla, rk-45, rk-5, kukin -nyt ja -uusi. Riemukaaren holvista 5° suurennettu rajaus.

## AJON 26 JÄLKEEN
1. **Raita:** palat `palat/`-alikansiosta, tulkinta -1717:n PALOJEN TULKINTA 1. Tulos KK:lle, kopio PT:lle, päivitä `laikka-vesi-20261106/syy.md`. Omistajalle luvattu.
2. **Laivat:** pari ilman selitekaistaa ajosta 25 (`parit-yhteinen-25/kk/`), jos KK vielä pyytää.
3. **Sillat:** kuvat silta-beauvoir, silta-austerlitz, silta-iena, silta-national (rajaa kukin, koko kuva ensin), lista nimineen KK:lle.
4. **Katettu vesi:** kuva katettu-vesi, Richard-Lenoir. Kerro KK:lle, että muiden kaupunkien katettu vesi jää vanhoihin paloihin (PT).
5. **Codex:** parit nykyinen | uusi KK:lle ilman selitekaistaa, samat rajaukset kuin ajossa 23 (`parit-yhteinen-23/kk/`). KK vie omistajalle. Kuittaus Codexille vasta KK:n välittämästä päätöksestä; älä kirjoita Tripolle tai Codexille muuta ilman KK:n sanaa.
6. Oletus ei muutu: `koemalli`-komento ja lod-kansiot jäävät kokeeksi.

## ODOTTAA
- **KK:n 17.25 vastattu, jonossa KK:lla 17.3x:** Pont d'Iéna: ei 3D-siltaa, jää pois k52:n takia, tulee viivoina päätöksellä 17.24. Eiffelin vino reuna: Codexin 24p-alustan `eiffel-pohja.png` peiton raja, noin 247 m tornin akselista, ei karttatasa; kiveyskuvio loppuu reunaan. Ei korjausta ilman sanaa.
- **VS:n kovat varjot (omistaja 17.32, PT):** seuraavaan yhteiseen ajoon, kun VS antaa sha:n.
- **PT:** koti-haaran tiedostot odottavat sanaa (-1657).
- **Lopputulos junaan:** e23, -pariisi1 ja mallit vain KK:n ja omistajan kuvan jälkeen.

## OPIT
- Tarkista ehdon osuma aineistosta listana ennen ajoa: `class=river` toi kanavien sillat, ja lista paljasti sen ilman ajoa.
- Vesialueen `id` (OSM) erottaa Seinen kanavista; waterway-nimi olisi vaatinut viivan ja joen leikkauksen, joka ei toimi palarajalla katkenneelle sillalle.
- Viestit jonossa voivat hukkua nollauksen yli: VS:n 17.30:n viesti tuli vasta PT:n kautta. Katso muiden sha:t myös haaroista, kun PT mainitsee ne.

## LOPPUTESTIT (siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
