# Olavinlinnan hahmot: nykytila ja paras saavutettava laatu (Linnanrakentaja 8.10.2026 klo 21.2x)

Omistajan kysymys 20.4x: "Ovatko Olavinlinnassa esiintyvät hahmot graafisesti parhaita mahdollisia, siis siinä pelissä?"
Lisäkysymys: "Entä miten se yksi hahmo, joka luotiin sillä web-alustalla testiksi?" Lyhyt vastaus: **eivät ole.** Ne ovat
toimivia mutta selvästi Thief 2014 -tasoa karkeampia, ja ero näkyy etenkin kasvoissa, käsissä ja kankaissa.

## 1. Nykytila rehellisesti
| | Olavinlinna nyt | Thief 2014 |
|---|---|---|
| Pohja | Quaternius-perushahmo (CC0, matala polygonimäärä) + Mixamo-luuranko, 1499-asut omasta putkesta | Ammattimainen yksilöllinen mallinnus ja skulptaus |
| Kolmiot / hahmo | noin 9–12 k | arviolta 15–30 k (PS4/PC) |
| Tekstuurit | 512², vain väri, ei normaali- eikä karheuskarttaa | 1–2k väri + normaali + spekulaari |
| Kasvot | yksinkertaistetut muodot, Faceit-ilmeet (blendshapet) | skannatut ja skulptatut kasvot, ilmeet ja huulisynkka |
| Kädet, kankaat | sormet yksinkertaiset, vaatteiden poimut vain muodossa | poimut ja saumat normaalikartoissa |
| Liike | Mixamo-animaatiot, Final IK juna 168/169 | motion capture |

Hyvää: ilmeet (Faceit), luuranko ja animaatiot toimivat, asut ovat aikakaudelle oikeita, ja hahmot ovat kevyitä.
Ensimmäisen persoonan pelissä hahmot nähdään usein läheltä (vartija, vouti, kokki), joten ero Thiefiin näkyy.

## 2. Vaihtoehdot paras laatu iPadilla (Unity)
| Vaihtoehto | Laatu | Hinta | Lisenssi (peli, muokkaus, mobiili) | Työ | Muisti, Huippu-taso | 1499-asut |
|---|---|---|---|---|---|---|
| **A. Reallusion Character Creator 4/5 + ActorCore/Content Store** | Realistiset kasvot (morph-kirjasto, SkinGen), hiukset, vaatteet painoineen, ilmeet ja huulisynkka (ARKit-blendshapet), Unity-vienti (Auto Setup) | CC4/CC5 kertamaksu noin 250–300 $ (pysyvä lisenssi; tarkistettava kaupasta, CC5 on tullut). Vaatteet ja hiukset sisältökaupasta noin 30–100 $/kpl | Pelikäyttö sallittu, kun peli rekisteröidään Reallusionille (ilmainen Mass Distribution License). Osa kaupan sisällöstä vaatii Extended Licensen. Mobiilille ei erillistä rajoitusta | 1–2 pv ensimmäinen hahmo, sitten noin 0,5 pv per hahmo (asu, hiukset, LOD ja vienti glb:ksi) | noin 20–40 k kolmiota, 2–4k kartat ASTC:nä noin 40–70 Mt per hahmo, 8 hahmoa noin 0,4–0,5 Gt (mahtuu Huippu-budjettiin 5–6 Gt) | Asut mallinnetaan itse tai sovitetaan kaupan keskiaikaisista. CC:n vaatteet istuvat vartaloon automaattisesti |
| B. Epic MetaHuman | Paras kasvojen ja ihon laatu | Ilmainen alle 1 milj. $:n liikevaihdolla | **Korjaus PT:n oletukseen:** kesäkuusta 2025 (UE 5.6) MetaHumaneja saa käyttää missä tahansa moottorissa, myös Unityssä ja kaupallisesti ([metahuman.com/license](https://www.metahuman.com/license), [CG Channel 4.6.2025](https://www.cgchannel.com/2025/06/you-can-now-sell-metahumans-or-use-them-in-unity-or-godot/)). Tarkat ehdot (paikat, liikevaihtoraja) on vielä luettava EULAsta | Suuri: luonti vaatii Unrealin, raskaat LODit ja hiukset (groom) muunnettava Unityyn, iho- ja silmävarjostimet tehtävä itse | LOD0 raskas; mobiiliin LOD1–2 | Asut pitää tehdä erikseen. Sopii, mutta putki on raskas |
| C. Asset Storen realistiset keskiaikaiset hahmot | Vaihtelee. Hyvät paketit ovat 1–2k PBR-hahmoja, joiden kasvot ovat yleensä CC:tä heikommat | noin 30–150 $ / paketti | Asset Store EULA sallii pelikäytön ja muokkauksen. glb-tiedostoina CDN:stä ladattuna jakelu on tulkinnanvarainen: tarkistettava ennen ostoa | Pieni, jos asut sopivat | noin 20–50 Mt per hahmo | Harvoin juuri 1490-luvun pohjoismaiset asut |
| D. Nykyisten parannus | Normaali- ja karheuskartat ja 2k-tekstuurit samoille malleille. Kasvot ja kädet pysyvät yksinkertaisina | 0 € | Quaternius CC0 | 1–2 pv | +5–10 Mt / hahmo | Nykyiset asut säilyvät |
| E. Tripo (studio.tripo3d.ai, 6.10. koe Codexin voutikuvasta) | Tekoälyn kuvasta tekemä verkko. Kasvot sulavat ja ovat epätarkat, sormet yhteen kasvaneet, verkko on sotkuinen kolmioverkko, eikä siinä ole valmista luurankoa eikä blendshapeja. Mixamo-riggaus ja Faceit vaatisivat uudelleentopologian | Ilmaisversio: mallit julkisia (CC BY 4.0), ei kaupallista käyttöä. Maksullinen noin 16–20 $/kk (Pro), jolloin mallit ovat yksityisiä ja kaupallinen käyttö on sallittu (tarkistettava Tripon ehdoista) | Maksullisella sallittu, kolmannen osapuolen lähteiden mukaan | Suuri: jokaisen hahmon siivous, riggaus ja ilmeet käsin | – | Sopii vain taustarekvisiitaksi, ei puhuviin hahmoihin |

**Tripo-kuvapari:** 6.10. kokeesta on tallessa vain syötekuvat (`_valmiit/tripo-koe/vouti-syote-*.png`), mutta ei
generoitua mallia. Kuvapari vaatii mallin uutta latausta studio.tripo3d.ai:sta omistajan tunnuksilla. Arvio perustuu
6.10. tarkasteluun ja Tripon tunnettuihin rajoihin.

## 3. Suositus
**A: Character Creator (CC4 tai CC5 sen mukaan, kumpi on kaupassa) + Mass Distribution License -rekisteröinti.** Se on ainoa
vaihtoehto, joka antaa yhdellä ostolla Thief-tason kasvot, ilmeet, huulisynkan ja vaatteet Unityyn kohtuullisella työllä.
Nykyinen putki (Mixamo-yhteensopiva luuranko, ARKit-ilmeet → Faceitin tilalle) säilyy. Ensimmäinen koehahmo on vouti
ja sitten vartija. Sitä ennen D: nykyisiin normaalikartat ja 2k-tekstuurit (#7) nopeana välivaiheena. MetaHuman (B) on
laadultaan paras, mutta Unity-putki on raskas; se kannattaa vasta, jos CC:n kasvot eivät riitä.
Tarkistettavaa ennen ostoa: CC4/CC5:n nykyhinta, Unity- ja FBX-vienti ilman lisäosaa sekä MDL-rekisteröinti
kaupalliseen mobiilipeliin (sähköposti Reallusionille).

Lähteet: [MetaHuman-lisenssi](https://www.metahuman.com/license), [CG Channel: MetaHumans in Unity and Godot](https://www.cgchannel.com/2025/06/you-can-now-sell-metahumans-or-use-them-in-unity-or-godot/),
[Reallusion-foorumi: kertamaksu ja pysyvä lisenssi](https://forum.reallusion.com/PrintTopic526423.aspx), [Reallusion: Mass Distribution License](https://forum.reallusion.com/PrintTopic488436.aspx),
[Tripo: hinnoittelu](https://www.tripo3d.ai/help/billing/which-tripo-ai-plan-is-right-for-me), [CostBench: Tripo free plan](https://www.costbench.com/software/ai-3d-generation/tripo-ai/free-plan/).
