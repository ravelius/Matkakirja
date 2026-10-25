# Palatsin mittakaava: Pelikoodarin osat, jotka seuraavat kerrointa k (25.10.2026)

PT 10.1x / Raamattu 2.177 PALATSIN MITTAKAAVA. Vain valmistelu, EI toteutusta ennen kerrointa.
Kartoitus haarasta pelikoodari/lautaspoyta-yksi (dda5bdcc6). P = Assets/Matkakirja/Peli/Juoksupeli,
S = Assets/Matkakirja/Scripts/Juoksupeli, T = Peli-testit/Testit.

## Suositus: yksi kerroin käännöskohdassa, data ennalleen

Koko pelilogiikka toimii pohja.json:n metrikehyksessä (Karttaseppä: kk-pohja-v1d-pk2), ja pohjasta peliin käännetään
kolmessa kohdassa. Valmista skaalavakiota ei ole, joten se lisätään:

1. `JuoksuPalatsi.Skaala = k` (yksi staattinen arvo). Sillä kerrotaan `Maailmaan` (P/JuoksuPalatsi.cs:126-131, x, y ja z),
   `Reitille` (:110) ja `JuoksuPalatsiVerkko.Paikka` (P/JuoksuPalatsiVerkko.cs:57). `Pohjaan` (:134) jakaa k:lla.
2. `palatsiJuuri.localScale = (k, k, -k)` (S/JuoksuSokkeloMaailma.Palatsi.cs:133). Tämä yksi rivi skaalaa kaikki
   Lavastajan glb:t: tausta, rakennukset, avoimet, osamallit, lähipuut, ulkorengas, muurikate ja kulmatornit.
3. Seuraavat pysyvät pohjametreinä eikä niitä leivota uudelleen: pohja.json, reittiverkko, rasteri (Solu 0,5),
   esto.bin, pk2-reitit, avausavaimet, `JuoksuV4Reitti.Rekvisiitat` (lautaspöytä −139,6, 420) ja testien koordinaatit.
4. Kertoimella k kerrotaan vain kohdat, joissa pohjametristä tulee pelimetri:
   - kujan `Leveys` (P/JuoksuV4.cs:677), joka leikkautuu edelleen 3,6 metriin, joten kaistat pysyvät ennallaan;
   - profiilin t, sivu ja y (:702-707);
   - `LisaaRekvisiitat`-kohdan S (:664);
   - `AlueSade` 1200 (:249);
   - LOD-rajat Lod1 150 ja Lod2 450 sekä `PeittoRaja` 1100 (S/JuoksuSokkeloMaailma.Palatsi.cs:91, 376).
5. Itsestään seuraavat korkeuskartta (juuren kehys), katon häivytys, veden sijainti (`Maailmaan`) sekä esinepaikat
   osan pituuden osuuksina.

Vaihtoehto, jossa skaalaus tehtäisiin datassa, vaatisi uuden pohja.json:n, kaikki LR:n glb:t ja json:t sekä esto.bin:n
uudelleenleivonnan. Se on selvästi raskaampi, joten sitä ei suositella.

## Tuntumapäätökset (eivät geometriaa; ehdotan, että ne pysyvät ennallaan, ellei kerroin ole suuri)

- Puyin ja vartijoiden koko: JuoksuHahmot.cs:36, PuyiKorkeus 1,35 ja VartijaKorkeus 1,75.
- Vauhti: P/JuoksuV4.cs:1137, AlkuVauhti 5, MaksimiVauhti 7,5 ja Kiihtyvyys 0,03. Juoksuaika pitenee k-kertaiseksi.
- Kamera: P/DroneNosto.cs:131-157, YhtEtaisyys 7,88, PerusKorkeus 3,8 ja kuja 9,69 / 5,0. Säätöpaikka on `PeliEtaisyys`.
  Räystäskorkeuden ja kameran suhde muuttuu, joten länsiväylän matala kamera (2,4 m) pitää tarkistaa kuvalla.
- Avauslento: P/JuoksuAvaus.cs. Aikataulu on sidottu Puyin matkaan, ja Puyin splini ja SuuntaX/Z pitää skaalata samoin.
  Avaimet kulkevat `Maailmaan`-kohdan kautta, joten ne skaalautuvat.
- Sumu ja piirtoetäisyydet (Valosepän ValoKohteet.cs sekä SoluKoko 24 / LahiRaja 120 / LahipuuRaja 40 / SisustusRaja 70)
  ja farClip 2600, joka riittää, kun k on enintään noin 2.

## Testit

- T/JuoksuPalatsiTestit.cs `PohjaanKaanteinen` (:55) pysyy kunnossa, kun `Pohjaan` jakaa k:lla. Muut testit käyttävät
  synteettistä pohjaa.
- T/JuoksuAvausTestit.cs (avauslento-esteet.bin.gz) pysyy kunnossa, koska avaus on pohjametreinä.
- Uusi testi: Maailmaan(Pohjaan(p)) == p, kun k = 1,25.

## Ei skaalata

DroneNosto.Palkit ja maailma-v4.json kuuluvat vanhaan Codex-reittiin, joka ohitetaan, koska SokkeloKaytossa = true.
