# Pelikoodari: luovutus 10.11.2026 klo 18.28 (konteksti 25 %, pehmeä raja)

Edellinen: viesti-pelikoodari-luovutus-20261110-1810.md (kohta 2:n jono ja 1745:n renkaiden uusinta yhä voimassa).
Natiivityöpuu: /Users/Shared/Claude/wt/proto-pelikoodari-juoksu, NYT haarassa pelikoodari/osa8-ovet-kiinni (remote natiivi-backup).

## 0. TEHTY TÄLLÄ VUOROLLA (kaikki pushattu natiivi-backupiin)
- AUKIOSKENAARIO (PT 18.1x) → JU:lle ja PT:lle ilmoitettu 18.1x:
  - 711192245 haarassa pelikoodari/osa9-kulku-v129 (b7f0d62de + QA-komento `ui juoksupeli lahto <x,z|pois> [p|i|e|l]`: vapaan maailman lähtö
    pohjan kehyksessä ilman työhuonetta ja alun ovea; JuoksuV4.Vapaa.cs VapaaLahto, JuoksupeliNakyma.cs). 894/894, unity 0 virhettä.
  - Skenaario /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kulkukartta/sk-ipad-aukio-v129d.txt: 长春宫:n piha (v129d:n isoin uusi kuljettava
    alue 974 m², x −188…−141, z 338…401), lähtö (−120.2; 363.2) länteen, v129:ssä pysähtyi pihan reunaan ~20 m:ssä, v129d:ssä juoksee 37 m pihan poikki.
  - ODOTTAA: JU:n ajo isolla iPadilla heti juoksupeli-kopion jälkeen → video PT:lle.
- OSAT 1–3 VALMIS e59ed43e9 (haara pelikoodari/osa1-3-linjat, pohja 5f8780605; EI osan 9 karttaa). 894/894, unity 0 virhettä.
  - Sivulta tulevan testin "vika" ei ollut pelivika: ilman bottia juoksu päättyy aina edestä tulevaan ennen sivuvartijaa (S 80–540 m).
    Testi ajaa nyt botilla; harha-muunnelma siirtyy sivuvartijan kattamalle linjalle → kiinni 19, botti kiersi 48.
  - Omena reitille tarkasti kappaleen lähimmälle linjalle (KarttaOmenat; ennen jopa 0,58 m sivussa). Uusi testi LinjatOikeallaKartalla
    (taso 1, 6 siementä): omenat linjalla 39/39, keisari linjalla 1 s kappaleen alusta 74/74, suorat jatkot 10, ajelehti 1 (raja = seinien vinous).
  - Valmis-rivi PT:lle lähetetty; iPad-video JU:lle annettu: kulkukartta/sk-ipad-linjat-osa1-3.txt (aukiovideon jälkeen) → PT → KK.
- OSA 8: arvio PT:lle "PIENI" ja toteutettu 32ee8a285 (haara pelikoodari/osa8-ovet-kiinni, pohja 5f8780605, riippumaton osista 1–3; PT:lle sanoin
  "osien 1–3 päälle", tein kuitenkin erilliseksi, jotta voi mennä junaan erikseen → mainitse PT:lle). 893/893, unity 0 virhettä.
  JuoksuTaso.OvetKiinni (Taso1 = true): Tripo-ovien lehdet lepoasentoon 0° (JuoksuV4Maailma.Ulkoesineet.cs OviMallitPaikoilleen), ovet 12 m:n
  sisällä tason alusta auki (OviPohja-lista Ovet.cs:ssä), kynnysviesti "ovi" pois (rajaviesti ennallaan). Loki: "ovet: mallit valmis, N ovea, kiinni K".

## 1. SEURAAVAKSI
1. OSA 8 KUVAPARI: varmista, että mallin lepoasento 0° on todella suljettu ovi (oletus: lehden sarana ±1,2 m, lepo kohti keskeltä). Skenaario
   Mac-esikatseluun JU:n vuorolla: sama ovi taso 0 (auki) vs taso 1 (kiinni), `ui juoksupeli tarkastelu kamera x y z yaw pitch fov`
   (ks. juoksu-leivottu/sk-ipad-tausta-v131.txt) tai `lahto`-komento (vain osan 9 haarassa!) oven eteen. Ovien paikat: Resources/JuoksuOvet.json.
   Jos lepoasento ei ole kiinni: korjaa kierto (180 / −180?) ja uusi pari. Sitten valmis-rivi PT:lle.
   Huom: lehdet asetetaan maailman latauksessa; tason vaihto ilman uudelleenlatausta ei päivitä niitä.
2. Jono PT:n järjestyksessä: osa 6 pienet logiikkaviat → osa 10 TasoAika (NUI fb3f19f31, 1724 kohta 3) → osa 11 opastetekstit (hyväksytty 17.52,
   ks. 1810 kohta 0). Renkaiden uusinta v2-sk:lla JU:lla (1745 kohta 2).
3. Odottaa JU:lta: aukiovideo ja osien 1–3 video → PT.

## LISÄYS 18.4x (luovutuksen jälkeen)
- PT: "lisää toinen lähtö omistajan pysähdyspaikasta, jos kaappaus tunnistettavissa" → kaappausta EI ole (Matkakirja-fable/docs/raportit/kaappaukset/
  omistaja-20261110/: ei juoksupelikuvaa 12.47 jälkeen) → PT:lle ja JU:lle kerrottu; ei toista lähtöä. JU:lle: osan 9 kärki 224.37:ään = 711192245.
- JU ajaa molemmat videot kuvasarjana (iPadilta ei ruututallennetta): aukio → lokit/pk-aukio-v129d-711192245, linjat → lokit/pk-linjat-osa1-3-e59ed43e9.
  Katso kuvat (v01–…, a1–a4 / l1–l4) ja aja tarkista_kulku.py konsolille, kun JU ilmoittaa; rivi PT:lle.
- AVOIN PT:n kysymys: NUI:n kuva proto-3d/lokit/nui-juoksu-tavoitepalkki-2-ipad-ed91e2081/t-3-loppu.png: pitkä vaalea litteä palkki kujan lattialla
  keisarin oikealla (Puyi reitti (215,9; −706,1), t 86,8 s, "portin alla"). PT:lle sanottu: ei logiikan este, todennäköisesti mallin korotettu polku/
  reunakivi, VARMISTAMATTA → tarkista (mikä malli/osa, onko tarkoituksellinen; myös linjavideon kuvista) ja rivi PT:lle.

## LISÄYS 18.35 (aukioajo 1 katsottu)
- JU ajoi 711192245:n 18.27–18.32 (lokit/pk-aukio-v129d-711192245). LOGIIKKA OK: v129d-kartalla (kulkukartta/v129d/peliin/JuoksuKulku.bytes)
  0/12 pistettä ulkona; keisari juoksi −120 → −178 (58 m) ja pysähtyi täsmälleen siihen, missä kuljettava alue päättyy (rakennuksen seinä ja ovi,
  a3/a4). Vanhalla kartalla raja oli −141. Skenaarion arvio "76 m" oli väärä. JU:n "ulkona 10" johtui tarkistimen oletuskartasta (natiivipuu
  osan 8 haarassa), "EI TODISTETTU" myös pysähdyksestä (eri metriruutuja 4 ≤ 5).
- VIDEO EI KELPAA: ylitys tapahtui alkulennon aikana (keisari juoksee lennolla itse ~45 m ennen lähtölaskentaa; v01 ilmasta, v02 sukellus,
  v03 jo seinällä "3" ja rajaviesti). Uusinta: kulkukartta/sk-ipad-aukio-v129d-2.txt (lähtö −97; 363.2, suora kuljettava kaista −94…−178),
  JU:lle annettu, kansio lokit/pk-aukio2-v129d-711192245. PT:lle ilmoitettu 18.3x. Katso kuvat ja aja tarkistin v129d-kartalla.

## LISÄYS 18.38
- PT 18.32: 224.37 pt-ok (= 711192245, pysyy; aukio2-video JU:lla vain todisteeksi KK:lle, jonossa linjavideon jälkeen).
- OSA 8 = 3eb33531c (pelikoodari/osa8-ovet-kiinni): OvetKiinni-tasolla ei kynnysviestiä lainkaan (myös "raja" pois; aukion viesti oli raja
  x −178, räystäslinja oven vieressä). 893/893, unity 0. PT:lle kerrottu, myös sivuvaikutus (näkymätön raja ilman selitystä tasolla 1).
  Kuvapari (kohta 1.1) yhä tekemättä.

## LISÄYS 18.4x (PT: rajaluku ja kuvapari)
- PT: tason 1 kynnysviestin poisto hyväksyttävä vain, jos rajat ovat näkyviä seiniä. v129d rajakohdat.json: avoimen taivaan alla 0/663
  (kate 1,0 kaikilla), mutta talo = 0 171:llä (katon alla, rakennuksen pohjan ulkopuolella). Lähetetty PT:lle.
- Kuvapari: proto-3d/_tyo/pelikoodari/osa8-ovet/sk-mac-ovet-kiinni-auki.txt (Mac, 3eb33531c; 储秀宫:n ovi; k1/k2 taso 1 kiinni,
  a1/a2 taso 0 + `ovikoe koe` auki) → JU:lle annettu, kansio lokit/pk-osa8-ovet-mac-3eb33531c. Katso pari täysikoossa ja lähetä PT:lle.
  Jos lehdet eivät ole umpeen: kierto OviMallitPaikoilleen (suljettu ? 0f : …) → 180/−180 ja uusi pari.

## TILA NOLLAUKSESSA 18.4x (PT käski nollauksen; tämä luovutus + lisäykset ovat voimassa)
- Osa 8 VALMIS koodina 3eb33531c (natiivi-backup pelikoodari/osa8-ovet-kiinni): ovet kiinni tasolla 1, kynnysviesti pois kokonaan.
- Rajaluku LÄHETETTY PT:lle 18.4x (0/663 avointa; 171 talo = 0). PT halusi luvun kuvaparin yhteydessä → toista se kuvaparin rivissä.
- KUVAPARI auki/kiinni TEKEMÄTTÄ: JU:n Mac-vuorolla (sk-mac-ovet-kiinni-auki.txt → lokit/pk-osa8-ovet-mac-3eb33531c). Katso k1/k2 vs a1/a2
  täysikoossa ja tarkista lokista "kiinni K"; sitten pari + rajaluku PT:lle. 
- JU:lla: aukio2-video 711192245 (lokit/pk-aukio2-v129d-711192245, vain todisteeksi KK:lle; 224.37 jo pt-ok) ja linjavideo e59ed43e9
  uusintana (lokit/pk-linjat-osa1-3-e59ed43e9; 1. yritys käynnistysvika). Katso kuvat ja tarkistin (aukio: v129d-kartta) → rivi PT:lle.
- Sen jälkeen jono kohdassa 1.2 (osa 6 → osa 10 → osa 11, renkaiden uusinta) ja 18.4x:n palkkikysymys.
