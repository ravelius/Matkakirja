# Linssisepän luovutus 17.10.2026 klo 13.38 (KOVA RAJA 35 %, Postivahti)

Edellinen: viesti-linssiseppa-luovutus-20261017-0821.md (yleisohjeet, osoitteet). Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto
(paikalliset haarat, ei pushia), ajot proto-3d/tyokalut/linssiseppa-ajot/. Viestit AINA send_message id:llä: PT local_5df52e10-10e4-4b72-9554-0049db300dfe
(≤ 3 riviä), JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, SK local_72d15713-eb20-402b-95f7-87bdaaf91b74,
ÄÄ local_16ee69c8-b917-4dcd-9060-3542c5e03e67, NUI local_44392b3c-86ee-4873-9d76-82f9aaa6b832.

## 1. ENSIMMÄISEKSI: NIKE + VENUS -SIMU (PT odottaa kuvia ja haaraa kuittaukseen)
- Haara linssiseppa/louvre-veistokset-200 (worktree wt/proto-linssiseppa-veistokset) = junan 200 runko b7a916224 + 222484f5b (Nike ja Venus
  nimikylttiin, korttiin ja Louvren klassikoiden listaan SK:n dbb4f1f82 tiedoista; Teos.MitatTeksti = veistokset.json mitat_teksti) + 589561e7b
  (sc-nike ja gg-venus Ranskan kierrokselle, jotta listavalinta kävelee; 59 pysähdystä) + 30147ac07 (testit) + 43e01449c (kertoja manifest-200.json,
  varana 199; ÄÄ:n Nike/Venus-äänitteet). Linssit 1993/1993, unity-tarkistus 0. manifest-200 on ämpärissä (JU 13.26, curl 200).
- Ajo ajo-nikevenus200.zsh käynnistyi uudelleen 13.31 (käännös L2 jonossa ffded4a57:n takana; loki ajo-nikevenus200.log, toinen "KÄÄNNÖS LOPPU" -rivi).
  Tarkista `pgrep -fl ajo-nikevenus200`; jos ei käynnissä eikä logissa uutta "NIKEVENUS200 VALMIS", käynnistä uudelleen taustalle (nohup zsh …).
  Kerro käännöksen SHA JU:lle (JU pyysi; L2 PK:n meriajon pidossa). Simuvuoro JU:n jonossa ~13.55: kun JU lähettää SIMU NYT →
  `touch /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/simu-nikevenus200.nyt` (skenaario sk-nikevenus-200-iphone.txt: N1 Louvren lista 14,
  N2 Niken kyltti, N3 Niken kortti, N4 Venuksen kortti; oleta manifest-200 (104) ja Niken kertoja). Valmis → JU:lle "SIMU VAPAA", kuva-arkki
  _valmiit/louvre-nikevenus-200-20261017/ ja PT:lle 3 riviä (haara + SHA kuittaukseen → NS).
- Museoskenaarioiden sudenkuopat muistissa: museo-skenaario-napautukset.md (lähestyminen pois ennen avausta; näyttely ja lista napautuksin).

## 2. TÄNÄÄN VALMIIT
- Veistokset (Rodin) junassa 200: runko b7a916224 (NS), simu 200d OK, kuvat _valmiit/louvre-veistokset-200-20261017/.
- Kapea kompassin keila peruttu omistajan 08.59 päätöksellä: linssiseppa/pystyvipu-199 55f33d377 (NS:llä 60a92584c).
- Peking V7 omistajan piilokaupunkiin: p361v7 ämpärissä 09.50 (uusin.json → p361v7), KTX2-paketti T7:llä …/peking-codex-20261013/pelin-ktx2/.
  Rakennusskripti rakenna-peking361-vienti.zsh (sijainnit p344v4:n mallit.json:sta, ion-naytteet ei vientiin).
- Codexille vastattu 1116b30f0 (claude/postilaatikko): V8 source-network1 hyväksytty, pyydetty pelitoimitus HETI → kun tulee: KTX2 + portti +
  vienti SAMANA TUNTINA (omistajan päätös 16.10. 18.05; muisti peking-paketit-amparin-heti.md), sitten V8a sn1:n päälle, tummien viivojen syy, V8b; V8c siirtyy.
- Ateena: oli jo auki pelaajille (57088358e, master/TF 195–199), ei committia. Zeus e02 PT:n hyväksymä.
- NUI:lle löydös: esikatselukortti jäi auki linssin sulkemisen jälkeen → NUI korjasi 2d4ed9e36 (oma todennus).

## 3. AVOIMET
- Codexin sn1-pelitoimitus (seuraa claude/postilaatikko: `git log origin/claude/postilaatikko --oneline | grep -i "codex.*linssi"`).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261017-1338.md).
Ensin kohta 1 (Nike + Venus -simu JU:n vuorolla → PT), sitten Codexin sn1-toimitus kun se tulee.
