## 2026-10-07 — SISÄLTÖKIRJURI → CODEX: Havainnekuva "kuumailmapallo taivaalla" (kuumailmapallo-linssin latauskuva)

Omistajan tilaus (Päätoimittajan välittämänä 7.10.2026 klo 12.5x): kuumailmapallo-linssin latauskuva, joka näkyy, kun kaupunki
latautuu. Yksi aihe, kolme rajausta. Kuva merkitään pelissä havainnekuvaksi (kuten muutkin generoidut havainnekuvat).

### 1. Aihe

Kuumailmapallo leijuu rauhallisesti taivaalla kaupungin yläpuolella. Pallo muistuttaa pelin 3D-palloa (Linnanrakentaja,
`proto-3d/_valmiit/ilmapallo-v1`): pisaramainen kuori, pystysuorat punaiset ja kermanvalkoiset kiilat, tumma verkko ja
vaakarengas kuoren päällä, kantorengas, pieni kulta/ruskea kori ja ohut ankkuriköysi. Muoto on Jules Vernen
*Viisi viikkoa ilmapallossa* -kirjan (1863) Victoria-pallon kuvituksen mukainen (Riou ja de Montaut, PD).

**Viitekuvat (liitteenä ja Commonsissa):**
- `posti/liitteet/latauskuva-pallo-3d-viite-20261007.jpg` — pelin oma 3D-pallo (Blender-renderöinti, keskitason malli); väritys
  ja rakenne ovat tämä: punainen kuori kerman kanssa, ohut tumma verkko, pieni kori.
- Commons, PD: `Victoria Cinq semaines en ballon.PNG` (Riou ja de Montaut; 494 × 758 px) ja `Cinq Semaines en ballon 021.png`
  (Riou/Hetzel 1863; 990 × 1488 px) — vain yleismuodon esikuvaksi, ei jäljennettäväksi.

### 2. Tyyli (pelin vanha estetiikka, kartta nykyajassa)

- **Vanha estetiikka:** hillitty akvarelli- tai kirjakuvituksen henki, hieman paperimainen pinta; ei fotorealismia, ei HDR:ää, ei
  "elokuvamaista" ylikylläistä valoa (kuten miniatyyrien ja havainnekuvien tyylisäännöt). Ei kirkkaita, räikeitä värejä.
- **Nykyaika sallittu:** taustan kaupunki on nykykaupunki hennolla siluetilla (kupoleita, kirkontorneja, muutama moderni torni).
  Ei tunnistettavia nimikohteita, ei kylttejä. Kaupunki on kaukana ja sumuinen, pallo pääosassa.
- **Paletti (pelin Tyylikirja):** kuori mark `#b03a2b` ja kerma `#faf4d6`; verkko ja muste `#46331f`; kori kulta `#d9a13b`/
  `#8a6114`; taivas ja pilvet pergamentti/hiekka (`#efdcb4`, `#dcc08f`) hennolla sinisen hallitulla sävyllä; kuvan alareuna
  sulaa pelin tummaan taustaan `#1d1610` (panel `#2a1f16`).
- **Ei tekstiä kuvaan** (ei kirjaimia, numeroita, logoja eikä kylttejä). **Ei ihmisiä** (kori näkyy tyhjänä tai ilman
  tunnistettavia hahmoja). Ei vesileimaa, ei kehystä, ei vinjettiä pyöreänä.

### 3. Rajaukset ja asettelu (UI-tarkistus tehty)

UI-ehdot tulevat Natiivi-UI:n Latauspalkista (Latauspalkki.cs: ohut palkki tekstin alla, väri ja kulmat pohjasta) ja
"UI kevyt" -säännöstä (peitto enintään 45 %, ei koristeita). Siksi kuvan alaosa jätetään rauhalliseksi ja tummaksi.

| Tiedosto | Koko | Kuvasuhde | Käyttö |
|---|---|---|---|
| `latauskuva-pallo-iphone.png` | 1290 × 2796 | pysty (9:19,5) | iPhone, täysruutu |
| `latauskuva-pallo-ipad-pysty.png` | 2048 × 2732 | pysty (3:4) | iPad pysty |
| `latauskuva-pallo-ipad-vaaka.png` | 2732 × 2048 | vaaka (4:3) | iPad vaaka |

- **Pääkohde keskellä:** pallo (kuori, verkko, kori) on kokonaan keskimmäisellä 60 %:n leveydellä ja ylemmän 15–65 %:n
  korkeusvyöhykkeellä, jotta kuva kestää rajauksen toiseen kuvasuhteeseen (rajattava keskiaihe).
- **Yläreuna** (ylimmät 8 %): rauhallista taivasta, ei pääkohdetta (kamera- ja tilapalkki).
- **Alareuna:** alimmat 25 % sulavat tasaisesti pelin tummaan `#1d1610`:een (ei yksityiskohtia; latausrivi ja palkki
  tulevat sen päälle). Kaupungin siluetti nousee vain tummenevan vyöhykkeen yläreunaan ja hälvenee.
- Ei läpinäkyvyyttä (alpha pois). PNG tai WebP; tummuus mitattuna: alimman 15 %:n keskiarvo ≤ L* 12.

### 4. Tarkistuslista (Sisältökirjuri 7.10.2026 ennen lähetystä)

- Vain pelin paletti (Tyylikirja kehys/kartta) ja tyylisäännöt (akvarelli, hillitty, ei fotorealismia) ✓
- Ei tekstiä, ei ihmisiä, ei tunnistettavia nimikohteita ✓
- Latausrivin paikka: alaosan tumma vyöhyke, joka täyttää "ei koristeita, peitto ≤ 45 %" -säännön ✓
- Kolme rajausta tiedostona; keskiaihe säilyy kaikissa ✓
- Pallo vastaa pelin 3D-palloa (viitekuva liitteenä); PD-esikuvat Commonsista, ei jäljennetty ✓

### 5. Toimitus

Kolme kuvaa PR:ään (haara `codex/latauskuva-kuumailmapallo`), avoinna; kirjoita tähän postilaatikkoon rivi "PR #n valmis".
Älä mergeä itse. Sisältökirjuri välittää tuloksen Päätoimittajalle ja Linssiseppä 1:lle (integrointi). Generointimäärä:
yksi aihe, enintään kolme rajausta; lisävariantteja ei ilman omistajan lupaa.
