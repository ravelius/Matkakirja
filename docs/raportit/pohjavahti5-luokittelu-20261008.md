# Pohjavahti 4–5: C#-värit ja ΔE ≥ 5 -luokittelu (Natiivi-UI 8.10.2026, juna 169)

Päätoimittajan jono 8.10.: (1) UI-C#:n Color-literaalit Tyylikirja-vakioiksi samalla rajalla (ΔE < 5, alfa ±0,05); (2) ΔE ≥ 5:
tarkoitukselliset erikoisvärit tyylikirjaan omiksi tokeneiksi nykyarvosta ilman ulkoasun muutosta, vahingossa poikkeavat listana
värinäytteineen.

Proto: natiivi-ui/pohjavahti4-169 — defbce8e8 (C#-värit) ja eef13ea8e (luokittelu), 88646b2f6:n päällä. Web-PR #4222 (tyylikirja).
Testit: tarkista.sh 0 virhettä, Linssit 953, Peli 419, Kartta 448; tyylikirja- ja dokumenttitestit läpi. Pohjavahti kirjattu.

## Pohjavahti 4: C#-värit

- 36 + 11 literaalia → Tyylikirja.Kehys / Himmennys / Tila / Kuulto (`new Color(…)` → `(Color)Tyylikirja.X.Y`, Color32 suoraan).
- Jäljelle 45 literaalia ΔE ≥ 5 (eniten IssKytkimet 14, RadioNakyma 5, MikseriPaneeli 4, Saagraafi 4: ISS-kytkimet, radion asteikko,
  mikserin palkit ja säägraafin datavärit) ja noin 100 laskettua väriä (Color.Lerp, muuttujat, alfa koodista). Ne eivät ole
  literaaleja, joten tokenointi vaatisi koodimuutoksen pinta kerrallaan.

## Pohjavahti 5: luokittelu (504 USS-värideklaraatiota)

Sävyero lasketaan RGB:stä ilman alfaa lähimpään tokeniin (myös teematokenit). Erikoisperhe päätellään valitsimesta.

| Luokka | Deklaraatioita | Toimenpide |
|---|---|---|
| KUULTO: tokenin sävy (ΔE < 2), oma alfa | 213 | 110 uutta tokenia `--tk-kuulto-<token>-<alfa×100>` (esim. paperi-korostus-25, musta-60, valkoinen-50); pahin ΔE 2,75 |
| ERIKOIS: tarkoituksellinen oma väri | 68 | 50 uutta tokenia `--tk-erikois-<perhe>-<n>[-aNN]` nykyarvosta (ΔE 0) |
| TÄSMÄ: teematokenin osuma (lasi-avaruus, harmaa, onnistuminen) | 10 | olemassa oleva token |
| VAHINKO: lähellä tokenia ilman syytä | 171 (108 arvoa) | ennallaan → Päätoimittajan päätös |
| text-shadow ja paikalliset muuttujat | 25 + 17 | ennallaan (var() text-shadow-shorthandissa testaamatta; paikalliset muuttujat ovat jo pinnan omia tokeneita) |

Erikoisperheet: astro (astronautti, ISS, minipulu), tila (oikein, väärin, valmis, varoitus, tilastot), opas (linkit, nauhat), radio,
leima (sähke, paljastus, kartta), aikajana, elama (elämäpalkki), ihme (ihmenauha, ihmetähti), kartuscha (radiovalo), saa (sää,
lämpövyöt) ja muu (lisenssivaroitus, liukusäätimen ura, kytkin, visan tulos).

## Vahingossa poikkeavat (päätettäväksi)

Värinäytteet: kaappaukset/pohjavahti5-20261008/vahinko-1…3.png. Jokaisella rivillä NYT | EHDOTUS (lähin token samalla alfalla), molemmat
paperilla ja tummalla. Koko lista paikkoineen: pohjavahti5-vahinko-20261008-liite.json.

| ΔE ehdotukseen | Arvoja |
|---|---|
| < 3 (käytännössä näkymätön) | 54 |
| 3–5 | 26 |
| 5–10 | 28 |

Yleisimmät: paperinvalkoiset rgba(255,250–253,238–245, 0,25–0,9) → tk-paperi-pinta (ΔE 2–3,7, noin 45 deklaraatiota); astron
#e9faf0 ja #eafff3 → tk-lasi-avaruus-muste (ΔE 2,2–2,9); ruskeanharmaat tekstit (rgb 128–200) → muted, sea-ink tai harmaan teeman
vakiot (ΔE 5–9). Ehdotus: ΔE < 3 tokeneiksi suoraan (kuulto-tokeneina), 3–10 pinta kerrallaan omistajan katselmoinnilla. Osa voi
olla tarkoituksellisia (esim. ISS-kyydin punainen piste ja työhuoneen valmis-tagi #e2efdc); merkitse ne, niin siirrän erikoistokeneiksi.

## Päätoimittajan päätös ja pohjavahti 6 (8.10.2026)

Päätoimittaja kuittasi junaan 169 eef13ea8e:n ja PR #4222:n sekä hyväksyi ehdotuksen: ΔE < 3 suoraan tokeneiksi, ΔE 3–10 pinta kerrallaan
värinäytteillä ennen muutosta.

- Proto e9c9de7a3 (eef13ea8e:n päällä) ja web-PR #4223 (pinottu #4222:n päälle): 54 arvoa / 94 deklaraatiota lähimpään tokeniin omalla
  alfalla; 34 uutta kuulto-tokenia; pahin ΔE 2,94. Testit 953/419/448, tarkista.sh 0.
- ΔE 3–10 pinnoittain (kaappaukset/pohjavahti6-20261008/<pinta>.png; arvoja / deklaraatioita): Linssit 15/22, Lehti 14/19, Matkakirja 11/16,
  Kartta 8/9, Kysymys 3/3, Pulu 3/3, Kohdekartta 2/3, Sahke 1/1, Sahketehtava 1/1.
