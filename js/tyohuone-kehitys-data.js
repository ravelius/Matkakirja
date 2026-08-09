/*
 * Työhuoneen Kehitys-välilehden sisältö. Fable kirjoittaa tämän
 * tiedoston; työhuone näyttää sen Kehitys-välilehdellä.
 *
 * Siivottu 9.8.2026 (omistajan pyyntö: "siivoa sieltä kaikki vanha
 * pois"): vanhat kokeilut (iso kaari, ääninäytteet, mannerkokeilut,
 * mittakokeilut, väliversiot, visa/aarre-kokeilut ja KAARI_KAUPUNGIT
 * äänineen) poistettiin — ne löytyvät git-historiasta. Jäljellä on
 * vain uusin kokonaisuus: KAARI_PAKETIT.
 */
/*
 * KOKO TEKSTIPAKETTI — viisi kaupunkia kerralla suunniteltuna
 * (omistajan tilaus 9.8.2026: viisi kaupunkia, koko kaari yhtenä
 * suunnitelmana: saapuminen, kohtaaminen
 * nimetyn henkilön kanssa, visa, aarre — ja kärkenä omistajan idea:
 * henkilön vihje sanotaan vasta AARTEEN LÖYTYMISEN JÄLKEEN, jää auki
 * ja vie eteenpäin).
 *
 * Tekstit ovat kokonaan uudet (Fable 9.8.2026). Viisi vihjettä
 * muodostavat yhdessä ison arvoituksen: joku kulkee nykyaikana samoja
 * jälkiä ja pitää isoisän merkkejä yllä — kuka, se ei paljastu.
 * ÄLÄ generoi ääniä ennen omistajan hyväksyntää: omistaja päättää,
 * mitkä osat ylipäätään luetaan.
 */
export const KAARI_PAKETIT = {
  johdanto: 'Viisi kaupunkia, koko paketti kerralla suunniteltuna: '
    + 'saapuminen (isoisä äänessä, '
    + '1873), kohtaaminen nimetyn henkilön kanssa, visa ja aarre — ja '
    + 'kärkenä uusi osa: henkilön vihje, joka sanotaan vasta aarteen '
    + 'löytymisen jälkeen ja jää auki cliffhangeriksi. Jokaiseen '
    + 'kaupunkiin on suunniteltu henkilö, jolla on oma syy olla juuri '
    + 'siinä paikassa. Viisi vihjettä kietoutuvat yhteen isoon '
    + 'arvoitukseen: joku pitää isoisän jälkiä yllä vielä tänäänkin. '
    + 'Ääniä ei ole generoitu — sinä päätät luettuasi, mitkä osat '
    + 'luetaan ääneen.',
  kohteet: [
    {
      id: 'praha',
      otsikko: 'Praha — kynttilä tyhjässä talossa',
      saapuminen: 'Kultaisella kujalla, talossa numero kahdeksan, paloi '
        + 'kynttilä, vaikka ovi oli lukossa ja ikkunassa vuosisadan '
        + 'pöly. Sisällä pöydällä odotti avoin kirja, ja sen reunaan '
        + 'oli kirjoitettu barometrini lukema — minuutilleen sama kuin '
        + 'omani. Käsiala ei ollut minun. Sinä, joka tätä luet: '
        + 'kynttilä ei sytytä itseään.',
      henkilo: 'Lyhdynsytyttäjä Tomáš sytyttää joka ilta Kultaisen '
        + 'kujan lyhdyt — ja yhden kynttilän, jota kukaan ei ole '
        + 'tilannut sataan vuoteen. Hänen sukunsa lupasi Horatiolle '
        + 'pitää talon kahdeksan valon palamassa, kunnes etsijä palaa. '
        + 'Hän on vastaus saapumisen arvoitukseen — ja tietää '
        + 'tilauksesta enemmän kuin aluksi kertoo.',
      tervehdys: 'Lyhdynsytyttäjä laskee tikkaansa ja katsoo kirjaasi '
        + 'kauan. "Talon kahdeksan kynttilä on sukuni työ. Isoisäsi '
        + 'maksoi siitä sadaksi vuodeksi ja sanoi: joka tulee kysymään '
        + 'loppulaskua, on oikea etsijä. Näytä, että tunnet maailmaa '
        + 'kuten hän — lasku odottaa."',
      visa: 'Tomáš avaa pöydän kirjan merkitystä kohdasta. Isoisän '
        + 'rivi reunassa: "Tässä kaupungissa savesta tehtiin kerran '
        + 'vartija, ja oikea sana herätti sen. Valitse vastauksesi '
        + 'kuin sana — väärä nukuttaa, oikea herättää." Alempana, '
        + 'haaleammalla musteella: "Portaista kuuluu askeleita. '
        + 'Jatkan, kun tiedän kenen."',
      aarre: 'Kätkön päällä oli kynttilänpätkä, sydän vielä lämmin. '
        + 'Isoisän rivi: "Jos liekki paloi, kun tulit, en ollut '
        + 'viimeinen etsijä. Puhalla se sammuksiin puolestani — ja '
        + 'katso ikkunasta, kuka kujalla pysähtyy."',
      vihje: 'Tomáš raapaisee tulitikun ja sytyttää kynttilän '
        + 'uudelleen: "Sopimus on sopimus — valo palaa, kunnes etsijä '
        + 'palaa. Mutta tilauksessa oli kaksi kynttilää. Toista en ole '
        + 'löytänyt koskaan. Tiedän vain, että se palaa jossain, missä '
        + 'maa on lämmin."',
    },
    {
      id: 'istanbul',
      otsikko: 'Istanbul — upotettu palatsi',
      saapuminen: 'Laskin kahdeksankymmentä porrasta pimeään, ja '
        + 'kaupungin äänet sammuivat yksi kerrallaan. Alhaalla seisoi '
        + 'pylväsmetsä mustassa vedessä, ja yhden pylvään alla lepäsi '
        + 'kivinen kasvo ylösalaisin. Sammutin lyhtyni kokeeksi — ja '
        + 'veden ylle jäi palamaan toinen valo, joka ei ollut minun.',
      henkilo: 'Vedenvartija Emine mittaa säiliön veden korkeuden, '
        + 'kuten hänen sukunsa on tehnyt sulttaanien ajoista. Hänen '
        + 'isoisoäitinsä istui Horation kanssa kokonaisen yön ja '
        + 'vertasi vedenmittoja barometrin lukemiin. Emine tuntee '
        + 'pylväät, molemmat kivikasvot — ja mittauskirjan, josta '
        + 'puuttuu yksi sivu.',
      tervehdys: 'Portaiden alla nainen nostaa lyhtyä ja mittaa '
        + 'kirjaasi katseellaan. "Vedenvartija Emine. Sukuni on '
        + 'mitannut tämän veden sulttaanien ajoista. Kirjasi omistaja '
        + 'istui isoisoäitini kanssa koko yön ja vertasi lukuja — '
        + 'kaksi mittaajaa, yksi kynttilä. Näytä, että tunnet maailmaa '
        + 'kuten hän, niin soudan sinut kasvojen luo."',
      visa: 'Emine antaa veneen liukua pylvään varjoon. Isoisän rivi: '
        + '"Täällä oikea vastaus on käännettävä ylösalaisin, kuten '
        + 'kasvot veden alla. Joka katsoo suoraan, erehtyy — joka '
        + 'katsoo heijastuksesta, näkee." Sivun alareuna oli kastunut, '
        + 'ja viimeinen rivi oli liuennut lukukelvottomaksi.',
      aarre: 'Kätkö nousi vedestä köyden päässä, ja lyhdyn valo osui '
        + 'kivikasvoihin suoraan. Isoisän rivi: "Kasvot vartioivat '
        + 'tätä, koska pyysin kohteliaasti. Nyökkää niille puolestani '
        + '— ja kun nouset portaita, älä säikähdä, jos toinen valo '
        + 'saattaa sinut ylös."',
      vihje: 'Emine kiinnittää veneen ja sanoo hiljaa: "Kasvoja on '
        + 'kaksi. Toinen makaa kyljellään, ja isoisäsi kysyi, kumpi on '
        + 'vartija ja kumpi vanki. Isoisoäitini tiesi vastauksen ja '
        + 'kirjoitti sen mittauskirjan viimeiselle sivulle. Joku on '
        + 'sittemmin leikannut sen sivun irti."',
    },
    {
      id: 'wien',
      otsikko: 'Wien — luiden holvit kirkon alla',
      saapuminen: 'Kirkon alla ovi oli raollaan, ja kynttilöiden '
        + 'liekit taipuivat kaikki samaan suuntaan, vaikka ilma '
        + 'seisoi. Holvit jatkuivat pimeään syvemmälle kuin kynttilän '
        + 'valo kantoi. Askelteni kaiku palasi yhtä askelta myöhässä — '
        + 'ja kun pysähdyin kahdesti, kaiku pysähtyi vain kerran.',
      henkilo: 'Suntio Anton hoitaa holvien kynttilät ja saattajien '
        + 'kirjan, jossa Horation nimen vieressä on hänen oman '
        + 'isoisänsä käsiala. Hän tietää, mistä veto holveihin tulee, '
        + 'muttei ole koskaan avannut sitä ovea — eikä aio avata.',
      tervehdys: 'Suntio nostaa kynttilänsammuttimen olalleen kuin '
        + 'sauvan. "Anton, holvien hoitaja. Saattajien kirjassa on '
        + 'isoisäsi nimi — ja vieressä minun isoisäni käsiala. He '
        + 'laskeutuivat kolmen lyhdyn kanssa, ja ylös palasi kaksi. '
        + 'Näytä, että tunnet maailmaa kuten hän, niin kerron, minne '
        + 'kolmas jäi."',
      visa: 'Anton pysähtyy portaiden suulle eikä astu pidemmälle. '
        + 'Isoisän rivi: "Tässä kaupungissa musiikki peittää sen, '
        + 'mitä maan alla lepää. Kuuntele valssia ja laske tahdit — '
        + 'kolmas isku on aina yksi liikaa." Sivun kulma oli '
        + 'kärventynyt, kuin sitä olisi luettu liian läheltä liekkiä.',
      aarre: 'Kätkön päällä seisoi lyhty — se kolmas. Liekki oli '
        + 'sammunut, mutta lasi oli yhä lämmin. Isoisän rivi: "Jätin '
        + 'valon tänne, koska luut eivät sitä tarvitse, mutta etsijä '
        + 'tarvitsee. Kulje vetoa vastaan, niin löydät ulos — äläkä '
        + 'sammuta omaasi."',
      vihje: 'Anton laskee sammuttimen alas ja puhuu portaita kohti: '
        + '"Veto ei ole tuulta. Se tulee ovesta, jota ei minun '
        + 'aikanani ole avattu. Isoisäsi tiesi, minne se johtaa — hän '
        + 'kirjoitti saattajien kirjaan yhden lauseen: sinne ei mennä '
        + 'alakautta."',
    },
    {
      id: 'venetsia',
      otsikko: 'Venetsia — naamio sillan kaiteella',
      saapuminen: 'Vesi nousi kaduille keskellä yötä, ja kanaaleista '
        + 'tuli musta peili. Sillan kaiteella odotti valkoinen naamio, '
        + 'jolla oli linnunnokka — ruttolääkärin kasvot, silmäaukot '
        + 'tyhjinä. Nostin sen, ja mustassa vedessä heijastukseni '
        + 'näytti laskevan naamion takaisin kaiteelle.',
      henkilo: 'Naamiontekijä Lucia pitää pajaa kolmannessa polvessa. '
        + 'Pajan tilauskirjassa on vuosi 1873 ja nimikirjaimet H. F.: '
        + 'kaksi samanlaista lääkärinnaamiota ja ohje jättää toinen '
        + 'sillalle aina, kun vesi nousee. Lucia on noudattanut '
        + 'ohjetta koko ikänsä — ja viime keväänä tapahtui jotain, '
        + 'mitä hän ei osaa selittää.',
      tervehdys: 'Pajassa tekijä nostaa naamion valoa vasten ja '
        + 'tunnistaa nokan yhdellä vilkaisulla. "Lucia. Tuo on meidän '
        + 'pajamme työtä. Tilauskirjassa lukee 1873, nimikirjaimet '
        + 'H. F. — kaksi samanlaista naamiota ja ohje: toinen '
        + 'jätetään sillalle aina, kun vesi nousee. Näytä, että '
        + 'tunnet maailmaa kuten hän, niin luen tilauksen loppuun."',
      visa: 'Lucia kääntää tilauskirjan sivua, mutta väliin on '
        + 'taitettu isoisän lehti: "Täällä kaikki kelluu — myös '
        + 'valheet. Oikea vastaus painuu pohjaan kuin kivi, väärä jää '
        + 'pinnalle kuin naamio." Rivin alle oli piirretty '
        + 'tähtäinristi — ja liitu tarttui sormeen, vielä märkänä.',
      aarre: 'Kätkö nousi vedestä, ja naamio jäi kellumaan sen '
        + 'viereen kasvot ylöspäin, kohti taivasta. Isoisän rivi: '
        + '"Jätin vartijan, joka ei koskaan sulje silmiään. Ota kätkö '
        + 'ja käännä naamio kasvot alaspäin — niin seuraava etsijä '
        + 'tietää, että joku ehti ensin."',
      vihje: 'Lucia sulkee tilauskirjan hitaasti: "Naamioita oli '
        + 'kaksi. Toinen lähti isoisäsi matkaan — ja viime keväänä '
        + 'joku toi sen takaisin pajaan. Ei sanonut nimeään, jätti '
        + 'vain maksun ja paperilapun. Lapussa oli pelkkä '
        + 'ilmanpaineen lukema."',
    },
    {
      id: 'budapest',
      otsikko: 'Budapest — hengittävä labyrintti',
      saapuminen: 'Linnan alla aukeaa labyrintti, jonka seinät '
        + 'hikoilevat lämmintä vettä, kuin vuori hengittäisi. Vein '
        + 'kynttilän syvimpään käytävään ja löysin seinästä liidulla '
        + 'piirretyn tähtäinristin — oman merkkini, vaikken ollut '
        + 'käynyt täällä eläissäni. Viiva oli terävä, kuin tänään '
        + 'piirretty.',
      henkilo: 'Kylpymestari Márta on kylpylän vanhin kylvettäjä. '
        + 'Hänen isoisoäitinsä saattoi Horation linnan alle ja opetti '
        + 'tälle lämpimän seinän säännön — eikä kenellekään muulle. '
        + 'Márta tuntee labyrintin ihollaan, ei silmillään, ja on '
        + 'nähnyt saman liituristin ilmestyvän seinään yhä uudelleen.',
      tervehdys: 'Kylpymestari kuivaa kätensä ja koskettaa kirjan '
        + 'kantta kuin vanhaa tuttua. "Márta. Isoisoäitini vei kirjasi '
        + 'omistajan linnan alle ja opetti hänelle säännön, jolla '
        + 'sieltä palataan. Sitä ei ole opetettu kenellekään muulle. '
        + 'Näytä, että tunnet maailmaa kuten hän — niin sääntö on '
        + 'sinun."',
      visa: 'Márta sytyttää kynttilän ja ojentaa sen kädestä käteen. '
        + 'Isoisän rivi: "Maan alla suunnat valehtelevat. Lämmin '
        + 'seinä vie lähteelle, kylmä ulos — luota ihoosi, älä '
        + 'silmiisi." Ja alle, kiireisemmällä käsialalla: "Sääntö '
        + 'toimii. Mutta joku muu tuntee sen myös."',
      aarre: 'Kätkö odotti lämpimän seinän takana, höyryn peitossa. '
        + 'Isoisän rivi: "Piirsin ristin, jotta löytäisin takaisin — '
        + 'tai jotta sinä löytäisit minut. Sinä, joka tätä luet: '
        + 'pyyhi merkki pois, kun olet ulkona. Meidän jälkemme saa '
        + 'päättyä tähän."',
      vihje: 'Márta saattaa sinut portille ja sanoo vasta siinä: '
        + '"Pyyhitkö merkin? Niin pyyhki isoisoäitinikin — ja silti '
        + 'se on aamulla aina seinässä. Joku piirtää sen yhä '
        + 'uudelleen. En tiedä kuka. Tiedän vain, että liitu on aina '
        + 'samaa — valkoista, kuin sillä ensimmäisellä kerralla."',
    },
  ],
};
