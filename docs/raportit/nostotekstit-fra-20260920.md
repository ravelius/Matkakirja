# Ranskan nostojen tekstimäärä — FRA — 2026-09-20

Sisältökirjuri (Sonnet), Fablen pieni väliajo ennen kartuschan jatkoa.
Sama nostojoukko kuin `tools/nostoinventaario.mjs` (maastokohteet-,
hahmotelma-, maalehtinostot-, fokuskohteet-fra.js,
vain kanoniset exportit). 64 nostoa, 64
niistä mitattavalla leipätekstillä.

**LÖYDÖS FRA-siivousta varten:** 18 nostoa (kaikki
`maalehtinostot-fra.js`:stä) EI kanna omaa `teksti`-kenttää lainkaan
— ne lainaavat tekstin ajon aikana `MAA_KATEGORIAT.FRA`:n vastaavalta
lehtisivulta kentässä `lunastus` (KORTTI LEHDEN NOSTOSTA -mekanismi,
ks. tiedoston oma kommentti). Tämä mittaus laski niiden pituuden
`lunastus[0]`:sta, joten luvut alla ovat oikeita, mutta rakenne itse
on juuri se, mitä Fablen "FRA siivous" (nostostandardin kohta) tulee
yhtenäistämään — 0 tyhjää lopullisessa listassa, kaikki 18
olivat lainattuja, ei aidosti puuttuvia.

## Jakauma (leipätekstin pituus, merkkiä)

- Min: 271
- Q1 (25 %): 448
- Mediaani: 524
- Q3 (75 %): 611
- Max: 1587

## Jakauma tyypeittäin

| Tyyppi | Nostoja | Min | Q1 | Mediaani | Q3 | Max |
| --- | --- | --- | --- | --- | --- | --- |
| muut | 19 | 417 | 499 | 517 | 544 | 1532 |
| historia | 15 | 434 | 521 | 658 | 1028 | 1587 |
| kulttuuri | 9 | 401 | 522 | 610 | 1054 | 1487 |
| vuori | 6 | 271 | 297 | 363 | 382 | 455 |
| meri | 5 | 302 | 306 | 394 | 502 | 545 |
| joki | 3 | 341 | 346 | 351 | 383 | 414 |
| tekniikka | 3 | 611 | 886 | 1160 | 1305 | 1449 |
| merenkulku | 2 | 412 | 442 | 471 | 501 | 530 |
| ruoka | 2 | 400 | 436 | 472 | 508 | 544 |

## Liian lyhyet (< 250 merkkiä), 0 kpl

| Otsikko | Tyyppi | Merkkiä | Lainattu? |
| --- | --- | --- | --- |
(ei yhtään)

## Liian pitkät (> 900 merkkiä), 11 kpl

| Otsikko | Tyyppi | Merkkiä | Kappaleita | Lainattu? |
| --- | --- | --- | --- | --- |
| Avignonin paavinpalatsi | historia | 1587 | 4 |  |
| Bayeux'n seinävaate | muut | 1532 | 4 |  |
| Chambordin linna | kulttuuri | 1487 | 4 |  |
| Millaun silta | tekniikka | 1449 | 4 |  |
| Douaumontin luukammio | historia | 1376 | 4 |  |
| Chartresin katedraali | kulttuuri | 1239 | 3 |  |
| Pont du Gard | tekniikka | 1160 | 3 |  |
| Carnacin kivirivit | historia | 1116 | 3 |  |
| Mont-Saint-Michel | kulttuuri | 1054 | 3 |  |
| Lascaux | historia | 1036 | 3 |  |
| Carcassonnen linnoituskaupunki | historia | 1020 | 3 |  |

## Tyhjät leipätekstit, 0 kpl

(ei yhtään)

## Ehdotus tavoitehaarukaksi tyypeittäin

Nykyisen jakauman (yllä) ja maalehti.md:n reseptin (440–660 merkkiä
uusille nostoille) perusteella — VAIN EHDOTUS, ei päätös:

| Tyyppi | Ehdotettu haarukka |
| --- | --- |
| historia | 400–700 |
| kulttuuri | 400–700 |
| ruoka | 300–500 |
| tekniikka | 350–600 |
| merenkulku | 350–600 |
| vuori / saari / järvi / joki / meri | 300–550 |
| muut | 300–550 |

Perustelu: historia/kulttuuri kantavat useimmiten monivaiheisen
tarinan (syy + tapahtuma + seuraus) ja hyötyvät pidemmästä tilasta;
ruoka on usein yhden konkreettisen yksityiskohdan ympärille
rakennettu (esim. yksi resepti, yksi tuote) ja toimii tiiviimpänä.
Luonnonkohteilla (vuori/meri/joki) teksti on usein faktapohjainen
kuvaus, joka ei tarvitse yhtä paljon tilaa kuin historiallinen
tapahtumaketju.
