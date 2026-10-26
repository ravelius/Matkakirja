# Olavinlinna: automaattinen läpipeluu 9.10.2026 (Siirtoseppä)

Päätoimittajan pyyntö 9.10. 02.2x: koko pala 1–10 automaattisesti, kesto huoneittain, kiinnijäämiset, jumikohdat ja
vihjeiden tarve verrattuna pelattavuusmallin kohtaan 9, löydökset korjattuna.

## Menetelmä

- **Ytimen läpipeluu** (ajettu): Linssiseppä 2:n huonesimulaatio ja läpipeluuajuri (`Linssit-testit`,
  `OlavinlinnaLapipeluuTestit`) junan 170 haarassa (`siirtoseppa/juna170`, paketti v45v `0b3bc7df34670313`).
  Ajuri hiipii merkit `reitti:pelaaja-N`, tekee huoneiden teot (tarjotin, kappelin arvoitus, naamio, köysi, kiipeily,
  tiilet ja kilvet, pako) ja odottaa piilossa vartijoiden ohi. Kaksi ajoa: varjoreitti ilman virheitä sekä ajo, jossa
  vartijat saavat kiinni ja peli jatkuu tyrmän kautta.
- **Sovelluksen botti** (odottaa simuvuoroa): `poikki seikkailu botti` BUILD 169:llä (Linssiseppä 2). Luvut lisätään
  tähän, kun ajo on tehty.

## Tulokset

Simuloitu aika on ajurin liikkumis- ja tekoaika (ei lukemista eikä harkintaa). Pelaaja-arvio on ajurin malli
ensikertalaiselle (sama kerroin kaikille huoneille).

| Huone | Suunnitelma sujuva | Suunnitelma tutkiva | Varjoreitti (sim.) | Tyrmineen (sim.) |
|---|---|---|---|---|
| 1–2 vene ja laituri | 3:00 | 4:30 | 0:56 | 1:14 |
| 3 piha ja keittiö | 2:30 | 4:00 | 0:40 | 0:28 |
| 4 Kirkkotorni | 1:30 | 2:30 | 0:37 | 0:54 |
| 5 kappeli | 3:30 | 5:00 | 1:15 | 1:15 |
| 6 Linnantupa, voudin sali | 3:30 | 5:00 | 2:18 | 3:02 |
| 7 muurikäytävä | 2:00 | 3:00 | 2:01 | 1:32 |
| 8 ulkoseinä | 3:00 | 4:00 | 0:30 | 0:30 |
| 9 komero | 2:00 | 3:00 | 0:24 | 0:24 |
| 10 pako | 1:30 | 2:00 | 0:22 | 0:39 |
| **Yhteensä** | **22:30** | **33:00** | **9:04** (arvio 22:31) | **10:02** (arvio 24:33) |

- **Kiinnijäämiset** (tyrmäajo, 5 kpl, yhteensä 2:03): huone 2 (pelaaja-8, tyrmä 9 s), 4 (pelaaja-20, 10 s), 6
  (pelaaja-57, 12 s), 7 (pelaaja-81, 9 s) ja 10 (köysilaskussa, 10 s); jokaisen jälkeen uusi yritys samasta kohdasta. Huoneessa 3 kiinniottoa ei voi tapahtua (kokki ja apulainen
  hälyttävät, eivät ota kiinni), mikä vastaa suunnitelmaa. Jokainen tyrmä päättyy alle 45 s:ssa.
- **Jumikohdat: ei yhtään.** Kappelin arvoitus: 330 väärien yritysten tilaa, ei jumia. M-osa: satunnaiset tekosarjat,
  tallennus ja jatko missä tahansa sekä tyrmä 142 eri kohdassa, aina loppuun.
- **Vihjeet:** jokaisella huoneella on vihjeportaat datan merkeistä (`MVihjeetTestit`). Ajuri ei tarvitse vihjeitä,
  ja ensikertalaisen tarve selviää vasta testaajilta (180 s:n jumi → taso 2 kerran, testattu).

## Löydökset ja korjaukset

1. **Huone 8 (ulkoseinä) on selvästi suunniteltua lyhyempi: 0:30 vs 3 min.** Seinällä on 10 otetta (`ote:kellotorni-1…10`),
   0,6 s per ote ja tuulenpuuskat. Pelaajakin kiipeää sen alle minuutissa. Ehdotus Linnanrakentajalle: 20–25 otetta
   tai pidempi reitti (sivusiirtymä ikkunan ohi), jolloin kesto on noin 2 min puuskineen. Ei koodimuutosta.
2. **Huone 9 (komero) 0:24 vs 2 min:** ajuri tietää tiilien ja kilpien ratkaisun; ihmisellä aika kuluu
   kurkisteluun ja kokeiluun. Ei muutosta ennen testaajien tuloksia.
3. **Huone 10 (pako) 0:22–0:39 vs 1:30:** lyhyt, mutta suunnitelman mukainen kiireinen loppu (aikaraja 25 s).
   Ei muutosta.
4. **Kokonaisaika:** ensimmäinen pala (1–5) noin 3:30 simuloitua; arvion mukaan ensikertalainen pelaa koko palan
   22–25 minuutissa, mikä osuu suunnitelman sujuvan ja tutkivan väliin. Ensimmäinen pala on tavoitteeseen nähden
   (15–20 min) lyhyt; pidempi huone 8 korjaa M-osan rytmin.
5. **Äänettömät tehosteet (korjattu, juna 170 `28c65e98e`):** `sytytys` puuttui manifesteista (kynttilän sytytys
   ikuisesta valosta) → varaääni `raapaisu`; `vesisanko` oli vain linnan pankissa, jota seikkailun äänet eivät lue
   (pako) → varaääni `molskahdus`. Kumpikin vaatii oman äänen (lista alla).

## Puuttuvat äänisisällöt Pelikoodarille (generointilupa aamulla yhdellä kertaa)

Ensisijaisesti CC0/PD (Freesound API, Commons); generointi vain omistajan luvalla. Tasot kuten linna-aanissa
(silmukat −23 LUFS, kerta-äänten huippu −6 dBFS).

**Tehosteet, joita koodi jo kutsuu (nyt varaäänellä):**

| Tunnus | Missä | Kesto | Nyt |
|---|---|---|---|
| `sytytys` | kynttilän sytytys liekistä (kappeli, tarjotin) | 0,5–1 s, leimahdus | `raapaisu` |
| `vesisanko` | pako: vartija istahtaa matalaan veteen | 1–1,5 s | `molskahdus` |

**Pelattavuusmallin kohdan 10 lista (ei vielä kytketty; kytken, kun tiedostot ovat ämpärissä):** viitan kahina,
hanska esineeseen, vartijan varusteet (kävelyn kilinä silmukkana), kokin kauha, apulaisen luuta, nauriin osuma,
savipurkin rikkoutuminen, patapinon kaatuminen, kolikot ja hopea arkussa, tarjottimen kolina sekä elokuun yön linnut
ja kaukainen koira (silmukat). Yhteensä 12 + 2 = 14 tehostetta.

**Repliikit (UUSI, vaatii luvan; repliikit-v4:ssä jo 13 M-osan repliikkiä):**

| Ryhmä | Määrä | Arvio merkkeinä |
|---|---|---|
| Vartijat muurikäytävällä ja kellolla (pelattavuusmalli 3.6, "noin 15", tehty 3) | noin 12 | noin 420 |
| Tyrmä (vartija vie, vesipoika, irtokivi; pelattavuusmalli 3.6) | 4 | noin 140 |
| **Yhteensä** | **noin 16** | **noin 560 merkkiä** (eleven_v4_turbo, yksi otto per repliikki) |

Repliikkien tekstit kirjoittaa Sisältökirjuri käsikirjoituksen mukaan ennen generointia.
