# Natiivi-UI: luovutus 9.11.2026 klo 02.02 (kontekstivahti 26 %; korvaa -0010:n tilan)

Pohja taustaksi: -0010 (`git show 9f7cfbfd5:docs/raportit/viesti-natiivi-ui-luovutus-20261109-0010.md`).
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7. Kaikki koe, EI JUNAAN ilman PT:n/KK:n sanaa.
Parit: scratchpad-skripti (PIL, kuvat vierekkäin 3600 px, otsikko- ja nimikaista), kirjoita uudelleen (10 riviä).
Käännöstarkistus: `sh Peli-testit/unity-tarkistus.sh` worktreessä (taustalle, ~3 min).

## Tehty tässä istunnossa
- PARIISIPALLO-4, KUVATEKSTI-3 ja TARINA-1b katsottu ja parit PT:lle (01.5x):
  proto-3d/lokit/nui-pariisipallo-4-iphone-2233e740c/pari-l1-2vs4.jpg, nui-kuvateksti-3-{iphone,ipad}-836ded6c6/pari-k{1,2,5}-ennen-jalkeen.jpg,
  nui-nostokuvat-1b-tarina-{iphone,ipad}-10845cd24/pari-j1-j5.jpg. Huom: kuvateksti-3 iPadin kuva 0,87× ENNEN (tavoite ≥ 0,9). Odottaa PT:tä.

## KAUPUNGIN NOSTOVALIKKO (PT:n iso työ; omistaja 8.11. 23.14 + kortti 9.11. 01.47)
Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261108-kaupungin-nostovalikko.md
Haara natiivi-backup `natiivi-ui/nostovalikko` (worktree /Users/Shared/Claude/wt/proto-natiivi-ui-nostovalikko, pohja juna 223 2f2e13352).
- OSA 1 cbe8d89c2: KaupunkiNakyma.cs (kaupunkiportti taso ≥ 12 kuten kameratappi; nimi Kohdenostot.Kaupunki tai lähin pelin kaupunki 12 km, muuten maa),
  Karttaselite: pilleri `mk-ohjausnappi--teksti` paperina 🔍:n oikealla ([🔍][Pariisi][☰]); Matkakirjakortti.MKaupungissa → aina M
  (kertojan luenta ei avaa korttia kaupunkinäkymässä: TARKISTA saapumisen luenta, jos saapuminen on tasolla ≥ 12).
- OSAT 2–3 57e36f371: KaupunkiNostovalikko.cs (LINSSIN VALIKKO -pohja, NapinAlle; "‹ Ranska", "Nähtävyydet (n) ›" ensin, KaupunkiNostot.Hae,
  maan taso: maan kohdekartat + NostoKerros.MaanNostot aiheittain); valinta NahtavyysEsittely.Napautus(id, lat, lon, kaikki: true)
  (karttavalot Nostokortti.AvaaPalkkina, Kohdenostot.AvaaPalkkina toisen kaupungin kohteelle), ilman luettavaa pelkkä lento.
  Testikomennot `ui kaupunkipilleri [paalla|pois|oikea|paina]`, `ui nostovalikko [auki|maa|kaupunki|kategoria n|rivi n|sulje]`.
- Käännös 0 virhettä molemmissa. EI vielä nähty kuvana.
- JU:LLA: sk-nostovalikko-2 (proto-3d/_tyo/natiivi-ui/, korvaa -1:n) koot iphone, iphone-vaaka, ipad → lokit nui-nostovalikko-2-{koko}-57e36f371.
  SEURAAVA: katso m-1..m-4 ja v-1..v-5 (odotukset skenaarion alussa), korjaa, parit PT:lle → KK.
- JÄLJELLÄ: OSA 4 pieni maan kartta vasempaan alakulmaan lennon ajaksi toiseen kaupunkiin (MaakuntaMinikartta.cs, Sijaintipallo.cs;
  kartuscha väistyy), puhtaat C#-testit (tasot, määrät, paluu, nimi) jos mahdollista, osa 5 Mac-kuvat → KK → omistaja ennen junaa.
  Avoimet riskit: iPhonen yläkulma (pinnattu palkki min 160 pt M:n ja 🔍:n välissä), Pariisin piirroskartan keskitys ilman kiertoa,
  kaupunkien välinen lento (LentoS 2,2 s) ja iPadin muisti uuden alueen latauksessa.

## Sitten
- LENTORAJA-6 vain PT:n sanalla (ks. -2325).
