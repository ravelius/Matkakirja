# Natiivi-UI: luovutus 9.11.2026 klo 22.05 (kontekstivahti 25 %; korvaa -1721:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870,
KS local_7b57e35a-3a8e-4943-aba1-c960b9eb4671. Tarkistus `sh Linssit-testit/unity-tarkistus.sh`. Skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/.

## 1. Valmiit ja kuitatut (ei jatkotoimia)
- Ketju natiivi-backup natiivi-ui/kuvaotsikko = 0e4db4471 (Temple-piste, kuvaotsikko, ✕-piste, aarrekulma, 3D-tähti + tähti kuvamerkin ylle):
  OMISTAJA 19.06 Kelpaa → junaan 224 (JU poimii). Junahaara natiivi-ui/kadonnut-tahti = 75e5b3f22.
- orbit-nipistys b75419ad3 kuitattu junaan 224. Pienen iPadin laiteajo odottaa omistajaa.
- Katsotut arkit _tyo/natiivi-ui/*-katsottu/. Temple-tekstin ja kuvan ristiriita = KK:n sisältöasia (PT vei).
- ND Templen kierrossa = KS:n VaistaEsteet-laajennus ab57114e5 (KS:n koodi, ei NUI:n).

## 2. KESKEN: pelin koko osa 2 – Offline-kartat tuovat 3D-talot (PT 21.4x, suunnitelma
   /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261109-pelin-koko.md)
- Rajapinta: KS /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/pelin-koko-talot/RAJAPINTA.md; NS:n TaloLataus (natiiviseppa/talolataus 6d829d2b7):
  LataaKaupunki/Peru/Tila/PoistaKaupunki. ÄLÄ koske lukijaan (TaloLataus) eikä Rakennus.cs:ään.
- NUI: natiivi-backup natiivi-ui/offline-talot = 0fcccc9aa (worktree /Users/Shared/Claude/wt/proto-nui-talolataus), unity-tarkistus 0.
  OfflineSilta: FRA→pariisi, GBR→lontoo; Lataa/Peru/Poista koskevat taloja; koko+edistymä talojen kanssa; Valmis vasta talojen kanssa;
  jo ladatun maan puuttuvat talot haetaan kerran istunnossa itsestään; virhe "3D-talot jäivät kesken". Komennot ui offline lataa|peru|poista|tila <ISO3>, ui offline paneeli.
- AJO JU:lla (pyydetty 21.5x, uudelleenkäynnistyksen jälkeen varmistettu 22.04): sk-offline-talot-1.txt Mac → lokit/nui-offline-talot-1-mac-0fcccc9aa.
  Katso: o-1 Ranskan rivin koko sis. talot (~96 Mt), lokissa "offline: talot pariisi (FRA) latautuvat" → "levyllä", tila Latautuu→, peru → Ei,
  poista → "talot lataus: pariisi poistettu" tai "jäävät (käytössä…)" (pelaaja Pariisissa: odotettu). Arkki PT:lle 3 rivillä.
- Avoin: StreamingAssets/talot/*.json ei vielä tässä haarassa (KS:n/NS:n työ); sitä ennen vain `komento talot ampari <kansio>` -kokeet.

## 3. Jono tämän jälkeen
- Offline-talot-ajon tulos → korjaukset tarvittaessa → PT:n kuittaus. Muuten tyhjä → rivi PT:lle "JONO TYHJÄ: Natiivi-UI".
