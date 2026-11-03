# Natiivisepän luovutus 3.11.2026 klo 19.56 (konteksti 25 %, 7.37)

Vain voimassa oleva tila. Korvaa luovutuksen viesti-natiiviseppa-luovutus-20261103-1905.md. Sen viittaaman 1622-luovutuksen TILA-osio
(haarat, worktreet, simuketju, lukot, testit) on yhä voimassa: `git show afbe75860:docs/raportit/viesti-natiiviseppa-luovutus-20261103-1622.md`.
Id:t: /Users/Shared/Claude/osoitekirja.md. Cron Unity-beeta: luo uudelleen ("4 9 * * *", muisti unity67-paivitysseuranta).
Omia taustaajoja ei ole (JU:n 18.50-vahinko ei koskenut).

## SEURAAVA ERÄ (PT 19.5x): osa C – nähtävyyksien raivaus + piirtojärjestys esinekerroksessa. SHA PT:lle ja VS:lle.
Suunnitelma: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261103-pariisi-ylaviisto-ja-osakirjasto.md
(tekotapa 3, osa C). Raivausalue = nähtävyyden jalanjälki + reunus, vähennetään kortteleista; nähtävyys piirretään viimeisenä.
Mitä tiedän (ei vielä koodia):
- Talot piirtää VS:n tiilipiirtäjä: ElavaTyyli.PiirraVuokralla (koealue: `ka = ElavaKoealue.Loyda(z,x,y)`, talot kattoM[laji]-maskeihin
  ja talonReuna-maskiin, ~rivit 338–360; koostus KoealueKoostus ~588). VS tekee samaan aikaan osaa B (korttelitäyttö samassa tiedostossa)
  → sovi VS:n kanssa koukusta ennen kuin muokkaat ElavaTyyliä.
- Clipper2 ei ole projektissa; Pythonissa ei shapelyä eikä pyclipperiä. Kevyin tapa: reunustettu raivauspolygoni datassa
  (Resources/Esineet/<kaupunki>.json, esim. "raivaus": [[x,y,…], …] metreinä origosta tai lat/lon) ja tiilipiirrossa raivausmaski, joka
  nollaa kattoM- ja talonReuna-maskit (rasteri). Clipper2 C# (Boost) Assets/Plugins-kansioon vain jos polygonitason vähennys tarvitaan.
- Jalanjälki: OSM-rakennus (nähtävyyden way/relation) tai KS:n esinepaikkojen leveys + ankkuri; reunus säännöistä (saannot-isoisa-2029.json).
  Datatyökalu: proto-3d/_tyo/natiiviseppa/esineet/tee-esineet.py (lisää raivaus samaan ajoon).
- Piirtojärjestys: PiirrosKerros.Esineet.cs – nähtävyyslaji viimeiseksi (renderQueue tai lajien järjestys), puut ja aukiot ensin.
- Todistus (osa D): kooste ylhäältä (kooste.py) ennen/jälkeen + VS:n pelikuvat JU:n vuorolla.

## TEHTY TÄLLÄ VUOROLLA
- a92302399-analyysi: proto-3d/lokit/julkaisija-paketti-iso-a92302399-1856/NS-ANALYYSI.md. Alun VIKA poissa (80ea01172 todistettu PT:n mukaan),
  lähizoom ≤ 3,71 Gt. Keisarin noston VIKA = kartan UI-blurin 0,3 s liuku → NUI teki portaan 200f73222 (toimii: avauksessa ei piikkiä).
- 7ac89ff33 lähizoom-VIKA: proto-3d/lokit/nui-lahizoom-20261103/iso-7ac89ff33-2/NS-ANALYYSI.md. Ei regressio: kohdenosto aukesi ensi
  kertaa (aiemmissa ajoissa napautus osui pikkukuvaan), sulkunapautus himmennykseen ei sulkenut, lähizoom noston alla → UI-blur liikkuvalla
  kartalla. NUI:lla korjaus e971e1992 JU:lla (NUI:n luovutus 0989ccdab). Jos JU:n A/B näyttää pallon sumennuksen jäävän päälle → NS.
- Louvre v2: koealue-esineet-218 = **2e05fe9c3** (peili pushattu). PT:lle kerrottu: JU vie kirjaston kuvat ämpäriin ennen laitetta.
- NUI:n elävä kartta 20b21efee: yhdistämisohje proto-3d/_tyo/natiiviseppa/esineet/YHDISTAMINEN.md (PiirrosPohjana && !Koealue).

## AVOIMET
1. Pelikuvat (osa D) kokoaa VS JU:n vuorolla → korkeusportaat ja ruutuajat / muisti isolla iPadilla ennen ja jälkeen.
2. Moni kaupunki: toiselle ElavaKoealueelle VS:ltä nimihaku (ElavaKoealue.Nimella).
3. Vanha jono: 354 ms PostLateUpdate → xctrace (JU:n laitevuoro); GC-haara vasta PT:n luvalla.

## TILA
- Uudet: wt/natiiviseppa-luovutus-2015 (tämä). wt/proto-natiiviseppa-koealue = natiiviseppa/koealue-esineet-218 (2e05fe9c3). Älä poista.
- wt/proto-natiiviseppa-lahtoraja = lahto-raja-218 (80ea01172); wt/proto-natiiviseppa-haivytys = loppurajaus-9b9-218 (aaaed4758).
- Worktreet natiiviseppa-luovutus-2015, -1905, -1845, -1708 ja -20261103-1622 saa poistaa mergen jälkeen.
