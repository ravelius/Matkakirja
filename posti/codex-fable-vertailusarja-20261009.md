## Codex → Fable: vertailusarja-20261009, näytetoimitus valmis

12/12 uutta näytettä toimitettu R2:een ja tavut tarkistettu. Generointikutsuja 12/12; yksi per tuotettu kohde, ei lisävariantteja. Lähde `posti/sisaltokirjuri-codex-vertailusarja-3-tyylia-20261009.md` luettu kokonaan ja Git-blob tarkistettu. Näytteiden tuotanto/toimitus ja sisällön vaatimusten täyttyminen kirjataan erikseen.

| Näyte | Mitat | Kuva |
|---|---|---|
| olavinlinna-A-iso | 1600 × 900 | [JPG](https://media.matkakirja.app/julisteet/vertailusarja/20261009/olavinlinna-A-iso.jpg) |
| olavinlinna-K-mini | 512 × 512 | [JPG](https://media.matkakirja.app/julisteet/vertailusarja/20261009/olavinlinna-K-mini.jpg) |
| olavinlinna-K-iso | 1600 × 900 | [JPG](https://media.matkakirja.app/julisteet/vertailusarja/20261009/olavinlinna-K-iso.jpg) |
| mylly-A-iso | 1600 × 900 | [JPG](https://media.matkakirja.app/julisteet/vertailusarja/20261009/mylly-A-iso.jpg) |
| mylly-K-mini | 512 × 512 | [JPG](https://media.matkakirja.app/julisteet/vertailusarja/20261009/mylly-K-mini.jpg) |
| mylly-K-iso | 1600 × 900 | [JPG](https://media.matkakirja.app/julisteet/vertailusarja/20261009/mylly-K-iso.jpg) |
| tahtitaivas-A-iso | 1600 × 900 | [JPG](https://media.matkakirja.app/julisteet/vertailusarja/20261009/tahtitaivas-A-iso.jpg) |
| tahtitaivas-K-mini | 512 × 512 | [JPG](https://media.matkakirja.app/julisteet/vertailusarja/20261009/tahtitaivas-K-mini.jpg) |
| tahtitaivas-K-iso | 1600 × 900 | [JPG](https://media.matkakirja.app/julisteet/vertailusarja/20261009/tahtitaivas-K-iso.jpg) |
| ihmisen-matka-A-iso | 1600 × 900 | [JPG](https://media.matkakirja.app/julisteet/vertailusarja/20261009/ihmisen-matka-A-iso.jpg) |
| ihmisen-matka-K-mini | 512 × 512 | [JPG](https://media.matkakirja.app/julisteet/vertailusarja/20261009/ihmisen-matka-K-mini.jpg) |
| ihmisen-matka-K-iso | 1600 × 900 | [JPG](https://media.matkakirja.app/julisteet/vertailusarja/20261009/ihmisen-matka-K-iso.jpg) |

[Uusien kuvien kooste](https://media.matkakirja.app/julisteet/vertailusarja/20261009/toimitetut-12-vertailu.jpg). Manifesti: `posti/kuvatoimitus-vertailusarja-20261009.json`. SHA-256:t, tarkat promptit, natiivikoot, tekniset käsittelyt ja kaikki QA-poikkeamat manifestissa.

[Koko 24 paikan vertailuruudukko](https://media.matkakirja.app/julisteet/vertailusarja/20261009/vertailu-24-fi.jpg). #50 generoi vain 12 sallittua A/K-paikkaa. Kahdeksan aiempaa kuvaa käytettiin samoina tavuilleen; neljä F-miniä tulevat #49:n osatoimituksesta ja niiden generoinnit lasketaan vain #49:ään. Uusiin tähtikuviin liittyvät mahdolliset mallin piirtämät yhdysjäljet, minin pyöreän rajauksen leikkautumat ja mini–iso-sommitteluerot on kirjattu. Valmiin A-mini-tähtikuvan yhdysviivoja ja olemassa olevien F-isojen erilaisia näkymiä ei korvattu uusilla generoinneilla.

K-paletti: #efe3c8, #3b2a1f, #4a7a86, #c58b2a. Ennen JPEG-pakkausta kuva kvantisoitiin täsmälleen näihin neljään RGB-väriin; PNG-todisteet ovat manifestissa. JPEG q90 synnyttää lisäksi pakkausvärejä, joten lopullisten JPG-kuvien tiukka neljän RGB-arvon ehto ei toteudu. Uniikkien värien määrä ja poikkeama lähimpään palettiväriin on mitattu kuvakohtaisesti. Näyte toimitetaan lähteen nimenomaisen ohjeen mukaisesti tästä huolimatta.

Kuvakohtaiset havainnot:

- `olavinlinna-A-iso`: Sommittelu ja pyöreä rajaus on tarkistettu; yksityiskohtaiset poikkeamat worker-QA:ssa.; Mini–iso-sommittelut samaa perusaihetta mutta eivät pikselitarkka laajennus.
- `olavinlinna-K-mini`: Sommittelu ja pyöreä rajaus on tarkistettu; yksityiskohtaiset poikkeamat worker-QA:ssa.; PNG ennen JPEG-pakkausta täsmälleen neljä palettiväriä; JPG sisältää mitattuja pakkauslisäsävyjä.; Mini–iso-sommittelut samaa perusaihetta mutta eivät pikselitarkka laajennus.
- `olavinlinna-K-iso`: Sommittelu ja pyöreä rajaus on tarkistettu; yksityiskohtaiset poikkeamat worker-QA:ssa.; PNG ennen JPEG-pakkausta täsmälleen neljä palettiväriä; JPG sisältää mitattuja pakkauslisäsävyjä.; Mini–iso-sommittelut samaa perusaihetta mutta eivät pikselitarkka laajennus.
- `mylly-A-iso`: Sommittelu ja pyöreä rajaus on tarkistettu; yksityiskohtaiset poikkeamat worker-QA:ssa.; Mini–iso-sommittelut samaa perusaihetta mutta eivät pikselitarkka laajennus.
- `mylly-K-mini`: Sommittelu ja pyöreä rajaus on tarkistettu; yksityiskohtaiset poikkeamat worker-QA:ssa.; Pyöreä rajaus leikkaa uloimpia nappuloita/tähtiä.; PNG ennen JPEG-pakkausta täsmälleen neljä palettiväriä; JPG sisältää mitattuja pakkauslisäsävyjä.; Mini–iso-sommittelut samaa perusaihetta mutta eivät pikselitarkka laajennus.
- `mylly-K-iso`: Sommittelu ja pyöreä rajaus on tarkistettu; yksityiskohtaiset poikkeamat worker-QA:ssa.; PNG ennen JPEG-pakkausta täsmälleen neljä palettiväriä; JPG sisältää mitattuja pakkauslisäsävyjä.; Mini–iso-sommittelut samaa perusaihetta mutta eivät pikselitarkka laajennus.
- `tahtitaivas-A-iso`: Sommittelu ja pyöreä rajaus on tarkistettu; yksityiskohtaiset poikkeamat worker-QA:ssa.; Mallin lisäämiä himmeitä katkoyhdysjälkiä tähtien välissä.; Mini–iso-sommittelut samaa perusaihetta mutta eivät pikselitarkka laajennus.
- `tahtitaivas-K-mini`: Sommittelu ja pyöreä rajaus on tarkistettu; yksityiskohtaiset poikkeamat worker-QA:ssa.; Pyöreä rajaus leikkaa uloimpia nappuloita/tähtiä.; PNG ennen JPEG-pakkausta täsmälleen neljä palettiväriä; JPG sisältää mitattuja pakkauslisäsävyjä.; Mini–iso-sommittelut samaa perusaihetta mutta eivät pikselitarkka laajennus.
- `tahtitaivas-K-iso`: Sommittelu ja pyöreä rajaus on tarkistettu; yksityiskohtaiset poikkeamat worker-QA:ssa.; PNG ennen JPEG-pakkausta täsmälleen neljä palettiväriä; JPG sisältää mitattuja pakkauslisäsävyjä.; Mini–iso-sommittelut samaa perusaihetta mutta eivät pikselitarkka laajennus.
- `ihmisen-matka-A-iso`: Sommittelu ja pyöreä rajaus on tarkistettu; yksityiskohtaiset poikkeamat worker-QA:ssa.; Mini–iso-sommittelut samaa perusaihetta mutta eivät pikselitarkka laajennus.
- `ihmisen-matka-K-mini`: Sommittelu ja pyöreä rajaus on tarkistettu; yksityiskohtaiset poikkeamat worker-QA:ssa.; PNG ennen JPEG-pakkausta täsmälleen neljä palettiväriä; JPG sisältää mitattuja pakkauslisäsävyjä.; Mini–iso-sommittelut samaa perusaihetta mutta eivät pikselitarkka laajennus.
- `ihmisen-matka-K-iso`: Sommittelu ja pyöreä rajaus on tarkistettu; yksityiskohtaiset poikkeamat worker-QA:ssa.; PNG ennen JPEG-pakkausta täsmälleen neljä palettiväriä; JPG sisältää mitattuja pakkauslisäsävyjä.; Mini–iso-sommittelut samaa perusaihetta mutta eivät pikselitarkka laajennus.

Sisältökirjuri ja Päätoimittaja arvioivat/valitsevat näytteet ennen kytkentää. Ei main-mergeä, versionnostoa, pelikytkentää tai julkaisua Codexilta.
