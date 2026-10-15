from pathlib import Path
from datetime import datetime,timezone
import json,hashlib,shutil
ROOT=Path('/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2')
P=Path('/Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/kuvatuotanto/petrin-tavoitehavainnekuvat-20261014')
C=P/'models/continuation-274';O=ROOT/'output/petrin-tavoitehavainnekuvat-20261014';W=ROOT/'output/worktrees/petrin-tavoitehavainnekuvat-20261014'
D=W/'posti/petrin-malliluuppi-274';now=datetime.now(timezone.utc).isoformat()
def read(p):return json.loads(p.read_text())
def dump(d):return json.dumps(d,ensure_ascii=False,indent=2)+'\n'
def digest(f):
 b=f.read_bytes();return {'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b)}
assert not D.exists(),'Refuse replacement of any previous delivery'
j=read(C/'loop-journal.json');assert j['completedTotalRounds']==15 and len(j['rounds'])==5 and j['bestRound']=='M15'
review=read(C/'final-independent-review.json');assert review.get('modelReadyAsFinal') is False
verify=read(C/'final-numerical-verification.json');assert verify['verifiedNativeViews']==25
j.update(deliveryPending=True,productionActive=False,modelLoopAuthorized=False,additionalRoundsCompleted=5,roundCapReached=True,furtherModelRoundAuthorized=False,latestRound='M15',finalIndependentReviewPath=str(C/'final-independent-review.json'),finalModelAcceptanceVerified=False,stopReason='Five additional rounds M11-M15 complete; stop for PT feedback; M16 not authorized')
(C/'loop-journal.json').write_text(dump(j))
files={}
def copy(src,rel):
 f=D/rel;f.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,f);f.chmod(0o644);files[str(f.relative_to(W))]=digest(f)
def write(rel,text):
 f=D/rel;f.parent.mkdir(parents=True,exist_ok=True);f.write_text(text);files[str(f.relative_to(W))]=digest(f)
R='M15';a=P/'models'/R
for n in [f'petrin-{R}.blend','build_and_render.py','analyse_round.py','audit_saved_model.py','configuration.json','authorization.json','geometry-manifest.json','saved-model-audit.json','render-complete.json','round-log.json','source-licenses.json','projection-mesh.json','projection-mesh-vertices.f32','projection-mesh-triangles.i32']:
 copy(a/n,f'{R}/{n}')
for folder in ['inputs','renders','qa']:
 for f in sorted((a/folder).rglob('*')):
  if f.is_file() and not f.name.startswith('._'):copy(f,f'{R}/{f.relative_to(a)}')
for N in range(11,15):
 R=f'M{N:02}';a=P/'models'/R
 for n in [f'petrin-{R}.blend','configuration.json','build_and_render.py','geometry-manifest.json','saved-model-audit.json','round-log.json','qa/metrics.json',f'qa/petrin-{R}-comparison-sheet.png']:
  copy(a/n,f'history/{R}/{n}')
 for f in sorted((a/'inputs/cameras').glob('K*.json')):copy(f,f'history/{R}/inputs/cameras/{f.name}')
 if (a/'qa/independent-review.json').exists():copy(a/'qa/independent-review.json',f'history/{R}/qa/independent-review.json')
write('history/M09-basis-reference.json',dump({'round':'M09','previousDeliveryCommit':'43fd25c05e83b47a07b34a767def3caf223e4274','modelFile':'posti/petrin-malliluuppi-273/M09/petrin-M09.blend','modelSHA256':read(C/'authorization.json')['parentModelSHA256'],'PTAcceptedAsBasisOnly':True,'targetFilesUnchanged':True,'configuration':read(P/'models/M09/configuration.json'),'metrics':read(P/'models/M09/qa/metrics.json')}))
for n in ['authorization.json','loop-journal.json','final-numerical-verification.json','final-independent-review.json']:copy(C/n,n)
for pattern in ['M*-configuration.json','M*-actual-mesh-camera-fit.json','M*-software-projection-validation.json']:
 for f in sorted(C.glob(pattern)):copy(f,'optimization/'+f.name)
for f in sorted((C/'optimized-cameras').rglob('K*.json')):copy(f,'optimization/optimized-cameras/'+str(f.relative_to(C/'optimized-cameras')))
for f in sorted((C/'scripts').glob('*')):
 if f.is_file() and f.suffix in ['.py','.cpp']:copy(f,'scripts/'+f.name)
copy(P/'K5/mask-v2/PT-acceptance-272.json','K5-mask-v2-PT-acceptance-272.json')
copy(P/'sources/e8a797c5/fable-codex-petrin-M09-palaute-20261015.md','sources/fable-codex-petrin-M09-palaute-20261015.md')
copy(P/'models/M01/source-licenses.json','source-licenses.json')
m=read(P/'models/M15/qa/metrics.json');b=read(P/'models/M09/qa/metrics.json')
def tab(r,metrics):return '| '+r+' | '+' | '.join(f"{x['silhouetteIoUPercent']:.3f}" for x in metrics['perView'])+f" | {metrics['meanIoUPercent']:.3f} |"
table='\n'.join([tab('M09 pohja',b)]+[tab(x['round'],x['metrics']) for x in j['rounds']])
cameras=[]
for v in ['K1','K2','K3','K4','K5']:
 a=read(P/f'models/M09/inputs/cameras/{v}.json');c=read(P/f'models/M15/inputs/cameras/{v}.json')
 cameras.append(f"| {v} | {a['cameraAzimuthDegrees']:.2f} → {c['cameraAzimuthDegrees']:.2f} | {a['distanceM']:.2f} → {c['distanceM']:.2f} | {a['heightM']:.2f} → {c['heightM']:.2f} | {a['pitchDegrees']:.2f} → {c['pitchDegrees']:.2f} | {a['verticalFOVDegrees']:.2f} → {c['verticalFOVDegrees']:.2f} |")
report=f'''# Petřín #274 — viisi lisäkierrosta valmiit, paras ja viimeisin M15 palautteelle

**M11–M15 on tehty M09:n pohjalta. Viiden lisäkierroksen raja täyttyi; mallinnus on pysäytetty. M16:ta ei ole valtuutettu eikä aloitettu.** Lähde on `e8a797c5e3aaf2360c8bbd39db375a7a1fdf3fde`, blob `b93049955540c0e6bf5ff853eb66d58b54be9840`. M09 on PT:n hyväksymä lähtöpohja, ei lopullinen malli.

## Paras ja viimeisin

M15 on sekä paras että viimeisin. Se on mukana kerran kansiossa `M15/`: todellinen `.blend`, kaikki viisi natiivia renderiä, geometrian alfa ja näkyvät/täytetyt maskit, ääriviivavertailut, tarkat perspektiivikamerat, konfiguraatio, rakentamis-/analyysi-/auditointikoodi ja tallennetun mallin uudelleenavausauditointi.

Valintakriteeri säilyi samana: maksimoi viiden näkymän heikoin raja-arvoon suhteutettu natiivi renderi-IoU; keskiarvo ratkaisee tasan. Vertailuun sisältyy myös M09-pohja. `history/` säilyttää M11–M14:n todelliset mallit, kamerat, luvut ja arkit. M01–M10:n toimitushistoria ja M09-pohja säilyvät aiemmassa paketissa `posti/petrin-malliluuppi-273/`, commit `43fd25c05e83b47a07b34a767def3caf223e4274`.

## Todellinen natiivi renderi-IoU, prosenttia

| Kierros | K1, raja 85 | K2, raja 90 | K3, raja 90 | K4, raja 90 | K5, raja 90 | Keskiarvo |
|---|---:|---:|---:|---:|---:|---:|
{table}

**M15:n K1–K4 läpäisevät. K5 jää 86,823 prosenttiin ja alittaa 90 prosentin rajan 3,177 prosenttiyksiköllä. Koko malli ei läpäise eikä ole lopullisesti hyväksytty.** Siluetin läpäisy ei ratkaise detaljien tai lähdevarmennuksen puutteita.

Kaikkien viiden uuden kierroksen 25 natiivinäkymän leikkaus-/unionipikselit ja IoU laskettiin uudelleen tallennetuista maskeista. Lisäksi geometrian natiivialfasta muodostettiin täytetty maski eri toteutuksella (Pillowin nelinaapurinen ulkotaustan täyttö), ja tulos vastasi jokaista tallennettua maskia täsmälleen. Kaikkien kohdekuvien, kohdemaskien, kameroiden, renderien ja mallien SHA:t täsmäävät. Viisi tallennettua `.blend`-tiedostoa avattiin erikseen auditointiin; jokaisessa on kahdeksan jalkakenkäkomponenttia eikä tavoitekuvia tekstuureina. Näytöt ovat `final-numerical-verification.json`-tiedostossa. Tämä on tuottajan numeerinen tarkistus; erillinen arvioija kertoo oman tarkistuksensa rajat omassa raportissaan.

## Geometria ja sitovat mitat

M11: yläkopin lähtösäde muuttui 3,70 metriin, umpinainen alavyö 1,40 metriin ja alapuolisen viisteen alapiste 50 metriin. Alatasanteelle lisättiin todelliset vinotuet ja niiden sidokset, halliin punaiset fyysiset ikkunaluukut. Kaiteen ristikkorytmi tiheni. Yksityiskohdat ovat rekonstruktiota, eivät mitattua rakennusfaktaa.

M13/M15: kopin XY-leveyttä, olkakohtaa, epävarmaa mastokorkeutta ja alageometrian leveyttä sovitettiin rajatusti samaan todelliseen 3D-malliin. M15:n kopin XY-kerroin on 0,967, katon olkapiste 56,648m ja epävarma maston kärki 67,7575m. M15:ssa alatasanteen XY-kerroin on 0,9592 (uloke 4,08 % pienempi kuin M14:ssä); sen vinotukien ankkureita ei siirretty. Kokeet ja täsmälliset arvot säilyvät `optimization/`-lokeissa. Alageometrian kerroin 0,9978 vaimenee tasolle 20 m; hallin seiniä ei vinoonnettu. Maston sallittu arvioalue 66,5–71 m säilyi.

**58,7 m rungon/katon yläpinta, 20 m alatasanteen lattia ja 51 m ylätasanteen lattia säilyvät kaikissa viidessä tallennetussa mallissa.** Auditoinnin liukulukupoikkeama on alle 0,0001 m. Generoitujen tavoitteiden eri tasannepaikkoja ei kopioitu muuttamalla näitä korkeuksia. Malli ei sisällä erillistä maalaattaa tai sorakiekkoa.

Alkuperäisen konfiguraation vanhat `lattice_pitch`-tyyppiset kentät eivät kaikki ole aktiivisia: todellisen ristikon tasoluettelo ja sauvapaksuudet määräytyvät kierroskohtaisesta `build_and_render.py`-koodista ja tallennetusta geometriasta. Tämä toimitus ei väitä mitattua kaikkien säteiden, aukotusten tai K4:n pohjoisdetaljien totuutta.

## Kamerasovitus erikseen

M12–M15: todelliset perspektiivikamerat sovitettiin samoista Blender-objekteista vietyihin 40 696 kärkeen ja 66 952 kolmioon. Ulkotaustatäyttö ja täyden tornin kuvassa pysymisen tarkistus estävät siluetin keinotekoisen rajaamisen. Kuvia tai tavoitemaskeja ei venytetty, väännetty tai maalattu. Lopullinen taulukko perustuu aina todellisiin Blender-natiivirendereihin, ei sovittimen ehdotuksiin.

M15:n natiivissa ohjelmistoprojektiossa suurin ero Blender-IoU:hun on 0,004423 prosenttiyksikköä. Puoliresoluutiota käytettiin vain diagnostiikkaan; optimointi tehtiin natiivikoossa. Hakurajat M09:n kameroihin nähden: atsimuutti ±6°, etäisyys ±15 %, silmän korkeus 85–115 % ja ylärajan 0,25 m lisä, pitch ±3°, pystynäkökenttä ±12 % ja pääpiste ±30 px. Tarkat rajat/evaluoinnit ovat jokaisen kameran lokissa. Nämä ovat sovituksen rajoja, eivät mitattuja kuvauspaikkojen virherajoja.

| Kamera | Atsimuutti°, M09→M15 | Etäisyys m | Silmän korkeus m | Pitch° | Pystynäkökenttä° |
|---|---:|---:|---:|---:|---:|
{chr(10).join(cameras)}

## Sävy ja avoimet erot

Vihreä maanheijastus ja sävytetty taivas korvattiin harmaalla maalla ja valkoisella päivänvalolla. Teräs on tumma sinertävänharmaa (`60758A`), halli vaalea kerma (`EFE4D0`) ja luukut punaiset (`A34F45`); nämä ovat materiaaliestimaatteja. M13:sta lähtien esikatselun valotus on +0,25 EV. Ympäristö on neutraali esikatselu.

**Sitova materiaalivärin ΔE on edelleen `null`.** Pikseli-ΔE sisältää muoto-/kohdistus-/valaistusvirheitä eikä ole materiaalivärin läpäisy. M13:n tuore erillinen välitarkistus ja tämän toimituksen uusi loppuarvio on säilytetty. Yläkopin/maston yksityiskohdat, hallin aukotus ja jalkojen/kaarien liitokset sekä alatasanteen reunat ja tuenta jäävät osin tavoitetta kaavamaisemmiksi. K5:n ulkoraja ei täyty. K5:n peittyvä maapiste on edelleen arvio; hyväksytty v2-maski ei ole riippumaton pikselisertifikaatti. K4:n pohjoisdetaljit ovat varmentamaton rekonstruktio.

## Tila ja toistettavuus

Kaikki viisi tavoitekuvaa ja niiden aktiiviset maskit ovat PT-hyväksyttyjä. Niiden hyväksyntä ei ole tämän mallin hyväksyntä. #274:n rajattu työ päättyy tähän toimitukseen ja PT:n palautteen odotukseen; koko mallin loppuhyväksyntä on avoin. Ei uusia AI-kuvia (0; aiemmat 7 kutsua ennallaan), ei R2-vientiä, peli-integraatiota, main-yhdistämistä tai julkaisua. Peking/Pulu ja muut tilaukset eivät kuulu tähän toimitukseen.

Blender 5.2.1 LTS, Cycles/Metal. Erillisessä kopiossa luo `renders/` ja `qa/`, suorita mallihakemiston `build_and_render.py`, sitten `analyse_round.py` NumPy/Pillow-Pythonilla ja `audit_saved_model.py` Blenderissä. Sovituksen C++-lähde ja apuskriptit ovat `scripts/`; ne käyttävät tuotantoroottina NAS-polkua, joka on vaihdettava erillisessä toisintoympäristössä. C++-kirjasto rakennetaan `clang++ -O3 -std=c++17 -dynamiclib project_mesh.cpp -o libproject_mesh.dylib`. Kohdehavainnekuvien alkuperäisten lähdevalokuvien tekijät, URL:t ja lisenssit säilyvät `source-licenses.json`-tiedostossa. Malli ei käytä tavoitekuvia tekstuureina.
'''
write('README-FI.md',report);(C/'README-FI.md').write_text(report)
write('delivery-packet.json',dump({'taskNumber':274,'createdAt':now,'sourceCommit':read(C/'authorization.json')['sourceCommit'],'sourceBlob':read(C/'authorization.json')['sourceBlob'],'completedTotalRounds':15,'additionalModelRounds':5,'rounds':['M11','M12','M13','M14','M15'],'bestRound':'M15','latestRound':'M15','bestAndLatestAreSameArtifact':True,'bestSelectionCriterion':j['bestSelectionCriterion'],'allIoUThresholdsPassed':False,'passedViews':['K1','K2','K3','K4'],'failedViews':['K5'],'modelFinalAcceptanceVerified':False,'bindingMaterialDeltaE':None,'newAIImageGenerations':0,'furtherModelRoundsAuthorized':False,'stopReason':j['stopReason'],'R2Used':False,'gameIntegrated':False,'mainMerged':False,'published':False,'manifestScope':'Payload before this manifest and separate letter; post-push receipt covers every file','files':dict(files)}))
letter=f'''# Codex → Fable/PT: Petřín #274 — M11–M15 valmiit, paras ja viimeisin M15 palautteelle

Jatkoin hyväksytyn M09-pohjan päältä lähteen `e8a797c5e3aaf2360c8bbd39db375a7a1fdf3fde` mukaiset **viisi lisäkierrosta M11–M15**. Raja on täynnä, joten mallinnus on pysäytetty palautteelle. **M16:ta ei ole valtuutettu eikä aloitettu.**

**Paras ja viimeisin ovat sama M15:** [viiden näkymän vertailu](petrin-malliluuppi-274/M15/qa/petrin-M15-comparison-sheet.png), [todellinen Blender-malli](petrin-malliluuppi-274/M15/petrin-M15.blend). Viisi natiivia renderiä, maskit, tarkat kamerat, koodi ja tallennetun mallin auditointi ovat samassa kansiossa. M11–M14-mallit ja luvut säilyvät `history/`-kansiossa; M01–M10-toimitus on ennallaan.

| Versio | K1, raja 85 | K2, raja 90 | K3, raja 90 | K4, raja 90 | K5, raja 90 | Keskiarvo |
|---|---:|---:|---:|---:|---:|---:|
{tab('M09 pohja',b)}
{tab('M15 paras/viimeisin',m)}

**K1–K4 läpäisevät. K5 on 86,823 % / 90 %; koko mallin läpäisyä tai lopullista hyväksyntää ei väitetä.** Paras valittiin samalla ennakolta kirjatulla heikoimman raja-arvoon suhteutetun natiivi-IoU:n kriteerillä. [Täysi raportti](petrin-malliluuppi-274/README-FI.md), [kierrosloki](petrin-malliluuppi-274/loop-journal.json), [tuore erillinen loppuarvio](petrin-malliluuppi-274/final-independent-review.json), [25 natiivinäkymän numeerinen varmennus](petrin-malliluuppi-274/final-numerical-verification.json), [tavutiedot](petrin-malliluuppi-274/delivery-packet.json).

Yläkopin leveyttä/olkakohtaa ja epävarmaa mastoa sovitettiin, alatasanteelle lisättiin todelliset vinotuet, uloketta tarkennettiin ja halliin tehtiin punaiset ikkunaluukut. **58,7 / 20 / 51 m säilyvät kaikissa viidessä tallennetussa mallissa.** Generoitujen tavoitteiden tasannevirheitä ei kopioitu lattiakorkeuksiin. Harmaa maa ja neutraali valkoinen päivänvalo poistavat aiemman vihertävän ympäristövalaistuksen; teräs on tumma sinertävänharmaa, halli vaalea kerma ja luukut punaiset. Sitova materiaali-ΔE pysyy `null`; pikselisävyero on diagnostiikkaa.

Yläkoppi/masto, hallin aukotuksen rytmi ja jalkojen/kaarien liitokset sekä alatasanteen detaljit jäävät osin kaavamaisiksi. K5:n ulkoraja jää vajaaksi. K5:n maapiste on arvio ja K4:n pohjoisdetaljit varmentamaton rekonstruktio. Kamera- ja geometriamuutokset on erotettu raporteissa; kaikki tavoitekuvat/maskit säilyvät tavutarkasti ennallaan.

Uusia AI-kuvia 0. Ei R2-vientiä, peli-integraatiota, main-yhdistämistä tai julkaisua. **Odotan PT:n palautetta tämän rajatun luupin jälkeen.**
'''
mail=W/'posti/codex-fable-petrin-malliluuppi-274-20261015.md';assert not mail.exists();mail.write_text(letter);files[str(mail.relative_to(W))]=digest(mail);(C/'mailbox-letter.md').write_text(letter)
staging={'createdAt':now,'worktree':str(W),'files':files,'bestRound':'M15','latestRound':'M15'};(C/'staging-files.json').write_text(dump(staging))
mirror=O/'models/continuation-274';mirror.mkdir(parents=True,exist_ok=True);shutil.copytree(D,mirror/'mailbox-package')
for n in ['loop-journal.json','README-FI.md','final-independent-review.json','final-numerical-verification.json','staging-files.json','mailbox-letter.md']:shutil.copy2(C/n,mirror/n)
shutil.copytree(P/'models/M15',O/'models/M15',ignore=shutil.ignore_patterns('*.log'),dirs_exist_ok=True)
print(json.dumps({'newFiles':len(files),'bytes':sum(x['bytes'] for x in files.values()),'bestAndLatest':'M15'}))
