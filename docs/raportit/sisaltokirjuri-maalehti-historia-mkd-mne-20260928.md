# Maalehti: Historia-aihe MKD:lle ja MNE:lle

Tehtävä: Fablen tilaus 28.9.2026 — Pohjois-Makedonia (MKD) ja Montenegro
(MNE) puuttuvat kokonaan `js/packs/maa-kategoriat.js`:stä. Tämä raportti
sisältää valmiin "Historia"-aiheen (`MAA_KATEGORIAT[ISO3]`) kummallekin,
MLT-mallin (js/packs/maa-kategoriat.js, rivit ~1622–1737) mukaisessa
skeemassa. Ei committoitu — koodilohkot ovat suoraan liitettäväksi
integroivalle sessiolle.

## Menetelmä

- Luettu kokonaan: `docs/moduulit/maalehti.md` (kohdat 2, 2b ja 3) ja
  MLT:n historia-aihe mallina.
- Faktat tarkistettu WebSearchilla (en-Wikipedia ensisijainen lähde
  jokaiselle nostolle — ks. lähdeviitteet tekstissä alla).
- **Genetiivitarkistus:** "Pohjois-Makedonia" ja "Montenegro" päättyvät
  molemmat vokaaliin, joten `maanGenetiivi()`-sääntö tuottaa oikein
  "Pohjois-Makedonian" ja "Montenegron" ilman lisäystä
  `MAAN_GENETIIVIT`-tauluun. ISO3- ja suomenkieliset nimet tarkistettu
  `js/packs/maailmankartta.js`:stä (MKD = "Pohjois-Makedonia", MNE =
  "Montenegro") — koodimuutosta ei tarvita.
- **Päällekkäisyys historian hetkien kanssa tarkistettu ja vältetty
  ohjeen mukaisesti:** `docs/raportit/sisaltokirjuri-ihmeet-historianhetket-ehdotus-20260928.md`
  varaa MKD:lle "historian hetken" Ilinden-kapinasta/Kruševon
  tasavallasta (todennäköisesti proklamaatiohetki) ja MNE:lle Obodin
  kirjapainon 4.1.1494 painohetken. Tämän maalehden nostot käsittelevät
  samat kaksi aihetta **eri kulmasta**: MKD:n nosto painottaa
  hallintoneuvoston monietnisyyttä ja tasavallan loppua (Mečkin Kamen,
  Makedonium-muistomerkki), MNE:n nosto käsittelee kirjapainon koko
  elinkaarta (perustaminen 1493 → sulkeutuminen 1496) eikä vain yhtä
  painohetkeä. Muut kuusi nostoa (Ohrid, Skopjen Kale, Aleksanteri-
  patsas; Kotor, Njegoš, Ostrog) eivät esiinny "ihmeet"- tai
  "historian hetket" -listoilla lainkaan.
- **Kuvat:** jokainen kuva haettu Commonsin hakurajapinnalla/sivuilta,
  lisenssi ja tekijä tarkistettu file-sivulta, ladattu 480 px thumbnail
  ja katsottu silmin (ei väripalkkeja, vesileimoja eikä kollaaseja).
  Kaikki paitsi yksi (Aleksanteri-patsas, perusteltu alla) ovat
  vaakakuvia säännön mukaisesti.
- **Huom Aleksanteri-patsas -nostosta:** ensimmäinen kandidaatti
  ("Statue of Alexander the Great - Skopje - Macedonia.jpg") osoittautui
  silmämääräisesti eri, pienemmäksi patsaaksi (ei hevosta) samasta
  Skopje 2014 -kokonaisuudesta huolimatta kategorian nimestä — hylätty.
  Todellinen "Ratsastava soturi" -patsas (Warrior on a Horse) löytyy
  vain pystykuvana Commonsista korkean pylväsjalustan vuoksi; tämä on
  ohjeen sallima poikkeus ("pystykuva sallittu, kun aihe sitä vaatii...
  torni") ja taitto asettaa tekstin automaattisesti kuvan viereen
  (.pysty).

---

## MKD (Pohjois-Makedonia)

Johdanto kokoaa antiikin Scupin/Kalen, Ohridin Unesco-perinnön,
1903 Kruševon tasavallan ja nykyaikaisen Aleksanteri-patsaskiistan
yhdeksi jatkumoksi.

```js
  MKD: [
    {
      id: 'historia',
      nimi: 'Historia',
      johdanto: 'Pohjois-Makedonia on maa, jossa antiikin roomalaiskaupungin rauniot, '
        + 'keskiaikaisen Bysantin kirkot ja vuoden 1903 kymmenen päivän tasavalta '
        + 'kerrostuvat samalle maaperälle. Jopa maan oma nimi ja pääkaupungin suurin '
        + 'patsas ovat olleet kiistan aiheita – historia täällä ei ole koskaan pelkkää '
        + 'menneisyyttä.',
      nostot: [
        {
          otsikko: 'Kymmenen päivän tasavalta',
          aika: '3.–13.8.1903',
          tiedosto: 'Makedonium 09.JPG',
          teksti: 'Elokuun 3. päivänä 1903 makedonialaiskapinalliset valtasivat pienen Kruševon '
            + 'vuoristokaupungin Osmanivaltakunnalta. Seuraavana päivänä sosialisti Nikola '
            + 'Karev julistettiin tasavallan presidentiksi, ja hän kokosi hallintoneuvoston, '
            + 'jossa istui edustajia sekä slaaveista, albaaneista että vlaheista – kapina ei '
            + 'ollut yhden kansan asia. Ilo jäi lyhyeksi: 12. elokuuta osmanijoukot '
            + 'murskasivat kapinalliset Mečkin Kamenin taistelussa, jossa komentaja Pitu Guli '
            + 'kaatui ja Karev pakeni hädin tuskin Bulgariaan. Kaupunki paloi osittain '
            + 'seuraavana päivänä. Vuonna 1974 pystytetty Makedonium-muistomerkki kohoaa yhä '
            + 'kukkulalla kaupungin yllä.',
          lyhyt: 'Kruševon lyhytikäinen tasavalta yhdisti slaavit, albaanit ja vlahit kymmeneksi '
            + 'päiväksi ennen osmanien vastaiskua.',
          selite: 'Vuonna 1974 avattu Makedonium-muistomerkki Kruševon kukkulalla kunnioittaa '
            + 'vuoden 1903 Ilinden-kapinaa ja sen lyhytikäistä tasavaltaa.',
          lahde: 'Raso mk, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Kruševon tasavalta',
        },
        {
          otsikko: 'Balkanin Jerusalem',
          aika: '9.–13. vuosisata',
          tiedosto: 'Church of St. John at Kaneo 6.jpg',
          teksti: 'Ohridin järvi on yksi Euroopan vanhimmista ja syvimmistä järvistä – sen '
            + 'pohjassa elää lajeja, joita ei tavata muualla maailmassa. Rannalla kohoava '
            + 'Ohridin kaupunki oli 800-luvun lopulla Pyhän Kliment Ohridilaisen koulun '
            + 'ansiosta slaavilaisen kirjallisuuden ja kyrillisen kirjaimiston tärkeimpiä '
            + 'keskuksia Euroopassa. Keskiajalla kaupungissa kerrottiin olleen 365 kirkkoa, '
            + 'yksi joka päivälle – legenda liioittelee, mutta kuuluisin jäljellä olevista on '
            + 'kalliolle Kaneon niemelle rakennettu Pyhän Johanneksen kirkko 1200-luvulta. '
            + 'Unesco liitti järven ja vanhankaupungin maailmanperintöluetteloon jo 1979.',
          lyhyt: 'Ohridin järven rannalla kohoava Pyhän Johanneksen kirkko on yksi Euroopan '
            + 'kuvatuimmista maisemista.',
          selite: 'Kaneon niemelle rakennettu kirkko on peräisin 1200-luvulta, ja Ohridin järvi '
            + 'ja vanhakaupunki kuuluvat Unescon maailmanperintöön sekä luontona että '
            + 'kulttuurina.',
          lahde: 'Kallerna, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Ohridin järvi',
        },
        {
          otsikko: 'Linnoitus maanjäristysten raunioilla',
          aika: '6. vuosisata –',
          tiedosto: 'KaleFortress-Skopje2.JPG',
          teksti: 'Vardar-joen mutkaan roomalaiset perustivat Scupin kaupungin, josta kasvoi '
            + 'tärkeä uskonnollinen ja kaupallinen keskus temppeleineen ja teattereineen. '
            + 'Vuonna 518 maanjäristys tuhosi Scupin lähes kokonaan, ja keisari Justinianus I '
            + 'käski rakentaa uuden linnoituksen läheiselle kukkulalle – osin juuri '
            + 'raunioituneen kaupungin kivistä. Kaivauksissa linnoituksen alta on paljastunut '
            + 'Scupin asukkaiden taloja, jotka jäivät uuden Kale-nimisen muurin alle '
            + 'vuosisadoiksi. Muureja on sittemmin rakennettu uudelleen bysanttilaisten, '
            + 'slaavien ja osmanien aikana, ja ne ovat kestäneet myös Skopjen toisen suuren '
            + 'maanjäristyksen vuonna 1963.',
          lyhyt: 'Skopjen Kale-linnoitus nousi roomalaisen Scupin raunioista, kun maanjäristys '
            + 'tuhosi kaupungin vuonna 518.',
          selite: 'Kale on turkkia ja tarkoittaa linnoitusta; muurien alta kaivetut talot '
            + 'kuuluivat vielä Scupin viimeisille asukkaille.',
          lahde: 'Yemc, Wikimedia Commons (PD)',
          wiki: 'Skopjen linnoitus',
        },
        {
          otsikko: 'Ratsastava soturi torilla',
          aika: '2011',
          tiedosto: 'Warrior on horse statue, Skopje, Macedonia 2.jpg',
          teksti: 'Skopjen pääaukiolle nousi syyskuussa 2011 pronssipatsas: hevonen '
            + 'ratsastajineen 10-metrisen suihkulähdejalustan päällä, yhteensä lähes 25 '
            + 'metriä korkea. Firenzessä valettu, Valentina Stevanovskan suunnittelema teos '
            + 'paljastettiin itsenäisyysäänestyksen 20-vuotispäivänä, mutta se ristittiin '
            + 'virallisesti vain "Ratsastavaksi soturiksi" – naapurimaa Kreikka piti '
            + 'Aleksanteri Suuren nimen käyttöä oman historiansa omimisena. Yli 20 vuotta '
            + 'kestänyt nimikiista ratkesi vasta 2018 Prespan sopimuksella, kun maan nimeksi '
            + 'vahvistettiin Pohjois-Makedonia. Patsas on osa Skopje 2014 -hanketta, joka '
            + 'täytti kaupungin sadoilla uusilla patsailla.',
          lyhyt: 'Skopjen pääaukion jättiläispatsas esittää Aleksanteri Suurta, vaikka sitä ei '
            + 'virallisesti saanut nimetä hänen mukaansa.',
          selite: 'Patsas on osa Skopje 2014 -rakennushanketta, ja sen nimeäminen oli osa Kreikan '
            + 'ja Pohjois-Makedonian pitkää kiistaa muinaisen Makedonian perinnöstä.',
          lahde: 'Yann Forget, Wikimedia Commons (CC BY 4.0)',
          wiki: 'Skopje 2014',
        },
      ],
      tehtava: {
        kysymys: 'Kuka valittiin Kruševon tasavallan presidentiksi elokuussa 1903?',
        vaihtoehdot: [
          'Nikola Karev',
          'Pitu Guli',
          'Gotse Delchev',
          'Dame Gruev',
        ],
        oikea: 0,
        fakta: 'Nikola Karev julistettiin Kruševon tasavallan presidentiksi 4. elokuuta 1903, '
          + 'ja tasavalta kesti kymmenen päivää ennen kuin osmanijoukot murskasivat sen '
          + 'Mečkin Kamenin taistelussa.',
      },
    },
  ],
```

**Kuvat (Commons-URL:t, tarkistettu silmin 480 px thumbnailista):**

- Kymmenen päivän tasavalta (vaaka, 3872×2592): https://commons.wikimedia.org/wiki/File:Makedonium_09.JPG — Raso mk (Rašo), CC BY-SA 3.0. Makedonium-muistomerkki Kruševossa, puhdas ulkokuva, ei tekstiä/vesileimaa.
- Balkanin Jerusalem (vaaka, 5210×3315): https://commons.wikimedia.org/wiki/File:Church_of_St._John_at_Kaneo_6.jpg — Kallerna, CC BY-SA 4.0. Featured picture Commonsissa; Pyhän Johanneksen kirkko Ohridjärven yllä.
- Linnoitus maanjäristysten raunioilla (vaaka, 3648×2736): https://commons.wikimedia.org/wiki/File:KaleFortress-Skopje2.JPG — Yemc, PD (public domain, tekijän oma vapautus).
- Ratsastava soturi torilla (pysty, 3096×4128 — perusteltu yllä): https://commons.wikimedia.org/wiki/File:Warrior_on_horse_statue,_Skopje,_Macedonia_2.jpg — Yann Forget, CC BY 4.0. Selvästi koko patsas (hevonen + ratsastaja) pylväsjalustalla, ei rajattu.

---

## MNE (Montenegro)

Johdanto kokoaa Obodin kirjapainon, Kotorin vuonon, Njegošin
mausoleumin ja Ostrogin luostarin yhdeksi ääripäiden maaksi.

```js
  MNE: [
    {
      id: 'historia',
      nimi: 'Historia',
      johdanto: 'Montenegron pieni maa on täynnä äärimmäisyyksiä: eteläslaavien ensimmäinen '
        + 'painettu kirja syntyi vuoristokylässä jo 1494, Euroopan eteläisin vuono '
        + 'leikkaa kalkkikivivuoret kahtia, ja kaksi pyhää miestä lepää yhä maan '
        + 'korkeimmalla huipulla ja kalliolouhoksessa.',
      nostot: [
        {
          otsikko: 'Lyijykirjaimet Obodin kalliolla',
          aika: '1493–1496',
          tiedosto: 'Cetinje monastery.jpg',
          teksti: 'Zetan hallitsija Ivan Crnojević siirsi pääkaupunkinsa 1480-luvulla vuoristoon '
            + 'perustamalleen Cetinjeen, koska Skadarjärven ranta ei enää ollut turvassa '
            + 'osmaneilta. Hänen poikansa Đurađ pystytti 1493 lähelle, Obodin kalliolle '
            + 'Rijeka Crnojevićan luona, eteläslaavien ensimmäisen kirjapainon – '
            + 'lyijyladelmat ja koristekirjaimet valettiin paikan päällä. Munkki Makarijen '
            + 'johdolla painosta vieri 4. tammikuuta 1494 valmiiksi Oktoih prvoglasnik, '
            + 'ensimmäinen kyrillisin kirjaimin painettu kirja Kaakkois-Euroopassa. Painosta '
            + 'ehti ilmestyä vain viisi teosta ennen kuin osmanien eteneminen pysäytti '
            + 'toiminnan 1496.',
          lyhyt: 'Obodin kirjapaino painoi vuonna 1494 ensimmäisen eteläslaavien kyrillisen '
            + 'kirjan.',
          selite: 'Đurađ Crnojevićin isä Ivan perusti Cetinjen ja sen luostarin 1480-luvulla; '
            + 'Cetinjen museot säilyttävät yhä painon jäänteitä ja alkuperäiskappaleita.',
          lahde: 'Koroner, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Obodin kirjapaino',
        },
        {
          otsikko: 'Muuri joka kiipeää vuorelle',
          aika: '9.–18. vuosisata',
          tiedosto: 'Kotor, Montenegro.jpg',
          teksti: 'Kotor kätkeytyy Euroopan eteläisimmän vuonon perukkaan, jyrkkien vuorten ja '
            + 'meren väliin. Kaupunki on ollut asutettu yli 2000 vuotta, ja roomalaiset, '
            + 'bysanttilaiset, venetsialaiset, itävaltalaiset ja osmanit ovat jättäneet '
            + 'siihen jälkensä – vanhankaupungin sydämessä kohoaa vuonna 1166 vihitty Pyhän '
            + 'Tryphonin katedraali. Suurin osa muureista nousi venetsialaisvallan aikana: ne '
            + 'kiipeävät 260 metrin korkeuteen kaupungin yllä, ja pituutta niillä on lähes '
            + '4,5 kilometriä. Unesco listasi Kotorin maailmanperinnöksi jo 1979, ja 2017 '
            + 'muurit liitettiin vielä venetsialaisten puolustusrakennelmien sarjaan.',
          lyhyt: 'Kotorin vuono ja sen venetsialaismuurein varustettu vanhakaupunki ovat '
            + 'kaksinkertaisesti Unescon maailmanperintöä.',
          selite: 'Kotorin satamakaupunki on ollut asuttu yli 2000 vuotta, ja sen 4,5 kilometrin '
            + 'muurit kiipeävät 260 metrin korkeuteen kaupungin yllä olevalle kalliolle.',
          lahde: 'Ronnie Pander, Wikimedia Commons (PD)',
          wiki: 'Kotorin vuono',
        },
        {
          otsikko: '461 porrasta pilviin',
          aika: '1851–1974',
          tiedosto: 'Njegošev mauzolej.JPG',
          teksti: 'Petar II Petrović-Njegoš oli sekä Montenegron ruhtinaspiispa että maan tärkein '
            + 'runoilija, ja hänen toiveensa oli levätä Lovćenin vuoren huipulla. Kuoltuaan '
            + '1851 hänet haudattiin sinne pieneen kappeliin. Ensimmäisessä maailmansodassa '
            + 'Itävalta-Unkarin miehittäjät halusivat pystyttää huipulle muistomerkin keisari '
            + 'Franz Josefille ja vaativat jäännökset siirrettäväksi Cetinjeen; kappeli '
            + 'rappeutui pahoin. Vasta 1970-luvulla kroatialainen kuvanveistäjä Ivan '
            + 'Meštrović sai valmiiksi uuden mausoleumin Jezerski vrhin huipulle, 1660 metrin '
            + 'korkeuteen. Huipulle kiipeää 461 kiviporrasta, ja mausoleumia pidetään '
            + 'maailman korkeimpana.',
          lyhyt: 'Runoilijaruhtinas Njegošin mausoleumi Lovćenin huipulla on maailman '
            + 'korkeimmalla sijaitseva.',
          selite: 'Kroatialainen kuvanveistäjä Ivan Meštrović suunnitteli mausoleumin, joka '
            + 'valmistui vasta vuosikymmenten viivytysten jälkeen 1974.',
          lahde: 'Darko Bulatović, Wikimedia Commons (CC BY-SA 4.0)',
          wiki: 'Njegošin mausoleumi',
        },
        {
          otsikko: 'Luostari joka kasvoi kalliosta',
          aika: '1665–1671',
          tiedosto: 'Manastir Ostrog - panoramio.jpg',
          teksti: 'Korkealle Ostroškan kallioseinämään on veistetty luostari, joka näyttää '
            + 'kasvaneen suoraan vuoresta. Sen perusti 1665 Hertsegovinan metropoliitta '
            + 'Vasilije, joka valitsi paikan osin suojaksi eteneviä osmaneja vastaan – '
            + 'samoissa luolissa oli ennen häntä asunut erakkona pyhä Isaija Onogoštilainen. '
            + 'Ylempi, kahteen luolaan louhittu kirkko koristeltiin freskoin, ja Vasilije '
            + 'johti laajennustyötä kuolemaansa 1671 asti, minkä jälkeen hänet julistettiin '
            + 'pyhäksi. Ostrog on nykyään Balkanin vierailluin pyhiinvaelluskohde: sinne '
            + 'saapuu vuosittain yli miljoona kävijää kaikista uskonnoista.',
          lyhyt: 'Ostrogin luostari on veistetty suoraan pystysuoraan kallioseinämään.',
          selite: 'Sen perustaja, metropoliitta Vasilije, julistettiin kuolemansa jälkeen '
            + 'pyhäksi, ja luostarista tuli Balkanin vierailluin pyhiinvaelluskohde.',
          lahde: 'Dragan Jankovic Faza, Wikimedia Commons (CC BY-SA 3.0)',
          wiki: 'Ostrogin luostari',
        },
      ],
      tehtava: {
        kysymys: 'Minä vuonna Obodin kirjapaino painoi Oktoih prvoglasnikin, ensimmäisen '
          + 'eteläslaavien kyrillisen kirjan?',
        vaihtoehdot: [
          '1391',
          '1494',
          '1596',
          '1696',
        ],
        oikea: 1,
        fakta: 'Oktoih prvoglasnik valmistui Obodin kirjapainosta 4. tammikuuta 1494 Đurađ '
          + 'Crnojevićin ja munkki Makarijen johdolla.',
      },
    },
  ],
```

**Kuvat (Commons-URL:t, tarkistettu silmin 480 px thumbnailista):**

- Lyijykirjaimet Obodin kalliolla (vaaka, 2048×1536): https://commons.wikimedia.org/wiki/File:Cetinje_monastery.jpg — Koroner, CC BY-SA 3.0 / GFDL. Varsinaisesta kirjapainorakennuksesta ei ole säilynyt eikä Commonsissa ole riittävän suurta valokuvaa (vain pienet skannatut kirjansivut, ks. Category:Crnojević_printing_house — hylätty resoluution takia); Cetinjen luostari on lähin visuaalinen ankkuri, koska Crnojevićin hallitsijasuku perusti sekä luostarin että painon samalla seudulla, ja alkuperäiskappaleita säilytetään Cetinjen kokoelmissa (mainittu tekstissä).
- Muuri joka kiipeää vuorelle (vaaka, 1600×1200): https://commons.wikimedia.org/wiki/File:Kotor,_Montenegro.jpg — Ronnie Pander, PD.
- 461 porrasta pilviin (vaaka, 3821×2490): https://commons.wikimedia.org/wiki/File:Njego%C5%A1ev_mauzolej.JPG — Darko Bulatović, CC BY-SA 4.0. Koko mausoleumi näkyvissä edestä.
- Luostari joka kasvoi kalliosta (vaaka, 6000×4000): https://commons.wikimedia.org/wiki/File:Manastir_Ostrog_-_panoramio.jpg — Dragan Jankovic Faza, CC BY-SA 3.0. Etäkuva, jossa valkoinen luostari erottuu selvästi kalkkikivijyrkänteestä.

---

## Integroijalle huomioitavaa

1. Kaikki 8 nostoa ovat 581–633 merkkiä (`teksti`), rajoissa 440–660.
2. `tehtava` on molemmissa maissa sidottu ensimmäiseen nostoon
   (Kruševo / Obod) — vastaus löytyy kyseisen noston tekstistä.
3. `js/tools/tarkista-kaksoisavaimet.mjs` ja koko testistö kannattaa
   ajaa liittämisen jälkeen (maalehti.md kohta 9), samoin
   `tests/maa-otsikot.test.mjs` genetiivien varalta (odotetaan menevän
   läpi ilman muutoksia MAAN_GENETIIVIT-tauluun).
4. Tämä erä kattaa VAIN Historia-aiheen; muut maakohtaiset lehtityöt
   (kaupungin kansi, sää, kohtaaminen, uutiset, tv/radio, maan intro,
   tunnusluvut) ovat tekemättä — maalehti.md:n monistusohje kohdat
   1, 3–9.
