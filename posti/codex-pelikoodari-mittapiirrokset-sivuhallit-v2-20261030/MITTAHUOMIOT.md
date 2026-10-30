# Sivuhalli 中右门 — mittapiirrokset v2

30.10.2026. Korjaustilaukset #1315–1316. Lähde `pelikoodari-codex-mittapiirrokset-sivuhallit-paivitys-20261030.md`, commit `d71eab8b0b4a9166272a720348a42e539500b33b`. Tämä pari korvaa #1305–1306:n nykyisenä arviointiversiona. Vanha toimitus `cff0d3b42a6ed0600e64fad60f417b7eaff09e03` säilyy historiassa.

Piirrokset esittävät läntistä 中右门-hallia. Itäinen 中左门 on lähteen mukaan peilikuva, OSM-keskikohta x +77,0; tästä ei tehdä uutta erillistä piirrosta.

## Kehys ja lukutapa

Pohja on 850 × 1360 px, 14 px/m, vasen/ylämarginaali 70/120 px, x −105…−55 ja z −45…20 m. Muunnos on `u=1540+14x`, `v=400−14z`.

Eteläjulkisivu on 1160 × 920 px, 20 px/m, vasen/ylämarginaali 80/120 px, x −105…−55 ja y −1…24 m. Muunnos on `u=2180+20x`, `v=600−20y`.

Lähtöaineiston akselikehys on jo kierretty 2,03°; piirrosta ei kierretä uudelleen. Molemmissa on 1 m / 10 m ruudukko. SVG on vektoripiirros ja PNG saman kokoinen vienti. Palkiston, ovien, ikkunoiden ja kattotiilien kaaviomainen ulkoasu ei tuo uusia rakennusmittoja.

[K] tarkoittaa tilaajan valokuvamittausta, [H] havainnekuvan mukaista valintaa ja skaalattuja välirajoja, [A] vanhan pelimallin arviota. Vain [K]-mitta esitetään kuvamitattuna; [H] ei muutu mittaukseksi sillä perusteella, että se on sovitettu [K]-kokonaiskorkeuteen.

## Näkyvä katon ristiriita

Molempiin piirroksiin sisältyy tilauksen vaatima huomio:

> Kuva [K] ja lähde [1]: yksi katto (单檐). Kaksi kattoa havainteen 03 mukaan (KK 09.5x).

Kaksikattoinen 重檐歇山-muoto on tilaajan nimenomainen ulkoasuvalinta. Sitä ei esitetä valokuvan tai lähteen [1] vahvistamana historiallisena rakenteena. Valokuvan palkiston, ovien ja ikkunoiden ulkoasua sovelletaan valittuun kaavioon tämän rajan sisällä.

## Pylväsvälit ja leveys

Viisi annettua väliä ovat 2,4 + 5,0 + 6,1 + 5,0 + 2,4 m, yhteensä **20,9 m**. Tilauksen nimellisleveys on **21,0 m [K]**. Näiden 0,1 m ero säilytetään näkyvänä; välejä ei venytetä 21 metriin eikä nimellistä arvoa vaihdeta hiljaisesti.

Välit keskitetään x −80:een. Kuuden pylvään keskiviivat ovat x −90,45; −88,05; −83,05; −76,95; −71,95; −69,55 m. Nimellinen 21,0 m leveys vastaisi rajoja −90,50…−69,50; ero on 0,05 m kummassakin päässä. Tilaajan kuvamittauksen tarkkuus on noin ±0,4 m.

JSON säilyttää vanhan A-seinä-/pylväslinjan 22,6 × 14,6 m ja rajat x −91,3…−68,7, z −19,2…−4,6. Uusi K-etupylväsjako korvaa vanhan tasajaon; vanhan A-rungon syvyys ja uuden K-rivin leveys ovat eri lähtötietoja. Etupylväsrivin z-sijoitukselle ei ole uutta valokuvamittausta, joten se säilyy A-sijoituksena.

## Uudet korkeusrajat

| Osa | Korkeus y (m) | Tulkinta |
|---|---|---|
| Lattia / pylvään alapää | 2,50 | A |
| Pylvään yläpää | 6,70 | K |
| Alapalkkivyö | 6,70…8,00 | K |
| Alakatto | 8,30…10,30 | alareuna K, yläraja H |
| Yläpalkkivyö | 10,30…10,70 | H; ei punaista seinää |
| Yläkatto | 10,90…14,00 | alareuna H, yläraja tilauksen sovitusraja |
| Harjanauha | 14,00…14,70 | alapää sovitusraja, yläpää K |
| Chiwen-koristeen yläpää | 15,70 | K |

Alapalkin 8,00 ja alaräystään 8,30 m välinen 0,30 m sekä yläpalkin 10,70 ja yläräystään 10,90 m välinen 0,20 m ero ovat myös lähde-PNG:ssä. Niitä ei täytetä siirtämällä mitattuja rajoja tai lisäämällä keksittyä rakenneosaa. Yläkerroksen vanha punainen seinä poistuu.

Välirajat 10,30 / 10,70 / 10,90 m ovat [H]: Taihemenin kerrossuhteet sovitettuina välille 8,30…14,70 m. Lähteen skaalakerroin noin 0,464 on pyöristetty (6,4/13,8 ≈ 0,463768); toimituksessa käytetään tilauksen annettuja rajoja eikä lasketa niistä uusia desimaalimittoja. Vanhoja 19,20 m harjaa ja 20,30 m koristeen huippua ei käytetä uuden version korkeuksina.

## Säilyvät arviot ja lähde-erot

- Räystäiden x-laajuudet ja hallin syvyys ovat A. Niiden korkeusmuutos ei muuta niitä uusiksi K-mitoiksi. Harjakoristeen tarkka ulkomuoto tulkitaan annetusta mittapohjasta, eikä valokuvan koristeesta johdeta uusia mittoja.
- OSM-jalustan JSON-rajat ovat x −93,3…−66,6 ja z −22,8…−1,0 m, ydin z −20,8…−3,0. Portaat/luiskat ovat x −86,2…−74,8, etelässä z −39,7…−22,8 ja pohjoisessa −1,0…15,9. Nimellinen 17 m pituus on näissä koordinaateissa 16,9 m; päitä ei siirretä tämän vuoksi.
- Mittapohjan katkoviiva sisältää yhteenvetosuorakulmioita tarkempia taitteita. Rasterista luettavat reunat ja peittolappujen mahdollinen palautus dokumentoidaan QA:ssa. Lähdekuvan tekstiä tai mittalappua ei tulkita rakennuksen osaksi. Rasterin 1 px vastaa pohjassa noin 0,0714 m ja julkisivussa 0,05 m; tämä on eri asia kuin kuvamittauksen ±0,4 m epävarmuus.
- Lähde-JSONin vanha yläkerrosrivi 10,6…19,2 m on merkitty korvatuksi. Sen säilyminen lähdetiedostossa ei tarkoita sen käyttöä V2-geometriassa.

## Lopullinen rasteri- ja asettelutarkastus

Pohjan kolme rakennegeometriaa ovat samat kuin korjatussa V1:ssä. OSM-ääriviivan kaikki 779 tarkastettua lähderiviä säilyvät; seitsemän kokonaan peittyneen rivin ja 23 mittalappurivin palautukset on eritelty QA:ssa. Oikean reunan 14,6 m mittalapun kohdalla jatkuu x=608 px reuna, eikä lappua lueta 11 px:n loveksi.

Julkisivun 102 kattosiluettiriviä ja 42 chiwen-riviä vastaavat uutta lähde-PNG:tä. Sulkevien rasteripikselien vuoksi eräät palkkien, harjan ja rungon alarajat sekä kattorajat poikkeavat nimelliskoordinaatista yhden pikselin (0,05 m). Nimelliset 0,30/0,20 m välit näkyvät rasterissa viiden/kolmen avoimen pikselin kaistoina; nimellisiä lähderajoja ei ole siirretty niiden vuoksi. Yhteensä 194 metriruudukon viivaa ja 101 tekstiä on tarkastettu, eikä teksteissä ole päällekkäisyyksiä.

## Tilaajan ilmoittamat mittausmenetelmät

Lähdekuvan s02 pikseliluvut koskevat tilaajan alkuperäistä mittauskuvaa. Toimitettu länsi-/itärajaus on eri kokoinen; näitä lukuja ei käytetä SVG-koordinaatteina. Menetelmät ovat tilaajan antamaa tietoa, eivät tässä itsenäisesti toistettu valokuvauspaikan mittaus.

- **Seinä- ja pylväslinja:** kuva s02: punaisten pylväiden keskikohdat rivillä 2740 (x 167, 253, 436, 660, 844, 935 px), 36,5 px/m.
- **Pylväskerros y:** kuva s02: punainen alkaa y 2688 (x 434).
- **Palkkivyö y:** kuva s02: y 2640–2688 (x 434/547).
- **Katot:** kuva s02: räystäs y 2625 (syvyys 171,4), harja y 2414 ja 鸱吻 y 2381 (syvyys 181,2); välirajat laskettu Taihemenin suhteista: 10,0→14,3→15,2→15,7→23,8.

Mittakaava on lähteen mukaan sidottu Taihedianin 63,96 m etupylväsriviin (2328 px, noin 36,4 px/m) ja sivuhallin etutason asteikkoon 36,5 px/m. Horisonttimalli käyttää Taihedianin 35,05 m harjaa ja 13,6 m pylvään yläpäätä; kameran korkeudeksi arvioitiin 1,0 m. Tarkkuus on noin ±0,4 m. Esimerkiksi pylväspikselien kokonaisväli 768/36,5 ≈ 21,04 m poikkeaa pyöristettyjen viiden jänteen 20,9 m summasta; annettu jännejako säilytetään.

## Kuvalähde ja käyttöehdot

**N509FZ, “Hall of Supreme Harmony and Mid L-R gates (20241127120000).jpg”, Wikimedia Commons, CC BY-SA 4.0.** Lähdesivu: <https://commons.wikimedia.org/wiki/File:Hall_of_Supreme_Harmony_and_Mid_L-R_gates_(20241127120000).jpg>. Lisenssi: <https://creativecommons.org/licenses/by-sa/4.0/>.

Tilaajan liite on länsi- ja itähallien rajaus. Se on katsottu ja sen palkiston, ovien ja ikkunoiden ulkoasusta on tehty kaaviomainen vektoritulkinta. Rakenteeseen on sovellettu tilauksen kaksikattoista H-valintaa ja uusia korkeusrajoja. Näin johdetut SVG-/PNG-piirrokset toimitetaan CC BY-SA 4.0 -ehdoin, lähde ja tehdyt muutokset mainiten. Valokuvaa ei upoteta SVG:hen.

Muut lähteet ovat [1] Wikipedia zh 太和殿, 中右门/中左门-kohta, [2] OpenStreetMap way/638507841 ja way/638507783, © OpenStreetMap contributors, ODbL 1.0, [A] Lavastajan rakennukset-v83 / h-zhongyoumen-lod0 ja [H] havainne 03. QA tarkistaa annetun lähteen ja toimituksen vastaavuutta; se ei ole uusi rakennusmittaus.

PK:n vertailu, PT:n arvio, omistajan julkisivukortin hyväksyntä, 3D-työ, runtime-integraatio ja julkaisu säilyvät erillisinä vaiheina.
