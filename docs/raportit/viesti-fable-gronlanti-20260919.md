# Opus → Fable: Grönlanti Astronautin laastarissa (PAATOKSET 50, jäännös) (19.9.2026)

Erä `opus-local-gronlanti`, Matkakirja Opus local (Mac Studio), 20.33–20.45 ja 21.15–21.20
Suomen aikaa (välissä visa-ulkoasu ja astro-avaus). Pohja origin/main (v1963).

## Tulos: ruskeaa Grönlantia EI näy, joten korjausta ei tarvittu

Laastarin verkko leikataan tarkasti leveysrajaan (`js/pallolaatat.js` `laatanPalloAlue`:
`lat1 = min(latMax, …)`, ja `karttaAla` rajaa astronautille ±`LAASTARIN_LEVEYSRAJA` = 60).
60°:n pohjoispuolella näkyy 4k-pohja, jossa jää on. Mitattu neljällä koealalla
(puhelin 390 × 844, dpr 2, laastari päällä korkeudella 0,358, pilvet piilossa):
kaappaus laastari näkyvissä ja toinen laastarin verkot hetkeksi piilotettuina.

| Koeala | Jään osuus laastarin kanssa | 4k-pohja | Ero |
| --- | --- | --- | --- |
| Grönlanti, jäätikön keskiosa (63,0 N, 44,0 W) | 0,605 | 0,605 | 0 |
| Islanti, Vatnajökull (64,4 N, 16,8 W) | 0,028 | 0,028 | 0 |
| Alaska, St. Elias (60,4 N, 140,5 W) | 0,040 | 0,053 | −0,013 |
| Patagonia, eteläinen mannerjäätikkö (49,5 S, 73,4 W) | 0 | 0 | 0 |

- **Alaska**: koeala on rajan tuntumassa. Rajan eteläpuolen jäätiköt tulevat
  laastarista korkeusväreinä, mikä näkyy pienenä erona. Ero on toleranssin sisällä.
- **Patagonia**: jäätikkö on rajan sisällä, joten se näkyy laastarissa korkeusväreinä
  (ruskea/vihreä). Myöskään 4k-pohjassa sitä ei näy jäänä (liian pieni 4k-kuvalle),
  joten laastari ei huononna näkymää. Jääsekoitus pyramidiin toisi sen näkyviin, mutta
  se on eri tilaus.
- **Grönlannin eteläkärki** (alle 60°) on ohut laastarisiivu rannikolla, jossa ei ole
  mannerjäätä.

**Jään mittari**: linssin varjostus himmentää pinnan, joten jää on harmaata eikä
valkoista.
- Mitattu Grönlannin keskeltä: luminanssi 79–93, kylläisyys (max − min) 1–2.
- Jääksi lasketaan luminanssi ≥ 60 ja kylläisyys ≤ 8.
- Korkeusvärien ja meren kylläisyys on yli 10.

**Vastakoe**: `LAASTARIN_LEVEYSRAJA` nostettiin tilapäisesti 70:een. Grönlanti on
silloin laastarissa ruskea, ja jään osuus on 0,002 vs pohja 0,605, joten väite 49 on
FAIL (56/57). Arvo palautettiin 60:een.

## Muutos

`tools/savukkeet/savuke-astro-pallo.mjs`, uusi **lohko 49** (puhelin):

- neljä koealaa, kaappaus laastari päällä ja pois
- jään osuus ruudun keskineliöstä (180 × 180 CSS-px)
- väite: ero pohjaan enintään 0,05 jokaisella koealalla

Pelikoodiin ei ole muutoksia.

## Mittaukset

- savuke-astro-pallo puhelin: **57/57** (rajalla 60°); vastakoe rajalla 70°: 56/57.
- `node --test tests/*.test.mjs` (v1963-pohja): pass 3685, fail 0.

## Jäi tekemättä

- Patagonian ja muiden rajan sisäpuolisten jäätiköiden jääsekoitus laastariin
  (jaapaino ja jäätikkömaski pyramidin polttoon). 4k-pohjakaan ei näytä niitä, joten
  en tehnyt sitä ilman erillistä päätöstä.
- WebKit- ja laitemittaus.
- Huom: astro-avaus-erä (`opus-local-astro-avaus`) muuttaa leponäkymän korkeutta. Lohko
  49 asettaa korkeuden itse (0,35 → 0,13, kunnes laastari syttyy), joten se ei riipu
  siitä. Yhdistelmää en ole ajanut.
