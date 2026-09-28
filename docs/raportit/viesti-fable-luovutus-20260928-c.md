# Päätoimittajan (ent. Fable) luovutus 28.9.2026 klo 19.29 (konteksti 63 %)

Sessio local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 "Päätoimittaja (Opus, xhigh)". Kaikki päätökset lokissa
docs/raamattu-loki/paatokset-2026-09.md 28.9. klo 11.31 → 19.5x (grep "28.9.2026"). Edellinen luovutus -20260928-b.

## 1. Roolisessiot (ÄLÄ luo uusia)

| Rooli | Session id | Kärki nyt |
|---|---|---|
| Postivahti (Sonnet) | local_0a4f4c68-d24d-4b1f-83d7-d3c098cec96b | kierto 10 min; valvoo koodaus-CPU-summaa ja kevyttä lippua |
| Julkaisija (Opus) | local_24e63224-112c-449a-b6a3-e10e4ed43f4b | TF 1.0.38 vienti (VIE annettu); web-juna #3536 #3520 #3571 #3568 #3541 #3540 #3548 #3549 #3556 #3560 #3550 #3551 #3538 #3527 |
| Karttaseppä (Opus) | local_16f80454-5b30-4180-ae9b-8c6d1edb6779 | pallopoltto + laattavienti (nice 15), BMNG 10 kk ketju |
| Natiiviseppä (max) | local_fcc10552-5810-49bf-b0cf-188456f1231c | 1.0.39-juna (hyppykorjaus + Pulun pysäytys KÄRKEEN), v3f4-video ~20.00 |
| Pelikoodari (Opus) | local_11aca9cd-eda6-4db9-9019-8a153c8b8795 | Pulun ISS-repliikit (docs/raportit/pulu-iss-kasikirjoitus-20260928.md) + Ateena/Sofia/Pariisi Pulu-luennat v4:llä → kooste omistajalle ennen mergeä |
| Linssiseppä (max) | local_7a457b99-7ecd-4634-93a0-0c02b53e8d24 | nollattu 19.3x (luovutus -t); cl13 ~20.0x: erikoismallit maalle + seepia, Cupola sumennus 0,4×/0,25× + pehmeät pölyt → kuvat |
| Linssiseppä 2 (Opus, high) | local_e675f86d-210c-416b-8d83-926194307a44 | LUOTU TÄNÄÄN (checkout Matkakirja-linssiseppa-2, git worktree, haara linssiseppa2-tyo-20260928); Maapallon vuosi + ISS 4a–4c; NDVI-läiskä Lähi-idässä |
| Natiivi-UI (Opus) | local_c6d63773-0270-4873-96f8-63c66cf52794 | hyppykorjaus puhe-hanta (jatko vain > 1,5 s jäljellä) laitevarmistus + Pulun puhe seis chatista poistuttaessa + loitonnusraja 48ec93dd → 1.0.39 |
| Siirtoseppä (Opus) | local_6cef0cb2-ae2e-4677-b85c-2eeb192f10c4 | ISS-realismi web (siirtoseppa-iss-realismi) odottaa pelikoodari-iss-kyytiä mainiin; Maapallon vuosi web #3558 |
| Sisältökirjuri (Sonnet) | local_b9ca71c7-3458-4e1d-aa21-f6c97e27c708 | #3536 ristiriita + #3520 testivirhe, sitten ALB (maakunta-PR:t yksi kerrallaan) |
| Laitetestaaja (Sonnet) | local_36a45147-8407-4cfb-bbdb-c20d5f684735 | odottaa 1.0.39 |

## 2. AVOIMET OMISTAJALLA

- **Isoisän ääni:** suosikit (lopuksi kuunnellaan vain nämä) F3 Jeroen Hamerland (hollanti), G4 Mardi (saksa), H1 James (USA),
  Iv4 William (saksa); kopiot proto-3d/lokit/pulu-v4-koe/suosikit/ + suosikit.txt. Omistaja haluaa vakaan, etäisen, EI tunnetageja.
  Lähetetty klippeinä 19.2x → odotetaan valintaa, sitten isoisän luennat uudelleen valitulla äänellä.
- **Cupola:** "Vielä liikaa blurrina" → cl13-kuvat 0,4×/0,25× tulossa.
- **Pulun ääniefektikoe** (pulu-efektit-koe, 6 näytettä) — omistaja: "Pulu toimii nyt aivan loistavasti"; ISS-repliikit tehdään SFX:llä.
- **Aloituslento v3f4** video ~20.00 → kortti (OK → 1.0.39).

## 3. Tänään tehty (lokissa)

Nice-oletus + GPU-väistö omistajan ilmoituksesta (kevyt lippu, tools/gpu-vapaa.sh, #3545; TF testit-runnerilla #3570).
Pulu: puhekeskustelu (Kuuntelen → Mietin → "Puhun… napauta mikkiä, jos haluat keskeyttää" → tyhjä), xAI-realtime-koe
(kehittäjätila), ElevenLabs v4 Turbo striimiääneksi (#3572 tuotannossa), nopea aloitus (#3567), välimuisti (#3547).
TF 1.0.36 ja 1.0.37 viety, 1.0.38 viennissä. Maapallon vuosi -linssi (kehittäjätila, ei rekisteriin ennen valmista).
Maakuntakartta: Nostot pois, kytkin, napautus valitsee (natiivi). ISS: valot 60 %, pilvipeitto 0,9, 4a+4c, nopeutus.
Ideat jonossa: Pulu avaruuskävelyllä radiolla + kamera kädessä (myöhemmin, omistajan aloituslupa).

## 4. Opit

- Omistaja työskentelee käyttäjällä samireivinen; Clauden terminaali = koodaus ilman FDA → järjestelmäasetukset GUI-ohjeena.
- Luokitin estää muilta rooleilta CI-perumiset → EI lupapesua; komento omistajalle bash-lohkona.
- taskpolicy -b kaataa käännöksiä ja rikkoo mikkiäänen → vain nice 15 niille.
- Omistajan sanelu voi kääntyä englanniksi ("withdrawals" = nostot, "county" = maakunta).
- Päivän 5 h -ikkuna 22 %, viikko 38 %.
