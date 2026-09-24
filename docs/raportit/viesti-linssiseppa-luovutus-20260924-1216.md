# Linssisepän luovutus 24.9.2026 klo 12.16

*Linssiseppä (Opus). Jatkaja lukee tämän, edellisen luovutuksen viesti-linssiseppa-luovutus-20260924-b.md,
inventaarion natiivi-linssit-inventaario-20260923.md ja piikkiraportin
proto-3d/lokit/linssit-piikit-20260924/RAPORTTI.md (ajot 1–6).*

## Tila lyhyesti

Linssit ovat webin tasolla. Aamupäivän työ oli linssien sulavuus (kehyspiikit iPadilla), omistajan build 5
-löydökset, KAMERA-AJOT-linjaus (pehmeys ja tempon dramaturgia) ja BUILD 7:n VU-mittari.

## Merge-jonossa (Natiiviseppä; mergeää build 6 -viennin jälkeen)

| Haara | SHA | Sisältö |
|---|---|---|
| linssiseppa/vu-mittari | 3c49a0c | VU-mittari: Ydin/Radio/VuMittari.cs (webin v267: τ 0,065/0,34 s, −40…−6 dB, lepo 0,045, varakuvio tasolla −1), RadioLinssi.Mittari, RadioVirta.Taso, Unity/VuMittariNakyma.cs (asteikko kerran, neula DynamicTransform). Natiiviseppä yhdisti oikeaan mittaukseen (natiiviseppa/radio-taso 5ba9759, MTAudioProcessingTap), Natiivi-UI sijoitti koteloon (natiivi-ui/radio-vu 7194a58). **Uudet tiedostot tarvitsevat .metat.** |
| linssiseppa/piikit6 | f27d2f1 | Satelliitin 64 havaintopistettä Kehysjonolla, merkit ihmisen matkan Avaa.Vanat ja Ymparisto.Musiikki |
| linssiseppa/ipad-hae | 32606a9 | tyokalut/ipad.sh hae/peli: vain Documentsin ylätason *.txt tai nimetyt tiedostot, ei koskaan koko konttia |

Masterissa jo (tänään): piikit2–3, avaruusavaus, kamera-ajot, koreografia 1–3 (Linssit/Ydin/Kamera/Kamerakoreografia.cs),
vesistot-jono, paketti2 (2.0-lukijat päätasolta, Paataso.Raaka-varareitti), huippuvuoret-työkalut, hae-kevyt.

## Seuraavaksi

1. **Kun yllä olevat ovat build 6:n jälkeen masterissa**: piikkiajo 7 (`Linssit-testit/laitetesti.sh piikit <kansio>`,
   pyydä iPad ja Development-käännös Natiivisepältä). Katso ihmisen matkan Avaa.Vanat / Ymparisto.Musiikki (11 ms
   merkitsemättä ajossa 6) ja satelliitin pisteet. Jäljellä muiden osuudet: ensipiirto 11–20 ms (Natiivisepän
   varjostinlämmitys, listalla), keksintöjen Vaihtui/UI.Linssi.Aikajana 7 ms (Natiivi-UI).
2. **VU-mittarin kuvasarja iPadilla**, kun vu-mittari + radio-taso + radio-vu ovat käännöksessä (radio auki, asema soi,
   `radio tila` -loki näyttää VU-arvon ja "(varakuvio)", jos taso −1). Video: ks. alla.
3. **Huippuvuoret**: odottaa skeemaa 1.29 = PR #3030 (ei #3012). Työkalut: `laitetesti.sh huippuvuoret`,
   `KIINTEA=huippuvuoret node Linssit-testit/kontakti-web.mjs <kansio> <webin juuri>`. Web ei väritä Huippuvuoria
   (lauta loppuu 76° N:ään), natiivin v18-maarajoissa NOR:lla on 17 Huippuvuorten rengasta.
4. **Maapallon tila -linssi**: suunnitelma docs/raportit/linssi-maapallon-tila-suunnitelma-20260924.md, Fablen päätökset
   kirjattu (NSIDC-viite ok, ei GRACE/Earthdata, merenpinta NOAA STAR LSA -CSV, Etelämantereen merijää mukaan).
   Toteutus vasta pariteettikierroksen ja build 6 -kokeilun jälkeen. Datalinssit (katalogin osa R) odottavat.
5. Isoisä 1873 erä 2: omistaja "myöhemmin".

## Opit ja työkalut

- **ui piikit**: `laitetesti.sh piikit` (vaiheet lokiin "vaihe-<nimi>", yhteenveto awk:lla). KehysPiikit näyttää vain
  12 raskainta merkkiä; GfxResource.Register ja GC.Resize eivät ole millisekunteja. Merkit `Update.Linssi.<id>.<vaihe>`
  on luotava käynnistyksessä (LinssiOhjain.MitattavatLinssit), koska KehysPiikit ottaa vain aloitushetken merkit.
- **Kehysjono** (LinssiOhjain.cs:n lopussa): raskas objektien luonti 2 ms/kehys (TMP-nimet, verkot, pisteet).
- **Fontin esilämmitys**: TryAddCharacters koko merkistöllä käynnistyksessä, 6 merkkiä kehyksessä.
- **mp3-lataus**: aina `DownloadHandlerAudioClip.compressed = true` (muuten FMOD purkaa pääsäikeessä), paitsi jos
  klipistä luetaan GetDatalla.
- **iPhone-simulaattori**: Laitetestaajan lupa; sovelluksen oma mykistys riittää (älä muuta Macin ääniasetuksia).
  Linssimuistin nollaus: `xcrun simctl spawn <U> defaults delete <kontti>/Library/Preferences/app.matkakirja.proto3d
  matkakirja-linssimuisti-ihmisen-matka` (plist-muokkaus ei riitä). Ihmisen matkan Käynnistä iPhonella:
  `ui napauta 295 513`. Video: `xcrun simctl io <U> recordVideo --codec=h264 --force x.mp4` taustalle, `pkill -INT -f
  recordVideo`, ruudut `ffmpeg -vf fps=4`.
- **Levy**: lokikansioon vain kuvat, videot ja konsoli. Poistot estää automaattitila; ne tekee omistaja.
- **Webin kuvat**: wt/linssiseppa-webmain poistettiin; luo tarvittaessa `tools/uusi-worktree.sh linssiseppa webmain`.
- **Webin pariteettikuvat** (Pelikoodarin työkalu) merkitsivät avaamattomia linssejä ok:ksi; korjaus PR #3038.
  Linssin varma avaus webissä: ui.busy = false, id player.linssit-listaan, ui.valitseLinssi(id), odota ~8 s.
