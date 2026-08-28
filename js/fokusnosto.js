/*
 * TÄKYNOSTO — tuikkiva keltainen piste kartalla ja sen lunastuskortti.
 *
 * Raamatun osio "Fokusmoodi", kohta KEVYT KULKU -KOKEILU (omistaja
 * 25.8.2026): *"aarteen löydyttyä pöllö kertoo että nyt voi matkustaa
 * seuraavaan kaupunkiin tai jäädä tutkimaan maata …, ja samalla
 * kartalta NOUSEE YKSI TÄKYNOSTO: lyhyt KELTAISTEN LEHTIEN
 * KLIKKIOTSIKKOTASOINEN lause (henkilöskandaali tai uskomaton
 * tositarina, lupaus lunastetaan faktalla) + miniatyyrikuva perässä,
 * houkuttelemassa kohteen auki."*
 *
 * ── PELKKÄ PISTE, YKSI KERRALLAAN (omistaja 27.8.2026 ilta) ────────
 *
 * *"muuta täkynostot pelkäksi tuikkivaksi keltaiseksi pisteeksi yksi
 * kerrallaan. uusi piste tuikkii kun edellinen on katsottu. pulu voisi
 * kommentoida ensimmäistä vilkkuvaa täkyä"*
 *
 * Otsikko oli tähän asti KARTALLA: puhekupla, jossa luki koko
 * klikkiotsikko ja jonka perässä oli miniatyyri. Se kertoi jutun jo
 * ennen kuin siihen kosketti ja peitti kartan juuri siitä kohtaa, jota
 * juttu koskee. Nyt kartalla on VAIN merkki siitä, että tässä on
 * jotain: pieni keltainen piste, joka tuikkii (js/fokusnosto-symbolit.js
 * osio TÄYN TUIKKIVA PISTE). Otsikko ja lunastus ovat siellä missä
 * ennenkin — kortissa, jonka napautus avaa.
 *
 * Kolme seurausta, jotka on hyvä tietää:
 *
 *   1. KAIKKI NÄKYVIIN, HUOMIO YKSI KERRALLAAN (omistajan linjaus
 *      28.8.2026 ilta: *"Täkyt voisi olla aina näkyvissä. Niihin vain
 *      kiinnitetään huomio aarteen löytymisen jälkeen."*). Maan kaikkien
 *      katsomattomien täkyjen pisteet piirtyvät kartalle samasta
 *      hetkestä kuin maan muutkin kohteet, ja jokainen aukeaa
 *      napautuksesta heti. AARRE EI AVAA OVEA VAAN SYTYTTÄÄ VALON:
 *      ennen aarretta pisteet ovat hiljaisia (ei tuiketta, ei Livian
 *      vihjettä), sen jälkeen niistä TUIKKII YKSI KERRALLAAN — poolin
 *      ensimmäinen katsomaton (nostoVuorossa). Kun se on luettu, se
 *      katoaa laitteen muistiin (nostoMerkitseLuetuksi) ja seuraava
 *      katsomaton alkaa tuikkia heti kun kortti sulkeutuu; ennen
 *      aarretta katsotut eivät palaa tuikkimaan, koska ne eivät ole enää
 *      jäljellä. Vanha "yksi täky per maa" -leikkaus ja "yksi kupla per
 *      istunto" -kiintiö poistuivat kuplan mukana: molemmat olivat
 *      sääntöjä ruudulle ponnahtavasta pinnasta, ja piste ei ponnahda
 *      mihinkään.
 *   2. PISTE ON PAINIKE. Kupla otti ennen napautuksen ja ankkurisymboli
 *      oli mykkä; nyt piste tekee sen työn itse (osuma-alue on sormen
 *      mitta, ks. symbolitiedosto).
 *   3. LIVIA HUOMAUTTAA KERRAN. Ensimmäisellä tuikkivalla täyllä pöllö
 *      (Livia) sanoo kuplassa, että kartalla on nyt jotain katsottavaa
 *      — ks. osio LIVIAN HUOMAUTUS. Yksi kerta riittää: mekaniikka
 *      opitaan kerran.
 *
 * ── LUPAUS LUNASTETAAN, TAI OTSIKKO ON HUIJAUS ─────────────────────
 *
 * Aineiston ensimmäinen sääntö: jokaisen otsikon takana on lähteestä
 * tarkistettu tositarina, joka vastaa nimenomaan siihen, mitä otsikko
 * lupaa. Siksi nosto avaa OMAN korttinsa, jossa lunastus on, eikä
 * pelkkää kartan tietoruutua: Delfoin tietoruutu kertoo Omfaloksesta ja
 * Pythiasta, ei kylästä joka istui oraakkelin päällä — se otsikko jäisi
 * lunastamatta ja Perustuslain totuudellisuuspilari kaatuisi. Kun
 * kohteella on lisäksi oma karttamerkki (`kohde`), kortissa on nappi
 * sinne: nosto siis houkuttelee kohteen auki, kuten tilauksessa
 * sanotaan, mutta lupaus maksetaan ensin.
 *
 * ── PISTE SIIHEN KOHTAAN KARTTAA, JOTA JUTTU KOSKEE ───────────────
 *
 * Omistaja 25.8.2026: *"täkyn pitäisi tulla … siihen kohtaan karttaa
 * jota tapahtuma koskee."* Se sääntö jäi voimaan, vaikka esitystapa
 * vaihtui: piste piirretään täyn omiin koordinaatteihin
 * (js/fokusnosto-symbolit.js), ja se on SVG:tä kartan omassa
 * kerroksessa, koska se ankkuroituu laudan koordinaatteihin ja elää
 * kartan mukana.
 *
 * MUTTA EI KOSKAAN KAUPUNGIN LAATAN PÄÄLLE (omistajan pelitestipalaute
 * v1234). Juttu tapahtui useimmiten kaupungissa, ja kaupungin kohdalla
 * kaksi merkkiä samassa pisteessä on yksi merkki: Kreikan täky tuikki
 * suoraan Ateenan laatan päällä. Piste PIIRRETÄÄN siksi aina jonkin
 * kartan kohdesymbolin päälle — täyn oman `kohde`-merkin, tai sen
 * puuttuessa lähimmän kohdemerkin, joka kaupungin ryppäässä on jo
 * siirretty katkoviivan päähän kasauspassilla (js/fokusniput.js).
 * Valinnan tekee kerros, joka tietää merkkien nykyiset paikat
 * (js/fokusnosto-symbolit.js, osio PISTE AINA SYMBOLIN PÄÄLLE); tämä
 * tiedosto kertoo vain, missä juttu tapahtui.
 *
 * ILMAN PAIKKAA KAUPUNKI, JA VASTA SEN JÄLKEEN LIUSKA. Täyllä ei ole
 * pakko olla `paikka`-kenttää; ilman sitä paikaksi otetaan kaupunki,
 * jossa pelaaja on (nostonPaikka) — ja koska piste hakeutuu sieltä
 * lähimmän kohdesymbolin päälle, se ei jää laatan päälle. Vanha
 * alalaidan liuska on yhä olemassa varapolkuna sille tapaukselle, ettei
 * kaupunkiakaan ole — esimerkiksi katselutilassa.
 *
 * EI SUODATTIMIA missään muodossa (js/fokuskartta.js sääntö 3,
 * tests/rules.test.mjs): tuike on `opacity` ja `transform`, ei blur
 * eikä varjosuodatin.
 *
 * ── KARTAN LIIKE ILMAN UUTTA PIIRTOA ───────────────────────────────
 *
 * Panorointi on CSS-muunnos kartan SIIRTOKUORELLA (js/kartta.js
 * asetaPan) eikä uusi piirto, joten mikään ei kutsu tätä moduulia
 * kesken eleen. Piste on laudan koordinaateissa, joten panorointi
 * siirtää sen itsestään; vain MITTAKAAVA on laskettava uusiksi, ja se
 * näkyy kartan `viewBox`issa. Vahti on siksi MutationObserver yhdellä
 * attribuutilla (nostoVahdiKarttaa), ja työ niputetaan yhteen
 * requestAnimationFrameen: yksi setAttribute per ryhmä, ei uusia
 * solmuja eikä yhtään asettelunlukua. js/ui.js:ään ei tarvita riviä
 * lisää.
 *
 * ── MIKSI document.body EIKÄ .map-pane ─────────────────────────────
 *
 * Kartan eleet (panorointi, zoomi) kuunnellaan karttapaneelista
 * (js/kartta.js: `pane = this.ui.mapPane`), ja paneelin sisällä
 * olevan kelluvan pinnan napautus pitää erikseen tunnistaa
 * KELLUVA_UI-listalta. Bodyssa oleva kiinteä kerros ei ole paneelin
 * jälkeläinen lainkaan, joten sen napautus ei kuplii karttaan eikä
 * js/kartta.js:ää tarvitse koskea — sama ratkaisu kuin fokusvirran
 * kuvasuurennoksella (.fokuszoom).
 *
 * ── LUETUT LAITTEEN MUISTIIN ───────────────────────────────────────
 *
 * Luettu nosto ei nouse enää: se on luettu, ei pelitilanne. Muisti on
 * siksi localStorage eikä pelitallenne — sama try/catch-kaava kuin
 * lehtivinkin ruksilla (js/ui-apurit.js lehtivinkkiPiilotettu).
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * NOSTO_/nosto-etuliitteellä.
 */
import {
  fokusmoodiPaalla, html, jaaKappaleiksi, nielaiseSulkevaNapautus, polloNimilappu,
} from './ui-apurit.js';
import { asetaKuva } from './media.js';
import { valokuvaUrl, valokuvaVara } from './packs/africa-valokuvat.js';
import { avaaFokuskohde, suljeFokuskohde } from './fokuskohteet.js';
import { fokuskohteet } from './packs/fokuskohteet-grc.js';
import {
  asemoiNostosymbolit, nollaaNostosymbolit, paivitaNostosymbolit,
} from './fokusnosto-symbolit.js';
import { asetaNostopinta, fokusvirtaLukitseeLehden, fokusvirtaSisalto } from './fokusvirta.js';
import { polloKysy, polloVihje } from './pollo.js';
import { sfx } from './sound.js';

/* ==================== POOLI ==================== */

/*
 * KREIKAN TÄKYNOSTOT (omistajan valinta 25.8.2026).
 *
 * KOLME NOSTOA, EI YKSI (omistajan pelitestipalaute v1234: *"sitten kun
 * sen kävi lukemassa, ei ilmestynyt enää uutta vilkkuvaa pistettä"*).
 *
 * Poolissa oli 26.8.2026 alkaen tasan YKSI nosto, koska silloin täky oli
 * PUHEKUPLA ja omistaja rajasi: *"Täkyjä josta tulee puhekupla pitää olla
 * vain yksi per maa."* Kupla poistui 27.8.2026 ja tilalle tuli sääntö
 * YKSI KERRALLAAN: *"uusi piste tuikkii kun edellinen on katsottu."*
 * Yhden mittainen pooli ei kuitenkaan voi vuorotella — luettu täky
 * katosi eikä mitään syttynyt tilalle, ja mekaniikka näytti rikkinäiseltä
 * vaikka koodi teki juuri niin kuin oli kirjoitettu. Poolin pituus oli
 * siis vika, ei koodi: kartalla tuikkii yhä vain YKSI piste kerrallaan,
 * mutta luetun jälkeen on jotain, mikä syttyy.
 *
 * Kaksi lisättyä nostoa ovat samasta tarkistetusta aineistosta kuin
 * ensimmäinen (docs/mantereet-tyoaineisto/takynostot-kreikka.md,
 * ehdokkaat 10 ja 12, molemmat merkitty VARMOIKSI) ja niiden faktat on
 * tarkistettu uudelleen lähdeartikkeleista 28.8.2026. Kummallakin on
 * `kohde`, joten piste tuikkii nimenomaan sen kohteen symbolin päällä ja
 * kortin nappi vie kohteen omaan tietoruutuun — täky *"houkuttelee
 * kohteen auki"* kuten alkuperäisessä tilauksessa.
 *
 * KUVAA EI OLE KAHDELLA UUDELLA. Aineisto ehdottaa niille Commons-
 * tiedostoja, mutta niiden lisenssi- ja tekijätiedot on tarkistettava
 * Commonsin rajapinnasta ennen käyttöä (omistajan sääntö: ei arvattuja
 * tiedostonimiä). Kuvaton nosto on korttina täysin ehjä — otsikko ja
 * lunastus kantavat sen — ja kuvan voi lisätä myöhemmin yhdellä
 * kentällä.
 *
 * Lunastus on aineiston omaa, lähteestä tarkistettua tekstiä
 * (docs/mantereet-tyoaineisto/takynostot-kreikka.md, ehdokas 2) —
 * siitä on paikoin lyhennetty, muttei lisätty eikä muutettu yhtään
 * faktaväitettä. Lähderivi on kortissa näkyvissä.
 *
 * KUVA on kysytty Commonsin imageinfo-rajapinnalta 25.8.2026 (koko,
 * lisenssi, tekijä, päiväys) — nimeä ei ole arvattu:
 *   - Sophia Schliemann wearing gold jewelry.jpg — 1093×1273, public
 *     domain, n. 1873. Kuva on JO PELISSÄ (js/packs/fokusvirta-ateena.js
 *     matkakirja.kuva), ja miniatyyri on tarkoituksella sama: pelaaja
 *     tunnistaa sen isoisän merkinnästä, ja juuri se tekee otsikosta
 *     koukun.
 *
 * IKÄSOPIVUUS (13+, Perustuslaki): Sofian tarinasta on jätetty pois
 * aineistossa erikseen hylätty avioliittokulma.
 *
 * ── PAIKKA LAUDALLA (omistaja 25.8.2026: täky siihen kohtaan) ──────
 *
 * Koordinaatit on laskettu SAMALLA MENETELMÄLLÄ kuin kohtaamispisteillä
 * (js/packs/fokusvirta-ateena.js) ja kartan kohteilla
 * (js/packs/fokuskohteet-grc.js): pelissä EI ole projektiokoodia, vaan
 * asteet on muunnettu laudan yksiköiksi valmiiksi ja asteet jätetty
 * kommenttiin, jotta luvut voi laskea uudelleen jos lauta vaihtaa
 * projektiota.
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 -175 /
 *     POHJOINEN 76 (tools/fokuskartta/piirto.js laudanProjektio).
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3
 *     (js/packs/europe.js).
 *
 * Lauta, jota rivillä ei ole, saa pisteensä kaupunkiin (nostonPaikka):
 * väärään paikkaan ankkuroitu merkki olisi pahempi kuin maan osoite.
 */
const NOSTO_MAAT = {
  GRC: [
    {
      id: 'sofia-korut',
      // Kartan nimiö: lyhyt pelaajateksti pisteen kylkeen (omistajan
      // lisätilaus 28.8.2026 ilta). Otsikko on lause, nimiö on nimi.
      nimio: 'Helenan korut',
      otsikko: 'Valokuva paljasti aarrevarkauden — rouva poseerasi Troijan koruissa',
      teksti: 'Heinrich Schliemann salakuljetti Priamoksen aarteen ulos '
        + 'Ottomaanien valtakunnasta. Viranomaisille asia paljastui vasta, kun '
        + 'hänen vaimonsa Sofia esiintyi julkisesti yllään "Helenan korut" — '
        + 'kultainen otsapanta ja kaulakorut.\n\n'
        + 'Kaivausta valvomaan määrätty ottomaanivirkamies Amin Effendi sai '
        + 'vankeustuomion, Schliemannin kaivauslupa peruttiin ja Ottomaanien '
        + 'hallitus haastoi hänet oikeuteen osuudestaan kultaan.',
      lahde: 'en-Wikipedia "Priam\'s Treasure", osio "Art collection" '
        + '(tarkistettu 25.8.2026).',
      /*
       * Iliou Melathron, Schliemannin oma talo Ateenassa (23,7342 E /
       * 37,9814 N — en-Wikipedia "Iliou Melathron"). Juuri siitä talosta
       * Sofia lähti korut yllään, ja se on kadun päässä siitä
       * kansallismuseosta, jonne Troijan löydöt lopulta päätyivät.
       */
      paikka: {
        nimi: 'Ateena',
        laudat: {
          maailmankartta: { x: 6624.5, y: 1881.6 },
          europe: { x: 666.9, y: 894.7 },
        },
      },
      kuva: {
        tiedosto: 'Sophia Schliemann wearing gold jewelry.jpg',
        selite: 'Sofia Schliemann "Helenan koruissa". Juuri tämä kuva '
          + 'kertoi viranomaisille, missä Troijan kulta oli.',
        lahde: 'Tuntematon kuvaaja n. 1873, Wikimedia Commons (public domain)',
      },
    },
    {
      /*
       * Aineiston ehdokas 10. Paikka ja kohde ovat kartan oma Delfoi
       * (js/packs/fokuskohteet-grc.js `delfoi`), joten piste tuikkii
       * Delfoin symbolin päällä — kaukana Ateenan laatasta, kuten
       * omistaja pyysi.
       *
       * LUPAUS LUNASTETAAN OMASSA KORTISSA eikä Delfoin tietoruudussa:
       * tietoruutu kertoo Omfaloksesta ja Pythiasta, ei kylästä joka
       * istui oraakkelin päällä. Kortin nappi vie sinne vasta sitten,
       * kun otsikon lupaus on maksettu.
       */
      id: 'kastrin-kyla',
      nimio: 'Kastrin kylä',
      kohde: 'delfoi',
      otsikko: 'Kokonainen kylä istui oraakkelin päällä — eikä lähtenyt '
        + 'ennen kuin maa järisi',
      teksti: 'Kun ranskalaiset halusivat kaivaa Delfoin pyhäkön esiin, '
        + 'sen päällä seisoi Kastrin kylä: noin sata taloa ja 200 asukasta, '
        + 'jotka olivat louhineet antiikin kiviä omiin seiniinsä siitä '
        + 'asti kun paikka tuhottiin 300-luvulla.\n\n'
        + 'Kylä olisi pitänyt siirtää ennen kaivauksia, mutta asukkaat '
        + 'kieltäytyivät. Tilaisuus tuli vasta kun maanjäristys vaurioitti '
        + 'kylää pahoin: asukkaille tarjottiin kokonaan uusi kylä vanhan '
        + 'paikan tilalle, ja 1893 Ranskan arkeologinen koulu kuori pois '
        + 'maanvyöryjen massat ja paljasti Apollonin pyhäkön.',
      lahde: 'en-Wikipedia "Delphi", osio "Archaeology of the precinct" '
        + '(tarkistettu 28.8.2026).',
      paikka: {
        nimi: 'Delfoi',
        laudat: {
          maailmankartta: { x: 6583.4, y: 1862.2 },
          europe: { x: 643.2, y: 881.5 },
        },
      },
    },
    {
      /*
       * Aineiston ehdokas 12. Aineiston oma varoitus noudatettu: lähde
       * puhuu ensimmäisestä KIRJATUSTA noususta, joten teksti sanoo
       * "tiettävästi ensimmäinen" eikä väitä, ettei kukaan olisi
       * koskaan käynyt huipulla.
       */
      id: 'olympoksen-huippu',
      nimio: 'Vuohenmetsästäjä',
      kohde: 'olympos',
      otsikko: 'Jumalten vuorelle noustiin vasta 1913 — ja huipulla oli '
        + 'ensimmäisenä vuohenmetsästäjä',
      teksti: 'Olympos oli koko antiikin ajan jumalten koti, mutta sen '
        + 'korkeimmalle huipulle Mytikakselle noustiin tiettävästi '
        + 'ensimmäisen kerran vasta 2. elokuuta 1913 — vuosi sen jälkeen, '
        + 'kun Pohjois-Kreikka vapautui ottomaanivallasta.\n\n'
        + 'Retken maksoivat sveitsiläiset Frédéric Boissonnas ja Daniel '
        + 'Baud-Bovy, mutta kolmikosta huipulle astui ensimmäisenä heidän '
        + 'oppaansa Christos Kakkalos, villivuohien metsästäjä Litohoron '
        + 'kylästä. Hän toimi Olympoksen virallisena oppaana kuolemaansa '
        + 'eli vuoteen 1976 asti.',
      lahde: 'en-Wikipedia "Mount Olympus", osio "History" '
        + '(tarkistettu 28.8.2026).',
      paikka: {
        nimi: 'Ólympos',
        laudat: {
          maailmankartta: { x: 6578.6, y: 1799.5 },
          europe: { x: 640.5, y: 839.3 },
        },
      },
    },
  ],

  /*
   * ── NELJÄ UUTTA MAATA, KYMMENEN NOSTOA (omistajan tilaus 28.8.2026:
   *    *"muita täkyjä ja karttakohteita voisi rakentaa lisää
   *    eurooppaan"*) ──────────────────────────────────────────────────
   *
   * MALLI ON SOFIAN PILOTTI (js/packs/fokusvirta-sofia.js, nosto
   * `areena`): lyhyt `nimio` kartalle, klikkiotsikkotasoinen `otsikko`,
   * `lunastus` KAHTENA KAPPALEENA, `lahde`, tarkistettu `valokuva` ja
   * kolme valmiskysymystä pululle. Jokainen rivi on rakennettu
   * VARMAKSI merkitystä ehdokkaasta työaineistossa
   * (docs/mantereet-tyoaineisto/takynostot-espanja.md, -itavalta.md,
   * -ranska.md ja -saksa.md), ja jokaisen aineiston oma rajaus on
   * noudatettu — ne on merkitty rivikohtaisiin kommentteihin.
   *
   * LOISTOAIKAKUVAA EI OLE VIELÄ YHDELLÄKÄÄN. Sofian kortin pääkuva on
   * repon oma generoitu havainnekuva (`kuva.osoite`), eikä tässä erässä
   * generoitu kuvia. Kenttä on siksi jätetty kokonaan pois: kortti ja
   * kartan liuska lukevat sitä vain `if (nosto.kuva)` -ehdon takaa
   * (nostoKlikkiotsikko, avaaNostonKortti), joten kuvaton nosto on
   * ehjä — otsikko ja lunastus kantavat sen, ja kuvan voi lisätä
   * myöhemmin yhdellä kentällä. Kakkoskuva (`valokuva`) on kymmenestä
   * yhdeksällä; se piirtyy tekstin alle omana pienempänä kehyksenään.
   *
   * KOHDENAPPIA EI OLE YHDELLÄKÄÄN. Kortin nappi lukee vain datan omaa
   * `kohde`-kenttää, ja se saa osoittaa VAIN jutun omaan kohteeseen
   * (ks. nostonKarttakohde). Saksan 21 ja Ranskan 2 kartan kohdetta
   * eivät kata yhtäkään näistä aiheista — Neuschwansteinilla,
   * Köpenickillä, luonnontieteellisellä museolla, Altamiralla,
   * Cartagenalla ja Schönbrunnin tarhalla ei ole omaa karttamerkkiä —
   * joten nappi jäisi lupaamaan väärän kohteen. Piste hakeutuu silti
   * lähimmän kohdesymbolin päälle, koska se on esityksen sääntö
   * (js/fokusnosto-symbolit.js) eikä datan lupaus.
   *
   * PAIKAT SAMALLA MENETELMÄLLÄ kuin Kreikan riveillä (ks. yllä):
   * asteet on muunnettu laudan yksiköiksi valmiiksi ja jätetty
   * kommenttiin. Asteluvut ovat työaineiston omia siellä missä ne on
   * kirjattu, muuten Wikipedian `prop=coordinates`-rajapinnasta
   * 28.8.2026 — arvattuja koordinaatteja ei ole yhtään.
   */
  ESP: [
    {
      /*
       * takynostot-espanja.md, ehdokas 1 (VARMA). Aineiston kaksi
       * kieltoa noudatettu: Marían huudahdusta ei ole (sitä EI ole
       * lähteessä), eikä kahta eri lukua sekoiteta — julkaisusta
       * peruutukseen on 22 vuotta, kuolemasta peruutukseen 14, ja
       * teksti sanoo vain jälkimmäisen.
       */
      id: 'altamira',
      nimio: 'Altamiran katto',
      otsikko: 'Löytäjää naurettiin väärentäjäksi — anteeksipyyntö tuli, '
        + 'kun hän oli ollut kuolleena neljätoista vuotta',
      lunastus: [
        'Luolan löysi 1868 tiilentekijä Modesto Cubillas, mutta kukaan ei '
          + 'katsonut kattoon. Vuonna 1879 harrastelija-arkeologi Marcelino '
          + 'Sanz de Sautuola meni luolaan kahdeksanvuotiaan tyttärensä '
          + 'Marían kanssa, ja tyttö vei isänsä katsomaan seinien merkkejä. '
          + 'Isä tajusi, että ne olivat piirroksia: katossa oli lauma '
          + 'sukupuuttoon kuolleita arobiisoneja, kaksi hevosta, iso '
          + 'naaraspeura ja mahdollisesti villisika.',
        'Sautuola julkaisi löytönsä 1880 professori Juan Vilanova y Pieran '
          + 'tuella. Ranskalaiset asiantuntijat Gabriel de Mortillet ja '
          + 'Émile Cartailhac kiistivät sen jyrkästi: heidän mielestään '
          + 'esihistorialliset ihmiset eivät kyenneet abstraktiin '
          + 'ajatteluun, ja Lissabonin esihistorian kongressissa löytöä '
          + 'naurettiin ääneen. Sautuolaa syytettiin väärennöksestä, koska '
          + 'hän ei osannut selittää, miksi katossa ei ollut nokea. Vasta '
          + '1902, kun vastaavia luolamaalauksia oli löytynyt lisää, '
          + 'Cartailhac perui julkisesti artikkelissa "Mea culpa d\'un '
          + 'sceptique". Sautuola oli silloin ollut kuolleena neljätoista '
          + 'vuotta.',
      ],
      lahde: 'en-Wikipedia "Cave of Altamira", johdanto ja osio "Discovery, '
        + 'excavation, scepticism" (tarkistettu 25.8.2026 työaineistoon '
        + 'docs/mantereet-tyoaineisto/takynostot-espanja.md, ehdokas 1).',
      /*
       * Aineiston oma valinta: sama piirros, jonka takia löytäjää
       * syytettiin väärentäjäksi. Commons 25.8.2026: 1350×682, public
       * domain, Restrictions tyhjä.
       */
      valokuva: {
        tiedosto: 'Altamira-1880.jpg',
        selite: 'Kattomaalausten piirros vuoden 1880 julkaisusta — juuri se '
          + 'kuva, jonka takia löytäjää syytettiin väärentäjäksi.',
        lahde: 'Vuoden 1880 julkaisu, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi tutkijat eivät uskoneet Altamiran maalauksia aidoiksi?',
        'Mitä eläimiä Altamiran kattoon on maalattu?',
        'Miten luolamaalausten ikä nykyään selvitetään?',
      ],
      // 43,3825 N / −4,12027778 E — en-Wikipedia "Cave of Altamira"
      // (fokuskohteet-espanja.md, kohde 10).
      paikka: {
        nimi: 'Altamira',
        laudat: {
          maailmankartta: { x: 5696, y: 1667.9 },
          europe: { x: 132.1, y: 752.6 },
        },
      },
    },
    {
      /*
       * ELÄINNOSTO. takynostot-espanja.md, ehdokas 6 (VARMA).
       * Aineiston ehto noudatettu: laskentavuosi on tekstissä näkyvissä,
       * koska luku vanhenee.
       *
       * PAIKKAA EI OLE, JA SE ON TIETOINEN VALINTA. Aineisto puhuu
       * "Madridin puistoista" eikä nimeä yhtä pesäpaikkaa, eikä
       * arvattua koordinaattia kirjoiteta datalle (ks. yllä). Ilman
       * `paikka`-kenttää piste ottaa paikakseen kaupungin ja siirtyy
       * laatan vasemmalle puolelle (nostonPaikka, js/fokusnosto-
       * symbolit.js) — juuri se varapolku, jota varten kenttä on
       * valinnainen.
       */
      id: 'munkkiaratit',
      nimio: 'Madridin papukaijat',
      otsikko: 'Madridin puistoissa asuu tuhansia villejä papukaijoja — ja '
        + 'niiden pesät kasvavat pikkuauton kokoisiksi',
      lunastus: [
        'Laji on munkkiaratti, kotoisin Etelä-Amerikasta. Espanjassa elää '
          + 'yli 80 prosenttia koko Euroopan villistä kannasta, ja '
          + 'Madridissa niitä laskettiin kesäkuussa 2015 kymmenentuhatta '
          + 'kahdeksansataa — enemmän kuin missään muualla Euroopassa. '
          + 'Barcelonassa oli samaan aikaan noin 5 000, Sevillassa 6 300 '
          + 'vuonna 2021.',
        'Munkkiaratti on ainoa papukaija, joka rakentaa oksista oikean '
          + 'pesän eikä tyydy puunkoloon. Yhdyskunta kutoo yhteen '
          + 'jättipesän, jossa jokaisella parilla on oma sisäänkäynti ja '
          + 'oma huoneisto. Pesä voi kasvaa pienen auton kokoiseksi, ja '
          + 'siihen muuttaa alivuokralaisia: kyyhkyjä, varpusia, jopa '
          + 'oravia. Espanja kielsi lajin pidon ja kaupan vuonna 2013.',
      ],
      lahde: 'en-Wikipedia "Monk parakeet", osiot pesinnästä ja '
        + 'vieraslajistatuksesta (tarkistettu 25.8.2026 työaineistoon '
        + 'docs/mantereet-tyoaineisto/takynostot-espanja.md, ehdokas 6).',
      /* Commons 25.8.2026: 6024×4016, CC BY-SA 4.0, Restrictions tyhjä. */
      valokuva: {
        tiedosto: 'Cotorra Argentina - Parque del Oeste - Madrid 03.jpg',
        selite: 'Munkkiaratti Madridin Parque del Oestessa.',
        lahde: 'Javier Perez Montes, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miten eteläamerikkalaiset papukaijat päätyivät Madridiin?',
        'Millainen on munkkiaratin yhteispesä?',
        'Mitä haittaa vieraslajista on kaupungille?',
      ],
    },
    {
      /*
       * takynostot-espanja.md, ehdokas 4 (VARMA yksityiskohdista).
       * Aineiston kaksi ohjetta noudatettu: otsikko nojaa
       * merirosvojulistukseen, joka on molemmissa lähdeartikkeleissa,
       * eikä lippukiistaan, josta artikkelit kertovat eri tarinan;
       * piirityksen uhreja ei kuvata (13+ -rajaus).
       */
      id: 'cartagenan-kantoni',
      nimio: 'Cartagenan kantoni',
      otsikko: 'Kaupunki julistautui omaksi valtioksi — ja oma hallitus '
        + 'julisti sen laivaston merirosvoiksi',
      lunastus: [
        'Kun Espanjan tasavalta ei saanut ohjia käsiinsä, Cartagena — maan '
          + 'Välimeren päälaivastotukikohta — nousi aseelliseen kapinaan '
          + '12. heinäkuuta 1873 ja julistautui itsenäiseksi kantoniksi. '
          + 'Kapinalliset saivat puolelleen sataman sota-alukset, jotka '
          + 'olivat Espanjan parhaita. Kantonin laivasto lähti keräämään '
          + 'rahaa "ulkovallalta", Almerían kaupungilta, ja kun kaupunki ei '
          + 'maksanut, se pommitettiin. Madridin hallitus julisti kantonin '
          + 'johtajan merirosvoksi ja pani hänen päästään palkkion.',
        'Fregatit Almansa ja Vitoria otettiin lopulta kiinni merirosvoina, '
          + 'mutta ei espanjalaisten toimesta: kiinniottajat olivat '
          + 'brittiläinen HMS Swiftsure ja saksalainen SMS Friedrich Karl. '
          + 'Kantoni kesti puoli vuotta, löi omaa rahaa ja otti '
          + 'loppuvaiheessa vastaan keskimäärin 1 200 kranaattia päivässä. '
          + '16. joulukuuta 1873 sen johtaja Roque Barcia kirjoitti '
          + 'Yhdysvaltain presidentille Ulysses S. Grantille ja pyysi lupaa '
          + 'nostaa Yhdysvaltain lippu, jotta pommitukset lakkaisivat. '
          + 'Lupaa ei tullut. Kaupunki antautui 12. tammikuuta 1874.',
      ],
      lahde: 'en-Wikipedia "Canton of Cartagena", osiot "Establishment", '
        + '"Expansion" ja "Defeat", sekä "First Spanish Republic" '
        + '(tarkistettu 25.8.2026 työaineistoon docs/mantereet-tyoaineisto/'
        + 'takynostot-espanja.md, ehdokas 4).',
      /* Commons 25.8.2026: 1216×928, public domain, Restrictions tyhjä. */
      valokuva: {
        tiedosto: 'Vista de la ciudad, puerto y Arsenal de Cartagena.jpg',
        selite: 'Cartagenan satama ja arsenaali vuoden 1778 kaiverruksessa. '
          + 'Juuri se arsenaali nousi kapinaan.',
        lahde: 'Juan Fernando Palomino 1778, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Mikä oli Cartagenan kantoni?',
        'Miksi Espanjassa oli vuonna 1873 useita hallituksia peräkkäin?',
        'Miten kaupunki pystyi lyömään omaa rahaa?',
      ],
      // 37,6019 N / −0,9842 E — en-Wikipedia "Cartagena, Spain"
      // (fokuskohteet-espanja.md, kohde 7).
      paikka: {
        nimi: 'Cartagena',
        laudat: {
          maailmankartta: { x: 5800.5, y: 1896.2 },
          europe: { x: 192.3, y: 904.7 },
        },
      },
    },
  ],

  AUT: [
    {
      /*
       * takynostot-itavalta.md, ehdokas 1 (VARMA). Aineiston rajaus
       * noudatettu sanatarkasti: romahdusta seurannutta
       * antisemitististä aaltoa EI oteta otsikkoon eikä lunastukseen.
       *
       * ISOISÄN MATKAVUOSI MAINITAAN VAIN LUKUNA. Kaanoni antaa Wienin
       * 1873-ankkuriksi vuoristovesijohdon (docs/isoisan-raamattu.md:
       * *"Wien (hengähdys: kahvila, vesijohto 1873)"*), joten näyttelyä
       * ei sidota isoisän omaan matkaan — vuosiluku riittää, ja pelaaja
       * tunnistaa sen päiväkirjan vuodeksi itse.
       */
      id: 'maailmannayttely-1873',
      nimio: 'Näyttely ja pörssi',
      otsikko: 'Keisari avasi maailmannäyttelyn — kahdeksan päivää '
        + 'myöhemmin poliisi sulki pörssin',
      lunastus: [
        'Keisari Franz Joseph avasi maailmannäyttelyn 1. toukokuuta 1873 '
          + 'sanoen, että Itävalta-Unkari on kaikin puolin ilahduttavassa '
          + 'nousussa. Kupla oli jo puhkeamassa: maan suurin pankki oli '
          + 'juuri irtisanonut pörssitalletukset ja myynyt 20 miljoonan '
          + 'guldenin arvosta arvopapereita.',
        'Yhdeksäntenä toukokuuta aamulla ilmoitti maksukyvyttömyydestään '
          + 'meklari Adolf Petschek, jota kutsuttiin meklarikaupan '
          + 'kuninkaaksi. Samana aamupäivänä kaatui 120 muuta pankkia, ja '
          + 'kello 13 poliisi sulki pörssin — päivä on Itävallan historian '
          + '"musta perjantai". Romahdus levisi Berliiniin ja syyskuussa '
          + 'New Yorkiin, jonka pörssi suljettiin ensimmäistä kertaa '
          + 'historiassaan kymmeneksi päiväksi. Näyttelylle odotettiin 20 '
          + 'miljoonaa kävijää; tuli 7,25 miljoonaa, ja tappiota kertyi '
          + 'noin 15 miljoonaa guldenia.',
      ],
      lahde: 'de-Wikipedia "Gründerkrach" ja "Weltausstellung 1873" sekä '
        + 'en-Wikipedia "Panic of 1873" (tarkistettu 25.8.2026 '
        + 'työaineistoon docs/mantereet-tyoaineisto/takynostot-itavalta.md, '
        + 'ehdokas 1).',
      /* Commons 25.8.2026: 2166×1503, public domain, Restrictions tyhjä. */
      valokuva: {
        tiedosto: 'Weltausstellungsgelände-Wien-1873.jpg',
        selite: 'Maailmannäyttelyn alue Praterissa vuonna 1873.',
        lahde: 'Historisches Museum der Stadt Wien 1873, Wikimedia Commons '
          + '(public domain)',
      },
      kysymykset: [
        'Mitä maailmannäyttelyssä 1873 oli nähtävänä?',
        'Mikä aiheutti Wienin pörssiromahduksen?',
        'Miten romahdus levisi Wienistä New Yorkiin asti?',
      ],
      // 48,21222222 N / 16,40944444 E — de-Wikipedia "Rotunde (Wien)",
      // näyttelyn tunnusrakennus Praterin alueella.
      paikka: {
        nimi: 'Prater',
        laudat: {
          maailmankartta: { x: 6380.3, y: 1467.2 },
          europe: { x: 526.3, y: 625.6 },
        },
      },
    },
    {
      /*
       * ELÄINNOSTO. takynostot-itavalta.md, ehdokas 4 (VARMA).
       * Aineiston huomautus noudatettu: eläintarhan ikää ja
       * Kaiserpavillonia ei toisteta, koska ne ovat jo pelissä
       * (js/packs/kulttuuri-kategoriat.js) — tästä kerrotaan vain se,
       * mitä kirahvi sai aikaan.
       */
      id: 'kirahvimuoti',
      nimio: 'Kirahvi ja muoti',
      otsikko: 'Yksi kirahvi muutti koko kaupungin muodin — kampaukset, '
        + 'hajuveden ja näytelmän',
      lunastus: [
        'Schönbrunnin eläintarha sai ensimmäisen kirahvinsa vuonna 1828 '
          + 'lahjaksi Egyptin varakuninkaalta. Eläin herätti sellaisen '
          + 'innostuksen, että se levisi muotiin, käsitöihin ja '
          + 'seuraelämään.',
        'Kirahvikuvioita ilmestyi vaatteisiin, kenkiin ja käyttöesineisiin, '
          + 'ja kirahvin innoittamina keksittiin uusia kampauksia, hajuvesi, '
          + 'näytelmä ja kaksi sävellystä. Tarha itse oli tuolloin yhä '
          + 'keisariperheen yksityisomaisuutta, ja se pysyi sellaisena aina '
          + 'Itävalta-Unkarin hajoamiseen 1918 asti.',
      ],
      lahde: 'en-Wikipedia "Schönbrunn Zoo", osiot "Founding and early '
        + 'years" ja "In the 19th century" (tarkistettu 25.8.2026 '
        + 'työaineistoon docs/mantereet-tyoaineisto/takynostot-itavalta.md, '
        + 'ehdokas 4).',
      /* Commons 25.8.2026: 3702×2718, public domain, Restrictions tyhjä. */
      valokuva: {
        tiedosto: 'Eduard Gurk - Die erste Giraffe im Schönbrunner Tiergarten - 1828.jpeg',
        selite: 'Schönbrunnin ensimmäinen kirahvi Eduard Gurkin maalauksessa '
          + 'samalta vuodelta, jona se saapui.',
        lahde: 'Eduard Gurk 1828, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi kirahvi oli 1800-luvun Euroopassa niin suuri uutinen?',
        'Miten eläimiä kuljetettiin Egyptistä Wieniin?',
        'Millainen paikka Schönbrunnin eläintarha oli 1800-luvulla?',
      ],
      // 48,1845 N / 16,3119 E — takyt-wien.md, täky 10
      // (Tiergarten Schönbrunn).
      paikka: {
        nimi: 'Schönbrunn',
        laudat: {
          maailmankartta: { x: 6377.1, y: 1468.4 },
          europe: { x: 524.4, y: 626.3 },
        },
      },
    },
  ],

  FRA: [
    {
      /*
       * takynostot-ranska.md, ehdokas 2 (VARMA). Aineiston sanamuoto
       * noudatettu: lähde ei anna toiselle yritykselle kuukautta, joten
       * teksti sanoo "samana vuonna".
       *
       * KUVAA EI OLE. Aineiston ainoa tarkistettu tiedosto on Lustigin
       * pidätyskuva, ja aineisto jättää sen käytön nimenomaisesti
       * päätoimittajan ratkaistavaksi (*"Fablen on päätettävä, sopiiko
       * poliisikuva pelin sävyyn"*). Sitä päätöstä ei tehdä tässä.
       */
      id: 'lustig-eiffel',
      nimio: 'Torni romuraudaksi',
      otsikko: 'Mies myi Eiffel-tornin romuraudaksi — ja palasi samana '
        + 'vuonna myymään sen uudelleen',
      lunastus: [
        'Huijari Victor Lustig luki Pariisissa 1925 lehtijutun siitä, kuinka '
          + 'kallista Eiffel-tornin kunnossapito on. Hän palkkasi '
          + 'väärentäjän tekemään valtion kirjelomakkeita, kutsui joukon '
          + 'romukauppiaita luottamukselliseen kokoukseen kalliiseen '
          + 'hotelliin ja esittäytyi posti- ja lennätinministeriön '
          + 'varapääjohtajana: valtio aikoo myydä tornin romuksi, mutta asia '
          + 'on arkaluontoinen eikä siitä saa puhua.',
        'Uhrikseen hän valitsi André Poissonin, joka halusi nousta Pariisin '
          + 'liike-elämän sisäpiiriin, ja sai tältä sekä lahjuksen että '
          + 'kauppasumman — noin 70 000 frangia. Sitten hän pakeni '
          + 'Itävaltaan ja luki lehtiä: Poisson ei ollut ilmoittanut '
          + 'poliisille, koska häpesi. Niinpä Lustig palasi Pariisiin saman '
          + 'vuoden puolella tekemään saman tempun uudestaan. Tällä kertaa '
          + 'joku ilmoitti, ja hän pakeni Yhdysvaltoihin.',
      ],
      lahde: 'en-Wikipedia "Victor Lustig", osio Eiffel-tornin huijauksesta '
        + '(tarkistettu 25.8.2026 työaineistoon docs/mantereet-tyoaineisto/'
        + 'takynostot-ranska.md, ehdokas 2).',
      kysymykset: [
        'Miten Eiffel-tornin romukauppa saatiin kuulostamaan uskottavalta?',
        'Miksi huijauksen uhri ei ilmoittanut poliisille?',
        'Oliko Eiffel-tornin purkamisesta oikeasti puhetta?',
      ],
      // 48,85822222 N / 2,2945 E — en-Wikipedia "Eiffel Tower".
      paikka: {
        nimi: 'Eiffel-torni',
        laudat: {
          maailmankartta: { x: 5909.8, y: 1439.5 },
          europe: { x: 255.3, y: 608.6 },
        },
      },
    },
    {
      /*
       * ELÄINNOSTO. takynostot-ranska.md, ehdokas 3 (VARMA). Aineiston
       * nimikielto noudatettu: nimeä "Zarafa" ei käytetä, koska se
       * annettiin vasta 1985 — aikalaisten nimi kerrotaan sen sijaan.
       *
       * LÄHETYSVUOTTA EI MAINITA. Aineistossa lukee sekä "lähetti 1827"
       * että "saapui Marseilleen 31.10.1826"; kumpaakaan ei ole
       * muutettu, vaan tekstiin on otettu vain se päivämäärä, jonka
       * lähde antaa täsmällisenä.
       */
      id: 'kirahvin-kavelymatka',
      nimio: 'Kirahvin kävelymatka',
      otsikko: 'Kirahvi käveli 900 kilometriä Marseillesta Pariisiin — '
        + 'takki päällä ja kengät jalassa',
      lunastus: [
        'Egyptin varakuningas lähetti kirahvin Ranskan kuninkaalle '
          + 'Kaarle X:lle. Eläin saapui laivalla Marseilleen 31. lokakuuta '
          + '1826 — kannessa oli sahattu reikä, josta kaula mahtui ulos. '
          + 'Merimatkaa Atlantin ympäri pidettiin liian vaarallisena, joten '
          + 'päätettiin, että kirahvi kävelee Pariisiin. Luonnontieteilijä '
          + 'Étienne Geoffroy Saint-Hilaire, 55, käveli mukana ja teetti '
          + 'eläimelle kaksiosaisen keltaisen takin ja kengät.',
        'Matka kesti 41 päivää. Lyonissa vastassa oli 30 000 ihmistä, ja '
          + 'Pariisissa kirahvia kävi katsomassa yli 100 000 — joka '
          + 'kahdeksas kaupunkilainen. Hiukset kammattiin torneiksi, '
          + 'kankaisiin ilmestyi täpliä ja väri nimeltä "kirahvin vatsa" myi '
          + 'kaiken. Aikalaiset kutsuivat eläintä nimellä la Belle '
          + 'Africaine, ja se eli Jardin des Plantes\'ssa 18 vuotta.',
      ],
      lahde: 'en-Wikipedia "Zarafa (giraffe)", osiot matkasta ja '
        + 'vastaanotosta (tarkistettu 25.8.2026 työaineistoon '
        + 'docs/mantereet-tyoaineisto/takynostot-ranska.md, ehdokas 3).',
      /* Commons 25.8.2026: 4793×6392, public domain, Restrictions tyhjä. */
      valokuva: {
        tiedosto: 'Nicolas Hüet, the Younger - Study of the Giraffe Given to Charles X by the Viceroy of Egypt - Google Art Project.jpg',
        selite: 'Sama kirahvi Nicolas Hüet nuoremman tutkielmassa vuodelta '
          + '1827.',
        lahde: 'Nicolas Hüet nuorempi 1827, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi kirahvi käveli Marseillesta Pariisiin eikä matkustanut meritse?',
        'Miten eläin selvisi 900 kilometrin kävelystä?',
        'Mitä muuta Jardin des Plantes\'n eläintarhassa oli 1800-luvulla?',
      ],
      // 48,8447 N / 2,3597 E — en-Wikipedia "Ménagerie du Jardin des
      // plantes" (takyt-pariisi.md, täky 2).
      paikka: {
        nimi: 'Jardin des Plantes',
        laudat: {
          maailmankartta: { x: 5912, y: 1440.1 },
          europe: { x: 256.5, y: 609 },
        },
      },
    },
  ],

  DEU: [
    {
      /* takynostot-saksa.md, ehdokas 1 (VARMA). Henkilö kuollut 1922. */
      id: 'kopenickin-kapteeni',
      nimio: 'Köpenickin kapteeni',
      otsikko: 'Suutari osti univormun palasina ja valtasi kaupungintalon '
        + '— keisari armahti hänet',
      lunastus: [
        'Wilhelm Voigt oli istunut elämänsä aikana yhteensä 25 vuoden '
          + 'edestä tuomioita ja päässyt vapaaksi helmikuussa 1906. '
          + 'Elokuussa Berliinin poliisi karkotti hänet kaupungista '
          + 'pelkästään siksi, että hän oli entinen vanki. Lokakuun 16. '
          + 'päivänä hän puki ylleen preussilaisen kaartinkapteenin '
          + 'univormun, jonka oli ostanut palasina eri kaupoista ja jonka '
          + 'vaikutusta sotilaisiin hän oli ensin koekäyttänyt.',
        'Hän pysäytti kadulla neljä krenatööriä ja kersantin, otti kuusi '
          + 'lisää ampumaradalta, vei joukkonsa junalla Köpenickiin, '
          + 'miehitti kaupungintalon, käski poliisin huolehtia '
          + 'järjestyksestä ja estää puhelut Berliiniin tunnin ajaksi, '
          + 'pidätytti pormestarin ja rahastonhoitajan ja takavarikoi '
          + 'kassasta 4 002 markkaa ja 37 penniä — antaen kuitin, jonka '
          + 'allekirjoitti entisen vanginvartijansa nimellä. Kiinni '
          + 'jäätyään hänet tuomittiin neljäksi vuodeksi, mutta keisari '
          + 'Wilhelm II armahti hänet 1908. Neljä päivää vapautumisensa '
          + 'jälkeen hän oli jo vahakabinetissa Unter den Lindenillä '
          + 'signeeraamassa kuviaan.',
      ],
      lahde: 'en-Wikipedia "Wilhelm Voigt", johdanto ja osiot "Early life", '
        + '"Captain of Köpenick", "Unraveling and capture" ja "Aftermath" '
        + '(tarkistettu 25.8.2026 työaineistoon docs/mantereet-tyoaineisto/'
        + 'takynostot-saksa.md, ehdokas 1).',
      /* Commons 25.8.2026: 562×856, public domain, Restrictions tyhjä. */
      valokuva: {
        tiedosto: 'Wilhelm Voigt 1906 10 26.jpg',
        selite: 'Wilhelm Voigt poliisin kuvassa kymmenen päivää tempun '
          + 'jälkeen.',
        lahde: 'Preussin poliisi 1906, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi sotilaat tottelivat vierasta miestä univormussa?',
        'Miksi keisari armahti Köpenickin kapteenin?',
        'Mitä univormu merkitsi keisarillisessa Saksassa?',
      ],
      // 52,44583333 N / 13,57722222 E — en-Wikipedia "Köpenick"
      // (takynostot-saksa.md, ehdokas 1: Rathaus Köpenick).
      paikka: {
        nimi: 'Köpenick',
        laudat: {
          maailmankartta: { x: 6285.9, y: 1282.2 },
          europe: { x: 471.9, y: 514.3 },
        },
      },
    },
    {
      /*
       * ELÄINNOSTO. takynostot-saksa.md, ehdokas 2 (VARMA lehmän,
       * hinnan ja rahoittajan osalta). Aineiston kielto noudatettu:
       * LÖYTÖVUOTTA EI MAINITA kummassakaan kappaleessa, koska
       * en-Wikipedian kaksi artikkelia antavat sille eri vuoden.
       */
      id: 'archaeopteryx',
      nimio: 'Fossiili lehmän hinnalla',
      otsikko: 'Maanviljelijä myi maailman kuuluisimman fossiilin — hinta '
        + 'oli yksi lehmä',
      lunastus: [
        'Berliinin luonnontieteellisessä museossa on lasin alla kivilaatta, '
          + 'jossa näkyy pieni hampaallinen olento siipineen, kynsineen ja '
          + 'pitkine liskomaisine häntineen — ja höyhenten painaumat '
          + 'kivessä. Se on Archaeopteryxin Berliinin yksilö, lajin '
          + 'kahdestatoista löydetystä yksilöstä täydellisin ja ensimmäinen, '
          + 'jolla on kokonainen pää.',
        'Löytäjä oli maanviljelijä Jakob Niemeyer Eichstättin lähellä. '
          + 'Vuonna 1876 hän myi fossiilin majatalonpitäjä Johann Dörrille '
          + '— saadakseen rahat lehmän ostoon. Dörr myi sen eteenpäin, ja '
          + 'vuosina 1877–1881 fossiili oli myynnissä; ostajaehdokkaisiin '
          + 'kuului Yalen O. C. Marsh. Lopulta Berliinin museo osti sen '
          + '20 000 kultamarkalla, ja kaupan rahoitti Ernst Werner von '
          + 'Siemens — sama mies, jonka yhtiö oli rakentanut Berliinin '
          + 'putkipostin.',
      ],
      lahde: 'en-Wikipedia "Archaeopteryx", osio yksilöistä (tarkistettu '
        + '25.8.2026 työaineistoon docs/mantereet-tyoaineisto/'
        + 'takynostot-saksa.md, ehdokas 2).',
      /* Commons 25.8.2026: 3926×4691, CC BY-SA 4.0, Restrictions tyhjä. */
      valokuva: {
        tiedosto: 'Berlin Archaeopteryx.jpg',
        selite: 'Archaeopteryxin Berliinin yksilö: höyhenten painaumat '
          + 'näkyvät kivessä.',
        lahde: 'Emily Willoughby, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miksi Archaeopteryx on niin kuuluisa fossiili?',
        'Miten höyhenet voivat säilyä kivessä?',
        'Paljonko 20 000 kultamarkkaa oli 1800-luvulla?',
      ],
      // 52,53 N / 13,37944444 E — en-Wikipedia "Museum für Naturkunde"
      // (takynostot-saksa.md, ehdokas 2).
      paikka: {
        nimi: 'Luonnontieteellinen museo',
        laudat: {
          maailmankartta: { x: 6279.3, y: 1278.4 },
          europe: { x: 468.1, y: 512.1 },
        },
      },
    },
    {
      /*
       * takynostot-saksa.md, ehdokas 7 (VARMA). Aineiston
       * IKÄSOPIVUUSRAJAUS noudatettu sanatarkasti: kuninkaan viimeiset
       * päivät, hallitsemiskyvyttömäksi julistaminen ja kuolema
       * Starnberginjärvessä ovat oma kiistelty aihepiirinsä, jota
       * aineistossa EI tarkistettu — nosto ei koske sitä eikä vihjaa
       * siihen, vaan siihen että linna maksettiin omista rahoista ja
       * avattiin yleisölle heti.
       */
      id: 'neuschwanstein',
      nimio: 'Velkojen linna',
      otsikko: 'Kuningas rakensi satulinnan omilla rahoillaan ja veloillaan '
        + '— ovet avattiin yleisölle heti hänen kuoltuaan',
      lunastus: [
        'Baijerin kuningas Ludwig II halusi pois Münchenin hovin '
          + 'rajoituksista ja rakennutti Alppien reunalle linnan, joka '
          + 'näyttää keskiaikaiselta ritarilinnalta mutta on 1800-luvun '
          + 'työtä ja rakennettu kunnianosoituksena Richard Wagnerille. '
          + 'Peruskivi laskettiin 5. syyskuuta 1869. Vuonna 1872 kellari '
          + 'oli valmis, 1876 kaikki ensimmäiseen kerrokseen asti, 1880 '
          + 'vietettiin harjannostajaisia, ja vasta 1884 kuningas muutti '
          + 'sisään.',
        'Hän maksoi kaiken omista varoistaan ja laajalla lainanotolla, ei '
          + 'Baijerin julkisista varoista. Linna oli tarkoitettu kuninkaan '
          + 'yksityiseksi asunnoksi — mutta hän kuoli 1886, ja se avattiin '
          + 'yleisölle pian sen jälkeen. Sen jälkeen siellä on käynyt yli '
          + '61 miljoonaa ihmistä.',
      ],
      lahde: 'en-Wikipedia "Neuschwanstein Castle", johdanto ja osio '
        + '"Construction" (tarkistettu 25.8.2026 työaineistoon '
        + 'docs/mantereet-tyoaineisto/takynostot-saksa.md, ehdokas 7).',
      /* Commons 25.8.2026: 2024×1443, public domain, Restrictions tyhjä. */
      valokuva: {
        tiedosto: 'Johannes Bernhard Neuschwanstein Baustelle 1882-85 (01).jpg',
        selite: 'Linna työmaana 1880-luvun alussa, telineet vielä pystyssä.',
        lahde: 'Johannes Bernhard 1882–85, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi 1800-luvulla rakennettiin keskiaikaisen näköisiä linnoja?',
        'Mistä Ludwig II sai rahat rakennustöihin?',
        'Mitä Neuschwansteinista oli valmiina 1870-luvulla?',
      ],
      // 47,5575 N / 10,74944444 E — en-Wikipedia "Neuschwanstein Castle"
      // (fokuskohteet-saksa.md, kohde 2).
      paikka: {
        nimi: 'Neuschwanstein',
        laudat: {
          maailmankartta: { x: 6191.6, y: 1495 },
          europe: { x: 417.6, y: 642.8 },
        },
      },
    },
  ],
};

/* ==================== LUETUT LAITTEEN MUISTIIN ==================== */

const NOSTO_AVAIN = 'matkakirja-takynostot-luetut';

/** Luettujen nostojen tunnukset. Rikki mennyt muisti on tyhjä muisti. */
function nostoLuetut() {
  try {
    const raaka = localStorage.getItem(NOSTO_AVAIN);
    const lista = raaka ? JSON.parse(raaka) : [];
    return new Set(Array.isArray(lista) ? lista.filter((x) => typeof x === 'string') : []);
  } catch {
    return new Set();
  }
}

/** Merkitsee noston luetuksi. Epäonnistunut kirjoitus ei kaada mitään. */
function nostoMerkitseLuetuksi(id) {
  try {
    const luetut = nostoLuetut();
    if (luetut.has(id)) return;
    luetut.add(id);
    localStorage.setItem(NOSTO_AVAIN, JSON.stringify([...luetut]));
  } catch {
    /* Yksityinen selaus tai täysi kiintiö: nosto nousee uudestaan. */
  }
}

/* ==================== TYYLI ==================== */

const NOSTO_TYYLIN_TUNNUS = 'fokusnosto-tyyli';

/**
 * Oma tyylitiedosto sivulle, jos sitä ei vielä ole. Sama kaava ja sama
 * syy kuin fokusvirralla ja fokuskohteilla: css/styles.css on toisen
 * työvaiheen hallussa. Yhden tiedoston versiossa erillistä linkkiä ei
 * ole, koska tyylit ovat jo sivun <style>-lohkossa.
 */
function nostoLataaTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(NOSTO_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = NOSTO_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('fokusnosto.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/* ==================== MIKÄ NOSTO NOUSEE ==================== */

/** Miniatyyrin ja kortin kuvan pyyntöleveydet pikseleinä. */
const NOSTO_MINI_PX = 160;
const NOSTO_KUVA_PX = 800;

/**
 * MINKÄ MAAN POOLI ON JUURI NYT VOIMASSA?
 *
 * Maa luetaan laudan omasta taulusta, samalla päättelyllä kuin kartan
 * kohteilla (js/fokuskohteet.js nykyisenMaanKohteet) — yksi totuus,
 * ei toista tulkintaa siitä, minkä maan sisältöä ruudulla on.
 */
/**
 * Lunastus yhdeksi tekstiksi: merkkijono kelpaa sellaisenaan, taulukko
 * liitetään kappalerajalla (tyhjä rivi), jonka ladonta tunnistaa.
 */
function nostonLunastusteksti(lunastus) {
  if (Array.isArray(lunastus)) {
    return lunastus.map((k) => String(k ?? '').trim()).filter(Boolean).join('\n\n');
  }
  return lunastus;
}

function nostoMaanPooli(ui, city) {
  /*
   * Kaupungin oma pooli packista ensin (Sofia 25.8.2026: kenttä
   * `takynostot` js/packs/fokusvirta-sofia.js:ssä käyttää lunastus-
   * nimeä tekstille) — näin uusi maa ei vaadi riviä tähän tiedostoon.
   * NOSTO_MAAT on sen MAAKOHTAINEN vastine: pooli, joka ei ole minkään
   * yksittäisen kaupungin annostelusisältöä vaan koko maan (Kreikka
   * 25.8.2026, Espanja, Itävalta, Ranska ja Saksa 28.8.2026).
   *
   * PACKIN POOLI SAA SAMAT KENTÄT: valinnainen `paikka` (pisteen
   * paikka kartalla) kulkee levityksen mukana sellaisenaan, joten
   * kentän lisääminen pakettiin ei vaadi riviä tänne. Vanha
   * `symboli`-kenttä säilyy datassa, mutta kartalla sitä ei enää lueta
   * (ks. nostonMerkinta).
   *
   * LUNASTUS SAA OLLA KAPPALEIDEN TAULUKKO (omistajan päätös
   * 28.8.2026: *"Lisäksi vähän enemmän juttua"*). Kortin ladonta jakaa
   * tekstin kappaleiksi tyhjän rivin kohdalta (jaaKappaleiksi), joten
   * taulukko liitetään yhteen juuri sillä erottimella — yksi muoto
   * eteenpäin, ei toista haaraa ladontaan.
   */
  const oma = fokusvirtaSisalto(ui, city)?.takynostot;
  if (Array.isArray(oma) && oma.length) return nostoLevitaLunastus(oma);
  const taulu = ui?.game?.pack?.map?.cityCountry;
  const iso = (taulu && city && taulu[city.id]) || null;
  const pooli = iso ? NOSTO_MAAT[iso] : null;
  return (Array.isArray(pooli) && pooli.length) ? nostoLevitaLunastus(pooli) : null;
}

/**
 * SAMA MUOTO MOLEMMISTA LÄHTEISTÄ: `lunastus` (merkkijono tai
 * kappaleiden taulukko) puretaan `teksti`-kentäksi, jonka ladonta
 * osaa jakaa kappaleiksi.
 *
 * Levitys koski 28.8.2026 asti vain pakettien poolia, koska maapooli
 * (NOSTO_MAAT) oli pelkkää Kreikkaa ja kirjoitettu suoraan
 * `teksti`-kenttään. Espanjan, Itävallan, Ranskan ja Saksan pooleissa
 * lunastus on Sofian pilotin mukaisesti KAHTENA KAPPALEENA, ja kahta
 * eri datamuotoa samalle asialle ei kannata pitää yllä: sama levitys
 * ajetaan siksi kummallekin lähteelle. Valmis `teksti` voittaa yhä,
 * joten Kreikan rivit kulkevat läpi koskemattomina.
 */
function nostoLevitaLunastus(pooli) {
  return pooli.map((n) => (n.teksti ? n : { ...n, teksti: nostonLunastusteksti(n.lunastus) }));
}

/*
 * POOLI PALAUTETAAN KOKONAAN — LEIKKAUS ON SIIRTYNYT KATSOMISEEN.
 *
 * Tässä oli 26.8.2026 alkaen `nostoYksiPerMaa`, joka leikkasi jokaisen
 * maan poolin yhteen riviin: kartalle sai nousta vain yksi PUHEKUPLA,
 * ja useampi kupla per maa olisi ollut juuri se raskaus, jota purettiin.
 *
 * Kuplaa ei enää ole (omistajan tilaus 27.8.2026 ilta), ja sen mukana
 * lähti leikkauksen syy. Sääntö on nyt "YKSI KERRALLAAN" eikä "yksi per
 * maa": pooli saa olla minkä mittainen tahansa, mutta kartalla tuikkii
 * aina tasan yksi piste — poolin ensimmäinen katsomaton (nostoVuorossa).
 * Seuraava syttyy vasta kun edellinen on luettu.
 */

/**
 * MITKÄ POOLIN NOSTOT OVAT YHÄ TARJOLLA — riippumatta siitä, onko ruutu
 * vapaa?
 *
 * AARRE EI ENÄÄ OLE NÄKYVYYDEN EHTO (omistajan linjaus 28.8.2026 ilta:
 * *"Täkyt voisi olla aina näkyvissä. Niihin vain kiinnitetään huomio
 * aarteen löytymisen jälkeen."*). Ennen tätä lista oli tyhjä niin kauan
 * kuin lehtilukko oli kiinni, ja koko maan täkyaineisto oli piilossa
 * pelaajalta, joka olisi halunnut tutkia karttaa ensin. Nyt pisteet
 * piirtyvät samasta hetkestä kuin kartan muutkin kohteet siinä maassa ja
 * ovat avattavissa heti; AARRE RATKAISEE VAIN HUOMION — tuikkeen ja
 * Livian vihjeen (nostoTuikeSallittu).
 *
 * Kaksi ehtoa, molemmat pakollisia:
 *   1. fokusmoodi on päällä ja pelaaja on ihminen;
 *   2. nosto on lukematon (laitteen muisti) ja ohittamaton (istunto).
 *
 * FOKUSVIRTASISÄLTÖ EI OLE ENÄÄ EHTO (v1298). Ehto 1 luettiin tähän asti
 * kaupungin fokusvirtarivin olemassaolosta (fokusvirtaSisalto), mikä oli
 * oikea mitta niin kauan kuin täkyjä oli vain kaupungeilla, joilla se
 * rivi on: Ateenalla ja Sofialla. Kun maapooliin (NOSTO_MAAT) tuli
 * v1297:ssä kymmenen täkyä neljään maahan, portti jäi kiinni — Madridilla,
 * Wienillä, Pariisilla eikä Berliinillä ole riviä js/packs/fokusvirrat.js:
 * ssä, joten niiden pisteet eivät piirtyneet kartalle lainkaan. Raamatun
 * linjaus on kuitenkin *"pisteet ovat aina näkyvissä kartalla"*, eikä
 * täyn näkyvyys saa riippua siitä, annosteleeko kaupunki lisäksi
 * fokusvirtaa. Ehto 1 mitataan siksi suoraan siitä, mitä se tarkoitti:
 * fokusmoodi päällä (fokusmoodiPaalla) ja pelaaja ihminen — samat kaksi
 * tarkistusta, jotka fokusvirtaSisalto teki ennen kaupunkihakua.
 *
 * LUNASTETTU TÄKY PYSYY KARTALLA (omistajan löydös 28.8.2026 ilta:
 * Sofian katsottu areenatäky katosi kartalta eikä rikastettua korttia
 * päässyt enää avaamaan — "aina näkyvissä" tarkoittaa myös luettuja).
 * Luettuja EI siis karsita piirtolistasta: kortin saa auki uudelleen.
 * Karsinta koskee vain istunnossa ohitettuja. Huomionvuorottelu ("yksi
 * kerrallaan") ja "ennen aarretta katsotut eivät ala tuikkia" hoituvat
 * nostoVuorossa-valinnassa, joka lukee laitteen luetut-muistin itse.
 */
function nostoJaljella(ui) {
  if (typeof document === 'undefined') return [];
  if (!ui || ui.dead || ui.katselu) return [];
  const city = ui.game?.cityOf?.();
  if (!city || !ui.game || ui.game.player?.isBot) return [];
  if (!fokusmoodiPaalla()) return [];
  const pooli = nostoMaanPooli(ui, city);
  if (!pooli) return [];
  const ohitetut = ui.fokusnostoOhitetut ?? new Set();
  return pooli.filter((n) => !ohitetut.has(n.id));
}

/**
 * MIKÄ TÄKY TUIKKII JUURI NYT?
 *
 * POOLIN ENSIMMÄINEN KATSOMATON (omistajan tilaus 27.8.2026 ilta:
 * *"uusi piste tuikkii kun edellinen on katsottu"*). Piirtolista
 * sisältää 28.8. illasta alkaen myös luetut (ne pysyvät kartalla ja
 * aukeavat uudelleen), joten katsomattomuus tarkistetaan tässä:
 * vuorossa on listan ensimmäinen, jota laitteen muisti ei tunne
 * luetuksi. Kaikki luettu → ei vuorossa olevaa, ei tuiketta.
 *
 * ISTUNTOKIINTIÖ POISTUI KUPLAN MUKANA. Lippu `fokusnostoKuplaNahty`
 * salli istunnossa vain yhden täyn (omistajan tilaus v1119: *"Ruudulle
 * saa tulla VAIN YKSI täkykupla, eikä sen jälkeen enempää kuplia"*) —
 * sääntö koski nimenomaan RUUDULLE PONNAHTAVAA kuplaa. Piste ei
 * ponnahda eikä peitä mitään: se on kartan merkintä, joka odottaa
 * napautusta, joten kiintiölle ei ole enää perustetta.
 */
function nostoVuorossa(ui, jaljella) {
  const luetut = nostoLuetut();
  return jaljella.find((n) => !luetut.has(n.id)) ?? null;
}

/**
 * SAAKO KARTALLA TUIKKIA — eli onko MAAN AARRE LÖYTYNYT?
 *
 * Omistajan linjaus 28.8.2026 ilta: *"Täkyt voisi olla aina näkyvissä.
 * Niihin vain kiinnitetään huomio aarteen löytymisen jälkeen."* Ennen
 * aarretta pisteet ovat siis kartalla hiljaisina merkintöinä — samat
 * merkit, sama napautus, ei tuiketta eikä Livian vihjettä — koska
 * pelaajalla on kesken toinen asia eikä täky saa kilpailla siitä.
 * Laatan kääntyessä lehtilukko aukeaa (fokusvirtaLukitseeLehden
 * palauttaa false), ja samasta hetkestä huomio-ohjaus kytkeytyy päälle.
 */
function nostoTuikeSallittu(ui) {
  const city = ui?.game?.cityOf?.();
  return !!city && !fokusvirtaLukitseeLehden(ui, city);
}

/* ==================== PAIKKA LAUDALLA ==================== */

/**
 * NOSTON PAIKKA TÄLLÄ LAUDALLA, tai null.
 *
 * Kenttä on valinnainen ja se annetaan kahdessa muodossa: `paikka.laudat`
 * (eri koordinaatit maailmankartalle ja maanosalaudalle, kuten
 * kohtaamispisteellä ja kartan kohteilla) tai suoraan `{x, y}`, jos
 * paketti palvelee vain yhtä lautaa.
 *
 * VARAPAIKKA ON KAUPUNKI (27.8.2026 ilta). Kun täky oli puhekupla,
 * paikaton täky sai alalaidan liuskan — kupla ilman ankkuria olisi ollut
 * pahempi kuin ankkuroimaton liuska. Piste ei ole samalla tavalla
 * vaativa: sen lupaus on *"tässä maassa on jotain katsottavaa"*, ja
 * kaupunki on maan oikea osoite silloinkin, kun jutun tarkkoja
 * koordinaatteja ei ole laskettu. PÄÄLLEKKÄISYYS EI JÄÄ TÄHÄN: piste
 * piirtyy lähimmän kohdesymbolin päälle (js/fokusnosto-symbolit.js),
 * ja kaupungin ryppään symbolit ovat jo katkoviivan päässä omassa
 * sarakkeessaan (js/fokusniput.js) — laatan päälle piste ei siis päädy
 * silloinkaan, kun sen oma paikka on kaupungin koordinaatti.
 *
 * Ilman kaupunkiakin (katselutila, laudan vaihto) palautuu null, ja
 * silloin piirtyy vanha alalaidan liuska.
 */
function nostonPaikka(ui, nosto) {
  const paikka = nosto?.paikka;
  const lauta = ui?.game?.pack?.id;
  const koordit = paikka ? (paikka.laudat ? paikka.laudat[lauta] : paikka) : null;
  if (Number.isFinite(koordit?.x) && Number.isFinite(koordit?.y)) {
    return { x: koordit.x, y: koordit.y, nimi: paikka.nimi ?? null };
  }
  const city = ui?.game?.cityOf?.();
  if (Number.isFinite(city?.x) && Number.isFinite(city?.y)) {
    return { x: city.x, y: city.y, nimi: city.name ?? null };
  }
  return null;
}

/**
 * TUIKKIVAN PISTEEN MERKINTÄ, tai null jos täylle ei löydy paikkaa
 * tältä laudalta (silloin piirtyy alalaidan liuska).
 *
 * SYMBOLIA EI ENÄÄ LUETA. Merkintä kantoi ennen täyn `symboli`-kentän
 * (Raamatun SYMBOLITAKSONOMIAN kategoria), jonka mukaan kartalle
 * piirtyi huutomerkki tai pöllönpoikanen. Kartalla täky on nyt pelkkä
 * keltainen piste (omistajan tilaus 27.8.2026 ilta), joten kenttä jää
 * tässä lukematta — datassa se säilyy, ja taksonomia elää kartan
 * kohdemerkeissä ja korttien ylärivillä entiseen tapaan.
 */
function nostonMerkinta(ui, nosto, luetut) {
  const paikka = nosto ? nostonPaikka(ui, nosto) : null;
  if (!paikka) return null;
  /*
   * `kohde` kulkee kerrokselle asti, koska PISTE RATSASTAA SYMBOLIN
   * PÄÄLLÄ (js/fokusnosto-symbolit.js, osio PISTE AINA SYMBOLIN
   * PÄÄLLE): nimetty kohde on pisteen ankkuri, ja ilman sitä ankkuriksi
   * kelpaa lähin kohdemerkki. Kumpikaan valinta ei kuulu tänne — tämä
   * tiedosto kertoo missä juttu tapahtui, kerros kertoo minkä merkin
   * päällä se näytetään.
   */
  /*
   * LUETTU KULKEE MERKINNÄSSÄ (omistajan löydös 28.8.2026 ilta). Luettu
   * täky pysyy kartalla, mutta se ei saa viedä ankkurikohteensa
   * napautusta pysyvästi: kerros siirtää luetun pisteen symbolin
   * VIEREEN ja piirtää sen vaimeana (js/fokusnosto-symbolit.js, osio
   * PISTE AINA SYMBOLIN PÄÄLLE). Tieto luetaan laitteen muistista
   * kerran koko piirtoa kohti ja annetaan tässä valmiina, jottei kerros
   * tarvitse tietoa muistin avaimesta.
   *
   * `nimio` on täyn LYHYT NIMI KARTALLA (omistajan lisätilaus 28.8.2026
   * ilta: *"täkypisteessä saisi olla myös teksti näkyvissä"*).
   * Valinnainen: ilman kenttää piste on entiseen tapaan pelkkä piste.
   */
  return {
    id: nosto.id,
    otsikko: nosto.otsikko,
    paikka,
    kohde: nosto.kohde ?? null,
    nimio: nosto.nimio ?? null,
    luettu: !!luetut?.has(nosto.id),
  };
}

/**
 * ONKO RUUTU VAPAA NOSTOLLE?
 *
 * Nosto on houkutus eikä pelin portti, joten se väistää kaiken, mikä on
 * pelaajalla kesken:
 *   - <dialog>: lehti, aarrelappu, valikko;
 *   - lento tai kamera-ajo (kartan muutkin kelluvat merkinnät väistyvät);
 *   - PÖLLÖN KUPLA JA FOKUSVIRRAN KORTTI. Aarrekuittaus tulee samasta
 *     hetkestä kuin nosto itse (js/fokusvirta.js aarreLoytyi) ja kupla
 *     nousee samaan alalaitaan. Kaksi kelluvaa paperia päällekkäin oli
 *     omistajan pelitesteissä toistuva vika, ja järjestys on tässä
 *     luonnostaan oikea: ensin pöllö sanoo sanottavansa, sitten otsikko
 *     nousee. Kuplan sulkeminen ajaa tämän päivityksen heti
 *     (js/fokusvirta.js suljeFokusvirta), eikä nosto siis jää odottamaan
 *     seuraavaa piirtoa.
 */
function nostoRuutuVapaa() {
  if (document.querySelector('dialog[open]')) return false;
  if (document.querySelector('.fokusvirta-kupla, .fokusvirta-kortti')) return false;
  if (document.querySelector('.fokuszoom, .fokuskohde-popup')) return false;
  return !(document.body.classList.contains('flight-active')
    || document.body.classList.contains('kartalento'));
}

/**
 * UUSI YRITYS, KUN RUUTU ON VARATTU.
 *
 * Sama kaava ja sama perustelu kuin pöllön aarrekuittauksella
 * (js/fokusvirta.js kerroAarteesta): peli ei kutsu piirtoa joka kerta
 * kun jokin kelluva pinta sulkeutuu, joten yritystä toistetaan — mutta
 * katto pitää huolen siitä, ettei ajastin jää pyörimään, jos pelaaja
 * jää lukemaan lehteä tai lähtee valikkoon. Seuraava piirto aloittaa
 * uuden yrityssarjan.
 */
const NOSTO_YRITYS_MS = 900;
const NOSTO_YRITYKSIA = 30;
/*
 * Hengähdys sen jälkeen kun ruutu vapautui (pöllön kuittauskupla,
 * lehti, lento). Omistajan tilaus v1119: *"muutaman sekunnin viive
 * pöllön kuplan jälkeen"*.
 */
const NOSTO_KUPLAN_VIIVE_MS = 2600;

/* ==================== NOSTON PIIRTO ==================== */

/**
 * KYTKENTÄ RENDERIIN (js/fokusvirta.js asetaNostopinta → kutsutaan
 * fokusvirtaSaapumisesta, jonka js/ui.js render ajaa joka piirrossa).
 *
 * TYÖ TEHDÄÄN VAIN KUN NOSTO VAIHTUU. Ruudulla oleva nosto jätetään
 * rauhaan, jottei se aloita nousuanimaatiotaan alusta joka piirrossa.
 * Sama sääntö on ankkurikerroksella: se vertaa omaa avaintaan eikä pura
 * yhtäkään solmua turhaan.
 */
export function paivitaFokusnosto(ui, yritys = 0) {
  if (typeof document === 'undefined' || !ui) return;
  clearTimeout(ui.fokusnostoAjastin);
  const jaljella = nostoJaljella(ui);
  if (!jaljella.length) {
    suljeFokusnosto(ui);
    return;
  }
  nostoLataaTyyli();
  const nosto = nostoVuorossa(ui, jaljella);
  /*
   * KAIKKI MAAN KATSOMATTOMAT PISTEET KARTALLE (omistajan linjaus
   * 28.8.2026 ilta). Kerros saa listan ja sen lisäksi tiedon siitä, MIKÄ
   * niistä tuikkii — napautuksen työ annetaan merkinnän mukana valmiina,
   * jotta kerros ei tarvitse tietoa poolista eikä lunastuksesta.
   */
  const merkinnat = [];
  const luetut = nostoLuetut();
  for (const n of jaljella) {
    const m = nostonMerkinta(ui, n, luetut);
    if (m) merkinnat.push({ ...m, avaa: () => avaaNosto(ui, n) });
  }
  /*
   * HUOMIO VASTA AARTEEN JÄLKEEN: ennen sitä `tuikkiva` on null, jolloin
   * kaikki pisteet ovat kartalla hiljaisina eikä Livia sano mitään.
   */
  const tuike = nostoTuikeSallittu(ui);
  const vuorossa = tuike && merkinnat.some((m) => m.id === nosto?.id) ? nosto.id : null;
  paivitaNostosymbolit(ui, { merkinnat, tuikkiva: vuorossa });
  if (merkinnat.length) {
    // Pisteet ovat kartalla: vahti pitää mittakaavan ajan tasalla, eikä
    // ruudulle jää mitään pintaa — ei kuplaa eikä liuskaa.
    nostoVahdiKarttaa(ui);
    nostoPintaPois(ui);
    if (vuorossa) nostoLivianVihje(ui);
    return;
  }
  /*
   * VARAPOLUN LIUSKA ON HUOMIOKEINO, joten se odottaa aarretta kuten
   * tuikekin: ilman aarretta paikaton täky jää yksinkertaisesti pois.
   */
  if (!tuike) {
    nostoLopetaVahti(ui);
    nostoPintaPois(ui);
    return;
  }
  /*
   * VARAPOLKU ILMAN PAIKKAA: alalaidan liuska. Se on ruudun elementti
   * eikä liiku kartan mukana, joten vahtia ei tarvita — ja koska se
   * peittää kartan alalaidan, se väistää kaiken, mikä on pelaajalla
   * kesken (nostoRuutuVapaa) täsmälleen kuten ennen.
   *
   * Liuska on huomiokeino: kun kaikki on jo luettu, vuorossa olevaa ei
   * ole (nosto on null) eikä liuskaa nosteta — luetut elävät vain
   * kartan pisteinä.
   */
  nostoLopetaVahti(ui);
  if (!nosto) {
    nostoPintaPois(ui);
    return;
  }
  if (!nostoRuutuVapaa()) {
    nostoPintaPois(ui);
    ui.fokusnostoRuutuOliVarattu = true;
    if (yritys < NOSTO_YRITYKSIA) {
      ui.fokusnostoAjastin = setTimeout(
        () => paivitaFokusnosto(ui, yritys + 1), NOSTO_YRITYS_MS,
      );
    }
    return;
  }
  /*
   * HENGÄHDYS PÖLLÖN KUPLAN JÄLKEEN (omistajan tilaus v1119, kohta
   * 20b: *"ENSIMMÄINEN täkynosto tulee kartalle heti kun aarre on
   * löytynyt JA pöllön kuittauskupla on näytetty — muutaman sekunnin
   * viive pöllön kuplan jälkeen"*).
   *
   * Ruutu vapautui juuri: liuskaa ei nosteta samassa silmänräpäyksessä
   * kuin edellinen pinta katosi, vaan sen verran myöhemmin että pelaaja
   * ehtii nähdä kartan välissä.
   */
  if (ui.fokusnostoRuutuOliVarattu) {
    ui.fokusnostoRuutuOliVarattu = false;
    ui.fokusnostoAjastin = setTimeout(() => paivitaFokusnosto(ui), NOSTO_KUPLAN_VIIVE_MS);
    return;
  }
  /*
   * RUUDULLA OLEVA LIUSKA JÄTETÄÄN RAUHAAN, jottei se aloita
   * nousuanimaatiotaan alusta joka piirrossa.
   */
  if (ui.fokusnosto?.avain === nosto.id && ui.fokusnosto.el?.isConnected) return;
  nostoPintaPois(ui);
  ui.fokusnosto = { avain: nosto.id, id: nosto.id, el: piirraNosto(ui, nosto) };
}

/**
 * TÄKY AUKI — sama työ napautettiinpa kartan pistettä tai varapolun
 * liuskaa.
 *
 * Järjestys on tarkka: täky merkitään luetuksi ENNEN pinnan sulkemista,
 * jotta sulkemisen laukaisema päivitys ei enää löydä samaa täkyä
 * jäljellä olevaksi ja sytytä sen pistettä uudelleen. Seuraava
 * katsomaton syttyy vasta kun kortti suljetaan (suljeNostonKortti).
 */
function avaaNosto(ui, nosto) {
  if (!nosto) return;
  sfx.play('paper');
  nostoMerkitseLuetuksi(nosto.id);
  suljeFokusnosto(ui);
  avaaNostonKortti(ui, nosto);
}

/* ==================== LIVIAN HUOMAUTUS ==================== */

/**
 * LIVIA KOMMENTOI ENSIMMÄISTÄ VILKKUVAA TÄKYÄ (omistajan tilaus
 * 27.8.2026 ilta: *"pulu voisi kommentoida ensimmäistä vilkkuvaa
 * täkyä"*).
 *
 * Piste on pieni ja hiljainen — se on koko pointti — mutta ensimmäisellä
 * kerralla pelaaja ei tiedä, että kartalla on nyt uusi merkkilaji.
 * Yksi kupla riittää: mekaniikka opitaan kerran, ja sen jälkeen piste
 * puhuu puolestaan.
 *
 * REPLIIKKI ON LIVIAN ÄÄNTÄ (Raamattu, PULU-KOKEILU): asiantunteva
 * viestinviejä, joka puolustautuu refleksinä ja on ylpeä työnsä
 * tarkkuudesta — ei huutomerkkejä. Se VIHJAA eikä paljasta: kartalla
 * tuikkii jotain katsomisen arvoista, mutta mitä, se selviää vasta
 * napautuksesta.
 *
 * SAMA MEKANISMI KUIN SAAPUMISKUPLILLA (js/ui.js saapumisenKuplat):
 * polloVihje, viive ja ruudun vapaus. Jos ruutu ei ole vapaa kun viive
 * kuluu umpeen, lippu palautuu ja seuraava piirto yrittää uudelleen —
 * kupla ei siis huku pöllön kuittauksen tai lehden alle.
 */
const NOSTO_LIVIAN_VIHJE = 'Kartalla tuikkii keltanen piste. Se on '
  + 'minun leikekirjastani, ja minä tarkistin sen kahdesti — kannattaa '
  + 'käydä kattomassa ennen kun matkustat eteenpäin.';

function nostoLivianVihje(ui) {
  if (!ui || ui.fokusnostoVihjeNahty) return;
  ui.fokusnostoVihjeNahty = true;
  clearTimeout(ui.fokusnostoVihjeAjastin);
  ui.fokusnostoVihjeAjastin = setTimeout(() => {
    if (!ui || ui.dead) return;
    // Ruutu varattu (pöllön kuittaus, lehti, lento): lippu takaisin,
    // seuraava piirto yrittää uudelleen.
    if (!nostoRuutuVapaa()) { ui.fokusnostoVihjeNahty = false; return; }
    polloVihje(NOSTO_LIVIAN_VIHJE);
  }, NOSTO_KUPLAN_VIIVE_MS);
}

/**
 * Liuska pois ruudulta — kartan tuikkiva piste jää.
 *
 * SIIVOUS TEHDÄÄN VALITSIMELLA eikä pelkällä muistiin jääneellä
 * viitteellä: uusi peli rakentaa uuden UI-olion (js/main.js), jolloin
 * vanha viite katoaa mutta pinta jäisi bodyyn roikkumaan.
 */
function nostoPintaPois(ui) {
  if (ui) ui.fokusnosto = null;
  if (typeof document === 'undefined') return;
  for (const vanha of document.querySelectorAll('.fokusnosto')) vanha.remove();
}

/**
 * Nosto pois ruudulta kokonaan: liuska, kartan tuikkiva piste ja kartan
 * liikkeen vahti. Muistiin ei kosketa — se on eri asia.
 */
export function suljeFokusnosto(ui) {
  nostoPintaPois(ui);
  nostoLopetaVahti(ui);
  nollaaNostosymbolit(ui);
}

/* ==================== KARTAN LIIKE ==================== */

/**
 * PISTE SEURAA KARTTAA ILMAN UUTTA PIIRTOA.
 *
 * Panorointi on CSS-muunnos kartan SVG:llä (js/kartta.js asetaPan) ja
 * zoomi kirjoittaa sen `viewBox`-attribuutin — kummastakaan ei seuraa
 * kutsua tähän moduuliin. Vahti kuuntelee siis suoraan noita kahta
 * attribuuttia ja niputtaa työn yhteen requestAnimationFrameen: kaksi
 * setAttributea ryhmää kohti ja yksi ankkurin mittaus. Uusia solmuja ei
 * synny, joten kesken eleen ei ladota mitään.
 *
 * Vahti on IDEMPOTENTTI: se asennetaan kerran samalle SVG:lle, ja
 * laudan vaihto (uusi SVG) asentaa sen uudelleen.
 */
function nostoVahdiKarttaa(ui) {
  if (typeof document === 'undefined' || !ui?.svg) return;
  if (ui.fokusnostoVahti && ui.fokusnostoVahtiSvg === ui.svg) return;
  nostoLopetaVahti(ui);
  /*
   * PANOROINTI EI KOSKE PISTEESEEN LAINKAAN. Piste on laudan
   * koordinaateissa, joten se liikkuu kartan mukana itsestään; vain
   * MITTAKAAVA on laskettava uusiksi, ja se näkyy `viewBox`issa, jonka
   * kartta kirjoittaa aina kun zoomi muuttuu (js/kartta.js fitViewBox,
   * sovitaAloitusZoom). Attribuutin lukeminen ei pakota tyylinlaskentaa;
   * ui.nakyvaAlue() mittaisi kaksi laatikkoa turhaan joka kehyksellä.
   *
   * KUPLAN MUKANA LÄHTI PUOLET VAHDISTA (27.8.2026 ilta): kuoren
   * siirtoa, ikkunan kokoa ja ankkurin ruutupaikkaa ei enää tarvitse
   * seurata, koska mitään ruutuun ankkuroitua pintaa ei ole.
   */
  const asemoi = () => {
    const laatikko = ui.svg?.getAttribute('viewBox') ?? '';
    if (laatikko === ui.fokusnostoViewBox) return;
    ui.fokusnostoViewBox = laatikko;
    asemoiNostosymbolit(ui);
  };
  const pyyda = () => {
    if (ui.fokusnostoKehys) return;
    const rAF = globalThis.requestAnimationFrame;
    if (!rAF) { asemoi(); return; }
    ui.fokusnostoKehys = rAF(() => {
      ui.fokusnostoKehys = 0;
      asemoi();
    });
  };
  const vahti = typeof MutationObserver === 'undefined' ? null : new MutationObserver(pyyda);
  vahti?.observe(ui.svg, { attributes: true, attributeFilter: ['viewBox'] });
  ui.fokusnostoVahtiSvg = ui.svg;
  ui.fokusnostoVahti = () => {
    vahti?.disconnect();
    if (ui.fokusnostoKehys) globalThis.cancelAnimationFrame?.(ui.fokusnostoKehys);
    ui.fokusnostoKehys = 0;
  };
}

/** Vahti pois. Jokainen lisätty kuuntelija on purettava. */
function nostoLopetaVahti(ui) {
  if (!ui) return;
  ui.fokusnostoVahti?.();
  ui.fokusnostoVahti = null;
  ui.fokusnostoVahtiSvg = null;
  ui.fokusnostoViewBox = null;
}

/**
 * ALALAIDAN LIUSKA — VARAPOLKU ILMAN PAIKKAA.
 *
 * Alkuperäinen esitystapa: yksi lause ja sen PERÄSSÄ pieni kuva, koko
 * liuska yhtenä painikkeena, rasti sen kyljessä. Tämä piirtyy enää
 * silloin, kun nostolla ei ole `paikka`-kenttää tälle laudalle — kupla
 * ilman ankkuria olisi pahempi kuin ankkuroimaton liuska. EI POISTETA
 * (omistajan tilaus): uusi maa saattaa tulla peliin ennen kuin sen
 * täkyjen koordinaatit on laskettu.
 */
function piirraNosto(ui, nosto) {
  const liuska = html('div', 'fokusnosto');
  liuska.setAttribute('role', 'group');
  liuska.setAttribute('aria-label', 'Täkynosto');
  liuska.append(nostoKlikkiotsikko(ui, nosto), nostoRasti(ui, nosto));

  document.body.appendChild(liuska);
  // Nousu alkaa vasta seuraavassa kehyksessä: ilman pakotettua
  // tyylinlaskentaa selain niputtaa lähtö- ja maalitilan samaan
  // kehykseen eikä näe niiden välillä eroa (sama oppi kuin fokusvirran
  // suurennoksella).
  void liuska.offsetWidth;
  liuska.classList.add('fokusnosto-nousee');
  return liuska;
}

/**
 * KLIKKIOTSIKKO + MINIATYYRI YHTENÄ PAINIKKEENA — sama pala kuplassa ja
 * liuskassa. Otsikkotaso, teksti ja kuva ovat samat kummassakin; vain
 * kehys ympärillä vaihtuu (omistajan tilaus: *"sama otsikkoteksti +
 * miniatyyri, klikkiotsikkotaso säilyy"*).
 *
 * KUPLASSA PAINIKE ON ITSE PAPERI. Omistaja 26.8.2026 ilta: *"kun täkyä
 * painaa niin sen pitäisi aueta suoraan pop upiksi"* — jos painike olisi
 * kuplan sisällä oma laatikkonsa, paperin reunoille jäisi kuollutta
 * pintaa, joka ei tee mitään. Siksi kutsuja antaa valmiin elementin
 * (`nappi`), ja kuplassa se on `.fokusnosto-kuplapaperi` itse.
 */
function nostoKlikkiotsikko(ui, nosto, nappi = html('button', 'fokusnosto-nappi')) {
  nappi.type = 'button';
  nappi.setAttribute('aria-label', `${nosto.otsikko} — lue lisää`);
  nappi.appendChild(html('span', 'fokusnosto-otsikko', nosto.otsikko));
  if (nosto.kuva) {
    const mini = document.createElement('img');
    mini.className = 'fokusnosto-mini';
    mini.alt = '';
    mini.decoding = 'async';
    mini.draggable = false;
    // Rikkinäinen kuva ei saa jättää tyhjää laatikkoa otsikon perään:
    // otsikko kantaa noston yksinkin.
    asetaNostonKuva(mini, nosto.kuva, NOSTO_MINI_PX, () => mini.remove());
    nappi.appendChild(mini);
  }
  nappi.addEventListener('click', () => avaaNosto(ui, nosto));
  return nappi;
}

/**
 * RASTI — noston voi työntää syrjään lukematta, ja silloin se ei nouse
 * enää tässä istunnossa (`fokusnostoOhitetut`, ei laitteen muisti).
 */
function nostoRasti(ui, nosto) {
  const sulje = html('button', 'fokusnosto-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Piilota';
  sulje.setAttribute('aria-label', 'Piilota täkynosto');
  sulje.addEventListener('click', () => {
    sfx.play('paper');
    (ui.fokusnostoOhitetut ??= new Set()).add(nosto.id);
    suljeFokusnosto(ui);
    paivitaFokusnosto(ui);
  });
  return sulje;
}

/* ==================== LUNASTUSKORTTI ==================== */

/**
 * NOSTON OMA KORTTI — tässä otsikon lupaus lunastetaan.
 *
 * Kortti on kartan päällä kelluva paperi, ei koko ruudun modaali: sama
 * sääntö kuin fokusvirran kortilla — kartta on näkymä, teksti on annos
 * sen päällä. Napautus kortin ulkopuolelle tai Esc sulkee, ja
 * sulkemisen jälkeen poolin seuraava nosto saa nousta.
 */
function avaaNostonKortti(ui, nosto) {
  nostoLataaTyyli();
  suljeNostonKortti(ui);

  const kerros = html('div', 'fokusnosto-kerros');
  const kortti = html('div', 'fokusnosto-kortti');
  kortti.setAttribute('role', 'dialog');
  kortti.setAttribute('aria-modal', 'false');
  kortti.setAttribute('aria-label', nosto.otsikko);

  const sulje = html('button', 'fokusnosto-kortti-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', 'Sulje');
  kortti.appendChild(sulje);

  const sisalto = html('div', 'fokusnosto-sisalto');
  // Ylärivi kertoo KUKA nostoa tarjoaa: pöllö on ikivanha
  // silminnäkijä-reportteri, ja täkynostot ovat sen heiniä (Raamattu,
  // PÖLLÖN KARAKTÄÄRI).
  sisalto.appendChild(html('p', 'fokusnosto-ylarivi', 'Livian leikekirja'));
  sisalto.appendChild(html('h3', 'fokusnosto-kortti-otsikko', nosto.otsikko));
  if (nosto.kuva) piirraNostonKuva(sisalto, nosto.kuva);
  const teksti = html('div', 'fokusnosto-teksti');
  for (const kappale of jaaKappaleiksi(nosto.teksti)) {
    teksti.appendChild(html('p', '', kappale));
  }
  sisalto.appendChild(teksti);
  if (nosto.valokuva) piirraNostonValokuva(sisalto, nosto.valokuva);
  if (nosto.lahde) sisalto.appendChild(html('p', 'fokusnosto-lahde', nosto.lahde));

  /*
   * KOHDENAPPI, KUN KARTALLA ON SAMA PAIKKA. Nosto *"houkuttelee
   * kohteen auki"* (omistajan tilaus), ja kun kohteella on jo oma
   * karttamerkki, sinne mennään pelin omalla tietoruudulla eikä uudella
   * pinnalla. Kortti sulkeutuu samalla: kaksi korttia päällekkäin olisi
   * juuri sitä raskautta, jota kevyt kulku purkaa.
   */
  const kohde = nostonKarttakohde(ui, nosto);
  if (kohde) {
    const nappi = html('button', 'fokusnosto-kohdenappi', `Katso ${kohde.nimi} kartalla`);
    nappi.type = 'button';
    nappi.addEventListener('click', () => {
      suljeNostonKortti(ui);
      avaaFokuskohde(ui, kohde);
    });
    sisalto.appendChild(nappi);
  }

  piirraNostonKysymykset(ui, sisalto, nosto);

  kortti.appendChild(sisalto);
  kerros.appendChild(kortti);
  document.body.appendChild(kerros);

  const kiinni = () => {
    sfx.play('paper');
    suljeNostonKortti(ui);
  };
  sulje.addEventListener('click', kiinni);
  /*
   * Napautus kortin ULKOPUOLELLE sulkee; kortin päällä se ei tee mitään,
   * jotta tekstiä voi valita ja nappeja painaa.
   *
   * Sulkeva napautus jää tähän kerrokseen: kerros katoaa jo
   * pointerdownissa, ja ilman nielua selain etsisi saman napautuksen
   * click-kohteen vasta sormen noustessa — kartalta kerroksen alta
   * (sama vuoto kuin pöllön kuplissa, ks. ui-apurit
   * nielaiseSulkevaNapautus).
   */
  kerros.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.target?.closest?.('.fokusnosto-kortti')) return;
    nielaiseSulkevaNapautus(tapahtuma);
    kiinni();
  });
  const nappain = (tapahtuma) => {
    if (tapahtuma.key !== 'Escape') return;
    tapahtuma.stopPropagation();
    suljeNostonKortti(ui);
  };
  document.addEventListener('keydown', nappain, true);

  ui.fokusnostoKortti = {
    kerros,
    purku: () => document.removeEventListener('keydown', nappain, true),
  };
  void kerros.offsetWidth;
  kerros.classList.add('fokusnosto-kortti-auki');
  sfx.play('paper');
}

/**
 * KOHDE KARTALLA — vain jos sinne oikeasti pääsee juuri nyt.
 *
 * Tietoruutu asemoidaan kohteen karttamerkin viereen (js/fokuskohteet.js
 * asetaKohteenPaikka), joten ilman merkkiä se jäisi ruudun nurkkaan
 * ilman ankkuria. Merkit myös SAMMUVAT, kun fokuslehti ei täytä riittävää
 * osaa näkymästä, ja silloin niiden kerros sulkee avatun ruudun heti.
 * Kummassakin tapauksessa nappi jää pois eikä lupaa mitään, mitä
 * napautus ei tekisi.
 *
 * VAIN DATAN OMA `kohde` (omistajan päätös 28.8.2026). Nappi luki ennen
 * myös sitä kohdemerkkiä, jonka PÄÄLLÄ piste sattui tuikkimaan
 * (js/fokusnosto-symbolit.js valitsee ankkuriksi lähimmän merkin, kun
 * täyllä ei ole omaa kohdetta). Ankkuri on esityksen apuväline eikä
 * täyn aihe, ja lähin naapuri on usein aivan toinen asia: Sofian
 * areenakortti tarjosi *"Katso Sofian moskeijat kartalla"*. Nappi lupasi
 * siis jutun kohteen ja vei muualle, mikä on juuri se klikkihuijaus,
 * jota tämän kortin ensimmäinen sääntö kieltää. PISTEEN SIJOITTELUUN EI
 * KOSKETA: ankkuri ohjaa yhä sitä, minkä merkin päällä piste piirtyy.
 */
function nostonKarttakohde(ui, nosto) {
  const tunnus = nosto?.kohde ?? null;
  if (!tunnus) return null;
  if (!ui?.fokuskohdeMerkit?.get(tunnus)?.length) return null;
  if (ui.fokuskohdeKerros?.classList?.contains('fokuskohteet-piilossa')) return null;
  // Nykyisen maan taulu ensin (js/fokuskohteet.js): se palvelee kaikkia
  // maita, kun taas suora tuonti tuntee vain Kreikan kohteet.
  return ui.fokuskohdeTiedot?.get(tunnus) ?? fokuskohteet([tunnus])[0] ?? null;
}

/** Kortti pois, kuuntelijat puretaan ja poolin seuraava saa nousta. */
export function suljeNostonKortti(ui) {
  const auki = ui?.fokusnostoKortti;
  if (ui) ui.fokusnostoKortti = null;
  auki?.purku?.();
  if (typeof document !== 'undefined') {
    for (const vanha of document.querySelectorAll('.fokusnosto-kerros')) vanha.remove();
  }
  if (auki) paivitaFokusnosto(ui);
}

/**
 * KAKSI KUVALÄHDETTÄ, KAKSI PORRASTA (sama jako kuin kartan kohteilla,
 * js/fokuskohteet.js asetaKohdeKuva).
 *
 * `tiedosto` on Commons-nimi ja kulkee median asettajan läpi, joka
 * uusii pyynnön ennen kuin luovuttaa — oikea sääntö yskähtävälle
 * palvelimelle. `osoite` on repon oma generoitu havainnekuva
 * (assets/kartat/nostot/), jolla ei ole varareittiä: se joko on tai ei
 * ole, joten uusinta vain jättäisi kortille tyhjän kehyksen.
 */
function asetaNostonKuva(img, kuva, leveys, onVirhe) {
  if (kuva.osoite) {
    img.addEventListener('error', () => onVirhe(), { once: true });
    img.src = kuva.osoite;
    return;
  }
  asetaKuva(img, valokuvaUrl(kuva.tiedosto, leveys),
    valokuvaVara(kuva.tiedosto, leveys), onVirhe);
}

/** Kortin kuva selitteineen ja lähteineen (CC BY vaatii tekijän). */
function piirraNostonKuva(kohde, kuva, luokka = 'fokusnosto-kuva', leveys = NOSTO_KUVA_PX) {
  const kehys = html('figure', luokka);
  const img = document.createElement('img');
  img.alt = kuva.selite ?? '';
  img.decoding = 'async';
  img.draggable = false;
  const piilota = () => { kehys.hidden = true; };
  asetaNostonKuva(img, kuva, leveys, piilota);
  kehys.appendChild(img);
  const teksti = html('figcaption', 'fokusnosto-kuvateksti');
  teksti.append(
    html('span', 'fokusnosto-kuvaselite', kuva.selite ?? ''),
    html('span', 'fokusnosto-kuvalahde', kuva.lahde ?? ''),
  );
  kehys.appendChild(teksti);
  kohde.appendChild(kehys);
}

/**
 * KAKKOSKUVA TEKSTIN ALLE — "näin se löytyi" (omistajan päätös
 * 28.8.2026).
 *
 * Pääkuva on nyt loistoaikahavainnekuva, joka kertoo mitä paikassa
 * TAPAHTUI; nykytilan valokuva on todiste siitä, mitä siitä on jäljellä,
 * ja se kuuluu vasta jutun jälkeen ja pienempänä. Sama kehys ja sama
 * kuvateksti kuin pääkuvalla, joten CC-attribuutio kulkee mukana
 * sellaisenaan — lisenssiehto ei jousta koon mukaan.
 */
function piirraNostonValokuva(kohde, kuva) {
  piirraNostonKuva(kohde, kuva, 'fokusnosto-kuva fokusnosto-valokuva', NOSTO_MINI_PX * 3);
}

/**
 * VALMIIT KYSYMYKSET PULULLE kortin alaosaan (omistajan päätös
 * 28.8.2026: *"muutama valmis kysymys Pululle jatko jutustelua
 * varten"*).
 *
 * NAPAUTUS SULKEE KORTIN. Kartan kohdetietoruutu jättää itsensä auki
 * chatin viereen (js/fokuskohteet.js kysyKohteesta), mutta täkynoston
 * kortti on kartan keskellä kelluva paperi eikä väistä paneelia —
 * lukeminen on tässä kohtaa jo tehty, ja keskustelu jatkuu chatissa.
 *
 * KYSYMYS MENEE UUTENA AIHEENA (js/pollo.js polloKysy) eikä
 * jatkokysymyksenä: pelaaja aloittaa uuden puheenaiheen, ei jatka
 * edellistä vastausta. Reitti on sama kuin pelaajan itse
 * kirjoittamalla kysymyksellä, eikä se riipu chatin omien
 * avausvalmiskysymysten lipusta.
 */
function piirraNostonKysymykset(ui, sisalto, nosto) {
  const kysymykset = (Array.isArray(nosto.kysymykset) ? nosto.kysymykset : [])
    .map((k) => String(k ?? '').trim()).filter(Boolean).slice(0, 3);
  if (!kysymykset.length) return;
  // Sama nimilappuvitsi kuin kartan kohdekortissa (omistaja 27.8.2026):
  // "Kysy pöllöltä pululta:", pöllöltä yli vedettynä.
  sisalto.appendChild(polloNimilappu(html('p', 'fokusnosto-kysy-otsikko'), {
    ennen: 'Kysy ', yli: 'pöllöltä', tilalle: 'pululta', jalkeen: ':',
  }));
  const rivi = html('div', 'fokusnosto-kysymykset');
  rivi.setAttribute('role', 'group');
  rivi.setAttribute('aria-label', `Kysy pululta: ${nosto.otsikko}`);
  for (const kysymys of kysymykset) {
    const nappi = html('button', 'fokusnosto-kysymys', kysymys);
    nappi.type = 'button';
    nappi.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      suljeNostonKortti(ui);
      polloKysy(kysymys);
    });
    rivi.appendChild(nappi);
  }
  sisalto.appendChild(rivi);
}

/* ==================== KYTKENTÄ ==================== */

/**
 * KYTKENTÄKOHTA js/main.js:ssä.
 *
 * Kutsu asettaa täkynoston fokusvirran piirtopinnaksi, ja siitä eteenpäin
 * nosto elää pelin oman renderin tahdissa ilman uutta riviä js/ui.js:ssä
 * (ks. js/fokusvirta.js asetaNostopinta).
 *
 * MIKSI ERILLINEN KUTSU EIKÄ SIVUVAIKUTUS MODUULIN LATAUKSESSA:
 * niputuksen vartija (tools/tarkista-niputus.mjs) vaatii, että jokainen
 * listattu moduuli on jonkin toisen listatun moduulin STAATTISESTI
 * tuoma — pelkkä `import './fokusnosto.js';` ei näy sille tuontina.
 * Nimetty kutsu on samalla luettava: käynnistystiedostosta näkee, että
 * täkynosto on osa peliä.
 */
export function kytkeFokusnosto() {
  asetaNostopinta(paivitaFokusnosto);
}

/**
 * Laudan vaihto tai uusi peli: nosto ja kortti pois.
 *
 * Kartan tietoruutu suljetaan samalla, koska nosto on voinut avata sen:
 * uuden laudan päälle jäänyt Delfoin kortti olisi merkintä kartasta,
 * jota ei enää ole.
 */
export function nollaaFokusnosto(ui) {
  if (ui) {
    ui.fokusnostoOhitetut = new Set();
    clearTimeout(ui.fokusnostoVihjeAjastin);
    // Kortin muistiviite pois ENNEN sulkua: muuten sulku kutsuisi
    // paivitaFokusnostoa, joka nostaisi seuraavan noston juuri
    // nollattavan laudan päälle.
    ui.fokusnostoKortti?.purku?.();
    ui.fokusnostoKortti = null;
  }
  suljeNostonKortti(ui);
  suljeFokusnosto(ui);
  suljeFokuskohde(ui);
}
