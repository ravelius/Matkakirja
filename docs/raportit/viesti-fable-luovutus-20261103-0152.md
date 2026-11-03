# PT:n luovutus 3.11.2026 klo 01.52

Edellinen: viesti-fable-luovutus-20261102-2248.md. Osoitteet: /Users/Shared/Claude/osoitekirja.md.
Syy: konteksti 30 % (pehmeä raja). `date` ennen aikaleimoja. Vahdit Monitorilla (30 min, viritä uudelleen):
/Users/Shared/Claude/hooks/codex-posti-vahti.sh ja /Users/Shared/Claude/hooks/odottajat-vahti.py.
Viestit: mcp__ccd_session_mgmt__send_message session id:llä. Junarivit tools/asemataulu/juna.py, työlista tyolista.py
(juna.py ei korjaa jo tallennettua virheellistä riviä → poisto .tmp + os.replace, tarkista-junat.py perään).
PT mergeää luovutus-/raportti-PR:t (docs-only) itse; koodi-PR:t JU.

## YÖVALTUUTUS (omistaja 2.11. 22.25) jatkuu: KK hyväksyy omistajan puolesta (yo-hyvaksynnat-20261102.md)
KK:n päätökset tässä vuorossa (EI vielä lokissa → kirjaa `node tools/raamattu-kirjaa.mjs` aamulla tai seuraava PT):
- 23.29 saapumisodotus: (a) pysyy "zoomaus alkaa vasta, kun tasot valmiina"; esilataus kohteen valinnasta + taustaennakointi.
- 01.50 iPadin latauskuvat vaaka+pysty hyväksytty (PK); taso 1 + 8 salia palautettu PK:lle (kamera seinän/oven läpi:
  taso1 40 s, yk, tj; kattonäkymässä Puyi 8 s poissa: th, ty).
- 01.50 zoomaus + nostot kaikkiin kaupunkeihin (NUI 82634eb4b) junaan 218; NUI:lta mergepyyntö JU:lle.

## AAMULLA OMISTAJALLE (KK:n kautta, KK tietää)
- Saapumisen odotus (a) vs (b): videot proto-3d/lokit/natiiviseppa-saapuminen-video-sim-20261103/saapuminen-{a,b}-pieni.mp4.
  Mitattu Iso iPad: kylmä 30 s (raja), lämmin 23 s, ennakoitu 0 s; kylmä yleinen jos lähtee < 4 min. KK suosittaa (b).
  NS:n esilataus (natiiviseppa/esilataus-218 2cf83b7c3) ja NUI:n ilmaisinkytkentä (SaapumisKarttaOdottaa) odottavat valintaa.
- Sen jälkeen video Lontoo/Bratislava/Pariisi (myös tarinoiden esiintulo zoomatessa).
- TOIMI: CoreDevicen asennusvälimuisti 37 Gt → omistaja ajaa
  `rm -rf ~/Library/Containers/com.apple.CoreDevice.CoreDeviceService/Data/Library/Caches/AppInstallationBinaryDeltas/fi.matkakirja.peli.kehitys`
- Codex hiljaa 22.29 lähtien: auki Pariisin palat 1–15 (KS), palatsin pronssit (LAV lepää niiden takia), arkiset hahmot (PK).

## AUKI JA KENELLÄ
- NS (nollattu 01.2x, f723e6680): ENSIN KK:n videohuomiot (tyhjät/valkoiset ruudut zoomauksessa a 32/36 s, b 6/7 s,
  loitonnuksessa oranssi rinnevarjo-ruutu), sitten GC osa 3–4 (gc-mvt-218 8b2c66f8d). Yhdistä laitemittaukset yhteen asennukseen.
- NUI: E valmis + kuvat KK:lla; 82634eb4b junaan (mergepyyntö JU:lle). Muuten lepo a/b-valintaan asti.
- KS: B+D (6047, 6049) ja kohdetunnisteet (5986, 9 pistettä korjattu, Bukarest) mainissa; lepo Codexin paloihin asti.
- VS (nollattu 01.5x, 88352c9c5): ISS-ilmiöt kokeina aidoista NASA-kuvista: salamat → hurrikaani → pimennyksen varjo
  (2026-kuvan puuttuessa 2024/2017 ulkonäkö, PT päätti) → tähdenlennot. Sade valmis kokeena (sade-218 5ed5f95e2:
  suihkut, märkä kivi myös mu3b, sääkoukku PK:n kanssa, sadeääni, hahmon varjo); junaan vasta äänen laitetarkistuksen jälkeen.
  Etna z2 3D-pylväs/kartio = jatkoidea, ei nyt. VS otti kerran linjan ilman JU:n vuoroa → muistutettu.
- PK (nollattu 02.0x, 174764034): KK:n palautus (kamera seinän läpi, Puyi poissa kattonäkymästä), sitten eunukkikorjaukset,
  ristikko-ovet, arkiset hahmot (Codex). Maali-hattu korjattu 31094e036.
- LAV: lepää pronsseihin asti (siirsi 21 Gt T7:lle).
- JU: jono tyhjä; paketti v947.
- Postivahti nollattu 00.5x (luovutus Matkakirja-posti/docs/raportit/viesti-postivahti-luovutus-20261103-0050.md).

## LEVY
Klo 23.4x 13 Gi → nyt ~31 Gi. LAV ja NS siirsivät ~45 Gt T7:n proto-arkistoon symlinkein, roolit poistivat mergetyt
luovutus-worktreet. Syöjä: CoreDevicen delta-välimuisti (yllä TOIMI) + swap 22 Gt. Muisti: levy-coredevice-asennusvalimuisti.

## OPPI
- Rooli luovuttaa usein ennen kuin PT:n kuittaus ehtii → nollauksen jälkeen lähetä kuittaus uudelleen (tarkista grep luovutuksesta).
- Luovutus-PR:t jäivät auki (KS, PK) → PT mergeää ne kierroksella.
