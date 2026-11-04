# Pelikoodari: luovutus 4.11.2026 klo 06.43 – KK 06.28 kohta 3 lähetetty, reittiajo JU:lla, juna ilman 218:n juoksupakettia

Korvaa -0626:n kohdat "SEURAAVA TYÖ 1" ja "KK kohta 3"; muu -0626:sta voimassa (oleskelu, muuri, cb8b1f06c, ohitusajo, LAV:n kysymys haaleasta lattiasta). Syy: pehmeä raja 25 % (7.37). Ei omia taustaketjuja. Polut kansiossa /Users/Shared/Claude/proto-3d/. Tilaus ja tulokset: `lokit/pk-muistipiikki-219/TULOS.md`, loppu.

## Odottaa muita
- **KK:** rivi kohdan 3 ehdotuksesta (lähitaso 0,1 → noin 3 m ylityksen ajaksi, ehto `SaliKatonAlla != KameraSalissa`). **Ei toteutusta ennen riviä.** Toteutuskohta: JuoksuV4Maailma.cs, kameran lopullisen paikan jälkeen (lähellä `PelaajaPiilossaNyt`); ei alkulennossa, maalikuvassa eikä sivukuvassa; rajafunktio DroneNostoon Puyin ja lattian syvyyden mukaan + testi; nollaus uudessa juoksussa. Liikepehmennykseen `// liikepoikkeus:`-kommentti kuten muualla.
- **PT ja KK:** be5632bdb:n runko (iso paketti 4397cf20d) ei sisällä 218:n juoksupakettia (58ba0b403, 7b8456f41, 67fdba66c, eb2b057bc). Kokoonpano on PT:n ja JU:n päätös. Jos tulee komento, älä yhdistä itse ilman sitä.
- **JU:** `_tyo/pelikoodari/peitto-reitti/aja.zsh`, runko 349e8f8db, rivi "REITTI AJETTU". Pyydetty 06.42.

## Kun REITTI AJETTU, tee
1. `peitto-reitti/kesto-{av,uu,sa}.txt`, `loki.txt`, `{av,uu,sa}.mp4`; luvut koneellisia, katso rajakuvat silmällä (kesto-*-NN.jpg). Keltainen viitta on tunnistin; pöytä ja kaukainen viitta voivat erehdyttää.
2. **av:** alkulento ja ensimmäinen aloitus: lennon läpimeno, Puyi näkyy, kesto, kameran korkeus. Vastaa KK:lle, voiko sukellus koskea pelaajaa.
3. **uu:** näkyykö ys:n ylitys (0,30 s, 2,88–3,16 s) myös tällä rungolla; kohta 4,66–4,78 s on juhlasalin itäoven kohdalla (katsomatta). Onko uudestaan ilman alkulentoa (koodi sanoo näin, 2.177 "jokainen aloitus").
4. **sa:** `keisarin halli 0` joka kierroksella. Käännökset ovat aikaan sidottuja (−1 kohdassa 2,6–3,4 s, sitten +1 0,2 s:n välein; +1 = oikea, varmistettu 218am-kamerasta). Jos ei mene saliin, korjaa skripti ja ajata uudelleen. Katso, poistuuko katto keisarin mennessä sisään (2.177) vai läpikuultava–läpinäkymätön–pois.
5. Ruudut KK:lle, tulos PT:lle (PT: ennen junaa), kirjaus TULOS.md:n loppuun.

## Tehty
- **Kohta 4:** juhlasalin ovea ei ole 217:n tallenteissa (tulos TULOS.md:ssä).
- **Muistiinpano:** zsh:ssa `git show $K:Assets/…` ei toimi (`:A` on muunnin); käytä `${K}:`.

## Lisäys 06.5x: oleskelu katsottu
OLESKELU AJETTU: luvut OK, mutta ei todista salia (juoksu päättyi taustalla, kuvat lopetusruutuja). mittaa-oleskelu.zsh korjattu sääntötauolla (testaamatta); uusinta JU:n yhdistelmärungolla. Tulokset TULOS.md, loppu. Kohta "SEURAAVA TYÖ 2" -0626:sta on tällä hoidettu. Kaikkiin tuloksiin merkitään runko (PT).
