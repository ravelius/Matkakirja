# Viesti Fablelle — Ihmisen matkan 20 lisänoston aidot Commons-kuvat

**Sonnet 3, 19.9.2026.** Haara `sonnet3-ihmisen-kuvat`, pohjana
`origin/main` (v1959, 5e02e295). Toimeksianto: omistajan päätös klo 18.20
Suomen aikaa, "aito Commons-kuva nyt, havainnekuva myöhemmin".

**Lyhyesti:** kaikilla 20 lisänostolla on nyt `kuvaAito` (yksi kuva per
nosto), lisenssi tarkistettu Commonsin rajapinnasta ja kuvat katsottu
yksitellen. **Kuvat odottavat ämpäriin viemistä** — kunnes ne ovat siellä,
kortti näyttää aidon kuvan kehyksen varapaikkana (404-polku on ennallaan).

## Mitä sinun pitää tehdä

1. Vie kansion `/Users/samireivinen/Matkakirja-nostot-kuvat/ihmisen-matka/`
   **20 `im-*.jpg`-tiedostoa** (31 Mt yhteensä; alikansio `ei-kaytossa/`
   sisältää 25 hylättyä/varakuvaa — ÄLÄ vie sitä) ämpäriin polkuun
   `linssit/ihmisen-matka/lisanostot-20260920/<tiedosto>`.
2. Versionosto ja PR ovat sinun (ei tehty).

## Kuvat (valittu kuva per nosto)

| Nosto | Tiedosto | Lisenssi | Tekijä | Kuvassa |
|---|---|---|---|---|
| toba | `im-toba-fc05389a.jpg` | Public domain | Batholith | SRTM-korkeuskartta kalderasta ja Samosirista |
| sunda | `im-sunda-c8515f30.jpg` | CC BY-SA 4.0 | ש.מירון | Sundamaan jääkautinen laajuus (kartta, 850 px) |
| sahul | `im-sahul-b4f9bd68.jpg` | CC BY-SA 3.0 | Altaileopard | Sundan–Sahulin kartta, Wallacen linjat (1111 px) |
| wallacea | `im-wallacea-f7a910fa.jpg` | Public domain | Alfred Russel Wallace; J. Arrowsmith | Wallacen oma kartta 1863 |
| flores | `im-flores-b4131f24.jpg` | CC BY-SA 2.0 | Rosino | Liang Buan luola, kaivausalue |
| sulawesi-taide | `im-sulawesi-taide-2941b3f9.jpg` | CC BY-SA 4.0 | Sabjan Badio | käsijälkiä Pettakeren luolassa |
| ust-ishim | `im-ust-ishim-576932ca.jpg` | CC BY-SA 4.0 | Odessey | Išim yhtyy Irtyšiin Ust-Išimin kohdalla (maisema, ei löytöpaikka) |
| kostenki | `im-kostenki-52a30bb4.jpg` | CC BY 3.0 | Наталья Филатова | Don-joki Kostenkin lähellä |
| sungir | `im-sungir-b41a27f1.jpg` | CC0 | Лапоть | pojan helmipuvun museorekonstruktio |
| dolni-vestonice | `im-dolni-vestonice-6b9fd4d0.jpg` | CC BY 2.0 | Miroslav Zachoval | Venus-figuuri museossa |
| malta-poika | `im-malta-poika-f5823400.jpg` | CC BY-SA 4.0 | Liudmila Lbova | lapsihaudan esineitä (helmiä, riipuksia, rannerengas) |
| lascaux | `im-lascaux-afb31501.jpg` | CC0 | Eline13Viki+ | maalaus Lascaux II -kopioluolassa |
| bluefish | `im-bluefish-ebc0b933.jpg` | CC BY-SA 4.0 | Paul Gierszewski | Old Crow Flatsin ilmakuva (ei itse luolia) |
| paisley | `im-paisley-9083f775.jpg` | Public domain | BLM photo | Paisley Caves, Summer Laken tasanko |
| clovis | `im-clovis-19487ff7.jpg` | CC BY-SA 2.0 | Tim Evanson | Clovis-kärkiä museossa |
| doggerland | `im-doggerland-be5c7d79.jpg` | CC BY-SA 4.0 | Francis Lima | Doggerlandin kartat (3 paneelia, englanninkieliset tekstit) |
| teouma | `im-teouma-46a33b40.jpg` | CC BY-SA 3.0 | Torbenbrinker | Lapita-astia, Port Vila |
| madagaskar | `im-madagaskar-6c324b37.jpg` | CC BY-SA 4.0 | Boosha Afrikaf | purjekanootti, vezo |
| saqqaq | `im-saqqaq-7f08cc47.jpg` | CC BY-SA 2.0 | Sebastian We | Sermermiut, Ilulissatin jäävuono |
| rapa-nui | `im-rapa-nui-bf5da0ea.jpg` | CC BY-SA 3.0 | Rivi | Ahu Tongarikin moait |

Lisenssit: PD 3, CC0 2, CC BY 2, CC BY-SA 13. Kaikki haettu Commonsin
`extmetadata`-rajapinnasta ja tarkistettu toisen kerran ajolla (ei
NC/ND, ei GFDL). Nimi `im-<tunnus>-<sha8>.jpg`: sha8 on tiedoston
sha256:n 8 ensimmäistä merkkiä, testi tarkistaa täsmäävyyden.

## Muutokset

- `js/linssit/ihmisen-matka-data.js`: uusi `IHMISEN_MATKA_LISANOSTOKUVAJUURI`
  ja `kuvaAito`-olio (`osoite, lyhyt, selite, lahde, tekija, lahdeUrl,
  lisenssi, lisenssiUrl`) jokaiselle 20 lisänostolle — sama muoto kuin
  keksintölinssin `kuvaAito`.
- `js/linssit/ihmisen-matka-kortti.js`: kortti piirsi `kuvaAito`-kuvan
  ilman tekijää ja lisenssiä (CC BY/BY-SA vaatii maininnan). Nyt aidon
  kuvan alla on lähderivi `taytaLahderivi`-apurilla (Wikimedia Commons ja
  lisenssi linkkeinä). Lisäksi: kun aito kuva on, tulossa olevan
  havainnekuvan 404 ei jätä varapaikkaa aidon kuvan viereen (kehys
  poistuu hiljaa); ilman aitoa kuvaa varapaikka on kuten ennen.
- `css/ihmisen-tutkimus.css`: aito kuva kokonaisena (`contain`, max
  15 rem; kartat eivät rajaudu 3:2:een), kuvateksti rivittyy, lähderivi.
- `tests/ihmisen-matka-lisakuvat.test.mjs`: 20 nostoa, osoitteen juuri ja
  nimimalli, lisenssi sallittujen listalla, lähderivillä tekijä + lisenssi +
  Commons, ei samaa kuvaa kahdelle nostolle; paikallinen kansio (jos
  koneella): JPEG, sha8 täsmää, alle 1,5 Mt.
- `tools/savukkeet/savuke-ihmisen-tutkimus.mjs`: lisänoston väite hyväksyy
  sekä kuvan + lähderivin että varapaikan; `media.matkakirja.app`-reitti
  lukee `lisanostot-20260920`-kuvat paikalliskansiosta, kunnes ne ovat
  ämpärissä (`LISAKUVAT` ohittaa kansion).

## Rehellisesti: heikkoudet, joista päätät sinä

- **Ei löytöpaikan omaa kuvaa:** bluefish (Old Crow Flatsin ilmakuva, ei
  itse luolia — vapaata luolakuvaa ei ole), ust-ishim (Išim/Irtyš-joen
  maisema, ei löytöpaikka), saqqaq (Sermermiut-maisema; Saqqaq-esineistä
  ei vapaata riittävän isoa kuvaa), paisley (luolat ja BLM:n työntekijä
  mittakaavana, 1024 px), kostenki (Don-joki, ei Venus-figuuria).
- **Kartta/kaavio esineen sijaan:** toba, sunda, sahul, wallacea,
  doggerland. Sundan kartta on vain 850 px ja Sahulin 1111 px (ei
  skaalattu ylös). Doggerlandin kartta on kolmen paneelin kollaasi
  englanninkielisin teksteinä.
- **Kopio, ei alkuperäinen:** lascaux (Lascaux II -kopioluola; kuvateksti
  ja selite sanovat sen). Dolní Věstonicen Venus: Commons ei kerro,
  onko kuvassa alkuperäinen vai kopio, joten selite ei väitä
  kummankaan.
- **Tunnistus perustuu tiedostonimeen/vähäiseen kuvaukseen:** teouma
  (Lapita-astia Port Vilan kulttuurikeskuksessa, ei väitetä olevan
  Teoumasta), madagaskar (vezo-purjekanootti; tasapainopuu ei näy
  selvästi, siksi lyhyt teksti ei mainitse sitä).
- **Sulawesi-taide:** vaihdoin agentin valitseman liian tumman kuvan
  Pettakeren luolan käsijälkiin (Sabjan Badio, CC BY-SA 4.0, 3912×2200
  alkuperäinen); vanhimmat alueen jäljet ajoitettu noin 40 000 vuoteen,
  eli nostoa "51 000–44 000" nuorempi — selite ei väitä ikää
  tarkemmin kuin "jopa noin 40 000".
- 13+: yhdessäkään kuvassa ei ole ihmisjäänteitä; sungir on
  rekonstruoitu puku, malta-poika hautalöytöjä (helmiä ym.) harmaalla
  taustalla, ei kalloa.
- `kuva` (havainnekuva, `aikajana/ihmisen-matka/nosto/<tunnus>.jpg`) on
  ennallaan: kun se tulee, kortissa on molemmat, havainnekuva ja aito.

## Mittaus

- `node --test` (ihmisen-matka*, nostokuva): 89/89.
- Selainsavuke `savuke-ihmisen-tutkimus.mjs` Chromiumilla, paikalliset
  kuvat: lisänoston kortti läpi sekä 834×1100 että 390×844 (kuva, lähderivi,
  kortti mahtuu ruutuun). 40/44 väitettä läpi; 4 FAIL koskevat muuta:
  "aikaselain: 22 viivaa" (mitattu 21) ja "hehkun napautus avaa kortin"
  (hehkun paikka null), kumpikin molemmilla ruuduilla. Ne eivät koske tätä
  muutosta (en muuttanut aikaselainta tai hehkuja); en ajanut niitä
  vertailuksi puhtaalta mainilta.

## Kuvahaku

Viisi Sonnet-alaagenttia (4 nostoa kukin, ohje scratchpadissa), minä
katsoin jokaisen ladatun kuvan ja hylkäsin: Bluefishin ilmakuva ikkunan
siivellä, Clovisin tienvarsikuva kylttien kanssa, Kostenkin museokuva
kävijöineen, Sulawesin liian tumma kuva, Lascaux II:n siluettikuva.
Bluefishin pääkuva pakattiin uudelleen (2,2 Mt → 0,8 Mt).
