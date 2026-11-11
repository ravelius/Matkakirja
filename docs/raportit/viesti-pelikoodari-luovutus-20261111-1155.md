# Pelikoodari: luovutus 11.11.2026 klo 11.55

Edellinen: viesti-pelikoodari-luovutus-20261111-1127.md (e492089db). TÄMÄ KORVAA SEN JONON. Muu tausta (seinätyö, aukio-v133-skenaario,
B1) on edellisessä luovutuksessa ennallaan. PT 11.09: juoksupelin peruskorjaus; kesken olevat loppuun, ei uusia juoksupelin ominaisuuksia
eikä kamera- tai dronetöitä ilman KK:n määrittelyä.

## TEHTY tällä vuorolla
- KAMERALAITE PALA 1 commitoitu: 5d4e20d6e, haara kameralaite/pala-1, worktree /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite
  (a61a98089 + 4 tiedostoa, 494 lisäystä, 0 poistoa). Testit `sh Linssit-testit/kaanna.sh Kameralaite` 11/12, kaikki linssitestit
  2298/2299. Ainoa hylätty on T11LahtoKiinniotto: jättämän huippu 0,309 s × v, mutta KK odotti 0,27. KK:n oma kaava antaa 0,3085 s.
  Sha ja mittaukset lähetetty KK:lle ja PT:lle. KK:n päätökset 11.31 on kirjattu tehtävänantoon (scratchpad/keskustelukanava/suunnitelmat/
  20261111-kameralaite-pala1-tehtavananto.md). EI junaan.
- v133-VIENTI ajettu, EI commitoitu: worktree /Users/Shared/Claude/wt/proto-pelikoodari-v133, haara pelikoodari/tausta-v133 (juna-224
  17fbf3e35). Muutokset tallessa (git status: Palatsi.cs TaustaKansio → kielletty-tausta-v133 + 6 Resources-tiedostoa).
  Kulkukartta /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kulkukartta/v133 (v133.log), mittausskriptit v133/mittaus/.
  - M1/E4 ok (0,5 m:n ruudukko): M1 −87,0/−87,5 → −88,5; C-länsiseinä −86,0 → −85,5; B-itäseinä −88,0 → −89,0.
  - Kuljettava 392272 → 390063 m²; ovet 245 → 246 (uusi 碧螺亭 239,68; 474,81); esineet 106 → 103.
  - ESTE: kk-tausta-1-1-lod0:n sokkelin kansi (y 1,2) kärki (−175; −175) → (−179,03; −175,12) (tee_a-vika kuten a22) katkaisee pihan
    x −248…−168,5, z −257…−160 (noin 3080 m²) tasolta 1. Kerrottu LAV:lle (korjaus ja uusi paketti) ja PT:lle.
  - Peli-testit 911/912: JuoksuKulkuKarttaTestit.OvilehtiEiTorrotaKujalla vaatii Ovet.Length == 245 (rivi 801) → 246 vasta, kun uusi
    ovi on kuitattu. unity-tarkistus (sh) 0 virhettä.
- LAV:lle: puut-kaistoilta-pois-v17.json = {"pois": []} (julkaistavassa pelissä VapaaMaailma = true → KaistaRungot ei käytössä).

## JONO
1. **KK:n vastaus kameralaitteesta**: (a) T11:n raja (ehdotettu 0,31 s ± 10 %), (b) pysähdys menee 1,78 m edelle, kun annettu nopeus putoaa
   6 → 0 (ristiriidassa "ei koskaan edelle" -säännön kanssa): korjataanko palassa 1 vai 2. Toteutus samaan worktreeen, testit ja
   uusi sha KK:lle ja PT:lle.
2. **LAV:n uusi tausta-paketti** (1-1-korjaus) → aja kulkukartta uudelleen v133-worktreessä samalla tavalla (kulkukartta_ajo.py
   tuloskansioon, --vain-vertaa --vie; työkalu löytää paketin _valmiit/*/juoksupeli/maailma-v4-haulla), tarkista piha ja M1/E4
   (mittaus/rajat.py, alue.py), ovien määrä (testirivi 801 vain, jos 碧螺亭 kuitattu, muuten kysy PT:ltä), Peli-testit + sh unity-tarkistus,
   commit "Juoksupeli: tausta v133 käyttöön … ja kulkukartta uudelleen v133:sta" → sha JU:lle ja PT:lle. Sen jälkeen aukioajo
   _tyo/pelikoodari/kulkukartta/sk-ipad-aukio-v133.txt JU:n vuorolla.
3. LAV:n aja-a2.zsh (JU) → vertaa m1-varmistus-kuviin kuten V-ajossa.
4. B1 (bcf32314c) junaan vain PT:n päätöksellä.
