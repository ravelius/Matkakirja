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
