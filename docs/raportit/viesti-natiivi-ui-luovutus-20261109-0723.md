# Natiivi-UI: luovutus 9.11.2026 klo 07.23 (kontekstivahti ≥ 27 %; korvaa -0202:n tilan)

PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7 (JU nollautui 07.2x, seuraaja kuittaa).
Kaikki koe, EI JUNAAN ilman PT:n/KK:n sanaa (osa 2: ei junaan ilman omistajan korttia). Mac-kuvat ensin PT:lle, sitten KK:lle.
Parit: scratchpad-skripti (PIL, kuvat vierekkäin 3600 px, otsikkokaista; arkki = ruudukko nimillä), kirjoita uudelleen (10–15 riviä).
Käännöstarkistus: `sh Peli-testit/unity-tarkistus.sh` worktreessä (~3 min). Mac-ajot vain JU:n vuorolla (skenaariot proto-3d/_tyo/natiivi-ui/).

## Valmiit tässä istunnossa
- KUVATEKSTI (OMISTAJAN PÄÄTÖS 06.43: kuvateksti vain pelaajan itse avaamiin kuviin): 835f617a6 (natiivi-backup natiivi-ui/kuvateksti-vain-avattuun,
  yksi commit juna 223 83e635e63:n päällä; = testattu 1011023cd). Pari lokit/nui-kuvateksti-4-iphone-1011023cd/pari-k2-k8.jpg → PT → KK. JU poimii KK:n sanalla.
- NOSTOVALIKKO (natiivi-backup natiivi-ui/nostovalikko, wt/proto-natiivi-ui-nostovalikko), kärki 76aa7c1c6:
  a1d21f646 iPad: uusi merkintä M-nappina kaupunkinäkymässä (-3 katsottu, PT kuittasi, KK:lla).
  3925d008d OSA 4 lentokartta (Lentokartta.cs; MaakuntaMinikartta.Kohta; `ui lentokartta [lat lon|pois]`): katsottu -4 iPhone + iPad l-2
  (Ranskan kartta vas. alakulmassa, reitti Pariisi → Carcassonne, RANSKA väistyy). l-3 jäi saamatta (kortti näkyy ~3,8 s: LentoS 2,2 + ViipymaS 1,6).
  97067848d KK:n havainnot 1–2: lasi säilyy Rakenna():ssa (mk-lasi-lapsi), vierityksen vihje (mk-nostovalikko__vierita, `ui nostovalikko vierita`).
  76aa7c1c6 OMISTAJAN PÄÄTÖS 07.21: pilleri 🔍:n VASEMMALLE [Pariisi][🔍][☰]; Pinnaus väistää pillerin (palkki sen vasemmalla); väistöehdotus poistettu.
  Havainto 4 "Tanger" = skenaarion `ui matkakirja` ilman argumenttia avaa testimerkinnän Tanger (UiKomennot.cs:808), ei vika (kerrottu PT:lle).

## KESKEN → SEURAAVA
1) JU ajaa NOSTOVALIKKO-6 76aa7c1c6 x3 (iphone, iphone-vaaka, ipad; sk-nostovalikko-6.txt) → lokit nui-nostovalikko-6-{koko}-76aa7c1c6.
   Katso: v-1/v-2/v-3 tumma lasi (loki "lasi on"), v-2 vihje + v-2b vieritetty, vaaka v-1 vihje, [Pariisi][🔍][☰], v-4 palkki pillerin vasemmalla
   ei päällekkäin → arkki/parit PT:lle (= KK:n suunnitelman osa 1).
2) OSA 2 KOKEENA (PT 07.2x): KK:n suunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261109-kaupungin-nimi-ja-kiinnitetty-nosto.md
   (lue kokonaan, 35 riviä): kiinnityksen ajaksi kaupungin nimi palkkiin NOSTOT ▾ -valinnan paikalle ("‹ Pariisi ▾ ›"), erillistä pilleriä ei
   palkin aikana, NOSTOT-valinnan oma lista poistuu (kaupungin valikko korvaa), iPhonella noston nimi kokonaan. Koodi: Pinnaus.cs (palkki, Asettele
   :392–, NOSTOT-valinta), Karttaselite.cs (pilleri, KaupunkiNakyy, Asettele [Pariisi][🔍]), KaupunkiNostovalikko.cs (valikko, NapinAlle.Oikealle).
   Mac-kuvat → PT → KK. Ei junaan ilman omistajan korttia.
3) Odottaa KK:ta: iPhone-vaakan vihje kuului jo 97067848d:hen (KK päätti KYLLÄ).
