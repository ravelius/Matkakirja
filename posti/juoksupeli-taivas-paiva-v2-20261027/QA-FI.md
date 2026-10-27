# Päivätaivas V2 – häviötön vienti

`taivas.png`: 4096 × 2048, 16-bittinen RGB PNG, sRGB, täysi värinäytteistys. Ei JPEG-välivaihetta.

Kuva vietiin alkuperäisestä 24.10. tuotetusta häviöttömästä 1774 × 887 PNG:stä uudelleen 16-bittisellä Lanczos-skaalauksella. Ei uutta generointia, pilvien tai auringon siirtoa, rajausta, maalausta tai sävykorjausta. Alkuperäinen kuva on 8-bittinen: 16-bittisyys säilyttää skaalauslaskennan välisävyt, ei tarkoita alkuperäistä 16-bittistä kuvausta tai uutta yksityiskohtaa. RGB-tasojen 8→16-bittinen skaalaus on normalisoitu koko arvoalueelle. sRGB/gAMA-profiilitieto lisätty ilman pikselimuutosta.

## Tarkistukset
- PNG 4096 × 2048 / 16-bit RGB varmennettu otsakkeesta ja riippumattomasta dekoodauksesta.
- Täyskuva, alkuperäinen ja pilven reuna 1:1 sekä ilmoitettu ylätaivaan rajaus x1800–2300/y60–360 tarkistettu.
- Alueen pisin pystysuuntainen täsmälleen saman sinisen arvon jakso: JPEG 40 px → V2 3 px. Sinikanavan eri arvoja samalla alueella 34 → 7659. Tämä on lähdetiedoston mittaus, ei pelikuvan hyväksyntä.
- Keskimääräinen RGB-kanavakohtainen sävyero alkuperäiseen häviöttömään 4096-vientiin alle 0,027 / 255; koko kuvan keskimääräinen itseisarvoero 0,247 / 255. Ero syntyy 16-bittisestä interpoloinnista, ei sommittelun muutoksesta. Terävien reunojen eri Lanczos-toteutusten yksittäinen maksimi 13 / 255; 99 % kanava-arvoeroista alle 0,80 / 255.
- Mitatun aurinkokiekon keskipiste-ero alle 0,1 pikseliä; ei tarkoituksellista liikutusta.
- taivas.json on **tavulleen sama kuin käytetyn v1-paketin tiedosto**.

## Asetustiedoston huomio
Tilauksen tekstissä lukee 235° / 24°, mutta v1:n todellinen, 24.10. hyväksytty taivas.json on 235° / **21,2°**, vasen reuna 56,68°, kierto 0. Saman kuvan ja saman JSON:n vaatimus säilytettiin: asetusta tai aurinkoa ei muutettu. Aiempi vastaanottopäätös #920 hyväksyi eron. Uusi 24°-väite ei ole tämän viennin mitattu tulos.

## Vastuut ja historia
V1, alkuperäinen PNG ja toimitushistoria säilyvät. Valoseppä tekee PNG-latauksen peliin, KK-kuvaparin ja R2-viennin. Tämän paketin QA ei ole vastaanottajahyväksyntä, toteutunut pelikytkentä, iPad-tarkistus tai julkaisu. Tarkista peliputken 16-bittisen PNG:n käsittely ja mahdollinen 8-bittiseksi purkaminen KK-kuvaparissa; tässä toimituksessa ei ole väitetty peliputken hyväksyntää.

Lähde: Valosepän posti f490d15b2022554b6e1640d45387d50d71cceff6, blob 19da514ae25bf27d5cfd48f3c1d7eb6719912e17. Alkuperäisten tiedostojen polut ja SHA256:t SOURCE-FILES.jsonissa. Oma Codex-kuva, alkuperäisen toimituksen käyttöoikeus säilyy.
