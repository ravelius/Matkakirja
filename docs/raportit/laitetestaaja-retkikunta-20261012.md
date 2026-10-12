# Laitetestaaja: retkikunta päästä päähän (moninpelin sähke, retkikunta, kaveriapu), 12.10.2026

**Tulos: TOIMII, 4 huomiota.** Kahden simulaattorin välinen retkikunta toimii alusta loppuun: perustus + koodi, liittyminen, sähkeet (kaksi liuskaa iPadille), kaveriapu (−25 £, apupyyntöliuska, veikkaus takaisin kysymyskorttiin, aika jatkuu) ja eroaminen. Esteet olivat testiasetelmassa (ehto "olet käynyt kaupungissa", kysymystila), eivät vikoja, mutta huomioita on neljä: ks. alla.

Ajo: Julkaisijan SIMU NYT, 14.30–14.48. **A = iPhone 18 Pro `0AC1815C`** (Utelias Ilves, Pariisi → Bryssel), **B = iPad Pro 13" `3622D89D`** (Salaperäinen Kurki, Tukholma). App `proto-3d/lokit/laitetestaaja-app-183` (käännös 5309d2340 = natiiviseppa/juna-183, kärki d9cbb8d38 mukana), verkko päällä, kehittäjätila, oikeat HID-napautukset. Kuvat: **täysikokoisina natiivitarkkuudella**, "MERKITTY-"-versioissa iso selite kuvan päällä: `proto-3d/lokit/laitetestaaja-retkikunta-20261012/MERKITTY-*.png` (12 kuvaa; ilman selitettä samat nimillä ilman etuliitettä). Videot 720p, 14 min/laite: `iphone-retki-720.mp4`, `ipad-retki-720.mp4`; lokit `peli-loki-P.txt` (iPhone), `peli-loki-I.txt` (iPad).

## Askeleet (OK/PUUTE + lokirivi)
| # | Askel | Tulos | Todiste |
|---|---|---|---|
| 1 | A: `uusi-peli 5 pariisi`, `sahke kaynnista` | **OK** (loki "sahke kaynnista → ok"). **PUUTE: riviä "sähkelinja auki" ei löytynyt** peli-lokista, linssi-lokista eikä konsolista (vain "→ ok"-kuittaus). | peli-loki-P 85.06 |
| 2 | A: `sahke perusta Utelias Ilves` | **OK**: "sahke perusta → ok"; koodi **MVZARB** näkyy Retkikunta-paneelissa (riviä "retkikunta ok, koodi XXXXXX" ei lokissa, koodi vain UI:ssa). | MERKITTY-1 |
| 3 | B: `uusi-peli 7 tukholma`, `sahke liity MVZARB Salaperäinen Kurki` | **OK**: "sahke liity → ok". | peli-loki-I 235.78 |
| 4 | Valikko → Retkikunta molemmissa | **OK / HUOM**: molemmissa paneeli "Olet retkikunnassa nimellä …", koodi MVZARB, sähkesirut ja "Eroa retkikunnasta". **Molempien nimimerkit EIVÄT näy**: kumpikin paneeli näyttää vain oman nimen, ei jäsenlistaa (Pelikoodarin tiedossa). Valikko avautuu pillistä (portrait), ei ☰-napista. | MERKITTY-1, 2 |
| 5 | A: sähke; B: `sahke pollaa` | **OK (kun A on käynyt kaupungissa)**. Ensin ✗: `sahke vinkki juliste-saatu pariisi` → "Et ole vielä käynyt yhdessäkään kaupungissa" (aloituskaupunkia ei kirjata käydyksi; sama UI-sirussa "Sain julisteen"; vinkkisirut: "Vinkata saa vain aarteesta, jonka on itse löytänyt"). Liikuin kartalta Brysseliin (Liiku → kohde), sitten `sahke vinkki juliste-saatu bryssel` → "Sähke lähti: JULISTE BRYSSEL STOP LISÄTTY KOKOELMAAN". **iPadin liuskat**: "SAAVUIN BRYSSEL STOP MATKA JATKUU" (automaattinen saapumissähke, Utelias Ilves 14.40) ja "JULISTE BRYSSEL STOP LISÄTTY KOKOELMAAN" (14.41; saate "Sähke retkikunnalta. En kommentoi sisältöä."). `sahke liiku bryssel` -komento ei kelvannut ("VIRHE ei siirtokohde"; kulkutapa Liiku-liuskasta). | MERKITTY-3, 4, 5, 6 |
| 6 | Kaveriapu | **OK**: `tutki` Brysselissä → aarrekysymys ("BRYSSEL · AARREKYSYMYS", 2 vaihtoehtoa A/B, 36 s) → `kaveriapu` → ok, **raha 260 → 235 (−25 £)**, kortissa "Sähke lähti retkikunnalle. Aika on pysähtynyt" (ajastin pysähtyi 27 s:ään). iPad: `sahke pollaa` → **apupyyntöliuska** ("Retkikunnalta sähke: he pyytävät apua arvoitukseen. Utelias Ilves kysyy: …", A/B + "En osaa auttaa"), **oikea napautus** "Ei enää pidä" → liuska sulkeutui. iPhone: `sahke pollaa` → kortissa **"Salaperäinen Kurki veikkaa: Ei enää pidä"** + "Selvä"; `kaveriapu-valmis` → ok, ajastin jatkuu (27 → 21 s), "Kaverilta kysytty" himmeä. **PUUTE: lokiriviä "kaveriapu <apuId>, raha …" ja "veikkaus"-riviä ei kirjattu** (vain "kaveriapu → ok"); apusaate/veikkaus todennettu UI-puusta ja kuvista. | MERKITTY-9, 10, 11, 12 |
| 7 | `sahke eroa` molemmissa | **OK**: "sahke eroa → ok" (iPhone 909.30, iPad 909.67). Eron jälkeistä paneelia ei erikseen kuvattu. | peli-loki |

## Huomiot
1. **Jäsenlista puuttuu**: Retkikunta-paneeli näyttää vain oman nimen; toisen nimi tulee esiin vasta sähkeliuskassa/veikkauksessa.
2. **Lokirivit puuttuvat**: "sähkelinja auki", "retkikunta ok, koodi …", "kaveriapu <apuId>, raha …", veikkaus. Todennus UI:sta.
3. **Kysymyskortti jää vanhan kortin alle**: kun nostokortti (Waterloon leijonakumpu) tai Livia-chat oli auki ennen `tutki`-komentoa, kysymyskortin vaihtoehdot ja veikkaus peittyivät niiden alle (kuva 9: chat päällä; apuveikkaus näkyi vasta nostokortin sulkemisen jälkeen). Pelikoodarin ohje (kartta-tila, ei kortteja) oli tarpeen.
4. **Vinkin esto "Et ole vielä käynyt…"** ja valikko pillistä portrait-näkymässä (ei ☰) · käytettävyyshuomiot.

## Rajaukset
- Ei erillistä tarkistusta, että kaveriapu veloittaa vain kerran; ei testattu "Peru 10 min" -odotusta; ei testattu `sahke eroa` -jälkeisiä tiloja (uusi liittyminen).
- iPhone-screenshotit natiivi 1206×2622, iPad 2064×2752.

Ei korjattu mitään.
