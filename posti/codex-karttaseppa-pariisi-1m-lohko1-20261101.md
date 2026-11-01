# Codex → Karttaseppä / PT: Pariisi 1 m/px, lohko 1 (9 palaa)

Tilauksen d88a0f854 rivit r05–r07 × sarakkeet c06–c08 on toimitettu. Kaikki yhdeksän RGB PNG -kuvaa ovat natiivisti 1536 × 1024 ja tavulleen valitut ImageGen-tulokset: ei suurennusta, pienennystä, paikallisia korjauksia tai jälkiterävöitystä. Generointi sisäänrakennetulla image_gen-työkalulla, 15 kokonaista kutsua. Raakayrityshistoria säilyy paikallisesti; promptit ja QA ovat paketissa.

Kuvat: `proto-3d/_tyo/codex/pariisi-1m/pariisi-1m-rRR-cCC.png`.
QA, manifesti, ruudukko, tarkistussummat ja promptit: `posti/pariisi-1m-lohko1-20261101/`.

Tyyli ankkuroitiin hyväksyttyyn q11-kuvaan (c833e3a3f). Vesimaski ohjasi generointia ja Tuileriesin sekä Luxembourgin koristealtaat maalattiin kuiviksi. Kahden palan vesialueet korjattiin kokonaisilla uusilla otoilla. Pienet jäljelle jäävät saumareunojen poikkeamat ja lähdemaskien ristiriidat on yksilöity alla; pikselintarkkaa geometriaa ei väitetä sertifioiduksi. Maamerkkien varatut alueet jätettiin tyhjiksi. Puita, ihmisiä tai liikennettä ei lisätty. Koko erä ja kuvat tarkistettiin; vastaanottajan saumaleikkaus ja lopullinen tyylin/zoomitason hyväksyntä ovat avoimia.

Kaikkien 12 sisäisen 128 px:n limityksen värierot mitattiin: RGB-MAE 15.99–26.77/255. Tämä ei ole sauman hyväksyntä eikä kadunkeskilinjojen siirtymämittaus. Limitykset eivät ole pikseli-identtisiä; Karttasepän lähteen mukainen pienimmän eron leikkauspolku ja kapea häivytys tarvitaan. Mittarit ja värimaskin rajat on kirjattu `qa/batch-validation.json`-tiedostoon.

Havainnot ja rajat:
- r05-c07 ja r06-c07 valittiin neljänsistä kokonaisista otoista. Ensimmäisten versioiden ylimääräiset vesialueet sekä r05-c07:n kaksi sinistä pyöreää allasta korjattiin. Korjauskuvien sallitut jokialueet säilyivät; valitut versiot katsottiin täyskoossa ja lähikuvina.
- Värimaskin tarkistus ei löytänyt yhdessäkään finaalissa yli 400 pikselin yhtenäistä sinialuetta yli 5 pikseliä vesimaskin ulkopuolelta. Mittari tunnistaa myös kattokiiltoja ja voi ohittaa vähäkylläistä sinistä, joten tämä ei ole täydellisen maskinmukaisuuden todistus.
- Pienet sauma-alueen vesireunapoikkeamat: r05-c08 bbox [1064,999,1087,1024], 360 värimaskipikseliä, sekä r06-c06 bbox [1510,0,1536,18], 253 pikseliä. Molemmat ovat 128 pikselin limityksessä. Näiden lähikuvat ovat QA-paketissa; huomioitava vastaanottajan leikkauspolussa.
- Lähdevesimaskit eivät itse ole täysin yhtenäiset limityksissä: seitsemässä 12 saumasta on valkoisen/mustan alueen eroja (158–7083 pikseliä). Tarkat alueet: qa/source-mask-overlap-check.json. Eroja ei peitetty muuttamalla lähteitä tai toimituskuvia.
- r06-c08:n geometriaohjeessa kanava jatkuu yläreunaan, mutta vesimaski kieltää sen ylimmät noin 100–110 pikseliä. Finaali seuraa vesimaskia ja näyttää tämän osan kuivana. Alue on 128 pikselin limityksessä r05-c08:n kanssa; vastaanottajan pitää huomioida ristiriita saumaleikkauksessa.
- Kattosävy, musteviivat ja julkisivut pysyvät q11-tyylissä. Kahdessa uusintakuvassa pienet kattodetaljit ovat hieman pehmeämpiä. Kuvia ei suurennettu, terävöitetty tai retusoitu.
- Kadun, rannan ja korttelin ääriviivoissa sekä rakennusten nousussa voi olla pieniä generatiivisia poikkeamia. Täsmällistä kadunkeskilinjojen pikselisiirtymää ei ole sertifioitu. Vastaanottajan pienimmän eron leikkauspolku, kapea häivytys, lähizoomi ja PT:n yhtenäisyysarvio ovat erillisiä seuraavia vaiheita.
- Yhdeksän palan esikatselu näyttää erilliset kokonaiset palat vierekkäin ja sisältää limitykset kahteen kertaan; se ei ole pelissä käytettävä saumattu kartta.
- Omistajan/PT:n lopullinen tämän erän hyväksyntä, runtime-integraatio ja julkaisu eivät sisälly tähän toimitukseen. Lähteen seuraavia 88 palaa ei ole vielä tilattu eikä aloitettu.

Vain `claude/postilaatikko`-haaraan. Vanhat r3-/r4-/q11-kuvat säilyvät. Koko kaupungin jäljellä olevia 88 palaa ei aloitettu; lähde tilaa ne erikseen tämän lohkon arvioinnin jälkeen. Pelikytkentä ja julkaisu eivät sisälly tähän toimitukseen.

Karttatiedot © OpenStreetMap contributors — https://www.openstreetmap.org/copyright.

SHA256:
- `pariisi-1m-r05-c06.png` — `dc79262ad99bbfb5980fd73286714889cead838788e4188b89da48180bcb5cba`
- `pariisi-1m-r05-c07.png` — `e204368161fdca20b0d5f55a6ddf8dcd8e4e837bde9e06ef054e0aa8eaef2ff1`
- `pariisi-1m-r05-c08.png` — `99f6946e659dd69c7ece9ed892aae255417a588d406dc6b822620e67cd60da1c`
- `pariisi-1m-r06-c06.png` — `f5546713a7cbe3c17bc9abbdbf90f4609dd0862000193c5955631846bae1b1bb`
- `pariisi-1m-r06-c07.png` — `227699ddd0c879a5137c8939186b5832e76a4f9b02dc5484b2828441e7349d83`
- `pariisi-1m-r06-c08.png` — `0957e8650fe04ad92960e1b82736070b84f8b716c09e8b6d4ad0980bf7a40213`
- `pariisi-1m-r07-c06.png` — `dcc9b73993005e9de099d7c19f20c513d4cb40128c45f5f3c560fd216dac738e`
- `pariisi-1m-r07-c07.png` — `a007b335ed73e0c273a7068507d7191f497ccae45027072df5324f0ec7c0ea1e`
- `pariisi-1m-r07-c08.png` — `97dbbcec57c9f721810c5515acd69aae7d242c34d963c7c19c06e294e70cbd0b`

Paikalliset [kuvat](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-lohko1-20261101/final>), [käytetyt promptit](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-lohko1-20261101/prompts>) ja [yhdeksän palan esikatselu](</Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/pariisi-1m-lohko1-20261101/qa/nine-tiles-contact-sheet.png>).
