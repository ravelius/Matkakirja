# Riemukaari 24p — maapohjan yksi koeotto, 5.11.2026

Lähde: karttaseppa-codex-alustat-24p-20261105.md, commit 41559f34dea0df8f8623db818a376fad97e9fe93, blob 2b7c103e0742e9ec5187910fffeb1e439128e2aa. TILAUS-24p-alustat.md SHA256 965bd84046e51cd11cd897958d9c9e0f5b0fd4128a3d93065664ff4910b020b4. Invalidien 24o-kuvat ja raportti toimitettiin ennen tätä koeottoa.

**Yksi ImageGen-kutsu / yksi uusi kokonainen natiivikuva.** Ei uusintaa. Kohde vain Riemukaari; muut viisi pohjaa odottavat Karttasepän kuittausta. Grand Palais ja Eiffel eivät kuulu tähän.

## Tulos

Koko sallittu ympyrä on kivetty, myös tulevan 3D-mallin alta. Ei tyhjää jalanjälkisuorakulmiota, nurmisektoreita, taloja/haamuja, pystyobjekteja, tekstiä tai ohjemerkintöjä. Keskisaareke ja sitä ympäröivä kivetty rengas näkyvät. Pohjoinen ylhäällä, RGB PNG 1536 × 1024.

## Reunan ja pikseleiden tarkistus

Generaattorin natiivikuva muutti myös ulkopuolta (1482325 pikseliä). Aiemmin annetulla omistajan häviöttömän reunakopioinnin luvalla ja lähteen koneellisen maskikoostamisen ohjeella palautin **vain maskin ulkopuolen** alkuperäisestä pyyhitty.png:stä. Valkoisen maskin sisäosa säilyy generaattorin pikseleinä; ei skaalausta, värikorjausta, sulautusta, sisäosan piirtoa tai osittaista korjausgenerointia.

- Maskin ulkopuoli: **0 muuttunutta pikseliä / 1484751** verrattuna alkuperäiseen.
- Maskin sisäosa: **0 muuttunutta pikseliä / 88113** verrattuna natiiviin.
- Natiivi SHA256: `4ff987a0fef20338e38f90e9e676e05b539c4e2e17b1eed7d39a08d6876e50f8`.
- Toimitetun koosteen SHA256: `f8f534b2012e7a7b288396fdb63cc6dc24c001a0b8387baf7581db6d593c27fc`. Toimitus ei ole sama PNG-tiedosto kuin natiivi; ero on yllä kuvattu maskikooste.

**Visuaalinen saumattomuus ei ole täysin PASS.** Tarkistin kaikki 12 pyydettyä liittymäkohtaa suurennoksena. Yhdessätoista erottuvat kadun viivat. Luoteen/pohjoisluoteen liittymä noin (681,366) on avoin kivetty kulkuväylä, mutta siitä ei voi varmentaa jatkuvaa kadun viivaparia. Joissakin itä-/kaakkoisliittymissä viiva taittuu, päättyy tai siirtyy arviolta 2–5 natiivipikseliä maskin sisäpuolella. Kiveyksen tiheä kehämäinen piirto päättyy ympyrän rajalle ja erottuu lähitarkastelussa. Ulkopuolen täsmällinen säilyminen ei yksin ole katuliittymien saumattomuustodiste.

Vertailuvalokuvat vahvistavat kivetyn aukion ja ajoradan luonteen. Niistä ei voi varmentaa tämän peliruudukon jokaisen kadun tarkkaa rajausta, nykyistä kivijakoa tai reunakivigeometriaa. Koordinaattien lähde on Karttasepän v7-kartta.

**Kokonais-QA: ei täysin läpäissyt.** Toimitan yhden sallitun oton arvioon ja ilmoitan nämä poikkeamat ennen seuraavaa ottoa. Odotan Karttasepän kuittausta sekä ennen muita viittä pohjaa että mahdollista uutta Riemukaari-ottoa. Omistajan hyväksyntää, pelissä nähtyä saumaa, runtime-kytkentää tai julkaisua ei väitetä.

Täysi kehote ja neljä viitettä: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/alustat-24p-riemukaari-2139-20261105/prompts/pohja-uusi.json`. Tekotapa: sisäänrakennettu image_gen + erillinen lossless-ulkoreunakooste `compose_mask.py`. Alkuperäinen natiivi tallessa `originals/`; pikselitarkistus ja 12 liittymän tarkistusarkki `qa/`. Vanhat pohjat säilyvät.
