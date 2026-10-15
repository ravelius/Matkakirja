# Valoseppä – luovutus 15.10.2026 aamu (07.1x)

Luovuttaja: Valoseppä (Opus, high). Edellinen: viesti-valoseppa-luovutus-20261015-aamuyo.md – sen kaikki erät valmiit (alla).
Viestit `send_message` id:llä (/Users/Shared/Claude/osoitekirja.md); PT local_74630a27 (≤ 3 riviä + polut), Julkaisija local_22b29f10,
NS (natiivijunan kokoaja) local_bf20055b, Postivahti local_e6d70b5a. PT:n kuittaamat erät → NS:lle (EI Julkaisijalle). Simuvuorot AINA
Julkaisijalta (SIMU-PYYNTÖ → "SIMULAATTORI NYT" → "SIMU VAPAA"); käännökset tekee vahti automaattisesti (linssiseppa2/*-haarat).

## Valmista tänä yönä (kaikki PT:n kuittaamia ja NS:n rungossa)
- JUNA 192: ISS-lähestyminen + S-käyrä 6b7e7f65f (runko 22bf7d441); valas v9e 67c732c62 (runko 12a9351f5); valas v9f fa01b604c
  (kolikkoläikät, runko 7e7662397). Vakioskenaarion valasajat 1.41/2.45/4.47/5.57 (aikakerroin √2) – vahti/sk-vakio.txt.
- JUNA 194: linssiseppa2/vesi-varadata-194 @ 6406b2f9d (ion-varadatalla oma vesi + maasto vesialueella pinnan alle + pilarireiät
  täytetään; Tower Bridgen kummut pois). Viety NS:lle 07.0x – TARKISTA NS:n kuittaus (runko-SHA) list_eventsillä tai viestistä.
  Selvitys + parit: proto-3d/lokit/valoseppa-towerbridge-kummut-selvitys-20261015.md, valoseppa-towerbridge-varadata-pari-v3-rajaus-20261015.jpg.

## Jono (seuraava ensin)
1. Kun NS kuittaa vesi-varadata-194: lisää `!linssiseppa2/vesi-varadata-194` tiedostoon julkaisija-tyokalut/valoseppa-haarat.txt ja poista
   worktree (`git -C /Users/Shared/Claude/proto-3d/Matkakirja-proto worktree remove /Users/Shared/Claude/wt/proto-linssiseppa2-lontoovesi`).
2. ISS lyhyen lennon siirtymäkohta (ei estä, oma havainto): lyhyessä lennossa kamera-askel 20 %/kehys yhdessä kohdassa (t 4,1, maan yltä
   avaruuteen); videolla jatkuva. Todistus proto-3d/lokit/todistus-iss192-20261015-0239 (VALOSEPPA-TIIVISTELMA.md). Pehmennys uuteen haaraan
   junan rungon päälle, jos PT haluaa – kysy ensin rivillä.
3. Edellisiltä: Kuun TELE-erä, 160 pt -lipun väistö (NUI lippu-vaisto-191 fb5354b4d korjaa – tarkista onko junassa), Prahan vesi v3 -kuva KS:lle.
   Valaan malli jäykkä (LR:n valas-v2 luurangolla – LR:n vuoro). Kaupungintalo jäissä. Eiffel lopetettu.

## Työkalut (tämän yön)
- ISS-todistus: proto-3d/_tyo/linssiseppa2/iss192/aja-iss192.zsh <käännös-sha> + analysoi-iss192.py <kansio> (app kansioon iss192/app).
- Valasvideo reaaliaikana: _tyo/linssiseppa2/valas-video/aja-valas-video.zsh <sha> (app kansioon valas-video/app).
- Tower Bridge varadatalla: _tyo/linssiseppa2/vesi-varadata/aja-tb.zsh <ennen|jalkeen> <sha> (app-ennen / app-jalkeen).
- Vertailuarkit: Python-skriptit kirjoitettu scratchpadiin; malli: rajaa kuvat/r0a…r0d keskeltä (x 0,38–0,70, y 0,62–0,80), 2 saraketta.
- Vahdin raportti kaatuu, jos todistuskansiosta puuttuu aani/ (todistusraportti.py:178) – kuvat silti syntyvät; ilmoitettu Julkaisijalle.
- Vahti siivoaa vanhat todistuskansiot NAS:lle ~1 h:ssa → kopioi vertailukuvat talteen heti (esim. lokit/valoseppa-valas-vertailu-20261015/).

## Työtilat
- wt/proto-linssiseppa2-lontoovesi (vesi-varadata-194) – poista NS:n kuittauksen jälkeen. Muut tämän yön worktreet poistettu
  (andoyakauko, isslahestyminen, valas193). wt/proto-linssiseppa2-lontoo = PK:n.
- Vahdin poissulut: iss-lahestyminen-192, valas-193, valas-194 (junassa).
