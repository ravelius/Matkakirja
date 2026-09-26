# Build 22 (26.9.2026, käännös 54c2f8fc, juna/b13 45398ff8)

iPhone yksin. Painopiste 163 (10 min lipputesti) + regressiot.

## Tulokset

- **163 (pallo jäi piirtymättä elävän kerroksen jälkeen): PASS, vahva todiste.** Avasin Alankomaiden
  kartussin (`ui kartuscha NLD auki`), lippu liehui 10 min (käynnistettiin klo 16.05.41, tarkistettiin
  16.15+). `simctl launch --console-pty` -kaappauksella saatu rivi:
  `MATKAKIRJA pallo kerros tila: elävä kerros KERROS, animoi: lippu@30, kaappauksia 17 (viimeisin 55.5 s
  sitten, 964×2097), kerroskehyksiä 15908, Cesium-näkymä pidetty, vartija 163 0` — "Cesium-näkymä pidetty"
  ja vartijan laskuri 0 (ei yhtään ongelmatapausta koko 10 min ajalta). kehysajat.jsonl vahvisti: koko
  ajan `tilat.kerros` 150–151/151, `taysi` 0 (paitsi yksi käynnistyspiikki alussa). Sama "Cesium-näkymä
  pidetty, vartija 163 0" toistui myöhemmin myös C-regressiotestin pallo lepo -rivillä — johdonmukainen.
  HUOM tekniikkaan: Unityn Debug.Log ei näy `simctl spawn log stream`:ssä eikä tiedostoihin — ainoa
  toimiva reitti on `simctl launch --console-pty ... > tiedosto` käynnistyksestä asti; `pkill` konsoli-
  prosessia vastaan sammutti myös itse sovelluksen (huomioi jatkossa, älä tapa launch-wrapperia kesken
  pelin, vain lue tiedostoa tai lopeta `simctl terminate`illa).
- **Regressiot C, D, E: PASS.** D (Athos) ja E (kaupunki ateena → valimeri) toimivat edelleen. C
  (offline-lepo): "ei lepää" väliaikaisesti Athos-heräämisanimaation ajan (odotettua, ei bugi), asettui
  "lepää"-tilaan ~10 s:ssa animaation loputtua.
- G ei uusittu (ei regressioepäilyä).

## Ei ehditty

164 (nimiöt väistävät kartussia/Liiku-nappia/pulua), myllyt Amsterdamissa (`elava myllyt tila`),
aloitusverho (laattaesilataus ≥ 80 % ennen mustan verhon lähtöä). 163:n 2× 10 min -testaus (ensimmäinen
kierros ilman konsolikaappausta, toistettu kaappauksen kanssa) vei suuren osan ajasta.

## Yhteenveto
163 vahvasti PASS (paras mahdollinen todiste: log + kehysajat + toistuva vahvistus). C/D/E PASS. 164,
myllyt ja aloitusverho jäivät testaamatta. Simulaattori sammutettu.
