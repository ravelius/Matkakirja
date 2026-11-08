# PT:n luovutus 8.11.2026 klo 18.38 (konteksti 30 %, pehmeä raja)

Korvaa -1605:n JUNA- ja AJOSSA-kohdat; -1605:n, -1345:n ja -1010:n OPIT voimassa. Viestit mcp__ccd_session_mgmt__send_message session id:llä
(/Users/Shared/Claude/osoitekirja.md). Työlista tyolista.py:llä, junarivit VAIN juna.py:llä (ei käsin). Kuvat katsotaan itse ennen KK:lle.

## TF 223 JULKAISTU 18.01 (omistaja 17.20 "Julkaise")
Juna 222 kärki 617d6ca2b → TF 223 (run 42496402361 success), KK:lle kerrottu. Sisältö: kiinteä ladonta (b3914b64b), paperinavat ecabf1855,
nähtävyysnapautus + ND-kyltti (NUI puhdas haara ilman topoesittelyä/kohokarttaa b4e624cfe), puut, lippu, juoksupelin lataus, kehä A.
Asemataululla rivi "TF 222" (taulu nimeää junan numerolla). Seuraava juna 223 ei vielä avattu.

## AJOSSA
- NÄHTÄVYYS KUVAN ALAPUOLELLE (OMISTAJAN PÄÄTÖS 18.36 "Kyllä"): esittelyssä koko nähtävyys (huippu myös) palkin+kuvan alapuolella kaikilla
  laitteilla/suunnilla; syy iPhone-pysty TF 223 Eiffel peittyy (docs/raportit/kaappaukset/omistaja-20261108/iphone-eiffel-napautus-tf223-1831.png).
  NUI luovutuksen e7265e201 kärjessä, haara 617d6ca2b:n päälle → pari PT:lle (iPhone pysty Eiffel + ND, iPad) → KK → vasta sitten junaan.
- MERENPOHJA 3D (koe, ei junaan): NS pohjapallo f7cf0bd7c korjasi sinisen reunan (PT katsoi merenpohja-3). Kohokarttalennon maastoraja NUI
  81a9b12b3; PT 18.3x päätti: lento lähtee PYSTYYN (AjoPystyyn), ei rakoa 1,0. Lentoraja-5 c1cde1148 (pystylähtö + alun kerma-usva) JU:n
  Mac-ajossa → yksi video PT:lle (tarkista myös mustat alku/loppuruudut, Seine-kaista z8 ja Montmartre ×15-kartio mainitaan KK:lle) → KK.
- iPAD: JU:n f1c-skripti korjattu (devicectl --console suljetaan pid:llä ennen käynnistystä; 10002/POSIX 22). Uusinnat jonossa: pohjapallo
  pp3 (f7cf0bd7c), FPV A/B 2fa367316 (B ei ollut vika, vaan launch-tila), NS kohokalotit 300e9923f. Tulokset: NS → PT.
- FPV-DRONE A|B: KK odottaa; viivästynyt launch-jumin takia (KK:lle kerrottu).
- TOPOESITTELYT: eivät junassa; omistajalle vasta iPad-ajona Williamin äänellä.
- JU uusi sessio (luovutus 7e3a958a9); PT pyysi 18.38 lukemaan sen, jos ei vielä luettu.

## LEVY
KK tyhjensi CoreDevice-välimuistin 78 Gt (omistaja 17.4x). PÄIVÄSIIVOUS (omistaja "Saa"): Raamattu 12.19, PR 6503 (c0c29265e),
_levy/simu_yosiivous.py --paiva --aja, Postivahti ajaa alle 30 Gi:ssä. Levy 18.02: 71 Gi.

## NOLLAUKSET ILTAPÄIVÄLLÄ
KS, NS, NUI (3×: 9995c8f42, 831629bcd, e7265e201), JU (2×: 44b7db395/e9b566567, 7e3a958a9). PT nollautuu nyt.

## OPIT
- Junariviä ei kirjoiteta käsin: hook hylkää; käytä juna.py lisaa/valmis/tf (valmis vaatii, että kohta on ensin Työn alla).
- Haaran poiminta voi raahata hyväksymättömiä committeja (697116a8e toi kohokartan + topoesittelyt): tarkista git log kärki..haara ennen lupaa.
- iPadin "failed to launch" ei ole käännösvika ennen kuin muu ajo samalla iPadilla on epäonnistunut; katso ensin skripti/console.
- TF:n levyraja 30 Gt: tarkista df ennen vientilupaa.
