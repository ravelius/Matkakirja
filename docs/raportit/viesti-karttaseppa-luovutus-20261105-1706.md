# Karttaseppä: luovutus 5.11.2026 klo 17.06 (KS)
Syy: tilinvaihto (omistaja 17.05, PT). **Lue tämä, sitten -1651 (haara karttaseppa/luovutus-20261105-1651; kohdat Grand Palais ja Kylttiajo), -1628 ja -1623.** Tämä voittaa ristiriidassa. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki **9e8c8ab1e**. Python /opt/homebrew/opt/python@3.14/bin/python3.

## Omistajan linja
16.41: "jää ennalleen ja edelleen keskitytään vain pariisin 3d rakennuksiin". Eiffel ja sarjan seitsemän ensin, sitten niiden kyltit.

## ENSIN
1. Tilinvaihto: docs/tilinvaihto.md. Remote päälle. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh a85fae8fb` (käsitelty 0ba602a8f tilassa).
2. **Pieni iPad:** KK:lle ja PT:lle pyydetty sana JU:lle (2.214), kärki 9e8c8ab1e. KK:n viesti oli 17.05 jonossa. Tarkista list_events, tuliko sana; JU ei asenna ilman sitä.
3. **Codex:** odotetaan `_review-sarja-24/grand-palais-otto2/` ja muut kuusi. Katso täysikoossa, sitten arkki KK:lle ennen Tripoa.

## Eiffel: valmis Macilla
Ajo 9e8c8ab1e katsottu täysikoossa (lokit/julkaisija-pariisi-eiffel-kyltti-9e8c8ab1e), kuvat KK:lla, kopio PT:llä. Kyltti näkyy lähellä ja 6 km:stä, ei mallin päällä eikä kahdesti. Torni, ristikko ja väri kunnossa (lokit/julkaisija-pariisi-eiffel-lahi-f8b35f66d). Kyltin napautusta ei testattu.
Pohja: Seinen puoleinen nurmikaistale pois (eiffel-asennus/korjaa-rantatie.py, ajetaan asennetulle pohjalle; `asenna.py` EI tee sitä, aja perään, jos asennat uudelleen). Kartan tieviivat jäävät kiveyksen alle, koska liioiteltu torni on tien päällä. KK:lle kerrottu.
Lokin POIKKEUS (ArgumentOutOfRange) on Unityn editorin QuickSearch, ei peli.
Auki, ei selvitetty: ND:n ja Louvren pohjat eivät häivy usvaan kuten kartta; matalalta (eiffel-1km-85) ND:n pohja näkyy vaaleana raitana horisontissa. Eiffel-kaukaa-kuvan punavalkoinen esine ND:n kohdalla on kuumailmapallo tai nappula (6 km -kuvassa pallo ND:n luona), varmistamatta. Reuna x 920 selvittämättä.

## Grand Palais otto 2: tilattu (posti 0ba602a8f)
Tilaus `_tyo/codex/pariisi-sarja-20261105/TILAUS-24d-grand-palais-otto2.md`, lähteet `grand-palais/lahteet-otto2/` (yläkuva pohjoinen ylös, valokuvat, LAHTEET.md, SHA256SUMS). T-pohja jalanjäljen sisään, kupolin kärki mukaan, aiemmat kuvat viitteiksi. Palais de la Découverten rotunda jää pois, koska se on jalanjäljen ulkopuolella. Samat lähdevaatimukset muille kuudelle; jo aloitettu kohde saa valmistua. Pohjoinen ylös -käännös on päätelty jalanjäljestä ja valokuvista, tarkista arkista.
**Oikaisu -1651:een:** `kohteet-pariisi.json` EI ole väärä. rak.py mittaa suunnan idästä myötäpäivään, joten 89° = pitkä sivu lähes pohjois-etelä. Vain tilauksen sanamuoto "pohjoisesta" oli väärin; korjattu TILAUS-24-sarjaan ja tilaus.py:hyn. Älä muuta dataa.

## ND:n tornit: EI TEHDÄ
PT ja KK, 2.215: leveneminen ja korkeus ovat omistajan tilaamaa liioittelua, malli ei muutu. Kaikki "suoristan"-maininnat ovat vanhoja.

## Auki muualta
Vrain-Lucasin kyltti todistamatta (-1651) ja Louvre-kyltti Seinen päällä (-1623): 3D:n jälkeen. Tripon muut seitsemän vasta omistajan arkin jälkeen. Katukuvan sumeus on Macin ajosta.

## Rike ja opit
- Ajoin Commonsin robots.txt:n ja API-haun samassa komennossa, vaikka ne ajetaan erikseen. Robots kieltää `/w/`:n, muisti sallii `/w/api.php`:n, 2.183 viralliset rajapinnat; PT:lle kerrottu, ei ratkaistu. Kuvat haettu upload.wikimedia.orgista (sallittu), 429 kerran: älä toista heti.
- `ui lentopiilo` piilottaa kaikki kyltit: älä käytä sitä kylttiä todistavassa ajossa.
- Älä toista luovutuksen selitystä tarkistamatta: "korjaa kohteet-pariisi.json" olisi rikkonut oikean datan.
