## 2026-10-13 18.xx UTC — KORJAUSKIERROS e04–e14 (PT 13.10.)

Sisältökirjuri teki riippumattoman tekstipistokokeen (31 kaupunkia / 93, 3 per erä; faktat tarkistettu lähteistä). Faktat ovat pääosin oikein (yhtään väärää oikeaa vastausta ei löytynyt 93 otoskysymyksestä), mutta kaikki erät tarvitsevat korjauskierroksen ennen pelikytkentää. Omistajan päätös: pääkaupunkien viimeistely on Codexin työtä, joten korjaa:

1. **Kaupunkikohtaiset löydökset:** `posti/fable-codex-paakaupungit-korjauslista-20261013.md` (VIRHE 7, KORJAA 153, HUOM 191; kenttäpolut sisalto.json:iin). Korjaa jokainen löydös annetuissa kaupungeissa.
2. **Yleissäännöt KAIKKIIN 93 kaupunkiin** (otos kertoo virhetyypit, ei kaikkia virheitä; tarkista kaikki kaupungit samoilla säännöillä):
   - EI metapuhetta pelaajatekstissä: ei "lähteen mukaan", "tässä aineistossa", "ei pidä päätellä…", "yhden puun lajia ei arvata", "vanhojen oppaiden hinnat" -tyyppisiä kirjoitusprosessin lauseita eikä tyhjiä yleisiä loppukaneetteja, jotka sopisivat mihin tahansa kaupunkiin.
   - Kuvateksti (lyhyt ja selite) kertoo mitä kuvassa näkyy ja kohteesta; lyhyt ja selite eivät ole sama teksti; älä väitä enempää kuin Commonsin kuvasivu ("kukkulalta", "lännestä", "satama" ym. vain jos sivu sanoo niin).
   - Välilyöntivirheet pois: koko e04–e14 regex `[a-zäö]\d{4}\b` ja `(vuonna|vuoden|vuodelta|kesällä…)\d` (esim. "vuonna2020", e04 28 kenttää), tuplavälit, pehmeät tavuviivat (U+00AD).
   - Luonnollinen suomi: lajinimet suomenkielisistä lähteistä (esim. harmaakefaali, ei "kelttikala"; merinahkakilpikonna; kotilo ≠ simpukka), ei konekäännöstä ("maaytiminen täyttörakenne", "keskivuosi"), ei englanninkielisiä lintunimiä suomentamatta, selitä lyhenteet (WAM).
   - Visat: vihje ei paljasta vastausta; väärät vaihtoehdot uskottavia mutta selvästi vääriä (ei absurdeja, ei kahta oikeaa); kysymyksen source-URL tukee juuri väitettä. (Oikean vastauksen indeksi 0 on ok, peli sekoittaa.)
   - Aikasidonnainen varoitus (matkustusvaroitus, sulku, aukiolo) enintään KERRAN per kaupunki ja muotoiltu vanhenemattomaksi; ei samaa varoitusta 6–8 kertaa.
   - Ei päällekkäisyyttä pelin olemassa olevan sisällön kanssa: tarkista ennen kirjoitusta `git grep -n -i "<kaupunki/aihe>" origin/main -- js data`; erityisesti Brazzaville ja Libreville (e06: rumba, Pool Malebo, kohdekartat), Brasília (js/packs/maastokohteet-bra.js), Port Louis (maakartat.js), Dhaka (rikshamaalaus). Päällekkäisen tarinan tilalle toinen aihe.
   - Kuvat VAIN Commonsista (omistajan linjaus 13.10.), ei uusia generointeja; Monrovian muualla kuvatut kuvat (Berliinin falafel, Nepalin riisi ym.) pois, ei epäaitoja kuvia.
3. **e04 tehdään KOKONAAN uudelleen** (Nouakchott HYLKÄÄ, Monrovia kesken; Rabat valmis pienin korjauksin; alger, banjul, bissau, conakry, praia, tunis tarkistetaan täysin samoin säännöin). Nouakchott: rakentamisen ajoitus (1958, ei "1900-luvun puoliväli"), meteoriittikysymys pois, kuvat/kohteet/sää tuotettava.
4. Toimitus: korjatut sisalto.json-tiedostot erän haaraan `paakaupungit-eNN-codex` ja rivi `posti/codex-fable-paakaupungit.md`. Sisältökirjuri tekee uusintapistokokeen (2 kaupunkia/erä) ja kuittaa erät pelikoodarille.

## 2026-10-13 14.41 UTC — LINJAUS: pääkaupunkien kuvat jatkossa VAIN Commonsista (omistaja 13.10.2026 klo 17.4x)

Omistaja: "nykyiset voi jättää, mutta jatkossa vain commons". Jo toimitetut havainnekuvat (myös ruoka-, luonto- ja
nähtävyysjuttujen kuvitukset) saavat jäädä. Tästä eteenpäin pääkaupunkien lehtiin, nähtävyysjuttuihin, valokuva-osioon
ja oppaaseen EI generoida uusia kuvia eikä uusintoja: kuvat vain Wikimedia Commonsista (PD/CC, panoraamavapaussääntö
16.15 UTC ennallaan), kuten PILVIOHJE-paakaupungit.md:n luku "Ei generointia" sanoo. Jos Commonsista ei löydy
sopivaa vapaata kuvaa, jätä kohta ilman kuvaa tai valitse toinen kohde ja kirjaa se RAPORTTI.md:hen.
Kunkin pääkaupungin kaksi hyväksyttyä havainnekuvaa (kaupunkinäkymä ja tunnuskohde, tilaus 10.10.) pysyvät.

## 2026-10-11 16.15 UTC — LISÄSÄÄNTÖ: panoraamavapaus (Päätoimittaja, Raamattu #4431)

Peli on kaupallinen: rakennuksen tai julkisen taideteoksen kuva kelpaa vain, jos kuvauspaikan maan panoraamavapaus sallii
kaupallisen käytön juuri sille teostyypille (Commons COM:FOP). Pelkkä ei-kaupallinen panoraamavapaus = ei vapautta.
Epävarmassa tapauksessa valitse toinen vapaa kuva tai jätä kohde ilman kuvaa ja kirjaa se RAPORTTI.md:hen.

## 2026-10-11 15.30 UTC — TARKENNUS: pääkaupungit e04–e14 (Päätoimittaja, Karttasepän laudan tarkistuksesta #4423)

- **Jätä pois:** Freetown (Sierra Leonen kaupunkilehti on jo pelissä) ja Sri Jayawardenepura Kotte (Colombo 6 km). Eriin jää 93 kaupunkia.
- **Tunis ja Antananarivo kevyinä:** älä toista Karthagoa (Tunisin lehti) äläkä Madagaskar-lehden kannen kohteita; valitse niille muut kohteet.
- Laudan rivit, reitit ja maakoodit ovat jo valmiina meidän puolella; sinun ei tarvitse tehdä niitä (ohjeen luku 1).

## 2026-10-11 15.00 UTC — TILAUS: pääkaupungit e04–e14 (omistaja 11.10.2026 klo 17.5x)

Omistaja antaa pääkaupunkien viimeistelyn koko maailmassa Codexille. Lue haaran `paakaupungit-codex-pohja`
tiedosto `paakaupungit-pilvi/CODEX.md` ja tee sen mukaan: erät e04–e14 (96 kaupunkia) ohjeella
`paakaupungit-pilvi/PILVIOHJE-paakaupungit.md`, haara per erä `paakaupungit-<erä>-codex`, valmiista erästä
rivi tiedostoon `posti/codex-fable-paakaupungit.md`. Korjauspyynnöt ja vastaukset tulevat tähän tiedostoon.
