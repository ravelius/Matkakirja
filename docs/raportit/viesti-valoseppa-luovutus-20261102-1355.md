# Valosepän luovutus 2.11.2026 klo 13.55

Syy: konteksti 25 % (pehmeä raja, kontekstivahti). Edellinen: viesti-valoseppa-luovutus-20261102-1228.md (pysyvät työtavat
-20261101-2124.md ja -2220.md voimassa). Loki: `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/JONO.md` (02.11. 12.33–13.5x).
Skriptit `_tyo/linssiseppa2/skriptit-20261031/`: rae.py, rae-koonti.py (sama rajaus vierekkäin), varjovari.py (kansio, jossa peli.png + havainne.png).

## VALMIS JA RUNGOSSA
- Rappausrae 9a5662f71 (`_JuoksuRappausRae`, QA `valo savy rae k v r a`, oletus läikkä 0,25) → runko 218 8aa129301 (NS, ancestry tarkistettu).

## PT:N KUITTAAMA LISTA (13.2x, järjestys sitova; lokit/havainne-editori-20261102-125535/erot-vs.md)
Ehdot: uusi leivonta → tilaus LAV:lle ja jatka seuraavasta; jokaisesta pari samasta rajauksesta PT:lle ennen junaa; ei koodia junaan ilman kuittausta.

### 1) 04 salin valojuovat: KESKEN, syy löytyi, tarvitsee PT:n päätöksen
- Pelin 04: lattia katon alla täysin valaistu (aurinko 241/231/224 vs havainne 203/184/177), ei pilarien valojuovia.
- sali04c (esikatselu-20261102-132848): leivottu/elävä/heitto 1 → lattia 209 kaikissa → katto ei heitä varjoa missään tilassa.
- QA `valo kattotieto` (uusi, f8eb37cfe) näyttää KAKSI syytä:
  (a) EiHeita: salissa juhlasalin katto ja palkisto eivät heitä varjoa TARKOITUKSELLA (PT 25.10. 13.1x, JuoksuSokkeloMaailma.PaivitaSaliAurinko,
      `ValoKohteet.JuoksuSaliKattoVarjo = false`; silloin "katon varjo peitti koko lattian"; salin oma aurinko itäikkunoista). QA `valo salikattovarjo 1`.
  (b) Keisarin ollessa sisällä katon pääpala on piilossa (`Sovella`: r.enabled = false) → ei varjoa, vaikka heitto On.
  sali04f (esikatselu-20261102-135020, sali-pari.jpg: salikattovarjo 0 | 1 | havainne): pelkkä (a) ei muuta mitään, koska (b) jää.
- KOKEILTU: d39c3b581 (piilotettu katto ShadowsOnly, QA `valo piilokatto`) ei toiminut: alkuperäinen varjotila tallentui Off:ksi EiHeita-tilasta,
  ja PaivitaKappaleet kirjoittaa shadowCastingModen yli. HYLÄTTY (ei haarassa).
- SEURAAVA: (1) kysy PT:ltä, kumotaanko 25.10. linjaus (salikattovarjo päälle), koska havainne 04 = hämärä sali + ikkunoista valojuovat;
  (2) korjaus (b): piilotettu katto → merkintä (HashSet piilossa), jota PaivitaKappaleet käyttää: piilossa ja h → ShadowsOnly + enabled,
  muuten ennallaan; Sovella ei koske varjotilaan. (3) Ajo 04 + 01 02 05 (regressio), pari PT:lle.

### 2) Katettujen tilojen mustat sisäosat: EI ALOITETTU
- mustat (< 25) 02 1,8 %, 03 2,5 %, 05 3,3 % vs havainne 0,1–0,4 % (02 käytävän katos, 03 salin ovet, 05 porttikäytävä; 05 osin LAV:n geometria).

### 3) Punaisten seinien kirkkaus: SUUNTA SELVITETTY, EI MUUTOSTA
- Aurinko on sama kuin havainteiden (45°/318°, PT 1.11.). Havainteet eivät ole fysikaalisia: 05:ssä oikea seinä heittää varjon lattialle ja on itse
  auringossa; 02:ssa molemmat seinät valaistuja. → Auringon suuntaa ei muuteta.
- Todellinen ero: VARJOSEINÄT tummat: punaisen p25 02 102/35/29 vs 156/47/35, 05 86/19/16 vs 109/34/26; auringossa 01 221/90/81 vs 242/115/77 (lähes ok).
  Ehdotus PT:lle: maan heijastus pystypinnoille (QA `valo savy maavalo r g b` olemassa) koeajona 02 03 05.

### 4) 06 lattian kylläisyys: EI ALOITETTU (aurinko 253/242/235 kyll .07 vs 241/214/195 kyll .19; myös 04 .07 vs .13)

## Worktree (proto-3d)
- wt/proto-linssiseppa2-seinat218: haara linssiseppa2/sali-218 = runko 218 8aa129301 + f8eb37cfe (QA valo kattotieto; ei vielä kuittausta,
  diagnoosityökalu, voi mennä junaan kohdan 1 korjauksen mukana). Haara rae-218 rungossa.

## LISÄYS 2.11. 13.5x: PT:N PÄÄTÖKSET SEURAAJALLE (sitovat)
1) PT:n 25.10. linjaus KUMOTTU (PT:n, ei omistajan): `JuoksuSaliKattoVarjo` = true (salikattovarjo 1). Lisäksi (b): piilotettu katon pääpala
   heittää varjoa edelleen (ShadowsOnly piilotettuna; ks. kohta 1 SEURAAVA (2): merkintä, jota PaivitaKappaleet käyttää), jotta sali on hämärä
   kuten havainne 04. Valojuovat ikkunoista ERIKSEEN (keila tai valokuvio ikkuna-aukoista): juovien osuus lattiasta mitattuna ~25 % (havainne).
   Pari tasaisessa vertailussa (sama rajaus) PT:lle.
2) Seinät: suunta pysyy; maavalo varjoseinille OK, mittaa kirkkaimmat arvot havainnetta vasten (punaisen p90+/p25-, ks. JONO 13.5x).
3) Sitten kohdat 2 (katetut tilat mustia) ja 4 (06 lattia).
