# Julkaisija: luovutus 6.11.2026 klo 08.55

Rooli: Julkaisija (JU). Korvaa -0651:n ALOITA-osan. Voimassa: -0651:n, -0041:n ja -2347:n VIRHEET JA OPIT, -2152:n TAPA, JUNA 219 ja OPIT (haara julkaisija-luovutus-2152), -1906:n TAPA ja -1812:n SITOVAT LINJAT. T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt.

Syy: konteksti 25 % (pehmeä raja, Raamattu 7.37).

## ALOITA TÄSTÄ
1. Tilanne 08.55: L1 ja L2 vapaat, jono tyhjä, JU:n taustaajoja ei kesken.
2. Käynnistä lukkovahti Monitorina (zsh T/lukkovahti.zsh, 30 min, uudelleen päättyessä).
3. Odottaa muita: KS katsoo yhteisen ajon 0b4d74011 kuvat (lokit/karttaseppa-yhteinen-4-0b4d74011) ja pyytää seuraavan, jos tarvitaan. LAV ja PK pyytävät tiheästi.
4. Yhteisen ajon nykyinen kärki on KS:n haara karttaseppa/ajo-yhteinen-tasoitus (0b4d74011, kansio /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen). KS kokoaa sen: VS, NUI ja NS antavat sha:nsa KS:lle. JU ei yhdistä näitä itse.
5. PT 08.40: seuraavassa yhteisessä ajossa kysy KS:ltä, mitä kuvia voi jättää pois. 30 kuvaa oli perusteltu poikkeus, ei uusi vakiokoko; omistajan 17.51 ja 17.58 ovat voimassa. Sama sana on jo KS:llä.

## AJETTU 07.01–08.54 (jonolokissa kesto ja kuvat)
KS e263b4b73 (7), 66d11e617 (6), df5560fd8 (6), 7c5bca160 (5), e31682e02 (5). PK ajoi itse 1c91c8ba8 (2), 337fc3cdc (2), 38c75624c (2). LAV ajoi itse aukot4 (5), aukot5 (5), aukot5f (5), aukot5g (5); JU ajoi aukot6 (5). Yhteiset 579ea327c (8), 127346f24 (18), 382618036 (11), 0b4d74011 (30, 885 s, varjostinmuutos mukana). Kaikissa exit 0, ja JU:n ajamissa 0 PUUTE, 0 Shader error, 0 error CS. Kuvia en katsonut; tekijät katsovat.
Palautetut: VS sk-maa5 16 → 9 kuvaa (kasvoi sitten 11:een ja meni KS:n yhteiseen), LAV aukot5 8 → 5 kuvaa.

## VIRHEET JA OPIT
- Yli 5 kuvan yhteinen ajo: päästin 30 kuvaa perustelulla ja kerroin PT:lle samalla, että se voi pysäyttää. PT hyväksyi. Tee näin isoissa, älä jää odottamaan, kun L2 on vapaana muille.
- Viesteissä "KK:n nimeämä" ja "omistaja HH.MM" ovat roolin ilmoittamia. Kirjaa ne jonolokiin niin, ellei varmistettu.
- Tarkista yhteisen ajon sisältö: git merge-base --is-ancestor jokaiselle luvatulle sha:lle. Näin selvisi, että VS:n e46ad3592 puuttui 382618036:sta, vaikka VS sanoi KS:n kokoavan sen. Ajoin silti ja kerroin molemmille; KS otti sen seuraavaan.
- Skenaarion talot kansio -polut (palat-v3, v4, nd-ranta): tarkista ls:llä ennen ajoa ja lopuksi MATKAKIRJA talot: kansio unity.logista.
- LAV:n pyynnöstä voi puuttua "ajaja": aukot6:ssa JU ajoi, koska pyyntö oli "Aja ... ilmoita". 404-rivi tulee skriptin tulosteesta, lista kuvat-kansion 404.txt:stä.
- zsh: print "--- ..." kaatuu (bad option); aloita teksti muulla kuin viivalla.
