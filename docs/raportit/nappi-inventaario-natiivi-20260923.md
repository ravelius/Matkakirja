<!-- Natiivi-UI 23.9.2026 (Fablen pyyntö): webin jokainen pelaajan nappi ja toiminto → natiivin vastine.
Päivitys koonnin jälkeen (sama ilta): KOKEET-osio on nyt kehittäjätilan takana (Asetukset.Kehittaja:
Development Build tai webin koodi, versiorivi → koodi-ikkuna; haara natiivi-ui/tarkastus 3c22e6d),
kaupunkikortin Tutki-rivi poistettu (tarkastus A6), linssit myös laukun VARUSTEET-osiossa, ja natiivi
lehti (osio 8) on tehty haarassa natiivi-ui/lehti 7e9e745 — kuori-rivit muuttuvat "on/osittain"-tilaan,
kun Pelikoodarin ILehtiNakyma kytkee sen peliin. Chatin 403 on korjattu (worker vastaa natiiville 200). -->

# Nappi-inventaario: verkkopelin napit ja toiminnot natiivissa (23.9.2026)

Kävin läpi verkkopelin jokaisen pelaajalle näkyvän napin ja toiminnon ja etsin kullekin vastineen natiivista. Puuttuvia rivejä on 87. Niistä 71 kuuluu ensisijaisesti Natiivi-UI:lle. Lisäksi 20 lehden riviä toimii vain WKWebView-kuoren kautta, joten ne eivät ole natiivia.

Kolme asiaa, joita en saanut varmistettua:
- **Lehtikuoren sisältö.** Kuoren koodi ei ole web-worktreessä, joten en tiedä tarkasti, mitkä lehden napit siellä toimivat.
- **Chatin 403-virhe.** Palvelimen 403 natiiville on aiemman raportin tieto. En tarkistanut, onko se korjattu.
- **Kaksi pienempää.** Ihmisen matkan tutkimusvaihe ja fokusmoodin kartuutsi on merkitty rivin kohdalle "tarkista".

KOKEET-osion sijainti rikkoo omistajan linjausta: natiivin KOKEET-osio (Astronautin reliefi) on nyt julkisessa hampurilaisessa eikä piilotetussa valikossa.

<!-- Koottu 23.9.2026 koodista: web-worktree natiivi-ui-tyo-20260923 @ e2263d235, proto-git master @ 5f13c14
(nostokortit mukana, merge 905465b). Täydentää docs/raportit/natiivi-ui-erot-webiin-20260923.md:n, joka on osin vanhentunut
(aloitus, laukku, maakunnat, nostokortit ja minipulu ovat nyt masterissa). -->

**Omistajan sitova linjaus:** kaikki webin nykyiset toiminnot ja napit kopioidaan natiiviin natiivisti. Kehittäjäsäätimet menevät vain piilotettuun KOKEET-valikkoon.

**Polut:**
- Web: `/Users/Shared/Claude/Matkakirja-natiivi-ui/`. `index.html` sellaisenaan, muut `js/`-kansiosta (esim. `ui.js:11248` = `js/ui.js`).
- Natiivi: `/Users/Shared/Claude/proto-3d/Matkakirja-proto/Assets/Matkakirja/` (`UI/…`, `Scripts/Peli/…`, `Linssit/…`, `Kartta/…`).

**Tila-sarakkeen arvot:**
- **on** = nappi ja teko on natiivissa.
- **osittain** = on, mutta osa puuttuu tai toimii eri tavalla.
- **kuori** = toimii vain lehden WKWebView-kuoressa (`Scripts/Peli/LehtiKuori.cs`), ei natiivisti. Linjauksen mukaan nämä pitää tehdä natiiviksi.
- **puuttuu** = natiivissa ei ole vastinetta.
- **KOKEET** = kehittäjäsäädin, joka kuuluu piilotettuun KOKEET-valikkoon.
- **ei tarvita** = syy kerrotaan rivillä.

**Kenelle:** NUI = Natiivi-UI, PK = Pelikoodari, LS = Linssiseppä, NS = Natiiviseppä, SS = Siirtoseppä-data. Ensimmäinen nimi on ensisijainen omistaja.

---

## 1. Aloitusportti, avaus ja lähtökaupunki

| Nappi / toiminto (webin teksti) | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| "Aloita seikkailu" | ui.js:17422 | UI/Aloitusnakyma.cs:124 | on | NUI |
| "Oppiminen on hauskaa" (periaatteet) | ui.js:17454 | Aloitusnakyma.cs:127 | on | NUI |
| Periaatteet: "Takaisin" | ui.js:17557 | Aloitusnakyma.cs:353 ("Sulje") | on | NUI |
| Periaatteet: "Pelin GitHub-sivu" -linkki | ui.js:17544 | puuttuu | puuttuu | NUI |
| Periaatteet: palautelomake "Lähetä palautetta" ja sähköpostikenttä | ui.js:17636 (periaatePalaute) | puuttuu | puuttuu (palautekanava puuttuu natiivista) | NUI, PK |
| Avausteksti: napautus kirjoittaa loppuun | ui.js (typeText) | Aloitusnakyma.cs:91 | on | NUI |
| "Mistä aloitan?" (intro-valinta) | index.html:657, ui.js:17098 | Aloitusnakyma.cs:97 | on | NUI |
| Lähtökaupunki valitaan pallolta kohderenkailla | ui.js:10508 (doPickStart) | Aloitusnakyma.cs:276 (lista lippuineen) | osittain: natiivissa listakortti, webissä valinta pallolta | NUI, NS |

## 2. Yläpalkki

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Logo → tekijätiedot ja lähteet | index.html:125, ui.js:2405 | UI/Ylapalkki.cs:45 (`PickingMode.Ignore`) | puuttuu: logoa ei voi napauttaa | NUI |
| Tilapilleri (raha · päivä · aika) → matkalaukku | index.html:133, main.js:1412 | Ylapalkki.cs:49 → UiNakymat.cs (PilleriPainettu) | on | NUI |
| Ratas (äänentasot) | index.html:169, main.js:2142 | Ylapalkki.cs:56, UiNakymat.cs | on | NUI |
| Hampurilainen | index.html:338, main.js:1098 | Ylapalkki.cs:58 | on | NUI |
| Puhelimen vaaka-asento: "Näytä / Piilota yläpalkki" (väkäsikoni) | ylapalkki-vaaka.js:69 | puuttuu | puuttuu | NUI |

## 3. Hampurilainen (päävalikko)

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Äänet: Kertoja päällä/pois | main.js:561, 863 | UI/Paavalikko.cs:90, UI/Asetukset.cs | on | NUI |
| Äänet: Musiikki päällä/pois | main.js:571 | Paavalikko.cs:90 | osittain: kytkin on, mutta musiikkia ei ole | PK, NUI |
| Äänet: Äänimaisema päällä/pois | main.js:578 | Paavalikko.cs:90 | osittain: kytkin on, mutta äänimaisemaa ei ole | PK, NUI |
| Kartta: Pieni liike | main.js:686 | Paavalikko.cs | osittain: kytkin on, mutta pulun lento, pilven varjo ja kellonajan sävy puuttuvat | NS |
| "uusi peli" → varmistus "Peruuta" / "Aloita alusta" | index.html:456, 1139–1140; main.js:1400–1402 | Paavalikko.cs:56–61, UI/Vahvistus.cs:33 | on | NUI |
| "ehdota sisältöä" (palaute, ehdotus, kuvavinkki, pro, retkikunta) | index.html:458, main.js:1415, ui.js:17749 | puuttuu | puuttuu | NUI, PK |
| Versionumero → "Mitä uutta" (muutosloki) | index.html:84–100, 501; main.js:1318 | Paavalikko.cs (pelkkä versioteksti) | puuttuu | NUI, SS |
| Päivityksen jälkeen "Peli päivittyi" + "Jatka" | index.html:105–108, main.js:1723 | puuttuu | puuttuu | NUI, SS |
| Päivitä-kuvake (hae uusin versio) | index.html:91, 497; main.js:1243, 1252 | – | ei tarvita: App Store päivittää sovelluksen | – |
| Pelilauta: Karttapallo / Vanha kartta | index.html:443, main.js:1004–1076 | – | ei tarvita: piilossa webissäkin (ui-apurit.js:2396 VANHA_KARTTA_KAYTOSSA = false) | – |
| Syötekoe, Kerrokset, Kehysprofiili, Suoraan kartalle | index.html:409–419 | – | KOKEET (ks. osio 20) | – |

## 4. Ratas (äänentasot)

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Äänitehosteet-liuku | index.html:196 | UI/Aanentasot.cs | osittain: käyttöliittymän tehosteet (sound.js) puuttuvat, vain pulun äänikirjasto | PK, NUI |
| Pulun ääni -liuku | index.html:202 | Aanentasot.cs | on | NUI |
| Lukija-liuku | index.html:208 | Aanentasot.cs (Puhe) | on | NUI |
| Taustamusiikki-liuku | index.html:223 | Aanentasot.cs | osittain: musiikkia ei ole | PK |
| Taustaäänet-liuku | index.html:230 | Aanentasot.cs | osittain: kaupungin äänimaisemaa ei ole | PK |
| Kehittäjä-ryhmä ja työhuone | index.html:236–316 | – | KOKEET (osio 20) | – |

## 5. Tekijätiedot, palaute ja ehdotukset

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Lähteet-dialogi: nimikilpi ja koko lähdeluettelo linkkeineen | index.html:1112, lahteet.js, ui.js:18413 | UI/Tietoja.cs (moduulit/js/lahteet.json) | on: nimikilpi, tekijänoikeus ja koko luettelo (webissäkään ei linkkejä); v11:ssä moduulit/ 404 → vara | NUI, SS |
| Lähteet: "Sulje" | index.html:1122 | Tietoja.cs:45 | on | NUI |
| Palaute "Kerro mitä huomasit": viesti, "Lähetä palautetta", "Takaisin peliin" | ui.js:17613–17762 | puuttuu | puuttuu | NUI |
| Ehdotuslomake "Lähetä ehdotus" (kuvat, tarkennus, nimimerkki, krediitti, lisenssi) | ehdotukset.js:479–555 | puuttuu | puuttuu | NUI |
| Pro-hakurasti ja i-seloste "Mikä on pro-sisällöntuottaja?" | ehdotukset.js:1089–1096 | puuttuu | puuttuu | NUI |
| Kuvavinkki "Lähetä vinkki / palaute" (kuva, paikka, käyttölupa) | kuvavinkki.js:180–288 | puuttuu | puuttuu | NUI |
| Pro: "Kirjaudu", "Lähetä profiili", "Lähetä materiaali", "Unohda tunnukseni tältä laitteelta" | ehdotukset.js:1145, 1000, 840, 1008 | puuttuu | puuttuu | NUI |

## 6. Matkustus, noppa ja lento

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| "Liiku" (kompassi, avaa kulkutapaliu'un) | ui.js:11988 | KaupunkiKortti "Liiku tänne" → UI/Matkavalinta.cs | osittain: natiivissa valitaan ensin kaupunki, sitten kulkutapa | NUI, PK |
| "Liftaus" | ui.js:11373 | Matkavalinta.cs:107 (rivi per kulkutapa) | on | NUI |
| "Bussilla" → "Kaupunki (X p)" | ui.js:11378, 11420 | Matkavalinta.cs:107 | on | NUI |
| "Laivalla (X p)" | ui.js:11385, 11426 | Matkavalinta.cs:107 | on | NUI |
| "Lentäen" → lentolista ja ✈-kohdemerkit kartalla | ui.js:11392, 11437, 10540 | Matkavalinta.cs:107 | osittain: ✈-merkit ja kaikkien kohteiden kamerasovitus puuttuvat | NS, NUI |
| Mannerlento "Lennä X: kaupunki (p)" | ui.js:11450 | UI/KaupunkiKortti.cs:172, NakymaSopimukset.cs:83 | on | NUI |
| "Takaisin" (lentolista) | ui.js:11487 | Matkavalinta.cs:113 ("Peruuta") | on | NUI |
| "Heitä noppa" | ui.js:11248 | Matkavalinta.cs:47 (heittonappi) | on | NUI |
| "Vaihda matkustustapa" (kesken reitin) | ui.js:11262 | puuttuu (PeliOhjain ei tarjoa) | puuttuu | PK, NUI |
| Nopan jälkeen kohderenkaan napautus kartalla | ui.js:10574 (doMove) | – (natiivi etenee itse kohti tavoitetta) | osittain | PK |
| Pomppiva noppa kartalla | die.js | puuttuu (tulos vain ilmoituksena) | puuttuu | NS |
| "Tutki" | ui.js:11636 | KaupunkiKortti "Tutki kaupunkia", heittonappi | on | NUI |
| Vihreä aarrepiste kartalla ("tapaa paikallinen") → laattakysymys | fokuspiste.js:297, ui.js:9310 | – (vain Tutki-nappi) | osittain | NS, PK |
| "Ohita lento" (lentokalvo) | ui.js:21034, 22371 | puuttuu | puuttuu | NS |
| Peli ohi: "Uusi peli" | ui.js:11185 | Aloitusnakyma.cs:412 ("Uusi matka") | on | NUI |

## 7. Kaupunkiliuska, kaupunkikortti ja kartan napautukset

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Kaupungin napautus → liuska | pallolauta/lauta.js:3699 | Kartta/KaupunkiMerkit.cs → UI/KaupunkiKortti.cs | on (natiivissa kortti ruudun alaosassa) | NUI, NS |
| Liuskan kaupunkirivi → kaupunkilehti | lauta.js:3670 | KaupunkiKortti "Lue kaupunkilehti" | on | NUI |
| Liuskan rivi "Nähtävyydet" (kohdekartta) | lauta.js:3671, kaupunkinosto.js:975 | puuttuu | puuttuu | NUI, SS |
| Liuskan rivi "Turistiopas" | lauta.js:3672, kaupunkinosto.js:690 | puuttuu | puuttuu | NUI, SS |
| "Liiku tänne" | kaupunkiliuska.js:44, lauta.js:3650 | KaupunkiKortti "Liiku tänne" | on | NUI |
| Nostokategoriat "Historia (5)" haitarina, nostorivit avaavat noston | kaupunkiliuska.js:225–291, pallolauta/nostot.js:1228 | puuttuu | puuttuu | NUI, NS |
| Liuskan kelausrivit ylös/alas | nostot.js:4258, kaupunkiliuska.js:318 | puuttuu | puuttuu (tarpeen, kun haitari tulee) | NUI |
| Turisti-info-merkki kartalla (i) | kaupunkinosto.js:321, lauta.js:3700 | puuttuu | puuttuu | NS, NUI |
| Turisti-info ja kaupunkipopup: "Kaupunkilehti", ✕, "Lue loppuun", "Lue lisää" | kaupunkinosto.js:494, 602, 791, 956 | puuttuu | puuttuu | NUI |
| Lisäkaupungin kortti | kaupunkinosto.js:1153 | puuttuu | puuttuu | NUI, SS |

## 8. Kaupunkilehti ja maalehti (natiivissa WKWebView-kuori)

**Päivitys 23.9.2026 klo 22 (Natiivi-UI):** lehti on nyt natiivi (`UI/Lehti/Lehtinakyma.cs`, Pelikoodarin
ILehtiNakyma-sopimus), kuori on poistumassa. Alapalkki (Poistu, Edellinen/Seuraava sivun nimin,
tehtävänappi, Maa-liite), sisällys, minitehtävä ja palkintojuliste, kaiutin, kuvat ja suurennos ovat natiivissa.
Laitetestaajan lehtivertailun (PR #2970, `lehti-web-vs-natiivi-20260923.md`) erot:

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Kaupunkilehden sisällys (☰) | lehti.js varmistaLehtiHampurilainen | Lehtinakyma ylärivin ☰ (≥ 2 sivua) | korjattu: testikomento `ui lehti sisallys` avasi vain maalehdessä | NUI |
| Maalehden etusivu: korkokartta pisteineen, perustiedot, tervehdykset, V-Dem-selitys, kartan nosto | maalehti.js piirraMaaEtusivu, naytaMaaTunnusluvut | Lehtinakyma.MaaEtusivu (skeema 1.15 `maat.maakartta`) | tekeillä (natiivi-ui/inventaario-11-20); radiowidget tulee radion kuoren kanssa | NUI, SS |
| Maalehden sivut webin järjestyksessä: maan etusivu, aiheet (myös Tavat, Menovinkit) ja "Maa numeroina" | maalehti.js piirraMaaNumerotSivu, maalehdet.sivut | LehtiSisalto.Maalehti + UI/Lehti/MaaNumeroina.cs | tekeillä: v17:ssä data on (Tavat ja Menovinkit olivat jo natiivissa, testissä vierittämättä) | NUI, SS |

Natiivissa lehti on verkkosivu natiivin päällä (`Scripts/Peli/LehtiKuori.cs`, `?lehti=`). Kaupat kulkevat sillan kautta (`PeliOhjain.cs:1260` LehdenTeko). Linjauksen mukaan lehti tehdään natiiviksi. En varmistanut, mitkä alla olevista toimivat kuoressa.

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Sivut "Edellinen" / "Seuraava" | lehti.js:1812 | LehtiKuori.cs | kuori | NUI, PK, SS |
| "Poistu lehdestä" / "Poistu" | lehti.js:1754 (paivitaTutkiAlapalkki) | LehtiKuori.cs | kuori | NUI, PK |
| Sisällys (alapalkki, hampurilainen, ×, paluu) | lehti.js:1828, 1900, 1950, 1979 | LehtiKuori.cs | kuori | NUI |
| Maaliite "X-liite" | lehti.js:1790 | LehtiKuori.cs | kuori | NUI, SS |
| Mastossa maan linkki (maalehti) | index.html:776, ui.js:2609 | LehtiKuori.cs | kuori | NUI |
| Sää-rivi → koko vuoden sää (×) | index.html:781, ui.js:2623, lehti.js:2388 | LehtiKuori.cs | kuori | NUI, SS |
| Kuvagalleria ‹ ›, kuvan napautus → suurennos | index.html:787–788, ui.js:2525–2539, 16744–16747 | LehtiKuori.cs | kuori | NUI |
| "Lue lisää" / "Lue lisää maasta" → wiki-dialogi (liuskat, ‹ ›, "lue artikkeli", "Sulje") | index.html:796, 807, 870–899; ui.js:2545, 2569, 16571 | LehtiKuori.cs | kuori | NUI, SS |
| Aiheliuskat ja nostot, "Lue lisää aiheesta" | index.html:847, ui.js:15211 | LehtiKuori.cs | kuori | NUI, SS |
| Uutisotsikot → uutinen (×, "Käännä") | index.html:817, lehti.js:2438, 2490, 2503 | LehtiKuori.cs | kuori | NUI, SS |
| Mediarivi: maan radio ja tv | index.html:822, 836 | LehtiKuori.cs | kuori | NUI, SS |
| "Kuuntele näyte", "Kuuntele musiikkia", esikuuntelu, musiikkilinkit | ui.js:16265, 16275, 16289, 16326 | LehtiKuori.cs | kuori | NUI, SS |
| Noston "Avaa sivusto" -linkki | ui.js:16256 | LehtiKuori.cs | kuori | NUI |
| Kulttuurivisan vaihtoehdot | index.html:851, ui.js:15269 | LehtiKuori.cs (teko actionKulttuuri) | kuori | NUI, PK |
| Minitehtävät ja "Lunasta juliste" | ui.js:16006, 16050; fokustehtavat.js:854, 1003 | LehtiKuori.cs (actionMinitehtava, myonnaJuliste) | kuori | NUI, PK |
| Pulla-vinkki ("… Livialle", maksaa punnissa) | fokustehtavat.js:578, 666 | LehtiKuori.cs (actionPullaVinkki/Ostos) | kuori | NUI, PK |
| Lukija (kaiutin, "Tauko" / "Jatka kuuntelua") | lehti.js:697, lukija.js:1835, 2010 | LehtiKuori.cs | kuori | NUI, PK |
| Reaktiot kuvissa (hyvä / huono / virheilmoitus) | reaktiot.js:671–826 | LehtiKuori.cs | kuori | NUI |
| Tiivis lehtiarkki ✕ | lehti.js:2767 | LehtiKuori.cs | kuori | NUI |
| "Etsi kätkö" | index.html:863, ui.js:2630 | KaupunkiKortti "Tutki kaupunkia" | on (kortilla) | NUI |
| "Jatka matkaa" (sulkee lehden) | index.html:864, ui.js:2631 | LehtiKuori.cs (Suljettu) | kuori | NUI, PK |

## 9. Nähtävyydet, kohdekartta ja turistiopas

Webissä nämä avautuvat kaupunkiliuskasta. Natiivissa niihin ei ole reittiä.

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Nähtävyysarkki: ☰ muut nähtävyydet, ‹ ›, ← takaisin, "Sulje" | index.html:915–932, nahtavyydet.js:2570, 2726 | puuttuu | puuttuu | NUI, SS |
| Kohdekartta: zoomi, "⤢ Kokoruutu", × | nahtavyydet.js:953, 980, 1229, 1473 | puuttuu | puuttuu | NUI, SS |
| "Matkaopas"-nauha, "Lue lisää matkailijan oppaasta →" | nahtavyydet.js:1700, 1743 | puuttuu | puuttuu | NUI, SS |
| "Lue lisää aiheesta", henkilölinkki | nahtavyydet.js:2213, 2368 | puuttuu | puuttuu | NUI, SS |
| Opas: vyörivit, säägraafin suurennus, linkit | opas.js:189, 317, 338 | puuttuu | puuttuu | NUI, SS |

## 10. Kysymykset, tapahtumakortti ja paljastus

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Vaihtoehdot | ui.js:19732 | UI/KysymysNakyma.cs:441 | on | NUI |
| "Vihje" | index.html:1437, ui.js:2978 | KysymysNakyma.cs:638 | on | NUI |
| "50:50" | index.html:1438, ui.js:2968 | KysymysNakyma.cs:648 | on | NUI |
| "Jatka" | index.html:1439, ui.js:2995 | KysymysNakyma.cs:656 | on | NUI |
| "Aloita peli" | index.html:1431, ui.js:3001 | KysymysNakyma.cs:627 | on | NUI |
| Lähdelinkki tuloksessa | ui.js:14181 | KysymysNakyma.cs:601 | on | NUI |
| Kuvan tai lipun napautus → suurennos | ui.js:2643 | puuttuu | puuttuu | NUI |
| Kohtaamiskuvan napautus → suurennos pitkällä selitteellä | ui.js:2942 | puuttuu | puuttuu | NUI |
| "Kysy kaverilta" (sähkeen kaveriapu) | sahke.js:893 | puuttuu | puuttuu | NUI, PK |
| Rosvon kaksintaistelu (50:50 = rosvon apu) | ui.js:2969 | – | ei tarvita: poistettu kaanonista 25.8.2026 (KysymysNakyma.cs:297) | – |
| Tapahtumakortti "Jatka matkaa" | index.html:947, ui.js:2842 | KysymysNakyma.cs (tapahtumakortti) | on | NUI |
| Aarteen paljastus koko ruudulle, "Jatka matkaa" | ui.js:20107 (rakennaPaljastus) | UI/LaattaIkoni.cs (vain tulosruudussa) | osittain | NUI |
| Säännöt-dialogi "Sulje" | index.html:1249, 1358 | – | ei tarvita: ei avata webissäkään | – |

## 11. Matkakirjakortti, luennot ja saapuminen

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Kaiutin (luenta päällä/pois) | index.html:692, ui.js:2806 | UI/Pulu/Matkakirjakortti.cs:72 | on | NUI |
| Kortin napautus: pieni → iso | ui.js:2903 | Matkakirjakortti.cs:67 | on | NUI |
| Isoisän vanha valokuva → postikortti | index.html:720, ui.js:2728, 13070 | puuttuu | puuttuu | NUI, SS |
| "Katso kuva" (ilmiön kuva → wiki) | index.html:725, ui.js:2715 | puuttuu | puuttuu | NUI |
| Pikkukuvat → suurennos | fokusvirta.js:4143 | Matkakirjakortti.cs:165 | on | NUI |
| Luentakuva → suurennos ja ‹ › | fokusvirta.js:1764, 2122, 4971 | UI/Pulu/Luentakuvasarja.cs:47 | osittain: suurennoksessa ei selausta | NUI |
| "Ohita" (luento) | fokusvirta.js:4406 | Luentakuvasarja.cs:40, PeliOhjain.cs:155 | on | NUI |
| Saapumistrailerin ohitus napautuksella | saapumistraileri.js | UI/Pulu/Saapumistraileri.cs:45 | on | NUI |
| Fokusvirran kortit (✕, "Jatka", kohtaaminen "Kyllä" / "Ei", pulman vihjelinkki) | fokusvirta.js:1531, 5141, 5241, 5281 | – | ei tarvita nyt: fokusvirta.js:290 FOKUSVIRTA_KORTIT = false | – |
| Sähketehtävä: "Lähetä sähke", "Lähetä omin sanoin", "Myöhemmin", "Selvä" | fokusvirta.js:6201, 6378–6383 | puuttuu (Peli/Kaupat.cs:45 tuntee palkkion) | puuttuu | NUI, PK |

## 12. Kartan kalusteet: karttaselite, maakunnat, kartuscha ja maakyltti

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Karttaselitteen nappi | karttaselite.js:232 | UI/Karttaselite.cs:44 | on | NUI |
| Välilehdet "Nostot" / "Maakunnat" | karttaselite.js:265, 271 | Karttaselite.cs:56–57 | on | NUI |
| Selitteen ✕ | karttaselite.js:279 | Karttaselite.cs:58 | on | NUI |
| Seliterivi → aiheen valot kartalle | karttaselite.js:187, karttavalot.js | Karttaselite.cs:115, UiPalvelut.KarttaValot | on (laskurit datan varassa) | NUI, NS, SS |
| Maakunnat: maaotsikko ▸ | karttatyokalu-maakunnat.js:402 | UI/Maakunnat.cs:193 | on | NUI |
| Maakunnat: alueen rivi (valinta) | karttatyokalu-maakunnat.js:413 | Maakunnat.cs:203 | on | NUI |
| Maakunnat: "Lisää alueesta" | karttatyokalu-maakunnat.js:373 | Maakunnat.cs:293 | on | NUI |
| Maakuntakortti ✕ ja pulun kysymys | karttatyokalu-maakunnat.js:511, 551 | Maakunnat.cs:343, 421 | on | NUI |
| Valitun maakunnan värjäys kartalla | karttatyokalu-maakunnat.js | puuttuu | puuttuu | NS |
| Kartuscha: masto (avaa/sulje) | pallolauta/maapaneeli.js:845 | UI/Kartuscha.cs:63 | on | NUI |
| Kartuscha: aiheet → maalehti | maapaneeli.js:1047 | Kartuscha.cs:172 → PeliOhjain.LueMaalehti | on (lehti kuoressa) | NUI |
| Kartuscha: sija näkyy rivin napautuksesta | maapaneeli.js | Kartuscha.cs:60 | on | NUI |
| Kartuscha: radio (suora lähetys) | maapaneeli.js:902 | puuttuu (Kartuscha.cs:20 "radio vain webissä") | puuttuu | NUI, LS, SS |
| Kartuscha: lipun tarina | maapaneeli.js:961, liput.js | puuttuu | puuttuu | NUI, SS |
| "Maiden lehdet" -nappi kartalla (maatietolinssi päälle/pois) | index.html:562, ui.js:3153 | puuttuu (vain linssivalitsimesta) | puuttuu | NUI |
| Maakyltti "Lue lehti ›" | ui.js:10286 | UI/Linssit/MaidenNakyma.cs:57 | on | NUI |
| Fokusmoodin kartuutsi, "+" Avaa maan lehti | fokusmitat.js:521, 604 | kartuscha | ei tarvita, jos kartuscha korvaa pallolaudalla (tarkista) | – |

## 13. Nostokortit (karttavalot)

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Karttavalon napautus → kortti | lauta.js:3327 | UiPalvelut.ValoNapautettu → UI/Nostokortti.cs | on | NUI, NS |
| Nostokuva: kuva ja "Lisää" | nostokuva.js:470, 510 | Nostokortti.cs:115 ("LISÄÄ") | on | NUI |
| ✕ (skandaali, hetki, eläintäky, kohde) | skandaalit.js:192, historian-hetket.js:183, elaintaky.js:616, fokuskohteet.js:6563 | Nostokortti.cs:50 | on | NUI |
| Kuvasarja ‹ › ja karusellin pisteet | historian-hetket.js:422, elaintaky.js:900, 1060 | Nostokortti.cs:225–226 | on (pisteiden tilalla nuolet) | NUI |
| Kuvan napautus → suurennos | fokusnosto.js:1329, elaintaky.js:1214, fokuskohteet.js:5316 | Nostokortti.cs:220 | on | NUI |
| Suurennoksen ‹ › | fokuskohteet.js:5876 | puuttuu | puuttuu | NUI |
| Skandaalin ja hetken minivisa | skandaalit.js:434, historian-hetket.js:466 | Nostokortti.cs:270 | on | NUI |
| Eläintäkyn palkkio | elaintaky.js | Nostokortti.cs:297 | on | NUI |
| Kohdekortti: lukijan kysymys (+25) ja "Kysy pululta" -kysymykset | fokuskohteet.js:5478 | Nostokortti.cs:165 | on | NUI |
| Kohdekortti: korostetut sanat → "Kysy pululta lisää" | fokuskohteet.js:5390 | puuttuu (Nostokortti.cs:17 "ei korostuksia") | puuttuu | NUI |
| Kohdekortti: kierros ("Avaa kierros", pelin sisäinen kehys, "Avaa selaimessa ↗", ✕) | fokuskohteet.js:5545–5628 | Nostokortti.cs:172 (avaa ulkoisen linkin) | ei tarvita nyt: webin datassa ei yhtään kierrosta (poistettu 26.8.2026) | – |
| "Koe ihme" | fokuskohteet.js:5103 | puuttuu | puuttuu | NUI, SS |
| "Livian leikekirja" | fokuskohteet.js:6355 | puuttuu | puuttuu | NUI, SS |
| Täkynostokortti (kuvat, teksti, visa, "Kysy pululta") | fokusnosto.js:1128, 1737 | puuttuu (NostoSisalto.cs: vain skandaali, hetki, eläintäky ja kohde) | puuttuu | NUI, SS |
| Täkynosto: "Katso X kartalla" | fokusnosto.js:1070 | puuttuu | puuttuu | NUI, NS |
| Täkynosto: liitekartta suurena | fokusnosto.js:1503 | puuttuu | puuttuu | NUI |
| Syvennystarina: ✕, visa, "Lunasta juliste" | syvennys.js:186, 320, 343 | puuttuu | puuttuu | NUI, SS |
| Kaiutin nostokortissa (lukija) | lukija.js:2176 | puuttuu (Nostokortti.cs:17) | puuttuu | NUI, PK |
| Reaktiot: hyvä / huono / virheilmoitus ("Lähetä Livialle", "Peru") | reaktiot.js:671, 678, 777, 779, 826 | puuttuu | puuttuu | NUI |

## 14. Matkalaukku (passi, julisteet, tietäjägalleria, varusteet)

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Laukun avaus pilleristä, napautus ohi sulkee | main.js:1412, ui.js:2417 | UI/Matkalaukku.cs | on | NUI |
| "Matkan tilastot" -väkänen | index.html:997, ui.js:2354 | Matkalaukku.cs:47 | on | NUI |
| Tietäjärivin "i" → tietäjägalleria (10 tasoa) | ui.js:11048, tietajagalleria.js | puuttuu | puuttuu | NUI, PK |
| Aarnin luettelon "i"-seloste ja sen × | ui.js:2377, 17850, 17890 | puuttuu | puuttuu | NUI |
| Julisterivi "n/m »" → julistegalleria | index.html:1043, ui.js:2368 | Matkalaukku.cs:144 (teksti, ei napautusta) | puuttuu | NUI |
| Julistegalleria: vedos → iso juliste, ×, huntu | ui.js:18311, 18351, 18376, 16132 | puuttuu | puuttuu | NUI, SS |
| Varusteet: linssirivi → esikatselu (kuvaus) | index.html:1075, ui.js:19069 | UI/Linssit/Linssivalitsin.cs (kartalla) | osittain: eri paikka, ei esikatselua | NUI, LS |
| "Aktivoi linssi" / "Ota linssi pois" / "Katso karttaa paljain silmin" | ui.js:19353 | Linssivalitsin.cs:164, 66 | on | NUI |
| Passi ja leimat (säilyvät pelistä toiseen) | passport.js | puuttuu | puuttuu | PK |

## 15. Pulu ja chat

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Pulun napautus → keskustelu | pollo.js:1887 | UI/Pulu/Pulu.cs:81 → PuluChat.cs | on | NUI |
| Napautus paneelin ohi sulkee | pollo.js:1916 | PuluChat.cs:100 | on | NUI |
| Kysymyskenttä ja "→" (lähetä) | pollo.js:2340–2351 | PuluChat.cs:111, 116 | on (palvelimen 403 natiiville: tarkista) | NUI, PK |
| Kaiutin (vastaukset ääneen) | pollo.js:2395 | PuluChat.cs:118 | on | NUI |
| Mikrofoni (sanelu) | pollo.js:2401 | puuttuu | puuttuu | NUI, PK |
| "Kirjoita kysymys" (siirtymä sanelusta kirjoitukseen) | pollo.js:2378 | kenttä aina auki | osittain: tarvitaan, kun sanelu tulee | NUI |
| Valmiit ehdotukset (sirut) | pollo.js:2166, 6254 | PuluChat.cs:193 | on | NUI |
| Jatkokysymykset | pollo.js:5505 | PuluChat.cs:311 | on | NUI |
| "Yritä uudelleen" | pollo.js:5533 | PuluChat.cs:302 | on | NUI |
| Linssin valmiit kysymykset chatissa | pollo.js:2227 | UI/Linssit/MinipulunKortti.cs:110 (vain astronautti) | osittain | NUI, LS |
| "Ehdota sisältöä" (chatin ylärivi) | pollo.js:1941 | PuluChat.cs (ylärivi) | on | NUI |
| "Näytä puhekuplat" | pollo.js:1972 | PuluChat.cs (ylärivi) | on | NUI |
| Vastauksen kuva → "Näytä kuva isompana" | pollo.js:5305 | puuttuu | puuttuu | NUI |
| Kuvakortti "Avaa juttu" | pollo.js:5098 | puuttuu | puuttuu | NUI |
| Matkakirjalinkit ("Lue: …") | pollo.js:5477 | puuttuu | puuttuu | NUI, PK |
| Käsitelinkit ("Kerro lisää: aihe") | pollo.js:5824 | puuttuu | puuttuu | NUI |
| "Ehdota tallennettavaksi" (poiminta) | pollo.js:5230 | PuluChat.PoimintaRivi | on (kehittäjätilassa "Tallenna juttuun" samaan kanavaan); webin paketin pillerit artikkelin lopussa (pollo-poiminnat.js, 1 pari) puuttuvat | NUI |
| Paikkakysymys: kamera lentää, "‹ Palaa" | pulu-paikka.js:742 | PuluChat.cs:125, 452 | on | NUI, NS |
| Paikkamerkki kartalla | pulu-paikka.js | puuttuu | puuttuu | NS |
| Puhekuplan napautus (kuittaus) | pollo.js:4062 | UI/Pulu/PuluKuplat.cs:61 | on | NUI |

## 16. Linssit

### 16 a. Yleiset

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Taikalasit-nappi | ui.js (linssinappi) | Linssivalitsin.cs:44 | on | NUI |
| Linssivalitsimen rivit | ui.js:19069 | Linssivalitsin.cs:164 | on | NUI, LS |
| Selitekortin nimi (kutista / avaa) | ui.js:19444 | UI/Linssit/LinssiSelite.cs:33 | on | NUI |
| "Sulje linssi ja palaa pallolle" | pallolauta/linssikartta.js:117 | UI/Linssit/LinssiUi.cs:60 | on | NUI |
| Linssin hampurilainen: Poistu / Aloita alusta / Kertoja / Taustamusiikki | aikajana-valikko.js:105 | LinssiUi.cs:60 (vain sulku) | osittain: Aloita alusta ja kytkimet puuttuvat | NUI, LS |

### 16 b. Astronautin kamera

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| × "Poistu linssistä" | satelliitti.js:1473 | LinssiUi.cs:60 | on | NUI |
| Pikkukuvat (havainnot) | satelliitti.js:1366 | UI/Linssit/Kuvanakyma.cs:205 | on | NUI |
| ⌄ "Näytä lisätiedot" ja selitteen kelaus | satelliitti.js:655, 663 | Kuvanakyma.cs:80, 86 | on | NUI |
| × "Sulje havainto" | satelliitti.js:812 | Kuvanakyma.cs:93 | on | NUI |
| Lähdelinkit | satelliitti.js:461 | Kuvanakyma.cs (lähde tekstinä) | osittain: linkit eivät aukea | NUI |
| Minipulu → kysymyskortti (×, valmiit, kenttä, ↑) | satelliitti.js:848, 907, 922, 1042 | Kuvanakyma.cs:103, MinipulunKortti.cs:52, 74, 110 | on | NUI |

### 16 c. Vertailu ja maiden tiedot

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Alapalkin lappu (poista vertailusta) | vertailu.js:486 | MaidenNakyma.cs:156 | on | NUI |
| "Vertaa" | vertailu.js:495 | MaidenNakyma.cs:147 | on | NUI |
| Arkin laput (maan kortti pois/päälle) | vertailu.js:561 | MaidenNakyma.cs | on | NUI |
| "Muuta valintoja" | vertailu.js:573 | MaidenNakyma.cs:216 | on | NUI |
| Maakäyrät (väkiluku, tulot, V-Dem) | maakayrat.js | puuttuu (MaidenNakyma.cs TODO) | puuttuu | SS, NUI |

### 16 d. Keksinnöt ja tiedeliite

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| "Käynnistä" | aikajana.js:4507 | UI/Linssit/AikajanaNakyma.cs:118 | on | NUI |
| Kello ja "Tauko" / "Jatka" | aikajana.js:2666, 2713 | AikajanaNakyma.cs:80 | on | NUI |
| Aikajanan kortit (siirry keksintöön) | aikajana.js:2759 | AikajanaNakyma.cs:78, 82 (◀ ▶) | osittain | NUI |
| Kartan valot (napautus → keksintö) | aikajana.js:3145, 3289 | puuttuu | puuttuu | LS |
| Lappukahva "Näytä X" | aikajana.js:4151 | puuttuu | puuttuu | NUI |
| Välinäytöksen "Jatka" | aikajana.js:771 | AikajanaNakyma.cs:112 | on | NUI |
| "Katso löydöt" (loppu) | aikajana.js:5005 | AikajanaNakyma.cs:121, 123 | on | NUI |
| "Lue juttu" → tiedeliite | aikajana.js:5677 | puuttuu | puuttuu | NUI, LS, SS |
| Tiedeliite: ✕, ☰ sisällys ja sen rivit, edellinen/seuraava keksijä, karuselli ‹ › ja pisteet, kuvan suurennus | tiedeliite.js:642, 654, 749, 700, 388, 398, 227 | puuttuu | puuttuu | NUI, SS |

### 16 e. Ihmisen matka

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Aloituskortin "Käynnistä" | ihmisen-matka.js | AikajanaNakyma.cs (IHMISEN MATKAN ALOITUS) | on | NUI |
| "Tauko" / "Jatka" / "Loppu" | ihmisen-matka-esitys.js:2493 | AikajanaNakyma.cs:78–82 | on | NUI |
| Löytöpaikan kehys → avaa nosto | ihmisen-matka-esitys.js:1759 | AikajanaNakyma (KuvaKasittelija, vain näyttö) | osittain | NUI, LS |
| Nostokortti: "Sulje nosto", "Tiedeliite: koko juttu" | linssit/ihmisen-matka-kortti.js:398, 443 | puuttuu | puuttuu | NUI, LS |
| Tutkimusvaihe (vanat, pulukysymykset) | ihmisen-matka-tutkimus.js:343 | puuttuu (tarkista) | puuttuu | LS, NUI |

### 16 f. Maailmanradio

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Radiolinssi valitsimessa | linssit/radio.js:2181 | puuttuu (Linssirekisteri.cs:14 "radio jää pois") | puuttuu | LS, NUI |
| Kaupunkien kanavanapit "Viritä kanava" | radiosoitin.js:824 | puuttuu | puuttuu | LS, NUI |
| Viritysasteikko | radiosoitin.js:623 | puuttuu | puuttuu | NUI, LS |
| Lamppu "Keskeytä lähetys" | radiosoitin.js:437 | puuttuu | puuttuu | NUI, LS |
| Linssin askeleet selitekortissa | ui.js:19492, 19565 | puuttuu | puuttuu | NUI, LS |

### 16 g. Muut linssit

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Topografia: ei omia nappeja (selite) | linssit/topografia.js | Linssisepän sovitin ja LinssiSelite.cs | on | LS |
| Karttapallo-linssi | linssit/pallo.js:32 | – | ei tarvita: natiivin lauta on jo pallo (vahvista omistajalta) | – |

## 17. Sähke ja retkikunta

Kaikki tämän osion rivit puuttuvat natiivista. Pelilogiikka tuntee sähkepalkkiot (`Peli/Kaupat.cs:45`), mutta näkymää ja palvelinyhteyttä ei ole.

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Saapuva sähke "Sähke retkikunnalta", ✕ | sahke.js:603–605 | puuttuu | puuttuu | NUI, PK |
| Kaveriavun veikkaus (vaihtoehdot), "En osaa auttaa" | sahke.js:671, 695 | puuttuu | puuttuu | NUI, PK |
| Kaveriavun odotus: "Selvä", "Peru odotus" | sahke.js:1051, 1074 | puuttuu | puuttuu | NUI, PK |
| Nimimerkin valinta, "Arvo uudet nimet" | sahke.js:1149, 1163 | puuttuu | puuttuu | NUI, PK |
| "Perusta retkikunta" | sahke.js:1169 | puuttuu | puuttuu | NUI, PK |
| Liittymiskoodi ja "Liity retkikuntaan" | sahke.js:1198, 1207 | puuttuu | puuttuu | NUI, PK |
| Vinkkisähkeen paikka | sahke.js:1270 | puuttuu | puuttuu | NUI, PK |
| Sähkepohjat | sahke.js:1294 | puuttuu | puuttuu | NUI, PK |
| "Eroa retkikunnasta" | sahke.js:1308 | puuttuu | puuttuu | NUI, PK |

## 18. Voitto, pilvitallennus ja iOS-kuoren toiminnot

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Voitto: "Jatka vaeltamista" | index.html:1450, ui.js:19589 | Aloitusnakyma.cs:410 (Huipennus) | on | NUI |
| Voitto: "Jaa matka" (vain iOS) | index.html:1453, ui.js:19613 | puuttuu | puuttuu | NUI, PK |
| Voitto: "Uusi peli" | index.html:1454, main.js:1417 | Aloitusnakyma.cs:412 | on | NUI |
| Pilvitallennus: "Jatka" / "Ei nyt" | index.html:1465–1471, main.js:353 | puuttuu (vain tallennus.json) | puuttuu | PK, NUI |
| Game Center -saavutukset (ensimmäinen aarre, läpipeluu) | natiivi.js:116, ui.js:19594, 19641 | puuttuu | puuttuu | PK |
| Haptiikka (oikein / väärin) | natiivi.js:79, 157 | puuttuu | puuttuu | PK |
| Kotinäytön widget | natiivi.js:195 | puuttuu | puuttuu | PK |

## 19. Natiivin omat (ei webissä, säilytetään)

| Nappi / toiminto | Natiivi | Kenelle |
|---|---|---|
| Portissa "Jatka matkaa" / "Uusi matka" | Aloitusnakyma.cs:121 | NUI |
| Offline-lataus maittain: "Lataa" / "Peru" / "Poista" ja latauspilleri | Aanentasot.cs, OfflineTilaUi.cs:38 | NS, NUI |
| Hampurilaisen "tekijätiedot ja lähteet" | Paavalikko.cs:69 | NUI |
| Kaupunkikortin "Sulje" | KaupunkiKortti.cs:167 | NUI |

## 20. Kehittäjäsäätimet → KOKEET-valikko

Natiivin nykyinen KOKEET-osio (Astronautin reliefi) on julkisessa hampurilaisessa (`Paavalikko.cs:50`). Linjauksen mukaan se siirretään piilotettuun KOKEET-valikkoon, esimerkiksi versiorivin pitkän painalluksen taakse, joka vastaa webin salasanaa.

| Nappi / toiminto | Web | Natiivi | Tila | Kenelle |
|---|---|---|---|---|
| Kehittäjätilan avaus: salasana, "Kytke päälle", "Sulje" | index.html:95, 1149–1162; main.js:1848–1850 | puuttuu (KOKEET-valikon avaus) | KOKEET | NUI |
| Astronautin reliefi TÄYSI / VAIMEA | – | Paavalikko.cs:50 | KOKEET (siirrettävä piiloon) | NUI, LS |
| "maailma" (maailmanäkymä) | index.html:238, main.js:2166 | puuttuu | KOKEET | NS |
| "mittari" (laitemittari) | index.html:244, main.js:2172 | Kartta/KehysMittari.cs (ei kytkintä) | KOKEET | NS |
| "pallolauta" (piilossa) | index.html:261, main.js:2188 | – | ei tarvita | – |
| "Raamattu" | index.html:308, main.js:2261 | puuttuu | KOKEET | NUI |
| "Kehittäjälehti": Tilannelehti, Poiminnat, Tilastot, Grafiikka, Lukijoilta, Musiikki, Lukijaääni | index.html:312, tyohuone-kehittajalehti.js:50–112 | puuttuu | KOKEET | NUI, PK |
| Syötekoe: Oletus / Kosketus suoraan / Yhteinen kello / Molemmat / Paljas kartta / Paljas + nimiöt / + symbolit / + DOM-kerrokset | index.html:409, main.js:749, piirtokoe-asetus.js:50–107 | puuttuu | KOKEET | NS |
| Kerrokset paljaan kartan päälle (9 kytkintä) | index.html:417, main.js:792, piirtokoe-asetus.js:128–136 | puuttuu | KOKEET | NS |
| Kehysprofiili | main.js:812 | KehysMittari.cs (ei kytkintä) | KOKEET | NS |
| Suoraan kartalle (ei traileria eikä automaattisia luentoja) | main.js:841 | puuttuu | KOKEET | PK |
| Kohtaamiset-lista: "Vain puuttuvat", "Sulje", käynnistys | index.html:1179–1189, kohtaamistesti.js | puuttuu (vain `ui kysymys`-tiedostokomento) | KOKEET | PK, NUI |
| Lukijaäänen säädin: persoona, ääni, ohje, nopeus, voima, "Palauta oletus", "Kuuntele näyte", "Valmis" | index.html:1203–1243, main.js:2344–2357 | puuttuu | KOKEET | PK |
| Kehittäjäsiirto: napautus mihin tahansa kaupunkiin | ui.js:10461 | vain tiedostokomentona (PeliKomennot.cs) | KOKEET | PK |
| Pikatie `?dev=<kaupunki>` | kehittaja-pikatie.js | `ui aloita` (UiKomennot.cs) | KOKEET | PK |
| Pulun "Tallenna juttuun" (kehittäjän poiminta) | pollo.js:5230 | puuttuu | KOKEET | NUI |
| Pulun kysymysehdotukset heti nykyiselle näkymälle | index.html:158, pollo.js (generoiEhdotuksetHeti) | puuttuu | KOKEET | NUI |
| Poimintavienti "Kopioi lohko" / "Tyhjennä" | lehti.js:1084, 1097 | puuttuu | KOKEET | NUI |
| UI-, peli- ja linssikomennot (Documents/*-komento.txt) | – | UiKomennot.cs, PeliKomennot.cs, LinssiKomennot.cs | ei pelaajalle; osan (nosto, kysymys, huipennus, offline-demo) voi nostaa KOKEET-riveiksi | NUI, PK, LS |

---

## Tehty (päivitys 23.9.2026 klo 22, Natiivi-UI)

Masterissa tai merge-pyynnössä: julisterivi → julistegalleria, tietäjärivin i → Tietäjän tie, Aarnin
luettelon i-seloste, turistiopas (kaupunkikortin rivi, lehden Matkailijalle-nauha/kuva/linkki, vyörivit,
säägraafin suurennus, linkit), logo → tekijätiedot, kysymyksen kuva/lippu ja kohtaamiskuva → suurennos,
nostokortin ja luentakuvien suurennoksen ‹ ›, pulun vastauskuva → isompana, pulun käsitelinkit
("Kerro lisää: aihe"). Kesken: "Nähtävyydet"-rivi ja kohdekartta (odottaa Siirtosepän
kohdekartat-kokoelmaa), pulun "Avaa juttu", radion kuori (työn alla).

## Tehty (päivitys 24.9.2026 yö, Natiivi-UI)

Masterissa: Nähtävyydet-rivi, nähtävyysnäkymä ja kohdekartta (zoom, nipistys, ⤢ Kokoruutu, ×,
arkin ☰ ja ‹ ›; rivit 129, 183, 184), lähtökaupunki valitaan pallolta (rivi 52) omistajan
aloituskaavalla (portti → kartta + vahvistus → lento Lontoosta, avausteksti lennon aikana pallon
päällä; AloitusLento Natiivisepältä, ääni ja luenta Pelikoodarilta), vaaka-asennon yläpalkki ja
väkäsnappi (rivi 62), vertailuarkin maakäyrät, lehden fokustehtävät ja pullavinkki.
Masterissa myös: kaiutin nostokortteihin (rivi 265, KortinLukija), miniatyyrien osoitteet, sähketehtävä (220),
pulun "Avaa juttu" (299) ja Livian avausesittely, linssin hampurilainen (317) ja varusteiden esikatselu (278),
oma DC-3-lentokone (CC0). Merge-pyynnössä: "Mitä uutta" ja "Peli päivittyi" (74–75), eläintäkyjen kuvaosoitteet.
Ei tarvita: isoisän vanha valokuva → postikortti (rivi 213) — webissä pienoiskuva on piilotettu
omistajan tilauksesta 23.8.2026 (css .fact-valokuva display none).
Merge-pyynnössä myös: matkakirjakortin kaikki webin polut ja "Katso kuva" (rivi 214; ennen korttia
näytettiin vain 50 fokusvirtakaupungissa 266:sta), kaupunkikortin nostohaitari, kelausrivit ja
lisäkaupungin kortti (rivit 132, 133, 136; 135: webin kaupunkipopup ja turisti-infon välipopup eivät
ole webissä käytössä → ei tarvita). Turisti-info-merkki (134): UI valmis, merkki Natiivisepältä.
Datat Siirtosepältä: saapumistekstit (~214 kaupunkia), karttavaloista puuttuvat nostot.

Lisäksi (24.9. aamuyö): palaute- ja ehdotuskanava (rivit 49, 73, 97–101; lähetys odottaa ehdotusworkerin
natiivitunnistusta ja iOS-kuvanvalitsinta, Pelikoodari), täkynostokortti, syvennystarina, "Koe ihme" ja
"Livian leikekirja" (259–264; kartalta avaus odottaa Siirtosepän nosto-/syvennysvaloja), aarteen paljastus
koko ruudulle (204) ja reaktiot (266; lähetys odottaa workeria), pelin tehosteet ja lentomoottori (B7),
"Mitä uutta" + sisältöpäivityksen rivi, offline-lataus maanosittain (omistaja 24.9.).

## Tehty (päivitys 24.9.2026 aamu, Natiivi-UI)

Merge-pyynnössä (natiivi-ui/ipad-korjaukset, /lahteet, /chat-ylarivi): Lähteet-dialogi (95), chatin
"Ehdota sisältöä" ja "Ehdota tallennettavaksi" (poiminta), kierros ei tarvita (258). iPad-tarkistuksen
korjaukset: maalehden otsikko (MiniJson.Objekti heitti puuttuvasta kentästä → UI:ssa Rakenne.Olio) ja
matkakirjakortti lappuna luennan aikana kaikilla laitteilla (webin TEKSTIT PIILOON KAIKILLA LAITTEILLA).
Odottaa muita: Liiku/kulkutapaliuku ja "Vaihda matkustustapa" (PK:n rajapinta), ✈-kohdemerkit (NS),
sanelu (PK: iOS-puheentunnistus), tiedeliite ja aikajanalinssit (LS).

## Ei webissä, odottaa omistajaa

Sääntö (omistaja 23.9.2026): jos natiiviin oltaisiin tekemässä jotain, mitä webissä ei ole, sitä ei
tehdä, vaan asia kysytään Fablen kautta omistajalta ja kirjataan tähän.

| Asia | Tila |
|---|---|
| Aloituskaupungin vahvistus napautuksen jälkeen (webissä doPickStart suoraan) | Fable 24.9.: pois — napautus valitsee suoraan (natiivi-ui/tyypitys) |
| Pullatarjous poistuu ratkaistun aarretehtävän jälkeen (webissä jää näkyviin) | omistaja 23.9.: natiivi näin, web korjataan (Pelikoodari) |
| "Mitä uutta": webin muutosloki listaa webin versioita | Fable 24.9.: natiivin oma loki (kokoelma muutosloki-natiivi, Julkaisija täyttää); tehty, varana "Ensimmäinen natiiviversio." |

## Yhteenveto

**Puuttuvat rivit ensisijaisen omistajan mukaan** (ensimmäinen nimi Kenelle-sarakkeessa):

| Omistaja | puuttuu | osittain | kuori (lehti) |
|---|---|---|---|
| Natiivi-UI | 71 | 13 | 20 |
| Pelikoodari | 6 | 6 | – |
| Natiiviseppä | 5 | 3 | – |
| Linssiseppä | 4 | – | – |
| Siirtoseppä-data | 1 | – | – |
| **Yhteensä** | **87** | **22** | **20** |

- Siirtoseppä-data on toissijaisena mukana noin 20 puuttuvalla rivillä: nähtävyydet ja opas, muutosloki, liput, radiot, julisteet, tiedeliite, ihme, leikekirja, täkynostot ja syvennykset.
- Pelikoodari on toissijaisena mukana sähkeen, kaveriavun, palautekanavan ja sanelun riveillä.
- KOKEET-riveille menee noin 18 kehittäjäsäädintä (osio 20).

**15 tärkeintä puutetta (pelaajan kannalta):**

1. **Kaupunkiliuskan sisältö:** Nähtävyydet, Turistiopas, nostokategoriat ja niiden takana kohdekartta, nähtävyysarkki ja opas (osiot 7 ja 9). NUI, SS.
2. **Täkynostot ja syvennystarinat puuttuvat kokonaan.** Kohdekortilta puuttuvat myös "Koe ihme", "Livian leikekirja", korostetut sanat ja "Katso X kartalla" (osio 13). NUI, SS.
3. **Kaupunki- ja maalehti on WKWebView-kuori, ei natiivi näkymä.** Linjaus vaatii natiivin version, ja kuoren sisältö pitää varmistaa (osio 8). NUI, PK, SS.
4. **Palaute- ja ehdotuskanava:** hampurilaisen "ehdota sisältöä", periaatteiden palaute, pulun "Ehdota sisältöä", kuvavinkki ja pro-tuottajat (osiot 1, 3, 5, 15). NUI.
5. **Julistegalleria ja tietäjägalleria laukussa.** Julisterivin "n/m »" ja tietäjärivin "i" eivät tee mitään (osio 14). NUI.
6. **Sähke, retkikunta ja kysymyksen "Kysy kaverilta"** (osiot 10, 11, 17). NUI, PK.
7. **Musiikki, äänimaisema ja käyttöliittymän äänitehosteet.** Kytkimet ja liu'ut ovat valikossa, mutta ääntä ei ole (osiot 3 ja 4). PK.
8. **Pulun chatin puutteet:** sanelu, vastauskuvat, "Avaa juttu", matkakirja- ja käsitelinkit, "Näytä puhekuplat" ja paikkamerkki kartalla (osio 15). NUI, NS.
9. **Tiedeliite ja sinne vievät "Lue juttu"- ja "Tiedeliite: koko juttu" -reitit** keksinnöissä ja ihmisen matkassa (osio 16). NUI, LS, SS.
10. **Maailmanradio:** linssi, kanavat, asteikko ja kartuschan radionappi (osiot 12 ja 16). LS, NUI.
11. **Pilvitallennus, "Jaa matka", Game Center, haptiikka ja widget** (osio 18). PK.
12. **Matkustuksen aukot:** "Vaihda matkustustapa" kesken reitin, lentojen ✈-kohdemerkit, "Ohita lento" ja pomppiva noppa (osio 6). PK, NS.
13. **Kuvien suurennokset:** kysymyksen kuva ja lippu, kohtaamiskuva, isoisän valokuva ja postikortti, "Katso kuva" ja selaus suurennoksessa (osiot 10, 11, 13). NUI.
14. **"Mitä uutta" ja "Peli päivittyi"** (osio 3). NUI, SS.
15. **Logo → tekijätiedot ja koko lähdeluettelo linkkeineen,** sekä vaaka-asennon piilotettava yläpalkki (osiot 2 ja 5). NUI.
