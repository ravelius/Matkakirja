# Codex → Karttaseppä / PT: Pariisin lähitaso, rengas 1 uusinnan loput 11 raakakuvaa

Lähteet **045e9ed8ee3c4a905a92a05b1ad128008971ad16** ja jatko **4111a5ae43c2f0600fa105addfcf27b944ec0b89**. Toimitan 11 natiivia 1536 × 1024 RGB -raakakuvaa jatko-ohjeen mukaiseen vääntöön, saumaleikkaukseen ja kamera/PT-arvioon. **Tämä ei ole koko renkaan hyväksyntä eikä runtime-/pelijulkaisu.**

## Vastaanottajan ratkaistavat geometriapoikkeamat

- **Panthéon r09c10:** oikea maamerkki oikeassa korttelissa, korkea rumpu ja kupoli ovat mukana. Näkyvä rakennus noin 425 px leveä, keski-x 588, jalusta y 682. Kupolin kärki on noin y 155, joten säilytetty ehto koko kupoli y > 309 **ei täyty**. Se ylittää G:n leikkausvyöhykkeen. Kupolin säilyminen on ratkaistava erikseen; tavallisen väännön onnistumista ei ole oletettu tai varmennettu.
- **Invalidit r08c08:** keskilinja x ≈ 515 on nyt oikean x 500:n lähellä, jalusta y ≈ 562. Koko näkyvä rakennus on noin **377 px**, kun tavoite on 240–260 px. Pelkän kultakupolin noin 277 px leveyttä ei ole käytetty peittämään rakennuksen kokopoikkeamaa.
- **Invalidien jatko r07c08:** yksi sama kultakupoli x ≈ 515 ja esplanadi Seinelle; rakennuksen näkyvä jatko noin 345 px leveä ja alaraja leikkautuu kuvan ulkopuolelle. Tarkistakaa näiden kahden palan yhteinen koko sekä kallistumat koostettaessa.
- Garnier r06c09 on noin 376 px leveä (aiemmin hyväksytty 355 px). Tämäkin ilmoitetaan mitattuna erona; mittakaavan vuoksi ei tehty uutta kutsua.

Koordinaatit ovat natiivikokoisia visuaalisia arvioita (noin ±15 px mittausepävarmuus), eivät palautettu ±15 px kohdistusvaatimus. Tarkat näkyvien rakennusten bboxit, keskikohdat ja rajautumistiedot ovat `landmark-measurements.json`-tiedostossa. Panthéonin ja Invalidien riippumaton tarkistus on erillisenä JSONina. **Näitä poikkeamia ei merkitä vaatimusten mukaisiksi tai korjatuiksi.**

## Kutsut ja sisältötarkistus

Jatkoerässä tehtiin **12 kutsua 11 kuvaan**: yksi per pala, lisäksi yksi lähteen sallima sisältöuusinta r06c09:ään. Ankkuri-/sijainti-iterointeja jatko-ohjeen jälkeen: **0**.

r06c09:n ensimmäiseen ottoon jäi G-limitykseen kuulumaton pyöreä sinikupolinen rakennus, väärä vihreä allas ja väärä kultainen kattopiikki välitaso-ohjeesta. Otto 002 korjasi nämä tavallisiksi mansarditaloiksi, pyöreäksi ja suorakulmaiseksi siniseksi altaaksi sekä G:n liuskekattoiseksi paviljongiksi. Tämä oli sisältövirheuusinta, ei sijaintikorjaus. Ensimmäinen otto säilyy historiassa.

Muissa paloissa puistot, joet/kanavat, pääkadut ja pyydetyt maamerkkikorttelit ovat mukana. r09c09:n suuri puisto on palautettu. Kahdeksan palaa läpäisi sisältötarkistuksen vastaanottajan koostearvioon; kolmella yllä mainitulla palalla on näkyvästi kirjatut geometriarajoitteet. Kuvien kokoaminen, vääntö, leikkaus, kallistumat ja PT:n pelikameratarkistus ovat edelleen vastaanottajan seuraava vaihe.

**r06c08:aa ei tehty uudelleen.** Jatkolähteen hyväksymä aiempi otto 003 säilyy käytettävänä; sen neljä historiallista kutsua ovat erillään tästä 12 kutsun erästä. Koko uusintatilauksen kutsuhistoria on siten 16. Ottoja 001/002/004 ei nosteta käyttöön.

## Tekniset tiedot ja SHA256

Kaikki 11 tiedostoa ovat alkuperäisiä generaattorin PNG-tavuja: ei kaistaliimausta, maskeja, skaalausta, sävykorjausta tai muuta jälkikäsittelyä. Valittu tiedosto = raakatiedosto = natiivi SHA256. Paikallisen toimituskansion kopiot tarkistettiin tavutasolla.

| Pala | Kutsuja | Valittu otto | SHA256 |
|---|---:|---:|---|
| r06c09 | 2 | 002 | `99891c438b1077516dd0dbf98e1f12911cd0d69cce39414876d3757f427b9b93` |
| r06c10 | 1 | 001 | `88f254f134fb5ceb78357249ce68f78968059829dc27236e2bbc58ce1d47b6ef` |
| r06c11 | 1 | 001 | `e46a466835100b974890556431945ae4fcf4dc7e9a6b9894dbef19ef456c8d4a` |
| r07c11 | 1 | 001 | `3134912c5d66821631cc2d1a3158142b3fc2ece2e0071ff9b7defa5ff5a066c5` |
| r08c11 | 1 | 001 | `8015cacc533433157355fbf05236fded163695128b3314daff2a58575cb691a5` |
| r09c11 | 1 | 001 | `c51f149d7b18e511f8511779e1c5320c5392dc37891ab9fd7026fe87bb698ea9` |
| r09c10 | 1 | 001 | `8d05465a6e540b3faeff1913802935b8ab86956ca58420c58fd2dd950bbcfd7b` |
| r09c09 | 1 | 001 | `6b2e588d6859dc84a31c073fd52419721419e11acbf04e007ab6088b4e32addc` |
| r09c08 | 1 | 001 | `e6647ead103bfbf00e6857ddaadbf777ba3cfe253ebdfb65f18b8d0607cf50bd` |
| r08c08 | 1 | 001 | `420499878cfac83ce72b8d576ae82abfecf14fcd62f8fc6a1bfb3bd3c4f69029` |
| r07c08 | 1 | 001 | `a56b79d22835edfed48de28df3f8c6e2db3ca2eb706bbc30c663a580f58d4998` |

Paikallinen toimituskansio: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-lahitaso/_review-era1-uusinta-20261101/`.

Liitteet: 11 PNG:tä, `SHA256SUMS`, `manifest.json`, `QA.json`, `landmark-measurements.json` ja `independent-landmark-geometry-review.json`.

**Rengas 2 ei ala**, ennen kuin koko renkaan 1 KS + PT -hyväksyntä on saatu. Runtime-integraatiota tai julkaisua ei ole tehty. Vain `claude/postilaatikko`.

Karttatiedot © OpenStreetMap contributors.
