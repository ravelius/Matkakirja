# Pelikoodari: luovutus 3.11.2026 klo 03.10 – juna 218

Edellinen: -20261103-0250 (dbbf5ab3b): sen tiedot (KK:n linja, avoimet viat, valtaistuimien pisteet) ovat voimassa, ellei alla toisin.
Syy: konteksti (kontekstivahti 26 %). Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara
pelikoodari/kapea-reitti-218 (paikallinen), kärki **e198f30c6**. Esikatselu-haara pelikoodari/piirtajat-218 (worktree
wt/proto-pelikoodari-kivi-216), kärki **b51e69a8b**. Uusin runko **pelikoodari/sali-218k = 87837f3b4** (merge-tree, molemmat kärjet).
Peli-testit 799/799, unity-tarkistus 0 virhettä (Esikatselu.cs:ää tarkistus ei käännä: editorikoodi).

## Tehty tässä vuorossa
- **e782a2943** tausta-v114 + esto v37 kytketty (edellinen vuoro 02.53, JU vahvisti v114:n).
- **d1f2b4481** QA-sijoitus (`ui juoksupeli valo sijoita x z suunta lattia`, pohjan kehys) kääntää Puyin heti (ei 0,3 s:n kääntöä).
- **e198f30c6** PEITTOKARTTA (avoin vika 5, juurisyy löytyi): alle 0,1 m:n korkuinen kolmio on lattiaa, ei alaraja. Varasto (avoimet-v52):
  lattialaattojen reunat −0,01…0,04 m asettivat alarajan lattiaan joka ruudussa → katettu huone massaa maasta kattoon, kamera
  "rakennusmassassa" koko huoneen läpi (ys 025126), ylityssuoja nosti kameran 5,1–5,4 m:iin (ty 025710). Nyt alaraja = katon alapinta
  (varasto 4,75 m). Testi NakymanPeitto (avoin huone). Diagnoosi: `/opt/homebrew/bin/python3 /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/peitto-218/glbala.py <glb> x z` (mallin paikallinen
  kehys; avoimet glb:t media.matkakirja.app/juoksupeli/maailma-v4/avoimet-v52/; PeittoKohtaDiag lukee vain taustan).
  MUUTTAA KAMERAA KAIKKIALLA, missä katettu tila (avoimet huoneet, portit, salit): tarkista uusinnoista viat 1–3 ja ylityssuojan rivit.
- **b51e69a8b** Esikatselu: `kamerakierros x z y säde korkeus kaari kesto [lokiehto]` – kierros odottaa lokiehtoa ennen ensimmäistä kuvaa
  (kuvia ei tallenneta odotuksen aikana). Syy: ui-komento luetaan sekunnin välein, Puyin siirto näkyisi kierroksessa.
- VALTAISTUIN kaikkiin 8 sk3-*.txt:hen (sali-218b): ennen kierrosta `ui juoksupeli valo sijoita <x> <z−0,9> 180 <y−0,9>` ja
  kierroksen loppuun `sijoitus palatsissa`. (Kohde z = sermin etureuna − 0,9, y = lattia + 0,9 → Puyi 0,9 m kohteen etelään lattialle.)
  HUOM: päivitetyt sk3:t kaatuvat 218k:ta vanhemmilla rungoilla (8. sana ei ole luku).
- ketju-taso1b6.zsh (tallenne-218t) → runko sali-218k.

## JU:lle pyydetty (03.08 + korjaus 03.15)
1. 218h-ketju (yk cx th tj) pysäytetään (vanhentunut; jäljellä olevat kaatuvat uusiin sk3:iin, harmiton).
2. `RUNKO=pelikoodari/sali-218k zsh .../sali-218b/ketju8s.zsh yk cx th tj ty cc xf ys` (kaikki 8).
3. `zsh .../tallenne-218t/ketju-taso1b6.zsh` (linja 2; JU valitsee järjestyksen). JU ilmoittaa.

## Tarkistettava tuloksista (seuraava vuoro)
- huom-<aika>-<koodi>.txt: "kamera rakennusmassassa" pitäisi lähes kadota avoimissa huoneissa; ylityssuoja-rivit harvinaisia; PELAAJA PIILOSSA.
- unity.log: "kamerakierros: 'sijoitus palatsissa' tuli" ja "sijoitus palatsissa (…) suunta 180°". Kuvat: Puyi korokkeella valtaistuimen
  edessä kasvot kameraan koko kierroksen ja Maali-kortin ajan; ei seinän/kaapin takana; ei korokkeen sisällä (jos lattia väärin → säädä
  sk3:n neljäs luku). cx:n korkea koroke (lattia 1,20). th:ssa ei valtaistuinta (kierros salin pohjoispäässä).
- Arkki: `ffmpeg -i X -vf "fps=1,scale=320:-1,tile=8x5" -frames:v 1 a.jpg`. Viat 1 (yk 6–9 s katon tiilet), 2 (ty ~3 s portin palkki),
  3 (cc ~4–5 s Puyi seinän/kaapin takana) – peittokorjaus voi korjata osan.
- taso1b6: z −836…−846 kamera.txt + kuvat (kujaportti-3).

## Jono
1. Tulokset yllä. 2. Avoimet viat 1–3, jos jäävät. 3. Yksi koottu paketti KK:lle (viat kerrottuina, siirto tapahtuu kierroksen
leikkauksessa; ei leikkauksia, aikaleimat). 4. Arkiset hahmot (Codexin paketti). 5. VS:n sade. 6. Siivoukset.
