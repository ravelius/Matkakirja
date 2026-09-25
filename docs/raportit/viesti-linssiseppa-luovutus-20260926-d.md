# Linssisepän luovutus 26.9.2026 yöllä (d)

*Linssiseppä (Opus, max), sessio 25.9. klo 23.19 – 26.9. klo 00.4x, Fablen käskystä (konteksti 70 %). Edellinen:
viesti-linssiseppa-luovutus-20260925-c.md. Jatkaja lukee tämän ja viesti-linssiseppa-aloitus.md:n.*

## Linjaus ja uudet käskyt (Fable 26.9. yöllä, sitovat)

1. **Omistajan löydökset build 16 → build 17, Ihmisen matka II:** 151, 152 ja 148 (esityksen ohjaus on minun, napit
   Natiivi-UI:n). 147 (CC ☰-valikkoon "Tekstitys") on Natiivi-UI:n. Videot ennen mergeä.
2. **ELÄVÄ KARTTA, "Isoisän muste"** (omistaja 26.9. klo 00.0x): minä vedän videon (15–20 s, Kreikka), ja se ohittaa II:n
   erän 5 loput. Käsikirjoitus on valmis: docs/raportit/elava-kartta-kasikirjoitus-20260926.md (odottaa Fablen
   hyväksyntää). Suunnitelma: docs/raportit/elava-kartta-suunnitelma-20260926.md (Fablen 8b67da3a6).
3. **Pariteettiäänet ovat minun, build 17:** astronautin humina sekä Keksintöjen kilahdus ja vuosinaksahdus. Ne tehdään
   samaan kaavaan kuin äänimaisemat, eikä musiikkisuunnitelmaa odoteta.
4. **Rajapinta ILinssiYmparisto.Tehoste ja Taustaaani** on hyväksytty: Pelikoodari tekee sen, ja minä kytken linssit.
   Musiikki- ja äänisuunnitelma on Pelikoodarin; oma panokseni on docs/raportit/linssien-aanitoiveet-20260925.md.
5. **Omistajan videot ja kuvat** (Fable 25.9., sitova):
   - Rajataan laitteen ruutuun ilman reunoja. Pysty pysynä (esim. 1170 × 2532 → korkeus 1600 px), iPad vaakana.
   - Ei 16:9-kangasta eikä letterboxia.
   - Kuvapari vierekkäin ilman marginaaleja.
   - Hidastus omana tiedostonaan.

## Haarat (proto-git)

| Haara (worktree) | Commitit | Tila |
|---|---|---|
| linssiseppa/esilataus (wt/proto-linssiseppa-esilataus, junan 674c75ee päällä) | 05e54878 | Laattaesilataus ±1. Merge-pyyntö Natiivisepälle, simulaattoritodennus kesken |
| linssiseppa/radio-esikuuntelu (wt/proto-linssiseppa-radio, junan 36688d49 päällä) | 642e1782, b08ed1e3, 9434b244 | Natiiviseppä KATSELMOI OK, ja se mergetään build 18 -junaan build 17:n jälkeen. Simulaattorimittaus puuttuu |
| linssiseppa/ihmisen-matka-2 (wt/proto-linssiseppa, junan 36688d49 päällä) | e1cdd042, a931c1e8, 458550e4, 91c8e050 | Erä 5: tasatehoinen maisemahäivytys, halo, pyörre, soihdun lepatus, hiukkaset ja saattolento. Testit 257/257, mutta tehosteita ei ole vielä nähty simulaattorissa. Videot ennen mergeä |

**Laattaesilataus (05e54878):**
- Ydin Laattalista: kameran projektio (pohjoinen ylhäällä, kallistus pohjoiseen). Laatat tasoilla z, z+1 (keskusta) ja
  z−1 (levennetty), katto 200.
- Tason kaava: 2h·tan(fov/2)/H vs. 2πR·cos(lat)/(256·2^z). Natiiviseppä mittasi iPadilla 1 200 km:ssä tason 8, ja kaava
  antaa 8,06.
- LinssienEsilataaja, kun linssi on auki (topografia, vesistöt, radio, astronautti): pysähtyneen kameran näkymä ±1, ja
  radiossa myös yövalot.
- Joutilaana (Esilataajan jonon tyhjennyttyä): reliefi 150, yövalot 80 ja astronautin avausnäkymä 150.
- Mittarit: VerkkoOdotus "linssi <id>:peite" (LinssiOhjain.Peite) ja "satelliitti:musta" (AstronauttiSovitin).

**Radion esikuuntelu:**
- MatkakirjaRadio_Esikuuntele jäsentää paketit enintään 4 s:n renkaaseen, ja Avaa samalla osoitteella ottaa ne käyttöön.
- RadioLinssi valitsee seuraavaksi asteikon naapurin liikkeen suuntaan, kun asema on soinut 3 s.
- Testikomennot: `radio esikuuntelu pois|paalle` ja `radio tila` (taajuus ja esikuuntelu). Loki: "radio: kuuluu X ms
  (esikuuntelusta|uusi yhteys)".
- macOS-koeajo: asemanvaihto noin 1–2,3 s → 0,2–0,9 s, CPU 1,30 → 1,34 %. Koeohjelmat ovat scratchpadissa radiotesti/
  (testi.mm, testi2.mm).
- Natiiviseppä pyysi simulaattorimittauksen.

**Testikäännös ja ajo** (session scratchpad
/private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa/036112b9-64ea-477b-aaf5-b26287ae84f0/scratchpad):
- Käännös: `proto-kaanna.sh linssiseppa/esilataus+linssiseppa/ihmisen-matka-2+linssiseppa/radio-esikuuntelu`
  (kaanna-esilataus.sh odottaa junan). Kopioi .app heti KÄÄNNETTY-rivin jälkeen hakemistoon esilataus-app/.
- Ajo: `VAIHEET=123 ./ajo-esilataus-im2.sh` (apu.sh):
  1. esilataus kylmänä ja esiladattuna samasta paikasta (välimuisti tyhjennetään)
  2. radion A/B-mittaus: vaihtoviive ja CPU
  3. II-video (levantti, denisova, beringia, white-sands → chile, aikahyppy, loppu)
- iPadille: `UDID=903C2B91-34C3-4C43-A392-A52F7DAFD96C LAITE=ipad VAIHEET=3`.
- Lokit: proto-3d/lokit/linssiseppa-esilataus-im2-20260926/.
- Simulaattorivuoro pyydetään Julkaisijalta uudelleen. Yön vuoro oli sovittu, ja silloin booted-rajan oli oltava < 2
  (Natiiviseppä ajaa klo 00–03).

## II:n löydökset build 17:ään (analyysi valmis, koodia ei vielä)

- **151, kamera-ajot äkkinäisiä, kun kartta väistää kuvaa.**
  - Syy: Kuva() → Asettele() ajaa KarttaKerrokset.Linssisiirto(dx, dy, SiirtoS 0,9 s) erillisenä liikkeenä. Samaan
    aikaan kulkevat Esityksen jakson ajo (1,2–4,5 s) ja laskeutuminen (6 s).
  - Suunnitelma, osa 1: siirto seuraavaan kehykseen (kuten keilaOdottaa). Kesto ja käyrä samat kuin ajolla
    (Rajaus().kestoMs, Kameramatikka.Pehmennys), jolloin syntyy yksi yhtenäinen käyrä.
  - Suunnitelma, osa 2: paluu (kuva pois) 1,6–2 s.
  - Suunnitelma, osa 3: PalloKierto.Linssisiirto-käyrä tarkistetaan Natiivisepän kanssa. Tarvittaessa pyydetään ylikuormitus,
    joka ottaa pehmennyksen.
- **152, alku.**
  - Nyt: musta ja ensimmäinen lause, sitten Esitys.AvauksenAjat (Musta, Feidi, ZoomAlku, ZoomLoppu). Musta pois, kun
    Kulunut ≥ Musta; avaruusajo alkaa kohdassa ZoomAlku.
  - Tavoite: tähdet ja pallo feidautuvat rauhassa mustasta, ja pallo lähestyy samaan aikaan.
  - Suunnitelma: II:lle omat ajat (feidi 2,5–3 s, ZoomAlku = Musta) ja tähdet samaan feidiin.
  - I säilyy sellaisenaan, joten muutos tehdään II:n parametrina IhmisenMatkaLinssin kautta, ei jaettuun oletukseen.
  - Kuvaa ensin nykytila videolle.
- **148, ohjaus.**
  - Kutsut ovat olemassa, ja ne on kerrottu Natiivi-UI:lle: AloitaAlusta, SiirryTutkimukseen, Esitys.Tauko/Jatka ja
    tila Tutkimus != null.
  - Ehdotus: IhmisenMatkaLinssi.Ohjaus (Soi/Tauolla/Tutkimus), ToistaTaiTauko(), Alkuun(), Loppuun() ja tapahtuma
    OhjausMuuttui napeille. Testit Ytimeen.

## Pariteettiäänet (build 17)

- **Astronautin humina:**
  - Tiedosto: https://media.matkakirja.app/matkakirja/aanet/linssit/93aaf7fb15092bac80abd1d740aa2a22a0fdb761558df2273673bc263fde2f2b.mp3
    (web ASTRONAUTIN_HUMINA): 84 s, −30,48 LUFS, 1,5 s:n ristihäivytys saumassa.
  - Web: voima 0,45, nousu 2 s. Raamatun mukaan taustaääni (taustaäänen säädin, ei musiikkikytkin), musiikki pois
    linssin ajaksi.
  - Tekotapa: kuten IhmisenMatka2Maisema (kaksi lähdettä, saumassa ristihäivytys, pakattu klippi), AstronauttiSovitin avaa
    ja sulkee.
- **Keksinnöt** (web js/sound.js, syntetisoitu; porta C#:iin AudioClip.Create-PCM:nä kerran):
  - `keksinto`: siniaalto 1046,5 Hz, 0,4 s, gain 0,05, attack 8 ms, sekä 2093 Hz, 0,24 s, gain 0,01. Ei soi
    merkkipaalulla 1873.
  - `vuosi`: ylipäästökohina 28 ms (5 200 → 3 200 Hz, gain 0,014) ja knock 2 400 Hz, 22 ms, gain 0,03, q 12.
    Harvennus AIKAJANA_NAKSU_VALI_MS.
  - Kytkentä KeksinnotLinssin tapahtumiin.

## Elävä kartta: seuraavaksi

1. Fable hyväksyy käsikirjoituksen.
2. Rajapinnat sovitaan Natiivisepän kanssa: Paljastus(keskus, säde, t), Viivapiirto(kerros, osuus),
   Maakuntaväri(id, t), Aurinko(atsimuutti, korkeus), Yövalot-maski (käydyt kaupungit) ja Boidit.
3. Natiivi-UI tekee kartussin, Pelikoodari kokoluokat ja himmeät jäljet, Karttaseppä 1873-reitit ja Sisältökirjuri
   GRC-luokituksen.
4. Minun aikajanakohtaukseni `elava kreikka` käyttää paikkamerkkejä puuttuville rajapinnoille.
5. Video iPhonella ja iPadilla.

## Muut

- Natiivi-UI:lle on pyydetty Ken Burns II:n havainnekuvaan.
- Worktree linssiseppa-maisemat-lahteet on poistettu (#3244 mergetty). Worktreitä on nyt kolme (proto).
- Omistajalle: proto-3d/vapauta-levy-linssiseppa-20260925.sh (raa'at videot).
- Muistissa on tila linssiseppa-tila-20260926-yo.
