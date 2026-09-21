# Linssit maanosittain — inventaario (2026-09-21)

Sisältökirjuri (Sonnet), Fablen tilaus. Ei koodimuutoksia — pelkkä
luokittelu ja tasausehdotus. Lähteet: `js/linssit/rekisteri.js`
(toteutetut ja varatut TYÖKALULINSSIT), `docs/linssikatalogi.md` (112
ideaa, TARINALINSSIT), `docs/raportit/linssit-eurooppa-kartoitus-
20260921.md` (Euroopan 38 tarinalinssin ankkurikaupunki-ehdotus),
`js/pallolauta/linssit.js` ja `linssikartta.js` (moottori, ei
sisältölistaa). **En löytänyt "MAAPALLON VOIMAT" -ideavarastoa mistään
pushatusta haarasta tai lokitiedostosta** (paikallinen kopio
`docs/raamattu-loki/paatokset-2026-09.md` päättyy klo 20.08 pelikaupunki-
erä A:n kirjaukseen) — jos se on Fablen omassa vielä pushaamattomassa
työtilassa, pyydän sen sisällön erikseen täydennystä varten.

## Kaksi eri mekaniikkaa — älä sekoita

1. **TYÖKALULINSSIT** (`js/linssit/rekisteri.js`): löytyvät mantereen
   laattapyramidin ALTA (`manner`-kenttä) tai tietäjäpisteiden neljältä
   kynnykseltä (`manner: null`, "ripoteltava"). Näitä on vasta 9
   toteutettu + 9 varattua riviä, ei 112.
2. **TARINALINSSIT** (`docs/linssikatalogi.md`, 112 ideaa, moottorit
   aikajana/alue/virta): myönnetään kaupungin ISON paikallisaarteen
   löydöstä (`js/linssit/aarteet.js` LINSSIAARTEET, taulu tyhjä —
   odottaa omistajan rengaspäätöstä). Nämä ovat siis sidottuja
   KAUPUNKIIN, ei suoraan mantereen laattaan — mutta kaupunki kuuluu
   aina yhteen mantereeseen, joten jako on silti mielekäs.

## A) Työkalulinssit: 9 toteutettu + 9 varattu

| tunnus | manner | tila |
|---|---|---|
| pallo | null (ripoteltava) | toteutettu |
| keksinnot | null | toteutettu (myös tarinalinssi B1) |
| ihmisen-matka | null | toteutettu (rakenteilla, myös tarinalinssi C7) |
| radio | null | toteutettu |
| satelliitti | null | toteutettu |
| vertailu | null | toteutettu (keskeneräinen, harmaa) |
| maatiedot | null | toteutettu (keskeneräinen, harmaa) |
| vesistot | null | toteutettu (keskeneräinen, harmaa) |
| topografia | **southamerica** | toteutettu — AINOA toteutettu, joka on sidottu mantereeseen |
| historia | middleeast | varattu, ei koodia |
| ilmasto | oceania | varattu, ei koodia |
| kielet | europe | varattu, ei koodia |
| leviaminen | africa | varattu, ei koodia |
| tuulet | asia | varattu, ei koodia |
| yokartta | northamerica | varattu, ei koodia |
| maaluvut | null | varattu, ei koodia |
| muuttoliike | null | varattu, ei koodia |
| tahdet | null | varattu, ei koodia |

**Havainto: manner-jako on jo ETUKÄTEEN tasapainossa.** Kaikki
toteutetut (paitsi topografia) ovat ripoteltavia, ja varatut
paikkavaraukset kattavat jo kaikki kuusi mannerta (Lähi-itä, Oseania,
Eurooppa, Afrikka, Aasia, Pohjois-Amerikka) — vain Etelä-Amerikalla ei
ole omaa varattua tunnusriviä (topografia vie sen paikan). Tässä
kerroksessa ei ole akuuttia epätasapainoa, koska rivit ovat vasta
paikkavarauksia eikä yksikään niistä ole vielä sisältöä vaativa.

## B) Tarinalinssit: 112 ideaa alueen mukaan

| alue | kpl | valmis/rakenteilla | seuraava | idea |
|---|---:|---:|---:|---:|
| **Eurooppa** (yksinomaan tai pääosin) | **34** | 1 | 14 | 19 |
| Maailma / ripoteltava ("maailma"-alue, ei sidottu) | 27 | 1 (C7) | 5 | 21 |
| Aasia (Kiina/Intia/Japani/Kaakkois-Aasia, ei Lähi-itä) | 7 | 0 | 2 | 5 |
| Lähi-itä ja Pohjois-Afrikka | 9 | 0 | 2 | 7 |
| Saharan eteläpuolinen Afrikka | 6 | 0 | 2 | 4 |
| Amerikat (Pohjois- ja Etelä-, ml. Meksiko) | 8 | 0 | 3 | 5 |
| Oseania | 4 | 0 | 1 | 3 |
| Napa-alueet / meret (ei muuhun sopivat) | 2 | 0 | 0 | 2 |
| Retro/pohjakartta (Q1-Q2, globaali/Eurooppa-ankkuri) | 2 | 0 | 2 (aineisto valittu/vedos) | 0 |
| Päällekkäinen (G1 = B3+P2) | −1 | | | |
| **Yhteensä** | **112** (108 erillistä) | 2 | 29 | 66 |

Luvut on laskettu `docs/linssikatalogi.md`:n `alue`-sarakkeesta käsin
(useampaa mannerta sivuavat idealinssit — esim. A1 Lähi-itä/Intia/Kiina,
C1 Atlantti-Intian valtameri, S2 Atlantti-kolmiokauppa — on merkitty
sille mantereelle, jonka pysäkkejä niissä on eniten, ja mainittu
tekstissä jos jako on tasainen).

## Pahimmat aukot

1. **Napa-alueet/meret: 2 ideaa (C2, S5), 0 valmis.** Ohuin ryhmä
   koko katalogissa.
2. **Oseania: 4 ideaa (L1-L4), vain L2 "seuraava", 0 valmis, 0
   rakenteilla.** Toiseksi ohuin, eikä yhtään tuotantovalmista.
3. **Saharan eteläpuolinen Afrikka: 6 ideaa, kaksi "seuraava" (J1
   Kultavaltakunnat, J4 Tutkimusmatkat) + O3 Afrikan jako.** Ohut mutta
   ei tyhjä.
4. **Eurooppa on 34/112 (30 %) — enemmän kuin Aasia+Lähi-
   itä+Afrikka+Amerikat+Oseania+navat yhteensä (36).** Tämä on
   luonnollista (Eurooppa on ainoa täysin rakennettu lauta), ei
   virhe — mutta jos halutaan tasapainoa NÄKYVYYDESSÄ eikä vain
   varannossa, mannerten oma varanto (kohta 1-3) on jo nyt selvästi
   ohuin juuri niillä mantereilla, joille ei vielä ole lautaa lainkaan.
5. **27 "maailma"-linssiä (24 %) ovat luonnostaan ripoteltavia** —
   näistä moni (O1, O2, S1, S3, S4, T2, U1, U2) sopisi sisällöltään
   yhtä hyvin minkä tahansa mantereen aarrepalkkioksi, koska aihe on jo
   globaali. Nämä ovat helpoin tasauskeino: kun Oseanian tai
   Saharan-Afrikan lauta rakennetaan, näistä 27:stä voi poimia 2-3
   ensimmäiseksi palkkioksi ilman uutta ideointia.

## Ehdotus tasauksesta

- **Ei uutta ideointia tarvita heti** — 112 idean varanto riittää
  pitkälle jokaiselle mantereelle paitsi napa-alueille (2 ideaa).
  Jos yksi uusi ryhmä kannattaa kirjoittaa, se on **napa-alueet**
  (esim. Etelä-mantereen tutkimusmatkat, jäätiköiden tiede, Huippuvuoret
  laajemmin) — nykyiset kaksi (C2 Napa-alueiden valloitus, S5
  Turkikset/valaat) kattavat vain 1800-luvun.
- **Kun Aasian/Lähi-idän/Afrikan/Amerikkojen/Oseanian laudat
  rakennetaan**, ensimmäinen palkkiolinssi kannattaa poimia OMASTA
  mantereen listasta (H1 Kiina, I3 Osmanit, J1/J4 Afrikka, K1/K3
  Amerikat, L2 Cook) — nämä ovat jo "seuraava"-tilassa — eikä
  "maailma"-listasta, jotta pelaaja kokee mantereen omana. Globaalit
  27 säästetään TÄYDENTÄMÄÄN katetta myöhemmin (2. tai 3. palkkio per
  manner).
- **Työkalulinssien manner-varaukset (kohta A) ovat jo tasapainossa**
  eivätkä vaadi muutosta — Etelä-Amerikalle kannattaa harkita omaa
  varattua tunnusriviä (esim. "amazon" tms.) jahka topografia saa oman
  paikkansa selväksi, mutta tämä ei ole kiireellinen.
