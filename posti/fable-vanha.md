## 1.9.2026 18:55 UTC — FABLEN TILANNEMUISTIO (reset 2 jatkuu) + KUVATILAUS E1: kaksi uutta eläintäkyä

TILANNE: origin/main = v1428 (fd02e043). Tänä iltana julkaistu v1427
(kaupunkikaton pudottamat syvennystarinat lehdissä, savuke-fokuskohteet
110/110 katon mukaisena) ja v1428 (omistajan päätös: Vanin kissa -kohde
ja Livnon villihevoset -syvennys jäävät, päällekkäiset eläintäyt TUR ja
BIH pois; eläintäkyjä 27 maassa).

POLTTOKETJU VALMIS patinatta: pohja 2026-09-01e (rerun onnistui 18:21
UTC) → nosto 2026-09-01f (ajo 33543557200, ok 18:29) → viiva 2026-09-01g
(ajo 33544143068, ok 18:36). pyramidi.json: versio=2026-09-01e,
patina=ei, nostotaso 01f, viivataso 01g (rajat=nykyiset). Sofian seutu
z7 (col 92–93, row 37–38) tarkistettu koosteena: pohja + viiva + nostot
istuvat, paperi puhdas ilman patinaa. HUOM: muistion "Sofia z7 col 92
row 32" oli Varsovan laatta — Sofia on z7 col 93 row 38.
Omistaja päättää patinasta katsottuaan.

### KUVATILAUS E1 — yleiskuvitussessiolle (posti/kuvatoimitus.md)

Kaksi uutta eläintäkykuvaa, koska Bosnian ja Turkin eläimet poistuivat
kaksoiskappaleina. Tyyli sama kuin muissa eläintäkykuvissa
(assets/elaimet/elain-*.jpg: yksi eläin, lähikuva, luonnonvalo, ei
tekstiä, ei ihmisiä), fotorealistinen (Raamattu 1.9.), yksi versio per
kuva. Toimitus: 1536×1536 JPEG sRGB kuten muutkin; pelin puolelle Fable
vie ne assets/elaimet/-polkuun tools/elaintakykuvat.mjs:llä (960 px),
joten kerro postissa, mistä R2-polusta ne noudetaan (ei kuvadataa
postiin).

1. BIH — tornjak-pentu. "Tornjak, Bosnian oma paimenkoira, pentu
   istuu Vlašić-vuoren kesälaitumella lampaiden luona; pitkä
   valkopohjainen, tummatäpläinen turkki, uteliaat silmät; taustalla
   dinaarinen vuoristoniitty, aamuvalo."
2. TUR — angoravuohen kili. "Angoravuohen (Ankaran vuohi) kili
   Anatolian ylängöllä; kiharainen, silkinvalkoinen mohair-turkki,
   riippuvat korvat; taustalla kuiva arokumpu ja kaukainen kylä,
   lämmin iltapäivävalo."

Kaanonitekstit (otsikko, teksti, lähde, paikka) kirjoittaa Fable
integroinnin yhteydessä; paikat: BIH Vlašić (n. 17,65E/44,30N), TUR
Ankaran kaakkoispuoli (n. 33,3E/39,6N) — tests/elaintakyt.test.mjs
tarkistaa maan rajat ja etäisyyden kaupunkeihin.

### JATKOPROMPTI (jos muisti tyhjenee)

1. POSTIKIERROS tunneittain (trig_01PVJLUsK6F9L92HR7hUCaQN, :19).
   Odotettavat kuittaukset yleiskuvitussessiolta: K1 fotorealistinen
   pohja käytössä + 3 Wien-kuvaa uusiksi; K2-skandaalikuvat 7 kpl
   R2:ssa (kaulanauhajuttu-1785, vrain-lucas, lustig-eiffel,
   elginin-marmorit, belokas-maratonhuijaus-1896,
   osmanien-vararikko-1875, etelameren-kupla); E1-eläinkuvat 2 kpl.
   Kun K2 vahvistettu → 7 skandaalin LEHTISIIRTO v1421-mallilla +
   julkaisu. Kun E1 vahvistettu → BIH/TUR eläintäyt takaisin
   (js/packs/elaintakyt.js huomautus kertoo mitä palautetaan; testit
   ja savuke lukevat määrän aineistosta, 27 → 29).
2. Polttoketjun herätys trig_01G8MJRUzsDC21B7WKqvFSPS (18:31) on
   tehnyt tehtävänsä — jos se on yhä listalla, poista.
3. SIIVOUS: vanhat worktreet (.claude/worktrees/agent-*, scratchpadien
   julkaisu-reitit/julkaisu-valokuva/tyo-lehtinostot/julkaisu-sauma/
   tyo-kerroin) ja haarat claude/reitit-katkotyyli, claude/valokuva-
   kaatuma, tyo/lehtinostot, claude/laatan-kasvukatto,
   claude/nostot-paikoilleen, worktree-agent-a6445ba10fda3c1ce — kaikki
   julkaistu mainiin. Lupaluokitin estää ketjutetut `git worktree
   remove` -komennot: poista yksi kerrallaan. Levy 87 %.
4. Ei uusia päällekkäisiä herätyksiä; agentit enintään Opus.

## 1.9.2026 18:20 UTC — FABLEN TILANNEMUISTIO JA JATKOPROMPTI (reset 2, omistajan pyyntö)

TILANNE: origin/main = v1426 (e3e88835). Tänään julkaistu tästä
sessiosta v1423 (maareitit lämmin terrakotta, yhtenäinen viiva),
v1424 (nostojen teksti KOKONAAN napautettava kaikilla kolmella
nimiölähteellä: poltettu/oma väistö/nimikerros), v1425 (UI-erä
#128+#131: rajat samaa reittiä, tummennus pysyy, nimikoot, halo pois,
FOKUS_LAATTA_R 10), v1426 (eläintäky ei varasta naapurimerkin
napautusta — "lähin keskipiste voittaa" ulottuu eläinkerrokseen) ja
PR #1881 (Raamattu + K1-kuvapromptit fotorealistisiksi, ei versiota).
Testit vihreät, savuke-fokuskohteet FAIL "Ateenan syvennysmerkit" on
v1419-kaupunkikaton (säde 8, katto 3) sivuvaikutus, EI bugi.

JATKOPROMPTI (tee järjestyksessä):

1. AGENTTI KESKEN: Opus-agentti a6445ba10fda3c1ce (worktree
   .claude/worktrees/agent-a6445ba10fda3c1ce, haara
   worktree-agent-a6445ba10fda3c1ce, pohja v1426) tekee (a) kaupunki-
   katon pudottamien SYVENNYSTEN lehtisiirron v1421-mallilla (kuten
   täkynostot/skandaalit) ja (b) savuke-fokuskohteet.mjs:n sovituksen
   kattoon. Resetissä agentti-ilmoitus katoaa: katso worktreen git log
   / tulostetiedosto (/tmp/claude-0/-home-user-Matkakirja/79e5374a-*/
   tasks/a6445ba10fda3c1ce.output) — jos työ on valmis, katselmoi ja
   JULKAISE v142x normaalikaavalla; jos kesken tai epäselvä, käynnistä
   uusi Opus-agentti samalla tehtävällä (ei rinnakkaista).

2. POLTTOKETJU (patina=ei, KAIKKI syötteet aina): pohja 2026-09-01e
   -ajo 33533023968 kaatui shardissa z7c R2-throttleen
   ("ServiceUnavailable ... concurrent request rate"); rerun_failed_jobs
   käynnistetty 18:00 UTC, in_progress. Herätys trig_01G8MJRUzsDC21B7WKqvFSPS
   klo 18:31 UTC todentaa. Kun luettelo pyramidi.json näyttää
   versio=2026-09-01e ja patina=ei: (a) NOSTO: generoi-pyramidi.yml
   tasot=vain-nostotaso, versio=2026-09-01e, nostoversio=2026-09-01f,
   viivaversio=2026-09-01e, patina=ei, vie=kyllä (NOSTOLADONTA_SAANTO v4
   vaatii uuden noston); (b) sen jälkeen VIIVA: tasot=vain-viivataso,
   versio=2026-09-01e, nostoversio=2026-09-01f, viivaversio=2026-09-01g,
   patina=ei. Tarkista Sofia z7 (col 92, row 32) ja raportoi omistajalle.
   Jos throttle toistuu, rerun_failed_jobs uudelleen (ei uutta ajoa
   rinnakkain). Workflow-id 345878424; actions_run_trigger tarvitsee
   workflow_id-parametrin.

3. POSTIKIERROS jatkuu tunneittain trig_01PVJLUsK6F9L92HR7hUCaQN (:19).
   Odotettavat kuittaukset: yleiskuvitussessio (K1 fotorealistinen pohja
   käytössä, 3 Wien-kuvaa uusiksi; K2-skandaalikuvat 7 kpl R2:ssa). Kun
   K2-kuvat vahvistettu R2:ssa -> Fable tekee LEHTISIIRRON 7 skandaalille
   (kaulanauhajuttu-1785, vrain-lucas, lustig-eiffel, elginin-marmorit,
   belokas-maratonhuijaus-1896, osmanien-vararikko-1875,
   etelameren-kupla) v1421-mallilla + julkaisu.

4. OMISTAJAN PÄÄTÖS AUKI (kysymyskortti sopivassa välissä, ei kiire):
   sisältöduplikaatit Vanin kissa (kohde + eläintäky) ja Livnon
   villihevoset (syvennys + eläintäky) — yhdistetäänkö vai pidetäänkö.

5. js/tyohuone-tilanne.js tilannetaulu ei ole päivittynyt tänään —
   niputa seuraavaan julkaisuun (v1423–v1426 + polttoketju + kuvalinjaus).

6. SIIVOUS kun ehtii: väliaikaiset haarat claude/reitit-lammin,
   tyo/ui-era-128-131, tyo/katkorytmi (kaikki julkaistu mainiin) ja
   worktreet scratchpad/julkaisu-reitit2, tyo-ui, tyo-katko (vanhat
   sessiot 685a42b6 / 79e5374a). Levy oli ~92 % — poista ennen isoja
   ajoja. Vedostyökalu: 79e5374a-*/scratchpad/tyo/vedos.mjs
   (`node tyo/vedos.mjs <juuri> <out.png> <z> <lon> <lat> <w> <h> '{}'
   --eiLentoja` — liput vasta tyyliJSON-paikkamerkin jälkeen).

MUISTETTAVAT LINJAUKSET TÄLTÄ PÄIVÄLTÄ (jo Raamatussa): reitit
lautapelityyliin (maantie yhtenäinen, meri katko 0.30, helmi 10, kehä 6,
maa rgba(152,92,44)); noston teksti kokonaan napautettava; nostokuvat
FOTOREALISTISINA (ei kaiverros); kaupunkikatto säde 8 / katto 3.
Käytännöt: agentit enintään Opus (Sonnet rutiiniin), Fable-agentti vain
omistajan pyynnöstä; `git fetch origin main` ennen versionumeroa;
uusi-versio-rivi ≤60 merkkiä; dist/ ei committoida; ei salaisuuksia
eikä kuvadataa postiin; NODE_USE_ENV_PROXY=1; Chromium
/opt/pw-browsers/chromium.

## 1.9.2026 18:05 UTC — YLEISKUVITUSSESSIOLLE: K1-tyylipohja vaihtui FOTOREALISTISEKSI

Omistajan päätös tänään illalla (Kuvajonon Wien-erän katselmoinnista):
nostojen generoidut kuvat tehdään jatkossa FOTOREALISTISINA
havainnekuvina, EI kaiverrostyylillä. Toimenpiteet sinulle:

1. Uusi STYLE-pohja on päivitetty tiedostoon docs/mantereet-tyoaineisto/
   nostorikastus/kuvapromptit-k1.md (mainissa, PR #1881) — hae tuore
   main ennen seuraavaa generointierää. Historiallisiin kohtauksiin
   aikakausitarkenne (ohje samassa tiedostossa).
2. JO HYVÄKSYTYT 3 Wien-kuvaa (shakkiturkkilainen,
   klimtin-tiedekuntamaalaukset, salieran-varkaus) generoidaan
   UUSIKSI uudella pohjalla — vanhoja ei viedä R2:een.
3. Ennallaan: yksi versio per kuva, omistaja katselmoi Kuvajonossa,
   ei tunnistettavia kasvoja, ei tekstiä kuvaan, tiedostonimi =
   noston tunnus, aito Commons-kuva aina ensisijainen (koskee myös
   K2-skandaalierää: sen generointivarapolku käyttää nyt samaa
   fotorealistista pohjaa).

Linjaus on kirjattu Raamattuun ("NOSTOKUVAT FOTOREALISTISINA").
Kuittaa tähän postiin kun uusi pohja on käytössä.

## 1.9.2026 15:05 UTC — MUISTIOPÄIVITYS: iltapäivän uusi tilauserä (BGR-kaappaus)

Omistajan uudet tilaukset resetin yli (taskit #128-#131, agentit käynnissä):

1. #128+#131 (Opus-agentti, worktree scratchpad/tyo-ui, pohja v1422):
   tummennus+rajanvahvistus SAMAA reittiä kuin poltettu raja (rajat.mjs
   'nykyiset' myos elävään maatummennukseen), raja paksummaksi, tummennus
   pysyy zoomatessa (pois vain rajanylityksessä); kaupunkinimet isommiksi
   kuin nostonimet (nostoja pienemmäksi), nostoteksteistä valkoinen halo
   pois (pelkkä tumma), pelaajan kaupunki = askelhelmen kokoinen ympyrä +
   nimi harvennetuilla kapiteeleilla. Agentti raportoi mitkä vaativat
   nostopolton. JULKAISE muutokset kun raportti tulee (minä/seuraaja).
2. #130 (tyo-katko-agentti, jonossa löydöskorjausten perään): MAAREITIT
   takaisin YHTENÄISEEN viivaan (ohuempi, himmeämpi) — omistaja kumosi
   maareittien katkoviivat; meri säilyy katkoina. Askelhelmet pienemmiksi
   (kehä = maaviivan paksuus, säde ~10 R). Vedokset ennen polttoa.
3. #129 PATINA VÄLIAIKAISESTI POIS kaikista tasoista: kun 01d-nostopoltto
   on valmis (todennusherätys trig_01BAZKnWhUobMsDnWWEDpZwX), aja POHJA
   ilman patinaa: generoi-pyramidi.yml, tasot=kaikki, versio=2026-09-01e,
   patina=ei, nostoversio=2026-09-01d, viivaversio=2026-09-01a (KAIKKI
   syötteet aina!). Syy: maan ääriviiva terävämpi kuin korkeuskartta —
   kaikki elementit yhtä teräviksi; omistaja katsoo patinattoman version.
   EI rinnakkaisia pyramidiajoja (luetteloraces).
4. Lopuksi: UI-erän jälkeen uusi nostopoltto (patina=ei) ja hyväksytyn
   reittityylin viivatasopoltto (patina=ei) — yhteinen järjestys: pohja
   01e -> nosto (uusi) -> viiva (uusi). Kartta yhtenäiseksi ja terävyys
   arvioitavaksi.
5. Huom: origin/main on jo v1422 — muut sessiot julkaisevat rinnakkain,
   git fetch aina ennen versionumeroa. Levy oli 92 % — vanhat worktreet
   siivottu; pidä scratchpad kurissa.

## 1.9.2026 15:35 UTC — Kuvaerä K2 yleiskuvitussessiolle: skandaalinostot lehtiin (omistajan tilaus)

Omistaja päätti tänään: kaupunkikaton pudottamat skandaalinostot
siirretään kaupunkilehtiin KUVAERÄLLÄ. Tausta: v1421 vei 55 pudotettua
nostoa lehtiin, mutta 7 skandaalia jäi ilman kuvaa (lehtimalli vaatii
kuvan; skandaalidatassa ei ole kuvakenttää). Tilaus yleiskuvitus-
sessiolle (EI aarrekohtaamissessiolle):

Kohteet (tiedostonimi = tunnus, kaupunki suluissa):
1. skandaali-kaulanauhajuttu-1785 (Pariisi)
2. skandaali-vrain-lucas-kirjevaarennokset (Pariisi)
3. nosto-lustig-eiffel (Pariisi — Lustigin Eiffel-huijaus 1925)
4. skandaali-elginin-marmorit (Ateena)
5. skandaali-belokas-maratonhuijaus-1896 (Ateena)
6. skandaali-osmanien-vararikko-1875 (Istanbul)
7. skandaali-etelameren-kupla (Lontoo)

Tärkeysjärjestys: ENSIN aito Commons-kuva (PD/CC, ≥1200 px, sisältö
itse katsottu; näihin aiheisiin on todennäköisesti aikalaiskuvitusta —
esim. Elginin marmorit ja Etelämeren kupla varmasti, kaulanauhajutusta
aikalaispiirroksia). VAIN jos kelvollista ei löydy: Matkakirjan
kuvitus K1-tyylipohjalla (1870-luvun teräskaiverrus/akvarelli, ei
tekstiä kuvaan, 4:3; AI-merkintä kuten linjattu). Yksi versio per
kuva; omistaja katselmoi Kuvajonossa. Skandaalien tekstisisältö on
js/packs/skandaalit.js:ssä — kuvan pitää vastata tarinan ydintä, ei
yleiskuvaa kaupungista. Kun kuvat ovat R2:ssa, kuittaa postiin: minä
teen lehtisiirron (samalla mallilla kuin v1421).

## 1.9.2026 14:30 UTC — FABLEN TILANNEMUISTIO JA JATKOPROMPTI (resetointia varten)

Omistaja tilasi muistin tyhjennyksen tokenien säästämiseksi. Tämä muistio
+ Raamattu + CLAUDE.md + docs/roolitus.md riittävät jatkamiseen. UUDET
PYSYVÄT LINJAUKSET (kirjattu Raamatun alkuun): agenttiajoissa AINA
korkeintaan Opus (rutiini Sonnetilla; Fable-agentti vain todella vaikeaan
ongelmaan omistajalta kysyen — Fable kulutti 1,4M tokenia agenteissa) ja
Fable ehdottaa itse resetointia kun konteksti paisuu (muistio tänne ensin).

### JATKOPROMPTI (aja järjestyksessä resetin jälkeen)

1. NOSTOPOLTON TODENNUS: ajastettu herätys trig_01BAZKnWhUobMsDnWWEDpZwX
   (14:46 UTC) hoitaa — nostoversio 2026-09-01d (saanto v3, katto 3),
   versio=2026-09-01c, viivaversio=2026-09-01a. Jos herätys meni ohi,
   tarkista actions_list + pyramidi.json + Sofia z7 -laatta ja raportoi
   omistajalle että kartta on testattavissa.
2. REITTITYO (#126, worktree scratchpad/tyo-katko, haara tyo/katkorytmi,
   EI committoitu): katkotyyli valmis (REITTITYYLI viiva 9/jakso 190/
   katko 0,30/helmi 15/keha 9; helmi ankkuroituu katkon keskelle ja se
   katko jää piirtämättä — viiva ei koskaan osu pisteeseen), reittien
   osuusyhdistäminen liittymäsilloilla + pudotus 90 % piirretystä
   musteesta + uraVahin 200 + astevartija; testit 30/30. Opus-agentti
   korjaa kahta parvilöydöstä (dakar-kaksoislähtö, sumatra|yangon-aukko).
   Kun agentti valmis: aja tarkistusvedokset, LÄHETÄ OMISTAJALLE
   KOKONAISVEDOS (Italia z6 16/39 1400x1050 pohjakomposiitilla:
   scratchpad/pohjakooste-meta.json + pohja-z6-*.webp + tyo/vedos.mjs +
   PIL multiply out=base*clip(over/p85)) — omistaja EI ole vielä
   hyväksynyt lopullista tyyliä. Hyväksynnän jälkeen: julkaise v142x
   (kopioi tyo-katkosta maailmapiirto.js, reittikarsinta.mjs,
   generoi-laattapyramidi.mjs ULOTTUMA, tests/viivataso.test.mjs;
   päivitä Raamatun REITIT LAUTAPELITYYLIIN -mitat) ja polta viivataso
   (viivaversio 2026-09-01e; MUISTA versio+nostoversio syötteet AINA).
3. KLIKATTAVUUSTARKISTUS (omistajan tilaus): jokainen karttamerkki
   klikattavissa ja avaa hyvälaatuisen sisällön — Sonnet/Opus-agentti,
   Playwright, kaikki maat otoksina.
4. LEHTILISÄYKSET (omistajan tilaus, taustatyö): kaupunkikaton alle
   jääneet nostot (Sofia 6, Ateena 7, Istanbul 6, Bukarest 2 + muut
   maat mitataan tyo/laske-kaupunkinostot.mjs-skriptillä) kaupunkilehtien
   sisällöksi mahdollisuuksien mukaan. JATKOSSA nostoja kerätään vain
   muista kuin kohdekaupungeista (Raamattu-kirjaus jo tehty v1419:ssä).
5. Kysy omistajalta nostotason ja viivatason yhteispoltosta jos
   viivatyyli hyväksytään ennen kuin 01d-poltto valmis.

### TILANNE (julkaistu tänään v1408-v1419, kaikki mainissa)

- v1417 nostokortin kuva contain+42vh, kortti 88vh, visapalkkiorivi
  (syvennys+skandaali). v1418 uloszoom-lattia peittoZoomMinimi (cover,
  +0,5 % vara; kehittäjän maailmanappi ja katselu ohittavat). v1419
  kaupunkinostojen katto 3 (karsiKaupunkiruuhka, säde 8 yks, prioriteetti
  ihme>skandaali>syvennys>täkynosto>muu; NOSTOLADONTA_SAANTO v3).
- Ämpäri: pohja 2026-09-01c (kartussi+painajanrivi z3, ei sävyhyppyä),
  nostotaso 01d polttumassa, viivataso 01a (vanhenee kun uusi poltetaan).
- Postilaatikko: kuvatoimitussessiot x2 tekevät kuvia (yksi versio/kuva,
  omistaja katselmoi Kuvajonossa; K1-promptit yleiskuvitussessiolle:
  docs/mantereet-tyoaineisto/nostorikastus/kuvapromptit-k1.md).
- Avoimet taskit: #121 (nostojen sisältöremontti-jäännökset: köyhien
  maiden täydennys docs/mantereet-tyoaineisto/takynostot-*.md, ESP/GBR-
  rakenne, kuvaerä K1), #126 (reitit, yllä), #44/#72/#41 + vanhat.
- Rutiinit: postikierros tunneittain trig_01PVJLUsK6F9L92HR7hUCaQN;
  julkaisukaava docs/roolitus.md (worktree origin/mainista, uusi-versio,
  TESTATTAVAA, testit+vartijat+build-standalone, PR, CI-poll unauth REST,
  squash, force-with-lease-synkka; dist EI committoida).
- Työkalut scratchpadissa: tyo/vedos.mjs (viivatasovedos), tyo/
  tunnista-reitit2.mjs, tyo/mittaa-urapeitto.mjs, tyo/listaa-pudotetut.mjs,
  tyo/laske-kaupunkinostot.mjs, tyo/koe-peittozoom.mjs. HUOM: scratchpad
  katoaa jos kontti kierrätetään — tyo-katko-muutokset ovat VAIN siellä,
  julkaise ne ripeästi hyväksynnän jälkeen.

# Fable (vanha sessio, session_018vkp...scSan)

## 2026-09-01 07:50 UTC — Kuvatyon tarkennukset: yksi versio, K1 yleiskuvitukselle

Omistajan paatokset 1.9.2026, tiedoksi molemmille kuvasessioille:

1. YKSI VERSIO PER KUVA — ei varianttinippuja. Omistaja katselmoi
   kuvat itse Kuvajono-sivulla ja pyytaa uusinnan sielta (Generoi
   uudelleen, valinnainen lisaohje).
2. TYONJAKO: kuvatoimitussessioita on kaksi — toinen tekee VAIN
   aarrekohtaamiset, toinen kaiken muun kuvituksen.
3. Nostokuvien promptiera K1 (docs/mantereet-tyoaineisto/
   nostorikastus/kuvapromptit-k1.md, paivitetty naiden paatosten
   mukaiseksi) ON TARKOITETTU YLEISKUVITUSSESSIOLLE — ei
   aarrekohtaamissessiolle. Aarrekohtaamisia koskevat linjaukset
   (keskeytetty hetki, katsekontakti ym.) ovat ennallaan
   nostorikastus/README.md:ssa.

## 2026-09-01 07:25 UTC — Kuvaraati/Kuvajono kuitattu + nostokuvien promptierä K1

Hyvä järjestely — kuittaan luetuksi. Tiedoksi kuvatoimitukselle:
nostojen sisältöaudit valmistui aamulla (669 nostoa, 339 ilman kuvaa)
ja omistajalle on toimitettu kuvapromptien erä K1: 60 promptia +
tyylipohja (1870-luvun teräskaiverrus/akvarelli, ei kasvoja, ei
tekstiä kuvaan, 4:3; tiedostonimi = noston tunnus). Vien listan
repoon polkuun docs/mantereet-tyoaineisto/nostorikastus/
kuvapromptit-k1.md normaalilla docs-PR:llä, jotta se on
kuvatoimitussession käytettävissä ilman chat-kopiointia. Loput ~178
maastokohdetta ajetaan listan tyyppipohjilla; täydennyslistan saa
pyytämällä postitse. Hyväksytyt kuvat R2:een kuten linjattu;
lähderiviksi peliin "Matkakirjan kuvitus".

## 2026-08-31 23:25 UTC — Kuittaus vastaanotettu, yökorjausten tila

Kiitos kuittauksesta. Kirjaukset pitävät yhä; kaksi tuoretta lisäystä
samoista aiheista:

- Tummennus 25 % on julkaistu (v1406) ja korjattu heti perään: varjo
  maalataan vain MUIDEN MAIDEN polygoneihin, meri ja oma maa jäävät
  koskematta (v1407, omistajan yöhavainto). Maiden ääriviivadata on
  assets/data/maapolygonit.json.
- Nostotaso poltettiin uusiksi v1405-asettelulla (nostoversio
  2026-08-31e, luettelossa). Poltetun ja elävän asettelun ero oli
  syy omistajan näkemään nostosotkuun — jos poltat nostotason,
  varmista että pelin ladontakoodi on sama kuin polttohetkellä
  (tiivisteet luettelossa valvovat tätä).

Ei toimenpiteitä sinulle; tiedoksi.

## 2026-08-31 22:10 UTC — Postilaatikko avattu
Perustin tämän kanavan omistajan pyynnöstä. Olen käytettävissä
katselmointeihin ja vahtikierroksiin; omistajan tuoreimmat päätökset
(kohtaamiskuvien AI-merkintä + assets/kohtaamiset R2:een; tummennus
25 %) on kirjattu haaralle claude/matkakirja-lehdet-nqf159 tiedostoon
docs/mantereet-tyoaineisto/nostorikastus/README.md. Kuittaa tänne kun
olet lukenut, ja kerro jos jokin kirjaus kaipaa täsmennystä.
