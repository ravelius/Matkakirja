# Natiivi-UI: luovutus 3.11.2026 klo 16.26 (TILINVAIHTO; muistihuippu kolmena korjauksena, laitetodistus isolla kesken)

Edellinen: viesti-natiivi-ui-luovutus-20261103-1600.md (89f25142d). Sen jono 1–2 on tässä käsitelty; kohta 3 (keisari simulla,
keisari Pekingin kartalle, 1501-avoimet) on yhä voimassa.

## Tehty (proto, työpuu /Users/Shared/Claude/wt/proto-natiivi-ui-keisari, haara natiivi-ui/muistihuippu, peili natiivi-backup
## peili/proto/natiivi-ui/muistihuippu; 693cf437f:n päällä; unity-tarkistus 0 jokaisessa, kielivahti ok)
- **b0753ecc0** (PT 16.4x): Kuvat.EsilataaLevylle DownloadHandlerFile (ei hallittua puskuria, FRA 181 kuvaa); Kuvat.PuraTavut
  LoadRawTextureData(IntPtr) + alfan suoristus työsäikeillä (ei ~40 Mt:n hallittua kopiota); Application.lowMemory karsii kuvien
  LRU:n 12:een ja puolittaa rajan; NostoSisalto.EsilataaKuvat kerran maata kohden (JU: toistui 5× 25 s välein); kuvalokiin keko +
  LRU, rivit "nostokortti auki", "maan kuvien esilataus alkaa/jonossa", "MUISTIVAROITUS".
- **2411d699b** (PT 16.5x, lähizoom tekstuurit 734 → 996 Mt): Kohdenostot.HaeVahvistettu haki piirrokset täysikokoisina LRU:hun →
  uusi Kuvat.HaeSivulla (pitkä sivu ≤ raja; iOS ImageIO-pienoiskuva taustasäikeessä) 320 px, välikuva Poista.
- **44ecc31d1** (omistaja 16.11 "Kartan pikkukuva" kaatoi pienen): SaapumisKuvat.Suurenna haki alkuperäisen (alle 1 Mt:n jpg
  täysikokoisena, 4000 px ≈ 48 Mt) ja jätti LRU:hun → HaeSivulla ruudun pitkällä sivulla + Poista, kun kuva palannut.
- JU kääntänyt laiteappin: proto-3d/lokit/julkaisija-laite-218-44ecc31d1/Matkakirja3D.app (16.18).
- PIENI cb1b5d9fc toisto (omistajan tallennus, ei asennusta, konsoli kiinni): EI kaatumista; LRU 133 → 204 Mt neljästä kartan
  pikkukuvan avauksesta (vahvistaa 44ecc31d1:n syyn). Omistajan tallennus palautettu identtisenä, lukko vapautettu, JU:lle VAPAA.
- Isoisän luenta (JU: ei tullut 693cf437f:llä): JU:n polku `ui jatka` kaupungissa → VaiennaPaikanPuhe → LuentoOhitettu →
  IsoisanLuenta palaa heti. Oikea saapuminen (Perilla) nollaa lipun. Omistajan cb1b5d9fc on ENNEN luennan palautusta (693cf437f),
  joten puuttuminen siinä odotettu. EI VIELÄ todistettu oikealla matkalla (PT: Lontoo → Pariisi + jatkettu peli).
- Kaikki tiedot: proto-3d/lokit/nui-muistihuippu-b0753ecc0-20261103/tulos.md (+ mittaa.zsh, iso-ajo.zsh, pieni-cb1b5d9fc/).

## SEURAAJAN JONO
1. ISO 44ecc31d1 laitetodistus (JU antoi LAITE NYT ISO NS:n vierityksen jälkeen; ajo pysäytetty tilinvaihdon takia ennen alkua):
   `IPAD_ODOTA=3600 zsh /Users/Shared/Claude/wt/proto-natiivi-ui-keisari/tyokalut/ipad-lukko.sh kaari natiivi-ui -- zsh
   /Users/Shared/Claude/proto-3d/lokit/nui-muistihuippu-b0753ecc0-20261103/iso-ajo.zsh` (taustalle; asentaa 44ecc31d1, mittaa,
   jättää 693cf437f). Katso: konsoli-1/2 "isoisän luenta esittelyn jälkeen alkaa" (oikea saapuminen ja jatkettu peli), kuva-loki
   vapaa/tekstuurit lähizoomissa vs JU 693cf437f (734 → 996 Mt, vapaa 2353 → 1406), ei MemoryWarningia. HUOM: tarkista ensin, että
   `matka lontoo peninkulma` toimii Pariisista (konsolista); jos ei, vaihda mittaa.zsh:n reitti. Tulos 3 riviä PT:lle.
   Vahvistus muistikorjauksesta = pieni ei kaadu 44ecc31d1:llä: asennus pienelle VASTA KK:n ASENNA-luvalla (PT 16.1x).
2. Raamattu 2.205 (59d1c45af, omistaja 16.22 pienellä iPadilla): kaikki kartan kuvamerkit (saapumisen pienet kuvat SaapumisKuvat,
   nostot, 2.138:n miniatyyri) samanlaisiksi pieniksi pyöreiksi kuin nostojen merkit, ei neliöitä, yksi merkki per kohde, napautus
   suurentaa nopeasti (TraileriLiike.KuvaNousee / NousuS). Tee natiivi-ui/muistihuippu-haaraan 44ecc31d1:n jälkeen → simukuva
   kartalta (Pariisi saapumisen jälkeen) + avausvideo/ruudut → PT.
3. Edellisen luovutuksen jono 3 (keisari simulla 1087abf41:llä JU:n SIMU NYT -vuorolla, keisari Pekingin kartalle KS/PK, 1501-avoimet).
