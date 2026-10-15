# Peking PT336–340: v3 valmis rajattuun lentotestiin; Ion-korkeusehto avoin

Seuraava paikallinen paketti on valmis aiemmin sovittuun yksityiseen kehittäjäkokeeseen:

`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/peking-codex-20261013/production-root/peking/peking-testikaupunki-20261016-native51-v3-lentotesti`

24 laattaa × 3 LOD-tasoa = **72 itsenäistä GLB:tä**, **156 529 080 tavua / 1 377 183 kolmiota**. Aiemmat katot 164326250 tavua / 1397383 kolmiota alittuvat. Koko paketin SHA256-manifesti `8192a5dc7ee7cc0bf7a729d3d9ea88b22d35e40afc1cdd0aced136b04d0aa277`. V2 ja native51 säilyvät alkuperäisinä; tämä on source51-pohjainen vientipaketti3, ei uusi canonical native52.

## Mukana

- Palatsin olemassa oleva oma maa sekä yhtenäinen, globaalisti jatkuva 25 m kolmioittainen tekninen korkeuslisäkenttä 0…0,31 m. Lähteen kivikontaktien suojissa ja ulkorajalla lisä on nolla. Erillisten pintojen eri korkointerpolaatiosta syntynyt tumma Taihedianin etualan maasauma on korjattu. Uudet maakolmiot tarkistetaan lopullisina float32-koordinaatteina: ei uusia nollapintaisia kolmioita tai normaali/suuntavirheitä.
- Puut: yhtenäinen lineaarinen RGB-kerroin **0,55** säilyttää alkuperäisen vihreän värisuhteen. LOD0:n keskiarvo on RGB≈[0,103836;0,135831;0,069433], lineaarinen Y≈0,124235. Tavoite 0,10–0,14 on tummuus/luminanssi, ei jokaisen RGB-kanavan alaraja. Kaikki puukorttien XYZ/UV/alfa/normaalipayloadit säilyvät. Modernin taustan kerroin on [0,90;0,88;0,86].
- Hyväksytyt native51:n Museo/Kansankongressitalo sekä muuttumaton Hero mukana. Maolla erillinen 1,5 m arvioitu materiaalikaista ja 1,04× muiden kahden lämpimään kivisävyyn suhteutettu pohja; vanhat tasot, XYZ-rajat ja kokonaiskorkeus säilyvät. PT303-kattokulta, oma DEM, lähdekorkeudet ja 37,9 m ellipsoidiorigo lukittuina.
- **Vesivaraukset myös oman maan puolella:** 9 alkuperäistä OSM-vesipolygonia ja 12 vesiväylän keskilinjaa, joita ei ole merkitty tunneleiksi. Viivojen 10 m/puoli on tekninen Ion-säilytysmarginaali, EI mitattu kanavaleveys. Niiden 39 621 m² unioni jätetään sekä omasta maasta että Ion-maskista pois; ei uutta omaa vettä tai syvyysarviota.

## Rajaus: kaikki 12 osaa

Lataa **kaikki 12 Featureä** `palatsialue-leikkaus-wgs84.geojson`:stä. Ne ovat reikävapaita WGS84-polygoneja (longitude,latitude), jotka yhdessä muodostavat 762 504,534 m² maa-alueen. Reiällinen vertailuversio on erillinen; ensimmäisen Featuren lukeminen yksin on virhe. Piilota vain Ion-tausta, älä leikkaa omia GLB:itä tai laattarajan yli jatkuvia massoja. Maskin aukkojen läpi säilytetään nykyinen Ion-maa/vesi ja mahdolliset sillat, kunnes näille on oma tarkempi vesiaineisto.

## Todellinen tarkistus ja jäljelle jäävät ehdot

Sol luki 72 tiedostoa riippumattomasti; Astra katsoi 20 alkuperäistä vientiuudelleentuontikuvaa. Maasauma ja vihreyden harmaantuminen suljettiin rajatun offline-arvion osalta. Päätekijän 76 775 maa-kontaktinäytteessä oli 0 uutta hautautumista ja 0 suojan nostoregressiota. **221 vesivarauksen kohdalla olevaa kivinäytettä siirtyy Ion-testille**, niitä ei kuitata jo hyväksytyiksi. Kaikkien kolmen LOD-tason maadata on laatoittain identtinen. Tässä postihakemistossa on kuusi kiinteää alkuperäiskuvaa, kaksi vesivarauslähikuvaa ja Mao; kaikki 20 PNG:tä ja 26 eri GLB:n todellinen tuontitosite ovat paikallisessa QA-kansiossa.

**Ion-väli ≥0,30 m jää mittaamatta ja avoimeksi.** Oma 0…0,31 m tekninen lisä ei todista korkeuseroa Ioniin, eikä Ionhide ole pre-clip-korkeusmittaus. Toimita tarvittaessa saman paikan Ion-ellipsoidikorkeudet, asset, LOD ja epävarmuus, jotta ehto voidaan ratkaista lähdekorkeuksia keksimättä. Testaa kaikki 12 maskiosaa, sisäkanava ja lammet, varausten rakenteiden/puuston kannatus ja maan/veden liittymät. TBN:n nykyinen front/back-peilausfixture ei korvaa pelin molempien puolien varjostustestiä. Tarkista myös sama päiväkamerapari kuin 15.10., aukion kulma, puiden väri, iltavalo, liikkuva LOD ja laitemuisti/FPS.

Paketointi, Ion-piilotus, iltavalo ja mediavaihto ovat ilmoittamiasi seuraavia toimia; niitä ei kuitata tällä luovutuksella tapahtuneiksi. Codex ei muuttanut Unityä, R2:ta, mainia tai julkaisua. Koko laatutavoite on edelleen avoin; tämä on tarkistettu yksityinen osapaketti.
