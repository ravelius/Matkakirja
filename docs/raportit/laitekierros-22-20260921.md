# Laitekierros 22 (osittainen) — v1987, keskeytyi siirtoon

21.9.2026 n. klo 09.24–09.36 Suomen aikaa. iPhone 18 Pro -simulaattori
(283EDDD1-56DB-4B84-A148-5E842645957D), tuotanto matkakirja.app.
Kierros aloitettiin v1987:llä (v1988/löytämisen sumu ei ollut vielä
tuotannossa testin alkaessa); Julkaisija ilmoitti v1988:n tuotannossa
n. klo 09.33, mutta samassa hetkessä omistaja päätti siirtää koko
kehitystyön `/Users/Shared/Matkakirja/`-hakemistoon, joten kierros
keskeytyi ennen löytämisen sumun testausta. Kaappaukset
`docs/raportit/kaappaukset/laitekierros-22-20260921/`.

## Vahvistettu toimivaksi

- **Nimiöt panoroidessa (v1986)**: sormella vedon jälkeen kaikki
  nimiöt (Chambordin linna, Pont du Gard, Lascaux, Carcassonnen.,
  Marseille, Mont Blanc) pysyivät kiinni omissa merkeissään, ei
  jälkeenjääneitä tekstejä. `2-panorointi-nimiot.png`.
- **Nimiöt zoomatessa (v1986)**: pinch-zoom sisään ja ulos, nimiöt
  seurasivat oikein eikä irtoamista näkynyt levossa otetuissa
  kaappauksissa. Huom: en mitannut sulavuutta (fps, kehysväli) —
  vain lopputila. `3-zoomi-nimiot.png`.
- **Marseillen kaupunkiliuska napautuksesta**: avautui edelleen
  luotettavasti (Nähtävyydet/Turistiopas + aihelistaus Historia,
  Kulttuuri ja ruoka, Kauppa ja tekniikka). `10-marseille-
  kaupunkiliuska-ok.png`.
- **Joet levossa ja meri laivoineen**: jokiviiva näkyi Burgundin
  halki ilman liikettä; Lioninlahdella yksi purjelaiva-ikoni, saaret
  (Baleaarit, Korsika, Sardinia) ja syvyysvyöhykkeet selvästi.
  `7-meri-laiva-saaret.png`.
- **Maakuntanimet**: Ranskan puolella ranskankieliset nimet
  (BURGUNDI, FRANCHE-COMTÉ, DAUPHINÉ, PROVENCE), Saksan puolella
  saksankieliset (BADEN, WÜRTTEMBERG), Italian puolella italiankieliset
  (PIEMONTE, LOMBARDIA, TOSCANA) — en nähnyt "Elsass-Lothringenia"
  missään, mutta en myöskään saanut kameraa suoraan Alsacen päälle
  (pelaajakeskeinen kamera, ks. alla), joten tätä ei voi pitää
  täytenä vahvistuksena. `8-italian-raja-maakuntanimet.png`.

## Ei saatu luotettavasti testattua

- **Kartuschan sisennys / aiheiden napautus ei mene läpi kartalle
  (v1987)**: napautus kartuschan tekstirivillä ("RANSKA" / "France ·
  tasavalta v. 1873") avasi kahdesti peräkkäin saman satunnaisen
  valokuvakortin ("Amboisen linna"), ei kartuschan omaa avautuvaa
  paneelia. Testi osoittautui kuitenkin epäluotettavaksi: neutraalin
  kartta-alueen napautus (ei kartuschaa, ei nostoa) avasi eri
  satunnaisen valokuvakortin ("Millaun silta") samalla tavalla —
  tästä päättelen, että lähes JOKAINEN kartta-canvasin napautus
  laukaisee tällä tallenteella satunnaisen valokuvamuisto-mekaniikan,
  joka peittää testattavan kohteen ennen kuin ehtii nähdä osuiko
  napautus kartuschaan vai sen läpi karttaan. En pystynyt
  erottamaan onko kyse regressiosta vai vain siitä, että kortti
  ehtii aina väliin. `4`–`6`-kuvat.
- **Löytämisen sumu (v1988)**: ei ehditty, v1988 tuli tuotantoon
  vasta juuri ennen keskeytystä.
- **Uusi pyramidi tarkemmin (nostotasot maittain)**: ei ehditty.

## Vahvistettu (uudelleen, ei uutta)

- **"Liiku"-nappi ei reagoi simulaattorin synteettiseen kosketukseen**
  — sama tunnettu työkalurajoite kuin aiemmilla kierroksilla
  (kuollut nappi -perhe). Kahdesti tarkistettu koordinaatti,
  ei muutosta karttaan. `9-liiku-nappi-ei-reagoi.png`.

## Ei vakavuus 1–2 -löydöksiä

Kartuschan tapaus on epäselvä (ks. yllä) — ei riittävän varma
raportoitavaksi bugiksi, vaatii uudelleentestin joko rauhallisemmalla
tallenteella tai satunnaiskorttien poiskytkennällä.

## Keskeytyksen syy

Omistajan päätös 21.9.2026 n. klo 09.35: koko kehitystyö siirtyy
`/Users/Shared/Matkakirja/`-hakemistoon. Sulavuusmittausta (Fablen
pyyntö, Pelikoodarin mittari `matkakirja.ui.pallolauta.sulavuus`)
ei ehditty aloittaa lainkaan ennen keskeytystä. Ks. luovutus
`docs/raportit/viesti-laitetestaaja-luovutus-20260921-siirto.md`.

## Työkalueste uudessa käyttäjässä (21.9.2026 n. klo 12.40–12.42)

Uusi Mac-käyttäjätili (`koodaus`). Yritin jatkaa kierrosta 22:ta
tuotannossa (v1991) iPad Pro 11" (M5) -simulaattorilla
(`503000D1-34AC-4C42-BDF8-7E36753A87CD`). Simulaattorityökalun
(MCP `control`) `screenshot`-toiminto alkoi antaa pelkkää
`captureFailed`-virhettä — myös `detach`+`attach`-kierroksen jälkeen.
Fablen ohjeen mukainen toipumisyritys:

1. `xcrun simctl shutdown all` + Simulator-sovelluksen sulkeminen
   kokonaan (`osascript -e 'quit app "Simulator"'`) — ei bootattuja
   laitteita ja Simulator.app-prosessi todennetusti poissa.
2. `xcrun simctl boot <UDID>` uudelleen, ~20 s odotus, MCP `attach`
   uudelleen — ei laitelupakysymystä (lupa säilyi), mutta
   `screenshot` antoi yhä `captureFailed`.
3. Vaihdoin suoraan `xcrun simctl io <UDID> screenshot <polku>`
   -komentoon kuvien ottamiseksi (TOIMII: sivu lataantui normaalisti,
   `matkakirja.app` näkyi kaappauksissa). Kokeilin yhtä kosketusta
   MCP `tap`-toiminnolla "Aloita seikkailu" -nappiin (piste 345, 554 —
   laskettu suoraan kuvakaappauksen pikseleistä laitepisteiksi
   1668×2420 → 834×1210). **Kosketus meni osittain läpi** (Safarin
   äänikuvake muuttui siniseksi/aktiiviseksi, eli sivu vastaanotti
   tapahtuman ja ääni-lukitus aukesi), mutta itse nappi ei reagoinut:
   ruutu jäi "Aloita seikkailu" -aloitusnäytölle kahdessa peräkkäisessä
   suoralla `simctl io screenshot`illa otetussa kaappauksessa napautuksen
   jälkeenkin.

Tämä toistaa TÄSMÄLLEEN saman kuvion kuin ensimmäinen yritykseni tässä
istunnossa ennen tätä korjausyritystä (ks. istunnon toinen raportti
`docs/raportit/laitemittaus-sulavuus-20260921.md`): MCP:n oma
`screenshot` rikki, suora `simctl`-kuvakaappaus toimii, ja kosketus
näyttää osittain vaikuttavan (ääni-ikonin muutos) muttei laukaise
kohdenappia. En osaa sanoa, onko kyse (a) MCP-simulaattorityökalun
kosketusinjektiosta uudessa käyttäjätilissä, vai (b) täsmälleen samasta
"kuollut nappi" -ilmiöstä, joka on jo aiemmin vahvistettu tälle
tallenteelle ("Liiku"-nappi yllä) — nyt vain laajempana (myös isot CTA-
napit). Lopetin Fablen ohjeen mukaisesti tähän ja jäin valmiuteen.
Simulaattori sammutettu, Julkaisijalle ilmoitettu.
