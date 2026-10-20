# Museoiden lattiat ja askelnäytteet (Äänittäjä 21.10.2026, yöjono kohdat 1, 2, 18, 22)
Lähde: kaikki `sali*.json` (`_valmiit`, `_tyo`), askelpaketit `museo-askeleet-sora-kivihiekka-vienti-20261016` (v3) ja `museo-pehmea-kavely-20261020` (v4).

## Käytössä olevat `lattia`-arvot
| lattia | missä | oma näyte? |
|---|---|---|
| `parketti_kalanruoto`, `parketti_tammi`, `parketti_tumma`, `parketti_vaalea` | Alankomaat, Ranska | yksi yhteinen `parketti` (v2/v2b; v4 "pehmeä kävely" 20.10.) – neljä eri parkettia soi samalla näytteellä |
| `kivi_marmori_ruutu` | Alankomaat | `marmori` (v2/v2b) |
| `kivi_hiekka` (Ranska, 1 sali) | Ranska | **kyllä: v3** 6 kuivaa + 6 salikaikuista (`askel-kivi_hiekka-NN`, `-sali-NN`), ämpärissä 16.10. (25 tiedostoa) |
| `sora` (Ranska, 1 sali) | Ranska | **kyllä: v3** (`askel-sora-NN`, `-sali-NN`) |

**LS:n Ranskan kivi_hiekka ja sora: näytteet ovat valmiina ja ämpärissä (Soundly SND125978 / SND165093, portti läpi 16.10.). Taidemuseon-maa-pohjan "soivat parkettina" (20.10.) tarkoittaa kytkentää (`MuseoAskeleet`-valinta), ei puuttuvaa ääntä** → kytkijän (PK/LS) on lisättävä v3-manifestin `lattiat.*.salien_lattiat` valinta. Äänittäjältä ei puutu mitään.

## Havainnot
- **Taso:** v3 kivi_hiekka ja sora −32,0 LUFS/askel (huippu −11…−13 dBFS), kuten v2b; v4 pehmeä parketti −36,3 LUFS (22 s kävely, eri mittaus) eli noin 3,7 dB hiljaisempi, kuten tarkoitus. Jos parketti vaihtuu pehmeään v4:ään, Ranskan kivi/sora (−32) on jäämässä selvästi kovemmaksi kuin parketti – **tason tasaus v4:n mukaan on LS:n / PT:n päätös** (omistaja 20.10. 16.08: pehmeä, matala); mittaus riittää minulta.
- **Toisto:** v3 sisältää 6 askelta per lattia (portin perhe ≥ 3 ok); 0,8–1 s välein satunnaisesti. Alankomaiden parketilla v2:n askelmäärä ei ole tässä mitattu (kohta 22 jatkuu).
- **Aukot:** jos museoihin tulee uusia lattioita (esim. kivi_laatta, matto, puulankku, lasi), jokainen tarvitsee oman sarjan; aukkohaku (Soundly/Sonniss ensin) ennen kuin generointia ajatellaan – ei tällä hetkellä tarvetta, koska kaikilla käytössä olevilla lattioilla on näyte.
