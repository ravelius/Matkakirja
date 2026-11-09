# Natiivisepän luovutus 9.11.2026 klo 10.20

Edellinen: git show 3870953eb:docs/raportit/viesti-natiiviseppa-luovutus-20261109-0910.md (noston lennon suunnitelma).
Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja, tili sami.reivinen@vvi.fi. Nollauksen syy: konteksti 26 % > pehmeä 25 % (7.37)
uuden ison työn (FPV-latauskuva) alussa. Id:t /Users/Shared/Claude/osoitekirja.md: PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31,
JU local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd, NUI local_4b84cd90-123f-46c5-bc07-75760ed4c80b.
Cron "4 9 * * *" unity-julkaisut.py (prompt: git show 9d77cf4dd:docs/raportit/viesti-natiiviseppa-luovutus-20261108-2320.md rivit 6–7): LUO UUDELLEEN.

## TEHTY 9.11. 09.35–10.20
1. MATKALENTO 5ca18c629 (natiivi-backup natiiviseppa/noston-lento, wt /Users/Shared/Claude/wt/proto-natiiviseppa-nostolento, pohja 4e972eeed):
   PalloAjo-matkatila, MatkaLento.Mitoita, PalloKierto.MitoitaMatka/AjaMatka, komento `matkalento lat lon h [kal] [suunt]`.
   Linssit 2279/2279, unity sh 0. Mac 09.38 lokit/natiiviseppa-matkalento: 630 km 4,54 s, huippu 808 km, puoliväli koko Ranska.
   VIKA: laskeutumisen viimeiset ~0,3 s beigeä (arkit _tyo/natiiviseppa/nostolento/kuittaus/lasku.jpg k250–265).
2. PT 10.0x "kyllä – AjoEnnakko myös matkalentoon" → 6ad986961 (sama haara): AjoEnnakko.cs (fd8193758:sta) + Ajo.pallo/ennakkoLiike,
   Tila.Erikois = kohokartta- ja matkalento (oletus), kohdekierron kanssa; `maasto ajoennakko matka|kaikki|pois|tila`. unity sh 0.
3. NUI: rajapinta käytössä paikkapalkissa; 6ad986961 yhdistetty natiivi-ui/paikkapalkki = 91d517091 (NUI:n oma Mac-uusinta JU:lla).

## ODOTTAA: JU AJAA sk-matkalento-ennakko-mac.txt (6ad986961) → lokit/natiiviseppa-matkalento-ennakko/
JU ilmoittaa rivillä. SITTEN: ruutuarkki laskeutumisesta: /opt/homebrew/bin/python3.14 -P /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/nostolento/arkki.py
<kansio>/matkalento-ennakko <ulos.jpg> 250 400 10 (tulostaa TASAINEN-rivit, hajonta < 12; vanhassa k250–265 = beige; lennon alku riippuu komennon viiveestä). Lokissa pitää olla
"MATKAKIRJA ajoennakko: päällä". Jos beige poissa: PT:lle valmis-rivi (sha 6ad986961, lasku-kuvat k250–265 vanha vs uusi) –
PT pyysi nimenomaan nämä. Jos ei poistu: syy (loppukameran laatat eivät ehdi? → ennakko pidemmäksi tai lähitason SSE).

## TYÖN ALLA: FPV-DRONELENNON LATAUSKUVA (OMISTAJAN PÄÄTÖS 10.16, PT 10.2x)
PT:n sanoin: "Topografialinssin FPV-dronelennon alkuun latauskuva Codexin kuvista posti/drone-vastavalo-vaaka-pysty-20261109/
(claude/postilaatikko 1e31a7f0e): vaaka iPadille ja puhelimen vaakaan, pysty puhelin pystyyn. Tavoite: lento alkaa tällä kuvalla kuten
muut latauskuvat (olemassa oleva latauskuvapohja, Raamattu 4.27), ei kuvan rajausta. Korvaa 8.11. jättiläisdronen kuvatilauksen
(#2197–2199 hylätty). Ei junaan ennen kuin lento on omistajan kokeiltavana. Sinun FPV-osan jatkoksi; Mac-ajo JU:lla, kuvat (vaaka + pysty)
vain PT:lle."
TEHTY: kuvat katsottu (koko drone, vastavalo, lumipöly, ok). Vientipaketti /Users/Shared/Claude/proto-3d/_valmiit/fpv-drone-latauskuva-vienti-20261109/
(julisteet/fpv/drone-vastavalo/20261109/drone-vastavalo-{vaaka,pysty}.png, SHA = toimitus, LAHTEET.md), vie-paketti.sh --kuiva OK.
→ ENSIN: pyydä JU:ta viemään paketti (vie-paketti.sh, pysyvä lupa). URL:t https://media.matkakirja.app/julisteet/fpv/drone-vastavalo/20261109/
drone-vastavalo-vaaka.png?sha256=e669c45f10dcc732bcca13a9b54d24ff132e46e273c64186bce59d72b492a4ad ja -pysty.png?sha256=d7641c8b915a84cec22d247ebcbe62d8258264141070f497ca33af3388b0ea7a.
SELVITETTY (ei koodattu):
- FPV-koodi: natiivi-backup natiiviseppa/fpv-viat c7df37d49 (pohja vanha f7cf0bd7c; EI junassa). FpvLento.Aloita (Kartta/FpvLento.cs) luo lennon;
  Update: `odottaa` = alun maaston korkeushaku (≤ 8 s), sitten PalautaAlkuun ja lento. UI: UI/Linssit/FpvNakyma.cs (NUI:n, Aseta(bool)).
  NUI:n ☰-kytkin "FPV-lento" + tikut: natiivi-ui/fpv-nakyma 7ddc42970 (EI fpv-viat:ssa). Uusi wt fpv-viat:sta (proto-repon git worktree add,
  esim. /Users/Shared/Claude/wt/proto-natiiviseppa-fpv-lataus, haara natiiviseppa/fpv-latauskuva); harkitse NUI:n fpv-nakyma mukaan.
- Pohja: UI/Latauskuva.cs (new Latauskuva(isa) { TaustaLahentyy = true, Nimivarjo = ? }; Aseta(tekstuuri); Sovita(rect); Nayta(bool)).
  Malli-isäntä AstronautinNakyma.cs: RaketinKuvaVaaka/Pysty-url:t (?sha256=), Kuvat.Esilataa, Kuvat.Hae(url, t => …), valinta
  r.width > r.height ? vaaka : pysty, SovitaRaketinKuva: LatausLiike.Peita(w, h, kuvasuhde, ylaOsuus) peittävästi; GeometryChangedEvent.
- Ehdotus: FpvNakyma näyttää latauskuvan, kun FpvLento.Nykyinen käynnistyy, ja häivyttää sen, kun lento on valmis (FpvLento:lle
  julkinen Valmis = !odottaa && maaston laatat ladattu, esim. Cesium3DTileset.ComputeLoadProgress() ≥ 99 tai pieni aikaraja);
  Kartta-assembly ei viittaa UI:hin, joten kuva UI-puolelle. Latauspalkki/nimi kuten muissa (nimi esim. "FPV-lento"? → tarkista
  tyylikirja LATAUSKUVA, ei uutta tyyliä).
- "EI KUVAN RAJAUSTA": peittävä täyttö rajaa väkisin. Laskettu: iPad 4:3 vaaka → 85 px/1536 sivuilta, drone (x 290–1290) kokonaan;
  puhelin vaaka 19,5:9 → ~158 px ylhäältä ja alhaalta, potkurin kärki (y ~150) rajalla → ylaOsuus ~0,37 (dronen keskikohta);
  puhelin pysty 9:19,5 pystykuvalla → ~157 px/1024 sivuilta, drone x 110–970 → potkurien kärjet leikkautuvat. Kerro PT:lle tämä
  rivillä ennen/kuvien kanssa (ei omaa tulkintaa: PT/omistaja päättää, riittääkö peittävä vai tarvitaanko kokonainen kuva).
- Mac-ajo JU:lla: kuvat vaaka (ipad) + pysty (puhelin pysty) vain PT:lle.

## JONO
1. JU:n matkalento-ennakko-tulos → PT:lle valmis-rivi (yllä). 2. FPV-latauskuva (yllä). 3. Muuten tyhjä.

## LISÄYS 10.2x: PT:N TARKENNUS (KK 10.17) – VOITTAA kohdan "EI KUVAN RAJAUSTA"
"ei rajausta" = pystykuvaa ei leikata vaakakuvasta, vaan pystyyn käytetään omaa pystykuvaa; ruudun täyttö kuten muissa latauskuvissa (pohjan mukaan). → Peittävä täyttö LatausLiike.Peita:lla kuten raketissa; potkurien kärkiä ei tarvitse raportoida erikseen.
