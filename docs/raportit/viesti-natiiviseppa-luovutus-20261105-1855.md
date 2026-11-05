# Natiivisepän luovutus 5.11.2026 klo 18.55 (konteksti 30 %, pehmeä raja, 7.37)

Korvaa -1832:n tilan. Sessio on Natiiviseppä, kansio Matkakirja-3d-selvittaja. Remote päälle. Cron "4 9 * * *" unity-julkaisut.py uudelleen (nollaus vie sen; tilinvaihto.md kohta 2).

## Tila
Haara natiiviseppa/pallo-aloitus-219, työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-kierto, peili natiivi-backup peili/proto/natiiviseppa/pallo-aloitus-219. Kärki d12a5d046. Ei junaan, ei iPad-ajoja. Työpuu puhdas.

## PT:n kaksi asiaa: tulos
1. Valkoiset rakennukset eivät ole vika pelissä: ne ovat automaattiajon Ion-varadatan OSM-rakennuksia (CesiumKaupunki.cs:452). Sama 6fc1cda8b Googlella on värillinen (lokit/natiiviseppa-pallo-google-6fc1cda8b/g1-saapui.png). Kaupunkikuvaa arvioivaan ajoon `linssi kaupunki google 1` (yksi Google-istunto). Pohjaa 9e8c8ab1e ei ajettu, koska 9e064504d lisää siihen vain ruutulokin ja valkoiset näkyivät jo sen ajossa. PT:lle kerrottu.
2. Portti jää, ja lasku toteutui Macilla: perillä 8,70 s (tavoite 8,5), portti 0,2 s. Kerronta alkaa 6,07 s, puhe.time etenee 6,10 s.

Mittaukset, kaikki Googlella (paitsi rivi 1), lokit/natiiviseppa-pallo-*:
| ajo | perillä | portti | laatat ≥ 99 % | siirtymä valmis | lähtö | perillä alusta |
| lauseet-6fc1cda8b (Ion) | 12,72 s | 4,2 s | - | - | - | - |
| google-6fc1cda8b | 12,93 s | 4,5 s | 9,72 s | 31,5 s | 33,85 s | 46,8 s |
| esilataus-8e217ddc7 | 11,83 s | 3,4 s | 9,42 s | 31,7 s | 34,13 s | 46,0 s |
| esilataus2-d12a5d046 | 8,70 s | 0,2 s | 1,52 s | 38,9 s | 41,23 s | 49,9 s |

**HINTA, PT:n ratkaistava:** latausruutu pitenee 7,4 s (31,5 → 38,9 s), koska se odottaa myös esiladattuja laattoja. Lasku lyheni 4,2 s, mutta perille pääsy valinnasta on 3,1 s myöhemmin. Yksi Mac-mittaus kummastakin. Suositus: pidetään näin, koska omistajan tavoite on nopea lasku ja valmis näkymä; omistaja voi halutessaan katsoa latausruudun pituuden. Vaihtoehto olisi avata latausruutu vanhalla rajalla ja antaa portin odottaa, jolloin lasku pitenee taas.

## Commitit
- 8e217ddc7: täysi tarkkuus siirrossa, reitti ennen lähtöä, portti päästää valmiilla laatoilla (tervehdysPortti, TervehdysPorttiLaatoista). Ei riittänyt: esikehys 953 m ei ollut Notre-Damen näkymä, esikamera oli pois avaustauon yli ja liukuvat reittikamerat pitivät latausasteen alhaalla.
- d12a5d046: esikehys laskun omasta kehyksestä workerin koolla (ajossa 199/67/56, lennossa 203/68/62), esilataus avaustauon yli, reittikamerat pois tervehdyslennosta, OpasTaky.KokoM (koko_m).
Ruutulokissa esi=etäisyys/kallistus/suunta. Mittarit: _tyo/natiiviseppa/pallo-aloitus/portti.py ja puhe.py; skenaariot sk-pallo-google.txt, sk-pallo-esilataus.txt.
kaanna.sh "Pallo|Opas|Pysahdys|LahtoLaatat|Kierros|Museo" 521/521, unity-tarkistus 0 virhettä. Koko testisarjaa ei ajettu. Muutos koskee vain Pariisin tervehdyslaskua (TervehdysEsilataus, tervehdysPortti), paitsi koko_m:n luku OpasTakyyn, jota muualla ei käytetä.

## Pari PT:lle (saapumishetki, sama ajon kohta)
Ennen: lokit/natiiviseppa-pallo-google-6fc1cda8b/g1-saapui.png. Jälkeen: lokit/natiiviseppa-pallo-esilataus2-d12a5d046/g1-saapui.png. Molemmat katsottu 2000 px leveinä (alkuperä 2752): Notre-Dame ja kaupunki ehjiä, ei tyhjää maata. Jälkeen-kuvassa saapumishetkellä on yksi pikkukuva oikealla ja kohteen nimi himmeämpi; syytä ei selvitetty (ei katsottu g2:ta). Koko laskua ei katsottu kuvina, vain latausaste lokista (lennossa vähintään 87 %).

## Ei todennettu
- iPad: Mac valitsee kartan tasot 640×480:sta (kallistus ≥ 20°), joten laitteella laattoja on enemmän, ja sekä latausruutu että portti voivat olla pidempiä. iPadia ei saa ajaa nyt.
- Tervehdyksen äänipolku: ajot kulkevat tekstipolkua (ääni 404). Valoseppä: opas/esittely-v1/aanet/pariisi-tervehdys.mp3 + .ajat.json, vienti vasta KK:n kuittauksella; sen jälkeen puhe.py.
- Worker: koko_m /opas/liiku-listasta on oletettu koodin kommentin ja kultaisen tiedoston perusteella; esikehys osui ajossa 199 m / 203 m, joten se tuli. Sama arvo ei ole varmistettu lokista.

## Odottaa
PT: latausruudun hinta. Sitten ääni Valosepältä. Ei omaa ajoa ilman JU:n vuoroa.
