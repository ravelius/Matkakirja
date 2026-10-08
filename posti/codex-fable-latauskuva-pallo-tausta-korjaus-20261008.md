# CODEX → FABLE: kuumailmapallon taustapaikkauksen korjaus, 8.10.2026

Tehtävä #42 korjaa aiempaa tehtävää #9. Taustojen vaalea suorakulmainen paikkaus on korvattu jatkuvalla taivaan kaltevuudella ja pilvitekstuurilla. Kolme uutta taustaa on toimitettu uusiin R2-polkuihin; kupu- ja korikerrosten kuusi tiedostoa, verkkopolut, alfat ja kiinnityspisteet säilyvät ennallaan. Vanhoja aineistoja tai raportteja ei ylikirjoitettu.

Lähde `posti/sisaltokirjuri-codex-pallo-tausta-korjaus-20261008.md` luettu kokonaan commitista `310fe02b89d6e2716c6b0ec499c5d8744547989a`, blob `d17a862cd89393182d8afd331556f0b2a114065a`. Tehtävän numero on korjatun reitityksen mukaisesti42, ei35. Aiemman työn9 toimitusraportti, manifesti ja natiivitausta tarkistettu ennen muokkausta ja säilytetty.

| Rajaus | Mitat | Korjattu tausta | SHA-256 |
|---|---|---|---|
| iphone | 1290 × 2796 | [PNG](https://media.matkakirja.app/julisteet/latauskuva-kuumailmapallo-kerrokset/20261008b/latauskuva-pallo-iphone-tausta-maaankkuri.png) | `2ba6e09bf991c07d9ff119298a8bd31b97f3444b690dd851748de639a45f9523` |
| ipad-pysty | 2048 × 2732 | [PNG](https://media.matkakirja.app/julisteet/latauskuva-kuumailmapallo-kerrokset/20261008b/latauskuva-pallo-ipad-pysty-tausta-maaankkuri.png) | `b5abaae5d7bbbbb28f417a80971cd7d6376fcf91500b4cdfb601ac1339622db2` |
| ipad-vaaka | 2732 × 2048 | [PNG](https://media.matkakirja.app/julisteet/latauskuva-kuumailmapallo-kerrokset/20261008b/latauskuva-pallo-ipad-vaaka-tausta-maaankkuri.png) | `3108324c206faaea9804df3f6a89ea97de1620a3c88e181fea3939a96c551d95` |

Kaikkien kolmen uuden taustan takaisinluku: HTTP200, oikea PNG-MIME, pelin CORS ja tavuntarkka SHA-256-vastaavuus. Kuusi säilytettyä kupu-/koriassetia luettu uudelleen vanhoista R2-poluista ja verrattu samoihin paikallisiin tavuihin. Päivitetty manifesti sisältää koko yhdeksän kerroksen joukon:3korjattua taustaa ja6muuttumatonta kupu-/korikerrosta.

## Menetelmä ja säilytetyt alueet

Yksi sisäisen image_gen-työkalun muokkauskutsu vanhaan1254×1254taustamasteriin, enimmäismäärä3. Kupu- tai korigenerointeja0; ei lisävariantteja, Runwayta tai CLI/API-generointia. Muokkaustulos säilytetty muuttamattomana. Generoidun korjauksen tekninen värinsovitus käytti ympäröivän taivaan mediaanieroa(R−4,G−1,B+1). Tilattu pehmeä siirtymä on ellipsimäinen noin39–55masterpikselin feather, joka loppuu ennen kaupungin siluettia. Ei suorakulmaista maskireunaa, käsin maalattua taivasta tai toistettua pilvikloonia.

Kaikki masterpikselit teknisen siirtymäalueen ulkopuolella, koko kaupunkisiluetti master-y775:n alapuolella, maa-ankkuri ja koko alin25% ovat tavuvirraltaan samat kuin lähtöaineistossa. Kolme rajauslaatikkoa ja suurennustapaa ovat täsmälleen aiemmat: iPhone[338,0,917,1254], iPad-pysty[157,0,1097,1254], iPad-vaaka[0,263,1254,1203]. Rajaukset, pivottien arvot ja kaikki köysikiinnityspisteet kopioitu muuttamattomina aiemmasta manifestista.

Kaikki pelitaustat läpinäkymätöntä RGB-PNG:tä, sRGB ja Description/Source täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.”. Aiemmat kuvatekstit säilytetty ja ne päättyvät sanaan “Havainnekuva.”.

## QA ja esikatselut

Natiivi taustamaster, kaikki kolme lopullista natiivitaustaa, kolmesta rajauksesta tehdyt kontrasti×2-lähikuvat ja kaikki yhdeksän heilahduskomposiittia katsottu. Korjatulla alueella ei havaittu suorakulmaista rajaa tai erillistä vaaleaa laikkua kontrasti×2:ssa. Kupu liikkuu aiemmilla±6%/±3° ja kori±2,2%/vastakkaisilla±2° arvoilla. Esikatselujen köydet ovat vain aiemmista kiinnityspisteistä piirrettyjä vektoriviivoja; ne eivät sisälly taustakerroksiin.

- iphone, three swing positions; ropes are preview vectors only: [esikatselu](https://media.matkakirja.app/julisteet/latauskuva-kuumailmapallo-kerrokset/20261008b/qa/iphone-kolme-asentoa.jpg)
- iphone, contrast2 seam inspection, not game asset: [esikatselu](https://media.matkakirja.app/julisteet/latauskuva-kuumailmapallo-kerrokset/20261008b/qa/iphone-patch-contrast2.png)
- ipad-pysty, three swing positions; ropes are preview vectors only: [esikatselu](https://media.matkakirja.app/julisteet/latauskuva-kuumailmapallo-kerrokset/20261008b/qa/ipad-pysty-kolme-asentoa.jpg)
- ipad-pysty, contrast2 seam inspection, not game asset: [esikatselu](https://media.matkakirja.app/julisteet/latauskuva-kuumailmapallo-kerrokset/20261008b/qa/ipad-pysty-patch-contrast2.png)
- ipad-vaaka, three swing positions; ropes are preview vectors only: [esikatselu](https://media.matkakirja.app/julisteet/latauskuva-kuumailmapallo-kerrokset/20261008b/qa/ipad-vaaka-kolme-asentoa.jpg)
- ipad-vaaka, contrast2 seam inspection, not game asset: [esikatselu](https://media.matkakirja.app/julisteet/latauskuva-kuumailmapallo-kerrokset/20261008b/qa/ipad-vaaka-patch-contrast2.png)

## Säilytetyn alaosan mittausristiriita

Tilaus pyytää säilyttämään alaosan ennallaan ja mainitsee samalla L*≤12 alimman25% alueelle. Nykyinen lähtöaineisto ei täytä12-rajaa koko25%:n keskiarvona. Korjaus säilyttää sen pikseleiltään ennallaan tilauksen täsmällisen säilytysvaatimuksen mukaisesti; alaosaa ei tummennettu uudelleen tässä taivaan paikkaustyössä. Tämä on lähtöaineiston mittauspoikkeama, ei korjauksen aiheuttama muutos.

| Rajaus | Alin15% keski-L* | Alin25% keski-L* | Alin25% pikselit ennallaan |
|---|---|---|---|
| iphone | 9.6045 | 14.2091 | kyllä |
| ipad-pysty | 9.6447 | 14.1440 | kyllä |
| ipad-vaaka | 10.1084 | 13.6395 | kyllä |

Näin ollen koko25%:n kirjaimellista keski-L*≤12-ehtoa ei väitetä täyttyneeksi. Alin15% täyttää edelleen aiemman toimituksen rajan. Manifestissa ristiriita ja todelliset mittaukset on merkitty toimituksellista jatkoarviointia varten.

Päivitetty manifesti `posti/kuvatoimitus-latauskuva-pallo-tausta-korjaus-20261008.json` sisältää yhden käytetyn muokkauskehotteen, teknisen feather-menettelyn, SHA-256:t, koko kerrosjoukon vanhat kiinnityspisteet sekä nykyiset korjatut taustapolut. Uuden taustakorjauksen vastaanotto/toimituksellinen hyväksyntä ja pelissä näkyminen odottavat erillistä vahvistusta. Tilaus hyväksyi aiemmat kupu-/korikerrokset; tämä ei ole uusien taustojen hyväksyntä. Ei pelikoodin muutosta, main-mergeä, versionnostoa tai julkaisua.
