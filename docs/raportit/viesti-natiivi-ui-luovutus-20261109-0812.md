# Natiivi-UI: luovutus 9.11.2026 klo 08.12 (PT:n pyyntö 08.1x: Postivahdin nollaus ei mennyt läpi → itse; korvaa -0723:n)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7.
Kaikki on koetta, EI JUNAAN ilman PT:n tai KK:n sanaa (osa 2: ei junaan ilman omistajan korttia). Mac-kuvat ensin PT:lle, sitten KK:lle.
Arkki: scratchpad-skripti (PIL, 2 kuvaa/rivi 3600 px, otsikkokaista); esimerkki lokit/nui-nostovalikko-7-ipad-c6d66b491/arkki-6-vs-7.jpg.
Käännöstarkistus: `sh Peli-testit/unity-tarkistus.sh` worktreessä (~3 min). Mac-ajot vain JU:n vuorolla (skenaariot proto-3d/_tyo/natiivi-ui/).
Muokkaukset: scratchpad korvaa.py (lista (vanha, uusi), tarkistaa yhden osuman, .tmp + os.replace).

## Valmiit (natiivi-backup natiivi-ui/nostovalikko, wt /Users/Shared/Claude/wt/proto-natiivi-ui-nostovalikko), kärki 092345d80
- KUVATEKSTI 835f617a6 (natiivi-ui/kuvateksti-vain-avattuun): valmis, KK:n sanalla JU poimii (ennallaan -0723:sta).
- NOSTOVALIKKO aiemmat: a1d21f646 (M-nappi iPad), 3925d008d osa 4 lentokartta, 97067848d vihje, 76aa7c1c6 pilleri 🔍:n vasemmalle.
- c6d66b491 KK:n HAVAINTO 1 KORJATTU: tumma v-1 oli paneelin oma pohja ilman lasia, ja v-2/v-3 saivat lasin vaalean kartan päällä.
  Valikko on nyt Lasipohja.EiLasia (peruskartalla ei lasia, omistaja 17.10.). -7 x3 katsottu klo 08.0x: kaikki tasot tummat, lokissa
  "lasi ei (tumma pohja)". Arkki ja raportti PT:lle on lähetetty.
- 474011364 maan tason "RANSKA"-väliotsikko vaaleaksi (oli tumma tummalla, -7 v-3). Ei vielä nähty kuvissa (osa2-1 o-5 näyttää).
- 092345d80 "(vieritä)"-vihje vaaleaksi (himmeä meripihka, -7 iPad v-2). EI VIELÄ AJETTU: tulee mukaan seuraavaan ajoon.
- a3588fe08 OSA 2 KOKEENA (KK:n suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261109-kaupungin-nimi-ja-kiinnitetty-nosto.md):
  Pinnaus.Yhdistetty: kiinnitetyn noston palkissa (Askel, ei chat eikä väistö) NOSTOT ▾:n paikalla kaupungin nimi (kaupungin ulkopuolella
  maan nimi) ‹ Pariisi ▾ ›. Nimi avaa kaupungin valikon palkin alle (KaupunkiNostovalikko.Avaa(ankkuri, avaaja)). Pilleri on piilossa
  palkin ajan (Karttaselite.KaupunkiNakyy). iPhone: ‹ ja nimi myös, ja noston nimi kokonaan omalla rivillään (mk-pinpalkki--kaksirivi,
  Pinnaus.KaksiRivia). Pilleriin tuli ▾. Testi `ui pinnaus nostot` avaa valikon palkista; `ui pinnaus` näyttää selauksen ‹[Pariisi]›
  ja tiedon "kaksi riviä".

## KESKEN → SEURAAVA
1) JU ajaa OSA2-1 474011364 (ketju AF, alkoi klo 08.04, ipad → iphone → iphone-vaaka; sk-nostovalikko-osa2-1.txt, 5 kuvaa) →
   lokit/nui-nostovalikko-osa2-1-{koko}-474011364. Katso o-1…o-5:
   - o-1: [Pariisi ▾][🔍]
   - o-2: palkissa ‹ Pariisi ▾ ›, ei pilleriä; iPhonella nimi kokonaan ja ohjaimet alla
   - o-3: valikko palkin alla, lokissa "avaaja palkki"
   - o-4: pilleri palaa
   - o-5: RANSKA luettavana
   Arkki → PT → KK → omistaja kortilla. Vihjeen 092345d80 voi todentaa seuraavassa ajossa.
2) Riskit: iPhone pystyn palkki voi kasvaa kolmeriviseksi (AUTO + tauko). Kaksirivisen palkin yläreuna on napin yläreunassa (Pinnaus.Asettele).
   Kuva palkin alla seuraa palkkia. NOSTOT-listan poisto muuttaa 20.10. päätöstä (omistajalle kerrottu KK:n suunnitelmassa).
3) Odottaa KK:ta: kuvateksti 835f617a6 junaan.
