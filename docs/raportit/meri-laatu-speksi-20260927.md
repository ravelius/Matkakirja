# Meren koristeet: uusi laatutaso (speksi, Linssiseppä 27.9.2026)

*Omistaja 27.9. klo 13.0x meren 10 lajin laitekuvasta (1.0.29-juna c567fa57): "Nuo voisi tehdä korkeammalla laadulla."
Fablen tilaus: sama kaava kuin erikoismalleissa (Opus max), ensin kolme lajia (merilaiva, purjelaiva, valas)
ennen/jälkeen-kuvaparina, sitten loput seitsemän. Maaspeksit (Krumlov, Malbork, Pannonhalma) odottavat tämän takana.*

## 0. Mikä nykyisissä on vialla

Nykyiset lajit ovat karkeaa low-polyä (merilaiva 60 kolmiota, valaan selkä 110), harmaita ja litteän värisiä
(Malli-varjostin: kiedottu valo, harmaat kärkivärit, haalistus 0,25). Niissä ei ole ääriviivaa eikä kaiverrusilmettä,
joten ne eivät kestä vertailua erikoismalleihin eivätkä 14 kategoriasymboliin.

## 1. Vaatimukset (Fable 13.0x) ja toteutus

| # | Vaatimus | Toteutus |
|---|---|---|
| 1 | Tunnistettava siluetti pelikoossa 35°:ssa ja ylhäältä | laivoihin mastot, köysistö ja purjeet, joissa on kaarevuutta; valaalle suihku ja pyrstö; delfiineille kaari; lokeille siiven lyönti |
| 2 | B-seepiaramppi kuten symboleissa, kaiverrusilme varjostimesta, ei harmaata | uusi varjostin `Linssit/MeriMalli` = Symbolimallin ramppi (kohta 8), korostus, kaiverrusreuna ja ääriviivapiirto sekä vesikerros ja näytöksen häivytys |
| 3 | Kontakti veteen | vanavesi (Kelvinin kiila 19,5°), keulakuohu, pehmeä varjo kaakkoon (valo luoteesta), valaalle vaahtorengas ja sukelluksen jälkeen sileä "jalanjälki" |
| 4 | Elävyys EI MONOTONIAA -kaavalla | keinunta siemenestä ja puuskista, savu (tahti ja tummuus vaihtelevat), purjeen lepatus, harvinainen tapahtuma |
| 5 | LOD0 ≤ 3 000 kolmiota, lähitaso ja kaukotaso, ≤ 0,3 ms/malli | LOD0 ≤ 3 000 (kaikki lapset mukaan lukien), kaukotaso ≤ 800 (roottori), lähitaso = LOD0 (koko on ruudulla vakio 40–50 pt); Animoi ilman allokaatioita |

## 2. Visuaalinen kieli

- **Ramppi (kärjen alfa 0):** väri kertoo rampin kohdan: `MeriRakentaja.Rampi(s)`, jossa 0 = muste #3b2f22, 1 = seepia
  #8a6a44 ja 2 = paperi #efe4cc. Valo luoteesta ylhäältä siirtää kohtaa alaspäin (varjopuoli 1,0 kohtaa tummempi), ja
  ylöspäin olevat tahkot nousevat kohti paperia. Suuntaa-antavat kohdat: rungon kylki 0,4–0,7, kansi ja puu 1,2–1,6,
  purjeet ja kansirakennus 1,8–2,0, valaan selkä 0,35–0,6, valaan vatsa ja rintaevät 1,7–1,9.
- **Korostus (kärjen alfa 1):** vain pelin punainen #9a3b2c (`MeriRakentaja.Punainen`), enintään noin 10 % näkyvästä
  alasta: merilaivan piipun raita ja lippu, purjelaivan viiri. Valaassa ei korostusta.
- **Ääriviiva:** 1,2 pt musteena osittain (AloitaOsa/LopetaOsa), kuten erikoismalleissa. Köydet ja pienet varusteet jäävät
  ilman ääriviivaa (osa alle 0,006 yksikköä).
- **Vesikerros** (`MeriRakentaja.Vesi = true`, verkon alkuun): vaahto #faf4e4 ja varjo musteena alfalla 0,10–0,20, ilman
  valoa. Vanavesi häipyy perästä taaksepäin, keulakuohu on vaalea sirppi, ja varjo on pehmeä soikio kaakkoon.
- **Mittakaava:** 1 mallin yksikkö = KokoPt pistettä ruudulla (merilaiva ja purjelaiva 280, valas 250), eli laiva noin
  0,14–0,16 yksikköä ≈ 40–45 pt ≈ 120–135 px iPhonella. Laitteella MSAA on pois, joten köyden on oltava vähintään
  0,0016 yksikköä leveä (noin 0,45 pt), ettei viiva katkeile.

## 3. Lajit, erä 1

| Laji | Siluetti ja rakenne | Elävyys | Harvinainen (noin 1/10) |
|---|---|---|---|
| **Merilaiva** (siipiratashöyry, 1870-luvun rannikkoalus) | pitkä runko kansilinjan kaarella ja klipperikeula, puoliympyrän muotoiset ratakotelot, korkea piippu punaisella raidalla, kaksi mastoa kahvelipurjeineen (osin reivattuina), vantit ja haruksen köydet, kansirakennus, pelastusveneet | rattaat pyörivät kuljetun matkan mukaan, savua tahdikkaasti (tiheys ja tummuus vaihtelevat), keinunta | vihellys: iso höyrypilvi ja savun tauko |
| **Purjelaiva** (parkki) | kolme mastoa: keula- ja isomastossa neljä raakapurjetta päällekkäin kaarevina (vatsa tuulen alle), mesaanissa kahvelipurje, keulapuomilla 2–3 halkaisijaa; vantit ja haruksen köydet, kaareva kansilinja, tykkiporttiraita paperina | kallistus sivutuulessa, purjeiden lepatus (pieni jaksollinen muoto), puuskat siemenestä | kova puuska: kallistus 11°, purjeet täysin pullistuneina, keulakuohu ja roiskeet |
| **Valas** (ryhävalas) | kaareva selkä ja kyttyrä, pieni selkäevä, pitkät vaaleat rintaevät, pyrstö sahalaitaisella takareunalla ja vaalealla alapinnalla | nousu, kaksi puhallusta (tuuhea suihku), sukellus kaarena ja pyrstö pystyyn | pyrstön läiskäytys kahdesti roiskeineen |

Loput seitsemän (kalastusvene, lautta, majakkalaiva, merihirviö, delfiinit, lokit ja jäävuori) samalla kaavalla erän 1
hyväksynnän jälkeen.

## 4. Toteutus

- `Linssit/Unity/MeriLajit/MeriRakentaja.cs` (uusi): verkko MeriMalli-varjostimelle (tila kärjen alfassa, ääriviivan
  suunta UV1:ssä, vesikerros UV1-merkillä).
- `Linssit/Resources/Varjostimet/MeriMalli.shader` (uusi): ramppi, korostus, kaiverrusreuna, ääriviivapiirto (_Reuna),
  vesi, _Peitto ja horisonttiusva. Valo on kartan luoteesta (kuten symboleissa) eikä pelin kellonajasta.
- `ElavatElementit`: lajille, jolla on uusi rakentaja, MeriMalli-materiaalit (malli + ääriviiva). Kaukotaso vaihtuu, kun
  peitto on alle 0,5.
- Uudet lajiluokat `MeriLaiva`, `MeriPurjelaiva` (korvaa) ja `MeriValas`. Aikataulut ja siemenet pysyvät (907, 913, 911),
  joten näytösten kesto ja tauot ovat ennallaan.

## 5. Hyväksyntä (erä 1)

1. Ennen/jälkeen-kuvapari laitteelta kullekin kolmelle lajille: pelikoko ja lähikuva (koko 3), 35° ja ylhäältä; versio ja
   kulma kuvassa, rajaus alkuperäisestä kuvasta.
2. Kolmiot: LOD0 ≤ 3 000 ja kaukotaso ≤ 800 (tila-rivi).
3. Elävä kerros: laji lisää kehysaikaa ≤ 0,3 ms (tila-rivin mittaus), 0 poikkeusta.
4. Harmaata ei ole: jokainen kiinteä kärki on rampissa tai korostusvärissä.

## 6. Tila 27.9. klo 14.4x: erä 1 laitteella

- **Proto** `linssiseppa/meri-laatu` 148b2b82 (junan ad444b9d päällä), käännös 9a2a60c1: MeriMalli-varjostin, MeriRakentaja
  (vesikolmiot aina ylös), ElavatElementit (Seepia-lippu, ääriviivamateriaali, kaukotaso, roottori ennen lapsia, ms-mittaus
  tila-rivillä) sekä lajit MeriLaiva v12, MeriPurjelaiva v10 ja MeriValas v8 (Opus-agentit, harness
  proto-3d/tyokalut/meri-laatu/).
- **Laitteella (iPhone-simulaattori):** merilaiva 2 911 kolmiota (kaukotaso 1 861), purjelaiva 2 520 (1 654), valas 2 655
  (2 499). CPU 0,005–0,03 ms lajia kohden, 0 poikkeusta.
- **Kuvaparit:** proto-3d/lokit/mallinseppa-toimitus-20260927/meri-laatu-{merilaiva,purjelaiva,valas}-ennen-jalkeen.png
  (ennen 1.0.29 c567fa57 | jälkeen 9a2a60c1). Kuvaus 1,8°:n kaarella, koska elävät elementit haalistuvat 450–600 km:n
  korkeudella (peitto 0,59, kun kaari on 2,4° eli noin 510 km).
- **Avoin omistajalle:** purjeet rampissa (seepia ja kaiverrus; kameran puoli on varjossa, koska valo tulee luoteesta) vai
  vaaleampi kangas korostuspolulla (harmaantuu varjossa). Suositus ramppi.
- **Jatko:** merge-pyyntö Natiivisepälle Fablen OK:lla, sitten loput 7 lajia samalla kaavalla.
