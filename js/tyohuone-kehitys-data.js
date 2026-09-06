/*
 * Työhuoneen Kehitys-välilehden sisältö. Fable kirjoittaa tämän
 * tiedoston; työhuone näyttää sen Kehitys-välilehdellä.
 *
 * KAARI_PAKETIT v2 (9.8.2026 ilta, omistajan palaute): kohtaaminen
 * ja visa yhdistetty yhdeksi kohtaamiseksi jonka päättää OIKEA
 * kysymys vaihtoehtoineen; aarre ja henkilön cliffhanger-vihje
 * yhdistetty. Kohtaamisia ja aarteita lyhennetty vielä lauseella
 * (omistajan palaute 9.8. myöhäisilta), ja aarteita lyhennetty
 * vielä kerran + nuoren Foggin mietintö kolmeen (Praha, Venetsia,
 * Budapest). Saapumiset ennallaan
 * (omistaja: "Matkakirjan koetekstit ovat hyvät"). Vanhat versiot
 * git-historiassa. Omistaja hyväksyi mallin ja tilasi koko Euroopan
 * ("Tekstit hyvät. Tee ja generoi kaikki Eurooppaan") — luennat
 * generoidaan tools/generoi-kaari.mjs:llä sitä mukaa kuin erät
 * valmistuvat.
 */
export const KAARI_PAKETIT = {
  johdanto: 'Tarinakaari: Euroopan 41 kohdetta luentoineen JA UUTENA '
    + 'Lähi-idän 28 kohdetta ilman luentoja (omistajan tilaus 9.8. '
    + 'yö: tekstit arvioon ensin, äänet vasta hyväksynnän jälkeen; '
    + 'Mekkaan ja Medinaan isoisä ei astu — kohtaamiset niiden '
    + 'porteilla ja karavaaniteillä). Kolme osaa kutakin kohdetta '
    + 'kohti — isoisän matkakirjamerkintä saapumisesta, '
    + 'KOHTAAMINEN jossa henkilö esittää isoisän jättämän '
    + 'kysymyksen (oikea visakysymys vaihtoehtoineen mukana, jotta '
    + 'parin sopivuuden näkee) ja AARRE, jonka päättää auki jäävä '
    + 'vihje. Vihjeet kietoutuvat yhteen: joku pitää isoisän jälkiä '
    + 'yllä vielä tänäänkin. Saapuminen, kohtaaminen ja aarre '
    + 'luetaan ääneen — kysymys jää pelaajan visaksi.',
  kohteet: [
    {
      id: 'praha',
      mykistetyt: [],
      otsikko: 'Praha — kynttilä tyhjässä talossa',
      saapuminen: 'Kultaisen kujan talot ovat niin pieniä, että löin pääni '
        + 'kamanaan kahdesti; kolmannella kumarsin ennen kuin ovi '
        + 'ehti pyytää. Talossa kahdeksan paloi kynttilä lukitun oven '
        + 'takana. Pöydällä oli kirja, reunassaan barometrini lukema. '
        + 'Kirjasin omani viereen: piirtoa myöten samat — eri '
        + 'käsialalla. Sinä, joka tätä luet: kynttilä ei sytytä '
        + 'itseään.',
      henkilo: 'Lyhdynsytyttäjä Tomáš pitää sukunsa lupauksen: talon '
        + 'kahdeksan kynttilä palaa, kunnes etsijä palaa.',
      kohtaaminen: 'Tikkailla lyhdynsytyttäjä Tomáš kohentaa liekkiä. '
        + '"Isoisäsi herätti tulipalon yönä koko kujan, omamme '
        + 'viimeisenä — savu oli jo portailla. Siitä yöstä talon '
        + 'kahdeksan kynttilä on palanut etsijälle. Vastaa — tämän '
        + 'illan sytytys on sinun."',
      /*
       * ISOISÄN PULMA (v1308) — Wienin pilotin toinen kaupunki.
       *
       * Raamattu, osio "Fokusmoodi" (omistaja 28.8.2026 ilta):
       * *"PELITEHTÄVÄN AIHE RATKAISEE, EI MEKANIIKKA … isoisän
       * väittämä- ja pulmatyypit kylvetään suoraan saman kaupungin
       * merkintään, jossa merkintä väittää jotain tai jättää pulman
       * auki ja kohtaaminen lunastaa sen."*
       *
       * Prahan fokusvirran matkakirjamerkintä (js/packs/
       * fokusvirta-praha.js) päättyy avoimeen pulmaan: *"keisari keräsi
       * aikoinaan kaiken maailman ihmeet yhteen saliin — ja sali on yhä
       * olemassa, vaikka ihmeet ovat hajallaan."* Se ei sano, kuka ne
       * hajotti. Puuttuva pala on saman paketin oppitunnissa, jossa
       * kerrotaan vuoden 1648 ryöstöretki ja se, että saalis vietiin
       * proomuilla Elbeä alas Ruotsiin.
       *
       * Vanha kysymys (Kultaisen kujan talojen asukkaat) oli hyvä
       * tietovisa muttei kytkeytynyt merkintään mitenkään; sen aineisto
       * elää yhä pelissä kaaren omassa saapumistekstissä ja
       * kohtaamisessa, jotka pysyvät ennallaan.
       *
       * FAKTAT: en-Wikipedia "Battle of Prague (1648)" ja "Vertumnus
       * (Arcimboldo)" (tarkistettu 29.8.2026; lähdeviitteet
       * js/packs/fokusvirta-praha.js:n oppitunnin kommentissa).
       */
      kysymys: {
        q: 'Isoisän merkintä jättää kysymättä yhden asian: keisarin '
          + 'ihmeet ovat hajallaan, mutta sali on yhä paikallaan. Kuka '
          + 'kokoelman vei ja milloin?',
        vaihtoehdot: [
          'Ruotsalaiset sotasaaliina vuonna 1648',
          'Napoleonin joukot Pariisiin vuonna 1805',
          'Linnanmäen tulipalo tuhosi sen vuonna 1541',
          'Kaupunki myi sen tasavallan alkaessa 1918',
        ],
        oikea: 0,
        fakta: 'Kolmikymmenvuotisen sodan viimeisessä sotatoimessa '
          + 'ruotsalaiset ottivat yöllisellä yllätyshyökkäyksellä joen '
          + 'länsipuolen ja linnan heinäkuussa 1648. Rudolf II:n '
          + 'kokoelman parhaat osat vietiin proomuilla Elbeä alas '
          + 'Ruotsiin. Vanhakaupunki joen toisella rannalla piti '
          + 'pintansa, kunnes tieto Westfalenin rauhasta saapui.',
      },
      aarre: 'Kynttilän valossa pöydän laatikko aukesi, ja kirjan alta '
        + 'löytyi kätkö. Tomáš katsoi liekkiä: "Lupauksia on kaksi — '
        + 'toinen liekki palaa jossain, missä maa on lämmin."',
    },
    {
      id: 'istanbul',
      kuva: 'assets/kohtaamiset/kohtaaminen-istanbul.jpg',
      mykistetyt: [],
      otsikko: 'Istanbul — upotettu palatsi',
      saapuminen: 'Laskin viisikymmentäkaksi porrasta pimeään, ja kaupungin äänet '
        + 'sammuivat yksi kerrallaan. Alhaalla avautui pylväsmetsä '
        + 'mustassa vedessä; laskin pylväitä, kunnes lyhty vapisi '
        + 'kädessäni. Yhden pylvään alla lepäsi kivinen kasvo '
        + 'ylösalaisin. Sammutin lyhtyni kokeeksi — ja veden ylle jäi '
        + 'palamaan toinen valo, joka ei ollut minun.',
      henkilo: 'Vedenvartija Emine mittaa säiliön vettä, kuten sukunsa '
        + 'sulttaanien ajoista — ja tuntee molemmat kivikasvot.',
      kohtaaminen: 'Portaiden alla vedenvartija Emine nostaa lyhtyään. "Kirjasi '
        + 'omistaja istui isoisoäitini kanssa koko yön vedenmittoja '
        + 'vertaamassa. Vastaa hänen kysymykseensä, niin soudan sinut '
        + 'kasvojen luo."',
      kysymys: {
        q: 'Säiliön pylvään jalustana lepää kivinen Medusan pää '
          + 'ylösalaisin. Mitä tarina kertoo syyksi?',
        vaihtoehdot: [
          'Jotta kivettävä katse ei osuisi keneenkään',
          'Jotta pylväästä tulisi tukevampi ja vakaampi',
          'Kuvanveistäjä erehtyi suunnasta',
          'Sulttaani halusi piilottaa pakanalliset kasvot',
        ],
        oikea: 0,
        fakta: 'Tarinan mukaan Medusan katse muutti katsojan kiveksi, ja '
          + 'ylösalaisin käännettynä katse painuu maahan; toinen pää makaa '
          + 'kyljellään. Varmaa syytä ei tiedetä — tutkijat pitävät päitä '
          + 'vanhemmasta roomalaisesta rakennuksesta otettuna '
          + 'kierrätyskivenä, jolloin asento määräytyi sen mukaan, miten '
          + 'kivi sopi jalustaksi.',
      },
      aarre: 'Kätkö nousi vedestä. "Isoisoäitini kirjoitti kirjaan, '
        + 'kumpi kasvoista on vartija ja kumpi vanki — se sivu on '
        + 'leikattu irti", Emine sanoi.',
    },
    {
      id: 'wien',
      mykistetyt: [],
      otsikko: 'Wien — luiden holvit kirkon alla',
      saapuminen: 'Maailmannäyttelyn rotunda kohosi Praterissa suurempana '
        + 'kuin yksikään mittaamani kupoli, ja sen alla koneet '
        + 'kutoivat, laskivat ja kirjoittivat. Jonotin tunnin sisään '
        + 'ja toisen ulos. Illalla laskeuduin kirkon alle '
        + 'luukammioihin. Kynttilöiden liekit taipuivat kaikki samaan '
        + 'suuntaan, vaikka ilma seisoi. Kirjasin molemmat ihmeet '
        + 'samalle sivulle.',
      henkilo: 'Suntio Anton hoitaa holvien kynttilät ja saattajien kirjaa, '
        + 'jossa on sekä Horation että hänen isoisänsä nimi.',
      kohtaaminen: 'Holvien suulla suntio Anton nostaa kynttilänsammuttimen '
        + 'olalleen. "Saattajien kirjassa on isoisäsi nimi: he '
        + 'laskeutuivat kolmen lyhdyn kanssa, ja ylös palasi kaksi. '
        + 'Vastaa hänen kysymykseensä, niin kerron, minne kolmas jäi."',
      /*
       * ISOISÄN PULMA — UUDEN PELITEHTÄVÄTYYPIN PILOTTI (v1301).
       *
       * Raamattu, osio "Fokusmoodi" (omistaja 28.8.2026 ilta):
       * *"PELITEHTÄVÄN AIHE RATKAISEE, EI MEKANIIKKA … isoisän
       * väittämä- ja pulmatyypit kylvetään suoraan saman kaupungin
       * merkintään … Uudet tyypit pilotoidaan Wienissä
       * (maailmannäyttelymerkintä jättää pulman ilmaan)."*
       *
       * Wienin fokusvirran matkakirjamerkintä (js/packs/
       * fokusvirta-wien.js) sanoo: *"Kahdeksan päivää avajaisten
       * jälkeen pörssi kaatui"* — päivien lukumäärän muttei
       * päivämäärää. Puuttuva pala, avajaispäivä 1.5.1873, on saman
       * paketin oppitunnissa, joka on tarkoituksella vaiti
       * romahduspäivästä. Pelaaja siis LASKEE vastauksen kahdesta
       * pelissä olevasta tiedosta.
       *
       * Vanha kysymys (Habsburgien kolmiosainen hautaus) oli hyvä
       * tietovisa muttei kytkeytynyt merkintään mitenkään; sen
       * aineisto elää yhä pelissä (js/packs/nahtavyysjutut.js,
       * Hofburgin Sydänten krypta ja Stephansdomin katakombit).
       *
       * FAKTAT: takynostot-itavalta.md, ehdokas 1 ja takyt-wien.md,
       * täky 3 (de-Wikipedia "Gründerkrach", "Weltausstellung 1873").
       */
      kysymys: {
        q: 'Isoisän merkintä laskee päivät muttei sano päivämäärää: '
          + 'pörssi kaatui kahdeksan päivää maailmannäyttelyn '
          + 'avajaisten jälkeen. Minä päivänä miehet itkivät kadulla?',
        vaihtoehdot: [
          '9. toukokuuta 1873',
          '1. toukokuuta 1873',
          '8. kesäkuuta 1873',
          '17. syyskuuta 1873',
        ],
        oikea: 0,
        fakta: 'Keisari Franz Joseph avasi näyttelyn 1. toukokuuta '
          + '1873 sanoen, että maa on kaikin puolin ilahduttavassa '
          + 'nousussa. Kahdeksan päivää myöhemmin, 9. toukokuuta, '
          + 'kaatui aamupäivän aikana 120 pankkia, ja kello 13 '
          + 'poliisi sulki pörssin. Päivä on Itävallan historian '
          + 'musta perjantai.',
      },
      aarre: 'Kätkön päällä seisoi kolmas lyhty, ja Anton puhui portaita '
        + 'kohti: "Veto tulee ovesta, jota ei minun aikanani ole avattu '
        + '— kirjassa lukee vain: sinne ei mennä alakautta."',
    },
    {
      id: 'venetsia',
      mykistetyt: ['kohtaaminen'],
      otsikko: 'Venetsia — naamio sillan kaiteella',
      saapuminen: 'Vesi nousi yöllä kaduille, ja aamulla torilla '
        + 'käveltiin lankkuja pitkin kuin laivan kannella — kaupunki '
        + 'ei säikähtänyt, se nosti helmansa ja jatkoi matkaansa. '
        + 'Sillan kaiteella odotti ruttolääkärin valkoinen naamio — '
        + 'linnunnokka, silmäaukot tyhjinä. Kukaan ohikulkija ei '
        + 'vilkaissut sitä; minä piirsin sen vihkooni enkä saanut '
        + 'siitä silmiäni irti.',
      /*
       * KAANONKORJAUS (Fable 6.9.2026): tilauskirjassa ei ole Horation
       * nimikirjaimia — kukaan nykyhetkessä ei tunnista isoisää
       * (docs/tarina.md). Tilaajan nimi on jäänyt musteläikän alle.
       * Kohtaamisen luenta generoidaan uudestaan (mykistetyt).
       */
      henkilo: 'Naamiontekijä Lucia pitää pajaa kolmannessa polvessa; '
        + 'tilauskirjassa on vuosi 1873 ja tilaajan nimi musteläikän alla.',
      kohtaaminen: 'Pajassa naamiontekijä Lucia tunnistaa linnunnokan yhdellä '
        + 'vilkaisulla. "Tuo on pajamme työtä — tilauskirjassa lukee '
        + '1873, ja tilaajan nimi on jäänyt musteläikän alle. Vastaa '
        + 'väliin taitettuun kysymykseen, niin luen tilauksen loppuun."',
      kysymys: {
        q: 'Miksi ruttolääkärin naamiossa on pitkä linnunnokka?',
        vaihtoehdot: [
          'Nokkaan pantiin yrttejä, joiden uskottiin suojaavan taudilta',
          'Nokka piti sairaat käden mitan päässä lääkärin kasvoista',
          'Lääkäri kuljetti nokassa kirjeitä, joihin ei saanut koskea',
          'Pitkä nokka auttoi hengittämään savun ja suitsutuksen '
            + 'keskellä',
        ],
        oikea: 0,
        fakta: 'Ruttolääkärit täyttivät nokan kuivatuilla yrteillä ja '
          + 'kukilla, joiden uskottiin puhdistavan hengitysilman. '
          + 'Naamiosta tuli myöhemmin karnevaalin tunnus.',
      },
      aarre: 'Lucia sulki tilauskirjan: "Joku palautti toisen naamion '
        + 'viime keväänä — jätti vain lapun, jossa oli ilmanpaineen '
        + 'lukema." Barometrilukema, aivan kuin isoisän kirjassa.',
    },
    {
      id: 'budapest',
      mykistetyt: [],
      otsikko: 'Budapest — hengittävä labyrintti',
      saapuminen: 'Saavuin kaupunkiin, jota ei viime vuonna ollut: Buda, Pest '
        + 'ja Óbuda päättivät tänä vuonna olla yhtä. Kirjasin nimen '
        + 'karttaani lyijykynällä, varmuuden vuoksi. Linnan alla '
        + 'labyrintin seinät hikoilevat lämmintä vettä. Syvimmän '
        + 'käytävän seinässä oli liituristi — oma merkkini, vaikken '
        + 'ole täällä koskaan käynyt. Viiva oli terävä, kuin tänään '
        + 'piirretty.',
      henkilo: 'Kylpymestari Márta on kylpylän vanhin kylvettäjä; hänen '
        + 'isoisoäitinsä opetti Horatiolle lämpimän seinän säännön.',
      kohtaaminen: 'Kylpylän ovella kylpymestari Márta koskettaa kirjan kantta '
        + 'kuin vanhaa tuttua. "Isoisoäitini opetti kirjasi omistajalle '
        + 'säännön, jolla linnan alta palataan — sääntö on sinun, kun '
        + 'vastaat hänen kysymykseensä."',
      /*
       * AIHE VAIHDETTU YHDISTYMISEEN (v1308).
       *
       * Raamattu, osio "Fokusmoodi" (omistaja 28.8.2026 ilta):
       * *"aarretehtävän aihe kytketään aina kaupungin muuhun
       * tarinaverkkoon (matkakirjamerkintä, täyt, lehdet)."*
       *
       * Vanha kysymys alkoi sanoilla *"Labyrintin seinät ovat lämpimät
       * kuin iho"* ja nojasi siis kaaren omaan saapumistekstiin.
       * Fokusmoodissa pelaaja ei lue sitä: kaupungin matkakirjakortin
       * omistaa fokusvirta (js/packs/fokusvirta-budapest.js), jonka
       * merkintä kertoo kaupungista, jota ei eilen ollut. Kysymys
       * viittasi siis tekstiin, jota kukaan ei ollut nähnyt.
       *
       * Uusi kysymys tulee suoraan siitä merkinnästä ja saa
       * vastauksensa saman paketin oppitunnista (Ketjusilta 1849 ja
       * yhdistyminen 17.11.1873). Kaaren saapuminen, kohtaaminen ja
       * aarre pysyvät ennallaan, samoin kuumien lähteiden aineisto,
       * joka elää lehden omassa nostossa (js/packs/
       * kulttuuri-kategoriat.js, budapest, "Shakkia lämpimässä
       * altaassa").
       *
       * FAKTAT: js/packs/nahtavyysjutut.js "Ketjusilta" (pelin omaa
       * tarkistettua aineistoa) ja en-Wikipedia "Budapest",
       * tietolaatikko (tarkistettu 29.8.2026).
       */
      kysymys: {
        q: 'Buda, Óbuda ja Pest saivat yhteisen nimen vasta 1873, mutta '
          + 'jokin oli yhdistänyt puoliskot jo aiemmin. Mikä?',
        vaihtoehdot: [
          'Tonavan yli rakennettu Ketjusilta',
          'Kaupunkeja kiertänyt yhteinen muuri',
          'Joen alitse kaivettu rautatietunneli',
          'Kaikille yhteinen kuninkaanlinna',
        ],
        oikea: 0,
        fakta: 'Ketjusilta valmistui 1849 ensimmäisenä pysyvänä siltana '
          + 'Budan ja Pestin välillä; kreivi István Széchenyi tilasi sen '
          + 'englantilaiselta William Tierney Clarkilta, ja se on 375 '
          + 'metriä pitkä. Kaupungit yhdistettiin nimellä Budapest 17. '
          + 'marraskuuta 1873 — isoisän matkavuonna.',
      },
      aarre: 'Sääntö piti: lämmin seinä oikealla, ja kätkö odotti '
        + 'liituristin alla irtokiven takana. Márta katsoi merkkiä: '
        + '"Isoisoäitinikin pyyhki ristin aikanaan, ja aina se palasi '
        + '— tämä liitu on tuoretta."',
    },
    {
      id: 'lontoo',
      mykistetyt: [],
      otsikko: 'Lontoo — valo löytää kadun',
      /*
       * Uudistus 5.9.2026, Fable tarkisti ja viimeisteli 22.10.
       *
       * KOKO KAARI VAIHDETTU (kuvaputken tarinaehdotus 5.9.2026,
       * Fablen päätös samana iltana klo 19:05 UTC: *"Lontoo — Leila
       * (hyväksytty sellaisenaan) … Molemmat Ned-versiot (kaari +
       * vanha KOHTAAMISET) poistuvat"*). Jokilöytäjä Ned, H. F.
       * -taskukello ja sumukysymys jäivät pois; tilalla on nykyhetken
       * Lontoo, jossa tunnistus perustuu havaittuun muotoon eikä suvun
       * salaisuuteen — kukaan ei tunnista Horatiota eikä odota
       * perillistä (docs/isoisan-raamattu.md).
       *
       * KIRJAN KATUPIIRROS on uusi hyväksytty fiktiivinen yksityiskohta:
       * saapuminen piirtää kulman, kohtaaminen tunnistaa sen ja aarre
       * käyttää sitä. Kätkö on kulman suojaisassa syvennyksessä eikä
       * kiinnity mihinkään suojeltuun rakenteeseen.
       *
       * KYSYMYS EI OLE HORATION JÄTTÄMÄ. Vuoden 1956 laki on 83 vuotta
       * merkintää nuorempi, joten kysymys nousee Leilan omasta
       * puheesta ("täällä ei ennen olisi näkynyt kuvattavaa, savulta")
       * ja saa vastauksensa fokusvirran oppitunnista (js/packs/
       * fokusvirta-lontoo.js), johon on lisätty lain oma kappale.
       * Sanatarkka vastausrivi ei esiinny yhdessäkään ennen visaa
       * näkyvässä kentässä (tarinakaari.md, sääntö 6).
       *
       * FAKTAT: Clean Air Act 1956 (legislation.gov.uk, ukpga/1956/52 —
       * tumman savun kielto ja savuttomiksi määrättävät alueet;
       * kuvaputken faktantarkistus 5.9.2026) sekä pelin oma tarkistettu
       * aineisto js/packs/maa-kategoriat.js, GBR/luonto, nosto "Sumu,
       * joka ei ollutkaan sumua" (1952 ja neljä vuotta myöhemmin
       * säädetty laki). Fakta ei väitä ilmansaasteen kadonneen.
       */
      saapuminen: 'Mittasin kadun leveyden kahdesti, koska en uskonut '
        + 'ensimmäistä lukua. Aurinko ei yllä tänne alas, ja silti '
        + 'vastapäisessä seinässä paloi kirkas laikku, joka siirtyi '
        + 'minuutissa kämmenen leveyden. En löytänyt sille lähdettä. '
        + 'Piirsin kulman muistiin niin tarkasti kuin taisin: piirros on '
        + 'rehellisempi kuin selitys, jonka siitä keksisin.',
      henkilo: 'Muotialan opiskelija Leila etsii kuvauspaikkaa kaduilta, '
        + 'joille aurinko pääsee vain lasin kautta.',
      kohtaaminen: 'Varjoisalla kadulla muotialan opiskelija Leila kääntää '
        + 'puhelimensa näytön sinulle. "Aarretta? Minä etsin '
        + 'kuvauspaikkaa. Tuo piirros on tämä kulma, kuvasin sen eilen. '
        + 'Täällä ei ennen olisi näkynyt kuvattavaa, savulta. Vastaa, '
        + 'niin näytän mistä katsoa."',
      kysymys: {
        q: 'Leila sanoo, ettei kadulla ennen näkynyt kuvattavaa savulta. '
          + 'Mihin vuoden 1956 Clean Air Act erityisesti puuttui?',
        vaihtoehdot: [
          'Katumainosten ja näyteikkunoiden valaistukseen',
          'Thamesin vuoroveden säännöstelyyn',
          'Rakennusten ja tulisijojen savupäästöihin',
          'Autojen ja bussien pakokaasuihin',
        ],
        oikea: 2,
        fakta: 'Vuoden 1952 savusumun jälkeen säädetty laki kielsi tumman '
          + 'savun päästämisen piipusta ja antoi kunnille vallan määrätä '
          + 'kokonaisia alueita savuttomiksi: niissä kodin tulisijassa '
          + 'sai polttaa vain savutonta polttoainetta. Ilma parani '
          + 'vuosikymmenessä — puhdasta se ei ole vieläkään.',
      },
      aarre: 'Leila käski katsoa alaviistoon: kulmakiven takana, '
        + 'suojaisassa syvennyksessä, oli rasia. "Minä etsin tähän '
        + 'valoa. Sinä löysit jotain muuta." Torni, josta valo '
        + 'heijastuu, on isoisän piirrosta uudempi.',
    },
    {
      id: 'pariisi',
      mykistetyt: [],
      otsikko: 'Pariisi — kirja joka odotti rannalla',
      saapuminen: 'Seinen rannalla tein sen, mitä suvussamme ei osata: '
        + 'tingin. Bukinisti kuunteli tarjoustani, nosti hintaa ja '
        + 'katsoi säälien; kirjasin tappion sarakkeeseen, jota en '
        + 'näytä kenellekään. Ostin kirjan silti — sen sivut oli '
        + 'leikattu auki, paitsi viimeinen, ja kannessa oli liidulla '
        + 'tähtäinristi. Minun merkkini, kirjassa jota en ollut '
        + 'eläissäni nähnyt.',
      henkilo: 'Bukinisti Colette myy vanhoja kirjoja Seinen rannalla '
        + 'samasta laatikosta kuin isoisoisänsä.',
      kohtaaminen: 'Colette tuntee laatikkonsa liitumerkin kysymättä. '
        + '"Isoisoisäni myi tuon kirjan vieraalle — ja sai sen illalla '
        + 'takaisin ohjeineen: antakaa sille, joka vastaa sen '
        + 'kysymykseen. Kirja on odottanut siitä illasta. Vastaa, niin '
        + 'se on sinun."',
      kysymys: {
        q: 'Seinen rannalla kirjoja on myyty laatikoista vuosisatoja. '
          + 'Mistä myyjien nimi bukinisti tulee?',
        vaihtoehdot: [
          'Vanhaa kirjaa tarkoittavasta sanasta',
          'Puista laatikkoa tarkoittavasta sanasta',
          'Rantakatua tarkoittavasta sanasta',
          'Kaupustelijaa tarkoittavasta sanasta',
        ],
        oikea: 0,
        fakta: 'Bouquin on ranskaa ja tarkoittaa vanhaa kirjaa — bukinisti '
          + 'on siis vanhojen kirjojen kauppias. Vihreät laatikot ovat '
          + 'kuuluneet Seinen kaiteille satojen vuosien ajan, ja '
          + 'myyntipaikat periytyvät jonossa, jota odotetaan vuosia.',
      },
      aarre: 'Kirjan viimeinen, avaamaton sivu kätki litteän kätkön. '
        + 'Colette leikkasi sivun auki: "Tämä ei ole isoisoisäni '
        + 'veitsenjälkeä — joku on ommellut sivun kiinni uudelleen, '
        + 'langalla joka on valkoista kuin liitu."',
    },
    {
      id: 'berliini',
      mykistetyt: [],
      otsikko: 'Berliini — kaukoputki joka katsoi tyhjää',
      saapuminen: 'Tähtitornin kupoli oli raollaan, vaikka yö oli pilvinen, '
        + 'ja kaukoputki osoitti kohtaan, jossa paljas silmä ei '
        + 'nähnyt mitään. Messinkiin oli raaputettu lukema — minun '
        + 'barometrini lukema. Istuin odottamaan ja kirjasin pilvien '
        + 'peittoa kymmenyksinä, vanhasta tottumuksesta. Kaksi '
        + 'kymmenystä: pilvet aukesivat, ja tyhjässä kohdassa syttyi '
        + 'sininen piste.',
      henkilo: 'Tähtitornin hoitaja Lotte kirjaa joka yön havainnot kirjaan, '
        + 'jota hänen sukunsa on pitänyt observatorion alusta asti.',
      kohtaaminen: 'Lotte avaa havaintokirjan vuoden 1873 kohdalta. "Vieras '
        + 'istui kaukoputken ääressä aamuun asti eikä kertonut, mitä '
        + 'etsi — vain sen, mitä kysyisi seuraavalta tulijalta. '
        + 'Vastaa, niin käännän putken hänen kohtaansa ja saat katsoa '
        + 'itse."',
      kysymys: {
        q: 'Yksi planeetta löydettiin ensin kynällä ja paperilla — ja '
          + 'vasta sitten kaukoputkella, juuri Berliinissä. Mikä?',
        vaihtoehdot: [
          'Neptunus',
          'Uranus',
          'Mars',
          'Jupiter',
        ],
        oikea: 0,
        fakta: 'Neptunuksen paikka laskettiin Uranuksen radan '
          + 'heilahduksista, ja Berliinin observatorio löysi sen '
          + 'kaukoputkella 1846 — alle asteen päässä lasketusta kohdasta.',
      },
      aarre: 'Putki kääntyi vieraan kohtaan, ja jalustan ontosta jalasta '
        + 'löytyi kätkö. "Sama kohta on kirjattu uudelleen viime '
        + 'talvena — eikä käsiala ole minun, eikä kirja ole poistunut '
        + 'huoneesta", Lotte luki viimeiseltä sivulta.',
    },
    {
      id: 'rooma',
      /*
       * KUVA JÄÄ TOISTAISEKSI ENNALLEEN, VAIKKA HENKILÖ VAIHTUI.
       * Tiedosto assets/kohtaamiset/kohtaaminen-rooma.jpg esittää
       * suihkulähteenhoitaja Enzoa (docs/kuvatuotanto-kohtaamiset.md).
       * Fablen päätös 5.9.2026 klo 20:05 UTC: *"Rooma (pasunisti Nico,
       * Trevi, ilta, juhla kaupungilla) … kuvakenttä vaihtuu"* — rivi
       * päivitetään heti, kun kuvaputken uusi kuva
       * (rooma-nico-feedback-r20260905-v1) on hyväksytty ja viety
       * R2:een. Fable 5.9.2026 ilta: kuvakenttä POISTETTU siihen asti —
       * kortti ilman kuvaa on parempi kuin kortti, jossa on eri ihminen
       * kuin repliikissä. Rivi palaa muodossa
       * kuva: 'assets/kohtaamiset/kohtaaminen-rooma.jpg' tai R2-polkuna.
       */
      mykistetyt: [],
      otsikko: 'Rooma — sävelmä sivukadulta',
      /*
       * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut.
       *
       * KOKO KAARI UUSIKSI (kuvaputken tarinaehdotus 5.9.2026, Fablen
       * päätös samana iltana klo 20:05 UTC: *"Rooma (pasunisti Nico,
       * Trevi, ilta, juhla kaupungilla): fokusvirran kohtaamispiste
       * siirtyy Aventinuksen avaimenreiästä Trevin luo, jotta
       * kaupungissa on yksi kohtaamispaikka"*).
       * Suihkulähteenhoitaja Enzo, periytyvä kolikonnosto ja
       * huoltoluukun avaaminen ovat poissa; tilalla on iltakeikan
       * tauolla oleva pasunisti, joka ei tunne Horatiota eikä odota
       * ketään.
       *
       * SAAPUMINEN KIRJOITETTU UUSIKSI mutta samoista raaka-aineista:
       * tyhjennetty allas ja rouvan opetus oikeasta heittotavasta ovat
       * kaaren omaa vanhaa aineistoa (tarinakaari.md luku 4: vanhasta
       * säilytetään raaka-aineet, lauseet kirjoitetaan uudestaan).
       * Uutta on sivukadun sävelmä, jonka Horatio kirjaa nuoteiksi —
       * se on nyt ainoa silta 1873:n ja nykyhetken välillä, ja Nico
       * tunnistaa sen omasta ohjelmistostaan eikä sukutarinasta.
       * HUOM: Rooma on fokusvirtakaupunki, joten kaaren `saapuminen`
       * ei päädy ruudulle (js/packs/tarinakaari.js) — teksti pidetään
       * silti kaanonin mukaisena, koska kohtaaminen nojaa siihen.
       *
       * KYSYMYS SÄILYY ENNALLAAN (Fablen päätös: *"Säilytä Trevin
       * kolikonheiton taru → palaat vielä Roomaan"*). Kohtaaminen
       * johdattaa siihen kysymällä, mitä kolikko lupaa, eikä vastausta
       * lue missään ennen visaa näkyvässä kentässä (tarinakaari.md,
       * sääntö 6).
       */
      saapuminen: 'Trevin allas oli tyhjennetty, ja pohjalta nousi kolikoiden '
        + 'sade. Heitin omani takaisin väärin päin; vieressä seissyt '
        + 'rouva näytti oikean tavan niin arvokkaasti, että heitin '
        + 'toisenkin. Sivukadulta kuului samaan aikaan sävelmä, jota en '
        + 'tuntenut. Kirjasin sen nuoteiksi niin hyvin kuin osasin — ja '
        + 'rouvan opetuksen sanatarkkaan.',
      henkilo: 'Pasunisti Nico soittaa iltakeikkoja kaupungin juhlissa ja '
        + 'tuntee Rooman katusävelmät nuoteitta.',
      kohtaaminen: 'Trevin laidalla, juhlavalojen alla, pasunisti Nico laskee '
        + 'soittimen lantiolleen. "Aarretta? Luulin että pyydät '
        + 'encorea." Hän vilkaisee kirjan nuottiriviä ja hymyilee. "Tuo '
        + 'on meidän. Vastaa ensin: mitä altaaseen heitetty kolikko '
        + 'lupaa?"',
      kysymys: {
        q: 'Mitä tarun mukaan tapahtuu, kun heittää kolikon Trevin '
          + 'suihkulähteeseen olkapään yli?',
        vaihtoehdot: [
          'Palaat vielä Roomaan',
          'Saat vuoden onnea',
          'Toiveesi toteutuu heti',
          'Löydät aarteen',
        ],
        oikea: 0,
        fakta: 'Tarun mukaan kolikko takaa paluun Roomaan. Kolikot nostetaan '
          + 'oikeasti talteen ja lahjoitetaan hyväntekeväisyyteen — niitä '
          + 'kertyy noin miljoona euroa vuodessa.',
      },
      aarre: 'Nico luki nuottirivin loppuun ja osoitti numeroa tahdin alla: '
        + 'se oli säilytyslokeron numero kadun päässä. Rasia oli siellä. '
        + '"Sävelmän toinen puoli on jonkun toisen vihossa." Kukaan '
        + 'orkesterissa ei muista kenen.',
    },
    {
      id: 'madrid',
      mykistetyt: [],
      otsikko: 'Madrid — kolmastoista lyönti',
      saapuminen: 'Puerta del Solin kello löi keskiyön, ja laskin lyönnit '
        + 'vanhasta tottumuksesta. Niitä oli kolmetoista. Päätin '
        + 'laskeneeni väärin ja palasin seuraavana yönä kynä ja vihko '
        + 'valmiina: kolmetoista, uudelleen, ja nyt se oli kirjattu. '
        + 'Aukiolla kukaan muu ei ollut kuulevinaan — mutta tornin '
        + 'ikkunassa paloi valo, ja varjo kumartui koneiston ylle kuin '
        + 'anteeksi pyytäen.',
      henkilo: 'Kellomestari Pilar hoitaa Puerta del Solin kelloa, jonka '
        + 'mukaan koko Espanja laskee uudenvuoden rypäleensä.',
      kohtaaminen: 'Tornissa Pilar valvoo koneiston vieressä. "Kello ei lyö '
        + 'kolmeatoista — paitsi jos joku lisää lyönnin käsin. '
        + 'Suvussani sanotaan, että se on viesti. Vastaa kysymykseen, '
        + 'niin näytän, mihin viesti osoittaa."',
      kysymys: {
        q: 'Saman aukion kiveyksessä, jolla kello lyö, on laatta, josta '
          + 'jotakin mitataan. Mitä?',
        vaihtoehdot: [
          'Maanteiden kilometrit — Espanjan nollapiste',
          'Auringon varjon pituus tarkalleen keskipäivällä',
          'Härkätaistelukulkueen juhlallinen lähtöpiste',
          'Vanhan vesijohdon syvyys aukion alla',
        ],
        oikea: 0,
        fakta: 'Laatassa lukee kilómetro cero: Espanjan säteittäisten '
          + 'maanteiden kilometrit lasketaan tästä pisteestä. Sama aukio '
          + 'kokoaa kaupungin uudenvuodenyönä, kun kello lyö ja joka '
          + 'lyönnillä syödään rypäle.',
      },
      aarre: 'Kolmastoista lyönti oli viesti: se osoitti koneiston '
        + 'huoltotilaan, jossa kätkö odotti. Pilar sammutti valon: '
        + '"Lyönti lisättiin koneistoon kauan ennen minua — mutta '
        + 'joku kävi virittämässä sen uudelleen tänä keväänä."',
    },
    {
      id: 'ateena',
      // Kohtaamiskuva (Opus 3:n pilotti 10.8.2026): näkyy kohtaamis-
      // kortilla tekstin oikealla puolella.
      /*
       * KUVA JÄÄ TOISTAISEKSI ENNALLEEN, VAIKKA HENKILÖ VAIHTUI.
       * Tiedosto assets/kohtaamiset/kohtaaminen-ateena.jpg esittää
       * marmorinveistäjä Nikosta (docs/kuvatuotanto-kohtaamiset.md).
       * Fablen päätös 5.9.2026 klo 20:05 UTC: *"Ateena (konservaattori
       * Dafni): uusi otsikko ja aarreteksti ilman pöllöä; kuvakenttä
       * vaihtuu, kun kuva on hyväksytty."* Rivi päivitetään heti, kun
       * kuvaputken uusi kuva (ateena-dafni-…, pöllötön versio) on
       * hyväksytty ja viety R2:een. Fable 5.9.2026 ilta: kuvakenttä
       * POISTETTU siihen asti — kortti ilman kuvaa on parempi kuin
       * kortti, jossa on eri ihminen kuin repliikissä. Rivi palaa
       * muodossa kuva: 'assets/kohtaamiset/kohtaaminen-ateena.jpg'.
       */
      otsikko: 'Ateena — kaksi mittaa samasta kivestä',
      // Omistajan palaute 11.8.2026: lyhennetty ja pöllön ele sekä
      // päiväkirjakehys kirkastettu; kohtaamisen lupaus konkreettinen.
      mykistetyt: [],
      /*
       * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut.
       *
       * HENKILÖ VAIHTUI, SAAPUMINEN EI. Fablen päätös 5.9.2026 klo
       * 20:05 UTC rajaa muutoksen tarkasti: *"uusi otsikko ja
       * aarreteksti ilman pöllöä"* — eli marmorinveistäjä Nikos
       * korvataan konservaattori Dafnilla ja pöllö poistuu otsikosta ja
       * aarteesta. SAAPUMINEN ON SÄILYTETTY SANASTA SANAAN: se on
       * docs/moduulit/tarinakaari.md:n oma malliesimerkki (luku 5,
       * "Ateenan korjaus": avaus on vitsi, hahmon piirre tekee työtä ja
       * tappio linnulle on erän itseironia-annos), eikä sitä ole syytä
       * kirjoittaa uusiksi. Ateena on lisäksi fokusvirtakaupunki, jossa
       * matkakirjakortin omistaa fokusvirran oma merkintä
       * (js/packs/tarinakaari.js), joten saapuminen ei edes päädy
       * ruudulle.
       *
       * MIKÄ POISTUI: Nikoksen isoisoisä, joka löysi samanlaisen rahan
       * ja pani sen takaisin, sekä väite *"Kirjasi omistaja tiesi
       * rahasta"* — kukaan nykyihminen ei tunnista Horatiota. Poistui
       * myös pylvään onkalon avaaminen: kätkö ei ole muinaisessa
       * rakenteessa vaan työmaapolun kulmakivessä.
       *
       * KYSYMYS SÄILYY ENNALLAAN (Fablen päätös ja kuvaputken ehdotus:
       * *"Säilytä nykyinen Athenen oliivipuuta koskeva kysymys, oikea
       * vastaus ja oppitunti"*). Dafni johdattaa siihen rahan linnusta,
       * jota turistit kysyvät — vastausriviä ei lue missään ennen
       * visaa näkyvässä kentässä (tarinakaari.md, sääntö 6).
       */
      saapuminen: 'Pöllö istui kaatuneella pylväällä ja katsoi minua '
        + 'liikahtamatta, kuin vaatisi selitystä myöhästymisestäni. '
        + 'Kirjasin vihkooni tuijotuksemme keston: seitsemän '
        + 'minuuttia, ja minä käänsin katseeni ensin. Silloin se '
        + 'astui syrjään: jalan alla oli hopearaha, vanhempi kuin '
        + 'mikään mittaamani. Se ei vartioinut rahaa minulta — se '
        + 'näytti, mistä aloittaa.',
      henkilo: 'Marmorikonservaattori Dafni sulkee työpäivän Akropoliin '
        + 'työmaalla ja tunnistaa vanhat mittamerkinnät.',
      kohtaaminen: 'Työmaaportilla marmorikonservaattori Dafni siirtää '
        + 'laatikon lonkalleen. "Mistä sait tuon luonnoksen? Kulman minä '
        + 'tunnen — sama mitta on meidän arkistossamme, eri käsialalla. '
        + 'Turisti kysyy aina rahan linnusta. Sinä saat vastata '
        + 'vaikeampaan."',
      kysymys: {
        q: 'Kaupunki on nimetty jumalattaren mukaan. Millä lahjalla '
          + 'Athene tarun mukaan voitti kaupungin itselleen?',
        vaihtoehdot: [
          'Oliivipuulla, jonka hän kasvatti Akropoliin kalliolle',
          'Suolaisella lähteellä, jonka hän iski kalliosta keskelle '
            + 'linnaa',
          'Sotahevosella, joka ei väsynyt koskaan',
          'Kultakypärällä, joka kätki kantajansa katseilta',
        ],
        oikea: 0,
        fakta: 'Tarun kisassa Poseidon iski kalliosta suolaisen lähteen, '
          + 'mutta Athene kasvatti oliivipuun — ja kaupunki valitsi puun, '
          + 'joka antoi öljyä, ruokaa ja varjoa. Voittajan nimi jäi '
          + 'kaupungille, ja hopearahoihin lyötiin jumalattaren viisas '
          + 'lintu.',
      },
      aarre: 'Dafni osoitti mistä mitata: työmaapolun kulmakivi oli ontto, '
        + 'ja onkalossa odotti rasia. "Sama viiva on meidän '
        + 'arkistokopiossamme." Kopio on isoisän kirjaa vanhempi. Kumpi '
        + 'siis piirsi ensin?',
    },
    {
      id: 'lissabon',
      mykistetyt: [],
      otsikko: 'Lissabon — laatta jota ei poltettu loppuun',
      saapuminen: 'Belémin vartija vannoi, ettei torni ole siirtynyt '
        + 'keskelle jokea — joki siirtyi. Kirjasin väitteen '
        + 'varauksella ja tilasin kolmannen kermaleivoksen: reseptin '
        + 'loivat munkit, ja sen tuntee yhä vain kourallinen eläviä. '
        + 'Laskuveden rajassa kiveä kiersi rengas, syvälle kulunut. '
        + 'Sata vuotta laivoja, jotka eivät enää käy. Nousuvesi '
        + 'peitti sen silmissäni.',
      henkilo: 'Laattamestari Inês polttaa sinivalkoisia azulejo-laattoja '
        + 'samassa uunissa kuin sukunsa kolmesataa vuotta.',
      kohtaaminen: 'Työpajassa Inês pyyhkii savipölyn käsistään. "Isoisäsi '
        + 'maalasi suvulleni laatan, mutta laiva vei hänet ennen '
        + 'polttopäivää. Keskeneräistä ei tässä pajassa hävitetä — '
        + 'laatta on odottanut maalariaan raakana. Vastaa, niin '
        + 'sytytän uunin."',
      kysymys: {
        q: 'Sana azulejo ei tule sinisestä väristä, vaikka siltä '
          + 'kuulostaa. Mistä se tulee?',
        vaihtoehdot: [
          'Arabian sanasta: kiillotettu kivi',
          'Latinan taivaansineä tarkoittavasta sanasta',
          'Laattamestari Azulejon kuuluisasta sukunimestä',
          'Atlantin aalloista, joita laatat jäljittelivät',
        ],
        oikea: 0,
        fakta: 'Azulejo tulee arabian sanasta az-zulayj, kiillotettu kivi — '
          + 'ei espanjan sinisestä (azul), vaikka korva niin väittää. '
          + 'Laatat viilentävät taloja ja kertovat seinillä kokonaisia '
          + 'tarinoita.',
      },
      aarre: 'Laatta halkesi uunissa kahtia, ja sauman sisältä putosi '
        + 'kätkö. Inês tutki puolikkaita kauan: "Kuvio jatkuu '
        + 'laatalla, jota minun uunissani ei ole koskaan poltettu — '
        + 'jossain on toinen uuni."',
    },
    {
      id: 'amsterdam',
      mykistetyt: [],
      otsikko: 'Amsterdam — väärä kerros',
      /*
       * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut.
       *
       * KOKO KAARI UUSIKSI (kuvaputken tarinaehdotus 5.9.2026, Fablen
       * päätös samana iltana klo 20:05 UTC: *"Amsterdam (Yara): kätkö on
       * kaupungin kätkö, ei yksityisasunnon ullakko 'asukkaan luvalla' —
       * rasia löytyy kanavan varrelta yleiseltä paikalta. Fokusvirran
       * kohtaamispiste siirtyy Magere Brugilta kanavataloille."*).
       *
       * SILTAVAHTI WILLEM POISTUU KOKONAAN: hänen kirjansa merkitsi
       * isoisän veneen ja suku avasi siltaa sukupolvien ajan — molemmat
       * ovat kaanonrikkeitä (kukaan ei tunnista Horatiota eikä odota
       * perillistä, docs/isoisan-raamattu.md). Tilalla on muuttotyöläinen
       * Yara, joka tunnistaa piirroksen kulman omasta työstään.
       *
       * KUVAPUTKEN EHDOTUKSEN ULLAKKOLAATIKKO EI TOTEUDU: Fablen päätös
       * siirsi kätkön yleiselle paikalle kanavan varteen, joten rasia on
       * laiturin pollarin alla eikä kenenkään asunnossa.
       *
       * SPOILERIKURI (tarinakaari.md, sääntö 6): henkilo-kenttä ja
       * kohtaaminen näkyvät ENNEN visaa, joten kumpikaan ei kerro, miksi
       * koukku on olemassa — Yara mittaa kaappeja ja vilkaisee ylös, ja
       * portaiden kapeus jää vastausriville ja fokusvirran oppitunnille
       * (js/packs/fokusvirta-amsterdam.js, "Miksi tavara kulkee
       * ikkunasta").
       *
       * VAIHTOEHTOJEN PITUUDET tasattu: oikea ei ole enää pisin
       * (tarinakaari.md, kysymyssääntö 2) — pisin on kauppiaan vaaka.
       *
       * BEAT: ajaton arvoitus. Erässä on kaksi tuoretta jälkeä (Pietari,
       * Alpit), joten Amsterdam, Islanti, Tallinna ja Tromssa vievät
       * paletin muihin päätyyppeihin.
       *
       * FAKTAT: nostopuu (hijsbalk), kapeat jyrkät portaat ja
       * julkisivuleveyden mukaan peritty vero — kaikki pelin omasta
       * tarkistetusta aineistosta, js/packs/fokusvirta-amsterdam.js:n
       * oppitunti ja js/packs/kulttuuri-kategoriat.js, amsterdam/kaupunki.
       */
      saapuminen: 'Mittasin yhden talon nojauksen ja sain kaksi jalkaa: se '
        + 'kallistuu kadulle tahallaan, jottei nostettava tavara kolhisi '
        + 'julkisivua. Yöllä päädyn koukussa riippui köysi ilman kuormaa. '
        + 'Aamulla samassa köydessä laskeutui arkku, joka pysähtyi ikkunani '
        + 'kohdalle ja kääntyi hitaasti ympäri. Kyljessä oli lappu: väärä '
        + 'kerros.',
      henkilo: 'Muuttotyöntekijä Yara johtaa kanavatalojen muuttoja ja '
        + 'mittaa jokaisen kaapin ennen kuin siihen koskee.',
      kohtaaminen: 'Kanavatalon edessä muuttotyöntekijä Yara kiertää köyden '
        + 'kämmenensä ympäri. "Aarretta? Meillä olisi tuossa yksi hyvin '
        + 'painava nojatuoli." Hän vilkaisee päätyyn, sitten kirjaasi. '
        + '"Tuo piirros on tämä kulma. Kerro, mitä varten koukku siellä on."',
      kysymys: {
        q: 'Yara vilkaisee talon päätyyn: koukku katonrajassa on melkein '
          + 'joka vanhassa kanavatalossa. Mitä varten se on?',
        vaihtoehdot: [
          'Kauppiaan vaaka riippui siinä koko kadun nähtävänä, jottei '
            + 'punnituksesta tulisi riitaa',
          'Huonekalut nostetaan ikkunasta, koska portaat ovat kapeat',
          'Lyhty ripustettiin siihen valaisemaan kanavan reunaa',
          'Tulvan aikaan siihen kiinnitettiin veneiden köydet',
        ],
        oikea: 1,
        fakta: 'Kiinteistövero perittiin julkisivun leveydestä, joten talot '
          + 'tehtiin kapeiksi ja portaista tuli jyrkkiä kuin tikkaat. '
          + 'Päädystä ulos työntyvää palkkia sanotaan nostopuuksi, '
          + 'hijsbalk, ja sen koukun varassa sohvat ja kaapit hilataan yhä '
          + 'sisään ikkunasta. Talot rakennettiin siksi hieman etunojaan.',
      },
      aarre: 'Kätkö oli kanavan reunassa, pollarin alla olevassa '
        + 'syvennyksessä. Yara hymähti rasian painolle: "Kevyempi kuin '
        + 'nojatuoli." Pohjaan on piirretty saman talon pääty — koukku '
        + 'väärällä puolella.',
    },
    {
      id: 'dublin',
      mykistetyt: [],
      otsikko: 'Dublin — lantti joka odotti maksajaansa',
      saapuminen: 'Ylitin joen sillalla, josta perittiin puolen pennin maksu. '
        + 'Maksoin sen ilolla: jalkasillalla ei kohtaa hevosia. '
        + 'Vartija mainitsi miehen, joka maksaa joka vuosi yhden '
        + 'ylityksen — mutta ei koskaan ylitä. Maksut on kirjattu '
        + 'vihkoon, jonka kansi on kulunut sileäksi kuin joenpohjan '
        + 'kivi. Sinä, joka tätä luet: se ylitys on maksettu sinulle.',
      saapumisLuenta: 'Ylitin joen sillalla, josta perittiin puolen '
        + 'pennin maksu. [warmly] Maksoin sen ilolla: jalkasillalla ei '
        + 'kohtaa hevosia. [curious] Vartija mainitsi miehen, joka '
        + 'maksaa joka vuosi yhden ylityksen — mutta ei koskaan ylitä. '
        + 'Maksut on kirjattu vihkoon, jonka kansi on kulunut sileäksi '
        + 'kuin joenpohjan kivi. [softly] Sinä, joka tätä luet: se '
        + 'ylitys on maksettu sinulle.',
      henkilo: 'Sillanvartija Molly kerää puolen pennin lantit samaan '
        + 'nahkakukkaroon kuin isoisoisänsä aikanaan.',
      kohtaaminen: 'Sillan korvassa Molly punnitsee lanttia sormissaan. '
        + '"Kukkarossa on yksi lantti, jota en saa laskea kassaan — se '
        + 'odottaa maksajan sukua. Vastaa kirjan kysymykseen, niin '
        + 'ylitys on sinun."',
      kysymys: {
        q: 'Dublinin rautainen kävelysilta korvasi aikanaan jotakin. '
          + 'Minkä?',
        vaihtoehdot: [
          'Lauttamiehet, jotka soutivat väkeä joen yli',
          'Kahluupaikan, joka upotti kärryjä joka syksy',
          'Vanhan puusillan, jonka tulva vei mennessään',
          'Köysiradan, jolla tavarat vedettiin rannalta toiselle',
        ],
        oikea: 0,
        fakta: 'Ennen siltaa Liffeyn yli kuljettiin lautturien soutamana. '
          + 'Lauttojen omistaja sai luvan rakentaa valurautasillan 1816, '
          + 'ja ylityksestä perittiin sama maksu kuin lautasta — puoli '
          + 'penniä. Siitä silta sai nimensä, joka jäi vaikka maksu '
          + 'poistui.',
      },
      aarre: 'Lantin alta, kukkaron saumasta, löytyi taitettu kätkö. '
        + 'Molly käänsi lanttia valossa: "Tämä on lyöty vuonna, jota '
        + 'ei vielä ollut, kun isoisoisäni sai kukkaron."',
    },
    {
      id: 'edinburgh',
      mykistetyt: [],
      otsikko: 'Edinburgh — sekunnin ero',
      saapuminen: 'Linnan tykki jyrähti täsmälleen yhdeltä, ja kellot '
        + 'vastasivat. Kirkkomaalla pieni koira vartioi hautaa; istuin '
        + 'sen viereen ja jätin lähtiessäni haudalle käyntikorttini, '
        + 'kulma taitettuna niin kuin tapa vaatii. Illalla kirjasin '
        + 'päivän ja huomasin: väärä kulma — surunvalittelun sijaan '
        + 'onnittelu. Koira ei pitänyt sitä minään. Minä pidin, koko '
        + 'viikon.',
      henkilo: 'Tykkimestari Ewan lataa linnan yhden lyönnin tykin joka '
        + 'päivä, kuten isoisänsä ennen häntä.',
      kohtaaminen: 'Vallilla tykkimestari Ewan kuuraa piippua. "Isoisäsi seisoi '
        + 'tässä kellonsa kanssa ja vertasi lyöntiä tykkiimme — kirjasi '
        + 'mukaan ne erosivat sekunnilla. Vastaa hänen kysymykseensä, '
        + 'niin näytän, kumpi kävi edellä."',
      kysymys: {
        q: 'Edinburghin linnasta ammutaan laukaus joka päivä kello '
          + 'yhdeltä. Kenelle laukaus alun perin ammuttiin?',
        vaihtoehdot: [
          'Sataman laivureille kellojen asettamista varten',
          'Kaupungin virastoille, jotka avasivat ovensa siitä',
          'Ylämaan paimenille, jotka käänsivät laumat kotiin',
          'Linnan vartiostolle vahdinvaihdon merkiksi',
        ],
        oikea: 0,
        fakta: 'Laukaus oli aikamerkki Leithin sataman laivureille: kellot '
          + 'asetettiin tykin mukaan, ja tarkka aika oli merenkululle '
          + 'elinehto. Skotlantilainen säästäväisyys valitsi lyömäksi '
          + 'yhden — yksi laukaus on halvempi kuin kaksitoista.',
      },
      aarre: 'Kätkö oli muurattu vallin kiveen, päällimmäisenä isoisän '
        + 'lappu ja pyyntö: öljytkää lukkoa. "Suku on öljynnyt", Ewan '
        + 'sanoi, "mutta kukaan ei tiedä, minkä oven lukko se on."',
    },
    {
      id: 'barcelona',
      mykistetyt: [],
      otsikko: 'Barcelona — lohikäärme ja tuore ruusu',
      saapuminen: 'Kävelin goottilaiskorttelin kujia, kunnes taivas oli enää '
        + 'viiva. Portin yllä lohikäärmeen kivipää työntyi seinästä, '
        + 'hampaissaan kuihtunut ruusu — vaikka ruusujen päivästä oli '
        + 'kuukausia. Vartija sanoi, että ruusu vaihtuu tuoreeseen '
        + 'joka vuosi samana yönä, eikä vaihtajaa ole nähnyt kukaan. '
        + 'Kirjasin senkin — ja päivämäärän, jona kannattaisi '
        + 'palata.',
      henkilo: 'Kirjansitoja Mercè sitoo kirjoja kujalla, jolla hänen '
        + 'sukunsa on myynyt ruusuja ja kirjoja pyhän Jordin päivänä '
        + 'sata vuotta.',
      kohtaaminen: 'Mercè nostaa katseensa neulasta ja langasta. "Isoisäsi jätti '
        + 'suvulleni kirjan sidottavaksi — ja käski antaa sen vain '
        + 'sille, joka tietää, miksi tässä kaupungissa lohikäärme '
        + 'kantaa ruusua. Vastaa, niin saat sidoksen."',
      kysymys: {
        q: 'Sant Jordi kaatoi tarun mukaan lohikäärmeen. Mitä sen '
          + 'verestä kasvoi?',
        vaihtoehdot: [
          'Ruusupensas',
          'Tulppaanimeri',
          'Orjantappuratiheikkö',
          'Granaattiomenapuu',
        ],
        oikea: 0,
        fakta: 'Tarun mukaan lohikäärmeen verestä kasvoi ruusupensas, ja '
          + 'ritari ojensi prinsessalle sen ensimmäisen ruusun. Siksi '
          + 'Sant Jordin päivänä 23. huhtikuuta lahjoitetaan ruusuja — ja '
          + 'kirjoja, sillä sama päivä on kirjan juhla.',
      },
      aarre: 'Sidoksen selkämyksen ontelossa odotti kätkö — ja tuore '
        + 'terälehti. "Ruusujen päivään on puoli vuotta, ja tämä on '
        + 'aamulta", Mercè sanoi ja katsoi kujan päähän, kohti '
        + 'kirkkoa jota isoisän kirja ei tunne.',
    },
    {
      id: 'granada',
      mykistetyt: [],
      otsikko: 'Granada — kouru jota ei ole kartassa',
      /*
       * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut.
       *
       * HENKILÖ JA LÖYTÖPAIKKA VAIHTUIVAT (kuvaputken tarinaehdotus
       * 5.9.2026, Fablen päätös samana iltana klo 20:05 UTC: *"Granada
       * (Inés, Generalife): rasia löytyy kaupungin kätköstä
       * puutarhassa, ei 'huoltovarastoon siirrettynä'."*).
       * Vesimestari Yusuf, sukupolvien yli kulkeneet avaimet ja veden
       * ohjaaminen näyttämään tie ovat poissa; tilalla on Generalifen
       * puutarhuri, joka vertaa kirjan piirrosta työnsä
       * kastelusuunnitelmiin. Kukaan ei tunne Horatiota eikä odota
       * perillistä, eikä kukaan opeta ketään kuuntelemaan vettä.
       *
       * SAAPUMINEN SÄILYY: se on 1873:n oma havainto (jääkylmä vesi,
       * kaksitoista allasta, vanhan puutarhurin lause veden solinasta
       * talon kellona) eikä sisällä yhtään kaanonirikettä — ja se
       * pohjustaa nyt entistä paremmin sitä, että kaupungin
       * kohtaamishenkilö on puutarhuri. Mykistys lisätty
       * kohtaamiselle, koska kohtaamisteksti vaihtui.
       *
       * KYSYMYS SÄILYY ENNALLAAN (Fablen päätös ja kuvaputken ehdotus:
       * *"Nykyinen Alhambran nimen punaista tarkoittava vastaus
       * säilyy"*). Inés osoittaa piirroksen vanhaa nimeä ennen
       * kysymystä, jottei puutarhatyö muutu historian tentiksi ilman
       * johdantoa.
       */
      saapuminen: 'Join Alhambrassa jääkylmää vettä keskellä Andalusian '
        + 'kesää: se laskee vuorilta, joilla lumi ei sula, ja '
        + 'seitsemänsataa vuotta vanhat kourut kantavat sen joka '
        + 'huoneeseen. Laskin suihkulähteen altaat: kaksitoista. Vanha '
        + 'puutarhuri sanoi, että veden solina on talon kello — joka '
        + 'huoneessa aika kulkee veden äänellä. Kirjoitin sen muistiin '
        + 'sanasta sanaan.',
      henkilo: 'Puutarhuri Inés hoitaa Generalifen puutarhoja ja tuntee '
        + 'kastelureitit paremmin kuin niiden piirustukset.',
      kohtaaminen: 'Generalifen puutarhassa puutarhuri Inés heittää '
        + 'leikkuuoksat kärryyn ja pyyhkii kämmenen housuunsa. '
        + '"Aarretta? Me löysimme aamulla tukkeutuneen kourun." Sitten '
        + 'hän näkee piirroksen vanhan nimen. "Sano ensin, mitä tämä '
        + 'nimi tarkoittaa."',
      kysymys: {
        q: 'Punertava linnoitus Alhambra kohoaa Granadan yllä. Mitä sen '
          + 'nimi tarkoittaa?',
        vaihtoehdot: [
          'Punaista — arabiaksi al-hamra',
          'Korkeaa puutarhaa vuoren rinteellä',
          'Tuhannen lähteen taloa ja sen kaivoja',
          'Viimeistä huokausta kukkulan laella',
        ],
        oikea: 0,
        fakta: 'Al-qal\'a al-hamra tarkoittaa punaista linnaa: iltavalossa '
          + 'muurit hehkuvat punertavina. Sisällä vesi virtaa yhä '
          + 'kanavissa, jotka rakennettiin seitsemänsataa vuotta sitten.',
      },
      aarre: 'Inés seurasi kourun vartta muurin kylkeen asti: kiviuran '
        + 'alla, kuivassa kolossa, oli rasia. "Tässä ei kastella enää '
        + 'mitään." Reitti on isoisän piirroksessa, mutta ei '
        + 'yhdessäkään puutarhan nykyisessä suunnitelmassa.',
    },
    {
      id: 'marseille',
      mykistetyt: [],
      otsikko: 'Marseille — saari josta palataan tarinoissa',
      /*
       * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut.
       *
       * VAIN KAANONIRIKE KORJATTU — HENKILÖ, KYSYMYS JA PAIKKA PYSYVÄT
       * (kuvaputken toimitus 5.9.2026 luokitteli Marseillen pelkäksi
       * kuvatyöksi; Fablen päätös klo 20:05 UTC: *"Näissä korjaan
       * erikseen kaksi omaa asiaa: Marseillen kaaren 'isäni isä souti
       * isoisäsi saarelle' -rike…"*).
       *
       * RIKE: vanha kohtaaminen sanoi *"Isäni isä souti isoisäsi saarelle
       * ja odotti häntä kaksi vuorokautta"* ja aarre jatkoi samaa
       * muistoa. Se tunnistaa Horation ja tekee Baptisten suvusta hänen
       * tarinansa todistajan. Uudessa versiossa Baptiste ei tiedä
       * Horatiosta mitään: hän vie väkeä kalliolle päivittäin ja pitää
       * koko aarrepuhetta laiturin tavallisena hulluutena.
       *
       * SAAPUMINEN JÄÄ ENNALLEEN: siinä ei ole riketta. Horatio maksaa
       * pyydetyn hinnan soutajalle — se on tavallinen työn maksu, ei
       * ostettu järjestely (vrt. isoisan-raamattu.md, varallisuussääntö).
       *
       * BEAT SÄILYY: toinen esine jossain muualla. Aarre ei enää vertaa
       * rasiaa suvun muistamaan arkkuun vaan rasian omaan sisätilaan,
       * jossa on paikka kahdelle esineelle ja vain toinen niistä.
       *
       * SPOILERIKURI: kohtaaminen ei nimeä kirjaa eikä vankia, jotta
       * visan neljä vaihtoehtoa pysyvät auki.
       *
       * ÄÄNIPROFIILI säilyy epäuskoisena, kuten fokusvirran kortti
       * (js/packs/fokusvirta-marseille.js) kuvaa.
       */
      saapuminen: 'Saari nousi merestä kuin kivinen laiva, ja soutaja '
        + 'kieltäytyi viemästä: saarelta palataan vain tarinoissa. '
        + 'Maksoin pyydetyn tinkimättä, mikä teki hänet vain '
        + 'epäluuloisemmaksi; lupasin kertoa tarinani hänelle ensin. '
        + 'Kirjasin karttaani muurin juuren nuolen, joka osoitti veden '
        + 'alle. Pidin lupaukseni paluumatkalla. Soutaja souti '
        + 'hitaammin kuin tullessa.',
      henkilo: 'Soutaja Baptiste kuljettaa kalastajia satamasta ja tuntee '
        + 'Ifin saaren virtaukset paremmin kuin kukaan.',
      kohtaaminen: 'Laiturissa soutaja Baptiste pitää venettä paikoillaan '
        + 'yhdellä kädellä. "Aarretta? Sinä ja puolet laiturista." Hän '
        + 'nyökkää ulapalle. "Tuolle kalliolle viedään joka päivä väkeä, '
        + 'eikä kukaan tule kiven takia. Sano, mikä kirja heidät sinne '
        + 'lähettää."',
      kysymys: {
        q: 'Ifin linnoitussaari Marseillen edustalla tunnetaan '
          + 'kaikkialla yhden kirjan ansiosta. Minkä?',
        vaihtoehdot: [
          'Monte-Criston kreivin',
          'Kolmen muskettisoturin',
          'Kurjien',
          'Aarresaaren',
        ],
        oikea: 0,
        fakta: 'Alexandre Dumas\'n Monte-Criston kreivissä Edmond Dantès '
          + 'istuu Ifin tyrmässä neljätoista vuotta ja pakenee ainoana. '
          + 'Tarina teki vankilasaaresta kuuluisan — moni etsii yhä '
          + 'Dantèsin selliä.',
      },
      aarre: 'Nuolen alta, laskuveden paljastamasta kolosta, nousi rasia. '
        + 'Baptiste kohotti sen ja katsoi merelle: "Liian kevyt tuon '
        + 'kokoiseksi." Sisällä on tila kahdelle esineelle, ja vain toinen '
        + 'niistä on tallella.',
    },
    {
      id: 'varsova',
      mykistetyt: [],
      otsikko: 'Varsova — eränumero varastokirjassa',
      /*
       * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut.
       *
       * KAKSOISHENKILÖ PURETTU, KOKO KAARI UUSIKSI (kuvaputken
       * havainto 5.9.2026 ja Fablen päätös samana iltana klo 20:05
       * UTC: *"Varsova: yhdistetään antikvaari Zofiaan (kalastaja
       * Jadwiga pois kaaresta); mereneitokysymys ei nouse
       * antikvariaatista, joten kysymys vaihtuu antikvariaatista/
       * jälleenrakennetusta vanhastakaupungista nousevaksi."*)
       *
       * Kaupungilla oli kaksi eri kohtaamishenkilöä: kaaressa kalastaja
       * Jadwiga ja fokusvirrassa (js/packs/fokusvirta-varsova.js)
       * antikvaari Zofia. Kaaren henkilö ei enää voita, koska omistajan
       * hyväksymä kuva on Zofiasta — nyt molemmat pinnat puhuvat
       * samasta ihmisestä. Verkonpainot, rantakiven kätkö ja suvun
       * mereneitolupaus ovat poissa.
       *
       * MIKSI MERENEITOKYSYMYS VAIHTUI. Kysymys nousee kohtauksesta
       * (tarinakaari.md, luku 6, sääntö 1). Kirjapuodissa ei ole
       * paikallistarinoiden kuvakirjaa käsillä — jos se tuotaisiin
       * kohtaukseen vain kysymyksen vuoksi, se olisi juuri se
       * "tunnelmaesine ilman merkitystä", jonka luku 4 käskee leikata.
       * Vanha mereneitoaineisto elää yhä pelissä Varsovan lehdessä ja
       * europe-questions.js:n täkyriveillä.
       *
       * MIKSI EI JÄLLEENRAKENNUSTA. Se oli ensimmäinen luonnos, mutta
       * kaupungilla on jo laattakysymys *"Mitä Varsovan
       * vanhallekaupungille tehtiin toisen maailmansodan jälkeen?"*
       * (js/packs/europe-questions.js, varsova) ja fokusvirran
       * Bellotto-syvennys kertoo saman työn maalausten puolelta.
       * Kolmas kerta samasta aiheesta samassa kaupungissa on juuri se
       * toisto, jonka tarinakaari.md:n luku 5 kieltää.
       *
       * KYSYMYS TULEE SIIS SIITÄ TALOSTA, JONKA KULMALLA PUOTI ON.
       * Fokusvirran oppitunti ("Kirjasto, joka lähti kärryillä itään")
       * kertoo Załuskien kirjastosta, ja fokusvirran kohtaamispiste on
       * juuri se talo. Antikvaari, lainatut kirjat ja palauttamatta
       * jääneet niteet ovat saman ammatin jatkumo 1700-luvulta tähän
       * päivään — kysymys nousee siis sekä paikasta että hahmon
       * ammatista.
       *
       * FAKTAT (en-Wikipedia "Załuski Library", tarkistettu 5.9.2026):
       * kirjaston perustivat 1747 piispaveljekset Józef Andrzej ja
       * Andrzej Stanisław Załuski; se oli Puolan ensimmäinen julkinen
       * kirjasto; lainaaminen lopetettiin varkauksien takia, ja
       * *"in 1752 pope Benedict XIV issued a papal bull that threatened
       * to excommunicate individuals taking the books from this
       * library; even that did not eliminate the problem completely"*.
       * Sama tieto on jo pelissä fokusvirran oppitunnissa, joka on
       * tämän kysymyksen tuki.
       *
       * VASTAUSRIVI EI ESIINNY ENNEN VISAA: kohtaaminen puhuu
       * eränumerosta ja talon iästä, ei bullasta. Oppitunti opettaa
       * asian omin sanoin, joten tarkkaavainen lukija palkitaan ja
       * lähimuisti ei riitä (tarinakaari.md, sääntö 6).
       *
       * VAIHTOEHDOT: oikea (44 merkkiä) ei ole pisin — pisin on väärä
       * (54). Yksikään väärä ei ole puolitosi: paavi ei rahoittanut
       * kirjastoa, ei säädellyt sen aukioloa eikä lahjoittanut siihen
       * niteitä.
       */
      saapuminen: 'Ostin torin laidan puodista kartan, joka oli väärä: kaksi '
        + 'katua oli piirretty ristiin, ja myyjä myönsi sen heti. Rahaa '
        + 'hän ei ottanut takaisin, vaan merkitsi virheen kartan reunaan '
        + 'ja kirjoitti viereen eränumeron. Sanoi, että joku korjaa sen '
        + 'joskus. Kirjasin numeron omaan kirjaani enkä osaa selittää '
        + 'miksi.',
      henkilo: 'Antikvaari Zofia pitää puotia vanhan kirjastotalon kulmalla '
        + 'ja löytää mitä tahansa, kunhan saa eränumeron.',
      kohtaaminen: 'Hyllyjen välissä antikvaari Zofia vetää raskaan '
        + 'varastokirjan esiin ja painaa sen tiskille. "Sanoitko tuon '
        + 'numeron aivan varmasti oikein?" Kissa nukkuu hyllykolossa. '
        + '"Tästä talosta on aikoinaan hävinnyt kirjoja. Vastaa yksi '
        + 'kysymys, niin katson numeron."',
      kysymys: {
        q: 'Samassa talossa toimi 1700-luvulla kirjasto, josta lainattuja '
          + 'kirjoja ei tuotu takaisin. Millä paavi yritti vuonna 1752 '
          + 'auttaa asiaa?',
        vaihtoehdot: [
          'Uhkasi kirkonkirouksella kirjan ulos kantavaa',
          'Määräsi kaupungin maksamaan kadonneiden kirjojen hinnan',
          'Kielsi kirjaston aukiolon sunnuntaisin',
          'Lahjoitti kokoelmaan kaksisataa nidettä',
        ],
        oikea: 0,
        fakta: 'Piispaveljekset Józef Andrzej ja Andrzej Stanisław Załuski '
          + 'avasivat 1747 Puolan ensimmäisen julkisen kirjaston: ovet '
          + 'olivat auki tiistaisin ja torstaisin aamuseitsemästä '
          + 'iltaseitsemään, ja kävijältä pyydettiin hiljaisuutta ja '
          + 'rukousta. Kotiinlainaus jouduttiin lopettamaan, ja paavi '
          + 'Benedictus XIV vahvisti kiellon bullalla vuonna 1752. '
          + 'Sekään ei aivan riittänyt.',
      },
      aarre: 'Eränumero osui varastokirjassa riville, jota Zofia ei osannut '
        + 'selittää: kirjakäärö, otettu vastaan mutta ei koskaan myyty. '
        + 'Käärön sisässä oli rasia. Vastaanottajan nimikirjaimia on '
        + 'kaksi, eivätkä ne ole isoisän.',
    },
    {
      id: 'krakova',
      mykistetyt: [],
      otsikko: 'Krakova — sävel joka katkeaa kesken',
      saapuminen: 'Tornista nousi torvensoitto ja katkesi kesken sävelen, '
        + 'kuin veitsellä leikaten. Jäin laskemaan: katkos toistui '
        + 'joka tunti täsmälleen samalla nuotilla, ja minä asetin '
        + 'kelloni sen mukaan — täsmällisin aikamerkki sitten '
        + 'Greenwichin. Keskiyöllä torvi soitti sävelen loppuun asti. '
        + 'Torilla ei silloin ollut ketään muuta kuulemassa.',
      henkilo: 'Tornintorvensoittaja Stanisław soittaa hejnałin joka tunti '
        + 'neljään ilmansuuntaan, kuten soittajat ennen häntä '
        + 'vuosisatojen ajan.',
      kohtaaminen: 'Tornin portaissa Stanisław pitelee torvea kainalossaan. '
        + '"Isoisäsi kysyi minun isoisältäni, miksi sävel katkeaa — ja '
        + 'jätti vastauksen sijaan kysymyksen. Vastaa siihen, niin '
        + 'soitan sinulle sen, mitä muut eivät kuule."',
      kysymys: {
        q: 'Krakovan tornista soitetaan joka tunti hejnał-kutsu, joka '
          + 'katkeaa aina kesken. Miksi?',
        vaihtoehdot: [
          'Tarun mukaan nuoli osui soittajaan kesken soiton',
          'Sävelen loppua ei ole koskaan sävelletty',
          'Torni on niin korkea, ettei soittajan henki riitä loppuun',
          'Kaupunki ei aikoinaan maksanut koko sävelestä',
        ],
        oikea: 0,
        fakta: 'Tarina kertoo vartijasta, joka näki vihollisen lähestyvän ja '
          + 'soitti hälytyksen — nuoli katkaisi soiton kesken. Hänen '
          + 'kunniakseen hejnał katkeaa yhä samassa kohdassa.',
      },
      aarre: 'Soittajan penkin alta löytyi kapea lipas ja siinä nuotti: '
        + 'hejnałin loppu käsin kirjoitettuna. "Käsiala ei ole '
        + 'yhdenkään soittajan, jonka suku muistaa", Stanisław sanoi.',
    },
    {
      id: 'alpit',
      mykistetyt: [],
      otsikko: 'Alpit — laukku jota kukaan ei kaivannut',
      /*
       * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut.
       *
       * ANSELM SÄILYY, KOHTAAMINEN VAIHTUU (kuvaputken tarinaehdotus
       * 5.9.2026, Fablen päätös klo 20:05 UTC: *"Alpit (Anselm ulos
       * aurinkoiselle polulle, koira keskeyttää): samalla poistan
       * kaaresta koiran sukupolvimuistin ja 'veljet vuosisatojen ajan'
       * -riveistä Horation tunnistuksen."*).
       *
       * KAKSI RIKETTÄ POIS. (1) Vanha kohtaaminen sanoi koiran polveutuvan
       * siitä, joka kaivoi *"isoisäsi laukun"* lumesta — se on Horation
       * tunnistus ja sukupolvien yli kannettu muisti yhdessä lauseessa.
       * (2) Vanha henkilo-kenttä jatkoi ketjun *"kuten veljet ennen häntä
       * vuosisatojen ajan"*, eli vuosisataisen ylläpidetyn perinteen,
       * jonka Euroopan kiintiö (1/lauta) käyttää Prahan kynttilään.
       * Molemmat poistuvat; Anselm ulkoiluttaa koiria tänään, ei jatka
       * kenenkään tehtävää.
       *
       * SAAPUMINEN JÄÄ SANATARKASTI ENNALLEEN: se on hyväksytty teksti
       * (mykistetyt-listalla ovat vain kohtaaminen ja aarre), eikä siinä
       * ole riketta — Horatio löytää vieraan laukun, jota kukaan ei ole
       * ilmoittanut kadonneeksi. Barometrin kaiverrus on kaaren
       * motiivilanka, jonka budjetti (4: Praha, Venetsia, Alpit, Moskova)
       * pysyy ennallaan.
       *
       * KOHTAAMISPAIKKA ULOS: kuvaputken toteutunut hetki on aurinkoinen
       * vuoripolku ja koira, joka työntää kuononsa Anselmin poskeen
       * kesken vastauksen. Hospitsin ovi ja koiran kauluksesta pitäminen
       * jäävät pois.
       *
       * BEAT: tuore jälki (röykkiön kivet on ladottu tänä kesänä) —
       * kuvaputki ja Fable pyysivät säilyttämään röykkiön löytöketjun.
       * Erässä tuoreita on kaksi (tämä ja Pietari), eivätkä ne ole
       * naapureita.
       *
       * FAKTAT: Suuren Sankt Bernhardin solan hospitsin koirat etsivät
       * lumeen hautautuneita hajun perusteella; Barry pelasti tarinan
       * mukaan yli neljäkymmentä ihmistä 1800-luvun alussa. Konjakkitynnyri
       * on myöhempi kuvitelma eikä sitä mainita.
       */
      saapuminen: 'Solassa lumi ulottui heinäkuussa polviin, ja luostarin '
        + 'koirat juoksivat edellä varmoin askelin. Yksi niistä '
        + 'pysähtyi kinoksen ääreen eikä suostunut jatkamaan. Kinoksen '
        + 'alta paljastui matkalaukku, jonka messinkikulmiin oli '
        + 'kaiverrettu barometrin kuva. Munkit sanoivat, ettei kukaan '
        + 'ollut ilmoittanut kadottaneensa mitään. Ei sinä vuonna, eikä '
        + 'sitä ennen.',
      henkilo: 'Luostarinveli Anselm ulkoiluttaa hospitsin isoja koiria '
        + 'solan poluilla ja tuntee jokaisen niistä nimeltä.',
      kohtaaminen: 'Aurinkoisella polulla luostarinveli Anselm aloittaa '
        + 'vastaustaan, kun koira työntää kuononsa hänen poskeensa. Hän '
        + 'nauraa ja tarttuu kaulapantaan. "Se tekee noin, kun joku puhuu '
        + 'liian kauan. Kerro sinä ensin, mistä nämä koirat maailmalla '
        + 'tunnetaan."',
      kysymys: {
        q: 'Anselm taluttaa hospitsin koiria solan polulla. Mistä työstä '
          + 'juuri nämä koirat tunnetaan maailmalla?',
        vaihtoehdot: [
          'Ne vetivät postirekeä solan yli pahimmissa myrskyissä',
          'Ne etsivät lumeen hautautuneita kulkijoita',
          'Ne vartioivat hospitsin kellareita',
          'Ne paimensivat vuohia kesän jyrkänteillä',
        ],
        oikea: 1,
        fakta: 'Suuren Sankt Bernhardin solan hospitsin munkit kasvattivat '
          + 'koiria, jotka löysivät lumeen hautautuneet hajun perusteella '
          + 'ja lämmittivät heitä, kunnes apua tuli. Kuuluisin, Barry, '
          + 'pelasti tarinan mukaan yli neljäkymmentä ihmistä 1800-luvun '
          + 'alussa.',
      },
      aarre: 'Koira kaivoi kätkön polun viereisestä kiviröykkiöstä ja '
        + 'istuutui odottamaan kiitosta. "Se ei kaivanut hajun takia", '
        + 'Anselm sanoi, "vaan koska kivet on ladottu tänä kesänä. Enkä '
        + 'minä ole ladonnut niitä."',
    },
    {
      id: 'sisilia',
      mykistetyt: [],
      otsikko: 'Sisilia — nukke jonka tarinaa ei esitetty',
      saapuminen: 'Rannan mustia paasia kalastajat sanovat kykloopin '
        + 'heittämiksi; kirjasin karttaan: heittäjä tuntematon. Yhden '
        + 'paaden laella oli kivistä ladottu keko, jota ei löydy '
        + 'yhdestäkään kartasta. Kysyin kekosta, ja kalastajat '
        + 'nauroivat: keko on heidän, matalikko alkaa siitä. Merkitsin '
        + 'matalikon — kaikki merkit eivät ole arvoituksia; jotkut '
        + 'ovat vain totta.',
      henkilo: 'Nukketeatterin mestari Rosalia liikuttaa ritarinukkeja, '
        + 'joiden haarniskat hänen sukunsa on takonut neljässä '
        + 'polvessa.',
      kohtaaminen: 'Näyttämön takana Rosalia ripustaa ritarin naulaansa. '
        + '"Isoisäsi istui katsomossa kolme iltaa peräkkäin — ja '
        + 'neljäntenä hän toi meille nuken, jonka tarinaa ei ole vielä '
        + 'esitetty. Vastaa hänen kysymykseensä, niin nostan sen '
        + 'naulasta."',
      kysymys: {
        q: 'Sisilian nukketeatterin ritarinuket taistelevat näyttämöllä '
          + 'ilta toisensa jälkeen. Kenen tarinoita ne esittävät?',
        vaihtoehdot: [
          'Kaarle Suuren ritarien, etunenässä Rolandin',
          'Kuningas Arthurin pyöreän pöydän ritarien',
          'Odysseuksen pitkän kotimatkan vaiheita',
          'Normannikuninkaiden valloitusretkiä',
        ],
        oikea: 0,
        fakta: 'Opera dei pupi esittää Kaarle Suuren paladiinien, etunenässä '
          + 'Orlandon eli Rolandin, seikkailuja jatkokertomuksena, joka '
          + 'saattoi kestää kuukausia ilta illalta. Nuket haarniskoineen '
          + 'taotaan käsin, ja perinne on kirjattu Unescon aineettomaan '
          + 'kulttuuriperintöön.',
      },
      aarre: 'Nuken haarniskan alla, puurungon ontelossa, odotti kätkö. '
        + 'Rosalia käänsi nukkea valoon: "Haarniska on sukuni takoma, '
        + 'mutta joku on kiillottanut sen — eikä naulassa kiillä '
        + 'mikään muu."',
    },
    {
      id: 'kreeta',
      mykistetyt: [],
      otsikko: 'Kreeta — lanka joka jatkuu pimeään',
      saapuminen: 'Vuoren rinteessä luola haarautui käytäviksi, ja opas '
        + 'kieltäytyi jatkamasta ilman lankaa. Sidoimme kerän suulle ja '
        + 'laskeuduimme. Käytävän seinässä, syvällä pimeässä, oli '
        + 'koukku — ja koukussa toisen langan pää, vanha ja '
        + 'haurastunut. Joku oli kulkenut täällä lankansa varassa kauan '
        + 'ennen meitä. Hänen keränsä oli kelattu takaisin.',
      henkilo: 'Paimen Eleni tuntee vuoren luolat lampaidensa ansiosta ja '
        + 'kehrää lankansa itse, kuten äitinsä ja tämän äiti.',
      kohtaaminen: 'Luolan suulla Eleni punnitsee lankakerää kädessään. '
        + '"Isoisäsi osti sukuni lankaa kaksi kerää — ja palautti vain '
        + 'toisen. Vastaa hänen kysymykseensä, niin annan sinulle '
        + 'kolmannen."',
      kysymys: {
        q: 'Kreetan tarun sokkelon uumenissa asui olento, joka oli '
          + 'puoliksi mies. Mikä sen toinen puoli oli?',
        vaihtoehdot: [
          'Härkä',
          'Leijona',
          'Käärme',
          'Kotka',
        ],
        oikea: 0,
        fakta: 'Minotauros oli puoliksi mies, puoliksi härkä, ja kuningas '
          + 'Minos kätki sen Daidaloksen labyrinttiin. Theseus surmasi '
          + 'sen ja löysi ulos Ariadnen lankakerän jälkiä pitkin — siksi '
          + 'johtolankaa sanotaan yhä langaksi.',
      },
      aarre: 'Langan päästä löytyi kätkö. Eleni antoi kolmannen kerän: '
        + '"Solmu on sukuni, mutta lanka jatkuu syvemmälle — ja jatko '
        + 'on kehrätty tänä vuonna."',
    },
    {
      id: 'dubrovnik',
      mykistetyt: [],
      otsikko: 'Dubrovnik — ranta näkyy vain mereltä',
      /*
       * Uudistus 5.9.2026, Fable tarkisti ja viimeisteli 22.10.
       *
       * KOKO KAARI VAIHDETTU (kuvaputken tarinaehdotus 5.9.2026,
       * Fablen päätös klo 19:05 UTC: *"Dubrovnik — Mara (hyväksytty
       * sellaisenaan) … Ivon henkilökertomus, saranoitu kivi ja lyhty
       * poistuvat"*). Muurinvartija Ivo, yhdeksässadas askel, saranoitu
       * kivi ja lämmin lyhty ovat poissa; tilalla on merimelontaopas,
       * joka lukee saman rannan mereltä päin.
       *
       * SAAPUMISEN KOLME ENSIMMÄISTÄ VIRKETTÄ ovat Fablen hyväksymä
       * merkintäehdotus sanatarkasti ("Veneestä ranta aukeni kuin ovi.
       * Maalta en löytänyt samaa kohtaa lainkaan. Soutaja käänsi
       * piirrokseni oikein päin."); ympärille on kirjoitettu vain
       * mittausele ja erän itseironia-annos. Soutaja on 1873 eikä
       * kukaan tänään muista häntä.
       *
       * LIBERTAS-SILTA: kysymys ei roiku irrallaan rantaprofiilista,
       * vaan Mara huomaa sanan kirjan reunaan kopioituna ja pyytää
       * matkaajaa tulkitsemaan sen (Fablen hyväksymä uusi fiktiivinen
       * reunamerkintä). Vastaus ei avaa mitään taianomaisesti — se
       * herättää kiinnostuksen, ja kätkö löytyy vasta kun luonnosta
       * verrataan rantaan.
       *
       * FAKTAT: Libertas = vapaus, ja sana on Lovrijenacin linnakkeen
       * portin yllä olevassa lauseessa (Dubrovnik Tourist Board,
       * tzdubrovnik.hr; kuvaputken faktantarkistus 5.9.2026). Lipun
       * täsmällistä käyttöä eri aikakausina EI väitetä — vanha kysymys
       * puhui lipusta, tämä ei.
       *
       * PAIKKAEHDOKAS: Betinan luola. Sitä ei nimetä tekstissä, koska
       * kuvauspaikkaa eikä pääsyä ole vahvistettu.
       */
      saapuminen: 'Veneestä ranta aukeni kuin ovi. Maalta en löytänyt samaa '
        + 'kohtaa lainkaan: kiersin kalliota kaksi tuntia ja merkitsin '
        + 'karttaan kolme umpikujaa. Soutaja käänsi piirrokseni oikein '
        + 'päin sanomatta mitään. Olin piirtänyt oikein ja '
        + 'katsonut väärästä suunnasta. Kirjasin senkin.',
      henkilo: 'Merimelontaopas Mara vie ryhmiä kallionalusrantoihin, '
        + 'joihin ei pääse maalta.',
      kohtaaminen: 'Kalliosuun edessä merimelontaopas Mara pitää kajakkia '
        + 'paikoillaan yhdellä kädellä. "Aarretta? Pidä ensin kirja '
        + 'kuivana." Hän kääntää sivun vedeltä. "Tämä on rantaprofiili, '
        + 'piirretty mereltä. Reunaan on kopioitu yksi sana. Sano mitä '
        + 'se tarkoittaa."',
      kysymys: {
        q: 'Kirjan reunaan on kopioitu latinan sana Libertas, joka lukee '
          + 'myös Lovrijenacin linnakkeen portin yllä. Mitä se tarkoittaa?',
        vaihtoehdot: [
          'Onni',
          'Vapaus',
          'Voitto',
          'Totuus',
        ],
        oikea: 1,
        fakta: 'Libertas tarkoittaa vapautta. Ragusan tasavalta säilytti '
          + 'itsenäisyytensä vuosisatoja taidolla ja kaupankäynnillä, ei '
          + 'sodilla, ja Lovrijenacin linnakkeen portin yllä lukee yhä '
          + 'lause, jonka mukaan vapautta ei myydä maailman kaikesta '
          + 'kullasta.',
      },
      aarre: 'Mara veti kajakin rantakivien väliin ja osoitti melalla. '
        + 'Irtokiven alta tuli rasia. "Luulin meidän etsivän vain '
        + 'rantaa." Isoisän piirroksessa on neljäs kallio. Sitä ei ole '
        + 'edessämme eikä Maran merikartassa.',
    },
    {
      id: 'sarajevo',
      kuva: 'assets/kohtaamiset/kohtaaminen-sarajevo.jpg',
      mykistetyt: [],
      otsikko: 'Sarajevo — kaivo joka kutsuu takaisin',
      /*
       * QA-korjaus 9.8.2026 (Sonnet 1): torilla EI ollut kaivoa 1873 —
       * vanha Sebilj paloi 1852 ja nykyinen rakennettiin vasta 1891.
       * Isoisä kuulee siksi PALANEEN kaivon tarinan sepältä; nykyhetken
       * kohtaaminen, visa ja aarre koskevat torilla tänään seisovaa
       * kaivoa, joten ne pysyvät ennallaan.
       */
      saapuminen: 'Torin kaivo paloi ennen sepän aikaa: joka siitä joi, '
        + 'palasi vielä kaupunkiin. Kaivoa ei enää ole, sanoin. Tarina '
        + 'ei palanut, vastasi seppä ja ojensi kupin vettä. Join ja '
        + 'kiitin kolmella kielellä — kahdella, jotka osaan, ja '
        + 'yhdellä, jota luulin osaavani. Seppä korjasi ääntämykseni '
        + 'nauramatta; kirjasin senkin. Kupin pohjassa oli kaksi '
        + 'kaiverrettua kirjainta, jotka tunnen: H. F.',
      henkilo: 'Kupariseppä Emir takoo kannuja ja kuppeja kujalla, jolla '
        + 'hänen sukunsa paja on soinut kolmesataa vuotta.',
      kohtaaminen: 'Pajan ovella Emir kääntelee kuparilevyä pihdeissään. '
        + '"Isoisäsi tilasi sukuni pajasta kaksi kuppia — toisen hän '
        + 'vei, toinen jäi odottamaan. Vastaa hänen kysymykseensä, niin '
        + 'haen sen hyllyltä."',
      kysymys: {
        q: 'Sarajevon kuparisepät takovat astiaa, joka kuuluu kaupungin '
          + 'kahvipöytään. Mikä se on?',
        vaihtoehdot: [
          'Pitkävartinen pannu, jossa kahvi keitetään vaahtoavaksi',
          'Kaksipohjainen kannu, joka pitää juoman lämpimänä iltaan',
          'Hunajakattila, jonka kansi soi kuin pieni kello',
          'Vesikannu, joka viilentää juoman kuparin kautta',
        ],
        oikea: 0,
        fakta: 'Džezva on pieni pitkävartinen kuparipannu: kahvi keitetään '
          + 'hienoksi jauhettuna suoraan pannussa ja tarjotaan '
          + 'vaahtoineen. Baščaršijan seppäkujat ovat takoneet niitä '
          + 'vuosisatoja — kuparin kilke on kaupungin äänimaisema.',
      },
      aarre: 'Kupin kaksoispohjan välistä löytyi litteä kätkö. Emir '
        + 'piteli kuppia valossa: "Pohja on juotettu auki ja kiinni '
        + 'kahdesti — jälkimmäinen juotos ei ole sukuni kättä."',
    },
    {
      id: 'sofia',
      mykistetyt: [],
      kuva: 'assets/kohtaamiset/kohtaaminen-sofia.jpg',
      otsikko: 'Sofia — lähde joka kirjattiin sata vuotta',
      saapuminen: 'Lähde kumpusi kuumana kivialtaaseen keskellä kaupunkia, '
        + 'ja kannut jonottivat höyryssä. Join kupillisen ja kirjasin '
        + 'sen lämmön aamuteen viereen. Altaan reunalla mies ei '
        + 'täyttänyt kannua: hän kirjoitti lämpömittarin lukemia '
        + 'vihkoon. Nyökkäsimme niin kuin mittaajat nyökkäävät. Kun '
        + 'lähestyin, hän oli poissa. Vihko jäi — viimeisellä sivulla '
        + 'luki nimeni.',
      henkilo: 'Lähteenvartija Nadia täyttää kaupunkilaisten kannut kuumasta '
        + 'lähteestä ja tuntee jokaisen suonen kaupungin alla.',
      kohtaaminen: 'Höyryn keskellä Nadia laskee kauhansa. "Yksi rivi '
        + 'vihkoissamme on vieraalla käsialalla — isoisäsi kävi '
        + 'kirjaamassa lukemat sinä viikkona, jona kirjaaja makasi '
        + 'kuumeessa, ettei sarjaan tulisi aukkoa. Vastaa hänen '
        + 'kysymykseensä, niin näytän sen rivin."',
      kysymys: {
        q: 'Sofian lähteet houkuttivat rakentajia jo ennen bulgaareja. '
          + 'Ketkä rakensivat kylpylänsä näiden lähteiden ääreen?',
        vaihtoehdot: [
          'Roomalaiset',
          'Viikingit',
          'Foinikialaiset',
          'Ristiretkeläiset',
        ],
        oikea: 0,
        fakta: 'Roomalaisten Serdica oli kylpyläkaupunki, ja keisari '
          + 'Konstantinus viihtyi täällä niin, että sanoi: Serdica on '
          + 'minun Roomani. Lähteet kumpuavat keskustassa yhä, ja '
          + 'hanoista saa lämmintä vettä ilmaiseksi.',
      },
      aarre: 'Nadia avasi vihkon vieraan käsialan riville: sen kohdalle, '
        + 'sivujen väliin, oli ommeltu kätkö. Hän vertasi rivejä '
        + 'pitkään: "Joka kymmenes rivi on vahvistettu uudelleen — '
        + 'sama käsi, tuore muste."',
    },
    {
      id: 'bukarest',
      kuva: 'assets/kohtaamiset/kohtaaminen-bukarest.jpg',
      mykistetyt: [],
      otsikko: 'Bukarest — paimenen kirkonkello',
      saapuminen: 'Kirkonkello löi yhden, kun astuin portista, ja soittaja '
        + 'vannoi, ettei köydessä ollut kättä. Kirjasin lyönnin '
        + 'kellonaikoineen, sillä jonkun täytyi. Kirkon perusti tarun '
        + 'paimen, jonka nimeä kaupunki kantaa. Alttarikiveen on '
        + 'hakattu paimensauva; sauvan koukussa riippui luotilanka, '
        + 'päässä messinkipaino. Se ei kuulunut kuvaan. Se riippui '
        + 'siinä oikeasti.',
      henkilo: 'Kellonsoittaja Ana soittaa paimenen kirkon kelloa, jonka '
        + 'köyttä hänen sukunsa on vetänyt neljässä polvessa.',
      kohtaaminen: 'Kellotornin portailla Ana kiertää köyden ranteensa ympäri. '
        + '"Isoisäsi kysyi sukuni soittajalta, kenelle kello lyö '
        + 'silloin, kun kukaan ei soita. Vastaa, niin saat soittajan '
        + 'vastauksen — se on kulkenut suvussamme neljä polvea."',
      kysymys: {
        q: 'Kaupungin nimessä elää sana bucurie. Mitä se tarkoittaa '
          + 'romaniaksi?',
        vaihtoehdot: [
          'Iloa',
          'Kotia',
          'Lammasta',
          'Aamunkoittoa',
        ],
        oikea: 0,
        fakta: 'Tarun paimen Bucur pystytti majansa ja kirkkonsa joen '
          + 'törmälle, ja kaupunki peri hänen nimensä: Bucureşti. Sana '
          + 'bucurie tarkoittaa iloa — ilon kaupunki, sanovat asukkaat '
          + 'itse.',
      },
      aarre: 'Messinkipaino kiertyi auki, eikä sisällä ollut lyijyä vaan '
        + 'kätkö. Ana ripusti langan takaisin: "Soittaja vastasi: '
        + 'sille, joka on vielä matkalla — koukku on kulunut '
        + 'kiiltäväksi, mutta langassa ei ole päivääkään pölyä."',
    },
    {
      id: 'kiova',
      mykistetyt: [],
      otsikko: 'Kiova — merkki portin holvissa',
      saapuminen: 'Istuin piirtämään porttia kirjaani; pieni tyttö katsoi '
        + 'olkani yli ja pudisti päätään: kupoli oli väärän muotoinen. '
        + 'Hän oli oikeassa, ja minä korjasin — kartanpiirtäjä tietää, '
        + 'milloin tarkastaja on pätevä. Holvissa vartija näytti '
        + 'merkin, jota kukaan ei osaa lukea: kolme aaltoviivaa. '
        + 'Tunnistin ne heti — samalla merkillä isoisäni sulki '
        + 'kirjeensä.',
      /*
       * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut.
       *
       * HENKILÖ VAIHTUI JA KAANONIRIKE POISTUI (kuvaputken
       * tarinaehdotus 5.9.2026, Fablen päätös samana iltana klo 20:05
       * UTC: *"Hyväksytty sellaisenaan … Kiova (näyttelymestari Taras)
       * … Kaikki korjaavat samalla vanhan kaaren kaanonirikkeen
       * (suku/perillinen/lupaus)."*). Portinvartija Oksana odotti
       * suoraan sanoen perillistä: *"meille on opetettu, että tekijän
       * suku palaa lukemaan ne."* Se on kolmesta kielletystä
       * odotuksesta kirkkain (docs/isoisan-raamattu.md), ja se
       * poistuu kokonaan. Tilalla on museon näyttelymestari, jolle
       * piirroksen viiva on ammatillinen uteliaisuus eikä perintö.
       *
       * OTSIKKO SÄILYY (tehtävänannon rajaus): merkki portin holvissa
       * on yhä se, mistä kaari kertoo. SAAPUMINEN SÄILYY: se on
       * 1873:n oma havainto (tyttö korjaa kupolin muodon, vartija
       * näyttää kolme aaltoviivaa, Horatio tunnistaa oman isoisänsä
       * sinetin) eikä siinä ole nykyihmisen lupausta.
       *
       * MIKÄ VIELÄ POISTUI: kiven irrottaminen, tuore taltanjälki ja
       * väite ettei kiviseppiä ole käynyt vuosiin. Kätkö ei ole
       * muinaisessa muurissa vaan holvin viereisessä kivilaatikossa,
       * ja piirroksen viiva löytyy museon dokumentointikansiosta.
       * Vuoden 1982 suojapaviljonki ja pienoismalli pidetään erillään
       * vanhoista jäännöksistä: kumpikaan ei ole aarre-esine eikä
       * kumpaakaan väitetä 1873:n maisemaan.
       *
       * KYSYMYS SÄILYY ENNALLAAN (Fablen päätös: *"Säilytä Kultaisen
       * portin tehtävä → kaupungin juhlava pääportti"*).
       */
      henkilo: 'Näyttelymestari Taras rakentaa Kultaisen portin museoon uutta '
        + 'näyttelyä ja tuntee dokumentointikansiot ulkoa.',
      kohtaaminen: 'Museon käytävällä näyttelymestari Taras kannattelee '
        + 'portin pienoismallia lantiollaan. "Tämänkö alle? Tämä '
        + 'valmistui viime kuussa." Sitten hän katsoo piirroksen viivaa. '
        + '"Tuo ei ole mallista. Vastaa ensin, mihin portti alun perin '
        + 'tehtiin."',
      kysymys: {
        q: 'Kiovan Kultainen portti rakennettiin lähes tuhat vuotta '
          + 'sitten. Mikä sen tehtävä oli?',
        vaihtoehdot: [
          'Se oli muurien juhlava pääportti kaupunkiin',
          'Se oli tulliportti, jossa kauppiaiden kuormat punnittiin',
          'Se oli vankila, jonka holveihin suljettiin sotavangit',
          'Se oli kellotorni, joka kutsui kaupungin kokoon',
        ],
        oikea: 0,
        fakta: 'Jaroslav Viisas rakennutti portin 1000-luvulla '
          + 'Konstantinopolin mallin mukaan: se oli Kiovan muurien '
          + 'juhlava pääsisäänkäynti lähes tuhat vuotta. Porttitorniin '
          + 'nousi kirkko, jonka kullatut kupolit hehkuivat kauas — siitä '
          + 'nimi.',
      },
      aarre: 'Taras avasi dokumentointikansion: vanhassa arkkikopiossa oli '
        + 'sama viiva, ja reunamerkintä osoitti holvin viereiseen '
        + 'kivilaatikkoon. Rasia oli siellä. Kopion reunassa ei ole '
        + 'nimeä — vain kolme aaltoviivaa.',
    },
    {
      id: 'odessa',
      mykistetyt: [],
      otsikko: 'Odessa — kuitti väärältä puolelta',
      /*
       * Uudistus 5.9.2026, Fable tarkisti ja viimeisteli 22.10.
       *
       * KOKO KAARI VAIHDETTU (kuvaputken tarinaehdotus 5.9.2026,
       * Fablen päätös klo 19:05 UTC: *"Odessa — Iryna ja Solomiia
       * (hyväksytty yhdellä muutoksella)"*). Lyhdynsytyttäjä Fjodor,
       * peritty lyhtylupaus ja 192 askelman visa poistuvat.
       *
       * FABLEN MUUTOS ON TOTEUTETTU: kirjan takakannen tasku EI sisällä
       * kätköä, koska aarre löytyy aina kaupungin omasta kätköstä ja
       * pelin todellinen tulos voi olla tyhjä. Taskussa on kuitin
       * puuttuva puolisko ja siihen leimattu vaakamerkki, joka osoittaa
       * torin vanhan vaakahuoneen kohdalle — rasia löytyy sieltä. Tasku
       * on kertaluonteinen paljastus eikä se täyty uudelleen; tyhjän ja
       * väärän vastauksen repliikit ovat js/packs/kohtaamiset.js:ssä
       * eivätkä lupaa löytöä.
       *
       * SAAPUMISEN KAKSI VIRKETTÄ ovat Fablen hyväksymä merkintäehdotus
       * sanatarkasti ("Kuitti oli vapaasataman ajoilta, minua vanhempi.
       * Sen nurjalle puolelle oli kirjoitettu: Katso sidoksen alle.").
       * Ajoitus riittää: vapaasatama lakkasi 1859, joten kuitti on
       * varmasti Horatiota vanhempi ilman että syntymävuotta väitetään.
       *
       * KYSYMYS NOUSEE OPPITUNNISTA, joka on jo pelissä (js/packs/
       * fokusvirta-odessa.js: *"Sen sisällä tavaran sai purkaa,
       * varastoida, pakata uudelleen ja jalostaa maksamatta tullia"*,
       * *"Järjestely lakkautettiin huhtikuussa 1859"*). Sanatarkka
       * vastausrivi ei esiinny missään ennen visaa näkyvässä kentässä.
       * SEURAUS SPOILERILISTAAN: fokusvirta-odessa.js:n kieltolistan K6
       * ei ole enää askelmien määrä vaan vapaasataman tullietu — ks.
       * saman tiedoston 5.9.2026-huomautus.
       *
       * FAKTAT: pelin oma tarkistettu aineisto (fokusvirran oppitunti,
       * jonka lähteet on nimetty siellä) ja kuvaputken faktantarkistus
       * 5.9.2026 (Odessan kaupungin oma historiakatsaus: myöntäminen
       * 1817, toiminta 1819–1859, etu koski tuontitavaran vastaanottoa
       * ja varastointia). HUOM FABLELLE: kaupunkilehti (js/packs/
       * kulttuuri-kategoriat.js, odessa) sanoo vuosiksi 1819–1858,
       * fokusvirran oppitunti 1859 — tämä fakta seuraa oppituntia,
       * mutta ristiriita on olemassa jo ennen tätä luonnosta.
       */
      saapuminen: 'Sain vaihtorahan sijasta kuitin, ja myyjä katsoi minua '
        + 'kuin olisi maksanut liikaa. Kuitti oli vapaasataman ajoilta, '
        + 'minua vanhempi. Sen nurjalle puolelle oli kirjoitettu: Katso '
        + 'sidoksen alle. En tiedä kenelle ohje kuuluu, enkä keksinyt '
        + 'sidosta, jonka alle katsoa. Panin kuitin kirjani väliin.',
      henkilo: 'Torimyyjä Iryna punnitsee Privozilla samoilla vaaoilla '
        + 'kuin äitinsä; tytär Solomiia pitää laatikkoa.',
      kohtaaminen: 'Privozin katoksen alla torimyyjä Iryna pysäyttää '
        + 'vierivän melonin käsivarrellaan. Tytär Solomiia nauraa '
        + 'laatikkonsa takana. "Aarretta meidän torilta? Näytä se '
        + 'kuitti." Iryna kääntää paperin nurin. "Vastaa yhteen '
        + 'kysymykseen, niin luen tämän loppuun."',
      kysymys: {
        q: 'Irynan kädessä on kuitti Odessan vapaasataman ajoilta. Mitä '
          + 'vapaasataman tullietu tarkoitti?',
        vaihtoehdot: [
          'Laivojen ei tarvinnut ilmoittaa lastiaan viranomaisille',
          'Tuontitavaran sai vastaanottaa ja varastoida tullitta',
          'Kaikki tavarat olivat satamassa ilmaisia',
          'Satamaan sai saapua vain ulkomaisilla laivoilla',
        ],
        oikea: 1,
        fakta: 'Odessan vapaasatama alkoi vuonna 1819. Sen alueella '
          + 'tavaran sai ottaa vastaan ja varastoida maksamatta tullia, '
          + 'mutta tulli perittiin heti kun tavara vietiin rajan yli '
          + 'sisämaahan — ja raja oli kaivettu oja vartiopaikkoineen. '
          + 'Järjestely lakkautettiin huhtikuussa 1859, joten isoisän '
          + 'matkavuonna kuitti oli jo vanha paperi.',
      },
      aarre: 'Takakannen taskussa oli kuitin toinen puolisko. Merkki '
        + 'osoitti torin vanhaan vaakahuoneeseen, ja kynnyskiven alta '
        + 'tuli rasia. "Kannoit vihjettä mukanasi. Minä vain katsoin '
        + 'nurjalle puolelle." Isoisä ei löytänyt sitä.',
    },
    {
      id: 'moskova',
      mykistetyt: [],
      otsikko: 'Moskova — kello joka ei koskaan soinut',
      saapuminen: 'Kellotornin juurella seisoi kello, joka on liian suuri '
        + 'soimaan: sen kyljestä lohjenneen palan aukosta kävelin '
        + 'sisään kumartumatta. Kellon sisällä ääni muuttui — '
        + 'kuiskauskin kiersi pronssia pitkin täyden kierroksen. '
        + 'Sisäseinään oli kirjoitettu liidulla lukusarja. Se oli '
        + 'barometrini lukema — mutta kirjoitettu ennen kuin minä '
        + 'synnyin.',
      henkilo: 'Kellonvalajan jälkeläinen Vera tuntee suuren kellon pronssin '
        + 'jokaisen sävyn ja lohkeaman koko tarinan.',
      kohtaaminen: 'Kellon varjossa Vera koputtaa pronssia rystysillään. "Sukuni '
        + 'valoi kelloja, ja tämä on meidän surumme: kello, joka ei '
        + 'saanut ääntä. Isoisäsi kysyi, voiko soimaton kello silti '
        + 'kertoa jotain. Vastaa hänen kysymykseensä, niin näytän, mitä '
        + 'se kertoo."',
      kysymys: {
        q: 'Miten Tsaarinkello sai kylkeensä valtavan lohkeaman?',
        vaihtoehdot: [
          'Sammutusvesi osui kuumaan pronssiin, ja kylki halkesi',
          'Kello putosi nostettaessa ja iskeytyi kiveykseen',
          'Ensimmäinen pakkastalvi halkaisi jäähtyvän valun',
          'Liian raskas kieli murskasi kyljen ensimmäisellä lyönnillä',
        ],
        oikea: 0,
        fakta: 'Valun jäähtyessä 1737 syttyi tulipalo, ja sammutusvesi osui '
          + 'kuumaan pronssiin: kyljestä lohkesi 11 tonnin pala. Kello ei '
          + 'koskaan ehtinyt torniin eikä soinut kertaakaan — sen sisään '
          + 'voi nykyään kävellä.',
      },
      aarre: 'Lohkeaman kolosta löytyi kätkö. "Liitu ei pysy pronssissa '
        + 'vuotta — tämä on tältä talvelta", Vera sanoi.',
    },
    {
      id: 'pietari',
      mykistetyt: [],
      otsikko: 'Pietari — yö väärällä rannalla',
      /*
       * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut.
       *
       * KOKO KAARI UUSIKSI (kuvaputken tarinaehdotus 5.9.2026, Fablen
       * päätös klo 20:05 UTC: *"Hyväksytty sellaisenaan … Pietari
       * (huoltoteknikko Matvei) … Kaikki korjaavat samalla vanhan kaaren
       * kaanonirikkeen (suku/perillinen/lupaus)."*).
       *
       * SILLANHOITAJA DMITRI POISTUU: hänen repliikkinsä sanoi *"isoisäsi
       * pyysi sukuani pitämään sivun auki"*, eli Horatio jätti suvulle
       * vuosisataisen tehtävän. Se on kaksinkertainen rike — tunnistus ja
       * Horation pieni pyyntö, jonka Euroopan kiintiö (2/lauta: Pietari
       * ja Edinburgh) oli jo täynnä. Kiintiöstä vapautuu tässä yksi
       * paikka; sitä ei käytetä tässä erässä.
       *
       * MATVEI EI PERI MITÄÄN. Hän on huoltoteknikko, joka tarkastaa
       * teräsrakenteen ennen yönostoa, ei sukunsa jatkaja. Kuvaputken
       * rajaus toteutettu: ei suurta käsikampea eikä sillan avaamista
       * käsin, ei periytyvää sillanhoitoa, ei alkuperäiseksi väitettyä
       * vipua eikä lukitun kynän mysteeriä.
       *
       * KOMMELLUS (tarinakaari.md: vähintään yksi per erä) on tässä:
       * Horatio jää väärälle rannalle ja maksaa sen kokonaisella yöllä
       * rantakivellä. Siitä seuraa myös mittaus, joka pohjustaa visan.
       *
       * BEAT: tuore jälki, ja se on erän ainoa mysteerisäikeen koukku
       * Alppien röykkiön ohella (kiintiö: säiekoukku enintään joka
       * toisessa kaupungissa). Vaha on kevään jälki — kevätkulkija on
       * kaanonissa tahallinen lanka, ei kasauma.
       *
       * SPOILERIKURI: saapuminen mittaa maan pehmeyden mutta ei nimeä
       * paaluja eikä suota; vastausrivi ei esiinny missään ennen visaa
       * näkyvässä kentässä.
       *
       * VAIHTOEHTOJEN PITUUDET tasattu: oikea ei ole pisin.
       *
       * FAKTAT: Pietari perustettiin 1703 Nevan suiston soisille
       * saarille, rakennukset paalujen varaan ja katuja korotettiin
       * tulvia vastaan. Sama aineisto kuin fokusvirran oppitunnissa
       * (js/packs/fokusvirta-pietari.js) ja kaupunkilehden nostossa
       * "Kaupunki rakennettiin suolle".
       */
      saapuminen: 'Silta avattiin keskiyöllä laivoille, ja minä jäin väärälle '
        + 'rannalle. Valoon ei tässä kaupungissa voi luottaa: se ei suostu '
        + 'hämärtymään eikä siis varoita mistään. Vietin yön rantakivellä '
        + 'ja kirjasin ohi lipuvat laivat, kaksikymmentäyksi kappaletta. '
        + 'Aamulla painoin keppini rantapenkereeseen, ja se upposi '
        + 'kahdeksan tuumaa. Sen luvun pidin omana tietonani.',
      henkilo: 'Huoltoteknikko Matvei tarkastaa nostosillan teräsrakenteet '
        + 'ennen jokaista yönostoa.',
      kohtaaminen: 'Sillan alla huoltoteknikko Matvei kääntää työvalon pois '
        + 'silmistäsi. "Tänne ei kävellä. Mistä tuo kirja on?" Hän katsoo '
        + 'piirrosta pitkään ja lyhentää sävyään. "Minä huollan sitä, mikä '
        + 'liikkuu. Kerro sinä, minkä varaan tämä kaikki on pantu."',
      kysymys: {
        q: 'Matvei huoltaa siltaa, joka väistyy öisin joen tieltä. '
          + 'Millaiselle maalle koko kaupunki alun perin pystytettiin?',
        vaihtoehdot: [
          'Graniittiharjulle, joka louhittiin tasaiseksi ennen '
            + 'rakentamista',
          'Nevan suiston soille, maahan lyötyjen paalujen varaan',
          'Merestä nousseelle hiekkasärkälle, joka kuivui itsestään',
          'Jäätikön jättämälle kivikentälle',
        ],
        oikea: 1,
        fakta: 'Pietari Suuri perusti kaupunkinsa 1703 Nevan suiston soisille '
          + 'saarille: rakennukset pystytettiin maahan lyötyjen paalujen '
          + 'varaan ja katuja korotettiin tulvia vastaan. Siksi joki on '
          + 'kaupungin valtakatu — ja siksi sillat aukeavat öisin '
          + 'laivoille.',
      },
      aarre: 'Kätkö oli rantamuurin kiinnitysrenkaan alla, öljykankaaseen '
        + 'käärittynä. Matvei valaisi kangasta: "Tämä on vahattu uudelleen, '
        + 'ja vaha on tältä keväältä. Minulla on tänne ainoa avain."',
    },
    {
      id: 'helsinki',
      mykistetyt: [],
      otsikko: 'Helsinki — maa joka nousee merestä',
      saapuminen: 'Kuninkaanportin rappusilla poika onki ilman koukkua; '
        + 'siimassa riippui pelkkä paino. Mitä pyydät, kysyin. Pohjaa, '
        + 'poika vastasi — isä käski mitata, nouseeko maa täälläkin. '
        + 'Kirjasin hänen lukemansa vihkooni ja annoin hänelle '
        + 'lyijykynäni: mittamies tarvitsee oman. Maa nousee. Jonain '
        + 'päivänä se nostaa esiin sen, minkä minä jätin.',
      henkilo: 'Luotsi Aino ohjaa laivat linnoituksen salmien läpi ja tuntee '
        + 'jokaisen karin — myös ne, joita ei ole kartoissa.',
      kohtaaminen: 'Laiturilla Aino kiinnittää veneensä yhdellä solmulla. '
        + '"Isoisäsi maksoi yösijansa kartalla: hän piirsi salmet '
        + 'isoisoisälleni ulkomuistista. Yhdessä väylässä on vain '
        + 'kysymysmerkki, eikä sukuni ole sitä kulkenut. Vastaa, niin '
        + 'kuljemme sen tänään."',
      kysymys: {
        q: 'Suomenlinnan linnoitus rakennettiin aikanaan usealle '
          + 'saarelle. Kuinka monelle?',
        vaihtoehdot: [
          'Kuudelle',
          'Kolmelle',
          'Kahdelletoista',
          'Yhdelle ainoalle',
        ],
        oikea: 0,
        fakta: 'Linnoitus rakennettiin kuudelle saarelle, ja sen muurit, '
          + 'tykit ja telakka suojasivat koko kaupunkia mereltä. Nykyään '
          + 'saarilla asutaan, ja lautta kulkee vuoden ympäri.',
      },
      aarre: 'Kätkö nousi naarassa, rasvaan käärittynä. "Rasva on '
        + 'tuoretta — meressä se pilaantuu vuodessa", Aino sanoi.',
    },
    {
      id: 'tallinna',
      mykistetyt: [],
      otsikko: 'Tallinna — makea lääke',
      /*
       * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut.
       *
       * KOKO KAARI UUSIKSI (kuvaputken tarinaehdotus 5.9.2026, Fablen
       * päätös klo 20:05 UTC: *"Hyväksytty sellaisenaan … Tallinna (opas
       * Eve) … Kaikki korjaavat samalla vanhan kaaren kaanonirikkeen
       * (suku/perillinen/lupaus)."*).
       *
       * TORNIMESTARI KRISTJAN POISTUU: hänen repliikkinsä nimesi
       * vastatuulen päivän *"isoisäsi päiväksi"* — kaupungin kirjanpito
       * siis muisti Horation. Tilalla on nykyhetken opas Eve, joka ei
       * tiedä Horatiosta mitään ja lukee vanhaa havaintokirjaa
       * opastusaineistona.
       *
       * KUVAPUTKEN RAJAUS TOTEUTETTU: oppaan ei väitetä rasvaavan viirin
       * laakereita, eikä löytö tule sääviirin purkamisesta. Kätkö on
       * portaikon tasanteen seinäsyvennyksessä, jonne yleinen opastus
       * pysähtyy muutenkin.
       *
       * BEAT: **VANHA JÄLKI** — joku merkitsi kolon kaksitoista vuotta
       * ennen Horation kirjaa. Kaanoni (isoisan-raamattu.md) sanoo vanhan
       * jäljen puuttuvan Euroopasta kokonaan ja olevan tuoreen paras
       * vastapari; tämä erä tuo sen ensimmäisen kerran laudalle.
       *
       * AISTIKIERTO: maku (marsipaani) — erän ainoa makuhavainto.
       *
       * SAAPUMISEN FAKTAT pelin omasta tarkistetusta aineistosta
       * (js/packs/kulttuuri-kategoriat.js, tallinna/kaupunki, nosto
       * "Poltettuja siilejä ja marsipaania lääkkeeksi"): apteekki on
       * toiminut samassa talossa ainakin vuodesta 1422, ja sen vuoden
       * 1695 hinnastossa marsipaania myytiin sydänsuruun ja muistin
       * parantamiseen. Merkintä EI väitä marsipaania Tallinnassa
       * keksityksi — se on apteekkarin oma puhe, ja Horatio kirjaa sen
       * kuulemanaan. Kaupungin kirjoitusasu on pelin muun aineiston
       * mukaan "marsipaani".
       *
       * VAIHTOEHTOJEN PITUUDET tasattu: oikea ei ole pisin.
       *
       * FAKTAT VISASSA: Vana Toomas on kääntynyt raatihuoneen tornissa
       * vuodesta 1530; kevätjuhlan jousiammunta puisesta papukaijasta on
       * tarun oma yksityiskohta ja se kerrotaan taruna.
       */
      saapuminen: 'Ostin päänsärkyyni jauheen apteekista, joka on seissyt '
        + 'samalla torilla yli neljäsataa vuotta. Kaupan päälle sain palan '
        + 'marsipaania: se on täällä lääke, sanoi apteekkari — sydänsuruun '
        + 'ja muistin parantamiseen. Se on paras lääke, jonka olen '
        + 'apteekista saanut. Päänsärky hellitti vasta illalla, mutta '
        + 'annan kunnian marsipaanille.',
      henkilo: 'Opas Eve nousee raatihuoneen tornin portaat useita kertoja '
        + 'päivässä ja laskee jokaisen ryhmän myös alas.',
      kohtaaminen: 'Tornin kierreportaissa opas Eve tarttuu köysikaiteeseen '
        + 'ja väistää sinut ohitseen. "Kysy tuo uudestaan, kun saat '
        + 'hengityksen takaisin." Hän katsoo silmälasiensa yli ja alkaa '
        + 'nauraa. "Torni on täynnä yhtä tarua. Kerro sinä, minkä '
        + 'kilpailun Toomas voitti."',
      kysymys: {
        q: 'Eve kertoo tornin tarun: köyhä poika Toomas voitti kilpailun '
          + 'mutta jäi ilman palkintoa. Minkä kilpailun?',
        vaihtoehdot: [
          'Raatihuoneen shakkiturnauksen, jonka raatimiehet järjestivät',
          'Kevätjuhlan jousiammunnan puisesta papukaijasta',
          'Suuren kilpapurjehduksen Suomenlahden yli',
          'Painin, jossa kaatui raatimieskin',
        ],
        oikea: 1,
        fakta: 'Keväisin ammuttiin jousella puista papukaijaa tangon '
          + 'nokasta. Tarun mukaan köyhä poika Toomas osui ensimmäisenä, '
          + 'mutta palkinto kuului säätyläisille. Hänestä tehtiin lopulta '
          + 'jotain suurempaa: kaupungin vartija raatihuoneen torniin, '
          + 'jossa Vana Toomas on kääntynyt vuodesta 1530.',
      },
      aarre: 'Kätkö oli tasanteen seinäsyvennyksessä irtokiven takana. Eve '
        + 'piti kahta vanhaa kirjausta rinnakkain valoa vasten: "Tämä kolo '
        + 'on merkitty jo ennen kirjaasi. Kaksitoista vuotta ennen." '
        + 'Nimeä ei ole kummassakaan.',
    },
    {
      id: 'riika',
      mykistetyt: [],
      otsikko: 'Riika — kukko joka näki tuulen',
      saapuminen: 'Nostin hattuani kirkontornille, ja tuuli vei sen — '
        + 'satamassa sanottiin, että kukko otti maksun. Yhden kukon '
        + 'nokasta riippui ohut kettinki, jonka päässä välähti jotain '
        + 'pientä. Kirjasin torninvartijan tuomion: tuonne ei pääse — '
        + 'tikkaat eivät yllä, portaat päättyvät kellokammioon. Se '
        + 'riippui siellä silti. Ostin uuden hatun ja pidin sitä '
        + 'kädessäni.',
      henkilo: 'Kultaaja Ilze uudistaa tornikukkojen kultauksen, kun myrskyt '
        + 'ovat sen syöneet — sukunsa viidentenä.',
      kohtaaminen: 'Pajassaan Ilze silittää kultalehteä siveltimellä. "Kun '
        + 'sukuni kultasi kukon isoisäsi aikana, lehtien alle jäi '
        + 'jotain, mikä ei ollut kultaa. Se on siellä yhä. Vastaa hänen '
        + 'kysymykseensä, niin nousemme katsomaan."',
      kysymys: {
        q: 'Riian vanhat tornikukot maalattiin kahdella värillä: kylki '
          + 'kultaa, kylki mustaa. Miksi?',
        vaihtoehdot: [
          'Väristä näki kaukaa, mistä tuuli käy',
          'Musta kylki suojasi kultausta meren suolalta',
          'Kaksi kiltaa kustansi kumpikin oman kylkensä',
          'Tumma kylki ei houkutellut salamoita ukkosella',
        ],
        oikea: 0,
        fakta: 'Kukon kyljet olivat eriväriset, jotta tuulen suunnan saattoi '
          + 'lukea kadulta yhdellä vilkaisulla — kun kulta välkkyi '
          + 'satamaan päin, tuuli suosi purjehtijaa. Vanha uskomus antoi '
          + 'kukolle toisenkin viran: valvova kukko pitää pahan loitolla.',
      },
      aarre: 'Kultauksen alta, kukon pyrstön ontelosta, paljastui kätkö. '
        + 'Ilze punnitsi kettinkiä kämmenellään: "Tämä on ripustettu '
        + 'ylhäältä käsin — tikkaita ei ole kenelläkään paitsi '
        + 'minulla, ja ne ovat lukkojen takana."',
    },
    {
      id: 'vilna',
      mykistetyt: [],
      otsikko: 'Vilna — susi joka ulvoi sadan äänellä',
      saapuminen: 'Tornin kivijalassa, sammaleen alla, istui pieni rautainen '
        + 'susi — ja sen selkä oli lämmin, vaikka ilta oli kylmä. '
        + 'Oppaani aloitti tarinan suuriruhtinaan unesta, mutta minä '
        + 'kuuntelin puolella korvalla ja pidin sutta silmällä. Sen '
        + 'selässä on kohta, jonka vuosisadan kämmenet ovat '
        + 'kuluttaneet sileäksi. Kirjasin senkin ja silitin. Tapa on '
        + 'tarttuvaa.',
      henkilo: 'Yövartija Rasa kiertää vanhankaupungin kujat lyhtyineen ja '
        + 'tervehtii rautaista sutta joka kierroksella.',
      kohtaaminen: 'Rasa laskee avaimensa lyhdyn viereen. "Isoisäsi laski '
        + 'kätensä kuluneeseen kohtaan ja sanoi: silittäkää tekin — '
        + 'tämä kaupunki tarvitsee vielä onnensa. Suku on totellut, '
        + 'koska hän osui oikeaan. Vastaa, niin näytän, mitä suden '
        + 'alla on."',
      kysymys: {
        q: 'Suuriruhtinaan unessa ulvoi rautainen susi. Miten tietäjä '
          + 'tulkitsi unen?',
        vaihtoehdot: [
          'Kukkulalle nousisi mahtava kaupunki, jonka maine kantaisi '
            + 'kauas',
          'Sota lähestyisi, ja kaupungin muurit olisi valettava '
            + 'kylmästä raudasta',
          'Ruhtinaan suku hallitsisi metsää sata polvea',
          'Metsä oli pyhä, eikä kukkulalle saanut rakentaa',
        ],
        oikea: 0,
        fakta: 'Tietäjä Lizdeika luki unen: rautasusi oli kaupunki ja sen '
          + 'ulvonta maine, joka kiirisi maailmalle. Gediminas perusti '
          + 'Vilnan kukkulalle ja kutsui kirjeillään käsityöläisiä ja '
          + 'kauppiaita kaikkialta.',
      },
      aarre: 'Suden jalustan alta aukesi kolo, ja kolossa oli kätkö. '
        + 'Rasa nosti lyhtyään: "Kuluneessa kohdassa on tuore '
        + 'kädenjälki, leveämpi kuin minun — joku on silittänyt sutta '
        + 'tänä yönä, kierrosteni välissä."',
    },
    {
      id: 'tukholma',
      mykistetyt: [],
      otsikko: 'Tukholma — luukku talossa jossa ei ole ovea',
      saapuminen: 'Vanhassakaupungissa kuja kapeni niin, että hartiat hipoivat '
        + 'seiniä, ja portaat laskeutuivat sen pohjalle kuin kaivoon. '
        + 'Kujan kapeimmassa kohdassa seinään oli upotettu pieni '
        + 'rautaluukku — postiluukku talossa, jossa ei ole ovea. '
        + 'Työnsin siihen sormeni. Sisältä joku työnsi vastaan paperin: '
        + 'ei vielä.',
      henkilo: 'Lyhdynsytyttäjä Astrid hoitaa kapeimman kujan ainoaa lyhtyä '
        + 'ja tyhjentää ovettoman talon postiluukun — minne, sitä hän '
        + 'ei kerro.',
      kohtaaminen: 'Kujan portailla Astrid suojaa liekkiä kämmenellään. "Luukku '
        + 'on sukuni vastuulla: kirje viedään sille, jonka nimi '
        + 'paperissa lukee — vaikka odottaisi sata vuotta. Vastaa '
        + 'kirjan kysymykseen, niin annan sinulle sinun kirjeesi."',
      kysymys: {
        q: 'Tukholman vanhassakaupungissa on Ruotsin kapein kuja, Mårten '
          + 'Trotzigin kuja. Kuinka kapea se kapeimmillaan on?',
        vaihtoehdot: [
          'Alle metrin — noin 90 senttiä',
          'Noin kolme metriä — kärrytien verran',
          'Puolitoista metriä — kaksi kulkijaa rinnakkain',
          'Viisi metriä — tavallisen kadun leveys',
        ],
        oikea: 0,
        fakta: 'Kuja kapenee 90 senttiin: kaksi vastaantulijaa mahtuu ohi '
          + 'juuri ja juuri. Nimensä kuja sai kauppias Mårten '
          + 'Trotzigilta, jolla oli sen varrella talo ja paja.',
      },
      aarre: 'Kirjekuoressa oli kätkö ja isoisän käsialaa. Astrid sulki '
        + 'luukun ja epäröi: "Luukusta työnnettiin vastaus tänä '
        + 'aamuna — mutta talossa ei ole ovea, enkä minä tiedä, mistä '
        + 'sinne mennään sisään."',
    },
    {
      id: 'oslo',
      mykistetyt: [],
      otsikko: 'Oslo — laiva mullan alla',
      /*
       * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut.
       *
       * HENKILÖ VAIHTUI JA KAKSI KAANONIRIKETTÄ POISTUI (kuvaputken
       * tarinaehdotus 5.9.2026, Fablen päätös samana iltana klo 20:05
       * UTC: *"Oslo/Halden (Oskar): kaupunki pysyy Oslona ja
       * Jellhaugen kohtaamispisteenä (nykytila)."*). Talonpoika
       * Sigridin kaaressa oli molemmat kielletyt kuviot kerralla:
       * kumpu oli ollut *"hänen sukunsa vartiossa satoja vuosia"* ja
       * *"isoisäsi leiriytyi tähän kolmeksi yöksi ja lupasi, ettei
       * kaiva — sillä ehdolla suku näytti hänelle jotain."* Kumpikin
       * on poissa: Oskar tekee peltotöitä, tuntee maastonmuodot ja
       * suostuu kävelemään rajapyykille siksi, että piirros on
       * kiinnostava.
       *
       * KAUPUNKI PYSYY OSLONA. cityId on `oslo`, ja Halden on Oslon
       * fokusvirran kohtaamispiste (js/packs/fokusvirta-oslo.js,
       * Jellhaugen). Kaari ei nimeä pitäjää, joten kumpaakaan ei
       * tarvitse muuttaa.
       *
       * SAAPUMINEN SÄILYY: talonpojan kertoma taru, ruskea juusto
       * (laudan ainoa makuhavainto, tarinakaari.md luku 3) ja pihlajan
       * oksaan ilmestynyt tuore solmu ovat 1873:n omia havaintoja
       * eivätkä lupauksia. Aarreteksti nostaa solmun uudelleen, mutta
       * nyt kukaan ei omista sitä.
       *
       * KYSYMYS ON UUSI (Fablen päätös: *"Kysymyksen muotoilu 'hapeton
       * hautausmaa' hylätty; uusi kysymys ankkuroidaan Gjellestadin
       * peltoon."*). Vanha kysymys väitti, että kummuista nostetut
       * laivat ovat säilyneet lähes ehjinä — Gjellestadin laiva ei
       * ole, ja juuri se ero on nyt kysymys.
       *
       * FAKTAT (tarkistettu 5.9.2026):
       *   - en-Wikipedia "Gjellestad ship": *"Due to extensive fungus
       *     damage to the hull caused by field drainage, drought and
       *     exposure to the air, archaeologists called for an immediate
       *     dig to save the ship"*; *"lies 50 centimetres below the
       *     topsoil due to years of plowing"*; *"only parts of the keel
       *     have survived"*, ja säilyneistä nauloista tehdään
       *     3D-rekonstruktio.
       *   - Osebergin säilyminen: puutavara ja esineet säilyivät
       *     sinisaven ja kumpua muodostavan turvekerroksen välissä
       *     (World Archaeology, "Gustafson at Oseberg" — Gustafsonin
       *     kaivauskertomukseen perustuva selostus).
       *   - Gokstadin kumpu: Cambridgen Antiquity-lehden tutkimus
       *     ("Constructing and deconstructing the Gokstad mound")
       *     osoittaa, että hauta kaivettiin märkään siniseen
       *     savimaahan, mikä loi hapettomat olot; sciencenorway.no
       *     referoi saman.
       * Kaivausvuodet: Gokstad 1880, Oseberg 1904–1905, Gjellestad
       *     2020–2022 (en-Wikipedia, samat artikkelit).
       *
       * VAIHTOEHDOT: oikea (46 merkkiä) ei ole pisin — pisin on
       * mäntyväite (55). Yksikään väärä ei ole puolitosi: laivat ovat
       * tammea, Gjellestadin laivaa ei poltettu eikä kummun päällä ole
       * tietä.
       */
      saapuminen: 'Talonpoika löi talikon maahan: tämän kummun alla nukkuu '
        + 'laiva, airoineen, ja siinä päällikkö, jonka matka jatkuu '
        + 'yhä. Illalliseksi sain juustoa, ruskeaa kuin laivaterva ja '
        + 'makeaa kuin siirappi; kirjasin sen ilmiönä ja pyysin '
        + 'lisää. Aamulla kummun laella, ainoan pihlajan oksassa, '
        + 'riippui purjelangasta punottu solmu. Tuore.',
      henkilo: 'Maanviljelijä Oskar ajaa heinää Gjellestadin pelloilta ja '
        + 'tuntee maastonmuodot, joita kartta ei näytä.',
      kohtaaminen: 'Pellon laidalla maanviljelijä Oskar pudottaa heinäpaalin '
        + 'kärryyn ja pyyhkii otsaansa. "Aarretta? Tuossa pellossa on jo '
        + 'yksi." Koira vie hänen hanskansa. Sitten hän katsoo piirrosta '
        + 'uudestaan, vakavana. "Vastaa yksi kysymys, niin kävellään '
        + 'rajapyykille."',
      kysymys: {
        q: 'Osebergin ja Gokstadin laivat makasivat tiiviissä sinisavessa '
          + 'ja nousivat kummuistaan lähes ehjinä. Gjellestadin laivasta '
          + 'oli jäljellä enää köli. Miksi?',
        vaihtoehdot: [
          'Peltoa oli kuivatettu ja kynnetty vuosikymmeniä',
          'Laiva oli rakennettu männystä eikä tammesta kuten toiset',
          'Laiva oli poltettu ennen hautaamista',
          'Kummun päälle oli rakennettu kivinen tie',
        ],
        oikea: 0,
        fakta: 'Osebergissa ja Gokstadissa puu makasi vettyneen sinisaven ja '
          + 'turvekerroksen välissä: happi ei päässyt sinne, eivätkä '
          + 'lahottajat siksi eläneet. Gjellestadissa kumpu oli aikaa '
          + 'sitten tasoitettu ja pelto ojitettu, ja laiva makasi puoli '
          + 'metriä kyntökerroksen alla. Sieni söi puun — nauloista ja '
          + 'kölistä riitti silti aineistoa mallinnukseen.',
      },
      aarre: 'Rajapyykin juuressa, kiviröykkiön alla, odotti rasia — '
        + 'kumpuun koskematta. Pihlaja seisoo yhä pellon laidassa, ja '
        + 'oksassa on purjelangasta punottu solmu. Oskar katsoi sitä '
        + 'pitkään. "Minä en ole sitonut tuota."',
    },
    {
      id: 'kobenhavn',
      mykistetyt: [],
      otsikko: 'Kööpenhamina — valot palavat kahdesti',
      /*
       * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut.
       *
       * HENKILÖ, PAIKKA JA KYSYMYS VAIHTUIVAT (omistajan palaute
       * kuvaan: *"Vaihda henkilö ja paikka"*; Fablen päätös 5.9.2026
       * klo 20:05 UTC: *"Kööpenhamina: valitsen vaihtoehdon (b) —
       * Tivoli ja karusellinhoitaja Freja, koska omistaja pyysi sekä
       * henkilön että paikan vaihtoa; kysymys vaihtuu Tivolista
       * nousevaksi."*). Sadunkertoja Karen, Nyhavnin laituri, suvun
       * peritty arkku ja katkeava käsikirjoitus ovat poissa. Kukaan ei
       * ole saanut mitään sadunkirjoittajalta eikä kukaan muista
       * Horatiota.
       *
       * SAAPUMINEN ON KIRJOITETTU UUSIKSI, koska koko kaupungin
       * kohtaamispaikka siirtyi Nyhavnista Tivoliin (fokusvirran
       * kohtaamispiste siirretään samalla). Tivoli avattiin 15.8.1843,
       * joten se on isoisän matkavuonna 30 vuotta vanha — nykyistä
       * laitetta ei siirretä 1873:n maisemaan, vaan merkintä puhuu
       * lyhdyistä, järvestä ja soittokunnasta. Erän itseironia-annos on
       * tässä: kartanpiirtäjä mittaa väärin, koska jalat noudattavat
       * valssia.
       *
       * KYSYMYS EI OLE HORATION JÄTTÄMÄ eikä se toista lehden omia
       * tehtäviä. Kööpenhaminan lehden AARTEEN AVAUS kysyy Nyhavnin
       * kaivamisen syytä ja fokusvirran Tivoli-syvennys sitä, millä
       * perusteella puisto sai luvan (js/packs/fokusvirta-kobenhavn.js)
       * — kumpikaan ei kysy vuoristoradasta. Andersen-kysymys jäi pois,
       * koska se ei nouse Tivolin iltavuorosta; Andersenin aineisto
       * elää yhä lehden Sadut-sivulla.
       *
       * FAKTAT (tarkistettu 5.9.2026): en-Wikipedia "Tivoli Gardens"
       * (avattu 15.8.1843; maailman toiseksi vanhin yhä toimiva
       * huvipuisto, vanhempi on Dyrehavsbakken samassa maassa; järvi on
       * vanhan vallihaudan jäänne) ja en-Wikipedia "Rutschebanen
       * (Tivoli Gardens)" (valmistui 1914; *"one of the world's oldest
       * wooden roller coasters that is still operating today"*;
       * *"An operator controls the ride by braking so that it does not
       * gain too much speed during descent"* — jarrumies matkustaa
       * junan mukana). Ei väitetä, että jarrumies olisi ollut junassa
       * jo isoisän aikaan: rata on 41 vuotta merkintää nuorempi.
       *
       * VAIHTOEHDOT: oikea (30 merkkiä) on lyhin, pisin on väärä (46).
       */
      saapuminen: 'Puiston lyhdyt paloivat kahdesti: kerran ilmassa, kerran '
        + 'järvessä, ja laskin ne molemmat ennen kuin tajusin virheen. '
        + 'Sytyttäjät kiersivät vastapäivään. Mittasin järven leveyden '
        + 'askelin ja sain väärän luvun sekin: soittokunta soitti '
        + 'kolmijakoista, ja jalkani noudattivat tahtia eivätkä minua. '
        + 'Kirjasin luvut silti.',
      henkilo: 'Karusellinhoitaja Freja sulkee Tivolin musiikkikarusellin joka '
        + 'ilta ja tuntee puiston laitteet ikäjärjestyksessä.',
      kohtaaminen: 'Musiikkikarusellin luona karusellinhoitaja Freja kääntää '
        + 'avainta lukkoon. "Nyt se on kiinni. Aarreko?" Hän nyökkää '
        + 'puiston toiselle laidalle, jossa puinen vuoristorata kolisee '
        + 'vielä. "Tuossa junassa matkustaa yksi ihminen liikaa. Sano '
        + 'miksi."',
      kysymys: {
        q: 'Freja osoittaa puiston vanhaa puista vuoristorataa: sen '
          + 'jokaisessa junassa matkustaa yksi ylimääräinen ihminen. '
          + 'Mitä hän tekee?',
        vaihtoehdot: [
          'Laskee matkustajat ennen jokaista mäkeä',
          'Soittaa kelloa, jotta puisto kuulee junan',
          'Jarruttaa junaa käsin laskuissa',
          'Tarkastaa liput kesken matkan',
        ],
        oikea: 2,
        fakta: 'Rutschebanen valmistui 1914 ja on yksi maailman vanhimmista '
          + 'yhä ajossa olevista puisista vuoristoradoista. Jarrumies '
          + 'matkustaa junan mukana ja hidastaa sitä laskuissa käsin. '
          + 'Tivoli itse avattiin 15. elokuuta 1843, ja vanhempi yhä '
          + 'toimiva huvipuisto on vain yksi: Dyrehavsbakken samassa '
          + 'maassa.',
      },
      aarre: 'Freja avasi karusellin alla olevan varastoluukun: käytöstä '
        + 'poistettujen kulissien takaa löytyi rasia. "Nämä on '
        + 'numeroitu. Tuo ei ole." Numeroimattomassa kulississa on järvi '
        + 'ja lyhdyt — yhtä monta kuin isoisän kirjassa.',
    },
    {
      id: 'lappi',
      mykistetyt: [],
      otsikko: 'Lappi — tuli joka juoksi taivaalla',
      saapuminen: 'Taivas syttyi. Vihreä liekki juoksi taivaanrannasta toiseen '
        + 'ja kaartui pääni ylle kuin joki, joka olisi noussut '
        + 'virtaamaan taivaalle. Poromies sanoi tulen olevan ketun '
        + 'työtä: tunturissa juokseva kettu pyyhkäisee hännällään '
        + 'lumesta kipinöitä. Tulen alla hangella kulki jälkiä. Ne '
        + 'eivät olleet ketun. Ne olivat suksien — ja ne päättyivät '
        + 'keskelle aukeaa.',
      henkilo: 'Poromies Aslak lukee hangen jäljet kuin kirjaa ja seuraa '
        + 'tokkaansa tulien alla talvet läpeensä.',
      kohtaaminen: 'Nuotiolla Aslak kaataa kuksaan kuumaa. "Isoisäsi hiihti '
        + 'sukuni matkassa kolme päivää ja kysyi tulista joka ilta. '
        + 'Viimeisenä iltana hän kysyi yhden, johon kukaan ei osannut '
        + 'vastata. Vastaa '
        + 'siihen, niin hiihdämme aamulla jäljet päähän asti."',
      kysymys: {
        q: 'Mikä revontulet tieteen mukaan sytyttää?',
        vaihtoehdot: [
          'Auringon hiukkaset, jotka törmäävät ilmakehän kaasuihin',
          'Kuunvalo, joka taittuu yläilmojen jääkiteistä',
          'Salamat, jotka jäävät talven ajaksi loimottamaan yläilmoihin',
          'Jäätyneen meren heijastus taivaankannessa',
        ],
        oikea: 0,
        fakta: 'Auringosta virtaa hiukkasia, jotka Maan magneettikenttä '
          + 'ohjaa napaseuduille; törmätessään ilmakehän happeen ja '
          + 'typpeen ne saavat taivaan hehkumaan vihreänä ja punaisena. '
          + 'Tarun tulikettu sai silti pitää nimen: revontulet.',
      },
      aarre: 'Jälkien päässä kinos kätki tuohikääreen. Aslak osoitti '
        + 'hankea: "Toiset jäljet alkavat tästä — eilen."',
    },
    {
      id: 'tromssa',
      mykistetyt: [],
      otsikko: 'Tromssa — yö jota ei tullut',
      /*
       * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut.
       *
       * KOKO KAARI UUSIKSI (kuvaputken tarinaehdotus 5.9.2026, Fablen
       * päätös klo 20:05 UTC: *"Hyväksytty sellaisenaan … Tromssa
       * (kahvilanpitäjä Kjell) … Kaikki korjaavat samalla vanhan kaaren
       * kaanonirikkeen (suku/perillinen/lupaus)."*).
       *
       * SATAMAVAHTI INGRID POISTUU: hänen repliikkinsä oli kaaren
       * raskain rike — isoisoisä sytytti lyhdyn sinä yönä, jona *"isoisäsi
       * laiva lähti"*, ja *"suku sytyttää sen yhä"*. Siinä on kolme asiaa
       * kerralla: Horation tunnistus, perillisen odotus ja vuosisatainen
       * ylläpidetty perinne, jonka kiintiö (1/lauta, Prahan kynttilä) oli
       * jo käytetty. Kaikki kolme poistuvat.
       *
       * KUVAPUTKEN RAJAUS TOTEUTETTU: viikoittainen öljylyhty ja luvaton
       * laivan koneistoon meno ovat poissa. Kjell tuntee vanhat
       * laivakuvat omana harrastuksenaan, ei vartiointilupauksesta, ja
       * kätkö on laiturin kivijalassa yleisellä paikalla.
       *
       * BEAT: hiljainen loppu, jossa jää auki yksi asia (sama käsiala
       * kahdessa eri musteessa). Erän lämpö- ja hengähdysannos on tässä
       * (tarinakaari.md: vähintään yksi kumpaakin per erä).
       *
       * ÄÄNIPROFIILI: puhelias. Kjell puhuu ensin lokista ja vasta sitten
       * kysyy kysymyksensä.
       *
       * VAIHTOEHTOJEN PITUUDET: oikea on lyhyiden joukossa, pisin on
       * väärä.
       *
       * FAKTAT: Tromssan 1800-luvun lempinimi "Pohjolan Pariisi";
       * jäämerenpyynti ja kauppa toivat kaupunkiin rahaa ja seuraelämää.
       * Sama aineisto kuin kaupungin omassa lehtinostossa.
       */
      saapuminen: 'Aurinko ei laskenut. Se vieri taivaanrannan yli kuin '
        + 'kolikko, joka ei putoa, ja minä mittasin, kuinka alas se '
        + 'suostuu: kämmenen leveyden merestä. Satama teki työtä kello '
        + 'kahdelta yöllä. Kukaan ei toivottanut hyvää yötä, koska yötä ei '
        + 'ollut, ja minä jäin laiturille seisomaan kuin olisin unohtanut '
        + 'jotakin.',
      henkilo: 'Kahvilanpitäjä Kjell myy kahvia sataman kärrystä yötä '
        + 'päivää ja kerää vanhoja laivapostikortteja.',
      kohtaaminen: 'Laiturin päässä kahvilanpitäjä Kjell läimäyttää kämmenen '
        + 'tiskiin ja hätistää lokin. "Jos etsit aarretta, aloita tuosta '
        + 'varkaasta." Hän kaataa sinulle kahvia kysymättä. "Tällä '
        + 'kaupungilla oli 1800-luvulla lempinimi, jota etelässä ei '
        + 'uskottu. Sano se."',
      kysymys: {
        q: 'Kjell sanoo, ettei etelässä uskottu Tromssan 1800-luvun '
          + 'lempinimeä. Mikä se oli?',
        vaihtoehdot: [
          'Pohjolan Pariisi',
          'Valaanpyytäjien pääkaupunki',
          'Kaamoksen kaupunki',
          'Jäämeren portti',
        ],
        oikea: 0,
        fakta: 'Tromssaa alettiin 1800-luvulla kutsua Pohjolan Pariisiksi: '
          + 'pieni arktinen satama yllätti etelän vieraat kahviloillaan, '
          + 'muodillaan ja seuraelämällään. Jäämeren pyynti ja kauppa '
          + 'toivat tänne rahaa ja maailman — ja keskiyön aurinko piti '
          + 'sataman hereillä kellon ympäri.',
      },
      aarre: 'Kätkö oli laiturin kivijalassa, kiinnitysrenkaan alla. Kjell '
        + 'asetti keräilemänsä postikortin rasian viereen: "Sama käsiala. '
        + 'Eri muste." Kello oli kaksi yöllä ja täysin valoisaa, enkä '
        + 'osannut lähteä.',
    },
    {
      id: 'islanti',
      mykistetyt: [],
      otsikko: 'Islanti — kello jota lähde ei lue',
      /*
       * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut.
       *
       * KOKO KAARI UUSIKSI (kuvaputken tarinaehdotus 5.9.2026, Fablen
       * päätös klo 20:05 UTC: *"Hyväksytty sellaisenaan … Islanti (opas
       * Einar) … Kaikki korjaavat samalla vanhan kaaren kaanonirikkeen
       * (suku/perillinen/lupaus)."*).
       *
       * TILALLINEN BJÖRK POISTUU: hänen repliikkinsä sanoi vaienneen
       * oppaan olleen *"isoisoisäni"*, eli kohtaaminen tunnisti Horation
       * ja teki suvusta hänen tarinansa jatkajan. Tilalla on nykyhetken
       * opas Einar, joka ei tunne Horatiota lainkaan ja lukee kirjaa
       * pelkkänä vanhana karttana.
       *
       * KUVAPUTKEN RAJAUS TOTEUTETTU: kuumaan lähteeseen ei kosketa.
       * Kiven alta kaivaminen, purkauksen ajoittaminen ja kalkin
       * raaputtaminen ovat poissa; kätkö on reitin lähtöpisteessä
       * turvallisella puolella, kuten ehdotus vaati. Vuonna 2024
       * uudistettua ritiläreittiä ei siirretä vuoteen 1873 — Horatio
       * kulkee omassa maastossaan ja Einar nykyisellä polulla.
       *
       * ERÄN ITSEIRONIA-ANNOS (tarinakaari.md, kiintiö 1/erä) on tässä:
       * Horatio kellottaa lähdettä kuin junaa ja kirjaa itse, että se on
       * sivun ainoa kohta, jossa hän oli väärässä.
       *
       * BEAT: ajaton arvoitus. Kevään raaputusjälki (tuore) poistui,
       * koska erässä on jo kaksi tuoretta jälkeä (Pietari, Alpit).
       *
       * KYSYMYS pidettiin (Fablen ja kuvaputken linjaus), mutta se
       * ankkuroitiin Einarin omaan lauseeseen, jotta se nousee
       * kohtauksesta eikä roiku irrallaan. Oikea vastaus on lyhin
       * vaihtoehto — pisin on väärä (tarinakaari.md, kysymyssääntö 2).
       *
       * FAKTAT: Geysir islannin verbistä geysa, "syöstä"; Geysir itse on
       * ollut pitkiä aikoja hiljaa ja naapuri Strokkur purkautuu
       * muutaman minuutin välein. Tarkistettu 5.9.2026.
       */
      saapuminen: 'Maa hengitti höyryä, ja minä kellotin lähteen kuin junan: '
        + 'kolme minuuttia, sitten yksitoista, sitten ei mitään. Merkitsin '
        + 'väliajat vihkooni kahteen sarakkeeseen, kunnes oppaani '
        + 'naurahti — lähde ei lue kelloa, herra. Piirsin polut karttaan '
        + 'niin tarkasti kuin taisin. Sarakkeet ovat sivun ainoa kohta, '
        + 'jossa olin täysin väärässä.',
      henkilo: 'Opas Einar vie ryhmiä Haukadalurin höyryävällä reitillä ja '
        + 'oikaisee väärät käsitykset ystävällisesti mutta heti.',
      kohtaaminen: 'Ritiläpolun laidalla opas Einar vetää tuulen kääntämän '
        + 'hupun takaisin paikalleen. "Tällä säällä sinä etsit aarretta?" '
        + 'Hän kääntää kirjasi kartan tuulelta suojaan ja katsoo sitä '
        + 'toisen kerran. "Tämä laakso antoi yhden sanan joka kielelle. '
        + 'Sano se sana."',
      kysymys: {
        q: 'Einar sanoo laakson antaneen yhden sanan joka kielelle. Mikä '
          + 'sana Haukadalurin kuumasta lähteestä levisi maailmalle?',
        vaihtoehdot: [
          'Geysir',
          'Kraatteri',
          'Fumaroli',
          'Vulkaani',
        ],
        oikea: 0,
        fakta: 'Nimi tulee islannin verbistä geysa, syöstä. Haukadalurin '
          + 'Geysir purkautui parhaimmillaan kymmenien metrien korkeuteen, '
          + 'ja siitä tuli kaikkien maailman purkautuvien kuumien lähteiden '
          + 'yleisnimi. Geysir itse on ollut pitkiä aikoja hiljaa — '
          + 'naapuri Strokkur hoitaa nykyään näytöksen muutaman minuutin '
          + 'välein.',
      },
      aarre: 'Kätkö oli reitin lähtöpisteessä, vanhan opastaulun jalustan '
        + 'alla. Einar vertasi karttaa maastoon kauan: "Polku on siirretty '
        + 'kolmesti." Merkki osuu silti — enkä keksi, mistä sen olisi '
        + 'voinut tietää.',
    },
    {
      id: 'aden',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Aden — kaupunki maljan pohjalla',
      saapuminen: 'Höyrylaiva pysähtyi hiiltä ottamaan, ja minä nousin '
        + 'maihin kaupunkiin, joka on rakennettu kuin jättiläisen maljan '
        + 'pohjalle: mustat kalliot kiersivät sitä kehänä joka puolelta. '
        + 'Vanhat kivisäiliöt porrastuivat rinteeseen odottamassa '
        + 'sadetta, jota tulee kerran vuodessa. Alimman säiliön reunalla '
        + 'istui mies, joka ei odottanut sadetta. Hän odotti minua.',
      henkilo: 'Vesisäiliöiden vartija Said mittaa Tawilan säiliöiden veden, '
        + 'kuten hänen sukunsa on mitannut kauan ennen höyrylaivoja.',
      kohtaaminen: 'Säiliön portailla Said laskee mittakeppinsä. "Isoisäsi '
        + 'kysyi, minne kaupunki kätkee sateensa — ja jätti kysymyksen '
        + 'niille, jotka tulevat perässä. Vastaa siihen, niin näytän '
        + 'missä vesi on syvintä."',
      kysymys: {
        q: 'Adenin vanha kaupunki on rakennettu erikoiseen paikkaan. '
          + 'Minne?',
        vaihtoehdot: [
          'Sammuneen tulivuoren kraatteriin',
          'Kelluville lautoille lahden päälle',
          'Maan alle kaivettuihin holveihin',
          'Jokisuiston saarille',
        ],
        oikea: 0,
        fakta: 'Adenin vanhin osa, nimeltäänkin Crater, lepää sammuneen '
          + 'tulivuoren sisällä. Kalliot suojaavat kaupunkia, ja sadevesi '
          + 'kerättiin talteen kivisiin Tawilan säiliöihin — sadetta kun '
          + 'tulee vain kourallinen vuodessa.',
      },
      aarre: 'Kätkö odotti kuivan säiliön pohjakivien alla. Said katsoi '
        + 'mittakeppiään: "Tämä säiliö on ollut tyhjä sukupolven — '
        + 'mutta pohjalla oli tuoreita kengänjälkiä ennen sinun '
        + 'jälkiäsi."',
    },
    {
      id: 'ankara',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Ankara — vuohien valkoinen kulta',
      saapuminen: 'Markkinoilla punnittiin villaa, joka hohti kuin silkki — '
        + 'angoravuohen villaa, jota ei saa muualta maailmasta. Yhden '
        + 'paalin sinettivahaan oli painettu barometrin kuva. Kauppias '
        + 'sanoi, että paali on maksettu ja sinetöity kolmekymmentä '
        + 'vuotta sitten. Laskin vuodet kahdesti ja kirjasin: silloin '
        + 'minä olin poika, eikä minulla ollut barometria.',
      henkilo: 'Villankehrääjä Elif kehrää mohairia samalla värttinällä kuin '
        + 'äitinsä ja tämän äiti, ja tuntee jokaisen paalin tarinan.',
      kohtaaminen: 'Markkinakatoksen alla Elif punnitsee lankavyyhtiä. '
        + '"Sinetöity paali on suvullamme tallessa — maksaja käski '
        + 'antaa sen sille, joka tietää, mistä villan nimi tulee. '
        + 'Vastaa, niin avaan sinetin."',
      kysymys: {
        q: 'Angoravillaa saatiin vuosisatojen ajan vain näiltä '
          + 'ylängöiltä, vaikka moni yritti murtaa yksinoikeuden. Miksi?',
        vaihtoehdot: [
          'Vuohien maastavienti oli pitkään kielletty, ja muualla niiden '
            + 'villa karheni',
          'Villa kehrättiin salaisella tavalla, jonka vain suvut '
            + 'tunsivat',
          'Kauppiaat sekoittivat muualla villaan silkkiä, ja se '
            + 'paljastui aina',
          'Ylängön ruoho värjäsi villan hohtavaksi itsestään',
        ],
        oikea: 0,
        fakta: 'Angoravuohi kantaa Ankaran vanhaa nimeä Angora. '
          + 'Sulttaanit kielsivät pitkään elävien vuohien viennin, ja '
          + 'kun laumoja lopulta salakuljetettiinkin, hienoin villa '
          + 'syntyi yhä Anatolian ylängön ilmastossa — mohair pysyi '
          + 'vuosisatoja tämän seudun aarteena.',
      },
      aarre: 'Paalin sisällä, villan keskellä, odotti kätkö. Elif kiersi '
        + 'narun sormelleen: "Solmu on merimiehen käsialaa, jota ei '
        + 'opita ylängöllä — kuka sitoi paalin, joka ei ole koskaan '
        + 'käynyt satamassa?"',
    },
    {
      id: 'bagdad',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Bagdad — kirjurien kaupunki',
      saapuminen: 'Tigrisin rannalla kirjurit istuivat rivissä, ja ruokokynät '
        + 'rapisivat kuin sade. Kuvernööri ehti ennen lähtöään '
        + 'perustaa lehden ja hevosraitiotien; vanhin kirjuri kopioi '
        + 'silti kirjaa käsin. Kirjan reunassa oli minun barometrini '
        + 'lukemia, vuosien takaa. Kysyin, kuka kirjan toi. Kirjuri ei '
        + 'nostanut katsettaan: tuoja ei kerro nimeään — noutaja '
        + 'kertoo.',
      henkilo: 'Kirjuri Yusuf kopioi vanhoja käsikirjoituksia Tigrisin '
        + 'rannalla, kuten hänen sukunsa on kopioinut kalifien ajoista.',
      kohtaaminen: 'Yusuf laskee ruokokynänsä telineeseen. "Kirja '
        + 'odottaa noutajaansa, ja noutaja tunnetaan vastauksesta. '
        + 'Isoisäsi valitsi kysymyksen itse — se kertoo, millaiseksi '
        + 'kalifi tämän kaupungin aikoinaan rakensi. Vastaa, niin '
        + 'kirja on sinun."',
      kysymys: {
        q: 'Kalifi al-Mansur perusti Bagdadin 700-luvulla harvinaisen '
          + 'muotoiseksi. Millainen kaupungista rakennettiin?',
        vaihtoehdot: [
          'Täysin pyöreä, ja sitä kutsuttiin Rauhan kaupungiksi',
          'Tähdenmuotoinen, jossa oli seitsemän sakaraa',
          'Neliö, jonka kulmat osoittivat ilmansuuntiin',
          'Puolikuun muotoinen joen mutkassa',
        ],
        oikea: 0,
        fakta: 'Al-Mansurin Bagdad oli pyöreä kaupunki, jonka virallinen '
          + 'nimi oli Madinat as-Salam, Rauhan kaupunki. Kehämuurien '
          + 'keskellä olivat palatsi ja moskeija, ja portteja oli neljä — '
          + 'yksi kuhunkin ilmansuuntaan.',
      },
      aarre: 'Kirjan selkämyksen ontelossa odotti kätkö. Yusuf sulki '
        + 'kannen varovasti: "Kun kopioin reunamerkinnät kymmenen '
        + 'vuotta sitten, viimeinen lukema puuttui — nyt se on siinä, '
        + 'ja muste on tuoretta."',
    },
    {
      id: 'damaskos',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Damaskos — kangas joka sai kaupungin nimen',
      saapuminen: 'Katetussa basaarissa kangaspakat hohtivat, ja kutoja käänsi '
        + 'pakkaa valossa: kuvio vaihtui himmeästä hohtavaksi kuin '
        + 'vesi. Tämä kangas kantaa kaupunkimme nimeä, hän sanoi. '
        + 'Pyysin nähdä vanhimman pakan. Sen sisään oli kudottu '
        + 'kirjaimet, joita kukaan paikalla ollut ei ollut kutonut: H. '
        + 'F.',
      henkilo: 'Damastikutoja Amina kutoo kangasta, jonka kuvio näkyy vain '
        + 'valoa vasten, samoilla loimilla kuin sukunsa satoja vuosia.',
      kohtaaminen: 'Kangaspuiden ääressä Amina pysäyttää sukkulan. "Kirjaimet '
        + 'kudottiin sukuni puilla, mutta tilaaja jätti maksun ja '
        + 'kysymyksen. Vastaa hänen kysymykseensä, niin leikkaan pakan '
        + 'auki."',
      kysymys: {
        q: 'Damaskos on antanut nimensä kuuluisalle kankaalle. Mikä '
          + 'siinä on erikoista?',
        vaihtoehdot: [
          'Kuvio on kudottu kankaaseen niin, että se näkyy valoa vasten',
          'Kangas on kudottu kullasta ja hopeasta',
          'Se on maailman ohuin kangas, jonka läpi voi lukea',
          'Kangas vaihtaa väriä lämpimässä',
        ],
        oikea: 0,
        fakta: 'Damasti on kangasta, jonka kuvio syntyy kudonnasta '
          + 'itsestään: kiiltävä ja himmeä pinta vaihtavat paikkaa, joten '
          + 'kuvio välkehtii valossa. Damaskos oli kuuluisa myös '
          + 'damaskoteräksestään — kaupungin nimi kulki maailmalle kahta '
          + 'tietä.',
      },
      aarre: 'Pakan sydämestä löytyi litteä kätkö. Amina laski kankaan '
        + 'hitaasti: "Joku on avannut kankaan ja kutonut sen kiinni — '
        + 'taidolla, jota en opettanut kenellekään."',
    },
    {
      id: 'doha',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Doha — purjeet jotka odottavat tuulta',
      saapuminen: 'Rannassa dhow-veneiden purjeet oli laskettu, ja '
        + 'purjeentekijä ompeli katoksensa alla suurta kolmiopurjetta. '
        + 'Hän kertoi, että veneet lähtevät kun tuuli kääntyy — ja '
        + 'tuuli kääntyy täällä kellontarkasti, kaksi kertaa vuodessa. '
        + 'Purjeen helmaan oli ommeltu pieni tasku. Se ei kuulu '
        + 'purjeeseen, sanoi tekijä. Se kuuluu sille, joka osaa kysyä '
        + 'tuulesta.',
      henkilo: 'Purjeentekijä Jassim ompelee dhow-veneiden purjeet käsin ja '
        + 'lukee tuulet taivaalta ennen kuin ne saapuvat.',
      kohtaaminen: 'Jassim vetää langan kireälle. "Isoisäsi istui tässä '
        + 'katoksessa ja kysyi tuulista, joilla veneet kulkevat Intiaan '
        + 'ja takaisin. Hän jätti saman kysymyksen taskuun. Vastaa, '
        + 'niin ratkon ompeleen."',
      kysymys: {
        q: 'Dhow-kauppalaivat purjehtivat Arabiasta Intiaan ja takaisin '
          + 'ilman konetta. Mikä teki edestakaisen matkan mahdolliseksi?',
        vaihtoehdot: [
          'Monsuunituulet, jotka puhaltavat puoli vuotta yhteen ja puoli '
            + 'vuotta toiseen suuntaan',
          'Airot ja soutajat — isoimmissa laivoissa souti sata miestä '
            + 'vuoroissa',
          'Meriväylä, jossa virta kulkee suurta ympyrää ja kantaa laivat '
            + 'molempiin suuntiin',
          'Purjeet, jotka voi kääntää niin, että laiva etenee suoraan '
            + 'vastatuuleen',
        ],
        oikea: 0,
        fakta: 'Monsuuni puhaltaa Intian valtamerellä puoli vuotta kohti '
          + 'Intiaa ja kääntyy sitten vastakkaiseksi. Dhow-kauppiaat '
          + 'purjehtivat menomatkan yhdellä monsuunilla, odottivat '
          + 'käännettä ja palasivat toisella — aikataulu oli taivaassa.',
      },
      aarre: 'Purjetaskussa odotti öljykankainen kätkö. Jassim silitti '
        + 'ommelta: "Tasku on ommeltu minun pistoillani, mutta lanka '
        + 'on vahattu tavalla, jota käytti vain isoisäni — ja hän '
        + 'kuoli ennen kuin minä opin ompelemaan."',
    },
    {
      id: 'dubai',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Dubai — lahti joka ylitetään soutaen',
      saapuminen: 'Khorin suulla helmenpyytäjien veneet lepäsivät rinnakkain, '
        + 'ja abra-lautturit soutivat väkeä rannalta toiselle '
        + 'muutamalla vedolla. Lautturini pysähtyi keskellä lahtea ja '
        + 'antoi veneen kellua. Tässä kohtaa, hän sanoi, isäni isä '
        + 'pudotti kerran airon — ja nosti sen sijaan jotakin muuta. '
        + 'Hän ei sanonut mitä. Hän katsoi minua kuin olisin tiennyt.',
      henkilo: 'Abra-lautturi Rashid soutaa Khorin yli kymmeniä kertoja '
        + 'päivässä ja tuntee lahden pohjan paremmin kuin sen rannat.',
      kohtaaminen: 'Rashid lepuuttaa airoja keskellä lahtea. "Isäni isä '
        + 'nosti tästä pohjasta lippaan airon sijaan eikä avannut sitä '
        + 'koskaan. Se ei ole meidän, hän sanoi — me vain soudamme sen '
        + 'yli. Lipas on kulkenut veneessä siitä päivästä, ja tarina sen '
        + 'mukana. Sinä olet ensimmäinen, joka kysyy lippaasta. Vastaa '
        + 'sen kysymykseen."',
      kysymys: {
        q: 'Dubain lahdella sukellettiin helmiä kauan ennen öljyä. Miten '
          + 'helmenpyytäjä pääsi pohjaan asti?',
        vaihtoehdot: [
          'Painokiven avulla, pelkän hengityksensä varassa',
          'Pitkää ruokoputkea pitkin pinnalta käsin ilmaa hengittäen',
          'Nahkaisen sukelluskellon sisällä istuen',
          'Kahluuhousuissa laskuveden aikaan',
        ],
        oikea: 0,
        fakta: 'Helmensukeltaja laskeutui pohjaan painokiven varassa, '
          + 'sieraimet sulkijalla suljettuina, ja poimi simpukoita niin '
          + 'kauan kuin henki riitti — minuutin tai kaksi kerrallaan. '
          + 'Köysimies veti hänet ylös nykäisystä. Lahden helmet '
          + 'elättivät kaupunkia sukupolvien ajan.',
      },
      aarre: 'Lipas nousi veneen pohjalaudan alta, kuivana ja '
        + 'rasvattuna. Vasta laiturissa Rashid sanoi: "Isäni isä ei '
        + 'osannut lukea — silti hän rasvasi lippaan joka kuukausi, '
        + 'niin kuin olisi tiennyt, että sen sisällä on paperia."',
    },
    {
      id: 'halab',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Halab — saippua joka kypsyy vuosia',
      saapuminen: 'Saippuamestarin holvissa tornit kohosivat kattoon asti: '
        + 'vihreitä kuutioita kuivumassa, vanhimmat jo '
        + 'pähkinänruskeita. Tämä erä odottaa kolmatta vuottaan, '
        + 'mestari sanoi, hyvä saippua ei kiirehdi. Yhden tornin '
        + 'huipulla oli kuutio, johon oli painettu vieras leima. Se erä '
        + 'täyttää tänä vuonna sata vuotta, hän sanoi. Sitä ei myydä. '
        + 'Sitä vartioidaan.',
      henkilo: 'Saippuamestari Karim keittää kaupungin kuulua saippuaa '
        + 'samassa pajassa kuin sukunsa, ja jokainen erä leimataan suvun '
        + 'merkillä.',
      kohtaaminen: 'Karim nostaa satavuotiaan kuution hyllyltä. "Kuution jätti '
        + 'matkalainen, joka kirjoitti kääreeseen ilmanpuntarinsa '
        + 'lukeman ja sanoi: saippua on valmis, kun joku lukee tämän '
        + 'luvun ääneen ja tietää, mitä se tarkoittaa. Kysymys koskee '
        + 'sitä, mikä tekee saippuastamme kuuluisan. Vastaa."',
      kysymys: {
        q: 'Halabin kuuluisa saippua on väriltään ulkoa ruskea mutta '
          + 'sisältä vihreä. Mikä öljy antaa sille vihreän sydämen?',
        vaihtoehdot: [
          'Laakerinmarjaöljy',
          'Ruusuöljy',
          'Seesamöljy',
          'Mantelipuun pihka',
        ],
        oikea: 0,
        fakta: 'Halabin saippua keitetään oliiviöljystä ja '
          + 'laakerinmarjaöljystä. Se kypsyy varastossa kuukausia tai '
          + 'vuosia: pinta hapettuu ruskeaksi, mutta sisus pysyy '
          + 'laakerinvihreänä — leikkauspinta paljastaa aidon saippuan.',
      },
      aarre: 'Kuution sisään oli valettu pieni kätkö. Karim punnitsi '
        + 'puolikkaita kädessään: "Sata vuotta hyllyllä, mutta vaha '
        + 'kätkön ympärillä on pehmeää — joku on avannut ja valanut '
        + 'sen uudelleen tällä vuosikymmenellä."',
    },
    {
      id: 'isfahan',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Isfahan — kaiku joka lauloi loppuun',
      saapuminen: 'Sillan holveissa laulettiin iltaa vastaan, ja laulu '
        + 'kiersi kaaresta kaareen kuin ei tahtoisi loppua. '
        + 'Kaupungista on sanonta, jonka ymmärtää vasta täällä — enkä '
        + 'kirjoita sitä tähän. Yhden holvin kiveen oli piirretty '
        + 'ympyrä ja sen sisään viiva — isoisäni piirsi saman sinne, '
        + 'minne aikoi palata. Lauloin holviin puolikkaan säkeen. '
        + 'Kaiku lauloi sen loppuun.',
      henkilo: 'Sillanvartija Farhad tuntee Khajun sillan '
        + 'kaksikymmentäkolme holvia ja tietää, missä holvissa laulu '
        + 'kaikuu kauneimmin.',
      kohtaaminen: 'Farhad koputtaa holvin kylkeä. "Merkin tekijä istui tässä '
        + 'holvissa iltaan asti ja jätti vartijalle kysymyksen — se '
        + 'kulkee suvussamme kuin laulu. Vastaa siihen, niin näytän '
        + 'mitä holvin kivi kätkee."',
      kysymys: {
        q: 'Isfahanista on vanha persialainen sanonta. Miten se kuuluu?',
        vaihtoehdot: [
          'Isfahan on puoli maailmaa',
          'Isfahan on tuhannen sillan kaupunki',
          'Kaikki tiet vievät Isfahaniin',
          'Isfahanissa aurinko ei laske',
        ],
        oikea: 0,
        fakta: 'Sanonta Esfahan nesf-e jahan — Isfahan on puoli maailmaa — '
          + 'syntyi, kun kaupunki oli Persian loistava pääkaupunki: '
          + 'kupolit, sillat ja maailman suurimpiin kuuluva tori saivat '
          + 'matkalaiset tuntemaan, että puoli maailmaa oli koossa '
          + 'yhdessä kaupungissa.',
      },
      aarre: 'Holvin irtokiven takana odotti kätkö. Farhad pani kiven '
        + 'paikalleen ja lauloi hiljaa yhden säkeen: "Kaiku vastasi '
        + 'väärästä holvista — joku istuu iltaisin siellä, missä ei '
        + 'pitäisi olla ketään."',
    },
    {
      id: 'izmir',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Izmir — viikunoiden satama',
      saapuminen: 'Satamassa tuoksui auringossa kuivattu hedelmä: viikunakoreja '
        + 'kannettiin laivoihin jonossa, joka ei katkennut koko '
        + 'päivänä. Kauppias avasi yhden korin ja kaivoi sen pohjalta '
        + 'paperiin käärityn viikunan, kovan kuin kivi. Tämä on '
        + 'kulkenut varastossamme kauemmin kuin minä, hän sanoi. '
        + 'Paperissa lukee, että se avataan, kun oikea ostaja kysyy '
        + 'oikean hinnan.',
      henkilo: 'Viikunakauppias Selin punnitsee sadon ja tuntee jokaisen '
        + 'laakson hedelmät maun perusteella.',
      kohtaaminen: 'Selin pyörittää kivikovaa viikunaa sormissaan. "Oikea hinta '
        + 'ei ole rahaa — se on vastaus. Isoisäsi jätti kysymyksen, '
        + 'joka koskee sitä, mistä satamamme tunnetaan. Vastaa."',
      kysymys: {
        q: 'Izmirin satamasta laivattiin 1800-luvulla koko maailmaan '
          + 'herkkua, josta kaupunki tunnettiin. Mitä?',
        vaihtoehdot: [
          'Viikunoita ja rusinoita',
          'Appelsiineja ja sitruunoita',
          'Taateleita ja manteleita',
          'Oliiveja ja hunajaa',
        ],
        oikea: 0,
        fakta: 'Izmir — silloiselta nimeltään Smyrna — oli viikunoiden ja '
          + 'rusinoiden suursatama. Smyrnan viikuna oli oma käsitteensä '
          + 'maailman markkinoilla, ja sadonkorjuun aikaan satama eli '
          + 'hedelmäkoreista.',
      },
      aarre: 'Paperikääreen sisällä ei ollut viikunaa vaan kätkö, '
        + 'viikunan muotoiseksi vahattu. Selin haisteli käärettä: '
        + '"Vaha on tuoretta mehiläisvahaa — sata vuotta varastossa '
        + 'maannut kääre tuoksuisi pölyltä."',
    },
    {
      id: 'jerusalem',
      lauta: 'middleeast',
      luennat: false,
      nimi: 'Elias',
      otsikko: 'Jerusalem — portti joka on kiinni',
      saapuminen: 'Kävelin vanhan kaupungin muurin ympäri ja laskin portit: '
        + 'seitsemästä kuljettiin sisään ja ulos, kahdeksas oli '
        + 'muurattu umpeen kauan sitten. Muuratun portin edessä seisoi '
        + 'mies, joka ei mennyt minnekään. Hän piirsi keppinsä kärjellä '
        + 'hiekkaan merkkejä ja pyyhki ne pois ennen kuin ehdin lukea. '
        + 'Yhden hän jätti: kolme aaltoviivaa. Isoisäni tapa sulkea '
        + 'kirje.',
      henkilo: 'Portinvartijoiden sukua oleva Elias tuntee muurin jokaisen '
        + 'kiven ja kertoo porttien tarinat niille, jotka osaavat '
        + 'kysyä.',
      kohtaaminen: 'Elias nojaa keppiinsä muurin varjossa. "Suvussani sanotaan: '
        + 'se joka tuntee portit, tuntee kaupungin. Isoisäsi tunsi ne '
        + 'kaikki — myös sen, josta ei kuljeta. Vastaa hänen '
        + 'kysymykseensä, niin kerron, mitä hän tänne jätti."',
      kysymys: {
        q: 'Vanhan kaupungin porteilla on nimiä kuten Damaskoksen portti '
          + 'ja Jaffan portti. Mistä nimet tulevat?',
        vaihtoehdot: [
          'Kaupungeista, joihin portista lähtevä tie aikanaan johti',
          'Rakentajamestareista, jotka muurasivat kunkin portin valmiiksi',
          'Kauppiaista, jotka pitivät puotiaan portin pielessä',
          'Ilmansuunnista vanhan karavaanikompassin mukaan',
        ],
        oikea: 0,
        fakta: 'Portti nimettiin määränpään mukaan: Damaskoksen portista '
          + 'lähti tie kohti Damaskosta, Jaffan portista satamaan '
          + 'Jaffaan. Kahdeksas portti, Kultainen portti, on ollut '
          + 'muurattuna vuosisatoja — ainoana siitä ei kuljeta '
          + 'minnekään.',
      },
      aarre: 'Kätkö oli muurin juurella, irtokiven takana kolmen '
        + 'aaltoviivan kohdalla. Elias katsoi merkkiä kauan: '
        + '"Suvussani portinvartijat ovat piirtäneet nämä viivat '
        + 'hiekkaan niin kauan kuin muistan — sinä olet ensimmäinen, '
        + 'jonka kohdalla ne tarkoittivat jotakin."',
    },
    {
      id: 'kairo',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Kairo — joen mitta',
      saapuminen: 'Rodan saarella laskeuduin portaita alas kaivoon, jonka '
        + 'keskellä seisoo kahdeksankulmainen pylväs. Siihen on '
        + 'kaiverrettu viivat: joka vuosi tulvan noustessa katsottiin, '
        + 'mille viivalle Niili yltää. Vartija näytti viivan, jolle '
        + 'vesi nousi sinä vuonna, kun muuan matkalainen kävi '
        + 'mittaamassa sen itse. Viivan viereen on raaputettu pieni '
        + 'risti. Se ei kuulu asteikkoon.',
      henkilo: 'Nilometrin vartija Fatima lukee joen mittaa, kuten hänen '
        + 'sukunsa on lukenut niin kauan kuin tulvia on kirjattu.',
      kohtaaminen: 'Fatima laskee kätensä kaiverretulle viivalle. "Tämän '
        + 'viivan mittasi ja kaiversi matkalainen omin käsin sinä '
        + 'vuonna, jona joki nousi korkeammalle kuin kertaakaan suvun '
        + 'kirjoissa. Pidämme sen puhtaana, koska se oli oikeassa '
        + 'silloin kun kaikki muut mitat valehtelivat. Hän jätti '
        + 'kysymyksen: vastaa, niin kerron miksi juuri tämä viiva."',
      kysymys: {
        q: 'Rodan saaren nilometrillä mitattiin Niilin tulvan korkeutta. '
          + 'Miksi mittaus oli niin tärkeä?',
        vaihtoehdot: [
          'Tulvan korkeus kertoi, kuinka hyvä sato oli tulossa',
          'Sillä laskettiin laivojen syväys satamaan',
          'Se näytti, milloin krokotiilit tulevat',
          'Sillä mitattiin juomaveden puhtautta',
        ],
        oikea: 0,
        fakta: 'Niilin tulva toi pelloille veden ja lietteen. Nilometrin '
          + 'viivoilta luettiin, riittäisikö tulva satoon: matala vesi '
          + 'tiesi nälkää, sopiva runsautta — ja lukeman mukaan '
          + 'määrättiin jopa verot.',
      },
      aarre: 'Ristin kohdalta, asteikon takaa, aukesi kapea kolo ja '
        + 'siinä kätkö. Fatima pyyhki viivan huolella: "Viime kuussa '
        + 'risti oli himmeä, nyt se on terävä — joku on syventänyt '
        + 'sitä."',
    },
    {
      id: 'kapadokia',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Kapadokia — kaupunki maan alla',
      saapuminen: 'Laakso oli täynnä kivitorneja kuin jättiläisen pelilauta, ja '
        + 'talot oli koverrettu suoraan pehmeään kiveen. Isäntäni vei '
        + 'minut kellariinsa, avasi jauhosäkkien takaa matalan oven — '
        + 'ja sen takana portaat jatkuivat alas, ja taas alas. '
        + 'Kokonainen kaupunki nukkui maan alla. Portaiden '
        + 'kymmenennellä askelmalla paloi kynttilä. Isäntä vannoi, '
        + 'ettei hän ollut sytyttänyt sitä.',
      henkilo: 'Meryem pitää valoa sukunsa käytävässä alakaupungissa ja '
        + 'tietää, mitkä käytävät johtavat maan alle ja mitkä '
        + 'umpikujaan.',
      kohtaaminen: 'Meryem suojaa kynttilää kädellään portaikossa. '
        + '"Alakaupungin käytävä pelasti sukuni kerran, kun maan päällä '
        + 'ei ollut turvaa — siitä asti olemme pitäneet sen päässä '
        + 'valoa, ettei kukaan eksyisi pimeään. Isoisäsi laskeutui valon '
        + 'luo ja jätti sinne kysymyksen tästä kaupungista. Vastaa."',
      kysymys: {
        q: 'Kapadokiassa on kokonaisia kaupunkeja maan alla. Kuinka '
          + 'syviä suurimmat ovat?',
        vaihtoehdot: [
          'Monta kerrosta — syvimmät ulottuvat kymmenien metrien '
            + 'syvyyteen',
          'Yhden kerroksen — matalia kellareita viinin ja viljan '
            + 'säilytykseen',
          'Ne ovat vain tarinaa — luolista on löytynyt pelkkiä paimenten '
            + 'suojia',
          'Pohjattomia — syvimpien käytävien päähän ei ole koskaan '
            + 'päästy',
        ],
        oikea: 0,
        fakta: 'Derinkuyun kaltaiset maanalaiset kaupungit porrastuvat monta '
          + 'kerrosta pehmeään tuffikiveen — syvimmillään kymmeniä '
          + 'metrejä. Niissä oli asuinhuoneita, talleja, kaivoja ja '
          + 'pyöreät kivioven, jotka vieritettiin käytävän tukkeeksi.',
      },
      aarre: 'Käytävän päässä, kiviovien takana, odotti kätkö ja '
        + 'sammunut lyhty. Meryem käänsi lyhtyä valossa: "Tällaisia '
        + 'ei ole taottu isoisoäitini aikojen jälkeen — joku on '
        + 'kulkenut täällä syvemmälle kauan ennen kirjasi omistajaa."',
    },
    {
      id: 'kuwait',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Kuwait — kaupunki joka juo merestä tuodun joen',
      saapuminen: 'Rannalla lankut taipuivat höyryssä veneen kaarelle ilman '
        + 'yhtäkään piirustusta — mitta oli mestarin silmässä. '
        + 'Satamaan saapui vene lastinaan makeaa jokivettä ruukuissa. '
        + 'Join kupillisen ja kirjasin hinnan: enemmän kuin kahvista. '
        + 'Vesiveneen kylkeen oli maalattu merkki, jonka maalari kuoli '
        + 'aikoja sitten. Merkki maalataan silti uudelleen joka '
        + 'kevät.',
      henkilo: 'Veneenveistäjä Nasser rakentaa dhow-veneitä silmämitalla, '
        + 'kuten isänsä ja tämän isä, eikä yksikään kaari ole koskaan '
        + 'väärä.',
      kohtaaminen: 'Nasser laskee höylän penkille. "Matkalainen huomasi '
        + 'ruukun, joka itki vettä — merellä se olisi maksanut '
        + 'miehille janon. Suku maalaa hänen merkkiään omasta '
        + 'tahdostaan: se käskee katsoa ruukut. Vastaa, niin vien '
        + 'sinut veneelle, johon merkki maalattiin ensin."',
      kysymys: {
        q: 'Kuwaitin rannalla veistettiin valtameriveneitä, vaikka '
          + 'aavikkomaassa ei kasva puuta. Mistä lankut saatiin?',
        vaihtoehdot: [
          'Tiikki tuotiin purjehtien Intian rannikolta asti',
          'Aavikon akaasioista, jotka kasvavat vain keitailla',
          'Vuorilta pohjoisesta, jokia pitkin uitettuna',
          'Meren ajopuista, jotka virta toi rannoille',
        ],
        oikea: 0,
        fakta: 'Dhow-veneiden tiikki ja kookospuu tuotiin Intian '
          + 'rannikolta samoilla kauppamatkoilla, joilla veneet kulkivat '
          + 'muutenkin. Aavikkokaupunki rakensi valtamerilaivastonsa '
          + 'tuodusta puusta — ja veistäjän silmä korvasi piirustukset.',
      },
      aarre: 'Kätkö oli veistämön vanhimman veneen kölilaudan alla. '
        + 'Nasser silitti lankkua: "Isäni sanoi aina, että tässä '
        + 'veneessä on yksi naula enemmän kuin hän on lyönyt — '
        + 'kumpikaan meistä ei ole löytänyt sitä."',
    },
    {
      id: 'luxor',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Luxor — laakso joka vartioi kuninkaitaan',
      saapuminen: 'Auringon laskiessa vuoret lännessä hehkuivat kullanvärisinä, '
        + 'ja lautturi sanoi: tuolla nukkuvat kuninkaat, eikä kukaan '
        + 'tiedä kaikkia heidän oviaan. Rannassa poika myi savikuvia ja '
        + 'katsoi minua kauan. Sinä olet se, jonka kirja tietää, hän '
        + 'sanoi lopulta ja juoksi pois. En ollut näyttänyt kirjaa '
        + 'kenellekään.',
      henkilo: 'Laakson vartijasuvun Ahmed tuntee länsirannan polut ja '
        + 'tietää, mitkä tarinat kerrotaan ääneen ja mitkä kuiskataan.',
      kohtaaminen: 'Ahmed istuu polun laidalle ja puhuu hiljaa. "Suvullani on '
        + 'laaksossa salaisuuksia, ja yksi niistä ei ole meidän — se '
        + 'jätettiin meille säilytettäväksi. Ehto on vastaus '
        + 'kysymykseen, joka koskee kuninkaiden piiloja. Vastaa."',
      kysymys: {
        q: 'Uuden valtakunnan faaraot eivät enää rakentaneet pyramideja '
          + 'vaan hautautivat Kuninkaiden laaksoon. Miksi?',
        vaihtoehdot: [
          'Kalliohaudat oli helpompi kätkeä ryöstäjiltä kuin pyramidit',
          'Pyramidien rakentajat olivat unohtaneet taitonsa',
          'Laakso oli lähempänä pääkaupunkia',
          'Kivi loppui pyramidien rakentamisesta',
        ],
        oikea: 0,
        fakta: 'Pyramidi näkyi kauas ja kertoi ryöstäjille, missä aarteet '
          + 'olivat — ja lähes kaikki ryöstettiin. Uuden valtakunnan '
          + 'faaraot hakkasivat hautansa piiloon Kuninkaiden laakson '
          + 'kallioihin, ja sisäänkäynnit peitettiin.',
      },
      aarre: 'Kätkö odotti polun varressa kivenkolossa, jonka reunat '
        + 'olivat tuhansien hiekkamyrskyjen pyöristämät. "Tämä paikka '
        + 'on ollut kätkö kauan ennen kirjasi omistajaa — hän ei '
        + 'valinnut sitä, hän löysi sen", Ahmed sanoi.',
    },
    {
      id: 'masqat',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Masqat — kahden linnoituksen satama',
      saapuminen: 'Satama aukeni kallioiden välistä kuin portti, ja sen '
        + 'molemmilla puolilla vartioi vanha linnoitus, kumpikin omalla '
        + 'jyrkänteellään. Kalastaja souti minut poikki ja sanoi: '
        + 'linnoitukset eivät ole koskaan nukkuneet yhtä aikaa — kun '
        + 'toinen pimenee, toisessa syttyy valo. Katsoin illalla. Se '
        + 'piti paikkansa.',
      henkilo: 'Satamavahti Salim kirjaa saapuvat purret ja tietää, kummassa '
        + 'linnoituksessa valo palaa minäkin yönä.',
      kohtaaminen: 'Salim sulkee kirjansa laiturilla. "Valojen '
        + 'vuorottelu on satamien oma sopimus, vanhempi kuin yksikään '
        + 'kirjuri: kun toinen linnoitus pimenee, toinen valvoo. '
        + 'Isoisäsi seisoi tällä laiturilla kolme iltaa ja kirjasi, '
        + 'kumpi valo syttyi ensin. Lähtiessään hän jätti kysymyksen — '
        + 'vastaa siihen, niin viemme vastauksen valolle yhdessä."',
      kysymys: {
        q: 'Masqatin satamaa vartioi kaksi vanhaa linnoitusta '
          + 'vastakkaisilla kallioilla. Miksi satama oli niin tarkasti '
          + 'vartioitu?',
        vaihtoehdot: [
          'Se oli suojaisa syväsatama Intian kauppareitin varrella, '
            + 'jonka moni halusi itselleen',
          'Sataman pohjassa uskottiin lepäävän uponneen kultalaivan, '
            + 'jota linnoitukset vartioivat',
          'Linnoituksista tähystettiin valaita, joiden saapuminen avasi '
            + 'pyyntikauden',
          'Se oli ainoa satama, josta pääsi jokiväylää pitkin sisämaan '
            + 'ylängöille',
        ],
        oikea: 0,
        fakta: 'Masqatin kalliosatama on harvoja suojaisia syvänteitä Intian '
          + 'valtameren kauppareitillä, ja siitä kilpailtiin vuosisatoja. '
          + 'Portugalilaiset rakensivat 1500-luvulla satamakallioille '
          + 'Mirani- ja Jalali-linnoitukset, jotka vartioivat lahtea yhä.',
      },
      aarre: 'Kätkö oli vartiovalon lyhtykomerossa, öljyruukun takana. '
        + 'Salim nosti lyhtyä: "Öljyä kuluu joka yö yhtä paljon, '
        + 'mutta viime kuussa ruukku hupeni kahden edestä — joku '
        + 'muukin on pitänyt valoa."',
    },
    {
      id: 'medina',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Medina — karavaanien kaivo',
      saapuminen: 'Kaupunkiin itseensä en kulkenut — se on pyhiinvaeltajien '
        + 'kaupunki, eikä minun tieni vie porteista sisään. Leiriydyin '
        + 'karavaanipaikalle sen ulkopuolelle, missä kaivon ympärillä '
        + 'lepäsi satoja kameleita. Vedennostaja kertoi matkalaisista, '
        + 'jotka olivat tulleet Damaskoksesta asti nelikymmentä päivää '
        + 'erämaan halki. Kaivon kivessä oli nimikirjaimia monella '
        + 'kielellä. Kaksi niistä tunsin.',
      henkilo: 'Vedennostaja Omar juottaa karavaanien kamelit kaivolla, '
        + 'jonka äärellä hänen sukunsa on palvellut kulkijoita '
        + 'sukupolvien ajan.',
      kohtaaminen: 'Omar kiertää köyden vinssille. "Kirjaimet hakkasi kiveen '
        + 'matkalainen, joka ei mennyt kaupunkiin vaan istui kaivolla '
        + 'kolme päivää kyselemässä karavaaneista. Hän jätti '
        + 'kysymyksensä minun isoisälleni. Vastaa."',
      kysymys: {
        q: 'Pyhiinvaeltajat matkasivat Damaskoksesta Medinaan kauan '
          + 'ennen rautatietä. Miten pitkä erämaataival tehtiin?',
        vaihtoehdot: [
          'Kamelikaravaaneissa, joissa kulki tuhansia ihmisiä yhdessä',
          'Jokilaivoilla, jotka nousivat virtaa niin pitkälle kuin vettä '
            + 'riitti',
          'Härkävankkureilla, jotka kulkivat vanhaa kivettyä valtatietä',
          'Jalkaisin ja yksin — jokainen kulkija omaa polkuaan tähtien '
            + 'mukaan',
        ],
        oikea: 0,
        fakta: 'Pyhiinvaellus kulki suurina kamelikaravaaneina: tuhansia '
          + 'ihmisiä, kameleita ja vesivarastoja eteni yhdessä noin '
          + 'neljäkymmentä päivää Damaskoksesta Medinaan. Karavaani oli '
          + 'kuin liikkuva kaupunki, jota kaivot ja levähdyspaikat '
          + 'rytmittivät.',
      },
      aarre: 'Kätkö oli kaivon kivijalassa, nimikirjainten alla '
        + 'irtokiven takana. Omar laski kiven paikalleen: "Kaivolla '
        + 'käy tuhansia käsiä vuodessa, ja silti juuri tämä kivi on '
        + 'aina ollut tiukassa — eilen se oli löysällä."',
    },
    {
      id: 'mekka',
      lauta: 'middleeast',
      luennat: false,
      nimi: 'Bilal',
      otsikko: 'Mekka — suunta jota koko maailma katsoo',
      saapuminen: 'Jiddan satamassa laivat purkivat pyhiinvaeltajia; '
        + 'kaikilla oli sama määränpää, jonne minun tieni ei vie — '
        + 'pyhä kaupunki vuorten takana. Laiturilla paahdettiin '
        + 'kahvia, ja tuoksu kulki veneiden yli kuin savu. Vanha opas '
        + 'piirsi hiekkaan viivan: minne ikinä menet, tämä suunta '
        + 'kulkee mukanasi. Katsoin kirjastani — sama viiva oli siellä '
        + 'kauan ennen minua.',
      henkilo: 'Pyhiinvaeltajien oppaan jälkeläinen Bilal saattaa kulkijoita '
        + 'Jiddan satamasta vuoristotielle, kuten isänsä ja tämän isä.',
      kohtaaminen: 'Bilal tasoittaa hiekan kämmenellään laiturilla. '
        + '"Isoisäni saattoi kerran matkalaisen, joka ei mennyt '
        + 'kaupunkiin mutta kysyi enemmän kuin kukaan kulkija. Hänen '
        + 'kysymyksensä jäi suvullemme. Vastaa, niin annan sinulle '
        + 'hänen oppaansa sauvan."',
      kysymys: {
        q: 'Muslimit rukoilevat kaikkialla maailmassa samaan suuntaan. '
          + 'Mihin rukous suunnataan?',
        vaihtoehdot: [
          'Kohti Mekkaa ja sen Kaabaa',
          'Kohti nousevaa aurinkoa',
          'Kohti Jerusalemia',
          'Jokainen omaan kotikaupunkiinsa päin',
        ],
        oikea: 0,
        fakta: 'Rukoussuunta eli qibla osoittaa Mekkaan, Kaaban luo, joka '
          + 'puolelta maailmaa. Moskeijoissa suunnan näyttää '
          + 'seinäsyvennys nimeltä mihrab — ja merenkulkijat ja '
          + 'tähtitieteilijät laskivat qiblan suuntia jo keskiajalla.',
      },
      aarre: 'Sauvan kädensijan sisällä odotti kapea kätkö. Bilal kiersi '
        + 'kädensijan takaisin: "Sauva on saattanut kulkijoita neljä '
        + 'polvea — saattakoon se nyt sinut."',
    },
    {
      id: 'mosul',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Mosul — kangas ohuempi kuin aamu-usva',
      saapuminen: 'Kutomon ikkunasta näkyi Tigris, ja puilla syntyi kangasta '
        + 'niin ohutta, että sen läpi saattoi lukea kirjettä. Tätä '
        + 'kangasta on viety maailmalle meidän kaupunkimme nimellä, '
        + 'kutoja sanoi. Hän avasi arkun ja nosti esiin harson, johon '
        + 'oli kiedottu jotakin. Tämä jätettiin pantiksi, hän sanoi. '
        + 'Panttia ei lunastettu. Vielä.',
      henkilo: 'Kankaankutoja Layla kutoo ohutta musliinia samoilla puilla '
        + 'kuin sukunsa, ja arkussa säilyvät myös lunastamattomat '
        + 'pantit.',
      kohtaaminen: 'Layla laskee harson pöydälle kuin henkäyksen. "Pantin '
        + 'jättäjä sanoi: se lunastetaan vastauksella, ei rahalla. '
        + 'Kysymys koskee kangastamme. Vastaa."',
      kysymys: {
        q: 'Ohut, ilmava puuvillakangas musliini on saanut nimensä '
          + 'kaupungista. Mistä?',
        vaihtoehdot: [
          'Mosulista',
          'Moskovasta',
          'Marseillesta',
          'Maskatista',
        ],
        oikea: 0,
        fakta: 'Musliini kulki Eurooppaan Mosulin kauppateitse, ja kaupungin '
          + 'nimi tarttui kankaaseen: ranskan mousseline ja meidän '
          + 'musliinimme muistavat yhä Mosulin. Hienointa musliinia '
          + 'kudottiin niin ohueksi, että sitä kutsuttiin kudotuksi '
          + 'ilmaksi.',
      },
      aarre: 'Harson sisältä paljastui kätkö, kevyt kuin tyhjä. Layla '
        + 'levitti kankaan valoa vasten: "Reunan kuvio katosi '
        + 'kutojien mukana kauan ennen pantin jättäjää — mistä hän '
        + 'sai kankaan, joka oli jo hänen aikanaan kadonnutta työtä?"',
    },
    {
      id: 'nikosia',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Nikosia — harkko jota ei voinut myydä',
      saapuminen: 'Muurit kiersivät kaupungin täydellisenä tähtenä; kävelin '
        + 'kehän ympäri ja kirjasin vallisakarat: yksitoista. '
        + 'Sepänkujalla vasarat löivät kuparia eri tahdeissa; kuja soi '
        + 'kuin soittokunta. Vanhin seppä nosti liinan alta harkon, '
        + 'jossa oli härän taljan merkki — vanhempaa työtä kuin paja '
        + 'tai muurit. Kysyin hintaa. Väärä kysymys, seppä sanoi, ja '
        + 'peitti harkon.',
      henkilo: 'Seppä Andreas, kaivosmiesten sukua, takoo kuparia kujalla, '
        + 'jolla saaren punainen metalli on soinut aina.',
      kohtaaminen: 'Andreas kääntää harkkoa pihdeissä. "Matkalainen sanoi: '
        + 'en voi myydä tätä enkä kantaa kauemmas — pitäkää, kunnes '
        + 'joku vastaa kysymykseen saarenne metallista. Isoisäni '
        + 'suostui — sellaista ei jätetä kadulle. Vastaa, niin harkko '
        + 'on sinun."',
      kysymys: {
        q: 'Kyproksen saari ja eräs metalli ovat antaneet nimen '
          + 'toisilleen. Mikä metalli?',
        vaihtoehdot: [
          'Kupari',
          'Hopea',
          'Tina',
          'Rauta',
        ],
        oikea: 0,
        fakta: 'Kupari sai latinankielisen nimensä Kyproksesta: aes Cyprium, '
          + 'Kyproksen metalli, lyheni muotoon cuprum — siitä kupari. '
          + 'Saaren kaivokset olivat antiikin maailman tärkeimpiä, ja '
          + 'kuparia laivattiin härän taljan muotoisina harkkoina.',
      },
      aarre: 'Harkko oli ontto; sisällä odotti kätkö. Andreas punnitsi '
        + 'puolikkaita: "Merkki on lyöty valuun ennen kuin kupari '
        + 'jäähtyi, mutta valu on merkkiä vuosituhansia nuorempi — '
        + 'joku osaa yhä vanhan valajan työn."',
    },
    {
      id: 'persepolis',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Persepolis — kulkue joka ei koskaan pääty',
      saapuminen: 'Rauniokaupungin portaita nousin keskellä kivistä kulkuetta: '
        + 'seinään oli veistetty satojen lahdenkantajien jono, ja '
        + 'jokainen kantoi jotakin — kannua, kangasta, karitsaa. '
        + 'Paimen, joka laidunsi laumaansa raunioilla, näytti minulle '
        + 'kohdan, jossa yksi veistetty kantaja kantaa arkkua ilman '
        + 'koristetta. Sitä ei ole viimeistelty, hän sanoi. Tai sitten '
        + 'se odottaa jotakin.',
      henkilo: 'Paimen Dariush tuntee rauniot lampaidensa laitumena ja '
        + 'kivikulkueen hahmot paremmin kuin moni oppinut.',
      kohtaaminen: 'Dariush nojaa sauvaansa reliefin äärellä. "Isoisäsi istui '
        + 'tämän seinän edessä päivän ja piirsi kulkueen kirjaansa. '
        + 'Lähtiessään hän jätti kysymyksen: minkä juhlan kulkue tämä '
        + 'on? Vastaa."',
      kysymys: {
        q: 'Persepoliin seiniin on veistetty loputon kulkue, jossa eri '
          + 'kansat tuovat lahjoja kuninkaalle. Mitä juhlaa varten '
          + 'kaupunki rakennettiin?',
        vaihtoehdot: [
          'Kevään uudenvuodenjuhlaa, jota vietetään päiväntasauksena',
          'Kuninkaan syntymäpäivää, jota koko valtakunta juhli '
            + 'keskitalvella',
          'Sadonkorjuun juhlaa, jolloin verot tuotiin kaupunkiin '
            + 'syksyllä',
          'Voitonjuhlaa, joka seurasi jokaista onnistunutta sotaretkeä',
        ],
        oikea: 0,
        fakta: 'Persepolis oli Persian kuninkaiden juhlakaupunki, jonne '
          + 'valtakunnan kansat toivat lahjansa Nowruzin, '
          + 'kevätpäiväntasauksen uudenvuodenjuhlan, aikaan. Nowruzia '
          + 'juhlitaan yhä — se on kevään ja uuden alun juhla.',
      },
      aarre: 'Koristelemattoman arkun takana kivi oli irti, ja kolossa '
        + 'odotti kätkö. Dariush laski kiven takaisin: "Lampaani '
        + 'eivät säikähdä mitään tuttua — kolme aamua sitten koko '
        + 'lauma pysähtyi tähän."',
    },
    {
      id: 'petra',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Petra — kallioon veistetty aarrekammio',
      saapuminen: 'Kuljin kapeaa rotkoa, jonka seinät nousivat niin korkealle, '
        + 'että taivas oli enää halkeama — ja sitten rotko aukesi, ja '
        + 'edessä seisoi palatsi, veistetty suoraan ruusunpunaiseen '
        + 'kallioon. Oppaani osoitti julkisivun huipulla olevaa '
        + 'kiviuurnaa: sitä sanotaan aarrekammioksi, koska uurnan '
        + 'uskotaan kätkevän faaraon kullan. Uurnassa näkyi kolhuja. '
        + 'Moni on yrittänyt, opas sanoi. Kukaan ei ole kysynyt.',
      henkilo: 'Beduiiniopas Suleiman johdattaa kulkijat rotkon läpi ja '
        + 'tuntee kallioiden värit jokaisena vuorokaudenaikana.',
      kohtaaminen: 'Suleiman istahtaa aarrekammion portaille. "Isoisäsi ei '
        + 'katsonut uurnaa vaan kalliota sen alla — ja jätti minun '
        + 'isoisälleni kysymyksen tästä kaupungista. Vastaa, niin '
        + 'näytän mitä hän katsoi."',
      kysymys: {
        q: 'Petra kukoisti keskellä kuivaa vuoristoa. Mikä teki '
          + 'kaupungin mahdolliseksi?',
        vaihtoehdot: [
          'Kallioon hakatut kanavat ja säiliöt, jotka keräsivät talteen '
            + 'jokaisen sateen',
          'Rotkon pohjalla virtaava joki, joka ei kuivunut pahimpanakaan '
            + 'kesänä',
          'Vuorten lumi, joka suli keväisin kaupungin altaisiin',
          'Karavaanit, jotka toivat veden ruukuissa mukanaan',
        ],
        oikea: 0,
        fakta: 'Nabatealaiset olivat vesimestareita: kallioon hakatut '
          + 'kanavat, padot ja säiliöt kokosivat vähäiset sateet koko '
          + 'kaupungin tarpeiksi. Siksi karavaanit pysähtyivät juuri '
          + 'Petrassa — vettä oli siellä, missä muualla ei ollut. '
          + 'Rakennuksetkin veistettiin suoraan kallioon, ylhäältä alas '
          + 'edeten.',
      },
      aarre: 'Kallion juurella, veistäjien vanhan jalansijan kolossa, '
        + 'odotti kätkö. Suleiman pyyhkäisi punaista hiekkaa: "Rotkon '
        + 'tuuli täyttää tällaisen kolon kuukaudessa — tämä oli '
        + 'lakaistu puhtaaksi."',
    },
    {
      id: 'riad',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Riad — savilinnojen kaupunki',
      saapuminen: 'Astuin helteestä savitalon sisään, ja lämpömittarini '
        + 'putosi kymmenen astetta ovella — kirjasin lukeman '
        + 'kahdesti. Savi pitää päivän ulkona ja yön lämpimänä — '
        + 'tiili ei siihen pysty. Kaivolla kaivaja näytti, mitä hänen '
        + 'isänsä nosti pohjasta: messinkiluodin mittanauhoineen. Hän '
        + 'ojensi sen kämmenellään ja katsoi, kummalla kädellä tartuin '
        + 'siihen.',
      henkilo: 'Kaivonkaivaja Abdullah on nostanut vettä aavikon alta koko '
        + 'ikänsä, kuten hänen sukunsa ennen häntä.',
      kohtaaminen: 'Abdullah kelaa köyttä kaivolta. "Työkalun omistaja kysyi, '
        + 'mistä kaivaja tietää, minne kaivaa. Hän tiesi vastauksen '
        + 'itse — ja jätti kysymyksen perinnöksi. Vastaa, '
        + 'niin lasken sangon kaivoon vielä kerran."',
      kysymys: {
        q: 'Kaivonkaivaja löytää aavikolta veden ilman karttaa. Mistä '
          + 'hän tietää, minne kaivaa?',
        vaihtoehdot: [
          'Maan merkeistä — tietyt kasvit ja aamulla kostea hiekka '
            + 'kielivät vedestä',
          'Maata kuunnellaan yöllä — virtaus kuuluu hiljaisuudessa',
          'Yön tähdet kuvastuvat himmeinä kohdasta, jonka alla on vettä',
          'Kaivo aloitetaan aina vanhan kaivon viereen, muualta ei löydy',
        ],
        oikea: 0,
        fakta: 'Aavikon kaivonkaivaja lukee maata: sitkeät vihreät '
          + 'kasvit, aamulla pitempään kostea hiekka ja hyönteisten '
          + 'liike kertovat, missä vesi kulkee lähellä pintaa. Taito '
          + 'kulki suvuissa — ja Riadin nimi tarkoittaa puutarhoja: '
          + 'vettä osattiin löytää.',
      },
      aarre: 'Kätkö nousi kaivosta samassa sangossa kuin vesi, '
        + 'savikuoreen valettuna. Abdullah rikkoi kuoren: "Savi on '
        + 'meidän savontamme, mutta kääre sen sisällä on kuiva — se '
        + 'ei ole ollut kaivossa viikkoa kauempaa."',
    },
    {
      id: 'rubalkhali',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Rub al-Khali — hiekka joka laulaa',
      saapuminen: 'Dyynit jatkuivat horisonttiin kuin punainen meri, ja kun '
        + 'aurinko laski, kuulin sen: matalan huminan, joka nousi '
        + 'hiekasta itsestään, kun dyynin rinne valui. Beduiinioppaani '
        + 'hymyili: hiekka laulaa, kun se puhuu totta. Leiripaikalta '
        + 'löysin kiven, jonka alle oli taitettu paperi. Se oli sivu '
        + 'jonkun matkakirjasta. Käsialan tunsin, sivun numeron '
        + 'tunnistin — omasta kirjastani puuttuu sama sivu.',
      henkilo: 'Jäljenlukija Saif kulkee Tyhjän neljänneksen reunoja ja '
        + 'lukee dyyneistä, kuka on kulkenut ja milloin, kuin kirjaa.',
      kohtaaminen: 'Saif kyykistyy dyynin rinteeseen ja pyyhkäisee hiekkaa. '
        + '"Sivun jätti mies, jonka jäljet isoisäni luki: kamelin askel '
        + 'kevyt, miehen askel painava — hän kantoi jotain tullessaan '
        + 'eikä lähtiessään. Vastaa hänen kysymykseensä, niin luen '
        + 'sinulle loput jäljet."',
      kysymys: {
        q: 'Maailman suurin yhtenäinen hiekka-aavikko kantaa nimeä Rub '
          + 'al-Khali. Mitä nimi tarkoittaa?',
        vaihtoehdot: [
          'Tyhjää neljännestä',
          'Punaista merta',
          'Tuhannen dyynin maata',
          'Auringon alasinta',
        ],
        oikea: 0,
        fakta: 'Rub al-Khali on arabiaa ja tarkoittaa Tyhjää '
          + 'neljännestä: hiekkameri peittää neljänneksen Arabian '
          + 'niemimaasta, ja sen ylittivät vain harvat. Dyynit myös '
          + 'laulavat oikeasti — valuva hiekka saa koko rinteen '
          + 'värisemään ja humisemaan.',
      },
      aarre: 'Jälkien päässä, leirikiven alla, odotti kätkö — ja sen '
        + 'päällä puuttuva sivuni. Saif katsoi dyynien yli: "Nämä '
        + 'jäljet on peitetty käsin — ja se, joka peittää jälkiä, '
        + 'aikoo palata."',
    },
    {
      id: 'salalah',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Salalah — rannikko joka vihertyy',
      saapuminen: 'Purjehdimme etelään pitkin paahtunutta rantaa, kunnes se '
        + 'ei ollutkaan: Salalahin vuoret olivat vihreät, ja usva '
        + 'valui rinteitä kuin harso. Suitsukkeen savu tuntui ennen '
        + 'kuin vene kosketti laituria; pihkaa punnittiin '
        + 'vaakakupeissa kuin kultaa. Yhden kupin painona oli '
        + 'messinkipunnus, johon oli kaiverrettu yksi sana. Kirjasin '
        + 'sen luettuani kahdesti: PALAA.',
      henkilo: 'Suitsukkeenkerääjä Mariam viiltää puiden kuorta ja kerää '
        + 'pihkan kyynelinä, kuten hänen sukunsa on kerännyt aina.',
      kohtaaminen: 'Mariam laskee punnuksen kämmenelleni. "Matkalainen huomasi '
        + 'vaakamme valehtelevan meidän tappioksemme ja viilasi sen '
        + 'oikeaan. Maksuksi hän otti pussin pihkaa ja jätti '
        + 'punnuksensa takeeksi. Vastaa, niin punnitsen sinulle saman '
        + 'mitan."',
      kysymys: {
        q: 'Salalahin rannikko vihertyy kesällä, kun muu Arabian '
          + 'niemimaa paahtuu. Mikä sen selittää?',
        vaihtoehdot: [
          'Khareef-monsuuni tuo mereltä usvan ja sateet juuri tälle '
            + 'rannikolle',
          'Vuorten lumi, joka sulaa kesällä ja kastelee rinteiden tarhat',
          'Maanalaiset joet, jotka tuovat vettä Afrikan ylängöiltä asti',
          'Talvisateet — rannikolla sataa lokakuusta helmikuuhun lähes '
            + 'joka päivä',
        ],
        oikea: 0,
        fakta: 'Kesäinen khareef-monsuuni osuu Arabian niemimaalla juuri '
          + 'Dhofarin rannikkoon: meri-ilma nousee vuoria vasten usvaksi '
          + 'ja tihkuksi, ja Salalahin seutu vihertyy keskellä kuuminta '
          + 'kesää. Samoilta seuduilta kerätään maailman parasta '
          + 'suitsukepihkaa.',
      },
      aarre: 'Vaakakaapin kaksoispohjasta löytyi kätkö. Mariam laski '
        + 'pihkapussin käteeni: "Sama mitta, jonka hän vei — ja kätkö '
        + 'painaa täsmälleen saman, sillä se on punnittu tällä '
        + 'vaakakupilla."',
    },
    {
      id: 'sana',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Sanaa — tornitalojen kaupunki',
      saapuminen: 'Kaupunki nousi edessäni monikerroksisina savitorneina, '
        + 'joiden ikkunoita kiersivät valkoiset kipsiraidat kuin '
        + 'sokerikuorrutus. Auringon laskiessa ikkunoiden puolikuut '
        + 'syttyivät sisältä väreihin: punaiseen, kultaan, vihreään. '
        + 'Ikkunantekijä vei minut työhuoneeseensa katolle ja näytti '
        + 'puolikuun, joka odotti kehyksessään asennusta. Se on ollut '
        + 'valmiina kauan, hän sanoi. Taloa, johon se kuuluu, ei ole '
        + 'vielä sanottu meille.',
      henkilo: 'Ikkunantekijä Hamza valaa kipsiin värilasit, jotka muuttavat '
        + 'auringonlaskun huoneen sisällä juhlaksi, sukunsa viidentenä.',
      kohtaaminen: 'Hamza kohottaa puolikuun valoa vasten. "Tämän '
        + 'ikkunan mitat isoisäni sai matkalaiselta — mutta taloa, johon '
        + 'se sopisi, ei ole löytynyt koko kaupungista. Olen mitannut '
        + 'itse: aukkoa, johon tämä istuu, ei ole missään. Hänen '
        + 'kysymyksensä koskee talojamme. Vastaa, niin mietimme yhdessä, '
        + 'minne ikkuna kuuluu."',
      kysymys: {
        q: 'Sanaan tornitalojen yläikkunat hehkuvat illalla väreissä. '
          + 'Miten qamariya-ikkuna tehdään?',
        vaihtoehdot: [
          'Värilasit valetaan kiinni kipsikehykseen',
          'Lasinpalat sidotaan lyijylistoin kuten kirkkoikkunoissa',
          'Lasi maalataan läpikuultavilla lakkaväreillä',
          'Ikkuna-aukkoon pingotetaan värjättyä silkkiä',
        ],
        oikea: 0,
        fakta: 'Qamariya syntyy kipsistä ja lasista: kipsilevyyn '
          + 'leikataan kuvio ja värilasit valetaan suoraan kehykseen, '
          + 'ilman listoja. Kipsi kovettuu kerran eikä anna periksi — '
          + 'siksi ikkuna kestää, mutta sitä ei voi avata rikkomatta.',
      },
      aarre: 'Ikkunakehyksen ontelosta löytyi kätkö. Hamza asetti '
        + 'puolikuun takaisin telineeseen: "Kipsi kovettuu kerran, '
        + 'mutta tämä kehys on avattu taltalla ja kipsattu uudelleen '
        + '— käsi oli taitava, eikä se ollut minun."',
    },
    {
      id: 'siinai',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Siinai — kirjasto vuorten sylissä',
      saapuminen: 'Nousimme kamelein vuorten väliin, ja laakson pohjalla '
        + 'odotti muurien ympäröimä luostari, vanhempi kuin yksikään '
        + 'tuntemani kirja. Kirjastossa käsikirjoituksia on säilytetty '
        + 'puolitoista vuosituhatta. Yhdellä hyllyllä oli tyhjä kohta '
        + 'ja lappu: tähän palautetaan se, mikä lainattiin. Lainaajaa '
        + 'ei mainittu; kirjasin päivämäärän, kolmenkymmenen vuoden '
        + 'takaa.',
      henkilo: 'Munkki Gabriel hoitaa luostarin kirjastoa, jossa jokainen '
        + 'käsikirjoitus tunnetaan ja jokainen tyhjä kohta muistetaan.',
      kohtaaminen: 'Gabriel laskee kynttilän hyllyn ääreen. "Lainaaja jätti '
        + 'pantiksi kysymyksen ja sanoi: vastaus on palautus. Kysymys '
        + 'koskee tätä paikkaa. Vastaa, niin tyhjä kohta täyttyy."',
      kysymys: {
        q: 'Pyhän Katariinan luostari rakennettiin juuri tähän laaksoon '
          + 'erityisen syyn takia. Minkä?',
        vaihtoehdot: [
          'Sen pihalla kasvaa perimätiedon mukaan Mooseksen palava '
            + 'pensas',
          'Vuorelta löytyi kultasuoni, jonka luostari otti vartioonsa',
          'Keisari halusi luostarin vartioimaan vuoristosolan kauppareittiä',
          'Laakso oli ainoa, jonne kamelikaravaani pääsi perille asti',
        ],
        oikea: 0,
        fakta: 'Luostari nousi 500-luvulla paikalle, jossa perimätiedon '
          + 'mukaan Mooses näki pensaan, joka paloi palamatta poroksi — '
          + 'pihalla vaalitaan yhä pensasta. Samassa suojassa kirjasto '
          + 'on säilyttänyt käsikirjoituksia keskeytyksettä puolitoista '
          + 'vuosituhatta.',
      },
      aarre: 'Tyhjän kohdan takana, hyllylevyn alla, odotti litteä '
        + 'kätkö. Gabriel suoristi lapun: "Pöly laskeutuu kirjastossa '
        + 'tasaisesti, ja tyhjästä kohdasta se puuttui — joku on '
        + 'koskettanut hyllyä tällä viikolla."',
    },
    {
      id: 'tabriz',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Tabriz — basaari jolla ei näy loppua',
      saapuminen: 'Astuin katetun basaarin holvien alle aamulla, ja kun luulin '
        + 'nähneeni sen kaiken, oli jo ilta. Holvikäytävät haarautuivat '
        + 'kuin joki: mausteet, kupari, kirjat, matot. Mattokauppias '
        + 'levitti eteeni maton ja käänsi sen nurin: solmuja oli niin '
        + 'tiheässä, ettei sormi mahtunut niiden väliin. Hyvä matto '
        + 'tehdään kahdesti, hän sanoi — kerran solmuina, kerran '
        + 'tarinana. Tämän maton tarina on kesken.',
      henkilo: 'Matonkutoja Zahra solmii mattoja, joiden kuviot kulkevat '
        + 'suvussa muistina — jokainen matto kertoo jotakin, jos osaa '
        + 'lukea.',
      kohtaaminen: 'Zahra kääntää keskeneräisen maton loimet esiin. "Maton '
        + 'tilasi matkalainen ja jätti kuvion kesken tahallaan: '
        + 'viimeinen rivi solmitaan, kun joku vastaa hänen '
        + 'kysymykseensä. Kysymys koskee mattojamme. Vastaa."',
      kysymys: {
        q: 'Käsin solmittu itämainen matto syntyy hitaasti. Miten se '
          + 'tehdään?',
        vaihtoehdot: [
          'Solmu kerrallaan käsin — isossa matossa solmuja on miljoonia',
          'Valamalla villa suureen muottiin ja leikkaamalla kuvio '
            + 'pintaan',
          'Ompelemalla valmiiksi kudotut kuviopalat yhteen nurjalta '
            + 'puolelta',
          'Kutomalla puukoneella, joka toistaa saman kuvion rivi riviltä',
        ],
        oikea: 0,
        fakta: 'Solmumatto syntyy käsin solmu kerrallaan: kutoja kiertää '
          + 'villalangan loimiin ja katkaisee sen, riviltä toiselle. '
          + 'Hienossa matossa on satoja solmuja neliösenttimetrillä — '
          + 'kokonaisessa matossa miljoonia — ja työ kestää kuukausia tai '
          + 'vuosia.',
      },
      aarre: 'Maton kääröstä, loimien välistä, löytyi kätkö. Zahra laski '
        + 'sormensa keskeneräiselle riville: "Tähän on solmittu kolme '
        + 'solmua, joita minä en ole solminut — oikein solmittuja, '
        + 'mutta lanka on värjätty toisessa kaupungissa."',
    },
    {
      id: 'teheran',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Teheran — sali joka on tehty peileistä',
      saapuminen: 'Pysähdyin ovelle: sali oli katettu tuhansin peilinpaloin, '
        + 'ja yksi kynttilä syttyi tuhanneksi. Šaahi oli Euroopassa, '
        + 'ensimmäisenä hallitsijoistaan. Kirjasin oppaan tarinan '
        + 'siihen, mihin hän sen katkaisi: peilit tilattiin meren '
        + 'takaa. Lopun kertoo vain se, joka salia hoitaa. Nurkassa '
        + 'oli himmeä pala; sen takana ei ollut peiliä, vaan lokero.',
      henkilo: 'Peilimosaiikin korjaaja Reza vaihtaa saliin himmenneet palat '
        + 'uusiin ja tuntee jokaisen sirpaleen paikan.',
      kohtaaminen: 'Reza nostaa himmeän palan irti. "Mestarien tapa: mikä ei '
        + 'saa unohtua, sen pala jätetään himmeäksi. Tämä himmeni '
        + 'iltana, jona muuan matkalainen istui täällä sulkemiseen '
        + 'asti. Hänen kysymyksensä on tarina salista. Vastaa, niin '
        + 'avaan lokeron."',
      kysymys: {
        q: 'Persialaisten palatsien peilisalit kimaltavat tuhansina '
          + 'sirpaleina. Miten tarinan mukaan tämä taide sai alkunsa?',
        vaihtoehdot: [
          'Peilit saapuivat Euroopasta rikkoutuneina, ja sirpaleista '
            + 'tehtiin mosaiikkia',
          'Kuningas särki palatsin peilit, ettei näkisi itseään '
            + 'vanhenevan',
          'Sirpaleet nostettiin haaksirikkoutuneiden kauppalaivojen '
            + 'hylyistä',
          'Kokonaisia peilejä ei siihen aikaan osattu valmistaa idässä '
            + 'eikä lännessä',
        ],
        oikea: 0,
        fakta: 'Tarinan mukaan Euroopasta laivatut suuret peilit särkyivät '
          + 'matkalla — ja persialaiset mestarit tekivät tappiosta '
          + 'taidetta: sirpaleet ladottiin kipsiin mosaiikiksi, joka '
          + 'rikkoo valon tuhansiksi kimalluksiksi. Peilimosaiikista eli '
          + 'aina-karista tuli palatsien ylpeys.',
      },
      aarre: 'Lokerossa odotti kätkö, peilinpalan kokoinen. Reza sovitti '
        + 'palan takaisin: "Himmenneet palat vaihdan joka vuosi, '
        + 'tämän jätän — mutta kipsi ympärillä on uusittu, eikä '
        + 'uusija ollut minä."',
    },
  ],
};
