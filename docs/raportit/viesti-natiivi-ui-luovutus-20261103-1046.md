# Natiivi-UI: luovutus 3.11.2026 klo 10.46 (saapumisen kuvat KS:n paikoilla simussa OK; seuraavaksi kuumailmapallot ja reitit)

Edellinen: viesti-natiivi-ui-luovutus-20261103-0935.md (sen jono 1–3 tehty). Syy: kontekstivahti 25 %.

## Tehty 09.35 jälkeen (proto `natiivi-ui/saapumiskuvat-nousu-218`, työpuu /Users/Shared/Claude/wt/proto-natiivi-ui-zoomaus-kaikkiin,
## pohja 8d18d7047; peili natiivi-backup peili/proto/natiivi-ui/saapumiskuvat-nousu-218; KOE, ei junaan ennen PT:n kuittausta)
- **618323429 nostojen pienet kuvat (C)**: Pariisi ja Lontoo, kohdenoston jutun 1. kuva (Kohdenostot.Kuva) 18 pt:n kutsuminiatyyrinä
  nostomerkin lapsena nimiön vastakkaisella kyljellä (NostotKartalla.AsetaKuva / AsetaKuvanPaikka) → seuraa porrastusta (2.204) ja
  25 m:n sääntöä, piirroksella kyltin mittakaavassa. Napautus suurentaa (SaapumisKuvat.SuurennaNosto; napautusta EI testattu simulla).
- **af7bea5d8 KS:n paikat (B, PR 6116 yhdistetty)**: Kaupunki.Esittelypaikat (skeema 1.69 kaupungit.esittelypaikat {tiedosto: {lat,
  lon, kohde}}, SisaltoTuonti.Esittelypaikat), SaapumisKuvat.Paikka(kaupunki, osoite, nro) tiedostonimellä; paikoitetussa kaupungissa
  paikaton → keskusta; kaupunki ilman paikkoja → väliaikaiset pisteet (KS:n 58 kaupungin erä tulossa samaan kenttään).
  Vara kunnes paketissa: Assets/Matkakirja/UI/Resources/Kohdenostot/esittelypaikat-vara.json (poista, kun vienti tuo kentän).
- Simu (yhteinen-iPad13): 618323429 → proto-3d/lokit/nui-nousukoe-20261103/tulos.md (Bryssel OK); af7bea5d8 →
  proto-3d/lokit/nui-nousupaikat-20261103/tulos.md (Pariisi C1–C4 ja Lontoo oikeista pisteistä, Tower Bridge ruudun reunalta).
  Molemmat PT:llä; KK:n reunaesimerkki PT:n kautta (kehykset/kk-esimerkki-reunalta-tower-bridge.jpg).
- PT 10.1x: ALOITUSINTRO (Pariisi joka käynnillä, sumea + William) PIDETÄÄN ENNALLAAN, ei nousua; PT kysyy KK:lta.

## SEURAAJAN JONO (PT 10.4x, omistajan pyyntö 10.38 KK:n kautta; samaan pakettiin juna-218:n päälle; rivi PT:lle per kohta)
1. **Kuumailmapallot pysyvät paikallaan kartalla** (nyt vaihtavat paikkaa panoroidessa). Haku: grep -il "ilmapallo" (UiNakymat.cs,
   KarttaesineGalleria.cs, UiKomennot.cs ym.).
2. **Pallot POIS näkyvistä kohteen valinnan ja matkan ajan.**
3. **Liikkumistilassa mahdolliset reitit näkyvät koko ajan**, myös nopanheiton jälkeen kohdetta valittaessa (nyt häviävät).
   Haku: PeliOhjain.Liiku.cs, PeliApu.cs.
   Big Ben vain lähizoomille → KS (ei NUI).
4. Valmis → JU asentaa PIENEEN iPadiin ja KK katsoo ensin (PT 10.4x). Ison iPadin vuoro (E) vasta PT:n kuittauksen jälkeen.
5. Vanhat: video iPadilta; veneet joen keskiviivaa (KS:n Seinen reitti); animaatiokuvien ämpärivienti PT:n luvalla; Codexin vana-otto.

Ajoskriptien malli: proto-3d/lokit/nui-nousupaikat-20261103/ajo.zsh (SHA sed:llä; käännösvuoro JU:lta, VAPAA lopuksi).
