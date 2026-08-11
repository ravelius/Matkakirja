/*
 * RAAMATTU 2.0 — koko pelin idea yhdessä tiedostossa.
 *
 * Omistajan tilaus 11.8.2026: työhuone ja vanha raamattu olivat
 * liian sekavia — tälle sivulle kootaan pelin kaikki puolet, ja
 * vanhat kirjaukset arkistoitiin Arkisto-välilehdelle. Sisältö on
 * Fablen TIIVISTYS nykytilasta (luonnos): se käydään omistajan
 * kanssa läpi kohta kohdalta, ja hyväksytyn osion tila vaihdetaan
 * luonnoksesta hyväksytyksi. VAIN FABLE kirjoittaa tähän
 * tiedostoon. Yksityiskohtaiset lähdedokumentit, joihin tiivistys
 * nojaa: docs/tarina.md, docs/isoisan-raamattu.md,
 * docs/periaatteet.md — ristiriidassa Raamattu 2.0 voittaa sen
 * jälkeen, kun osio on hyväksytty yhdessä.
 */

export const RAAMATTU2 = {
  paivitetty: '11.8.2026',
  johdanto: 'Koko pelin idea yhdessä dokumentissa. TAVOITE '
    + '(omistajan linjaus 11.8.2026): tämän lukeminen riittää '
    + 'yksinään pelin kehittämiseen ja uusien matkakirjatekstien '
    + 'kirjoittamiseen — muista muistiinpanoista luovutaan, kun '
    + 'Raamattu 2.0 on valmis (vain tekniset toteutusohjeet jäävät '
    + 'erikseen, eikä omistajan tarvitse tuntea niitä). Käydään läpi '
    + 'yhdessä kohta kohdalta; Fable täydentää itse puuttuvan '
    + 'oleellisen. Kun Raamattu 2.0 on valmis, KAIKKI '
    + 'matkakirjamerkinnät, kohtaamiset ja aarrelöytötekstit '
    + 'kirjoitetaan uusiksi sen mukaisiksi.',
  osiot: [
    {
      otsikko: 'Ydinajatus ja kohderyhmä',
      tila: 'hyväksytty 11.8.2026',
      kohdat: [
        'Suomenkielinen selainseikkailu: nuori herra Reginald Fogg '
          + 'matkustaa isoisänsä vuoden 1873 matkapäiväkirjan '
          + 'jäljillä maailman ympäri ja etsii Aarnin luettelon '
          + 'unohdettuja aarteita.',
        'Kohderyhmä: 13 vuotta täyttäneet ja aikuiset.',
        'Peli näyttää uusia paikkoja ja kiinnostavia '
          + 'yksityiskohtia kaupungeista ja maista — '
          + 'kulttuureista, tavoista, kielistä, keksinnöistä ja '
          + 'historiasta — sekä hurjia tarinoita niin '
          + '1800-luvulta kuin nykypäivästä. Ymmärrys rakentuu '
          + 'tarkoin valituista kuvista, teksteistä, peleistä, '
          + 'grafiikoista, animoiduista karttavisualisoinneista, '
          + 'linkeistä, radioista ja muista lähteistä.',
        'Mielenkiintoa pitää yllä kehystarinan seikkailuretki: '
          + 'aarteita voi löytää, mutta matkalla on myös vaaroja — '
          + 'ja aikapaine: maailman ympäri alle '
          + 'kahdeksassakymmenessä päivässä. Raja on tavoite ja '
          + 'isoisän ennätys, ei tuomio (omistajan päätös '
          + '11.8.2026): ylityksestä ei rangaista ja alitus '
          + 'palkitaan, mutta peli muistuttaa kuluvista päivistä '
          + 'matkan varrella, jotta paine tuntuu.',
        'Oppiminen on seikkailun sivutuote: uteliaisuus '
          + 'kuljettaa, mikään ei tunnu koululta — ja kaikki '
          + 'tieto on totta ja tarkistettua. Oppiminen lähtee '
          + 'usein pienestä kiinnostavasta yksityiskohdasta ja '
          + 'laajenee siitä ymmärrykseksi koko maasta tai '
          + 'kulttuurista.',
        'Tekoäly tekee mahdolliseksi valtavan käyttövapaan '
          + 'aineiston (PD/CC) hyödyntämisen ja kuratoinnin '
          + 'selkeään, kiinnostavaan, yllättävään ja koskettavaan '
          + 'muotoon — ihminen valitsee ja hyväksyy '
          + 'lopputuloksen.',
      ],
    },
    {
      otsikko: 'Tarina ja hahmot',
      tila: 'luonnos',
      kohdat: [
        'Reginald Fogg perii vintiltä isoisän matkalaukun: vuoden '
          + '1872 kartan, kukkarollisen puntia, passin ja paksun '
          + 'päiväkirjan vuodelta 1873. Hän olettaa maailman olevan '
          + 'kuin isoisä sen jätti — ei ole.',
        'Matkakirja on puhtaasti isoisän PÄIVÄKIRJA: sitä ei ole '
          + 'kirjoitettu kenellekään eikä se puhuttele lukijaa. '
          + 'Sen revitty viimeinen sivu on arvoitus, jota Reginald '
          + 'lähtee selvittämään.',
        'Reginaldin kiire on itse valittu: hän on päättänyt tehdä '
          + 'matkan samassa ajassa kuin isoisä — alle 80 päivässä.',
        'Matkalla Reginaldille selviää, millainen isoisä hänellä '
          + 'oli ja mitä kummallista tälle sattui — ja samalla hän '
          + 'alkaa ymmärtää maailmaa ja sen muuttumista. '
          + 'Päiväkirjan tapahtumat ja nykymaailman ilmiöt ovat '
          + 'niin hurjia, että Reginaldia alkaa itseäänkin '
          + 'jännittää — varsinkin kun joku tuntuu seuraavan. '
          + 'Onko joku muukin saanut vihiä, että Aarnin aarteet '
          + 'ovat sittenkin olemassa?',
        'Isoisä Horatio Fogg (H.F.): laivaston kartanpiirtäjä, '
          + 'erosi 1873 ("halusin tietää, mitä rannikon takana '
          + 'on"). Mittaa kaiken (barometri kulkee nyt Reginaldin '
          + 'laukussa), pelkää hevosia muttei myrskyjä, kohtelias '
          + 'kaikille — persoona välittyy päiväkirjan '
          + 'merkinnöistä, ei puhuttelusta.',
        'Kaksi ääntä vuorottelee: isoisän päiväkirja 1873 ja '
          + 'nuoren herran havainto nyt. Huumori syntyy niiden '
          + 'välistä; joskus isoisä on yhä oikeassa, ettei vanha '
          + 'ääni ole narri. Ivaa paikallisille ei koskaan — '
          + 'piikki osoittaa herroihin itseensä.',
        'Vastustajat: isoisällä oli kilpailija (Ezekiel Grimshaw, '
          + '1873 — mahtipontinen, aina laivavuoron myöhässä, ei '
          + 'koskaan vaarallinen). Reginaldilla on omansa: '
          + 'NÄKYMÄTÖN kilpailija, joka ei koskaan näyttäydy eikä '
          + 'missään kohdassa paljastu hyväksi tai auttajaksi. '
          + 'Tummansininen sateenvarjo on seuraajan '
          + 'tunnistusmerkki (muita tunnistuskeinoja mietitään '
          + 'vielä). Seuraajan henkilöllisyys EI paljastu koskaan, '
          + 'eikä revityn sivun arvoitus ratkea — ne jäävät auki.',
        'Aarni: 1800-luvun alun tutkimusmatkailija, jonka '
          + 'luettelossa on maailman unohdetut aarteet — yksi '
          + 'jokaisesta maanosasta. Aikalaiset pitivät luetteloa '
          + 'satukirjana; isoisä uskoi siihen.',
        'Maanosan mysteeri = aarrevihjeet: erillisiä symboleja '
          + 'tai merkkijärjestelmiä EI ole. Sen sijaan harvat '
          + 'sivuhuomiot (muutamassa kaupungissa per manner) '
          + 'vihjaavat, että mantereen pääaarre on oikeasti '
          + 'olemassa, ja raottavat mikä se on — esimerkiksi joku '
          + 'muistaa isoisänsä puhuneen meripihkapaneelien '
          + 'kuormavaunusta. Vihjeet loksahtavat paikoilleen, kun '
          + 'pääaarre löytyy. Vain sivuhuomion kokoisia, ei '
          + 'kryptisiä.',
        'Matkakirjan tekstien rooli: isoisän seikkailut 1873 ja '
          + 'nuoren herran tarkat, yksityiskohtaiset havainnot '
          + 'nykyhetkestä — myös pienet arkiset havainnot ja '
          + 'kommellukset (vaikka minkä värinen vessapaperi on ja '
          + 'mitä sen kanssa sattui). Pieni huomio avaa kaupungin '
          + 'ytimen ja tunnelman tarinana — lehdet syventävät sen '
          + 'tiedoksi, ja tarinan kautta paikka myös muistetaan.',
        'KAANON (omistajan linjaus 11.8.): isoisä EI ole '
          + 'virittänyt mitään, mikä maagisesti kantaisi '
          + 'vuosisadan yli ja odottaisi poikaa — kukaan ei ole '
          + 'odottanut häntä 150 vuotta. Pelin kauneus on siinä, '
          + 'että poika yrittää ymmärtää, mitä isoisä on kokenut '
          + 'ja mitä ihmettä hän on kirjaansa kirjoittanut. Kirja '
          + 'itsessään saa olla vähän arvoitus, koska vanhan '
          + 'päiväkirjan lukeminen on hidasta ja vaatii '
          + 'ponnistelua. Teema: ihminen on samojen '
          + 'peruskysymysten äärellä yhtä pihalla kuin ennenkin — '
          + 'vastausta etsimässä.',
        'Reginaldille ja Horatiolle kirjoitetaan tarvittaessa '
          + 'muutama uusi persoonan piirre vetovoimakeinoja '
          + 'varten (esim. etikettivirheet, hassu pukeutuminen) — '
          + 'luonnostellaan yhdessä.',
      ],
    },
    {
      otsikko: 'Kirjoittajan säännöt (matkakirjatekstit)',
      tila: 'luonnos',
      kohdat: [
        'Kaksi ääntä: isoisä saa loistaa asioissa, jotka ovat '
          + 'yhä totta (joet, vuoret, tuoksut, satamien '
          + 'järjestys), ja olla toivottoman vanhentunut nimissä, '
          + 'rajoissa ja tekniikassa. Joskus isoisä on yhä '
          + 'oikeassa ja nuori herra yllättyy — vanha ääni ei ole '
          + 'narri. Nuori herra ei ole viisaampi ihmisenä, hän '
          + 'vain elää 150 vuotta myöhemmin.',
        'Kunnioitus: paikallisia ei ivata koskaan — piikki '
          + 'osoittaa herroihin itseensä. Kohtaamishenkilöissä '
          + 'epäusko ja hämmästys ovat huumorin luonnolliset '
          + 'kodit, eivät nauraminen kenellekään.',
        'Imu aikuiselle: vaara saa tuntua, mutta se tulee '
          + 'maailmasta ja kilpajuoksusta, ei ihmisten '
          + 'pahuudesta. Seuraaja kaihertaa mieltä muttei koskaan '
          + 'uhkaa ketään.',
        'Kommellus on polttoainetta: jokaisessa kirjoituserässä '
          + 'vähintään yksi aito kommellus — jokin menee '
          + 'herroilta konkreettisesti pieleen ja siitä seuraa '
          + 'jotain. Suoraa itsensä pilkkaa säästeliäästi.',
        'Vaihtelu budjetilla: toistuvat motiivit (barometri, '
          + 'sateenvarjo, aarrevihjeet…) esiintyvät harvakseltaan '
          + '— harvuus tekee niistä tehokkaita. Aistihavainto '
          + '(haju tai maku) noin joka kolmanteen kohteeseen; '
          + 'aitoja vuoden 1873 tositapahtumia ankkureiksi sinne '
          + 'tänne.',
        'Pituuskuri: tekstit ovat lyhyitä ja sivuhuomiot '
          + 'sivulauseita — ei kryptisyyttä, ei selittelyä. '
          + 'Pieni konkreettinen yksityiskohta voittaa aina '
          + 'yleisen kuvailun.',
        'Faktakuri: jokainen fakta tarkistetaan ja lähde '
          + 'merkitään. Luenta vastaa tekstiä sanasta sanaan — '
          + 'siksi arvottavia tekstejä ei lueta ääneen.',
      ],
    },
    {
      otsikko: 'Tekstien vetovoima',
      tila: 'luonnos',
      kohdat: [
        'Keinopakki, jolla teksteistä tehdään mielenkiintoisia — '
          + 'nämä ovat käytettävissä heti, jos Euroopan uudet '
          + 'tekstit aloitettaisiin nyt. Keinot punnitaan yhdessä '
          + 'ja osio täydentyy ennen uudelleenkirjoitusta.',
        'Kommellus: jokin menee herroilta konkreettisesti '
          + 'pieleen ja siitä seuraa jotain — tehokkain '
          + 'yksittäinen keino.',
        'Aikakontrasti: isoisän 1873 väittää, nykypäivä vastaa. '
          + 'Lukija saa itse huomata, mikä on muuttunut ja mikä '
          + 'yllättäen ei.',
        'Aistiankkuri: yksi tarkka haju, ääni tai maku kiinnittää '
          + 'paikan muistiin paremmin kuin kappale kuvailua.',
        'Mittaajan persoona: isoisä mittaa, laskee ja vertaa — '
          + 'tarkat numerot ja välineet (barometri) tekevät '
          + 'hänestä elävän.',
        'Auki jäävä koukku: merkintä tai kohtaaminen päättyy '
          + 'kysymykseen tai vihjeeseen, joka jää kutkuttamaan '
          + '(dekkarin imu).',
        'Aarrevihjeet: harva sivuhuomio vahvistaa, että Aarnin '
          + 'aarre on totta — palkitsee tarkan lukijan.',
        'Seuraajan varjo: tummansininen sateenvarjo vilahtaa '
          + 'harvoin ja ohimennen — jännite ilman uhkaa.',
        'Yllätysfakta: tosi mutta hämmästyttävä yksityiskohta, '
          + 'josta lukija haluaa kertoa jollekulle ("tätä en '
          + 'olisi uskonut").',
        'Konkreettinen ihminen: nimetty paikallinen ja hänen '
          + 'hiljainen tietonsa — ei koskaan "ihmiset" tai '
          + '"kansa".',
        'Arjen hinnat ja tavat 1873: mitä ateria, yösija tai '
          + 'sähke maksoi ja miten asiat hoidettiin — aikamatkan '
          + 'tuntu syntyy arjesta, ei monumenteista.',
        '80 päivän paine: aikataulu muistuttaa itsestään '
          + 'pienissä valinnoissa — ehtiikö, uskaltaako viipyä '
          + 'vielä päivän.',
        'Löytöhetken tunne: hauskan yllättävät paikallisaarteet '
          + 'ja lyhyet huudahdukset — nauru tai häkellys sinetöi '
          + 'muistijäljen.',
        'Skandaali (omistajan ehdotus 11.8.): historiallinen tai '
          + 'varovasti tuore skandaali — isoisä saa paheksua ja '
          + 'olla salaa kiinnostunut. Eläviä yksityishenkilöitä '
          + 'ei käytetä; kuolleet ja instituutiot kestävät.',
        'Historian oikku (11.8.): yksi käänne, joka muovasi '
          + 'paikan ja ihmiset — ja sen näkyvä jälki nykypäivässä.',
        'Pienestä suureen (11.8.): pieni asia paljastaa '
          + 'perusteluineen jotain suurta paikasta — mieluiten '
          + 'tarinan tai huumorin kautta, ettei oivallus jää '
          + 'luennoksi.',
        'Nykyhetken kiinne (11.8.): esim. vuosittainen '
          + 'musiikkifestivaali historiallisella paikalla — sama '
          + 'aukio, isoisän aikana paraati, nyt festarilava. '
          + 'Artisti mainitaan menneessä muodossa ("täällä lauloi '
          + 'viime kesänä X"), ettei teksti vanhene valheeksi.',
        'Yllätyskohtaaminen (11.8.): joku tulee juttelemaan '
          + 'Reginaldille pyytämättä. Harvinaisena tehokas, koska '
          + 'kaikki muu pelissä tapahtuu vain napista.',
        'Elokuvallinen avaus (11.8.): kohtaus rakennetaan '
          + 'monesta kuvakulmasta kuin elokuvassa, ja kun '
          + 'Reginald astuu kuvaan, jokin särähtää hauskasti — '
          + 'etikettivirhe tai hassu asu. Reginaldille ja '
          + 'Horatiolle kirjoitetaan tarvittaessa muutama uusi '
          + 'persoonan piirre näitä varten (ks. Tarina ja hahmot).',
        'Henkilö liikkeellä (11.8.): merkintä matkan päältä — '
          + 'ratikassa, taksissa, tuktukissa, kuumailmapallossa, '
          + 'sukeltamassa (poika tai isoisä).',
        'Ketju kaupunkien välillä (Fablen ehdotus): pieni juonne '
          + 'alkaa yhdessä kaupungissa ja päättyy toisessa — '
          + 'esim. Pariisissa postitettu kirje odottaa Wienissä.',
        'Paikallinen sana (Fablen ehdotus): Reginald oppii yhden '
          + 'paikallisen sanan tai sanonnan ja käyttää sitä — '
          + 'joskus väärin. Kieli jää mieleen paikan mukana.',
        'Kirjan fyysiset jäljet (Fablen ehdotus): tahra, '
          + 'puristettu kukka, hiekanjyvät taitteessa — kirja '
          + 'esineenä todistaa kokemuksesta. Jälkiä menneestä, EI '
          + 'koskaan viritettyjä viestejä (ks. vältettävät).',
        'VÄLTETTÄVÄT (omistajan linjaus 11.8.): 1) '
          + 'monimutkaiset ja vanhahtavat viittaukset mystisiin '
          + 'asioihin, jotka eivät johda mihinkään; 2) '
          + '"odottanut 150 vuotta kuin messiasta" -siirappi — '
          + 'kukaan ei ole odottanut poikaa, eikä isoisä ole '
          + 'virittänyt mitään, mikä maagisesti kantaisi '
          + 'vuosisadan yli. Kirja saa olla arvoitus siksi, että '
          + 'melkein 200 vuotta vanhan päiväkirjan lukeminen on '
          + 'hidasta ja vaatii ponnistelua — ei siksi, että se '
          + 'olisi suunniteltu arvoitukseksi.',
        'SYDÄNTEEMA (omistajan sanoin 11.8.): ihminen on samojen '
          + 'peruskysymysten äärellä yhtä pihalla kuin ennenkin, '
          + 'vastausta etsimässä. Poika yrittää ymmärtää, mitä '
          + 'isoisä koki ja mitä ihmettä hän kirjaansa kirjoitti — '
          + 'siinä on pelin kauneus.',
      ],
    },
    {
      otsikko: 'Pelin kulku',
      tila: 'luonnos',
      kohdat: [
        'Yksi lauta: koko maailma yhdellä kartalla (erilliset '
          + 'mannerlaudat ja vaihtoportit poistettu 11.8.).',
        'Vuoro: valitse matkustustapa (jalan / laivalla / '
          + 'lentäen) → noppa → siirto kartalla. Yksi nopanheitto, '
          + 'laivamatka tai lento kuluttaa 6 tuntia matka-aikaa; '
          + 'aika kuluu päivinä ja vuorokaudenaikoina.',
        'Mannerraja: uudelle mantereelle ei pääse ennen kuin '
          + 'nykyisen mantereen pääaarre on löytynyt. Kahden '
          + 'maanosan rajalla olevaan kaupunkiin pääsee, muttei '
          + 'siitä pidemmälle — pieni teksti selittää esteen. '
          + 'Esteen voi purkaa maksamalla 1000 puntaa, ja maksu '
          + 'peritään jokaisesta ylityksestä uudelle, '
          + 'käymättömälle maanosalle.',
        'Kaupungissa mikään ei ponnahda ruudulle itsestään: '
          + 'Tutki-nappi avaa saapumiskortin, ja tehtävä alkaa '
          + 'kortin omasta napista. Matka on muuten vapaata '
          + 'vaellusta ilman pakotettua reittiä.',
      ],
    },
    {
      otsikko: 'Aarteet ja eteneminen',
      tila: 'luonnos',
      kohdat: [
        'Laatta joka kaupungissa; tehtävän oikea vastaus kääntää '
          + 'sen. UUSI LINJAUS (11.8.2026, luonnos): laatan alta '
          + 'löytyy aina aarre — pieni tai iso PAIKALLISAARRE, '
          + 'mantereen 1000 pisteen aarre tai mantereen PÄÄAARRE '
          + '(+2000 puntaa JA jää matkalaukkuun näkyviin). Rosvo, '
          + 'tyhjä laatta ja hevosenkenkä poistetaan pelistä '
          + 'kokonaan. Aarteet muuttuvat heti rahaksi (paitsi '
          + 'pääaarre, joka jää myös laukkuun).',
        'PAIKALLISAARTEET (luonnos): jokaiselle maalle omat kaksi '
          + 'aarretta — pieni, lähes arvoton mutta paikkaan sopiva '
          + '(esim. Suomessa mustikat) ja iso, arvokas '
          + 'kulttuuriesine tai muuten paikkaan kuuluva aarre. Osa '
          + 'saa olla hauskan yllättäviä. Nämä korvaavat vanhat '
          + '300 ja 600 pisteen yleisaarteet. Laudalla on 110 '
          + 'maata, joten pareja tulee noin 220.',
        'Aarteen tarkka arvo vaihtelee löytöhetkellä — pelaaja '
          + 'tietää vain, löytyikö pieni vai iso paikallisaarre '
          + '(esim. pieni ~100–250 p, iso ~500–800 p; haarukat '
          + 'päätetään erikseen). Mantereen 1000 pisteen aarre ja '
          + 'pääaarteen 2000 puntaa pysyvät kiinteinä.',
        'Löytöteksti: paikallisaarteesta kerrotaan lyhyesti '
          + 'jotain totta ja kiinnostavaa, ja lopuksi nuorelle '
          + 'herralle toivotetaan onnea etsintöihin.',
        'Huudahdukset: pääaarteen nykyiset luetut huudahdukset '
          + 'säilyvät — se on pysäyttävä hetki. Kaikki muut '
          + 'nykyiset huudahdukset poistetaan. Tilalle todella '
          + 'lyhyet, korkeintaan kahden sanan huudahdukset: '
          + 'isoille löydöille tyyliin "Jes!" / "Jippii!", '
          + 'pienille "No okei." / "Voi rähmä."',
        'VARUSTEET JA KAUPPA (päätös 11.8.): varusteita ei enää '
          + 'löydy laatoista, vaan ne ostetaan kaupasta. '
          + 'Hampurilaisvalikkoon tulee "Käy kaupassa" -painike, '
          + 'jonka takana varusteet on listattu — hinta '
          + 'alustavasti 1000 puntaa kappale. Varusteita tehdään '
          + 'lisää myöhemmin. Hevosenkenkä poistuu pelistä '
          + 'kokonaan; vertailulinssi siirtyy laatoista kauppaan.',
        'Rosvon kaksintaistelu -peli poistuu kokonaan '
          + 'rosvolaatan mukana (päätös 11.8.).',
        'Seitsemän pääaarretta eli unohdettua aarretta — yksi per '
          + 'manner, Aarnin luettelosta. Löytymiselle ei ole '
          + 'kynnystä: pääaarre voi osua mantereen ensimmäiseen '
          + 'kätköön ja on varmasti viimeisessä.',
        'Kun mantereen pääaarre löytyy, avautuu mannerlento '
          + 'seuraavalle mantereelle (vain niille, joiden aarre on '
          + 'yhä kateissa). Mannerrajan voi ylittää aiemmin vain '
          + 'maksamalla (ks. Pelin kulku).',
        'Erillinen vihjejärjestelmä on poistettu (11.8.) — '
          + 'aarrevihjeet ovat tekstien sivuhuomioita (ks. Tarina '
          + 'ja hahmot), eivät mekaniikkaa.',
      ],
    },
    {
      otsikko: 'Tutki kätkö -pelit',
      tila: 'luonnos',
      kohdat: [
        'Kattonimi kaikelle, mitä Etsi kätkö -napin takaa voi '
          + 'paljastua. Pysähdyksessä on aina täsmälleen yksi peli.',
        'Kaupungin ensimmäinen peli on aina luettu kohtaaminen; '
          + 'sen jälkeen muodot vaihtelevat painotetulla '
          + 'arvonnalla: tietovisa, isoisän väittämä, '
          + 'valokuvakysymys, lippukysymys, tapahtumakortti, '
          + 'isoisän pulma (piirros- tai valokuvapulma), vaikea '
          + 'kysymys ja rosvon kaksintaistelu.',
        'Pelin on auettava siitä, mitä ruudulla näkyy — ei ulkoa '
          + 'opettelua. Kuvat ovat oikeita ja tarkistettuja.',
        'Koko katalogi ja uudet peliehdotukset: Pelit-välilehti. '
          + 'Uudet tyypit valitaan yhdessä ja pilotoidaan yhdessä '
          + 'kaupungissa.',
      ],
    },
    {
      otsikko: 'Kohtaamiset ja henkilöt',
      tila: 'luonnos',
      kohdat: [
        'Kehyskertomus (omistajan idea 11.8.): pelaaja yrittää '
          + 'ratkaista matkakirjan arvoitusta ja löytää kätkön — '
          + 'ja tutustuu paikallisiin saadakseen apua. Matkakirja '
          + 'kuvaa paikan, mutta 150 vuodessa maisema on '
          + 'muuttunut eikä paikka ole enää ilmeinen: vasta '
          + 'PAIKALLISEN HILJAINEN TIETO ja isoisän kuvaus '
          + 'YHDESSÄ ratkaisevat kätkön sijainnin.',
        'Hiljaisen tiedon arkku: paikallinen haluaa, että nuori '
          + 'herra todistaa tietämyksensä ja kiinnostuksensa '
          + 'heidän maataan ja kaupunkiaan kohtaan, ennen kuin '
          + 'avaa arkkunsa. Siksi kohtaamisen kysymys on AINA '
          + 'paikasta — oikea vastaus avaa luottamuksen, ja '
          + 'kätkö löytyy. Tämä on koko visamekaniikan '
          + 'tarinallinen syy.',
        'Joka kaupungille käsin kirjoitettu TYYPILLINEN '
          + 'PAIKALLINEN henkilö (ammatti sidottu paikkaan), '
          + 'jolle piirretään myös kasvot peliin (yhtenäinen '
          + 'kuvatyyli, kuten aarrekuvissa; Fable suunnittelee '
          + 'tyylin ja promptit — lupa 11.8.). Henkilöllä on '
          + 'repliikki, kysymys ja aarreteksti; kohtaaminen ja '
          + 'aarre luetaan ääneen.',
        'Aarrejahti on pelin satua — kaikki tieto paikoista on '
          + 'silti totta. Tässä peli ja todellisuus saavat '
          + 'erkaantua: Aarnin luetteloa pidettiin satukirjana, '
          + 'ja pelissä satu osoittautuu todeksi.',
        'Saapumiskortin nappi nimeää henkilön ("Tapaa Nikos"). '
          + 'Aloita peli -nappi erottaa luennan ja tehtävän — '
          + 'tiimalasi ei kulu kertojan puhuessa.',
        'Epäonnistumisesta yksi uusintayritys ("Viimeinen '
          + 'mahdollisuus tavata") — paikallinen antaa toisen '
          + 'tilaisuuden; toisen epäonnistumisen jälkeen arkku '
          + 'pysyy kiinni eikä henkilö ole tavattavissa. '
          + 'Onnistumisen jälkeen nappi harmaantuu. Kohtaamiset '
          + 'ovat istuntokohtaisia.',
      ],
    },
    {
      otsikko: 'Kaupungit',
      tila: 'luonnos',
      kohdat: [
        'Saapumiskortti: isoisän matkakirjamerkintä (luettuna) ja '
          + 'kaupungin esittely kuvineen.',
        'Lehtikaupungeissa kortti taittuu paikallislehdeksi: '
          + 'useita sivuja, kuvataitto, sää, uutiset ja media.',
        'Kohdekartta numeropisteineen ja itse kirjoitetut '
          + 'nähtävyysjutut (Euroopassa 34 kaupunkia): lehtijutun '
          + 'taitto, kuvakaruselli, henkilölinkit (esim. Engel '
          + 'Helsingissä) ja täysikoon kuvaselaus.',
      ],
    },
    {
      otsikko: 'Maalehdet ja lukeminen',
      tila: 'luonnos',
      kohdat: [
        'Jokaisella lehtimaalla oma maalehti: 2–4 aihesivua '
          + '(kolme juttua per sivu), minitehtävät, menovinkit ja '
          + 'Maa numeroina -tunnusluvut.',
        'Kuva ja aihe ovat aina siitä maasta, jota sivu '
          + 'käsittelee — naapurin parasta kuvaa ei lainata.',
        'Eurooppa on valmis; Lähi-itä pitkällä (ARE, Jordania, '
          + 'Oman, Qatar, Egypti, Kuwait, Bahrain + Irakin, '
          + 'Iranin, Jemenin, Syyrian ja Kyproksen sivuja). Pyhät '
          + 'kaupungit ovat oma sivutyyppinsä, jonka johdannot '
          + 'kirjoittaa Fable omistajan päätöksellä.',
      ],
    },
    {
      otsikko: 'Äänet ja luennat',
      tila: 'luonnos',
      kohdat: [
        'Viisas Kertoja lukee saapumiset, kohtaamiset ja '
          + 'aarretekstit (ElevenLabs v3); teksti ja luenta '
          + 'vastaavat toisiaan sanasta sanaan, siksi arvottavia '
          + 'pulmia ei lueta.',
        'Lisäksi tehosteäänet, mietintämusiikki, äänimaisemat ja '
          + 'musiikkinäytteet lehtikaupungeissa.',
      ],
    },
    {
      otsikko: 'Kuvat ja lähteet',
      tila: 'luonnos',
      kohdat: [
        'Kaikki kuvat PD- tai CC-lisenssillä Commonsista, silmin '
          + 'tarkistettuina; tekijä- ja lisenssirivit näkyvissä.',
        'Media jaellaan omasta peilistä (R2); peilaus ajautuu '
          + 'automaattisesti julkaisun yhteydessä.',
        'Faktat tarkistetaan ja lähteet merkitään kysymyksiin ja '
          + 'juttuihin. API-avaimia ei koskaan repoon eikä lokiin.',
      ],
    },
    {
      otsikko: 'Talous ja palkkiot',
      tila: 'luonnos',
      kohdat: [
        'Punnat: laiva ja lento maksavat, oikeat vastaukset, '
          + 'löydöt ja kätköt palkitsevat; apukeinot maksavat '
          + '(vihje, 50:50).',
        'Kokemuspisteet nostavat tasoa ja kysymysten vaikeutta.',
        'Varusteet (mm. linssit ja hevosenkengät) tuovat kykyjä — '
          + 'esim. rosvon ohituksen tai maiden vertailun kartalla.',
      ],
    },
    {
      otsikko: 'Rajaukset ja turvalinjat',
      tila: 'luonnos',
      kohdat: [
        'Ei sotasisältöä: Venäjän, Ukrainan ja Syyrian kohteet '
          + 'kuvataan kulttuurikohteina.',
        'Pyhät kaupungit (Mekka, Medina) vain omistajan '
          + 'erillisellä päätöksellä, kunnioittavasti.',
        'Grimshaw ei ole koskaan vaarallinen; kukaan ei iva '
          + 'paikallisia; kunnioitussäännöt koskevat myös '
          + 'kohtaamisten vartijahahmoja.',
      ],
    },
    {
      otsikko: 'Sanasto',
      tila: 'luonnos',
      kohdat: [
        'unohdettu aarre = Aarnin luettelon manneraarre · laatta '
          + '= kaupungin käännettävä kätkö · tutki kätkö -pelit = '
          + 'kaikki Etsi kätkö -napin tehtävät · kohtaaminen / '
          + 'tarinakaari = kaupungin henkilö ja hänen kysymyksensä '
          + '· valokuvapulma = pulma, jonka vaihtoehdot ovat '
          + 'oikeita valokuvia · mannerlento = aarteen avaama '
          + 'lento seuraavalle mantereelle · lehtikaupunki / '
          + 'maalehti = kaupungin/maan luettava lehti · työhuone '
          + '= tämä sivusto.',
      ],
    },
  ],
};
