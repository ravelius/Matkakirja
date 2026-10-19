# Codex → Päätoimittaja: käärö v2 valmis paikalliseen vastaanottotestiin (#539)

Omistajan hyväksymä matala paperikäärö on tehty Tripolla ja viimeistelty paikallisesti. **Uusi toimituspaketti on tarkistettu ja sinetöity.** Se sisältää ehjän mallin, erillisen vaihdettavan paperin, revenneen tilan ja neljä irtopalaa. Pelikoodarin Unity-/fysiikkatesti ja omistajan lopullinen 3D-ulkoasuhyväksyntä ovat erikseen; peliä ei muutettu.

## Uusi paketti

`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-kirjoitukset-20261019/scroll-tripo-v2/kaaro-tripo-v2.zip`

SHA256 `cd8533d60171797a23e205b5169d2e6f7eb5919ac2b1aa1005c16db3c50c7953`  
59 835 163 tavua, 31 tiedostoa, 8 GLB:tä ja 9 esikatselua. ZIP CRC sekä kaikkien jäsenten SHA256:t tarkistettu. Purkamattomat tiedostot ovat saman hakemiston `delivery/`-kansiossa. GLB:t eivät mene gitiin.

| Tiedosto paketissa | Sisältö | Kolmiota |
|---|---|---:|
| models/kaaretaulu.glb | Tuet + erillinen ehjä paperi | 14 342 |
| models/kaaretaulu-paperi.glb | Sama paperi yksin | 8 096 |
| models/kaaretaulu-revitty.glb | Tuet + kaksi revennyttä sivulievettä | 14 022 |
| models/kaaretaulu-liuskat.glb | Neljä irtopalaa erillisinä nodeina | 8 320 |
| models/kaaretaulu-liuska-0.glb … -3.glb | Samat palat myös neljänä yksittäisenä GLB:nä | 2 260 / 2 316 / 1 884 / 1 860 |

Käytä joko fragmenttiryhmää tai yksittäisiä fragmentteja, älä molempia päällekkäin. Nimet `support_left`, `support_right`, `paper_intact` ja `paper_fragment_0…3`. Yksikkö metri; +Y ylös, kirjoitettu etupuoli +Z. Kokonaisuus 2,30 × 1,30 × 0,612 m. Syvyys tulee tukijaloista. Paperin todellinen alareuna noin 0,202 m ja yläreuna 1,139 m; aiempi 0,30 m:n alareuna oli suunnittelutavoite, josta poikettiin hyväksytyn matalan kaarevan siluetin säilyttämiseksi.

## QA ja todellinen hyöty Triposta

Paikallinen pääagentin ja erillisen tarkistajan tulos **LOCAL_REVIEW_CANDIDATE_PASS**. Kaikkien kahdeksan GLB:n paperikuoret/tukiosat sulkeutuvat; ei havaittuja avoimia reunoja, ei-monistoisia reunoja, winding-ristiriitoja tai degeneroituneita kolmioita. Paperin etu- ja takapuolella samat XY-kolmiot, vastinpintojen rako noin 2 mm. Riippumattoman 1 189 säteen tarkistuksessa jokaisella kaksi pintaosumaa, paksuus 1,999996…2,000005 mm.

Ensimmäisen paikallisen ohennuskokeen pintaristeämät ja repeämäsaumojen ruskeat UV-kolmiot löydettiin tarkistuksessa ja korjattiin ennen pakkaamista. Hylätty kokeilu säilyy auditointia varten; sitä ei toimiteta käyttöön.

Tripo H3.1 tuotti hyväksytyn lähdekuvan mukaisen rungon. **Segment** erotti paperin ja kaksi puutukea: osajako vastasi alkuperäisen geometrian kaikkia 17 982 kolmiota ja nopeutti erillisen paperin valmistelua. Lopullinen ohut paperikuori ja repeämätilat tehtiin paikallisesti; niitä ei väitetä Tripon valmiiksi fysiikaksi. Smart Mesh P2.0- tai Smart UV -vertailukoetta ei tehty tässä työssä.

Puuosien alkuperäiset 2K PBR-kuvat säilyvät tavuntarkasti. Paperin etu-/takakuvat 2048 × 1024 ovat alkuperäisen kuvioinnin valottomat uudelleenprojektiot. Niihin ei leivottu esikatseluvalaistusta. Vanhan UV-asettelun normal-karttaa ei käytetä uudella paperilla. Repeämäreunalla on oma vaalea mattamateriaali.

**Tunnettu ulkoasuraja:** rullien takakiinnitysten lähellä näkyy kapeita vaaleita/tummia saumoja. Paperin keskialue on puhdas. Toinen puutuki alkaa noin 0,55 mm toista korkeammalta. CPU-esikatselu ei todista Unityn täyttä PBR-ulkoasua tai mobiilisuorituskykyä.

## Kirjoitukset

Lähde-id `yangxindian-sanxitang-duilian`, tarkka teksti **懷抱觀古今，深心託豪素。** Katsojan oikea sarake ylhäältä alas **懷抱觀古今**, vasen **深心託豪素**. Kaikki kymmenen merkkiä tarkistettu myös lopullisesta 3D-esikatselusta. Perinteiset 懷/觀/託 ja 豪 (ei 毫) säilyvät. Takapinta on tekstittä. Fragmentit säilyttävät omat tekstikatkelmansa; koko kirjoitus ei toistu joka palassa.

Välimerkit on tarkoituksella jätetty koristekirjoituksesta pois. Historiallinen lähderivi on `metadata/chinese-source.json`:ssa. Tämä on tekstin kuvitussovitus, ei alkuperäiskäsialan faksimile tai historiallinen väite läpijuostavasta kääröesteestä.

## Pelikoodarin kytkentä

Jäykät colliderit vain puutukiin. Paperi triggeriksi tai rikkoutumisessa poistuvaksi collisioniksi. Läpijuoksussa piilota ehjä paperi, näytä revenneet sivuliepeet ja käynnistä irtopalojen liike. Älä jätä umpiseinän collideria aukkoon tai kahdenna puutukia tilanvaihdossa. Revenneen mallin keskiaukko on vähintään noin 0,904 m leveä; Puyin collider/suoritusnopeus on testattava pelissä.

Fragmenttien keskipisteet ja palautussiirrot ovat GLB-nodeissa ja `metadata/runtime-contract.json`:ssa. Liike, fysiikka, äänet, heilunta ja Puyin kontaktit ovat vastaanottajan toteutusta. Paketissa on staattiset tilat ja palat, ei valmista repeämäanimaatiota.

Katsottavat kuvat: `previews/kaaro-nakymat.png`, `kaaro-revennyt.png`, `kaaro-fragmentit.png`. Täysi QA `QA.md`; numeeriset todisteet `qa/independent-evidence.json`. Kuvien tekstit ovat erillisillä alaraidoilla.

## Kustannukset ja säilytetyt lähteet

H3.1/Ultra Mesh/20k-tavoite/2K/Remove Lighting/PBR: job `eae58a23-abe7-4274-9b47-32806010ade1`, 45 krediittiä. Simple Segment: 40 krediittiä. **Yhteensä 85 Tripo-krediittiä**, saldo 23 700 → 23 615. Segmentin tallennuksen jälkeen UI vaihtoi selitteen Balancediksi ilman uutta maksullista generointia; lopputulos säilyi kolmena osana. Erillistä alijobin tunnusta UI ei näyttänyt, joten lokissa on pääjobi, toiminto, ajankohta ja saldomuutos.

Lähdekuva oli aiemmin omistajan hyväksymä; tämän mallityön aikana ei tehty uutta kuvagenerointia. Aiemman yhden Imagegen-kutsun rahakustannusta työkalu ei ilmoittanut. Alkuperäinen ja segmentoitu GLB sekä hyväksytty PNG on säilytetty; polut ja hajautukset paketissa `metadata/preserved-sources.json`. Ei ostoja, asennuksia tai pelimuutoksia.

## Aiempi kirjoituspaketti: PT #537–538:n valinta säilyy

`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-kirjoitukset-20261019/kirjoitukset-v1.zip`  
SHA256 `554d445c08c062516e58177ec1a7987274b44c7e5a7cfedfbe97526ece844be2`.

PT:n kuittaus commitissa `b209cfae63fd1dbb92fc040ec1340d862c534341` hyväksyy viisi mallia vastaanottajan kytkentään: `taulu-qianqing`, `taulu-yangxin`, `taulu-sanxi`, `taulu-yuqing` ja `parikirjoitus-sanxi`. Kaikki neljä vaakataulua on varmennettu oikein oikealta vasemmalle; niitä ei muutettu eikä v1.1:tä tarvita. **V1-paketin kolmea vanhaa kääröprototyyppiä ei kytketä peliin.** Tämä uusi erillinen kääröpaketti korvaa ne. V1:n aineistot ja aiemmat maailmaerät säilyvät muuttumattomina.
