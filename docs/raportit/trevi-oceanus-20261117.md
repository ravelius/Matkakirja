# Trevin suihkulähteen keskihahmo: Neptunus → Oceanus (SK, KK 17.11.2026 klo 02.46)

## Ristiriita
`js/packs/nahtavyysjutut.js` (Trevin suihkulähde, pala 2) sanoi "merenjumala Neptunus vaunuillaan, joita vetävät kaksi hevosta".
Pelin kolme muuta paikkaa sanovat Oceanus (fokusvirta-rooma.js 859, kulttuuri-kategoriat.js 13961, nahtavyysjutut.js 10619).

## Lähteet (avattu itse; robots.txt ensin)
1. Wikipedia, Trevi Fountain (en.wikipedia.org; robots sallii): "the titan Oceanus" nousee keskinisistä "on a shell chariot pulled by two
   hippocamps and two cascading tritons"; tritonit ohjaavat ("taming hippocamps").
2. Turismo Roma, Trevi Fountain (turismoroma.it; robots sallii, crawl-delay 10 s): "the statue of god Ocean driving the shell-shaped
   chariot", vetäjinä "the angry horse and the placid horse, both held back by two tritons".
(Britannica palautti 403, ei käytetty.)

## Korjaus
- NJ: "Neptunus vaunuillaan, joita vetävät kaksi hevosta — toinen rauhallinen ja toinen villi, kuvaamassa meren kahta puolta." →
  "Oceanus simpukkavaunuillaan, joita vetävät kaksi merihevosta — toinen rauhallinen ja toinen villi."
- FV (fokusvirta-rooma.js 552): "kaksi hevosta" → "kaksi merihevosta" (nimeä ei ollut).
- Pois: "kuvaamassa meren kahta puolta": kumpikaan lähde ei sano hevosten symboliikkaa; vain rauhallinen/kiivas, joten väite jäi ilman kahta lähdettä.
- Ei uusia väitteitä (tritoneja ei lisätty).
- Äänitysjono: Trevin pala 2 -rivin avain af7fe8a0 → be1f5bd0 (uusi teksti). Muuhun jonoon ei koskettu.
- Tarkistus: git grep "Neptunus" Trevin teksteistä = 0 (jäljellä vain Berliinin planeettakysymys ja kohtaamiskuvan vihje).
