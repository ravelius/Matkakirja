# Opus → Fable: Astronautin laastarin MERIVARI-suorakaiteet pois (19.9.2026)

Erä `opus-local-laastari`, Matkakirja Opus local (Mac Studio), 18.03–18.35 Suomen aikaa.
Pohja origin/main (v1958, a1630082). Juurisyy:
`docs/raportit/viesti-fable-webkit-napa-20260919.md`. Fablen päätös klo 18.10.

## Muutokset

`js/pallolaatat.js` (vain astronauttitilassa, `kerrokset.astronautti` /
`pyramidinReliefiAstronautilla()`; topografialinssi ja pelilauta ennallaan):

1. **Tasainen MERIVARI on aukko.** Laatan raaka reliefikuva (tai
   varalaatta) luetaan ennen suodatinta. Pikselit, jotka ovat
   MERIVARIn (38,78,145) ±6 sisällä, merkitään aukoksi, ja aukko
   laajenee kahdella pikselillä naapureihin, jotka ovat ±40 sisällä
   (`merkitseMerivariAukoksi`). Maski leikataan kankaaseen viimeisenä
   (`destination-in`), valoliu'un jälkeen, koska multiply olisi
   täyttänyt aukon.
2. **Merilaatalle ei tasaista taustatäyttöä.** Laatta, jolla ei ole
   kuvaa eikä varaa, jää kokonaan läpinäkyväksi.
3. **Materiaali**: `alphaTest: 0.004` (aukko ei kirjoita syvyyttä;
   ilman sitä pohjapallo jäi piirtymättä ja aukko näkyi MUSTANA
   suorakaiteena, mitattu) ja esikerrottu alfa (`premultiplyAlpha` /
   `premultipliedAlpha`), jottei reunaan tule mustaa ääriviivaa.
4. **Leveysraja ±60°** (`LAASTARIN_LEVEYSRAJA`): kartta-ala rajataan
   astronautille, jolloin Grönlanti, Jäämeri ja navat jäävät
   jääsekoitetulle 4k-pohjalle. Aluemuistin avaimeen lisättiin tila.
5. Mittari `merivariAukkoja`.

`tests/laastari.test.mjs` (uusi, 4 testiä): MERIVARI on sama luku kuin
reliefipyramidissa; aukko- ja reunalaajennus; leveysraja.

`tools/savukkeet/savuke-astro-pallo.mjs`, **uusi lohko 48** (puhelin):
kamera Kreetan ylle (33,5 N / 25,5 E) ja alas, kunnes laastari on
päällä. Jokaisen laastarilaatan kangas luetaan 16 × 16 -lohkoina, ja
lasketaan läpinäkymättömät tasaiset lohkot (hajonta < 1,5) MERIVARIn
sävysuhteessa (r/b 0,34 ± 0,04, g/b 0,59 ± 0,04; suodatettu MERIVARI
mitattiin vastakokeessa: 44,77,130 ja 28,49,82). Raja on 1 % lohkoista.

`tools/savukkeet/savuke-astro-webkit.mjs`: mittari `merivariAukkoja`
laastaritilaan (lisäksi `LAASTARIN_NAKYMA` ja laattamittarit
webkit-napa-erästä).

## Mittaukset (Chromium 390 × 844 dpr 2, laastari päällä, korkeus 0,511)

| Ajo | Tasaisia MERIVARI-lohkoja | Osuus | savuke-astro-pallo puhelin |
| --- | --- | --- | --- |
| Vastakoe (korjausta edeltävä eb1a57fd, sama savuke) | 20 407 / 73 728 | 27,7 % | 53/54 (48 punainen) |
| Välivaihe (toleranssi 3, ei esikerrontaa) | 96 / 73 728 | 0,13 % | – |
| **Lopullinen** | **19 / 75 776** | **0,03 %** | **54/54** |

WebKit (savuke-astro-webkit, iPhone dpr 3, Kreeta 0,35): tummansiniset
suorakaiteet poissa, `merivariAukkoja` 676 866 ensimmäisellä kerralla.
Kaappaus: `docs/raportit/kaappaukset/laastari-20260919/kreeta-ennen-jalkeen-390.jpg`.

`node --test tests/*.test.mjs`: pass 3658, fail 0.
`node tools/tarkista-savukkeet.mjs`: kunnossa.

## Mitä jäi (rehellisesti)

- **Pilvimäiset laatat**: ennen- ja jälkeen-kaappauksissa on laastarilaatta,
  jossa on mustia pilvimäisiä läiskiä, sekä vaalea läiskälaatta
  (Kreikan pohjoisosa). Ne eivät ole MERIVARIa, ja ne näkyvät myös
  vastakokeessa, eli ne ovat eri vika. Ne näyttävät siltä, että laatan
  tekstuurina on väärä kangas (pilvikangas tai kierrätetty kangas).
  Tutkimatta; oma erä.
- **Haaleat ääriviivat** entisten suorakaiteiden reunoilla näkyvät yhä
  ohuina (1 px) lähikuvassa.
- Navan oikeaa laitekuvaa vastaavaa mittausta (dpr 3, korkeus ~1) en
  ajanut; ±60°:n raja poistaa laastarin napa-alueelta, joten renkaan
  lähde on poissa, mutta kaappausta ei ole.
- Topografialinssi ja pelilauta eivät muuttuneet (muutos on
  astronauttitilan takana), mutta niiden savukkeita en ajanut.
