# Lautapelien opastetun ensimmäisen pelin tekstitarkistus (Mylly + Tavli)

Sisältökirjuri 12.10.2026 (PT:n tilaus, juna 183). Tarkistettu: `ui.fi.json` (`ui.pelit.opas.*`, `ui.mylly.saannot-teksti`, `ui.tavli.*`), `Lautapeliopas.cs` (vinkkien ehdot, esimerkkiasemat) ja Pelikoodarin säännöt `Mylly.cs` / `Tavli.cs`. Lähde: NUI-haara `natiivi-ui/lautapeliopas-183` (54f06443a). Koodiin ei koskettu. Merkinnät: **OK** / **KORJAA** / **EPÄVARMA**.

## Yhteenveto

| Kohde | Tulos |
|---|---|
| Myllyn vinkit (asetus, mylly-tulossa, poisto, suojattu, siirto, lento, vastustaja lentää) | OK |
| Myllyn neljä esimerkkikuvaa | OK |
| Myllyn sääntökortti | KORJAA (tasapelisääntö puuttuu) |
| Tavlin variantti | Toteutettu vain **Portes** (tavallinen backgammon); teksti vastaa tätä |
| Tavlin vinkit | OK, kolme pientä tarkennusta |
| Tavlin esimerkkikuvat | **KORJAA kaksi** (sulku, lyönti: kohde on nappulan takana) |
| Tavlin sääntökortti | KORJAA kaksi sanamuotoa, yksi täydennys |

## Mylly (Nine Men's Morris)

Koodi: 24 pistettä, 9 nappulaa, vaiheet asetus → siirto viivaa pitkin → lento täsmälleen 3 nappulalla; 16 myllyä; mylly poistaa vastustajan nappulan, ei valmiista myllystä paitsi jos kaikki ovat myllyissä; häviö alle 3 nappulalla (käsi + lauta) tai kun siirtoja ei ole; tasapeli 100 puolisiirron jälkeen asetuksesta ilman poistoa.

| Avain | Teksti | Tulos |
|---|---|---|
| mylly.asetus | "Aseta nappulasi vuorotellen mihin tahansa vapaaseen pisteeseen." | OK |
| mylly.mylly-tulossa | "Kolme omaa nappulaa samalla viivalla on mylly – korostettu piste tekee myllyn." | OK |
| mylly.poisto | "Mylly! Poista yksi vastustajan nappula korostetuista." | OK (korostus = poistettavissa olevat) |
| mylly.suojattu | "Valmiissa myllyssä olevaa nappulaa ei saa poistaa, ellei muita ole." | OK |
| mylly.siirto | "Kaikki on asetettu: siirrä nappulaa viivaa pitkin viereiseen vapaaseen pisteeseen." | OK |
| mylly.lento | "Sinulla on kolme nappulaa: saat nyt lentää mihin tahansa vapaaseen pisteeseen." | OK (ehto 3 nappulaa laudalla, käsi tyhjä) |
| mylly.vastustaja-lentaa | (sama ehto vastustajalle) | OK |

**Esimerkkikuvat** (mylly, poisto, siirto, lento): asemat ja korostukset vastaavat tekstiä. OK.

**KORJAA `ui.mylly.saannot-teksti`**: koodissa on tasapeli (100 puolisiirtoa ilman poistoa), kortissa ei. Lisää loppuun:

> "Jos sadan siirron aikana kumpikaan ei saa myllyä, peli päättyy tasan."

(Tarkka luku: `Mylly.TasapeliRaja` = 100 puolisiirtoa, eli 50 siirtoparia — sanamuoto "sadan siirron" on pelaajalle riittävän tarkka; jos halutaan täsmällinen: "Sadan peräkkäisen vuoron ajan ilman myllyä → tasapeli".)

## Tavli

**Toteutettu variantti: Portes** (tavallinen backgammon). Plakoto ja Fevga eivät ole mukana; kortin "Tavlin perusmuoto Portes on sama peli kuin backgammon" ja kapiteeli "Tavli · Portes · backgammon" ovat siis totta. Koodi vahvistettu säännöistä:

- Aloitusasema `a23:2, a12:5, a7:3, a5:5` (vaalea) / `a0:2, a11:5, a16:3, a18:5` (tumma): tavallinen backgammon-alkuasema. OK
- Suunta: vaalea a23 → a0, koti a0–a5; tumma a0 → a23, koti a18–a23. OK
- Lyönti: vain yksinäinen vastustajan nappula → palkille; piste suljettu, kun vastustajalla ≥ 2. OK
- Palkilta sisään: vaalea `a(24−d)`, tumma `a(d−1)`, ennen muita siirtoja. OK
- Tuplat = neljä siirtoa; pakkosäännöt (kaikki mahdolliset nopat, muuten suurempi). OK
- Poisto vasta kun kaikki 15 kotona (ei palkilla); tarkka luku tai suurempi vain jos kauempana ei ole omia. OK
- Mars (gammon) kirjataan; backgammon-kolmoisvoittoa ei pisteytetä. OK

### Vinkit

| Avain | Teksti | Tulos |
|---|---|---|
| tavli.heitto | "Heitä nopat. Nappulasi kulkevat nuolen suuntaan kohti kotialuettasi." | OK |
| tavli.suunta | "Siirrä nappulaa kummankin nopan silmäluvun verran nuolen suuntaan." | OK; ehdotus selkeämmäksi: "Siirrä nappulaa kummankin nopan silmäluvun verran nuolen suuntaan: samaa nappulaa kahdesti tai kahta eri nappulaa." |
| tavli.palkki | "Lyöty nappulasi on palkilla: tuo se ensin sisään vastustajan kotialueelle." | OK |
| tavli.poisto | "Kaikki nappulasi ovat kotona: nyt saat poistaa niitä laudalta." | OK |
| tavli.lyonti | "Yksinäisen vastustajan nappulan voi lyödä – se joutuu palkille." | OK |
| tavli.tuplat | "Tuplat! Siirrät saman silmäluvun neljä kertaa." | OK (ehdotus: "…jos mahdollista", koska suljetut pisteet voivat estää) |
| tavli.sulku | "Pisteeseen, jossa on kaksi vastustajan nappulaa, et voi siirtyä – se on suljettu." | **KORJAA** sanamuoto: "…kaksi **tai useampi** vastustajan nappula…" (koodi: ≥ 2) |
| kuva.tavli.sulku | "Kahden nappulan piste on suljettu." | **KORJAA**: "Kahden tai useamman nappulan piste on suljettu." |

Vinkkien ehdot (Lautapeliopas.cs `TavliOpas.Tilanteet`) ovat johdonmukaiset: palkkivinkki korostaa palkin ja avoimet sisääntulopisteet, poistovinkki näkyy vain kun poisto on laillinen, sulkuvinkki vain kun oma nappula osuisi suljettuun pisteeseen jäljellä olevalla nopalla. OK.

### Esimerkkikuvat

| Kuva | Tulos |
|---|---|
| suunta (alkuasema, koti a0–a5 nuolella) | OK |
| palkki (vaalea palkilla, a18 suljettu, korostus palkki + a19–a23) | OK (a18 jää oikein pois) |
| poisto (3+2+2+2+3+3 = 15 kotialueella) | OK |
| **sulku** (`a5: vaalea 3`, `a8: tumma 2`, korostus a8) | **KORJAA** |
| **lyonti** (`a5: vaalea 3`, `a7: vaalea 1`, `a8: tumma 1`, korostus a8) | **KORJAA** |

Vaalea kulkee kohti pienempiä numeroita (`Tavli.Kohde`: vaalea `x − d`). Sulku- ja lyöntikuvassa vaalean nappulat (a5, a7) ovat *pienemmällä* numerolla kuin kohde (a8), joten kuvan nappulat eivät voi koskaan siirtyä kohteeseen: se on jo ohitettu. Kuva opettaa väärin päin. Korjaus (vaalean nappulat kohteen yläpuolelle, esim. 3 pykälän päähän):

- sulku: `a11: vaalea 3`, `a8: tumma 2`, korostus [8]:
  `"0,0,0,0,0,0,0,0,-2,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0"`
- lyonti: `a11: vaalea 3`, `a8: tumma 1`, korostus [8]:
  `"0,0,0,0,0,0,0,0,-1,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0"`

Testi `LautapeliopasTestit` tarkistaa vain `Maara(8) == 2` sulkukuvassa, joten korjaus ei riko sitä; lyöntikuvalle voi lisätä testin: korostettu piste kuuluu `LaillisetAskeleet`-listaan nopalla 3.

### Sääntökortti `ui.tavli.saannot-teksti`

| Kohta | Tulos |
|---|---|
| "tuplat siirretään neljästi" | OK |
| "Molemmat nopat on käytettävä, jos voi, muuten suurempi." | **KORJAA**: lause on epäselvä. Ehdotus: "Käytä molemmat nopat, jos voit; jos vain toisen voi käyttää, käytä suurempi." |
| "Pisteeseen, jossa on kaksi vastustajan nappulaa, ei saa siirtää." | **KORJAA**: "…kaksi tai useampi…" |
| lyönti ja palkilta sisään | OK |
| "Kun kaikki 15 ovat kotialueella, ne poistetaan." | **KORJAA** (täydennys): poisto vaatii tarkan luvun; suuremmalla vain jos kauempana ei ole omia. Ehdotus: "Kun kaikki 15 ovat kotialueella, ne poistetaan: nopan silmäluku kertoo, miltä pisteeltä; isompi luku käy, jos kauempana ei ole omia nappuloita." |
| osumatodennäköisyydet (1→11 … 12→3 /36) | OK, vastaa backgammonin tunnettua suoran osuman taulukkoa |
| "Summa 7 on yleisin (6 tapaa)" | OK |

### Muut huomiot

- **EPÄVARMA** `ui.tavli.lukema` ("pip {0} · {1} pois"): "pip" on aloittelijalle vieras sana. Ehdotus: "matkaa {0} · {1} pois" (tai selitä sääntökortissa: "pip = nappuloiden yhteenlaskettu matka kotiin"). Ei virhe, ammattisana.
- **EPÄVARMA** aloitusheitto ("Aloitusheitto: {0} {1}, {2} {3}. {4} näillä nopilla."): tavallisessa backgammonissa kumpikin heittää yhden nopan, suurempi aloittaa ja käyttää molemmat luvut; samat luvut → uusi heitto. Teksti sopii tähän, mutta tasatilannetta ei ole tarkistettu UI-koodista (koodikommentin mukaan UI ratkaisee aloittajan).
- Mars-teksti OK. Kolmoisvoitto (backgammon, lyöty nappula voittajan kotialueella) ei ole tekstissä eikä pisteytyksessä, mikä on johdonmukaista.

## Toimenpiteet

1. Pelikoodari/NUI: korjaa Tavlin sulku- ja lyöntikuvan asemat (yllä kaksi merkkijonoa) ennen junaa 183 — ainoa opettava virhe.
2. NUI: päivitä neljä tekstiä (Myllyn tasapeli, "tai useampi" ×3, pakkosäännön lause, poistosääntö) ja kolme valinnaista tarkennusta; tekstimuutokset eivät koske skeemaa mutta natiivi-kultaiset tiivisteet (vartija.mjs --paivita) on päivitettävä, jos `ui.fi.json` kuuluu valvontaan.
3. Sisältökirjuri voi toimittaa tekstit valmiina `ui.fi.json`-paikkoina pyydettäessä.
