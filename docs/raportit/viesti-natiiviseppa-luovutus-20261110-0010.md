# Natiivisepän luovutus 10.11.2026 klo 00.10

Edellinen: git show ba6d89e6d:docs/raportit/viesti-natiiviseppa-luovutus-20261109-2304.md. Syy: kontekstivahti 26 % (7.37).
Sessio Natiiviseppä local_0f7f169f-…, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi.
Cron "4 9 * * *" unity-julkaisut.py: LUO UUDELLEEN (/opt/homebrew/bin/python3.14 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py,
ILMAN -I:tä; UUSI-rivit → PT "UNITY UUSI: …").
Raportit: /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/iso/ (raportti-nahtavyydet.md, raportti-osa4.md, raportti-top10.md).
Repo natiivi-backup (worktreet /Users/Shared/Claude/wt/proto-natiiviseppa-*). Älä poista mitään (PT).

## VALMIS / KUITATTU
- Osa 3 nähtävyydet 380bd41cc (natiiviseppa/iso-nahtavyydet): PT kuittasi junaan 224, JU vie (+ ämpäripaketti nahtavyydet). Mac-ajot 1–2 ok
  (ASTC käytössä Macilla; kylmä polku odottaa → levyllä → koe luotu; vika Vapauta→tiedostotValmiit korjattu).
- TÄRINÄKOE yön kehitysversioon (omistaja 23.18 "Saa"): natiiviseppa/tarina-224 1a6bdd8fa = 3580eb0f2 + lähiorigo + ⚙ Asetukset › Kartta
  "Tasainen kierto läheltä" (LahiOrigo.Kaytossa, PlayerPrefs matkakirja-tasainen-kierto, oletus päällä; näkyy kaikille). JU käänsi asennuslinkkiin,
  EI junaan; Kelpaa-kortti aamulla → PT päättää. Junaan mennessä kytkin piiloon/pois.

## ODOTTAA JU:N iPAD-AJOJA (PK:n iPad-A/B:n jälkeen) → tulokset PT:lle
1. OSA 4 KOODIKOKO natiiviseppa/koodikoko-224 313e146eb (3580eb0f2 + ac3ffc238 iOS Medium+OptimizeSize, link.xml säilyttää omat/Cesium/SteamAudio
   + 313e146eb kokolista.txt käännökseen). Käännös JU 00.05: ladattava 489→466, asennettu 1056→957, fw 249→158 Mt.
   PT: kuitataan VASTA kun lokit/natiiviseppa-karsinta-ipad-1-313e146eb (sk-karsinta-ipad-1.txt: Pariisi+talot, juoksupeli, Cesium-opas,
   Steam Audio, ISS) konsolissa 0 × MissingMethod/TypeLoad/ExecutionEngine/MissingField/AOT, ei kaatumista → rivi PT:lle tulos + koko.
2. LATAUSAJAT sk-latausaika-1.txt: 3× ENNEN 3580eb0f2, 3× JÄLKEEN 313e146eb (lokit/natiiviseppa-latausaika-{ennen,jalkeen}-N-*).
   Poimi: verkko-odotus kaynnistys t/ms, "aloitusverho: pois X s", peli-komento-aika odota-tila Kartta, "elävä kartta: zoomaus pariisi valmis",
   "startUnity" NSLog-aika → taulukko raportti-osa4.md:hen + rivi PT:lle (OptimizeSize voi hidastaa: nopeus mukaan).
3. TAVLI natiiviseppa/tavli-astc 2ad9b89bc (3 laudan .meta nPOTScale 0→1: NPOT 2048×1536 jäi iOS:llä RGBA32:ksi 16 Mt/kpl; Myllyn 2048²
   samoilla asetuksilla ASTC 6x6 2,4 Mt). sk-tavli-astc-ipad.txt kahdesti (NYKYINEN 3580eb0f2 | UUSI 2ad9b89bc), kuvat T1–T3.
   PT: KUVAPARI nykyinen | uusi samasta kulmasta PT:lle ennen kuittausta (kokonaan, sama rajaus). Uuden kokolista: Tavli 48 → ~7 Mt.

## KESKEN, EI ALOITETTU KOODISSA: TULIVUORET PALVELIMELLE (PT 00.0x: NS tekee, VS lepää)
- 124,8 Mt buildissa, ominaisuus kytkimen takana (Tulivuoret.Kaytossa = false) → pelaaja ei näe. Kytkin ja Kaytossa ennallaan, mitään ei poisteta.
- 30 tiedostoa Linssit/Resources/Tulivuoret/{etna,florence,sarytsev}-sarja (jpg/png 4096²/2048², iOS ASTC 5x5 (49), mipit; sRGB kuvissa 1,
  maskeissa/kansi 0; laatta-* wrap 2 (Mirror?), muut 1; sarja.json TextAsset). Lähde 16 Mt, build 125 Mt (ASTC ei pakkaudu gzipillä).
- Suunnitelma: (a) yleinen tyokalut/iso-kuvat-astc.py: kuva + .meta → ASTC-mipketju (malli tyokalut/nahtavyys-astc.py pakkaa(): TextureConverter
  --compression_format=ASTC5x5 .meta:n iOS-muodon mukaan, sRGB .meta:sta, maxTextureSize-skaalaus, oma 2x2-mipketju; otsake w/h/lohko/srgb/wrap);
  (b) Resources/Tulivuoret → Linssit/Palvelimelta/Tulivuoret (lähdekuvat EIVÄT saa mennä pakettiin: iso_paketti.py ohittaa vain .meta/.md →
  lähteet esim. ei-build-kansioon Assets:n ulkopuolelle tai pääte, jonka paketti ohittaa); (c) IsoSisalto.Kuva(polku) → Texture2D
  LoadRawTextureData (malli NahtavyysAstc.cs:83); Tulivuoret.cs:241–326 Resources.Load → IsoSisalto.Teksti/Kuva (null = "puuttuu → v6" kuten nyt);
  (d) iso_paketti.py tulivuoret <kansio> 1 --buildiin; Mac-ajo kytkin päälle (AsetteluTesti:959 tapa) kylmästä; (e) rivi VS:lle postiin/luovutukseen:
  "Tulivuorten kuvat nyt palvelimella (osa tulivuoret), lataaja IsoSisalto".
- Pohjana natiiviseppa/iso-nahtavyydet 380bd41cc (sisältää IsoSisalto), uusi haara natiiviseppa/iso-tulivuoret.

## TOP 10 (raportti-top10.md) seuraavat ehdokkaat
NotreDameKoe pohjakuvat 80 Mt (ASTC-muunnos, NS), Museo 50,7, JuoksuV4 26 + JuoksuMaailma.shader 13,3 (variantit, Pelikoodari), KavelyKerrokset 16,9,
IssPaneeli 15,7 + Raketti 14,2. Kone ja Elava jäävät (näkyvät heti).

## SIVUHAVAINTO (ei NS:n)
- Revontulet.PaivitaNakyvyys:207 MissingReference astronauttilinssin sulkemisessa (iso-1-ajo 9.11.) → VS/LS, ei vielä raportoitu erikseen.
