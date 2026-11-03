# Natiivi-UI: luovutus 3.11.2026 klo 09.35 (saapumisen kuvat nousevat kaupungista, KOE; odottaa JU:n vuoroa)

Edellinen: viesti-natiivi-ui-luovutus-20261103-0834.md (sen jono 1–2 tehty). Syy: kontekstivahti 25 %.

## Tehty 08.34 jälkeen
- **Latausilmaisin + matkan nosto** simussa L2 8c901aefe OK (nimi luettava, palkki näkyy; pari
  proto-3d/lokit/nui-saapumisilmaisin-20261103/pari/). PT kuittasi; NS mergesi runkoon **natiiviseppa/juna-218 8d18d7047**.
  Konsolin maxRenderTextureSize(8192)-rivi on vanha (myös NS:n runkoajossa f1264eea9), kerrottu PT:lle.
- **Saapumisen kuvat nousevat kaupungista (KOE, ei junaan)**: KK:n suunnitelma
  /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261103-saapumisen-kuvat.md. NUI:lle osat A, C ja E:n NUI-osuus;
  B (kuvien paikat) KS. Proto-haara `natiivi-ui/saapumiskuvat-nousu-218` (työpuu /Users/Shared/Claude/wt/proto-natiivi-ui-zoomaus-kaikkiin,
  pohja 8d18d7047): 8335e6658 (liike) → **8b35924c4** (karttapisteet + pienet kuvat). Peili natiivi-backup peili/proto/natiivi-ui/saapumiskuvat-nousu-218.
  tarkista.sh 0, SIMUAMATTA.
  - TraileriLiike: NousuKoe (oletus päällä; `ui nousukoe paalle|pois`), KuvaNousee/KuvaLaskee 0,8 s, NousuPysahdysMs 1000 (Saapumistraileri.Nayta).
  - Traileri ja Introesitys (avoin tausta): kuva nousee karttapisteestä, vaihdossa vanha palaa samaan aikaan; isoisän kuva (C5, ilman
    esittelyä trailerin viimeinen) matkakirjakortista (UiNakymat: MatkakirjaRajat = Matkakirja.Laatikko) ja takaisin.
  - UI/Pulu/SaapumisKuvat.cs: Paikka = väliaikaiset pisteet keskustan ympärillä (KS:n B korvaa), Kohta = piste tasossa, ruudun ulkopuolella
    reunalle; palannut kuva → pieni kuva kartalle (30 pt, mk-kutsu__kortti, HaePienena 96 px), näkyy lähinäkymässä; napautus suurentaa/palauttaa.

## SEURAAJAN JONO
1. **JU:n KÄÄNNÖS NYT -vuoro pyydetty** (L2 + yhteinen-iPad13; JU:n ison iPadin laitekäännös 8d18d7047 ensin). Valmis skripti (SHA 8b35924c4):
   `zsh /Users/Shared/Claude/proto-3d/tyokalut/simu-lukko.sh kaari NUI yhteinen-iPad13 -- zsh /Users/Shared/Claude/proto-3d/lokit/nui-nousukoe-20261103/ajo.zsh`
   (run_in_background; uusi peli Lontoosta → video Pariisi (traileri + C1–C5) ja Bryssel (traileri); aikajana.txt). Lopuksi VAPAA JU:lle.
   Tarkista video: pysähdys, nousu/paluu samaan aikaan, C5 matkakirjasta, pienet kuvat jäävät kartalle ja napautus suurentaa.
   Video ja kuvat VAIN PT:lle (ei omistajalle). Lisäksi KK:lle yksi esimerkki ruudun ulkopuolisesta kohteesta (reunalta nouseva kuva).
2. C:n loput: nostojen kuvat kartalle hyvin pieninä ensin vain Pariisissa ja Lontoossa (Pariisissa piirroksen päälle kylttien kerrokseen);
   porrastus nostojen tapaan (2.204, ei päällekkäisyyttä 25 m). Jos miniatyyri ei sovi kohteen viereen → PT kysyy omistajalta.
3. KS:n paikat (B) tullessa: SaapumisKuvat.Paikka lukemaan kuvien koordinaatit (paikaton → keskusta, pieni kaupunkimerkin viereen).
4. E: JU asentaa isolle iPadille; omistajalle rivi "katso Lontoon saapuminen" KK:n kautta, kun PT kuittaa.
5. Vanhat: video iPadilta (Lontoo, Bratislava, Pariisi) nyt kun esilataus + ilmaisin + nosto rungossa (NS:n kylmä Lontoo -video
   lokit/natiiviseppa-esilataus-video-4fc57a4aa-20261103-0900 kattaa Lontoon); veneet joen keskiviivaa (KS:n Seinen reitti);
   animaatiokuvien ämpärivienti PT:n luvalla; Codexin vana-otto.
