# Linssisepän luovutus 17.10.2026 klo 19.22 (KOVA RAJA 39 %, Postivahti)

Edellinen: viesti-linssiseppa-luovutus-20261017-1338.md (osoitteet, yleisohjeet). Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto
(paikalliset haarat, ei pushia), ajot proto-3d/tyokalut/linssiseppa-ajot/. Viestit AINA send_message id:llä: PT local_5df52e10-10e4-4b72-9554-0049db300dfe
(≤ 3 riviä), JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, SK local_72d15713-eb20-402b-95f7-87bdaaf91b74,
ÄÄ local_16ee69c8-b917-4dcd-9060-3542c5e03e67, LR local_996d60ab-b4af-4172-ad31-f8e948f141a3.

## 1. ENSIMMÄISEKSI: LOUVREN LASIPYRAMIDI -SIMU (omistaja 19.15 + 19.16, PT odottaa kuvaparia)
- Haara linssiseppa/orsay-valinnaiset-200, worktree /Users/Shared/Claude/wt/proto-linssiseppa-orsay. Uusin cf61e859d:
  f36097b49 (Pariisin kartalla palatsimallin tilalle koodissa rakennettu lasipyramidi KaupunkiPalloKuva.LuoLouvrePyramidi + maavarjo
  MaaVarjo VihjeVarjo-arvoilla, louvre_kartta.bytes pois) + cf61e859d (lasi hillitty vaalea siniharmaa 172/182/186, heijastus 0,25;
  omistaja 19.16 "Saa olla vähä värinen"). PT kuittasi f36097b49:n; unity-tarkistus 0.
- Ajo ajo-louvreavaus200g.zsh käynnissä (käännös L2 jonossa karttaseppa/kiina-paketti-200:n takana, loki ajo-louvreavaus200g.log).
  Tarkista `pgrep -fl ajo-louvreavaus200g`; jos ei käynnissä eikä logissa "LOUVREAVAUS200G VALMIS", käynnistä uudelleen taustalle (nohup zsh …).
  Valmis → JU:lle käännöksen kaannos.txt + pyyntö iPhone BD64C8E4 ~4 min → JU:n SIMU NYT → `touch …/linssiseppa-ajot/simu-louvreavaus200g.nyt`
  (skenaario sk-louvre-pyramidi-200g-iphone.txt: G1 Pariisin kartta, ☰ oikealla napautuksella, G2 valikko) → "SIMU VAPAA" JU:lle.
- Tarkista kuvasta: pyramidi luettava lasina (tumma ristikko, siniharmaa, ei kirkas sininen), maavarjo alla, Peilisali erillään, osuma ≥ 44 pt.
  Tee lähikuva (rajaus kuten _valmiit/louvre-auki-200-20261017/F1z-kartta-lahikuva.png) → _valmiit/louvre-pyramidi-200-20261017/.
  PT:lle 3 riviä: kuvapari nyt (F1z) | uusi + sha cf61e859d (tai uudempi) → PT vie KK:lle; PT:n kuittauksen jälkeen sha NS:lle junaan 200.
- Jos pyramidi näyttää väärältä (tahkot väärin päin, ristikko liian tiheä): KaupunkiPalloKuva.PyramidiVerkko/PyramidiLasi (Ruudut 7,
  Viiva 0,016, Kehys 0,03, kierto 35°); varjo KaupunkiPallot.LisaaMuseo (louvre-haara).

## 2. TÄNÄÄN VALMIIT (kaikki proto linssiseppa/orsay-valinnaiset-200, 43e01449c:n päällä)
- Nike + Venus -simu OK 16.20, PT kuittasi → NS junaan 200 (43e01449c).
- 7ffde51f3 van Goghin Auversin kirkko ja Tähtikirkas yö kierrokselle (61 pysähdystä); 749a0bc57 lähestyminen hyväksytty (SK:n teksti,
  Rodin-puhe, Orsay-uusinta, luonnos false) + Louvren pienoismalli; b429c0489 + 44f981401 ☰ lähestymiskuvan päällä (koskee myös Rijksiä);
  674069976 kuvatekstit (NS yhdisti junaan 200, runko 01540e13a); a9d86b242 LOUVRE AUKI (omistaja 18.34 PT:n kautta: portti + houkutin
  auki, malli irti Peilisalista SiirtoX 0,5, ☰ vain näkyvän kuvan lähde) → NS:lle annettu 19.1x (PT käski heti).
- Kuvat: _valmiit/louvre-avaus-200-20261017/, _valmiit/louvre-auki-200-20261017/.
- Levy (Postivahti): 20 omaa mergettyä proto-worktreetä poistettu. Jäljellä orsay (aktiivinen), kierrokset195 (todistusajon työkalu,
  ajoskriptien T=), houkutin, kerrospiilo, louvre, puutomat191, pystyvipu, vipu (laivavipu hylätty, voi poistaa), — tarkista ennen poistoa.

## 3. AVOIMET
- Codexin #361 sn1-pelitoimitus (ei tullut tänään): `git log origin/claude/postilaatikko --oneline | grep -i "codex.*linssi"`
  (viimeisin b5cc72fea). Tullessa KTX2 + portti + vienti SAMANA TUNTINA (muisti peking-paketit-amparin-heti.md).
- ÄÄ:n manifest-rivit-lahestyminen.json (ranska-rodin-puhe, ranska-orsay-puhe-2) eivät ole kertojan manifestissa; lähestyminen soittaa
  suoraan polusta, joten ei tarvita toistolle (tekstitys vain, jos halutaan).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261017-1922.md).
Ensin kohta 1 (lasipyramidin simu JU:n vuorolla → kuvapari PT:lle → sha NS:lle), sitten Codexin sn1-toimitus kun se tulee.
