# Natiivin sisältö ja asetukset dataksi: ehdotus (Natiiviseppä 5.10.2026, BUILD 143 jälkeen)

Päätoimittajan tilaus 5.10. ~12.30 (omistajan linja): tekstit, Tavlin laudat, kortit, äänitasot ja linssiasetukset
osoitinvaihdolla ilman käännöstä, kuten linna. Kartoitus proto master cc57dde7:sta (BUILD 143). Polut Assets/Matkakirja/-alla.

## Nykytila lyhyesti

- **Datakanava on jo olemassa**: sisältöpaketti `sisalto/1/uusin.json` → `v550/` (Kartta/Sisalto.cs, PakettiPaivitys.cs,
  PakettiPaatokset.cs, Esilataaja). Siinä: sha256-hakemisto, varareitti vanhaan versioon, `skeemaversio`/`minIos`,
  `SisaltoVaihtui`-tapahtuma. Kaupungit, maat, maakuntatekstit, nähtävyydet, nostot, radio, keksinnöt ja äänitaulut
  (raidat, maisemakorit) tulevat jo sieltä.
- **Linna** käyttää omaa osoitintaan (`dioraama/olavinlinna/uusin.json` + manifest, Brotli). Se pysyy erillään.
- **Ei yleistä asetuskanavaa.** Seuraavat ovat vain C#-vakioita:
  - Peliluettelo: 6 lautaa (nimet, historia ja alkuperä ~6 kt, palkkiot, botti, avautuminen). Peli/Pelit/Peliluettelo.cs
  - pelaajan UI-tekstit: ~350 literaalia ~65 tiedostossa (Tavli ~48, Mylly ~28, valikot, Pulu, kortit)
  - äänitasot: AaniVakiot ~35 (Peli/Aani/AaniTaulut.cs), pulun tehosteet 16 (UI/Aanet.cs), linna, Cupola, Tavli ja Mylly
  - linssien metatiedot: nimi, lyhyt kuvaus, esittely, järjestys, avauskynnykset (LinssiOhjain, Linssirekisteri, LinssiEsittelyt)
  - kamera- ja kiiltoparametrit: Yokuori, Avaruus, Kyytipino, AstronauttiKerros
  - versioidut mediajuuret (IssKyytiNakyma.cs:50 `karttanostot/20260928`, CupolaKerros.cs:25, Yokuori)
- Äänimikserin palautekanava (Linssit/Unity/AaniMikseri.cs) lupaa "aanimiksaus.json"-tiedoston, mutta lukijaa ei ole.

## Ehdotus: YKSI erä, yksi mekanismi

**Infra (pohja kaikelle):** `kokoelmat/asetukset.json` sisältöpakettiin + staattinen `Asetus.Hae(avain, oletus)` /
`Teksti.T(avain, oletus)` (MiniJson). Kaikki nykyiset arvot jäävät koodiin oletuksiksi: puuttuva avain, rikkinäinen JSON
tai verkkokatko = nykyinen käytös. Tiedosto käynnistysryhmään (`Sisalto.KaynnistyksenKokoelmat`, osuus 11), jolloin
sha256-tarkistus ja varareitti tulevat valmiina. Arvot luetaan näkymän avautuessa, ei kesken pelin. Skeeman muutos
`skeemaversio`lla, jotta vanha build ei lue uutta muotoa. Kehittäjälle testiosoitin, kuten linnan `poikki osoitin`.
Vientiin JSON-skeemavalidointi ennen osoittimen vaihtoa.

Siirrot hyöty/työ-järjestyksessä, kaikki saman tiedoston alle (avainryhmät):

| # | Ryhmä (avain) | Mitä | Työ |
|---|---|---|---|
| 1 | `pelit` | Peliluettelo: lautojen nimet, historia, alkuperä, palkkiot 40/60/80, botin taso, avautumisehdot | pieni |
| 2 | `aanet` | AaniVakiot, pulun tehosteet, LinssiTaustat, Tavli/Mylly-vahvistus, linna (PuheTaso, väistö), Cupola. Mikserin "aanimiksaus" kirjoittaa samaan muotoon | keski |
| 3 | `linssit` | linssien nimi, lyhyt kuvaus, esittely, järjestys, avauskynnykset, näkyvyys (rekisterin koodi pysyy) | keski |
| 4 | `kamera` | Yokuori (kiilto, aallokko, varjot, kuunvalo), Avaruus, Kyytipino, pilvet + kytkimet | pieni |
| 5 | `osoitteet` | versioidut mediajuuret alias → polku (karttanostot, Cupola, yövalot, vesi) | pieni |
| 6 | `tekstit` | UI-tekstit avaimella; ensin Tavli, Mylly, Peliluettelo-napit, valikot, Pulu, kortit (~150), loput vähitellen | keski–iso |
| 7 | (myöhemmin) | lautojen kuvat ja mitat pakettiin (nyt Resources/ASTC): vasta kun tulee uusia lautoja | iso |

Kortit (maakunta, nähtävyys, nosto, apuraha) ovat jo datana. Koodissa on vain ~40 kehystekstiä, ja ne menevät kohtaan 6.

## Työnjako ja aikataulu (ehdotus)

- Natiiviseppä: infra (`Asetus`/`Teksti`, latauskytkentä, oletukset, testiosoitin) + ryhmät 1, 2, 4, 5 = yksi erä, juna 144 (klo 20).
- Natiivi-UI: ryhmä 6 (tekstit) samalla mekanismilla, alkaen Tavli/Mylly. Linssiseppä/LS2: ryhmän 3–4 arvot ja kytkimet.
- Sisältökirjuri/Julkaisija: `asetukset.json`-vienti sisältöpakettiin + skeemavalidointi (tools/vienti/julkaise-sisalto.mjs).
- Ensimmäinen osoitinvaihto todennetaan: vaihdetaan yksi teksti ja yksi äänitaso paketissa → näkyy/kuuluu simulla
  ilman käännöstä; vanha paketti → oletukset.

## Rajaukset

- Pelilogiikka, shaderit, GLB/ASTC-kuvat ja USS-tyylit jäävät buildiin (Resources). Tyylit ovat jo erillään.
- Kehittäjän testikomentojen tulosteet eivät ole sisältöä, eikä niitä siirretä.
- Asetuksilla ei voi lisätä uutta toiminnallisuutta, vain muuttaa olemassa olevan arvoja ja tekstejä.
