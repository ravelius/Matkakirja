# Juoksupeli: ääniefektit ja taustamusiikki, suunnitelma (Äänittäjä 19.10.2026, EI generointia eikä latauksia)

Tilaus: PT 19.10. (omistaja 10.38). Pohja: `docs/suunnitelmat/juoksupeli-kielletty-kaupunki.md` (viisi osuutta, takakamera yläviistosta, hyppy/liuku/käännös/piiloutuminen, kesä 1914, ei vahingonteko-komiikkaa), `juoksupeli-rata-v4-tekstit-20261019.md` (spurttiviitta, 10 huonekerättävää, 5 rikkoutuvaa luokkaa, paperilohikäärme) ja SK:n huutolista (236 huutoa, 6 588 mrk, **Puyin huudot kuuluvat jo omaan pakettiinsa**, eivät tähän). Henkilöäänet: Puyi = 23 Horatius; **eunukkien/hoitajien huudot ovat vielä päättämättä** (ehdotus: 6–8 lyhyttä hälytyshuutoa, ei tähän suunnitelmaan ellei PT käske).
Sääntö (Raamattu 5.7): ei jälkisäätöä puheeseen; tehosteissa/musiikissa tasoitus, leikkaus ja häivytys sallittu.

## 1. Ääniefektit (~46 ääntä, ~150 tiedostoa varianteilla)
Lähdejärjestys PT:n mukaan: **1) Sonniss (omalla levyllä, 22 467 tiedostoa 2015–2026) → 2) Soundly (vain jos aukkoja; 14,99 $/kk, ei ostoja ilman omistajan päätöstä) → 3) Freesound CC0/CC BY (API, rajattu haku) → 4) ElevenLabs sound-generation (maksullinen, vain luvalla, viimeinen keino)**. Jokainen tiedosto ajetaan eristysporttiin (`sonniss-pallo/portti.py`: matalat taajuudet, puhe, AST-luokka) ja ääniporttiin.

Sonniss-osumat ovat karkea sana-/regex-haku tiedostonimistä (ei kuunneltu; todellinen käyttökelpoisuus selviää kuuntelussa ja portissa):

| ryhmä | äänet (varianttia) | Sonniss-osumia | lähde / huom. |
|---|---|---|---|
| **Juoksu** | lapsen askel kivellä (4), puulattialla (4), kattotiilellä (4), kynnys/portaat (2) | askel/juoksu: kivi 9, puu 24, laatta/sora 6, juoksu 39 | Sonniss; kivi- ja kattoaskelia vähän → Soundly tai Freesound; vaimenna aikuisaskel lapsen kevyeksi (korkeuden jälkisäätö kielletty vain PUHEELLE, mutta valitse mieluummin luonnollisesti kevyitä askelia) |
| **Hyppy/liuku** | ponnistus (3), laskeutuminen kivi (3) / puu (3) / katto (3), liuku kankaalla kivellä (3), kaistanvaihto-viuhahdus (3) | hyppy/laskeutuminen 507, whoosh 546, liuku/raapaisu 396 | Sonniss riittää |
| **Spurttiviitta** | viitan pullistuminen/lepatus (silmukka 2), aktivointi-whoosh (2) | kangas/viitta 150 | Sonniss |
| **Piiloutuminen** | ammeen taakse (kangas + keramiikka koputus 3), piilossa-hiljaisuus (huoneääni 1), paljastuminen (2) | vesi/ammeet 135 | Sonniss + Freesound |
| **Takaa-ajajat** | eunukkiryhmän askeleet (silmukka 2), kaapujen hulina (2), huohotus (3, ei sanoja), kurotus/nappaus (3), kiinniotto+nosto (3) | hengitys 153, kangas 150 | huohotus: ei sanoja (eristysportti); nappaus: kangas+käsi Sonnissista |
| **Ovet/portit** | raskas puuportti auki/kiinni (4), kynnysten kolahdus (2) | ovi/portti 360 | Sonniss; kiinalaistyylistä porttia ei välttämättä löydy → raskas puuovi kelpaa |
| **Kerättävät** | kultanasta-kilahdus (4, ascending), nimitaulun nosto (puu 2), harjahahmon löytö (soittokello, 3), esineen löytö (3), kokoelman täyttyminen (1) | kolikko/nasta 159, kello/gong 69+255 | Sonniss + sointikellot (singing bowl, chime) |
| **Rikkoutuvat (51 esinettä → 8 materiaaliluokkaa × 3–4 varianttia = ~28)** | posliini, jade/kivi, cloisonné/metalli (kilahdus), lakka/puu, norsunluu/luu, pronssi (kumea), lasi/kristalli, kivisoitin | posliini 6 (!), lasi/jade 66, puunmurskaus 27, metalli/gong 69 | **Posliiniosumia on vain 6 → pääaukko**; ensin Soundly "ceramic vase smash"; viimeinen keino generointi |
| **Elinvoiman kulutus** | törmäysisku (3), "auts"-vastine on Puyin huuto (ei tehostetta) | iskut runsaasti | Sonniss |
| **Ympäristö (silmukat, 5 osuutta)** | 1 opetussali (hiljainen, kaukainen kello), 2 porttikäytävä (kaiku, kaukaiset askeleet), 3 piha (kesän sirkat/kaskaat, tuuli, kyyhkyt), 4 kuja (kapea tuuli, kaukainen kaupunki), 5 katot (korkea tuuli, kyyhkyjen siivet, varikset) | tuuli 792, sirkat 249, linnut ~395 | Sonniss + Freesound CC0; puhtaus portilla (ei liikennettä, ei mikrofonituulta) |
| **Erikoiset** | paperilohikäärme (siipiä/paperin lepatus 3), hovin kello (säädetty; 2), kulmatornin maali: kaukainen kaupungin humina + gongi (2) | viuhka/leija 249 | Sonniss |
| **Käyttöliittymä** | osuuden vaihto (rumpuisku/gongi 3), kiinniotto-jingle (1), maalifanfaari (1) | rummut 69, gong 69 | Sonniss tai sama kuin musiikin lyhytsoittimet |

Arvio: ~**125–135 tiedostoa Sonnissista/CC0:sta ilman rahaa**; ~**12–20 tiedostoa vaatii Soundlyn tai Freesoundin** (posliini/keramiikka, kivinen askel, kiinalainen portti, lapsen askel); jos mikään ei kelpaa, **6–8 äänen generointi** (ElevenLabs sound-generation; aiempi hinta 40 kr/s, 7 s ≈ 280 kr per ääni → ~1 700–2 300 kr, vain luvalla).

## 2. Taustamusiikki (kesä 1914, kepposhenki, "Untitled Goose Game" -henkinen mutta kiinalaisin soittimin)
Tyyli: dynaaminen, kevyt ja leikkisä; guzheng-plucks, dizi-huilu, pipa, kevyet pienet rummut ja puupalikat; pitkät vakavat mollisoinnut vain kiinniotossa. Ei elokuvamusiikin (Viimeinen keisari) jäljittelyä.
| raita | käyttö | pituus |
|---|---|---|
| M1 Karkaaminen | osuus 1, tahti kevyt, napakat pizzicato-isku (huomaamaton hiipiminen) | 90 s silmukka |
| M2 Portit | osuus 2, tahdikas, kynnysrytmi | 90 s |
| M3 Pihat/ammeet | osuus 3, leikkisä, piiloutuessa musiikki hiljenee (kerros) | 90 s + piilo-versio |
| M4 Kujat | osuus 4, nopea, jännittynyt | 75 s |
| M5 Katot | osuus 5, avautuva, kirkas, finaaliin | 90 s |
| tikkerit | kiinniotto (3 s), takaisin-juoksuun (2 s), maali/näköala (12 s) | 3 kpl |
**Kerrosrakenne (stemmit)**: perusrytmi + melodia + "uhka"-kerros (matala rumpu), joka nousee kun eunukki lähenee, ilman erillistä uhkamittaria. Arvio: 5 silmukkaa + 3 tikkeriä, ~8 min yhteensä.

Lähdejärjestys: **1) ilmaiset CC0/PD-silmukat** (OpenGameArt/Freesound/Wikimedia "Chinese traditional" -haku; usein aikuisten tyylistä, tempo eri → heikko sopivuus; arvio 0–2 raitaa käyttökelpoista) → **2) generointi Lyrialla** (`tools/generoi-musiikki.mjs`; kuiva ajo antaa hinnan; aiemmat Lyria-raidat ovat tilillä tehty) — **suositus: generointi, koska dynaamiset kerrokset ja yhtenäinen tyyli onnistuvat vain generoimalla**; lupaa varten tarvitaan raitojen määrä ja hinta (Äänittäjä tekee kuivan ajon pyynnöstä).

## 3. Mitä tarvitaan päätökseen
1. PT/omistaja: hyväksytäänkö lähdejärjestys (Sonniss → Freesound → vasta sitten Soundly/generointi)? Soundly vaatii kuukausimaksun; "ei ostoja" -linja → ehdotus: ei Soundlyä, aukot Freesound CC0:sta tai generoiden.
2. Musiikki: generoidaanko (5 silmukkaa + 3 tikkeriä) vai etsitäänkö ensin CC0:sta? Suositus generointi, hinta kuivasta ajosta.
3. Eunukkien ja hoitajien huudot: tarvitaanko (6–8 lyhyttä, oma äänipooli, oma lupa)?
4. Rajaus: juoksupelin Peking-linssin moduuli rakennetaan vasta Codexin Pekingin jälkeen; tämä suunnitelma on valmis kun rakentaminen alkaa.
