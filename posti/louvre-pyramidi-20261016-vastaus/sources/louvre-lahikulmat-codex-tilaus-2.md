# Codex-tilaus 2: Louvren lähikuvat L1–L3, uusi yritys (Linnanrakentaja 16.10.2026)

Tila: **OMISTAJAN PÄÄTÖS 16.10.2026 klo 13.34** (Keskustelukanavan ja Päätoimittajan kautta): lupa **tasan 3 uuteen kuvaan**,
yksi per L1–L3, ohjeena: **"kuvakulma tarkalleen pelin mukainen eikä lasipyramidia"**. Ei vaihtoehtoja, ei lisäkuvia, ei
osakorjauksia. Edellinen yritys (`louvre-lahikuvat-L1-L3/`, 40acbaf43) on hylätty eikä sitä käytetä pohjana.
Muuten voimassa `louvre-lahikulmat-codex-tilaus.md` (sisältö, materiaalit, lähteet, palautusmuoto) ja yleisohje `louvre-codex-tilaus.md`.

## Mikä meni pieleen viimeksi ja mitä nyt tehdään toisin

| Kulma | Viime kerta | Nyt |
|---|---|---|
| L1 | IoU 84,5 %: julkisivun alareuna 50–65 px liian alhaalla, kattoviiva muuttui | piirrä **pelikuvan `louvre-L1-peli-k42.jpg` päälle**: jokainen räystäs, harja, paviljonki ja maan raja samaan pikseliin |
| L2 | lasipyramidia muistuttava ruudukko keskiholvin läpi, oudot kattolohkot | holvien ja läpikulkujen takana vain **pihan kiveystä ja varjoa**; katot kuten pelikuvassa (ei lohkoja) |
| L3 | IoU 64,4 %: kamera ja rakennusten reunat eri kohdissa | kamera **täsmälleen** kuten pelikuvassa (JSON: katse 82,95°, kallistus −9,68°, vfov 46°, korkeus 9 m); pyramidin paikalla tasainen kiveys |

## Uudet liitteet (tässä postissa)

- `louvre-L<n>-peli-k42.jpg` (1536 × 1024): oma 3D-malli (k42) **pelin kamerasta**, sama kamera kuin pelissä ja `louvre-lahikulmat.json`.
  **Tämä on kuvakulman ja rakennusten paikan sitova pohja.** Mallin siluetti vastaa LiDAR-mittausta 89–93,5 % (IoU).
  Kuvaa realistisesti sama näkymä: rakennukset samoihin kohtiin ja samankokoisina, mutta julkisivujen yksityiskohdat,
  veistokset, materiaalit, valo ja kiveys valokuvien (`louvre-ref-*.jpg`) mukaan. Mallin litteät pinnat ja harmaa maa
  ovat juuri se, mitä korjataan; älä kopioi niitä.
- `louvre-L<n>-maski-k42.png`: k42-mallin rakennusmaski (sama kamera). Vastaanotto: palauttamasi maskin IoU ≥ 95 %
  joko tätä tai LiDAR-maskia `louvre-L<n>-maski.png` vastaan (kumpi tahansa riittää; L3:ssa patsas ei kuulu maskiin).

## Ehdoton sisältökielto

**EI lasipyramidia missään muodossa**: ei kolmioita, ei lasiruudukkoa, ei metallikehikkoa, ei heijastavaa kolmiopintaa
holvien läpi, taustalla eikä etualalla; **ei pieniä pyramideja eikä altaita**. Niiden paikalla jatkuu tasainen
graniittikiveys. Tarkista jokainen kuva tästä ennen palautusta (myös holvien ja läpikulkujen sisältä).

## Palautus

`posti/louvre-lahikuvat-L1-L3-v2/`: `louvre-L1.png` … `louvre-L3.png` (1536 × 1024) + `louvre-L<n>-maski.png` (tuloskuvasta johdettu),
IoU-raportti ja kuittaus `codex-linnanrakentaja-louvre-L1-L3-v2-<pvm>.md`. Pysähdy kolmen kuvan jälkeen.
