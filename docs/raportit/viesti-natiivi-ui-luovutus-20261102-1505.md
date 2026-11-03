# Natiivi-UI: luovutus 2.11.2026 klo 15.05 (saapuminen keskustaan, yhteiskäännös käynnissä, B aloitettu)

Edellinen: viesti-natiivi-ui-luovutus-20261102-1447.md (PR 5998). Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## Tehty (proto-git; runko natiiviseppa/juna-218 nyt 3a22dbaf2)
- **Jono 3 (karikatyyri pois -liike)**: NS mergesi e61f72c0b:n runkoon 3a22dbaf2 (PT 15.0x). Hoidettu.
- **14.37 kohta 4 (saapuminen)**: haara natiivi-ui/saapuminen-keskustaan-218 **58f0974db** (wt/proto-natiivi-ui-saapuminen),
  tarkista.sh 0 virhettä. PeliOhjain.Perilla: kun PiirrosKerros.Keskusta(kaupunki) ≠ null (vain pariisi, karikatyyri päällä,
  ei aloituslento), PalloKierto.AjaKeskustaan → 48.857, 2.351 lähitasolle (MinKorkeusPaikassa), PeliOhjain.KeskustaanS 2,6 s;
  traileripäätös vasta ajon valmistuttua (PerillaJatko, loki "zoomaus keskustaan valmis … traileri vasta nyt"). Saapumistraileri
  ja nykyintro (Introesitys) avoimella taustalla: TraileriTausta.Alku(avoin) = Tyylikirja.Himmennys.Kevyt, ei sumennusta eikä
  pysäytyskuvaa (UiNakymat: ei Kokoruutua), kuvat 0,84 × ruutu (TraileriTausta.KuvaOsuus, pinta-ala ≈ 70 %). Muut kaupungit ennallaan.
  Muutos ei odota piirroksen laattojen esilatausta (suunnitelman E:n esilatausosa on yhä tekemättä, NS:n PiirrosKerros).
- **PT 15.3x: B aloitettu** omassa haarassa natiivi-ui/piirros-nostot-218 **5e2dfcb47** (wt/proto-natiivi-ui-piirros-nostot):
  KS:n 38 kohteen piirrospaikat Resources/Kohdenostot/piirros-pariisi.json ("pariisi:<nimi>": [lat_kuva, lon_kuva, ratkaisu]),
  tyokalut/natiivi-ui/piirros-kohdepaikat.py. EI vielä käytössä koodissa. PT: haara EI pienen iPadin käännökseen.

## SEURAAJAN JONO
1. **YHTEISKÄÄNNÖS KÄYNNISSÄ** (JU antoi KÄÄNNÖS NYT linja 2, 14.5x): käynnistin 15.0x
   `PROTO_LINJA=2 PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/app-jako/natiivi-ui-palautus-1437 proto-kaanna.sh
   natiivi-ui/liiku-palautus-218+natiivi-ui/omistaja-1437-218+natiivi-ui/saapuminen-keskustaan-218 F7513985-C8BC-4E97-8D29-9C9BD420E962`
   (odotti linja 2:n lukkoa, esikatselu 14.54). Tulos lokin viimeisellä rivillä: proto-3d/lokit/kaannospalvelu/<aika>-natiivi-ui-liiku-palautus-218_….log
   (KÄÄNNETTY / VIKA). Jos ajo kuoli nollauksessa, käynnistä sama rivi uudelleen.
   Sitten todistusajot F7513985 (ennen = app-jako/natiivi-ui-kiinni e61f72c0b):
   a) proto-3d/lokit/todistus-kiinni-jalkeen-e61f72c0b-20261102-1436/palautus-1437.txt (Liiku 0, hehku 1, iPad-logo 2; pysty);
   b) proto-3d/tyokalut/natiivi-ui-ajot/saapuminen-keskustaan.txt (Lontoo → Pariisi bussi, video + 3 kuvaa, vaaka).
   Parit + saapumisvideo PT:lle (PT 15.3x: "video ja parit minulle käännöksen jälkeen"). Tarkista lokista zoomauksen korkeus
   ("MATKAKIRJA saapuminen: FRA … km") ja ettei traileri ala ennen "zoomaus keskustaan valmis". Kuittaus → mergepyynnöt NS:lle
   (Liiku ensin). Lopuksi "VUORO VAPAA" JU:lle (local_06f8c680-…).
2. **B jatko** (natiivi-ui/piirros-nostot-218), suunnitelma (scratchpad/keskustelukanava/suunnitelmat/20261102-pariisi-piirroskaupunki.md kohta B):
   a) Kohdenostot: lue piirros-<kaupunki>.json; Ruudulla-kutsussa Lat/Lon = geo + (kuva − geo) × PiirrosKerros.Nakyvyys (RuutuPiste
      tekee NakyvaLat-muunnoksen). Vaihda: kun kuvapiste on, ohita SamassaPaikassa-sulku piirroksella (38/38 näkyviin; karikatyyri
      pois → geopisteen kaksoset piiloon).
   b) Kyltti kaikille kohdenostoille piirroksen aikana (NostotKartalla.Hae: nyt `kyltti = piirros != null && PiirrosTila`).
   c) Lajimerkki kyltin alkuun OLEMASSA OLEVISTA kuvamerkeistä (NostoSaannot.Kuvamerkki(s.Kategoria, s.Laji), NostoMerkit.KuvaJuuri)
      tähden paikalle (AsetaTahti / KyltinTahtiTila / .mk-nosto-merkki__tahti + --kadonnut padding 26.8px mallina); kadonneilla ★ ennallaan.
   d) Porrastus: kaukaa vain nähtävyydet (Laji rakennus, aukio, luonto), muut (henkilo, esine, ilmio, taide) vasta kun
      kyltinMittakaava ≥ noin 0,6.
   e) 4 ★-kylttiä (ratkaisu "kyltti": Palais d'Orsay, Palais de l'Industrie, Trocadéron palatsi, Les Hallesin hallit) nykyisen
      kyltin alle (KS: ankkurikyltti).
   Kuvapari (lajimerkit) PT:lle → omistajalle. Ei pienen iPadin käännökseen.
3. PELIT-välilehden 4 Codex-minikuvaa (tilaus postilaatikossa f670c1140, EI toimitettu 15.05): PT: menevät B:n edelle, kun tulevat.

Worktreet: wt/proto-natiivi-ui-saapuminen (saapuminen-keskustaan-218), wt/proto-natiivi-ui-piirros-nostot (piirros-nostot-218),
wt/proto-natiivi-ui-1437, wt/proto-natiivi-ui-liiku-palautus, wt/proto-natiivi-ui-kiinni (mergetty, poistettavissa).
