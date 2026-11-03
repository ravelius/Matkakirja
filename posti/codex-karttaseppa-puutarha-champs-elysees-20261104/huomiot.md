# Champs-Élysées — tilaus #1979, yksi otto

Lähdecommit `e52adcf60f9e163523ad85e139b2c260ab3bb102`, postin blob `fae5f2286ab0862cc35fa4a6379c432717c762bd`. TILAUS.md luettu ja nykyinen lähdemanifesti SHA256-varmennettu. **1 generoitu kuva / 1 varsinainen generointikutsu.** Ennen tätä työkalun syötevalidointi hylkäsi liian monta viitettä; se ei aloittanut generointia eikä tuottanut kuvaa. Korjatulla syötteellä tehtiin yksi varsinainen otto.

PNG **1536 × 1024 RGBA**, alkuperäiset tavut muuttamattomina. SHA256 `3a600b80470283e9a0ed7eb76fc642092fd868a3dcc0df81b6ad3c1ed2c03635`. Maski SHA256 `3663986ae101a58374772e617414201e75c4ae7906dc42ca0cb2176349846162`.

## Alfa ja maski

- Binäärisen näkyvän siluetin ero (alpha ≥ 128): **18433 px**, joista maskin ulkopuolella 6986 ja maskin sisältä puuttuu 11447. IoU 0.961704.
- Täsmällinen alfa-arvo eroaa 0/255-maskista **559831 pikselissä**. Tämä luku sisältää myös sisustan arvon 254 eron maskin arvoon 255; se ei ole pelkkä ääriviivavirhe. Alfa min/max [0, 254].
- Kahden pikselin reunatoleranssin ulkopuolella: 63699 pikseliä, joiden alfa > 0; 2123, joiden alfa ≥ 16; 1400, joiden alfa ≥ 128. Kahdella pikselillä sisennetystä maskista puuttuu 2275 pikseliä kynnyksellä 128.
- Maskiehtoa ei täysin läpäisty. Alkuperäistä alfaa ei ole leikattu eikä muutettu toimituskuvassa.

## Käytävät ja väri

8 erillistä puutarhalohkoa. Kahdessa suurimmassa: kummassakin 1 pitkittäinen käytävä; ylemmässä 5 poikittaista, alemmassa vain 2 (tavoite 3–5). Muiden kuuden lohkon käytävämäärät koon mukaisessa järjestyksessä 3, 2, 2, 2, 1, 1, reunaviivoja laskematta. Osa käytävistä päättyy rakennusaukkoon ilman selkeää kiertoreittiä; vasemman ylälohkon pitkä käytävä katkeaa pyöreään aukkoon.

Suurten lohkojen pääkäytävien vaaleat sisukset 11,0 ja 9,75 px; pieni poikkikäytävä 7,75 px. Tavoitteet 12–15 ja 7–8 px koskevat koko käytävää. Mittaus ei sisällä tummaa reunamustetta, joten koko leveyden toteutumista ei tällä mittauksella vahvisteta. Leveysmenetelmä: kohtisuora profiili natiivikuvasta 0,25 px askelin, lähin pikseli; vaalea sisus R≥222, G≥190, B≥137, alfa≥128. Arvioitu epävarmuus ±2 px; tummat reunaviivat eivät sisälly lukuihin.

Nurmen arvioitu keski-RGB **194.14 / 165.23 / 87.17**, tavoite noin 203 / 177 / 109. Maskin sisäiset alfa≥128-pikselit luokiteltu lähimmän RGB-etäisyyden mukaan nurmeen, käytävään tai musteeseen, musteluokka jätetty pois. Tämä on likimääräinen väriluokittelu, ei käsin tehty nurmisegmentointi.

Litteä pinta, 8 erillistä lohkoa ja läpinäkyvät rakennusaukot. Ei puita, rakennuskuvitusta, ihmisiä, tekstiä tai altaita. Alemman suuren lohkon poikkikäytävien määrä ja reittien jatkuvuus eivät täysin vastaa ohjetta. Nurmi on tavoitetta tummempaa. Maskipoikkeamat ja myös hyvin matalan alfan hajapikselit jäävät alkuperäiseen kuvaan.

**Oma kokonais-QA: EI TÄYSIN LÄPÄISSYT.** Yhden oton arviointitoimitus Karttasepälle poikkeamineen. Vastaanottajan hyväksyntä ja mahdollinen koodisovitus, KK:n käyttöpäätös, runtime-integraatio ja julkaisu ovat erillisiä eikä niitä ole varmennettu.

Paikalliset alkuperäiset, mittaukset ja kehote: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/puutarha-champs-elysees`.
