# Pulun (Livian) ISS-käsikirjoitus — Astronautin kamera ja ISS-kyyti (Päätoimittaja 28.9.2026)

Omistaja 28.9. klo 19.3x: Pulu toivottaa avaruuslinssiin tervetulleeksi ja kertoo, mikä juttu tämä on, eri vaiheissa;
suosittelee muutamaa paikkaa, pyöräyttää pallon valmiiksi ja kysyy "haluatko katsoa tuonne?", mutta räppäisee ennen
vastausta jonkin näkymän päälle, pahoittelee, palaa aloitusnäkymään ja antaa lopulta pelaajan katsella itse. Palaa, kun
pelaaja menee ISS:n kyytiin. Äänenä Livian ElevenLabs v4 (esigeneroitu), SFX- ja tunnetagit (hakasulkeet, englanniksi).
Livia puhuu itsestään Liviana, ei Puluna. Faktat tarkistettu: ISS ~400 km, kierros ~90 min.

## A. Tervetulo (ensimmäinen avaus Astronautin kamerassa)

A1. [wings flapping] [excited] Kas, sinäkin täällä! Tervetuloa avaruuteen, tai no, sen reunalle. [proud] Tämä on
astronautin kamera: oikeita kuvia, jotka astronautit ovat ottaneet Kansainväliseltä avaruusasemalta.

A2. [whispers] Ja kaikki tämä noin neljänsadan kilometrin korkeudelta. [pause] Minä en ole koskaan lentänyt niin
korkealle. Setäni väittää lentäneensä, mutta setä väittää paljon.

## B. Suositukset

B1. [curious] Katsotaanko ensin jotain? Minulla on kolme suosikkia: Venetsian laguuni, Alpit ja Santorinin
tulivuoren kaldera.

B2. [excited] Venetsia! [wings flapping] Pyöräytän pallon valmiiksi… [whoosh] noin. Haluatko katsoa tuonne?

## C. Räppäisy ja anteeksipyyntö (ennen kuin pelaaja ehtii vastata)

C1. [tap] [gasp] Hups. [embarrassed] Nokka osui väärään kohtaan. Tuo ei todellakaan ole Venetsia.
[sigh] Painottomuus ei sovi kyyhkyille.

C2. [apologetic] Anteeksi, anteeksi! [wings flapping] Viedään kaikki takaisin alkuun… [whoosh] Kas niin.
Pyöritä sinä, minä en enää koske mihinkään. [pause] Lupaan.

## D. Paluu, kun pelaaja menee ISS:n kyytiin

D1. [radio static] [excited] Hei! Täällä Livia, asemalta! Nyt ollaan oikeasti kyydissä: tuo pallo alla on juuri nyt
siinä, missä ISS lentää. Elävänä.

D2. [proud] Asema kiertää maapallon noin puolessatoista tunnissa. [laughs] Minä en ehtisi siinä ajassa Ateenasta
edes Delfoihin.

D3. (yöpuolella) [whispers] Katso, kaupunkien valot. Tuo kirkas täplä voi olla Pariisi. [pause] Tai Lyon.
Yöllä kaikki kaupungit näyttävät kultaisilta.

D4. (poistuessa kyydistä) [warmly] Hyvää matkaa takaisin maahan. Minä jään vielä hetkeksi tänne kellumaan.
[wings flapping]

## Toteutusohje (Pelikoodari web, natiivi Linssiseppä/Natiivi-UI web-mallin mukaan)

- A soitetaan vain ensimmäisellä avauksella (muistetaan), B–C samassa jaksossa heti perään; C1:n "räppäisy" on oikea
  näkymän vaihto (esim. väärä NASA-kuva tai hetkellinen 1000×-nopeutus), C2 palauttaa aloitusnäkymän ja luovuttaa
  ohjauksen pelaajalle. Pelaaja voi ohittaa koko jakson napautuksella (Livia vaikenee heti).
- D1 kyytiin tultaessa kerran per sessio, D2 ~20 s myöhemmin, D3 kun yöpuoli alla ensimmäisen kerran, D4 poistuessa.
- Quindar-piippaukset D-radiolle pelissä siniäänenä (malli ei tuota niitä). Kaikki kiinni Vähennä liikettä / mykistys.
