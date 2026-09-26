# Build 20 -lopullinen kierros (26.9.2026, käännös 894f1feb, juna/b13 c8cd1d94)

Laitetestaaja, iPhone 18 Pro, oikea pelikulku (uusi matka → lento Ateenaan, ei uusi-peli-oikotietä).
Sisältö: 153/159 usva, 154 taivas, 155 symbolit, 156 veto, 157 maakunta-valinta, 158 pikkukuva,
elävä kartta 4+5, reitin väri, E-musiikki, Fablen 3 s -ehto.

## Tulokset

- **E-musiikki (kaupunki ateena → saapuminen-valimeri): PASS, korjattu!** Esikierroksen FAIL on kadonnut:
  `aani aihe kaupunki ateena` (testattu ensimmäisenä, ei muuta aihetta soimassa) → `musa-saapuminen-valimeri-lyria.mp3`
  ilmestyy soivien listaan (gain 0,00→0,07). Pelikoodarin korjaus toimii tässä käännöksessä.
- **D) Athos-salaisuuskortti: PASS** (regressiotarkistus) — sama komentoketju kuin esikierroksella toimii
  edelleen: "herää, valmis → salaisuus:salaisuus-deinokrateen-vuori".
- **B) Marathon → Attiki pysyvä väri: EDELLEEN EI VAHVISTETTU.** `elava herata GRC:Attiki` (linssi-komento.txt)
  → loki "elävä: herää GRC:Attiki (GRC:Attiki), 1/1, tulva 60 km" (mekanismi käynnistyy, sama kuin b19).
  Kuvakaappauksissa Ateenan/Attikan alueella ei erotu värillistä muutosta ympäröivästä maasta ennen tai
  8 s jälkeen herätyksen — sama havainto kuin b19:ssä. En löytänyt tapaa varmistaa tarkkaa "täysi sävy vs.
  uinuva" -eroa pelkästä kuvakaappauksesta tässä zoomissa; tarvitsee joko lähempi zoomaus tarkkaan
  Attikan alueeseen tai vertailukuva Natiivi-UI:lta/Karttasepältä.
- **155 (symbolikynnys 2,5, taso 1 aina): PASS silmämääräisesti** — pienet nostomerkit (pisteet) näkyvät
  usealla eri zoomilla katoamatta.
- **153/154/159 (horisonttiusva, taivas, rajaviivat):** EN PYSTYNYT arvioimaan luotettavasti tällä kameralla —
  usva/taivas-efektit vaativat kallistetun/kaukaisen näkymän (lennon tai pallon korkeus), enkä löytänyt
  komentoa siirtyä siihen suoraan pelin sisältä ilman `komento.txt`-konsolia (Kartta/Komennot.cs, eri
  tiedosto kuin peli-komento.txt — epäselvää onko käytössä tässä skenessä). Rajaviiva Kreikan rannikolla
  näytti terävältä lähikuvassa, ei ilmeisen sumeutunut.
- **156 (veto), 157 (maakunta-valinta napautuksella, peitto 0,45), 158 (pikkukuva), elävä kartta 4+5
  (parvi/sade/juna), omistajan reitin väri, Fablen 3 s -kehyspalautus: EI TESTATTU** ajanpuutteessa — nämä
  vaativat tarkkaa UI-koordinaattien hakua/pidempää havainnointia jota en ehtinyt tällä kierroksella.

## Yhteenveto
PASS: E-kaupunki (korjattu), D (regressio), 155. Ei vahvistettu/ei testattu: A(ei uusittu), B, 153/154/159,
156, 157, 158, elävä kartta 4+5, reitin väri, 3 s -ehto. En suosittele mergeä masteriin pelkästään tällä
kierroksella — liian moni kohta auki. Simulaattori sammutettu.
