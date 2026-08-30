# Savukkeet — käyttöliittymän savutestit

Siirretty session scratchpadista repoon kapulanvaihdossa 14.8.2026,
jotta ne säilyvät sessioiden yli. Polut ovat suhteellisia repon
juureen (`import.meta.url`), joten ajo onnistuu mistä tahansa:

    node tools/savukkeet/savuke-lehtiotsikko.mjs

Jokainen savuke käynnistää oman paikallisen palvelimen ja Chromiumin
(`/opt/pw-browsers/chromium` — konttiympäristön vakiopolku, vaihda
tarvittaessa) ja tulostaa OK/FAIL-rivit; poistumiskoodi 0 = kaikki
läpi. `savuke-lehtiotsikko` kirjoittaa kuvakaappauksen hakemistoon
`/tmp/matkakirja-kaappaukset/` (luo se ensin: `mkdir -p`).

**Playwright haetaan kahdesta paikasta** (sama kaava kuin
`tools/kuvaa-etusivu.mjs`): ensin repon omasta `node_modules`-kansiosta
ja jos sitä ei ole, kontin globaalista asennuksesta
`/opt/node22/lib/node_modules/playwright`. Aiemmin savukkeet tuotiin
kiinteästä `../../node_modules`-polusta, ja koska repossa ei ole
`node_modules`-kansiota, ne kaatuivat uudessa sessiossa jo tuontiin
(`ERR_MODULE_NOT_FOUND`) ennen kuin ehtivät käynnistää mitään. Uutta
savuketta kirjoittaessa kopioi tuontilohko olemassa olevasta — älä
kirjoita `import ... from '../../node_modules/...'`.

| Savuke | Vartioi |
| --- | --- |
| savuke-lehtiotsikko | Lehden tarttuva nimiö, ylähampurilainen (sijainti + tasaus), sisällyslevy (ylös/ulkosulku/Etusivu-rivi), iPadin paperikaista |
| savuke-esilataus | Kuvakarusellien esilataus (nähtävyys, nostogalleria, katselin, lightboxin pikselimitoitus) |
| savuke-matkakirjakulma | MATKAKIRJASTA-kortti aina vasemmassa yläkulmassa |
| savuke-kartta-tila | Kartan geometria ei jää vanhaksi: lehden sulun sovitus, kesken jääneen nipistyksen hylkäys (jumivahti + yhden sormen kosketus) |
| savuke-maapilleri | Maapillerin siivous (yksi pilleri, destroy, orpo) |
| savuke-maaselain | Maatiedot-tila: kirjanappi, pilleri, valinnan purku |
| savuke-katselin-pollo | Kuvakatselimen napautukset + pöllön kiinnitys |
| savuke-postikortti | Valokuvasuurennoksen sulkeutumissäännöt |
| savuke-vuosisaa | Vuosisääkortti (käyrä, sadepalkit, korostus) |
| savuke-lehden-mitta | Arkin leveys (jumiutunut viewportti, resize) |
| savuke-paivityspopup | Versionumeron päivitysnappi |
| savuke-kehittajalehti | Kehittäjän liitteet: Raamattu, Tilannelehti ja Tilastot-lehden vetolaatikkotaulu |
| savuke-lippuikkuna | Lippuikkunan pikselit (ison lipun terävyys, tarkennettu vaakuna kortin sisällä) |
| savuke-fokusvirta | Fokusmoodin annosteluvirta Ateenassa: lehtilukko, kortti kartan päällä, vaiheet matkakirja → kupla → oppitunti → kohtaaminen ja luovutus laattamekaniikalle. Valintakupla vaiheineen on PURETTU (Raamattu, SYVENNYSTARINAT KARTALLE): savuke vaatii, että kuplan Jatka vie suoraan oppituntiin eikä Pulu kysy täkyjä. Syvennystarinoiden merkkireitin kattaa savuke-selitevalikko |
| savuke-dist | Yhden tiedoston versio käynnistyy (aja build ensin) |
| savuke-aanet-tausta | Taustalle mennyt peli on täysin hiljaa: ankkuri, tehostekonteksti, lukijaäänen piiri ja omistajattomat soittimet vaikenevat, paluussa silmukat ja radio jatkavat mutta kesken jäänyt luenta ei — ja syntetisaattori perutaan, ei tauoteta |
| savuke-mediakanava | Pelin äänet mediakanavassa (hiljainen ankkuri + audioSession, sanelun tauko) ja pelin oma mykistys myös striimatulla lukijaäänellä |
| savuke-fokuskartta | Fokusmoodin maakohtainen topografiapohja: puuttuva kuva ei riko mitään, olemassa oleva osuu JSONin rajaukseen, reitit sen päällä, kamera-ajo maan rajaukseen ja eleen keskeytys, väärän laudan rajaus hylätään. Lisäksi alalaidan kalusteet: dynaaminen mittajana ja kartuutsi, pieni Liiku-neliö kartuutsin rinnalla, reunojen asteviivaimet, kartuutsin päältä nouseva maataulu (ei otsikkoa, ei sulkunappia, plus oikeassa yläkulmassa) sekä kohdemerkit pisteinä nimineen ja pienennetyt kaupunkinimet |
| savuke-panorointi | Fokusmoodin panoroinnin sujuvuus: laudan sykkeet (fokuslaatta-syke) vaikenevat raahauksen ajaksi ja heräävät sen jälkeen, asetteluja korkeintaan 1,5/kehys skriptatussa panoroinnissa (CDP LayoutCount — SVG-lapsen transform-animaatio likaa laudan asettelun, ja siirtosilmukan asettelunluku pakottaisi sen joka kehyksellä; mitattu 26.8.2026), panorointi liikuttaa karttaa |
| savuke-nappula | Laudalla makaava noppa ja hyppivä tinaherra: noppa asuu kartan siirtokuoressa ja lepää laudan koordinaateissa, panorointi kuljettaa sen mukanaan, zoomaus skaalaa sen samassa suhteessa kuin kartan, nappulan hyppy nousee paraabelikaarena ja varjo kutistuu ja haalenee laella, nappula on tinaherra-kuva, ja uuteen kaupunkiin saavuttaessa noppa häipyy pois |
| savuke-jalkamatka | Jalkamatkan siirtymä, maataulun väistöt ja 27.8.2026 pelitestin korjaukset: maareitin askel on selvästi lennon askelta hitaampi, kamera saattaa nappulaa lähemmäs zoomaten uuteen kohteeseen ja purkaa saattozoomin perillä, sormi kartalle keskeyttää saattamisen lopullisesti kesken matkan, matkan oma äänilippu nousee lähdössä ja laskee ennen saapumista, maataulun auetessa Matkusta-nappi piiloutuu ja taulun alle tulee pehmeäreunainen sumennuskerros — sekä tinaherra näkyy fokuslehden päällä (ei .fokus-lehden-alla), noppa ei pyörähdä itsestään esivalitulla matkustustavalla, ja nopan `will-change` on voimassa vain heiton ajan (iPhonen kadonnut taustakartta) |
| savuke-fokuskohteet | Fokuslehden klikattavat karttakohteet: merkit lehden päällä (myös kierron kopiokohdassa), ≥44 px osuma lehden perustasolla ja merkki kartan mittakaavassa (suurenee lähennettäessä), yleiskuvassa piilossa, pop-upin sisältö ja paikka, kohdekorostus, sulku rastista/Escistä/napautuksesta, fokusvirran pinta sulkee tietoruudun, Matkakirjan ihme (nykytilan valokuva pääkuvana, "Koe ihme" kuvan ALLA, diagonaalinen kulmanauha joka jatkuu kuvan reunojen yli eikä nappaa napautuksia), sekä yhtenäinen kohdemalli: nostot ja syvennystarinat kohdemerkkeinä aihevaloineen, nosto jolla on kohde ei luo omaa merkkiä vaan aukeaa tietoruudun Livian leikekirja -napista, ja korttien yhteinen ylärivi |
| savuke-takyportti | Täkynostot kohdemallin merkkeinä kaupungissa, jolla EI ole fokusvirtaa (maapooli NOSTO_MAAT): Tromssassa Norjan poolin nostot ovat kohdemerkkejä nimineen ja aihevaloineen, ≥44 px osuma, tuikemekaniikan jäänteitä ei ole DOM:ssa, kortti aukeaa merkistä lunastusteksteineen, kysymysnappeineen ja kohdemallin ylärivillä, kortti aukeaa uudelleen sulun jälkeen, Pariisin kaksi lähekkäistä täkyä eivät jää päällekkäin (erottelupassi), fokusmoodi pois ⇒ ei merkkejä, ja Wienin maailmannäyttelytäyn isoisän karttaliite suurennoksineen toimii merkkireitin kautta |
| savuke-nahtavyysihme | Matkakirjan ihme myös kaupunkikartan nähtävyysikkunassa: olemassa olevalla kohteella "Koe ihme" -nappi kuvan ALLA ja suurennos ikkunan sisään (ei modaalin taakse) nauhoineen ja havainnekuvan lähderivillä, kadonneella havainnekuva kuvasarjan ensimmäisenä nauhoineen ja ilman nappia, nauha seuraa kuvaa sarjaa selattaessa, ihmeetön kohde jää ilman kumpaakin, ja kaupunkikartan oma nimi (Zeuksen temppeli) löytää fokuskohteen ihmeen (Olympieion) |
| savuke-webkit-eleet | Kartan eleet WEBKITILLÄ (kontin Chromium ei näe tätä vikaluokkaa): SVG-lava on ikkunoitu näkymään + pyyhkäisyn marginaaliin eikä kasva zoomatessa (ennen 9 966 → 51 374 px), eleen jälkeinen reunatäydennys ei siirrä näkymää pikseliäkään, ja eleen kehysaika mitataan — absoluuttinen 40 ms:n raja silloin kun ympäristö siihen yltää, muuten suhteessa ruudunkokoisen lavan verrokkiin. WebKitin puuttuessa savuke ohittaa itsensä (`npx playwright install webkit`) |
| savuke-atlas-purku | Kartan jaksottainen jankki rajanylityksissä: lehdet generoidaan ajossa oikean kokoisina (6400 x 4000 webp, ei stubeja eikä binäärejä repoon) ja väitteet ovat — kartalle kirjoitetun lehden pikselikoko on pienennyskaton alla sekä työpöydällä että puhelimessa, jokainen lehden osoite on purettu (Image.decode) ennen kuin se päätyy `<image href>`:iin, `toDataURL`-laskuri on nolla eleiden aikana (rasterit tehdään `toBlob`illa), rasteriportaan vaihto ei pura merkkikerrosta vaan vaihtaa osoitteet paikallaan, eikä Turkin lehden saapumisikkunassa ole yli 120 ms:n pääsäietaskia 4x-kuristuksella (kello suhteessa verrokkiin kuten savuke-webkit-eleissä) |
| savuke-maailmanakyma | Kehittäjän maailmanäkymän jankki: koko laudan kaupunkikerros (602 näkyvää solmua) rajataan näkymään + ruudullisen puskuriin luokalla `.fokus-ikkunan-ulkona` (js/ui.js paivitaMaailmanRajaus) — eleen asetuttua näkyviä kaupunkiosia alle 200, rajattuja yli 100, panoroinnin ja nipistyksen longtask-summat budjetissa 4x-kuristuksella, maailmanapin klikkauskäsittely alle 200 ms, rajausluokka puretaan kokonaan napin sammuessa ja merkit palaavat kun näkymä siirtyy niiden ylle |
| savuke-elaintaky | Maiden eläintäyt (js/elaintaky.js): 27 eläinmerkkiä Euroopan laudalla kartan omassa kerroksessa (Vanjärvi ja Islanti jäävät laudan ulkopuolelle eivätkä piirry), kaiverrettu eläinsymboli ja ≥44 px osuma jokaisella, merkin napautus avaa kortin kaanontekstillä ja repon omalla eläinkuvalla, löytöpalkkio 20 puntaa KERRAN (toinen napautus avaa saman kortin muttei tuplaa punnankaan, merkki jää kartalle vaimeana), ja maailmankartan yleiskuvassa kerros on piilossa mutta palaa lähennettäessä |

**Savukevartija** (`node tools/tarkista-savukkeet.mjs`, CI:ssä joka
PR:lle): vertaa kaikkien savukkeiden `ui.X`-kutsut ja -luvut UI:n
toteutukseen tekstitasolla ja kaatuu puuttuvista — savukkeet eivät
aja porteissa, joten siirretty metodi tai kenttä katkaisisi ne
muuten hiljaa. Kun lisäät savukkeeseen oman mittarikentän, kirjoita
se samassa tiedostossa (`ui.mittari = 0`) ennen lukua; lehtitilan
kenttiin viitataan `ui.lehtitila.X`-muodossa (kentät dokumentoitu
ui.js:n rakentimessa).

Laajempi kartta- ja pöllötestistö on `tools/savuke-kartan-sujuvuus.mjs`
(Chromium + WEBKIT=1) ja `tools/savuke-pollo.mjs` — ne ovat asuneet
repossa alusta asti.

Kun muutat lehteä, karttaa tai katselimia: aja vähintään aihetta
koskeva savuke ennen julkaisua ja lisää uusille takeille vartio.
