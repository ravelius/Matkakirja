# Fablen luovutus uudelle sessiolle — 16.9.2026 klo 19.15 UTC

Omistaja päätti aloittaa uuden Fable-session. Tämä on tila sillä hetkellä.
Sitovat linjaukset ovat Raamatussa (js/tyohuone-raamattu.js), tänään lisätyt:
PAATOKSET 25–31, ASTRONAUTIN KAMERA -osio LISAYKSINEEN 1–10 (kohdat 1–32),
IHMISEN MATKA JATKO 1–3 (+ tarkennukset), TOPOGRAFIALINSSI-osio, LINSSIEN KEHYS
LIUKUU, PULUN KUVAT, SAAPUMISAANET OVAT HORATION YKSIN.

## main = v1924 (b298af86). Tänään julkaistu v1917–v1924.

## Haarat origin:ssa, ei vielä julkaistu

| haara | tila | sisältö |
|---|---|---|
| claude/bold-ride-vow4ki-julkaisu-v1925 (0da79234) | WIP: merget + versionosto v1925 tehty, npm test ja savukkeet KESKEN, ei PR:ää | topo-tokkii + pariisi-lahizoom + Raamattu. HUOM: npm test haarassa antoi 3499 pass / **18 fail** (nimet eivät tallentuneet) — selvitä ennen PR:ää, liittyvätkö mergeihin (topo-tokkii vs. pariisi) vai aikarajoihin |
| claude/bold-ride-vow4ki-topo-tokkii (de06a3c9) | valmis, savukkeet 38/38 | topografialinssin odotuspeite, ImageBitmap-purku, jäänteet pois |
| claude/bold-ride-vow4ki-pariisi-lahizoom (27b97172) | valmis, 24/24 | nostojen nimiökatto 16 px, ryhmitys limityksestä, luentakuvapakka pois (kytkin) |
| claude/bold-ride-vow4ki-pallo-musta (a416ff0f) | commit + raportti docs/raportit/viesti-fable-pallo-musta-20260916.md valmiit (juurisyy: kaksi 4096x2048-kangasta iOS Safarissa → tyhjä kangas ilman virhettä); agentin loppuraportti ei ehtinyt → tarkista savuketulokset raportista ennen julkaisua | Astronautin kameran pallo musta iPhonella: ladonta Safari-kestäväksi |
| claude/bold-ride-vow4ki-ihmisen-matka-kappaleet (3b441b68) | valmis siihen asti: pulu pois esityksen ajan, simpukkavirke pois, kappaleet ≤240 merkkiä, ZOOMIN_JATKO_MS=2500 | **PUUTTUU (agentti kaatui 529):** omistajan viimeisin päätös JATKO 3 TARKENNUS 2: ZOOMIN_JATKO_MS=5000, Marokon ajo alkaa VASTA zoomin jälkeen ja kestää entisen pituutensa (saapuminen siirtyy, kertomus ennallaan), sekä v1924:n vika "avaus zoomaa Guineanlahdelle liian lähelle" |
| claude/bold-ride-vow4ki-astro-chatti (f6a01747) | toteutus VALMIS (raportti viesti-fable-astro-chatti-20260916.md): testit 627/627, savuke-astro-valokuva 43/43 × 3 näkymää; ajamatta: iPad-näkymä, savuke-astro-aani (24/24), savuke-satelliittilinssi (34/34) → aja julkaisussa | LISAYS 10 kohdat 29–32: minipulun napautus → pulun normaali chatti (2 valmista kysymystä ehdotuksina), selite avautuu pienennettynä, otsikkorivi vihreällä, vinkkiavaus 1. kerralla |
| claude/bold-ride-vow4ki-aihenostot (530827e4) | vain selvitysraportti (docs/raportit/viesti-fable-aihenostot-20260916.md: koodipolut ja suositus), toteutus tekemättä | PAATOKSET 27 TARKENNUS 2: kaupungin sisällä saman aiheen nostot aina yhdeksi aihenostoksi, nimiö "Tärkein nosto…", viuhka |

Julkaisujärjestys: v1925 (loppuun: npm test, savukkeet, build, PR, merge) → v1926 (pallo-musta ensin, sitten ihmisen-matka, astro-chatti, aihenostot kun valmiita).

## Codex (postilaatikko claude/postilaatikko)
- Ihmisen matka -kertomuksen äänite uusittava (posti/fable-codex-ihmisen-matka-aanite-uusinta-20260916.md).
- Astronautin kameran musiikki JÄI POIS omistajan päätöksellä; humina käytössä. Readback v1924:stä Codexin vuoro.
- Kysymysaineisto (PR #2539) ja minipulu (PR #2521) julkaistu v1924:ssä, PR:t suljettu.

## Tunnetut avoimet
- Turisti-info-kyltti kasvaa lähizoomissa rajatta (Pariisi-raportin osio 6).
- savuke-nimikyltti vartiot 4, 7a, 7b, 9b punaisia (vanhentunut/mainin oma).
- Poltetun musteen nimiöt eivät tunne 16 px:n kattoa (vaatii uudelleenpolton).
- Worktree wt-aaniajot vanha (haara claude/bold-ride-vow4ki-aaniajot), tarkista.
- Omistajan palaute v1924:stä puhelimella/iPadilla odottaa.
