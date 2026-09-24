# Linssikatalogin uudistus esittelysivuksi (Fable 24.9.2026, omistajan tilaus klo 21.4x)

Tavoite: linssikatalogi.html on selkeä, visuaalinen sivu, jolla omistaja esittelee pelin linssisuunnitelman
myös yhteistyökumppaneille. Nykyinen sivu on tekstilista (148 linssiä, 8 mannerta, suodatus mantereittain).
Lähde pysyy docs/linssikatalogi.md:ssä; sivu lukee saman LINSSIT-taulukon. Kuvat tulevat kuvaputkelta
(tilaus posti/fable-kuvaputki-linssikatalogi-kuvitus-20260924.md: <id>-havainne.jpg ja <id>-cc.jpg
ämpärissä media.matkakirja.app/linssikatalogi/), sivun on toimittava myös ennen kuvia (paikkamerkki
tyypin värillä ja ikonilla).

## Rakenne ylhäältä alas

1. **Avaus**: yksi lause siitä, mitä linssi on ("Linssi on kartan päälle laskeutuva kerros, joka näyttää
   yhden ilmiön ajassa ja paikassa"), neljä lukua (linssiä, pelissä nyt, seuraavaksi, aineistolähteitä) ja
   viisi moottorikorttia: aikajana, alue, virta, data, museo — kussakin ikoni (Codexin linssi-ikonit 21.9.),
   yksi lause ja edustava havainnekuva.
2. **Pelissä nyt**: B1 Keksinnöt Euroopassa ja C7 Ihmisen matka isoina kortteina, oikea kuvakaappaus
   pelistä (ei havainnekuva) ja 10 sekunnin äänetön videoklippi tai kuvasarja.
3. **Seuraavat**: Järjestys-osion ja osan R järjestyksen mukainen numeroitu kaista (vaakavieritys),
   kortti = havainnekuva, tunnus, nimi, kaari, tyyppi-ikoni, tila-merkki.
4. **Koko katalogi** korttiruudukkona (3 saraketta työpöydällä, 1 puhelimella). Kortti: havainnekuva
   yläosassa, pieni CC-kuva kulmassa (lähde hoverissa), tunnus ja nimi, ohut aikajanapalkki
   (asteikko 3500 eaa – 2026, linssin kaari korostettuna, merkkipaalu 1873 punaisena pisteenä), pysäkit
   nappuloina (enintään 6, loput "+n"), tila värillä (valmis vihreä, rakenteilla keltainen, seuraava
   ruskea, idea harmaa), tyyppi ikonilla. Klikkaus avaa kortin koko leveyteen: molemmat kuvat, kaikki
   pysäkit, huom-kenttä, lähteet ja lisenssit (datalinsseissä pakollinen: NASA, NSIDC, NOAA, ESA jne.).
5. **Suodattimet ja haku** kiinteänä rivinä: tyyppi, tila, manner, aikakausi (liukusäädin), tekstihaku;
   luvut päivittyvät.
6. **Tiekartta**: neljä saraketta (valmis, rakenteilla, seuraava, idea) pienillä korteilla — kanban
   kumppanille, joka haluaa nähdä missä mennään.
7. **Kartta**: pieni maailmankartta (pelin pergamenttipohja), jossa suodatuksen linssien alueet hehkuvat;
   hover korostaa yhden linssin alueen.
8. Alatunniste: lähteet, lisenssiperiaate (vain PD/CC/avoin), päiväys, linkki docs/linssikatalogi.md:hen.

## Esitystila

"Esitys"-nappi piilottaa työlistat (huom-kentät, PR-viitteet, tilausmerkinnät), suurentaa kortit,
näyttää vain kuvat, nimet ja kaaret, ja siirtyy kortista toiseen nuolinäppäimillä. Tulostus A4-vaakaan
CSS:llä (@media print) antaa saman sisällön PDF:nä. Yö- ja päivätila säilyvät.

## Toteutus

- Tekijä: Sisältökirjuri (Sonnet, high), Pelikoodari tarkistaa ulkoasun ja mobiilin; Fable hyväksyy
  kuvakaappauksista (työpöytä, puhelin, esitystila) ennen mergeä. Yksi tiedosto, ei build-vaihetta,
  ei kirjastoja; kuvat lazy-loadina ämpäristä; sivu toimii ilman kuvia.
- Vaiheet: 1) rakenne ja kortit ilman kuvia (paikkamerkit), suodattimet, esitystila; 2) kuvat kun erä 1
  (29 linssiä) on ämpärissä; 3) tiekartta ja kartta.
- Sisältö: nykyisen LINSSIT-taulukon lisäksi kenttä `kuvat` (havainne, cc, lähde) ja `jarjestys`
  (numero Järjestys-osiosta); docs/linssikatalogi.md päivitetään samalla.
