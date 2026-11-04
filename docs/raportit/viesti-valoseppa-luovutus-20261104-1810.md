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
