# Linssisepän luovutus 17.10.2026 klo 08.21 (KOVA RAJA 36 %, Postivahti)

Edellinen: viesti-linssiseppa-luovutus-20261017-0623.md (yleisohjeet, osoitteet). Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto
(paikalliset haarat, ei pushia), ajot proto-3d/tyokalut/linssiseppa-ajot/. Viestit AINA send_message id:llä: PT local_5df52e10-10e4-4b72-9554-0049db300dfe
(≤ 3 riviä), JU local_5cb16c00-98db-4cd9-8d7c-1b0bc8ced914, NS local_674b9ec4-e2f3-48e9-a810-a129f20a4f03, SK local_72d15713-eb20-402b-95f7-87bdaaf91b74,
Äänittäjä local_16ee69c8-b917-4dcd-9060-3542c5e03e67.

## 1. ENSIMMÄISEKSI: VEISTOSTEN SIMU (seuraava juna, ei kiire)
- Haara linssiseppa/louvre-veistokset-200 (worktree wt/proto-linssiseppa-veistokset) = louvre-sk-199 (08f4b1e78) + 884802304 (Rodinin veistokset
  teoslistaan, nimikylttiin, esittelykorttiin; Nayttely.Kohteet, MuseoSovitin.EsillaTeos, MuseoTaulu-muutokset) + 252553536 (SK:n tiedot, testi).
  Linssit-testit 1984/1984, unity-tarkistus 0. i-kortti EI aukea veistoksilla (ei kohtia/paikkaa) → NUI:n erillinen työ, jos halutaan.
- Ajo ajo-veistokset200.zsh käynnistyi 08.21 (käännös L2 jonossa, loki ajo-veistokset200.log). Tarkista `pgrep -fl ajo-veistokset200`;
  jos ei käynnissä eikä logissa "VEISTOKSET200 VALMIS", käynnistä uudelleen taustalle. Kun JU lähettää SIMU NYT:
  `touch /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/simu-veistokset200.nyt` (~12 min, iPhone BD64C8E4, skenaario sk-veistokset-200-iphone.txt:
  V1 nimikyltti, V2 kortti, V3 Rodin-lista, V4 listavalinta, A1 Alankomaiden lista ennallaan). Valmis → JU:lle "SIMU VAPAA", kuvat + arvio PT:lle.
  Skenaarion oleta-rivit arvattu lokimuodoista (museo: saapui veistos / kertoja rodin- / valinta veistos) — jos jokin kaatuu, katso konsoli-stdout.log.

## 2. JUNA 199 (kaikki NS:llä, PT kuittasi)
- linssiseppa/pystyvipu-199: 048300769 pystyvipu (kahva 40 pt, rata 176, ei tekstejä; laivavipu 792952911 hylätty), ef510d04f ei kierroslistaa
  vapaassa lennossa (omistaja 07.06), e7bdd6f15 + 69178ded7 kompassin lamppukeila (omistaja 07.18). Simut bd107b8c ja 66b0373a OK;
  kuvat _valmiit/pystyvipu-199-20261017/. Ruusun tummennus yöllä vain jos omistaja pyytää (PT).
- linssiseppa/louvre-sk-199: c8c6bff49 (auto zoomin ajat 7 teokselle, Rodinin kertoja patsaan tunnuksella, lähestymisäänet maan datasta
  ulkoaani/sisaanmeno) + eeada1eea (SK:n data: kuvatekstit 51/51, krediitit, salitekstit, Nike/Venus; 777 pidetään) + 08f4b1e78
  (kertoja manifest-199.json, varana 198; ämpärissä, Äänittäjä kuittasi, 102 riviä).

## 3. MUUT TÄNÄÄN
- Pariteettilista docs/raportit/linssiseppa-louvre-pariteetti-20261017.md. Avoimet muiden: Pariisin lähestymisäänet (ÄÄ; data-kentät
  ulkoaani/sisaanmeno valmiina lahestyminen.json:iin), rodin-kolme-haamua.glb 404 + Pariisin pienoismalli (NS), Niken/Venuksen jalustat (NS/LR),
  lähestymisen luonnos → false kun PT/SK hyväksyy (päivitä MuseoMaaTestit.RanskanLahestyminen). Orsay-teoksia EI Louvren kierrokselle (PT).
- Codex-posti c53ad7b3a (claude/postilaatikko): #361 V8 palaute, V6/V7-tiedot (paketit poistettu siivouksessa), tavoiteluupin kuittaus,
  tilattu V8a–c. Seuraavaksi Linssiseppä: k3/k5-uusinta kuvat vasta latausten jälkeen; Pekingin vesiverkko KS:ltä PT:n kautta (Peking tauolla?
  kysy PT ennen työtä).
- Kiinan väestöpinta: EI minun (KS kytki 941bb139b; linssiin liittäminen KS:n seuraajan kanssa jos tarpeen).
- tools/gpu-vapaa.sh ja .claude/settings.local.json* eivät ole minun (älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261017-0821.md).
Ensin kohta 1 (veistosten simu JU:n vuorolla), sitten PT:n seuraava erä.
