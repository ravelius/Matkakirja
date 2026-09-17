# Astronautin kamera: neliöt pois, tähdet paikallaan, hehkuvat pisteet, tummempi pallo

Opus-agentti Fablelle 17.9.2026 klo 22.25 Suomen aikaa.
Haara `claude/bold-ride-vow4ki-avaruus-hehku` (origin/main 3abfd4c6).
**Vaatii versionoston** (pelikoodi muuttuu). Uutta versiota ei ajettu.

Päätös: Raamattu ASTRONAUTIN KAMERA **LISÄYS 15**, kohdat 39–43.

## Mitä tehtiin

**39 NELIÖT POIS.** Juurisyy mitattu lähteestä: ruudun halki lentävät
vaaleat neliöt olivat tähtitaivaan **pölykerros** (`js/pallolauta/tahdet.js`
`poly`: 730 pistettä korkeudella 2,6–3,4 pallonsädettä, ainoa *ajautuva*
kerros). `particlesSizeAttenuation` suurentaa lähimmät pisteet, ja
`THREE.PointsMaterial` ilman `map`-tekstuuria piirtää pisteen neliönä —
siitä sekä neliön muoto että lento. Pölykerrosta ei enää **synny**
astronauttilinssissä (`TAHTIKERROKSET_PAIKALLAAN`), eikä sitä vain
piiloteta. Jäljelle jäävät kaukaiset tähdet pyöristetään sävyttimessä
(`pyoristaPiste`: `gl_PointCoord`-etäisyystesti `onBeforeCompile`-koukussa,
kulmat `discard`, alfa pehmenee reunalle) — THREE:n luokkia ei tarvita.
Ihmisen matka -linssi käyttää yhä koko kerrossarjaa: siellä pöly on
zoomin parallaksi eikä omistajan huomio koskenut sitä.

**40 TÄHDET PAIKALLAAN.** `luoTahtitaivas` sai kytkimen `ajautuma`;
linssi antaa `false`, joten taivas ei liiku itsestään lainkaan. Tähdet
kääntyvät vain kameran mukana. Avauksen feidaus (peittävyys) säilyy.

**41–42 HEHKUVAT VAKIOKOKOISET PISTEET.** Piste on yhä YKSI elementti
(rypäleet estyvät), mutta täyttö on `radial-gradient`: keskusta #eafff3,
kehä #5dffa8, reuna läpinäkyvä — ei tasaista kiekkoa, ei reunaviivaa, ei
`box-shadow`ia. Koko 8 px **ruutupikseleinä**; merkit ovat CSS2D-
elementtejä, joten koko ei skaalaudu pallon mukana eikä sitä lasketa
missään JS:ssä (lukko estää sen). Osuma-ala 36 px ja napautus pallon
pinnasta (44 px) ennallaan, samoin `nimienKynnys`.

**43 PALLO TUMMEMPI KAUTTAALTAAN.** Materiaalin väri `PALLON_SAVY`
= `#bfbfbf` (0,75) sekä avauksessa että sulun palautuksessa; tummennus
tulee `diffuse`-uniformista, joten se on tasainen koko pallolla.
**Mitattu yllätys:** yksi kirjoitus avauksessa EI riitä — kun reliefi
latautuu, globe.gl käsittelee `globeImageUrl`in uudestaan ja pinta palaa
täyteen kirkkauteen (167 = sama kuin valkoisella). Lisättiin **sävyvahti**
(400 ms:n kello, kirjoittaa vain kun väri on väärä; puretaan sulussa).
Pinta-musta-vartija (kynnys 12) pysyy vihreänä.

## Mittaus (Playwright, Chromium, yksi ajo: työpöytä 1400×900 + puhelin 390×844)

`savuke-astro-pallo.mjs` **112/112 läpi** (aiemmin 112 väitettä, kaikki
vihreitä). Uudet vartiot:

| Väite | työpöytä | puhelin |
| --- | --- | --- |
| 39 neliöitä 0 (kerroksia 2, ajautuvia 0, pyöreitä 2/2, käännettyjä 2/2) | OK | OK |
| 40 tähdet levossa 0,00 px / 5 s, vedossa > 0 | 0,00 → 16 901 px | 0,00 → 5 151 px |
| 41 keskusta kirkkaampi kuin reuna | 236,3 vs. 128,9 | 222,5 vs. 91,2 |
| 42 halkaisija sama kahdella zoomilla | 8 px → 8 px (alt 1,54 → 0,54) | 8 px → 8 px (alt 4,26 → 1,49) |
| 43 pinta tummeni, ei mustunut | valkoisella 123 → sävyllä **91** | 108 → **79** |

Sävyn ennen/jälkeen mitataan samassa ajossa: uusi valkoinen Color →
mittaus, sitten sama sävy takaisin → mittaus (arvo palautuu täsmälleen,
mikä todistaa voimassa olevan sävyn). Mustan kynnys 12, pallon
keskipisteen kirkkaus kaikissa ajoissa yli 40.

Muutettu vanha vartio: *"kohdepiste on pelkkä vihreä piste"* luki vihreän
`background-color`ista; nyt tasainen taustaväri on nimenomaan väärin, ja
vartio lukee liu'un (`radial-gradient`, #5dffa8 ja häipyvä reuna)
taustakuvasta. Odotusarvo kirjattu vartioon perusteluineen.

`node --test tests/*.test.mjs`: 3585 väitettä, kaikki läpi. Kaksi
lähdetekstilukkoa päivitetty perusteluineen:
`tests/satelliitti.test.mjs` (tasainen täyttö → liuku, lisäksi lukko
"kokoa ei lasketa JS:ssä") ja `tests/satelliitti-avaruus.test.mjs`
(valkoinen → `PALLON_SAVY`, sävyn haarukka ja etäisyys mustan kynnyksestä).

Kaappaus (puhelin 390×844, pallo pisteineen, savukkeen oma ajo):
`/private/tmp/claude-501/-Users-samireivinen-Matkakirja-fable/1de1d7f9-1349-4671-ad36-3323aaf75d0f/scratchpad/kaappaukset/astro-pallo-390-20260916.jpg`
— kuvassa ei ole yhtään neliötä, pisteet hehkuvat keskeltä ja pinta on
selvästi tummempi kuin omistajan v1933-kuvassa.

## Oletukset (päätetty itse, ei kysytty)

1. Pölykerros poistettiin VAIN astronauttilinssistä; Ihmisen matka -linssin
   avaus jätettiin koskematta (parallaksi on siellä tarkoituksellinen).
2. Sävy 0,75 (#bfbfbf) — Raamatun esimerkki "162 → alle 130" toteutuu
   mitatusti (123 → 91).
3. Pisteen koko 8 px (haarukka 6–8) ja hehku gradientissa, ei
   `box-shadow`issa, jotta lähekkäiset kohteet eivät sulaudu rypäleeksi.
4. Kirjaston `autoRotate` (linssin oma hidas pyöriminen) jätettiin
   ennalleen: silloin tähdet kääntyvät pallon mukana, kuten omistaja pyysi.
