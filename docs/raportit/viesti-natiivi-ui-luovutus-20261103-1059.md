# Natiivi-UI: luovutus 3.11.2026 klo 10.59 (pallot, reitit ja KK:n havainnot koodattu; Unity-käännös ja simu tekemättä)

Edellinen: viesti-natiivi-ui-luovutus-20261103-1046.md (sen jono 1–3 tehty). Syy: kontekstivahti 25 %.

## Tehty (proto `natiivi-ui/saapumiskuvat-nousu-218`, työpuu /Users/Shared/Claude/wt/proto-natiivi-ui-zoomaus-kaikkiin,
## peili natiivi-backup peili/proto/natiivi-ui/saapumiskuvat-nousu-218; KOE, ei junaan ennen PT:n kuittausta)
- **d7f906462** omistajan 10.38 pyyntö (KK:n kautta, PT 10.4x):
  1. Kuumailmapallot paikallaan: väistökulma (RuutuVaisto.Heilahdus) lukittu kartan liikkuessa (PalloKierto.Levossa false),
     levossa edellinen pidetään, jos vapaa (pysy-parametri; 0° voittaa). KaupunkiPallot.Pallo.Lukittu. Testi PalloPysyyPaikallaan.
  2. Pallot pois kohteen valinnan ajaksi: KaupunkiPallot.KohdettaValitaan (LiukuAuki, SiirtoKohteet, Matkareitit); matkalla jo piilossa.
  3. Reitit koko liikkumisen ajan: PeliOhjain.MahdollisetReitit = naapurireitit ∪ kantaman kaaret; KantamanKaaret päättelee myös
     välipisteettömät kaaret (kaupungista kaupunkiin), jotka ennen putosivat pois. Tulkinta PT:lle kerrottu.
- **40c4bbbc6** KK:n havainnot af7bea5d8:sta (PT 10.5x; /Users/Shared/Claude/proto-3d/lokit/kk-nousu-af7bea5d8-20261103/havainnot.md):
  1. Pyhä Paavali vasemmasta yläkulmasta: syy oli trailerin viimeisen kuvan merkintä "matkakirjasta" (Saapumistraileri) → pois.
  2. Isoisän kuva = Luentakuvasarja-kortti: kasvaa nyt Maalin (matkakirjakortti) vasemmasta yläreunasta (Nousee, TraileriLiike.KuvaKasvaa).
  3. Pariisi saavuttaessa: AloitusintroTulossa nousukokeessa vain alkulennolla (PeliOhjain.Aloitusintro.cs) → nykyintro nousulla.
  4. Tyhjä beige pieni kuva: nostojen (NostotKartalla.KuvaValmis) ja saapumisen (SaapumisKuvat.Pieni.Valmis) kuvat vasta ladattuina.
  5. Westminster: kyltillisen merkin pieni kuva kyltin (Nimio.worldBound) oikealle puolelle.
  Ei korjattu: KK 4 (LONTOO-otsikko 1 s yksin), KK 7 (Development Console simussa – JU varmistaa pienen iPadin versiosta).
- Kartta-testit RuutuVaisto 4/4 läpi. **Unity-käännöstä ei ole ajettu** (Luentakuvasarja.Nousee: style.translate.value-luku,
  GeometryChangedEvent; NostotKartalla: WorldToLocal(Rect)).
- JU: ensimmäinen asennuspyyntö (d7f906462) PERUTTU; uutta pyyntöä ei vielä lähetetty.

## SEURAAJAN JONO
1. Käännösvuoro JU:lta → simu 40c4bbbc6 (malli proto-3d/lokit/nui-nousupaikat-20261103/ajo.zsh): Lontoo (Paavali oikealta, isoisän
   kuva matkakirjasta, Westminster-kuva kyltin vieressä), paluu Pariisiin (nousu, ei sumeaa introa, Notre-Dame ilman tyhjää),
   pallot panoroidessa ja liikkumisessa, reitit nopan jälkeen. Kuvaparit PT:lle, 3 riviä.
2. PT:n kuittauksen jälkeen JU:lle: asennus PIENEEN iPadiin, KK katsoo ensin (PT 10.4x). Iso iPad (E) vasta PT:n kuittauksen jälkeen.
3. Vanhat: video iPadilta; veneet joen keskiviivaa (KS:n Seinen reitti); animaatiokuvien ämpärivienti PT:n luvalla; Codexin vana-otto.
