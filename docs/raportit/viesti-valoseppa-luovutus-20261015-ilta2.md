# Valoseppä – luovutus 15.10.2026 ilta 2 (18.1x, konteksti ~39 %)

Luovuttaja: Valoseppä (Opus, high), sessio local_c238f4af. Edellinen: viesti-valoseppa-luovutus-20261015-ilta.md.
Viestit `send_message` id:llä (/Users/Shared/Claude/osoitekirja.md); PT local_5df52e10 (≤ 3 riviä + polut).
Simuajot AINA Julkaisijalta (local_5cb16c00; Julkaisija nollautui 18.1x, seuraajalla pyyntö lokissa).

## ALOITA TÄSTÄ: juna 195 (omistajan TF 194 -palaute 17.52–17.53, PT)
Haara `linssiseppa2/laukaisusavu-195` (proto-repo, worktree wt/proto-linssiseppa2-savu, juna-195 98224a858:n päällä), kärki **b49666bc7**:
1. ea179a2e9 savu5 – laukaisun maapilvi "harmaita ilmakuplia" → kumpupilvi. RakettiSavu.shader `_SavuPilvi` (vain raketin aine;
   valas ennallaan): vääristetty 5 oktaavin fBm, pehmeä reuna, normaali kohinan gradientista, itsevarjo, hiekkapöly. RakettiSavu.cs:
   maapilvi 18–36 m × 3,4 (ennen 40–90 m × 2,8), MaaMax 240, huippu 50/s. Omistajan kuva: Matkakirja-fable
   docs/raportit/kaappaukset/omistaja-20261015/194-2-raketti-laukaisu-mittarit-savu-pulu-1752.png (T+0:04).
2. b49666bc7 valas v10 – "jää hypyn keskellä paikalleen" + "loiskahdukseen välivaiheita": ValaanHyppy nyökkäys x²(2−x) 18–88 %,
   kierto 5–90 % (ennen smoothstep valmis 72–74 %:ssa → asento jähmettyi huipun jälkeen, v9e-video); ValaanLuusto ilma-aalto 0,35;
   ValaanValo.RoiskeHidastus 1,8 (nousu √2), LaskuEnnakkoS 0,1·k, ToinenIskuS 0,35·k; RakettiValas toinen isku (pisarat + vaahto
   pyrstön kohdalla). Uusi testi LiikeJatkuuKokoLennon. Linssit 1867/1867, unity-tarkistus 0 virhettä.
- **EI VIELÄ SIMUSSA.** Varjostimen HLSL todentuu vasta Unityn käännöksessä. Julkaisijan seuraajalla pyyntö: käännä b49666bc7, aja
  `todistusajo.sh --era savu17-ipad … --skenaario _tyo/linssiseppa2/raketti-savu/sk-savu17-ipad.txt` ja `--era valas-v10 …
  --skenaario _tyo/linssiseppa2/valas-video/sk-valas-v10.txt` (iPad A26BC7D0, --haara linssiseppa2/laukaisusavu-195 --nyt).
- Tarkista: savu T+4 vs omistajan kuva (ei kiekkoja/kovia reunoja, kummut, pöly), iPadin kehysaika (fBm ~14 kohinakutsua/pikseli,
  ylipiirto); valasvideosta kehykset 10 fps (`ffmpeg -ss … -vf fps=10,scale=480:-1,tile=6x4`) – asento muuttuu koko lennon,
  roiske kasvaa usean kuvan aikana. Sitten pari PT:lle → kuittauksen jälkeen NS junaan 195.
- Haara on vahdin poissulussa (`!linssiseppa2/laukaisusavu-195` julkaisija-tyokalut/valoseppa-haarat.txt). Vahti seisoi 14.30:stä.

## Peking-testikaupunki (omistaja 17.18, PT hyväksyi suunnitelman; juna 196)
Haara `linssiseppa2/peking-testi-196` (wt/proto-linssiseppa2-peking, masterin b110dff52 päällä), kärki 2c72c4935:
☰ › Kehittäjä › Kokeet "Peking (testikaupunki)" (#if !MATKAKIRJA_APPSTORE) → OpasSovitin.AvaaPiilokaupunki("peking")
(OpasSovitin.Piilokaupunki.cs); Kehityskaupungit.Piilotetut + PiiloAuki (Taihedian 39.915896, 116.390814 = Codexin origo);
CesiumKaupunki: Ion ilman OSM-taloja + ilmakehän kaupunki; CesiumOmatMallit: piilolähde Documents/omat-mallit-piilo/<id>/ tai R2
`kartta/omat-mallit/piilo/<id>/uusin.json` → {"mallit": "<versio>/mallit.json"}. Testikomento "opas piilokaupunki peking".
- SIMU OK 18.02 (lokit/valoseppa-peking-testi/, L2 dda9e145f): piilokaupunki auki → data Ion, ilmakehä kehityskaupunki True,
  vapaa tila; "piilo peking osoitin 404" = odotettu (pakettia ei vielä). Kuvia 1-vapaa-alku.png / 2-vapaa-30s.png EN ehtinyt katsoa.
- AVOIN: Codexin mallipolku (native47/v11) tulee PT:n kautta → paketoi kuten Louvre (`_tyo/linssiseppa2/louvre1/rakenna.py`-malli:
  omat_mallit_tileset.py + omat_mallit_ktx2.py, POHJA ilman muita kohteita), kokeile ensin OMAT=<paketti> peking1/kuvat.zsh
  (lataa Documents/omat-mallit-piilo/peking), sitten R2-vienti (Julkaisija) ja PT:lle pari. Ilmaperspektiivi ei piirry ionin
  maastoon (rasterikerros), oma malli ja taivas kyllä.
- Pöllö antaa Pekingin sallituksi kokeiluotsakkeella (tools/pollo/sallitut.js KOKEILUN_LISAT giza → peking); rivi hakee listan
  uudelleen, jos se haettiin ennen kehittäjätilaa.

## Louvre (valmis, PT kuittasi)
Parit v2–v2e: _tyo/linssiseppa2/louvre1/louvre-v2*-pari-kulmaB.jpg, mittaukset HAVAINNOT-v2.md. Paketit lv2…lv2f, skriptit
kuvat-v2*.zsh. Jatko vain LR:n/PT:n pyynnöstä (LR nollautui 17.2x, seuraaja jatkaa Cour Carréesta).

## Työtilat
wt/proto-linssiseppa2-savu (laukaisusavu-195; poista kun NS yhdistänyt junaan 195), wt/proto-linssiseppa2-peking (peking-testi-196),
wt/proto-linssiseppa2-lontoo = PK:n. Poistettu: -valovesi, -ateenautu (junassa 194).
