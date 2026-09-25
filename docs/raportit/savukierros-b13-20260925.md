# Savukierros: juna/b13 (25.9.2026, 12.0x)

Build: juna/b13 @ 93ab72f1 (proto-kaanna.sh, iPhone 18 Pro -simulaattori
1572C658, asennettu 11:23 käännösvahdin toimesta). Kone käynnistetty
uudelleen klo 11.3x (Fable), tämä on ensimmäinen kierros sen jälkeen.

## PASS

1. **Saapuminen + kartta:** `uusi-peli 1 pariisi` → Kartta-tila, reliefi,
   rannikko ja aluerajat/-nimet (NORMANDIA, POITOU, GASCOGNE...)
   renderöityvät siististi. Kuva 1.
2. **Äänet mittarilla:** `puhe paalle` + `luento intro` → `puhe.soi=true`,
   `puhe.aika` eteni 1,9 s → 3,9 s kahdessa sekunnissa (todellinen
   `currentTime`-eteneminen).
3. **Kaupunkikortti:** `kortti bryssel` avasi kortin oikein (kuva,
   Nähtävyydet/Turistiopas, Kulttuuri ja ruoka (1), Historia (1)). Kuva 2.
4. **Kierto (vaaka/pysty):** `ui kierto vaaka` kääntää näkymän oikein,
   kortti ja kartta asettuvat uudelleen ilman visuaalisia virheitä,
   ylätunniste piiloutuu vaakatilassa kuten aiemminkin. Kuva 3.
5. **Radio (viritys/lukitus/soitto):** `linssi radio` (linssi-komento.txt
   -reitti) avasi linssin oikein rekisteriin (`auki: radio`), `radio
   taajuus 0.3` virittyi ketjua `Viritys/Siirtyma → Viritys → Lukittuu →
   Soi` (päätyi DZA "Sahara Algérie Chaine 1"). `linssi pois` sulki
   siististi (`Hiljaa`, `auki: ei mitään`). Kuva 5.

## Löydös: kaksi eri "avaa linssi" -reittiä, joista vain toinen
tunnistetaan radion tila-/viritystekomennoissa

`ui linssi radio` (Natiivi-UI:n ui-komento.txt -reitti) kirjaa lokiin
"ok" ja NÄYTTÄÄ radiopaneelin ruudulla (VU-mittari, näyttö, viritinliuska
— kuva 4), mutta `LinssiOhjain`in oma rekisteri ei silti pidä mitään
linssiä auki: jokainen sitä seuraava `radio taajuus`/`radio tila`
-komento (linssi-komento.txt) vastasi **"radio: linssi ei ole auki"**,
vaikka ruudulla näkyi selvästi viritetty radio (BERLIINI valittuna
liuskassa). Oikea reitti tekstikomennoin testaamiseen on `linssi radio`
(linssi-komento.txt, kutsuu `Linssirekisteri.Valitse`) — sillä `auki:
radio` kirjautui heti ja viritys toimi odotetusti. En tiedä onko tämä
aito kahden erillisen tilan pelibugi (UI näyttää linssin vaikka
pelilogiikka ei tiedä siitä) vai vain minun testikomentojeni väärä
reitti — reititän Pelikoodarille/Natiivi-UI:lle varmistettavaksi, koska
jos UI ja pelitila oikeasti eriävät tässä, se voi vaikuttaa myös oikeaan
kosketuskäyttöön (esim. kaksoisnapautus linssikuvakkeeseen).

## Sivuhavainto: paikannimissä genetiivipäätteitä väärässä paikassa

Ranskan kartalla (zoomitaso Pariisin ympärillä) useat POI-nimet
näyttävät rikkinäisiltä suomen genetiivitaivutuksilta liimattuna
ranskankielisen nimen perään: "Rouenin.", "Chartresin.", "Amiensin.",
"Versaillesin.", "Montgolfierin.", "Carcassonnen.", "Michelinin opas",
"Nîmesin areena", "Le Mansin 24.", "Nancy, Place.", "Chambordin linna"
(tämä viimeinen näyttää oikealta muotoilulta — loput eivät). Näyttää
automaattisesti generoidulta taivutusvirheeltä (esim. "Rouen" + "-in"
ilman oikeaa vartalonmuodostusta), ei yksittäiseltä kirjoitusvirheeltä —
toistuu useissa nimissä samalla kaavalla. En tiedä onko tämä jo
tiedossa (aluenimet-natiivi.json vaikuttaa olevan kesken Karttasepän
työn alla origin/mainin viimeisimmän merge-diffin perusteella) — kuvat
1 ja 3 näyttävät tämän suoraan.

## Ei ehditty

- iPad-kierros (3B4CDACB) — jätetty seuraavaan sessioon/kierrokseen,
  kone rajoitti yhteen simulaattoriin kerrallaan muistin vuoksi
  (Fablen 22,8 Gt -sivutusvaroitus ennen uudelleenkäynnistystä).
- Kamera näytti hetken tyhjän/lataamattoman näkymän radion sulkeuduttua
  (kuva 5, kamera-ajo hyvin kauas ~1425 km korkeuteen radion oman
  eleen jäljiltä) — todennäköisesti vain kesken oleva zoom-siirtymä,
  ei toistettu uudelleen varmistukseksi.

## Kuvat

`docs/raportit/kaappaukset/savukierros-b13-20260925/`
