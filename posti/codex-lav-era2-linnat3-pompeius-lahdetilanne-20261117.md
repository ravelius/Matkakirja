# Codex → LAV / KK / PT: kolme linnan rajausehdotusta, Pompeiuksen diagnostiikka ja lähdejonon tilanne

ERA2D-tilaus 0242ccfc1daa60306929a382774bb05d835792d8 ja ERA2A/B f04fa3d85faa2522dec0f244d69338da58c98256. Neljä uutta mallikuvaa, yksi kokonainen ImageGen-kutsu per kohde, ei uusintoja. Tripoa ei käynnistetty. ImageGen ei palauttanut hintaa/jobid:tä; nämä on kirjattu tuntemattomiksi.

## Kuva-arviot

### Edinburgh — FAIL_MAJOR_INTERNAL_LAYOUT
Crown Square–War Memorial -suhde ja luoteispään massa eivät vastaa lähteitä. Diagnostiikka, ei Tripoa.
Paketti: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/city-sight-edinburgh-edinburghinlinna`
Arvioarkki: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/city-sight-edinburgh-edinburghinlinna/review-sheet.jpg`
Mallikuva SHA256: `b0bf025c5c0697e809e0675a8676d4827f2887b98566b2c736d3a30ebb184f62`
Arkin SHA256: `41d5f93a962658e9c29eb7c5bcfa250f675d03653dfee875dfaa91ec22f35785`

### Praha — WARN_CORE_GEOMETRY_REVIEW
Rajaus palatsiytimeen + St Vitukseen. Tunnistettava ydin, mutta pihojen ja siipien geometria sekä pyöreän tornin sijainti jäävät varauksiksi. Tummat katot ovat lähteessä; eivät hylkäysperuste.
Paketti: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/city-sight-praha-prahanlinna`
Arvioarkki: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/city-sight-praha-prahanlinna/review-sheet.jpg`
Mallikuva SHA256: `39bb336dee0d8dd6e5a49dd21a3f0e7588b2720e521f29d2ae76f617e5700060`
Arkin SHA256: `9fcba876bb358fb967485e4608a2343fab528428b5ababdf37784567d67216f6`

### Wawel — PASS_MAIN_CORE_WITH_WARNINGS
Palatsi + katedraali rajattuna ytimenä. Pääsuhde säilyy; piha-/kattokulmien suoristuminen ja tarkka mittakaava varauksia. Oikea pyöreä palatsitorni on lähteessä todellinen.
Paketti: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/city-sight-krakova-wawelinlinna`
Arvioarkki: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/city-sight-krakova-wawelinlinna/review-sheet.jpg`
Mallikuva SHA256: `6827fb1505242fd483f324aa79eb5c6db4ab8ad06b9f9818a77642f9f2858388`
Arkin SHA256: `6ee447bfd3d6a6bd8630763e4348d8d4a28d4cfb50e58b739398985386228f63`

### Pompeiuksen teatteri — FAIL_SHRINE_ORIENTATION
Keisariajan tulkittu päämassa. Venus-pyhäkön portiikki osoittaa kuvassa ulospäin länteen, kun lähdeleikkauksissa se avautuu itään katsomoon. Diagnostiikka, ei Tripoa.
Paketti: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/rome-theatre-of-pompey-historic`
Arvioarkki: `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/rome-theatre-of-pompey-historic/review-sheet.jpg`
Mallikuva SHA256: `d7cc0fa1d235b082dab6361a7d02d9fa7107566038c3856ffe42275bd31536f2`
Arkin SHA256: `94a4bc45a1486880beedbce63bd351ad1fb6a40a5baba239a599fbe9feecd100`

Praha ja Wawel ovat KK:n rajaus-/kuvapäättelyyn; eivät vielä hyväksyttyjä Tripo-syötteitä. Edinburgh ja Pompeiuksen teatteri toimitetaan vain virheen näyttämiseksi, niitä ei vapauteta Tripo-ottoon. Linnoista erillisen tekijän INDEPENDENT-QA.json; Pompeiuksesta tekijän qa.json ja päächatin ROOT-REVIEW.json. Alkuperäiset säilytetty, lähteet ja lisenssit sources/-kansiossa.

## ERA2B:n lähdetyö valmis, puutteet eroteltuina

- Ringtheaterin kuvan päämassa läpäisi varauksin; arkki toimitettu erikseen b4fb6abec7126038c7462904ceffc5afbc320a5f.
- Freihaustheater: ulkokaton, koko ulkomassan ja suunnan lähdepuute.
- Dianabad: vaihe, koko pohja ja ulkokatto puuttuvat;1823 kuva on pihan sisäkuva,1843 pohja vain allas.
- Northumberland House: puutarhasiivet/koko kattojen pohja puuttuvat; Canaletton kopiot eivät muodosta toista riippumatonta lähdettä.
- Palais d’Orsay: toteutetun kokonaisuuden pohja/katot/pihojen sovitus puuttuvat;1918 hotelli-/asemakaima suljettu pois.
- Meta Romuli: käytettävissä symbolisia/jälkikäteisiä kuvia, koko päägeometria ei varmistu.
- Septizodium: vanha pohja koskee renessanssiin säilynyttä fragmenttia, ei koko antiikin rakennusta; vaihetta ei vaihdeta hiljaa.
- Neron kolossin jalusta: mitoitettava korkeus puuttuu; Wellcome-kuvan nykyinen oikeusmerkintä ristiriitainen. Ei arvattua patsasta.
- Pompeiuksen lähteet riittivät varaukselliseen kuvaehdotukseen, mutta kuvan pyhäkkösuunta hylättiin.

ERA2D4–6 lähdepaketit valmiit, mutta nyt GAP: São Jorge, Pietari-Paavalin linnoitus, Akershus. Avoimesti lisensoidut käyttökelpoiset kokonaiskuvat puuttuvat. Kunkin rajausehdotus ja täsmälliset geometria-/näkymävaraukset: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-massavalmistelu-2461-2464-20261116/era2d-2522/source-review-next3/SUMMARY.md`. Kolmen seuraavan erän9 kohteen lähdetyö etenee pienissä Sol/medium-istunnoissa. Commons429:n jälkeen rasterilatauksia ei uusita eikä rajoitusta kierretä.

## Eteneminen kohti100

MASSA25 alkuperäiset25/25 arkistoitu ja toimitettu, rakenneQA25/25 PASS. Viimeisin näkyvä saldo11590; ei uusia Tripo-ottoja sen jälkeen. Kuvasana on seuraavan maksullisen erän edellytys. Pyydän käsittelemään toimitetut kuvat ja antamaan aiemmin pyydetyn seuraavan rajatun kohdevalinnan130-listasta, painottaen yksittäisiä hyvin dokumentoituja rakennuksia.100 hyväksyttyä ei vielä toteutunut; GAPit kasvattavat puuttuvien määrää.

Päächat omistaa selaimen, tuotantojonon ja postit; apuagentit eivät tilaa samoja malleja. Työnkulku/mallit: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/tripo-massavalmistelu-2461-2464-20261116/TYONKULKU-100.md`. Ei uutta käyttäjän rutiinilupaa pyydetä.
