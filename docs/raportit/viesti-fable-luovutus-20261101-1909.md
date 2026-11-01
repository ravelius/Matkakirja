# PT:n luovutus 1.11.2026 klo 19.09

Edellinen: viesti-fable-luovutus-20261101-1615.md (säännöt voimassa). Osoitteet: /Users/Shared/Claude/osoitekirja.md.
Viestit send_message id:llä. Syy: konteksti 30 %. `date` ennen aikaleimoja.

## OMISTAJAN PÄÄTÖKSET 16.15 JÄLKEEN (lokissa PR 5884, 5885; lupa-asetukset PR 5888)
- 18.22 "Kyllä": kaupunkien lähin taso VAIN keskustaan ja nähtävyyksien ympärille, muualla lähin zoom = välitaso; kaikki kaupungit.
  Pariisi: 65 palaa (64 + r03c10 Sacré-Cœurin yläosa), rengas 4 peruttu Codexilta. 0,5 m/px -keskusta poistettu (13.54 linja).
- 18.2x + 18.30: juna 216 TF:ään ILMAN testejä, kun Pariisi valmis; 30.10. valoehto ohitettu tämän julkaisun osalta.
- 18.3x: "mutta näytä kuvat ensin. Täytyy katsoa, että tekstit erottuvat…" + nähtävyyksille paremmin erottuva teksti →
  TF ODOTTAA omistajan hyväksyntää NUI:n Pariisi-kuville (KK välittää). JU (4ba381068) tietää ehdon.
- 15.3x: Pariisin karikatyyrin napautus avaa Nähtävyysarkin suoraan (NUI e0bcdadf0, junassa).
- 18.5x: lupa-asetukset palautettu (KK, PR 5888) – KS:n b09eb0ee3 oli committannut .claude/settings.local.json:n (deny SendUserFile ym.).
  KS ohjeistettu: ei koskaan stageta .claude/settings*.json.

## PT:N PÄÄTÖKSET
- VS:n kuvat: SendUserFile EI näy omistajalle (jää VS:n ikkunaan) → VS lähettää koonnin polut suoraan KK:lle send_messagella + kopio PT:lle.
  Postivahti lisää VS:n aloitusviestiin. Muistissa kuvaparit-pt-lle-kk-lle-vain-pyydetyt.md.
- Aurinko yksi koko juoksussa (45°/318°), ei kohtakohtaista aurinkoa (VS:n löydös 01).
- Salin aurinko + katto ei heitä salissa (990497d2f) – PT 25.10. linja voimassa.
- G-alueen (Pariisin keskusta) tyyliero: ei uusintaa nyt; pelikamerakuva G:n reunalta myöhemmin, uusinta vain jos näkyy.
- Nimikyltit: kohdekartan kyltti + vaalea paperitäyte --tk-kuulto-paper-82 (olemassa oleva token); Palais d'Orsay ja Orsayn taidemuseo
  molemmat jäävät (eri kohteita); Sainte-Chapelle EI kohdenostoksi → KS:n poltettujen maamerkkien alat, NUI väistää.
- Botin uupumiskorjaus (PK) EI.

## JUNA 216 (runko a711ee8be = 12e66804b Pariisi + VS varjo2 1a60b2499; testit 2223/787/585)
Rungossa tänään: leivottu valo oletus (PK ad98dfc8f), varjot kujat/05 (0e357fe46), sali 04 (990497d2f), läikät 03 + 07 usva
(7bec74dfa), NUI napautus (e0bcdadf0), KS Pariisi (1fe11dd1b), Puyin varjo/Ultra-editori + pilviraidat (1a60b2499). 60 fps: 94 → 77.
AVOIN, järjestys:
1. NUI: nimiöt natiivi-ui/piirros-nimiot-216 (viimeisin 9abb5ff41 + Notre-Dame/☰ b9d742ed5 + väistö KS:n maamerkkialoista
   tasot-20261101/ankkurit/pariisi-maamerkit-alat.json) → kuvat KK:lle → OMISTAJAN OK → NS runkoon → JU kääntää TF:n heti.
2. VS: elävä täyttö 0,7 KUITATTU (4696919fb) → NS samaan TF-runkoon jos ei viivettä. Kokeet: 01-kamera ab1dcb2b2, vesi 0fc3617ba.
3. PK: odottaa LAV:n rakennukset-v92:ta. Portti (kaari) kuitattu.
4. KS: luovutusvuorossa (27 %). Pariisi valmis; muut kaupungit samalla mallilla vasta omistajan aloituksella.

## MUUT
- Postilaatikon monitori: seuraa origin/claude/postilaatikko-refiä (EI FETCH_HEADia – git pull sotki sen). Viritä uudelleen.
- Asemataulu: Juna 216 -rivit 19.07 asti; työlista: Pariisin nähtävyysikkuna. Skriptit scratchpad/pt-taulu.py, pt-popup.py.

## Säännöt, jotka opin
- Tarkista, näkeekö omistaja kuvan oikeasti (SendUserFile toisessa sessiossa ei näy hänelle).
- Editorikuvat Mobile-laadulla valehtelivat varjoista – vertaa samalla laatutasolla kuin laite.
- Nollauksen yli menevät käskyt: lähetä myös Postivahdille aloitusviestiin, muuten ne katoavat.
