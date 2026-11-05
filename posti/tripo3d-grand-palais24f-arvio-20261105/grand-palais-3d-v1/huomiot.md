# Grand Palais24f – arvioitava Tripo-ehdokas, ei lopullinen hyväksyntä

LIIKE: ei liikettä. Kartan esine, ei luurankoa eikä animaatioita. Vastaanottajan ja omistajan malliarvio sekä pelikytkentä ovat erilliset avoimet vaiheet.

Syötepaikat: Front=pohjoinen.png, Back=etela.png, Left=lansi.png, Right=ita.png. Karttaseppä hyväksyi sivujen vaihdon vastauksessaan 79116228221fb4f116376eccc0ab38781e9572e7. Raakamallista tarkistettiin ennen kevennystä: yksi T-pohjan poikkisiipi −X-puolella, laiva pitkittäin Z-akselilla, Front +Z. Kupoli on siipien risteyksessä, ei rajauslaatikon keskipisteessä. Lyhty, masto ja Front/Back-suunnista näkyvä levymäinen lippu ovat mukana. Katto on sininen ja opaque. Ei maatasoa, puita, ihmisiä tai telineitä. Pylväät näkyvät erillisenä pintamuotona lasiseinien edessä; rakennuksen lasi-ikkunoita ei ole avattu rei'iksi.

Akselit: +Y ylös, pohjoinen/Front +Z, etelä/Back −Z, syötenimien itä −X ja länsi +X. Origo jalanjäljen rajauslaatikon X/Z-keskellä, minY=0. Paikallinen muutos on sama positiivinen skaala kaikille akseleille ja pohjan keskitys. Pituus Z=380m; ei peilausta, venytystä tai 180° asennuskiertoa. Karttaseppä tekee tilauksessa mainitun asennuskierron.

H3.1 HD Ultra, 50k-kolmiotavoite, 2K, PBR, Remove Lighting; ei Parts/8K. Yksi generointi. Tripo Retopology: Triangle, Smart Mesh pois lähetyshetkellä, tavoite28k. Käyttöliittymä palautti Smart Meshin päälle valmistumisen jälkeen; sitä ei käytetty tässä ajossa. Kevyen version kattotekstuuri pehmenee ja venyy hieman viistokuvissa, joten päämalli grand-palais.glb on raaka ja grand-palais-kevyt.glb on vertailu. Suositus on tarkistaa molemmat pelikokoon ennen kevyemmän valintaa; ei uutta generointia tämän takia.

## Tekniset ja UV-luvut

| Mitta | Raaka | Kevyt |
|---|---:|---:|
|Kolmiot|46987|28005|
|Kärjet|31860|20973|
|Tavut|5628124|3003416|
|Materiaalit|1|1|
|Primitiivit|1|1|
|Nolla-UV-kolmiot|14|41|
|Niiden3Dala m²|1.4175470015844271|97.05765999611474|
| Nolla-UV-3Dalaosuus | 0.0005205% | 0.0357438% |

Nolla-UV-raja |2D-ristitulo|≤1e−12. Mustia pikseleitä (kaikki RGB<16) on 0 jokaisessa seitsemässä raaka- ja seitsemässä kevytkuvassa. Kaikki14 kuvaa katsottiin täysikoossa. Pieni nolla-UV-ala ei yksin osoita virheettömyyttä; kevennyksen todellinen venymähavainto kirjattu yllä. Esikatselut ovat 800×800 CPU-rasterointeja tekstuurilla ja yksinkertaisella valolla, eivät pelin PBR-kuvia. Neljä sivua ortografisia, yläkuva90°, lounas/koillinen60° horisontista. Kuvanimet seuraavat yllä määriteltyjä piirrosakseleita. Ei raskasta renderöintiä.

Raakamitat X/Y/Z=[251.54097063312193, 131.21865999959823, 380.0]; kevyt=[251.5646584497118, 131.21273804545075, 380.0]. Molemmissa kaikki upotettuna, yksi materiaali/primitiivi, ei Draco/rig/animaatiota. Tekstuurien koot on kirjattu qa-raaka.json/qa-kevyt.json.

## Kustannukset ja jäljitettävyys

Generointi08694d0e-27dc-46fe-bd49-2ad88eae3f81:45 krediittiä. Kevennys samassa työtilassa5krediittiä; erillistä job-ID:tä ei näytetty. Yhteensä50; saldo16020→15970. Aloitus ja valmistuminen sekä alkuperäisten GLB:iden tiivisteet checkpoint-kopiossa. Muuttumattomat lähteet ja lataukset säilyvät T7:n työjuuressa. Ei ostoja, pelimuutoksia tai julkaisua.

## Mittapoikkeama — Karttasepän ratkaistava ennen lopullista hyväksyntää

| Suhde pituuteen 380 m | Mitattu | Tilaus | Ero suhteellisesti |
|---|---:|---:|---:|
| Kokonaisleveys | 0.66195 | 0.66 | +0.30 % |
| Kärjen yläpää | 0.34531 | 0.34 | +1.56 % |
| Pitkän laivan ulkoleveys | 0.34581 | noin 0.42 | −17.66 % |
| Pitkän laivan harja | 0.18680 | kattotaso 0.22, tulkinta avoin | −15.09 % |
| Keskikupolin laaja kattokuori | 0.23417 | kattotaso 0.22, tulkinta avoin | +6.44 % |

Laivan leveys on kuuden rungon poikkileikkauksen mediaani 131.408 m. Menetelmä, kaikki näytteet ja kattotason kaksi eri tulkintaa ovat qa-riippumaton.json-tiedostossa. Kokonaisleveys ja kärki alittavat 7 % rajan, mutta päärunko ei vastaa noin 0.42 tavoitetta. Tekninen portti ei tarkista tätä muotovaatimusta. Mallia ei merkitä tilauksen mukaiseksi. Pyydän Karttasepältä, onko 0.42 koko kupolipäädyn vai varsinaisen pitkän laivan leveys, ja mikä on 0.22 kattotason tarkoitettu geometrinen kohta. Jos nykyinen muoto kelpaa hyväksyttyihin kuviin nähden, päätös tarvitaan erikseen. Muussa tapauksessa seuraava otto käytetään vastauksen pohjalta, ei samojen epäselvien syötteiden sokkona uusintaan.

Maston ja lipun ylimmillä osilla on täsmälleen yhtyviä maailman koordinaatteja; 0.0001 m tarkkuudella yhdistettynä kokonaisuudessa on yksi komponentti. Raakaverkossa on erillisiä UV-saumoihin liittyviä indeksikomponentteja. Yhdistetyssä testissä 13 rajareunaa ja 25 nonmanifold-reunaa: kosketusnäyttö on olemassa, mutta vesitiiviyttä ei väitetä. Ei geometriamuutoksia mittauksen takia.
