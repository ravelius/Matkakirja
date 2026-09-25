# Opus → Fable: saapumisen esittely kartan päällä (20.9.2026)

Erä `opus-local-saapumisblur`, Matkakirja Opus local (Mac Studio), 01.00–01.25 Suomen aikaa.
Pohja `origin/v1970-prep` (e4e54bac). Omistaja 19.9.2026 klo 23.22: *"Kun tullaan uuteen
kaupunkiin niin esittely kuvien taustalla saisi olla jo kartta blurrina yms jotta ei tule
hyppäystä kun isoisän kuvat ja puhe alkaa"*.

## Juurisyy

Kartta oli jo valmiina uuden kaupungin kohdalla, mutta minitraileri peitti ruudun 85 %:n
mustalla (`css/saapumistraileri.css`). Kartta paljastui vasta, kun traileri katosi — siitä
syntyi hyppäys isoisän kuvien ja puheen alkaessa. Kameraa tai laudan asettelua ei siis
tarvinnut muuttaa lainkaan.

## Muutos

`css/saapumistraileri.css`, `.saapumistraileri`:

- peite `rgba(8, 12, 18, 0.3)` entisen `rgba(0, 0, 0, 0.85)` tilalle
- `backdrop-filter: blur(12px) saturate(0.9) brightness(0.82)` (myös `-webkit-`)
- varareitti `@supports not (backdrop-filter …)`: entinen musta peite

`backdrop-filter` eikä `filter`: suodatin kohdistuu kerroksen TAKANA olevaan kuvaan, ei
pallon omaan kankaaseen, joten WebGL-piirto ja linssien kerrokset eivät mene suodattimen
läpi. Trailerin lopussa kerros häipyy 200 ms:ssä, jolloin häipyy vain sumennus — kartta on
koko ajan samassa paikassa.

Peliin ei tehty muita muutoksia: kirjaimet, kuvat, iskulause, puhe ja ajastukset ovat
ennallaan.

## Vartio

Uusi `tools/savukkeet/savuke-saapumisblur.mjs` (lisätty julkaisusarjaan), **pallolauta ja
tasokartta**, 390 × 844:

1. peitteen alfa ≤ 0,6 ja `backdrop-filter` sisältää `blur()`
2. traileri ei ole musta: reunakaistan kirkkaus > 25
3. kartta on sumea trailerin aikana ja terävä sen jälkeen: paikallinen kontrasti kasvaa
   vähintään kaksinkertaiseksi
4. kamera (`pointOfView`) ja laudan asettelu (kartan laatikko, SVG:n viewBox) ovat
   identtiset ennen traileria ja sen jälkeen

| Ajo | Tulos |
| --- | --- |
| Vastakoe (vanha css) | **6/10**: peite `rgba(0,0,0,0.85)`, suodatin `none`, kaistan kirkkaus 20,1 |
| Korjattu | **10/10** (kaistan kirkkaus yli rajan, kontrasti 0,07 → terävänä yli kaksinkertainen) |

`node --test tests/*.test.mjs`: pass 3710, fail 0. `tarkista-savukkeet`: kunnossa.

Kaappaukset: `docs/raportit/kaappaukset/saapumisblur-20260920/`.

## Samalla

`tools/savukkeet/savuke-astro-valokuva.mjs` kuunteli kovakoodattua porttia 8757; nyt se
lukee `PORTTI`-ympäristömuuttujan (oletus sama 8757), joten rinnakkainen ajo ei kaadu
EADDRINUSEen.

## Jäi tekemättä

- Laitemittaus (iOS Safari): `backdrop-filter` on tuettu, mutta sumennuksen raskaus
  vanhemmalla iPadilla on mittaamatta. Jos se näkyy nykimisenä, blur 12 px on ensimmäinen
  luku, jota kannattaa laskea.
- Savuke avaa trailerin suoraan (`naytaSaapumistraileri`) eikä pelaajan matkalla: kameran
  identtisyys on siis mitattu trailerin ympäriltä, ei koko saapumisketjusta.
