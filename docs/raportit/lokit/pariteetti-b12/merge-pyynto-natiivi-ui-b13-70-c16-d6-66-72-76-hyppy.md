# Merge-pyynnöt (Natiivi-UI 25.9.2026 klo 09.5x, build 13)

Testikäännös 2c1cc6f5 (juna/b13 + ylapalkki-73 + nahtavyydet-63 + lippu-72 + laukku-logo-76 + pulu-chat-66 + hyppy-kuvat +
ihminen-74 + maakunnat-70 + lahtohyppy-d6 + paljastus-c16) asennettiin iPhoneen FB234D08. Merge-kuivaharjoitus (git merge-tree)
masterin päälle ei tuottanut konflikteja, ja unity-tarkistus antoi 0 virhettä. Kuvat ja videot ovat kansiossa `b13f/`.

## Todennettu, mergettävissä (kaikki juna/b13:n päällä)

### natiivi-ui/maakunnat-70 264cec9 (löydös 70, Fablen linjaus)
- Maakunnat-välilehti avaa nykyisen maan ryhmän. Maassa, jolla ei ole maakuntia, näkyy teksti "Tälle maalle ei ole vielä
  maakuntia", ja kaikki ryhmät ovat kiinni sen alla. Saapuminen toiseen maahan päivittää listan ilman uudelleenavausta
  (Matka.Saapui). Matkalla ollessa lista pysyy ennallaan.
- Kuvapari: `b13f/kuvapari-b13-maakunnat70-iphone.jpg` (web Kreikka | natiivi Kreikka | web Ranska | natiivi Ranska). Webissä
  Kreikka avaa yhä Ranskan, koska webin korjaus #3140 on Julkaisijalla.

### natiivi-ui/paljastus-c16 cd1e9a1 (liikkumisen pariteetti C16)
- Ensimmäisellä saapumisella koskaan pulu sanoo Livian tuurauspaljastuksen kahdella kuplalla ("Kääk, apua! …" ja
  "Tervetuloa Ateenaan. Kuunnellaan …") ennen isoisän luentaa. Luenta lykätään PeliOhjain.Lykkays.cs:n avulla ja
  päästetään liikkeelle toisen kuplan jälkeen, ja pulun kommentti odottaa sarjan loppuun. Muilla aloituslennoilla
  näytetään ohjekuplat "Tervetuloa Kreikkaan. Sinun on ratkaistava tehtävä Ateenassa …" ja "Klikkaa kaupungin kultaista
  merkkiä kartalla.". Uusi Sijamuodot.cs on webin maahanMuoto/paikkaaMuoto/paikassaMuoto (28/28 nimeä samat kuin
  webissä). Testikomento: `ui livia paljastus nollaa`.
- Kuvasarja: `b13f/kuvasarja-b13-paljastus-c16-iphone.jpg` (kupla 1 | kupla 2 | luenta alkaa | ohjekuplat, tekstit pakotettu
  näkyviin). Videot: `b13f/c16-paljastus-iphone-pieni.mp4` ja `b13f/c16-ohjekuplat-iphone-pieni.mp4`. Lokissa luento alkaa
  LivianPaljastus.OdotaLuennasta. Webin videota ensisaapumisesta ei ole: tekstit ja ajoitukset on otettu suoraan
  tiedostoista livia.js ja ui.js.
- Koskee Pelikoodarin tiedostoja pienesti: PeliOhjain.cs (AsetaLykkays, LykkaaLuento, PeruLykkays uudessa
  matkassa) ja PeliOhjain.Paikka.cs (PeruLykkays vaiennuksessa). Uusi partial on PeliOhjain.Lykkays.cs.

### natiivi-ui/lahtohyppy-d6 10745ad (liikkumisen pariteetti D6)
- Kehittäjän maailmatilassa lähtövalinta näyttää kaikki kaupungit ja hyväksyy minkä tahansa niistä.
  PeliOhjain.UusiMatka sai parametrin kaikkiKelpaa.
- Kuvasarja: `b13f/kuvasarja-b13-lahtohyppy-d6-iphone.jpg`. Loki: "uusi peli … Wien" ja "aloituslento Lontoo → wien".

### natiivi-ui/pulu-chat-66 e53daa1 (löydös 66, Natiivi-UI:n osa)
- Videopari: `b13f/videopari-b13-pulu-chat66-web-vasen-natiivi-oikea.mp4` (20 s kysymyksestä). Pulun sarja on sama kuin
  webissä: dashOut (pölypilvi) → poissa → dashBack ja dustOff (siivet) → bookStudy (lasit ja kirja) → lepo.

### natiivi-ui/lippu-72 d4ed215, natiivi-ui/laukku-logo-76 8c3e403 ja natiivi-ui/hyppy-kuvat 5558798
- Kuvapari 72/76: `b13f/kuvapari-b13-63-72-76-iphone.jpg` (sarakkeet 3–6). Lippukortti on maalehden vaalealla arkilla, ja
  logo on laukun oikeassa yläkulmassa.
- Hyppy: `b13f/kuvapari-b13-hyppykuvat-iphone.jpg`. Wienin luentakuvat ja Ohita-nappi poistuvat maailmahypyssä, ja Ateenan
  traileri alkaa.

## Korjattu todennuksessa, uusi käännös jonossa (kaanna-b13g.txt)
- **ylapalkki-73 91eda1b3:** Unityn Screen.cutouts antaa simulaattorissa saaren suorakulmion ruudun yläreunasta saaren
  alareunaan (y 0,3, korkeus 49,7). Ruudulla mitattu saari on y 14–50,3 pt, eli korkeus 36,7 pt. Korjaus: saaren
  korkeus on 37/126 leveydestä, ja alareuna pidetään (7ace6ad1). Lisäksi turva-alueen korkuinen palkki keskitti rivin
  5,6 pt saaren alapuolelle, ja loppu siirrettiin alatäytteeksi (91eda1b3). Pakotetulla saarella mitattuna pilleri on
  36,3 pt korkea (kuva `b13f/n73-ennen-jalkeen-yla.jpg`). Vaakatila on vielä todentamatta.
- **nahtavyydet-63 42d7d6ff:** kohdekartan miniatyyripiirrokset ovat ämpärissä vain webp-muodossa, eikä Unity pura
  WebP:tä. Bukarestista puuttui siksi 6/8 piirrosta (vertailu `b13f/v63-kartat.jpg`). Kuvat.cs purkaa nyt webp:n
  Natiivisepän ImageIO-purulla (MatkakirjaKuvat_Pura) ja muuntaa esikerrotun alfan suoraksi. Samalla KOKORUUTU sai webin
  vaalean pilleriasun. Muutos koskee kaikkia webp-kuvia, jotka kulkevat Kuvat.Hae-reitin kautta.
- **saaririvi-74e d8f4952** (ihminen-74:n päällä): ihmisen tutkimusvaiheen virtanapit siirtyvät saaririvillä vuosiluvun
  oikealle puolelle, kun ne ennen jäivät palkin vasempaan yläkulmaan Dynamic Islandin alle. Muut linssit käyttävät
  pelin yläpalkkia, jonka saaririvi tulee 73:sta. Oma yläpalkki on vain Aikajanalla (selvitys: Maiden, Radion, Astron
  ja Tiedeliitteen palkit ovat alareunassa, kulmissa tai kortin sisällä).

## Havaitut erot (ei näissä erissä)
- 63: webin otsikko on lehtinimiö (NÄHTÄVYYDET, keskitetty) ja kartassa on 500 m:n mittakaava; natiivista puuttuvat
  molemmat.
- 72: webin lippukortissa on osio "Vaakunat ja tunnukset" (vaakuna ja selite), natiivista se puuttuu.
- 74 d2 jäi todentamatta: Ihmisen matka jäi mustaan avausruutuun, kun linssi avattiin Ateenan trailerin aikana.
  Mahdollinen vika, selvitetään erikseen.
