# Champ-de-Mars — tilaus #1978, yksi otto

Lähdecommit `e52adcf60f9e163523ad85e139b2c260ab3bb102`, postin blob `fae5f2286ab0862cc35fa4a6379c432717c762bd`. TILAUS.md luettu ja nykyinen lähdemanifesti SHA256-varmennettu. **1 generoitu kuva / 1 varsinainen generointikutsu.** Ennen tätä työkalun syötevalidointi hylkäsi liian monta viitettä; se ei aloittanut generointia eikä tuottanut kuvaa. Korjatulla syötteellä tehtiin yksi varsinainen otto.

PNG **1536 × 1024 RGBA**, alkuperäiset tavut muuttamattomina. SHA256 `f272d12fd006ac9fe02d82a84bb1606000ea9c9aea7dd3f8b429250179630b74`. Maski SHA256 `222d683407096b84a672fd8e9530fc8d0d6834fc8926d4309bf04110a215ac01`.

## Alfa ja maski

- Binäärisen näkyvän siluetin ero (alpha ≥ 128): **5141 px**, joista maskin ulkopuolella 1575 ja maskin sisältä puuttuu 3566. IoU 0.9813.
- Täsmällinen alfa-arvo eroaa 0/255-maskista **279961 pikselissä**. Tämä luku sisältää myös sisustan arvon 254 eron maskin arvoon 255; se ei ole pelkkä ääriviivavirhe. Alfa min/max [0, 254].
- Kahden pikselin reunatoleranssin ulkopuolella: 2406 pikseliä, joiden alfa > 0; 331, joiden alfa ≥ 16; 199, joiden alfa ≥ 128. Kahdella pikselillä sisennetystä maskista puuttuu 884 pikseliä kynnyksellä 128.
- Maskiehtoa ei täysin läpäisty. Alkuperäistä alfaa ei ole leikattu eikä muutettu toimituskuvassa.

## Käytävät ja väri

5 pitkittäistä käytävää, kun kaksi ulkoreunan käytävää lasketaan mukaan (3 sisäistä); 4 sisäistä poikittaisakselia ja luoteispään reunakäytävä; 2 loivaa kaarta. Keskellä pieni pyöreä aukio, silmämääräinen keskipiste noin (785, 520), tilauksessa (775, 520).

Pääkäytävän vaalea sisus kahdessa näytteessä 14,25 px (tavoite koko käytävälle 8–10 px): jo sisus ylittää tavoitteen. Pienet sisukset 7,25 ja 5,5 px (tavoite 5 px). Leveysmenetelmä: kohtisuora profiili natiivikuvasta 0,25 px askelin, lähin pikseli; vaalea sisus R≥222, G≥190, B≥137, alfa≥128. Arvioitu epävarmuus ±2 px; tummat reunaviivat eivät sisälly lukuihin.

Nurmen arvioitu keski-RGB **184.98 / 161.42 / 91.29**, tavoite noin 203 / 177 / 109. Maskin sisäiset alfa≥128-pikselit luokiteltu lähimmän RGB-etäisyyden mukaan nurmeen, käytävään tai musteeseen, musteluokka jätetty pois. Tämä on likimääräinen väriluokittelu, ei käsin tehty nurmisegmentointi.

Litteä pohjoiseen suunnattu puutarhapinta. Ei puita, Eiffeliä, rakennuksia, ihmisiä, tekstiä tai altaita. Käytävärakenne on tunnistettava; pääkäytävä on liian leveä. Nurmi on tavoitetta tummempaa ja kynähahloitus melko voimakasta. Maski ei täsmää kahden pikselin reunatoleranssissakaan.

**Oma kokonais-QA: EI TÄYSIN LÄPÄISSYT.** Yhden oton arviointitoimitus Karttasepälle poikkeamineen. Vastaanottajan hyväksyntä ja mahdollinen koodisovitus, KK:n käyttöpäätös, runtime-integraatio ja julkaisu ovat erillisiä eikä niitä ole varmennettu.

Paikalliset alkuperäiset, mittaukset ja kehote: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-nahtavyydet-1955-1964-20261103/puutarha-champ-de-mars`.
