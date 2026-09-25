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

---

## LISÄYS 19.9.2026 klo 18.50 Suomen aikaa: läiskälaatat (Fablen jatkotehtävä klo 18.45)

### Juurisyy (mitattu): orpo pelilaudan laatta jäi näyttämöön

Lohkoon 48 lisättiin `LAASTARIN_DUMP=1`, joka tallentaa jokaisen
laattakerroksen verkon kankaan pienoiskuvana z/sarake/rivi-nimellä sekä
kaappaukset pilvet piilotettuina ja palautettuina. Lohkon omissa
kankaissa (72 kpl) ei ollut läiskiä. Läiskät syntyivät niissä ajoissa,
joissa näkyviä kankaita oli enemmän kuin kerroksen laattoja: 74/72,
74/72 ja 73/72 viidestä vanhan koodin ajosta, 72/72 kahdessa. Ylimääräiset
verkot olivat **z7-laatat 7/92/40, 7/94/41 ja 7/91/40, joissa oli
PELILAUDAN SEEPIAKARTTA** (nimiö "Thessaloniki"). Astronautin sävy
ja suodatin näyttävät ne kermanvärisinä tai mustina läiskinä
(`laiskalaatta-ennen-jalkeen-390.jpg`: vasemmalla läiskät, alhaalla
ylimääräisten verkkojen pienoiskuvat, oikealla korjattu).

Mekanismi on seuraava. Peli alkaa Ateenasta, ja pelilaudan z7-laatan
haku on kesken, kun Astronautin kamera avautuu. Kerros mitätöi laattansa
(reliefi-lippu vaihtuu), mutta laastari luo heti SAMAN AVAIMEN laatan
Ateenan ympärille. Vanhan haun tarkistus `laatat.has(t.avain)` meni läpi,
jolloin seepialaatta koottiin ja vienti asensi sen verkon. `poista`
purkaa aina taulun nykyisen olion verkon, joten vanha verkko jäi
näyttämöön pysyvästi.

### Korjaus (`js/pallolaatat.js`)

- Kaikki neljä tarkistusta `!laatat.has(t.avain)` → `laatat.get(t.avain) !== t`
  (haun jälkeen, varalaatan jälkeen, jonon käynnistys ja vienti).
- Vienti vapauttaa orvon laatan geometrian, tekstuurin ja materiaalin
  eikä asenna sitä (`mittarit.orpoja`).
- Lohko 48 vaatii lisäksi, että kankaita ≤ laattoja (ei orpoja).

### Mittaukset

| Ajo | Kankaita / laattoja | Lohko 48 | savuke-astro-pallo puhelin |
| --- | --- | --- | --- |
| Vanha koodi (5 ajoa) | 72, 72, 74, 74, 73 / 72 | läiskät kolmessa | – |
| Korjattu, ajo 1 | 72 / 72 | OK | 54/54 |
| Korjattu, ajo 2 | 72 / 72 | OK | 54/54 |

`node --test tests/*.test.mjs`: pass 3658, fail 0.

### Sonnetin Kreikka-havainto (pelilauta, kokonaan kermanvärinen ruutu)

Sitä ei mitattu. Korjaus on kuitenkin yleinen: se koskee jokaista tilan
vaihtoa, jossa sama avain luodaan uudelleen kesken haun, myös paluuta
linssistä pelilaudalle. Todennäköisesti sama mekanismi toiseen suuntaan
(astronautin tai topografialinssin laatta orvoksi pelilaudalle). Tämän
voi todentaa laitteella v1961:n jälkeen.
