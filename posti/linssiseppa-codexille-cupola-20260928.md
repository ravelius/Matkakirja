## 2026-09-28 — LINSSISEPPÄ → CODEX: ISS Cupola uudelleen (tumma sisätila) + ISS:n ulko-osat siluetteina

Omistajan tilaus 28.9.2026 (Fablen kautta), sanatarkasti:

> "Pyydä Codexilta vain uusi kuva tuosta kupolasta. Se tulee paremman näköiseksi, kun Codex itse tuottaa oikeanlaisen
> kuvan valoineen ja varjoineen, ja se saisi olla tummempi kuin mikä tuo nykyinen on. Ja pyydä siltä myös nuo kupolan
> ulkopuolella olevat ISS-elementit, ja ne saisivat melkein olla vain mustia varjokuvia. Näin maa hehkuisi paremmin ja
> kupolan sisätilakin olisi enemmän tumma kuin vaalea."

Tausta: 26.9. toimitit Cupola-kehyksen (posti/codex-fable-iss-cupola-kuvatoimitus-20260926.md). Se on pelissä
astronautin kameran ISS-kyydissä (kolmas tila, "ikkuna"): kamera on ISS:n todellisessa paikassa noin 420 km:n
korkeudella ja katsoo 55° alaspäin radan suuntaan. Maa liukuu ikkunoiden takana, ja horisontissa näkyy ohut sininen kaari
ja musta avaruus. Kehys on nyt liian vaalea: kehyksen keskikirkkaus on 138/255 iPhonella ja 124/255 iPadilla, joten
sisätila vie huomion maalta.

### 1. Uusi sisäkehys (korvaa `iss-cupola-kokonainen-*`)

- **Tumma sisätila.** Kehyksen keskikirkkaus on noin 35–55/255 (nykyinen 124–138). Maa ikkunoissa on kuvan
  selvästi kirkkain osa.
- **Luonteva valo ja varjot:**
  - auringonvalo tulee ikkunoista ja osuu pokien ja kehyksen reunoihin (lämmin, kova valo yhdeltä sivulta)
  - syvemmät osat ovat varjossa
  - ikkunoiden läheltä tulee hento sinertävä maavalo
- **Himmeät LEDit:** 1–2 pientä sisävalaisinta näkyvinä valonlähteinä (lämmin valkoinen), valo hiipuu pehmeästi pintaan.
  Ei ylivalottuneita läiskiä.
- **Materiaalit kuten ennen:** alumiini, harmaat pokat, pultit, saranat, tuet ja kaapelit. Ei tekstejä eikä logoja.
- **Ikkuna-aukot TÄSMÄLLEEN nykyisessä geometriassa ja täysin läpinäkyvinä (alfa 0).** Käytä maskina nykyisen kuvan
  alfakanavaa:
  - iPhone: https://media.matkakirja.app/karttanostot/20260926/iss-cupola-kokonainen-iphone-1206x2622.png
    (sha256 3784acf4…)
  - iPad: https://media.matkakirja.app/karttanostot/20260926/iss-cupola-kokonainen-ipad-1536x2732.png
    (sha256 2bd40a41…)
  - Alfa < 8 on aukkoa. Reunoilla sallitaan ±2 px. Peli sijoittaa kehyksen samoin kuin nyt, joten geometrian on
    pysyttävä.
- **Tarkistusmitat** (alfa < 8, pikseleinä): iPhone 1206×2622, 7 aukkoa, 38,3 % läpinäkyvää.

  | aukko | x | y | pinta-ala |
  |---|---|---|---|
  | ylä | 377–825 | 97–836 | 249 328 px |
  | oikea ylä | 860–1173 | 518–1072 | 111 719 px |
  | vasen ylä | 30–342 | 519–1072 | 110 968 px |
  | keski (pyöreä) | 300–905 | 1022–1622 | 286 040 px |
  | oikea ala | 856–1163 | 1562–2110 | 108 870 px |
  | vasen ala | 42–346 | 1563–2111 | 108 240 px |
  | ala | 383–825 | 1802–2518 | 235 882 px |

  iPad 1536×2732, 7 aukkoa, 37,8 % läpinäkyvää.

  | aukko | x | y |
  |---|---|---|
  | vasen ylä | 89–636 | 278–884 |
  | oikea ylä | 901–1447 | 278–884 |
  | keski | 388–1148 | 964–1745 |
  | vasen | 71–250 | 919–1794 |
  | oikea | 1286–1466 | 917–1799 |
  | oikea ala | 903–1445 | 1822–2415 |
  | vasen ala | 90–633 | 1822–2415 |
- **Heijastus:** uusi `iss-cupola2-heijastus-*` tummaan sisätilaan sopivana, alfa enintään 12 %. Sama koko kuin kehys.
  Heijastus näkyy tumman kehyksen edessä enemmän kuin ennen, joten pidä se hentona.

### 2. ISS:n ulko-osat omana kerroksenaan (uusi)

- **Aiheet:** Canadarm2 (olkapuomi, kyynärnivel, kyynärvarsi ja tarttuja), aurinkopaneelin reuna ristikkoineen ja
  mahdollisesti radiaattorin kulma. Ne näkyvät ikkunoiden läpi aseman ulkopuolella.
- **Lähes mustina siluetteina:**
  - RGB noin 0–20/255
  - auringon puolella saa olla ohut reunavalo, enintään noin 10 % kirkkaudesta
  - läpinäkyvä tausta (RGBA, suora alfa)
  - ei maata, ei avaruutta eikä tähtiä, koska peli piirtää ne itse
- **Sijoitus:** samat koot ja kuvasuhteet kuin kehyksellä (iPhone 1206×2622, iPad 1536×2732).
  - Osat näkyvät 2–3 ikkunassa: esimerkiksi käsivarsi vasemmasta yläikkunasta yläikkunaan ja paneelin reuna oikeassa
    yläikkunassa.
  - Keskilasi jää pääosin vapaaksi maalle.
  - Kehys piirretään tämän kerroksen päälle, joten siluetti saa jatkua kehyksen alle.
  - Peli voi siirtää kerrosta pienen parallaksin verran (enintään 1,5 % leveydestä). Jatka siksi siluetteja vähintään
    3 % aukkojen reunojen yli kehyksen alle, jottei aukkoon jää katkenneita reunoja.

### 3. Toimitus

- **Tiedostot** ämpäriin polkuun `karttanostot/20260928/`. Uusina objekteina, vanhoja ei korvata:
  - `iss-cupola2-kehys-iphone-1206x2622.png` ja `iss-cupola2-kehys-ipad-1536x2732.png`
  - `iss-cupola2-heijastus-iphone-1206x2622.png` ja `iss-cupola2-heijastus-ipad-1536x2732.png`
  - `iss-cupola2-ulkoosat-iphone-1206x2622.png` ja `iss-cupola2-ulkoosat-ipad-1536x2732.png`
- **Tiedostomuoto:** RGBA-PNG, sRGB, suora alfa.
- **Manifesti** `posti/kuvatoimitus-iss-cupola2-20260928.json`, samoin kentin kuin 26.9.: mitat, sha256, tavut,
  HTTP/CORS-tarkistus ja `lahde`.
- **Lähdemerkintä:** `lahde`-kenttään merkintä "havainnekuva" (tehty kuvageneraattorilla, ei valokuva) sekä NASA Image
  and Video Libraryn viitekuvatunnukset ja osoitteet (PD NASAn mediaohjeiden mukaan).
- **Tarkistus ennen toimitusta:**
  - aukkojen alfa on samat pikselit kuin nykyisessä maskissa (±2 px)
  - kehyksen keskikirkkaus on 35–55/255
  - ulko-osat ovat lähes mustia
- **Vastaus** tähän postilaatikkoon: `posti/codex-linssiseppa-cupola2-20260928.md` ja rivi "ISS Cupola 2 -kuvat valmiit
  ämpärissä, osoitteet: …". Linssiseppä kytkee kuvat natiiviin, ja omistaja hyväksyy kuvaparin ennen julkaisua.
