## 2026-10-11 — SISÄLTÖKIRJURI → CODEX: 12 paikallisaarrekuvaa (BEL, SVK, SVN, LUX, MLT, CYP; pieni + iso kustakin)

Generointilupa: omistajan lupa Päätoimittajan välityksellä 11.10.2026 — **12 kuvaa, yksi generointi per kuva**, ei lisävariantteja eikä omatoimisia uusintoja. Nämä kuusi maata jäivät pois 58 kuvan erästä (v1278), koska niiden aarreparit kirjoitettiin vasta myöhemmin; kuvat täydentävät parit samaan tyyliin kuin muut.

**TYYLI = samat kuin nykyiset `assets/aarteet/paikallis/*.jpg`-kuvat.** Referenssit repossa (main), katso nämä ennen aloitusta:
- `assets/aarteet/paikallis/che-iso.jpg` (varsijousi ja omena),
- `assets/aarteet/paikallis/grc-pieni.jpg` (hunajaruukku),
- `assets/aarteet/paikallis/nor-iso.jpg` (hopeakätkö ruukusta).

Yhteinen muoto: **yksi esine (tai pieni ryhmä samaa esinettä) keskellä, kuvattu vähän ylhäältä viistosti, lämmin vaalea beige/kellertävä paperimainen tausta ilman horisonttia tai pöydänreunaa, pehmeä valo ja lyhyt pehmeä varjo, fotorealistinen tuotekuvamainen studiokuva, esine täyttää noin 60–70 % kuvasta, ei muita esineitä paitsi tarinaa kantavat (kuten omena).** Neliö.

**Yleissäännöt:** FOTOREALISTINEN havainnekuva; ei tekstiä, kirjaimia, numeroita, logoja, vesileimaa, kehystä eikä lippuja; ei ihmisiä; ei verta/väkivaltaa; ei poliittisia symboleja; metatietoihin (`Description`/`Source`) "Havainnekuva. Tekoälyllä tuotettu, ei valokuva."; kuvateksti manifestissa päättyy sanaan "Havainnekuva.". Muoto PNG 1024 × 1024 (1:1) sRGB, läpinäkymätön (Sisältökirjuri pienentää ja pakkaa lopulliseksi 640 × 640 JPEG q82).

**Pysyvät kiellot:**
1. EI tekijänoikeudella suojattuja teoksia, joiden tekijän kuolemasta on alle 70 vuotta tai tekijä elossa; kaikki alla olevat kohteet ovat esineitä, joiden tekijät ovat kuolleet yli 70 vuotta sitten tai jotka ovat anonyymejä antiikin/keskiajan esineitä — jos jokin kuvauksen osa epäilyttää, jätä se pois ja mainitse kuittauksessa.
2. EI Googlen 3D-aineistoa, Street View'tä tai muuta Googlen kuvaa lähteenä tai mallina.
3. EI museokokoelmien jäljennöksiä: älä toista tiettyä museovalokuvaa; koosta esine alla olevasta kuvauksesta yleisenä, uskottavana esineenä.

**Toimitus:** R2 `paikallisaarteet/<ISO3>/20261011/<iso3>-<pieni|iso>.png`, manifesti `posti/kuvatoimitus-paikallisaarteet-6-20261011.json` (kuvakohtaiset rajat/poikkeamat, kuvateksti), kuittaus `posti/codex-fable-paikallisaarteet-6-20261011.md`. Ei main-mergeä, versionnostoa eikä julkaisua Codexilta.

## Kohteet (esineen nimi = pelissä näkyvä nimi, kuvaus = mitä kuvaan)

| id | ISO3 | Esineen nimi | Kuva |
|---|---|---|---|
| bel-pieni | BEL | Käärö brysseliläistä pitsiä | Käsin nyplätty valkoinen pitsikäärö, osa avattuna ja ylhäältä katsottuna: hienoa kukkakuvioista pitsiä, vieressä muutama puinen nyplääjän puola, joissa hento lanka. Valkoinen/norsunluu pitsi beigellä taustalla. Ei tekstiä, ei nimikirjaimia pitsissä. |
| bel-iso | BEL | Antwerpenin timanttihiojan kätkö | Pieni nahkapussi, josta on valunut esiin muutama karkea raakatimantti (harmahtavan lasimaisia, epäsäännöllisiä oktaedrejä) ja kaksi–kolme hiottua kirkasta timanttia; vieressä pieni vanha messinkinen hiomalaitteen pidike. Kirkkaat heijastukset mutta ei liioiteltua kimallusta. |
| svk-pieni | SVK | Kremnican kultadukaatti | Kolme–neljä keskiaikaista kultadukaattia, joista yksi pystyssä reunallaan ja loput päällekkäin; lämmin kullankeltainen metalli, pehmeästi kulunut reuna. Kolikoiden pinnalla vain abstraktia reliefiä (hahmo ja kehäkoriste) — EI luettavaa kirjoitusta eikä numeroita; ei valtionsymboleja. |
| svk-iso | SVK | Banská Štiavnican hopeakaivoksen kätkö | Muutama raaka hopeamalmilohkare (tummanharmaata kiveä, jossa hopeisia suonia) ja yksi tahko hopeaa, vieressä vanha kaivosmiehen messinkinen turvalamppu (öljylamppu) ja pieni rautavasara; ei ihmisiä, ei kaivossuuta. |
| svn-pieni | SVN | Lipicanhevosen kavioraudan jäljennös | Yksi vanha tumma rautainen hevosenkenkä, hieman kulunut, naulan reiät näkyvät, viistosti kuvattuna; vieressä muutama valkoinen hevosen harjakarva tai pieni nahkaremmi. Ei hevosta kuvassa. |
| svn-iso | SVN | Idrijan elohopeakaivoksen kätkö | Punaruskea sinooperi-malmikivi (kirkkaan punaista kiteistä pintaa mustalla kivellä) matalalla keraamisella lautasella, ja lautasen pohjalla muutama pyöreä hopeinen elohopeapisara. Vieressä pieni lasinen lääkepullo. Tummanpunainen väri hallitsee. |
| lux-pieni | LUX | Moselin rieslingpullo | Yksi pitkäkaulainen vihertävä viinipullo (Moselin tyyli), korkki paikallaan, EI etikettiä eikä tekstiä; vieressä viinirypäleterttu ja yksi lasillinen vaaleankeltaista viiniä. Pullo hieman viistossa tai makaamassa. |
| lux-iso | LUX | Minette-rautamalmin lohkare | Yksi iso epäsäännöllinen ruosteenpunertava-ruskea rautamalmilohkare, raskas ja huokoinen, pieniä keltaisia ja punaisia kerrostumia pinnassa; vieressä muutama pienempi pala ja vanha rautainen louhintataltta. Maanläheinen ruosteen sävy. |
| mlt-pieni | MLT | Maltan ristin jäljennös | Pieni metallinen kahdeksankärkinen risti (kärjet halkaistut kuten ristiritarien ristissä), hopeanharmaata tai vaaleaa metallia, riippumassa ohuesta ketjusta tai makaamassa ketju kiertyneenä. EI lippua, EI vaakunaa eikä poliittisia symboleja — vain koruesine. |
| mlt-iso | MLT | Ħaġar Qimin temppelin kivilohkare | Yksi suuri pystyyn asetettu vaalea kalkkikivilohkare, pinta sään kuluttama ja kuoppainen, hieman laikukas oranssi/harmaa jäkälä; juuressa muutama pienempi kivi. Studiokuva samalla beigellä taustalla (ei maisemaa, ei temppelin rakennetta). |
| cyp-pieni | CYP | Enkomin sarvijumala | Pieni pronssinen jumalhahmo: seisova patsas, päässä kaksi pientä sarvea, jalat paksulla metallisella jalustalla; patina vihertävää ja ruskeaa, antiikin pronssia. Hahmo yksinkertaistettu ja anonyymi (ei yksityiskohtaisia kasvoja; peruspiirteet). Älä kopioi museokuvaa. |
| cyp-iso | CYP | Lambousan hopea-aarre | Kaksi–kolme pyöreää hopealautasta päällekkäin vinosti, pinnalla taottua reliefiä (pieniä hahmoja ja koristekehä, ei luettavaa kirjoitusta), hopea himmeän harmaata ja patinoitunutta, yksi lautanen nojaa muihin. Pieniä reliefihahmoja EI tarvitse tehdä tunnistettaviksi. Älä kopioi museokuvaa. |

**Erityishuomiot:** (1) svk-pieni: ei kolikon tekstiä — jos kirjaimia syntyy, poista tai kirjaa poikkeama. (2) mlt-pieni: pelkkä esine, ei ritarikunnan symboleja (kilpiä, lippuja). (3) svn-iso: elohopeapisarat kuvataan pieninä hopeapalloina; ei lämpömittaria eikä laboratoriotunnelmaa. (4) Jos jokin kuva ei täytä kuvausta, toimita paras ja kirjaa puute manifestiin; älä uusi omatoimisesti.
