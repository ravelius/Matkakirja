# Natiivi-UI: luovutus 14.10.2026 klo 18.0x (nollaus, PT:n pyyntö, konteksti 51 %)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261014-ilta.md (säännöt: PT
local_74630a27, viestit send_messagella id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md, PT:lle ≤ 3 riviä, ääni aina
mykistetty, nollaus Postivahdin kautta). Ajoskriptit: /Users/Shared/Claude/proto-3d/lokit/natiivi-ui-ajoskriptit-20261012
(irrota.pl <skripti> <ketjuloki>; <aihe>-kaanna.sh + <aihe>-simu(t).sh + sk-<aihe>.txt; pari-arkki.py / uusi-arkki.py). Arkit:
proto-3d/lokit/natiivi-ui-arkit-189. L1/L2-käännökset ja asettelutestit VAIN Julkaisijan KÄÄNNÖS NYT -viestillä, simut SIMU NYT
-viestillä (Julkaisija local_22b29f10); ilmoita aina LUKKO VAPAA / SIMU VAPAA perään. Natiiviseppä (NS) local_bf20055b.

## Kuitattu ja NS:lle annettu tässä vuorossa (ei toimia, ellei NS kysy)
Juna 190 (rungossa NS:n mukaan): iss-palaute-190 b868f24c9, intro-savy-190 3c3344018, iss-loppu-190 db8e7b193 (8c5f5af75),
tekstilaatikot-b-190 5ac350679 (erät A+2 omistajan päätöksellä "Nämä pohjalle": pohjalla Pulun kupla, aikajanan valikko,
maakortti, maakuntalappu, lehti; muu läpinäkyvä) + 5548828ad (aikajanan valikko täysin peittäväksi).
Juna 190, NS:lle annettu, rungossa EI VIELÄ VAHVISTETTU (juna-190 kärki 18.0x oli 1cb729f7a):
- cupola-musta-190 1f1ad970d (junan 190 EHTO: Cupolan latausruutu mustalla, NASA-kuva pois, teksti jää 3 s Cupolan päälle;
  videot todistus-cupolamusta-{iphone-20261014-1639,ipad-20261014-1642}).
- kutsunimi-191 72738fd4b (PT: JUNAAN 190, koska heikennys tuli tekstilaatikot-erästä): kaupunkikutsun nimi kuvan päällä vaalea +
  tumma varjo (kuvapari natiivi-ui-arkit-189/kutsunimi-nyk-uusi.png). Annettu NS:lle 17.58, jonossa.
Juna 191 (kuitattu, NS:lle annettu): aloitusnimi-191 9d93e518d (Pariisi-nimi pelinappulan ohi, KaupunkiMerkit.cs) ja
lippu-vaisto-191 fb5354b4d (lipputangon väistö ei vilku: Lipputanko.Ennuste + ruutuala mallin localBoundsista, mittaus myös
paneelin alla; videot todistus-lippuvaisto-iphone-20261014-1744).
Hylätty / käyttämättä: tekstilaatikot-c-190 (erä 3), raketti-fakta-191 ja tarkistus-191 (PT: ääriviiva sotkuinen, nykyinen riittää).

## AVOIMET (järjestys)
1. Varmista NS:ltä (list_events tai rivi), että cupola-musta 1f1ad970d ja kutsunimi 72738fd4b ovat juna-190:ssä, ja juna 191:n
   aloitusnimi + lippu-vaisto vastaanotettu. Jos NS kysyy ristiriidoista: molemmat 190-haarat suoraan juna-190:n päällä.
2. Jono muuten TYHJÄ → rivi PT:lle "JONO TYHJÄ: Natiivi-UI", ellei PT ole antanut uutta.

## Opit
- Asettelutestin kartta on harmaa (ei laattoja) → luettavuutta kartan/kuvan päällä ei voi todistaa asettelutestillä; käytä simua.
- Tekstilaatikon läpinäkyvyys: tarkista myös koodissa piirretty pohja (Rakenne.Tausta Kuviot.*) ja lapsen oma pohja; kuvan päällä
  olevalle tekstille vaalea + tumma varjo (0 1px 2px rgba(0,0,0,0.9)), kartan päällä muste + kerman hehku.
- Paksu ääriviiva pienessä tekstissä = PT hylkää (muisti aariviiva-pienessa-tekstissa-sotkuinen).
- Todistusajon kuva-askel myöhästyy 1–3 s skenaarion merkinnöistä → ajoitusta vaativat (häivytykset) todista videoruuduista
  (ffmpeg fps=2 -kontaktiarkki).
- issloppu2-simut.sh: uuden todistuskansion tunnistus korjattu (vanhat kansiot listataan ennen ajoa).
- Odotussilmukassa älä käytä pgrep -f:llä merkkijonoa, joka on oman komentorivisi osa (lukkiutui itseensä).
- Worktreet: wt/proto-natiivi-ui-{introsavy (haarat aloitusnimi-191, lippu-vaisto-191, kutsunimi-191), issloppu (raketti-fakta-191,
  tarkistus-191: käyttämättä), cupolakuva-b (cupola-musta-190), tekstilaatikot (b/c-190)}; vanhat {issauto, kohdevalikko,
  kertomuskuvat, cupolakuva, laatikot-nyk} voi poistaa (SHA:t rungossa).
