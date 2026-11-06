# Karttaseppä: luovutus 6.11.2026 klo 07.21 (KS)
Syy: konteksti 25 %, luonteva tauko, kun ajot ovat JU:lla (7.37). **Voittaa aiemmat ristiriidassa; lue sen jälkeen -0711 kohdat TASOITUS ja MONTPARNASSEN SUHDE, sitten -0229 (LOPPUTESTIT).** Kaikki kokeena, ei junaan, ei iPadia. W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219 (karttaseppa/nahtavyydet-219). Y = /Users/Shared/Claude/wt/proto-karttaseppa-yhteinen (karttaseppa/ajo-yhteinen-tasoitus). KK = local_231e4bad-b9fe-41b8-8b45-02e35c45ebbe. JU = local_b4a7e82a-2522-437f-84ff-813401120931.

## ENSIN
Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`. Ei käynnissä tässä sessiossa. Katso, onko JU:n tulokset jo lokit-kansiossa; JU ilmoittaa valmistumisesta, mutta viesti on voinut tulla ennen nollausta.

## 1. MONTPARNASSE, ajo df5560fd8 JU:lla (W)
KK: paikka, suunta ja suhde kelpaavat jatkotyöhön, hyväksyntä on omistajan, KK tekee kortin. KK haluaa julkisivun oikean rakennuksen lämpimäksi pronssiksi ja sileäksi lasiksi, "ei ruskeaa ruudukkoa", eikä tiheä ruudukko saa väreillä etäältä tai liikkeessä (omistaja 17.4x: "eikä mikään värise").
- Ajo 66d11e617 katsottu: väri osui (keskijuova 137,118,83; oikea kuva 152,135,108; vanha 84,72,54), katon rengas ja reuna kunnossa, a/b-kuvissa ei väreilyä. Vika: leveät raidat näyttivät puulta ja nurkassa oli sauma.
- df5560fd8: `mp-torni.py` `julkisivu()`: runko sigma 24, viivat 0,2, nurkat samaan väriin, yläreunus tasaiseksi. Kirkkaus kuvassa, ei Savylla, koska Savy kirkastaisi katon.
- Tulos `lokit/karttaseppa-pariisi-mp-df5560fd8`, skenaario `_tyo/karttaseppa/sk-pariisi-mp-2.txt`. **Katso:** näyttääkö sileältä lasilta, onko sauma poissa, a/b-parit (mp-lahi, mp-kauka) täysikoossa, mp-ylhaalta.
- **Kelpaa:** `python3 _tyo/karttaseppa/sarja24-asennus/mp-pari.py <loki> <ulos.png>` (oikea rakennus | peli, katse 151°), pari KK:lle ilman selitekaistaa. Kerro samalla viat. Ei kelpaa: säädä `julkisivu()`:n arvoja ja `mp-torni.py <bytes>`, älä näytä keskeneräistä.
- **Mitat:** 62 × 39 m ei ole varmistunut lähteestä (LAHTEET.md, OSM 62 × 39, PT muisti 50 × 32). Suhde pysyy, KK kertoo ratkaisemattomana; KK:lle kerrottu.
- Kuitti Codexille ja Tripolle vasta omistajan sanan jälkeen.

## 2. YHTEINEN TASOITUSAJO, 579ea327c JU:lla (Y)
VS 07.1x: "ei koske" (OhjelmaKohteet lukee samat globaalit `_maaTasaKeski`, `_maaTasaRajat`, `_maaTasaReika`; luettu koodista, ei ajettu). Jos globaalien nimet muuttuvat, kerro VS:lle.
Sisältö: f48f56b0e + df5560fd8 + NS 7333833fe + NUI 31b1e5a7a. `MalliKyltit.cs` ratkaistu: maa4:n syvyysUsva + Piirretty. Montparnasse 90 m vain Y:ssä. Kääntämättä. 84717ed13 on sama ilman NUI:n viimeistä kärkeä; JU:lle kerrottu vaihto, se ilmoittaa, jos vanha oli jo ajossa.
Skenaario `_tyo/karttaseppa/sk-pariisi-yhteinen-tasoitus.txt`, 8 kuvaa, tulos `lokit/karttaseppa-yhteinen-579ea327c`.
Tuloksesta:
- Kuvat KK:lle: talot, nimet ja merkit samassa maassa? Sacré-Cœurin mäki ja pohja (sc-45, sc-80)? Montparnassen maaviiva (mp-lahi)?
- Lokikansio **NS:lle** (nd-raja, marais, m3; grep "MATKAKIRJA karttatasa\|MATKAKIRJA talot") ja **NUI:lle** (m3-montmartre, pont-neuf, loki "MATKAKIRJA maanpinta"). NUI:n tarkistettavat kohdat: -0711 "NUI 07.1x".
- Tasainen oletukseksi vasta tämän jälkeen (omistaja 06.58): sama lasku kuin `karttatasa 1` (Komennot.cs) Pariisin avauksessa, ja Montparnasse 90 m myös W:hen.
NUI:n haara voi vielä liikkua: yhdistä uusi kärki Y:hen ja kerro uusi sha JU:lle.

## AUKI
Sacré-Cœurin reunan tummat pisteet. Sacré-Cœurin matala läiskä: KK kertoo. NUI-kuvista m4 ja m3 ei kuittausta.

## Oppi
Lähdekuvan viivat voivat olla lähellä ruudun tarkkuuden rajaa: mittaa jakso ennen kuin arvioit väreilyä. Väriä kannattaa katsoa pelistä: atlas näytti hyvältä, mutta pelissä leveät raidat näyttivät puulta. Aikaleima aina date-komennosta: arvasin välirivien kellonajat väärin.
