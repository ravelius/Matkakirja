# Natiivi-UI: luovutus 10.11.2026 klo 00.30 (kontekstivahti 28 %; korvaa -20261109-2205:n)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31, JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NS local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870.
Tarkistus `sh Linssit-testit/unity-tarkistus.sh` (worktreessä). Skenaariot /Users/Shared/Claude/proto-3d/_tyo/natiivi-ui/, lokit /Users/Shared/Claude/proto-3d/lokit/.

## 1. Valmiit ja kuitatut junaan 224 (ei jatkotoimia)
- Offline-talot 765e3f121 (natiivi-ui/offline-talot; sis. NS de2a713fd lukijakorjaus + maan Peru perii yleiskartan): PT kuittasi, juna a0d5aa17b.
- Aarteen kohdalla vain tähti 191f3fa5e (kertojan punainen piste pois tähtimerkiltä; keltainen/sininen jäävät, PT: kortti ei laajene): juna 3580eb0f2.
- B1 (7 riviä + 9 napit 620425fb7 + 10 kameratappi bee8b407b/ff0318ba2/e0f57e42c), B3 (7 riviä) ja yön jono (pallon alanapit +
  iPhone-vaakavalikko 909eaac25/f74716da2/e65e82df9; Mac-varmistus lokit/nui-pallonapit-3-iphone-vaaka-934ea6ca9 katsottu, PT:lle) = kaikki jo junassa 224.
  Työlistan rivit päivitetty. B3:n jäljellä vain KS:n data (muiden kaupunkien korostetut merkit ja klikattavat paikat).

## 2. KESKEN: tulivuoren latausilmaisin ISS-näkymään (NS:n pyyntö 00.1x, PT:n päätös 10.11.)
- Haara natiivi-backup natiivi-ui/tulivuori-ilmaisin = f4e7ccd61 (NS natiiviseppa/iso-tulivuoret 2d0d2b82d + 1), worktree
  /Users/Shared/Claude/wt/proto-nui-tulivuori, unity-tarkistus 0. EI JUNASSA (NS:n haara ei junassa, kytkin Tulivuoret.Kaytossa pois).
- IssKyytiNakyma.RakennaTulivuoriOdotus/PaivitaTulivuoriOdotus: nimi (mk-ajattelija__nimi, ISOIN) + Latauspalkki alakeskellä 14 %,
  vaalea oletusteema; näkyy kun Tulivuoret.OdottaaNimi odottanut SaapumisOdotus.ViiveS; arvo Tulivuoret.OdotusEdistyminen.
  Loki "ui tulivuori: odotusilmaisin näkyy|pois". Testi `ui tulivuoriodotus <nimi> [s] [arvo] | pois` (UiKomennot).
- AJO JU:lla (pyydetty 00.2x): sk-tulivuori-ilmaisin-1.txt ipad → lokit/nui-tulivuori-ilmaisin-1-ipad-f4e7ccd61.
  Katso: i-1 testi (SARYTŠEV + palkki 40 %, luettava maan/avaruuden päällä?), i-2 oikea odotus (voi jäädä näkymättä, jos lataus < 0,6 s:
  lokista), T1 ilman ilmaisinta, i-3 pois. Jos nimi hukkuu kirkkaaseen maahan → harkitse tk-teema-harmaa-lappua (pulu-vinkin tapaan).
  Sitten 3 riviä PT:lle + NS:lle "yhdistä haaraasi".

## 3. Jono tämän jälkeen
- Tyhjä → rivi PT:lle "JONO TYHJÄ: NUI".
