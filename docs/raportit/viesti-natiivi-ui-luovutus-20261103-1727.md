# Natiivi-UI: luovutus 3.11.2026 klo 17.27 (konteksti 26 %; kaatumismittaus JU:lla, Pariisin osa C koodattu, testialoitukset A seuraavaksi)

Edellinen: viesti-natiivi-ui-luovutus-20261103-1706.md (sen jono 1 tehty tässä, 2–4 voimassa alla).
PT:n JÄRJESTYS (17.2x): kaatuminen → A (suorat aloitukset) → Pariisin osa C.

## Tehty
- **1e5e36755** (proto natiivi-ui/muistihuippu, wt/proto-natiivi-ui-keisari, peili natiivi-backup peili/proto/natiivi-ui/muistihuippu):
  kuvalokin muistiriville MuistiTarkka.Natiivi() = fp/gfx/malloc/int/comp/huippu (task_vm_info, kytkimestä riippumatta);
  MuistiTarkan T-riville verkot (Mesh-määrä, puskurit, suurimmat), muistivaroitus pyytää T-rivin, U-riville "ugfx" (Gfx Used Memory).
  tarkista.sh 0 virhettä. JU otti pakettiin b8018882b fd7a9c739:n sijaan; PT: JU ajaa sen NS:n b2a1d27b7:n (gc-mvt) kanssa samalla
  polulla 2 toistoa. NS:n mittaus 17.08: lähizoomin +410 Mt on CPU-varauksia (MVT-purku), ei GPU:ta.
- Havainto 16.55-lokista: −970 Mt tuli heti "aja 48.862 2.320 0.03" -komennon jälkeen ennen ensimmäistä pitkää ruutua.
- Mittausskripti: proto-3d/lokit/nui-lahizoom-20261103/mittaa.zsh iso <sha> (muisti-tarkka.txt 100 ms päälle, sama reitti kuin 16.55,
  hakee muisti-tarkka.log + kuva-loki, kytkin pois lopuksi; EI asenna). JU:lle annettu; voi ajaa itse LAITE NYT ISO -vuorolla.
- **c60372ead** Pariisin koealue OSA C (proto natiivi-ui/koealue-218, wt/proto-natiivi-ui-koealue, peili peili/proto/natiivi-ui/koealue-218):
  PiirrosKerros.Koealue.cs + Resources/PiirrosEsine.shader + Resources/Piirros/koealue-pariisi.json (KS:n esinepaikat + 5 143 puuta,
  tyokalu proto-3d/_tyo/natiivi-ui/koealue-20261103/tee-data.py). Kytkin PiirrosKerros.Koealue (komento `koealue paalle|pois|tila|nayta`):
  piirros pois (pariisissa=false → laatat, veneet, tähdet vapaaksi, striimi ei tauolle, ei ennakkolatausta), Nakyvyys 0 → kyltit ja
  nostot todellisiin koordinaatteihin. Esineet: yksi GraphicsBuffer (itä, pohjoinen, leveys m), RenderPrimitives per kuva (13), ENU→maailma
  _EsineMatriisi joka kehys, korkeus MaanpintaH 80 m; häivytys kulma×korkeus kuten piirros, Suorista-nappi ja saapumisen suoristus
  koealueella. Kuvat: Documents/koealue/ (devicectl) tai ämpäri <PariisiOsoite>esineet-koealue-20261103/ + esineet.json (ankkuri_px).
  Koot (m): puut 9/13/17/22 ±10 %, aukiot 18/30/46, suihkulähde ≥ 16, nähtävyys = itä–länsi-laajuus × kerroin (NahtavyysKuvat).
  tarkista.sh 0 virhettä. AJAMATTA: Codexin kuvat eivät vielä tulleet (KS välittää: _tyo/codex/pariisi-koealue-20261103/_review-koealue/).
  Valoseppä/NS tekee pohjan (osa B); kerro heille kytkin PiirrosKerros.Koealue, jos tyyli rajataan koealueeseen.

## SEURAAJAN JONO
1. Kaatuminen: JU:n ajon tulos (1e5e36755 + NS b2a1d27b7) → lue muisti-tarkka.log: N-rivit (fp/gfx/malloc 100 ms), T-rivit varoituksessa,
   kuva-loki fp/gfx; kerro PT:lle mihin luokkaan ~970 Mt meni (MVT-purku NS:n alaa → NS). Edellisen luovutuksen jono 2 (luennan syyrivi,
   kuvamerkit ympyröinä JU:n paketista) ja 3 (Mono-keko 524 → 1100 Mt) voimassa.
2. OSA A (PT 17.19 + 17.2x, suunnitelma Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261103-testien-suorat-aloitukset.md):
   osio "Suorat aloitukset" OLEMASSA OLEVAAN UI/Testinakyma.cs:ään (ei uutta valikkoa), linkki matkakirja://testi/<nimi>, "ui testi <nimi>",
   komento "aloita <nimi>". Rivi = valmis tallennustila, ei uutta peliä eikä introa. Selvitetty: Testihypyt.cs (Peli-asm) askeleet
   Peliin/Pallo/Napauta/PeliRivi/Linssi; tallennus Documents/tallennus.json (PeliOhjain.TallennusPolku, Matka.Lataa, versio 9,
   pelaajat[0].sijainti "c:pariisi"); PeliOhjain.Jatka(), OhitaLuento(), OhitaAloituslento(), UusiPeli(siemen, lahtokaupunki).
   Ehdotus: uusi askel Tallennus (Resources/TestiAloitukset/<nimi>.json → tallennus.json, omistajan tallennus ensin varmuuskopioksi
   Documents/tallennus-ennen-aloitusta.json ja lokiin) + Jatka; askel Komento (kartan "aja lat lon zoom", "ui luento <k> loppu",
   peli-komento "matka pariisi bussi", juoksupelin taso/sali). Ensimmäiset: pariisi-lahizoom, pariisi-keski, lontoo-kylma,
   bussi-lontoo-pariisi, juoksupeli taso 1 + salit ys/tj/cx/ty/xf, peking. Valmis-rivi "MATKAKIRJA testinäkymä: hyppy <id> perillä"
   (JU:n ja NS:n skriptit, osat B ja C, odottavat tätä). Todistus: alle 15 s käynnistyksestä isolla.
3. Osa C jatkuu kuvien tultua: kuvat Documents/koealue/ isolle → kuvapari nykyinen | koealue samasta rajauksesta 3 zoomilla (lähin, keski,
   laaja; omistajan 15.40-kuvat), nähtävyydet kokonaan → PT. Koot säädetään parista. Kytkin ⚙:ään vasta omistajan katseluun.
4. Keisari (luovutus 1626 jono 3) voimassa.
