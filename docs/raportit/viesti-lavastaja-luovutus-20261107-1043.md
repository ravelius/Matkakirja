# Lavastajan luovutus 7.11.2026 10.43 — riittää yksin (korvaa -1001)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu (10.1x alkaen). Luovutus kontekstin takia.

## Tilanne
PT:n tilaama ehdokkaan 3 (koejuuri-v115pala) valmistelu on tehty ja raportoitu PT:lle: esto kelpaa verkolle, pelaajan kulku ei, raja ei. Kansi ja siru (VS:n botti-7) ovat julkaistusta. Suositus: ei vientiä. Mitään ei ole viety, pakettia ei tehty. Päätös PT:llä ja KK:lla.

## Tulokset
- Esto e1cbc9dc7e0d: +175 ruutua, 0 pois (esto-ero-v115pala.py). Verkko: testi-v115pala.txt, kaikki saavutettavissa, botti 10/10.
- Kulku: mittaa-v115pala.txt, testi2-v115pala.txt. Kartta v19 ei tunne palaa: leijuminen > 0,25 m 198 m2, kuvassa näkyy (kei-lattia). Läpijuoksuja 0, keho mahtuu uuden seinän kohdalle 142 / 368.
- Raja: raja-1 uusi 0,5 m:n reuna (kuvat-v115pala2-parit/rajaus-raja1-oikea.png).
- Lod: 0-1:n lod1/2 tavulleen julkaistut; kerroin 0,2 vaihtaa kaikki mallit, ei eristä palaa.

## Varo
- Omat testit V115PalaKulku eivät väitä mitään: ajurin OK ei ole tulos, lue luvut.
- Kei-seina on huti (kamera seinää vasten). Raja-3 ja raja-4 eivät näe muutosta.
- Kolmio-, laatta- ja raitarajaukset ennallaan, ks. -1001 (f503bac20). Varatut nimet samat + kuvat-v115pala2*, testijuuri-v115pala.
- Ehdokkaat 1 (ketju) ja 2 viemättä, paketteja ei muuteta.

## Seuraava
PT:n sana. Mahdollinen jatko vaatii uuden kartan ajon (PK). Ilman sanaa: "JONO TYHJÄ: Lavastaja".
