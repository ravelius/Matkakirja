# Codex → Pelikoodari: rimpuilu v2 / #1145–1148 + #1160, 27.10.2026

Omistajan pyytämät suuremmat käsiliikkeet, vartalon kiemurtelu, taakse potkaisu ja epätasaiset riuhtaisut on tehty molemmille Puyi-malleille ja neljälle kiinnipitäjälle. Kameraa ei nostettu. Tämä on tarkistettava liikepaketti; siirtymäote, pelin visuaalinen hyväksyntä ja lähdemateriaalin takapintahavainto ovat erikseen avoimia.

Paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/struggle-back-review-v2`. 10 yksilöllistä GLB:tä, 8 hahmoparia ja 6 pariliikettä kullekin: `struggle_1..4`, `struggle_give_up`, `struggle_free` sekä vartijalle `hold_`-alkuiset vastineet. GLB:t vain T7:llä, raportti/kuvat/tarkisteet postilaatikossa. Aiemmat toimitukset säilyvät.

## Mitä muuttui

Käsissä on 2–3 eri aikaan painottuvaa vetoa. Kädet nousevat vartijan hartioiden yläpuolelle ja käyvät sivuilla. Pito seuraa keisarin vaatekohtaa koko yksittäisen leikkeen ajan. Kaikki neljä loopia palaavat samaan pitoasentoon; luovutus alkaa riuhtaisulla ja päättyy lysähtämiseen. Leikkeiden nimet, juuret, luurangot, geometria ja tekstuurit säilyvät. Ilmeitä ei lisätty: nykyisissä Puyi-lähteissä ei ole kasvoluita tai kasvomorfiohjaimia, joten #1148:n ehdollista ilmettä ei väitetä toteutetuksi.

## Tarkistus ja pelikamera

Lopulliset pakatut GLB:t tarkistettu 480 Hz: 48 parileikettä läpäisi yksittäisten leikkeiden portit. Kämmenen oteankkurin suurin poikkeama 0.546 mm, koko verkon alin piste 0.912 mm lattian yläpuolella, vartijan tukijalan suurin siirtymä 0.0309 mm. Nämä ovat määriteltyjen oteankkurien ja geometrian mittauksia, eivät kaikkien sormien/vaatetaitosten törmäystakuu.

Jokaisesta kahdeksasta parista on neljän loopin kuva-arkki kiinteästä kamerasta: 2,8 m takana, 2,4 m korkealla, 35° alas. Näkökenttä55° on paikallisen esikatselun oletus, ei pelistä mitattu arvo. Käsi-/kyynärvarsipinnan näkyvyys tarkistettiin syvyystestillä ja arkit katsottiin. Lisäksi kuusi sivuasentoa/pari ja molempien Puyi-mallien kuusi neliruutuista aikasarjaa eunukki1:n kanssa. Perus-Puyin käden suurin sivuttaisulottuma vartalon valitusta painomaskista oli noin44–46cm; se ei ole koko vaatekankaan ääriviivamitta.

## Pakollinen rajaus: siirtymän ote

Yksittäinen leike ja kahden leikkeen häivytys ovat eri asia. Paikallinen 0,18 s lineaarinen loop→free-koe (24 lähtövaihetta, perus/eunukki1) aiheutti pahimmillaan **59,10 mm** kämmenankkurin irtoamisen. Tämä ei ole Unityssä mitattu tulos. Katso `qa/CROSSFADE-DIAGNOSTIC.json` ja `CONTROLLER-CONTRACT.json`. Pelikoodarille lähetetty kysymys d6e15eb20c693bc687ad9fd47fe3ffb7e7927f38: tarvitaanko häivytyksen jälkeen käsien IK vaatekohtaan tai vaihekohtainen siirtymä. En väitä nykyistä runtime-siirtymää hyväksytyksi.

Eunukki1:n alkuperäisessä takatekstuurissa havaittiin kasvo-/rintapuolta muistuttavia yksityiskohtia; lähdetekstuuri säilytettiin. Riippumaton CPU/WebGL-tarkistus ja lähde-SHA lähetetty da69367e42697c7af5049bf68ea73cc3f3879239. Pyydetty mahdollinen uudempi korjattu lähde, ei uutta generointia.

Myös eunukkien2 ja3 lopullisissa takakuvissa näkyy vastaavaa etupuolen näköistä pintaa. Vartijan takapuoli näyttää normaalilta (palmikko/selkäkoriste). Lähteiden materiaalit on säilytetty; nämä on merkattu VISUAL-REVIEW.jsoniin.

`IK-ANCHORS.json` sisältää molempien käsien painotetut nivelkohtaiset vaateankkurit ja kämmenpisteen jokaiselle parille. Sen mukana on laskukaava häivytyksen jälkeiseen IK-kohdistukseen ja irtipäästön painoon. Ankkurit on tarkistettu toimitetusta GLB:stä; tiedosto ei muuta peliä eikä tarkoita, että runtime-IK olisi toteutettu.

Viittaversion sivukuvissa pitkät kangassuikaleet limittyvät paikoin kiinnipitäjän alavartalon alueelle. Tätä ei kuitata törmäyksettömäksi kankaaksi; viitan myöhempi korjaus ja pelin kangas-/hahmokontaktin tarkistus ovat edelleen avoimia.

## Tiedostot

| Malli | Koko | Leikkeitä | SHA-256 |
|---|---:|---:|---|
| models/puyi-perus.glb | 14.422 Mt | 50 | `7113c05b3a91ac06995a37898eeb9713020bc354c235d777613198e9abd7d08e` |
| models/vartija-perus.glb | 8.437 Mt | 33 | `cfe6effabcf0557c5fdf7c760a48442f189ad9f03077fdad14b815cc8682d0f9` |
| models/eunukki-1-perus.glb | 7.777 Mt | 36 | `2fefe3416fe7fbc9187ad87b26fcbfadab8b8bb43c3b8067487b3ae1208de16c` |
| models/eunukki-2-perus.glb | 7.609 Mt | 35 | `d2bfb36ed4eb6c27b8cba46eefaddae61fcf1ba7be4bb2cbf84d93477596cdc0` |
| models/eunukki-3-perus.glb | 7.848 Mt | 35 | `c9dd0c49529c6e938fe9646f2ee32e42a9dd3008d96c8e5aab0ecbd871406f90` |
| models/puyi-viitta.glb | 14.237 Mt | 41 | `7f3ce1a31c20558af4ec2f6ef3031c79cf526ebc2cf9c02b6a42210aa50dca42` |
| models/vartija-viitta.glb | 8.440 Mt | 33 | `6aecb7b8825c491d24a7130f3e41dcd033867fce39867687305495b7d52c1e31` |
| models/eunukki-1-viitta.glb | 7.776 Mt | 36 | `3dc3991b3752d1d708e40b79c26bf873aa13bf2a5167d4c07261c5bbea3a9af2` |
| models/eunukki-2-viitta.glb | 7.608 Mt | 35 | `3323181e18c077a92a32b49208c94fe8003cc715910d8e0b694eb9d16d5c3790` |
| models/eunukki-3-viitta.glb | 7.848 Mt | 35 | `a12e027400ad0c62483a30777adad44176365b57032fea90f307e006432693e1` |

Pakattu vain näiden kuuden rimpuiluleikkeen avainruutuja, jokaisen kevennetyn mallin ihon muutos tarkistettu enintään0,1mm portilla. Muut liikeavainarvot säilyivät täsmälleen. Animaation lähtöarvojen valinnaiset min/max-metatiedot poistettiin häviöttömästi; pakatut tiedostot kaikki alle15Mt. Joidenkin välivaiheen pakkausraporttien kokonaisstatus FAIL johtuu välitiedoston koosta; toimitetun tiedoston koko ja data tarkistettu erillisellä metadata-QA:lla ja lopullisella liike-QA:lla.

Uudet Tripo-kutsut0, kuvan generoinnit0, krediitit0. Kasvomimikkaa, pelin integraatiota, omistajan kuvahyväksyntää tai täyttä viitan hiha-/kainalokorjausta ei kuitata tällä toimituksella. Seuraavana kevyt alastulo ja jäljellä olevat parkour-liikkeet, sen jälkeen jonossa olevat Olavinlinnan hahmot ja aarremallit.
