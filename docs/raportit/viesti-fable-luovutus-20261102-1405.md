# PT:n luovutus 2.11.2026 klo 14.05

Edellinen: viesti-fable-luovutus-20261102-1250.md (+ lisäys 13.0x). Osoitteet: /Users/Shared/Claude/osoitekirja.md.
Syy: konteksti 29 % (pehmeä raja). `date` ennen aikaleimoja. Vahdit: codex-posti-vahti.sh + odottajat-vahti.py Monitorilla (30 min, viritä uudelleen).

## UUTTA TÄLLÄ VUOROLLA
- Raamattu 2.177 (PR 5988): alkulento joka aloitukseen, EI automaattisia käännöksiä (omistaja 13.38). KK ohjaa juoksupelin
  13.38-korjaukset SUORAAN PK:lle (omistaja 13.38) → PT ei anna niistä päällekkäisiä ohjeita, kuittaa vain tallenteen.
- Loki (PR 5990): SALIN KATON VARJO TAKAISIN (PT kumosi 25.10. oman linjauksensa).
- Levy kriittinen 13.3x (29 Gi): 32 yli 5 h vanhaa esikatselu-*-kansiota NAS:iin + symlinkit (scratchpad/levy/siirra-esikatselut-20261102.sh,
  palauta-linkit-20261102.py). Nyt 42 Gi. Syy: esikatseluajot 2–3 Gt/kpl.
- Junarivin kohta > 110 merkkiä jaettiin skriptillä (scratchpad/junarivi-jaa.py); juna.py:ssä ei muokkauskomentoa. Tarkistin:
  `tarkista-junat.py scratchpad/asemataulu/data/talo/junat.json` (ilman polkua se lukee repon vanhaa kopiota).
- Codex-tilaus PELIT-välilehden 4 minikuvasta (omistaja 13.31): postilaatikko f670c1140 (pallokisa, keisari-karkuteilla, katso-ja-loyda, raketti-iss).
  Postilaatikkoon kirjoitus ilman checkoutia: scratchpad/posti/laheta.sh <lähde> <polku> "<viesti>".

## OMISTAJAN PYYNNÖT 13.19–13.31 → PIENI iPAD (omistaja 13.30: asenna, kun nämä ovat junassa 218; KK kertoo omistajalle)
Työlista "Pienen iPadin päivitys Pariisin korjauksilla". Ilmoita KK:lle, kun kaikki ehdot täyttyvät.
- VALMIS junaan (PT kuittasi, NS:n merge jonossa 38b32b860…394a5b467): kutsukortti pois, aarrepiste lukittuna piiloon, pallo ei hypi, nimet koko pituisina
  (ei lyhennystä pisteeseen; avaimia ei nimetä uudelleen). Kioski + info + tähdet jo rungossa 2628a14e0. KK:lle ilmoitettu molemmista.
- Vieritys: NS natiiviseppa/piirros-striimi-218 03eb563e2, mittaus ennen/jälkeen käynnissä → kuittaa mittauksesta.
- Veneet siltojen alta: KS:n siltaleikkeet KUITATTU (_valmiit/pariisi-sillat-20261102, JU vie) + NUI cee38d922 (piirros-sillat-218) → pari + video tulossa.
- Hehkut: NUI poisti NostotKartalla-hehkun d7b4244c5; KS:n kipinät 9afaad3cc (469 kohdetta kytkimen takana) → yhteinen pari KS:ltä.
- Liiku: kuuluu näkyä (omistaja 13.30); NUI korjaa asun webin pohjaksi (11492e364 käännöksessä).
- PELIT-kuvat: Codexin toimitus → NUI kytkee, kuva ennen/jälkeen omistajalle.

## JUNA 218
- Rungossa 2628a14e0: Yangxindian-sali (+ kapea reitti, eunukit, umpikujasalipoikkeus be73a2795), rae, NUI piirros-tahdet a24a6acd8.
- PK: bugi 2 (lahipuut-v13 kytketty 192cfb127) → aja-218q pari; KAMERA kapeissa kohdissa (kamerasuoja 53c8cdfa9) → tallenne; sitten
  储秀宫 + 翊坤宫 kytkentä ja salitallenne. Testi Taso1ReittiPortiltaAukiolle03 siivottava (vanha esto-v12-juuri).
- LAV: 储秀宫 (v100) ja 翊坤宫 (rakennukset-v101, tausta-v102, esto-v27) KUITATTU, JU vie; seuraavaksi 储秀宫:n länsiseinä c-v4 → pari.
- VS (nollattu): 1) salikattovarjo 1 + piilotetun katon varjo + ikkunajuovat ~25 %, 2) maavalo varjoseinille, 3) katetut tilat mustia, 4) 06 lattia. Pari jokaisesta.
- KS: tunnisteajo (PR 5986 luonnos) taustalla; 4 epäiltyä lukittu.

## ROOLIT
- PK 30 %, KS 26 %, LAV 25 % → Postivahti nollaa tauolla. Postivahti nollattu 14.0x (kierros 04ad0c03).
- Levy 42 Gi. Codex: ei uutta postia f670c1140:n jälkeen.
