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
      mykistetyt: ['saapuminen', 'kohtaaminen', 'aarre'],
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
      kysymys: {
        q: 'Kultaisen kujan talot ovat nukkekodin kokoisia. Kenelle ne '
          + 'alun perin rakennettiin?',
        vaihtoehdot: [
          'Linnan vartijoille, muurin holvikaarien väliin',
          'Keisarin alkemisteille, lähelle laboratorioita',
          'Kellonsoittajille, joiden piti asua tornin alla',
          'Hovin räätäleille, joiden pajat olivat linnassa',
        ],
        oikea: 0,
        fakta: 'Talot rakennettiin 1500-luvun lopulla linnanmuurin '
          + 'holvikaarien väliin linnan vartijoille — siksi ne ovat niin '
          + 'kapeita ja matalia. Tarina alkemisteista antoi kujalle '
          + 'kultaisen nimen, ja talossa 22 kirjoitti myöhemmin Franz '
          + 'Kafka.',
      },
      aarre: 'Kynttilän valossa pöydän laatikko aukesi, ja kirjan alta '
        + 'löytyi kätkö. Tomáš katsoi liekkiä: "Lupauksia on kaksi — '
        + 'toinen liekki palaa jossain, missä maa on lämmin."',
    },
    {
      id: 'istanbul',
      kuva: 'assets/kohtaamiset/kohtaaminen-istanbul.jpg',
      mykistetyt: ['saapuminen', 'aarre'],
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
          'Jotta pylväästä tulisi tukevampi',
          'Kuvanveistäjä erehtyi suunnasta',
          'Sulttaani halusi piilottaa kasvot',
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
      mykistetyt: ['saapuminen'],
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
      kysymys: {
        q: 'Wienin keisarit haudattiin tavalla, jota ei tunneta '
          + 'juuri missään muualla. Miten?',
        vaihtoehdot: [
          'Ruumis, sydän ja sisälmykset haudattiin kolmeen eri kirkkoon',
          'Arkku laskettiin Tonavan pohjaan',
          'Keisari haudattiin istualleen valtaistuimelleen',
          'Hauta muurattiin umpeen tornin huippuun',
        ],
        oikea: 0,
        fakta: 'Habsburgien ruumiit lepäävät kapusiinien kryptassa, '
          + 'sydämet augustinolaiskirkossa ja sisälmykset '
          + 'Tapaninkirkon katakombeissa. Kryptan ovella saattue '
          + 'kolkutti, ja keisari päästettiin sisään vasta kun hänet '
          + 'oli kuulutettu pelkäksi kuolevaiseksi ihmiseksi.',
      },
      aarre: 'Kätkön päällä seisoi kolmas lyhty, ja Anton puhui portaita '
        + 'kohti: "Veto tulee ovesta, jota ei minun aikanani ole avattu '
        + '— kirjassa lukee vain: sinne ei mennä alakautta."',
    },
    {
      id: 'venetsia',
      mykistetyt: ['saapuminen'],
      otsikko: 'Venetsia — naamio sillan kaiteella',
      saapuminen: 'Vesi nousi yöllä kaduille, ja aamulla torilla '
        + 'käveltiin lankkuja pitkin kuin laivan kannella — kaupunki '
        + 'ei säikähtänyt, se nosti helmansa ja jatkoi matkaansa. '
        + 'Sillan kaiteella odotti ruttolääkärin valkoinen naamio — '
        + 'linnunnokka, silmäaukot tyhjinä. Kukaan ohikulkija ei '
        + 'vilkaissut sitä; minä piirsin sen vihkooni enkä saanut '
        + 'siitä silmiäni irti.',
      henkilo: 'Naamiontekijä Lucia pitää pajaa kolmannessa polvessa; '
        + 'tilauskirjassa on vuosi 1873 ja nimikirjaimet H. F.',
      kohtaaminen: 'Pajassa naamiontekijä Lucia tunnistaa linnunnokan yhdellä '
        + 'vilkaisulla. "Tuo on pajamme työtä — tilauskirjassa lukee '
        + '1873 ja nimikirjaimet H. F. Vastaa väliin taitettuun '
        + 'kysymykseen, niin luen tilauksen loppuun."',
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
      mykistetyt: ['saapuminen', 'aarre'],
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
      kysymys: {
        q: 'Labyrintin seinät ovat lämpimät kuin iho. Mikä lämmittää '
          + 'Budapestin maanalaiset käytävät?',
        vaihtoehdot: [
          'Maan alta nousevat kuumat lähteet',
          'Kylpylöiden kupariputket seinien takana',
          'Maanalaisen tulivuoren hehkuva kivi',
          'Linnan suuret takat ja niiden savusolat',
        ],
        oikea: 0,
        fakta: 'Budapestin alla kumpuaa yli sata kuumaa lähdettä. Sama vesi '
          + 'täyttää kaupungin kuuluisat kylpylät — ja lämmittää '
          + 'linnanalaisen labyrintin seinät.',
      },
      aarre: 'Sääntö piti: lämmin seinä oikealla, ja kätkö odotti '
        + 'liituristin alla irtokiven takana. Márta katsoi merkkiä: '
        + '"Isoisoäitinikin pyyhki ristin aikanaan, ja aina se palasi '
        + '— tämä liitu on tuoretta."',
    },
    {
      id: 'lontoo',
      mykistetyt: ['saapuminen', 'kohtaaminen', 'aarre'],
      otsikko: 'Lontoo — laskuveden kello',
      saapuminen: 'Sumu nousi joesta niin sakeana, että junani jäi odottamaan '
        + 'sitä; aikataulukirjani ei tuntenut sumua, ja myönnän '
        + 'kirjanneeni sen kirjan viaksi. Kävelin laskuveden '
        + 'paljastamalle rannalle. Liejussa makasi taskukello, '
        + 'viisarit pysähtyneinä; sumun takaa tornin suuri kello löi '
        + 'tunnin, kuin kaupunki vastaisi. Sinä, joka tätä luet: '
        + 'kello käy taas. Kuuntele.',
      henkilo: 'Jokilöytäjä Ned etsii laskuveden liejusta joen pudottamia '
        + 'esineitä, kuten hänen sukunsa on etsinyt sata vuotta.',
      kohtaaminen: 'Rannalla jokilöytäjä Ned punnitsee taskukelloa kädessään. '
        + '"Suvussani sanotaan: joki antaa takaisin sen, minkä '
        + 'omistaja unohti. Kannessa on kaksi kirjainta — H. F. '
        + 'Vastaa kirjan kysymykseen, niin kello on sinun."',
      kysymys: {
        q: 'Kaikki tuntevat nimen Big Ben. Mitä se alun perin '
          + 'tarkoittaa?',
        vaihtoehdot: [
          'Tornin suurinta kelloa',
          'Koko kellotornia',
          'Kellon rakentajaa',
          'Westminsterin palatsin porttia',
        ],
        oikea: 0,
        fakta: 'Big Ben on tornin 13,7 tonnin painoinen suurin kello. Torni '
          + 'itse on nimeltään Elizabeth Tower — mutta kellon nimi '
          + 'tarttui koko torniin.',
      },
      aarre: 'Ned avasi kellon ja antoi sen: sisällä oli isoisän '
        + 'käsialalla pelkkä kellonaika, sama johon viisarit '
        + 'pysähtyivät. "Joki ei pysäyttänyt tätä kelloa — joku '
        + 'pysäytti sen tahallaan, ja liejussa oli tuoreet jäljet."',
    },
    {
      id: 'pariisi',
      mykistetyt: ['saapuminen', 'kohtaaminen', 'aarre'],
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
      mykistetyt: ['saapuminen', 'kohtaaminen', 'aarre'],
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
        + 'etsi. Hän jätti kysymyksen; se on odottanut siitä yöstä. '
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
      kuva: 'assets/kohtaamiset/kohtaaminen-rooma.jpg',
      mykistetyt: ['saapuminen', 'kohtaaminen', 'aarre'],
      otsikko: 'Rooma — kolikko joka palasi altaaseen',
      saapuminen: 'Trevin allas oli tyhjennetty, ja pohjalta nousi kolikoiden '
        + 'sade — rahat annetaan köyhille. Yksi kolikko oli muita '
        + 'vanhempi, ja sen reunaan oli viilattu tähtäinristi. Heitin '
        + 'sen takaisin väärin. Vieressä seissyt rouva näytti oikean '
        + 'tavan — oikealla kädellä vasemman olan yli — niin '
        + 'arvokkaasti, että heitin toisenkin. Kirjasin: köyhät saivat '
        + 'kaksi ropoa, minä opetuksen.',
      henkilo: 'Suihkulähteenhoitaja Enzo nostaa Trevin kolikot talteen joka '
        + 'viikko, kuten hänen isänsä ja isoisänsä nostivat.',
      kohtaaminen: 'Enzo kääntelee vanhaa kolikkoa hansikkaassa kädessään. '
        + '"Tämä nousee altaasta yhä uudelleen, vaikka panen sen '
        + 'talteen. Isäni sanoi: älä kysy keneltä, kysy miksi. Vastaa '
        + 'tavan kysymykseen, niin kolikko on sinun."',
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
      aarre: 'Enzo painoi kolikon kämmeneeni ja avasi huoltoluukun: sen '
        + 'takana odotti kätkö. Portilla sata puhelinta kuvasi '
        + 'lähdettä — yksikään ei kuvannut miestä, joka tietää sen '
        + 'salaisuuden.',
    },
    {
      id: 'madrid',
      mykistetyt: ['saapuminen', 'aarre'],
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
          'Espanjan maanteiden kilometrit — nollapiste on tässä',
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
      kuva: 'assets/kohtaamiset/kohtaaminen-ateena.jpg',
      otsikko: 'Ateena — pöllö joka vartioi rahaa',
      // Omistajan palaute 11.8.2026: lyhennetty ja pöllön ele sekä
      // päiväkirjakehys kirkastettu; kohtaamisen lupaus konkreettinen.
      mykistetyt: ['saapuminen', 'kohtaaminen', 'aarre'],
      saapuminen: 'Pöllö istui kaatuneella pylväällä ja katsoi minua '
        + 'liikahtamatta, kuin vaatisi selitystä myöhästymisestäni. '
        + 'Kirjasin vihkooni tuijotuksemme keston: seitsemän '
        + 'minuuttia, ja minä käänsin katseeni ensin. Silloin se '
        + 'astui syrjään: jalan alla oli hopearaha, vanhempi kuin '
        + 'mikään mittaamani. Se ei vartioinut rahaa minulta — se '
        + 'näytti, mistä aloittaa.',
      henkilo: 'Marmorinveistäjä Nikos korjaa Akropoliin pylväitä ja tuntee '
        + 'jokaisen kiven — ja rahan, jota siellä vartioidaan.',
      kohtaaminen: 'Nikos laskee talttansa nähdessään rahan. "Isoisoisäni löysi '
        + 'samanlaisen ja pani sen takaisin — hän sanoi, että pöllö '
        + 'laskee ne. Kirjasi omistaja tiesi rahasta. Vastaa hänen '
        + 'kysymykseensä, niin nostan rahan ja näytän, mitä sen alla '
        + 'on."',
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
      aarre: 'Nikos nosti rahan: sen alla, pylvään onkalossa, odotti '
        + 'kätkö. Hän katsoi rinteeseen: "Pöllö palaa pylväälle joka '
        + 'ilta — meillä sanotaan, että se vartioi vielä jotakin."',
    },
    {
      id: 'lissabon',
      mykistetyt: ['saapuminen', 'kohtaaminen', 'aarre'],
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
          'Arabian sanasta, joka tarkoittaa kiillotettua kiveä',
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
      mykistetyt: ['saapuminen'],
      otsikko: 'Amsterdam — arkku väärässä kerroksessa',
      saapuminen: 'Kanavan varrella talot nojaavat kuin kuuntelisivat vettä; '
        + 'mittasin yhden nojauksen: kaksi jalkaa katonrajassa. Yhden '
        + 'talon päädyssä riippui nostokoukku, ja koukussa köysi '
        + 'keskellä yötä — vaikka muuttopäivä ei ollut. Köyden päässä '
        + 'laskeutui arkku, joka pysähtyi täsmälleen minun ikkunani '
        + 'kohdalle. Arkussa ei ollut lukkoa, vain lappu: väärä '
        + 'kerros.',
      henkilo: 'Siltavahti Willem vetää kammella auki saman kääntösillan, '
        + 'jota hänen sukunsa on avannut purjeille sukupolvien ajan.',
      kohtaaminen: 'Sillalla Willem lukitsee kammen ja kääntyy. "Kirjaan on '
        + 'merkitty jokainen vene, jolle suku on avannut sillan — '
        + 'isoisäsi vene kulki läpi kahdesti, mutta palasi vain kerran. '
        + 'Vastaa hänen kysymykseensä, niin luet loput itse."',
      kysymys: {
        q: 'Amsterdamin vanhojen talojen päädyssä on melkein aina koukku '
          + 'katonrajassa. Mitä varten?',
        vaihtoehdot: [
          'Huonekalut nostetaan sisään ikkunoista, koska portaat ovat '
            + 'liian kapeat',
          'Siihen ripustettiin lyhty, joka valaisi kanavan koko pimeän '
            + 'ajan',
          'Laivojen köydet kiinnitettiin siihen, kun tulva nosti veden '
            + 'kaduille asti',
          'Kauppiaan vaaka ripustettiin siihen, jotta koko katu näki '
            + 'rehellisen punnituksen',
        ],
        oikea: 0,
        fakta: 'Kapeat talot verotettiin leveyden mukaan, joten portaista '
          + 'tehtiin jyrkkiä ja ahtaita — sohvat ja kaapit hilataan yhä '
          + 'koukun ja köyden varassa sisään ikkunoista.',
      },
      aarre: 'Kätkö odotti sillan kammiossa, öljykankaaseen käärittynä. '
        + 'Willem osoitti kirjan viimeistä riviä: "Joku on avauttanut '
        + 'sillan isoisäsi veneen nimellä — viime keväänä."',
    },
    {
      id: 'dublin',
      mykistetyt: ['aarre'],
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
      mykistetyt: ['saapuminen', 'aarre'],
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
          'Sataman laivureille, jotka asettivat kellonsa sen mukaan',
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
      mykistetyt: ['saapuminen', 'aarre'],
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
      mykistetyt: ['saapuminen', 'aarre'],
      otsikko: 'Granada — vesi joka näyttää tien',
      saapuminen: 'Join Alhambrassa jääkylmää vettä keskellä Andalusian '
        + 'kesää: se laskee vuorilta, joilla lumi ei sula, ja '
        + 'seitsemänsataa vuotta vanhat kourut kantavat sen joka '
        + 'huoneeseen. Laskin suihkulähteen altaat: kaksitoista. Vanha '
        + 'puutarhuri sanoi, että veden solina on talon kello — joka '
        + 'huoneessa aika kulkee veden äänellä. Kirjoitin sen muistiin '
        + 'sanasta sanaan.',
      henkilo: 'Vesimestari Yusuf avaa ja sulkee Alhambran vanhat vesikourut '
        + 'samoilla avaimilla kuin sukunsa vuosisatojen ajan.',
      kohtaaminen: 'Kourun äärellä Yusuf kuuntelee veden ääntä kuin kelloa. '
        + '"Vesi kertoo, jos joku liikkuu palatsissa — isoisäsi '
        + 'opetteli kuuntelemaan sitä sukuni kanssa. Vastaa hänen '
        + 'kysymykseensä, niin ohjaan veden näyttämään tien."',
      kysymys: {
        q: 'Punertava linnoitus Alhambra kohoaa Granadan yllä. Mitä sen '
          + 'nimi tarkoittaa?',
        vaihtoehdot: [
          'Punaista — arabiaksi al-hamra',
          'Korkeaa puutarhaa',
          'Tuhannen lähteen taloa',
          'Viimeistä huokausta',
        ],
        oikea: 0,
        fakta: 'Al-qal\'a al-hamra tarkoittaa punaista linnaa: iltavalossa '
          + 'muurit hehkuvat punertavina. Sisällä vesi virtaa yhä '
          + 'kanavissa, jotka rakennettiin seitsemänsataa vuotta sitten.',
      },
      aarre: 'Kourujen risteyksessä veden alla odotti kivinen rasia. '
        + 'Yusuf punnitsi sitä kädessään: "Vesi olisi kuluttanut '
        + 'särmät sileiksi sadassa vuodessa — tämä on laskettu veteen '
        + 'hiljattain."',
    },
    {
      id: 'marseille',
      mykistetyt: ['saapuminen', 'aarre'],
      otsikko: 'Marseille — saari josta palataan tarinoissa',
      saapuminen: 'Saari nousi merestä kuin kivinen laiva, ja soutaja '
        + 'kieltäytyi viemästä: saarelta palataan vain tarinoissa. '
        + 'Maksoin pyydetyn tinkimättä, mikä teki hänet vain '
        + 'epäluuloisemmaksi; lupasin kertoa tarinani hänelle ensin. '
        + 'Kirjasin karttaani muurin juuren nuolen, joka osoitti veden '
        + 'alle. Pidin lupaukseni paluumatkalla. Soutaja souti '
        + 'hitaammin kuin tullessa.',
      henkilo: 'Soutaja Baptiste kuljettaa kalastajia satamasta ja tuntee '
        + 'Ifin saaren virtaukset paremmin kuin kukaan.',
      kohtaaminen: 'Airojen välissä Baptiste lepuuttaa käsiään. "Isäni isä souti '
        + 'isoisäsi saarelle ja odotti häntä kaksi vuorokautta. '
        + 'Paluumatkalla veneessä oli yksi arkku enemmän. Vastaa kirjan '
        + 'kysymykseen, niin soudan sinut samaa reittiä."',
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
      aarre: 'Nuolen alta, laskuveden paljastamasta kolosta, nousi '
        + 'arkku. Baptiste katsoi merelle: "Tämä on kevyempi kuin se, '
        + 'jonka isäni isä souti maihin — jossain on toinen arkku ja '
        + 'se, joka jakoi lastin kahtia."',
    },
    {
      id: 'varsova',
      mykistetyt: ['saapuminen', 'aarre'],
      otsikko: 'Varsova — verkko joka painoi',
      saapuminen: 'Kalastajat vetivät verkkonsa tyhjinä, mutta viimeinen '
        + 'painoi — ja kun tartuin auttamaan, pohja veti takaisin. '
        + 'Silmukoissa ei ollut kalaa vaan vaakuna: kilpi ja miekka, '
        + 'virran vihreäksi syömä, kaupungin merkki. Vanhin risti '
        + 'kätensä: tämä on nostettu kerran ennenkin, ja silloin joki '
        + 'otti sen takaisin. Yöllä kirjasin hänen sanansa ja '
        + 'kuuntelin, nousiko vesi.',
      henkilo: 'Kalastaja Jadwiga paikkaa verkkoja Veikselin rannalla ja '
        + 'laulaa työlauluja, joita ei osaa enää kukaan muu.',
      kohtaaminen: 'Jadwiga solmii verkon silmää katsettaan nostamatta. '
        + '"Suvussani sanotaan: mereneito lupasi puolustaa kaupunkia, '
        + 'koska kalastaja päästi hänet vapaaksi. Isoisäsi kirjoitti '
        + 'lupauksen muistiin. Vastaa hänen kysymykseensä, niin kerron '
        + 'minne."',
      kysymys: {
        q: 'Varsovan mereneidolla on tarun mukaan sisar, joka ui toiseen '
          + 'kaupunkiin. Minne?',
        vaihtoehdot: [
          'Kööpenhaminaan',
          'Venetsian kanaaleihin',
          'Pietariin',
          'Tukholman saaristoon',
        ],
        oikea: 0,
        fakta: 'Kansantarun mukaan kaksi merenneitosisarta lähti Itämerelle: '
          + 'toinen jäi Kööpenhaminan salmeen, toinen ui Veikseliä ylös '
          + 'Varsovaan asti ja lupasi puolustaa kalastajien kaupunkia. '
          + 'Vaakunassa hän kantaa yhä miekkaa ja kilpeä.',
      },
      aarre: 'Kätkö oli upotettu rantakiven alle verkonpainojen sekaan. '
        + 'Jadwiga laski sen käteeni: "Painot ovat sukuni valamia — '
        + 'paitsi yksi, ja sen valoi joku, joka halusi kätkön '
        + 'löytyvän juuri nyt."',
    },
    {
      id: 'krakova',
      mykistetyt: ['saapuminen', 'aarre'],
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
          'Tarun mukaan nuoli osui soittajaan kesken varoitussoiton',
          'Sävelen loppua ei ole koskaan sävelletty',
          'Torni on niin korkea, ettei soittajan henki riitä',
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
      mykistetyt: ['kohtaaminen', 'aarre'],
      otsikko: 'Alpit — koira joka muisti hajun',
      saapuminen: 'Solassa lumi ulottui heinäkuussa polviin, ja luostarin '
        + 'koirat juoksivat edellä varmoin askelin. Yksi niistä '
        + 'pysähtyi kinoksen ääreen eikä suostunut jatkamaan. Kinoksen '
        + 'alta paljastui matkalaukku, jonka messinkikulmiin oli '
        + 'kaiverrettu barometrin kuva. Munkit sanoivat, ettei kukaan '
        + 'ollut ilmoittanut kadottaneensa mitään. Ei sinä vuonna, eikä '
        + 'sitä ennen.',
      henkilo: 'Luostarinveli Anselm kasvattaa suurikokoisia koiriaan '
        + 'vuoristosolan hospitsissa, kuten veljet ennen häntä '
        + 'vuosisatojen ajan.',
      kohtaaminen: 'Hospitsin ovella veli Anselm pitelee koiraa kauluksesta. '
        + '"Tämä koira polveutuu siitä, joka kaivoi isoisäsi laukun '
        + 'lumesta. Suku muistaa, meillä sanotaan. Vastaa kirjan '
        + 'kysymykseen, niin päästän sen etsimään."',
      kysymys: {
        q: 'Alppien solissa pelastustyötä tekivät kuuluisat '
          + 'bernhardilaiskoirat. Mistä ne tunnetaan?',
        vaihtoehdot: [
          'Ne etsivät lumeen eksyneitä ja hautautuneita kulkijoita',
          'Ne vetivät postirekiä solan yli pahimmissa myrskyissä',
          'Ne vartioivat luostarin kellareita ja aarrekammiota',
          'Ne paimensivat luostarin vuohia kesän jyrkänteillä',
        ],
        oikea: 0,
        fakta: 'Pyhän Bernhardin solan munkit kasvattivat koiria, jotka '
          + 'löysivät lumivyöryyn hautautuneet hajun perusteella. '
          + 'Kuuluisin, Barry, pelasti tarinan mukaan yli neljäkymmentä '
          + 'ihmistä.',
      },
      aarre: 'Koira kaivoi kätkön röykkiöstä. "Se ei kaivanut hajun '
        + 'takia", Anselm sanoi, "kivet on ladottu tänä kesänä."',
    },
    {
      id: 'sisilia',
      mykistetyt: ['saapuminen', 'aarre'],
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
      mykistetyt: ['aarre'],
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
      mykistetyt: ['saapuminen', 'aarre'],
      otsikko: 'Dubrovnik — yhdeksässadas askel',
      saapuminen: 'Kävelin muurin koko kehän ja laskin askeleet; vartija '
        + 'käveli rinnallani ja laski ääneen omiaan, sillä hänen '
        + 'mittansa oli toinen. Väittelimme puoli kierrosta. Muurin '
        + 'syvennyksessä irvisti kivinaama, jonka päälle hyppääminen '
        + 'tuo tarun mukaan onnea — hyppäsin, ja vartija merkitsi '
        + 'senkin kirjaansa. Kohteliaisuutta on se, ettei kumpikaan '
        + 'kysynyt miksi.',
      henkilo: 'Muurinvartija Ivo kävelee muurin kehän joka ilta ja laskee '
        + 'askeleensa, kuten vartijat vapaan tasavallan ajoista.',
      kohtaaminen: 'Portin holvissa Ivo laskee avainrengastaan. "Kirjassa lukee, '
        + 'että isoisäsi käveli kehän isoisäni kanssa ja pysähtyi '
        + 'yhdeksännelläsadalla askeleella. Vastaa hänen kysymykseensä, '
        + 'niin pysähdymme samassa kohdassa."',
      kysymys: {
        q: 'Dubrovnik oli vuosisatoja pieni vapaa tasavalta suurten '
          + 'valtojen välissä. Mikä sana sen lipussa luki?',
        vaihtoehdot: [
          'Libertas — vapaus',
          'Fortuna — onni',
          'Veritas — totuus',
          'Victoria — voitto',
        ],
        oikea: 0,
        fakta: 'Ragusan tasavallan lipussa luki Libertas. Kaupunki piti '
          + 'vapautensa taidolla ja kaupankäynnillä, ei sodilla — ja sen '
          + 'muurit ovat silti Euroopan vahvimpia.',
      },
      aarre: 'Yhdeksässadas askel osui kiveen, joka kääntyi '
        + 'saranoillaan: onkalossa odotti kätkö ja lyhty, jonka lasi '
        + 'oli yhä lämmin. "Kehällä ei öisin kulje kukaan muu kuin '
        + 'minä — ei ainakaan pitänyt kulkea", Ivo sanoi.',
    },
    {
      id: 'sarajevo',
      kuva: 'assets/kohtaamiset/kohtaaminen-sarajevo.jpg',
      mykistetyt: ['saapuminen', 'aarre'],
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
      aarre: 'Kupin kaksoispohjan välissä odotti litteä kätkö. Emir '
        + 'piteli kuppia valossa: "Pohja on juotettu auki ja kiinni '
        + 'kahdesti — jälkimmäinen juotos ei ole sukuni kättä."',
    },
    {
      id: 'sofia',
      mykistetyt: ['saapuminen', 'kohtaaminen', 'aarre'],
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
      mykistetyt: ['saapuminen', 'kohtaaminen', 'aarre'],
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
      mykistetyt: ['saapuminen', 'kohtaaminen', 'aarre'],
      otsikko: 'Kiova — merkki portin holvissa',
      saapuminen: 'Istuin piirtämään porttia kirjaani; pieni tyttö katsoi '
        + 'olkani yli ja pudisti päätään: kupoli oli väärän muotoinen. '
        + 'Hän oli oikeassa, ja minä korjasin — kartanpiirtäjä tietää, '
        + 'milloin tarkastaja on pätevä. Holvissa vartija näytti '
        + 'merkin, jota kukaan ei osaa lukea: kolme aaltoviivaa. '
        + 'Tunnistin ne heti — samalla merkillä isoisäni sulki '
        + 'kirjeensä.',
      henkilo: 'Portinvartija Oksana pitää Kultaisen portin avaimia ja '
        + 'tuntee holvin jokaisen kaiverruksen sormenpäillään.',
      kohtaaminen: 'Holvin varjossa Oksana laskee kätensä kaiverrukselle. '
        + '"Suvussani näitä viivoja sanotaan matkamiehen merkiksi, ja '
        + 'meille on opetettu, että tekijän suku palaa lukemaan ne. '
        + 'Vastaa, niin painan kätesi viivoille — ne luetaan '
        + 'sormilla."',
      kysymys: {
        q: 'Kiovan Kultainen portti rakennettiin lähes tuhat vuotta '
          + 'sitten. Mikä sen tehtävä oli?',
        vaihtoehdot: [
          'Se oli muurien juhlava pääportti, josta saavuttiin '
            + 'kaupunkiin',
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
      aarre: 'Sormieni alla kivi liikahti: viivojen takana oli ontelo, '
        + 'ja ontelossa odotti kätkö. Oksana pyyhkäisi pölyn: '
        + '"Viivoja on kolme, mutta neljäs on aloitettu — taltanjälki '
        + 'on tuore, eikä kiviseppiä ole käynyt vuosiin."',
    },
    {
      id: 'odessa',
      mykistetyt: ['kohtaaminen', 'aarre'],
      otsikko: 'Odessa — lyhty jota ei sytytetty',
      saapuminen: 'Satamasta nousivat portaat, joita laskin sataan asti ennen '
        + 'kuin luovutin. Alhaalta katsoen näin vain askelmia, ylhäältä '
        + 'vain tasanteita — kuin portaikko näyttäisi eri asian '
        + 'kummallekin kulkijalle. Puolivälin tasanteella '
        + 'lyhtypylvääseen oli sidottu köydenpätkä merimiessolmulla. '
        + 'Solmu oli isoisäni opettama. Vain hän sitoi sen niin.',
      henkilo: 'Lyhdynsytyttäjä Fjodor sytyttää portaikon lyhdyt joka ilta '
        + 'alhaalta ylös ja sammuttaa ne aamulla ylhäältä alas.',
      kohtaaminen: 'Tasanteella Fjodor nojaa lyhtytankoonsa. "Solmun sitoi '
        + 'kirjasi omistaja isoisoisäni nähden — ja sinä iltana hän '
        + 'jätti tämän yhden lyhdyn sytyttämättä. Meillä sanotaan: '
        + 'valo säästetään sille, joka vielä nousee portaat. Vastaa, '
        + 'niin sytytän sen nyt."',
      kysymys: {
        q: 'Montako askelmaa Odessan jättiläisportaikossa on?',
        vaihtoehdot: [
          'Vajaat kaksisataa',
          'Tasan sata',
          'Yli viisisataa',
          'Kolmekymmentäkolme',
        ],
        oikea: 0,
        fakta: 'Portaikossa on 192 askelmaa ja kymmenen tasannetta, ja se '
          + 'rakennettiin 1800-luvun alkupuoliskolla satamasta '
          + 'kaupunkiin. Mittasuhteet tekevät tempun: alhaalta näkyvät '
          + 'vain askelmat, ylhäältä vain tasanteet — siksi portaikko '
          + 'näyttää loputtomalta.',
      },
      aarre: 'Sytyttämättömän lyhdyn jalustassa oli luukku, ja luukun '
        + 'takana kätkö. Fjodor raapaisi tulen: "Lasi on puhdas — '
        + 'joku on pessyt lyhdyn, jota ei ole sytytetty sataan '
        + 'vuoteen."',
    },
    {
      id: 'moskova',
      mykistetyt: ['aarre'],
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
          'Tulipalon sammutusvesi osui kuumaan pronssiin, ja kylki '
            + 'halkesi',
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
      aarre: 'Lohkeaman kolossa odotti kätkö. "Liitu ei pysy pronssissa '
        + 'vuotta — tämä on tältä talvelta", Vera sanoi.',
    },
    {
      id: 'pietari',
      mykistetyt: ['saapuminen', 'aarre'],
      otsikko: 'Pietari — silta joka odotti laivaa',
      saapuminen: 'Kello löi kaksitoista, taivas hehkui yhä, ja sillat '
        + 'nousivat — minä väärällä rannalla, sillä valoon ei täällä '
        + 'voi luottaa. Vietin yön rantakivellä ja kirjasin ohi '
        + 'lipuvat laivat; vieressäni mies nosti hattuaan jokaiselle '
        + 'mutta piti kirjaa yhdestä. Kun sillat laskettiin, mies oli '
        + 'poissa. Kirja jäi kaiteelle avoinna sivulta, jolla luki: '
        + 'odotamme vielä.',
      henkilo: 'Sillanhoitaja Dmitri nostaa joen sillan joka yö ja laskee '
        + 'sen aamuksi, kuten hänen sukunsa on tehnyt siltojen alusta '
        + 'asti.',
      kohtaaminen: 'Koneiston äärellä Dmitri pitelee vipua. "Kirjaan merkitään '
        + 'laiva, joka ei ole vielä palannut — isoisäsi pyysi sukuani '
        + 'pitämään sivun auki. Vastaa hänen kysymykseensä, niin '
        + 'käännämme sivua yhdessä."',
      kysymys: {
        q: 'Sillat nousevat öisin, sillä joki on kaupungin valtakatu. '
          + 'Millaiselle maalle rakentajat tämän kaupungin pystyttivät?',
        vaihtoehdot: [
          'Nevan suiston soille, tammipaalujen varaan',
          'Graniittiharjulle, joka lohkottiin tasaiseksi',
          'Vanhan merenpohjan hiekalle, joka nousi kuivaksi',
          'Jäätikön jättämälle kivikentälle',
        ],
        oikea: 0,
        fakta: 'Pietari Suuri rakennutti pääkaupunkinsa Nevan suiston soille '
          + 'ja saarille: talot seisovat tammipaalujen varassa ja katuja '
          + 'korotettiin tulvia vastaan. Siksi joki on kaupungin '
          + 'valtakatu — ja siksi sillat aukeavat öisin laivoille.',
      },
      aarre: 'Sillan koneistokammiossa, vivun alla, odotti öljykankainen '
        + 'kätkö. Dmitri avasi odotetun laivan sivun: "Joku on '
        + 'merkinnyt sen palanneeksi viime kesänä — kynällä, jota '
        + 'säilytän lukkojen takana."',
    },
    {
      id: 'helsinki',
      mykistetyt: ['saapuminen', 'kohtaaminen', 'aarre'],
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
      mykistetyt: ['saapuminen', 'aarre'],
      otsikko: 'Tallinna — vahti joka käänsi selkänsä tuulelle',
      saapuminen: 'Ostin päänsärkyyni jauheen apteekista, joka on palvellut '
        + 'torillaan neljäsataa vuotta; kaupan päälle sain '
        + 'martsipania, joka keksittiin täällä lääkkeeksi. Makealta '
        + 'lääkkeeltä se maistuikin. Tornissa peltinen vahti kääntyi '
        + 'tuulen mukana, kuten neljättäsataa vuotta. Kirjasin '
        + 'vihkooni: vahti on nähnyt torin joka sään; minä olin yhden '
        + 'iltapäivän vieras.',
      henkilo: 'Tornimestari Kristjan rasvaa Vana Toomasin laakerit ja '
        + 'nousee torniin joka myrskyn jälkeen katsomaan, että vahti '
        + 'kääntyy yhä.',
      kohtaaminen: 'Tornin portaissa Kristjan kantaa öljykannua. "Vana Toomas on '
        + 'kääntynyt tuuleen kolmesataa vuotta — mutta kerran se '
        + 'osoitti vastatuuleen kokonaisen päivän, ja se päivä on '
        + 'kirjattu. Isoisäsi päivä. Vastaa hänen kysymykseensä, niin '
        + 'näytän kirjauksen."',
      kysymys: {
        q: 'Tarun mukaan nuori Toomas voitti kilpailun, mutta palkinto '
          + 'jäi saamatta. Minkä kilpailun?',
        vaihtoehdot: [
          'Kevätjuhlan jousiammunnan — puisen papukaijan tangosta',
          'Laivojen suuren kilpapurjehduksen Suomenlahden myrskyssä',
          'Raatihuoneen suuren shakkiturnauksen',
          'Painin, jossa kaatui itse raatimieskin',
        ],
        oikea: 0,
        fakta: 'Keväisin ammuttiin jousella puista papukaijaa tangon '
          + 'nokasta, ja köyhä poika Toomas osui ensimmäisenä — mutta '
          + 'palkinto kuului säätyläisille. Hänestä tehtiin lopulta '
          + 'suurempi: kaupungin ikuinen vartija raatihuoneen torniin, '
          + 'vuodesta 1530.',
      },
      aarre: 'Kirjauksen sivujen väliin oli taitettu kätkö. Kristjan '
        + 'piti sivua valoa vasten: "Vastatuulen päivä on merkitty '
        + 'kahdesti, ja jälkimmäinen on viime syksyltä — silloin minä '
        + 'olin tornissa, eikä viiri kääntynyt itsestään."',
    },
    {
      id: 'riika',
      mykistetyt: ['saapuminen', 'aarre'],
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
          'Kaupunkilainen näki väristä kaukaa, mistä tuuli käy',
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
      mykistetyt: ['saapuminen', 'kohtaaminen', 'aarre'],
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
      aarre: 'Suden jalustan alta aukesi kolo, ja kolossa odotti kätkö. '
        + 'Rasa nosti lyhtyään: "Kuluneessa kohdassa on tuore '
        + 'kädenjälki, leveämpi kuin minun — joku on silittänyt sutta '
        + 'tänä yönä, kierrosteni välissä."',
    },
    {
      id: 'tukholma',
      mykistetyt: ['aarre'],
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
      mykistetyt: ['saapuminen', 'aarre'],
      otsikko: 'Oslo — laiva mullan alla',
      saapuminen: 'Talonpoika löi talikon maahan: tämän kummun alla nukkuu '
        + 'laiva, airoineen, ja siinä päällikkö, jonka matka jatkuu '
        + 'yhä. Illalliseksi sain juustoa, ruskeaa kuin laivaterva ja '
        + 'makeaa kuin siirappi; kirjasin sen ilmiönä ja pyysin '
        + 'lisää. Aamulla kummun laella, ainoan pihlajan oksassa, '
        + 'riippui purjelangasta punottu solmu. Tuore.',
      henkilo: 'Talonpoika Sigrid viljelee peltoa, jonka laidalla laivakumpu '
        + 'on ollut hänen sukunsa vartiossa satoja vuosia.',
      kohtaaminen: 'Kummun juurella Sigrid nojaa talikkoonsa. "Isoisäsi '
        + 'leiriytyi tähän kolmeksi yöksi ja lupasi, ettei kaiva — '
        + 'sillä ehdolla suku näytti hänelle jotain. Vastaa hänen '
        + 'kysymykseensä, niin näytän saman sinulle."',
      kysymys: {
        q: 'Kummuista nostetut viikinkilaivat ovat säilyneet lähes '
          + 'ehjinä. Mikä ne säilytti?',
        vaihtoehdot: [
          'Tiivis savimulta, joka sulki ilman pois puun ympäriltä',
          'Terva, jolla laivat siveltiin ennen hautaamista',
          'Pohjolan ikirouta, joka piti kummun jäässä',
          'Suolavesi, joka kyllästi tammilankut kiven koviksi '
            + 'vuosisadoiksi',
        ],
        oikea: 0,
        fakta: 'Sinisavi ja tiivis multa sulkivat hapen pois, ja tammilaivat '
          + 'säilyivät kummuissa vuosisatoja lähes ehjinä kaarineen. '
          + 'Vainajan uskottiin purjehtivan laivallaan tuonpuoleiseen — '
          + 'siksi mukana oli varusteet pitkälle matkalle.',
      },
      aarre: 'Pihlajan juurten välissä, kivien alla, odotti kätkö — ei '
        + 'kummussa vaan sen vieressä. Sigrid osoitti oksan solmua: '
        + '"Sukuni sitoo merkkisolmun kerran vuodessa, mutta tämän '
        + 'vuoden solmu oli valmiina, kun keväällä tulin."',
    },
    {
      id: 'kobenhavn',
      mykistetyt: ['saapuminen', 'kohtaaminen', 'aarre'],
      otsikko: 'Kööpenhamina — satu jota ei kerrottu loppuun',
      saapuminen: 'Laiturilla merimies kertoi lapsille rumasta '
        + 'ankanpoikasesta — sanasta sanaan kuin kirjoittaja itse. '
        + 'Sadun loputtua hän ojensi paperin herralta numerosta '
        + 'kahdeksantoista. Paperilla luki: kaikki tarinat ovat tosia '
        + 'sille, joka etsii loppuun asti. Kirjoitin vastaukseni alle; '
        + 'hän lupasi viedä sen, kunhan herra palaa kävelyltään. Ne '
        + 'kuulemma kestävät.',
      henkilo: 'Sadunkertoja Karen kertoo satuja Nyhavnin laiturilla samalta '
        + 'puiselta arkulta, jolta hänen isoisänsä ne kertoi.',
      kohtaaminen: 'Karen taputtaa arkkua vierestään. "Isoisäni sai arkun '
        + 'sadunkirjoittajalta, ja sinun isoisäsi kuunteli tässä. '
        + 'Arkussa on satu, jota ei ole koskaan kerrottu loppuun. '
        + 'Vastaa, niin avaan arkun ja luemme niin pitkälle kuin satua '
        + 'riittää."',
      kysymys: {
        q: 'Nyhavnin kanavan varrella asui satujen mestari H. C. '
          + 'Andersen. Mikä näistä on hänen satunsa?',
        vaihtoehdot: [
          'Pieni merenneito',
          'Punahilkka',
          'Tuhkimo',
          'Hannu ja Kerttu',
        ],
        oikea: 0,
        fakta: 'Andersen kirjoitti Kööpenhaminassa muun muassa Pienen '
          + 'merenneidon, Ruman ankanpoikasen ja Keisarin uudet vaatteet. '
          + 'Hän asui vuosikymmenet Nyhavnin taloissa 18, 20 ja 67.',
      },
      aarre: 'Arkun kaksoispohjasta löytyi kätkö ja käsikirjoitus, joka '
        + 'katkeaa riville "aarre ei ollut arkussa vaan siinä, joka '
        + 'arkkua…" Viimeinen sana on revitty irti — ja reunat ovat '
        + 'tuoreet.',
    },
    {
      id: 'lappi',
      mykistetyt: ['kohtaaminen', 'aarre'],
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
        + 'Viimeisenä iltana hän kirjoitti kysymyksen muistiin. Vastaa '
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
      mykistetyt: ['saapuminen', 'kohtaaminen', 'aarre'],
      otsikko: 'Tromssa — lyhty joka paloi yöttömässä yössä',
      saapuminen: 'Aurinko ei laskenut. Se vieri taivaanrannan yli kuin '
        + 'kultakolikko, joka ei putoa; mittasin, kuinka alas se '
        + 'suostuu: kämmenen leveyden merestä. Satama eli keskellä '
        + 'yötä; kukaan ei toivottanut hyvää yötä, koska yötä ei '
        + 'tullut. Vain yksi vene lepäsi liikkumatta, mastossa palava '
        + 'lyhty. Se ei pala pimeän takia, sanoi satamavahti. Se palaa '
        + 'merkiksi.',
      henkilo: 'Satamavahti Ingrid pitää keskiyön auringon aikaan kirjaa '
        + 'saapuvista laivoista, koska yö ei sitä tee.',
      kohtaaminen: 'Laiturin päässä Ingrid sulkee lokikirjansa. "Isoisoisäni '
        + 'sytytti tuon lyhdyn yönä, jona isoisäsi laiva lähti '
        + 'yöttömään yöhön, ja suku sytyttää sen yhä: sammutetaan, kun '
        + 'tieto tulee. Vastaa, niin lasken lyhdyn alas ja sammutamme '
        + 'sen yhdessä."',
      kysymys: {
        q: 'Tromssa sai 1800-luvulla lempinimen, joka hämmästytti etelän '
          + 'vieraita. Minkä?',
        vaihtoehdot: [
          'Pohjolan Pariisi',
          'Jäämeren portti',
          'Valaiden satama',
          'Kaamoksen kaupunki',
        ],
        oikea: 0,
        fakta: 'Tromssaa sanottiin Pohjolan Pariisiksi: pieni arktinen '
          + 'satama yllätti vieraat muodillaan, kahviloillaan ja '
          + 'vilkkaudellaan. Jäämeren pyynti ja kauppa toivat maailman '
          + 'tänne — ja keskiyön aurinko piti sataman hereillä kellon '
          + 'ympäri.',
      },
      aarre: 'Lyhdyn öljysäiliön alla, kannen luukussa, odotti kätkö. '
        + 'Ingrid sammutti liekin: "Öljyn olen lisännyt minä joka '
        + 'viikko, mutta sydänlanka on vaihdettu uuteen — eikä '
        + 'vaihtaja ollut minä."',
    },
    {
      id: 'islanti',
      mykistetyt: ['saapuminen', 'kohtaaminen', 'aarre'],
      otsikko: 'Islanti — lähde joka nimesi kaikki muut',
      saapuminen: 'Maa hengitti höyryä. Kellotin lähteen: se kokosi voimansa '
        + 'ja syöksi kiehuvan patsaan niin korkealle, että niskani '
        + 'naksahti — ja vaikeni taas. Merkitsin väliaikoja vihkooni, '
        + 'kunnes oppaani naurahti: lähde ei lue kelloa, herra. '
        + 'Reunakivessä oli kalkin alta kaiverrus: nuoli ja sana, jota '
        + 'en ymmärtänyt. Opas ymmärsi. Hän vaikeni loppumatkan.',
      henkilo: 'Tilallinen Björk asuu lähdelaakson talossa, jonka suku on '
        + 'opastanut matkalaisia kuumille lähteille kuusi polvea.',
      kohtaaminen: 'Tuvan ovella Björk ojentaa peiton harteilleni. '
        + '"Kaiverruksen sana on sukuni murretta, ja vaiennut opas oli '
        + 'isoisoisäni. Sana tarkoittaa: odota purkausta. Vastaa, niin '
        + 'odotamme purkauksen yhdessä — ja kun lähde vaikenee, '
        + 'nostamme nuolen kiven."',
      kysymys: {
        q: 'Islannin kuuluisin kuuma lähde on antanut nimen kaikille '
          + 'maailman purkautuville lähteille. Mikä sana siitä tuli?',
        vaihtoehdot: [
          'Geysir',
          'Vulkaani',
          'Kraatteri',
          'Laguuni',
        ],
        oikea: 0,
        fakta: 'Haukadalurin laakson Geysir — islannin sanasta geysa, '
          + 'syöksyä — purkautui kymmenien metrien korkeuteen. Kaikki '
          + 'maailman purkautuvat kuumat lähteet ovat sen mukaan '
          + 'geysirejä.',
      },
      aarre: 'Purkauksen jälkeen nuolen osoittama kivi oli hetken kuiva, '
        + 'ja sen alta löytyi kätkö. Björk katseli kalkkikerrosta: '
        + '"Kaiverruksen pitäisi olla kokonaan kalkin alla — joku on '
        + 'raaputtanut sen esiin tänä keväänä."',
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
