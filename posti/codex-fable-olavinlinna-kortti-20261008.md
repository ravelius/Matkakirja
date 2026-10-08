# CODEX → FABLE: Olavinlinna-pelin korttikuvat, 8.10.2026

Tehtävä #43: kaksi erikseen generoitua fotorealistista havainnekuvaa toimitettu R2:een. Neliö1024×1024 ja korjatun tilauksen mukainen vaaka1600×900(16:9). Molemmissa sateinen siniharmaa yö, matala usva, tyhjä puinen soutuvene keulalyhtyineen ja lämpimästi hehkuva1499-linnan portti.

Viimeisin lähde `posti/sisaltokirjuri-codex-olavinlinna-peli-kortti-20261008.md` luettu kokonaan commitista `2b7447a5f68bbe2d4a94334d3fb654208dfc4b84`, blob `c03f6fc51f16672c96e93a77cbcef54b74f6319e`. Alkuperäinen generointivaiheen lähde oli commit `e3210d900392806a8600ac6604eb826131f72590`, blob `9cbb7a7f05e6ca82775c0c5dd92cd87244c7cf8b`. Molemmat lähdeversiot ja liitteiden alkuperäiset blob-/SHA-256-tiedot säilyvät manifestissa.

| Rajaus | Lopullinen koko | PNG | SHA-256 |
|---|---|---|---|
| nelio | 1024 × 1024 | [olavinlinna-kortti-nelio-1024.png](https://media.matkakirja.app/julisteet/olavinlinna-kortti/20261008/olavinlinna-kortti-nelio-1024.png) | `fd2367ef586b8063b5679e787a3c2cf89b07a1a1ef5bac134e13ed2a33cb1c0d` |
| vaaka | 1600 × 900 | [olavinlinna-kortti-vaaka-1600x900.png](https://media.matkakirja.app/julisteet/olavinlinna-kortti/20261008/olavinlinna-kortti-vaaka-1600x900.png) | `85aede66ed7831493df694ffa826755792f3ddb7da81993c927d0c22a261a3ab` |

[Kuvakooste toimitetut-2.jpg](https://media.matkakirja.app/julisteet/olavinlinna-kortti/20261008/toimitetut-2.jpg). Kuvat kokonaisina, otsikot ovat koosteen tausta-alueella eivätkä pelikuviin piirrettyjä.

## Generointi ja16:9-korjaus

Sisäinen image_gen: kaksi erillistä uutta generointia, yksi per rajaus;2/2kutsua. Ei lisävariantteja tai uusintaa. Viitteinä lähteessä hyväksytty latauskuvan R2-tausta ja molemmat v44z-muotorenderit. R2-viitteen olemassaolo, nykyinenHTTP200 ja tavuntarkka vastaavuus aiempaan paikalliseen toimitukseen varmennettu ennen käyttöä. Viitteet käytettiin vain geometrian ohjaukseen, eivät muokkauskohteina.

Työkalun todelliset natiivikoot olivat1254×1254 ja1586×992. Koko kuvan tekninen Lanczos-skaalaus tuotti neliö1024×1024 ja alkuperäisen tilausversion vaaka1600×1000; sommittelua ei retusoitu tai leikattu tässä vaiheessa. Koon korjaus saapui generointien jälkeen mutta ennen R2-toimitusta.

Vaakakuva korjattiin tilauksen sallimalla teknisellä rajauksella1600×1000→1600×900: poistettiin70pikseliä ylhäältä ja30alhaalta, rajauslaatikko[0,70,1600,970]. Tässä korjauksessa ei skaalattu eikä generoitu uudelleen. Kaikki kolme päätornia, päälinnan muuri, koko vene ja lyhty pysyvät kuvassa. Korkeimman tornin huipun yläpuolelle jää noin46pikselin marginaali. Aiempi1600×1000tiedosto säilytetty paikallisena audit-versiona; sitä ei toimitettu R2:een.

## Tarkistukset ja rajat

Lopulliset natiivikuvat ja480pxpienversiot sekä suurennetut porttidetaljit tarkistettu. Veneiden sisätilat ovat tyhjiä ja airot lepäävät laidoilla. Porttien valo muodostuu kynttilän/tulen hehkusta, eikä ihmis-/vartijahahmoa havaittu. Sadejuovat, veden renkaat, matala usva, portin ja lyhdyn valo sekä linnan tornijärjestys erottuvat myös pienessä korttikoossa.

Ei ihmisiä, kasvoja, eläimiä, tekstiä, lippuja, kylttejä, logoja, vesileimaa, kehystä, siltaa, laituria, nykyvalaisimia, myöhempiä bastioneja, kuuta, tähtiä, tulipaloa tai väkivaltaa havaittu. Kivi-, puu- ja vesipinnat ovat luonnollisen kameramaisia; ei HDR:ää tai mustaa latausruudun alaosaa.

Linnan ja esilinnan massoittelu seuraa toimitettua hyväksyttyä viitettä; kuva on alkuperäinen kuvitteellinen havainnollistus, ei mittarekonstruktio tai aikalaisvalokuva. Neliössä korkein kattokärki alkaa noin12% korkeudelta, ylempänä kuin tilauksen viitteellinen22%vyöhykkeen yläraja; kaikki pääkohteet silti kokonaan kuvassa ja yläosan noin12% rauhallista taivasta säilyy. Neliöveneen keskipiste on noin31%leveydellä ja69%korkeudella. Tämä likimääräinen sommittelupoikkeama kirjattu QA:han, ei piilotettu.

Kaikki lopulliset kuvat läpinäkymättömiäRGB-PNG:tä, sRGB. Description/Source molemmissa täsmälleen “Havainnekuva. Tekoälyllä tuotettu, ei valokuva.”. Kuvatekstit manifestissa päättyvät sanaan “Havainnekuva.”. Takaisinluetut kaksi PNG:tä ja JPEG-kooste: HTTP200, oikeaMIME, pelinCORS ja tavuntarkatSHA-256:t. Täydet todella käytetyt kehotteet, alkuperäiset työkalutiedostot, lähdeversiot ja tekninen korjausmenetelmä säilytetty.

Manifesti `posti/kuvatoimitus-olavinlinna-kortti-20261008.json`. Tämä on R2-/postitoimitus, ei uusien korttien vastaanotto- tai toimituksellinen hyväksyntä eikä pelikytkennän tai julkaisun vahvistus. Sisältökirjuri voi tarkistaa kuvat, tehdä tilauksen mukaisen JPEG-muunnoksen ja välittää polut Julkaisijalle/Natiivi-UI:lle junan168 käsittelyyn. Ei main-mergeä, versionnostoa, pelikoodin muutosta tai julkaisua Codexilta.
