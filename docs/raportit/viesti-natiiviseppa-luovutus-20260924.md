# Natiivisepän luovutus 24.9.2026

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti 70 % (Fablen pyyntö).
Edellinen: viesti-natiiviseppa-luovutus-20260923-ilta2.md. Rooli: natiivin pääkehittäjä, proto-gitin
masterin ainoa mergeääjä, Unity-editorin ja iPad-/simulaattorikäännösten ajaja.

## Lue ensin

1. `CLAUDE.md`, Raamatun Ydinajatus kohta 2 ja NATIIVI PELI ETUSIJALLE.
2. `/Users/Shared/Claude/proto-3d/TYOTAPA.md` ja `Assets/Matkakirja/RAJAPINTA.md` (luvut 1, 3, 3b, 4, 7).
3. Muisti: `natiiviseppa-tila-20260923-yo.md` (Fablen muistikansio).

## Tila

- **Proto-master 92b8098** (päivitetty 24.9. ~05; nollaus ei tapahtunut ensimmäisellä kerralla) (`/Users/Shared/Claude/proto-3d/Matkakirja-proto`, paikallinen git; post-merge-koukku
  pushaa varmuuskopioon ravelius/Matkakirja-natiivi, vanhat haarat galleriat/pelikoodari/lehti/rosvo-pois hylkääntyvät non-ff — ei haittaa).
- **TestFlight build 4** = 7706efd (1.0.0 (4)), TestFlightissa. Build/testflight-4 jätetty; TF1–3 ja Build/iOS-laite poistettu (levy 98 %, ~24 Gt vapaana).
- **Yöllinen TF klo 04 (Julkaisija)**: vaihtoehto A – sama Library, ohitus jos Unity käynnissä / Temp/UnityLockfile auki /
  työpuu likainen / master ennallaan; vienti Build/yo, MATKAKIRJA_BUILD = aikaleima; jälkeen
  `git checkout ProjectSettings/ProjectSettings.asset Assets/Matkakirja/Materiaalit/`. Älä pidä Unityä auki klo 04 turhaan.
- **iPad** (00008142-0019686E02F3801C): asennettuna 3afad75, vapaa. **Simulaattori** (1572C658…, Laitetestaaja): a345a19 asennettu.
- Tuotannon sisältö v15 (skeema 1.16). #3012 (1.17–1.25: maakuntakaaret, offline-maanosat) Julkaisijan jonossa → natiivi lukee jo.

## Päivitys 24.9. klo 05.08 (master 62c03b4)

- Mergetty: linssiseppa/tummennus-gamma + valo-gamma, natiivi-ui/karuselli-kevyt + karuselli-sumea, kehittajan-liite (1fd601b),
  kehittajalehti-2, lukijoilta, avain-muistiin (Fablen kiire: avain ei PlayerPrefsiin), tilastot, peitteet; pelikoodari/avaimet,
  paataso-lukijat, avaus-introon, maisemakompressori (kaanna 239/239). Avoimia pyyntöjä ei ole.
- **Maailman maasto 2026-09-24-maailma** (z0–z12) masterissa (64a7844) ja iPadilla: Espanjan 41° N -viiva poissa
  (lokit/maailman-maasto-20260924/docs/).
- Karuselli: pysäkinvaihto yht 0,8–2,9 ms (oli 24 ms), max kehys 17 ms (lokit/karuselli-20260924).
- Sininen tummennussävy tulee UI Toolkit -kerroksesta (Linssisepän ui pois -koe) → Natiivi-UI (`ui peitteet`).
- `ui jatka` yhä 107 ms kehys → Natiivi-UI:lle kerrottu. Lentokaari pallon reunan yli = webin mukainen (0,5·R·kulma/180).
- Yö-TF ei poiminut Lukijoilta-väliversiota (ei Build/yo). iPad: 62c03b4, Linssisepän kontaktiajossa. Simulaattori: 2bb8687.
- Oppi: kysy "iPad vapaa?" ennen jokaista asennusta (asensin kerran kesken Linssisepän ajon). ProjectSettings.asset palautetaan
  checkoutilla myös IosLaite-viennin jälkeen.

## Päivitys 24.9. ~05

- Mergetty: jaa-matka (+jakaminen, iPadilla "Jaa matka" näkyy, .mm linkittyy), nosto-media, linssin-valmiit, ihmisen-nostokortti,
  loytopaikka-kentat, kartuscha-radio, nostokortti-kentat, ihmisen-tiedeliite (+tutkimusvaihe), natiivi-ui/tutkimusvaihe. Avoimia pyyntöjä ei ole.
- Valokeila: 24 ms JOKAISELLA keksintöpysäkin vaihdolla (esilämmitys ei auttanut); Natiivi-UI:n epäily Keksijakaruselli.Asettele →
  BringToFront() 26 kortille. Korjaus seuraavalle Natiivi-UI:lle; mittaa: linssi-komento `kehittaja 1` + `linssi keksinnot`, sitten `keksinnot 3/7/12`, komento `mittaus alku … / loppu`.
- Maailman maasto: Karttaseppä vie z12:ta, layer.json viimeisenä ~05 → https://media.matkakirja.app/julisteet/maasto/2026-09-24-maailma/layer.json.
  Haara natiiviseppa/maailman-maasto on valmiina (vain Rakennus.MaastoUrl vaihdettava), sitten luo + iPad + Espanjan 41° N -tarkistus (aja 42.7 0.6 3 + kallista).
- iPad: 41bda44 (Linssisepällä kontaktiajo). Simulaattori: 41bda44.

## Avoimet merge-pyynnöt (tee ensin) — HUOM: alla oleva lista on jo tehty

1. `natiivi-ui/jaa-matka` 9230344 (sis. `pelikoodari/jakaminen` 998eeca): .metat Scripts/Peli/Jakaminen.cs ja
   Plugins/iOS/MatkakirjaJako.mm → luo + **laitekäännös .mm:n takia**, testi `ui huipennus` → Jaa matka. Laitetestaaja odottaa (C6).
2. `natiivi-ui/nosto-media` f02a5ee: ei .metoja; lehden noston kuuntelu/musiikki mediarivin soittimella.
3. `natiivi-ui/linssin-valmiit` 4bece65 (jaa-matkan ja nosto-median jälkeen): .meta UI/Linssit/LinssiKysymykset.cs;
   Valokeila Kuvat.HaePienena → mittaa keksintöjen pysäkit 3/7/12 (linssi-komento `kehittaja 1`, `linssi keksinnot`, `keksinnot 3`…), tavoite ei 23 ms:n ensivaihtoa.

## Tehty tässä sessiossa (tärkeimmät)

- **LENNON ESITYS v1** (Fable): Nappula.Lento-korutiini, LennonVaihe Ei/Nousu/Matka/Lasku (p<0,2 / >0,8, puoliorbitti),
  PalloKierto.Kuvaa(+suuntima, katseKorkeus, palautus), DC-3 (Natiivi-UI; oma URP Lit Kone/KoneRaita/KoneIkkuna.mat),
  Savujana + Savu.shader, **Aurinko.cs** (CesiumSunSky ei ole Unityssä; paikallinen aamu koneen kohdalla, Pelikoodari asettaa
  paikallinenTunti vuorokaudenajasta), sumu, LentoPilvet, esilämmitys (lennon alku 209 → ~16 ms). AloitusLento kytketty (Pelikoodari).
- **Nappula oli ylösalaisin** (punainen "!"): Nappula.shader `siirto.y *= _ProjectionParams.x`.
- **Lehti.uss puuttuva }** (Natiivi-UI:n merge) → koko lehti ilman tyylejä; korjattu, `tyokalut/uss-tarkistus.py` tarkista.sh:ssa.
- Maakuntien rajat vektoriviivoina (Shaders/Rajaviiva, MaaKartta.rajaMateriaali; kaaret 1.25 tai renkaat).
- Reitit.Lentokaaret + SovitaKohteet, PalloKierto.SovitaPisteet; KarttaKerrokset "nappula"/"pisteet"/"valot";
  offline Manner; BuildNumeroSilta (Data/Raw/rakennus.txt); Info.plist mikrofoni/puhe; pohja 23a; kuori pois (natiivilehti).
- Mergetty kymmeniä Natiivi-UI-, Pelikoodari- ja Linssiseppä-haaroja (kaava: merge --no-ff → tarkista.sh → luo → .metat+kohtaus omaan committiin → `git checkout Assets/Matkakirja/Materiaalit/`).

## Kesken / seuraavat

1. Avoimet merge-pyynnöt yllä.
2. **Maailman maasto 2026-09-24-maailma** (Karttaseppä): layer.json vielä 404 → vaihda Rakennus.MaastoUrl, kun tulee.
3. Valokeilan pysäkinvaihto (Natiivi-UI:n AsyncGPUReadback 3afad75): 24/17/24 → 23/13/15 ms; ensimmäinen vaihto yhä 23 ms → kerro Natiivi-UI:lle.
4. `ui jatka` -kehys 100 ms (ei PeliOhjain.Jatka 4,7 ms) – aloitusnäkymän sulku (Natiivi-UI).
5. Espanjan vaakaviiva (23b DEM 41° N) poistuu maailman maastolla.

## Työtavat (lisäykset)

- Lisää `ui pois` ui-komennoksi ennen kuvakaappauksia; `ui sulje` sulkee dialogit. Aloituslento vain `ui aloita <lähtö>` (lontoo, istanbul, ateena, …).
- Testiskriptit: scratchpadin `aja.sh <komennot> <s> <kansio>` = konsoli + `ui jatka` + komento.txt. Linssit: Documents/linssi-komento.txt.
- Koekansio: Documents/sisalto-koe/kokoelmat/<kokoelma>.json voittaa paketin.
- Materiaali()-apu luo .matit uudelleen joka luo-ajossa → palauta Materiaalit/ checkoutilla, jos vain sarjallistus muuttui.

## Aloitusviesti uudelle sessiolle

> Olet Natiiviseppä (Opus), natiivin Unity + Cesium -pelin pääkehittäjä ja proto-gitin master. Lue CLAUDE.md,
> Raamatun Ydinajatus kohta 2 ja NATIIVI PELI ETUSIJALLE, docs/raportit/viesti-natiiviseppa-luovutus-20260924.md
> (haara selvittaja-3d-luovutus), proto-3d/TYOTAPA.md ja Assets/Matkakirja/RAJAPINTA.md. Proto-master a345a19.
> Mergeä ensin natiivi-ui/jaa-matka 9230344 (laitekäännös .mm:n takia) ja natiivi-ui/nosto-media f02a5ee, sitten "Kesken"-lista.
