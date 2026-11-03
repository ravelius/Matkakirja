# Valosepän luovutus 31.10.2026 klo 02.30

Syy: kontekstivahti 30 %, luonteva tauko (kaikki erät PT:llä/NS:llä). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (rivit 23.5x–02.3x). Proto-repo on vain paikallinen. Edellinen: viesti-valoseppa-luovutus-20261030-2345.md (pysyvä sääntö 2.177 ja omistajan 22.27 linjaus voimassa).

## VALMIIT (juna 216)
- **Lähikaskadi 25 → 15 m:** `linssiseppa2/valo-216` **5c4427345** (`JuoksuVarjoLahiOsuus` 0,075, QA `valo lahikaskadi <m>|auto` heti). PT kuittasi, NS:n junassa (6677eaaa6). Hahmon varjo näkyy laitteella (LT aukio03). LT:n A/B: ei kulua (sokkelopolulla, ks. avoin 3).
- **Valoatlasten pakkaus:** `linssiseppa2/valopakkaus-216` **b7b91e20c** (kuvajaon 06ef29f9b päällä; NS valitsi junaan) + **be9b9b96a** (QA `valo leivonta`/`vertailu` päivittää `_JuoksuLeivonta`-globaalin heti, `Valopohja.PaivitaLeivonta`).
  - 47 atlasta 2048²: ARGB32 → ETC2_RGBA8 = 1/4 (editorin luku 2005 → 501 Mt). PK: pakkaamattomana 1,05 Gt laitteella.
  - Pari leivottujen vieressä (esikatselu-20261031-021547 p0 / -022243 p1): sillat leivottu osuus 10 %, pakkausero 0,02 %, ei lohkoja. PT ja NS saivat tuloksen 02.29; PT:n kuittaus odottaa.
  - METAL b7b91e20c 444/0, PIPELINE 436/0. Tarkista 0, 46/46, 3/3, Linssit 2217/2217.

## OIKAISU EDELLISEEN LUOVUTUKSEEN
"Leivonnalla ei vaikutusta – atlakset puuttuvat" oli VÄÄRIN. Juuri-216:n `kielletty-rakennukset-v85`:ssä on `valo_rgbm` 46 lod0-glb:ssä (portit b/c/d, sillat e, g-zhonghedian/baohedian, l/m/n/o, p-kujaportit, t-katos-1..29, t-portit, u-jingshan) ja `avoimet-v52/juhlasali`. "Leivonta 1 = 0" johtui kahdesta asiasta: QA ei päivittänyt globaalia (korjattu be9b9b96a), eivätkä e03/e06-kamerat näe leivottuja rakennuksia (Taihedian ja Meridiaaniportti eivät ole leivottuja). Kamerat leivottujen viereen: `tyokalut/vp4-0|1.txt` (sillat `sijoita 10.87 -336 -2.03`, kujaportti `-251.3 380 -2.03`, testikamera `2.5 6.2 3 51`).

## AVOIMET
1. PT:n kuittaus valopakkaukselle (02.29 lähetetty).
2. **Valon kokonaiskulu iPadilla** (vertailu 0 vs 1) ennen kuin omistajalta kysytään valon oletusta.
   - Odottaa, että palatsi ei kaadu jetsamiin (LT palatsi31b: 3/3 kaatumista, appres 5,1 Gt). PK ja NS selvittävät muistia; pakkaus vie siitä ~0,8 Gt.
   - Mittausohje: ABAB + jäähdytys ajojen välissä (lämpöajelehtiminen A 16 ↔ 34 ms samalla asetuksella).
3. **Laiteajot sokkelopolulla:** LT:n aiemmat ajot (varjo216b, lahikaskadi, hahmovarjo) ajettiin sokkelon varapolulla, joten ruutuajat eivät edusta palatsia. Laitteella pohja latautuu oletuksella vasta, kun JU vie pk7:n mediaan. Mediassa pohja.json oli 404 klo 01.4x.
4. **Leivottu pari LAV:n uusilla paketeilla** (tausta-v82, rakennukset-v86 ~05.30), kun ne ovat juuressa. Käytä vp4-kameroita.
5. **Silta leikkautuu** 248/248/248, hajonta 0 → PK selvittää (välitetty). Ei valokorjaus.

## TYÖTAVAT
- **Valovahti tauolla:** Julkaisijan `valoseppa-vahti.zsh` kääntää jokaisen `linssiseppa2/*`-kärjen. Taukolippu `/tmp/matkakirja-valovahti-tauko` pysyy päällä, kunnes PT toisin sanoo. Poissulut: varjo-diag3, varjo-2048. Tarkista lippu ennen commitia (/tmp tyhjenee uudelleenkäynnistyksessä).
- **Unity-ajot vain PT:n luvalla.** Levyraja 82 Gi (nyt ~105 Gi).
- **Ajopuu** `wt/proto-linssiseppa2-p11` (luotu uudelleen 01.3x, irrotettu, be9b9b96a). Ajot: `zsh tyokalut/esikatselu.sh <sha> <skenaario> ipad --batch`. Ajo tapahtuu linjan 2 projektissa, joten puusta tarvitaan vain tyokalut/.
- **Työpuu** `wt/proto-linssiseppa2-leivonta`: haara `linssiseppa2/valopakkaus-216` be9b9b96a (puhdas).

## Osoitteet
PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, NS local_c7344e20-fba8-433d-ba8e-184a325037ef, PK local_601d33fc-1c61-4ccd-8389-fa425417fafb, LT local_ede7e965-02ff-40a0-a77d-44f3218ca146, LAV local_beb68834-6c4f-4839-ac75-7876b45052c3, Postivahti local_d8d003f6-1ae3-4a1b-854a-e0c018ed19f5.
