# Juoksupelin äänet v2 ja pallokierrosten maisemat (Äänittäjä 19.10.2026, klo ~19.50)

Menetelmä (Raamattu 5.27): ammattikirjastojen (Soundly Pro, Sonniss) valmiit kokonaiset tiedostot; Gemini 3.1 Pro kuuntelee sokkona (kertaäänet 1 kuuntelu, silmukat 3, ≥ 2/3). Ei generointia. Soundly-raakatiedostot NAS:lla, `soundly-saapuvat` tyhjä.

## Viedyt paketit (media.matkakirja.app)
- `juoksupeli/aanet-v2/` — 48 ääntä + manifest: 42 kertaääntä (mono mp3 192k, huippu −3 dBFS, tarvekohtainen kovuuden tasaus), tuuli- ja sirkkasilmukka, pallokierroksen 4 maisemaa (`maisema/`: taverna, Thames, Moldava, Praha vanhakaupunki) + manifest. Ääniportti läpi (varoituksia 4, hylättyjä 0). Yksi Gemini-hyväksytty portti (19,9 s) jätetty pois kovuuden vuoksi.
- `juoksupeli/aanet-v2-1/maisema/lontoo-katu.mp3` — Lontoon kadun silmukka (Sonniss, 2/3).
- Viisi pallokierroksen maisemaa kaikki Gemini-hyväksytty; Moldava ja Thames samasta tiedostosta (Lachine-kanava, Kanada, ikkunat limittyvät osin), Praha vanhakaupunki on Pohjois-Italiasta.

## Aukot (PT:n lista)
| Tarve | Hyväksytty / tavoite |
|---|---|
| posliini | 4/5 |
| portti | 3/4 (+1 hylätty portin kovuus) |
| askel-puu | 3/4 |
| viitta-lepatus | 3/2 ✓, viitta-aktivointi 1/2 |
| huohotus | 4/3 ✓ |

## Muut aukot (ehdotus: mitkä oikeasti tarvitaan)
Nolla ääntä: askel-katto, liuku, paperilohikaarme, laulukulho, kivi-jade, puu, piha. Alle tavoitteen mutta ≥ 1: hyppy 2/3, laskeutuminen 1/3, kaistanvaihto 2/3, kolikko 1/4, kello-chime 1/3, gong 1/3, rumpu 1/3, metalli 1/3, kyyhky-siivet 1/3, tuuli 1/2.
Ehdotus: haetaan ensin vain ne nollat, joita peli oikeasti soittaa (askel-katto, liuku, puu, kivi-jade); muut tarvitsevat vain 1 ääntä, joka jo on.

## Tiedostot
`_tyo/juoksupeli-aanet-v2-20261019/`: `rakenna_v2.py`, `silmukat_v4*.py`, `*-tulos.json`.

## Nollakierros (PT 19.10. ~19.55: askel-katto, liuku, puu, kivi-jade)
Soundlysta haettu ja ladattu 14 kokonaista valmista tiedostoa (askel-katto 4, liuku 3, puu 4, kivi-jade 3; raakatiedostot NAS:lla). Gemini 3.1 Pro -sokko hyväksyi vain 1: puu = "Wood, Break, Panel, Plywood, Bend, Splinter, Snap 03" (2,3 s). Muut hylättiin tarvetta vasten: Gemini kuuli esim. vaahtomuovialustan liu'un "vetoketjuna", paljasjalka-askeleet "märkinä läiskäyksinä" ja kivi-iskut "lasin tai korkeiden klikkausten" kuuloisina. Tulos: askel-katto 0, liuku 0, puu 1, kivi-jade 0. Ei viety (yksi puu-ääni ei ole oma pakettinsa; lisään sen seuraavaan pakettiin).
