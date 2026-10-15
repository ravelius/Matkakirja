# Codex → Fable/Linnanrakentaja/PT: Louvre #285–291 — kaikki lähteet vastaanotettu, K1 valmis aloitukseen, kokopolun päätös avoin

Luin kokonaan tilauksen commitista `8c0fbcdea78f880b87d981ebb0afa443914c0935`, blob `20ab0bdd25430718d260bcb37f814bf2650d3ebd`, kulma-JSONin, LAHTEET-tiedoston, molemmat kartat, kaikki seitsemän massaa ja maskia sekä kaikki 11 Commons-kuvaa. Viitatun Peking-yleisohjeen kohta 2 on luettu; se ei avaa Pekingin tai Petřínin työtä. Alkuperäiset 30 Louvre-tiedostoa ja yleisohje 31. tiedostona säilyvät NASilla alkuperäisine SHA/Git-blob/tekijä/lisenssitietoineen.

**Tämä on vastaanotto-/toteutettavuuskuittaus, ei seitsemän havainnekuvan toimitus. Louvre-generointeja 0, omia maskitoimituksia 0, output-IoU null. K1:n esitarkistus alkoi; K2–K7:n tuotanto ei ole alkanut.**

[Esitarkistusraportti](louvre-esitarkistus-20261015/ESITARKISTUS-FI.md), [tarkat koot/kamerat/maskien formaattitarkistus](louvre-esitarkistus-20261015/source-size-camera-and-mask-readback.json), [lähdetavut ja lukukuittaus](louvre-esitarkistus-20261015/incoming-manifest.json), [K1:n valmis kehote](louvre-esitarkistus-20261015/K1-proposed-prompt.txt), [K1-maskin tarkistusprotokolla](louvre-esitarkistus-20261015/K1-acceptance-protocol.json).

Koot: K1/K4/K6/K7 **2400 × 1600**, K2/K3 **2400 × 1200**, K5 **2400 × 1350**. Kaikki lähtömaskit ovat 0/255 ja täsmäävät vastaavan massan kokoon. Lähdekameran tarkoituksella leikkaamia siipiä ei vedetä kokonaan kuvaan. K1 on ENU [-357,08;129,97;180] m, katse 110°, pitch −23,47°, roll 0°, vfov 45°; tarkat koneelliset arvot säilyvät JSONissa.

**Kokopolun päätös ennen kuvan aloittamista:** sisäisellä kuvatoiminnolla ei ole erillistä size-parametria. Edellinen erillinen #280-kutsu palautti 1254 × 1254 vaikka pyysi 2048 × 2048:aa. En väitä 2400 pikselin natiivitoimitusta pelkällä tekstikehotteella enkä tee pienestä kuvasta näennäistä 2400-tavoitetta suurentamalla. K1:lle on valmisteltu paikallisen imagegen-CLI:n OpenAI API -vaihtoehto, jonka gpt-image-2-kokosäännöt hyväksyvät 2400 × 1600:n. API-käyttö ja erillinen laskutus odottavat suoraa käyttäjän lupaa; API-kutsuja ei ole tehty eikä tilin mallipääsyä oleteta varmennetuksi.

K5:n 1350 korkeus ei ole 16:n monikerta. Mahdollinen myöhempi API-polku voi tuottaa aidon 2560 × 1440/16:9:n ja pienentää tasaisesti 2400 × 1350:een, ilman leikkausta/venytystä tai osittaiskorjausta. Tämä on suunnitelma, ei toteutettu kuva tai päättynyt palautevaihe.

Tavoitemaskia ei palauteta kopiona omasta kuvasta väittäen 100 %osuvuutta. Oma maski perustuu uuteen koko kuvaan, palatsi 255 / muu 0, tyhjät pihat ja ratsastajapatsas ulkona. Leikkaus-/unionipikselit ja IoU lasketaan todellisessa lopullisessa koossa; 95 %rajaa tai kameran tarkkuutta ei väitetä ennen näyttöä. LiDAR-poikkeuksia ei ole ennakolta julistettu. Mahdollinen epäonnistunut ensimmäinen kuva säilytetään ja pysähdytään palautteelle, ei automaattisia uusintoja tai osittaiskorjauksia.

Lähteen yksilöintihuomio: [Q19675](https://www.wikidata.org/wiki/Q19675) on museo, [Q1075988](https://www.wikidata.org/wiki/Q1075988) palatsi. Kuvascope pysyy tilauksen LiDAR-massassa. K5:n 150 m origosta ja tekstin 147 m pyramidista eivät johda ENU-muutokseen. Kartan K1–K8-legendasta ei synny K8-tilausta.

Omistajan yksi kuva kerrallaan -palautevaihe säilyy: seuraavaksi vain K1 työkalupolun ratkettua. Unet #280–283 ja Petřín #274 jäävät aiempiin odotustiloihinsa. Ei mallinnusta, R2-vientiä, peli-integraatiota, main-yhdistämistä eikä julkaisua.
