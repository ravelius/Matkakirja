# Erikoismallin ja meren koristeen speksipohja (3D-nostot, omistaja hyväksyi 22.0x)

*Linssiseppä 26.9.2026 Fablen tilauksesta. Omistajan kortti 22.0x: kategoriasymbolit ovat staattisia, mutta
erikoismallit (lista: docs/raportit/arkkityypit-paletti-animaatio-20260926.md, kohta 3) animoidaan Tivolin tapaan
"mahdollisimman hyvinä". Mallit tehdään muutama kerrallaan, ja omistaja tarkastaa välissä. Tekijä on Mallinseppä
(Opus, max-effort). Täytetyt speksit ovat kansiossa docs/raportit/erikoismallit/.*

Jokainen erikoismalli kuvataan alla olevilla otsikoilla. Kohta, jota ei tiedetä, merkitään "AVOIN", eikä sitä
arvata. Mallinseppä kysyy Fablelta ennen koodia.

## 0. ELÄMÄNIDEA (ennen mallinnusta; omistaja hyväksyy kolme kerrallaan)

- **Kolme riviä:** mikä tässä paikassa oikeasti liikkuu tai mistä se on kuuluisa. Esimerkiksi Mont-Saint-Michelissä
  vuorovesi nousee ja laskee saaren ympärillä, Stonehengessä auringonsäde osuu kiviin harvoin, ja Geysir purkautuu
  satunnaisesti.
- **Kolme kerrosta:**
  1. **Perusliike:** hidas, aina käynnissä Tivolin tapaan (käynti, tauko ja vaihtelu).
  2. **Harvinainen tapahtuma:** noin joka kymmenes jakso. Kohteen kuuluisin hetki.
  3. **Reaktio pelaajaan:** kun kamera lähestyy (alle noin 60 km), kohde herää, eli perusliike vilkastuu tai alkaa.
     Napautus käynnistää harvinaisen tapahtuman heti (enintään kerran 20 s:ssa).
- **Valot yöllä:** jos kartan yövalot ovat päällä (Black Marble ja terminaattori), kohteessa on hillitty lämmin hehku
  (valaisematon, ei bloomia). Syttyminen kestää 1,5 s.
- **Laatukynnys:** tunnistaa sekunnissa, hymyilyttää eikä häiritse karttaa. Jos yksikin ehto ei täyty, ideaa ei
  mallinneta.

## 1. Tunniste ja paikka
- Noston tunnus (esim. `kohde:colosseum`) ja Symbolimallit-avain (tunnuksen loppu, esim. `colosseum`).
- Maa, lat/lon ja taso (erikoismallit ovat tason 1 nostoja).

## 2. Viitekuvat (vain Linssisepän ja Mallinsepän työkäyttöön, ei peliin)
- 2–3 kulmaa Wikimedia Commonsista (PD tai CC, lisenssi ja tekijä merkitään): ylhäältä tai ilmasta, sivulta ja
  pohjapiirros (PD-piirros, jos löytyy).
- Mallit ovat omia ja koodina, eikä viitekuvista kopioida pintoja eikä tekstuureja.

## 3. Siluetti ja tunnusmerkit
- Kolme tai neljä piirrettä, joista kohteen tunnistaa 60 pt:n koossa ylhäältä ja 30°:n kallistuksesta. Järjestys
  tärkeimmästä alkaen.
- Mitä jätetään pois, eli mikä ei näy 60 pt:ssä.

## 4. Mitat ja koko
- Jalanjälki metreinä (pituus × leveys, korkeus) todellisuudessa.
- Mallin yksikkö: pohjan pidempi sivu = 1,0. Pystysuunnan liioittelu (1,0–3,0) perusteluineen.
- Koko ruudulla 1,5 × kategoriasymboli = 60 pt pidempi sivu (Symbolimallit.KokoPt 40 × 1,5), kynnys kuten tason 1
  malleilla. Juuri pohjan keskellä, +Y ylös ja +Z pohjoinen.

## 5. Paletti ja aksentti
- Yhteinen seepiaramppi: paperi #efe4cc, seepia #8a6a44 ja muste #3b2f22. Kärkiväri → valoisuus → ramppi
  (Symbolimalli-varjostin).
- Yksi aksentti, joka on lajin `--sym-*`-väri 35 %:n sekoituksena. Se on vain animoidussa osassa tai yhdessä
  tunnusosassa ja kattaa enintään 10 % alasta.
- Ei täysiä värejä eikä kiiltoa. Löytämätön ja löydetty samalla paletilla.

## 6. Animaatio (Tivolin logiikka)
- **Mikä osa liikkuu:** yksi tai kaksi osaa omina kappaleinaan (pivot valmiina). Runko on paikallaan, ja liikkuva osa
  on enintään kolmannes mallista.
- **Miten:** liikkeen käyrä (smootherstep ja ease 0,6 s), jakso (s) ja amplitudi.
- **Käynti ja tauko:** Vaihtelu-arvot (KayMinS, KayMaxS, SeisooMinS, SeisooMaxS, TaukoTod, Puuska). Siemen tulee
  noston tunnuksesta (ArkkityyppiLiike.Siemen), joten liike ei toistu samana.
- **Valot:** jos mallissa on valo (lyhty, ikkunat, auringonsäde), se on valaisematon ja hillitty hehku, ei bloomia.
  Syttyminen ja sammuminen kestävät vähintään 1,5 s, eikä valo välähdä (sääntö 2).
- **Yhteiset säännöt:**
  - Liikeydin: Ydin/Elava/ArkkityyppiLiike (71cf5c6d) ja Liikekoordinaattori, jolla ruudulla on enintään 3 liikkeellä.
  - Elävä kerros 30 fps. Vähennetty liike pysäyttää pehmeästi, ja levossa piirretään 0 kehystä.
  - Liike vain 3D-kynnyksen yllä.

## 7. Kolmiot ja LOD
- LOD0 ≤ 1 500 ja LOD1 ≤ 400 (sama siluetti ilman pieniä osia). Liikkuvien osien kolmiot lasketaan mukaan.
- Luettelo osista kolmiomäärineen (runko, liikkuvat osat).

## 8. Ääriviiva ja perspektiivi
- Kaiverrusreuna 1,2 pt musteella (inverted hull, Natiivisepän ylhaalta-175) koko mallille, myös liikkuville
  osille. Sisäviivat, kuten aukot ja kaaret, tehdään muste-kärkiväreinä eivätkä ole verkkoa.
- Liioiteltu perspektiivi (LiioiteltuPerspektiivi.Kallistus) mallin juureen. Liikkuvan osan localRotation pysyy
  paikallisena.

## 9. Hyväksymiskriteerit
- Kolme kuvakulmaa isona (≥ 600 px, rajattuna laitteen ruudusta):
  1. ylhäältä ruudun keskellä
  2. 30°:n kallistus
  3. ruudun reunalla (liioiteltu perspektiivi)
  Lisäksi 10 s:n video liikkeestä (rajattuna).
- Kehyshinta ≤ 0,3 ms mallia kohden (elävän kerroksen mittaus iPhonella), levossa 0 kehystä, kolmiot kohdan 7
  mukaan ja unity-tarkistus 0 virhettä.
- Omistaja hyväksyy kuvat ennen seuraavaa erää.

## 10. Tiedostomuoto ja toimitus
- Koodina, ei tiedostoja eikä tekstuureja: `Assets/Matkakirja/Kartta/Erikoismallit/<Nimi>.cs` on `partial class
  Symbolimallit`, jossa on `static Mesh <Nimi>()`. Liikkuvat osat ovat omina verkkoinaan (`<Nimi>Osa1()` …).
  Rakentaja on Symbolimallit.Rakentaja (sama kuin Akropoliksella).
- Rekisteröinti: `Symbolimallit.Mallit`-tauluun avain → rakentaja (kuten `{ "akropolis", Akropolis }`). Liikkuvat
  osat julkaistaan Symbolimallit.LiikkuvatOsat-listaan (Natiivisepän rajapinta, `LiikkuvatVersio`), ja laji
  lisätään ArkkiLiike-enumiin. Aikataulu ja asento lisätään ArkkityyppiLiikkeeseen (Linssiseppä tarkistaa).
- Haara `mallinseppa/<avain>` junan juna/b13 päälle. Merge-pyyntö Natiivisepälle, ja kuvat kansioon
  proto-3d/lokit/erikoismallit/<avain>/.
