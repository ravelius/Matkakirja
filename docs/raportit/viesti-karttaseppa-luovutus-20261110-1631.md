# Karttaseppä: luovutus 10.11.2026 klo 16.31 (KS)
Syy: konteksti 30 % (hook, Raamattu 7.37). Korvaa -1158:n.
Työlista: `python3 -I /Users/Shared/Claude/Matkakirja-fable/tools/asemataulu/tyolista.py seuraava KS` (rivit kirjoittaa PT, osa vanhentunut: RK koodilla tehty, pino 7 valmis).
HUOM kello: aja `date` ennen jokaista aikaleimaa.

## SUUNTA: OMISTAJAN PÄÄTÖS 16.17 "Maltillinen korostus" (PT:n välitys) + omistaja 16.18
"Kaikki nähtävyydet samassa suhteessa hieman todellista suurempina: erottuvat yhdellä vilkaisulla, eivät peitä kortteleita. Uudet kuvat ennen junaa."
- YKSI yhteinen kerroin K kaikille Pariisin nähtävyyksille, keskinäiset suhteet oikeat (Sainte-Chapelle ei ND:tä isompi, Eiffel korkein); RK ja ND
  tunnistettavat viistosta ja lähimmältä kameralta; kyltti ei peitä mallia, malli ei naapurikortteleita. K kuvista itse (kokemus, ei numero).
- 16.18: raivatut talot/korttelit takaisin uuden koon mukaan (raivaus vain sen verran kuin korostettu malli peittää). Samaan iPad-pariin.
- KS tekee kertoimen yhteiseen koodiin ja kertoo K:n VS:lle (VS sovittaa Eiffelin). iPad-ajo JU:n vuorolla → parit samoista kolmesta kulmasta
  (lähin, lähin-70, viisto) + lähikuvat mallien ulkonäöstä (ND:n tornit) PT:lle → PT/KK-kortti "kelpaako junaan".

## TEHTY (proto-repo, worktree /Users/Shared/Claude/wt/proto-karttaseppa-notredame, haara karttaseppa/korostus, EI pushattu, ei junassa)
- 93ba52043 KS: komento `korostus K` (0 = nykyiset). Korostus.cs (puhdas, testattu). Nahtavyysalue: Malli.TodPituus/TodKorkeus 11 mallille, kärjet
  skaalataan latauksessa akseleittain (vaaka K·L/pisin vaakamitta, pysty K·H/korkeus), normaalit ja varjo skaalatuista, alue latautuu uudelleen K:n
  vaihtuessa. OhjelmaKohteet: Pariisin NimiEste- ja Korvaa-kohteet × K (sillat, Concorde ennallaan). Testit 740/740, unity (sh) 0.
- c1e811eed VS (ff kärkeen): koodimallin kyltti piilotetun Tripon (korostettu) jalanjäljestä → kyltti ei tornin juurelle. **iPad-ajo tällä.**
- Todelliset mitat (L × H m): ND 128×96, SC 36×75, Louvre 700×40, Eiffel 125×330, GP 240×45, RK 50×50, Panthéon 110×83, Opéra 173×62,
  Invalidit 400×107, SC-kirkko 85×83, Montparnasse 50×210. Tripo-mittojen mittari: _tyo/karttaseppa/korostus/mitat.py.
- Mac 43 + iPad I3 (vanha 20fed45ff) katsottu ja PT:llä 12.13/14.55 (kuvat koodimallit/kuvat/u3, ipad-i3; havainnot koodimallit/parit-rk-nd-20261110.md).

## KESKEN
1. **Mac 44 JU:lla** (käynnistetty 16.2x, 93ba52043): _tyo/karttaseppa/korostus/sk-mac-korostus.txt → lokit/karttaseppa-korostus-93ba52043,
   24 kuvaa nyt/k15/k20/k25 × yleis, rk-lahi, rk-viisto, nd-lahi, nd-viisto, nd-lahin. Parit: `python3 -I _tyo/karttaseppa/korostus/parit.py <loki> k15 <U-kansio>`.
   Katso täysikoossa (rajaukset koodimallit/skriptit/rajaa-*.py-mallilla). VALITSE K. Huomio: Louvre (Tripo 860 m) ja Invalidit (400 m) ovat jo lähes
   todellisessa koossa: K > 1,2 kasvattaa niitä ja ne voivat peittää kortteleita; koodirakennukset (Madeleine, Saint-Eustache…) × K naapuritalojen päällä?
   Tarvittaessa vaakakerroin rajataan (esim. max todellinen + 20 m) – mutta päätös kuvista. K → VS:lle heti.
2. **Raivauksen palautus** valitulla K:lla: SUUNNITELMA _tyo/karttaseppa/korostus/SUUNNITELMA.md (lue). Testattu K 1,5:llä:
   - tee-raivaus.py <K> 4 <ulos> → 7 alueen maskit + pohjat (-kXX.png); RK 19/20 palaa, Eiffel 103/111 (k15-d5/ = testi).
   - tee-talot-nd-k.py <K> 3 <Resources> <työ> <ulos> → ND:n saari (nd-k15/ = testi: 135 palaa, 6 esteessä, 4 eroavaa palaa).
   - Koko Pariisi: KAIKKI=1 KORVAUS=<korvaus-k.json (v22-korvaus + uudet maskit, eiffel/montparnasse lisättynä)> tee-talot-nd-k.py … → eroavat palat →
     palat-v23-kXX = v22-klooni + eroavat + indeksi yhdistettynä → Mac `talot kansio`, iPad Documents (JU).
   - Pohjat Resources/NotreDameKoe + meta (uusi guid) → uusi commit → skenaariossa `koepohja <alue> NotreDameKoe/<kuva>` (vaihto ajon aikana).
   - Avoimet: Eiffelin/Montparnassen puut palaavien talojen päällä? TaloPoistot ei uusita nyt (3D-talot peittävät).
3. iPad-ajopyyntö JU:lle (kärki c1e811eed + pohjat), parit nyt | K PT:lle ≤ 3 riviä.

## Levy (PT 16.2x): tehty, 63 Gi vapaana. Kohokartan raaka EI siirretty (omistaja 9.11. rajasi sisäiselle levylle) – PT:lle kerrottu.

## Vahdit
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min, viritä uudelleen).
- Mac 44 kuvavahti: until-silmukka lokikansion png-määrälle (24).
