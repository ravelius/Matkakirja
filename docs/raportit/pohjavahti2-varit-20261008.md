# Pohjavahti 2: värit (Natiivi-UI 8.10.2026, juna 169)

Päätoimittajan tehtävä: jäljellä olevat kovakoodatut värit luokitellaan; näkymättömät erot (ΔE < 2 lähimpään tokeniin) tokeneiksi,
loput listana ryhmittäin, ei muutoksia ennen päätöstä. Proto: natiivi-ui/pohjavahti2-169 f0bccb721 (b62e2569d:n päällä).

Ero = CIEDE2000, pahin tapaus alfa mukana mustan, harmaan ja valkoisen taustan päällä (näkymätön kaikilla taustoilla, jos < 2).
Ehdokastokenit: peruspaletti (--bg … --kerma, --lapinakyva, --map-ink-NN), himmennykset ja paperi-, tumma- ja lasi-teemojen vakiot.

## Tulos

| | Värit (pohjavahti) |
|---|---|
| Ennen | 1217 |
| Vaihdettu (ΔE < 2) | 145 USS-deklaraatiota |
| Jälkeen | 1072 |

Jäljelle: 810 USS-värideklaraatiota (559 eri arvoa pinnoittain), lisäksi noin 108 shorthandissa (text-shadow ym.) ja noin 154 C#:ssa (new Color(…), datavärit).

## Rajatut teemavakiot (päätettäväksi)

Tarkkoja osumia teemavakioihin, joita en käyttänyt semanttisen kytkennän takia (ulkoasu ei muuttuisi):
- Linssit.uss (ISS ja astronautti): 12 × --tk-lasi-avaruus-korostus, 10 × --tk-lasi-avaruus-reunus, 1 × -muste ja 1 × -pinta.
  Ehdotus: ISS- ja astronauttipinnoissa nämä tokeneiksi (ne ovat sama lasi-avaruus-teema).
- Valkoinen #ffffff = --tk-harmaa-korostus 6 × (Lehti, Matkakirja, Pulu): ehdotus uusi kehys-token "valkoinen" eikä harmaan teeman vakio.
- Harmaan teeman muut 3 × (Linssit.uss).

## Ryhmittäin (pinta, määrä, ΔE-luokat)

| Pinta | Määrä | ΔE 2–5 | ΔE 5–10 | ΔE ≥ 10 |
|---|---|---|---|---|
| Linssit.uss | 199 | 50 | 60 | 89 |
| Lehti.uss | 157 | 83 | 33 | 41 |
| Matkakirja.uss | 156 | 69 | 34 | 53 |
| Kartta.uss | 105 | 49 | 33 | 23 |
| Kysymys.uss | 50 | 27 | 5 | 18 |
| Pulu.uss | 44 | 10 | 21 | 13 |
| Sahketehtava.uss | 42 | 31 | 3 | 8 |
| Kohdekartta.uss | 39 | 23 | 12 | 4 |
| Sahke.uss | 18 | 13 | 5 | 0 |

ΔE 2–5 = juuri ja juuri erotettava vierekkäin (ehdotus: tokeniksi, jos omistaja hyväksyy pienen muutoksen); ΔE 5–10 = näkyvä
sävyero; ΔE ≥ 10 = eri väri (uusi token tai pinnan oma väri, esim. lehtipaperin musteet ja kartan värit).

## Yleisimmät pinnoittain (määrä · arvo · lähin token · ΔE)

### Linssit.uss
- 10 × `rgba(93,255,168,0.28)` → `--kulta-kuulto` (ΔE 23.4)
- 8 × `rgb(93,255,168)` → `--kerma` (ΔE 24.9)
- 7 × `rgba(6,13,10,0.72)` → `--tk-himmennys-tumma` (ΔE 5.8)
- 6 × `#3a2812` → `--map-ink` (ΔE 3.7)
- 4 × `rgba(233,250,240,0.92)` → `--tk-paperi-pinta` (ΔE 9.3)
- 4 × `rgb(234,255,243)` → `--tk-paperi-pinta` (ΔE 10.5)
- 4 × `#5dffa8` → `--kerma` (ΔE 24.9)
- 3 × `rgb(0,0,0)` → `--bg` (ΔE 7.0)
- 3 × `rgba(93,255,168,0.3)` → `--kulta-kuulto` (ΔE 23.4)
- 3 × `#eafff3` → `--tk-paperi-pinta` (ΔE 10.5)

### Lehti.uss
- 13 × `rgba(58,42,26,0.95)` → `--map-ink-95` (ΔE 3.4)
- 7 × `#3a2a15` → `--map-ink` (ΔE 3.5)
- 7 × `#a53a22` → `--mark` (ΔE 3.3)
- 6 × `#16130f` → `--bg` (ΔE 3.2)
- 5 × `#1d5a5e` → `--sea-ink` (ΔE 23.9)
- 4 × `#4a3c28` → `--line` (ΔE 3.5)
- 4 × `#e2efdc` → `--kerma` (ΔE 8.2)
- 4 × `#2c5e2a` → `--sea-ink` (ΔE 21.5)
- 3 × `rgba(58,42,26,0.9)` → `--map-ink-90` (ΔE 3.2)
- 3 × `rgba(60,44,26,0.72)` → `--map-ink-72` (ΔE 2.3)

### Matkakirja.uss
- 4 × `rgba(122,85,20,0.35)` → `--map-ink-35` (ΔE 8.8)
- 4 × `rgba(122,85,20,0.45)` → `--map-ink-45` (ΔE 10.3)
- 4 × `#8a6a2c` → `--accent-dark` (ΔE 4.2)
- 4 × `#6d5a3c` → `--raja-muste` (ΔE 2.4)
- 3 × `rgba(239,220,180,0.82)` → `--tk-paperi-pergamentti` (ΔE 9.4)
- 3 × `rgb(128,111,88)` → `--sea-ink` (ΔE 5.8)
- 3 × `#3a2812` → `--map-ink` (ΔE 3.7)
- 3 × `#c0392b` → `--mark` (ΔE 3.2)
- 3 × `#9a6c16` → `--accent-dark` (ΔE 4.9)
- 3 × `rgba(122,85,20,0.55)` → `--map-ink-55` (ΔE 11.4)

### Kartta.uss
- 6 × `rgba(58,40,25,0.92)` → `--map-ink-92` (ΔE 3.7)
- 3 × `rgba(122,85,20,0.28)` → `--map-ink-30` (ΔE 7.0)
- 3 × `#6d4d12` → `--tk-paperi-korostus` (ΔE 3.5)
- 3 × `rgb(58,40,25)` → `--panel-2` (ΔE 2.2)
- 2 × `rgba(74,52,33,0.88)` → `--map-ink-90` (ΔE 2.9)
- 2 × `rgba(74,52,33,0.72)` → `--map-ink-70` (ΔE 2.1)
- 2 × `rgba(74,52,33,0.75)` → `--map-ink-75` (ΔE 2.1)
- 2 × `#4b3a1c` → `--map-ink` (ΔE 4.9)
- 2 × `rgba(255,252,242,0.7)` → `--tk-tumma-muste` (ΔE 14.8)
- 2 × `rgba(18,12,4,0.3)` → `--tk-himmennys-kevyt` (ΔE 3.6)

### Kysymys.uss
- 2 × `rgba(252,241,212,0.92)` → `--tk-tumma-muste` (ΔE 3.1)
- 2 × `#6b5227` → `--raja-muste` (ΔE 4.6)
- 2 × `#6f5836` → `--raja-muste` (ΔE 2.2)
- 2 × `rgba(112,42,24,0.95)` → `--line` (ΔE 14.8)
- 2 × `#e6d8ae` → `--tk-paperi-pergamentti` (ΔE 2.3)
- 2 × `#e2664c` → `--danger` (ΔE 13.9)
- 2 × `rgba(122,85,20,0.45)` → `--map-ink-45` (ΔE 10.3)
- 1 × `#f7efdc` → `--tk-paperi-pinta` (ΔE 2.1)
- 1 × `rgba(120,90,40,0.5)` → `--map-ink-50` (ΔE 9.5)
- 1 × `rgba(240,220,170,0.35)` → `--kulta-kuulto` (ΔE 9.2)

### Pulu.uss
- 5 × `rgba(122,85,20,0.32)` → `--map-ink-35` (ΔE 8.0)
- 3 × `#eafff3` → `--tk-paperi-pinta` (ΔE 10.5)
- 3 × `rgba(122,85,20,0.45)` → `--map-ink-45` (ΔE 10.3)
- 3 × `#ffffff` → `--tk-paperi-pinta` (ΔE 7.1)
- 2 × `#f4e7ca` → `--tk-tumma-muste` (ΔE 2.3)
- 2 × `rgba(122,85,20,0.12)` → `--map-ink-12` (ΔE 3.1)
- 2 × `rgba(234,255,243,0.65)` → `--tk-tumma-muste` (ΔE 20.7)
- 2 × `rgba(33,29,24,0.6)` → `--rivi-tausta` (ΔE 7.3)
- 2 × `rgba(122,85,20,0.25)` → `--map-ink-24` (ΔE 6.0)
- 1 × `rgba(20,16,10,0.55)` → `--rivi-tausta` (ΔE 5.8)

### Sahketehtava.uss
- 3 × `rgba(72,74,116,0.62)` → `--tk-himmennys-kevyt` (ΔE 18.6)
- 2 × `#f7edcf` → `--kerma` (ΔE 2.2)
- 2 × `rgba(58,38,16,0.42)` → `--map-ink-40` (ΔE 2.7)
- 2 × `rgba(58,38,16,0.5)` → `--map-ink-50` (ΔE 2.5)
- 2 × `#3a2610` → `--map-ink` (ΔE 4.2)
- 2 × `rgba(58,38,16,0.9)` → `--map-ink-90` (ΔE 4.0)
- 2 × `rgba(58,38,16,0.55)` → `--rivi-tausta` (ΔE 2.8)
- 2 × `rgba(58,38,16,0.85)` → `--map-ink-85` (ΔE 3.9)
- 1 × `rgba(58,38,16,0.82)` → `--map-ink-85` (ΔE 3.8)
- 1 × `#fffbee` → `--tk-paperi-pinta` (ΔE 2.3)

### Kohdekartta.uss
- 3 × `#2c2318` → `--panel` (ΔE 2.4)
- 2 × `#16130f` → `--bg` (ΔE 3.2)
- 2 × `#e4dccb` → `--tk-tumma-muste` (ΔE 3.0)
- 2 × `#d9ccb0` → `--tk-paperi-pergamentti` (ΔE 5.1)
- 2 × `#fff8ec` → `--tk-paperi-pinta` (ΔE 2.3)
- 2 × `rgba(122,85,20,0.35)` → `--map-ink-35` (ΔE 8.8)
- 2 × `#efe1c2` → `--paper` (ΔE 3.0)
- 2 × `#3a2f24` → `--panel-2` (ΔE 3.1)
- 1 × `rgba(58,42,26,0.95)` → `--map-ink-95` (ΔE 3.4)
- 1 × `rgba(255,252,242,0.5)` → `--tk-tumma-muste-pehmea` (ΔE 21.7)

### Sahke.uss
- 4 × `#5b4a2c` → `--tk-paperi-muste-pehmea` (ΔE 2.5)
- 2 × `rgba(122,85,20,0.34)` → `--map-ink-35` (ΔE 8.2)
- 1 × `rgba(40,26,10,0.38)` → `--tk-himmennys-kevyt` (ΔE 3.4)
- 1 × `#7a6a4a` → `--sea-ink` (ΔE 5.4)
- 1 × `rgba(122,85,20,0.12)` → `--map-ink-12` (ΔE 3.1)
- 1 × `rgba(122,85,20,0.4)` → `--map-ink-40` (ΔE 9.6)
- 1 × `#fdfaf0` → `--tk-paperi-pinta` (ΔE 2.7)
- 1 × `#6b5c3e` → `--raja-muste` (ΔE 4.3)
- 1 × `#fffdf6` → `--tk-paperi-pinta` (ΔE 4.0)
- 1 × `#8a6a1f` → `--accent-dark` (ΔE 4.1)

Täysi lista: pohjavahti2-varit-20261008-liite.json (pinta, arvo, määrä, lähin token, ΔE).

## Päätökset ja toteutus (pohjavahti 3, proto natiivi-ui/pohjavahti3-169 c1c202a0b)

- ISS- ja astronauttipinnat: 23 tarkkaa osumaa → --tk-lasi-avaruus-* (ulkoasu ennallaan).
- #ffffff 6 × → --valkoinen (trailerin tekstit kuvan päällä ja kuvien sävytys, ei paperipintoja; web-PR #4218).
- ΔE 2–5: 359 USS-väriä → lähin token (juuri erottuva muutos). Vertailukuvat viidestä eniten muuttuvasta pinnasta (ennen | jälkeen
  paperilla ja tummalla): kaappaukset/pohjavahti3-20261008/{Lehti,Matkakirja,Kartta,Linssit,Sahketehtava}.jpg. Värinäytteitä, ei
  pelin ruutukaappauksia (ne vaatisivat käännöksen).
- Pohjavahti: värit 1072 → 684. ΔE ≥ 5 (422 USS) ja C#-/shorthand-värit ennallaan listana.
