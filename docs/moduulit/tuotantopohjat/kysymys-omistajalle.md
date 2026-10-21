# Tuotantopohja: kysymys omistajalle

*(SITOVA, omistaja 21.10.2026 klo 17.36 ("Kyllä, sitovaksi"); pyyntö klo 17.31. Pohjan omistaa Päätoimittaja; KK käy sen omistajan kanssa. Jos tämä ja
Raamattu ovat ristiriidassa, Raamattu voittaa.)*

Jokainen rooli, PT ja KK käyvät tämän läpi ennen kuin kysyvät omistajalta mitään. Tarkoitus: omistajalle tulee vain aito
päätös, eikä koskaan kysymystä, johon Raamattu, päätösloki tai pohja jo vastaa.

## Tarkista ennen

- AINA: hae päätöslokista (`node tools/loki-hae.mjs <hakusana>`) ja Raamatusta aiheen sanoilla; jos vastaus löytyy, toimi sen mukaan äläkä kysy.
- AINA: avaa aiheen tuotantopohja (`docs/moduulit/tuotantopohjat/`) ja sen "Tarkista ennen" -osio (4.21).
- AINA: yksi suositus ensin, perustelu 3–4 riviä, ei numeroparametreja eikä A/B-vertailuja (7.27 TAVOITELTU KOKEMUS).
- AINA: kortti (AskUserQuestion) KK:n kautta; vain pitkät tekstit (huudot, repliikit, käsikirjoitukset) tavallisena viestinä
  numeroituna listana (7.27; omistaja 21.10.2026 klo 17.28).
- AINA: työ jatkuu kysymyksen ajan; jos odotus pysäyttäisi työn, edetään suosituksen mukaan muutettavissa asioissa
  (omistaja 21.10.2026 klo 17.22–17.25).
- AINA lupa omistajalta: Lyria-musiikki (jokainen kutsu, 5.15), ElevenLabs yli 3 %:n rajan tai uusi ääni (5.1, 5.2),
  ostot (11.5).
- EI lupaa: Codexin kuvat ja Tripo-mallit tarpeen mukaan (7.15), kertojan äänet hyväksytyillä äänillä (5.1),
  CC0-, CC BY- ja PD-lataukset (11.5), kaavan askeleet ja vihreät PR:t (7.27).
- EI: omistajalle sisäisiä asioita (nollaukset, kuittaukset, mittausversiot), vain hänen päätöksensä, toimensa tai valmiit
  näkyvät asiat (7.31).
- EI: kysytä uudelleen asiaa, jonka omistaja on jo päättänyt; uusi päätös kumoaa vanhan vain omistajan omalla sanalla.

## Putki

1. Kysyjä (rooli) tarkistaa yllä olevan listan ja kirjoittaa PT:lle viestin "KYSYMYS <tunnus>": kysyjä, tilanne, suositus
   ensin, vaihtoehdot, mitä tarkistettiin (pohja ja Raamatun kohdat).
2. PT tarkistaa saman listan; jos vastaus löytyy, se palautetaan kysyjälle viittauksella. Muuten PT välittää kysymyksen KK:lle,
   joka tarkistaa listan vielä kerran ennen omistajaa.
3. KK näyttää kortin (suositus ensimmäisenä) ja palauttaa vastauksen sanatarkasti rivillä "OMISTAJAN PÄÄTÖS klo HH.MM: …".
4. PT kirjaa päätöksen lokiin (`node tools/raamattu-kirjaa.mjs`) ja, jos sääntö muuttui, Raamattuun ja aiheen pohjan
   "Tarkista ennen" -osioon samassa PR:ssä.

## Valmis kun

- [ ] Kysymyksessä on suositus ensin ja lista tarkistetuista kohdista.
- [ ] Vastaus on kirjattu lokiin, ja muuttunut sääntö on Raamatussa ja pohjassa.
- [ ] Kysyjä on saanut vastauksen, ja työ on jatkunut koko ajan.
