# Build 23, loput kohdat (7533a651) — myllyt PASS, 164 ja aloitusverho FAIL

Jatko edelliseen (1cb59546c). Karuselli jätetty väliin Fablen ohjeella (Linssiseppä korjaa erikseen).

## Tulokset

- **Myllyt (Zaanse Schans/Zaandam, `elava elementit tila`): PASS.** Kamera `aja 52.4735 4.8166 0.3 1.5`:
  kolme tuulimyllyä näkyy oikealla paikalla, maahan ankkuroituina (ei leijuntaa, toisin kuin karuselli).
  Loki vahvistaa: "myllyt näkyvissä (peitto 1,00), 220 kolmiota". Ei havaittua siipien pyörimistä kahden
  peräkkäisen kuvan välillä — sama joutosyke-asettuminen kuin lipulla/karusellilla, ei virhe.
- **164 (piste piiloon kalusteen alta): FAIL, toistettavissa.** Vedin karttaa (`veto 0.9 0.85 0.75 0.7 1`)
  niin että nostomerkki (musta piste) siirtyi suoraan pulu-hahmon (kalustus) päälle. Piste jäi TÄYSIN
  NÄKYVIIN pulun pään päälle piirrettynä kahdessa peräkkäisessä kuvassa (vakaa tila, ei siirtymäglitchi) —
  ei hävinnyt eikä väistänyt. Fablen alkuperäinen kuvaus "nimiöt väistävät kartussia, Liiku-nappia ja
  pulua" mainitsee pulun nimenomaisesti, joten tämä on validi testitapaus. Ei testattu erikseen kartussia/
  Liiku-nappia vastaan ajanpuutteessa.
- **Aloitusverho (laattaesilataus ≥ 80 % pallo ennen verhon lähtöä): FAIL, selvä lukema.** Kylmästä
  käynnistyksestä (console-pty koko ajalta): `MATKAKIRJA aloitusverho: pois 8,4 s (pallo 2 %)` — verho
  lähti 8,4 s:ssa pallon ollessa vain 2 % ladattu, ei ≥ 80 %. Samassa kohdassa myös
  `verho aloitusverho lähti katto 8382 ms aste 1,5 % kevennys paalle (aloitusverho, rinnakkain 24)` —
  "kevennys paalle" saattaa selittää aikaisen lähdön (valmius-kevennys aktiivinen oletuksena).

## Yhteenveto Fablelle/Natiivisepälle
Myllyt PASS. **Kaksi FAILia**: 164 (piste ei piiloudu pulun alle, toistettavissa vetokomennolla) ja
aloitusverho (pallo 2 % kun pitäisi olla ≥ 80 %, kevennys saattaa olla syy). Karuselli jätetty väliin
(Linssisepän korjaus tulossa). Simulaattori sammutettu turvallisesti.
