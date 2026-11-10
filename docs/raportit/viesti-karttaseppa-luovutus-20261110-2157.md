# Karttaseppä: luovutus 10.11.2026 klo 21.57 (KS)
Syy: konteksti 25 % (hook, pehmeä raja, Raamattu 7.37). Korvaa -2136:n (taustat: git show 68fd36182:docs/raportit/viesti-karttaseppa-luovutus-20261110-2136.md).
HUOM kello: aja `date` ennen jokaista aikaleimaa. Tila myös: /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/koodijuna/tila.md (21.5x) ja ajopyynto.md (LISÄYS 21.5x).
Tyyliohje (KK, sitova näkyvälle työlle): /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-pariisin-nahtavyydet-tyyliohje.md
(osiot KJ4 ja KJ5 lopussa = KK:n palaute), vertailukuvat proto-3d/_tyo/keskustelukanava/tyyliohje/ (esim. kj5-ruudukko.jpg).
NÄKYVÄ TYÖ (omistaja 21.38, koe): karkea kuva KK:lle (local_d5f31591-21fa-4cb0-bab3-bcd3435d075a) suoraan, kopio PT:lle; junaan vasta KK:n katsottua.
Näyttömuoto KK:lle: neljän rajauksen ruudukko Tripo | koodi täysikoossa + yksi kuva kaukaa; yksi kohde kerrallaan.

## Junahaara (ennallaan)
- 599b0150d (proto karttaseppa/pariisi-koodimallit) = 224.42, JU: linkissä 21.48 (61d636b68), KK:lla kokeiltavana.

## TEHTY tässä sessiossa (proto, haara karttaseppa/sacre-coeur-koodi, natiivi-backup; worktree /Users/Shared/Claude/wt/proto-karttaseppa-koodijuna)
- 96374758b LOUVRE tyyliohjeen mukaan: LvKivi 0xE8CCA2 (valaistuna ≈ Tripo 233,195,149), ikkunakehys LvRako 0x7A6A55 (tummat syvennykset), ikkunat hieman isommat
  (kolmiot ennallaan); Cour Napoléon + Grande Galerien ja Rivolin siiven sisäkaistat KatuKartta-tasolla (korostettu ×1,22 malli jätti kartan litteät
  oikean kokoiset siivet ja pyramidin ruskeiksi raidoiksi = KK:n "haamujäljet"); pihat Katu → KatuKartta. Testit 899/899 (Peli-testit/kaanna.sh), unity-tarkistus (sh) 0.
- LOUVREN TALOT mallin jalanjälkeen (omistaja 16.18): _tyo/karttaseppa/koodijuna/louvre-raivaus/
  tee-maski.py 1.2235 4 = OSM relation/3262297 × korostus (Korostus.Vaaka(671 m) = 1,2235 koodimallin origosta) + kupera kuori (pihat, ettei pyramidi ja
  Carrousel'n kaari palaa taloina) + 4 m + kokonaan jokainen koskeva talo; korvaus-lv.json = korostus/korvaus-k2.json, louvre vaihdettu. aja-palat.sh (KAIKKI=1,
  tee-talot-nd-k.py 2 3) → ulos/. palat-v24-louvre-koodi = palat-v23-k2b + 5 palaa (16595_11272, 16596_11271/72/73, 16597_11272); muut 21 tavu tavulta = k2b.
  Louvre-maski poistaa 16 taloa (v17: 171) → 157 palaa (Rivolin pohjoispuoli, Cour Carréen itäpuoli). vertaa.py: koodin laatikot osuvat skaalattuun OSM:ään.
  TÄMÄ ON RESEPTI muillekin malleille (raivaus = korostettu jalanjälki + D): vaihda relation/way, origo, V = Korostus.Vaaka(mallin pisin vaakamitta).
  Peliin vain skenaariolla `komento talot kansio <polku>` (ei StreamingAssetsiin, ei junaan).
- KJ4 (613d32f16) ja KJ5 (5a01b0324) polut viety KK:lle 21.5x ilman suositusta; lokit puhtaat (NRE 0).

## JU:N AJO KÄYNNISSÄ
- KJ6 Louvre 96374758b + palat-v24-louvre-koodi, sk-mac-louvre-kj6.txt (5 kuvaa lv6-kaukaa/yleis/viisto/pyramidi/cour-carree, VAIN koodi; Tripo-vertailu
  vanhoista: lokit/karttaseppa-louvre-koodi-c735240ae/tripo-* samoista kulmista yleis/viisto/pyramidi/cour-carree) → lokit/karttaseppa-louvre-kj6-96374758b.
  JU käynnisti 21.5x. Kun valmis: katso täysikokoisena (haamujäljet poissa? talot palanneet? pyramidi?) → ruudukko Tripo | koodi (_tyo/karttaseppa/koodijuna/pari.py) KK:lle, kopio PT:lle.

## JONO (PT:n viestit 21.5x; viimeisin omistajan 21.56 KK:n kautta)
JÄRJESTYS EPÄSELVÄ – varmista PT:ltä yhdellä rivillä: 21.56-viesti sanoo "1) ENSIN 224.42:n kolme", mutta myös "rivi … jonossasi heti nykyisen (Panthéon…) perään".
A) OMISTAJA 21.56: raivaus kuuluu jokaisen mallin omaan kierrokseen.
   1. 224.42:n kolme (omistajalla nyt): Notre-Damen korvaustalot päälle ja raivaus uuden mallin jalanjälkeen; Riemukaari ja Eiffel tarkistus → seuraavaan versioon;
      ennen|jälkeen läheltä KK:lle. PT:lle luvut kolmesta: raivausala vs. mallin jalanjälki (m²).
   2. Kuusi korjattavaa (Panthéon, Invalidit, Opéra, Louvre, SC, Sainte-Chapelle): kukin KK:lle vasta, kun raivaus = jalanjälki ja talot, piha, puut takaisin
      (Louvren haamujäljet – tehty 96374758b:ssä, varmista KJ6:sta; SC:n portaiden ura). Louvren talot jo tehty (yllä).
B) KK:n palaute KJ4/KJ5 (NYT-työ, järjestys KK): Panthéon → Invalidit → Opéra → Louvren piha + pyramidi → Sacré-Cœur → Sainte-Chapelle.
   - Panthéon: nyt yksi harmaa laatta ilman kattoa → kupoli rummun päällä, pylväspääty, katon lappeet, rytmi, ≥ 3 sävyä. VS (local_5ebb0658-96f6-434d-8a38-b122eb53032f)
     odottaa korjatun Panthéonin haaran + sha (rebasaa kynäkokeen efa695dbb sen päälle) → lähetä hänelle, kun pushattu.
   - Invalidit: kupoli kokonaan kultainen, katot siniharmaat. Opéra: vain kupolit haalean kuparinvihreät, muut katot sinkinharmaat.
   - Louvre: pyramidi näkyvämmäksi (kirkkaampi lasi, vaaleat särmät; kokoa EI suurenneta), sininen (LvLiuske 0x7D8996) hieman harmaammaksi; haamujäljet (yllä).
   - Sacré-Cœur: kupolit korkeiksi, kulmakupolit isommiksi, kermanvalkoinen kivi. Sainte-Chapelle: tukipilarit, korkeat tummansiniset ikkunat, ruusuikkuna päätyyn.
   - Kaikille: katon lappeet, ikkuna- ja kaarirytmi, vähintään kolme sävyä.
C) Seuraava kierros: Riemukaari (vaaleampi kivi, kaaren aukko näkyviin), Notre-Dame (vaalea kivi, tumma katto). Eiffel ei muutoksia.
D) KK:n kysymys (ei kiire; vastaus PT:lle ≤ 8 riviä), luonnos /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261110-euroopan-kaupungit-tyonkulku.md:
   1) asema 1 POHJA ja asema 2 MERKKIRAKENNUKSET: mikä ajettavissa uudelle kaupungille yhdellä komennolla, mikä vaatii työkalun;
   2) Pariisin kuudesta koodimallista mitkä osat parametrisia (kupoli, rumpu pylväskehällä, pylväspääty, mansardi, torni/huippu, kaarikäytävä), mitkä kovakoodattuja.
   Vihje: OhjelmaKohdeGeometria.cs:n Rakentaja (Katto/Mansardi/Kattoikkunat/Seina.Rivi/Ikkuna/Pilari/Piikki/Harja) on yhteinen; Lv*/In*/Op*-apurit mallikohtaisia.

## Vahdit (uusi sessio virittää)
- Postilaatikko: Monitor `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh` (30 min).

## LISÄYS 21.5x: KK RATKAISI JÄRJESTYKSEN (suoraan KS:lle)
1) ENSIN 224.42:n kolme (omistaja 21.56): Notre-Damen korvaustalot päälle ja raivaus uuden mallin jalanjälkeen, Riemukaari ja Eiffel tarkistus → kuva ennen | jälkeen
   KK:lle, seuraavaan versioon; kerro myös, missä kunnossa niiden ympäristö on 224.42:ssa (+ PT:lle m²-luvut raivausala vs. jalanjälki).
2) Sitten Panthéon (heikoin: katot ja kupoli siniharmaiksi, pääty) → Invalidit → Opéra → Louvren piha ja pyramidi → Sacré-Cœur → Sainte-Chapelle.
   Jokainen KK:lle yhtenä täysikokoisena rajauksena Tripo | koodi + kuva kaukaa, raivaus mallin jalanjäljen kokoisena.
   KK:n vertailurajaukset: proto-3d/_tyo/keskustelukanava/tyyliohje/ (kj4-ruudukko-tripo.jpg | -koodi.jpg, kj4-in-dome.jpg, kj5-ruudukko.jpg).
3) Korjaukset UUDELLEENKÄYTETTÄVINÄ OSINA (kupoli, rumpu, pylväspääty, mansardi, tukipilari) → osakirjasto muille kaupungeille (euroopan-kaupungit-tyonkulku.md).
Järjestyskysymys PT:lle (21.57) on näin vastattu.

## LISÄYS 22.0x: OMISTAJAN PÄÄTÖS 21.59 (KK:n kautta, kortti) – KORVAA K 2:N
"Kyllä, oikea mittasuhde": kaikki nähtävyydet kaikissa kaupungeissa todellisessa koossa ja muodossa (korvaa kortit 16.17 ja 17.45, K 2 → 1:1); raivattu tila
palautetaan mallin oman pohjan kokoiseksi. KS:lle: koodimallit 1:1 (korkeus ja pohja todelliset), raivaus mallin omaan pohjaan, talot, pihat ja puut takaisin.
Tripo-malleja EI skaalata (pysyvät ennallaan, kunnes kukin korvataan hyväksytyllä koodimallilla).
- ENSIN 224.42:n kolme (Riemukaari, Notre-Dame, Eiffel): pari nykyinen K 2 | 1:1 kaukaa ja läheltä KK:lle, sitten PT:n kautta seuraavaan versioon.
- Sitten kuuden korjaukset tyyliohjeen mukaan suoraan 1:1-koossa (tyyliohjeen kohta 4 päivitetty).
- VAIKUTUS TEHTYYN: Louvren talomaski tehtiin V = 1,2235:llä → aja uudelleen `tee-maski.py 1 4` + aja-palat.sh (tyhjennä/uudelleennimeä tyo/ ja ulos/ ensin:
  skripti vaatii tyhjät) → uusi kansio palat-v25-louvre-1-1 (versioitu, ei ylikirjoitusta). 96374758b:n pihakaistat (haamujälkien peitto) 1:1:ssä tarpeettomia
  mutta harmittomia; Cour Napoléonin kiveys voi jäädä. KJ6:n kuvat ovat vielä K 2 -koossa → älä vie KK:lle valmiina, korkeintaan värien karkeana näyttönä.
- Korostuksen kytkin: Korostus.Kerroin (Oletus) ja OhjelmaKohteet.KorostusKoko; selvitä, miten 1:1 asetetaan koodimalleille koskematta Tripoon (MallitEnnallaan = true jo).

## LISÄYS 22.1x (uusi sessio, PT:n viesti 21.59-päätöksestä): 1:1 TEHTY, KJ7 JU:lla
- 098f9f05c (proto karttaseppa/koodimallit-1-1 = 599b0150d + Korostus.KoodimallitTodellinen = true; komento "korostus koodit 0|1" vertailuun). Testit 747/747, unity 0.
- Talot 1:1: _tyo/karttaseppa/koodijuna/raivaus-1-1/ (LUEMINUT.md: resepti + m²-taulukko). palat-v25-kolme-1-1 (RK, ND, Eiffel) ja palat-v25-louvre-1-1
  (+ Louvre V 1, korvaa v24:n kokeissa). m² PT:lle lähetetty.
- KJ7 (sk-mac-1-1-kolme.txt, 12 kuvaa k2-*/11-*) JU:lle 22.09, loki lokit/karttaseppa-1-1-kolme-098f9f05c → katso täysikokoisena → pari k2 | 11 kaukaa
  ja läheltä KK:lle (koodijuna/pari.py), kopio PT:lle. Tarkista myös -k2-maapohjat palaavien talojen alla.
- Kokeet 1:1:n päällä: f4468f6ed (haara karttaseppa/nahtavyydet-1-1 = 96374758b + 1:1), pushattu. Kartta-testeissä 752/753: LouvrenMitat "Cour Napoléon
  tukossa" kaatuu jo 96374758b:ssä (pihakaistat) → korjaa ennen Louvren seuraavaa kuvaa.
- SEURAAVAKSI: Panthéon tyyliohjeen mukaan 1:1:nä nahtavyydet-1-1:n päälle (VS odottaa haaraa + sha).

## LISÄYS 22.2x (konteksti 25 %, hook): PANTHÉON TEHTY, KJ7 JA KJ8 JU:lla
- KJ6 (Louvre K 2) valmis 22.02, katsottu 1000 px: haamujäljet poissa, talot palanneet; K 2 -kokoinen → EI KK:lle. Louvre kuvataan uudelleen omalla vuorollaan 1:1:nä
  (palat-v25-louvre-1-1).
- KJ7 käynnissä JU:lla (JU 22.1x) → lokit/karttaseppa-1-1-kolme-098f9f05c: katso täysikokoisena → ruudukko k2 | 11 (kaukaa + läheltä, RK/ND/Eiffel) KK:lle,
  kopio PT:lle (koodijuna/pari.py). Kerro samalla, missä kunnossa ympäristö on (talot, -k2-maapohjat).
- PANTHÉON b357fdfc1 (haara karttaseppa/nahtavyydet-1-1, pushattu): harjakatot, seinärytmi + friisi, lyijykupoli rivoin + lyhty, tumma varjo pylväiden
  takana; OSAKIRJASTO Assets/Matkakirja/Kartta/OhjelmaKohdeOsat.cs (OsaHarjakatto, OsaKupoli, OsaSeinaRytmi) → käytä Invalideissa, Opérassa, SC:ssä, S-C:ssä.
  LouvrenMitat-testi korjattu (753/753), unity 0. VS:lle sha lähetetty 22.1x (kynäkoe efa695dbb rebasataan).
- Panthéonin raivaus 1:1: koodijuna/raivaus-1-1-pantheon/ (jalanjälki 6 079 m², raivaus 7 698 m², K 2 68 155 m²; 15 → 1 taloa poistossa, 14 palaa)
  → palat-v25-pantheon-1-1 VALMIS (k2b + 9 palaa: kolme + Panthéon).
- KJ8 (koodijuna/sk-mac-pantheon-kj8.txt, 6 kuvaa pn8-*) JU:lle 22.2x → lokit/karttaseppa-pantheon-kj8-b357fdfc1.
  Kuvista karkea ruudukko Tripo | koodi + kaukaa KK:lle, kopio PT:lle.
- NUI:n paisuntakoe: vastattu 22.1x (Paisunta.Kerroin-rivi OhjelmaKohteet.Paivita:han NUI:n haarassa 098f9f05c:n päällä; uusi _nahtavyysPiilo TaloKerros +
  ElavaKerros -varjostimiin, katson ennen junaa).
- JONO sen jälkeen: Invalidit → Opéra → Louvren piha + pyramidi → Sacré-Cœur → Sainte-Chapelle (kukin 1:1, raivaus resepti tee-maskit.py, osat OhjelmaKohdeOsat).
  D) KK:n kysymys (parametriset osat) yhä vastaamatta; OhjelmaKohdeOsat.cs on vastauksen alku.
- 22.2x: NUI 7d4e5b2b6 (natiivi-ui/nahtavyys-paisuu, 098f9f05c:n päällä: Kartta/PaisuntaTila.cs, _nahtavyysPiilo TaloKerroksessa, kerroin myös Tripo-skaalaan)
  → KATSO ennen junaa; puiden varjostin = Linssit/Resources/Varjostimet/KaupunkiPuu.shader (kerrottu NUI:lle). KJ7 ajettiin uudelleen 22.1x (JU:n L2-vika), KJ8 sen jälkeen.

## LISÄYS 22.27: KJ7 KATSOTTU, PARIT KK:LLE
- KJ7 (JU 22.25, 12/12, talot palat-v25-kolme-1-1 219/219) katsottu täysikokoisena → parit K 2 | 1:1 KK:lle ja kopio PT:lle 22.27:
  proto-3d/_tyo/karttaseppa/koodijuna/parit-kj7-098f9f05c/ (pari-*-kaukaa|lahelta.jpg, rajaus-*.jpg).
- RK 1:1: etelästä näkyy kapea 22 m sivu (mitat oikein, K 2:ssa leveys venytetty) → kaukaa heikko; ehdotettu väri + aukko, ei kokoa.
- ND: 18 taloa palasi, mutta eteläpuolelle jää K 2 -maapohjan vaalea kenttä + 2 yksittäistä taloa → KORJAA -k2-maapohja 1:1-raivauksen kokoiseksi.
- Eiffel ok (4 taloa palasi; joen puolella vaalea kiveys jää, käy aukioksi).
- Odottaa: KK:n vastaus pareihin; KJ8 (Panthéon) JU:lla.

## LISÄYS 22.3x: KJ7 HYVÄKSYTTY (PT pt-ok 224.46 098f9f05c), KIVI d36a7c7a2, KJ9 JU:lla
- KK/PT 22.3x: RK ja ND katoavat 1:1:ssä kaukaa → d36a7c7a2 (proto karttaseppa/kivi-1-1 = 098f9f05c + kivi, natiivi-backup): OhjelmaKohdeGeometria.NahtavyysKivi
  0xF6F0E3 (osakirjaston kivi muillekin), RK holvi 0,5, ND lyijykatto 0x484C51, flèche 0x3C3F44. Testit 747/747, unity 0. PT:lle sha (korvaa 224.46:ssa jos ehtii), VS:lle sha.
- KJ9 (sk-mac-kivi-kj9.txt, 11 kuvaa: kivi-* = KJ7:n 11-* kulmat, lahi-* lahizoomilla 25/12 RK, 10/6 ND, 3 Eiffel) JU:lla KJ8:n jälkeen
  → lokit/karttaseppa-kivi-kj9-d36a7c7a2 → pari KJ7 11-* | kivi-* + lähikuvat KK:lle, kopio PT:lle. Lähikuvista tarkista raivauksen reuna (ND:n eteläpuolen kenttä).
- HUOM: Panthéon (b357fdfc1, nahtavyydet-1-1) ei sisällä kiveä; rebase/poiminta d36a7c7a2 nahtavyydet-1-1:een ennen seuraavaa Panthéon-ajoa.

## LISÄYS 22.4x: 224.46 = 6d82a050c, PALAT-OK, ND-ETELÄPOHJA SEURAAVAAN
- 6d82a050c (karttaseppa/kivi-1-1 = d36a7c7a2 + Assets/StreamingAssets/talot/pariisi.json v3). Paketti _tyo/karttaseppa/koodijuna/talot-paketti-pariisi-v3
  (tyokalut/talot_paketti.py, v2 → v3: 6 palaa 3,8 Mt, SHA256SUMS ok). julkaisija-tyokalut/linkki-224-uutta/224.46.palat-ok kirjoitettu 22.33; JU:lle ja PT:lle sha.
- KK 22.3x pyysi: 1) ND:n eteläpohja, 2) RK kivi + aukko, 3) ND kivi + tumma katto; pari ennen | jälkeen kaukaa + aito lähikuva (malli ~1/3 ruudusta).
  2 ja 3 = d36a7c7a2. 1 SELVITETTY: kenttä = Citén piirroskartta (Nahtavyysalue notre-dame PohjaPoisKoodilla: Tripon pohja-ranta-vesi1 + pyyhitty saari pois),
  ei raivaus; todellisuudessa aukio + Square Jean-XXIII + ranta. KORJAUS 224.47:ään: pohja puistoksi (vihreä + OSM-puut) ja 2 irtotalon OSM-tunnistus
  (sakaristo voi olla oikea). KK:lle ja PT:lle kerrottu.
- SEURAAVAKSI: KJ8 (Panthéon) kuvat → KK; KJ9 kuvat → pari KJ7 11-* | kivi-* + lahi-* KK:lle (kopio PT); sitten ND-eteläpohja; sitten Invalidit…

## LISÄYS 22.4x (2): KJ8 KATSOTTU → PANTHÉON-KORJAUS f34ae4717, KJ10 JU:lla
- KJ8 (b357fdfc1) karkea KK:lle + PT: _tyo/karttaseppa/koodijuna/parit-kj8-b357fdfc1/. Viat: Tripo-pohja r8-k2 peitti palaavat talot (iso tyhjä aukio), kivi katosi kaukaa.
- f34ae4717 (nahtavyydet-1-1 = b357fdfc1 + cherry-pick d36a7c7a2 [950bb8555] + Panthéon PohjaPoisKoodilla "pantheon:Panthéon" + PnKivi NahtavyysKivi), pushattu, 753/753, unity 0.
  OPPI: jokaiselle uudelle koodimallille, jonka alueella on Tripo-pohja (Invalidit, Opéra, Grand Palais…), PohjaPoisKoodilla = sen avain, muuten talot jäävät pohjan alle.
- KJ10 (sk-mac-pantheon-kj10.txt, 5 kuvaa pn10-*, sis. lahizoomi 8 lähikuva) JU:lla KJ9:n jälkeen → lokit/karttaseppa-pantheon-kj10-f34ae4717 → pari pn8-koodi | pn10 KK:lle.

## LISÄYS 22.5x: KK HYVÄKSYI PANTHÉONIN MUODON, b8fed770e, KJ10 JU:lla — NOLLAUS (konteksti 26 %)
- KK 22.5x: Panthéon KJ8 "MALLI KELPAA", taso muille viidelle. Korjattava: raivaus mallin 1:1-pohjaan + korttelit (tehty f34ae4717: PohjaPoisKoodilla),
  kivi "aavistuksen vaaleampi kuin viereiset talot" (b8fed770e: PnKivi = TaloKivi × 1,12; RK/ND pysyvät NahtavyysKivellä, KK pyysi niille "selvästi").
  Osat kirjastoon: OhjelmaKohdeOsat.cs + OsaPylvasPaaty, OsaRumpu (Panthéon käyttää; kärkiä sama 10 116). KK:n sääntö: palauta KK:lle vasta, kun ympäristö on täynnä.
- b8fed770e (karttaseppa/nahtavyydet-1-1, pushattu), 753/753, unity 0. KJ10 käännös vaihdettu JU:lle → lokit/karttaseppa-pantheon-kj10-b8fed770e (ajopyyntö PÄIVITYS 22.5x).
- AVOIMET (uusi sessio): 1) KJ9 (d36a7c7a2) kuvat → pari KJ7 11-* | kivi-* kaukaa + lahi-* KK:lle (kopio PT), ND:n eteläpuoli mukana; KK ei kerro omistajalle 224.46:sta ennen sitä.
  2) KJ10 kuvat → tarkista ympäristö täynnä → pari pn8-koodi | pn10 KK:lle. 3) KK:n työnkulkukysymys (asemat 1–2, parametriset osat) KJ9-parin jälkeen (PT 22.4x).
  4) ND-eteläpohja puistoksi (224.47). 5) Invalidit → Opéra → Louvre → Sacré-Cœur → Sainte-Chapelle (PohjaPoisKoodilla + osakirjasto + raivaus 1:1).
