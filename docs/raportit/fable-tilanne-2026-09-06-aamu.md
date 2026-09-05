# Fablen yövuoron raportti 6.9.2026 aamuksi (Suomen aikaa)

Omistaja meni nukkumaan 6.9. klo 01.00 ja pyysi: "tee peliä eteenpäin
omatoimisesti niin pitkälle kuin vain pystyt". Tämä on yön tulos.
Linjaukset kirjattiin Raamattuun (js/tyohuone-raamattu.js, 5.–6.9.2026
osiot). Kellonajat Suomen aikaa.

## Julkaistu illalla ja yöllä (v1594 → v1614)

| versio | mitä |
|---|---|
| v1594 | etusivupallo koko sivulle, 360° kierros, kuva kiinteä |
| v1595 | Lyria-raidat peliin (siirtymät, keksinnöt), ElevenLabs pois |
| v1596 | isoisän kuvapino, keksintöjen tekstit (kortti = nimi, kuva = vuosi · nimi), musiikki ×2,0 |
| v1597 | isoisän 27 kuvaa etusivulle, matkalaukun "aktivoi" |
| v1598 | 14 Euroopan kaarta uusiksi (erät A ja B) |
| v1599 + v1601 | musiikkipaletti Lyrialla (pohja, visa, aarre, pääaarre) + avauslento pallolla (paksu viiva, zoom, pyörintä, Bombay-kuva) |
| v1600 | etusivun avaus vaiheittain (otsikko heti, Osa II feidaten, sitten kirjoituskone) |
| v1602 | kuusi hyväksyttyä kohtaamiskuvaa korteille |
| v1603 | Keksinnöt pallolla: lähikuva, ennakoiva kamera, terävä tila, esilataus |
| v1604 | vanhan kartan laiskoitus (−0,9 Mt käynnistys) |
| v1605–v1606 | Livia lukee tervetuloa-ohjeet sähkeestä; loppulause pois |
| v1607 | Raamattu: illan linjaukset; kaariluennat työnkulkuun |
| v1608 | kaupunkiraidat: Ateenan oma kappale (mekanismi) + raita Lyrialla |
| v1609 | avauslento: ei sumennusta, suora lähtö, kuva häivytetty joka reunasta |
| v1610 | pallolaatat kansio c (etelän reuna tasoitettu) |
| v1611 | etusivu: otsikon hyppy korjattu, Osa II 2,3 s, harsot, isoisän kuvat pois |
| v1612 | **Ihmisen matka -linssi** (20 pysäkkiä, kuvaputken 20 kuvaa), liekkivalot, aloitusnäkymä lähemmäs ja hidas pyörintä, Livia 1,5 s myöhemmin |
| v1613 | pohjaraidan valitsin: musiikkia kaikkiin kohtiin (alueet, lehti, matkalaukku, etusivu) |
| v1614 | kaariluennat 42 kaupungille (100 mp3), mykistys pois |

Ämpärissä lisäksi: Ateenan kaupunkiraita, kuusi alueraitaa (Lyria).

## Kesken aamulla (katso git log ja Actions)

- Ihmisen matkan hionta (Opus): kortin kuva havainnekuvasta kunnes esinekuvat tulevat, kellon luettavuus, lyhyet luennat (linssi-input työnkulkuun), musiikkilaji työnkulkuun, pienet kuvat. Sen jälkeen ajetaan generoi-siirtymamusiikki (ihmisen-matka) ja generoi-luennat (linssi ihmisen-matka).
- Kuvien uudelleenyritys 429:ään (Opus): media.js, kohdekartan miniatyyrit, sw, kehittäjämittari, Sevillan 3 kohteen wiki.
- Tilaraidat (lehti, matkalaukku, etusivu): Lyria-ajo käynnissä → PR → merge.
- Z8-neljännekset kansioon c: ensimmäinen ("-180,0,-90,85") laskee; seuraavat yksi kerrallaan, lopuksi luettelo-input (laatat.json max 8).
- Kuvaputki: 20 löytökuvaa (Ihmisen matka) ja 21 miniatyyriä jonossa; Fable hyväksyy omistajan valtuutuksella.

## Omistajan päätöksiä aamulle

1. **R2:n oma verkkotunnus.** Pelin media tulee `pub-….r2.dev`-osoitteesta, jota Cloudflare rajoittaa: Ateenan kohdekartan 12 miniatyyriä palauttivat 429 samaan aikaan (tämä oli "pisteet jotka eivät toimi"). Peliin tuli uudelleenyritys, mutta pysyvä korjaus on liittää ämpäriin oma verkkotunnus Cloudflaren R2-asetuksista (esim. media.<oma domain>) ja vaihtaa js/media.js R2_JUURI. Vaatii sinun tunnuksesi.
2. Kuvaputken toisen kierroksen henkilöehdotukset (Lontoo Mina ja Theo, Dublin Aoife, Sarajevo Adnan yksin, Marseille Malik, Pietari Polina, Tallinna Rasmus, Tromssa Nora, Nikosia Elena, Madrid Vera, Oslo Liv) odottavat kuvavalintaasi arviointisivulla; kaikki on tarkistettu kaanonkelpoisiksi.
3. Aikajanan kameran jälkijättö (0,75 s syttymisen jälkeen) — jos valo saa mielestäsi liikkua vielä hetken, se on kunnossa; muuten yksi luku.
4. Kuulokokeet: uudet Lyria-raidat (alueet, tilat, Ateena), Keksinnöt-linssin liekkivalo, aloitusnäkymän zoomi (4 400 km 2000 px:ssä).

## Havainnot työlistalle

- Globe.gl:n pathStroke on pikseleitä, ei asteita: matkareittien ja linssien uomien paksuusvakiot piirtyvät liian ohuina (Opus-korjaus).
- savuke-aikajana ja savuke-pallolauta vartio 7 odottavat pallolle päivitystä; savuke-avauslento P6–P7 kaatuvat kontin 429:n takia.
- Venetsian kaari mainitsee "nimikirjaimet H. F." (tunnistaa Horation) — Fablen kaanonkorjaus.
- Etelänavan kaappaus kansiolla c jäi puhelinkoossa päiväkirjakortin alle; ota työpöytäkoossa.
