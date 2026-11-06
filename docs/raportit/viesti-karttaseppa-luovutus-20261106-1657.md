# Karttaseppä: luovutus 6.11.2026 klo 16.57 (KS)
Syy: konteksti yli 25 %, luonteva tauko, kun ajo 24 on tilattu JU:lta. **Korvaa -1638:n; sen TEHTY- ja OPIT-osiot pätevät edelleen** (git show 3109b9915:docs/raportit/viesti-karttaseppa-luovutus-20261106-1638.md). Kaikki kokeena, ei junaan, ei iPadia. Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (haara karttaseppa/ajo-yhteinen-tasoitus, kärki 6a037d9bc; varmuuskopio natiivi-backup karttaseppa/ajo-yhteinen-24). Remote natiivi-backup, ei origin. L = /Users/Shared/Claude/wt/proto-karttaseppa-lod (poista, kun kevyiden mallien kokeen kohtalo on päätetty).

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. Ajo 24 on JU:lla: skenaario `_tyo/karttaseppa/sk-pariisi-yhteinen-24.txt`, 12 kuvaa, tulos lokit/karttaseppa-yhteinen-24-b8-6a037d9bc. Älä yhdistä Y:hen ajon aikana. PT jakaa vuoron. 10c8060de ja 6a037d9bc ovat kääntämättä: käännösvirhe NUI:n osasta NUI:lle, omasta korjaa itse.
3. Etäyhteys on vain KK:lla (Raamattu 7.9). Hookin työlistarivit: en päivittänyt, työkalu on PT:n.

## OMISTAJAN PÄÄTÖS 16.46 (KK:n viesti kokonaan)
"Saavatko Seinen litteät punertavat muodot lähteä kartalta, myös Bercyn suurempi, sijainnista päätellen uimala?" = "Kaikki pois (Suositus)"; kortin selite: "Laivat, uimala ja muut isot litteät muodot lähtevät joesta. Karttaseppä katsoo isot kuvista ensin, ettei oikea rakennus lähde."
KK:n tarkennukset (eivät laajenna päätöstä; PT jakaa vuoron):
1. Isot katsotaan kuvista ensin. Oikea rakennus ei lähde; epäselvä rivi KK:lle kuvan kanssa. **Tehty, ks. alla.**
2. Haalean raidan syy on omistajalle kerrottu auki; selvitä se tässä samassa ajossa. **Ajo 24 ratkaisee.**
3. Voiko e25:n korvata paikallisella päätteellä kuten -sillat1. **Tehty: -vene1.**
4. Ei junaan ennen kuin pari on käynyt KK:n ja omistajan kautta.

## ODOTTAA
- **KK, KYSYMYS lähetetty 16.5x:** Off Paris Seine (1 335 m²) on kelluva hotelli; suositus: lähtee. Jos jää, lisää poikkeus VeneVedessa-ehtoon keskipisteen mukaan, -vene2. Kuva orto/austerlitz-1335.jpg.
- **PT, kuka kirjoittaa Codex-kuittauksen (kysytty 17.0x):** mallit on päätetty, ks. seuraava kohta. PT 16.4x sanoi "KS itse", KK 16.53 "PT päättää". Ei kirjoiteta ennen PT:n sanaa. Kuittaus erikseen #2168 ja #2169, SHA:t d727752c ja 99a3d4ee, vain origin/claude/postilaatikko-haaraan.
- **OMISTAJAN PÄÄTÖS 16.53 (KK:n viesti kokonaan):** "Kelpaako Codexin korjattu Notre-Dame nykyisen tilalle kokeena?" = "Ei vielä (Suositus)"; selite: "Nykyinen pysyy. Katon hahmo ylhäältä, irralliset tuet ja tornien vaaleat tikkaat viedään Codexille." "Kelpaako Codexin korjattu Riemukaari nykyisen tilalle kokeena?" = hänen omat sanansa "riemukaaren sisäosa ei näytä oikealle". KK:n tulkinta, hänelle kerrottu: ei vielä, nykyinen pysyy, sisäosa Codexille. Oletus ei muutu: koemalli-komento ja lod2-kansio jäävät kokeeksi.
  - Viat kuittaukseen, omistajan sanat sanatarkasti, kuvat parit-yhteinen-23/kk/.
  - **Notre-Dame:** ylhäältä kaarituet irrallisina tikkuina, niiden välistä näkyy vaalea maa kohdassa, jossa nykyisellä on katto, ja poikkilaivan katot kapenevat kiilaksi (nd-yla); 5 asteesta vaaleat tikkaat tornien säleissä, vaikka Codex kertoi ne tarkoituksellisiksi (nd-5, nd-5-taka); takaa ja sivulta vihreä katto ja poikkilaiva leveitä ja laatikkomaisia, tuet ohuemmat ja kulmikkaammat kuin nykyisessä. Hyvää: kuori ja kaarituet takana, edestä terävä.
  - **Riemukaari:** KK:n kuvaus sisäosasta (rk-5, rk-5-uusi-x2): holvin sisäpinta tasainen ja vaalea ilman syvyyttä; keskellä vaalea suorakaide, jonka sisällä pieni kaari, näyttää liimatulta; nykyisessä holvi tummuu ylöspäin ja läpi näkyy selvästi taivasta. Muoto on sama kuin ajossa 18, koska silloin pyydettiin vain väriä. Lisäksi tumma viiva kaaren yläreunassa (rk-45), ohuet vaaleat viivat seinässä (rk-5), katon katkoviivat (rk-yla). Hyvää: holvin harmaa ja katon ruudukko poissa, veistokset terävämmät.
- **NUI (local_a3754ed8-f155-43b5-9095-b51e9e29ff53):** ajon jälkeen lokin polku ja kyltti-rivien rivinumerot; kuvat kyltit-eka ja kyltit-laikka. NUI on ajon 23 tuloksen mukaan vielä auki syyn suhteen; älä muuta koodia tämän takia.

## AJON 24 JÄLKEEN
Katso täysikokoisina, koko kuva ennen rajausta.
1. **Raita:** vertaa laikka-1 | raita-talot0 | raita-ohj0 | raita-veneet samasta rajauksesta (raita noin kuvan x 1516–1616, y 1760–1910; rajaus ajosta 23, voi olla sama). Jos raita katoaa yhdestä, se on syy. **Jos se on poissa jo laikka-1:ssä,** syy oli vanha pala tai -vene1:n uudelleenpiirto: kerro sekin, älä väitä muuta. **Jos raita jää kaikkiin,** syy on muu: seuraavat ehdokkaat kalotti (lokissa matkakirja-kalotti) ja pohja (Z10/Z9-vanhempi; vesi peittää sen, joten epätodennäköinen). raita-yla näyttää, onko raita kartan kohdalla.
2. **Pari KK:lle ilman selitekaistaa:** laikka-bercy ajo 23 | 24; ilmakuva | peli: orto/bercy-1951 | iso-bercy, orto/austerlitz-1335 | iso-austerlitz, orto/javel-1466 ja -1163 | iso-javel. Tarkista, että suunta täsmää (molemmat pohjoinen ylös).
3. **Syy kirjataan:** päivitä `laikka-vesi-20261106/syy.md` (ehto nyt 2 000 m², -vene1, isojen OSM-merkinnät), rivi PT:lle ja KK:lle.

## TEHTY TÄSSÄ SESSIOSSA
- **Isot neljä katsottu** IGN:n avoimesta ilmakuvasta (`hae-orto.py`, robots 404, vain katsottavaksi, ei peliin) ja OSM-otteesta (`isot-kaikki.py`), kansio `_tyo/karttaseppa/laikka-vesi-20261106/`, kooste orto/kooste.jpg: Piscine Joséphine Baker 1 951 (building=boat), Annette K 1 466 (houseboat, allas proomulla), Off Paris Seine 1 335 (houseboat, hotelli), way/787079304 1 163 (houseboat, ilmakuvassa laiva).
- **Yli 2 000 m²:** jokirenkaita ei ole. 2 310 = Réservoir de Grenelle (h=4, lake), 11 222 = h=5 pond; eivät täytä ehtoa, jäävät. Tarkistamatta: 15 palaa, eteläreuna y=5639 ja itäreuna x=8302 (ei välimuistissa, OpenFreeMapin robots 403). Saattavat sisältää Seineä kaakkoiskulmassa; raja 2 000 pysyy varmistuksena.
- **Koodi Y 6a037d9bc:** VeneMaxAla 2 000; ElavaTyyliVersio takaisin e24; TaloAlue.VenePala (z ≥ 13, alue + vara 0,002°) ja pääte -vene1 ElavaKuvassa. Testit ElavaKartta + TaloAlue 38/38. Ajamatta. e24 koskee yhä koko maailmaa; KK:lle kerrottu.
- **Raita ei ole palojen piirrossa:** `ElavaTyyli.Piirra` oikeasta z13/z14-datasta tasot z13–z17, renkaan kohdalla pelkkä vesi ja jokiviivat (koe ilman pohjaa, tasainen väri). Koe `PalakoeTesti.cs.txt` samassa kansiossa: kopioi Kartta-testit/Testit/PalakoeTesti.cs, `PALAKOE_MVT=<mvt> PALAKOE_ULOS=<kansio> PALAKOE_PISTEET="lat,lon;..." sh kaanna.sh Palakoe`. Ei commitiin. Piirroskerros on tällä kameralla pois, koska se näkyy vain suorassa pohjoiseen (PiirrosKerros.cs TaysiAst, NollaAst); päätelty koodista. Raita on haalea ja ylemmän laikan muotoinen, tummempi pää (`raita-tasot.py` listaa muut palan kohteet, muotoa vastaavaa ei ole).
- **NUI:n kylttilisä:** 10c8060de Y:ssä, skenaarion alussa.

## AUKI (ennallaan -1638:sta)
Pn-matala-2:n laikat silmämääräisesti; Pont Neufin raita jonossa; Tuileries'n ruskeat pisteet tutkimatta; Louvren haamu PT:llä ja VS:llä; Eiffel 85b VS:llä; kärkilaskenta iPadilla mittaamatta; Riemukaaren pienet viat.

## MUUTA
- Seuraava yhteisen ajon numero 25. Ajotilaus JU:lle: UNITY b8, Y + kärki, skenaario, loki karttaseppa-yhteinen-NN-b8-<sha>, 1 rivi "ratkaisee". Älä muuta skenaariota tilauksen jälkeen.
- Kartta-testit: `sh kaanna.sh <nimi>`, useita `"A|B"`. Python: /opt/homebrew/bin/python3 (numpy ja PIL eivät löydy -I:llä). Kuvat 2752 × 2064. Pelin palat: /private/tmp/*/Matkakirja/*/laatat/elava/mvt/<z>/<x>/<y>.pbf; piirretyt jpg:t häviävät ajon mukana (tmp), joten ajon palaa ei voi katsoa jälkikäteen.
- Väriparit samassa vuorokaudenajassa. Parit KK:lle ilman selitekaistaa.
- Ennen päätelmää: näkyykö vika samalta kameralta ennen korjausta.
- `elavakartta rakennukset nyt` piirtää renkaat ilman veneehtoa (ElavaTyyli else-haara); älä käytä raidan testissä.

## OPIT
- Kerro kuvamäärä tilauksessa vasta laskettuasi rivit skenaariosta; sanoin ensin 15, oikea 12, korjaus JU:lle erikseen.
- Tarkista palojen piirto oikeasta datasta ennen ajoa: koe vei minuutin ja rajasi kerroksen. OSM-ote osm.json (`ways`: osm, t, p) kertoo kohteen laadun ilman verkkoa.

## LOPPUTESTIT (siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
