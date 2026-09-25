# Natiivi-UI:n luovutus 25.9.2026 (m), klo 12.18

Jatkaa luovutusta (l). Proto-git: `/Users/Shared/Claude/proto-3d/Matkakirja-proto` (paikallinen, ei remotea: haarat ovat
tallessa commiteissa). Build 13 kulkee juna/b13:n kautta (nyt 75cd4c89), ja Natiiviseppä mergeää. Työkopio:
`/Users/Shared/Claude/wt/proto-natiivi-ui-sisallys`. Kuvaparit ja merge-pyynnöt ovat kansiossa
`proto-3d/lokit/pariteetti-b12/` (alikansiot b13f, b13i, b13j, b13k).

## Junassa (juna/b13 75cd4c89), todennettu iPhonella FB234D08
- 70 maakunnat-70, C16 paljastus-c16 ja paljastus-vara (30 s:n varakutsu, Pelikoodarin huomio), D6 lahtohyppy-d6,
  66 pulu-chat-66, 72 lippu-72, 76 laukku-logo-76, hyppy-kuvat.
- 73+68+78 ylapalkki-73 e0555075: saari on 37 pt (Unityn cutout alkoi ruudun yläreunasta), pilleri ja ☰ saaren
  korkeudella, iPhonen palkki 70 pt ja iPadin 64 pt (hyväksytty poikkeama, omistaja 09.4x). Kuvaparit web + b12 + b13:
  `b13i/kuvapari-b13-ylapalkki78-iphone.png` ja `-ipad.png`. Vaaka on todennettu.
- 63 nahtavyydet-63 c0bc6db9: Kuvat.cs purkaa webp:n ImageIO:lla (MatkakirjaKuvat_Pura), KOKORUUTU on pilleri ja
  otsikko lehtinimiö.
- 79 nostokahva-79 02f2ea05: raahaus vain kahvasta (ylärivi, otsikko tai ylin 28 pt; tunnistus paikasta). Video
  `b13j/video-b13-nostokahva79-iphone.mp4`.
- Linssikerrokset bf6e86c1 (Linssisepän rivit 31/39/41/37) ja `ui linssi selite auki|kiinni`.
- 74 saaririvi-74e dcffd60a (sisältää ihminen-74:n: a–c ja d2): virtanapit omalla rivillään vuosiluvun alla. d2 on
  todennettu Linssisepän esitys-komennoilla (`linssi ihmisen-matka` → `esitys alusta` → `esitys kaynnista`).

## Kesken: kaksi haaraa ilman lopullista todennusta
- **natiivi-ui/avauskaaro-11 5ff2ee0b** (Linssisepän rivi 11, keksintöjen ja ihmisen matkan aloituslaatikko):
  RepaleinenPergamentti.cs (400 px taustasäikeessä), musta peite keksinnöissä, kapiteelit, anfangi
  (Lehtinakyma.AnfangiKappale on nyt internal ja parametroitu), kultainen Käynnistä, lyhdyt rajattuina paperiin ja ✕
  piilossa. Viimeinen todennettu versio on `b13k/kuvapari-b13-avaus11-iphone.jpg` (b13l): leveys oli yhä 323 pt, kun
  webissä se on 291. 5ff2ee0b kasvattaa sisennyksen 5 %:iin, ja käännös b13n (5a84b4fa, valmis klo 12.19, asennettu FB234D08:aan) sisältää sen.
  Todenna: `linssi keksinnot` → kuvapari 11-iphone-web.jpg:tä vasten → merge-pyyntö Natiivisepälle.
- **natiivi-ui/maapilleri-41 1a374a68** (rivi 41): maakyltti on webin .maa-pilleri, eli yksi rivi oikeassa
  yläkulmassa. b13m:ssä pilleri oli oikeassa paikassa, mutta "Lue lehti" näkyi vielä, ja 1a374a68 korjaa sen.
  b13n:ssä sitä EI ole (alkoi ennen committia). Käännä `juna/b13+natiivi-ui/avauskaaro-11+natiivi-ui/maapilleri-41`,
  ja todenna `linssi maatiedot` + `ui linssi maa JPN`.

## Avoimet
- Linssisepän rivi 40 (karusellikortti noin 27 pt korkeammalla): syy on iPhonen alareunan turva-alue, koska webin kuva
  on otettu ilman sitä. Rivi 31/41 Liiku: webissä Liiku on kartuschan alarivillä. Tämä on yleinen kartan asettelu, ei
  linssiero, ja todellinen ero on noin 38 pt. Kysy Fablelta ennen muutosta.
- 72: webin lippukortin osio "Vaakunat ja tunnukset" puuttuu natiivista.
- C11 (pollo.huudahdus): ei dataa.

## Opit
- Unity ei pura WebP:tä: Kuvat.Hae hoitaa nyt .webp-osoitteet ImageIO:lla.
- Screen.cutouts antaa simulaattorissa saaren ruudun yläreunasta alkaen: Ylapalkki.Saari() korjaa korkeuden.
- Äänilaitteen vaihto (SwitchAudioSource) Unity-viennin aikana jumitti viennin. Tapa jumittunut Unity-prosessi, ei
  proto-kaanna.sh:ta.
- SimRenderin orpo recordVideo estää uudet kuvaukset ("Host recording is already in progress"): käynnistä
  simulaattori uudelleen.
- Jonossa odottavan proto-kaanna.sh:n (ei lukon omistaja) saa tappaa ja jonottaa uudelleen. Haara luetaan vasta
  käännöksen alkaessa.
- UITK:n prosenttileveys lasketaan isännän koko leveydestä: laske leveys C#:ssa ennen näyttöä.
- Ääni: Scarlett on palautettu klo 12.19, kun vientiä ei enää ollut käynnissä.
- Simulaattori FB234D08 on sammutettu ja kehittäjäliput poistettu. iPad 503000D1 on sammutettu.
