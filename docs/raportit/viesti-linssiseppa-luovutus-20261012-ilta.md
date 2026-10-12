# Linssisepän luovutus 12.10.2026 ilta (tilinvaihto, PT 19.3x)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Käännös- ja simuvuorot vain Julkaisijalta
(KÄÄNNÖS NYT kirjoittaa `kaannos-<nimi>.nyt` + `linja-<nimi>.txt`, SIMULAATTORI NYT `simu-<nimi>.nyt`); ilmoita LUKKO VAPAA / SIMU VAPAA.
Ajoskriptit ja skenaariot: proto-3d/tyokalut/linssiseppa-ajot/ (ketju-*.zsh, sk-*.txt, kuormaportti-*.zsh pitää simuportin kunnes
1 min kuorma < 40; museo ilman Googlea = poikkeus). Ketjut irrotettuna `perl -MPOSIX=setsid -e 'setsid(); exec @ARGV' zsh …`.
Käännöspalvelu yhdistää haaran MASTERIN päälle → `git merge-tree --write-tree master HEAD` ennen pyyntöä.
Testit: `sh Linssit-testit/kaanna.sh` (EI zsh), `zsh tyokalut/tarkista.sh`. Aiempi luovutus: viesti-linssiseppa-luovutus-20261011-ilta.md.

## 1. ENSIMMÄISENÄ: TAIDEHALLIN OMISTAJAPALAUTE 19.1x (v5b, kolmikot 1–2)
Omistaja sanatarkasti: "ei taulu ole oikeasti tuollaisessa syvennyksessä. syvennyksen takana on oikeasti ihan normaali huone. lisäksi
kehys menee nyt liian vaaleaksi osassa ja liian tummaksi toisessa kohtaa. samoin itse kuva. vertaa huolella itse kehystä ja kuvaa
pelissä ja kuvassa ja tee peli samanlaiseksi. kannattaa katsoa lisää kuvia museosta niin näet miten se on oikeasti. nyt ihmiset
peittävät näkymää ja se saattaa huijata sinua".
PT:n tehtävät: (1) ≥ 6 Commons-vertailukuvaa (CC/PD, tekijä + lisenssi): Kunniagallerian päätykaari + sen takana Yövartion sali
(Nachtwachtzaal) eri kulmista ilman väkijoukkoa, Yövartion kehys lähikuvana; katso jokainen. (2) Kaaren taakse oikea huone, Yövartio
sen takaseinälle oikeaan kokoon (379,5 × 453,5 cm), syvennys pois. (3) Taulu ja kehys tasaisesti valaistuiksi (ei vaalea/tumma-liukumaa);
kehyksen väri, profiili, leveys ja maalauksen kirkkaus/värit kuvien mukaan; mittaa sama kohta pelissä ja kuvassa ennen/jälkeen.
(4) Nuolirivit (tehty). Sitten PT:lle NYT | UUSI | OIKEA (oikeana väkijoukoton kuva) + Yövartion lähikuva + vertailukuvien lista.
**TILA 19.4x:** taustalla Opus-agentti (sama, joka teki v3–v5b: Blender-paistot _valmiit/taidemuseo-alankomaat-v3/, ajoskriptit
lahde/aja_*.zsh, paketit _valmiit/taidemuseo-alankomaat-v<N>-vienti-20261012/) tekee v6:n: vertailu/v6/, sali-v6, Unity-muutokset
haaraan linssiseppa/museo-sali3-184 (wt proto-linssiseppa-sali3). Jos agentti ei enää jatka (tilinvaihto), aloita kohdasta 1 itse:
v5b:n kuvat ja mittaukset ovat lokit/taidehalli-v5b-taulut-20261012/ ja esikatselu/v5b/. Vienti ämpäriin vain Julkaisijan vie-paketti.sh:lla.
Paistot väistävät käännöslukkoa (voi jonottaa tunteja) → pyydä Julkaisijalta 40 min paistoikkuna heti, kun paisto on valmis alkamaan.

## 2. Museon junahaara 184 = linssiseppa/museo-lahestyminen-183 (wt proto-linssiseppa-lahestyminen)
- **9e5b294f3** = 1d8838490 (merge sali3 618e606dd + lähestyminen 47ce13980) + Yövartion nuolirivit (MuseoTaulu.cs on NUI:n; NUI tietää).
  - sali3 618e606dd: sali-v5b (ämpärissä), UudenLeivottuKehysvarjo = false, sokkeli_tumma karheus 0,55, taidemuseo julkaistu (pois
    KESKENERÄISET, 75762cdf2).
  - lähestyminen 47ce13980: leijunta korkealla kunnes laatat 80 % (LaskuAste), enintään 15 s (LeijuntaMaxS; QA "museo lahestyminen
    aikaraja <s>"). iPad-mittaus 000654cba: 45 % 6 s:ssa, 65 % 23 s:ssa. Esihaku tekemättä (tuplamuisti) → myöhempi mitattava erä.
- Käännös sali5d (Julkaisija linja 1, 19.18) → ketju-sali5d-184.zsh → iPad-simu sk-sali5d-184.txt (lähestyminen pois) → 3b + kolmikko-3
  uudelleen (kolmikko.py: scratchpad-skripti, K natiivikorkeus, leveys ≤ 7900 px; KÄYTÄ kuvat/raaka/<id>.png, EI .kiertamaton.png).
- v6 tulee sali3-haaraan → yhdistä sitten lahestyminen-haaraan (ristiriidat MuseoSovitin.cs: SaliAuki-kävelyehto + elämän luonti molemmat).
- LS2:n Google-istuntokorjaus ff77f6b67 (linssiseppa2/raketti-184b, LS1 katselmoi ja hyväksyi): CesiumKaupunki lepo-tileset,
  MuseoAuki = false Sulje-metodin ENSIMMÄISENÄ; mergessä LS1:n Sulje-lohko sen perään sellaisenaan.

## 3. Muut 184-erät
- **Pallokierros Praha + Lontoo** linssiseppa/pallokierros-praha-lontoo-184 **14c19dbd6** (data pallokierros-v2: KS Josefov silma_m
  35–50, Trafalgar 40–55), käännös 1344b49cc; ketju-pallokierros-184 odottaa kuormaporttia. Ensimmäinen ajo 0cab54294 (17.58–18.24):
  kaikki pysähdykset OK paitsi Josefov/Trafalgar kattojen sisällä; ääni ei tallentunut (NS korjasi todistusajon 3b5956329) →
  uusinnassa kuuntele tšekkiläiset nimet aani/pallokierros-praha.wav → PT.
- **Katso2** 96973b93e, käännös 1e4e6a090; ketju-katso2-184 odottaa simuporttia.
- **Pallokisa** linssiseppa/pallokisa-184 (wt proto-linssiseppa-pallokisa) **cfb100db5** (⊃ Pelikoodari 9d2567502); ketju-pallokisa-184
  odottaa kaannos-pallokisa.nyt. Avoimet: nipun kiinnityspiste kuvasta (sk-pallokisa-184 p03), piilotettujen koristepallojen polttimen ääni,
  ElavaKohdeHaivytys-varjostin kääntämättä.
- **Maa v2** ketju-maav2b-184 odottaa simuporttia.
- Skenaarioissa (katso2, pallokierros, pallokisa) `linssi kaupunki google 1` (LS2:n korjauksen jälkeen automaattiajo = varadata).
- PT: Google-ketjut ajetaan (uusi Cesium-tili); jos Google torjuu → kirjaa ja jatka.

## 4. Siivous ja säännöt
- Worktreet 12.10.: jäljellä sali3, lahestyminen, katso2, pallokierros, pallokisa, maav2 (muut poistettu, haarat tallessa).
- Appikopiot lokit/linssiseppa-app/ (maav2-184, testi-183d, katso2-184, pallokierros-184, pallokisa-184, sali5d-184) tarvitaan ajoissa.
- Omistajalle kuvat täydellä tarkkuudella; Blender-esikuvat EIVÄT mene omistajalle (vain pelikuvat).
- VAATII TOIMIA → ArtifactData talo/toimi-linssiseppa (url https://claude.ai/artifact/Rq5ajPU4SraE2XKd7BYAix).
