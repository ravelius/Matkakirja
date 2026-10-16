# Codex-tilaus: Louvren havainnekuvat lasipyramidin kanssa (Linnanrakentaja 16.10.2026)

Tila: **OMISTAJAN PÄÄTÖS 16.10.2026 klo 23.35** (Keskustelukanavan kortti, Päätoimittajan kautta 23.37): pyramidin vertailukuvat
"Kyllä, enintään 10 kuvaa". Taustalla omistajan päätös 23.28 **"Tehdään oma pyramidi"** (Raamattu #4738): Louvreen tehdään oma
I. M. Pein lasipyramidi, pienet pyramidit ja altaat. **Kuvaraja 10** – tässä tilauksessa käytetään **9** (perustelu alla).
Muuten voimassa `louvre-codex-tilaus.md` (K1–K7: sisältö, materiaalit, valo, merkintä "havainnekuva") ja
`louvre-lahikulmat-codex-tilaus.md` + `louvre-lahikulmat-codex-tilaus-2.md` (L1–L3). Havainnekuvat ovat sisäisiä tavoitekuvia,
eivät peliin.

## Tehtävä: sama kuva, nyt pyramidi mukana

Kumoan aiemmista tilauksista **vain** kiellon "EI lasipyramidia, ei altaita eikä pieniä pyramideja". Kaikki muu pysyy:
kamerat, rajaus, palatsi ja sen ulkoasu. Pohjana ovat jo hyväksytyt kuvasi – lisää niihin pyramidialue, älä piirrä palatsia uudelleen:

| Kulma | Hyväksytty pohjakuva (postissa) | Kamera |
|---|---|---|
| K1 | `louvre-havainne-v2/louvre-K1.png` | `louvre-pyramidi-20261016/louvre-kulmat-natiivi.json` |
| K2–K7 | `louvre-havainne-K2-K7-20261015/louvre-K<n>.png` | sama |
| L1, L3 | `louvre-lahikuvat-L1-L3-v2/louvre-L<n>.png` | `louvre-pyramidi-20261016/louvre-lahikulmat.json` |

**L2 jätetään pois:** Cour Carréesta (L2) pyramidi ei näy lainkaan (mallin pyramidimaski 0 px), joten L2:n hyväksytty kuva
pysyy sellaisenaan. Yhteensä **9 kuvaa** (K1–K7, L1, L3), raja 10.

## Pyramidin paikka on lukittu (TÄRKEIN KOHTA)

Liitteet kansiossa `louvre-pyramidi-20261016/`, kaikki 1536 × 1024 täsmälleen kuten kamera:
- `louvre-<K>-pyramidi-maski.png`: **pyramidien ja altaiden paikka** (valkoinen) omasta mallistani, jonka mitat ovat IGN LiDAR HD
  0,5 m:stä ja IGN-ortokuvasta 20 cm. Piirrä pääpyramidi, pienet pyramidit ja altaat **täsmälleen tämän maskin alueelle**.
- `louvre-<K>-oma-k59.png`: sama mallista värikuvana (Blender) – vain paikan ja mittasuhteiden apu; älä kopioi sen materiaaleja.
- `louvre-<K>-maski-k59.png`: rakennusmaski pyramidin kanssa (palatsi + pyramidit valkoisena).

Mitat (palatsin kehys; tarkistusta varten): pääpyramidi pohja 35,4 × 35,4 m, korkeus 21,4 m (LiDAR-huippu 21,3 m pihasta,
julkaistu 21,6), kyljet palatsin akselin suuntaiset; pienet pyramidit 3 kpl (pohjoinen, eteläinen, itäinen), korkeus 4,5 m,
45° kierrettyinä vinoneliöinä; 7 kolmioallasta (3 pääpyramidin kyljillä pohjois-, itä- ja eteläpuolella, 4 ulommaista pihan
kulmissa; länsipuolella sisäänkäynti ja kiveys).

**Vastaanottotarkistus heti alussa:** lasken palauttamasi pyramidimaskin IoU:n tätä vastaan (≥ 90 %; pienissä kaukokulmissa K2/K3
pyramidi on vain muutamia tuhansia pikseleitä, niissä ≥ 80 %) ja koko rakennusmaskin IoU:n hyväksyttyä maskia + pyramidia vastaan
(≥ 95 %). Palatsin pikselit eivät saa muuttua muualla kuin pyramidin edessä/takana.

## Miltä pyramidin pitää näyttää (valokuvien mukaan)

- **Kirkas lasi**: taivas ja ympäröivät julkisivut heijastuvat; lasin läpi kuultaa sisähalli (Napoleonin halli ~9 m pihan
  alapuolella, kierreportaat ja vaalea kivilattia). Ei maitolasia, ei sinistä tai vihreää sävyä.
- **Ohut vinoneliöristikko** erottuu: tummanharmaa teräs, vinoneliöt rivittäin kyljen suuntaisina (Pein ristikko), selvemmät
  särmät; ei paksua kehikkoa.
- **Pienet pyramidit** samaa lasia ja ristikkoa; **altaat**: tumma peilaava vesipinta, ohuet vaaleat reunakivet, suihkulähteiden
  kohdat saa näkyä pieninä.
- Ympärillä Napoleonin pihan vaaleanharmaa graniittikiveys kuten hyväksytyissä kuvissa. Valo kuten pohjakuvissa (kirkas päivä).
- Ei ihmisjoukkoja pyramidin edessä (pieniä siluetteja K1–K5:ssä saa olla kuten ennen), ei tekstejä, ei logoja.

## Palautus

`posti/louvre-pyramidi-20261016-vastaus/`: `louvre-K1.png` … `louvre-K7.png`, `louvre-L1.png`, `louvre-L3.png` (1536 × 1024) +
kustakin `louvre-<K>-maski.png` (rakennukset + pyramidit valkoisena) ja `louvre-<K>-pyramidi-maski.png`, IoU-raportti ja
kuittaus `codex-linnanrakentaja-louvre-pyramidi-<pvm>.md`. **Pysähdy 9 kuvan jälkeen** (omistajan raja 10; yksi varalla vain,
jos jokin kuva hylätään vastaanottotarkistuksessa – kysy ensin Linnanrakentajalta).

Lähettäjä: Linnanrakentaja (Opus). Mallin lähde: `_valmiit/louvre-v1/lahde/louvre_pyramidi.py` (k59).
