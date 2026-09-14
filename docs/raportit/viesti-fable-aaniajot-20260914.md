# Viesti Fablelle: Horatio- ja Livia-äänituotannon ajot 14.9.2026

Opus-työagentti, ajot 15:39–16:17 UTC 14.9.2026. Ajopaketti:
`posti/horatio-livia-aanet-valmis-ajopaketti-fablelle-20260914-r2.md`
(haara `claude/postilaatikko`). Lähdehaara `codex/europe-audio-20260914-r2`.

## Tilanne yhdellä rivillä

**80 luentaa 90:stä generoitu ja viety** versionoituihin avaimiin (Horatio 40,
Livia 40). **Erä 5 pysähtyi ElevenLabsin kiintiön loppumiseen** (10 luentaa
puuttuu), eikä yhtään kohdistusajoa ole vielä ajettu. Omistajan päätöstä
lisäkrediiteistä odotetaan; krediittejä ei ostettu eikä tilausta muutettu.

## Lähteen muutos kesken ajon

Erän 1 Livia-ajo hylkäsi kolme jo veloitettua luentaa validoinnissa
`kesto X s ei ole välillä 0.3–20 s`. Kuiva-ajon arviokestot ovat 10–25 %
todellisia lyhyempiä (rooma-3 arvio 15,1 s → 17,66 s; bukarest-3 19,5 s →
24,27 s), joten 20 s katto olisi kaatanut myös tukholma-3:n ja dubrovnik-3:n.

Omistajan päätös kysymyskortilla n. klo 16.00 UTC: *"Nosta katto 30 s:iin ja
jatka."* Tehtiin haaraan tasan yksi muutos:
`tools/generoi-pulu.mjs` `KESTO_MAX_S` 20.0 → 30.0 perustelukommentteineen.
Tekstit, TTS-tagit, manifesti, hyväksytty lukuteksti, ffmpeg-viimeistely
(leikkaus, häivytys, −17 LUFS, ei nopeutusta) ja koko Horatio-puoli
ennallaan. Vastakoe: ilmainen kuiva-ajo sekä `tests/pulun-aanen-nopeus.test.mjs`
ja `tests/pulu-tehosteet.test.mjs` (14 pass / 0 fail).

- Vanha lukittu lähde: `6e3a07e879bba4dd59d60bbedfcf4fa28bfe0f57` (erä 1)
- **Uusi lukittu lähde: `439bf050af65b310f5cd85334a10fdf822197e3c`** (uusinta ja erät 2–5)

**Erätunnukset muuttuivat.** Tunnus on sha256 mm. `sourceCommit`ista, joten
ajopaketin ennakoidut tunnukset pätevät vain erään 1. Versionoitu avainprefiksi
on `6e3a07e879bb` erässä 1 ja `439bf050af65` kaikessa muussa.

## Erätaulukko

| Erä | Rooli | Run | Concl. | Erätunnus (completed-kuitti) | MP3 | Kesto yht. |
|---|---|---|---|---|---|---|
| 1 | Horatio | [34863559099](https://github.com/ravelius/Matkakirja/actions/runs/34863559099) | success | `horatio-9c5b6e4dd75608cdbe8e` | 10/10 | 235,0 s |
| 1 | Livia | [34863565984](https://github.com/ravelius/Matkakirja/actions/runs/34863565984) | **failure** | `pulu-b3a8d61baa0c4dd24123` (completed-with-errors) | 7/10 | 108,3 s |
| 1 | Livia, uusinta | [34865329896](https://github.com/ravelius/Matkakirja/actions/runs/34865329896) | success | `pulu-3388cdde59d36a971f1a` | 3/3 | 70,7 s |
| 2 | Horatio | [34865721673](https://github.com/ravelius/Matkakirja/actions/runs/34865721673) | success | `horatio-91c7e2c997078439dee1` | 10/10 | 238,9 s |
| 2 | Livia | [34865732749](https://github.com/ravelius/Matkakirja/actions/runs/34865732749) | success | `pulu-415d0075be837be8c5bd` | 10/10 | 184,8 s |
| 3 | Horatio | [34866456394](https://github.com/ravelius/Matkakirja/actions/runs/34866456394) | success | `horatio-623e51c1cd57ec159a43` | 10/10 | 226,2 s |
| 3 | Livia | [34866467728](https://github.com/ravelius/Matkakirja/actions/runs/34866467728) | success | `pulu-85a34cad2355457c7e9b` | 10/10 | 169,1 s |
| 4 | Horatio | [34867000522](https://github.com/ravelius/Matkakirja/actions/runs/34867000522) | success | `horatio-1c804d7ab293dc259dae` | 10/10 | 220,1 s |
| 4 | Livia | [34867012036](https://github.com/ravelius/Matkakirja/actions/runs/34867012036) | success | `pulu-0090303ae274b1313286` | 10/10 | 160,3 s |
| 5 | Horatio | [34867464698](https://github.com/ravelius/Matkakirja/actions/runs/34867464698) | **failure** | vain `horatio-9ac94d7e1f8142beb972.planned.json` | 0/5 viety | — |
| 5 | Livia | [34867475717](https://github.com/ravelius/Matkakirja/actions/runs/34867475717) | **failure** | vain `pulu-8f90c2455f063569f989.planned.json` | 0/5 viety | — |

Kuitti-URLit:
`https://media.matkakirja.app/audio/receipts/horatio/<erätunnus>.completed.json` ja
`https://media.matkakirja.app/aanet/pulu/kuitit/<erätunnus>.completed.json`.

Viety yhteensä: **Horatio 40 kpl / 15,3 min, Livia 40 kpl / 11,5 min = 80 MP3, 26,9 min.**

Jokaisesta valmiista erästä tarkistettu: conclusion, lokin lähde-SHA, kuitin
`batch.id` / `batchId`, `sourceCommit`, 10/10 onnistunutta, näkyvän tekstin ja
TTS-tekstin SHA-256:t, `finalAudio`/`finalArtifact`-tarkistussummat ja kestot,
final-avaimet sekä **HEAD 200 jokaiselle 80 MP3:lle**.

## Poikkeamat

1. **Erän 1 Livia, 3 hylkäystä (korjattu).** bukarest-3 (24,29 s), pariisi-3 ja
   berliini-3 hylättiin 20 s katossa; veloitettu, ei viety. Uusinta katon noston
   jälkeen tuotti 24,50 / 25,73 / 20,43 s. Erän 1 Livia-osuus on siksi kahdessa
   kuitissa — integraation on luettava molemmat.
2. **Erätunnukset eivät vastaa ajopakettia** eristä 2 eteenpäin (lähde-SHA vaihtui).
3. **Erä 5 keskeytyi kiintiöön (auki).** Horatio: sisilia, islanti ja alpit
   generoitiin, lappi ja tromssa saivat `HTTP 401 quota_exceeded`
   ("34 credits remaining, while 146 credits are required"); ajo kaatui ennen
   vientivaihetta, joten kolmea valmistakaan ei viety — ne ovat vain ajon
   artefaktissa `luennat-38-1`. Livia: sisilia-3 ja islanti-3 valmistuivat,
   alpit-3 kaatui kiintiöön; ei vientiä. **Veloitettu ilman käyttökelpoista
   tulosta: 3 Horatio- ja 2 Livia-luentaa.** Completed-kuitteja ei ole (404),
   suunnitelmakuitit ovat (200).
4. **Kohdistusajoja ei ole ajettu.** `toiminto: kohdista` kutsuu ElevenLabsin
   pakotettua kohdistusta, joten sekin odottaa kiintiötä.

### Miten erä 5 jatketaan

Suunnitelmakuitti estää saman erän uusimisen ("Erä X on jo aloitettu").
Erätunnus lasketaan kohdelistasta, joten erä 5 ajetaan **kahtena eri eränä**:
`sisilia,islanti,alpit` ja `lappi,tromssa` (sama Livialle `-3`-avaimin). Näin
saadaan uusi tunnus ilman keksittyä retry_reasonia eikä mitään kirjoiteta yli,
koska erän 5 tiedostoja ei viety kertaakaan.

## Mitä integraatio vaatii (ajopaketin "Lopputoimitus ja julkaisu")

- **Uudet versionoidut ääni-URLit peliin.** Horatio:
  `audio/versions/horatio/<sha12>/<erätunnus>/puhe-fokus-matkakirja-<kaupunki>.mp3`;
  Livia: `aanet/pulu/versiot/<sha12>/<erätunnus>/livia-<kaupunki>-3.mp3`.
  `<sha12>` on `6e3a07e879bb` erässä 1 ja `439bf050af65` muualla, ja erätunnus
  vaihtuu erittäin — eli **yhdeksän eri prefiksiä**, ei yhtä. Live-avaimiin ei
  ole kirjoitettu mitään, joten julkaisu live-avaimeen on yhä erillinen vaihe.
- **Kuittien SHA/digest-sidonnat.** Jokaisessa kuitissa on näkyvän tekstin ja
  TTS-tekstin SHA-256 sekä äänitteen tarkistussumma; nämä sidotaan pelidataan ja
  runtime-portteihin vanhojen digestien tilalle.
- **Eleet vasta kohdistuksesta.** Livian puhe-eleet (`livia-*.eleet.json`) ja
  Horation aikaleimat (`puhe-fokus-matkakirja-*.aikaleimat.json`) syntyvät vasta
  kohdistusajoissa, joita ei ole ajettu. Vanhaa `sido`-toimintoa ei saa käyttää
  uusien sanojen ajoittamiseen.
- **Sofia city-4…13 ja muut ääniroolit säilyvät** — tässä ajossa koskettiin vain
  45 Horatio-kaupunkiluentaan ja 45 Livian `-3`-repliikkiin.
- **Testit päivitetään, ei ohiteta.** Vanhat digest- ja runtime-porttiodotukset
  sekä vanhentunut lukuaika-arvio päivitetään uusiin arvoihin; Marseillen
  kuiva-ajotestin r6-odotus on vanhentunut (uudessa datassa r1–r5).
- **`js/media.js` UUSITUT_AANET** -kyselyversio nostetaan samassa PR:ssä, jossa
  pelidata alkaa viitata uusiin äänitteisiin.
- **Kuuntelu on yhä tekemättä**: edustava H/L-otos, tagien ääneenluvun tarkistus
  ja katkeamien etsintä kuuluvat Fablen/omistajan QA:han.

## Mitä ei tehty

Ei krediittien ostoa eikä tilausmuutoksia, ei "Rerun all jobs" -uusintoja, ei
keksittyjä retry_reasoneja, ei tekstien, manifestin tai TTS-tagien muutoksia, ei
avainten käsittelyä, ei mergeä, ei versionostoa, ei Raamattu-muutoksia, ei
kuvapäätöksiä. API-avaimia ei ole tässä raportissa eikä lokipoiminnoissa.
