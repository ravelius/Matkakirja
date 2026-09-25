# Opus → Fable: nostovisan ulkoasu paperiksi (19.9.2026)

Erä `opus-local-visa-ulkoasu`, Matkakirja Opus local (Mac Studio), 20.45–20.55 Suomen aikaa.
Pohja origin/main (a2acffc2, v1964). Tilaus: Raamattu NOSTOVISAN ULKOASU JA
VAIHTOEHTOJEN KIELI. Omistajan laitekuva klo 20.41 (Rocamadour), sanatarkasti:
"Tämä visuaalisesti outo".

## Juurisyy (mitattu)

Laitekuvan laatikko oli **kartan kohdekortissa** (`.fokuskohde-popup`). Kaikki
hahmotelmanostot, myös Rocamadour, avautuvat siihen (`asetaKohdeVisa(piirraNostonVisa)`).
Laatikon säännöt oli kuitenkin kirjoitettu vain nostokortin valitsimella
(`.fokusnosto-kortti .fokusnosto-visa …`, css/fokusnosto.css). Tätä tiedostoa ei
lisäksi ladata kaikilla pinnoilla (js/elaintaky.js lataa sen dynaamisesti).
Kohdekortissa laatikko sai siksi lehden 3 px:n kaksoiskehyksen ilman sisäsääntöjä,
16 px:n otsakkeen ja pelin yleiset tummanruskeat napit. Nostokortin oma visa oli
jo vaalea.

## Muutokset

- `css/styles.css`, uusi osio "NOSTOVISA PAPERINA", valitsin `.minitehtava.fokusnosto-visa`:
  - yksinkertainen 1 px:n ruskea kehys (pyöristys 6 px) ja haalea paperisävy
  - kapiteeliotsake 0,66 rem ja tiiviit välit
  - vaihtoehdot vaaleina paperinappeina (#fffcf3) ruskealla reunalla ja 0,35 rem:n
    välein; kosketuskoko 42 px säilyy
  - tumma täyte vain painettaessa (`:active`); hover vain `@media (hover: hover)`
    (iOS:n tahmea hover)
  - samat säännöt nostokortille ja kohdekortille; styles.css on aina ladattu
- `css/fokusnosto.css`: osion 12 vanhat säännöt poistettu (ne olivat vain
  nostokortilla); tilalle viittaus.
- Oikein- ja väärin-tila: vastauksen jälkeen napit poistuvat, ja fakta jää
  kursiivirivinä samalle paperille. Ulkoasu on sama kuin ennen, nyt myös kohdekortilla.
- **Lehti**: lehden kulttuurivisa (`.dialog .minitehtava`, äänestyslipukerivit) oli
  jo vaalea paperi, eikä siinä ole nostovisaa. En koskenut siihen.
- Tekstiin en koskenut (vaihtoehtojen kieli kuuluu Sonnet 2:lle).

## Vartio

`tools/savukkeet/savuke-nostovisa.mjs`, väitteet **12** (nostokortti) ja **12b**
(kohdekortti), 390 × 844 -ruutu:

- laatikon korkeus on enintään puolet ruudusta
- jokaisen napin taustan luminanssi on ≥ 200 (alfa sekoitettuna paperiin)
- reuna on olemassa ja tekstin luminanssi < 80

## Mittaukset (Chromium 390 × 844)

| | Laatikko | Napin taustan luminanssi | Otsake | Savuke |
| --- | --- | --- | --- | --- |
| Ennen, nostokortti | 299 px | 240 (läpinäkyvä rivi) | 10,6 px | – |
| Ennen, **kohdekortti** | 398 px | **41** (tumma), teksti 231 | **16 px** | 12b FAIL, 22/23 |
| Jälkeen, nostokortti | 280 px | 252, reuna | 10,6 px | – |
| Jälkeen, kohdekortti | 327 px | 252, reuna, teksti 29 | 10,6 px | **23/23** |

Kaappaus: `docs/raportit/kaappaukset/visa-ulkoasu-20260919/kohdekortti-jalkeen-390.png`.
`node --test tests/*.test.mjs`: pass 3694, fail 0. `node tools/tarkista-savukkeet.mjs`: kunnossa.

## Jäi tekemättä

- WebKit- ja laitemittaus.
- Grönlanti-erä on kesken haarassa `opus-local-gronlanti` (579dec63). Tulos jo nyt:
  ruskeaa Grönlantia EI näy, koska laastari leikataan 60°:een ja Grönlannin jää tulee
  4k-pohjasta. Vastakoe rajalla 70° pudottaa jään osuuden 0,605 → 0,002. Raportti
  seuraa erikseen.
