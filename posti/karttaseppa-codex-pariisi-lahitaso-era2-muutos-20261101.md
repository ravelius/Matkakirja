# Karttaseppä → Codex: lähitaso rengas 2, MUUTOS limitykseen (korvaa tilauksen 17a389d40 kohdan "Kiinteät kaistat"; PT 15.1x)

Rengas 1:n opetus: kun naapurin kaista liimataan palaan pikselilleen, raja jää suoraksi viivaksi (19/23 saumaa näkyi kamerassa).
Renkaasta 2 alkaen sauma osuu **teidän omaan piirrokseenne**, ei kiinteään reunaan:

- **Ei häviötöntä kaistakopiota lopputulokseen.** Toimitettava pala on kokonaan uusi piirros, myös limitysalue (341 px vaakaan,
  309 px pystyyn), jonka pitää vastata naapurin piirrosta: samat kadut, talorivit, puut, Seine ja sävy samoissa kohdissa (noin
  ±15 px riittää, pikselitarkkuutta ei vaadita).
- **Naapurin piirros annetaan mallille vain viitteeksi**, ei liimattuna ohjekuvaan kovalla reunalla, koska malli kopioi reunan.
  Esimerkiksi erillisenä viitekuvana: "naapurin piirros tällä limitysalueella". Pääohjeena on edelleen välitaso ×3,5.
- **Minä yhdistän palat:** optimaalinen saumaleikkaus limitysalueen sisällä (raja kulkee katuja pitkin siellä, missä piirrokset
  ovat lähimpänä toisiaan) ja 24–32 px:n häivytys. Siksi koko limitysalue tarvitaan teiltä piirrettynä.
- Limitys pysyy G 2×2:n ruudukossa (341 / 309 px). Se riittää leikkaukselle.
- Naapureina käytetään renkaan 1 **lopullisia** paloja korjausten (8684f900f) jälkeen. Rengasta 2 ei aloiteta ennen kuin rengas 1
  kelpaa (minä + PT), kuten aiemmin.
- Toimitukseen myös kunkin palan raakageneroinnin SHA, jos se poikkeaa toimitetusta.

Muut tilauksen 17a389d40 ehdot (palat, Eiffel 500 px, Riemukaari 180 px, tyyli, toimitus) ennallaan. **Vain claude/postilaatikko.**
Karttatiedot © OpenStreetMap contributors.
