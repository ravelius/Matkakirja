# Ranskan testipeli, kierros 5 (Sonnet local, 19.9.2026 klo 13.44–14.15 Suomen aikaa)

Tuotanto https://matkakirja.app/ kehittäjätilassa, iPhone 18 Pro -simulaattori (Safari), versiot v1951 → v1952 (päivittyi kesken testin). Pohja: origin/main fd8c8d19 (v1952). Haara sonnet-local-ranska-5.

Kuvat: `docs/raportit/kaappaukset/ranska-testi-20260919/01…13-*.jpg` (10 kpl, alle 400 kt). Saman kansion `4-0x-*.png` ovat aiemmalta kierrokselta, eivät tästä.

**Rehellinen rajaus:** A, B ja D on katsottu laitteella ja B lisäksi koneellisesti koko Ranskan pakoista (Node, kaikki kuva-URLit HEAD-haulla). C on vain osittain varmennettu — Ohita-napin katoaminen kartan napautuksesta jäi **epäillyksi, ei todistetuksi**. Testin aikana löytyi lisäksi vakava jumitus (löydös 1), joka söi C:n testiaikaa.

## Löydöstaulukko

| # | Mitä tehtiin | Odotettiin | Tapahtui | Vakavuus | Kuva |
|---|---|---|---|---|---|
| 1 | Pariisi → liftaus → Amsterdam (saapumisluenta käynnissä tai juuri ohi) → heti uusi Liiku → liftaus → noppa | Noppa heittyy, kohteet (Pariisi) ilmestyvät viuhkaan ja kamera näyttää ne | Noppa näyttää lukua (6), kamera on panoroitunut **tyhjälle pergamentille** Maastrichtin kaakkoispuolelle, ei kohteita, ei reittiä. Nopan napautus, kartan napautus ja nipistys eivät tee mitään. **Toistui 2/2.** Sivun uudelleenlataus vapautti ensimmäisellä kerralla; toisella kerralla uudelleenlatauksen jälkeen **Liiku-nappi puuttuu kokonaan** (kolme napautusyritystä Liiku-kohtaan, 14.07–14.10, ei reaktiota) → jumitus säilyy ladattaessa. Onnistunut vertailu: sama siirto Amsterdamista tuoreen latauksen jälkeen (13.56) toimi (viuhka, reitti, saapuminen Pariisiin). Hypoteesi: noppa heitetään **saapumisluennan aikana** → kameran tavoite/tila ristiriidassa. Ei varmennettu. Ei vastakoetta. | **3** | 13 |
| 2 | Pariisi→Amsterdam-saapumisessa napautus kartalle luennan aikana (PAATOKSET 43 kohta 10) | Ohita pysyy näkyvissä, kunnes molemmat luennat päättyvät tai Ohitaa painetaan | 1. yritys: Ohita näkyi saapuessa (14.05); ensimmäinen napautus toi luentakuvan (Leeuwenhoek-mikroskooppi) Ohitan päälle — Ohita jäi kortin taakse; toinen napautus kartalle sulki kortin ja **Ohita oli poissa** (~70 s saapumisesta). 2. yritys (tuore lataus, luenta alkaa): Ohita himmeänä 14.07, katosi ≤5 s, napautuksen kanssa samaan aikaan. En pysty erottamaan, päättyikö luenta itsestään vai piilottiko napautus napin. Epäilys: kohta 10 ei toteudu kartan napautuksessa. **Ei todistettu.** | **2** (epäilys) | 12 |
| 3 | Sama saapuminen, silmämääräinen | Ohita ja "Liiku" eri paikoissa | "Ohita" piirtyy suoraan "Liiku"-tekstin päälle (päällekkäiset kirjaimet, Amsterdamin kartta 14.05). Ei kuvaa. | 1 | – |
| 4 | Astronautin kamera, keskikorkeus | Pohjoisnapa siisti, ei laattarakoja | Pohjoisnavalla iso beige levy ja tummansininen rengas; Grönlannin/Pohjanmeren/Norjan ympärillä suorakulmaisia eri sävyisiä laattalaikkuja (seepia-/meripohja). Sama kuin PAATOKSET 41 kohta 5:n "pohjoisnapa"-löydös — **ei korjaantunut Astronautin kamerassa**. Kuvassa 07 vasemmassa yläkulmassa tumma suorakaide. | **2** | 08, 07 |
| 5 | Astronautin kamera, kohdenimi | Nimi mahtuu | "Reinin suistosaaret — Zeeland, Alankom…" katkeaa (kohdeotsikko kuvassa 09). | 1 | 09 |
| 6 | Hahmotelma/maasto: Lascaux-kortti, LISÄÄ | Teksti, lähde, 2 kysymystä, 2 kuvaa | Kaikki oli. Pulu peittää osan alemman kuvan lähdelinkistä ("Wikimedia Comm…s"). | 1 | 10 |
| 7 | Koneellinen sisältötarkistus | Kaikilla teksti, lähde, 2 kysymystä, ≥2 kuvaa | Maasto 17/17 ja hahmotelma 27/27 täyttävät kaiken (teksti ≥200 merkkiä, lähde, 2 kysymystä, ≥2 kuvaa). Maalehtinostot 18/18: `kuva` + `galleria` = 2 kuvaa, mutta **0 kysymystä** (PAATOKSET 44 ei vaadi, pysyy avoimena). **Fokuskohteet Tuileries ja Bastilji: 0 kuvaa** tietueessa. Kaikki 108 kuva-URLia palauttavat 200. | 2 (Tuileries/Bastilji; jos ne kuuluvat PAATOKSET 44 kohtaan 2) | – |
| 8 | Kaupunkien piilotus ilman siirtoa (D) | Naapurimaiden kaupungit piilossa | Kuva 03: Ranska ilman siirtovaihetta — ei Lontoota, Amsterdamia, Berliiniä, Alppeja. Kuva 04/01: kun Liiku on auki, kohteet + nimet ilmestyvät (Lontoo, Amsterdam, Berliini, Alpit, Marseille). Toimii. Huomio: Marseillea en näe kuvassa 03 (bussi/pulu sen päällä? — ei varmennettu). | – | 03, 04, 01 |

## Toimii kuten pitää

- **A. Astronautin kamera:** pallo ei ole musta (06: vihreä-sininen maapallo, oikeat NASA-pilvet, tumma "pölyinen" avaruussumu taustalla); pilvet näkyvät kaukaa (06), ovat vielä osittain keskikorkeudella (08) ja **poissa lähizoomissa** (07: puhdas relief Brittein saaret–Iberia); paikkaa napauttamalla avautuu valokuva (09: ISS-kuva Reinin suistosaarista, kohdeotsikko). Zoomaus sujuva, ei kaatumisia, ei mustaa välähdystä. Sumun määrää en mitannut, vain silmämääräinen.
- **B.** 8 nostoa avattu laitteella: Étretat (kivikaari), Lascaux (LISÄÄ auki: 2 kuvaa, teksti, lähde, 2 kysymystä), Chartres, Millaun silta, Carcassonne, Verdun/Douaumont, Bayeux (kuvakudos), Chambord — kaikilla kortti latautui alle 1,5 s ja näytti kuvan + kuvatekstin. Toista kuvaa en renderöinyt muilla kuin Lascaux'lla (URL-tarkistus 200 kaikille). Carnacia en avannut.
- **C, osittain:** liftaus Pariisi ↔ Amsterdam toimi kahdesti (13.55–14.00 ja 14.05): nappula liikkuu reittiä pitkin oikeaan suuntaan, kamera seuraa nappulaa ja nappula pysyy ruudun keskiosassa, saapuminen Pariisiin näyttää Notre-Dame-otsikkokuvan ja sen jälkeen Ranskan kartan. Siirtozoomi ja saaton suunta eivät näyttäneet virheellisiltä (silmämääräisesti, ei pistetuloa).
- **D:** ks. löydös 8.
- Päivityskehote "Peli päivittyi" ja tuotannon versionosto toimivat (v1951 → v1952 kesken testin).
- Kuvat latautuvat mediapalvelimelta (108 URLia, kaikki 200).

## Erien jakoehdotus Opukselle

1. **Jumitus (löydös 1):** toistotesti Chromium + WebKit — Pariisi→Amsterdam liftauksella, sitten Liiku heti saapumisluennan aikana → noppa. Juurisyy (kameran tavoite vs. saapumisluenta), korjaus ja vartio; varmista, että tallennus ei säilytä lukkotilaa (Liiku-nappi puuttui uudelleenlatauksen jälkeen).
2. **Ohita (löydös 2, 3):** Playwright-mittaus — kartan napautus kesken luennan ei piilota Ohitaa, luentakuvakortti ei peitä Ohitaa (z-index), Ohita ja Liiku eivät osu päällekkäin. Kirjaa tulos PAATOKSET 43 kohtaan 10.
3. **Astronautin kameran napa ja laattalaikut (löydös 4, 5):** PAATOKSET 41 kohta 5 -korjaus Astronautin kameralle (pyramidi, ei kansalaattaa), sekä kohdeotsikon katkeaminen.
4. **Sisältö (löydös 7):** Tuileries ja Bastilji kuvat (tai kirjaa, että ne eivät kuulu nostoihin); mahdollinen maalehtinostojen kysymyspari; Playwright-silmukka, joka renderöi kaikkien Ranskan nostojen molemmat kuvat.

Aikakatto: testi ajettu ~30 min. Tuotannon simulaattoriin jäi jumitettu Amsterdam (Päivä 3, aamu) — "Uusi peli" vapauttaa. Ei versionostoa, ei mergejä, ei Raamattu-muutoksia.
