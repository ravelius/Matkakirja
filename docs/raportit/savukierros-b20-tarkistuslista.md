# Savukierros build 20 (luonnos, Natiiviseppä/Natiivi-UI 26.9. ~08.3x)

- Kylmäkäynnistys → aloitusverho ≤ 5,3 s: laitemittaus (Natiiviseppä; Pelikoodari mittasi 4,1 s toisella simulaattorilla).
- Lepopiirto verkottomana: `ui offline verkoton`, levossa `pallo lepo` (komento.txt) → syyrivi "ei lepää (…)". HUOM: Debug.Log EI näy
  simctl --stdout:ssa (tiedostoa ei synny) eikä `log stream`:ssa → pyydä syyrivi peli-loki.txt:hen (kuten `ruutu`).
- Marathon → Attika pysyvä väri (nosto-muste): Attiki pysyy 8 s herätyksen jälkeen (Natiivi-UI m2-loyto.png).
- Salaisuuskortti (sisältö v149+): `muste loyda kohde:hahmotelma-athos` (peli-komento) → MaakuntaValmis GRC:Ayion Oros;
  `ui kartuscha GRC auki` → rivi "Maakunnan salaisuus löytyi: …", napautus avaa kortin; suoraan `ui nosto salaisuus:salaisuus-deinokrateen-vuori`;
  ilman peliä `ui muste salaisuus GRC:Ayion Oros`.
- `huntu paljastus 38.42 27.14 200 40` (komento.txt; lokiin "MATKAKIRJA huntu: paljastus …"; näkyy vain hunnutetulla alueella, ei omassa maassa).
