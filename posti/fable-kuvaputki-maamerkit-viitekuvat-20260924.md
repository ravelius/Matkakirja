## 2026-09-24 14.10 UTC — FABLE → KUVAPUTKI: maamerkkien viitekuvat 70 kaupungille (Blender-mallinnusta varten)

Fable (omistajan tilaus 24.9.2026 klo 18.0x Suomen aikaa, kortilla hyväksytty).

### Tausta

Natiivi peli saa jokaiseen kaupunkiin yhden matalapolyisen 3D-maamerkin
(omistajan päätös 24.9.2026: "LENNON KARTTA JA MAAMERKIT"). Pilotti
Lontoo (Big Ben + Tower Bridge) ja Ateena (Akropolis) on mallinnettu
Blender-skriptillä. Loput 70 kaupunkia mallinnetaan sisältötyönä, ja
mallintaja tarvitsee jokaisesta maamerkistä viitekuvia eri suunnista.
Kuvia EI näytetä pelissä — ne ovat vain mallinnuksen lähdeaineistoa,
mutta lisenssi tarkistetaan silti (vain PD tai CC, ei NC/ND), jotta
manifesti on puhdas.

### Tehtävä

Jokaiselle alla olevalle kaupungille:

1. Valitse yksi tunnusrakennus tai monumentti, joka erottuu kaukaa
   (siluetti, ei kokonainen kaupunki). Ehdotus on annettu; jos parempi
   PD/CC-kuvasto löytyy toiselle yhtä tunnetulle kohteelle, saa vaihtaa,
   mutta kirjaa perustelu manifestiin.
2. Hae Commonsista (tai museoiden/arkistojen avoimista aineistoista)
   3–4 valokuvaa: yksi edestä, yksi sivulta tai viistosta, yksi kaukaa
   siluettina, ja jos löytyy, yksi ilmakuva tai pohjapiirros.
3. Skaalaa pitkä sivu 1800 px:iin, jos alkuperäinen on suurempi
   (oletussääntö 15.9.2026); muut sellaisinaan.
4. Ämpäriin polkuun
   `matkakirja/maamerkit/viitekuvat/<cityId>/<nro>-<suunta>.jpg`
   ja manifesti `posti/kuvatoimitus-maamerkit-viitekuvat-<pvm>.json`
   (kentät kuten aiemmissa toimituksissa: cityId, kohde, url, sha256,
   tavut, leveys, korkeus, lahde, tekija, lisenssi, attribuutio, suunta).

Kaupungit (cityId on sama kuin pelissä; ehdotettu kohde suluissa):

dublin (Ha'penny Bridge tai Custom House), edinburgh (Edinburghin linna),
pariisi (Eiffel-torni), madrid (Palacio de Cibeles), granada (Alhambra),
sevilla (Giralda), bryssel (Atomium tai Grand-Placen raatihuone),
luxemburg (Adolphe-silta), berliini (Brandenburgin portti), praha
(Kaarlensilta ja linna), kosice (Pyhän Elisabetin tuomiokirkko),
ljubljana (Ljubljanan linna tai Kolmoissilta), wien (Stephansdom),
budapest (Parlamenttitalo), varsova (Kulttuuripalatsi tai Kuninkaanlinna),
krakova (Wawel), firenze (Duomon kupoli), rooma (Colosseum), sofia
(Aleksanteri Nevskin katedraali), bukarest (Ateneum tai Parlamenttipalatsi),
kiova (Pyhän Sofian katedraali), moskova (Pyhän Vasilin katedraali),
pietari (Iisakinkirkko), tallinna (Oleviste tai Raatihuone), riika
(Mustapäiden talo tai Tuomiokirkko), vilna (Gediminasin torni), ankara
(Anıtkabir), nikosia (Selimiye-moskeija / Pyhän Sofian katedraali),
jerusalem (Kalliomoskeija), mosul (al-Nurin moskeijan vino minareetti,
historiallinen muoto), teheran (Azadi-torni), tokio (Tokyo Tower tai
Sensō-ji), kioto (Kinkaku-ji tai Tō-ji-pagodi), jekaterinburg
(Veren kirkko), peking (Taivaan temppeli), soul (Gyeongbokgung /
Gwanghwamun), xian (Kellotorni tai Suuri villihanhipagodi), taipei
(Taipei 101), hanoi (Yksipylvästemppeli tai Turtle Tower), jakarta
(Monas), mumbai (Gateway of India), new-york (Vapaudenpatsas), winnipeg
(Manitoban parlamenttitalo), montreal (Notre-Damen basilika), toronto
(CN Tower), chicago (Willis Tower tai Wrigley Building), los-angeles
(Hollywood Sign tai City Hall), houston (Houston City Hall tai San
Jacinto -monumentti), miami (Freedom Tower), monterrey (Faro del
Comercio), mexico-city (Palacio de Bellas Artes), merida (Catedral de
San Ildefonso), guatemala (Catedral Metropolitana), managua (vanha
katedraali), buenos-aires (Obelisco), caracas (Panteón Nacional),
sao-luis (Palácio dos Leões), salvador (Elevador Lacerda), lima
(Catedral de Lima), santa-cruz (Catedral Basílica de San Lorenzo),
rio-de-janeiro (Cristo Redentor), sao-paulo (Catedral da Sé), asuncion
(Panteón de los Héroes), sydney (Oopperatalo), perth (Bell Tower tai
Perth Mint), melbourne (Flinders Street Station), brisbane (City Hall
tai Story Bridge), adelaide (Adelaide Oval tai St Peter's Cathedral),
wellington (Beehive), christchurch (Cardboard Cathedral tai vanha
katedraali).

Lontoo ja Ateena on jo tehty — ei kuvia niille.

### Rajaukset

- Vain PD tai CC (BY, BY-SA, CC0). Ei NC, ei ND, ei "fair use".
- Ei ihmisiä pääaiheena; rakennus tai monumentti selkeästi.
- Ei tekoälykuvia eikä piirroksia, paitsi pohjapiirros tai arkkitehtipiirros.
- Jos kohteelle ei löydy kolmea kelvollista kuvaa, toimita se mitä löytyy
  ja merkitse manifestiin `puutteellinen: true`.

### Toimitus

Manifesti + kuittaus tähän postilaatikkoon (codex-fable-…). Toimitus
saa tulla erissä (esim. 20 kaupunkia kerrallaan). Kytkentä: Fablen
agentti kirjaa polut tools/vienti/maamerkit.json:iin mallinnuksen
edetessä.
