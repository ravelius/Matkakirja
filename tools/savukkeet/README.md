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
| savuke-fokusvirta | Fokusmoodin annosteluvirta Ateenassa: lehtilukko, kortti kartan päällä, vaiheet 1–6, minivisan palkkio, portti (≥1 täky) ja luovutus laattamekaniikalle |
| savuke-dist | Yhden tiedoston versio käynnistyy (aja build ensin) |
| savuke-aanet-tausta | Taustalle mennyt peli on täysin hiljaa: ankkuri, tehostekonteksti, lukijaäänen piiri ja omistajattomat soittimet vaikenevat, paluussa silmukat ja radio jatkavat mutta kesken jäänyt luenta ei — ja syntetisaattori perutaan, ei tauoteta |
| savuke-mediakanava | Pelin äänet mediakanavassa (hiljainen ankkuri + audioSession, sanelun tauko) ja pelin oma mykistys myös striimatulla lukijaäänellä |
| savuke-fokuskartta | Fokusmoodin maakohtainen topografiapohja: puuttuva kuva ei riko mitään, olemassa oleva osuu JSONin rajaukseen, reitit sen päällä, kamera-ajo maan rajaukseen ja eleen keskeytys, väärän laudan rajaus hylätään. Lisäksi alalaidan kalusteet: dynaaminen mittajana ja kartuutsi, pieni Liiku-neliö kartuutsin rinnalla, reunojen asteviivaimet, kartuutsin päältä nouseva maataulu (ei otsikkoa, ei sulkunappia, plus oikeassa yläkulmassa) sekä kohdemerkit pisteinä nimineen ja pienennetyt kaupunkinimet |
| savuke-panorointi | Fokusmoodin panoroinnin sujuvuus: laudan sykkeet (fokuslaatta-syke) vaikenevat raahauksen ajaksi ja heräävät sen jälkeen, asetteluja korkeintaan 1,5/kehys skriptatussa panoroinnissa (CDP LayoutCount — SVG-lapsen transform-animaatio likaa laudan asettelun, ja siirtosilmukan asettelunluku pakottaisi sen joka kehyksellä; mitattu 26.8.2026), panorointi liikuttaa karttaa |
| savuke-nappula | Laudalla makaava noppa ja hyppivä tinaherra: noppa asuu kartan siirtokuoressa ja lepää laudan koordinaateissa, panorointi kuljettaa sen mukanaan, zoomaus skaalaa sen samassa suhteessa kuin kartan, nappulan hyppy nousee paraabelikaarena ja varjo kutistuu ja haalenee laella, nappula on tinaherra-kuva, ja uuteen kaupunkiin saavuttaessa noppa häipyy pois |
| savuke-jalkamatka | Jalkamatkan siirtymä, maataulun väistöt ja 27.8.2026 pelitestin korjaukset: maareitin askel on selvästi lennon askelta hitaampi, kamera saattaa nappulaa lähemmäs zoomaten uuteen kohteeseen ja purkaa saattozoomin perillä, sormi kartalle keskeyttää saattamisen lopullisesti kesken matkan, matkan oma äänilippu nousee lähdössä ja laskee ennen saapumista, maataulun auetessa Matkusta-nappi piiloutuu ja taulun alle tulee pehmeäreunainen sumennuskerros — sekä tinaherra näkyy fokuslehden päällä (ei .fokus-lehden-alla), noppa ei pyörähdä itsestään esivalitulla matkustustavalla, ja nopan `will-change` on voimassa vain heiton ajan (iPhonen kadonnut taustakartta) |
| savuke-fokuskohteet | Fokuslehden klikattavat karttakohteet: merkit lehden päällä (myös kierron kopiokohdassa), ≥44 px osuma lehden perustasolla ja merkki kartan mittakaavassa (suurenee lähennettäessä), yleiskuvassa piilossa, pop-upin sisältö ja paikka, kohdekorostus, sulku rastista/Escistä/napautuksesta, fokusvirran pinta sulkee tietoruudun, Matkakirjan ihme (nykytilan valokuva pääkuvana, "Koe ihme" kuvan ALLA, diagonaalinen kulmanauha joka jatkuu kuvan reunojen yli eikä nappaa napautuksia) |
| savuke-nahtavyysihme | Matkakirjan ihme myös kaupunkikartan nähtävyysikkunassa: olemassa olevalla kohteella "Koe ihme" -nappi kuvan ALLA ja suurennos ikkunan sisään (ei modaalin taakse) nauhoineen ja havainnekuvan lähderivillä, kadonneella havainnekuva kuvasarjan ensimmäisenä nauhoineen ja ilman nappia, nauha seuraa kuvaa sarjaa selattaessa, ihmeetön kohde jää ilman kumpaakin, ja kaupunkikartan oma nimi (Zeuksen temppeli) löytää fokuskohteen ihmeen (Olympieion) |

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
