# pantheon: toimitus arvioitavaksi

LIIKE: ei liikettä. Ei luurankoa eikä animaatioita.

Ensisijainen `pantheon.glb` on tarkempi versio. `vertailu/pantheon-kevyt.glb` on vain vertailukappale: Tripon kevennys tuotti laajoja kolmiomaisia sävyeroja kattopinnoille ja kasvatti nollan UV-alan pintaa. Ei suositella automaattiseksi korvaajaksi.

Tripo job dc66c23e-448a-4f4c-a7e7-2889a96b2bdf. Ensimmäinen otto45krediittiä, kevennys5; yhteensä50. Ei uusintoja. H3.1Ultra, Triangle50k,2K,PBR jaRemoveLighting; Parts/8Kpois. Front=lansi, Back=ita, Left=etela, Right=pohjoinen. Syötehashit tarkistettu.

Portiikki on +Z-päässä ja molempien sivujen sama pää täsmää. Ei tuplaportiikkia; Left/Right-vaihtoa ei tarvita. Itäpää suora, kuusi etupylvästä, syvennys ja portaat säilyvät. Kupolin pylväät, tummat välit, harmaa kupoli, lyhty ja risti erottuvat. Ylhäältä ristinmuotoinen siipirunko ja suora itäseinä. Raakamallin katolla on pientä kuvioaaltoilua, mutta kevennyksen voimakas kolmioituminen puuttuu.

+Y ylös, Länsi/Front+Z, Itä/Back−Z, Etelä+X, Pohjoinen−X. PituusZ241m, vain positiivinen yhtenäisskaala245.6096488846; origo jalanjäljen XZ-bboxin keskellä,minY0. W/L0.7790564, H/L0.7059994 verrattuna tilaukseen.78/.71; molemmat ±5%rajan sisällä. Kevyen mitat muuttuvat alle.1%; ei akselikohtaista skaalausta. SWkamera yaw45°,NE225°,pitch60°. Raaka41920kolmiota, kevyt28034.

## Mitattu QA

raaka: 41920 kolmiota, 4707436 tavua, 1 primitiivi ja 1 materiaali. XYZ-mitat [187.75259565196632, 170.1458444116504, 241.0]. Kaikki materiaalit opaque, upotetut tekstuurit enintään2048; ei Dracoa. UV-nolla: 29 kolmiota, 3D-ala 3.693388254 m² eli 0.0023151% pinnasta. UV-ristitulon absoluuttinen raja 1e-12.

Mustat pikselit (RGB kaikkikanavat<16, 800×800): lansi=0, ita=0, etela=0, pohjoinen=0, ylhaalta=0, lounas=0, koillinen=0.

kevyt: 28034 kolmiota, 2854960 tavua, 1 primitiivi ja 1 materiaali. XYZ-mitat [187.71172910936903, 170.11630396402947, 241.0]. Kaikki materiaalit opaque, upotetut tekstuurit enintään2048; ei Dracoa. UV-nolla: 135 kolmiota, 3D-ala 215.360019077 m² eli 0.1351740% pinnasta. UV-ristitulon absoluuttinen raja 1e-12.

Mustat pikselit (RGB kaikkikanavat<16, 800×800): lansi=0, ita=2, etela=0, pohjoinen=0, ylhaalta=0, lounas=0, koillinen=1.

Kaikki 14 esikatselua katsottu täysikoossa. Viistot noin60° horisontista, ortografinen CPU-esikatselu; ei Unityn peliajo. Raaka säilyttää yksityiskohdat ja kattopinnat kevennystä paremmin. Alkuperäisiä lähdemalleja ei korvattu. Toimitus ei tarkoita vastaanottajan hyväksyntää, peli-integraation tarkistusta eikä omistajan hyväksyntää pelissä.
