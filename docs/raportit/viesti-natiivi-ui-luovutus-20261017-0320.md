# Natiivi-UI: luovutus 17.10.2026 klo 03.20 (Postivahti: kova raja 36 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Korvaa -0140:n jonon; -0140:n ja -0105:n "Opit" ovat yhä voimassa.
Viestit send_messagella id:llä (/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-worktreet /Users/Shared/Claude/wt/proto-natiivi-ui-*.
Ajot: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ajo-<erä>.zsh <app-kansio> <udid> <iphone|ipad>
(iPhone 123B4B25-36B7-4A76-B677-905621CD8F5A, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962), app-kansiot proto-3d/_tyo/natiivi-ui/<erä>-app.
Simu VAIN Julkaisijan SIMU NYT -viestistä, SIMU VAPAA perään. Kuvat PT:lle ennen kytkentää; kytkimet oletuksena pois.

## ENSIN: 198-SIMUKETJU (Julkaisijan SIMU NYT 03.10, ≤ 25 min) – tarkista tulos
Ketju ketjut-20261016/simu-198-0310.zsh, tuloste _tyo/natiivi-ui/simu-198-0310.out (rivit "AJO <erä> <koodi>", lopuksi VALMIS).
Järjestys: museo-kevyt iPhone (VALMIS 03.15, todistus-museo-kevyt-iphone-198-20261017-0311) → iss-luettelo iPad → iss-luettelo iPhone
→ kamerapöytä iPad → kamerapöytä iPhone. Jos ketju katkesi nollauksessa (tuloste kesken), aja puuttuvat erikseen Julkaisijan luvalla.
TILA 03.33: museo-kevyt iPhone OK (todistus-museo-kevyt-iphone-198-20261017-0311, arkkia EI vielä lähetetty PT:lle – katso ja lähetä).
iss-luettelo iPad JUMIUTUI 03.19:46 komentoon `ui linssi kohdevalikko kategoria kaupungit` (ei vastausta 12 min, sovellus piirsi
ruutuja; todistus-iss-luettelo-ipad-198-20261017-0315/ajo.log) → ketju pysäytetty, simu vapautettu. SELVITÄ ENSIN: IssKohdevalikko
kategoria-testikomento (natiivi-ui/iss-luettelo-198) – palauttaako se arvon / jääkö pääsäie odottamaan; korjaa, käännä, aja uudelleen.
Kamerapöytä iPad + iPhone ajamatta (käännös 93a97749f valmis). Pyydä Julkaisijalta uusi SIMU NYT.
Lähetä PT:lle kunkin kuva-arkin polku (lokit/todistus-<erä>-<laite>-198-*/kuva-arkki.png) + 1 rivin havainto. Sitten:
1. LASIPOHJA5-STILL (PT/KK:n ehto, PT 03.1x): `zsh ajo-lasipohja5-197.zsh _tyo/natiivi-ui/lasipohja4-197-app <iPhone> iphone`
   (V3 pienennetty | V4 laajennettu: CC BY -tekijärivi kokonaisena laajennettuna) → PT. VASTA PT:n kuittauksesta SHA e9a2852b4
   (natiivi-ui/lasipohja-197, käännös 230844ff8) Natiivisepälle junaan 198. Sitten SIMU VAPAA Julkaisijalle.

## KÄÄNNETTY 03.27, SIMUT SS:n mittauksen ja muiden 198-simujen jälkeen (Julkaisijan SIMU NYT): skanneri 324a0ca76, cupola-ohita2 6f0b8bceb, kehys-kaaro 2b258669e
| erä | sha | haara | simu |
|---|---|---|---|
| skanneri-viivat-198 (KS 158e90cd9 päällä) | 5c2cb709b | natiivi-ui/skanneri-viivat-198 | ajo-skanneri-viivat-198 iPhone (Kiova, Marseille, Bergen) |
| cupola-ohita2-197 (Ohita vasemmalle pois Pulun päältä) | dc48eb887 | natiivi-ui/cupola-ohita-197 | ajo-cupola-ohita2-197 iPhone + iPad, 1 still → PT → KK |
| kehys-kaaro-198 (UUSI POHJA KEHYS-KÄÄRÖ) | 9365854c2 | natiivi-ui/kehys-kaaro-198 | ajo-kehys-kaaro-198 iPhone, 198-simujen jälkeen (Kiina nyt / käärö, pysty + vaaka) |
Käännetyt: museo-kevyt 6d5cb5ac8 (a7327efa2), iss-luettelo b850a9818 (e208d45fe), kamerapöytä 93a97749f (1ff45e88e), lasipohja4 230844ff8.

## VALMIIT TÄSSÄ SESSIOSSA (lyhyesti)
- Cupola Ohita -video OK (todistus-cupola-ohita-iphone-197-20261017-0127); löydös Pulun päällä → dc48eb887.
- Lasipohja-197: Äänet-lasi Kehys.Panel2 (kontrasti ≈ NYK), lasikortin puolikas alarivi leikataan levossa (Nostokortti.LeikkaaPuolirivi,
  ajastin 250 ms, loki "lasin puolikas alarivi leikattu"); todistus-lasipohja4-iphone-197-20261017-0306 OK, ohjaamo -lasipohja2-…-0146 OK.
- Museo-kevyt: museon lähestymisen nimi ei katkea kesken sanan (Tietajagalleria.SovitaSana, a7327efa2).
- KEHYS-KÄÄRÖ: UI/KehysKaaro.cs (9365854c2) + web-tyylikirja PR #4762 (Julkaisija mergeää vihreänä). LS kytki sen Kiina-linssiin
  (linssiseppa/kiina-valmis-198, AikajanaNakyma.cs) – älä muokkaa samaa kohtaa. Web-worktree natiivi-ui-kehys-kaaro → --poista mergen jälkeen.
- Skannerin viivat (5c2cb709b): IssSkanneri.ViivatKaytossa=false, `ui linssi skanneri viivat 0|1`, LÄHTEET-rivi.
- Kamerapöytä (1ff45e88e): IssKamerapoyta.Kaytossa=false, `ui linssi kamerapoyta …`.

## Opit
- run_in_background-ajot kuolevat session nollauksessa → pitkät ketjut nohupilla tiedostosta (ketjut-20261016/kaynnista-*.zsh).
- Lasipohja.Ota lisää luokan ilman geometrian muutosta → luokasta riippuva asettelu tarvitsee ajastimen tai oman tapahtuman.
- Kuvan tekijärivi (CC BY) ei saa kadota: leikkaa vain puolikas rivi, rivi näkyviin laajennettuna / vierittäen.
- tarkista.sh menettää suoritusoikeuden työpuussa ajon aikana (100644) → `chmod +x` ennen committia.
