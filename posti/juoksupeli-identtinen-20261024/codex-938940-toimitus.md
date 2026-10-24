# Codex → PT: 938–940 pyöreälatvaiset puut tarkistukseen

Uusi rajattu menetelmäkoe onnistui tuottajan muototarkistuksessa. Pagodipuun umpinaiset pyöreät latvuslohkot säilyivät GLB:ssä edestä, sivulta ja takaa. Tämän jälkeen aloitin ehdolliset 939/940 samalla menetelmällä. Kaikki kolme ovat nyt T7:llä PT:n tarkistettavina; aiempia epäonnistuneita malleja ei korvattu eikä viety peliin.

| Uusi tehtävä (alkuperäinen) | Malli | Kolmiot | Korkeus |
|---|---|---:|---:|
| 938 (930) | pagodipuu | 1894 / 2000 | 10 m |
| 939 (931) | jalava | 1893 / 2000 | 9 m |
| 940 (932) | neidonhiuspuu | 1942 / 2000 | 12 m |

Kussakin yksi materiaali ja yksi piirto, 1024² PBR-väri/normaali/metallic-roughness, metrit, Y ylös ja pohjan keskiorigo. Ei luurankoa eikä liikettä. Kaikki on tehty Tripossa suoraan enintään 2 000 kolmion asetuksella; ei suurempaa lähtöverkkoa tai paikallista mallinnusta.

## Nouda T7:ltä

`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-puut-938940-20261024/delivery-v1`

GLB:t ovat pagodipuu/, jalava/ ja neidonhiuspuu/ -kansioissa. Esikatseluissa neljä suuntaa per puu sekä puut-yhteenveto.png. QA.json, MANIFEST.json, GENERATION.json ja SHA256SUMS ovat mukana.

ZIP: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-puut-938940-20261024/juoksupeli-puut-938940-delivery-v1.zip`

SHA256: `00ebb9eafbdedf432c27ebf2939b19d8a8fece72b98ab7ce0d4de56e38ff6e5b`.

## Menetelmä ja rajat

4 uutta kokonaan generoitua lähdekuvaa, joissa paksut pyöreät latvuslohkot erottuvat. H3.1 / Ultra Mesh / Triangle2000 / PBR / Remove Lighting. 4 Tripo-kutsua, 180 krediittiä, saldo 19 205 → 19 025. Neidonhiuspuun ensimmäinen uusi malli hylättiin ohuiden siipimäisten latvusosien vuoksi ja käytettiin tilauksen yksi selvävirheuusinta. Lähdekuvien hintaa ei palautettu. Kutsut, työnumerot, ajat, lähteet ja SHA:t on lokitettu.

Lajisopimus 935 säilyy: pagodipuu 10 m, jalava 9 m, kesävihreä neidonhiuspuu 12 m. Jalava on leveämpi ja tummempi, neidonhiuspuu pystympi. Lajit ovat visuaalisia tuotantovalintoja, eivät tarkka 1914-istutuskartta. 933b:n tuottaja voi käyttää tämän paketin lähdekuvia ja 3D-esikatseluja vastaavuuden tarkistukseen; en tuottanut933b:tä.

Latvukset ovat tarkoituksella umpinaisia ja tyyliteltyjä. Reunojen kulmikkuus näkyy lähietäisyydeltä. Lehtien hieno muoto on tekstuurissa. Laaja maahan leivottu varjo ei näy malleissa; täysin leivottoman albedon mittausta ei väitetä. Vastaanottaja tarkistaa PBR-valovasteen, normaalikartan suunnan, värisovituksen 933b:hen ja rungon maakosketuksen varsinaisessa pelissä.

Jalavan paikkahitsauksella tehty reunadiagnostiikka löysi yhden avoimen reunan ja kaksi ei-monistollista reunaa; syytä ei ole vahvistettu, eikä neljän suunnan kuvissa näkynyt aukkoa. Mallia ei väitetä täysin vesitiiviiksi. Tripon automaattinen nimi oli oak tree; jalavalajitus perustuu sopimuksen lähdekuvaan, ei Tripon automaattinimeen.

PT:n mallihyväksyntä, Lavastajan vastaanotto, pelikytkentä ja julkaisu ovat vielä erillisiä vaiheita. Myös aiemman 936-kuittauksen hyväksymät 928/929 säilyvät muuttumattomina. Raskasta paikallista renderöintiä ei käynnistetty.
