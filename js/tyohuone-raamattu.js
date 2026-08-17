/*
 * RAAMATTU — koko pelin idea yhdessä tiedostossa. Vain Fable
 * kirjoittaa. Ristiriidassa hyväksytty osio voittaa muut dokumentit.
 * Lähdekaanon: docs/tarina.md ja docs/isoisan-raamattu.md.
 * Kirjoitettu uusiksi äärimmäisen tiiviiksi 15.8.2026 (omistajan
 * tilaus); vanhat sanamuodot git-historiassa.
 */

export const RAAMATTU = {
  paivitetty: '15.8.2026',
  johdanto: 'Koko pelin idea yhdessä dokumentissa — tämän lukeminen '
    + 'riittää pelin kehittämiseen. Käydään läpi omistajan kanssa osio '
    + 'kerrallaan; valmis Raamattu laukaisee kaikkien '
    + 'matkakirjatekstien uudistuksen. ILMAISU: äärimmäisen lyhyt ja '
    + 'yksiselitteinen — selkeys tärkeintä.',
  osiot: [
    {
      otsikko: 'Ydinajatus ja kohderyhmä',
      tila: 'hyväksytty 11.8.2026',
      kohdat: [
        'LAATU ON AINA TÄRKEIN PRIORITEETTI. Laatu voittaa vauhdin, '
          + 'määrän ja kustannuksen. Vähemmän ja viimeisteltyä.',
        'Suomenkielinen selainseikkailu: Reginald Fogg kiertää '
          + 'maailman isoisänsä 1873-päiväkirjan jäljillä ja etsii '
          + 'Aarnin luettelon unohdettuja aarteita.',
        'Kohderyhmä 13+ ja aikuiset. Ei lastenpeli.',
        'Peli näyttää maailmaa: kulttuurit, kielet, historia, '
          + 'keksinnöt — tarkoin valituin kuvin, tekstein, pelein, '
          + 'kartoin ja radioin. Hurjia tarinoita 1873:sta ja nyt.',
        'Imu: aarteet, vaarat ja aikapaine — maailman ympäri alle 80 '
          + 'päivässä. Raja on tavoite, ei tuomio: ylityksestä ei '
          + 'rangaista, alitus palkitaan, kuluvista päivistä '
          + 'muistutetaan.',
        'Oppiminen on sivutuote: uteliaisuus kuljettaa, mikään ei '
          + 'tunnu koululta. Kaikki tieto on totta ja tarkistettua. '
          + 'Pieni yksityiskohta laajenee ymmärrykseksi maasta.',
        'Tekoäly kuratoi valtavan PD/CC-aineiston — ihminen valitsee '
          + 'ja hyväksyy.',
        'SYDÄNTEEMA: ihminen on peruskysymysten äärellä yhtä pihalla '
          + 'kuin ennenkin. Poika yrittää ymmärtää isoisäänsä — siihen '
          + 'pelin loppu päättyy.',
      ],
    },
    {
      otsikko: 'Perustuslaki: viisi pilaria',
      tila: 'hyväksytty (siirretty periaatteet.md:stä 15.8.2026)',
      kohdat: [
        'MIKSI: edistämme tietoa maailmasta — elinoloista, '
          + 'kulttuurista, maantieteestä, geopolitiikasta. Väline on '
          + 'koukuttava peli. Pilareita muutetaan vain yhdessä.',
        '1. PELI EDELLÄ: ei oppikirja, johon on liimattu noppa. '
          + 'Sisältö, joka ei ole hauskaa pelata, ei kuulu peliin.',
        '2. TOTUUS JA LÄHTEET: jokainen väittämä tarkistettavissa. '
          + 'Epävarmaa ei väitetä. PR kertoo lähteet.',
        '2b. PAIKKA ENNEN LAJIA: ääni ja kuva kaupungista itsestään, '
          + 'sitten maasta, vasta viimeisenä lajista. Paikkojen ero on '
          + 'osa opetusta.',
        '3. KUNNIOITUS: jokainen maa asukkaidensa silmin. Ei '
          + 'stereotypioita, pilkkaa, säälittelyä eikä pelkkiä '
          + 'turistikliseitä. Geopolitiikka kuvataan, ei tuomita.',
        '4. IKÄSOPIVUUS: vaikeita aiheita ei kaunistella eikä '
          + 'kauhistella. Mitään ei lisätä järkyttämään.',
        '5. AVOIMUUS: vapaat lisenssit, julkiset päätökset, '
          + 'automaattitestit valvovat mitattavan.',
        'Tekniset jatkeet (laudan hyväksyminen, etukäteispuskuri): '
          + 'CONTRIBUTING.md.',
      ],
    },
    {
      otsikko: 'Tarina ja hahmot',
      tila: 'luonnos',
      kohdat: [
        'ASETELMA: Reginald perii isoisän matkalaukun — kartta 1872, '
          + 'puntia, passi, päiväkirja 1873. Hän päättää tehdä matkan '
          + 'samassa ajassa: alle 80 päivässä.',
        'MATKAKIRJA on isoisän päiväkirja: ei kirjoitettu kenellekään, '
          + 'ei puhuttele lukijaa. Revitty viimeinen sivu ajaa '
          + 'matkaan — arvoitus EI koskaan ratkea.',
        'HORATIO FOGG (isoisä): laivaston kartanpiirtäjä, erosi 1873. '
          + 'Mittaa kaiken (barometri nyt Reginaldin laukussa), pelkää '
          + 'hevosia, ei myrskyjä, kohtelias kaikille. Persoona '
          + 'välittyy merkinnöistä.',
        'KAKSI ÄÄNTÄ: isoisä 1873, nuori herra nyt. Huumori syntyy '
          + 'välistä. Isoisä on joskus yhä oikeassa — ei narri. Ivaa '
          + 'paikallisille ei koskaan; piikki herroihin itseensä.',
        'VASTUSTAJAT: isoisällä Ezekiel Grimshaw (mahtipontinen, aina '
          + 'myöhässä, ei koskaan vaarallinen). Reginaldilla NÄKYMÄTÖN '
          + 'seuraaja: tummansininen sateenvarjo tunnusmerkkinä, ei '
          + 'näyttäydy, ei paljastu koskaan — jää auki kuten revitty '
          + 'sivu.',
        'AARNI: 1800-luvun alun tutkimusmatkailija; luettelossa '
          + 'maailman unohdetut aarteet, yksi per maanosa. Aikalaiset '
          + 'pitivät satuna, isoisä uskoi.',
        'AARREVIHJEET: ei symboleja eikä järjestelmiä — vain harvat '
          + 'sivuhuomiot (muutama per manner) vihjaavat pääaarteen '
          + 'olevan totta. Loksahtavat paikoilleen löydössä.',
        'KAANON: kukaan ei ole odottanut poikaa 150 vuotta, eikä '
          + 'isoisä virittänyt mitään ajan yli. Kirja saa olla '
          + 'arvoitus, koska vanhan päiväkirjan lukeminen on hidasta.',
        'Tekstit: isoisän seikkailut + nuoren herran tarkat '
          + 'arkihavainnot ja kommellukset. Tarina avaa kaupungin '
          + 'tunnelman; lehti syventää tiedoksi.',
        'Herroille saa luonnostella uusia piirteitä '
          + '(etikettivirheet, hassu asu) — yhdessä omistajan kanssa.',
      ],
    },
    {
      otsikko: 'Kirjoittajan säännöt (matkakirjatekstit)',
      tila: 'luonnos',
      kohdat: [
        'Isoisä loistaa pysyvissä (joet, tuoksut, satamat), '
          + 'vanhentuu nimissä ja tekniikassa. Nuori herra ei ole '
          + 'viisaampi — elää vain 150 vuotta myöhemmin.',
        'Vaara tulee maailmasta ja kilpajuoksusta, ei ihmisten '
          + 'pahuudesta. Seuraaja kaihertaa, ei uhkaa.',
        'Joka kirjoituserässä vähintään yksi aito kommellus. Suoraa '
          + 'itsepilkkaa säästeliäästi.',
        'Motiivibudjetit (barometri, sateenvarjo, aarrevihje…) '
          + 'sovitaan mantereittain ja lasketaan ennen julkaisua. '
          + 'Aistiankkuri ~joka kolmanteen kohteeseen. Aitoja '
          + '1873-tositapahtumia ankkureiksi.',
        'Lyhyttä ja konkreettista: sivuhuomiot sivulauseita, ei '
          + 'kryptisyyttä eikä selittelyä.',
        'Faktakuri: kaikki tarkistetaan, lähde merkitään. Luenta = '
          + 'teksti sanasta sanaan.',
        'Uusi teksti aina puhtaalta pöydältä; vanhasta vain '
          + 'raaka-aineet (beatit, faktat, persoonat).',
        'PITUUSBUDJETIT (mrk): saapuminen 280–350 (katto 380), '
          + 'kohtaaminen 180–240 (260), aarreteksti 140–200 (220), '
          + 'kohde yhteensä ≤800 — ääniaika alle minuutin.',
        'KOLME TARKISTUSTA per kohde: tunnistuuko päiväkirjaksi '
          + 'ilman kylttiä; lunastuuko kohtaamisen lupaus '
          + 'aarretekstissä; onko joka yksityiskohdalla merkitys.',
        'SPOILERISÄÄNTÖ: mikään ennen visaa näkyvä ei paljasta '
          + 'visan vastausta.',
      ],
    },
    {
      otsikko: 'Tekstien vetovoima',
      tila: 'luonnos',
      kohdat: [
        'KANTAVAT (usein): kommellus · aikakontrasti (1873 väittää, '
          + 'nyt vastaa) · auki jäävä koukku · aistiankkuri · '
          + 'konkreettinen nimetty ihminen.',
        'MAUSTEET (budjetti mantereittain): yllätysfakta · pienestä '
          + 'suureen · skandaali (ei eläviä yksityishenkilöitä) · '
          + 'historian oikku · arjen hinnat 1873 · nykyhetken kiinne '
          + '(menneessä muodossa, ettei vanhene) · yllätyskohtaaminen '
          + '· elokuvallinen avaus · ketju kaupunkien välillä · '
          + 'paikallinen sana · kirjan fyysiset jäljet (ei viritettyjä '
          + 'viestejä) · seuraajan varjo · aarrevihje · 80 päivän '
          + 'paine.',
        'KERRONNAN TAVAT: mittaajan persoona · johtolausevariaatiot '
          + '(9 kaavaa) · henkilö liikkeellä · löytöhetken tunne.',
        'VÄLTETTÄVÄT: mystiset viittaukset, jotka eivät johda '
          + 'mihinkään · "odottanut 150 vuotta" -siirappi.',
      ],
    },
    {
      otsikko: 'Pelin kulku',
      tila: 'luonnos',
      kohdat: [
        'Yksi lauta: koko maailma yhdellä kartalla.',
        'ALKU: tarina alkaa Lontoosta. Ensimmäisen kohteen saa '
          + 'valita kartalta vapaasti — valinta ratkaisee, minkä '
          + 'mantereen pääaarretta etsitään ensin.',
        'VUORO: matkustustapa (jalan/laiva/lento) → noppa → siirto. '
          + 'Heitto, laiva tai lento = 6 h matka-aikaa.',
        'MANNERRAJA: uudelle mantereelle vasta pääaarteella tai '
          + 'maksamalla 1000 p (per ylitys). Rajakaupunkiin pääsee.',
        'Kaupungissa mikään ei ponnahda itsestään: Tutki-nappi avaa '
          + 'kortin, tehtävä alkaa napista. Vapaa vaellus.',
        'LOPPU: seitsemäs pääaarre. Revitty sivu ja seuraaja jäävät '
          + 'auki — Reginald ymmärtää vihdoin isoisäänsä '
          + '(sydänteeman lunastus).',
        '80 PÄIVÄN PALKINTO: SEITSEMÄN PENINKULMAN LINSSI — vapaa '
          + 'siirtyminen mihin tahansa kaupunkiin ilman noppaa; '
          + 'samalla kaikki linssit auki. Ei ostettavissa.',
      ],
    },
    {
      otsikko: 'Aarteet ja eteneminen',
      tila: 'luonnos',
      kohdat: [
        'Laatta joka kaupungissa; oikea vastaus kääntää, alta löytyy '
          + 'AINA aarre. Ei rosvoa, ei tyhjää, ei hevosenkenkää.',
        'AARTEET: pieni paikallisaarre (~100–250 p) · iso '
          + 'paikallisaarre (~500–800 p) · mantereen 1000 p aarre · '
          + 'PÄÄAARRE (2000 p + jää matkalaukkuun). Arvo vaihtelee '
          + 'löytöhetkellä; kiinteät vain 1000/2000.',
        'Paikallisaarteet: joka maalle oma pari (pieni + iso), '
          + 'paikkaan sopivia, osa hauskan yllättäviä. ~220 paria.',
        'Löytöteksti: lyhyt tosi fakta aarteesta + onnentoivotus.',
        'Huudahdukset: pääaarteen luetut säilyvät; muut korvataan '
          + 'korkeintaan kahden sanan huudahduksilla ("Jes!", '
          + '"No okei.").',
        'VARUSTEET ostetaan kaupasta (hampurilaisvalikko, ~1000 '
          + 'p/kpl) — eivät löydy laatoista.',
        'Pääaarre voi osua mantereen ensimmäiseen kätköön; varma '
          + 'viimeisessä. Löytö avaa mannerlennon seuraavalle.',
        'Erillistä vihjejärjestelmää ei ole — aarrevihjeet ovat '
          + 'tekstien sivuhuomioita.',
      ],
    },
    {
      otsikko: 'Karttalinssit',
      tila: 'luonnos',
      kohdat: [
        'Kartta on pelin keskusesine, ei valikko: pelaaja oppii '
          + 'näkemään siitä yhä uusia asioita.',
        'Linssi = animoitu visualisointi kartalla juoksevine '
          + 'vuosilukuineen. Avaa kaikki vuosisadat, ei vain 1873:n.',
        'Linssit aukeavat pelin aikana (osa kaupasta, osa matkalla) '
          + 'ja jaksottavat pelirytmiä. Superlinssi on eri asia '
          + '(läpipeluupalkinto).',
        'PAIKKASIDONTA: linssi aukeaa missä merkitsee eniten — '
          + 'leviäminen Afrikassa, Kolumbus Espanjassa, Rooma '
          + 'Roomassa, kauppakomppania Intiassa, dynastiat Kiinassa.',
        'Ideapankki: imperiumit, kauppareitit, viestinnän historia, '
          + 'tutkimusmatkat, aikapyyhkäisy. Kerroksia enintään 2–3 '
          + 'kerralla.',
        'Toteutus: käsin tarkistettu data, pelin oma animaatio. '
          + 'Etusivulla kevyt vihjeanimaatio.',
      ],
    },
    {
      otsikko: 'Viisas Pöllö',
      tila: 'luonnos — ideointi, ei vielä toteutukseen',
      kohdat: [
        'Ruudulla aina pieni pöllö → chat. Vastaa näkyvästä '
          + 'sisällöstä (saa kontekstin) + vapaa kenttä + '
          + 'kysymysehdotukset.',
        'Tiedon hahmo, ei tarinan: ei paljasta visavastauksia eikä '
          + 'juonisalaisuuksia. Faktakuri ja kunnioitus koskevat; '
          + 'myöntää kun ei tiedä.',
        'Tekniikka: pieni malli oman workerin kautta, käyttörajat, '
          + 'avain vain salaisuuksissa. Tausta vaihdettavissa '
          + '(laitemalli, tilaus).',
        'Vaiheistus: testi omistajan avaimella; ansainta päätetään '
          + 'kokeilun jälkeen.',
        'PUHEKUPLA (idea): esiohjelmoidut proaktiiviset vihjeet (80 '
          + 'päivän muistutus, alkuohjeet). Vihjaa, ei keskeytä — ei '
          + 'modaalia, ei ääntä, harvoin.',
      ],
    },
    {
      otsikko: 'Tutki kätkö -pelit',
      tila: 'luonnos',
      kohdat: [
        'Pysähdyksessä täsmälleen yksi peli. Ensimmäinen aina '
          + 'luettu kohtaaminen; sitten painotettu arvonta: tietovisa, '
          + 'isoisän väittämä, valokuvakysymys, lippukysymys, isoisän '
          + 'pulma, vaikea kysymys.',
        'Pelin on auettava siitä mitä ruudulla näkyy — ei ulkoa '
          + 'opettelua. Kuvat oikeita ja tarkistettuja.',
        'Rahalla apua: visavihje ja 50:50 (hinnat: Talous).',
        'Katalogi ja uudet ehdotukset: Pelit-välilehti. Uudet '
          + 'tyypit pilotoidaan yhdessä kaupungissa.',
      ],
    },
    {
      otsikko: 'Kohtaamiset ja henkilöt',
      tila: 'luonnos',
      kohdat: [
        'KEHYS: maisema on muuttunut 150 vuodessa — kätkö löytyy '
          + 'vain isoisän kuvauksen JA paikallisen hiljaisen tiedon '
          + 'yhdistelmällä.',
        'HILJAISEN TIEDON ARKKU: paikallinen auttaa vasta, kun '
          + 'tietämys hänen maastaan on todistettu — siksi kysymys on '
          + 'aina paikasta. Tämä on visamekaniikan tarinallinen syy.',
        'Joka kaupungille käsin kirjoitettu tyypillinen paikallinen '
          + '(ammatti sidottu paikkaan) + piirretyt kasvot '
          + '(yhtenäinen tyyli). Repliikki, kysymys, aarreteksti — '
          + 'luetaan ääneen.',
        'Aarrejahti on pelin satua; kaikki tieto paikoista totta.',
        'Nappi nimeää henkilön ("Tapaa Nikos"). Aloita peli -nappi '
          + 'erottaa luennan ja tehtävän — tiimalasi ei kulu puheen '
          + 'aikana.',
        'Epäonnistumisesta yksi uusinta; toisesta arkku jää kiinni. '
          + 'Kohtaamiset istuntokohtaisia.',
      ],
    },
    {
      otsikko: 'Kaupungit',
      tila: 'luonnos',
      kohdat: [
        'Saapumiskortti: luettu matkakirjamerkintä + esittely '
          + 'kuvineen.',
        'Lehtikaupungissa kortti on paikallislehti: sivut, '
          + 'kuvataitto, sää, media — sekä kohdekartta '
          + 'numeropisteineen ja omat nähtävyysjutut.',
        'Kohdekartta on PELKKÄ VÄRIKARTTA (linjaus 15.8.2026: '
          + '"Piirroskartan voi ottaa kokonaan pois ja pitää vain '
          + 'värillisen"). Kohteet leikattuina piirroksina kartalla; '
          + 'klikkaus keskittää ja suurentaa 75 %:iin, numerokyltistä '
          + 'juttuun.',
        'Kohteita saa olla entistä enemmän per kaupunki — kartta on '
          + 'zoomattava (linjaus 15.8.2026). Uudet kaupunkikartat '
          + 'tehdään 5 kaupungin erissä omistajan tsekattavaksi.',
        'UUSIIN KAUPUNKEIHIN JA MAIHIN EI VIELÄ TARINAKAARTA '
          + '(omistaja 17.8.2026): ei matkakirjatekstejä, ei '
          + 'kohtaamisia eikä kysymyksiä — koko kaari tulee '
          + 'muuttumaan. Tehdään VAIN kaupunkilehti ja maalehti; '
          + 'kaari kirjoitetaan myöhemmin uuden mallin mukaan.',
        'MATKAILIJAN OPAS on pelin kevyt ja viihteellinen osa, joka '
          + 'houkuttelee matkustamaan itse kohteeseen (linjaus '
          + '16.8.2026): se saa käyttää muuta lehteä iloisempia '
          + 'värejä, ja etusivulla siihen kutsuu pirteä kulmalappu. '
          + 'Rakenne: aihejaksot isoine kuvineen, tekstinosto sekä '
          + 'sää- ja suunnittelulaatikot '
          + '(docs/kuvakasikirjoitukset.md + työlistan speksit).',
        'EI MATKAKASSA-OSIOTA (omistaja 17.8.2026): hintoja ei '
          + 'luetella oppaassa. Riittää, että sivun alun '
          + 'kainalotaulu kertoo onko kohde halpa (plussana) vai '
          + 'kallis (miinuksena).',
        'Valmiustilanne kaupungeittain: Tilanne-välilehti, ei tämä.',
      ],
    },
    {
      otsikko: 'Maalehdet ja lukeminen',
      tila: 'luonnos',
      kohdat: [
        'Joka lehtimaalla maalehti: 2–4 aihesivua (3 juttua/sivu), '
          + 'minitehtävät, menovinkit, Maa numeroina.',
        'Kuva ja aihe aina omasta maasta — naapurilta ei lainata.',
        'MAALEHDEN NIMIÖ (omistaja 16.8.2026): pelkkä maan nimi ja '
          + 'lippu sen perässä — ei selittäviä lisäsanoja ("Ranska '
          + 'kartalla"), kartta näkyy sivulla itsestään.',
        'Pyhät kaupungit: oma sivutyyppi, johdannot kirjoittaa '
          + 'Fable.',
        'PITKÄT ARTIKKELIT (idea): professorimaisia syväjuttuja, '
          + 'luettavia ja kuunneltavia; pöllö ehdottaa linkkeinä.',
        'KAUPALLISTAMINEN: julkaistaan ilmaisena; maksulliseksi '
          + 'vaihdettaessa aiemmat lataajat säilyttävät ilmaiseksi '
          + '(App Storen hinnanvaihto, ei StoreKit-koodia). Pöllö '
          + 'ensisijaisesti ilmaiseksi Applen laitemallilla — suomen '
          + 'laatu testataan ensin.',
        'KÄÄNNÖKSET: vasta kun suomi on lukittu; ensin englanti. '
          + 'Kielikohtaiset sisältöpaketit, ei rivi-i18n:ää.',
      ],
    },
    {
      otsikko: 'Äänet ja luennat',
      tila: 'luonnos',
      kohdat: [
        'Viisas Kertoja lukee saapumiset, kohtaamiset ja '
          + 'aarretekstit. Luenta = teksti sanasta sanaan; arvottavia '
          + 'pulmia ei lueta.',
        'LUENTAPOLKU: äänite soi kun luenta-kenttä vastaa '
          + 'näyttötekstiä; muuttunut teksti striimataan. Uusia '
          + 'äänitteitä EI generoida — kaikki uusitaan kerralla, kun '
          + 'Raamattu on valmis ja tekstit kirjoitettu.',
        'Lisäksi tehosteet, mietintämusiikki, äänimaisemat ja '
          + 'musiikkinäytteet. Uudet taustaäänet LUFS-mitataan heti '
          + '(testi valvoo).',
        'ÄÄNTEN JAKELU (linjaus 16.8.2026): audiotiedostot jaellaan '
          + 'R2:sta kuten kuvatkin, eivät gitistä. Esiladataan vain '
          + 'pieni ydinsetti (huudahdukset, käyttöliittymä-äänet); '
          + 'luennat, taustaäänet ja musiikki haetaan ja '
          + 'välimuistitetaan tarvepohjaisesti.',
        'OFFLINE-PELAUS EI OLE TAVOITE (omistaja 16.8.2026): '
          + 'verkkoyhteyden saa olettaa; välimuisti on nopeutta '
          + 'varten, ei offline-lupaus.',
      ],
    },
    {
      otsikko: 'Kuvat ja lähteet',
      tila: 'luonnos',
      kohdat: [
        'Kaikki kuvat PD/CC Commonsista, silmin tarkistettuina; '
          + 'tekijä ja lisenssi näkyvissä.',
        'Etusivukuvien kaava (omistaja 16.8.2026): kuva-aiheet '
          + 'speksataan kaupunkikohtaisesti ENNEN hakua '
          + '(docs/kuvakasikirjoitukset.md). Pääkuva = tärkein kohde '
          + 'näyttävänä laajakulmana erikoisvalossa (karuselliin voi '
          + 'lisätä muita näyttäviä); pikkunosto 1 = toiseksi tärkein '
          + 'kohde; pikkunosto 2 = yllättävä, oivaltava yksityiskohta. '
          + 'Pikkunostoihin ei karusellia ja vain vaakarajauksen '
          + 'kestäviä kuvia. Haut Commonsin FP/QI- ja '
          + 'valokategorioista.',
        'OPPAAN AVAUSKUVA (linjaus 17.8.2026): aina kolmen kuvan '
          + 'karuselli, ja kuvat valitaan JAKSON TEKSTIN mukaan eikä '
          + 'kaupungin yleisistä maamerkeistä — jos teksti mainitsee '
          + 'emalikyltin, se myös näkyy. Karuselli on sisältöä, ei '
          + 'koriste.',
        'MATKAILIJALLE-KUVAN KAAVA (omistaja 16.8.2026): osion kuva '
          + 'on sen myyntikuva — yksi aihe joka täyttää ruudun, '
          + 'paikan oma erikoisuus ("wow-efekti"), FP/QI jos on, '
          + 'selkeä valo, lukee pienessä koossa ja pääaihe ei jää '
          + 'diagonaalinauhan alle.',
        'Media omasta peilistä (R2), peilaus automaattinen.',
        'Faktat tarkistetaan, lähteet merkitään. API-avaimia ei '
          + 'koskaan repoon eikä lokiin.',
      ],
    },
    {
      otsikko: 'Talous ja palkkiot',
      tila: 'luonnos',
      kohdat: [
        'TULOT: paikallisaarteet, mantereen 1000 p, pääaarre 2000 p, '
          + 'oikeat vastaukset.',
        'MENOT: laiva ja lento · mannerraja 1000 p · varusteet '
          + '~1000 p · visavihje ja 50:50.',
        'Kokemuspisteet nostavat tasoa ja kysymysten vaikeutta.',
        'Varusteet ovat linssejä; ostetaan kaupasta. Superlinssi '
          + 'vain ansaitsemalla.',
        'KAKSI VIHJETTÄ: visavihje = ostettava apu visassa; '
          + 'aarrevihje = tekstin sivuhuomio, ei mekaniikkaa.',
      ],
    },
    {
      otsikko: 'Rajaukset ja turvalinjat',
      tila: 'luonnos',
      kohdat: [
        'Ei nykysotasisältöä: Venäjä, Ukraina ja Syyria '
          + 'kulttuurikohteina. HISTORIALLISET taistelut saa näyttää '
          + '— ne ovat perushistoriaa.',
        'Mekka ja Medina vain omistajan erillisellä päätöksellä, '
          + 'kunnioittavasti.',
        'Grimshaw ei ole koskaan vaarallinen. Kukaan ei iva '
          + 'paikallisia — koskee myös kohtaamishahmoja.',
      ],
    },
    {
      otsikko: 'Sanasto',
      tila: 'luonnos',
      kohdat: [
        'unohdettu aarre = Aarnin luettelon manneraarre · '
          + 'paikallisaarre = maan oma pieni/iso aarre · laatta = '
          + 'käännettävä kätkö · tutki kätkö -pelit = Etsi kätkö '
          + '-napin tehtävät · kohtaaminen = kaupungin henkilö '
          + 'kysymyksineen · hiljaisen tiedon arkku = kohtaamisten '
          + 'kehys · valokuvapulma = vaihtoehdot oikeita valokuvia · '
          + 'mannerraja / mannerlento = eteneminen mantereelta '
          + 'toiselle · varustekauppa = valikon Käy kaupassa · '
          + 'superlinssi = alle 80 päivän palkinto · visavihje / '
          + 'aarrevihje = ks. Talous · johtolause = isoisän äänen '
          + 'esittelytapa · lehtikaupunki / maalehti = luettava '
          + 'lehti · työhuone = kehittäjän sivusto.',
      ],
    },
    {
      otsikko: 'Ohjedokumenttien kartta',
      tila: 'luonnos (omistajan tilaus 15.8.2026)',
      kohdat: [
        'Tieto kulkee sessiolta toiselle vain kirjoitettuna. Kartta '
          + 'on täydellinen: dokumentti, jota ei ole listalla, ei ole '
          + 'ohje. Testi valvoo (tests/dokumentit.test.mjs).',
        'CLAUDE.md — sisääntulo, osoittaa tänne.',
        'docs/tarina.md + docs/isoisan-raamattu.md — tarinan kaanon '
          + '(vain Fable kirjoittaa).',
        'docs/roolitus.md — työnjako, viestintä, julkaisusäännöt, '
          + 'pistokokeet.',
        'docs/moduulit/kaupunkilehti.md · '
          + 'docs/moduulit/maalehti.md · docs/tyolista-opukselle.md · '
          + 'docs/tyolista-maxille.md · docs/moduulit/tarinakaari.md '
          + '· docs/mantereen-resepti.md · '
          + 'docs/kuvakasikirjoitukset.md — sisältöreseptit ja '
          + 'työlistat.',
        'CONTRIBUTING.md — avoin lähdekoodi + tekniset periaatteet. '
          + 'README.md — esittely.',
        'docs/viesti-fable.md — viestikanava, ei ohje. docs/arkisto/ '
          + 'ja docs/raportit/ — ei ohjeita; vanhentunut tilannekuva '
          + 'arkistoidaan heti.',
        'TYÖSESSIOIDEN SPEKSIOPPI (omistajan havainto 16.8.2026): '
          + 'tarkasti rajattu toimeksianto tuottaa Opukselta '
          + 'erinomaista jälkeä; väljä rajaus johtaa turhien asioiden '
          + 'toteuttamiseen. Jokaiseen pakettiin: täsmälliset '
          + 'tiedostot, mitä EI tehdä, ja valmis malli.',
        'TOTEUTUSLISTA — KIIREELLINEN (omistaja 16.8.2026): '
          + 'dokumenttiremontti. docs-kansiossa on Raamatun kanssa '
          + 'päällekkäisiä ohjeita; tavoite on Raamattu AINOANA '
          + 'linjauslähteenä + roolitus ja mallit + moduulikohtaiset '
          + 'ohjeet siisteinä omina md-tiedostoinaan. Ajetaan '
          + 'OMASSA max-sessiossa 17.8. kredittien uusiuduttua; '
          + 'samalla suunnitellaan pelin selkeä moduulirakenne '
          + '(docs/tyolista-maxille.md). Fable johtaa high-tasolla.',
        'docs/moduulirakenne-suunnitelma.md · '
          + 'docs/dokumenttiremontti-suunnitelma.md — Max-session '
          + 'suunnitelmat 17.8.2026 (odottavat omistajan '
          + 'hyväksyntää; toteutus vasta sen jälkeen).',
        'Työkalujen alkukommentit ovat käyttöohjeita. Sääntö, jonka '
          + 'kone voi valvoa, kirjataan testiksi.',
        'Työhuone integroidaan peliin kehittäjävivun taakse — ei '
          + 'erillisiä näkymiä.',
      ],
    },
  ],
};
