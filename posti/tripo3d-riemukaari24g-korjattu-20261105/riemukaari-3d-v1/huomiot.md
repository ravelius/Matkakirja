# riemukaari: toimitus arvioitavaksi

LIIKE: ei liikettä. Ei luurankoa eikä animaatioita.

Ensisijainen `riemukaari.glb` on tarkempi versio. `vertailu/riemukaari-kevyt.glb` on vain vertailukappale: Tripon kevennys tuotti laajoja kolmiomaisia sävyeroja kattopinnoille ja kasvatti nollan UV-alan pintaa. Ei suositella automaattiseksi korvaajaksi.

Tripo job b14be7b1-ed4e-40f7-86ed-b6e37e12b005. Kaksi ottoa; valittu otto2 viestillä #2130 (commit e1980ef065577d7fcbc3fb4d64631713b051f0fc). Krediitit45 + FreeRetry0 + kevennys5 =50. Kolmatta generointia ei tehty. Front=ita, Back=lansi, Left=Right=pohjoinen; Tripo hyväksyi saman sivukuvan molempiin paikkoihin.

Akselit +Y ylös, Itä/Front +Z, Pohjoinen +X, Länsi−Z, Etelä−X. LeveysX188m. Alkuperäinen yhtenäisskaala191.1026066, ei akselikohtaista venytystä. Näistä korjatuista malleista valmiin toimituksen lisäskaala1.0. Origo keskellä X/Z, minY0 todellisessa jalustassa. Riippuvat65kolmiota poistettu ennen holveja (kevyestä29). Raakamallin todellinen jalusta oli3.88410449m vanhan dangling-minimin yläpuolella; siksi korkeus muuttuu184.1859→180.3018m ja H/W0.97971→0.95905 ilman rakennuksen litistystä. D/W0.53772; #2130hyväksyi alkuperäisen noin.98/.54suhteen ja määräsi jalustan siistimisen.

Ristikkäiset holvileikkaukset tarkempaan ja kevennettyyn pohjaan. Pääaukko44×106m, keskiX.14; sivuaukko30×72.5m, keskiZ0. Molemmissa suorat pielet ja puoliympyrähuippu, maski täsmälleen samankokoinen kuin geometrialeikkuri; ei jälkikäteen kutistamista testin läpäisemiseksi. Todellisia aukkoleikkauksia, ei alpha- tai tummaovitekstuuria. Uudet holvin sisäpinnat käyttävät alkuperäisen kivitekstuurin pientä vaaleaa kivipalaa ja erikseen projisoituja UV:ita. Korjauksen jälkeen37648kolmiota; kevyt24857. Alkuperäinen43591kolmion lähde säilyy muuttumattomana paikallisesti.

Flat-opaque kaikkien kolmioiden ortopeittotesti: raaka pää100%, sivu99.985548%; kevyt pää100%, sivu99.978322%. Molemmat ylittävät90%. QA-JSONit sisältävät maskit, mitat ja todellisen alarajan. Lopulliset SW/NEkamerat on korjattu maantieteellisiin suuntiin; aiemman diagnostisen paketin viistonimien kulmapari oli eri, eikä vanhaa pakettia muutettu.

## Mitattu QA

raaka: 37648 kolmiota, 5271540 tavua, 1 primitiivi ja 1 materiaali. XYZ-mitat [188.0, 180.3017578125, 101.09171295166016]. Kaikki materiaalit opaque, upotetut tekstuurit enintään2048; ei Dracoa. UV-nolla: 18 kolmiota, 3D-ala 2.493583197 m² eli 0.0015117% pinnasta. UV-ristitulon absoluuttinen raja 1e-12.

Mustat pikselit (RGB kaikkikanavat<16, 800×800): ita=0, lansi=0, pohjoinen=0, etela=0, ylhaalta=0, lounas=0, koillinen=0.

kevyt: 24857 kolmiota, 3050716 tavua, 1 primitiivi ja 1 materiaali. XYZ-mitat [188.0, 180.2670135498047, 100.96610260009766]. Kaikki materiaalit opaque, upotetut tekstuurit enintään2048; ei Dracoa. UV-nolla: 40 kolmiota, 3D-ala 53.880591753 m² eli 0.0327259% pinnasta. UV-ristitulon absoluuttinen raja 1e-12.

Mustat pikselit (RGB kaikkikanavat<16, 800×800): ita=80, lansi=0, pohjoinen=32, etela=0, ylhaalta=0, lounas=6, koillinen=16.

Kaikki 14 esikatselua katsottu täysikoossa. Viistot noin60° horisontista, ortografinen CPU-esikatselu; ei Unityn peliajo. Raaka säilyttää yksityiskohdat ja kattopinnat kevennystä paremmin. Alkuperäisiä lähdemalleja ei korvattu. Toimitus ei tarkoita vastaanottajan hyväksyntää, peli-integraation tarkistusta eikä omistajan hyväksyntää pelissä.
