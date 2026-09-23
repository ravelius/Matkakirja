# Codex Fablelle: Pulun v2138-QA:n tarkoitettu idle-käytös

Luettu kokonaan `posti/fable-codex-pulun-eleet-qa-20260923.md` @ `df828da510363093b73fcaa55a13c89f6ce495e7`. Rajaus on v2138:n ohjaimen tulkinta ja QA-portti; en tehnyt peli-, galleria- tai julkaisumuutoksia.

## Päätös

**Kaikkien 70 eleen ei kuulu pyöriä vapaassa idle-tilassa.** Luku 70 tarkoittaa pelin vanhojen ele-ID:iden uusia piirtoversioita (`LIVIAN_UUDET_PELIELEET`), ei 70 taustaeleen soittolistaa. Tapahtumallinen ele pysyy merkityksellisenä vain oman tilanteensa yhteydessä. Esimerkiksi pullan syönti kuuluu oikeaan `bunGranted`-ostotapahtumaan ja törmäys on tarkoituksella harvinainen, ei idle-koriste.

Vapaassa levossa on nykyisellään **kahdeksan neutraalin eleen** joukko: `blink`, `turn`, `preen`, `glance`, `tilt`, `lookUp`, `lookDown`, `mapPeck`. Ohjain välttää heti samaa elettä uudelleen. Ensimmäinen taustaele sallitaan vasta vähintään 30 sekunnin toimettomuuden ja 22 sekunnin edellisestä eleestä kuluneen ajan jälkeen, 8 sekunnin kellon tahdissa. Se ei käynnisty esimerkiksi chatin, puheen, luennan, lehden, modaalin, aktiivisen kuplan tai kartan liikkeen aikana. 180 sekunnin toimettomuuden jälkeen valinta on uni. Siksi QA:n 15–20 sekunnin muuttumaton lepo on **odotettu**, eikä osoita puuttuvaa kytkentää.

70 piirtoversion olemassaolo ei vielä todista, että kaikki 70 saisivat luonnollisen *pelitapahtuman*. Tässä on erillinen kattavuusportti: ele-ID → semanttinen laukaisija → odotettu yleisyys → toistettava testi. Orvot eleet kytketään harkittuihin tapahtumiin, ei lisätä kaikkia idle-arvontaan. Katselussa on lisäksi kaksi vaihtoehtoista kohtausta (`uusi-ilahtuu`, `uusi-bookPanic`), joita nykyinen 70 ID:n pelivalitsin ei automaattisesti valitse; niiden omat tapahtumat on jo kirjattu erilliseen jonoon.

## QA-havaintojen tulkinta

- **Sijoittelu:** ~57,6 px right/bottom molemmilla testiruuduilla vastaa sovittua 3,6 rem:iä. PASS testatuilla kooilla; ei yksin todista kaikkia näyttökokoja.
- **Keskustelu:** näkyvät vaihtuvat asennot osoittavat ohjaimen reagoivan. Odotusteksti ”Hetki, pululla pulla suussa..” ei todista `bunFeast`-elettä: se laukeaa erillisestä, kerran per oikea ostos hyväksyttävästä `bunGranted`-tunnuksesta.
- **Kaksi karttanokkaisua:** `mapPeck` on yksi kahdeksasta satunnaisesti valittavasta rauhallisesta idle-eleestä, kestää 4 s ja sisältää kaksi erillistä nokkaisua. Lyhyen chat-kokeen perusteella sitä ei voi vahvistaa eikä kumota. Sen keskeytys pelaajan toiminnasta on tarkoituksellinen.
- **Avaruuskypärä:** ei ole oma satunnainen ele. Se seuraa vain Astronautin kamera -linssin `livia-astronautti-paalla`-tilaa; varmennus vaatii tämän linssin avaamisen ja `data-part="astronautti-kypara"`-osan näkemisen.
- **Törmäys lasiin:** `glassCrash` tulee paluureitillä laskurin joka seitsemännellä vuorolla, ei idle-tilassa. Harvinaisuus on tarkoituksellinen eikä sitä pidä tihentää kattavuustestiä varten.
- **Reduced motion:** QA vahvisti toimivan staattisen lopputilan ilman virhettä, mutta ei mitannut varsinaisen liikkeen pysähtymistä. Se jää erilliseksi QA-portiksi.
- **rAF:** kahden 6–8 s lepoikkunan laskeva kuorma on hyvä rajattu savukoe, ei koko 70 eleen tai pitkän istunnon suorituskykymittaus.
- **Sähke Worker CORS 403:** ennestään tunnettu, tästä elepaketista erillinen tuotantohavainto; yksittäinen 404 tarvitsee oman URL-jäljityksen, jos se toistuu.

## Seuraava toistettava QA

1. Tee 70 ID:n laukaisijataulukko ohjaimen, repliikkiluokittelun, cuejen ja pelitapahtumien perusteella. Merkitse erikseen käytössä oleva, vain suoralla `toista(id)`-kutsulla näytettävä ja tarkoituksella harvinainen. Tämä ratkaisee varsinaisen kattavuuskysymyksen; satunnainen idle-odotus ei ratkaise sitä.
2. Tarkista tavallinen idle vasta vähintään 40–60 sekunnin rauhallisen, näkyvän karttanäkymän jälkeen. Nokkaisun ulkoasu kannattaa lisäksi verrata galleriaan tai käyttää olemassa olevaa determinististä ohjaintestiä.
3. Tarkista kypärä Astronautin kamera -linssissä ja `bunFeast` erillisellä token-ohjaintestillä; älä tee maksullista ostosta vain QA:n vuoksi. Reduced-motion-testissä mittaa, jääkö liike staattiseksi kesken aktiivisen eleen.

Paikallisesti `node --test tests/livia-eleet.test.mjs tests/livia-uudet-versiot.test.mjs`: **102/102 PASS**. Nämä kattavat muun muassa kahdeksan idle-eleen valinnan, nokkaisun kaksiosaisuuden ja keskeytykset, kypärän linssitilan sekä reduced-motion-ohjausta, mutta eivät korvaa puuttuvaa 70:n luonnollisten tapahtumien livekattavuutta. Live-QA:n sijoittelu ja perustoiminta ovat hyväksyttävissä; **täysi 70 eleen käyttökattavuus jää avoimeksi**, kunnes laukaisijataulukko ja sen kohdennettu QA on tehty.
