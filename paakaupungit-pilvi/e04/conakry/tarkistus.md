# Conakry — riippumaton D-tarkistus

**Tila: osittain tarkistettu, ei valmis kaupunki eikä valmis C/E/F.** Tarkastaja ei osallistunut Conakryn A:han tai C:hen. Tarkistettu nykyinen sisältö ja kaikki 21 valittua kuvaa itse, alkuperäisiltä lähdesivuilta. `sisalto.json`:ia, kuvat.md:tä, sääaineistoa tai C-muistiinpanoja ei muutettu.

**VÄÄRIN 2, EPÄVARMA 2.** Uudet D-kohdat ovat R1 (kielivirhe), R2 (Boulbinetin kuvan luettavat kasvot), R3 (saman kuvan keulamaalauksen oikeusketju) ja R4 (N1-kuvan ajoitus). Lisäksi aiemmin tunnettu Camayennen puuttuva paikallinen kohdekuva jää näkyviin yhtenä konevirheenä. Kuvavajetta ei lasketa uudeksi löydetyksi tekstivirheeksi eikä peitetä Ecuadorin yleispuukuvalla.

Paikallinen ja sallittu verkkotarkistus: **1 virhe, 0 varoitusta, 21 kuvaa**, kummankin exit 1. Koneen lisenssi-/tekijä-/leveysportin läpäisy ei ratkaise R2:n kasvoja tai R3:n kuvatun maalauksen erillisiä oikeuksia.

## Menetelmä ja aineiston säilyminen

Ohjeet: saman kloonin AGENTS.md, paakaupungit-pilvi/CODEX.md, PILVIOHJE luvut 4/5/7/8D/8E/13 ja LISÄSÄÄNTÖ sekä sitovat lehtityöresepti, kaupunkilehti ja spec-mantereet. Kaupungin faktapohja, kuvat.md, sisalto.json ja kirjoitusmuistiinpanot-C.md luettu kokonaisuudessaan. Omistajan hyväksymä lähdekanava ja kaksi nimenomaista krediittimuotoa tarkistettiin e04/LAHDEKANAVA.md:stä. TILANNE.md:n viisi tulkintakysymystä ovat edelleen avoinna.

Lähteet noudettiin itse `sallittu_haku.py`:llä tavallisilta robots-sallituilta alkuperäissivuilta ja Wikidatan EntityData-tietueista. Jokaisen pyynnön robots-/ohjaus-/hash-jälki on yhteisessä sallitut-haut.jsonl:ssä. Kiellettyjä /w/ tai /api/ -polkuja ei käytetty. Kuvien File-sivut hankittiin/lukittiin erikseen; B:n päätelmiä ei käytetty D:n oman katselun korvikkeena. Nykyiset valitut esikatselut katsottiin ja niiden muuttumattomat kopiot säilytettiin D:n kansioon. Riskikuvista 4/11/15/21/23/36 katsottiin myös alkuperäinen, joka noudettiin sallitulla hakukanavalla. Uusia kuvakandidaatteja ei haettu.

Oma NAS-todistekansio: `sessio-72-20261011/valiaikainen/conakry-D/`. `lahteet.json` sisältää 29 itse hankitun sivun/tietueen URL:t ja raakakopiot; `kuvametadata.json` sisältää 21 alkuperäisen File-sivun revision, koon, lisenssin, tekijäkrediitin ja hashit. `katselut.json` sisältää jokaisen kuvan oman havaintotekstin, esikatselun hashin, alkuperäiskatselun tiedon ja Date/EXIF-rivit. `numero-ja-mittatarkistus.json` sisältää kuusi karttapistettä, kaikki 48 ilmastolukua ja mitat. `ennen-manifesti.json` ja `sisalto.json.ennen` lukitsevat lähtötilan.

Tarkistimen SHA-256: `78c2150e6510ffcd51f05a44898316122f6d98100abd6dc51666de706fd1467c`. Alkuperäisen tarkistimen algoritmia ei muutettu. Verkkosovitus vaihtaa vain lähdetransportin. NASilla myös TMPDIR ja pycache; ei Git-operaatioita, pelimuutoksia, uusia agentteja, generointia tai julkaisua.

## Korjauskohdat — E toteuttaa erillään D:stä

| D-kohta | JSON-polku / havainto | Lähde / peruste | Tila | Toimi |
| --- | --- | --- | --- | --- |
| R1 | `kaupunkilehti[0].nostot[1].teksti`: ”yhdistää näin kalastuksen ja kaupungin rantaa” | Saman verbin rinnasteiset täydennykset ovat eri sijamuodossa; koko kentän muutos alla säilyttää kaikki faktat. | VÄÄRIN | Korvaa koko teksti R1:llä. |
| R2 | `kaupunkilehti[0].nostot[1].tiedosto` = `Port de Boulbinet1.jpg`: veneiden välistä kameraan päin katsovan istuvan henkilön kasvot | Oma alkuperäispikseleiden katselurajaus 2: nenä, suun/leuan alue ja silmä-/lasialue luettavissa. Sitova lehtityöresepti: luettavat kasvot hylätään. | VÄÄRIN | Hylkää tiedosto. Neljä kokonaisen kuvakentän poistavaa arvoa alla; kuvaa ei pidetä kelvollisena oikeusketjun mahdollisen ratkaisun jälkeenkään. |
| R3 | Sama kuvatiedosto: oikean etummaisen veneen kuvallinen kilpi | Oma alkuperäiskatselu ja katselurajaus 3; File-sivu antaa vain Flucco-valokuvalisenssin. Guinean 2019 laki art. 7/27. | EPÄVARMA | Älä hyväksy maalausta valokuvan CC-luvan nojalla. Erillinen oikeusketju selvittämättä; R2 jo hylkää nykyisen tiedoston. |
| R4 | `nahtavyydet.Tombon saari.kuvat[0].lyhyt` ja `.selite`: vuosi 2019 | File:Un aperçu de la ville de conakry.jpg, rev 1205341748: Summary Date 14 March 2019, 21:40; EXIF kuvaus- ja digitointiaika 29 June 2018, 14:17. | EPÄVARMA | Korvaa molemmat kokonaiset kentät vuosiluvuttomilla R4-arvoilla. |

### R1 — kokonainen tekstikenttä

Vanha 512 merkkiä, korvaus **515 merkkiä**; sallittu nostotekstin 400–600 merkin alue säilyy. Vain yksi lauseen osa muuttuu, mutta E korvaa koko kentän sanatarkasti. Lähdefaktat Boulbinetistä, Kaloumista, kaupallisesta satamasta ja meriyhteyksien ajantasaisuuden varmistamisesta eivät muutu.

```json
"Boulbinet on Conakryn kaupunginosa, johon liittyy kalastussatama. Se kuuluu Kaloumin rannikkoympäristöön, jossa sijaitsee myös kaupungin kaupallinen satama. Kalastusveneiden paikka ja konttiliikenteen satama ovat kuitenkin eri kohteita. Keskustan kalatorin suunnalta on kuvattu myös meriyhteyksiä edustan saaristoon. Boulbinet tuo kalastuksen osaksi kaupungin rantaympäristöä, mutta saaristomatkan tämänhetkiset järjestelyt on varmistettava erikseen. Sataman nimestä ei voi päätellä yhden veneen lastia tai reittiä."
```

### R2 — luettavat kasvot, kuvan hylkäys

Alkuperäisen kuvan yleiskatselussa suurin osa ihmisistä on selin tai varjossa. Tarkempi alkuperäispikseleiden katselu muutti tämän kuvan päätöksen: **etualan veneiden välistä kameraan päin katsovan istuvan henkilön kasvot ovat luettavissa**. Nenän, suun/leuan ja silmä-/lasialueen piirteet näkyvät. Kuva ei läpäise sitovaa kasvoporttia. Kuvassa oleva toinenkin vasemmalla oleva kasvoryhmä on erikseen katsottu; hylkäys ei edellytä henkilöllisyyden tunnistamista.

Todiste: `kasvot-katselurajaus-2.png`, alkuperäisen `original-21.jpg`:n pikselialue (1250,1200)–(2400,1950), rajattu vain katselua varten ilman suurennusta, terävöintiä, pikselien muuttamista tai alkuperäisen tiedoston muutosta. Kokonainen alkuperäinen säilyy. Katselurajaukset 1 ja 3 dokumentoivat vasemmat ihmiset sekä keulamaalauksen.

E poistaa valinnan neljä kokonaisarvoa alla. Niiden uusi pituus on kussakin **0 merkkiä**. Tästä syntyvä kuvapuute jää koneessa näkyviin, eikä kuvattomuutta tulkita hyväksytyksi poikkeukseksi. Teksti/wiki säilyvät. Uutta kuvaa ei haeta tai keksitä tässä.

```json
{
  "kaupunkilehti[0].nostot[1].tiedosto": "",
  "kaupunkilehti[0].nostot[1].lyhyt": "",
  "kaupunkilehti[0].nostot[1].selite": "",
  "kaupunkilehti[0].nostot[1].lahde": ""
}
```

### R3 — keulamaalauksen erillinen oikeusketju

Port de Boulbinet1.jpg:n valokuvaoikeus, 3948×2961 koko, Flucco-krediitti ja CC BY-SA 4.0 on varmistettu. Kalasataman paikka vastaa File-sivun Deutsch/Français-kuvausta. Epävarmuus koskee **oikean keulan kuvallista kilpimaalausta**, ei valokuvalisenssin lukemista tai kalasataman tunnistusta. Kilvessä on tumma kuva-aihe ja alempi tunnusosa; kyse ei ole vain väriraidoista tai veneen nimen kirjaimista. Kuvasivu ei ilmoita maalauksen tekijää, teosikää tai lupaa. Tunnusta ei tunnisteta arvauksella jalkapalloseuraksi, kansanperinteeksi tai vapaaksi tunnukseksi.

Guinean laki art. 27 koskee pysyvästi julkisesti avoimessa paikassa sijaitsevia teoksia ja rajaa kaupallisen pääaihekäytön pois. Liikkuvan veneen maalipinnan pysyvää sijoitusta ei ole osoitettu. Maalauksen pieni osuus satamakoosteesta ei yksin todista art. 27:n muiden edellytysten täyttymistä. Yleistä kaiken maalaamisen kieltoa tästä ei seuraa: tavalliset väriraidat, käyttötunnisteet ja kansallislipun yksinkertaiset väripinnat eivät tällä havainnolla ole erillisen suojatun teoksen näyttö. Art. 45:n domain public payant tai art. 95–98:n folklore-ketju ei ratkaise tämän nimenomaisen kilven tunnistusta.

R3 ei ole pehmennettävä tekstiväite. Kuvavalinta poistetaan jo R2:n takia, joten uutta kuvaa tai kuvatekstiä ei keksitä. Myöhempi maalauksen oikeusketjun ratkaisu ei tee luettavien kasvojen kuvasta kelvollista. D ei muuttanut mitään kuvakenttää.

### R4 — kaksi kokonaista kuvatekstikenttää

Kuvausvuotta ei ratkaista valitsemalla Summary tai EXIF toisen yli. Vuosiluku poistetaan; kuvaa ei siirretä vuoteen 2018 eikä muuteta historialliseksi 1873-kuvaksi. Paikka, kuvatiedosto ja krediitti säilyvät. N1:n Camera location on 9.508244 / −13.705205, vanhan ytimen alueella, ja itse kuva näyttää keskustan rannikon/korttelit.

`nahtavyydet.Tombon saari.kuvat[0].lyhyt`: 42 → **41 merkkiä**, yksi virke ja piste lopussa.

```json
"Tombon ja Kaloumin vanha ydin Conakryssa."
```

`nahtavyydet.Tombon saari.kuvat[0].selite`: 106 → **94 merkkiä**, yksi virke ja piste lopussa.

```json
"Tombon ja Kaloumin vanhan kaupunkiytimen näkymä liittää Conakryn korttelit ympäröivään mereen."
```

## Koko tekstin faktat, ajallinen kehys ja kieli

Seuraavassa ”OK” tarkoittaa tarkistettua nykyistä väitettä. R1–R4 ovat yllä yksilöidyt korjauskohdat. Lähteessä jo pehmennetty epävarmuus (esim. linnakkeen säilyneisyys) ei ole sama asia kuin uusi ratkaisematon D-virhe. Saman artikkelin eri kieliversioita ei laskettu kahdeksi itsenäiseksi täsmävuoden varmennukseksi.

| JSON-polku / osa | Tarkistettu sisältö | Alkuperäislähde ja osio | Tila / korvaus |
| --- | --- | --- | --- |
| `kaupunki.name/wiki/maa/ambience`, `artikkeli.intro` 1. kappale | Conakry, Guinea/GIN, Atlantti, pitkä Kaloum, Tombo vanhana ytimenä, koillinen kasvu ja kaksi eri satamaa | E Geography/History/Economy, T johdanto, K johdanto/paikat, BC johdanto ja talous | OK, ei korvausta. |
| `artikkeli.intro` 2. kappale ja K1 | Susu-nimitausta; Baga/Susu ennen siirtomaakaupunkia; ranskalainen kaupunki 1800-luvun lopulla ja vasta 1873:n jälkeen | BC nimi/historia; F Histoire; T History; E History | OK. Lähteiden 1884/1887/1889 ovat eri tekoja/ristiriitaisia ajoituksia; tekstissä vain vuosisadan loppu. Ei varmaa täsmäperustamisvuotta. |
| `artikkeli.intro` 3. kappale | Camayennen kapokit, museon Guinean kulttuuriesineistö, Los-rannat ja metsäiset sisäosat, Kassa/Tamara Roumen ympärillä | G johdanto; M Collection; L Geography | OK. Museokokoelma ei ole nykyisen avoinnaolon lupaus. |
| `artikkeli.teksti` 1. kappale | Tombo, pengeryhteys, kasvu Kaloumille, vanhan ytimen ja nykyisen laajan kaupungin ero | T johdanto; E History/Geography; BC sijainti | OK. Penger ei saa keksittyä rakennusvuotta. |
| `artikkeli.teksti` 2. kappale, K3, N2 | Kaupallinen satama Kaloumissa, kontit, tuonti/vienti, mineraalit, bauksiitti ja alumiinioksidi eri tuotteina, Kankanin historiallinen rata | P/PORTEN johdanto/History; E Economy/History; F Transports maritimes; BC talous | OK. Kuvan aluksen lastia ei päätellä. |
| `artikkeli.teksti` 3. kappale, T2, N4 | Kassan kauppa 1700-luvulla, laivakorjaajat/luotsit; 1900-luvun bauksiitti, avolouhokset ja pohjoisen rakennuskivilouhos sataman suojapengertä varten | KA Histoire; L History; BL kaivostoiminta | OK. Tarkkoja yksittäislähteen louhosvuosia, määriä tai oletettua rantakiven mineraalia ei käytetä. |
| K2 | Boulbinet kalastajakaupunginosana, Kaloum, kaupallinen satama erillisenä, keskusta/kalatorin suunnan meriyhteydet ja nykyjärjestelyjen tarkistus | BC paikat; K paikalliset satamat; V Do/Get around | Faktat OK; R1 kieli, R2 kuva hylätty, R3 maalauksen oikeudet epävarmat. |
| K4 ja N3 | Camayennen kaupunginosa, Ambroise Paré etelässä, suuri moskeija pohjoisessa, kapokit; ranskalainen puutarha vuosisadan lopulla, kutistuminen urbanisaation yhteydessä | G johdanto; GF Histoire; BC kasvitieteellinen puutarha | OK. 1894/1897-ristiriidan vuoksi ei täsmävuotta, puiden tarkkaa ikää/lajia/mittaa ei oleteta. Ecuador ei ole paikallisen kuvan todiste. |
| `matkailijalle.kappale` ja opasotsikot/nosto | Vanha ydin/puutarha/meri, etukäteen järjestettävä kuljetus, yksin pimeällä kävelyn välttäminen, kuvausrajoitukset; museo ja saaret varmistettava erikseen | UK1 Crime/Transport risks/Photography; V See/Do | OK, käytännön ohjeet lähdeperäisiä; ei hintoja, aikatauluja tai palvelulupausta. |
| O1 | Ahmed Sékou Tourén kansainvälinen lentoasema, CKY, Conakry/Gbessia; pitkä kapea kaupunki, kuljetus ja jaettujen/mototaksien välttäminen | A johdanto/infolaatikko; E Geography; UK1 Transport risks | OK. UK1:n henkilökunnan omaa matkustamista koskeva konteksti luettu; nykyinen varovainen matkailuohje vastaa lisäksi taksien ylläpito-/kuljettajakohtaa, ei väite laillisesta kiellosta. |
| O2 ja `parasta` Sandervalia | Museo ja dokumentoitu kokoelma naamioineen/soittimineen; tämän päivän näyttely ja vierailu selvitettävä | M johdanto/Collection; V See | OK. Ei suojattua Nimba-veistosta kuvana tai karttakohteena. |
| O3 ja `parasta` Los | Saaret eri paikkoja; merikuljetus järjestettävä; rannan kauneus ei todista uimaturvallisuutta | L Geography; LF Moyens de transport; V Do; UK1 Sea travel | OK. Ratoman kuva tukee kaupungin meriosuutta, ei saariretken laituri- tai saaritunnistusta. |
| O4 | Maniokki, keittobanaani, okra, maapähkinä; fouti okra/riisi, kansiyé maapähkinäkastike, bissap hibiskusjuomana | C Major ingredients/Notable dishes/Sauces/Beverages | OK. Ghanan kuva on nimenomaisesti yleinen havainnollistus; ei paikallinen annos-/reseptitodiste. |
| O5 ja `saatiedot.luonnehdinta` | Noin 26–28 °C keskilämpö, ylin noin 28–32, alin noin 22–25; pieni sade joulu–maaliskuu; heinä/elokuu kumpikin yli 1000 mm | Oma E Climate-taulukko, 1991–2020; kaupungin saa.json | OK: 48/48 WP-taulukkosta poimittua/alkuperäisalgoritmin mukaisesti pyöristettyä kuukausilukua samat. Sana ”noin” kattaa25.7–28.4. Ei asemamuutos tai sääennuste. |
| `parasta` muut 4 ja `hyvaTietaa` 4 | Tombo, Boulbinet, puutarha, rannat; kuljetus, yö, strategisten kohteiden kuvausrajoitukset, passin ja käyntien ajantasainen tarkistus | T/K/G/L sekä UK0/UK1 | OK. Tähdet ovat toimituksellisia arvioita, eivät lähteestä kopioituja rankinglukuja. |
| luontosivun nimi/johdanto, T1 | Kassa/Tamara lähes renkaana Roumen ympärillä; syeniitti magmakivenä; Atlantin avautumisen yhteys; magmasäiliö tulkintana | L Geography/Geology; LF Géologie | OK. ”Todennäköisesti” säilyttää fr-lähteen epävarmuuden. Ei tuoretta aktiivista tulivuorta tai varmaa kraatteria. |
| T3 ja N5 | Roume asuttu keskisaari; Room/Crawford Island, Ernest Roume ja kirjoitusasu; Plage du Gouverneur; varhainen brittiläinen linnake ja säilyneisyyden epävarmuus | R johdanto/Différence et origines/Géographie/Histoire; File15 | OK. Ei Aarresaari-inspiraatiota, jota R itse pitää vailla historiallista näyttöä. Vuoden 1873 nimimuoto ei ole varma Roume. |
| T4 ja N6 | Läntinen kaareva Tamara/Fotoba/Fortoba, metsä/rannat, 1900-luvun kaivosvaihe, myöhemmät majakka/vankila | L Tamara/Geography; TA johdanto/Histoire; BL kaivoshistoria | OK. Epäuskottavia korkeuksia/kantamia tai täsmävuosia ei siirretä tekstiin; kuvissa eivät ole majakka/vankila. |
| `kohdekartta.esittely` ja N1 | Vanha rannikkoydin/satama, puutarha, kuusi eri paikkaa; asutus ennen siirtomaakaupunkia ja nykykaupungin synty 1873:n jälkeen | T/E/F/BC/G/L | Teksti OK; kuusi lähdepistettä alla. N1:n kuvausvuosi R4. |
| N4:n kommuunirajaus | Saari eri laajuinen kuin Los-saariston kattava Kassa-kommuuni | E Government and administration, uusi saaristokommuuni; KA Géographie taulukossa Room/Fotoba-kohteet | OK. Pelaajatekstissä ei hallinnollisia väestö-/pinta-alalukuja tai uusia hallintoaikatauluja. |
| N4/N5/N6 vuoden 1873 kehys | Saaret olemassa ja Britannian saaristoa matkavuonna, 1900-luvun kaivokset/rakennukset myöhempiä | L History, LF Histoire ja riippumaton BL historia (Britannia 1818–1904) | OK. Teksti ei sano ettei Tamaralla olisi ollut mitään rakennusta1873; 1870-luvun kirkkoa ei sekoiteta myöhempiin majakkaan/vankilaan. |
| `saatiedot` numerot/lähde | lat/lon, neljä 12 kuukausisarjaa, lähde ja 1991–2020-kausi | E rev 1379002361 ja alkuperäinen saa.json | OK, kaikki lukuarvot ja lähdeolio täsmälleen saa.json:ssa. Taustan metatieto on saa.json:ssa; sisällön oma luonnehdinta arvioitu erikseen. |

Suomi muuten luettu virke virkkeeltä: nimien taivutus, yhdyssanat, viittaussuhteet ja lähteen epävarmuuden taso sopivat. R1 on varsinainen kielivirhe. Tekstiin ei ole keksitty aistihavaintoja, tiettyä vuoden 1873 kalastusvenettä, tarkkaa puun ikää tai matkan lupauksia. Nykyiset ristiriidat/hallintouutiset eivät ole pelaajasisältöä. Historia ei peitä aiempaa paikallista asutusta siirtomaaperustamisella.

## Tietovisat, tiedot ja luontosivun tehtävä

| JSON-polku | Vastaus ja tekstivastaavuus | Oma lähdetarkistus | Tila |
| --- | --- | --- | --- |
| `kysymykset[0]` | Atlantti; intro1, K3 ja N1/N2 | E Geography, BC johdanto | OK. Länsirannikkovihje ei sano vastaussanaa. Atlantin on vaihtoehdoista lyhin. |
| `[1]` | Tombo; intro1, K1 ja N1 | T johdanto | OK. Pengeryhteysvihje ohjaa mutta ei nimeä saarta; vaihtoehdot 8/8/8/9 merkkiä, oikea ei pisin. |
| `[2]` | Kapokki; intro3, K4 ja N3 | G johdanto | OK. Trooppisten suurten puiden vihje ei sano kapokki-sanaa; oliivi/eukalyptus/seetri samantapaisia puita. |
| `[3]` | Casa = talo; T2 ja N4 | L Kassa ja KA Histoire | OK. Portugalin sanakysymys ja nimikerrostuman vihje eivät sano taloa/casaa. Oikea ei pisin. |
| `[4]` | Syeniitti; T1 | L Geology, LF Géologie | OK. Kysymys sanoo magmakiven, vihje rakenteen, kumpikaan ei vastaussanaa. Syeniitti/dioriitti 9 merkkiä, ei selvästi pisin. |
| `tiedot[0]` | Tombo ja pengeryhteys | T johdanto | OK, ei isoisää tai epätarkkaa valmistumisvuotta. |
| `tiedot[1]` | Camayenne kapokit/sairaala/moskeija | G johdanto | OK, sairaala etelä- ja moskeija pohjoispuolella tekstissä oikein. |
| `tiedot[2]` | Roumen vanhat nimet | R johdanto/nimet | OK, ei nimimuodon varmaa 1873-ajoitusta. |
| `kaupunkilehti[1].tehtava` | Roume kaaren keskellä; saman sivun T1/T3/T4 kertovat vastauksen | L Geography ja R Géographie | OK. Tehtävä ei toista viittä visakysymystä. Fakti ei ole noston yksi virke sanatarkasti. |

Kaikki viisi `correct:0` ja tehtävän `oikea:0` vastaavat ensimmäistä vaihtoehtoa. Tasot 1/2/2/3/3, vähintään yksi helppo ja yksi vaikea. Kolme tietoa ilman isoisää. Oikeat vastaukset löytyvät nykyisestä tekstistä; vaihtoehtojen merkitykset eivät tee useaa oikeaa. Täsmävuosia, superlatiiveja tai keksittyä paikallista nimietymologiaa ei kysymyksissä ole.

## Karttapisteet — kuusi alkuperäistä WP/WD-tarkistusta

| Kohde / JSON-piste | Oma lähde ja suoraan luettu piste | Ero / alueen merkitys | Tila |
| --- | --- | --- | --- |
| Tombo 9.51000/−13.71000 | en-Wikipedia Tombo Island rev 1376064094,9°30′36″N13°42′36″W; Q1572991 P625 9.51/−13.71 | Sama saaren/vanhan ytimen aluepiste. `luonto`, ei kaupungin hallintopiste tai laituri. | OK |
| Satama 9.51440/−13.71930 | Q17332858 P625 9.5144/−13.7193; fr-Wikipedia Port de Conakry rev 217588308,9°30′52″N13°43′09″W | Lähellä samaa satama-aluetta. WD precision 0.009108… on karkea: desimaalien määrä ei todista laiturin senttimetrisijaintia. | OK |
| Camayenne 9.53070/−13.68592 | Q5158067 P625 9.530702/−13.685918; G/GF saman puutarhan pyöristetyt sekunnit | Puutarhan paikka, sairaalan/moskeijan väli. `luonto`, ei Ecuadorin kuvan sijainti. | OK |
| Kassa 9.47500/−13.74944 | fr-Wikipedia Île de Kassa rev 239404694,9°28′30″N13°44′58″W →9.475/−13.749444… | Suora sekuntimuunnos. Q24854585 kaksi normal-rank-pistettä 9.48056/−13.75306 ja 9.4749687/−13.7495613; ei niiden keskiarvoa. Saari, ei kunnan/lauttalaiturin piste. | OK |
| Roume 9.46333/−13.79306 | fr-Wikipedia Île de Roume rev 218697404,9°27′48″N13°47′35″W →9.463333…/−13.793055… | Q28041192:n 9.463888…/−13.795833… on noin 310 m eri saaren aluepiste. WP-piste säilyy, ei arvattua sisäänkäyntiä. | OK |
| Tamara 9.48547/−13.82338 | Q110544217 P625 9.485469444…/−13.823380555…; fr-Wikipedia Île de Tamara rev 240156470,9°29′08″N13°49′24″W | WD:n englannin nimike Fotoba ja useita P31-tyyppejä, mutta fr-sitelink saari ja P31 myös island; WP kertoo Tamara/Fotoba. Käytössä saaren edustava aluepiste, ei majakka. | OK |

Myös pallon kaupunkipiste 9.5092/−13.7122 vastaa Q3733:n9.509166…/−13.712222…:a. Sitä ei sekoitettu saaren tai puutarhan pisteeksi. P625-qualifiereita/ajoituksia ei näille valituille pisteille ollut; erilaiset P31-tyypit ja nimimuodot luettiin, niitä ei piilotettu.

Rajaus9.535/9.440/−13.845/−13.681 sisältää kaikki kuusi pistettä. Lähin marginaali on Camayennellä noin 479 m; muut 2293–3896 m. Tämä on pisteiden kehyksen aritmeettinen tarkistus. Se ei ole myöhemmän Mac-kartan rantaviiva-/taitto-/OVP-tarkistuksen väitetty tulos tai kaikkien saarten ääriviivojen rasterikoe. `luonto` viidelle luonnonpaikalle, satama normaalina paikkakohteena. Ei teosta, esinettä, henkilöä tai tapahtumaa karttapisteenä.

## Kaikki 21 kuvaa — oma katselu, kohderaja ja alkuperäistiedot

Jokaisesta tiedostosta oma esikatselukatselu ja alkuperäinen File-sivu. Merkintä **O** = myös alkuperäiskuvan katselu. Alkuperäisleveys kaikilla ≥ 1200 px; 21 eri tiedostoa, yksi käyttö per tiedosto. Kaikki lyhyet nykytekstit≤ 100 merkkiä ja piste lopussa; pitkät yksi virke. Aihetoistoissa eri rooli näkyy kuvatekstistä, eikä sama tiedosto toistu. Lisenssin hyväksyntä tarkoittaa valokuvaa, ei automaattisesti kuvan sisäistä teosta.

| Rooli / tiedosto (File-lähde) | Alkuperäiskoko; tekijä/lisenssi; aika | Oma havainto ja kuvatekstin raja | D |
| --- | --- | --- | --- |
| C1 / [Guinean region of Conakry (ISS022-E-31358).jpg](https://commons.wikimedia.org/wiki/File:Guinean_region_of_Conakry_(ISS022-E-31358).jpg) | 4288×2848; Mission: ISS022 / PD; 2010 | Pitkä lentoaseman kiitotie, laaja rakennettu niemimaa, rannikon kosteikkouomia ja vettä; ei kasvoja eikä päälle lisättyjä merkintöjä. Laajempi niemimaa, ei Tombo. | OK |
| C2 / [Conakry3.JPG](https://commons.wikimedia.org/wiki/File:Conakry3.JPG) | 2048×1536; Soman / CC BY-SA 3.0; 2005(EXIF) | Matalan vesirannan/mutarannan edessä pieni vene; rakennettua rantaa taustalla. Ihmiset kaukaisia pisteitä. Yleinen Conakryn ranta, ei varmennettu Boulbinet. | OK |
| C3 / [Ile de Loose beaches.jpg](https://commons.wikimedia.org/wiki/File:Ile_de_Loose_beaches.jpg) | 1280×960; Johannes Noppen / CC BY-SA 4.0; 2017 | Laaja hiekkainen ja kivinen ranta, palmupuustoa ja saarten siluetteja. Ei luettavia kasvoja tai teosta pääaiheena. Los yleisesti, yksittäistä saarta ei päätellä. | OK |
| K1 / [Conakry.jpg](https://commons.wikimedia.org/wiki/File:Conakry.jpg) | 2048×1536; Joelguinea / CC BY-SA 3.0; 2005(EXIF) | Tiheä vanhan keskustan ilmakuva, rannikko ja satamaympäristö. Rakennukset ovat laajan kaupunkimaiseman osia; yksittäinen suojattu teos ei ole pääaihe. Tombo/Kaloum, ei lentoaseman seutu. | OK |
| K2 **O** / [Port de Boulbinet1.jpg](https://commons.wikimedia.org/wiki/File:Port_de_Boulbinet1.jpg) | 3948×2961; Flucco / CC BY-SA 4.0; 2020 | Kalastusveneiden ryhmä, liput, laitojen kirjaimet/väriraidat ja oikean keulan kuvallinen kilpi. Alkuperäispikseleiden katselussa istuvan henkilön kasvot ovat luettavissa: R2 hylkäys. Kilven tekijä ja lupa puuttuvat: R3 epävarma. | VÄÄRIN / EPÄVARMA |
| K3 / [Port autonome de Conakry.jpg](https://commons.wikimedia.org/wiki/File:Port_autonome_de_Conakry.jpg) | 3777×2832; Flucco / CC BY-SA 4.0; 2020 | Konttialus, lastinkäsittelynosturit ja kontit; aluksen ja konttien tunnisteet fyysisissä pinnoissa, ei lisätty vesileima. Kaupallinen satama, ei Boulbinet eikä todistettu mineraalilasti. | OK |
| K4 **O** / [Majestic kapok tree in Ecuador.jpg](https://commons.wikimedia.org/wiki/File:Majestic_kapok_tree_in_Ecuador.jpg) | 3732×3024; Fährtenleser / CC BY-SA 4.0; 2019 | Suuren kapokkipuun runko ja leveät tyviosat, vihreää kasvillisuutta. Henkilö kumartaa päänsä lippalakin alle, kasvonpiirteet eivät ole luettavia. Ecuadorin yleispuu, ei Camayennen oma yksilö. | OK |
| T1 / [Los Islands, Guinea.jpg](https://commons.wikimedia.org/wiki/File:Los_Islands,_Guinea.jpg) | 1280×2048; Axelspace Corporation / CC BY-SA 4.0; 2017 | Satelliittinäkymä pitkän niemimaan ja kaarevien saarten järjestyksestä; meri ja pieniä pilviä, ei lisättyjä nimiä/numeroita. Kuvasta ei päätellä kivilajia tai ikää. | OK |
| T2 **O** / [K7890.jpg](https://commons.wikimedia.org/wiki/File:K7890.jpg) | 4032×3024; Flucco / CC BY-SA 4.0; 2019 | Kivinen hiekkaranta, lukuisia vastavalon tummia uimarihahmoja ja etualalla selin istuva henkilö. Alkuperäisestä eivät erotu luettavat kasvot. Kassan ranta, ei louhos tai turvallisen uinnin lupaus. | OK |
| T3 **O** / [Plage du Gouverneur à Roume.jpg](https://commons.wikimedia.org/wiki/File:Plage_du_Gouverneur_%C3%A0_Roume.jpg) | 5184×3456; Aboubacarkhoraa / CC BY-SA 4.0; 2020 | Laaja hiekkaranta, rantakallioita ja metsäistä/palmuista rinnettä, pieniä rakennuksia taustalla ja kaukaisia ihmisiä. Alkuperäisessä ihmiset pieniä ja pehmeitä, ei luettavaa kasvonpiirrejoukkoa. Roumen ranta. | OK |
| T4 / [Île de fotoba.jpg](https://commons.wikimedia.org/wiki/File:%C3%8Ele_de_fotoba.jpg) | 5184×3206; Kalissa Mamayimbé kir / CC BY-SA 4.0; 2019 | Matalaa kasvillisuutta ja kivinen vesireuna, avoin meri. Ei ihmistä tai erillistä rakennettua teosta pääaiheena. Fotoba/Tamara; lajia ei nimetä. | OK |
| TRAVELER **O** / [Conakry Coast.jpg](https://commons.wikimedia.org/wiki/File:Conakry_Coast.jpg) | 3024×4032; Johannes Noppen / CC BY-SA 4.0; 2021 | Tavallisen parvekkeen laattalattia, seinä, lasiovi, suoraputkinen kaide ja pieni kattovalaisin kehystävät meren; alhaalla puu ja kattoja. Yksi parvekkeelta avautuva rannikkonäkymä. Ei kasvoja, kuvateosta tai nimetyn monumentin julkisivua. | OK |
| O3 / [Conakrybak2.jpg](https://commons.wikimedia.org/wiki/File:Conakrybak2.jpg) | 2560×1440; Bakayoko Malal / CC BY-SA 4.0; 2021 | Ratoman/Taouyan kallioista kaupunkirantaa, meri ja rakennettua rantaa taustalla. Ei luettavia kasvoja. Paikallinen meriympäristö, ei Los-saari tai laituri. | OK |
| O4 / [Hibiscus Lemonade Drink.jpg](https://commons.wikimedia.org/wiki/File:Hibiscus_Lemonade_Drink.jpg) | 3024×4032; Afimaame / CC BY-SA 4.0; 2023 | Punertava jääjuoma tavallisessa kupissa, pilli, käsi ja irrotettu kansi. Ei kasvoja tai päälle lisättyä merkintää; kannen pienet valmistusmerkinnät ovat esineen pintaa. Ghanan yleinen hibiskusjuoma, ei Guineassa kuvattu annos. | OK |
| O5 / [Conakrybak.jpg](https://commons.wikimedia.org/wiki/File:Conakrybak.jpg) | 2560×1440; Bakayoko Malal / CC BY-SA 4.0; 2021 | Rantamaa ja kasveja, meri; pieni muurin osa reunassa. Luontoranta pääaihe, ei teos/ihminen. Ratoma/Taouya, ei puutarha tai saaristokohde. | OK |
| N1 / [Un aperçu de la ville de conakry.jpg](https://commons.wikimedia.org/wiki/File:Un_aper%C3%A7u_de_la_ville_de_conakry.jpg) | 2000×1500; Alpha hmd / CC BY-SA 4.0; 2019/EXIF2018 | Vanhan keskustan laaja korttelimaisema, meri ja kaukaista satamaympäristöä. Ei yhtä suojattua rakennusta pääaiheena. Camera location vanhan ytimen alueella. Summary 2019 / EXIF 2018: vuosi EPÄVARMA. | EPÄVARMA |
| N2 / [Bateau au port Autonome de Conakry.jpg](https://commons.wikimedia.org/wiki/File:Bateau_au_port_Autonome_de_Conakry.jpg) | 2560×1694; Aboubacarkhoraa / CC BY-SA 4.0; 2019 | Vihreä rahtialus, kontit, nosturit ja vesi. Ei luettavia kasvoja; aluksen logot/tunnisteet eivät ole erillisen mainoskuvan pääaihe. Kaupallinen satama, lastin sisältöä ei päätellä. | OK |
| N4 / [Ille de kassa.jpg](https://commons.wikimedia.org/wiki/File:Ille_de_kassa.jpg) | 2880×1728; Ourysow92 / CC BY-SA 4.0; 2017 | Hiekkaa, rantakiviä ja palmupuustoa; pieni tekninen torni kaukana. Ei kasvoja tai yksittäistä taideteosta. GPS ja Summary Kassa; kuvasta ei päätellä kiven koostumusta. | OK |
| N5 / [Strand nach Süden auf Roume.jpg](https://commons.wikimedia.org/wiki/File:Strand_nach_S%C3%BCden_auf_Roume.jpg) | 3754×2815; Flucco / CC BY-SA 4.0; 2020 | Kivinen eteläranta, aallot ja matala aurinko; pieni rakennus kaukana. Ei ihmistä tai erillistä teosta pääaiheena. Roume, ei maihinnousulaituri. | OK |
| N6 / [Île de fotoba 2.jpg](https://commons.wikimedia.org/wiki/File:%C3%8Ele_de_fotoba_2.jpg) | 5184×3340; Kalissa Mamayimbé kir / CC BY-SA 4.0; 2019 | Kivinen vesireuna, matalaa puustoa, oksissa pieniä riippuvia muotoja ja vähäistä roskaa. Ei ihmisiä tai taideteosta. Fotoba/Tamara; ei oletettua kasvi- tai lintulajia. | OK |
| PHOTO **O** / [Conakrybak3.jpg](https://commons.wikimedia.org/wiki/File:Conakrybak3.jpg) | 4160×3120; Bakayoko Malal / CC BY-SA 4.0; 2021 | Ratoman/Taouyan rantakalliot ja meri; oikealla henkilö kokonaan selin. Ei luettavia kasvoja. Kaupungin ranta vuonna 2021, ei Tombo/Los tai vuoden 1873 vedos. | OK |

### Krediitit, ajoitus ja oikeusrajat

**Joelguinea:** File:Conakry.jpg rev 1058091872 Licensing-laatikossa `Attribution: Joelguinea` nimenomaisesti. Valittu CC BY-SA 3.0 on sivulla tarjolla GFDL:n lisäksi. `artistFieldSource` = Explicit license attribution; not inferred uploader identity. Tämä ei ole API Artist -kentän väitetty luku eikä arvattu henkilön oikea nimi.

**Soman:** File:Conakry3.JPG rev 1244844324 Summary-kappale sanoo `Conakry, Guinea. Photo: Soman`. Tarjottu CC BY-SA 3.0 ja 2048×1536 koko luettiin suoraan; `artistFieldSource` = Explicit Summary Photo credit; not inferred uploader identity. Ei uploaderista pääteltyä krediittiä. Molempien 2005 on kameran EXIF-tiedossa; Summary ei anna erillistä ristiriitaista vuotta.

**Muut 19:** Artist/Author-taulurivi; File-sivun lyhyt lisenssi vastaa käytettyä lähderiviä. Käytetyt nimimuodot, mm. Mission: ISS022, Fährtenleser, Kalissa Mamayimbé kir ja Aboubacarkhoraa, säilyvät. Lähderivi vastaa B:n valintaa sanatarkasti. Kaikki Date/EXIF-rivit tarkistettu: ainoa eri vuosien ristiriita on R4. Vuosi ei tarkoita 2026-nykytilaa. Tuoreen matkailijalle-kuvan 2021 ja 0,75 pystysuhde näkyvät oikein; vanha 1873-PD-vedos ei ole tässä valittu.

**Parvekkeen sommittelu:** File:Conakry Coast.jpg rev 866906141, 3024×4032, 15.1.2021, Johannes Noppen, CC BY-SA 4.0. Lattia/seinä/kaide vievät suuren osan vasemmasta ja alareunasta, mutta kehystävät yhtä merelle avautuvaa paikkaa. Tausta ei ole irrallinen toinen kuvakertomus. Sivun tunnistus on Conakryn rannikko, joten kuvateksti pysyy yleisellä parvekkeen merinäkymän tasolla; hotellia, saarta tai näkymäpistettä ei nimetä. Sommittelu on D:ssä hyväksyttävä tähän rajattuun rannikkorooliin, ei kaupungin yksittäisen maamerkin todiste.

**Parvekkeen teosoikeus:** Kuva näyttää suoria toiminnallisia pintoja/kaidetta, ei rakennuksen kokonaisjulkisivua, kuvan pääaiheena olevaa monumenttia, veistosta tai erillistä kuvateosta. Tavanomainen toiminnallinen kaide ei pelkän esineolemuksensa vuoksi ole todettu suojatuksi teokseksi. Tässä katselussa ei ilmennyt nimenomaista suojattua teosaihetta pääaiheena. Hyväksyntää ei perusteta kuviteltuun rajattomaan kaupalliseen FOP:iin tai oletukseen, että parveke olisi julkinen paikka; Guinean art. 27:n kaupallisen pääaihekäytön raja säilyy.

**Veneiden pinta-aiheet:** K2:n kirjaimet/väriraidat, liput ja kilpimaalaus erotettiin. Kuvaajan CC-lisenssi ei yksin kata toisen tekemää maalausta. Kilven oikeusketju R3 avoinna; R2 hylkää tiedoston luettavien kasvojen vuoksi. K3/N2:n konttien ja rahtialusten käyttötunnisteet ovat satamapaikan sivuosia; kuvat eivät ole logomainoksia tai erillisen kuvan/taideteoksen reproduktioita.

**Luontokuvat ja yleiskuvat:** Los-saaret/rantakivet/puut ovat luonnonaiheita. Nähtyä tavallista luontokuvaa ei hylätty Guinean art. 45:n tai folklore-ketjun perusteella. Ecuadorin kapokki on nimenomaisesti yleiskuva; Ghanan hibiskusjuoma yleinen ruoka-aiheen havainnollistus. Niistä ei johdeta paikallista Camayenne-yksilöä, puiden lajivarmuutta, Guinean reseptiä tai N3-kuvavajeen täyttymistä. ISS-lentoasemakuva ei Tombo, Conakry3.JPG ei todistettu Boulbinet, Ratoma/Taouya ei saariretken saari tai laituri.

**Kasvot ja merkinnät:** Kassa/Roume-rantojen ihmiset katsottiin alkuperäisestä, puun henkilön lippalakki ja Ratoman selin oleva henkilö samoin. Näiden kuvien kaukaiset pisteet, selät ja tummat/pehmeät hahmot eivät olleet luettavia kasvoja. Boulbinetin luettavat kasvot käsiteltiin erikseen R2:ssa. Ei lisättyjä vesileimoja, leimoja, kehystyksiä tai alle 1200 px valintaa. Kuvassa fyysisesti olevat kirjaimet, veneiden nimet ja kannen pintateksti eivät ole kuvan päälle lisättyjä merkintöjä. K2:ssa alkuperäispikseleiden tarkempi katselu paljasti luettavat kasvot (R2), joten nykyinen 21 kuvan paketti sisältää yhden hylätyn kuvan. R3:n oikeusepävarmuus säilyy; 21/21 ei merkitä hyväksytyksi.

Guinean alkuperäinen laki luettu: [L/2019/0028/AN, Assemblée Nationale, art.7/27/29/45/95–98](https://cnt.gov.gn/archive.assemblee/www.assemblee.gov.gn/conakry-le-07-juin-2019-l20190028an-loi-portant-protection-de-la-propriete-litteraire-et-artistique.html). `LAW-artiklat.txt` ja koko alkuperäissivu omassa todistekansiossa. Art.45 koskee suojan päätyttyä domain public -teosten kaupallista käyttöä, art. 95–98 tunnistettavia taiteellisen/kirjallisen perinteen ilmaisuja; niistä ei tehty yleiskieltoa saarelle, kivelle tai puulle.

## Lähdehakemisto — D:n omat alkuperäiset sivut

Hakupäivä 11.10.2026; täsmällinen URL, raakakopio ja HTTP-/hash-jälki todisteissa. WP-revisio luettu omasta HTML:stä, WD lastrevid omasta JSON:sta. Usean artikkelin sama lähdeperinne ei todista riippumattomuutta.

| Tunnus | Alkuperäinen sivu | Oma revisio / laajuus |
| --- | --- | --- |
| E | [Conakry](https://en.wikipedia.org/wiki/Conakry) | 1379002361 |
| F | [Conakry](https://fr.wikipedia.org/wiki/Conakry) | 239109307 |
| T | [Tombo Island](https://en.wikipedia.org/wiki/Tombo_Island) | 1376064094 |
| K | [Kaloum](https://en.wikipedia.org/wiki/Kaloum) | 1377401137 |
| L | [Îles de Los](https://en.wikipedia.org/wiki/%C3%8Eles_de_Los) | 1369180324 |
| LF | [Îles de Loos](https://fr.wikipedia.org/wiki/%C3%8Eles_de_Loos) | 237112585 |
| KA | [Île de Kassa](https://fr.wikipedia.org/wiki/%C3%8Ele_de_Kassa) | 239404694 |
| R | [Île de Roume](https://fr.wikipedia.org/wiki/%C3%8Ele_de_Roume) | 218697404 |
| TA | [Île de Tamara](https://fr.wikipedia.org/wiki/%C3%8Ele_de_Tamara) | 240156470 |
| P | [Port de Conakry](https://fr.wikipedia.org/wiki/Port_de_Conakry) | 217588308 |
| G | [Conakry Botanical Garden](https://en.wikipedia.org/wiki/Conakry_Botanical_Garden) | 1339638015 |
| GF | [Jardin botanique de Camayenne](https://fr.wikipedia.org/wiki/Jardin_botanique_de_Camayenne) | 236333252 |
| M | [Sandervalia National Museum](https://en.wikipedia.org/wiki/Sandervalia_National_Museum) | 1363438435 |
| A | [Ahmed Sékou Touré International Airport](https://en.wikipedia.org/wiki/Ahmed_S%C3%A9kou_Tour%C3%A9_International_Airport) | 1379527927 |
| V | [Conakry](https://en.wikivoyage.org/wiki/Conakry) | 5368248 |
| C | [Guinean cuisine](https://en.wikipedia.org/wiki/Guinean_cuisine) | 1364284019 |
| BC | [Conakry](https://www.britannica.com/place/Conakry) | ei WP-revisiota; alkuperäinen sivu |
| BL | [Los-Islands](https://www.britannica.com/place/Los-Islands) | ei WP-revisiota; alkuperäinen sivu |
| UK0 | [guinea](https://www.gov.uk/foreign-travel-advice/guinea) | ei WP-revisiota; alkuperäinen sivu |
| UK1 | [safety-and-security](https://www.gov.uk/foreign-travel-advice/guinea/safety-and-security) | ei WP-revisiota; alkuperäinen sivu |
| LAW | [conakry-le-07-juin-2019-l20190028an-loi-portant-protection-de-la-propriete-litteraire-et-artistique.html](https://cnt.gov.gn/archive.assemblee/www.assemblee.gov.gn/conakry-le-07-juin-2019-l20190028an-loi-portant-protection-de-la-propriete-litteraire-et-artistique.html) | ei WP-revisiota; alkuperäinen sivu |
| PORTEN | [Autonomous Port of Conakry](https://en.wikipedia.org/wiki/Autonomous_Port_of_Conakry) | 1240174906 |
| Q3733 | [Q3733.json](https://www.wikidata.org/wiki/Special:EntityData/Q3733.json) | 2537906983; labels/sitelinks/P31/P625 |
| Q1572991 | [Q1572991.json](https://www.wikidata.org/wiki/Special:EntityData/Q1572991.json) | 2551502828; labels/sitelinks/P31/P625 |
| Q17332858 | [Q17332858.json](https://www.wikidata.org/wiki/Special:EntityData/Q17332858.json) | 2506390859; labels/sitelinks/P31/P625 |
| Q5158067 | [Q5158067.json](https://www.wikidata.org/wiki/Special:EntityData/Q5158067.json) | 2494013661; labels/sitelinks/P31/P625 |
| Q24854585 | [Q24854585.json](https://www.wikidata.org/wiki/Special:EntityData/Q24854585.json) | 2304628557; labels/sitelinks/P31/P625 |
| Q28041192 | [Q28041192.json](https://www.wikidata.org/wiki/Special:EntityData/Q28041192.json) | 2371380038; labels/sitelinks/P31/P625 |
| Q110544217 | [Q110544217.json](https://www.wikidata.org/wiki/Special:EntityData/Q110544217.json) | 1995847584; labels/sitelinks/P31/P625 |

## Mitat ja alkuperäisten tarkistimien tulos

| Osa | Oma mittaus |
| --- | --- |
| Intro / lue lisää |852 / 853 merkkiä; kummassakin 3 kappaletta. Intro 9 virkettä, 3 lihavointia. |
| Kansi K1–K4 |484/512/507/493 merkkiä; R1 jälkeen 515 K2:ssa. |
| Luonto T1–T4 |513/506/513/505 merkkiä. |
| Kuusi kohdetekstiä Tombo/satama/puutarha/Kassa/Roume/Tamara |989/947/850/989/891/849 merkkiä, kussakin 3 kappaletta. |
| Matkailijalle / opas |5 virkettä; 5 jaksoa, 3 kuvaa ja 2 sallittua kuvattomuutta, Parasta 5, Hyvä tietää 4. |
| Quiz / tiedot / minitehtävä |5/3/1, vastaus- ja vihjeportti tarkistettu. |
| Kuvat |21 eri tiedostoa, jokainen≥ 1200 px;21 lyhyttä tekstiä≤ 100 merkkiä. R2 kuva hylätty, R3 maalauksen oikeusportti ja R4 ajoitus avoinna. |
| Kartta / ilmasto |6 alkuperäislähteen pistettä;48/48 lukua ja lähde samat kuin säätyökalun tulos, myös oma WP-poiminta 48/48. |

Paikallinen: `node paakaupungit-pilvi/tyokalu.mjs tarkista e04 conakry`.

Verkko samasta NAS-kloonista: `node --import ../valiaikainen/lahdesovitus.mjs paakaupungit-pilvi/tyokalu.mjs tarkista e04 conakry --verkko`.

Kumpikin exit 1, sama tulos sanatarkasti:

```text
VIRHE conakry: juttu Camayennen kasvitieteellinen puutarha: kuvia 1–3
== conakry: 1 virhettä, 0 varoitusta, 21 kuvaa
YHTEENSÄ 1 kaupunkia: 1 virhettä, 0 varoitusta
```

Lokit `tarkistin-paikallinen.txt` ja `tarkistin-verkko.txt` omassa D-aineistossa. Wiki-otsikkojen, kuvalisenssien, tekijäkrediittien tai leveyksien konevirhettä ei saatu. Tämä tulos koskee tarkastettua nykyistä JSONia ennen E-korjauksia; R2:n kuvan poistaminen kasvattaisi konevirheitä ja se on raportoitava erikseen.

## Avoin jatko ja Korjattu

**Korjattu:** D ei korjannut sisalto.jsonia. R1/R2/R4 ovat sanatarkkoja E:n toimeksiantoja, R3 kuvatun maalauksen erillinen oikeusportti. R2 hylkää nykyisen tiedoston luettavien kasvojen vuoksi. Kaikki kuusi kaupungin alkuperäistä tiedostoa säilyivät lähtömanifestin hasheissa; vain tämä tarkistus.md lisättiin kaupungin kansioon. Ei C/E/F-valmismerkintää, hyväksyttyä erää, pelikytkentää tai julkaisua.

Camayenne tarvitsee oman paikallisen puutarha-/kapokkikohdekuvan, jossa paikka ja oikeudet varmistetaan. Ecuadorin kuva ei täytä tätä. R2:n venevalinta poistetaan luettavien kasvojen vuoksi tai vaihdetaan uuteen itsenäisesti tarkistettuun valintaan erikseen valtuutetussa työssä. R3:n maalauksen oikeusketjun varmistaminen ei palauta kasvojen vuoksi hylättyä tiedostoa. R4 tarvitsee kaksi vuosiluvutonta kuvatekstiä; kuva säilyy muutoin hyväksyttävänä vanhan keskustan yleiskuvana. R1 tarvitsee yhden kokonaisen nostotekstin korvauksen.

Päätoimittajan viisi kysymystä yhä avoinna: #74-kuvattomuus ja nollavirheportti;70 vuoden teoskohderaja suhteessa kaupalliseen FOP:iin; vanhan luonnonpystyn käyttö; alkuperäisen painotuotteen kuvateksti; saman paikan kuvat nostossa ja kohdejutussa. Tässä ei sovellettu uusia poikkeuksia eikä tehty uusia kuvaehdokkaita. D:n havaintojen käsittely ja loppuportti tehdään erillään tästä raportista.

## Korjattu — erillinen E1-toteutus 11.10.2026

Uusi korjaaja ei osallistunut Conakryn A/C/D-vaiheisiin. Toteutettu D:n R1, R2 ja R4 sanatarkasti kokonaisina kenttäarvoina: **täsmälleen 7 JSON-arvoa** muuttui. R1:n teksti kopioitiin D:n JSON-lainauksesta (515 merkkiä). R2:n tiedosto, lyhyt, selite ja lahde tyhjennettiin (kukin 0 merkkiä). R4:n molemmat kuvatekstit kopioitiin D:n vuosiluvuttomista JSON-lainauksista (41 ja 94 merkkiä). Kohteen tiedosto ja tekijäkrediitti säilyivät.

R3:n kilpimaalauksen oikeusketjua **ei ratkaistu** eikä maalauksen vapautta väitetä. Port de Boulbinet1.jpg poistui käytöstä R2:n luettavien kasvojen vuoksi; myös epävarman teoksen käyttö poistui samalla. Myöhempi maalauksen oikeusratkaisu ei palauta kasvoportissa hylättyä tiedostoa. Alkuperäinen B:n valinta/provenance sekä D:n alkuperäiset kuvat, katselurajaukset ja hylkäystodisteet säilyivät byte-identtisinä.

Paikallinen ja sallittu --verkko-tarkistus samalla muuttumattomalla tyokalu.mjs:llä: kumpikin **2 virhettä, 0 varoitusta, 20 kuvaa**, exit 1. Avoimina ovat kansinoston K2 tiedosto ja Camayennen paikallinen kohdekuva. Ecuadorin yleispuu ei korvaa puutarhan omaa kuvaa. Kuvattomuutta ei merkitty hyväksytyksi poikkeukseksi, eikä lisätty uutta kuvaa. Uusia korjauskierrosta vaativia tekstivirheitä, krediitti-/lisenssi-/kokovirheitä tai wiki-otsikkovirheitä ei verkkotarkistuksessa ilmennyt; toinen E-kierros ei ollut tarpeen.

```text
VIRHE conakry: kansi nosto 2: tiedosto puuttuu
VIRHE conakry: juttu Camayennen kasvitieteellinen puutarha: kuvia 1–3
== conakry: 2 virhettä, 0 varoitusta, 20 kuvaa
YHTEENSÄ 1 kaupunkia: 2 virhettä, 0 varoitusta
```

Sääluvut, kartta, muut tekstit/numerodata ja JSON-rakenne ennallaan. Ennen/jälkeen-kopiot, tarkat seitsemän arvon erot ja sanatarkkuustodiste, alkuperäisen tarkistimen hash sekä B/D-aineistojen säilymisen manifestit: `valiaikainen/conakry-E/`. Sisältö SHA-256: `0d7b0400af3f5704a84073e927c8da189f69c7af364c3dd1973dd4aa521d7701`. E1:n määrätyt korjaukset tehty, mutta kaupunki ja C/E/F pysyvät keskeneräisinä kahden kuvapuutteen vuoksi. Ei valmismerkintää, Git-operaatioita, generointia, pelikytkentää tai julkaisua.

## D-lisätarkistus: uusi K2-valinta ennen E2:ta

B ja alkuperäinen C-tekijä katsoivat uuden valinnan sekä esikatselun että alkuperäisen. Pääsession erillinen lisätarkistus koski vain tätä uutta kuvaa; pääsessio ei osallistunut Conakryn A:han, C:n kirjoittamiseen tai B:n valintaan eikä lukenut koko sisalto.jsonia. Muun sisällön alkuperäinen riippumaton D-raportti säilyy.

Bateau au port de Conakry.jpg, revisio 1279710108: 2119×1330, Aboubacarkhoraa, CC BY-SA 4.0, Own work. Alkuperäinen katsottu täydellä pikselikoolla. Tavallinen valko-keltainen aluksen sivu, pintakirjaimet ja pieni C-käyttötunniste; ei luettavia kasvoja, erillistä kuvallista kilpeä, vesileimaa tai kehystä. Ei nimenomaista erillisen taideteoksen reproduktiota; hyväksyntä ei perustu kuviteltuun rajattomaan FOP:iin. Summary ja EXIF:n kuvaus-/digitointipäivä ovat sama 4.4.2019. Tiedoston myöhempi muokkauspäivä ei ole kuvauspäivä.

Kuva havainnollistaa K2:n satamavertailun kaupallista puolta. Se ei ole Boulbinetin kalasataman kuva, nykyisen lastin/reitin väite tai C2:n laajakuva. Hylätty Port de Boulbinet1.jpg jää hylätyksi. N3 Camayennen kohdekuva on edelleen avoin.

E2 saa korvata vain K2:n neljä nykyisin tyhjää kuvakenttää alla sanatarkasti. Muut E1:n seitsemän korjausta säilyvät. Tämä on kuvavalinnan lisähyväksyntä, ei valmis-C/E/F tai valmis-kaupunki. Todisteet valiaikainen/conakry-D-taydennys/katselu.json ja C-täydennyksen hashit.

```json
{
  "tiedosto": "Bateau au port de Conakry.jpg",
  "lyhyt": "Rahtialus Conakryn kaupallisessa satamassa vuonna 2019.",
  "selite": "Conakryn kaupallisen sataman rahtialus vuonna 2019 näyttää satamien vertailun kaupallisen puolen, kun Boulbinet on erillinen kalasatama.",
  "lahde": "Aboubacarkhoraa, Wikimedia Commons (CC BY-SA 4.0)"
}
```

## Korjattu — E2:n neljä kuvakenttää

Toinen E-kierros toteutti vain D-lisätarkistuksen hyväksymät neljä nykyisin tyhjää K2-kuvakenttää sanatarkasti tiedostosta `valiaikainen/conakry-D-taydennys/hyvaksytyt-kentat.json`: tiedosto, lyhyt, selite ja lahde. Tiedosto on **Bateau au port de Conakry.jpg**. Kuvateksti nimeää kaupallisen sataman rahtialuksen ja K2:n satamavertailun kaupallisen puolen; kuvaa ei väitetä Boulbinetin kalasatamaksi eikä rahtia tai reittiä päätellä.

E1:n korjattu R1-teksti sekä R4:n kaksi vuosiluvutonta kuvatekstiä säilyivät sanatarkasti. Alkuperäinen Port de Boulbinet1.jpg jäi pois käytöstä ja hylätyksi luettavien kasvojen vuoksi; sen R3-kilpimaalauksen erillisiä oikeuksia ei ratkaistu tai väitetty vapaiksi. Vanhoja B/D-todisteita ja D-lisähyväksyntää ei muutettu.

Paikallinen ja sallittu alkuperäinen verkkotarkistus: kumpikin **1 virhe, 0 varoitusta, 21 kuvaa**, exit 1. Ainoa virhe on edelleen Camayennen oma puutarha-/kapokkikohdekuva. N3:n tyhjä kuvalista säilyy; Ecuadorin yleispuu ei täytä sitä.

```text
VIRHE conakry: juttu Camayennen kasvitieteellinen puutarha: kuvia 1–3
== conakry: 1 virhettä, 0 varoitusta, 21 kuvaa
YHTEENSÄ 1 kaupunkia: 1 virhettä, 0 varoitusta
```

Vain **4 JSON-arvoa** muuttui E1:n sisällöstä. Muu JSON, tekstit, numerodata, kartta, sää ja muut kuvavalinnat säilyivät. Ennen/jälkeen-kopiot ja tarkka neljän arvon vertailu `valiaikainen/conakry-E/kierros2/`; sisältö SHA-256 `a535ddac39f2744f502ac017ceac3eb95bd43958fdac482f3273760b98b7fca3`. Tyokalu.mjs muuttumaton, tarkistimen hash `78c2150e6510ffcd51f05a44898316122f6d98100abd6dc51666de706fd1467c`. Kaksi E-kierrosta käytetty. Ei uutta lähde-/kuvaroolia, uusia agentteja, Git-operaatioita, valmis-C/E/F- tai kaupunkimerkintää, pelikytkentää tai julkaisua.
