# Louvre K1 v2 / #302 — yksi kokonaan uusi ehdokas

Natiivi kuva ja oma maski ovat 1536 × 1024. Kuva on muuttamaton sisäisen kuvatoiminnon tulos, yksi uusi kokonaisen kuvan generointi. Vanhaa v1-kuvaa ei annettu syötteeksi eikä osakorjattu. API:a, CLI:tä, suurennusta tai rajausta ei käytetty.

## Natiivi maskivertailu

Oman maskin ja Linnanrakentajan suoraan natiivikoossa renderöimän lähdemaskin IoU on **91.3366 % / 95 %**. Tulos ei läpäise siluettirajaa. Yhteisiä pikseleitä 338247, unionissa 370330. Oman maskin ylin rivi 264, LiDAR-maskin 262. Palatsin peitto omassa maskissa 21.8881 %, lähteessä 23.1620 %. Kumpaakaan maskia tai kuvaa ei pienennetty, venytetty tai kohdistettu jälkikäteen. Laskenta on tavuntarkka; oman maskin semanttinen pikselintarkkuus on käsin jäljitetty ja rajallisesti epävarma. Linnanrakentajan vastaanottotarkistus ja PT:n hyväksyntä ovat erilliset.

Kuva on nyt kauempaa ja alaosan puisto/kiveys näkyy. Rakennusmuodot, pienet katon reunat ja syntetisoitu ympäristö eivät kuitenkaan ole automaattisesti mittauspohjan mukaisia. Lisäksi vaadittu pieni havainnekuva-kulmamerkintä puuttuu. Patsaan tarkkaa karttasijaintia, taustakaupungin ja joen maantiedettä sekä auringon tarkkaa suuntaa ei varmennettu. Kuvaa ei merkitä hyväksytyksi mallinnustavoitteeksi.

## Syötekuvatuen todellinen toiminta

Sisäinen työkalu hyväksyy paikallisia syötekuvia ja dokumentoi sekä generoinnin että muunnokset. Kutsussa käytettiin promptia, neljää referenced_image_paths-syötettä ja transparent_background=false. Ensimmäinen oli uusi harmaa massakuva koko ruudun pohjaksi; toinen punainen ääriviivaohje; kolmas natiivi lähdemaski geometriaviitteeksi; neljäs Commons-julkisivukuva vain materiaaliksi. Omaa maskia piirtävä agentti ei lukenut lähdemaskia tai massaa.

Tässä tarjotussa työkalurajapinnassa ei ole erillistä edit-tilan, kuvakohtaisen vaikutusvoimakkuuden, inpainting-maskin, syvyys-/reunaohjauksen, siemenen tai tarkkojen kuvamittojen kenttää. Natiivikoko toteutui pyynnön mukaan, mutta syötekuvien antaminen ei takaa pikselintarkkaa geometrian tai kameran säilymistä. Kutsussa pyydettiin nimenomaisesti massan fotorealistista pinnoitusta ja annettiin mitatut pikseliankkurit. Todellinen tulos ja maskierot on toimitettu; tukiväitettä ei tehdä pelkän promptin perusteella.

## Pysähdys ja erilliset tilat

Tämän lähteen yksi uusi yritys on käytetty. Ei automaattista uusintaketjua, K1 v3:a eikä K2–K7:ää. Alle95%-tuloksen vuoksi pyydetään PT:n ja Linnanrakentajan seuraavaa menetelmäohjetta, esimerkiksi tarkempaa pohja-/ohjekuvaa sisäisellä polulla; API-polku pysyy suljettuna. Ei 3D-mallikierroksia, R2:ta, peli-integraatiota, main-yhdistämistä tai julkaisua.

Samassa kuittauksessa #299:n unikuvien PT-hyväksyntä on kirjattu: kaikki neljä natiivia hyväksytty, tuotanto päättynyt eikä uusintoja tehdä. PT ilmoitti vievänsä ne Natiivi-UI:lle; varsinaista välitystä, integraatiota tai julkaisua ei ole varmennettu. #300:n ensimmäisen Louvre-version vastaanottokuittaus on luettu; #302 korvasi sen odotusohjeen tällä yhdellä uusinnalla.
