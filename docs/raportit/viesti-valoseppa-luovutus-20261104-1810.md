# Valosepän luovutus 4.11.2026 klo 18.10

Syy: konteksti 30 % (Raamattu 7.37). Edellinen: viesti-valoseppa-luovutus-20261104-1758.md (kohdan 3 havainnot ja Muistettavaa yhä voimassa) ja -1732 (kohdat 1, 2e, 3). Loki: /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md. Wt k30 (/Users/Shared/Claude/wt/proto-linssiseppa2-k30) on haarassa linssiseppa2/porras-rajat, 0d5a75286.

## Tehty tällä vuorolla
- sk-rajat-tasot 484adb22f katsottu; rivit PT:lle ja KK:lle lähetetty. Tulos: striimi/muisti-484adb22f/TULOS.md loppu, kuvat rajat-tasot/. Terävä alue kulkee kameran mukana; reunat kiinni maassa (yksi ruutu mitattu silmin, 10,97 -> 11,94). Taso 9,0 pahin. Selitys (palan tason valinta etäisyyden mukaan) ei ole mitattu. Konehaku ruudukkoa vasten ei erottanut verrokista.
- Runko 0d5a75286 = 38ec22a25 + d9cde0f50, versio e20, 613/613, natiivi-backup. Unity ja laite ajamatta. Ristiriita vain versiorivillä. Koe, ei junaan.
- iPad-skripti striimi/sk-porras-ipad.txt (tekijä tee-sk-porras-ipad.py): 38 kuvaa, odotukset 36 min. Pyydetty JU:lta; viesti oli jonossa (queued), kuittausta ei vielä ole. PT:lle kerrottu "JONO TYHJÄ".

## SEURAAVAKSI
1. Kun JU:n kansio tulee: katso kaikki 38 täysikoossa. Tarkista ensin kallistus-rivit: kulma ja paikka joka kuvassa (600 s:n kortti voi siirtää kameraa).
2. KK:n lista (-1732 LISÄYS 2, -1649 LISÄYS 1): ruudukkomitta, muisti, verkkohaut ja lataus ("palvelin haku" -rivit, palvelin-laskurit), p-z10-k0 | p-z10-sivu (sama siirto 173 px kuin 484adb22f:ssä; kaista.py, parit.py), NS:n rajaviivat Alpeilla ja Helsingissä, kun poltetut on poistettu. NS:n k-z12 ja Helsinki 0° ja 45° -parit portin päätökseen.
3. Lopuksi yksi suositus varjo / pois → KK. KK: omistajalle vasta iPad-kuvista, ND v4 samalla.
4. Avoin: offline laitteella todistamatta (ei komentoa, lentotila vaatii omistajan). Kerrottu PT:lle. Ei tehty testikytkintä: se ei testaisi oikeaa verkkoa.

## Muistettavaa
- Skriptin 21°:ssa varjo on koodin mukaan pois (raja 20°), joten varjo ja pois voivat olla samat. Kulmat nousevat, koska paluu tapahtuu vasta alle 15°:ssa.
- Rungossa ei ole NS:n porttia f0e256d9b eikä komentoa maasto tasainen. Skripti käyttää komentoa kallistus.
- 484adb22f:ssä NS:n viiva puuttui t104:stä (10,4). d9cde0f50 lupaa maakuntarajat joka zoomilla: katso tämä t104-kuvista.
- ElavaTyyli: e18:n katkoviivakoodi on samassa lohkossa kuin Striimi-haara; en jäljittänyt, piirretäänkö se Striimi-tilassa. iPad näyttää.
- Pallomalli (rajat-tasot/verkko.py) voi selittää reunat x 1889 ja 2116, laskettu vain yhdelle. Ei todistettu.
- Pois-kuvista t86, t95, t100, t104 katsoin vain 73 %:n koossa. t86-O:n pyöreä kulma (x noin 2437, y noin 990 t90:ssä, ruudut 22,78) näkyy samalla maalla molemmista kameroista; maastoa vai rajaa, ei selvitetty.
- python3 -I ei löydä numpyä tällä koneella: omat skriptit ajetaan ilman -I:tä omasta kansiosta.

## LISÄYS 1 (KK 18.1x)
KK: "38ec22a25 kuitattu suunnaksi, kuvat katson iPad-ajosta. Poltettujen rajojen poisto on ok vain, jos NS:n viivat kattavat kaikki rajat: lisää iPad-ajoon yksi valtionrajan kamera (Alpit, Ranska–Italia) ja kirjaa puuttuvat. Kirjaa uudet havainnot (kanava z13, punertavat läiskät, vaaleat viivat, sisäraita) iPad-kuvien tarkistuslistaan."
Tehty: kamera ranska-italia (45,2, 6,9, korkeus 0,81) skriptiin, 39 kuvaa. Lista striimi/sk-porras-ipad-tarkistus.md: käy se läpi, kun kuvat tulevat. Koordinaatit omasta muistista (Rochemelon rajalla), ei datasta: jos raja ei ole kuvassa, kerro se. JU:lle kerrottu muutoksesta.

## LISÄYS 2, TÄRKEIN (PT ja KK 18.1x–18.2x; ohittaa edellä sanotun rungosta)
Runko 0d5a75286 hylätty. Uusi 6469e76e7 (linssiseppa2/porras-rajat, natiivi-backup): `Striimi ||` pois boundary-silmukasta, e21, testi palautettu, 613/613, Unity ja laite ajamatta. Skripti sk-porras-ipad.txt: 48 kuvaa, odotukset 43 min; lisätty p- ja fin-t105/t110/t113 (FIN pakotettuna, korkeudet sovitettu NS:n mitoista) ja -lampi-kuvat.
ALPIT z11: yhtenäinen tumma sahalaitainen viiva palasi (alueet/k1/alpit-k8-k9-z11.png, vasen ennen, oikea nyt). Tässä koodissa vain admin 2 on yhtenäinen, joten se on valtionraja; maita ei tarkistettu datasta. KK:n "vain yhtenäinen tumma viiva saa lähteä" ja "rajat eivät saa puuttua" eivät toteudu yhtä aikaa ilman tyylipäätöstä: kysytty KK:lta, oma suositus valtionraja samaan ehjään katkoviivaan. Odota sanaa; muutos on yksi rivi ElavaTyyli.cs:n silmukassa (taso == 2) + versio.
PT: e20/e21 tyhjentää välimuistin, ja d9c:n p-z15 eroaa rajusti 484:stä (NS selvittää, oletus kylmä tila). Kylmä ja lämmin eivät ole sama koe.
OFFLINE, PT:N TEHTÄVÄ, TEKEMÄTTÄ, SEURAAVAN VUORON ENSIMMÄINEN TYÖ: koeajo Macilla tai simussa, jossa laattaosoite ei vastaa. Laite jää todistamatta, ja se sanotaan KK:lle. Mac-vuoro JU:lta. Huom. KaupunkiRasteri.Verkossa tulee Application.internetReachability:stä (Laattapalvelin.cs:1530), joten vastaamaton osoite testaa "wifi ilman internetiä" -polun, ei NotReachable-polkua; sano kumpi testattiin.

## LISÄYS 3, ENSIMMÄINEN TYÖ (NS, KK:n pyynnöstä; tekemättä, koska konteksti 35 %)
1. Yhdistä b2101b95e (natiivi-backup, natiiviseppa/maakuntarajat-katko = 35b6ee8b4 + 1) rungon 6469e76e7 päälle, wt k30, haara linssiseppa2/porras-rajat. Se muuttaa palan maakuntarajan värin ja jakson ja nostaa version e18:aan. Versioksi suurempi kuin kaikki: e22.
2. NS:n tarkistus: boundary-silmukassa ei `Striimi ||`, ja Kerros-rivillä lukee `AluerajaMuste, AluerajaAlfa`. Testit läpi. Sama yhdistämisessä KK:n sana valtionrajan tyylistä, jos se on tullut.
3. Päivitä sha tee-sk-porras-ipad.py:n otsikkoon, aja se, ja anna sha JU:lle (kansio julkaisija-porras-ipad-<sha>). JU:lle on sanottu: odota, älä aja 6469e76e7:ää.
4. Kuvat KK:lle; rivi NS:lle, kun valmiit (se mittaa tummuuden: _tyo/natiiviseppa/maakuntarajat/mittaa.py).
Sitten offline-koe (lisäys 2). JU perui 0d5a75286:n ennen käännöstä, mitään ei ajettu.

## LISÄYS 4 (KK 18.2x)
KK: "ei. Valtionraja pysyy yhtenäisenä. Omistaja pyysi katkoviivaa vain maakuntarajoille ... Aiempi huomioni Alppien viivasta koski vain sitä, ettei se saa peittää NS:n viivaa; sitä se ei tee. Ei uutta runkoa tämän takia, JU ajaa 6469e76e7:n."
Valtionrajaan ei siis koske. Tarkistuslistan kohta 11 on sillä ratkaistu. AVOIN: NS sanoi b2101b95e:n tulevan samaan ajoon KK:n pyynnöstä, ja JU odottaa siksi. KK:lta kysytty, kumpi pätee: jos vastaus on "ei b2101b95e:tä", kerro JU:lle heti, että ajaa 6469e76e7:n, ja ohita lisäys 3:n kohdat 1–3.
