# Hyppypenkin marmori – kaksi versiota, 28.10.2026

Pelikoodarin 27.10. tilauksen rajattu materiaalikorjaus. **v01 on suositus:** lämmin valkoinen, hienovarainen harmaa suonitus. v02 on viileämpi ja hieman selvemmin kuvioitu vaihtoehto. Valitaan toinen; molempia ei tarvitse ottaa peliin.

- Mallit: `models/v01/hyppy-penkki.glb` ja `models/v02/hyppy-penkki.glb`.
- 244 kolmiota, 3.40 × 0.54 × 0.706 m; alkuperäinen geometria, normaalit, indeksit, solmut ja origot säilyvät täsmälleen. Granit ja turkoosi ovat muuttumattomia.
- Ainoastaan `VIS_ivory` / `Maailma_ivory` saa uuden materiaalin, tangentit, UV:t ja jalan alareunan lievän likaa kuvaavan vertexvärin. Alkuperäisessä penkissä ei ollut UV-koordinaatteja. Nykyinen viistegeometria säilytetään; kulmia ei ole muotoiltu uudelleen.
- Neljä 1024 × 1024 PNG:tä / versio. Kukin kattaa 2 × 2 m, eli 512 px/m. UV-koordinaatit voivat olla alueen 0–1 ulkopuolella: **Repeat**, ei Clamp. Vain uuden ivory-materiaalin UV:t ovat käytössä.
- Albedo sRGB, ilman leivottuja valoja/AO-varjoja. Normal OpenGL +Y, linear. Roughness linear. MetallicRoughness on glTF-pakkaus: R=255, G=roughness, B=0 (marmori ei ole metalli). GLB sisältää albedon, normalin ja pakatun MR-kartan.
- Roughness noin 0.425–0.495. Normal on hyvin matalaa hiotun kiven pintaa; värisuonia ei tulkita syviksi halkeamiksi. Mapit ovat periodisia; UV-alueen pinta-alan mittatarkkuus on tarkistettu kaikilta ivory-kolmioilta.
- Pohjan kevyt likasävy on `COLOR_0`:ssa, ei varjokartassa. Lukijan tulee tukea vertexvärejä, jos tämä hienovarainen yksityiskohta halutaan mukaan.

`esikatselu/penkki-ennen-ja-marmorit.png` näyttää todelliset GLB-mallit samasta suunnasta: vanha, v01, v02; kokonaiset penkit ja lähikuvat. Tämä on kevyt CPU-värivertailu, joka lukee UV Repeatin ja vertexvärit. Se ei arvioi pelin PBR-valoa, normal/roughness-vastetta tai suorituskykyä. Lopullinen pelikuva/KK/omistajan hyväksyntä on avoin.

Lähteet ja kaksi täyttä ImageGen-promptia ovat toimituksen viereisessä `sources/`-kansiossa. ImageGen: 2 kutsua, ei uusintoja. Tripo: 0 kutsua, 0 krediittiä. ImageGenin rahakustannusta työkalu ei ilmoittanut. Valmiin penkin teksturointi ei tarvinnut uutta Tripo-geometriaa.
