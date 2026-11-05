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

## Lisäys 19.0x: mistä aika koostuu (PT, lokista, ei uutta ajoa)
KORJAUS: yllä olevan taulukon sarakkeet "siirtymä valmis", "lähtö" ja "perillä alusta" ovat Unityn käynnistyksestä laskettua aikaa (Time.unscaledTime), eivät pelaajan odotusta. Otsikko "perillä alusta" johti harhaan. Pelaaja valitsee Pariisin noin t = 23 s; sitä ennen on ajon alku (Unity, uusi peli, kartta, skenaarion odota 10 ja odota 3). Oikean pelin käynnistystä nämä ajot eivät mittaa.

Valinnasta (siirtymä alkaa), s:
| vaihe | google-6fc1cda8b | esilataus2-d12a5d046 |
| yleiskuvan laatat ≥ 95 % (latausruutu) | 7,9 | 6,7 |
| Notre-Damen esilataus (latausruutu) | 0,6 | 9,1 |
| latausruutu yhteensä | 8,5 | 15,8 |
| avaustauko 2,3 s + esitys | 2,3 | 2,4 |
| lasku | 12,9 | 8,7 |
| perillä valinnasta | 23,8 | 26,9 |

Ehdotukset, ei toteutettu eikä mitattu:
1. Avaustauko pois tervehdyslaskusta: 2,3 s lyhyempi, ei lataushintaa, koska lasku ei odota sitä. Tauko on omistajan vanha päätös "ei hätiköityä alkua" (AvausTaukoS), mutta tervehdys alkaa nyt heti.
2. Notre-Damen esilataus rinnan yleiskuvan kanssa eikä sen jälkeen: säästö arvio, enintään osa 9,1 s:sta.
3. Latausruutu yleiskuvan rajalla ja lasku heti: noin 7 + 13 = 20 s perille, laskua ei lyhennetä; tämä kumoaisi PT:n pitämän 8,7 s:n.
Mac, Google, yksi mittaus, 640×480-valinta, tyhjä välimuisti; iPadin luvut voivat olla pidempiä.

## Lisäys 19.1x: kärki 265fa7a20, TÄMÄ ENSIN
PT 19.1x: avaustauko pois tervehdyslaskusta (vain Pariisi), esilataus rinnan yleiskuvan kanssa, yksi ajo noin 3 kuvaa, aika valinnasta, pari PT:lle, ei junaan, ei iPadia. Tehty 265fa7a20 natiiviseppa/pallo-aloitus-219: testit 521/521 (koko sarjaa ei ajettu), unity-tarkistus 0 virhettä.

Ajo natiiviseppa-pallo-nopea-265fa7a20 EI KELPAA: t = 24,9 s Google palautti HTTP 429 (root.json, Cesium ionin jaettu minuuttiraja; syy koodista riippumaton, ei varmistettu), kartta vaihtui Ioniin (lokissa "kaupunki: data Ion"), kuvissa ei Notre-Damea eikä rakennuksia. Sen 20,03 s valinnasta ei ole tulos. Älä lähetä paria siitä.

JU:lta pyydetty uusinta natiiviseppa-pallo-nopea2-265fa7a20, sama skenaario _tyo/natiiviseppa/pallo-aloitus/sk-pallo-nopea.txt, 2 min päästä (viesti oli JU:n jonossa, ei kuitattu). Kun JU kertoo valmiin:
1. grep "kaupunki: data Ion\|HTTP 429" unity.log. Jos Ion, ajo ei kelpaa: kerro PT:lle, älä aja kolmatta kysymättä (Google-kiintiö).
2. python3 -I _tyo/natiiviseppa/pallo-aloitus/valinta.py unity.log. Vertailu valinnasta: d12a5d046 latausruutu 15,8 s, lähtö 18,16 s, perillä 26,86 s; 6fc1cda8b latausruutu 8,5 s, perillä 23,8 s. Arvio tauon poistosta 24,6 s; rinnakkaisen säästö mittaamatta.
3. Katso a1-lahto, g1-saapui ja g2-4s täysikokoisina. Hylätyn ajon a1:ssä latauskuvan häivytys näkyy yhä lähdössä (PARIISI-teksti, palkki, Cesium-logo, pallon haamu): lasku alkaa häivytyksen alla. Se johtuu tauon poistosta eikä Googlesta, joten kerro se PT:lle, jos näkyy myös uusinnassa.
4. Pari PT:lle: lokit/natiiviseppa-pallo-esilataus2-d12a5d046/g1-saapui.png → uusinnan g1-saapui.png; luvut valinnasta; ≤ 3 riviä. Lennossa kuva a1 voi pidentää aikaa ruudun verran (suurin ruutu valinta.py:ssä).
