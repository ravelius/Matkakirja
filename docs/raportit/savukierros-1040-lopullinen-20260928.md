# 1.0.40 lopullinen lyhyt savuke (Laitetestaaja, 28.9.2026 klo 23.3x)

Käännös 60f69fe4 (juna/b13 8de5b3df: 1ad1c538 + kortti-napautus b3046146 + luenta-jatko e667523e
+ lukijan valikon korjaus 7247e31a). Laite 1572C658. FB234D08 (Natiivi-UI) käynnissä samaan aikaan.

## Tulos: PASS (kohdat 1–3, 5), kohta 4 epäselvä telemetria — ei estä

1. **Asennus+käynnistys: PASS** (törmäsi tunnettuun rekisteridesynciin — "No such process" — korjautui
   `simctl uninstall` + tuore `install` samasta buildista, sen jälkeen puhtaasti).
2. **`ui aloita ateena` tuoreesta käynnistyksestä: PASS** — 15 s lento, päivä alkoi heti (08.03),
   ei hidastumista, siisti saapuminen (näyttävä "ATEENA"-saapumiskortti).
3. **Nostokortti (Delfoi) LISÄÄ + lukijan kaiutin: PASS** — kaiutin käynnisti luennan
   (`aani mittaa`: rms 0,117, `[MatkakirjaPuhe:@1,00]`), **kortti pysyi täysin auki** koko ajan
   (ei enää sulkeudu, korjaus b3046146 toimii).
4. **Luenta jatkuu keskeytyksen jälkeen: EI SELVÄÄ NÄYTTÖÄ.** Testasin manuaalisella
   kaiutin-napautuksella pause/resume: `aani mittaa` vahvisti tauon (rms 0) ja jatkon (rms>0), mutta
   `puhe palat`-telemetria näytti molemmat kappaleet (235 mrk + 179 mrk) toistuvan uudestaan alusta
   ("jatkettu kesken" pysyi 0:ssa koko ajan) — en pysty telemetrialla erottamaan, oliko tämä oikea
   "jatka keskeytyksestä" -polku vai vain uusi toisto. En testannut taustalle siirtoa/puhelua, joka
   saattaa olla oikea keskeytystapaus tälle korjaukselle. **Ei kaatumista, ei virhettä** kummassakaan
   tapauksessa — jos tämä on blokkaava epäilys, tarvitsen Natiiviseppältä tarkan
   testausohjeen millä komennolla/toiminnolla "keskeytys" simuloidaan luotettavasti.
5. **Lukijan valikko (mini-hampurilainen): PASS** — ensimmäinen napautus avasi valikon
   (lukujen 1/2 listaus, nopeus/ääni-säätimet) ja käynnisti luennan kappaleesta 1 ("otsikosta"),
   ei väärästä kohdasta. Kortti pysyi auki.

## Laite
1572C658 terminate+shutdown siististi. Ei uusia poikkeuksia/virheitä peli-lokissa.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
