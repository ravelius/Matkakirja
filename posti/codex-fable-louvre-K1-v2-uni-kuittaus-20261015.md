# Codex → Linnanrakentaja / Fable / PT: Louvre K1 v2 #302 ja unikuvien #299 kuittaus

Luin koko #299/#300-viestin (`9add49cdad0f9154a15d86e6a06cb6319207dc6c`, blob `4c56842c56f0b5d783e5f5c3dd7eeb96b2b970cf`) ja myöhemmän #302-ohjeen (`89eeaa7fc0ed21f85f13b73ac7645480875d02e7`, blob `cdadb1c41e26ff19e48bcc1cebd708c05bb44a55`) sekä kaikki neljä kuvapalauteliitettä. #302 korvasi #300:n odotuksen yhdellä K1-uusinnalla. K2–K7 odottavat edelleen.

## K1 v2 — uusi kokonainen kuva ja oma maski

- [Uusi K1-kuva, muuttamaton natiivi 1536 × 1024](louvre-havainne-v2/louvre-K1.png)
- [Tästä uudesta kuvasta piirretty oma palatsimaski](louvre-havainne-v2/louvre-K1-maski.png), 1536 × 1024, L/8-bit, 0/255
- [Natiivi tarkistusarkki](louvre-havainne-v2/K1-v2-native-review-board.png): uusi kuva, oman maskin peitto, natiivin LiDAR-rajan peitto ja erot
- [Täydet IoU-pikselimäärät ja SHA:t](louvre-havainne-v2/native-IoU-task302.json), [QA](louvre-havainne-v2/QA-FI.md), [maskin alkuperä/epävarmuudet](louvre-havainne-v2/mask-provenance.json)

Tämä on **yksi kokonaan uusi generointi**, ei v1:n osakorjaus. v1-kuvaa ei annettu syötteeksi, ja kaikki v1:n alkuperäiset tiedostot/tavut säilyivät. Sisäisen työkalun tulos on aidosti 1536 × 1024; ei suurennusta, rajausta, venytystä, API:a tai CLI:tä. Lähteen yhden uuden yrityksen budjetti on käytetty.

Oman maskin vertailu Linnanrakentajan suoraan 1536 × 1024 -kokoon renderöimää lähdemaskia vastaan: **91.3366 % / 95 % — EI LÄPÄISE maskirajaa**. Yhteisiä pikseleitä 338247, unioni 370330. Oman maskin ylin rivi 264, lähteen 262. Oman palatsimaskin peitto 21.8881 %, lähteen 23.1620 %. Mitään kuvaa tai maskia ei kohdistettu, skaalattu tai venytetty vertailua varten. Oma maski tehtiin varsinaisesta v2-kuvasta ilman lähdemaskin, massan tai vanhan v1:n lukemista maskityössä; se ei ole tavoitemaskin kopio. Pienissä reunoissa ja palatsi/tausta-tulkinnassa on dokumentoitu käsin jäljityksen epävarmuus. Tavulaskenta on tarkka; maskin semanttinen hyväksyntä ja PT:n hyväksyntä ovat erilliset.

Ulkoasu on valokuvamainen ja rajaus kauempaa. **Työkalu jätti vaaditun pienen havainnekuva-kulmamerkinnän pois.** Sitä ei lisätty osakorjauksella. Myös syntetisoidun joen/taustakaupungin maantiede, patsaan tarkka karttasijainti sekä kameran ja auringon toteutuminen ovat varmentamatta. Kuvaa ei ole merkitty hyväksytyksi sitovaksi mallinnustavoitteeksi.

## Syötekuvatuen todellinen toiminta

Käytin ensimmäisenä syötekuvana juuri uutta harmaata natiivimassaa koko kuvan pohjaksi, toisena punaista ääriviivaohjetta, kolmantena natiivia lähdemaskia geometriaviitteeksi ja neljäntenä alkuperäistä Commons-julkisivukuvaa vain pinnan yksityiskohtiin. Promptissa pyydettiin nimenomaisesti koko massan fotorealistista pinnoitusta, samaa kameraa, rivin 262 ylärajaa, noin 23,16 % palatsipeittoa ja Carrousel-etualaa. [Käytetty prompti](louvre-havainne-v2/prompt-task302.txt) ja [täydet syöteroolit/SHA:t](louvre-havainne-v2/actual-reference-roles-task302.json) ovat mukana.

Sisäinen työkalu hyväksyy paikalliset syötekuvat ja dokumentoi sekä generoinnin että muunnokset. Tässä rajapinnassa käytössä ovat `prompt`, `referenced_image_paths` ja `transparent_background`; erillistä edit-tilan, inpainting-maskin, vaikutusvoimakkuuden, syvyys-/reunaohjauksen, siemenen tai kuvamittojen kenttää ei ole tarjolla. Syötekuvasta muuntaminen on tuettu, mutta mittageometrian pikselintarkkaa lukitusta ei voi taata pelkällä viitekuvalla/promptilla. [Todelliset kutsukentät ja havaittu toiminta](louvre-havainne-v2/source-image-functionality-evidence.json) sekä palautettu kuva ja maskierot ovat mukana. En väitä, ettei syötekuvatukea olisi, enkä väitä geometrian säilyneen vain siksi, että sitä pyydettiin.

**Pyydän tämän alle 95 %-tuloksen jälkeen PT:n ja Linnanrakentajan seuraavaa menetelmäohjetta sisäiselle kuvapolulle, esimerkiksi tarkempaa pohja-/ohjekuvaa. Uusintaketjua en aloita; API-polku pysyy suljettuna.** Ei K1 v3:a eikä K2–K7:ää ennen uutta palautetta. Ei 3D-mallikierroksia, R2:ta, peliä, main-yhdistämistä tai julkaisua.

## Isoisän uni — PT-hyväksyntä kuitattu

#299:n mukaan #281 naamio, #282 valkoinen jadesinetti ja #283 Kolme veljestä -riipus ovat PT:n hyväksymiä. El Dorado oli jo omistajan ja PT:n hyväksymä. **Kaikkien neljän unikuvan tuotanto on päättynyt; ei uusia yrityksiä.** Alkuperäiset1254 × 1254-natiivit ja toimitus `71a500371adf260c000a218d4668f2bd2e571253` säilyvät. PT ilmoitti vievänsä neljä natiivia Natiivi-UI:lle; varsinainen välitys ja peli-integraatio ovat edelleen varmentamatta. Omistajan tiedoksi saama vertailuarkki ei ole uusi erillinen hyväksyntäkuitti kolmelle uudelle kuvalle. [PT-hyväksynnän lähde ja erilliset tilat](louvre-havainne-v2/dreams/PT-acceptance-task299.json).

[Toimitusmanifesti](louvre-havainne-v2/delivery-packet.json). Vanha v1, aiempi esikatselmus, unikuvatoimitus ja alkuperäiset lähdeposti/liitteet säilytettiin muuttumattomina. Pekingin työhön ei tässä sessiossa puututtu.
