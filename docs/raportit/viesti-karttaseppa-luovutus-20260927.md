# Karttasepän luovutus 27.9.2026 aamu (sessio 13 → 14)

Rooli-worktree `/Users/Shared/Claude/Matkakirja-karttaseppa`, haara `karttaseppa-tyo-20260922` (EI mergetä).
Edellinen luovutus: `viesti-karttaseppa-luovutus-20260926-b.md`. Erät tehdään `tools/uusi-worktree.sh karttaseppa <aihe>`.
Commitit: `-c user.name=ravelius -c user.email=sami@valokuvaamoklik.fi`.

## VALMIS: Z10-KETJU (26.9. 18.08 → 27.9. 04.05)

- **Laatat ämpärissä** (versio `julisteet/pyramidi/2026-09-26s-pohja/`):
  - z10: 298 335 laattaa, 13,0 Gt
  - z9: 78 211 laattaa, 3,2 Gt

  Luvut ovat täsmälleen listojen liitto `ajo-20260927m/syva-laatat-kaikki.json`. Osat jakavat 1 703 z9-vanhempaa, joten
  z9 ≠ 8 346 + 71 568.
- **Osa 1** (kaupungit ja fokusmaat): 419/419 shardia, valmis 20.00.
- **Osa 2** (maakunnat): 507/507 shardia, 20.12–04.05, eli 7,9 h 8 ytimellä ilman pysäytyksiä.
- **Luettelo** koekansiossa `julisteet/pyramidi/koe/2026-09-26s/pyramidi.json`:
  - Pohjana on tuotannon luettelo (2026-09-26-pohja), johon on lisätty tasot z9–z10 koko listasta.
  - Bittikartat täsmäävät ämpäriin: z10 298 335 ja z9 78 211.
  - Nosto-, viiva-, ranta- ja nimiötasot sekä 27 väritasoa ovat tuotannon omia.
  - Paikallinen kopio: `ajo-20260927-luettelo/pyramidi-koe.json`, NAS-siirrossa.
  - Tuotannon osoittimia EI ole vaihdettu. Vaihtoon tarvitaan Fablen lupa ja PELIN_SYVIN_TASO tuotantoon, ja sen tekee
    Julkaisija (vaihda-pyramidi-osoitin.yml, sarja `2026-09-26s-pohja`).
- **Miten luettelo koottiin:** polta-paikallisesti.sh:ssa ei ole pelkän luettelon tilaa. Tein väliaikaisen kopion, jossa
  `VAIN_KOKOA_LUETTELO=1 → kokoa_luettelo; exit` ennen LISTA-tarkistusta. Ajoin sen `ajo-20260927-luettelo/aja.sh`:lla
  samoilla lipuilla, ja `--syva-laatat` osoitti kaikki-listaan. Kopio on poistettu. Yhdistäminen tuotannon luetteloon
  tehtiin käsin: `{...tuotanto, versio, tasot z0–z8 tuotannosta + z9–z10 uudesta, korkeus yhdistetty, erat + syvä erä}`.
  Tason z0–z8 oliot olivat identtiset.

### Avoimet Z10:stä
- **Molemmat osat päättyivät koodiin 1:**
  - Osa 1: väritasovahti esti paikallisen luettelon viennin, koska siitä puuttuivat varitasot. Esto oli oikea.
  - Osa 2: `xargs` palautti nollasta poikkeavan (`VIRHE: yksi tai useampi shardi kaatui`, lista tyhjä), vaikka 507 .valmis
    ja .tila-tiedostoa ovat kaikki `yritys=1` eikä virhelokeja ole. Syy on tutkimatta. Todennäköisesti jokin lapsen
    `aja_shardi` palauttaa nollasta poikkeavan valmiin viennin jälkeen (katso `LAPSI`-haara `exit $k`).
  - Ketju ei jatka seuraavaan osaan koodilla 1, joten käynnistin osan 2 käsin.
- **PR #3325** (syvä sarja, rinnakkaisuus tiedostosta, Math.min-korjaus f3c00abaa): main on yhdistetty (e3fe97f5f),
  tila MERGEABLE, npm test 4422/4422. Pyydetty Julkaisijan junaan.

## POLTTOVAHTI v4 (omistaja hyväksyi 26.9. 18.5x)
- `pyramidi-poltto/polttovahti-v4.sh`: ytimet määrää `memory_pressure`-komennon free %. Kun free > 40 %, ytimiä on 8, ja
  kun free < 20 %, niitä on 4 (ytimet.txt, ei killiä). Pysäytys tapahtuu vain, kun free < 10 %, paine on critical tai
  levyä < 70 Gt. Warn-tason ja swapin laukaisimet on poistettu.
- Syy muutokseen: swapia oli 20–37 Gt pysyvästi, eikä se kerro paineesta. Kern-painetaso warn pysäytti turhaan
  käännösten aikana.
- **LEVY:** swap-tiedostot (`/System/Volumes/VM`) heiluvat 27–37 Gt:n välillä ja syövät vapaata levyä. Polton oma kansio
  pysyy pienenä (--siivoa). Shardien väliaikaiskansiot `$TMPDIR/pyramidi-<pid>` vievät noin 1,3 Gt per shardi ja
  poistuvat itse.
- `ketju-z10-v4.sh` on ketjun v4-versio. Osan 2 käsin käynnistetty ajo loki on `ketju-z10-v4-osa2.out`.

## MUUT 26.–27.9.
- **Merikohdat, PR #3352 (MERGED):** `tools/tee-merikohdat.mjs` → `assets/data/merikohdat.json`, paketissa
  `kartta/merikohdat.json`.
  - Kattavuus: 29 Euroopan maata, 129 kohtaa.
  - Merijako: Välimeri, Mustameri, Atlantti, Pohjanmeri, Kanaali, Itämeri, Jäämeri.
  - Säännöt: 15–45 km rannasta, ≥ 12 km 1873-laivareiteistä, ei vierasta rantaa 35 km:n säteellä.
  - Pois jätetyt: Krimin edusta ja etäsaaret.
  - Kuva: `pyramidi-poltto/kuvat/merikohdat-eurooppa-20260926.png`. Linssiseppä käyttää kohtia meren koristeisiin.
  - Seuraavaksi muut maanosat, kun Fable tilaa.
- **Nostotason uudelleenpoltto (#3342:n kuvamerkit): EI TARPEEN.** Poltossa kuvamerkki piirtyy vain tasolle 1
  `--nostotasot`-tiedoston `@kuvat`-kentällä, jota tuotanto ei käytä. Kuvamerkit piirretään elävinä
  (pallolauta/nostot.js). Koepoltossa eroa tuotantoon oli vain 9 FRA-laattaa (sisältö muuttunut), ja Fablen päätöksellä
  niitä ei viety. Ajo ja worktree on poistettu.
- **Kreikan lippuankkuri (löydös 176):** [26.0061, 41.0831] on säännön mukainen (Traakia, mantereen itäpää). Kangas
  näyttää Mustallamerellä olevalta tangon mittakaavan takia. Poikkeuksen, esim. [22.4, 39.6], teen vain Fablen
  päätöksellä.
- **Kuvaparit:** versio ja kuvakulma merkitään suoraan kuvaan (Raamattu-PR #3361). GRC-pari merkittynä:
  `pyramidi-poltto/kuvat/grc-z8-vs-z10-20260926-merkitty.png`.

## NAS
- **VALMIS 06.47:** `pyramidi-poltto/nas-ajo-20260927.sh` siirsi kaikki viisi ajokansiota kohteeseen
  `…/Matkakirja-arkisto/poltot/pyramidi/` (loki `nas-ajo-20260927.out`, kaikki ok). Levyä on vapaana 149 Gt.
