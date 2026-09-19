/*
 * MAASTOKOHTEET — CYP. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs CYP --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/CYP.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on YLEISELLÄ reitillä: lehdellä ei ole poltettuja
 * maastonimiä lainkaan, joten merkin nimiö on maastonimen ainoa
 * esiintymä kartalla. Kaksoisnimen vaaraa ei siis ole.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * Kyproksen maastokohteet. Faktat en-Wikipediasta 30.8.2026. Välimerta EI oteta tähän: se on jo ESP:n ja TUR:n listoilla, ja saaren oma tarina kerrotaan vuoren ja saaren pisimmän joen kautta.
 *
 * ── MAAILMAN ERÄ M6, LÄHI-ITÄ (6.9.2026) ───────────────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Kyproksella oli kaksi karttamerkkiä eikä yhtään kohdetta. Tämä erä
 * tuo seitsemän KOHDETTA ja yhden MAASTOKOHTEEN (Levantinmeri) samalla
 * mallilla kuin erät M1–M4. Koordinaatit on laskettu koneella
 * (`import { laudat } from tools/johda-maastokohteet.mjs`, lon/lat
 * en-Wikipedian coordinates-propista), tekstit kirjoitettu käsin
 * raakatekstistä. Kuvat lisätty 20.9.2026 (ent. kuvaton erä), vain maailmankartan rivi.
 *
 * MAA ON PIENI, JA SE MÄÄRÄSI MÄÄRÄN. Kyproksen fokuslehden rajaus on
 * 100,9 × 66,5 lautayksikköä (js/packs/fokus-grc.js FOKUS_POHJAT.CYP),
 * ja Nikosia istuu keskellä. Kahdeksan kohteen kiintiö ei mahdu:
 * `node tools/tarkista-nimiolimitys.mjs` on mitta, ja seitsemän
 * kohdetta on se määrä, jolla jokainen nimiö pysyy näkyvissä eikä
 * yksikään mene toisen päälle. Etäisyys mitattiin jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin; lähin uusi merkki on
 * Asinoun kirkko 13,0 lautayksikön päässä Nikosiasta eli selvästi yli
 * KAUPUNGIN_KOHDALLA_SADE-rajan (7) ja kaupunkikaton säteen (8).
 *
 * NELJÄ EHDOKASTA KARSIUTUI PAIKAN TAKIA. Salamis ja Famagusta ovat
 * käytännössä Pediaíos-merkin päällä (0,6–1,5 yksikköä), Kolossin linna
 * on kahden yksikön päässä Kourionista ja Larnakan suolajärvi jäisi
 * Cesnola-skandaalin nimiön alle. Kolmanneksi maastokohteeksi valittiin
 * siksi Levantinmeri, joka mahtuu saaren eteläpuolelle lehden
 * rajaukseen. Nimi ei ole laudan omassa nimitaulussa
 * (js/packs/maailmankartta-nimet.js), joten sääntö N3 pitää.
 *
 * VARTIO 7a. tools/savukkeet/savuke-maastokohteet.mjs vaatii, että
 * jokainen kohde osuu maan fokuslehden rajaukseen (`osuuLehteen`);
 * Kyproksella rajaus on olemassa, joten vartio pätee ja jokainen piste
 * on tarkistettu sitä vasten. Vartiota ei ole muutettu.
 */
/*
 * ── ERÄ M20, 7.9.2026: KAHDEKSAS KOHDE MAHTUI SITTENKIN ─────────────
 *
 * Erä M6 kirjasi Kyprokselle vajeen kohteita −1 ja perusteli sen
 * saaren koolla. Vaje mitattiin nyt uudelleen ehdokas kerrallaan
 * (tools/tarkista-nimiolimitys.mjs CYP), ja yksi ehdokas mahtui:
 * Apostolos Andreas Karpasin niemen kärjessä. Muut kaatuivat mittaan:
 *   Soli (32,811 / 35,14)        → 1 nimiö–nimiö-limitys
 *   Machairas (33,1909 / 34,9406) → 2 limitystä
 *   Kyrenian linna (33,3222 / 35,3414) → 7,1 lautayksikköä Nikosiasta
 *     eli kaupunkikaton (8) alla; merkki ei tulisi pääkartalle
 *   Bellapais (33,3547 / 35,3066) 5,7 ja Buffavento (33,4103 /
 *     35,2875) 5,3 → sama kaupunkikatto
 *   Akamas 1,3 ja Marion 4,8 lautayksikköä maan eläintäystä
 *   (kyproksenpöllönen), Enkomi 0,9 Pediaíosista, Stavrovouni 4,6
 *   Khirokitiasta, Idalion 5,7 Nikosiasta.
 * Tamassoksen jälkeen Kyproksen kohdetavoite (8) on täynnä.
 */
export const MAASTOKOHTEET_CYP = [
  {
    id: 'olympos',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-olympos-eca11222.jpg',
      lyhyt: 'Lumen peittämää mäntymetsää Troodosin vuoristossa Chionistran huipun tuntumassa.',
      selite: 'Talvinen näkymä Troodosin vuoriston mäntymetsään. Chionistra eli Ólympos on Kyproksen korkein huippu.',
      lahde: 'Valokuva: Chneophytou, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Chneophytou',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Chionistra_winter_1.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'http://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-olympos-af19c907.jpg',
        lyhyt: 'Troodosin vuoristoa, jossa lumilaikkuja rinteillä ja kylä laaksossa.',
        selite: 'Ólympos kuuluu Troodosin vuoristoon Kyproksen keskiosassa. Rinteitä peittävät metsät, ja korkeimmilla kohdilla on talvisin lunta.',
        lahde: 'Valokuva: Digr, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Digr',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Troodos_Olympus.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ólympos',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuoren toinen nimi on Chionistra?',
      'Mikä Troodosin vuoristo on?',
    ],
    korostukset: ['Troodos|Troodosin'],
    nappi: 'Kyproksen katto, toiselta nimeltään Luminen',
    // 32.8633 E / 34.9364 N — en-Wikipedia "Mount Olympus (Cyprus)"
    laudat: {
      maailmankartta: { x: 6928.8, y: 1997.8 },
      europe: { x: 842.2, y: 974.8 },
    },
    teksti: 'Ólympos on Kyproksen korkein kohta, 1 952 metriä, Troodosin vuoriston keskellä. '
      + 'Kreikkalainen kansannimi Chionistra tarkoittaa lumista — ja nimi pitää paikkansa, '
      + 'sillä Välimeren saareksi huippu saa talvisin kunnon lumipeitteen. Vuori on syntynyt '
      + 'merenpohjan syvyyksistä: sen kivi on Troodosin ofioliitin serpentiiniytynyttä '
      + 'vaippakiveä, jota tutkitaan ympäri maailmaa.',
    lahde: 'en-Wikipedia "Mount Olympus (Cyprus)", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'pediaios',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-pediaios-60b3e990.jpg',
      lyhyt: 'Pediaíos-joen uoma Nikosiassa puiden reunustamana.',
      selite: 'Joki virtaa Nikosian halki kivisessä uomassa, jonka rannoilla kasvaa puita ja pensaita.',
      lahde: 'Valokuva: Peter in s, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Peter in s',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pedieos_River.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-pediaios-8ccd3173.jpg',
        lyhyt: 'Pediaíos-joen reunus ja kävelypolku Nikosiassa.',
        selite: 'Kaupungin läpi kulkeva joenuoma on rajattu betonireunuksella, jonka vieressä kulkee polku.',
        lahde: 'Valokuva: Fry72, Karel Frydrýšek, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Fry72, Karel Frydrýšek',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C5%98eka_Pedieos,_Nicosia,_Kypr.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Pediaíos',
    tyyppi: 'joki',
    kysymykset: [
      'Minkä kaupungin läpi joki virtaa?',
      'Missä muinainen Salamis sijaitsi?',
    ],
    korostukset: ['Nikosia|Nikosian'],
    nappi: 'Saaren pisin joki, pääkaupungin halki',
    // 33.9167 E / 35.1667 N — en-Wikipedia "Pedieos" — joen alajuoksu Mesaorian tasangolla
    laudat: {
      maailmankartta: { x: 6963.9, y: 1989.1 },
      europe: { x: 862.4, y: 968.7 },
    },
    teksti: 'Pediaíos on Kyproksen pisin joki, 98 kilometriä. Se saa alkunsa Troodosin vuoriston '
      + 'Machairasin metsästä, virtaa koilliseen Mesaorian tasangon poikki ja kulkee '
      + 'pääkaupunki Nikosian läpi — kaupungissa sen rantoja pitkin pääsee kävelemään lähes '
      + 'kahdenkymmenen kilometrin matkan. Mereen joki laskee Famagustanlahdella, muinaisen '
      + 'Salamiin kaupungin raunioiden vieressä.',
    lahde: 'en-Wikipedia "Pedieos", johdanto-osa (tarkistettu 30.8.2026).',
  },

  /* ================================================================
   * ERÄ M6, LÄHI-ITÄ (6.9.2026) — seitsemän kohdetta ja Levantinmeri.
   * ============================================================== */
  {
    id: 'levantinmeri',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-levantinmeri-240d3beb.jpg',
      lyhyt: 'Aallot vyöryvät rannalle Levantinmerellä Rodoksen Stegnassa.',
      selite: 'Marraskuun aamu Stegnassa Rodoksen saarella: Levantinmeren aallot ja pilvinen taivas.',
      lahde: 'Valokuva: Manfred Werner (Tsui), Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Manfred Werner (Tsui)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stegna_%CE%A3%CF%84%CE%B5%CE%B3%CE%BD%CE%AC_Rhodes_%CE%A1%CF%8C%CE%B4%CE%BF%CF%82_2019-11-26_02_Levantine_Sea_%CE%98%CE%AC%CE%BB%CE%B1%CF%83%CF%83%CE%B1_%CF%84%CE%BF%CF%85_%CE%9B%CE%B5%CE%B2%CE%AC%CE%BD%CF%84%CE%B5.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-levantinmeri-767853b4.jpg',
        lyhyt: 'Levantinmerta Lindosin akropolikselta Rodoksella.',
        selite: 'Näkymä akropolikselta merelle: rannikon kallio ja pieni lahti erottuvat alhaalla.',
        lahde: 'Valokuva: Manfred Werner (Tsui), Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Manfred Werner (Tsui)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lindos_Acropolis_%CE%91%CE%BA%CF%81%CF%8C%CF%80%CE%BF%CE%BB%CE%B7_%CF%84%CE%B7%CF%82_%CE%9B%CE%AF%CE%BD%CE%B4%CE%BF%CF%85_Rhodes_%CE%A1%CF%8C%CE%B4%CE%BF%CF%82_2019-11-24_41_Levantine_Sea_%CE%98%CE%AC%CE%BB%CE%B1%CF%83%CF%83%CE%B1_%CF%84%CE%BF%CF%85_%CE%9B%CE%B5%CE%B2%CE%AC%CE%BD%CF%84%CE%B5.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Levantinmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä on lessepsiläinen vaellus?',
      'Miten Suezin kanava muutti Välimeren eliöstöä?',
    ],
    korostukset: ['Suezin kanava|Suezin kanava'],
    nappi: 'Meri, johon muutti uusia lajeja',
    // 33.3 E / 34.4 N — ulappa Kyproksen eteläpuolella; artikkelin oma
    // alue kattaa saaren joka puolelta. Lähin kaupunki Nikosia 28,6.
    laudat: {
      maailmankartta: { x: 6943.3, y: 2018 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Levantinmeri on Välimeren itäisin osa, noin 320 000 neliökilometriä, ja Kypros on '
      + 'sen suurin saari. Syvin kohta, 4 384 metriä, on Plinius-hautavajoamassa noin '
      + 'kahdeksankymmentä kilometriä Kreetan eteläpuolella. Isoisäsi matkaa edeltävinä vuosina '
      + 'meri sai uuden oven: Suezin kanava valmistui 1869 ja yhdisti sen Punaiseenmereen. '
      + 'Vuosikymmeniä esteenä olivat Katkerat järvet, joiden suolapitoisuus oli liian korkea, '
      + 'mutta kun se tasaantui kanavan veden kanssa, este katosi ja Punaisenmeren kasvit ja '
      + 'eläimet alkoivat asuttaa itäistä Välimerta. Ilmiötä kutsutaan lessepsiläiseksi '
      + 'vaellukseksi kanavan pääinsinöörin Ferdinand de Lessepsin mukaan.',
    lahde: 'en-Wikipedia "Levantine Sea", johdanto-osa sekä osiot "Geography" ja "Ecology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'paphoksenmosaiikit',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-paphoksenmosaiikit-1a3f75af.jpg',
      lyhyt: 'Narkissos-mosaiikki Paphoksen Dionysoksen talossa.',
      selite: 'Roomalaisajan lattiamosaiikissa Narkissos lepää kalliolla. Mosaiikki on Nea Paphoksen arkeologisessa puistossa Kyproksella.',
      lahde: 'Valokuva: Carole Raddato, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Carole Raddato',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mosaic_of_Narcissus,_from_the_House_of_Dionysos,_Paphos_Archaeological_Park_(Nea_Paphos),_Cyprus_(22518456155).jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-paphoksenmosaiikit-dc09919f.jpg',
        lyhyt: 'Ikarioksen ja ensimmäisten juomarien mosaiikki Dionysoksen talossa Paphoksella.',
        selite: 'Lattiamosaiikissa kuvataan Ikarios härkien vetämät vaunut ja viinin ensimmäiset maistajat. Kuvaa kehystää koristeellinen reunus.',
        lahde: 'Valokuva: Institute for the Study of the Ancient World, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Institute for the Study of the Ancient World',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mosaics_in_the_House_of_Dionysus_(I)_(5030266269).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Paphoksen mosaiikit',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä Nea Paphos oli?',
      'Miksi huvilat nimettiin lattioidensa mukaan?',
    ],
    korostukset: ['Dionysoksen talo|Dionysoksen talo'],
    nappi: 'Välimeren parhaat lattiamosaiikit',
    // 32.4083 E / 34.7667 N — en-Wikipedia "Paphos"
    // Lähin pelikaupunki: Nikosia 34,9 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6913.6, y: 2004.2 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Nea Paphos oli Kyproksen hallinnollinen pääkaupunki Ptolemaiosten ja Rooman aikaan, '
      + 'ja sen varakkaiden huviloiden lattioista on kaivettu esiin Välimeren parhaiten '
      + 'säilyneitä mosaiikkeja. Dionysoksen talo on 200-luvulta jaa., pinta-alaltaan noin '
      + '2 000 neliömetriä, ja mosaiikit peittävät siitä neljänneksen: metsästyskohtauksia, '
      + 'Apollon ja Dafnen takaa-ajo, Ganymedes ja kotka sekä neljä vuodenaikaa. Theseuksen '
      + 'huvila sai nimensä lattiakuvasta, jossa Theseus taistelee Minotaurosta vastaan, ja '
      + 'Aionin talo löytyi vasta 1983. Kaivaukset aloitti puolalainen Kazimierz Michałowski '
      + 'kesäkuussa 1965, ja ne jatkuvat yhä; Unesco liitti Paphoksen luetteloonsa 1980.',
    lahde: 'en-Wikipedia "Paphos Archaeological Park", johdanto-osa sekä osiot "Excavations", '
      + '"Buildings" ja "House of Dionysos" (tarkistettu 6.9.2026).',
  },
  {
    id: 'palaipafos',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-palaipafos-a1f2f873.jpg',
      lyhyt: 'Aphroditen pyhäkön rauniot Palaipafoksessa Kouklian kylän luona.',
      selite: 'Laajan pyhäkköalueen kiviperustuksia avoimella kukkulalla. Aphroditen palvontapaikka on perustettu 1100-luvulla eaa.',
      lahde: 'Valokuva: Carole Raddato, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Carole Raddato',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Palaepaphos,_the_famous_Sanctuary_of_Aphrodite,_a_large_centre_of_worship_established_in_the_12th_century_BC,_Kouklia,_Cyprus.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-palaipafos-eb64a3a5.jpg',
        lyhyt: 'Aphroditen pyhäkön kivilohkareita ja pylväänpätkiä Palaipafoksessa, taustalla meri.',
        selite: 'Pyhäkkörakennusten sortuneita osia on aseteltu riviin kukkulan laella, ja horisontissa siintää Välimeri.',
        lahde: 'Valokuva: Wojciech Biegun, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Wojciech Biegun',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Santuary_of_Aphrodite_at_Palaepafos,_Cyprus_-_panoramio.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Palaipafos',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi jumalattaresta ei ollut kuvaa?',
      'Missä Afroditen tärkein pyhäkkö oli?',
    ],
    korostukset: ['Afrodite|Afroditen'],
    nappi: 'Temppeli ilman jumalankuvaa',
    // 32.5744 E / 34.7075 N — Kouklia, en-Wikipedia "Paphos" osio "Old Paphos"
    // Lähin pelikaupunki: Nikosia 31,2 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6919.1, y: 2006.4 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Vanha Paphos, nykyinen Kouklia, on kukkulalla noin kaksitoista kilometriä uudesta '
      + 'kaupungista kaakkoon. Paikka on ollut asuttu neoliittiselta ajalta, ja siitä tuli '
      + 'antiikin maailman tärkein Afroditen palvontapaikka — jumalattaren myyttinen syntypaikka '
      + 'oli Kypros. Strabonin mukaan Nea Paphoksesta vanhaan kaupunkiin johtava tie täyttyi '
      + 'vuosittain pyhiinvaeltajista. Tacitus kertoo nuoren Tituksen käyneen katsomassa '
      + 'pyhäkköä ja panneen merkille oudon asian: jumalattaresta ei ollut kuvaa lainkaan, vain '
      + 'pyramidin muotoinen kivi.',
    lahde: 'en-Wikipedia "Paphos", osiot "Old Paphos" ja "New Paphos" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kourion',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-kourion-2f5347ab.jpg',
      lyhyt: 'Kourionin antiikin teatteri rinteessä meren äärellä.',
      selite: 'Kivinen teatteri kohoaa rinteellä Kyproksen lounaisrannikolla. Portailla näkyy pieni joukko kävijöitä, ja taustalla kimmeltää meri.',
      lahde: 'Valokuva: Peter Collins, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Peter Collins',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2009_0930_21_Kourion_(4237478979).jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-kourion-b677ad09.jpg',
        lyhyt: 'Kourionin rauniokaupungin kivikaaret meren rannalla.',
        selite: 'Kaaria ja mosaiikkilattian jäänteitä Kourionin raunioissa, taustalla rannikon jyrkänne ja meri.',
        lahde: 'Valokuva: Jules Verne Times Two, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jules Verne Times Two',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ancient_Kourion_twin_arches,_Cyprus_(PPL1-Corrected)_julesvernex2.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kourion',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä kaupungille tapahtui 300-luvulla?',
      'Miksi asutus siirtyi Episkopiin?',
    ],
    korostukset: ['akropoli|akropolin'],
    nappi: 'Viisi maanjäristystä viidessä vuodessa',
    // 32.8877 E / 34.6642 N — en-Wikipedia "Kourion"
    // Lähin pelikaupunki: Nikosia 24,3 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6929.6, y: 2008.1 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Kourion oli merkittävä kreikkalainen kaupunkivaltio Kyproksen lounaisrannikolla. '
      + 'Argoksesta tulleet uudisasukkaat asettuivat paikalle 1100-luvulla eaa., kun '
      + 'mykeneläiset palatsit olivat romahtaneet. Akropoli seisoo lähes sadan metrin korkuisella '
      + 'kalkkikivikielekkeellä Episkopinlahden yllä. Vuosien 365 ja 370 välillä viisi voimakasta '
      + 'maanjäristystä tuhosi kaupungin lähes kokonaan, ja se rakennettiin uudelleen vasta '
      + '400-luvun lopulla. Arabiretkikunnat hävittivät akropolin 648–649, ja asutus siirtyi '
      + 'kaksi kilometriä koilliseen Episkopiin, joka sai nimensä piispanistuimesta.',
    lahde: 'en-Wikipedia "Kourion", johdanto-osa ja historiaosion loppu (tarkistettu 6.9.2026).',
  },
  {
    id: 'khirokitia',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-khirokitia-43a78a04.jpg',
      lyhyt: 'Rekonstruoidut pyöreät kivimajat Khirokitian neoliittisella asuinpaikalla.',
      selite: 'Pyöreät kivijalkaiset asumukset on rakennettu uudelleen alkuperäisten mallin mukaan. Alkuperäiset talot ovat noin vuosilta 7000–5800 eaa.',
      lahde: 'Valokuva: Ophelia2, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ophelia2',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Khirokitia2.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-khirokitia-5fec094a.jpg',
        lyhyt: 'Khirokitian neoliittisen asuinpaikan pyöreiden talojen kivijalat.',
        selite: 'Kivipohjat paljastavat pyöreiden talojen asemakaavan rinteessä, jota ympäröivät puut ja aita.',
        lahde: 'Valokuva: Pan narrans, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Pan narrans',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Choirokoitia_1.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Khirokitia',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi kylän ikä muuttui kolmella vuosituhannella?',
      'Mikä on tholos?',
    ],
    korostukset: ['tholos|tholos-rakennuksia'],
    nappi: 'Kivimuurin sisällä 7000 eaa.',
    // 33.34372 E / 34.79673 N — en-Wikipedia "Khirokitia"
    // Lähin pelikaupunki: Nikosia 13,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6944.8, y: 2003.1 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Khirokitia on neoliittinen asuinpaikka Maronijoen laaksossa kuuden kilometrin päässä '
      + 'etelärannikolta, ja se on ollut Unescon luettelossa vuodesta 1998. Porphyrios Dikaios '
      + 'löysi paikan 1934 ja arveli sen syntyneen noin 4000 eaa.; radiohiiliajoitus siirsi '
      + 'perustamisen 7000 vuoteen eaa. Kylää ympäröi kahden ja puolen metrin paksuinen '
      + 'kivimuuri, ja sen sisällä on tiiviissä ryhmissä pyöreitä tholos-rakennuksia, '
      + 'halkaisijaltaan kahdesta yhdeksään metriä. Vainajat haudattiin koukkuasennossa aivan '
      + 'lattian alle. Kylä hylättiin tuntemattomasta syystä noin 6000 eaa.',
    lahde: 'en-Wikipedia "Khirokitia", johdanto-osa sekä osiot "Discovery" ja "Archaeology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'asinounkirkko',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-asinounkirkko-ccd34b37.jpg',
      lyhyt: 'Asinoun Panagia Phorbiotissa -kirkko Troodosin metsäisellä rinteellä.',
      selite: 'Kivinen 1100-luvun kirkko seisoo nurmella jyrkän harjakattonsa alla. Kirkon sisäseinät on maalattu bysanttilaisin freskoin.',
      lahde: 'Valokuva: Xenophon, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Xenophon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Asinou_-_Kirche_Au%C3%9Fen_1.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-asinounkirkko-c9160a15.jpg',
        lyhyt: 'Neitsyt Marian ja enkelien fresko Asinoun kirkon apsiksen holvissa.',
        selite: 'Holvin keskellä seisoo Neitsyt Maria kohotetuin käsin, ja hänen kummallakin puolellaan on enkeli. Maalaus on bysanttilaistyylinen.',
        lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Zairon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nikitari_Kirche_Panagia_Asinou_Innen_Chorgew%C3%B6lbe.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Asinoun kirkko',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Montako Troodosin kirkkoa on maailmanperintöluettelossa?',
      'Miksi kirkoilla on jyrkät puukatot?',
    ],
    korostukset: ['Troodos|Troodosin'],
    nappi: 'Kymmenen maalattua kirkkoa vuorilla',
    // 32.9833 E / 35.0667 N — Nikitarin kylä, en-Wikipedia "Nikitari"
    // Lähin pelikaupunki: Nikosia 13,0 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6932.8, y: 1992.9 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Troodosin maalatut kirkot ovat kymmenen bysanttilaista kirkkoa ja luostaria, joiden '
      + 'seinät ovat täynnä bysanttilaista ja sen jälkeistä seinämaalausta. Unesco liitti niistä '
      + 'yhdeksän luetteloonsa 1985 ja kymmenennen, Palaichori Oreinisin kirkon, vasta 2001. '
      + 'Nikitarin kylässä seisova Panagia Phorviotissa eli Asinoun kirkko on 1100-luvulta. '
      + 'Joukossa on myös Kyproksen vanhin säilynyt luostarikirkko, 1000-luvun Agios Nikolaos '
      + 'tis Stegis Kakopetriassa, ja Moutoullasin 1200-luvun kappeli, jonka jyrkkä puukatto on '
      + 'lajinsa varhaisin esimerkki.',
    lahde: 'en-Wikipedia "Painted Churches in the Troodos Region", johdanto-osa ja kirkkoluettelo '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kykkoksenluostari',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-kykkoksenluostari-ce9e97ff.jpg',
      lyhyt: 'Kykkoksen luostarin sisäpiha kaarikäytävineen.',
      selite: 'Kaarikäytävien reunustama piha sijaitsee vuoristossa, ja taustalla nousee metsäinen rinne.',
      lahde: 'Valokuva: Julian Nyča, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Julian Nyča',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kykkos_Monastery_Courtyard_1.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-kykkoksenluostari-0befa706.jpg',
        lyhyt: 'Kykkoksen luostarin koristeellinen sisäänkäynti.',
        selite: 'Portaalin seinillä on värikkäitä pyhimyskuvia, ja aukon takaa avautuu luostarin sisäpiha.',
        lahde: 'Valokuva: Héctor Ochoa \'Robot8A\', Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Héctor Ochoa \'Robot8A\'',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kykkos_monastery_20180403_img_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kykkoksen luostari',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi alkuperäisestä luostarista ei ole jäljellä mitään?',
      'Kuka perusti luostarin?',
    ],
    korostukset: ['Aleksios I Komnenos|Aleksios I Komnenos'],
    nappi: 'Vuoriluostari, joka on palanut monesti',
    // 32.741 E / 34.984 N — en-Wikipedia "Kykkos Monastery"
    // Lähin pelikaupunki: Nikosia 21,6 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6924.7, y: 1996 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Kykkoksen luostari on Kyproksen varakkaimpia, ja se seisoo 1 318 metrin korkeudessa '
      + 'Troodosin luoteisrinteellä, kaksikymmentä kilometriä Pedoulasista länteen. Bysantin '
      + 'keisari Aleksios I Komnenos perusti sen 1000-luvun lopulla. Alkuperäisestä '
      + 'rakennuksesta ei ole jäljellä mitään: luostari on palanut maan tasalle monta kertaa. '
      + 'Saaren ensimmäinen presidentti, arkkipiispa Makarios III, aloitti kirkollisen uransa '
      + 'täällä munkkina vuonna 1926.',
    lahde: 'en-Wikipedia "Kykkos Monastery", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'kapgreco',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-kapgreco-bb95686f.jpg',
      lyhyt: 'Aallot murtuvat Kap Grecon kallioiselle rannalle.',
      selite: 'Kap Greco on Kyproksen kaakkoiskulman niemeke. Kuvassa vaahtopäiset aallot lyövät ruskeisiin kallioihin, ja taustalla kohoaa tasainen kalliomuodostuma.',
      lahde: 'Valokuva: kallerna, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'kallerna',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cape_Greco_view_3.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-kapgreco-6155dffd.jpg',
        lyhyt: 'Luonnollinen kivisilta Kap Grecon rannikolla.',
        selite: 'Meri on kaivertanut kallioon kaaren, jonka alla turkoosi vesi kimmeltää.',
        lahde: 'Valokuva: kallerna, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'kallerna',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Natural_Bridge_Cape_Greco.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kap Greco',
    // Niemi ei ole vuori eikä meri: tyyppi 'muu' + symboli 'luonto'
    // (sama sopimus kuin ARE:n Rub al-Khalilla).
    symboli: 'luonto',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä oli niemen antiikinaikainen nimi?',
      'Miten merenalaiset luolat syntyvät kalkkikiveen?',
    ],
    korostukset: ['Pedalion|Pedalion'],
    nappi: 'Saaren itäisin niemi ja sen luolat',
    // 34.0611 E / 34.9633 N — en-Wikipedia "Cape Greco"
    // Lähin pelikaupunki: Nikosia 24,5 lautayksikköä.
    laudat: {
      maailmankartta: { x: 6968.7, y: 1996.8 },
      // Euroopan laudan kaavan ulkopuolella: rivi jätetään pois.
    },
    teksti: 'Kap Greco on niemeke Kyproksen kaakkoisosassa, Famagustanlahden eteläpäässä Ayia '
      + 'Napan ja Protarasin välissä. Se on Kyproksen tasavallan hallitsemien alueiden itäisin '
      + 'kohta ja käytännössä myös Euroopan unionin itäisin kärki, kun syrjäisimpiä alueita ei '
      + 'lasketa. Antiikissa niemi tunnettiin nimellä Pedalion, ja Strabonin mukaan sen yllä '
      + 'kohoava puolisuunnikkaan muotoinen kukkula oli pyhitetty Afroditelle. Kalkkikivi'
      + 'jyrkänteisiin on kulunut merenalaisia luolia, joita kutsutaan keijuluoliksi.',
    lahde: 'en-Wikipedia "Cape Greco", johdanto-osa (tarkistettu 6.9.2026).',
  },
  /* ================================================================
   * ERÄ M20, 7.9.2026 — KAHDEKSAS KOHDE.
   * ============================================================== */
  {
    id: 'apostolosandreas',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-apostolosandreas-e7a46399.jpg',
      lyhyt: 'Apostolos Andreaksen luostari Karpasin niemimaan kärjessä meren rannalla.',
      selite: 'Kivinen luostarirakennus, jonka päällä kohoaa pieni kellotorni ja jonka edessä avautuu hiekkainen piha aivan meren rannalla.',
      lahde: 'Valokuva: Anja Leidel, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Anja Leidel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Apostolos_Andreas.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/cyp-nosto-apostolosandreas-2b239c01.jpg',
        lyhyt: 'Apostolos Andreaksen luostari kalliorannalta katsottuna.',
        selite: 'Luostarirakennukset erottuvat matalina rannikon kallioiden takaa Kyproksen koillisimmassa kärjessä.',
        lahde: 'Valokuva: Chris06, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Chris06',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Apostolos_Andreas_Monastery_(1).JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Apostolos Andreas',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä luostarin lähde kertomuksen mukaan syntyi?',
      'Kuka neuvotteli täällä antautumisestaan?',
    ],
    korostukset: ['Karpasin niemi|Karpasin niemellä'],
    nappi: 'Luostari saaren kaukaisimmassa kärjessä',
    // 34.5738 E / 35.6593 N — en-Wikipedia "Apostolos Andreas Monastery".
    // Lähin pelikaupunki Nikosia 44,7 lautayksikköä; lähin muu merkki
    // Pediaíos 28,7.
    laudat: {
      maailmankartta: { x: 6985.8, y: 1970.5 },
      europe: { x: 875, y: 955.8 },
    },
    teksti: 'Apostolos Andreaksen luostari seisoo Karpasin niemellä aivan Kyproksen '
      + 'koillisimman kärjen eteläpuolella. Se on omistettu apostoli Andreaalle ja on '
      + 'Kyproksen ortodoksiselle kirkolle tärkeä paikka; sitä on kutsuttu Kyproksen '
      + 'Lourdesiksi, eikä sitä ole hoitanut järjestäytynyt munkkiyhteisö vaan vaihtuva '
      + 'joukko vapaaehtoisia pappeja ja maallikoita. Perimätiedon mukaan Andreaan alus '
      + 'ajautui matkalla Pyhälle maalle pois kurssilta ja osui täällä kallioihin; '
      + 'rantauduttuaan Andreas löi kalliota sauvallaan, ja siitä puhkesi lähde, jonka vesi '
      + 'palautti näön aluksen toisesta silmästään sokealle kapteenille. Siitä paikasta '
      + 'tuli pyhiinvaelluskohde. 1100-luvulla tässä oli linnoitettu luostari, ja sieltä '
      + 'käsin Isaakios Komnenos neuvotteli antautumisestaan Rikhard Leijonamielelle. '
      + 'Nykyinen pääkirkko on 1700-luvulta ja päärakennukset sata vuotta nuorempia. '
      + 'Sekä kreikkalais- että turkkilaiskyproslaiset pitävät paikkaa pyhänä, ja luostarin '
      + 'korjaustyö on rahoitettu yhdessä.',
    lahde: 'en-Wikipedia "Apostolos Andreas Monastery", johdanto-osa sekä osiot "History" ja '
      + '"Restoration" (tarkistettu 7.9.2026).',
  },
];

