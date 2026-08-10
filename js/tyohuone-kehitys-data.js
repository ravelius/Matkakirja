/*
 * Työhuoneen Kehitys-välilehden sisältö. Fable kirjoittaa tämän
 * tiedoston; työhuone näyttää sen Kehitys-välilehdellä.
 *
 * KAARI_PAKETIT v2 (9.8.2026 ilta, omistajan palaute): kohtaaminen
 * ja visa yhdistetty yhdeksi kohtaamiseksi jonka päättää OIKEA
 * kysymys vaihtoehtoineen; aarre ja henkilön cliffhanger-vihje
 * yhdistetty. Kohtaamisia ja aarteita lyhennetty vielä lauseella
 * (omistajan palaute 9.8. myöhäisilta), ja aarteita lyhennetty
 * vielä kerran + nuoren herran mietintö kolmeen (Praha, Venetsia,
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
      otsikko: 'Praha — kynttilä tyhjässä talossa',
      saapuminen: 'Kultaisella kujalla, talossa numero kahdeksan, paloi '
        + 'kynttilä, vaikka ovi oli lukossa ja ikkunassa vuosisadan '
        + 'pöly. Sisällä pöydällä odotti avoin kirja, ja sen reunaan '
        + 'oli kirjoitettu barometrini lukema — piirtoa myöten sama kuin '
        + 'omani. Käsiala ei ollut minun. Sinä, joka tätä luet: '
        + 'kynttilä ei sytytä itseään.',
      saapumisLuenta: '[curious] Kultaisella kujalla, talossa numero '
        + 'kahdeksan, paloi kynttilä, vaikka ovi oli lukossa ja '
        + 'ikkunassa vuosisadan pöly. Sisällä pöydällä odotti avoin '
        + 'kirja, ja sen reunaan oli kirjoitettu barometrini lukema — '
        + '[softly] piirtoa myöten sama kuin omani. Käsiala ei ollut '
        + 'minun. [whispers] Sinä, joka tätä luet: kynttilä ei sytytä '
        + 'itseään.',
      henkilo: 'Lyhdynsytyttäjä Tomáš pitää sukunsa lupauksen: talon '
        + 'kahdeksan kynttilä palaa, kunnes etsijä palaa.',
      kohtaaminen: 'Kujalla tikkaiden päällä seisoo lyhdynsytyttäjä Tomáš. '
        + '"Talon kahdeksan kynttilä on sukuni lupaus. Isoisäsi '
        + 'kolkutti tulipalon yönä joka ovea ja herätti koko kujan — '
        + 'meidän ovemme viimeisenä, vaikka savu oli jo portailla. '
        + 'Siitä yöstä liekki on palanut hänen etsijälleen. Vastaa '
        + 'hänen kysymykseensä, niin sytytät sen tänään itse."',
      kohtaamisLuenta: 'Kujalla tikkaiden päällä seisoo lyhdynsytyttäjä '
        + 'Tomáš. [warmly] "Talon kahdeksan kynttilä on sukuni lupaus. '
        + '[excited] Isoisäsi kolkutti tulipalon yönä joka ovea ja '
        + 'herätti koko kujan — meidän ovemme viimeisenä, vaikka savu '
        + 'oli jo portailla. [softly] Siitä yöstä liekki on palanut '
        + 'hänen etsijälleen. Vastaa hänen kysymykseensä, niin sytytät '
        + 'sen tänään itse."',
      kysymys: {
        q: 'Prahan tarun mukaan rabbi teki savesta vartijan, Golemin. '
          + 'Minne Golem kätkettiin, kun se lopulta sammutettiin?',
        vaihtoehdot: [
          'Vanhanuuden synagogan ullakolle',
          'Kaarlensillan holvin alle',
          'Linnan kaivoon',
          'Kultaisen kujan uuniin',
        ],
        oikea: 0,
        fakta: 'Tarun mukaan Golem lepää yhä Vanhanuuden synagogan ullakolla '
          + '— portaat ullakolle purettiin, ettei kukaan pääsisi '
          + 'katsomaan.',
      },
      aarre: 'Tomáš sytytti kynttilänpätkän uudelleen: "Lupauksia on '
        + 'kaksi — toinen liekki palaa jossain, missä maa on lämmin." '
        + 'Jäin miettimään: kuka pitää sitä toista?',
      aarreLuenta: '[warmly] Tomáš sytytti kynttilänpätkän uudelleen: '
        + '"Lupauksia on kaksi — [whispers] toinen liekki palaa jossain, '
        + 'missä maa on lämmin." [curious] Jäin miettimään: kuka pitää '
        + 'sitä toista?',
    },
    {
      id: 'istanbul',
      otsikko: 'Istanbul — upotettu palatsi',
      saapuminen: 'Laskin kahdeksankymmentä porrasta pimeään, ja kaupungin '
        + 'äänet sammuivat yksi kerrallaan. Alhaalla seisoi pylväsmetsä '
        + 'mustassa vedessä, ja yhden pylvään alla lepäsi kivinen kasvo '
        + 'ylösalaisin. Sammutin lyhtyni kokeeksi — ja veden ylle jäi '
        + 'palamaan toinen valo, joka ei ollut minun.',
      henkilo: 'Vedenvartija Emine mittaa säiliön vettä, kuten sukunsa '
        + 'sulttaanien ajoista — ja tuntee molemmat kivikasvot.',
      kohtaaminen: 'Portaiden alla vedenvartija Emine nostaa lyhtyään. "Kirjasi '
        + 'omistaja istui isoisoäitini kanssa koko yön vedenmittoja '
        + 'vertaamassa. Vastaa hänen kysymykseensä, niin soudan sinut '
        + 'kasvojen luo."',
      kysymys: {
        q: 'Säiliön pylvään alla lepää kivinen Medusan pää ylösalaisin. '
          + 'Miksi se tarun mukaan käännettiin?',
        vaihtoehdot: [
          'Jotta kivettävä katse ei osuisi keneenkään',
          'Jotta pylväästä tulisi tukevampi',
          'Kuvanveistäjä erehtyi suunnasta',
          'Sulttaani halusi piilottaa kasvot',
        ],
        oikea: 0,
        fakta: 'Medusan katseen sanottiin muuttavan ihmisen kiveksi — '
          + 'ylösalaisin käännettynä katse painuu maahan. Toinen pää '
          + 'makaa kyljellään samasta syystä.',
      },
      aarre: 'Kun kätkö nousi vedestä, Emine sanoi hiljaa: "Isoisoäitini '
        + 'kirjoitti kirjaan, kumpi kasvoista on vartija ja kumpi vanki '
        + '— joku on leikannut sen sivun irti."',
    },
    {
      id: 'wien',
      mykistetyt: ['saapuminen'],
      otsikko: 'Wien — luiden holvit kirkon alla',
      saapuminen: 'Puoli maailmaa oli Wienissä: maailmannäyttelyn '
        + 'rotunda kohosi Praterissa suurempana kuin yksikään kupoli, '
        + 'jonka olen mitannut, ja sen alla esiteltiin koneita, jotka '
        + 'kutovat, laskevat ja kirjoittavat. Jonotin tunnin päästäkseni '
        + 'sisään ja toisen päästäkseni ulos. Illalla laskeuduin kirkon '
        + 'alle holveihin, joissa kaupunki säilyttää kuolleitaan, ja '
        + 'siellä oli hiljaisempaa kuin missään koko keisarikunnassa. '
        + 'Kynttilöiden liekit taipuivat kaikki samaan suuntaan, vaikka '
        + 'ilma seisoi. Kirjasin molemmat ihmeet samalle sivulle.',
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
        + 'käveltiin lankkuja pitkin kuin laivan kannella — kaupunki ei '
        + 'säikähtänyt, se nosti helmansa ja jatkoi matkaansa. Gondolit '
        + 'ovat kaikki mustia, joka ainoa: laki määräsi niin jo '
        + 'kolmesataa vuotta sitten, kun kilpakoreus kävi liian '
        + 'kalliiksi. Sillan kaiteella odotti valkoinen naamio, jolla '
        + 'oli linnunnokka — ruttolääkärin kasvot, silmäaukot tyhjinä. '
        + 'Kukaan ohikulkija ei vilkaissut sitä. Minä en saanut siitä '
        + 'silmiäni irti.',
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
      otsikko: 'Budapest — hengittävä labyrintti',
      saapuminen: 'Linnan alla aukeaa labyrintti, jonka seinät hikoilevat '
        + 'lämmintä vettä, kuin vuori hengittäisi. Vein kynttilän '
        + 'syvimpään käytävään ja löysin seinästä liidulla piirretyn '
        + 'tähtäinristin — oman merkkini, vaikken ollut käynyt täällä '
        + 'eläissäni. Viiva oli terävä, kuin tänään piirretty.',
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
      aarre: 'Portilla Márta sanoi: "Isoisoäitinikin pyyhki merkin — silti '
        + 'risti on aamulla aina seinässä, aina samaa valkoista '
        + 'liitua." Katsoin vielä taakseni: käytävä oli tyhjä.',
    },
    {
      id: 'lontoo',
      otsikko: 'Lontoo — laskuveden kello',
      saapuminen: 'Sumu nousi joesta niin sakeana, että kadut sammuivat yksi '
        + 'kerrallaan. Silloin kello löi — mutta ääni ei tullut '
        + 'tornista, vaan joen puolelta, laskuveden paljastamalta '
        + 'liejulta. Menin rantaan ja löysin liejuun puoliksi '
        + 'hautautuneen taskukellon, jonka viisarit seisoivat. Sinä, '
        + 'joka tätä luet: kello käy taas. Kuuntele.',
      henkilo: 'Jokilöytäjä Ned etsii laskuveden liejusta joen pudottamia '
        + 'esineitä, kuten hänen sukunsa on etsinyt sata vuotta.',
      kohtaaminen: 'Rannalla jokilöytäjä Ned punnitsee taskukelloa kädessään. '
        + '"Suvussani sanotaan: joki antaa takaisin sen, minkä omistaja '
        + 'unohti. Tämän kannessa on kaksi kirjainta — H. F. Vastaa '
        + 'kirjan kysymykseen, niin kello on sinun."',
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
      aarre: 'Ned avasi kellon kannen: sisällä oli isoisän käsialalla '
        + 'pelkkä kellonaika — sama, johon viisarit olivat pysähtyneet. '
        + '"Joki ei pysäyttänyt tätä kelloa", Ned sanoi hiljaa. "Joku '
        + 'pysäytti sen tahallaan — ja liejussa oli tuoreet jäljet, kun '
        + 'löysin sen."',
    },
    {
      id: 'pariisi',
      mykistetyt: ['saapuminen', 'aarre'],
      otsikko: 'Pariisi — kirja joka odotti rannalla',
      saapuminen: 'Pariisissa posti kulkee maan alla putkissa, pelkän '
        + 'ilmanpaineen työntämänä. Lähetin kokeeksi kirjeen itselleni '
        + 'ja mittasin: neljätoista minuuttia kaupungin poikki, '
        + 'nopeammin kuin vaunut ajavat. Seinen rannalla tein sitten '
        + 'sen, mitä suvussamme ei osata: tingin. Bukinisti kuunteli '
        + 'tarjoustani, nosti hintaa ja katsoi minua säälien. Ostin '
        + 'kirjan silti — sen sivut oli leikattu auki veitsellä, paitsi '
        + 'viimeinen, ja kannessa oli liidulla piirretty tähtäinristi. '
        + 'Minun merkkini, kirjassa jota en ollut eläissäni nähnyt.',
      henkilo: 'Bukinisti Colette myy vanhoja kirjoja Seinen rannalla '
        + 'samasta laatikosta kuin isoisoisänsä.',
      kohtaaminen: 'Colette tuntee laatikkonsa liitumerkin ennen kuin ehdin '
        + 'kysyä. "Isoisoisäni myi tuon kirjan vieraalle — ja sai sen '
        + 'illalla takaisin. Pitäkää tallessa, vieras sanoi, älkääkä '
        + 'myykö toiste: antakaa sille, joka vastaa sen kysymykseen. '
        + 'Kirja on odottanut siitä illasta. Vastaa."',
      kohtaamisLuenta: '[curious] Colette tuntee laatikkonsa liitumerkin '
        + 'ennen kuin ehdin kysyä. "Isoisoisäni myi tuon kirjan '
        + 'vieraalle — ja sai sen illalla takaisin. [softly] Pitäkää '
        + 'tallessa, vieras sanoi, älkääkä myykö toiste: antakaa sille, '
        + 'joka vastaa sen kysymykseen. [warmly] Kirja on odottanut '
        + 'siitä illasta. Vastaa."',
      kysymys: {
        q: 'Notre Damen katedraalin seinillä nököttää kivisiä '
          + 'hirviöhahmoja. Mikä tehtävä gargoyleilla oikeasti on?',
        vaihtoehdot: [
          'Ne ovat syöksytorvia, jotka johtavat sadeveden pois seiniltä',
          'Niiden kidoista kaadettiin kiehuvaa vettä piirittäjien '
            + 'niskaan',
          'Ne kantavat holvien painoa ja johtavat sen alas perustuksiin',
          'Ne ovat rakentajamestarien muotokuvia, jotka veistettiin '
            + 'palkaksi',
        ],
        oikea: 0,
        fakta: 'Gargoylet ovat koristeltuja syöksytorvia: sadevesi virtaa '
          + 'niiden suun läpi kauas seinästä, ettei kivi rapaudu. Nimi '
          + 'tulee ranskan kurlaamista tarkoittavasta sanasta.',
      },
      aarre: 'Kirjan viimeinen, avaamaton sivu kätki litteän kätkön. '
        + 'Colette leikkasi sivun auki ja vaikeni hetkeksi: "Tämä ei ole '
        + 'isoisoisäni veitsenjälkeä. Joku on avannut kirjan kerran — ja '
        + 'ommellut sivun kiinni uudelleen." Lanka oli valkoista, kuin '
        + 'liitu. Yritin vielä ostaa Colettelta toisen kirjan '
        + 'matkamuistoksi. Hän sanoi hinnan, ja minä tarjosin vahingossa '
        + 'enemmän. Suvun vika ei ole laimennut sadassa vuodessa.',
    },
    {
      id: 'berliini',
      otsikko: 'Berliini — kaukoputki joka katsoi tyhjää',
      saapuminen: 'Tähtitornin kupoli oli raollaan, vaikka yö oli pilvinen. '
        + 'Kaukoputki osoitti taivaankohtaan, jossa ei paljain silmin '
        + 'näkynyt mitään — ja messinkiin oli raaputettu lukema, jonka '
        + 'tunsin omakseni. Istuin katsomaan. Pilvet aukesivat '
        + 'hetkeksi, ja tyhjässä kohdassa syttyi sininen piste.',
      henkilo: 'Tähtitornin hoitaja Lotte kirjaa joka yön havainnot kirjaan, '
        + 'jota hänen sukunsa on pitänyt observatorion alusta asti.',
      kohtaaminen: 'Lotte avaa havaintokirjan vuoden 1873 kohdalta. "Tässä: '
        + 'vieras istui kaukoputken ääressä aamuun asti eikä kertonut, '
        + 'mitä etsi. Hän jätti kysymyksen — se on odottanut '
        + 'vastaajaansa siitä yöstä."',
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
      aarre: 'Kätkö oli kaukoputken jalustan ontossa jalassa. Lotte '
        + 'selasi kirjan viimeiselle sivulle: "Sama taivaankohta on '
        + 'kirjattu uudelleen viime talvena. Käsiala ei ole minun — '
        + 'eikä kirja ole poistunut tästä huoneesta." Lotte näppäili '
        + 'havainnon ensin laitteelleen ja kirjoitti sen sitten '
        + 'kirjaan, kynällä. Laitteet vaihtuvat, hän sanoi. Kirja on '
        + 'nähnyt kaikki.',
      aarreLuenta: 'Kätkö oli kaukoputken jalustan ontossa jalassa. '
        + '[curious] Lotte selasi kirjan viimeiselle sivulle: "Sama '
        + 'taivaankohta on kirjattu uudelleen viime talvena. [whispers] '
        + 'Käsiala ei ole minun — eikä kirja ole poistunut tästä '
        + 'huoneesta." Lotte näppäili havainnon ensin laitteelleen ja '
        + 'kirjoitti sen sitten kirjaan, kynällä. [warmly] Laitteet '
        + 'vaihtuvat, hän sanoi. Kirja on nähnyt kaikki.',
    },
    {
      id: 'rooma',
      mykistetyt: ['saapuminen'],
      otsikko: 'Rooma — kolikko joka palasi altaaseen',
      saapuminen: 'Trevin allas oli tyhjennetty puhdistusta varten, ja '
        + 'pohjalta nousi kolikoiden sade — niitä kerätään säkeittäin, '
        + 'ja rahat annetaan köyhille. Yksi kolikko oli muita vanhempi, '
        + 'ja sen reunaan oli viilattu tähtäinristi. Heitin sen takaisin '
        + 'ja tein sen väärin: oikea tapa on oikealla kädellä vasemman '
        + 'olan yli, ja vieressäni seissyt rouva näytti mallin niin '
        + 'arvokkaasti, että heitin toisenkin kolikon, nyt '
        + 'oikeaoppisesti. Köyhät saivat sinä päivänä kaksi ropoa ja '
        + 'minä opetuksen.',
      henkilo: 'Suihkulähteenhoitaja Enzo nostaa Trevin kolikot talteen joka '
        + 'viikko, kuten hänen isänsä ja isoisänsä nostivat.',
      kohtaaminen: 'Enzo kääntelee vanhaa kolikkoa hansikkaassa kädessään. "Tämä '
        + 'nousee altaasta joka ainoa viikko, vaikka panen sen aina '
        + 'talteen. Isäni sanoi: älä kysy keneltä, kysy miksi. Vastaa '
        + 'tavan kysymykseen, niin saat pitää sen."',
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
      aarre: 'Kätkö odotti altaan huoltoluukun takana. Enzo saattoi '
        + 'minut portille: "Tajuatko, mitä vanha kolikko tarkoittaa? '
        + 'Joku heitti sen luvatakseen palata — eikä ole vielä '
        + 'palannut. Tai sitten palaa. Joka viikko." Portin takana '
        + 'sata kohotettua puhelinta kuvasi suihkulähdettä. Yksikään '
        + 'ei kuvannut miestä, joka tietää sen salaisuuden.',
      aarreLuenta: 'Kätkö odotti altaan huoltoluukun takana. [excited] '
        + 'Enzo saattoi minut portille: "Tajuatko, mitä vanha kolikko '
        + 'tarkoittaa? Joku heitti sen luvatakseen palata — eikä ole '
        + 'vielä palannut. [whispers] Tai sitten palaa. Joka viikko." '
        + '[softly] Portin takana sata kohotettua puhelinta kuvasi '
        + 'suihkulähdettä. Yksikään ei kuvannut miestä, joka tietää sen '
        + 'salaisuuden.',
    },
    {
      id: 'madrid',
      otsikko: 'Madrid — kolmastoista lyönti',
      saapuminen: 'Puerta del Solin kello löi keskiyön, ja laskin lyönnit '
        + 'vanhasta tottumuksesta. Niitä oli kolmetoista. Aukiolla '
        + 'kukaan muu ei ollut kuulevinaan — mutta tornin ikkunassa '
        + 'paloi valo, ja varjo kumartui koneiston ylle kuin anteeksi '
        + 'pyytäen.',
      henkilo: 'Kellomestari Pilar hoitaa Puerta del Solin kelloa, jonka '
        + 'mukaan koko Espanja laskee uudenvuoden rypäleensä.',
      kohtaaminen: 'Tornissa Pilar valvoo koneiston vieressä. "Kello ei lyö '
        + 'kolmeatoista — paitsi jos joku lisää lyönnin käsin. '
        + 'Suvussani sanotaan, että se on viesti. Vastaa kysymykseen, '
        + 'niin näytän, mihin viesti osoittaa."',
      kysymys: {
        q: 'Mitä madridilaiset tekevät, kun tämä kello lyö kaksitoista '
          + 'kertaa uudenvuodenyönä?',
        vaihtoehdot: [
          'Syövät viinirypäleen joka lyönnillä',
          'Soittavat kaikkia kirkonkelloja',
          'Sytyttävät kaksitoista kynttilää',
          'Heittävät kolikon suihkulähteeseen',
        ],
        oikea: 0,
        fakta: 'Uudenvuoden tapa on syödä kaksitoista rypälettä, yksi joka '
          + 'lyönnillä — onneksi jokaiselle kuukaudelle. Tapa levisi '
          + 'Madridista koko maahan.',
      },
      aarre: 'Kolmastoista lyönti oli viesti: se osoitti koneiston '
        + 'huoltotilaan, jossa kätkö odotti. Pilar sammutti tornin '
        + 'valon: "Lyönti lisättiin koneistoon kauan ennen minua. Mutta '
        + 'joku kävi virittämässä sen uudelleen — tänä keväänä."',
    },
    {
      id: 'ateena',
      // Kohtaamiskuva (Opus 3:n pilotti 10.8.2026): näkyy kohtaamis-
      // kortilla tekstin oikealla puolella.
      kuva: 'assets/kohtaamiset/kohtaaminen-ateena.jpg',
      otsikko: 'Ateena — pöllö joka vartioi rahaa',
      saapuminen: 'Pöllö istui kaatuneella pylväällä ja katsoi minua '
        + 'liikahtamatta, kuin vaatisi selitystä myöhästymisestäni. '
        + 'Mittasin tuijotuksemme keston: seitsemän minuuttia, ja '
        + 'minä käänsin katseeni ensin. Olen pitänyt suuntani '
        + 'myrskyssä kolmella merellä, mutta hävisin linnulle, joka '
        + 'ei edes räpäyttänyt. Vasta sitten näin sen jalan alla '
        + 'hopearahan — vanhemman kuin mikään, mitä olen mitannut. '
        + 'Kun kumarruin, pöllö ei lentänyt pois. Se siirtyi askeleen '
        + 'ja jäi katsomaan, mitä tekisin.',
      saapumisLuenta: '[curious] Pöllö istui kaatuneella pylväällä ja '
        + 'katsoi minua liikahtamatta, kuin vaatisi selitystä '
        + 'myöhästymisestäni. Mittasin tuijotuksemme keston: seitsemän '
        + 'minuuttia, ja minä käänsin katseeni ensin. [softly] Olen '
        + 'pitänyt suuntani myrskyssä kolmella merellä, mutta hävisin '
        + 'linnulle, joka ei edes räpäyttänyt. [whispers] Vasta sitten '
        + 'näin sen jalan alla hopearahan — vanhemman kuin mikään, mitä '
        + 'olen mitannut. Kun kumarruin, pöllö ei lentänyt pois. Se '
        + 'siirtyi askeleen ja jäi katsomaan, mitä tekisin.',
      henkilo: 'Marmorinveistäjä Nikos korjaa Akropoliin pylväitä ja tuntee '
        + 'jokaisen kiven — ja rahan, jota siellä vartioidaan.',
      kohtaaminen: 'Nikos laskee talttansa nähdessään rahan. "Isoisoisäni löysi '
        + 'samanlaisen ja pani sen takaisin — hän sanoi, että pöllö '
        + 'laskee ne. Kirjasi omistaja tiesi rahasta. Vastaa hänen '
        + 'kysymykseensä, niin raha ei jää vartioimatta."',
      kysymys: {
        q: 'Minkä linnun muinaiset ateenalaiset löivät hopearahoihinsa?',
        vaihtoehdot: [
          'Pöllön',
          'Kotkan',
          'Riikinkukon',
          'Joutsenen',
        ],
        oikea: 0,
        fakta: 'Ateenan tetradrakmassa oli Athene-jumalattaren pöllö, '
          + 'viisauden merkki. "Viedä pöllöjä Ateenaan" tarkoittaa yhä '
          + 'turhaa työtä — niitä oli siellä jo valmiiksi.',
      },
      aarre: 'Kätkö oli pylvään onkalossa, rahan alla. Nikos katsoi ylös '
        + 'rinteeseen: "Pöllö on istunut samalla pylväällä joka ilta '
        + 'niin kauan kuin suku muistaa. Kukaan ei tiedä, kuka sitä '
        + 'ruokkii."',
    },
    {
      id: 'lissabon',
      mykistetyt: ['saapuminen'],
      otsikko: 'Lissabon — laatta jota ei poltettu loppuun',
      saapuminen: 'Belémin tornin juurella vartija vannoi, että torni '
        + 'seisoo keskellä jokea siksi, että joki siirtyi — ei torni. '
        + 'Kirjasin väitteen varauksella ja söin sillä aikaa kolmannen '
        + 'kermaleivoksen: reseptin loivat munkit viereisessä '
        + 'luostarissa, ja se on yhä salaisuus, jonka tuntee vain '
        + 'kourallinen eläviä. Laskuveden rajassa kivessä oli rengas, '
        + 'syvälle kulunut — sata vuotta laivoja, jotka eivät enää käy. '
        + 'Nousuvesi peitti sen silmissäni.',
      henkilo: 'Laattamestari Inês polttaa sinivalkoisia azulejo-laattoja '
        + 'samassa uunissa kuin sukunsa kolmesataa vuotta.',
      kohtaaminen: 'Työpajassa laattamestari Inês pyyhkii savipölyn käsistään. '
        + '"Isoisäsi maalasi suvullemme laatan omalla kädellään, '
        + 'mutta laiva vei hänet ennen polttopäivää. Pajassamme '
        + 'keskeneräistä työtä ei hävitetä — laatta on odottanut '
        + 'maalariaan raakana tähän päivään. Vastaa hänen '
        + 'kysymykseensä, niin sytytän uunin."',
      kohtaamisLuenta: 'Työpajassa laattamestari Inês pyyhkii savipölyn '
        + 'käsistään. [warmly] "Isoisäsi maalasi suvullemme laatan '
        + 'omalla kädellään, mutta laiva vei hänet ennen polttopäivää. '
        + '[softly] Pajassamme keskeneräistä työtä ei hävitetä — laatta '
        + 'on odottanut maalariaan raakana tähän päivään. [excited] '
        + 'Vastaa hänen kysymykseensä, niin sytytän uunin."',
      kysymys: {
        q: 'Lissabonin talojen seinät hohtavat sinivalkoisina. Mitä ovat '
          + 'azulejot?',
        vaihtoehdot: [
          'Maalattuja kaakelilaattoja, jotka päällystävät kokonaisia '
            + 'taloja',
          'Sinisiksi maalattuja ikkunaluukkuja, jotka suljetaan päivän '
            + 'kuumimmaksi ajaksi',
          'Meren heijastuksia, jotka valkoiseksi kalkittu kivi kerää ja '
            + 'toistaa',
          'Purjekankaasta ommeltuja seinävaatteita kadonneiden laivojen '
            + 'muistoksi',
        ],
        oikea: 0,
        fakta: 'Azulejo on tinalasitettu kaakelilaatta. Nimi tulee arabian '
          + 'sanasta az-zulayj, \'kiillotettu kivi\' — laatat viilentävät '
          + 'taloja ja kertovat seinillä kokonaisia tarinoita.',
      },
      aarre: 'Laatta halkesi uunissa kahtia, ja sauman sisältä putosi '
        + 'kätkö. Inês tutki puolikkaita kauan: "Kuvio jatkuu laatalla, '
        + 'jota minun uunissani ei ole koskaan poltettu. Jossain on '
        + 'toinen uuni."',
    },
    {
      id: 'amsterdam',
      otsikko: 'Amsterdam — arkku väärässä kerroksessa',
      saapuminen: 'Kanavan varrella talot nojaavat eteenpäin kuin kuuntelisivat '
        + 'vettä. Yhden päätykolmiossa riippui nostokoukku, ja koukussa '
        + 'köysi keskellä yötä — vaikka muuttopäivä ei ollut. Köyden '
        + 'päässä laskeutui ikkunani ohi arkku, joka pysähtyi '
        + 'täsmälleen minun ikkunani kohdalle. Arkussa ei ollut lukkoa, '
        + 'vain lappu: väärä kerros.',
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
        q: 'Dublinin rautainen jalankulkusilta tunnetaan nimellä '
          + 'Ha\'penny Bridge. Mistä nimi tulee?',
        vaihtoehdot: [
          'Ylityksestä perittiin puolen pennin maksu',
          'Silta maksoi rakentaa puoli penniä metriltä',
          'Sillan kaari on pennin kolikon muotoinen',
          'Rakentajan nimi oli Halfpenny',
        ],
        oikea: 0,
        fakta: 'Silta avattiin 1816, ja ylitys maksoi puoli penniä — saman '
          + 'verran kuin lautturi oli ottanut. Maksu poistui vasta 1919, '
          + 'mutta nimi jäi.',
      },
      aarre: 'Lantin alta, kukkaron saumasta, löytyi taitettu kätkö. Molly '
        + 'käänsi lanttia valossa: "Tämä on lyöty vuonna, jota ei vielä '
        + 'ollut, kun isoisoisäni sai kukkaron." Jäin miettimään, kuka '
        + 'kukkaroa on täyttänyt.',
    },
    {
      id: 'edinburgh',
      mykistetyt: ['saapuminen'],
      otsikko: 'Edinburgh — sekunnin ero',
      saapuminen: 'Linnan kalliolla tykki jyrähti täsmälleen yhdeltä, ja '
        + 'kaupungin kellot vastasivat sille. Kirkkomaalla pieni koira '
        + 'vartioi hautaa eikä suostunut lähtemään; istuin sen viereen, '
        + 'ja lähtiessäni jätin haudalle käyntikorttini, kulma '
        + 'taitettuna niin kuin tapa vaatii. Illalla huomasin '
        + 'taittaneeni väärän kulman: surunvalittelun sijaan olin '
        + 'jättänyt onnittelun. Koira ei pitänyt sitä minään. Minä '
        + 'pidin, koko viikon.',
      henkilo: 'Tykkimestari Ewan lataa linnan yhden lyönnin tykin joka '
        + 'päivä, kuten isoisänsä ennen häntä.',
      kohtaaminen: 'Vallilla tykkimestari Ewan kuuraa piippua. "Isoisäsi seisoi '
        + 'tässä kellonsa kanssa ja vertasi lyöntiä tykkiimme — kirjasi '
        + 'mukaan ne erosivat sekunnilla. Vastaa hänen kysymykseensä, '
        + 'niin näytän, kumpi kävi edellä."',
      kysymys: {
        q: 'Edinburghin linnasta ammutaan tykinlaukaus joka päivä. Mihin '
          + 'aikaan — ja miksi juuri silloin?',
        vaihtoehdot: [
          'Kello yhdeltä, koska yksi laukaus on halvempi kuin '
            + 'kaksitoista',
          'Keskipäivällä, jolloin aurinko seisoo korkeimmillaan etelässä',
          'Auringonlaskun aikaan, jolloin linnan vartio vaihtuu '
            + 'valleilla',
          'Aamukuudelta, jotta koko kaupunki heräsi samaan aikaan',
        ],
        oikea: 0,
        fakta: 'Laivat tarvitsivat tarkan ajan kellojensa asettamiseen. '
          + 'Skotlantilaisen säästäväisyyden sanotaan ratkaisseen '
          + 'ajankohdan: yhdeltä riittää yksi laukaus — keskipäivällä '
          + 'olisi tarvittu kaksitoista.',
      },
      aarre: 'Kätkö oli muurattu vallin kiveen tykin taakse. Ewan luki '
        + 'mukana olleen lapun ja hiljeni: "Tässä pyydetään öljyämään '
        + 'erästä lukkoa kerran vuodessa. Suku on öljynnyt — mutta '
        + 'kukaan ei tiedä, minkä oven lukko se on."',
    },
    {
      id: 'barcelona',
      otsikko: 'Barcelona — lohikäärme ja tuore ruusu',
      saapuminen: 'Goottilaiskorttelin kujat kapenivat, kunnes taivas oli enää '
        + 'viiva. Erään portin yllä lohikäärmeen kivinen pää työntyi '
        + 'seinästä, ja sen hampaissa riippui kuihtunut ruusu — vaikka '
        + 'ruusujen päivästä oli kuukausia. Portinvartija sanoi, että '
        + 'ruusu vaihtuu tuoreeseen joka vuosi samana yönä. Kukaan ei '
        + 'ole nähnyt vaihtajaa.',
      henkilo: 'Kirjansitoja Mercè sitoo kirjoja kujalla, jolla hänen '
        + 'sukunsa on myynyt ruusuja ja kirjoja pyhän Jordin päivänä '
        + 'sata vuotta.',
      kohtaaminen: 'Mercè nostaa katseensa neulasta ja langasta. "Isoisäsi jätti '
        + 'suvulleni kirjan sidottavaksi — ja käski antaa sen vain '
        + 'sille, joka tietää, miksi tässä kaupungissa lohikäärme '
        + 'kantaa ruusua. Vastaa, niin saat sidoksen."',
      kysymys: {
        q: 'Barcelonan suojeluspyhimys on lohikäärmeen kaatanut Sant '
          + 'Jordi. Miten hänen päiväänsä juhlitaan huhtikuussa?',
        vaihtoehdot: [
          'Lahjoittamalla toisille ruusuja ja kirjoja',
          'Polttamalla lohikäärmeen kuvia kokoissa',
          'Uimalla meressä auringonnousun aikaan',
          'Rakentamalla toreille ihmistorneja',
        ],
        oikea: 0,
        fakta: 'Tarun mukaan lohikäärmeen verestä kasvoi ruusupensas. Sant '
          + 'Jordin päivänä 23. huhtikuuta kadut täyttyvät ruusu- ja '
          + 'kirjakojuista — se on kirjan ja rakkauden juhla.',
      },
      aarre: 'Sidoksen selkämys kätki ontelon, ja ontelossa odotti kätkö '
        + '— ja tuoreen ruusun terälehti. Mercè katsoi kujalle: '
        + '"Ruusujen päivään on puoli vuotta. Tämä on poimittu tänä '
        + 'aamuna." Kujan suulla kohosi kirkko, josta isoisän kirja '
        + 'ei tiedä mitään — sitä ei ollut hänen käydessään vielä '
        + 'aloitettu, eikä se ole tänäänkään valmis. Tässä '
        + 'kaupungissa sata vuotta on lyhyt aika, sanoi Mercè.',
      aarreLuenta: 'Sidoksen selkämys kätki ontelon, ja ontelossa odotti '
        + 'kätkö — ja tuoreen ruusun terälehti. [whispers] Mercè katsoi '
        + 'kujalle: "Ruusujen päivään on puoli vuotta. Tämä on poimittu '
        + 'tänä aamuna." [curious] Kujan suulla kohosi kirkko, josta '
        + 'isoisän kirja ei tiedä mitään — sitä ei ollut hänen '
        + 'käydessään vielä aloitettu, eikä se ole tänäänkään valmis. '
        + '[warmly] Tässä kaupungissa sata vuotta on lyhyt aika, sanoi '
        + 'Mercè.',
    },
    {
      id: 'granada',
      mykistetyt: ['saapuminen'],
      otsikko: 'Granada — vesi joka näyttää tien',
      saapuminen: 'Join Alhambrassa vettä, joka oli jääkylmää keskellä '
        + 'Andalusian kesää: se laskee vuorilta, joiden huipuilla lumi '
        + 'ei sula edes heinäkuussa, ja seitsemänsataa vuotta vanhat '
        + 'kourut kantavat sen palatsin joka huoneeseen. Istuin '
        + 'suihkulähteen ääreen ja laskin altaat: kaksitoista. Veden '
        + 'solina ei lakannut hetkeksikään, ja vanha puutarhuri sanoi, '
        + 'että se on talon kello — joka huoneessa aika kulkee veden '
        + 'äänellä. Kirjoitin sen muistiin sanasta sanaan.',
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
      aarre: 'Kourujen risteyksessä veden alla odotti kivinen rasia. Yusuf '
        + 'punnitsi sitä kädessään: "Vesi olisi kuluttanut tämän '
        + 'sileäksi sadassa vuodessa — mutta särmät ovat terävät. Se on '
        + 'laskettu veteen hiljattain."',
    },
    {
      id: 'marseille',
      mykistetyt: ['saapuminen'],
      otsikko: 'Marseille — saari josta palataan tarinoissa',
      saapuminen: 'Sataman edustalla saari nousi merestä kuin kivinen '
        + 'laiva, ja soutaja kieltäytyi ensin viemästä minua: saarelta '
        + 'palataan vain tarinoissa, hän sanoi. Tarjosin pyydetyn maksun '
        + 'tinkimättä, mikä teki hänet vain epäluuloisemmaksi — jouduin '
        + 'lupaamaan, että palattuani kerron tarinani hänelle '
        + 'ensimmäisenä. Muurin juurella, vedenrajassa, kiveen oli '
        + 'hakattu nuoli, joka osoitti alaspäin veden alle. Pidin '
        + 'lupaukseni paluumatkalla. Soutaja souti hitaammin kuin '
        + 'tullessa.',
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
      aarre: 'Nuolen alta, laskuveden paljastamasta kolosta, nousi arkku. '
        + 'Baptiste katsoi merelle: "Tämä on kevyempi kuin se, jonka '
        + 'isäni isä souti maihin. Jossain on toinen arkku — ja se, '
        + 'joka jakoi lastin kahtia."',
    },
    {
      id: 'varsova',
      otsikko: 'Varsova — verkko joka painoi',
      saapuminen: 'Kalastajat vetivät verkkonsa joesta tyhjinä, mutta '
        + 'viimeinen verkko painoi — ja kun tartuin auttaakseni, '
        + 'pohja veti takaisin. Kolmen miehen voimin saimme sen '
        + 'rantaan: silmukoissa ei ollut kalaa vaan vaakuna, kilpi ja '
        + 'miekka, virran vihreäksi syömä — kaupungin oma merkki. '
        + 'Vanhin kalastajista risti kätensä eikä koskenut siihen. '
        + 'Hän sanoi vain: tämä on nostettu kerran ennenkin, ja '
        + 'silloin joki otti sen takaisin. Sinä yönä nukuin huonosti '
        + 'ja kuuntelin, nousiko vesi.',
      saapumisLuenta: '[excited] Kalastajat vetivät verkkonsa joesta '
        + 'tyhjinä, mutta viimeinen verkko painoi — ja kun tartuin '
        + 'auttaakseni, pohja veti takaisin. Kolmen miehen voimin saimme '
        + 'sen rantaan: silmukoissa ei ollut kalaa vaan vaakuna, kilpi '
        + 'ja miekka, virran vihreäksi syömä — kaupungin oma merkki. '
        + '[softly] Vanhin kalastajista risti kätensä eikä koskenut '
        + 'siihen. Hän sanoi vain: tämä on nostettu kerran ennenkin, ja '
        + 'silloin joki otti sen takaisin. [whispers] Sinä yönä nukuin '
        + 'huonosti ja kuuntelin, nousiko vesi.',
      henkilo: 'Kalastaja Jadwiga paikkaa verkkoja Veikselin rannalla ja '
        + 'laulaa työlauluja, joita ei osaa enää kukaan muu.',
      kohtaaminen: 'Jadwiga solmii verkon silmää katsettaan nostamatta. '
        + '"Suvussani sanotaan: mereneito lupasi puolustaa kaupunkia, '
        + 'koska kalastaja päästi hänet vapaaksi. Isoisäsi kirjoitti '
        + 'lupauksen muistiin. Vastaa hänen kysymykseensä, niin kerron '
        + 'minne."',
      kysymys: {
        q: 'Varsovan vaakunassa on syrenka, mereneito. Mitä hän pitää '
          + 'käsissään?',
        vaihtoehdot: [
          'Miekkaa ja kilpeä',
          'Verkkoa ja airoa',
          'Avainta ja kruunua',
          'Kalaa ja helminauhaa',
        ],
        oikea: 0,
        fakta: 'Varsovan mereneito on kaupungin puolustaja: kohotettu miekka '
          + 'ja kilpi. Tarun mukaan kalastaja vapautti hänet verkosta, ja '
          + 'kiitokseksi hän lupasi suojella kaupunkia.',
      },
      aarre: 'Kätkö oli upotettu rantakiven alle verkonpainojen sekaan. '
        + 'Jadwiga laski sen käteeni ja katsoi jokea: "Painot ovat '
        + 'sukuni valamia — paitsi yksi. Sen valoi joku, joka halusi '
        + 'kätkön löytyvän juuri nyt."',
    },
    {
      id: 'krakova',
      otsikko: 'Krakova — sävel joka katkeaa kesken',
      saapuminen: 'Torin ylle, tornin ikkunasta, nousi torvensoitto — ja '
        + 'katkesi kesken sävelen, kuin veitsellä leikaten. Väki jatkoi '
        + 'kulkuaan, mutta minä jäin laskemaan: soitto katkesi joka '
        + 'tunti täsmälleen samalla nuotilla. Paitsi keskiyöllä. '
        + 'Silloin torvi soitti sävelen loppuun asti, eikä torilla '
        + 'ollut ketään muuta kuulemassa.',
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
      aarre: 'Soittajan penkin alta, hirren sisästä, löytyi kapea lipas. '
        + 'Stanisław avasi sen ja veti esiin nuotin: "Tämä on hejnałin '
        + 'loppu — käsin kirjoitettuna. Mutta käsiala ei ole yhdenkään '
        + 'soittajan, jonka suku muistaa."',
    },
    {
      id: 'alpit',
      otsikko: 'Alpit — koira joka muisti hajun',
      saapuminen: 'Solassa lumi ulottui heinäkuussa polviin, ja luostarin '
        + 'koirat juoksivat edellä varmoin askelin. Yksi niistä '
        + 'pysähtyi kinoksen ääreen eikä suostunut jatkamaan. Kinoksen '
        + 'alta paljastui matkalaukku, jonka messinkikulmiin oli '
        + 'kaiverrettu barometrin kuva. Munkit sanoivat, ettei kukaan '
        + 'ollut ilmoittanut kadottaneensa mitään. Ei sinä vuonna, eikä '
        + 'sitä ennen.',
      henkilo: 'Luostarinveli Anselm kasvattaa pelastuskoiria vuoristosolan '
        + 'hospitsissa, kuten veljet ennen häntä vuosisatojen ajan.',
      kohtaaminen: 'Hospitsin ovella veli Anselm pitelee koiraa kauluksesta. '
        + '"Tämä koira polveutuu siitä, joka kaivoi isoisäsi laukun '
        + 'lumesta. Suku muistaa hajun, meillä sanotaan. Vastaa kirjan '
        + 'kysymykseen, niin annan sen näyttää, minkä hajun se '
        + 'muistaa."',
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
      aarre: 'Koira kaivoi kätkön esiin kiviröykkiön juurelta. Anselm '
        + 'silitti sen päätä ja sanoi hitaasti: "Se ei kaivanut hajun '
        + 'takia. Röykkiön kivet on ladottu uudelleen — tänä kesänä."',
    },
    {
      id: 'sisilia',
      mykistetyt: ['saapuminen'],
      otsikko: 'Sisilia — nukke jonka tarinaa ei esitetty',
      saapuminen: 'Soutajani kieltäytyi katsomasta vuorta, joka savusi '
        + 'taivaanrantaan — hän sanoi, että Etna hengittää: sisään sata '
        + 'vuotta, ulos sata vuotta. Rannassa mustat kivipaadet nousivat '
        + 'merestä; kalastajat sanovat niitä kykloopin heittämiksi, ja '
        + 'minä kirjasin karttaan: heittäjä tuntematon. Yhden paaden '
        + 'laelle joku oli latonut pienistä kivistä keon — merimerkin, '
        + 'jota ei ole yhdessäkään kartassa. Kysyin siitä illalla '
        + 'kalastajilta. He nauroivat: keko on heidän, matalikko alkaa '
        + 'siitä. Merkitsin matalikon karttaani ja kiitin opista. Kaikki '
        + 'merkit eivät ole arvoituksia; jotkut ovat vain totta.',
      henkilo: 'Nukketeatterin mestari Rosalia liikuttaa ritarinukkeja, '
        + 'joiden haarniskat hänen sukunsa on takonut neljässä '
        + 'polvessa.',
      kohtaaminen: 'Näyttämön takana Rosalia ripustaa ritarin naulaansa. '
        + '"Isoisäsi istui katsomossa kolme iltaa peräkkäin — ja '
        + 'neljäntenä hän toi meille nuken, jonka tarinaa ei ole vielä '
        + 'esitetty. Vastaa hänen kysymykseensä, niin nostan sen '
        + 'naulasta."',
      kysymys: {
        q: 'Sisilian yllä kohoaa savuava Etna. Mikä se on?',
        vaihtoehdot: [
          'Euroopan korkein toimiva tulivuori',
          'Sammunut tulivuori, jonka huipulla on järvi',
          'Saaren korkein hiekkadyyni',
          'Vanha kaivos, joka savuaa yhä',
        ],
        oikea: 0,
        fakta: 'Etna on yli 3300 metriä korkea ja purkautuu yhä vähän väliä. '
          + 'Tarun mukaan sen alla makaa jättiläinen, jonka kääntyilystä '
          + 'maa järisee — tuhka tekee rinteiden viinitarhoista reheviä.',
      },
      aarre: 'Nuken haarniskan alla, puurungon ontelossa, odotti kätkö. '
        + 'Rosalia käänsi nukkea valoon: "Haarniska on sukuni takoma — '
        + 'mutta joku on kiillottanut sen. Naulassa ei kiillä mikään '
        + 'muu."',
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
        q: 'Kreetan tarustossa Theseus selvisi Minotauroksen sokkelosta '
          + 'Ariadnen avulla. Mikä Ariadnen keino oli?',
        vaihtoehdot: [
          'Lankakerä, jonka jälkiä pitkin pääsi takaisin ulos',
          'Kartta, jonka sokkelon rakentaja oli itse piirtänyt',
          'Soihtu, jonka liekki ei sammunut sokkelon vedossa',
          'Huilu, jonka sävel nukutti hirviön syvään uneen',
        ],
        oikea: 0,
        fakta: 'Ariadne antoi Theseukselle lankakerän: pää sidottiin ovelle '
          + 'ja kerä purkautui matkalla. Paluutie löytyi lankaa '
          + 'seuraamalla — siksi johtolankaa sanotaan yhä langaksi.',
      },
      aarre: 'Vanhan langan päästä, kiven kolosta, löytyi kätkö. Eleni '
        + 'kelasi haurasta lankaa sormelleen: "Solmu on sukuni solmu. '
        + 'Mutta lanka jatkuu syvemmälle — ja jatko on kehrätty tänä '
        + 'vuonna." Puhelimeni valo sammui luolan suulla — neljä '
        + 'prosenttia, niin kuin aina kun sitä tarvitsisi. Eleni ojensi '
        + 'lyhdyn sanaakaan sanomatta. Kirjoitin muistiin: lyhty ei '
        + 'lataudu, eikä tarvitse.',
    },
    {
      id: 'dubrovnik',
      mykistetyt: ['saapuminen'],
      otsikko: 'Dubrovnik — yhdeksässadas askel',
      saapuminen: 'Kävelin kaupunginmuurin koko kehän ja laskin askeleet '
        + '— vartija käveli rinnallani ja laski ääneen omiaan, sillä '
        + 'hänen mittansa oli eri kuin minun, ja väittely siitä kesti '
        + 'puolet kierroksesta. Muurinvierustalla, pienessä '
        + 'syvennyksessä, irvisti kivinen naama, jonka päälle '
        + 'hyppääminen tuo tarun mukaan onnea. Hyppäsin. Vartija '
        + 'merkitsi senkin muistiin. Kohteliaisuutta on täällä se, ettei '
        + 'kumpikaan kysynyt miksi.',
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
      aarre: 'Yhdeksässadas askel osui kiveen, joka kääntyi saranoillaan. '
        + 'Ivo veti onkalosta kätkön — ja lyhdyn, jonka lasi oli yhä '
        + 'lämmin. "Kehällä ei öisin kulje kukaan muu kuin minä. Ei '
        + 'ainakaan pitänyt kulkea."',
    },
    {
      id: 'sarajevo',
      otsikko: 'Sarajevo — kaivo joka kutsuu takaisin',
      /*
       * QA-korjaus 9.8.2026 (Sonnet 1): torilla EI ollut kaivoa 1873 —
       * vanha Sebilj paloi 1852 ja nykyinen rakennettiin vasta 1891.
       * Isoisä kuulee siksi PALANEEN kaivon tarinan sepältä; nykyhetken
       * kohtaaminen, visa ja aarre koskevat torilla tänään seisovaa
       * kaivoa, joten ne pysyvät ennallaan.
       */
      saapuminen: 'Basaarin kujat soivat: sepät takoivat kuparia, ja jokainen '
        + 'vasara löi omaa tahtiaan. Vanha seppä kertoi torin '
        + 'kaivosta, joka oli palanut ennen hänen aikaansa: joka siitä '
        + 'joi, palasi vielä kaupunkiin. Kaivoa ei enää ole, sanoin. '
        + 'Tarina ei palanut, seppä vastasi ja ojensi kupin vettä. '
        + 'Kupin pohjassa oli kaksi kaiverrettua kirjainta, jotka '
        + 'tunnen: H. F.',
      henkilo: 'Kupariseppä Emir takoo kannuja ja kuppeja kujalla, jolla '
        + 'hänen sukunsa paja on soinut kolmesataa vuotta.',
      kohtaaminen: 'Pajan ovella Emir kääntelee kuparilevyä pihdeissään. '
        + '"Isoisäsi tilasi sukuni pajasta kaksi kuppia — toisen hän '
        + 'vei, toinen jäi odottamaan. Vastaa hänen kysymykseensä, niin '
        + 'haen sen hyllyltä."',
      kysymys: {
        q: 'Sarajevon torilla seisoo puinen sebilj-kaivo. Mitä siitä '
          + 'juovalle tarun mukaan tapahtuu?',
        vaihtoehdot: [
          'Hän palaa vielä kerran Sarajevoon',
          'Hän oppii ymmärtämään lintujen kieltä',
          'Hän ei enää koskaan eksy kujilla',
          'Hänen väsymyksensä katoaa saman tien',
        ],
        oikea: 0,
        fakta: 'Sebilj on kaivo, josta jaettiin vettä janoisille '
          + 'kulkijoille. Tarun mukaan sen vettä juonut palaa kaupunkiin '
          + 'vielä kerran — siksi moni matkalainen juo kupillisen '
          + 'lähtiäisiksi.',
      },
      aarre: 'Kupin kaksoispohjan välissä odotti litteä kätkö. Emir piteli '
        + 'kuppia valossa ja kurtisti kulmiaan: "Pohja on juotettu auki '
        + 'ja kiinni kahdesti. Jälkimmäinen juotos ei ole sukuni '
        + 'kättä."',
    },
    {
      id: 'sofia',
      kuva: 'assets/kohtaamiset/kohtaaminen-sofia.jpg',
      otsikko: 'Sofia — lähde joka kirjattiin sata vuotta',
      saapuminen: 'Keskellä kaupunkia maa hönkäisi lämmintä: lähde kumpusi '
        + 'kuumana kivialtaaseen, ja ihmiset jonottivat kannuineen '
        + 'höyryssä. Altaan reunalla istui mies, joka ei täyttänyt '
        + 'kannua — hän piti kädessään lämpömittaria ja kirjoitti '
        + 'lukemia vihkoon. Kun lähestyin, hän oli poissa. Vihko jäi. '
        + 'Viimeisellä sivulla luki minun nimeni.',
      henkilo: 'Lähteenvartija Nadia täyttää kaupunkilaisten kannut kuumasta '
        + 'lähteestä ja tuntee jokaisen suonen kaupungin alla.',
      kohtaaminen: 'Höyryn keskellä Nadia laskee kauhansa. "Sukuni on '
        + 'kirjannut lähteen lämmön niin kauan kuin vihkoja on ollut. '
        + 'Yksi rivi on vieraalla käsialalla — isoisäsi kävi '
        + 'kirjaamassa lukemat sinä viikkona, jona kirjaaja makasi '
        + 'kuumeessa, ettei sarjaan tulisi aukkoa. Vastaa hänen '
        + 'kysymykseensä, niin näytän sen rivin."',
      kohtaamisLuenta: 'Höyryn keskellä Nadia laskee kauhansa. [warmly] '
        + '"Sukuni on kirjannut lähteen lämmön niin kauan kuin vihkoja '
        + 'on ollut. [softly] Yksi rivi on vieraalla käsialalla — '
        + 'isoisäsi kävi kirjaamassa lukemat sinä viikkona, jona '
        + 'kirjaaja makasi kuumeessa, ettei sarjaan tulisi aukkoa. '
        + '[curious] Vastaa hänen kysymykseensä, niin näytän sen rivin."',
      kysymys: {
        q: 'Sofia on kasvanut paikalle, jossa maasta kumpuaa jotain '
          + 'harvinaista keskellä kaupunkia. Mitä?',
        vaihtoehdot: [
          'Kuumaa lähdevettä',
          'Kultahiekkaa',
          'Jääkylmää vuoristojokea',
          'Suolaa',
        ],
        oikea: 0,
        fakta: 'Sofian alla virtaa kymmeniä kuumia mineraalilähteitä — '
          + 'roomalaiset rakensivat kylpylänsä tänne juuri niiden takia. '
          + 'Keskustan hanoista saa yhä lämmintä lähdevettä ilmaiseksi.',
      },
      aarre: 'Viimeisen lukeman kohdalle vihkon sivujen väliin oli ommeltu '
        + 'kätkö. Nadia vertasi rivejä pitkään: "Sata vuotta lukemia — '
        + 'mutta joka kymmenes rivi on kirjoitettu samalla musteella. '
        + 'Tuoreella."',
    },
    {
      id: 'bukarest',
      otsikko: 'Bukarest — paimenen kirkonkello',
      saapuminen: 'Kukkulan pienen kirkon kello löi yhden lyönnin, kun astuin '
        + 'portista — ja kellonsoittaja vannoi, ettei köydessä ollut '
        + 'kättä. Kirkon perusti tarun mukaan paimen, jonka nimeä '
        + 'koko kaupunki kantaa. Alttarin kiveen oli hakattu '
        + 'paimensauva, ja sauvan koukussa riippui luotilanka, pieni '
        + 'messinkipaino langan päässä. Se ei kuulunut kuvaan. Se '
        + 'riippui siinä oikeasti.',
      saapumisLuenta: '[curious] Kukkulan pienen kirkon kello löi yhden '
        + 'lyönnin, kun astuin portista — ja kellonsoittaja vannoi, '
        + 'ettei köydessä ollut kättä. [softly] Kirkon perusti tarun '
        + 'mukaan paimen, jonka nimeä koko kaupunki kantaa. Alttarin '
        + 'kiveen oli hakattu paimensauva, ja sauvan koukussa riippui '
        + 'luotilanka, pieni messinkipaino langan päässä. [whispers] Se '
        + 'ei kuulunut kuvaan. Se riippui siinä oikeasti.',
      henkilo: 'Kellonsoittaja Ana soittaa paimenen kirkon kelloa, jonka '
        + 'köyttä hänen sukunsa on vetänyt neljässä polvessa.',
      kohtaaminen: 'Kellotornin portailla Ana kiertää köyden ranteensa ympäri. '
        + '"Isoisäsi kysyi sukuni soittajalta, kenelle kello lyö '
        + 'silloin, kun kukaan ei soita. Vastaa hänen omaan '
        + 'kysymykseensä, niin kerron, mitä soittaja vastasi."',
      kysymys: {
        q: 'Tarun mukaan Bukarest on saanut nimensä perustajaltaan. Kuka '
          + 'hän oli?',
        vaihtoehdot: [
          'Paimen nimeltä Bucur',
          'Ruhtinas nimeltä Bucur',
          'Seppä nimeltä Bucur',
          'Kalastaja nimeltä Bucur',
        ],
        oikea: 0,
        fakta: 'Tarina kertoo paimen Bucurista, joka pystytti majansa ja '
          + 'kirkkonsa joen törmälle. Nimi Bucureşti kantaa hänen nimeään '
          + '— ja bucurie tarkoittaa romaniaksi iloa.',
      },
      aarre: 'Messinkipaino kiertyi auki, eikä sen sisällä ollut lyijyä '
        + 'vaan kätkö. Ana ripusti langan takaisin koukkuun ja mietti '
        + 'ääneen: "Koukku on kulunut kiiltäväksi — jokin on '
        + 'riippunut siinä kauan. Mutta tässä langassa ei ole '
        + 'päivääkään pölyä."',
      aarreLuenta: '[excited] Messinkipaino kiertyi auki, eikä sen '
        + 'sisällä ollut lyijyä vaan kätkö. [curious] Ana ripusti langan '
        + 'takaisin koukkuun ja mietti ääneen: "Koukku on kulunut '
        + 'kiiltäväksi — jokin on riippunut siinä kauan. [whispers] '
        + 'Mutta tässä langassa ei ole päivääkään pölyä."',
    },
    {
      id: 'kiova',
      otsikko: 'Kiova — merkki portin holvissa',
      saapuminen: 'Kaupungin portti kohosi kullattuine kupoleineen, ja sen '
        + 'holvissa kaikui, kuin muuri muistaisi jokaisen kulkijan. '
        + 'Vartija kertoi, että holviin on kaiverrettu merkki, jota '
        + 'kukaan ei ole osannut lukea. Merkki oli silmänkorkeudella: '
        + 'kolme aaltoviivaa. Tunnistin ne heti — samalla merkillä '
        + 'isoisäni sulki kirjeensä.',
      henkilo: 'Portinvartija Oksana pitää Kultaisen portin avaimia ja '
        + 'tuntee holvin jokaisen kaiverruksen sormenpäillään.',
      kohtaaminen: 'Holvin varjossa Oksana laskee kätensä kaiverrukselle. '
        + '"Suvussani näitä viivoja sanotaan matkamiehen merkiksi — ja '
        + 'meille on opetettu, että merkin tekijän suku palaa lukemaan '
        + 'ne. Vastaa kirjan kysymykseen, niin luemme yhdessä."',
      kysymys: {
        q: 'Kiovan kuuluisin portti on nimeltään Kultainen portti. Mistä '
          + 'nimi tulee?',
        vaihtoehdot: [
          'Porttitornin kirkon kullatuista kupoleista',
          'Portinovista, jotka valettiin puhtaasta kullasta',
          'Kultakolikoista, joilla tulijat maksoivat tullin',
          'Auringosta, joka nousee suoraan sen kohdalta',
        ],
        oikea: 0,
        fakta: 'Portin torniin rakennettiin pieni kirkko, jonka kupolit '
          + 'kullattiin — kaukaa koko portti hehkui kultaa. Portti oli '
          + 'kaupungin pääsisäänkäynti lähes tuhat vuotta sitten.',
      },
      aarre: 'Viivojen takana kivi oli ontto, ja ontelossa odotti kätkö. '
        + 'Oksana pyyhkäisi pölyn kaiverruksesta: "Viivoja on kolme — '
        + 'mutta neljäs on aloitettu. Taltanjälki on tuore, eikä '
        + 'kiviseppiä ole käynyt vuosiin."',
    },
    {
      id: 'odessa',
      otsikko: 'Odessa — lyhty jota ei sytytetty',
      saapuminen: 'Satamasta nousivat portaat, joita laskin sataan asti ennen '
        + 'kuin luovutin. Alhaalta katsoen näin vain askelmia, ylhäältä '
        + 'vain tasanteita — kuin portaikko näyttäisi eri asian '
        + 'kummallekin kulkijalle. Puolivälin tasanteella '
        + 'lyhtypylvääseen oli sidottu köydenpätkä merimiessolmulla. '
        + 'Solmu oli isoisäni opettama. Vain hän sitoi sen niin.',
      henkilo: 'Lyhdynsytyttäjä Fjodor sytyttää portaikon lyhdyt joka ilta '
        + 'alhaalta ylös ja sammuttaa ne aamulla ylhäältä alas.',
      kohtaaminen: 'Tasanteella Fjodor nojaa lyhtytankoonsa. "Tuon solmun '
        + 'sitoi kirjasi omistaja, ja isoisoisäni katseli vieressä. '
        + 'Samana iltana hän jätti tämän yhden lyhdyn sytyttämättä — '
        + 'meillä sanotaan: valo säästetään sille, joka vielä nousee '
        + 'portaat. Suku piti tavan, vaikka syy ehti hämärtyä. Vastaa '
        + 'kirjan kysymykseen, niin sytytän sen nyt."',
      kohtaamisLuenta: 'Tasanteella Fjodor nojaa lyhtytankoonsa. '
        + '[warmly] "Tuon solmun sitoi kirjasi omistaja, ja isoisoisäni '
        + 'katseli vieressä. [softly] Samana iltana hän jätti tämän '
        + 'yhden lyhdyn sytyttämättä — meillä sanotaan: valo säästetään '
        + 'sille, joka vielä nousee portaat. Suku piti tavan, vaikka syy '
        + 'ehti hämärtyä. [excited] Vastaa kirjan kysymykseen, niin '
        + 'sytytän sen nyt."',
      kysymys: {
        q: 'Odessan jättiläisportaikko tekee silmille tempun. Minkä?',
        vaihtoehdot: [
          'Alhaalta näkyvät vain askelmat, ylhäältä vain tasanteet',
          'Portaat näyttävät kapenevan ylöspäin, vaikka levenevät',
          'Askelmia on eri määrä ylös ja alas kuljettaessa',
          'Portaikko näyttää mereltä katsottuna kaupunkiin vievältä sillalta',
        ],
        oikea: 0,
        fakta: 'Portaikko levenee alaspäin, ja nousu on loiva: ylhäältä '
          + 'katsoen askelmat katoavat tasanteiden taakse ja alhaalta '
          + 'tasanteet askelmien. Siksi portaikko näyttää loputtomalta.',
      },
      aarre: 'Sytyttämättömän lyhdyn jalustassa oli luukku, ja luukun '
        + 'takana kätkö. Fjodor raapaisi tulen ja jäi katsomaan '
        + 'liekkiä: "Lasi on puhdas. Joku on pessyt lyhdyn, jota ei ole '
        + 'sytytetty sataan vuoteen."',
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
        q: 'Moskovan Tsaarinkello on maailman suurimpia kelloja. Montako '
          + 'kertaa se on soinut?',
        vaihtoehdot: [
          'Ei kertaakaan',
          'Kerran, valmistujaisissaan',
          'Joka vuosi uudenvuodenyönä',
          'Sata kertaa, kunnes se halkesi',
        ],
        oikea: 0,
        fakta: 'Yli 200 tonnin kello ei koskaan ehtinyt torniin: valun '
          + 'jäähtyessä syttyi tulipalo, ja sammutusvesi halkaisi kuuman '
          + 'pronssin. Lohjennut pala painaa yksinään 11 tonnia.',
      },
      aarre: 'Lohkeaman sisäreunan kolossa odotti kätkö. Vera pyyhki '
        + 'liitukirjoitusta sormellaan: "Liitu ei pysy pronssissa '
        + 'vuottakaan — kello sataa sisäänsä pölyä. Tämä on kirjoitettu '
        + 'tänä talvena." Illalla latasin barometrisovelluksen, ihan '
        + 'vain vertailun vuoksi. Sen lukema oli sama kuin liitu kellon '
        + 'seinässä. Poistin sovelluksen. Asensin sen takaisin aamulla.',
    },
    {
      id: 'pietari',
      otsikko: 'Pietari — silta joka odotti laivaa',
      saapuminen: 'Yö ei tullut. Kello löi kaksitoista, ja taivas hehkui yhä '
        + 'kuin iltarusko olisi unohtunut paikalleen. Joen sillat '
        + 'nousivat pystyyn päästämään laivat läpi, ja rannalla mies '
        + 'nosti hattuaan jokaiselle laivalle — mutta piti kirjaa vain '
        + 'yhdestä. Kun sillat laskettiin, mies oli poissa. Kirja jäi '
        + 'kaiteelle, avattuna sivulta, jolla luki: odotamme vielä.',
      henkilo: 'Sillanhoitaja Dmitri nostaa joen sillan joka yö ja laskee '
        + 'sen aamuksi, kuten hänen sukunsa on tehnyt siltojen alusta '
        + 'asti.',
      kohtaaminen: 'Koneiston äärellä Dmitri pitelee vipua. "Kirjaan merkitään '
        + 'laiva, joka ei ole vielä palannut — isoisäsi pyysi sukuani '
        + 'pitämään sivun auki. Vastaa hänen kysymykseensä, niin '
        + 'käännämme sivua yhdessä."',
      kysymys: {
        q: 'Pietarissa voi kesäkuussa lukea kirjaa ulkona keskiyöllä. '
          + 'Miksi?',
        vaihtoehdot: [
          'Valkeiden öiden aikaan aurinko käy vain hetken horisontin '
            + 'alla',
          'Kaupungin kaasulyhdyt palavat kesällä kirkkaampina',
          'Revontulet valaisevat taivaan joka kesäyö',
          'Joki heijastaa päivän valon takaisin yöllä',
        ],
        oikea: 0,
        fakta: 'Pietari on niin pohjoisessa, että kesäkuussa aurinko painuu '
          + 'vain pari astetta horisontin alle: hämärä ei ehdi pimetä '
          + 'ennen kuin aurinko nousee taas. Valkeat yöt kestävät '
          + 'viitisen viikkoa.',
      },
      aarre: 'Sillan koneistokammiossa, vivun alla, odotti öljykankainen '
        + 'kätkö. Dmitri avasi odotetun laivan sivun: "Joku on '
        + 'merkinnyt sen palanneeksi — viime kesänä. Ja merkintä on '
        + 'tehty kynällä, jota säilytän lukkojen takana."',
    },
    {
      id: 'helsinki',
      mykistetyt: ['aarre'],
      otsikko: 'Helsinki — maa joka nousee merestä',
      saapuminen: 'Saarille rakennettu linnoitus nousi merestä harmaana kuin '
        + 'aallonmurtaja. Kuninkaanportin rappusilla istui poika, joka '
        + 'onki ilman koukkua — siimassa oli pelkkä paino. Kysyin, mitä '
        + 'hän pyytää. Pohjaa, poika vastasi: isä käski mitata, '
        + 'nouseeko maa täälläkin. Kirjoitin lukeman muistiin. Maa '
        + 'nousee. Ja jonain päivänä se nostaa esiin sen, minkä minä '
        + 'jätin.',
      henkilo: 'Luotsi Aino ohjaa laivat linnoituksen salmien läpi ja tuntee '
        + 'jokaisen karin — myös ne, joita ei ole kartoissa.',
      kohtaaminen: 'Laiturilla Aino kiinnittää veneensä yhdellä solmulla. '
        + '"Isoisäsi maksoi yösijansa kartalla: hän piirsi '
        + 'isoisoisälleni nämä salmet ulkomuistista, karit mukana. '
        + 'Yksi väylä siinä on merkitty pelkällä kysymysmerkillä — '
        + 'sukuni ei ole sitä koskaan kulkenut. Vastaa hänen '
        + 'kysymykseensä, niin kuljemme sen tänään."',
      kohtaamisLuenta: 'Laiturilla Aino kiinnittää veneensä yhdellä '
        + 'solmulla. [warmly] "Isoisäsi maksoi yösijansa kartalla: hän '
        + 'piirsi isoisoisälleni nämä salmet ulkomuistista, karit '
        + 'mukana. [curious] Yksi väylä siinä on merkitty pelkällä '
        + 'kysymysmerkillä — sukuni ei ole sitä koskaan kulkenut. '
        + '[excited] Vastaa hänen kysymykseensä, niin kuljemme sen '
        + 'tänään."',
      kysymys: {
        q: 'Helsingin edustalle rakennettiin merilinnoitus Suomenlinna. '
          + 'Mikä siinä on erikoista?',
        vaihtoehdot: [
          'Se on rakennettu saarille keskelle merta',
          'Se jää kokonaan veden alle nousuveden aikaan',
          'Se on veistetty yhdestä ainoasta kalliosta',
          'Sen muurit on rakennettu hirsistä',
        ],
        oikea: 0,
        fakta: 'Suomenlinna levittäytyy kuudelle saarelle, ja sen muurit, '
          + 'tykit ja telakka suojasivat koko kaupunkia mereltä. Nykyään '
          + 'linnoitussaarilla asutaan, ja sinne pääsee lautalla.',
      },
      aarre: 'Kätkö nousi vedestä luotsiveneen naarassa, merirasvaan '
        + 'käärittynä. Aino availi käärettä varovasti: "Rasva on '
        + 'tuoretta. Meressä se pilaantuu vuodessa — joku on kastanut '
        + 'tämän uudelleen." Tarjosin Ainolle vaivoistaan isoisän '
        + 'puntaa, puoliksi leikilläni. Hän katsoi seteliä kauan ja '
        + 'antoi sen takaisin: pidä. Merestä nousee vanhoja asioita ihan '
        + 'tarpeeksi.',
    },
    {
      id: 'tallinna',
      mykistetyt: ['saapuminen'],
      otsikko: 'Tallinna — vahti joka käänsi selkänsä tuulelle',
      saapuminen: 'Ostin päänsärkyyni jauheen apteekista, joka on '
        + 'palvellut samalla torilla yli neljäsataa vuotta — myyjä sanoi '
        + 'sen ohimennen, kuin ei olisi mitään erikoista seistä tiskin '
        + 'takana, jonka ääressä on hoidettu ruttoa ja kuninkaita. '
        + 'Kaupan päälle sain martsipania: täällä se keksittiin '
        + 'lääkkeeksi, myyjä väitti, ja makealta lääkkeeltä se '
        + 'maistuikin. Raatihuoneen tornissa vanha vahti kääntyi tuulen '
        + 'mukana — peltinen mies, joka on vartioinut kaupunkia '
        + 'viirissään kohta kolmesataa vuotta. Hän on nähnyt torin joka '
        + 'sään; minä olin sille yhden iltapäivän vieras.',
      henkilo: 'Tornimestari Kristjan rasvaa Vana Toomasin laakerit ja '
        + 'nousee torniin joka myrskyn jälkeen katsomaan, että vahti '
        + 'kääntyy yhä.',
      kohtaaminen: 'Tornin portaissa Kristjan kantaa öljykannua. "Vana Toomas on '
        + 'kääntynyt tuuleen kolmesataa vuotta — mutta kerran se '
        + 'osoitti vastatuuleen kokonaisen päivän, ja se päivä on '
        + 'kirjattu. Isoisäsi päivä. Vastaa hänen kysymykseensä, niin '
        + 'näytän kirjauksen."',
      kysymys: {
        q: 'Tallinnan raatihuoneen tornissa pyörii tuuliviiri nimeltä '
          + 'Vana Toomas. Kuka hän on?',
        vaihtoehdot: [
          'Kaupungin ikuiseksi vartijaksi nostettu viirisotilas',
          'Raatihuoneen ensimmäinen pormestari',
          'Purjehtija, joka löysi Tallinnan sataman',
          'Kelloseppä, joka rakensi tornin kellon',
        ],
        oikea: 0,
        fakta: 'Tarun mukaan Toomas oli köyhä poika, joka voitti '
          + 'jousikilpailun mutta ei säätynsä takia saanut palkintoa — '
          + 'hänestä tehtiin kaupungin ikuinen vartija tornin huippuun '
          + 'vuonna 1530.',
      },
      aarre: 'Kirjauksen sivujen väliin oli taitettu kätkö. Kristjan piti '
        + 'sivua valoa vasten: "Vastatuulen päivä on merkitty kahdesti. '
        + 'Jälkimmäinen on viime syksyltä — ja silloin minä olin '
        + 'tornissa. Viiri ei kääntynyt itsestään."',
    },
    {
      id: 'riika',
      otsikko: 'Riika — kukko joka näki tuulen',
      saapuminen: 'Nostin hattuani kirkontornille, ja tuuli vei sen — '
        + 'satamassa purjehtijat sanoivat, että kukko otti maksun. '
        + 'Tornien huipuilla kultaiset kukot kertovat tuulen ennen '
        + 'kuin purje sen tuntee, ja niitä luetaan täällä kuin '
        + 'kelloja. Yhden kukon nokasta riippui ohut kettinki, jonka '
        + 'päässä välähti jotain pientä. Kysyin tikkaista: '
        + 'pisimmätkään eivät yllä puoliväliin tornia, ja sisäportaat '
        + 'päättyvät kellokammioon. Torninvartija sanoi sen itse: '
        + 'tuonne ei pääse. Se riippui siellä silti. Ostin uuden '
        + 'hatun ja pidin sitä kädessäni.',
      saapumisLuenta: '[warmly] Nostin hattuani kirkontornille, ja tuuli '
        + 'vei sen — satamassa purjehtijat sanoivat, että kukko otti '
        + 'maksun. [curious] Tornien huipuilla kultaiset kukot kertovat '
        + 'tuulen ennen kuin purje sen tuntee, ja niitä luetaan täällä '
        + 'kuin kelloja. Yhden kukon nokasta riippui ohut kettinki, '
        + 'jonka päässä välähti jotain pientä. Kysyin tikkaista: '
        + 'pisimmätkään eivät yllä puoliväliin tornia, ja sisäportaat '
        + 'päättyvät kellokammioon. [softly] Torninvartija sanoi sen '
        + 'itse: tuonne ei pääse. [whispers] Se riippui siellä silti. '
        + 'Ostin uuden hatun ja pidin sitä kädessäni.',
      henkilo: 'Kultaaja Ilze uudistaa tornikukkojen kultauksen, kun myrskyt '
        + 'ovat sen syöneet — sukunsa viidentenä.',
      kohtaaminen: 'Pajassaan Ilze silittää kultalehteä siveltimellä. "Kun '
        + 'sukuni kultasi kukon isoisäsi aikana, lehtien alle jäi '
        + 'jotain, mikä ei ollut kultaa. Se on siellä yhä. Vastaa hänen '
        + 'kysymykseensä, niin nousemme katsomaan."',
      kysymys: {
        q: 'Riian kirkkojen huipuilla ei ole ristejä vaan kultaisia '
          + 'kukkoja. Miksi juuri kukko?',
        vaihtoehdot: [
          'Kukko näyttää tuulen ja karkottaa vanhan uskomuksen mukaan '
            + 'pahan',
          'Kukko on kaupungin perustajasuvun vaakunaeläin ja '
            + 'muistomerkki',
          'Kukko herätti soittajat, kun tornikellot jäätyivät pakkasella',
          'Kultaajat saivat vanhastaan palkkansa kananmunissa, ja tapa '
            + 'jäi',
        ],
        oikea: 0,
        fakta: 'Tuuliviirikukko kertoo purjehtijoille tuulen suunnan, ja '
          + 'vanhan uskomuksen mukaan valvova kukko pitää pimeän voimat '
          + 'loitolla. Riian vanhimmat tornikukot ovat pyörineet satoja '
          + 'vuosia.',
      },
      aarre: 'Kultauksen alta, kukon pyrstön ontelosta, paljastui kätkö. '
        + 'Ilze punnitsi kettinkiä kämmenellään: "Tämä on ripustettu '
        + 'ylhäältä käsin. Tikkaita ei ole ollut kenelläkään — paitsi '
        + 'minulla, ja ne ovat lukkojen takana."',
    },
    {
      id: 'vilna',
      otsikko: 'Vilna — susi joka ulvoi sadan äänellä',
      saapuminen: 'Tornin kivijalassa, sammaleen alla, istui pieni rautainen '
        + 'susi — ja sen selkä oli lämmin, vaikka ilta oli kylmä. '
        + 'Vedin käteni pois ja katsoin ympärilleni: kukkula oli '
        + 'tyhjä, portaat hiljaiset. Oppaani aloitti tarinan '
        + 'suuriruhtinaan unesta ja rautasudesta, joka ulvoi sadan '
        + 'suden äänellä, mutta minä kuuntelin puolella korvalla ja '
        + 'pidin sutta silmällä. Sen selässä on kohta, jonka '
        + 'vuosisadan kämmenet ovat kuluttaneet sileäksi. Silitin '
        + 'minäkin. Tapa on tarttuvaa.',
      saapumisLuenta: '[curious] Tornin kivijalassa, sammaleen alla, '
        + 'istui pieni rautainen susi — ja sen selkä oli lämmin, vaikka '
        + 'ilta oli kylmä. [whispers] Vedin käteni pois ja katsoin '
        + 'ympärilleni: kukkula oli tyhjä, portaat hiljaiset. [softly] '
        + 'Oppaani aloitti tarinan suuriruhtinaan unesta ja '
        + 'rautasudesta, joka ulvoi sadan suden äänellä, mutta minä '
        + 'kuuntelin puolella korvalla ja pidin sutta silmällä. Sen '
        + 'selässä on kohta, jonka vuosisadan kämmenet ovat kuluttaneet '
        + 'sileäksi. [warmly] Silitin minäkin. Tapa on tarttuvaa.',
      henkilo: 'Yövartija Rasa kiertää vanhankaupungin kujat lyhtyineen ja '
        + 'tervehtii rautaista sutta joka kierroksella.',
      kohtaaminen: 'Lyhdyn valossa Rasa laskee kierroksensa avaimet. "Suden '
        + 'selässä on kulunut kohta. Isoisäsi pysähtyi tähän eräänä '
        + 'yönä, laski kätensä siihen ja sanoi vartijalle: silittäkää '
        + 'tekin — tämä kaupunki tarvitsee vielä onnensa. Suku on '
        + 'totellut siitä asti, ei rahasta vaan siksi, että hän osui '
        + 'oikeaan. Vastaa hänen kysymykseensä, niin kerron mihin."',
      kohtaamisLuenta: 'Lyhdyn valossa Rasa laskee kierroksensa avaimet. '
        + '[softly] "Suden selässä on kulunut kohta. Isoisäsi pysähtyi '
        + 'tähän eräänä yönä, laski kätensä siihen ja sanoi vartijalle: '
        + 'silittäkää tekin — tämä kaupunki tarvitsee vielä onnensa. '
        + '[warmly] Suku on totellut siitä asti, ei rahasta vaan siksi, '
        + 'että hän osui oikeaan. [curious] Vastaa hänen kysymykseensä, '
        + 'niin kerron mihin."',
      kysymys: {
        q: 'Vilnan tarun mukaan kaupunki sai alkunsa suuriruhtinas '
          + 'Gediminasin unesta. Mitä hän näki?',
        vaihtoehdot: [
          'Rautaisen suden, joka ulvoi sadan suden äänellä',
          'Kultaisen kotkan, joka rakensi pesän tornin huipulle',
          'Joen, joka kääntyi virtaamaan ylämäkeen kukkulalle',
          'Sata nuotiotulta, jotka paloivat kukkulan laella',
        ],
        oikea: 0,
        fakta: 'Tietäjä selitti unen: rautasusi merkitsi mahtavaa kaupunkia '
          + 'ja sen ulvonta mainetta, joka kiirisi maailmalle. Gediminas '
          + 'perusti kaupungin kukkulalle ja kutsui kirjeillään tulijoita '
          + 'kaikkialta.',
      },
      aarre: 'Suden jalustan alta aukesi kolo, ja kolossa odotti kätkö. '
        + 'Rasa nosti lyhtyään: "Selän kulunut kohta kiiltää tuoreelta. '
        + 'Minun kierrosteni välillä sitä silittää joku muukin."',
    },
    {
      id: 'tukholma',
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
        + 'luukun ja epäröi: "Luukusta työnnettiin vastaus tänä aamuna. '
        + 'Talossa ei ole ovea — minä en tiedä, mistä sinne mennään '
        + 'sisään."',
    },
    {
      id: 'oslo',
      otsikko: 'Oslo — laiva mullan alla',
      saapuminen: 'Talonpoika löi talikkonsa maahan ja sanoi: tämän kummun '
        + 'alla nukkuu laiva. Kokonainen laiva airoineen, mullan '
        + 'alla, ja siinä päällikkö, jonka matka jatkuu yhä. '
        + 'Illalliseksi emäntä toi juustoa, joka oli ruskeaa kuin '
        + 'laivaterva ja makeaa kuin siirappi; kirjasin sen ilmiönä '
        + 'ja pyysin lisää. Aamulla nousin kummun laelle, jolla '
        + 'kasvaa yksi ainoa pihlaja. Sen oksaan oli sidottu '
        + 'purjelangasta punottu solmu. Tuore.',
      saapumisLuenta: '[softly] Talonpoika löi talikkonsa maahan ja '
        + 'sanoi: tämän kummun alla nukkuu laiva. Kokonainen laiva '
        + 'airoineen, mullan alla, ja siinä päällikkö, jonka matka '
        + 'jatkuu yhä. [warmly] Illalliseksi emäntä toi juustoa, joka '
        + 'oli ruskeaa kuin laivaterva ja makeaa kuin siirappi; kirjasin '
        + 'sen ilmiönä ja pyysin lisää. [curious] Aamulla nousin kummun '
        + 'laelle, jolla kasvaa yksi ainoa pihlaja. Sen oksaan oli '
        + 'sidottu purjelangasta punottu solmu. [whispers] Tuore.',
      henkilo: 'Talonpoika Sigrid viljelee peltoa, jonka laidalla laivakumpu '
        + 'on ollut hänen sukunsa vartiossa satoja vuosia.',
      kohtaaminen: 'Kummun juurella Sigrid nojaa talikkoonsa. "Isoisäsi '
        + 'leiriytyi tähän kolmeksi yöksi ja lupasi, ettei kaiva — '
        + 'sillä ehdolla suku näytti hänelle jotain. Vastaa hänen '
        + 'kysymykseensä, niin näytän saman sinulle."',
      kysymys: {
        q: 'Norjan kummuista on löydetty kokonaisia viikinkilaivoja. '
          + 'Miksi laiva haudattiin maahan?',
        vaihtoehdot: [
          'Vainajan uskottiin purjehtivan sillä tuonpuoleiseen',
          'Laivat piilotettiin vihollisilta talven ajaksi',
          'Puu säilyi mullassa paremmin kuin vedessä',
          'Kummut olivat laivanrakentajien varastoja',
        ],
        oikea: 0,
        fakta: 'Mahtimiehet ja -naiset laskettiin hautaan laivoissa '
          + 'varusteineen: laivan uskottiin kantavan heidät '
          + 'tuonpuoleiseen. Mullan alla laivat säilyivät niin hyvin, '
          + 'että niitä on nostettu esiin lähes ehjinä.',
      },
      aarre: 'Pihlajan juurten välissä, kivien alla, odotti kätkö — ei '
        + 'kummussa vaan sen vieressä. Sigrid osoitti oksan solmua: '
        + '"Sukuni sitoo merkkisolmun kerran vuodessa. Tämän vuoden '
        + 'solmu oli valmiina, kun keväällä tulin."',
    },
    {
      id: 'kobenhavn',
      otsikko: 'Kööpenhamina — satu jota ei kerrottu loppuun',
      saapuminen: 'Satamakanavan varrella talot hehkuivat keltaisina ja '
        + 'punaisina, ja laiturilla vanha merimies kertoi lapsille '
        + 'satua rumasta ankanpoikasesta — sanasta sanaan niin kuin '
        + 'sadun kirjoittaja itse, jonka sanotaan asuvan tällä '
        + 'kanavalla. Kun satu loppui, merimies ojensi minulle paperin: '
        + 'herra numerosta kahdeksantoista jätti tämän teille. Paperilla '
        + 'oli yksi lause: kaikki tarinat ovat tosia sille, joka etsii '
        + 'loppuun asti.',
      saapumisLuenta: '[warmly] Satamakanavan varrella talot hehkuivat '
        + 'keltaisina ja punaisina, ja laiturilla vanha merimies kertoi '
        + 'lapsille satua rumasta ankanpoikasesta — sanasta sanaan niin '
        + 'kuin sadun kirjoittaja itse, jonka sanotaan asuvan tällä '
        + 'kanavalla. [curious] Kun satu loppui, merimies ojensi minulle '
        + 'paperin: herra numerosta kahdeksantoista jätti tämän teille. '
        + '[softly] Paperilla oli yksi lause: kaikki tarinat ovat tosia '
        + 'sille, joka etsii loppuun asti.',
      henkilo: 'Sadunkertoja Karen kertoo satuja Nyhavnin laiturilla samalta '
        + 'puiselta arkulta, jolta hänen isoisänsä ne kertoi.',
      kohtaaminen: 'Karen taputtaa arkkua vierestään. "Isoisäni sai arkun '
        + 'mieheltä, joka kirjoitti satuja — ja sinun isoisäsi istui '
        + 'tässä kuuntelemassa. Arkussa on satu, jota ei ole koskaan '
        + 'kerrottu loppuun. Vastaa kirjan kysymykseen, niin kerron '
        + 'siitä alun."',
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
      aarre: 'Arkun kaksoispohjasta löytyi kätkö ja kesken jäänyt '
        + 'käsikirjoitus. Karen selasi sivut: "Satu katkeaa lauseeseen: '
        + 'aarre ei ollut arkussa vaan siinä, joka arkkua... — '
        + 'viimeinen sana on revitty irti, ja reunat ovat tuoreet."',
    },
    {
      id: 'lappi',
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
        + 'Viimeisenä iltana hän kirjoitti kysymyksen muistiin ja '
        + 'sanoi: se, joka vastaa, saa jäljet. Vastaa."',
      kysymys: {
        q: 'Revontulet leimuavat Lapin talvitaivaalla. Mistä niiden '
          + 'suomenkielinen nimi tarun mukaan tulee?',
        vaihtoehdot: [
          'Tulikettu iskee hännällään lumesta kipinöitä taivaalle',
          'Repo tarkoittaa vanhassa kielessä taivasta',
          'Tulet revitään pimeydestä auki',
          'Ensimmäinen näkijä oli Repo-niminen tietäjä',
        ],
        oikea: 0,
        fakta: 'Tarun tulikettu juoksee tuntureilla niin lujaa, että sen '
          + 'häntä iskee lumesta kipinöitä taivaanrantaan asti. Tiede '
          + 'selittää valot auringon hiukkasilla — mutta nimi revontulet '
          + 'jäi ketulta.',
      },
      aarre: 'Jälkien päässä, kinoksen alla, odotti tuohikääre. Aslak '
        + 'katsoi taivaalle ja takaisin: "Jäljet päättyvät tähän — '
        + 'mutta katso: toiset alkavat tästä. Joku on hiihtänyt täältä '
        + 'pois. Eilen."',
    },
    {
      id: 'tromssa',
      otsikko: 'Tromssa — lyhty joka paloi keskiyön auringossa',
      saapuminen: 'Aurinko ei laskenut. Se vieri pohjoisen taivaanrannan yli '
        + 'kuin kultakolikko, joka ei suostu putoamaan, ja satama eli '
        + 'keskellä yötä: kalastajat lastasivat, lokit kirkuivat. Vain '
        + 'yksi vene lepäsi liikkumatta, ja sen mastossa paloi lyhty. '
        + 'Kysyin, miksi lyhty palaa, kun yötä ei ole. Se ei pala '
        + 'pimeän takia, sanoi satamavahti. Se palaa merkiksi.',
      henkilo: 'Satamavahti Ingrid pitää keskiyön auringon aikaan kirjaa '
        + 'saapuvista laivoista, koska yö ei sitä tee.',
      kohtaaminen: 'Laiturin päässä Ingrid sulkee lokikirjansa. "Lyhtyvene on '
        + 'sukuni vene. Isoisoisäni sytytti maston lyhdyn sinä yönä, '
        + 'jona isoisäsi laiva lähti yöttömään yöhön, ja suku '
        + 'sytyttää sen yhä joka kesä — meillä sanotaan: sammutetaan '
        + 'sitten, kun tieto tulee. Vastaa kirjan kysymykseen. Sinä '
        + 'olet se tieto, ja minä sammutan lyhdyn."',
      kohtaamisLuenta: 'Laiturin päässä Ingrid sulkee lokikirjansa. '
        + '[softly] "Lyhtyvene on sukuni vene. Isoisoisäni sytytti '
        + 'maston lyhdyn sinä yönä, jona isoisäsi laiva lähti yöttömään '
        + 'yöhön, ja suku sytyttää sen yhä joka kesä — meillä sanotaan: '
        + 'sammutetaan sitten, kun tieto tulee. [warmly] Vastaa kirjan '
        + 'kysymykseen. Sinä olet se tieto, ja minä sammutan lyhdyn."',
      kysymys: {
        q: 'Tromssassa aurinko ei kesällä laske moneen viikkoon. Miksi '
          + 'ilmiötä kutsutaan?',
        vaihtoehdot: [
          'Keskiyön auringoksi',
          'Valkeiksi öiksi',
          'Kesäkaamokseksi',
          'Aurinkomyrskyksi',
        ],
        oikea: 0,
        fakta: 'Napapiirin pohjoispuolella aurinko pysyy kesällä horisontin '
          + 'yläpuolella vuorokauden ympäri — Tromssassa lähes kaksi '
          + 'kuukautta. Talvella on vastapaino: kaamos, jolloin aurinko '
          + 'ei nouse lainkaan.',
      },
      aarre: 'Lyhdyn öljysäiliön alla, kannen luukussa, odotti kätkö. '
        + 'Ingrid sammutti liekin ja jäi katsomaan savua: "Öljyn olen '
        + 'lisännyt minä, joka viikko. Mutta sydänlanka on vaihdettu '
        + 'uuteen — eikä vaihtaja ollut minä."',
    },
    {
      id: 'islanti',
      otsikko: 'Islanti — lähde joka nimesi kaikki muut',
      saapuminen: 'Maa hengitti höyryä. Laakson lähde kokosi voimansa hitaasti, '
        + 'kohisi — ja syöksi kiehuvan patsaan taivaalle niin '
        + 'korkealle, että jäin sanattomaksi. Oppaani sanoi, että '
        + 'kaikki maailman purkautuvat lähteet on nimetty tämän yhden '
        + 'mukaan. Lähteen reunakivessä oli kaiverrus, puoliksi kalkin '
        + 'peitossa: nuoli ja sana, jota en ymmärtänyt. Opas ymmärsi. '
        + 'Hän vaikeni loppumatkan.',
      henkilo: 'Tilallinen Björk asuu lähdelaakson talossa, jonka suku on '
        + 'opastanut matkalaisia kuumille lähteille kuusi polvea.',
      kohtaaminen: 'Tuvan ovella Björk ojentaa villapeiton harteilleni. '
        + '"Kaiverruksen sana on sukuni murretta, ja opas, joka '
        + 'vaikeni, oli isoisoisäni. Sana tarkoittaa: odota purkausta. '
        + 'Vastaa kirjan kysymykseen, niin odotamme yhdessä."',
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
        + '"Kaiverruksen pitäisi olla kokonaan kalkin alla. Joku on '
        + 'raaputtanut sen esiin — tänä keväänä."',
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
        + 'mittakeppiään: "Tämä säiliö on ollut tyhjä sukupolven. Mutta '
        + 'pohjalla oli tuoreita kengänjälkiä ennen sinun jälkiäsi."',
    },
    {
      id: 'ankara',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Ankara — vuohien valkoinen kulta',
      saapuminen: 'Ylängön ilta oli viileä, ja markkinoilla punnittiin '
        + 'villaa, joka hohti kuin silkki — angoravuohen villaa, jota ei '
        + 'saa mistään muualta maailmasta. Yhden paalin päällä oli '
        + 'sinetti, jota kukaan ei tunnistanut. Minä tunnistin: vahaan '
        + 'oli painettu barometrin kuva. Kauppias sanoi, että paali on '
        + 'maksettu ja sinetöity kolmekymmentä vuotta sitten. Laskin '
        + 'vuodet kahdesti. Kolmekymmentä vuotta sitten minä olin poika, '
        + 'eikä minulla ollut barometria.',
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
        + 'narun sormelleen: "Solmu on merimiehen käsialaa — sellaista '
        + 'ei opita ylängöllä, tuhannen mailin päässä merestä. Kuka '
        + 'sitoi paalin, joka ei ole koskaan käynyt satamassa?"',
    },
    {
      id: 'bagdad',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Bagdad — kirjurien kaupunki',
      saapuminen: 'Tigrisin rannalla kirjurit istuivat rivissä varjossa, '
        + 'ja ruokokynät rapisivat kuin sade. Kaupunki heidän '
        + 'ympärillään oli täynnä uutta: kuvernööri oli ehtinyt perustaa '
        + 'sanomalehden ja vetää hevosraitiotien ennen kuin hänet '
        + 'kutsuttiin pois, ja lehteä myytiin kadunkulmassa kirjurien '
        + 'selän takana. Vanhin heistä kopioi silti kirjaa käsin — '
        + 'kirjaa, jonka reunaan joku oli merkinnyt lukemia. Minun '
        + 'barometrini lukemia, vuosien takaa. Kysyin, kuka kirjan toi. '
        + 'Kirjuri ei nostanut katsettaan: se, joka tuo kirjan, ei kerro '
        + 'nimeään. Se, joka noutaa sen, kertoo.',
      henkilo: 'Kirjuri Yusuf kopioi vanhoja käsikirjoituksia Tigrisin '
        + 'rannalla, kuten hänen sukunsa on kopioinut kalifien ajoista.',
      kohtaaminen: 'Yusuf laskee ruokokynänsä telineeseen. "Kirja '
        + 'odottaa noutajaansa, ja noutaja tunnetaan vastauksesta. '
        + 'Isoisäsi valitsi kysymyksen itse — se kertoo siitä, '
        + 'millaiseksi kalifi tämän kaupungin aikoinaan rakensi. '
        + 'Vastaa."',
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
        + 'kannen varovasti: "Kopioin tämän kirjan reunamerkinnät '
        + 'kymmenen vuotta sitten. Silloin viimeinen lukema puuttui. '
        + 'Nyt se on siinä — ja muste on tuoretta."',
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
        + 'hitaasti: "Loimi on sukuni loimi, mutta tässä kohdassa '
        + 'kudetta on jatkettu — joku on avannut kankaan ja kutonut sen '
        + 'kiinni. Taidolla, jota en opettanut kenellekään."',
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
        + 'ommelta: "Tasku on ommeltu minun pistoillani — mutta lanka '
        + 'on vahattu tavalla, jota käytti vain isoisäni. Hän kuoli '
        + 'ennen kuin minä opin ompelemaan."',
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
        + 'rasvattuna. Rashid souti rantaan hiljaa ja sanoi vasta '
        + 'laiturissa: "Isäni isä ei osannut lukea. Silti hän rasvasi '
        + 'lippaan joka kuukausi — niin kuin olisi tiennyt, että sen '
        + 'sisällä on paperia."',
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
        + 'puolikkaita kädessään: "Sata vuotta hyllyllä — mutta vaha '
        + 'kätkön ympärillä on pehmeää. Joku on avannut ja valanut sen '
        + 'uudelleen tällä vuosikymmenellä."',
    },
    {
      id: 'isfahan',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Isfahan — puoli maailmaa yhdellä torilla',
      saapuminen: 'Sillan holveissa laulettiin iltaa vastaan, ja laulu '
        + 'kiersi kaaresta kaareen kuin ei tahtoisi loppua. Tori aukeni '
        + 'niin avarana, että sen toinen pää häipyi usvaan — tästä '
        + 'kaupungista on sanonta, jonka ymmärtää vasta täällä '
        + 'seisoessaan, enkä kirjoita sitä tähän. Yhden holvin kiveen '
        + 'oli piirretty pieni ympyrä ja sen sisään viiva. Tunsin '
        + 'merkin: isoisäni piirsi saman karttoihinsa sinne, minne aikoi '
        + 'palata. Lauloin holviin puolikkaan säkeen ja jäin '
        + 'kuuntelemaan. Kaiku lauloi sen loppuun.',
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
        + 'väärästä holvista. Joku istuu iltaisin siellä, missä ei '
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
      aarre: 'Paperikääreen sisällä ei ollut viikunaa vaan kätkö, viikunan '
        + 'muotoiseksi vahattu. Selin haisteli käärettä: "Vaha on '
        + 'tuoretta mehiläisvahaa. Varastossa sata vuotta maannut kääre '
        + 'tuoksuisi pölyltä."',
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
        + 'aaltoviivan kohdalla. Elias katsoi merkkiä kauan ja puhui '
        + 'sitten hitaasti: "Suvussani portinvartijat ovat piirtäneet '
        + 'nämä viivat hiekkaan niin kauan kuin muistan. Kukaan ei ole '
        + 'koskaan kertonut minulle miksi. Sinä olet ensimmäinen, jonka '
        + 'kohdalla ne tarkoittivat jotakin."',
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
      aarre: 'Ristin kohdalta, asteikon takaa, aukesi kapea kolo ja siinä '
        + 'kätkö. Fatima pyyhki viivan huolella: "Puhdistan tämän joka '
        + 'kuukausi. Viime kuussa risti oli himmeä — nyt se on terävä. '
        + 'Joku on syventänyt sitä."',
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
        + 'sammunut lyhty. Meryem käänsi lyhtyä valossa: "Tällaisia ei '
        + 'ole taottu isoisoäitini aikojen jälkeen. Joku on kulkenut '
        + 'täällä syvemmälle — kauan ennen kirjasi omistajaa."',
    },
    {
      id: 'kuwait',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Kuwait — kaupunki joka juo merestä tuodun joen',
      saapuminen: 'Rannalla veistettiin venettä, ja lankut taipuivat '
        + 'höyryssä kaarelle ilman yhtäkään piirustusta — mitta oli '
        + 'mestarin silmässä. Satamaan saapui vene, jonka lasti ei ollut '
        + 'kalaa eikä helmiä vaan vettä: makeaa jokivettä ruukuissa, '
        + 'tuotu kaukaa joensuulta. Join kupillisen laiturilla: vesi '
        + 'maistui joelta ja pitkältä matkalta, ja se maksoi enemmän '
        + 'kuin kahvi. Vesiveneen kylkeen oli maalattu merkki, jonka '
        + 'maalari oli kuollut aikoja sitten. Merkki maalataan silti '
        + 'uudelleen joka kevät.',
      henkilo: 'Veneenveistäjä Nasser rakentaa dhow-veneitä silmämitalla, '
        + 'kuten isänsä ja tämän isä, eikä yksikään kaari ole koskaan '
        + 'väärä.',
      kohtaaminen: 'Nasser laskee höylän penkille. "Merkki on sukuni '
        + 'maalaama. Matkalainen huomasi kerran laiturilla, että yksi '
        + 'ruukku itki vettä hiuksenhienosta halkeamasta — pitkällä '
        + 'matkalla se olisi maksanut miehille janon. Siitä lähtien suku '
        + 'on maalannut hänen merkkinsä veneeseen omasta tahdostaan: se '
        + 'käskee katsoa ruukut. Hän jätti kysymyksen siitä, mitä veneet '
        + 'kaupunkiin toivat. Vastaa."',
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
        + 'veneessä on yksi naula enemmän kuin hän on lyönyt. Minä '
        + 'lasken samoin. Kumpikaan meistä ei ole löytänyt sitä."',
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
      aarre: 'Kätkö odotti polun varressa kivenkolossa, johon aurinko '
        + 'osui vain laskiessaan. Ahmed kaivoi sen esiin ja pysähtyi: '
        + 'kätkön alla oli toinen kolo, tyhjä ja huolella veistetty, '
        + 'reunat tuhansien hiekkamyrskyjen pyöristämät. "Tämä paikka on '
        + 'ollut kätkö kauan ennen kirjasi omistajaa. Hän ei valinnut '
        + 'sitä. Hän löysi sen."',
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
        + 'Salim nosti lyhtyä: "Öljyä kuluu joka yö yhtä paljon. Viime '
        + 'kuussa ruukku hupeni kahden edestä — joku muukin on pitänyt '
        + 'valoa."',
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
      aarre: 'Kätkö oli kaivon kivijalassa, nimikirjainten alla irtokiven '
        + 'takana. Omar laski kiven paikalleen: "Kaivolla käy tuhansia '
        + 'käsiä vuodessa. Silti juuri tämä kivi on aina ollut tiukassa '
        + '— eilen se oli löysällä."',
    },
    {
      id: 'mekka',
      lauta: 'middleeast',
      luennat: false,
      nimi: 'Bilal',
      otsikko: 'Mekka — suunta jota koko maailma katsoo',
      saapuminen: 'Jiddan satamassa laivat purkivat pyhiinvaeltajia '
        + 'aamusta iltaan, ja kaikilla oli sama määränpää, jonne minun '
        + 'tieni ei vie: pyhä kaupunki vuorten takana. Laiturilla '
        + 'paahdettiin kahvia, ja sen tuoksu kulki veneiden yli kuin '
        + 'savu. Istuin satamassa vanhan oppaan kanssa, joka oli '
        + 'saattanut kulkijoita koko ikänsä. Hän piirsi hiekkaan viivan '
        + 'ja sanoi: minne ikinä menetkin, tämä suunta kulkee mukanasi. '
        + 'Katso kirjastasi — sinne on piirretty sama viiva.',
      henkilo: 'Pyhiinvaeltajien oppaan jälkeläinen Bilal saattaa kulkijoita '
        + 'Jiddan satamasta vuoristotielle, kuten isänsä ja tämän isä.',
      kohtaaminen: 'Bilal tasoittaa hiekan kämmenellään satamalaiturilla. '
        + '"Isoisäni saattoi kerran matkalaisen, joka ei mennyt '
        + 'kaupunkiin mutta kysyi enemmän kuin kukaan kulkija. Hänen '
        + 'kysymyksensä jäi suvullemme. Vastaa."',
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
      aarre: 'Oppaan sauvan kädensijan sisällä odotti kapea kätkö. Bilal '
        + 'kiersi kädensijan takaisin ja nojasi sauvaan niin kuin isänsä '
        + 'ja tämän isä: "Sauva on saattanut kulkijoita neljä polvea. '
        + 'Saattakoon se nyt sinut." Hän jäi laiturille katsomaan, kun '
        + 'laivat kääntyivät kohti merta.',
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
        + 'levitti kankaan valoa vasten: "Reunassa on kuvio, jota ei ole '
        + 'kudottu minun elinaikanani — se katosi kutojien mukana kauan '
        + 'ennen pantin jättäjää. Mistä hän sai kankaan, joka oli jo '
        + 'hänen aikanaan kadonnutta työtä?"',
    },
    {
      id: 'nikosia',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Nikosia — saari joka antoi nimen kuparille',
      saapuminen: 'Muurit kiersivät kaupungin täydellisenä tähtenä, ja '
        + 'kävelin kehän ympäri laskien vallisakarat: yksitoista, kaikki '
        + 'kirjassani ennen kuin astuin porteista sisään. Sepänkujalla '
        + 'vasarat kalkuttivat kuparia niin monessa tahdissa, että kuja '
        + 'soi kuin soittokunta. Vanhin sepistä nosti liinan alta '
        + 'harkon, jossa oli härän taljan muotoinen merkki — vanhempaa '
        + 'työtä kuin paja, vanhempaa kuin muurit. Kysyin, paljonko hän '
        + 'tahtoo siitä. Väärä kysymys, seppä sanoi, ja peitti harkon.',
      henkilo: 'Kaivosmiehen jälkeläinen Andreas takoo kuparia kujalla, '
        + 'jolla saaren punainen metalli on soinut aina.',
      kohtaaminen: 'Andreas kääntää harkkoa pihdeissä. "Harkon jätti '
        + 'matkalainen, joka sanoi: en voi myydä sitä enkä kantaa '
        + 'kauemmas — pitäkää, kunnes joku vastaa kysymykseen saarenne '
        + 'metallista. Isoisäni otti sen vastaan, koska härän taljan '
        + 'merkki oli vanhempaa työtä kuin mikään hänen pajassaan — '
        + 'sellaista ei jätetä kadulle. Vastaa, niin harkko on sinun."',
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
      aarre: 'Harkko oli valettu ontoksi, ja sisällä odotti kätkö. '
        + 'Andreas punnitsi puolikkaita: "Härän taljan merkki on lyöty '
        + 'valuun ennen kuin kupari jäähtyi — mutta harkko on valettu '
        + 'vuosituhansia niiden aikojen jälkeen. Joku osasi vanhan '
        + 'valajan työn. Kuka?"',
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
        + 'kulkevat tästä joka päivä, eivätkä ne säikähdä mitään '
        + 'tuttua. Kolme aamua sitten koko lauma pysähtyi tähän."',
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
        + 'tuuli täyttää tällaisen kolon hiekalla kuukaudessa. Tämä oli '
        + 'lakaistu puhtaaksi."',
    },
    {
      id: 'riad',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Riad — savilinnojen kaupunki',
      saapuminen: 'Astuin keskipäivän helteestä savitalon sisään, ja '
        + 'lämpömittarini putosi kymmenen astetta ovella — kirjasin '
        + 'lukeman kahdesti. Aavikon kaupunki on rakennettu auringossa '
        + 'kuivatusta savesta, ja savi tekee tempun, johon tiili ei '
        + 'pysty: pitää päivän ulkona ja yön lämpimänä. Kaivolla '
        + 'kaivonkaivaja näytti, mitä hänen isänsä oli nostanut '
        + 'pohjasta: pienen messinkiluodin mittanauhoineen. Hän ojensi '
        + 'sen minulle kämmenellään ja katsoi tarkasti, kummalla kädellä '
        + 'tartuin siihen.',
      henkilo: 'Kaivonkaivaja Abdullah löytää veden aavikon alta '
        + 'merkeistä, jotka hänen sukunsa on oppinut lukemaan.',
      kohtaaminen: 'Abdullah kelaa köyttä kaivolta. "Työkalun omistaja kävi '
        + 'täällä ja kysyi, miksi rakennamme savesta emmekä kivestä. '
        + 'Hän tiesi vastauksen itse — ja jätti kysymyksen perinnöksi. '
        + 'Vastaa."',
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
      aarre: 'Kätkö nousi kaivosta samassa sangossa kuin vesi, savikuoreen '
        + 'valettuna. Abdullah rikkoi kuoren: "Savi on meidän '
        + 'savontamme. Mutta sen sisällä oleva kääre on kuiva — se ei '
        + 'ole ollut kaivossa viikkoa kauempaa."',
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
        + 'päällä puuttuva sivuni. Saif katsoi dyynien yli: "Hiekka '
        + 'peittää jäljet kolmessa päivässä. Nämä jäljet on peitetty '
        + 'käsin — ja se, joka peittää jälkiä, aikoo palata."',
    },
    {
      id: 'salalah',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Salalah — rannikko joka vihertyy',
      saapuminen: 'Purjehdimme etelään pitkin rantaa, joka oli '
        + 'paahtunutta kalliota — kunnes se ei ollutkaan: vuoret '
        + 'Salalahin takana olivat vihreät, ja usva valui rinteitä kuin '
        + 'harso. Muu Arabia paahtuu, sanoi kapteeni, mutta tämä '
        + 'rannikko saa oman sateensa. Rannassa suitsukkeen savu tuntui '
        + 'ennen kuin vene kosketti laituria: pihkaa poltettiin ja '
        + 'punnittiin vaakakupeissa kuin kultaa. Yhdessä kupissa painona '
        + 'oli pieni messinkipunnus, johon oli kaiverrettu yksi ainoa '
        + 'sana. Luin sen kahdesti: PALAA.',
      henkilo: 'Suitsukkeenkerääjä Mariam viiltää puiden kuorta ja kerää '
        + 'pihkan kyynelinä, kuten hänen sukunsa on kerännyt aina.',
      kohtaaminen: 'Mariam laskee punnuksen kämmenelleni. "Punnuksen jätti '
        + 'matkalainen, joka huomasi vaakamme valehtelevan — meidän '
        + 'tappioksemme, ei ostajan. Hän viilasi sen oikeaan omalla '
        + 'kädellään ja jätti oman punnuksensa takeeksi. Ja hän jätti '
        + 'kysymyksen: vastaa, niin punnitsen sinulle sen, mitä hän '
        + 'täältä vei."',
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
      aarre: 'Vaakakaapin kaksoispohjasta löytyi kätkö. Mariam punnitsi '
        + 'sen kaupan päälle: "Se painaa täsmälleen punnuksen verran. '
        + 'Kukaan ei tee sellaista vahingossa — kätkö on punnittu tällä '
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
        + 'puolikuun takaisin telineeseen: "Kipsi kovettuu kerran eikä '
        + 'anna periksi. Tämä kehys on avattu taltalla ja kipsattu '
        + 'uudelleen — käsi oli taitava, mutta ei minun."',
    },
    {
      id: 'siinai',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Siinai — kirjasto vuorten sylissä',
      saapuminen: 'Nousimme kamelein paljaiden vuorten väliin, ja laakson '
        + 'pohjalla odotti muurien ympäröimä luostari, vanhempi kuin '
        + 'yksikään tuntemani kirja. Munkki avasi portin ja vei minut '
        + 'kirjastoon, jossa käsikirjoituksia on säilytetty puolitoista '
        + 'vuosituhatta. Yhdellä hyllyllä oli tyhjä kohta ja sen '
        + 'kohdalla lappu. Munkki käänsi lapun minulle: tähän '
        + 'palautetaan se, mikä lainattiin. Lainaajaa ei mainittu. '
        + 'Päivämäärä oli kolmenkymmenen vuoden takaa.',
      henkilo: 'Munkki Gabriel hoitaa luostarin kirjastoa, jossa jokainen '
        + 'käsikirjoitus tunnetaan ja jokainen tyhjä kohta muistetaan.',
      kohtaaminen: 'Gabriel laskee kynttilän hyllyn ääreen. "Lainaaja jätti '
        + 'pantiksi kysymyksen ja sanoi: vastaus on palautus. Kysymys '
        + 'koskee tätä paikkaa. Vastaa."',
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
      aarre: 'Tyhjän kohdan takana, hyllylevyn alla, odotti litteä kätkö. '
        + 'Gabriel suoristi lapun: "Pöly laskeutuu kirjastossa '
        + 'tasaisesti, ja tyhjässä kohdassa sitä ei ollut lainkaan. '
        + 'Joku on koskettanut hyllyä tällä viikolla."',
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
        + 'solmua, joita minä en ole solminut. Ne ovat oikein '
        + 'solmittuja — mutta lanka on värjätty toisessa kaupungissa."',
    },
    {
      id: 'teheran',
      lauta: 'middleeast',
      luennat: false,
      otsikko: 'Teheran — sali joka on tehty peileistä',
      saapuminen: 'Palatsin salissa pysähdyin ovelle: seinät ja katto '
        + 'oli katettu tuhansilla peilinpaloilla, ja yksi kynttilä '
        + 'syttyi tuhanneksi. Palatsi oli hiljainen: šaahi itse oli '
        + 'matkoilla Euroopassa, ensimmäisenä hallitsijoistaan, ja '
        + 'vahtimestari sanoi hymyillen — nyt palatsi katsoo teitä, ja '
        + 'te palatsia. Oppaani aloitti tarinan: peilit tilattiin kaukaa '
        + 'meren takaa — ja vaikeni siihen. Lopun saa kuulla vain siltä, '
        + 'joka salia hoitaa, hän sanoi. Yhdessä nurkassa peilipinnassa '
        + 'oli himmeä pala. Sen takana ei ollut peiliä. Sen takana oli '
        + 'lokero.',
      henkilo: 'Peilimosaiikin korjaaja Reza vaihtaa saliin himmenneet palat '
        + 'uusiin ja tuntee jokaisen sirpaleen paikan.',
      kohtaaminen: 'Reza nostaa himmeän palan varovasti irti. '
        + '"Mestareilla on tapa: kun salissa tapahtuu jotakin, mikä ei '
        + 'saa unohtua, yksi pala jätetään himmeäksi — sali muistaa, '
        + 'vaikka kukaan ei kertoisi. Tämä pala himmeni sinä iltana, '
        + 'jona muuan matkalainen istui täällä sulkemisaikaan asti. '
        + 'Hänen kysymyksensä on tarina tästä salista. Vastaa."',
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
        fakta: 'Tarinan mukaan Eurooopasta laivatut suuret peilit särkyivät '
          + 'matkalla — ja persialaiset mestarit tekivät tappiosta '
          + 'taidetta: sirpaleet ladottiin kipsiin mosaiikiksi, joka '
          + 'rikkoo valon tuhansiksi kimalluksiksi. Peilimosaiikista eli '
          + 'aina-karista tuli palatsien ylpeys.',
      },
      aarre: 'Lokerossa odotti kätkö, peilinpalan kokoinen. Reza sovitti '
        + 'himmeän palan takaisin: "Vaihdan himmenneet palat joka vuosi '
        + '— tämän jätän, niin kuin mestarit ennen minua. Mutta kipsi '
        + 'sen ympärillä on uusittu, eikä uusija ollut minä."',
    },
  ],
};
