# Linnanrakentajan luovutus 17.10.2026 klo 14.55 (Opus) – Postivahdin kova raja 35 %

Edellinen luovutus: `viesti-linnanrakentaja-luovutus-20261017-paiva.md` (8003320ee). Viestit lähetetään AINA session id:llä
(`/Users/Shared/Claude/osoitekirja.md`). PT:lle enintään 3 riviä, ja polut ovat absoluuttisia.

## 1. SEURAAVAKSI (Tivoli, LR vetäjänä)

Omistajan päätökset tänään:
- **12.13:** omia 3D-malleja ei tehdä. GLB-mallit ja erä B on PERUTTU, ja luonnokset `_valmiit/tivoli-v1/tilaukset/LUONNOS-*` on merkitty PYSÄYTETYIKSI.
- **12.20:** Google-lento raukeaa. Pysäkille 8 tulevat vain kuvat. PK:n lentohaara `pelikoodari/tivoli-vapaa-lento-200` on pysäytetty.
- **14.16:** "Kyllä, 6 kuvaa (Suositus)", eli 6 havainnekuvaa CC-pohjista erän A kahden kuvan lisäksi. Kuvia on yhteensä tasan 8.

1. **Pyyhkäisyajo, PK noin klo 15.15 (JU:n simuvuoro).** Kuvakortin kuvat 2–5 ajetaan pallokierros-v12:lla. Kun PK lähettää
   arkin, tarkista se ja lähetä PT:lle polku sekä arkki `/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/tivoli-kuvat-20261017/arkki-cc-v4.jpg`.
   - Arkissa v4 on jo kaksi PT:n pyytämää korjausta, jotka ovat paketeissa f ja g. **Fatamorgana:** Glyptotek-kuvan laite on nimetty
     Fatamorganaksi. **Litografian ankkuri:** "että huvitteleva kansa", jolloin litografia osuu vain esittelyyn.
   - PT vie arkin ja pelikuvan KK:lle.
2. **Kun KK on kuitannut (PT ilmoittaa):**
   - **Merge:** PR #4808 (`linnanrakentaja-tivoli-kuvat`, kuvanosto → `esittely/koopenhamina-v10`) mergetään vihreänä.
   - **Natiivi:** PK vie `pelikoodari/koopenhamina-v12` (a59b0f916: Pallokierros.cs koopenhamina → pallokierros-v12 ja testi
     TivolinLauseessa2EiLitografiaa) NS:lle junaan. **v8–v11-haarat EIVÄT mene junaan.**
3. **Codex, erät A ja C (8 kuvaa):**
   - **Tilaukset postilaatikossa:** erä A 58b6551df, muistutus d77eb4d11 ja erä C 42e58111f, jonka C6-korjaus on 7f5456025.
   - **Tila 14.55:** Codex EI ole kuitannut kumpaakaan.
   - **Palautus:** `posti/tivoli-era-a-20261017-vastaus/`, ja kuittaus tiedostoon `codex-linnanrakentaja-tivoli-era-a-kuittaus-20261017.md`.
   - **Kun kuvat tulevat:** tarkista ne. Niissä ei saa olla ihmisiä, tekstiä, logoja, verhoa eikä teemakoristeita, ja kuvatekstin pitää olla muotoa "Havainnekuva, pohjana …, lisenssi".
   - **Jakelu:** vie havainnekuvat rakentimeen kahteen paikkaan, kuvanostoon ja kuvakorttiin. Seuraava versiopari on **esittely/koopenhamina-v11 + pallokierros-v13**,
     koska ämpäriä ei ylikirjoiteta. Sitten PT → KK → omistaja ennen junaa.
   - **Rakennin:** `_valmiit/tivoli-v1/lahde/tee_kuvapaketti.py <ulos> <yk-vN> <pk-vN> [a1.png a2.png]`. Siinä on tällä hetkellä vain erän A kaksi
     havainnekuvaa (HK). Lisää C1–C6 korvaamaan CC-kuvat kortissa, jos omistaja niin linjaa (PT ratkaisee).
   - **Vienti:** JU ajaa `vie-paketti.sh`. Aja ensin itse `--kuiva`, ja anna paketin kansiolle uusi kirjain (seuraava on h).

## 2. TEHTY 11.00–14.55

- **Ämpärissä olevat Tivolin kuvapaketit (kaikki JU:n viemiä):**
  | Paketti | Versiot | Tila |
  |---|---|---|
  | 20261017 | v6/v8 | vietiin ennen PT:n korjausta, EI käytössä |
  | d | v7/v9 | ei käytössä |
  | e | v8/v10 | ei käytössä |
  | f | v9/v11 | ei käytössä |
  | **g** | **v10/v12** | **voimassa** |

  b:tä ja c:tä ei viety.
- **Kuvanosto v10:** puiston järvi = kallerna 2026 (CC BY-SA), Georg Carstensen = Marstrand 1844 (PD; patsaskuvaa ei käytetä,
  koska kuvanveistäjä on tuntematon) ja sanaakaan lausuttu = Pierrot (v1). PK:n kertatesti: 0,00 / 12,40 / 31,04 s.
- **Kuvakortti v12 (5 kuvaa):**
  - pääportin kaari, rajattu (Derek Williams, BY-SA)
  - Nimbin rakennus (Alberto-g-rovi, BY)
  - lyhtykäytävä (Derek Williams, BY-SA)
  - Rutschebanen lumessa, rajattu (Leif Jørgensen, BY-SA)
  - Fatamorgana ja raatihuone Glyptotekilta, rajattu (Francesco Bini, BY-SA)

  Suihkulähde on poistettu (24 §).
- **Muu:**
  - Tuotantopohjan vapaa-lento-osio on täydennetty (haara `linnanrakentaja-vapaa-lento-osio` 91ba4c754, PK tuo omaansa). Se odottaa nyt lennon mukana.
  - PK:n solmusäännöt ovat GLB-luonnoksessa (pysäytetty).

## Opit

- **Pidätys ennen vientiä:** pidätä vienti JU:lta ENNEN kuin lähetät paketin muille. JU vei vanhan paketin klo 12.59 ja PK kytki v8:n junaan 200
  ennen pidätystä. NS sai pysäytettyä sen, ja runko b7a916224 on vihreä.
- **Rajaus:** sips `-c` rajaa keskeltä (`--cropOffset` ei toimi `--out`-kohteeseen). Rakennin käyttää PIL-rajausta `(x0, y0, x1, y1)`.
- **Kuvanosto ja simu:** kuvanoston polkua ei voi ohittaa simussa (worker `/opas/aineistot`). Todista se Linssit-testeillä, älä mergellä.
- **Pyyhkäisy:** kokoruutukortissa ei ole ‹ ›-nappeja (PK:n löydös 34), vain pyyhkäisy.
- **Wikimedian UA:** vain `MatkakirjaBot/1.0 (https://github.com/ravelius/Matkakirja)`, ei sähköpostia (OHJE-kaupunki.md).
- **Taustavahti:** taustavahti `vahdi-era-a.sh` (scratchpad) sammuu nollauksessa. Tarkista posti käsin: `git ls-tree -r --name-only
  origin/claude/postilaatikko | grep tivoli-era-a-20261017-vastaus`.
