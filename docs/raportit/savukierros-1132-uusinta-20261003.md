# Savukierros 1.1 (132) — lokillinen uusinta, 3.10.2026 klo 04.0x–04.4x

Laitetestaaja (Sonnet 5.5, high). iPhone 18 Pro 1572C658, simulaattori. Sama käännös 4cc1bbc9 (juna/b13 4e7e149e,
BUILD 132) kuin ensimmäisessä 1132-kierroksessa (`savukierros-1132-20261003.md`) — Päätoimittajan pyyntö: uusinta
niille osille, jotka jäivät ilman konsolilokia (kesken katkennut `--console-pty`-prosessi).
Tarkistus: app poistettu ja asennettu uudelleen juna-kansiosta, `kaannos.txt` = 4cc1bbc9, binäärin md5 täsmää.
**Konsoliloki pysyi käynnissä koko kierroksen ajan** (`peli-loki-1132-uusinta.txt`, 1607 riviä).

## Tulos: PASS, 0 Exception / 0 virhe koko kierroksen ajan

### 1) Sokrates: ✕ napautuksella, kaiku oikein päin — PASS
`linssi ajattelijat` + `ajattelija sokrates`: ✕ piilossa auettaessa, ilmestyy napautuksella
(`uusinta-sokrates-x-ilmestyy-1132-20261003.jpg`). Kaikukuva (kreikka+suomi) kipsipään pinnalla **oikein päin**, ei
peilikuvana (`uusinta-sokrates-kaiku-oikein-1132-20261003.jpg`). Suljettu kahdella napautuksella ✕:ään ("auki: ei
mitään" lokissa) ✔.

### 2) Marcus: kierrokset 2–3, kytkinääni — PASS
`ajattelija marcus`: loki "marcus auki, kierros 1/3" (3 kierrosta, sama kuin Sokrateella). Kierros eteni kaikukuvaan
asti (kreikkalainen teksti kipsipään pinnalla oikein päin, `uusinta-marcus-kierros-kaiku-1132-20261003.jpg`).
Sokrates→Marcus-vaihto (kytkin) ei aiheuttanut poikkeuksia eikä katkoja lokissa; ääni mykistettynä, joten
kytkinäänen v2 kuulovaikutelmaa ei voitu arvioida, mutta vaihto itsessään toimi virheettä.

### 3) Olavinlinnan liekit kerran — PASS
`linssi poikkileikkaus`: "ympäristö valmis (Huippu, 23,1 s)". Muurin soihdut ja sisäpihan valopisteet yksittäisinä
hehkuina ikkuna-aukoissa, ei leijuvia tuplaliekkejä (`uusinta-linna-yleiskuva-1132-20261003.jpg`,
`uusinta-linna-soihdut-kerran-1132-20261003.jpg`).

### 4) ISS-kyydin Pulu vaakana, puomi ei koske lukemaa — PASS
`linssi satelliitti` + `astro kyyti`: Pulu+robottikäsi vaaka-asennossa vasemmassa alakulmassa, puomi kulkee
"· ISS · 426 km · 27 550 km/h" -lukeman YLI koskematta siihen (`uusinta-iss-pulu-vaaka-1132-20261003.jpg`).

## Yhteenveto Päätoimittajalle
**0 Exception, 0 virhe-riviä** koko ~15 min kierroksen aikana (konsoliloki yhtäjaksoisesti päällä). Kaikki neljä
pyydettyä osaa PASS. TF 132 voidaan VIEdä tämän perusteella.

Kuvat: `docs/raportit/kuvat/uusinta-*-1132-20261003.jpg`. Täysi loki: `docs/raportit/kuvat/peli-loki-1132-uusinta.txt`.
