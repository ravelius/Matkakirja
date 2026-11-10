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
