# Valosepän luovutus 3.11.2026 klo 23.46

Syy: konteksti 26 % (Raamattu 7.37), luonteva tauko: odotan KK:n vastausta k15:stä.
Edellinen: viesti-valoseppa-luovutus-20261103-2325.md (pysyvät työtavat, KK:n lista). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (B = tämä kansio). Python: `$B/tulivuoret/venv/bin/python -I`.
Esikatselu vain JU:n vuorolla (JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd). Viestit PT:lle ≤ 3 riviä, mcp__ccd_session_mgmt__send_message id:llä. Haara linssiseppa2/pariisi-k12 → natiivi-backup, EI origin.

## Tila
- **k15 = 2d4eb4fad** (wt /Users/Shared/Claude/wt/proto-linssiseppa2-k12, p15, Kartta-testit 596/596). EI pelissä, EI nähty laitteella. Sisältää k14 + aukio-poisto + värit + 4 siirtoa. Pari: $B/pariisi-tyyli/k15/pari-sama-mittakaava-paikallinen.jpg, tulos k15/TULOS.md.
- k14 ed744428d / b9d044fb6 ohitettu. Pyysin JU:ta perumaan k14:n ajot; kuittaus puuttuu, tarkista JU:lta.
- **PT: laiteajo vasta KK:n vastauksen jälkeen, ellei vastaus tule pian.** Sitten JU:lle k15/ajo.zsh (sk-k15: p-odeon, lähi, keski, laaja) + iso iPad, kamera `aja 48.8515 2.3385 0.005 2`, kuva VS + PT.

## Seuraavaksi
1. Laitekuva tullut: vertaa KK:n kuvaan samassa mittakaavassa, varmista f (alla), pari PT:lle.
2. KS:n vastaus Montparnassesta (ehdotus: VS maa nurmipinnalla koko Pariisin vaiheessa, KS puut + hautakivet; landuse cemetery). Ei toteutettu. KS:lle pitää myös kertoa k15: hänen pintansa on nyt sovitettu väreihin (k15/pinta.py, lähde k15/kortteli-a2-k14.rgb); viesti ei ole vielä lähtenyt, jos tämä rivi on viimeinen merkintä.
3. Koko Pariisi on PT:n käskyllä tauolla, kunnes korttelit näyttävät 2029:ltä. Yhdistäessä: 135e03994:n siirrot ovat jo k15:ssä; PienetAlueet Z16–17 -versio 43df66241:ssä EI saa tulla takaisin.

## k14/k15:n ratkaisut
- Korttelikartta (ElavaTyyli.Korttelikartta): Z14-datapalasta 1,6 m ruudukko, täyttö alle 8000 m² ja alle 24 m raot; sama Z14–Z17:llä. Alue, joka ylittää Z14-palan rajan ja on yli 24 m leveä, jää täyttämättä molemmin puolin.
- Kadut piirretään talojen päälle; leveys metreinä (KatuLeveysM). KadunReunat poistettu; nauha ja muste kadun viivasta, vain talon päällä.
- Sisäseinät kattopinnalla, seinät 0,5, kattopinta mip+1 (KattoTiheys), aukiot 0,7 kohti kadun väriä.

## Epävarmat
- **f (ruudun lämmitys) = 250/240, 220/216, 152/164**: vain iPad a57c0b473:n yleisin väri (kadut) vs. Katu. Yksi väri, lähde koodissa löytämättä. Katu 234/212/183 ja pinta nojaavat tähän. Paikalliset parit on kerrottu f:llä; k14:n pari ei ollut, joten PT:n "liian sininen" osin johtui siitä.
- Väriraja: lon 2,373 = Z14 | Z13 -talokerros (p90 sama). x ≈ 950 ei ole sama: esikatselussa porras ~5, iPadilla ei portaata. Kameran samuutta ei varmistettu, esikatselun portaan syy auki. Lounaan talot lon < 2,329 selittämättä.
- Korttelikartan kulua iPadilla ei mitattu (paikallinen Z17 146–220 ms/pala koko testiajossa, 4 kattomaskia lisää muistia).
- 2029 on pehmeämpi ja talot pyöreämmät; pelin pinta raidallisempi. Isot kermaiset alueet Luxembourgin pohjoispuolella.

## Muuta
- NUI: lon 2,351 -saumaa ei näy isolla iPadilla A2-pinnalla (iso-a2-9528c1d53); pieni iPad mittaamatta, b116b65a5 odottaa JU:n A/B-ajoa, NUI ilmoittaa.
- Paikallinen koe: k14/paikallinen/data (4 Z14-palaa), `ELAVA_KOE=<data> ELAVA_Z=17 ELAVA_ALUE=66384,45091,66391,45098 ELAVA_PINNAT=<wt>/Assets/StreamingAssets/ElavaKoealue sh <wt>/Kartta-testit/kaanna.sh`; kokoa: k12/paikallinen/kokoa.py; pari: k15/pari.py.
- Wt proto-linssiseppa2-k12b poistettavissa (aukio-poisto tehty).

## LISÄYS 23.4x: UUSI TEHTÄVÄ (PT, KK 23.42; ohittaa "Seuraavaksi"-järjestyksen, ei aloitettu)
Korjauslista /Users/Shared/Claude/proto-3d/lokit/kk-peli-a94d8e7fb-20261103/KORJAUSLISTA.md kohdat 6–9, kuvat suorat-saumat.png ja 2029-vs-laaja.png. Kaikki SAMAAN versioon väri- ja toistotyön kanssa. Todistus iPadilta, myös kohdat 2,2961 ja 2,3071.
6. Suorat saumat KK:n silmämääräisen arvion mukaan z15-palojen rajoilla (2,2851, 2,2961, 2,3071, 2,3401; myös 2,285 ja 2,351): varmista ja etsi YHTEINEN syy, ei yksi kohta kerrallaan. Vertaa omaan tulokseen lon 2,373 Z14|Z13. Huom: nämä lon-arvot ovat koealueen ulkopuolella (koealue 2,329–2,363), paitsi 2,3401 ja 2,351, joten kuva a94d8e7fb on NS:n koko-koe, ei k15.
7. Laajin zoom on suurin ero 2029:ään: sama pinta myös sille, ohuet kermanväriset kadut.
8. Mäkivarjostus pois piirroskaupungin alueelta (Chaillot, Montmartre).
9. Hautausmaat oliivinvärisiksi polkuruudukolla; tarkista muutkin. KS 23.4x hyväksyi: VS piirtää maan; rajat _tyo/karttaseppa/pariisi-koko-esinepaikat-20261103/hautausmaat.json (51, renkaat ENU), puut jo puut.json:ssa (NS 159acdf0c), hautakivet KS kysyy PT:ltä. Oliivi on KK:n uusi ohje; KS:lle sovittu "nurmipinta" tarkennettava.
KS:n pinta k6: _tyo/karttaseppa/pariisi-ylaviisto-20261103/tarkistus-a2-k6/k6.png (sha256 ba2b80c247b9…, vain katon sävy k5:stä, ei nähty pelissä). KS pyytää k14:n tilalle ja saman parin. EI vielä kokeiltu: k15:n pinta.py sovittaa k5:n väreihin, joten vertaa k6 sellaisenaan × f | k6 pinta.py:n läpi, ja kerro KS:lle, hallitsevatko seinät 0,5 ja pihojen kehät.
JU peruutti k14-ajot (ei alkaneet) ja odottaa uutta SHA:ta. Montparnasse-kohta "Seuraavaksi 2" on tämän kohdan 9 alla.

## LISÄYS 23.5x: k16–k18 TEHTY (ohittaa yllä olevan "Tila"-osion SHA:t; Postivahti: jatka alle 35 %, siksi jatkoin)
- **k18 = be33acfb0**, haara **linssiseppa2/pariisi-k17** (natiivi-backup), wt **/Users/Shared/Claude/wt/proto-linssiseppa2-koko17**, p18, Kartta-testit 607/607. = NS:n koko-koe-218 628d1a90a + k16 2bd343836 + kohdat 7, 9. EI ajettu laitteella eikä Unityssä. Vanha wt proto-linssiseppa2-k17 on eri asia (haara pariisi-tyyli): älä käytä.
- Kohta 6: yhteinen syy päätelty: a94d8e7fb:n PienetAlueet palakankaalla kaikilla Z:lla (täyttö riippuu palasta). Korjaus: Z14-korttelikartta + rajaa ylittävä alue jää täyttämättä molemmin puolin. Paikallinen Z15 (4 Z14-palaa, lon 2,329–2,373): lon 2,3401 ja 2,3511 sarake-ero normaali, ei saumaa silmin. y=511 (Z14-rivi) ero 64 vs. mediaani 50: tarkista. 2,2851, 2,2961, 2,3071 EI mitattu (ei dataa paikallisesti): iPad ratkaisee.
- Kohta 7 osittain: kadut × 0,6 Z ≤ 13, massa Z ≤ 12 NS:ltä, Z13:lla ei taloja eikä täyttöä (lon 2,373 Z14 | Z13 jää). EI nähty. Korttelipinta Z13:lle tekemättä.
- Kohta 8 TEKEMÄTTÄ: KoealueKoostus ei käytä rinnevarjoa, joten varjostus tulee muualta (oletus: Z ≤ 10 esipoltettu pohja, EI todistettu).
- Kohta 9 tehty: landuse cemetery oliivi + polut (HautaVari, HautaJakso); Z15:llä ruudukko on tiheä verkko, katso laitteella. hautausmaat.json ei käytössä, koska data riitti. KS:n puut NS:llä.
- Kuplat: raot suljetaan ennen aluetäyttöä, ala 20000 m². HINTA: oikeita avoimia alueita täyttyy taloilla (esim. Luxembourgin palatsin kohta), tarkista raivaukset ja aukiot.
- Väri: k16/pinta.py k6:sta, mittari 50/56/67, 10,9 (2029 49/57/66, 12,6) paikallinen × f. Julkisivut paletista, useampi korttelityyppi ja vaihtelu tekemättä; pinta on tasainen ja raidallinen.
- Piirtoaika nousi: Z15 320 → 582 ms/pala paikallisesti (kuorma vaihteli, ei mitattu erikseen). Mittaa iPadilla.
- SEURAAVAKSI: 1) c1832c0c2 ja 4e929f038 k18:aan: merge pysähtyi Esineet/pariisi.json-ristiriitaan, peruin sen; sovi NS:n kanssa tai ota NS:n tiedosto. 2) Kohta 8. 3) ajo JU:lle: KK:n komentotiedosto (lokit/esikatselu-20261103-232150 / julkaisija-tyokalut/sk-koko-nahtavyydet-v2-ju.txt) + laajin zoom, iso iPad myös 2,2961 ja 2,3071. k15/k16-ajo.zsh:t ovat vanhoja, älä aja. Pari PT:lle → KK.
