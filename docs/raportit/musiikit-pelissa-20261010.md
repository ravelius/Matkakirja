# Musiikit pelissä 10.10.2026 (BUILD 175 ja juna 176)

Pelikoodari 10.10.2026 klo 10.0x, PT:n pikaerä (omistajan kysymys "mitä uusia musiikkeja on pelissä?").

Lähteet: proton koodi BUILD 175:ssä (86ef3b3e6) ja natiiviseppa/juna-176:ssa (AaniTaulut.Oletus, Musiikkivalitsin,
AaniOsoite.Musiikkiversio, Paljastus, SeikkailuLoppumusiikki, KaupunkiIntro, Resources/Ajattelijat/*.json), paketin
äänitaulut, Lyria v2 -manifesti (`proto-3d/_tyo/lyria-saro/MANIFEST-lyria-v2.json`) ja Matkakirjan äänet -sivu
(Musiikki-välilehti). "Tuli peliin" = ensimmäinen BUILD, jonka historiassa kytkentä on (git merge-base); varhaiset
buildit (12–21) ovat syyskuun lopun natiivin musiikkivaiheita B7 ja vaiheet 1–3.

**BUILD 175 ja juna 176 eivät tuo uutta musiikkia** (ei muutoksia musiikkikoodiin eikä äänitauluihin BUILD 174:n jälkeen).

## Viimeisen viikon uudet (3.–10.10.)

| Kappale | Tiedosto (ämpäri) | Äänet-sivulla | Missä soi | Build |
|---|---|---|---|---|
| Pariisin nopea nykyintro, nu-jazz 124 bpm | `audio/musa-kaupunki-pariisi-nopea-lyria-v2.mp3` | "Pariisi nyt 2: nopea nu-jazz (124 bpm)" (vertailuryhmä, ei merkitty pelissä olevaksi) | kaupunki: Pariisi, kaupunkijakso nopea → 3 s tauko → hidas (kartalla ja kuumailmapallon Pariisin 31 s nykyintro) | BUILD 172 (jakso), BUILD 173 (nykyintro ja ajoitus) |
| The Bard's Tale (RandomMind, CC0) | `seikkailu/olavinlinna/musiikki-v1/loppu.mp3` + `loppu-silmukka.mp3` | "Olavinlinna: lopputekstit" (51) ja "The Bard's Tale" | linssi: Olavinlinna, lopputekstit (K2-dronesta loppuun, sitten saumaton silmukka) | BUILD 172; esilattu silmukka BUILD 174 |
| Lyria v2 -versiot kaikista 50 Lyria-raidasta | `…-lyria-v2.mp3` (13 korjattu: 02, 03, 05, 10, 11, 12, 13, 20–25; muut kopioita) | samat 01–50 (sivu soittaa vanhoja nimiä) | kaikkialla, missä raidat 01–50 soivat | BUILD 172 |
| Sokrates: v14-musiikki | `ajattelijat/sokrates/v4/v14-musiikki.mp3` | ei | linssi: Ajattelijat (Sokrates, aikajana) | BUILD 133 |
| Marcus Aurelius: v14-musiikki | `ajattelijat/marcus/v4/v14-musiikki.mp3` | ei | linssi: Ajattelijat (Marcus, aikajana) | BUILD 133 |
| Sokrates: kierrokset | `ajattelijat/sokrates/v1/kierrokset-musiikki.mp3` | ei | linssi: Ajattelijat (Sokrates, kierrokset 2–3) | BUILD 132 |
| Marcus Aurelius: kierrokset | `ajattelijat/marcus/v1/kierrokset-musiikki.mp3` | ei | linssi: Ajattelijat (Marcus, kierrokset) | BUILD 132 |

Rajalla (2.10.): Sokrateen ja Marcuksen `v1/kierros1-musiikki.mp3` (linssi Ajattelijat, 1. kierros), BUILD 125.

## Kaikki musiikit pelissä

Raidat 01–50 ovat Lyria-raitoja; ämpärissä `audio/<tunnus>-lyria-v2.mp3` (BUILD 172:sta alkaen, vanhat appit `-lyria.mp3`).
Numero = Matkakirjan äänet -sivun numero ja nimi.

| Nro ja nimi äänisivulla | Tunnus | Missä soi | Build |
|---|---|---|---|
| 01 Isoisän johtoaihe | musa-johtoaihe | peli: etusivu (paikkaraita); ensisoitto mukana-tiedostosta `StreamingAssets/mukana/musa-etusivu-lyria.mp3` | BUILD 21 (mukana-tiedosto BUILD 17) |
| 02 Kaupunkilehti | musa-lehti | peli: kaupunkilehti auki (tilaraita) | BUILD 12 |
| 03 Matkalaukku | musa-matkalaukku | peli: matkalaukku auki (tilaraita) | BUILD 12 |
| 04 Kohtaaminen | musa-kohtaaminen | peli: kohtaaminen (tilaraita) | BUILD 21 |
| 05 Tietovisa | musa-visa-2 | peli: visakortti | BUILD 12 |
| 06 Aloituslento (vaskimarssi) | musa-aloituslento-marssi-a | peli: aloituslento | BUILD 35 |
| 07 Matkan loppu | musa-loppu | peli: matkan loppu | BUILD 20 |
| 08 Arvoitus ratkesi | musa-ratkaisu | peli: arvoituksen ratkaisu | BUILD 21 |
| 09 Epäonnistuminen | musa-epaonnistuminen | peli: epäonnistuminen | BUILD 21 |
| 10 Aarre | musa-aarre | peli: aarteen paljastus | BUILD 12 |
| 11 Pääaarre | musa-paaaarre | peli: pääaarteen paljastus | BUILD 12 |
| 12 Kartan pohjamusiikki | musa-pohja | kartta: kun paikalla ei ole omaa raitaa | BUILD 12 |
| 13 Ateena | musa-kaupunki-ateena | kaupunki: Ateena (kartta) | BUILD 12 |
| 14–19 Pariisi, Lontoo, Rooma, Istanbul, Kairo, Pietari | musa-kaupunki-<kaupunki> | kaupunki: kartalla kyseisessä kaupungissa; Pariisissa hidas osa kaupunkijaksoa | BUILD 21 |
| 20–25 Brittein saaret, Pohjola, Keski-Eurooppa, Välimeri, Balkan, Itä-Eurooppa | musa-kaupunki-<alue> | kartta: Euroopan alueet | BUILD 12 |
| 26–35 maanosat (10) | musa-maanosa-<maanosa> | kartta: maanosat | BUILD 21 |
| 36–45 saapuminen maanosaan (10) | musa-saapuminen-<maanosa> | peli: ensimmäinen saapuminen maanosaan | BUILD 21 |
| 46 Jalan, 47 Laiva, 48 Lento | siirtyma-<laji> | peli: matkan siirtymät (hiljaa taustalla) | BUILD 12 |
| 49 Keksinnöt | linssi-keksinnot | linssi: Keksinnöt | BUILD 12 |
| 50 Ihmisen matka | linssi-ihmisen-matka | linssi: Ihmisen matka | BUILD 12 |
| 51 Olavinlinna: lopputekstit (The Bard's Tale) | seikkailu/olavinlinna/musiikki-v1/loppu(-silmukka).mp3 | linssi: Olavinlinna, lopputekstit | BUILD 172 |
| "Pariisi nyt 2: nopea nu-jazz" (vertailuryhmä) | musa-kaupunki-pariisi-nopea | kaupunki: Pariisi, kaupunkijakson nopea osa ja pallon nykyintro | BUILD 172 / 173 |
| (ei äänisivulla) Ajattelijat, Sokrates ja Marcus: kierros1, kierrokset, v14 | ajattelijat/<tunnus>/v1/kierros1-musiikki.mp3, v1/kierrokset-musiikki.mp3, v4/v14-musiikki.mp3 | linssi: Ajattelijat | BUILD 125 / 132 / 133 |

Huomiot PT:lle:
- Äänisivun vertailuryhmissä ei ole muita pelissä soivia kappaleita: nykyajan Pariisi 1 ja 3, a–e, Peking, pallon nykyaikaiset
  taustat, Välimeren taustat, muiden maanosien kokeilut, Olavinlinnan Lyria- ja ElevenLabs-versiot sekä kartan vertailunäytteet
  eivät ole kytkettyinä peliin.
- Ajattelijoiden kuusi musiikkia puuttuvat äänisivulta.
- Lyria v2 -manifestissa korjattuja on 13; ade5ad9f3:n commit-viesti sanoo 16.
