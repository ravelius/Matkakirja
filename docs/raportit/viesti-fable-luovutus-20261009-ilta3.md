# Päätoimittajan luovutus 9.10.2026 klo 19.3x (oma nollaus, konteksti 63 %)

Syy: Raamattu KONTEKSTIN NOLLAUS → FABLEN OMA NOLLAUS (raja 65 %). Session id ennallaan local_593b89a1-2514-4d74-b956-2a73db862382.
5 h 37 %, viikko 31 %. Keskustelu tallennettu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-09-klo-1759-1931.md.
Edellinen luovutus: viesti-fable-luovutus-20261009-ilta2.md (17.5x). Työjonot: scratchpad/tyojonot.md (päivitetty 19.3x), kirjattavat: scratchpad/kirjattavat-20261006.md loppu.
JONOKIERROS-cron oli 6a89fefd (kuolee nollauksessa) → luo uudelleen (7,27,47), kehote alla kohdassa 6.

## 1. Omistajan päätökset tänä iltana (kaikki kirjattu Raamattuun ja lokiin: #4305, #4306, #4308)
- **KL v3c + Riddarholmen v2b (v6h) peliin** (kortti 18.3x): uusin-3 → v6h tehty 18.5x (200), uusin-2 pysyy v6b. Kuvat _valmiit/hyvaksytyt-mallit/kl-ridd-v6h-20261009/.
- **Kuvalaki varovasti** (kortti 18.5x): ei uusia valokuvia Kreikan valtion muistomerkeistä/museoesineistä (havainnekuva tai oma 3D), juristi ennen julkaisua (Kreikka 20 %, Ranskan domaanit), ei mainoskuviin. Sisältökirjurin inventaario #4307 (12cbd4b9c) on juristin pohja.
- **Kysymykset aina korttina** päivällä (omistaja 18.5x); yöllä oletus + aamun kortti (kortti 18.5x).
- **Omistajalle vain häntä koskevat asiat** (19.0x): ei nollauksia, kuittauksia, levyä eikä jonokierroksia chattiin.
- **Kone vapaa ti 13.10. asti** (18.5x): 2 simua kun `memory_pressure` free ≥ 35 %, GUI-ajot vapaasti, GPU täysillä; ennen ti aamua GUI-ajot pois ja Unreal kiinni.
- **Pilvikrediitti käyttöön heti omissa pilvisessioissa** (19.1x, korjasi PT:n väärän "vasta rajalla" -päätelmän): jokainen työ omana `claude --cloud` -sessionaan, ei paikallisina agentteina. Raamattu KREDIITTI KÄYTTÖÖN HETI OMISSA PILVISESSIOISSA (#4308).
- **Pulun loput maat pilvessä** (kortti 19.1x "Aloita nyt"): ks. kohta 3.
- **Unity 6.7** (kortti 19.3x "Testataan nyt erillään"): Natiiviseppä tekee simuajon + A/B 6.3 vs 6.7 haarassa natiiviseppa/unity-67; peli pysyy 6000.3.24f1:ssä. Omistaja haluaa tuloksen HETI (19.1x: "Laita viestiä heti, kun se Unity-raportti valmistuu") – raportti 8724ff0b5 kerrottiin; jatko-osan tulos samoin heti.

## 2. Juna 173 AUKI omistajan "nyt"-sanaan
- Runko 1d5614b7d (L1248/P442/K453, unity 0): NUI ebcb70046 (yöotsikko), 3e53e0f82 (linnan latauskuva heti), 7b8fe62ce (Kysy vaaka iPhone); LS1 2e784cc5c (Vasa ⊇ 64f94e591); Siirtoseppä 98f1c06b4 (vouti-34 ⊇ ae435c1b7 puhujan kasvot + vouti v4 v46j); LS2 varjot-173 9acc8d4a7 OLETUS POIS (Natiivisepän ehto).
- Tulossa: LS2 utu-173 add6d023e (mitatut utu-taulukot, kaukoutu 1,4 → 1,0, ilmaperspektiivi 1,0 → 0,7; odottaa Karttasepän utu-pakettia ämpäriin) → kuittaa.
- "nyt" → PT kuittaa lopullisen BUILD-SHA:n, Natiiviseppä kirjoittaa muutoslokin uudelleen, PT tarkistaa, Julkaisija TF 173.

## 3. Pulu pilvessä (scratchpad/tyojonot.md osio PULU PILVESSÄ)
- Käynnistin: `sh /Users/Shared/Claude/Matkakirja-fable/scratchpad/kaynnista-pulu.sh <ISO3>` (ohjeet ja lokit scratchpad/pulu-pilvi/; luo haaran pulu-<maa>-pilvi pohjasta origin/pulu-pilvi-pohja 88272b94b, kirjoittaa ohjeen, `claude --model claude-sonnet-5-5 --cloud`, poistaa worktreen --force).
- Ohje haarassa: pulu-esigenerointi/PILVIOHJE.md (vaihe 0 data, vaihe 1, vaihe 2, tarkista-era, tarkista-valmis, koosta, RAPORTTI.md).
- AJOSSA: GRC (session_01MawWmmcscDLyqYUasj1iQa), DEU (session_0185zLBExc2BQU42Jy1oLmw2), ITA (session_01U3NEajdiyaWzajdW6nPtPN). Kolme kerrallaan; valmis maa (RAPORTTI.md) → seuraava jonosta → Sisältökirjurin pistokoe (10) → Julkaisija vie <MAA>.json + maat.json.
- JONO: ROU, ESP, NLD, AUT, IRL, SWE, PRT, FIN, HRV, BGR, CZE, DNK, POL, EST, HUN, GBR, CHE, UKR, LVA, LTU, RUS, NOR, SVK, SVN, BIH, BEL, ISL, MLT, LUX, pienet (SRB, MNE, MKD, MDA, BLR, ALB). Ei TUR, CYP.
- **AVOIN: kysy omistajalta kortilla krediittilukema** (Asetukset → Usage → Cloud session credits), laskeeko nyt. Jos ei laske, kysy omistajalta, miten aiempi tili ajoi (älä väitä syytä).

## 4. Roolit
- LR: odottaa Karttasepän ND/KL-tekoälypintoja (T7 yöajo, tunteja) → projisointi (tekoaly_koko.zsh nd v2) → LS2 pelikuva valokuvan rinnalla → PT → omistaja; välissä Riddarholmen tornin tiilen sävy valokuvan mukaan (v6i). Olavinlinnan syöksytorvi poistettu (koe), seinät 1–5 ohjauskuvat valmiina.
- Karttaseppä: NOLLATTU 18.51; yöajo v2 (ND → KL) T7:llä; utu-paketti Julkaisijalla.
- LS2: utu-173 kytkentä; laattavarjot EI (PT 19.0x); mittaus iPadilla Laitetestaajalla TF 173:n jälkeen (ohje b389b5ab8).
- LS1: Pariisin ja Tukholman kierrosten kuva-arkki kaikista pysähdyksistä v6h:lla → huonot kulmat korjaan; Steam Audio iPad Pro 13:lla (lupa 30.9.).
- NUI: UITK-asettelutestirunko (EditMode batchmode käännöspalvelun kopiossa, Natiivisepän lupa) junaan 174.
- Siirtoseppä: 174-jatko: täytevalo puhujan kasvoille + vuoronvaihdon selkäkuva pois.
- Natiiviseppä: Unity 6.7 -koe (ks. 1); juna 173 rungon ylläpito.
- Sisältökirjuri: NOLLATTU 18.58; Codex-odottajat (Olavinlinna s1, tähdet v4), posti-cron 4c71343f.
- Pelikoodari: Soundly 1b–1d taustalla (aja.zsh pid 41595 → T7 → NAS).
- Laitetestaaja: varjomittaus TF 173:n jälkeen.

## 5. Ansat
- Levy: alle 100 Gi → PT siirtää heti (tänään istunnot > 7 vrk NAS:lle; ~6,5 Gt jäi poistamatta "Operation not permitted" – kopiot NAS:lla, ei pakoteta). Worktree-katto Postivahdilla.
- Finder kirjoittaa .DS_Storen wt/-kansioihin → `git worktree remove` epäonnistuu → `--force` tai literaalipolun rm.
- Muisti: swap 22 Gt jumissa; käytä `memory_pressure`-free-%:ia simuehtoon.

## 6. JONOKIERROS-kehote (CronCreate "7,27,47 * * * *", sanatarkasti)
JONOKIERROS (Päätoimittaja, Raamattu Ydinajatus kohta 2 C TYÖJONOT + KONTEKSTIN NOLLAUS): 0) get_usage self: konteksti ≥ 55 % → päivitä tilatiedosto (muisti fable-tila-*), ≥ 65 % → FABLEN OMA NOLLAUS heti (tallenna-keskustelu.py, luovutus + aloitusviesti, push, clear_session self). Tekstityöt omina pilvisessioina heti (krediitti, Raamattu KREDIITTI KÄYTTÖÖN HETI), ei paikallisina agentteina. 1) date. 2) list_sessions (isRunning) + ListAgents; vertaa scratchpad/tyojonot.md:hen: levossa ilman pitkää ajoa → seuraava erä heti viestillä (send_message session id:llä), tyhjä jono → lisää 1–3 erää. Pulun pilvisessiot: seuraa haarojen commiteja (pulu-<maa>-pilvi), valmis maa → pistokoe Sisältökirjurille → seuraava maa (sh scratchpad/kaynnista-pulu.sh <ISO3>). 3) Kerran tunnissa list_events Postivahdille: kierroksessa näkyvät kontekstiluvut, muuten korjaa ajastus. 4) Päivitä tyojonot.md:n Päivitetty-rivi. Juna 173 auki omistajan "nyt"-sanaan. Unity 6.7 -kokeen tulos → omistajalle HETI. KYSYMYKSET AINA KORTTINA päivällä; yöllä (00–07) oletus ja aamun kortti. Omistajalle vain häntä koskevat asiat. Kone vapaa ti 13.10. asti. Kaikki suomeksi.
