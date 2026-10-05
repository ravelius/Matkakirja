# Elävän oppaan siltalauseet (Päätoimittaja 5.10.2026)

Omistaja 5.10.2026 klo 21.5x: kertojalle esigeneroidaan nippu lauseita, joita se käyttää ennen kuin varsinainen
uusi teksti valmistuu. Siltalause on yleinen siirtymä, joka ei kerro paikasta mitään. Sisältö syntyy edelleen
reaaliajassa (omistajan linja 17.4x).

## Käyttö (natiivi)

- Lause alkaa heti, kun pelaaja napauttaa sirua tai kertoo toiveen, kierros siirtyy seuraavaan tai kaupunki
  vaihtuu. Varsinainen kerronta jatkuu sen perään pienen tauon jälkeen.
- Ryhmä valitaan sirun tai toiveen tyypin mukaan (workerin tunniste). Tuntematon tyyppi → kuittaus.
- Samaa lausetta ei toisteta samassa istunnossa. Kun ryhmä on käytetty loppuun, alkaa uusi kierto.
- Jos kerronta ei ole alkanut 6 s:n kuluessa siltalauseen lopusta, soitetaan yksi odotus-lause, mutta vain kerran.

## Äänitys (Pelikoodari)

- William, eleven_v4, oletusvakaus. OMISTAJA 21.5x: "Nuo voi generoida erikseen koska niitä ei kuulla putkeen.
  Generoi heti." Jokainen lause generoidaan siis omana pyyntönään, yksi otto lausetta kohden, ei vertailuottoja.
- pcm_44100 → tasoitus ja limitteri PCM:nä kertojan tasoon → mp3 kerran. Tiedostot ja JSON (ryhmä, teksti,
  kesto) ämpäriin. Polku natiivin mukaan.

## Lauseet

### kuittaus
Hyvä valinta, lähdetään. · Selvä, suunnataan sinne. · Tuo kannattaa nähdä. · Mennään katsomaan. ·
Mainio ajatus. · Lähdetään saman tien. · Hyvä, minulla on sinulle jotain. · Tiedän juuri oikean paikan. ·
Seuraa minua. · Käännetään suunta. · Otetaan se seuraavaksi. · Hyvä toive, se onnistuu.

### ruoka
Etsitään jotain hyvää syötävää. · Nälkä on hyvä matkaopas. · Tiedän paikan, jossa syödään hyvin. ·
Mennään sinne, missä paikalliset syövät. · Katsotaan, mistä saa jotain herkullista. ·
Ruoka kertoo kaupungista paljon. · Suunnataan torien ja kahviloiden suuntaan. · Pöytä odottaa, lähdetään.

### moderni
Seuraavaksi jotain aivan uutta. · Hypätään nykyaikaan. · Katsotaan, mitä tämä kaupunki rakentaa nyt. ·
Lasia, terästä ja rohkeita muotoja. · Tämä kaupunki ei elä vain menneessä. · Mennään uusien talojen luo. ·
Nykyarkkitehtuuri odottaa. · Siirrytään vanhasta uuteen.

### vihreä
Mennään hetkeksi puiden alle. · Etsitään vihreää. · Hengähdetään puistossa. ·
Kaupungin keskellä on yllättävän paljon vihreää. · Suunnataan puutarhojen puolelle. ·
Nurmikko ja varjoisat puut odottavat. · Katsotaan, missä kaupunki lepää. · Vihreä keidas on lähellä.

### vesi
Suunnataan veden äärelle. · Mennään rantaan. · Seurataan vettä. · Tämä kaupunki elää veden äärellä. ·
Katsotaan kanavia ja laitureita. · Laivat ja laiturit odottavat. · Satama on aina hyvä suunta. ·
Mennään sinne, missä vesi kimaltaa.

### vanha
Palataan muutama vuosisata taaksepäin. · Mennään kaupungin vanhimpaan kerrokseen. · Kivet täällä muistavat paljon. ·
Katsotaan, mistä kaikki alkoi. · Historia odottaa kulman takana. · Vanhat muurit kertovat tarinansa. ·
Astutaan menneeseen. · Tämä paikka on nähnyt vuosisatoja.

### lento
Nousemme hetkeksi kattojen yläpuolelle. · Katso alas: kaupunki aukeaa joka suuntaan. · Lennetään kattojen yli. ·
Pidä kiinni, nousemme. · Kaupunki pienenee allamme. · Liu'umme pehmeästi kohti seuraavaa paikkaa. ·
Tästä korkeudesta näkee, miten kaikki liittyy yhteen. · Kadut piirtyvät allamme kuin kartta. ·
Matka ei ole pitkä. · Laskeudutaan pian.

### kierros
Jatketaan matkaa. · Seuraava paikka on aivan lähellä. · Vielä yksi, joka jokaisen kannattaa nähdä. ·
Siirrytään eteenpäin. · Seuraavaksi jotain aivan toisenlaista. · Muutaman korttelin päässä odottaa seuraava. ·
Tästä on hyvä jatkaa. · Seuraava kohde yllättää. · Otetaan vielä yksi. · Matka jatkuu.

### syventävä
Hyvä kysymys. · Tästä on kiinnostava tarina. · Katsotaan tarkemmin. ·
Se on monen mielestä tämän paikan paras puoli. · Siihen liittyy yllättävä yksityiskohta. ·
Pysähdytään hetkeksi tähän. · Kerron mielelläni lisää. · Tämä selittää paljon.

### kaupungin vaihto
Pakataan laukut, lennämme uuteen kaupunkiin. · Uusi kaupunki odottaa. · Suunta vaihtuu, lähdetään. ·
Matka jatkuu kokonaan toiseen paikkaan. · Katsotaan, mitä seuraava kaupunki kertoo.

### aloitus (Esittele kaupunki)
Hienoa, kierretään kaupunki yhdessä. · Näytän sinulle tämän kaupungin parhaat palat. · Lähdetään kierrokselle. ·
Tehdään yhdessä pieni kierros.

### odotus (vain kerran, jos kerronta viipyy)
Hetkinen, katson karttaa. · Etsin meille parhaan reitin. · Hetki vain, tarkistan suunnan. · Melkein perillä. ·
Kohta ollaan siellä.
