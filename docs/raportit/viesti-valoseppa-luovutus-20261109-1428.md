# Valosepän luovutus 9.11.2026 klo 14.28. Itsenäinen: vanhoja ei tarvitse lukea (korvaa 20261109-1406:n)

Syy: konteksti 25 %, luonteva tauko (syy löydetty, toteutus alkamatta). Tili sami.reivinen@vvi.fi. Natiivirepo `/Users/Shared/Claude/proto-3d/Matkakirja-proto`, etä `natiivi-backup`. Worktreet: k31 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k31` (haara `linssiseppa2/makikaari`, kärki 7f8d08cd7, puhdas, pushattu), k32 = `/Users/Shared/Claude/wt/proto-linssiseppa2-k32` (`linssiseppa2/kohokartta-aurinko2` cd74573cd, puhdas). Kuvat vain JU:n vuorolla. Id:t: PT `local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31` ≤ 3 riviä; JU `local_2a7d6c96-c61c-4887-a4f8-57cc335b40fd`; NS `local_0f7f169f-2ceb-43d2-8fb4-223dda2c0870`; NUI `local_4b84cd90-123f-46c5-bc07-75760ed4c80b`.

## NYT TYÖN ALLA (PT 14.2x): "Pallon osat Pariisin kartalle: filmi, terävöinti, varjot" (koe levossa). Tehtävä: selvitä iPadin muistihuipun syy ja kevennä; mittaus JU:n vuorolla → PT. EI JUNAAN.

### SYY LÖYDETTY (film11-ajon omasta lokista, ei uutta ajoa)
`/Users/Shared/Claude/proto-3d/lokit/linssiseppa2-film11-pois-02a6cc1dd/muisti-tarkka.log`, T-rivit: ennen `karttafilmi 1` (T 233789) RenderTexture 26 kpl 331 Mt, heti sen jälkeen (T 235813, ennen karttapilviä) 41 kpl 516 Mt (+185). Uudet suurimmat:
- `_CameraColorAfterPostProcessing_2732x2048_B10G11R11_..._MSAA4x` 85 Mt
- `_CameraColorFullScreenPass_2732x2048_B10G11R11_..._MSAA4x` 85 Mt
- loput noin 15 Mt (bloom-pyramidi, LUT ym.; erittelemättä).
Selitys: iPad Ultra = 4× MSAA (myös `_CameraTargetAttachment` 85 Mt ja `_CameraDepthAttachment` 106 Mt jo ennestään). KarttaFilmi (haara `linssiseppa2/kartta-filmi`, kärki 02a6cc1dd) laittaa pääkameralle `renderPostProcessing = true` ja kaksi FullScreenPassRendererFeaturea (terävöinti + rae) kohtaan **AfterRenderingPostProcessing** `fetchColorBuffer = true`: URP luo jälkikäsittelyn jälkeisen puskurin ja värikopion, molemmat kameran kuvauksella eli MSAA4x. Pilvet (BeforeRenderingPostProcessing, ei värikopiota, syvyys on Ultralla jo) eivät näy RT-listassa. Kertahuippu +450 Mt kytkettäessä: todennäköisesti `data.SetDirty()` (renderöijä luodaan uudelleen, vanhat puskurit elävät hetken) + uudet RT:t; EI todistettu.
film11:n luvut: lepo +288 Mt (gfx +284), kierron huippu +115, kytkentä +450, koko ajon huippu 4409 (raja 4080; verrokki 84deb0978 ylitti 4080:n myös ilman filmiä).

### KEVENNYSSUUNNITELMA (aloittamatta; uusi haara `linssiseppa2/kartta-filmi-kevyt` haarasta natiivi-backup/linssiseppa2/kartta-filmi, k31)
1. Yksi oma ScriptableRenderPass (RecordRenderGraph, mallina `ElavaKerros.Kaappausvaihe`: `renderGraph.AddBlitPass`) kohtaan **BeforeRenderingPostProcessing**, jonoon `RenderPipelineManager.beginCameraRendering` → `EnqueuePass` (kuten `ElavaKerros.Ennen`) vain kartan kameroille (`KarttaFilmi.OnKartanKamera`). EI rendererFeatures-listaa eikä SetDirtyä.
2. Passi: oma transientti `renderGraph.CreateTexture` kameran koolla **msaaSamples 1** (22,7 Mt), AddBlitPass activeColor → temp, sitten AddBlitPass temp → activeColor yhdellä materiaalilla: terävöinti (KaupunkiTerava-kaava, `Assets/Matkakirja/Linssit/Resources/Varjostimet/KaupunkiTerava.shader`), sävy (URP ShadowsMidtonesHighlights + saturaatio kuten LutBuilderHdr, rajat 0–0,3 ja 0,55–1), vinjetti (URP ApplyVignette), rae (KarttaRae.shader). Arvot nykyisestä LueOletus:sta.
3. `renderPostProcessing` jää pois (ei enää pakoteta päälle), volyymi ja bloom pois. Hehku 0,12 (kynnys 0,9): mittaa ensin Macilla hehku 0 vs 0,12 vanhalla haaralla; jos ero pieni, jätä pois ja kerro PT:lle (ulkoasun muutos!).
4. Pari Macilla: vanha 02a6cc1dd vs uusi, samat kamerat (sk-film7/10:n kulmat), ero oltava silmälle olematon → PT. Sitten iPad-mittaus JU:n vuorolla (sk-film11-ipad.txt mallina, vahti päällä; T-rivit muisti-tarkka.logista: RT-lisäyksen pitää olla noin 23 Mt, ei 185) ja iPhone (Mobile, MSAA?) mittaamatta → PT.
Varmista ensin: `git log natiivi-backup/linssiseppa2/kartta-filmi -1` = 02a6cc1dd ja ettei kukaan ole muuttanut sitä.

## TEHTY 9.11. 14.06–14.28
- SACRÉ-CŒURIN MÄEN KAARI TODISTETTU (PT kuittasi, työlistan rivi "Kovat varjot: viat kokeena" valmis): kaari = mäen oma kova varjo tasossa y = 0 mäen pinnan alla; ajossa 7f8d08cd7 (komento `makivarjo 0|1|puna`) punainen osui joka kamerasuunnasta lähimmälle reunalle. Korjaus jo junassa 223 (mäellä VarjoKerroin 0). Aineisto `/Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/makikaari/` (ARVIO.md, parit). Haara makikaari ei junaan.
- OMISTAJA 14.12 "Kelpaa": kohokartan aurinko cd74573cd junaan 223 (JU yhdistää; ei toimia meiltä). Vesi c11314ade on junassa 223.

## MUUT AVOIMET (ennallaan)
- Kartan filmi 50436a1c4 / kärki 02a6cc1dd = yllä oleva erä. Merenpohjan syvyyden puristus 97b4f29a9 KS:n koelaatoilla, kun JU on vienyt ne. KS:lle avoin: kohokartan poltetun varjostuksen suunta 315°?
- Kohokartan aurinko: syvyyskuva (requiresDepthTexture vain piirron ajaksi) varmistettava laiteajossa.
- Valovahti: Aurinko.cs vari 4 > 3, KartanElama.cs, KaupunkiPuu.shader ylittävät jo ennestään.
- Remote Control: Postivahdin pyyntö set_remote_control jätetty tekemättä (työkalun ohje: vain omistajan pyynnöstä).

## TEKNIIKKA
Numpy/cv2 `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`; PIL `/opt/homebrew/bin/python3 -I`. `sh ./unity-tarkistus.sh` kansiosta `Linssit-testit/` (~2 min, taustalle; varjostimet kääntyvät vasta ajossa). Muokkaukset python-skriptillä (.tmp + os.replace + copymode). Mac-skenaariossa talot: JU lisää `komento talot kansio …/palat-v20-ryhma4` + `komento talot 1` ennen aja-riviä (lisää itse). Työlista: `python3 -I tools/asemataulu/tyolista.py --kansio /Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/data/talo tilanne "OTSIKKO" "teksti"`. Luovutus plumbingilla origin/mainin päälle omaan haaraan.
