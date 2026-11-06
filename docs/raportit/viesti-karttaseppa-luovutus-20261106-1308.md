# Karttaseppä: luovutus 6.11.2026 klo 13.08 (KS)
Syy: konteksti yli pehmeän rajan, luonteva tauko: ajot 12-15 katsottu ja jaettu, mikään ajo ei käynnissä. **Voittaa -1212:n ristiriidassa.** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (kärki 6e4be4fed). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (kärki b4dcbdeb3, natiivi-backup karttaseppa/ajo-yhteinen-tasoitus).

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
2. Odota VS:n sanaa ajosta 15 (viesti lähetetty 13.07): kelpaako Eiffelin haamu. Ei uutta ajoa ilman VS:n tai PT:n pyyntöä.

## AJO 15: TULOS (lokit/karttaseppa-yhteinen-15-b8-b4dcbdeb3, parit _tyo/karttaseppa/parit-yhteinen-15)
Y = dc2b743b9 + VS 32ec2fe2b (Pompidou) + VS fbefe0336 (Offset 0,2). Shader error 0, error CS 0.
- **pr-pohjoinen:** ajon 14 raidat poissa kahdessa täysikoon rajauksessa; koko kuvaa ei käyty täysikoossa.
- **po-ita:** Louvren pääty liukenee tasaisesti.
- **Eiffel:** haamu näkyy yhä, EI korjattu. Ero taivaasta yli 3, ajo 12 / 14 / 15: 75 y 400 18 / 43 / 43 px, y 600 36 / 33 / 30; 85b pikselit samat, suurin ero y 500 23 / 61 / 29. Torni on taivasta tummempi. Kelpaavuus VS:llä.
- **Pompidou:** täysikoon rajaukset VS:llä (pompidou-la-taysikoko.png, pompidou-ita-taysikoko.png). VS vie kuvan KK:lle itse.

## TEHTY 12.16-13.08
- **Ajo 12:** Pompidou kelpaa; 79ac7cefb-tarve löytyi: Louvren pääty hajosi pisteiksi.
- **Ajo 13 (79ac7cefb):** ei korjannut, tilalle vaalea hahmo. **Ajo 14 (db7bc0d30):** malli aidosti läpinäkyvä usvassa, pääty kunnossa, mutta Eiffel paheni ja lähikuvaan raitoja. **Ajo 15:** ks. yllä.
- **Palais-Royal (NS, parit-yhteinen-13/rajaus-pr-pohjoinen-3x.jpg):** etelämuuri seisoo pohjalla, ei lävistä Louvrea; yhdestä kamerasta rakoa ei näe. pr-etela-2 ei näyttänyt juurta. NS:lle kerrottu.
- **W 6e4be4fed:** kaksi Louvren puuta (pohjan 783,311 ja 850,336) pois, seisoivat Palais-Royal'n paloilla. Todennettu ajossa 14. Rantarivi jäi (11 puuta). tee-kaista.py tuottaa ne yhä; älä aja puut2.txt:tä uudelleen koodiin.
- **£200-kyltti:** peittää Pompidoun idästä; NUI ei muuta (päätös 2.215, vain KK:n sanalla). Ei toimia.
- **NS:n vesiraja:** vastattu (OSM-relaatio 2191006, puut-vesi.py rivit 13-40; näkyvä vesi OpenFreeMap Z14 water; eroa ei mitattu).

## AUKI
- **KK, parit lähetetty 12.1x:** kun KK ei kumoa, koepaletti-komento pois W:stä (Nahtavyysalue.KoePaletti, Komennot.cs:803), seuraavaan yhdistykseen.
- **VS:** kärkilaskenta tuplaantuu nähtävyyksillä (kaksi passia), iPadilla mittaamatta. Junaan ei ilman mittausta.

## MUUTA
- Skenaariot _tyo/karttaseppa/sk-pariisi-yhteinen-13, -14, -15 valmiina; samat kamerat toistuvat, joten parit ovat vertailukelpoisia.
- Eiffelin mittaus: parit-yhteinen-15/tee-parit.py, funktio rivit.
- POIKKEUS 1 kpl joka ajossa `ui sulje` -komennolla (ArgumentOutOfRangeException), JU tietää; ei pysäytä ajoa.
- Y:n fetch `natiivi-backup linssiseppa2/pompidou-varit` antoi "couldn't find remote ref"; committi oli silti jaetussa objektivarastossa ja yhdistyi. Haaran nimi ei ehkä ole backupissa; pyydä VS:ltä, jos joku tarvitsee sen.

## Oppi
Kuvan vertailussa rajauskoordinaatit ensin näyttökuvasta: 2,76-kertainen parikuvan kerroin johti kerran väärään rajaukseen. Kello aina date-komennosta, ei päässä: kirjasin muistiin 13.2x, kun kello oli 12.5x.

## LOPPUTESTIT (siirrä tämä osio jokaiseen uuteen luovutukseen)
Repon mainissa ei ole yhteistä lopputestilistaa (PT 01.5x). Tämä osio on lista, kunnes PT muuta sanoo.
1. Saapumislento laitteella (2.209, KK, kirjattu PT 01.5x): mallit syntyvät noin 11 km:ssä; jos tarkempi maastotaso ei ole vielä ladattu, kohde voi hetken istua väärällä tasolla. Vain laite näyttää.
