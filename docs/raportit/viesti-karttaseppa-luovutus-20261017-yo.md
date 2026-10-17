# Karttasepän luovutus 17.10.2026 klo 23.0x (Postivahti: kova raja 40 %)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261017-myohailta.md`
(sama haara; siinä koko illan TILA-rivit ja kaikki skriptipolut).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261017-yo.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. JATKA KOHDASTA 1.

Käännökset ja simut VAIN Julkaisijan jonon kautta (KÄÄNNÖSPYYNTÖ → KÄÄNNETTY → SIMU NYT → SIMU VAPAA). Julkaisija nollautui ~23.00:
**seuraajan id osoitekirjasta**. Proto-worktree: /Users/Shared/Claude/wt/proto-karttaseppa-iss-reitti-198 haaralla
**karttaseppa/kiina-paketti-200** (peili `git push natiivi-backup karttaseppa/kiina-paketti-200:peili/proto/karttaseppa/kiina-paketti-200`).
Testit: `bash Linssit-testit/kaanna.sh` (bash), `bash Kartta-testit/kaanna.sh`, tarkistus `zsh tyokalut/tarkista.sh`.
Todistusajon PUUTE "kaannos.txt ≠ sha" on aina käännöspalvelun merge-sha (tarkista `git merge-base --is-ancestor`).

TYÖTAPA (PT 21.5x / omistaja 22.02): jokainen ruutu katsotaan TÄYSIKOKOISENA (rajatut 1:1-kehykset, ei vain arkki) ennen PT:lle lähettämistä.
Paikallaan pysyvä muutos → kuvapari; liike → < 1 min pätkä (`zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kiina-koko-linssi/patka.zsh
<todistuskansio> <alku s> <kesto s>`); koko video vain omistajan pyynnöstä.

## 1. ENSIN: OMISTAJAN PYYNTÖ 22.52 — kehittäjätilan kohdekaupunkipallot kadonneet (PT: ennen Kiinaa; juna 201)

Omistaja: "kehittäjätilassa kohdekaupungit ovat taas kadonneet näkyvistä. pitäsi näkyä hunnulla ja ilman." Tavoite: kehittäjätilassa kaikki
kohdekaupunkipallot aina näkyvissä, hunnulla (pelaajan näkymä) muiden maiden pallot himmeinä (napautus = maailmahyppy), ilman huntua täysinä
(KaupunkiPalloMitat.Himmea/Nakyy; 184.1-korjaus a000eadfe + 14aa9f4aa 12.10.). PT: etsi syy BUILD 200:sta (01540e13a) + automaattinen testi,
joka kaatuu jos pallot puuttuvat kehittäjätilassa hunnulla tai ilman; kuvapari (huntu | ilman) täysikokoisena PT:lle. Otettu Karttasepälle
(Kaupungit-osio, pallokartta) — UI/KaupunkiPallot.cs on UI/**-polussa (Natiivi-UI:n kansio), joten korjaus voi vaatia NUI:n kuittauksen.

**Selvitetty (ei syy):**
- Juna 200:n koodi näyttää pallot simun DEBUG-käännöksessä: v4-taisteluajon loki "kaupunkipallot: 50 kaupunkia", "maa FRA, näkyvät: … ; himmeinä 39",
  ja ensimmäisessä ruudussa (Ranska, huntu) Lontoo/Pariisi/Marseille täysinä + muut himmeinä (`proto-3d/lokit/todistus-kiina-taistelu-250-v4-20261017-2234`).
  01540e13a ⊂ tämän ajon käännös 8ce15e84d.
- KaupunkiPalloMitat-logiikka ja sen testit (Kartta-testit KaupunkiPallotTestit r. 55–78) ennallaan; KauppaAlue.OpasPiilotettu (481a73457) oli jo ennen 184.1:tä;
  663953c51:n Kehityskaupungit-muutos vain kommentti; Paavalikko.Maailma/PelaajanNakyma ennallaan; ei pallopolkuun liittyviä MATKAKIRJA_APPSTORE-muutoksia.
- Siis ero on TF-ympäristössä: release + MATKAKIRJA_APPSTORE (Rakennus.cs), kehittäjätila PlayerPrefsistä (Asetukset.Kehittaja), ei QA-komentoja.

**Avoimet ehdokkaat:** sallitut-listan haku (OpasSovitin.LataaSallitut vaatii LinssiOhjain.Instanssi; HaeSallitut "/opas/aineistot";
levyvälimuisti opas-sallitut.json), KaupunkiPalloKuva (render texture, `!pk0.Valmis` piilottaa; Karttapaletti bfe4e843b), Louvre-muutokset
(d6a90e813, b9acbc66a, da98b2e4a, 46a637393, 749a0bc57) — voiko poikkeus Rakenna/Ruutu-silmukassa piilottaa kaikki.
Juurisyyagentin (Opus, vain luku) raportti lisätään alle, kun se valmistuu (ks. LISÄYS).

**Testi:** logiikkatesti on jo; puuttuu integraatiotesti — todistusajon skenaario kehittäjätilassa `ui maailma`/pelaajan näkymä päälle/pois +
`oleta` lokiriveille "kaupunkipallot: … himmeinä N" (N > 0 hunnulla) ja näkyvien määrä ilman huntua. Jos syy on release-only, testi tarvitsee
release-kaltaisen ehdon (esim. Asetukset.PakotaPelaaja-tyyppinen kytkin tai Linssit/Kartta-testi Rakenna-polun puhtaalle osalle).

## 2. KIINA: 250-taistelukoe (omistaja 19.59 "Kyllä, vain taisteluihin (Suositus)"; linja 2 kärki, juna 201)

Tila: v5-käännös `0bf177c8b` kirjattu Julkaisijalle → `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kiina-taistelu-250-v5-app` (seuraaja kääntää).
KÄÄNNETTY → kirjoita `<app>/kaannos.out` "KÄÄNNETTY 0bf177c8b karttaseppa/kiina-paketti-200 (käännös-sha …)". SIMU NYT → taustalle
`zsh …/kiina-koko-linssi/odota-taistelu-250-v5.zsh > …/odota-taistelu-250-v5.out` (skenaario `sk-taistelu-250.txt` alkaa 140:stä; avausvuosi
ohittuu ajossa) → SIMU VAPAA heti → `yhdista-video.zsh <kansio>` → 1:1-ruudut 13–36 s (`crop=800:600:500:250`, 1 s välein, 3 rinnakkain)
→ jos ok: `patka.zsh <kansio> 12 26` → PT 3 riviä (pätkän polku + mitä näkyy + puutteet).

Tavoite (PT 21.1x): KAKSI selvää huippua dynastioiden väreissä (Wei vs. Sun–Liu/Wu) liikkuu kohti taistelupaikkaa, isku selvänä aaltona + X,
sitten kartta tasaiseksi. Väestöpintaa EI (omistaja 19.59). Tarkista v5:ssä erityisesti: kummut värillisinä kukkuloina (ei mustia "reikiä"),
Wu ja Wei eri väreissä, kummut erillään lyönnissä, aaltorengas näkyvä mutta ei musta.

Historia (kaikki kiina-paketti-200:ssa, ei junassa):
| Versio | SHA | Tulos |
|---|---|---|
| 45da5a534 | v4-videon viat: lasku ennen siirtoa, haamualueet pois, sileä muste | ok |
| 05ce463ac + 3fa8d8fe5 (NUI) → 71eac8a7f | Pulun "zZ" pois historialinsseissä (Kiina, Keksinnöt, Ihmisen matka, Isoisä 1873) | yhdistetty |
| 38be1ca55 | VainTaistelu: ei väestöpintaa, pinta nousee taistelulauseessa | v1 epäonnistui (avausvuosi), v2: armeija piste |
| c0dac25d7 | σ 80 km / 160 km kumpu | v3: Wei selvä, Wu hukkui |
| e1babe602 | TaisteluKummut: oma kumpu per armeija, Erilleen 230 km, aalto tummemmaksi | v4: kaksi liikkuvaa, mutta mustia "reikiä" |
| **0bf177c8b** | valo vasemmalta ylhäältä 45° / pohja 0,6, ei tummennusta, väli 320 km | **v5 odottaa** |

Avainkohdat: `KiinaVaestopinta.TaisteluKummut/Erilleen/TaisteluSileysKm/TaisteluArmeijaM/TaisteluValiKm` (Ydin), `KiinaVaestopintaKerros.VainTaistelu/
AsetaTaistelu/TaisteluValoKorkeus/AaltoTumma`, `KiinaKerros` (koe: Nouse taistelulauseen alussa, Laske hetken jälkeen, TaisteluHetki-risti JonoValo).
Testit `KiinaVaestopintaTestit.TaisteluKaksiHuippuaLiikkuvat`. Hyväksynnän jälkeen: Changping, Fei-joki, Yamen, Shanhai (vasta sitten).

## 3. Avoimet (ennallaan edellisestä luovutuksesta)

- Main-data hyväksynnän jälkeen: ITÄTURKIT 589 44,3 N; NURGAN 1421 45,5/129,5; ETELÄINEN TANG 950 kahdelle riville; nykyinen-kiina.json nimiö;
  kiina-puherivit.json. Lähde main `data/linssit/kiinan-dynastiat/`.
- Paikallinen `.claude/settings.local.json` muutettu (ei omani, ei commitoida).
