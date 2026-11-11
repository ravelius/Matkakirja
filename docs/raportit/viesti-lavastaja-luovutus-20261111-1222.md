# Lavastaja: luovutus 11.11.2026 klo 12.22 (konteksti pehmeä raja)

Edellinen: viesti-lavastaja-luovutus-20261111-1145.md (haara lavastaja/luovutus-20261111-1145). Työpolut juuren
/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/ alla. Loki: muuri/KORJAUS.md (loppu 12.0x–12.19). JU local_2a7d6c96, PT local_8d8ebf72,
PK local_d3bb1f78, KK local_d5f31591, NS local_0f7f169f, Postivahti local_1f31f830. Kellonajat `date`:lla.
OMISTAJAN PÄÄTÖKSET: 11.09 juoksupelin peruskorjaus KK:lla; v133 ja uusintaleivonta loppuun. 12.15 (PT 12.2x): ison iPadin juoksupeliajot lopetettu
toistaiseksi, iPad-todisteita EI tilata, Mac-ajot jatkuvat; iPad-ajoa odottavat työt tilaan "odottaa KK:n iPad-erää".

## TAUSTA v133 -> v133b -> v133c (PK:n kulkukartta löysi kaksi tee_a/tee_ikkuna-vikaa)
- v133b (_valmiit/juoksupeli-kk-lavastaja-tausta-v133b-vienti-20261111, SHA 32efdc10a285): muuri/v133b/tee_a4.py: 1-1 + 1-0 sokkelin kannen
  kärkisiirtojäänteet pois (1-1 katkaisi pihan tasolta 1). PK: piha auki +3185 m2.
- v133c (_valmiit/juoksupeli-kk-lavastaja-tausta-v133c-vienti-20261111, SHA 75050a915aad, 1 tiedosto eroaa v133b:stä): muuri/v133b/tee_l1.py:
  1-0:n kujan lattia (v132:ssa 8 lattiakolmiota materiaalilla V4_ikkunakehys y 0,46 -> tee_ikkuna poisti) palautettu V4_lattiana y 0. Koko taustan
  tarkistus reiat.py (muualla < 2 m2/ruutu suikaleita). Lähde koejuuri katot-v125/koejuuri-m1/kielletty-tausta-v129 (= v133c).
- PK ajaa kulkukartan v133c:llä (12.2x), sha JU:lle ja PT:lle. ODOTA PK:n tulos; uusi vika -> sama tapa (poistuneet.py/vaakapinnat.py/ylhaalta.py v133b/).
- Ovet: 246. ovi = 碧螺亭 (ikkunalautojen poiston sivuvaikutus tod.näk.), 漱芳斋:n ovi siirtyi (-97,7; 490,0): LAV ei muuttanut mitään 7 x 6 m:n sisällä
  -> PK:n ovenhaun tulos; PK tarkistaa aukioajon kuvista. Vastattu PT:lle ja PK:lle.

## KÄYNNISSÄ: LEIVONTA-V5 (uusintaleivonta), ajo-leivonta-v5.log, leivonta-216/uusinta/leivonta-v5.zsh
- Lähteet: tausta-v133c, rakennukset-v127 (+ F2-käännös: t-portti-m15/zhongzuomen 14 sisäänpäin osoittavaa marmorikolmiota, v5/kaanna_sisaan.py),
  muurikate-v40, osasarja-v15 (varjostaja leivonta-216/osasarja-v15-varjostaja.glb), PUUT_VARJ lahipuut-v17, aurinko f4df529a6, v4:n arvot.
  Ulos leivonta-v5/kielletty-{tausta-v134, rakennukset-v128, muurikate-v41, osasarja-v16}. Jatkuu valmiit/-merkeistä (zsh leivonta-v5.zsh uudelleen).
- Tila 12.20: tausta 0-0...0-4 valmiit (v133b-lähteellä; ero vain 1-0:n reikä naapurivarjostajana, merkityksetön), 1-0 leivotaan uudelleen v133c:llä.
  Taustapala ~3 min, sitten muurikate, rakennukset 156 (~256 näytettä), osasarja. v4 kesti ~10,5 h.
- ÄLÄ MUOKKAA leivonta-v5.zsh:ää ajon aikana (zsh lukee skriptiä ajossa): pysäytä ensin omat PID:t (pgrep -f "zsh leivonta-v5.zsh", pgrep -x Blender).
- Levyraja 25 Gi (vapaana ~50).
- SALI (vaihe 5): v5/aja_sali.zsh + v5/sali.env (PK: AvoimetKansio = avoimet-v52; UUSI nimiehdotus avoimet-v58s: tarkista PK:lta, junat.json
  mainitsee avoimet-v58). avoin_leivo.py KATTO_VARJ=1 (lisätty, varmuuskopio .ennen-kattovarj), AZ 110 = 70° salin kehyksessä (glb −Z pohjoinen),
  EL 45, v51:n arvot (KERROIN 2, 4096 näytettä, SUODATA_R 2). liita_valo.py korvaa valo_rgbm-kuvan. AJAMATTA JA KOKEILEMATTA: kokeile pienellä
  NAYTTEET=64 ennen kuin v5 pääsee vaiheeseen 5 (Blender vain yksi kerrallaan -> koe vasta v5:n jälkeen tai sen välissä).
- Paketti (vaihe 6) vasta kun sali valmis; tarvitaan LAHTEET-leivonta-v5.md (leivonta-216/uusinta/, kirjoita ennen vaihetta 6, muuten cp kaatuu).

## SEURAAVAKSI
1. PK:n v133c-tulos; v133c junaan JU:n kautta PT:n kuittauksella (iPad-todisteita ei tilata).
2. Leivonnan seuranta; salin koe; LAHTEET-leivonta-v5.md.
3. Parit suoraan KK:lle (Mac-ajot): F2 (kamera -92.5 2.4 -8.3 180 8 60, vanha | uusi), ik-1-3 haaleat suorakaiteet; NS puun lähikuvapari.
4. Jonossa: a41 kulmaläppä, a22 lattian vino sauma (yhtenäinen lattia), ik-2-3 harjasauma, F3 (paikka PK:lta).
Asemataulu jäädytetty (hookin päivityspyynnöt ohitetaan). Worktreet ennallaan + wt/lavastaja-luovutus-1222.

## LISÄYS 12.3x
- LEIVONTA-V5: kk-tausta-1-2 EPÄONNISTUI 12.25 (2 verkkoa: tausta + katto-longzongmen -> leivo_valo assert). Korjaus valmiina: leivo_valo.py YHDISTA=1
  + leivonta-216/uusinta/v5/tausta-1-2.zsh (liittää, leipoo, katto_erota v4:n arvoin, tarkistaa kolmiot 1041). AJA kun Blender vapaa (v5:n jälkeen),
  ENNEN pakettia: zsh v5/tausta-1-2.zsh >> ajo-leivonta-v5.log 2>&1. Muissa paloissa vain kujien lattia_alusta (leivo_valo hoitaa).
- 漱芳斋: −Z = ETELÄ maailmassa (PK tarkisti). Eteläovi pidetään; LAV:n palautuspyyntö peruttu. (Salin oma kehys: −Z = pohjoisovi, eri asia.)
- PT/omistaja 12.21–12.22 (Raamattu 12.26.5): isolla iPadilla VAIN KK:n nimeämä valmis kokonaisuus ennen versiota; LAV ei tilaa iPad-ajoja.

## LISÄYS 18.2x
- LEIVONTA-V5:N TYÖKANSIO SIIRRETTY: leivonta-216 on symlinkki T7:lle (95–97 % täynnä, PT: älä kirjoita) -> leivonta-v5 nyt
  /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/leivonta-v5-tyo (vanhassa polussa symlinkki; skriptit toimivat ennallaan).
- 48 rakennusta (v-ulkomuuri-027…075, lista leivonta-216/uusinta/v5/mustat.txt) leivottiin MUSTINA 16.11–18.03 äpin kaatumisen (16.08) jälkeen
  (VALO max 0.0; syy tuntematon, uusinta 18.1x toimi). Merkit poistettu, uudelleen 18.09 alkaen. leivonta-v5.zsh pysähtyy nyt mustaan tulokseen
  ("VIKA: rak … MUSTA") -> tarkista syy (koe v5/koe-musta2.zsh <malli>), aja uudelleen.
- Tila 18.11: tausta 22/23 + muurikate valmiit, rakennuksia 79/156, sitten osasarja; tausta-1-2.zsh ja sali ajamatta.
- KK 18.06 (pala 3, pintojen leivonta) vastattu: leivonta-v5-tyo/VASTAUS-KK-1806.md + mittaus-kk-1806.txt (v5/tiheys.py). Pala 3:n tehtävänanto tulee KK:lta.

## LISÄYS 18.3x: KK:N PALA 3 -TEHTÄVÄNANTO (KK 18.15) – SEURAAJAN TYÖ
LUE KOKONAAN: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-pintojen-leivonta-pala3-tehtavananto.md
- 3.1: leivonta-v5 loppuun kuten nyt (48 mustaa uudelleen, tausta-1-2.zsh, osasarja, sali PIENELLÄ KOKEELLA ensin) -> paketti.
- 3.1b TARKKA VALO KULKUALUEELLE (omistaja: kaikki varjot leivotaan, elävä vain pelaajalle): tavoite lattia <= ~8 cm/tekseli (64 m / 1024 ruuduittain
  kuten osasarja), kulkualueelta läheltä nähtävät seinät/terassit <= ~12 cm; lisäksi valo avoimiin huoneisiin, rekvisiittaan, kujien lattia-alustaan;
  kaukotasoille kärkivärit. ENSIN KK:lle: tarkkuuskartta (v5/tiheys.py + etäisyys kulkukartasta, PK:n kulkukartta v133c) + ehdotus tavasta ja
  kestosta (koko polunjäljitys ruuduittain vs. tarkka suora aurinko + nykyinen karkea epäsuora). EI tarkkaa leivontaa ennen KK:n sanaa.
  Vertailukuva lokit/natiiviseppa-juoksu-hahmovarjo-1/V2-elava.png.
- LATTIA: UV0-kuvion yhtenäistäminen POISTUU (kuvio ja valo maailmakoordinaateista). Jäävät: sokkelin juuren porras, vinot reunakivet, raja3;
  UUSI: lattian alueet omina materiaaleinaan (sisä, piha ja kuja, aukio) ja joen kohta leikattuna verkosta (tehtävänannon 3.3).
  Rajaus-/poikkeusehdotus KK:lle ennen toteutusta, PT kopiona. Työlistan rivi "Juoksupeli pala 3: tarkka leivottu valo kulkualueelle".
