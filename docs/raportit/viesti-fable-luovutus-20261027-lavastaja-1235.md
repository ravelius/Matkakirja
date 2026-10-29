# Lavastajan luovutus 27.10.2026 klo 12.35 (jatkaa luovutusta -20261027-lavastaja, 8b593ab95)

Kansio K = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/kielletty-rakennukset, H = …/linnanrakentaja/havainne-kuja40.
OMISTAJAN PÄÄTÖS 27.10. 10.56 voimassa: valon leivonta SEIS, muoto havainteen mukaan alue kerrallaan (kujat → aukio → 04 → 06/07).

## Tehty tässä sessiossa (kaikki leipomatta)
1. Kujan 01 reunakivi sokkelilinjan mukaan: kuja on kiertynyt ~−2° (sokkelit vasen −138,6 → −141,4, oikea −132,4 → −135,6).
   K/tyokalut/kuja01_sokkelit.py (avoimet sijoituksen kautta, leikkaus y 0,1) → K/yksikerros-v73/kuja01-sokkelit.json;
   kuja01_reunakivi2.py: 18 suoraa palaa (sovitus, ovivälit auki – kynnykset avoimissa), vanha suora kivi pois.
2. Kujan 01 lattia kujan suuntaiseksi porttiin z 444,5 (kuja01_lattia_kierto.py; Q = sokkelilinjat 0,3 m seinän alle; palat 1-3/1-4
   leikattu, z 436–438 tupla pois) + reikä z 437,9–438,55 paikattu (lattia_reika_paikka.py). Peitto: kujassa 0 tuplaa, 3 rajaruutua.
3. Aukio-1-1: rako z −192,9…−192,5 x 0,9…9,3 täytetty, 15 litistettyä sirua pois (lattia_saumat_kiinni.py, TASOON=1 YHDISTA=0.004;
   3 mm:n yhdistys ilman tasoon-vaihetta hävitti kasvoja x 64–67!). Jäljelle jääneet "T-liitokset" ovat kollineaarisia kärkiä;
   VS:n tarkistin (tarkista_leivonta.py) vaatii leivotun valon → varmistus vasta leivonnan jälkeen.
4. Avoimet-v55 (K/leivottu-sali/avoimet-v55, avoimet_pinnat.py, Codex juoksupinnat-v1): V4_ristikko ← 1071 OPAQUE toisto 0,9 m;
   uusi V4_kannatin (MASK 0,5) ← 1068 nauhana 2,74–3,29 m muurikatteen edessä räystään alla (räystään alapinta seinälinjalla 3,30 m,
   muurikate 3,16 → 0,55 m ei mahdu katteen yläpuolelle). Blender-kuva: kannatinrivi ja paperi-ikkunat oikein.
5. Ketju: K/tyokalut/aja_ketju_v73.zsh (muoto-osa = v71 + yllä olevat; leivonta- ja kuvaosa vain dokumenttina, polut tarkistettava).
6. Juuret: H/juuri-v72m (vain reunakivi), H/juuri-v73m (+avoimet-v55), H/juuri-v74m = UUSIN (yksikerros-v73 + avoimet-v55) → NUI pareille
   (01 02 05, 03 03b) ja VS:lle ilmoitettu.

## Avoimet kysymykset (lähetetty, ei vastausta klo 12.35)
- VS: 1070 pariovi – kuva 1:2 pysty, ovi 2,38 × 1,79 m → venyisi 2,7×. Vaihtoehto: kuvan ristikko-osa ruuduiksi lehteen. V4_ovi-UV jo
  0–0,5/0,5–1 lehdittäin, joten vaihto on avoimet_pinnat.py:hin yksi lisäys.
- VS: 1069 – räystäällä on jo kultaiset päätylaatat (Katto paatylaatta r 0,10, y 3,14–3,65): korvataanko 1069-nauhalla vai nauha alle?
- PT: luovutuksen kohta 3 "T-risteys (−134; 294) harmaa marmorijalusta y 0,4–0,6 z 286–292, vaalea kaistale, katon kulma" – lähdettä
  ei löytynyt (alueella pala 1-3:n halli x −135…−125 z 283–290 marmorijalustoineen). Odottaa tarkennusta.
- PT (löydös): g-jalustassa on jo 3 tasoa + kaiteet + porraskaiteet LOD0:ssa; aukion 03 pelikuva näyttää LOD2:n (198 kolmiota) →
  pelin LOD-valinta (origosta?) PK/NUI:lle. Aukio 03/1–2 ei siis vaadi muotoa, jos LOD korjataan.

## Seuraavaksi
1. Vastaukset yllä → 1070/1069 avoimet_pinnat.py:hin (avoimet-v56), T-risteys.
2. NUI:n parit juuri-v74m:llä → korjaukset.
3. Aukio 03/4 sivuhallit (havainne punaiset paviljongit kattoineen, peli matalat laatikot) – taustan rakennukset rakennusmalleiksi;
   sitten 04 (juhlasali: pylväät paksummiksi, jalusta), 06, 07 EROLISTAn (H/EROLISTA-20261027.md) mukaan.
4. Rakennuksiin (rakennukset-v51) 1068/1069 vasta kun avointen versio hyväksytty (rakennuksissa ei V4_ovi/V4_ristikko-materiaaleja,
   kujaporttien ovet V4_portin_ovi).

## Opit
- Avointen glb:t muokataan puhtaalla Pythonilla (avoimet_*.py-tyyli): uudet kuvat/materiaalit/solmut puskurin loppuun, muut tavulleen.
- Peittokoe ilman leivontaa: K/tyokalut/lattia_tuplat.py <lattia_peitto_apu.py> <kansio> x0 x1 z0 z1 ruutu <palat…> (ylöspäin |y| < 2 cm,
  > 1 = tupla, 0 = reikä; kujan linjat koodissa kujalle 01). lattia_ylakuva.py piirtää palat väreittäin ylhäältä (saumat näkyvät heti),
  render_alue.py renderöi taustapalat + avoimet sijoituksineen kamerasta (x y z → kohde x y z). Python: /opt/homebrew/bin/python3.

## LISÄYS klo 12.4x: vastaukset ja uudet tehtävät (tulleet luovutuksen jälkeen, sitovat; lue ennen "Seuraavaksi"-listaa)
- VS 1070: avointen pariovi pysyy nykyisellään (V4_ovi). 1070 vain aukkoihin, joiden lehti ≥ 1:1,6 pysty (hallien/porttien korkeat ovet), ei venytystä.
- VS 1069: KORVAA kultaiset päätylaatat (Katto paatylaatta) 1069-nauhalla (laatta + tippa) lappeen kulmassa räystään reunassa,
  laatan keskikohta nykyisten laattojen kohdalle; vanhoja ei jätetä alle. → avoimet_pinnat.py:hin, avoimet-v56.
- VS friisit-v2 (SHA OK, saumat tasoitettu): /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/friisit-v2-sauma/ (1058 sha256 04801a3c…,
  1067 0b6485fc…). V4_palkkivyo ← 1067 (yksi kuva ≈ 3,2 m × 0,8 m), 1058 muurin harjan alle turkoosiksi vyöksi (≈ 4 m × 0,5 m, havainne 02).
- VS v73m-parit: /Users/Shared/Claude/proto-3d/lokit/havainne-editori-20261027-122051/ (1071 toimii). Kujan 01 näkyvimmät räystäät ovat
  TAUSTAPALAN 1-3 rakennuksissa (itäpuoli): sama sarja niihin: V4_palkkivyo ← 1067, räystään alle 1068, reunaan 1069, harmaat räystäslaatat
  (V4_harmaa) → V4_teal tai 1058. Ilmoita VS:lle juuri-v7x → parit.
- NUI v72m-parit: havainne-editori-20261027-121714/ (RAPORTTI.md EROLISTAn numeroin, KK:lla). Reunakivi näkyy, 02 sokkeli lähellä. Suurimmat
  erot: 01/1–3 (ovet, kynnykset, ikkunat), 01/6–7 (räystäs, katot), 02/1 (harjakate), 05/1 (ovien kulma).
- PT kohta 3 (T-risteys −134; 294): edellisen LR:n oma havainto. Linja: vertaa havainteeseen samasta kamerasta; jos havainteessa ei
  jalustaa/kaistaletta → poista, jos on → muotoile; katon kulma havainteen räystäiden mukaan (C1). Ei omistajakysymystä.
- PT Codex-posti 77e5cde51 (claude/postilaatikko, posti/pelikoodari-codex-rakennusmoduulit-toimitus-20261027.md): C1 räystäs 1055 +
  C3 muurikate 1057 Tripo-GLB:t (T7: …/juoksupeli-rakennusmoduulit-20261027/review-modules-v2/), 3 % limitys. LR: sovitus kujaan,
  sivukamerat + z-fighting, sitten parit NUI:lle. Friisit 1058/1067 → VS (tehty, yllä).
- PT Codex-posti adf64e924 (posti/codex-pelikoodari-c2-portaiden-kaltevuus-20261027.md): LR VASTAA postilaatikon kautta (ei PK):
  (a) C2 vino paneeli 1063: Taihemenin/Taihedianin portaiden nousu + etenemä (tai kaiteen kulma), tarvittavat eri kulmat, paneelin
  pystykorkeus suhteessa 1,1 m pylvääseen (lähteet: kk_rakennelmat.py portaat/portaskaide, kk_portit.py; g-jalusta tasot 3 × 2,71 m);
  (b) 1056-kulmapala: linja 90° rakennusnurkan ulkonurkan 45° jiiripuolikas.
- Järjestysehdotus: (1) Codexin vastausposti (pieni, odottaa), (2) 1069 + 1067/1058 avoimiin ja taustapaloihin → juuri-v75m VS:lle,
  (3) C1/C3-sovitus kujaan, (4) T-risteys, (5) aukion sivuhallit.
