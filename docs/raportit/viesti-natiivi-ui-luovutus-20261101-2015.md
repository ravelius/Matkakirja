# Natiivi-UI: luovutus 1.11.2026 klo 20.15 (Pariisin nähtävyysnimikyltit)

Edellinen: viesti-natiivi-ui-luovutus-20261101-1727.md. Syy: konteksti yli pehmeän rajan (Raamattu 7.37).

## Erä: Pariisin piirroskartan nähtävyysnimet erottuviksi (omistaja 1.11. 18.3x PT:n kautta)
Omistaja: "näytä kuvat ensin. Täytyy katsoa, että tekstit erottuvat tarpeeksi hyvin. Ja noille nähtävyyskohteille voisi tehdä
paremmin erottuvan tekstin, jotta pelaaja osaa klikata niitä."

Haara proto **natiivi-ui/piirros-nimiot-216** (worktree /Users/Shared/Claude/wt/proto-natiivi-ui-piirros-nimiot), pohja juna 216
12e66804b (sis. KS:n lähitaso 1fe11dd1b; NS: käy myös a711ee8be:hen). Uusin **c9c18d5f4**.
- 870726ff6: piirroskerroksen kohdenoston nimiö kohdekartan nimikyltin asuun (Kartta.uss `mk-nosto-merkki__nimio--kyltti` =
  `.mk-kohdekartta__kyltti`: täyte 3,2/8,8, raja map-ink-55, hiuskulma, paperihalo; NostotKartalla.AsetaKyltinMuste, KyltinReunus).
- db8b3d39b: paperitäyte `--tk-kuulto-paper-82` (läpinäkyvä ei erottunut; **PT OK 18.5x**, poikkeaa 14.10. läpinäkyvyyslinjasta –
  omistaja päättää kuvista). Kuvat KK:lle lähetetty: lokit/todistus-piirros-nimiot-db8b3d39b-20261101-1853/kk/.
- b9d742ed5: Notre-Dame PiirrosKyljet "oikea" (ala-nimiö osui Panthéonin kupoliin); KartanNapit + lasi, ☰ ja matkakirjakortti
  (nostonimiöt väistävät yläkulman nappeja – koskee kaikkia karttoja).
- 9abb5ff41/fb17a7686: Louvre näkyy piirroskerroksessa pyramidipallosta huolimatta (Yhdessa: PiirrosTila && Piirros ≠ null);
  Notre-Damen PiirrosAlat (600, 850, 120); Kutsuminiatyyri valitsee paikan uudelleen piirroskerroksen vaihtuessa ja väistää
  karikatyyrit (NostotKartalla.Piirrosalat, PiirroksenAikana).
- a628ebd18 + c76b4b66f: KS:n poltettujen maamerkkien alat Resources/Kohdenostot/poltetut-alat.json ({"pariisi": [{nimi,p,e,l,i}]},
  10 kpl, KS:n lähde _tyo/karttaseppa/pariisi-pohja/codex-pseudo3d/tasot-20261101/ankkurit/pariisi-maamerkit-alat.json);
  NostotKartalla.PoltetutAlat lukee, puuttuva = ei aloja.
- e599c62a4: esteinä VAIN poltetut alat (kohdenostojen arvioidut alat piilottivat Eiffel-tornin nimen välitasolla, simu c76b4b66f-b).
  Ala ei estä nostoa, jonka piste on sen sisällä.

- c9c18d5f4: poltetun alan poikkeus vain samannimiselle kohdenostolle (ja PiirrosPeitot-nostolle alan sisällä); pelkkä piste alan
  sisällä päästi Grand Châtelet'n Notre-Damen tornien päälle (simu e599c62a4-b).

## KESKEN
- Kuvat c9c18d5f4 lähetetty KK:lle ja PT:lle 20.1x: lokit/todistus-piirros-nimiot-c9c18d5f4-20261101-2005/kk/ (1–4 + selitteet).
  Tila: Eiffel ym. nimet välitasolla, lähimmässä Louvre ja Notre-Dame nimettyinä, Grand Châtelet ja Les Halles piilossa (ei tilaa),
  Pariisi-kortti piilossa (ei tilaa renkailla 8–36 pt), Trocadéro piilossa välitasolla (Eiffelin ala). Todistus PUUTE "pitkät ruudut
  99" = vaihe "ulkona" (simu/GPU), skriptivaiheet 1 ms.
- Omistajan OK → merge-pyyntö NS:lle (local_99130238) junaan 216: natiivi-ui/piirros-nimiot-216 c9c18d5f4. PT: jos omistaja
  hyväksyy, TF lähtee. Omistajan kommentit → korjaukset samaan haaraan.
- Orsay: Palais d'Orsay ja Orsayn taidemuseo molemmat jäävät (PT); väistö estää päällekkäisyyden.
- Muiden kaupunkien poltetut alat: KS tekee samaan muotoon (nimi → pohjoinen/etelä/länsi/itä), muunna poltetut-alat.json:iin.

## Opit
- Todistusajo voi epäonnistua simusta (HID-virhe / mykistys ei vastaa): aja pelkkä aja.zsh uudelleen samalla .app:lla.
- Kohdenostojen PiirroksenAla on napautusala (arvio), ei piirroksen ala: kaikilla kohdenostoilla ei ole poltettua kuvaa.
